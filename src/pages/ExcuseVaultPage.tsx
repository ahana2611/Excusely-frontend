
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Copy } from 'lucide-react'; // Icons for actions

interface Excuse {
  id: string;
  situation: string;
  excuseText: string;
  tone: string;
  createdAt: string; // Date string, e.g., "YYYY-MM-DD"
}

const mockExcuses: Excuse[] = [
  { id: '1', situation: 'Missed a deadline', excuseText: "My sincerest apologies, my pet goldfish staged a coup and held my laptop hostage. The sheer audacity!", tone: 'Humorous', createdAt: '2025-06-10' },
  { id: '2', situation: 'Late for a meeting', excuseText: "I was unexpectedly delayed by a flock of philosophical pigeons contemplating the meaning of traffic lights. It was a profound experience.", tone: 'Creative', createdAt: '2025-06-12' },
  { id: '3', situation: 'Forgot a birthday', excuseText: "I was training carrier pigeons for a top-secret mission related to global peace and lost track of time. Belated happy birthday! Your gift is en route via said pigeon.", tone: 'Playful', createdAt: '2025-06-14' },
  { id: '4', situation: 'Skipping the gym', excuseText: "My muscles are currently in a deep meditative state, aligning their chakras. Disturbing them would be counterproductive to my wellness journey.", tone: 'Zen', createdAt: '2025-06-15' },
];

const ExcuseVaultPage = () => {
  return (
    <div className="py-8 animate-fade-in-up">
      <h1 className="text-4xl font-bold font-heading mb-8 text-center">Excuse Vault</h1>
      {mockExcuses.length === 0 ? (
        <p className="text-center text-muted-foreground">Your vault is empty. Go generate some excuses!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockExcuses.map((excuse) => (
            <Card key={excuse.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">{excuse.situation}</CardTitle>
                <CardDescription>Tone: {excuse.tone} | Generated: {new Date(excuse.createdAt).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm">{excuse.excuseText}</p>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  <Copy className="mr-2 h-4 w-4" /> Reuse
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExcuseVaultPage;

