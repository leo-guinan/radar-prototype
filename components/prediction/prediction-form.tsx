"use client"
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const PredictionSubmission: React.FC = () => {
  const [prediction, setPrediction] = useState('');
  const [evidence, setEvidence] = useState('');
  const [discussionPeriod, setDiscussionPeriod] = useState('1week');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log('Submitted:', { prediction, evidence, discussionPeriod });
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Submit Your Prediction</h1>
        
        {!isSubmitted ? (
          <Card>
            <CardHeader>
              <CardTitle>New Prediction</CardTitle>
              <CardDescription>Share your insights and start a discussion with our experts</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="prediction">Your Prediction</Label>
                  <Textarea
                    id="prediction"
                    placeholder="Because of [evidence], I believe [outcome] will happen"
                    value={prediction}
                    onChange={(e) => setPrediction(e.target.value)}
                    required
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="evidence">Supporting Evidence</Label>
                  <Textarea
                    id="evidence"
                    placeholder="Provide any additional evidence or reasoning for your prediction"
                    value={evidence}
                    onChange={(e) => setEvidence(e.target.value)}
                    required
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discussionPeriod">Discussion Period</Label>
                  <Select value={discussionPeriod} onValueChange={setDiscussionPeriod}>
                    <SelectTrigger id="discussionPeriod">
                      <SelectValue placeholder="Select discussion period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1week">1 Week</SelectItem>
                      <SelectItem value="2weeks">2 Weeks</SelectItem>
                      <SelectItem value="1month">1 Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">Submit Prediction</Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Prediction Submitted</CardTitle>
              <CardDescription>Thank you for your contribution!</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Your prediction has been submitted and will be discussed by our experts.</p>
              <div className="bg-blue-50 border border-blue-200 rounded p-4 flex items-start">
                <Calendar className="text-blue-500 mr-3 mt-1" />
                <div>
                  <p className="text-blue-700 font-semibold">What happens next?</p>
                  <p className="text-blue-600">Our experts will discuss your prediction for the next {discussionPeriod === '1week' ? 'week' : discussionPeriod === '2weeks' ? 'two weeks' : 'month'}.</p>
                  <p className="text-blue-600 mt-2">After this period, you&apos;ll receive a summary of the evidence and discussion both supporting and challenging your prediction.</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setIsSubmitted(false)} variant="outline" className="w-full">
                Submit Another Prediction
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PredictionSubmission;