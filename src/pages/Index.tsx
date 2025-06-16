import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, MessageSquareText, Mail } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// An array to define our cute floating icons with excuses
const floatingIcons = [
  { icon: "😴", top: "15%", left: "5%", size: "text-5xl", duration: "10s", excuse: "My alarm clock is socially distancing from me." },
  { icon: "💤", top: "10%", left: "90%", size: "text-3xl", duration: "12s", excuse: "I'm in a long-term relationship with my bed." },
  { icon: "🛌", top: "80%", left: "15%", size: "text-6xl", duration: "8s", excuse: "My dreams were too interesting to interrupt." },
  { icon: "🤫", top: "60%", left: "95%", size: "text-4xl", duration: "15s", excuse: "I was practicing the art of doing nothing." },
  { icon: "🥱", top: "85%", left: "60%", size: "text-5xl", duration: "9s", excuse: "I've been diagnosed with a severe case of 'can't even'." },
  { icon: "🌙", top: "5%", left: "30%", size: "text-3xl", duration: "14s", excuse: "The moon told me to stay in bed." },
];

const Index = () => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center py-12 md:py-24 animate-fade-in-up overflow-hidden h-screen">
      {/* Floating Icons with Hover Cards */}
      {floatingIcons.map((item, index) => (
        <HoverCard key={index} openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            <div
              className={`absolute animate-float ${item.size} text-primary/20 cursor-pointer`}
              style={{
                top: item.top,
                left: item.left,
                animationDuration: item.duration,
                animationDelay: `${index * 0.5}s`,
              }}
            >
              {item.icon}
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-auto max-w-xs text-sm">
            <p>{item.excuse}</p>
          </HoverCardContent>
        </HoverCard>
      ))}

      <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
        Welcome to <span className="text-primary">Excusely</span>!
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10">
        Oops-proof your life. Excusely makes up excuses so you don’t have to!
      </p>
      <Link to="/generate-excuse">
        <Button size="lg" className="text-lg px-8 py-6 group">
          Generate an Excuse Now
          <Zap className="ml-2 h-5 w-5 group-hover:animate-pulse" />
        </Button>
      </Link>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
        <FeatureCard
          icon={<MessageSquareText className="h-10 w-10 text-accent" />}
          title="WhatsApp Style"
          description="Quick, casual excuses ready for your chats."
        />
        <FeatureCard
          icon={<Mail className="h-10 w-10 text-accent" />}
          title="Email Templates"
          description="Formal, well-crafted excuses for professional needs."
        />
        <FeatureCard
          icon={<Zap className="h-10 w-10 text-accent" />}
          title="Voice Note Style"
          description="Natural sounding scripts for when text won't cut it."
        />
      </div>
    </div>
  );
};

// ... keep existing code (FeatureCardProps interface and FeatureCard component)
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-card p-6 rounded-lg shadow-lg border border-border/50 text-left">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-heading font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

export default Index;
