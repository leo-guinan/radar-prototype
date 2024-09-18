'use server'

export interface TrendItem {
    title: string;
    url: string;
    content: string;
}

export interface TrendGroup {
    title: string;
    items: TrendItem[];
    summary: string;
}

export interface CollectionTrends {
    collectionName: string;
    trends: TrendGroup[];
}

export async function generateTrendReport(query: string): Promise<CollectionTrends[]> {
    console.log('generateTrendReport called with query:', query);

    const response = await fetch('http://localhost:8001/generate_trend_report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
        console.error('Failed to generate trend report:', response.statusText);
        throw new Error('Failed to generate trend report');
    }

    const data = await response.json();
    console.log('Response data:', data);

    return data;
}
