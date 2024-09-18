"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CollectionTrends, generateTrendReport } from '@/app/actions/trends';


const TrendReport: React.FC = () => {
  const [query, setQuery] = useState('');
  const [collectionTrends, setCollectionTrends] = useState<CollectionTrends[]>([]);
  const [expandedTrend, setExpandedTrend] = useState<{ collection: number, trend: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const report = await generateTrendReport(query);
      setCollectionTrends(report);
    } catch (error) {
      console.error("Failed to fetch trends:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Trend Watch Report</h1>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your query"
              className="flex-grow text-black"
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Generate Report'}
            </Button>
          </div>
        </form>

        {collectionTrends.map((collection, collectionIndex) => (
          <div key={collection.collectionName} className="mb-12">
            <h2 className="text-2xl text-gray-900 font-bold mb-4">{collection.collectionName}</h2>
            {collection.trends.map((trend, trendIndex) => (
              <Card key={trendIndex} className="mb-8">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{trend.title}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedTrend(
                        expandedTrend?.collection === collectionIndex && expandedTrend?.trend === trendIndex
                          ? null
                          : { collection: collectionIndex, trend: trendIndex }
                      )}
                    >
                      {expandedTrend?.collection === collectionIndex && expandedTrend?.trend === trendIndex
                        ? <ChevronUp className="h-6 w-6" />
                        : <ChevronDown className="h-6 w-6" />
                      }
                    </Button>
                  </CardTitle>
                  <CardDescription>{trend.summary}</CardDescription>
                </CardHeader>
                {expandedTrend?.collection === collectionIndex && expandedTrend?.trend === trendIndex && (
                  <CardContent>
                    <h3 className="text-lg text-gray-900 font-semibold mb-4">Related Items:</h3>
                    {trend.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="mb-6">
                        <h4 className="text-md font-semibold">
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {item.title}
                          </a>
                        </h4>
                        <p className="text-gray-600 mt-1">{item.content.substring(0, 150)}...</p>
                      </div>
                    ))}
                  </CardContent>
                )}
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Learn More</Button>
                  <Button variant="outline">Discuss in Community</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendReport;