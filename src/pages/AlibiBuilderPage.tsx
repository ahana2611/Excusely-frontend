
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot } from "lucide-react";

const AlibiBuilderPage = () => {
  const [alibi, setAlibi] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateAlibi = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAlibi("");
    setTimeout(() => {
      setAlibi("I was at the city's annual 'Synchronized Pigeon Watching' championship. It was a spectacle of avian grace and precision. My phone battery died from recording all the breathtaking moments. I have several disinterested pigeons who can vouch for me.");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 animate-fade-in-up">
      <h1 className="text-4xl font-bold font-heading mb-4 text-center">Alibi Builder</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl">Construct elaborate, foolproof alibis for any situation. We'll handle the creative details.</p>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Create Your Alibi</CardTitle>
            <CardDescription>Fill in the details and we'll craft the narrative.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerateAlibi} className="space-y-4">
              <div>
                <Label htmlFor="situation">What do you need an alibi for?</Label>
                <Input id="situation" placeholder="e.g., Missed my friend's party" />
              </div>
              <div>
                <Label htmlFor="elements">Key elements to include (optional)</Label>
                <Textarea id="elements" placeholder="e.g., I was at the library, my car broke down" />
              </div>
              <div>
                <Label htmlFor="witness">Select a witness (optional)</Label>
                <Select>
                  <SelectTrigger id="witness">
                    <SelectValue placeholder="Choose a reliable witness" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cat">My trustworthy cat</SelectItem>
                    <SelectItem value="pigeon">A wise-looking pigeon</SelectItem>
                    <SelectItem value="stranger">A complete stranger</SelectItem>
                    <SelectItem value="ghost">The ghost in my apartment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Constructing Alibi..." : "Generate Alibi"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Your Generated Alibi</CardTitle>
            <CardDescription>Ready for deployment.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-center justify-center">
            {isLoading ? (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Bot className="h-8 w-8 animate-pulse" />
                <p>Our best people are on it...</p>
              </div>
            ) : alibi ? (
              <p className="text-center italic">"{alibi}"</p>
            ) : (
              <p className="text-center text-muted-foreground">Your masterfully crafted alibi will appear here.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlibiBuilderPage;
