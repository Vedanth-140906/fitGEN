import { useEffect, useState } from "react";
import { getRandomMotivationalQuote } from "@/data/indianFoodDatabase";
import { Dumbbell } from "lucide-react";

const MotivationalHero = () => {
  const [quote, setQuote] = useState({ quote: "", author: "" });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setQuote(getRandomMotivationalQuote());
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="relative overflow-hidden rounded-lg glass-card p-6 md:p-8 mb-8">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      {/* Minimal floating icons */}
      <div className="absolute top-6 right-6 text-muted-foreground/10 float-animation">
        <Dumbbell className="w-12 h-12" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-muted-foreground text-sm font-medium">{getGreeting()}</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-semibold mb-6 leading-tight tracking-tight">
          <span className="text-foreground">Track your </span>
          <span className="energy-text">progress</span>
        </h1>
        
        <blockquote className="border-l-2 border-primary/50 pl-4 my-5 max-w-xl">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            "{quote.quote}"
          </p>
          <footer className="text-muted-foreground/70 mt-2 text-sm">— {quote.author}</footer>
        </blockquote>
        
        <div className="flex items-center gap-4 mt-6 text-xs text-muted-foreground font-mono">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/70" />
            <span>{currentTime.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent/70" />
            <span>{currentTime.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotivationalHero;
