import chromadb
from fastapi import FastAPI, WebSocket
from pydantic import BaseModel
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import SystemMessage, HumanMessage
from sklearn.cluster import KMeans
import os
from dotenv import load_dotenv
import asyncio
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

# Add this CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str

class TrendItem(BaseModel):
    title: str
    url: str
    content: str

class TrendGroup(BaseModel):
    title: str
    items: list[TrendItem]
    summary: str

class CollectionTrends(BaseModel):
    collectionName: str
    trends: list[TrendGroup]

# chroma_client = chromadb.HttpClient(
#         ssl=True,
#         host='api.trychroma.com',
#         tenant='44bcbb14-87f0-4601-9e2f-3bf64104d7c4',
#         database='ideanexusventures',
#         headers={
#             'x-chroma-token': os.getenv('CHROMA_TOKEN')
#         }
#         )

chroma_client = chromadb.HttpClient(
  ssl=True,
  host='api.trychroma.com',
  tenant='44bcbb14-87f0-4601-9e2f-3bf64104d7c4',
  database='radar',
  headers={
      'x-chroma-token': os.getenv('CHROMA_RADAR_TOKEN')
  }
)

SUMMARIZE_TREND_TITLE_PROMPT = """
You are an expert at summarizing trends from a collection of documents.

You will be given a collection of documents that are related to a particular trend.

Based on the documents, provide a concise title for the trend in a few words.

Here's the trend info:
{trend_info}
"""

SUMMARIZE_TREND_SUMMARY_PROMPT = """
You are an expert at summarizing trends from a collection of documents.

You will be given a collection of documents that are related to a particular trend.

Based on the documents, provide a concise summary of the trend in a few sentences.

Here's the trend info:
{trend_info}
"""


@app.get("/")
async def root():
    return {"message": "Hello World"}

        
async def process_collection(collection_name: str, query: str) -> CollectionTrends:
    model = ChatOpenAI(model_name="gpt-4o-mini", verbose=True)
    prompt = ChatPromptTemplate.from_template(SUMMARIZE_TREND_TITLE_PROMPT)

    summary_prompt = ChatPromptTemplate.from_template(SUMMARIZE_TREND_SUMMARY_PROMPT)

    # prompt = ChatPromptTemplate.from_messages([
    #     SystemMessage(content="Determine the trend for the following information:\n\n{trend_info}"),
    #     HumanMessage(content="{input}")
    # ])
    chain = prompt | model | StrOutputParser()
    summary_chain = summary_prompt | model | StrOutputParser()
    collections = ["RADAR_LINKS", "RADAR_COMMENTS", "RADAR_POSTS", "RADAR_SUMMARIES"]
    collection = chroma_client.get_or_create_collection(name=collection_name)
    results = collection.query(
        query_texts=[query],
        n_results=25,
        include=["documents", "embeddings", "metadatas"]
    )
    
    if not results['documents'] or not results['embeddings']:
        return CollectionTrends(collectionName=collection_name, trends=[])
    
    docs = results['documents'][0]
    embeddings = results['embeddings'][0]
    metadatas = results['metadatas'][0]
    print(f"Found {len(docs)} docs for {collection_name}")
    if len(embeddings) == 0:
        return CollectionTrends(collectionName=collection_name, trends=[])
    
    kmeans = KMeans(n_clusters=min(5, len(embeddings)))
    clusters = kmeans.fit_predict(embeddings)
    groups = [[] for _ in range(5)]
    for i, (doc, cluster) in enumerate(zip(docs, clusters)):
        title = metadatas[i].get('title', f"{collection_name.split('_')[1]} {i+1}")
        groups[cluster].append(TrendItem(
            title=title,
            url=metadatas[i]['source'],
            content=doc
        ))
    trends = []
    for group in groups:
        if not group:  # Skip empty groups
            continue
        print(f"Processing group: {group}")
        trend_info = "\n\n".join([f"{item.title}: {item.content}" for item in group])
        title = await chain.ainvoke({"trend_info": trend_info})
        summary = await summary_chain.ainvoke({"trend_info": trend_info})
        trends.append(TrendGroup(
            title=title.strip(),
            items=group,
            summary=summary.strip()
        ))
    
    return CollectionTrends(collectionName=collection_name, trends=trends)

async def worker(websocket: WebSocket, query: str):
    collections = ["RADAR_LINKS", "RADAR_COMMENTS", "RADAR_POSTS", "RADAR_SUMMARIES"]
    for collection_name in collections:
        result = await process_collection(collection_name, query)
        if result.trends:
            await websocket.send_json(result.dict())
    await websocket.send_json({"status": "completed"})

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    query = await websocket.receive_text()
    await worker(websocket, query)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8001, reload=True)
