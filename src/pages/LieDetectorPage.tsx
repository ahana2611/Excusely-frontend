import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Zap } from 'lucide-react';
import { Label } from '@/components/ui/label';

const LieDetectorPage = () => {
  const [excuse, setExcuse] = useState("");
  const [result, setResult] = useState<{ score: number; feedback: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysis = () => {
    if (!excuse) return;
    setIsLoading(true);
    setResult(null);
    setTimeout(() => {
      const randomScore = Math.floor(Math.random() * 81) + 20; // 20-100
      let feedback = "";
      if (randomScore > 85) {
        feedback = "Flawless! This is practically the truth. Are you sure you're making this up?";
      } else if (randomScore > 60) {
        feedback = "Pretty solid. Only a seasoned skeptic would question this masterpiece.";
      } else if (randomScore > 40) {
        feedback = "A bit shaky. It might work on your grandma, but don't try it on your boss.";
      } else {
        feedback = "Dangerously thin ice! This excuse has more holes than Swiss cheese. Back to the drawing board!";
      }
      setResult({ score: randomScore, feedback });
      setIsLoading(false);
    }, 2500);
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 animate-fade-in-up">
      <h1 className="text-4xl font-bold font-heading mb-4 text-center">Lie Detector</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl">Test the believability of any excuse before you deploy it. Our highly advanced (and slightly judgmental) AI will give you the verdict.</p>
      
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Analyze Your Excuse</CardTitle>
          <CardDescription>Paste your excuse below to begin the analysis.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="e.g., I can't come in today, I was abducted by overly-polite aliens."
            value={excuse}
            onChange={(e) => setExcuse(e.target.value)}
            rows={5}
          />
          <Button onClick={handleAnalysis} disabled={isLoading || !excuse} className="w-full">
            <Zap className="mr-2 h-4 w-4" />
            {isLoading ? 'Analyzing...' : 'Analyze Excuse'}
          </Button>

          {isLoading && (
            <div className="text-center text-muted-foreground pt-4">
                <p>Scanning for logical fallacies, emotional inconsistencies, and tell-tale signs of pure genius...</p>
            </div>
          )}

          {result && (
            <div className="pt-6 space-y-4">
                <h3 className="text-center font-heading text-lg">Analysis Complete</h3>
                <div>
                    <div className="flex justify-between mb-1">
                        <Label>Believability Score</Label>
                        <span className="font-bold text-primary">{result.score}%</span>
                    </div>
                    <Progress value={result.score} className="w-full" />
                </div>
                <Card className="bg-muted/50">
                    <CardContent className="p-4">
                        <p className="text-center text-sm text-muted-foreground italic">"{result.feedback}"</p>
                    </CardContent>
                </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LieDetectorPage;
