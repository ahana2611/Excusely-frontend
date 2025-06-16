import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageSquareText, Mail, Mic, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ExcuseOutput {
  whatsapp: string;
  email: string;
  voice: string;
}

const ExcuseGeneratorPage = () => {
  const [situation, setSituation] = useState("");
  const [tone, setTone] = useState<"polite" | "funny" | "savage" | "anxious">("polite");
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "afternoon" | "evening">("morning");

  const [generatedExcuse, setGeneratedExcuse] = useState<ExcuseOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneratedExcuse(null);

    // Basic validation
    if (!situation.trim()) {
      toast({
        title: "Uh oh!",
        description: "Please describe the situation for your excuse.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("https://excusely-backend.onrender.com/generate-excuse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          situation,
          tone,
          location,
          weather,
          timeOfDay,
        }),
      });
    
      const data = await response.json();
    
      if (data && data.whatsapp && data.email && data.voice) {
        setGeneratedExcuse(data);
        toast({
          title: "Excuse Generated!",
          description: "Your alibi is ready.",
        });
      } else {
        toast({
          title: "Error",
          description: "Invalid response from server.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error generating excuse:", error);
      toast({
        title: "Server Error",
        description: "Could not connect to backend.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${format} excuse copied to clipboard.`,
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in-up">
      <h1 className="text-4xl font-bold font-heading mb-2 text-center">Excuse Generator</h1>
      <p className="text-muted-foreground text-center mb-8">Craft the perfect alibi for any scenario.</p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tell Us What Happened (or Didn't)</CardTitle>
          <CardDescription>The more details, the better the excuse!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="situation">The Situation (e.g., "late for meeting", "missed a deadline")</Label>
              <Input id="situation" value={situation} onChange={(e) => setSituation(e.target.value)} placeholder="I need an excuse for..." required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="tone">Desired Tone</Label>
                <Select value={tone} onValueChange={(value: "polite" | "funny" | "savage" | "anxious") => setTone(value)}>
                  <SelectTrigger id="tone">
                    <SelectValue placeholder="Select a tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="polite">Polite & Professional</SelectItem>
                    <SelectItem value="funny">Funny & Lighthearted</SelectItem>
                    <SelectItem value="savage">Savage & Direct</SelectItem>
                    <SelectItem value="anxious">Anxious & Nervous</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location">Location (Optional)</Label>
                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., 'at home', 'stuck in traffic'" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="weather">Weather (Optional)</Label>
                <Input id="weather" value={weather} onChange={(e) => setWeather(e.target.value)} placeholder="e.g., 'heavy rain', 'snowstorm'" />
              </div>
              <div>
                <Label htmlFor="timeOfDay">Time of Day</Label>
                <Select value={timeOfDay} onValueChange={(value: "morning" | "afternoon" | "evening") => setTimeOfDay(value)}>
                  <SelectTrigger id="timeOfDay">
                    <SelectValue placeholder="Select time of day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="afternoon">Afternoon</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full text-lg py-3" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              {isLoading ? "Crafting Alibi..." : "Generate Excuse"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {generatedExcuse && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-heading text-center">Your Custom Excuses:</h2>
          <OutputCard
            title="WhatsApp Message"
            icon={<MessageSquareText className="h-6 w-6 text-green-500" />}
            content={generatedExcuse.whatsapp}
            onCopy={() => copyToClipboard(generatedExcuse.whatsapp, "WhatsApp")}
          />
          <OutputCard
            title="Email Template"
            icon={<Mail className="h-6 w-6 text-blue-500" />}
            content={generatedExcuse.email}
            onCopy={() => copyToClipboard(generatedExcuse.email, "Email")}
            isPreformatted={true}
          />
          <OutputCard
            title="Voice Note Style"
            icon={<Mic className="h-6 w-6 text-red-500" />}
            content={generatedExcuse.voice}
            onCopy={() => copyToClipboard(generatedExcuse.voice, "Voice Note")}
          />
        </div>
      )}
    </div>
  );
};

interface OutputCardProps {
  title: string;
  icon: React.ReactNode;
  content: string;
  onCopy: () => void;
  isPreformatted?: boolean;
}

const OutputCard: React.FC<OutputCardProps> = ({ title, icon, content, onCopy, isPreformatted }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium flex items-center gap-2">
        {icon}
        {title}
      </CardTitle>
      <Button variant="ghost" size="sm" onClick={onCopy}>
        Copy
      </Button>
    </CardHeader>
    <CardContent>
      {isPreformatted ? (
        <pre className="whitespace-pre-wrap text-sm">{content}</pre>
      ) : (
        <p className="text-sm">{content}</p>
      )}
    </CardContent>
  </Card>
);

export default ExcuseGeneratorPage;
