"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Mock function to check if user is logged in
const isUserLoggedIn = () => {
  // In a real application, this would check the user's authentication status
  return false;
};

const TrendsWatch = () => {
  const [interests, setInterests] = useState('');
  const router = useRouter();

  const handleInterestsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInterests(event.target.value);
  };

  const handleSubmit = () => {
    if (isUserLoggedIn()) {
      // If logged in, navigate to the sample report page
      router.push('/sample-report');
    } else {
      // If not logged in, navigate to the registration page
      router.push('/register');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Describe Your Interests</CardTitle>
            <CardDescription>
              Tell us about the trends you're interested in. Be as specific or broad as you like.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="interests">Your Interests</Label>
              <Textarea
                id="interests"
                placeholder="E.g., I'm interested in emerging technologies in renewable energy, particularly advancements in solar panel efficiency and energy storage solutions. I'm also curious about the intersection of AI and healthcare, especially in early disease detection and personalized medicine."
                value={interests}
                onChange={handleInterestsChange}
                className="min-h-[150px]"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleSubmit} 
              className="w-full"
              disabled={interests.trim().length === 0}
            >
              Get Your Trend Report
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TrendsWatch;