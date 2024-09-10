"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Trend {
  title: string;
  summary: string;
  articles: {
    title: string;
    source: string;
    summary: string;
    discussionPoints: string[];
  }[];
}

const trends: Trend[] = [
  {
    title: "Rise of Sustainable Fashion",
    summary: "The fashion industry is experiencing a significant shift towards sustainability, with consumers increasingly demanding eco-friendly and ethically produced clothing. This trend is driving innovation in materials, manufacturing processes, and business models.",
    articles: [
      {
        title: "The Future of Fashion is Circular",
        source: "EcoStyle Magazine",
        summary: "This article explores the concept of circular fashion, where clothes are designed to be reused or recycled.",
        discussionPoints: [
          "Debate on the feasibility of implementing circular fashion at scale",
          "Suggestions for consumer education on clothing care and repair"
        ]
      },
      // ... other articles
    ]
  },
  {
    title: "AI in Healthcare Diagnostics",
    summary: "Artificial Intelligence is making significant strides in healthcare diagnostics, offering faster, more accurate, and potentially more accessible medical diagnoses. This trend is reshaping how diseases are detected and treated, with implications for both healthcare providers and patients.",
    articles: [
      {
        title: "AI Outperforms Radiologists in Breast Cancer Detection",
        source: "Medical News Today",
        summary: "Reports on an AI system that demonstrated higher accuracy in detecting breast cancer from mammograms compared to human radiologists.",
        discussionPoints: [
          "Excitement about the potential to improve early detection rates",
          "Concerns about the role of human doctors in an AI-assisted future"
        ]
      },
      // ... other articles
    ]
  }
];

const TrendReport: React.FC = () => {
  const [expandedTrend, setExpandedTrend] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Trend Watch Report</h1>
        <p className="text-xl text-center text-gray-600 mb-12">Sample Edition - June 2024</p>

        {trends.map((trend, index) => (
          <Card key={index} className="mb-8">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{trend.title}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedTrend(expandedTrend === index ? null : index)}
                >
                  {expandedTrend === index ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                </Button>
              </CardTitle>
              <CardDescription>{trend.summary}</CardDescription>
            </CardHeader>
            {expandedTrend === index && (
              <CardContent>
                <h3 className="text-lg font-semibold mb-4">Top Articles and Discussions:</h3>
                {trend.articles.map((article, articleIndex) => (
                  <div key={articleIndex} className="mb-6">
                    <h4 className="text-md font-semibold">{article.title} - {article.source}</h4>
                    <p className="text-gray-600 mt-1">{article.summary}</p>
                    <ul className="list-disc list-inside mt-2">
                      {article.discussionPoints.map((point, pointIndex) => (
                        <li key={pointIndex} className="text-sm text-gray-500">{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            )}
            <CardFooter className="flex justify-between">
              <Button variant="outline" disabled>
                <Lock className="mr-2 h-4 w-4" /> Learn More
              </Button>
              <Button variant="outline" disabled>
                <Lock className="mr-2 h-4 w-4" /> Ask the Community
              </Button>
            </CardFooter>
          </Card>
        ))}

        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Want Full Access?</h2>
          <p className="text-gray-600 mb-6">Subscribe now to unlock all features and get weekly, monthly, or quarterly reports!</p>
          <Button size="lg">
            Subscribe Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrendReport;