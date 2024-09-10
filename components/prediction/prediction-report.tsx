"use client"
import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, MessageSquare, Award } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const PredictionReport = () => {
  const prediction = {
    id: "PRED2024-06-15",
    title: "Widespread Adoption of Augmented Reality in Remote Work",
    author: "TechFuturist23",
    date: "2024-06-15",
    content: "Because of the rapid advancements in AR technology and the continued trend of remote work, I believe that by 2026, over 30% of remote workers will regularly use AR interfaces for collaborative tasks and virtual meetings.",
    discussionPeriod: "2 weeks",
    expertCount: 15,
    commentCount: 87,
  };

  const summary = {
    supportingEvidence: [
      "Recent breakthroughs in AR resolution and field of view",
      "Major tech companies investing heavily in AR for productivity",
      "Successful pilot programs in large corporations showing 20% productivity increase",
    ],
    challengingEvidence: [
      "High cost of AR hardware may slow adoption",
      "Privacy concerns in home-office environments",
      "Potential for 'AR fatigue' in prolonged use",
    ],
    keyInsights: [
      "Adoption rate may vary significantly by industry, with creative and engineering fields leading",
      "Integration with existing remote work tools will be crucial for widespread adoption",
      "User experience and ease of setup will be major factors in reaching 30% adoption",
    ],
    expertConsensus: {
      agree: 60,
      disagree: 25,
      uncertain: 15,
    },
    topContributors: [
      { name: "Dr. AR Smith", avatar: "/api/placeholder/40/40", contribution: "Detailed analysis of AR hardware trends" },
      { name: "RemoteWorkGuru", avatar: "/api/placeholder/40/40", contribution: "Survey data from 500 remote companies" },
      { name: "FutureTech Analyst", avatar: "/api/placeholder/40/40", contribution: "Comparative study of VR vs AR adoption in workplaces" },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl mb-2">{prediction.title}</CardTitle>
                <CardDescription>
                  Prediction #{prediction.id} by {prediction.author} • {prediction.date}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-sm">
                {prediction.discussionPeriod} Discussion
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6">{prediction.content}</p>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <ArrowUpCircle className="text-green-500 mr-2" />
                  Supporting Evidence
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {summary.supportingEvidence.map((item, index) => (
                    <li key={index} className="text-sm text-gray-600">{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <ArrowDownCircle className="text-red-500 mr-2" />
                  Challenging Evidence
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {summary.challengingEvidence.map((item, index) => (
                    <li key={index} className="text-sm text-gray-600">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <MessageSquare className="text-blue-500 mr-2" />
                Key Insights
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {summary.keyInsights.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600">{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-lg mb-2">Expert Consensus</h3>
              <div className="flex justify-between items-center">
                <div className="text-green-500 font-semibold">{summary.expertConsensus.agree}% Agree</div>
                <div className="text-red-500 font-semibold">{summary.expertConsensus.disagree}% Disagree</div>
                <div className="text-gray-500 font-semibold">{summary.expertConsensus.uncertain}% Uncertain</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <Award className="text-yellow-500 mr-2" />
                Top Contributors
              </h3>
              <div className="space-y-3">
                {summary.topContributors.map((contributor, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={contributor.avatar} alt={contributor.name} />
                      <AvatarFallback>{contributor.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{contributor.name}</div>
                      <div className="text-sm text-gray-500">{contributor.contribution}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              <span className="font-semibold">{prediction.expertCount}</span> Experts • 
              <span className="font-semibold ml-2">{prediction.commentCount}</span> Comments
            </div>
            <Button>View Full Discussion</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PredictionReport;