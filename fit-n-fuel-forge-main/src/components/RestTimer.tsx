import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react";

interface RestTimerProps {
  defaultSeconds?: number;
}

const RestTimer = ({ defaultSeconds = 60 }: RestTimerProps) => {
  const [seconds, setSeconds] = useState(defaultSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [initialSeconds, setInitialSeconds] = useState(defaultSeconds);

  const presetTimes = [30, 60, 90, 120, 180];

  const playSound = useCallback(() => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = "sine";
    gainNode.gain.value = 0.3;
    
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
    }, 200);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            setIsRunning(false);
            playSound();
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, playSound]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  const progress = ((initialSeconds - seconds) / initialSeconds) * 100;

  const handlePresetClick = (time: number) => {
    setSeconds(time);
    setInitialSeconds(time);
    setIsRunning(false);
  };

  const handleReset = () => {
    setSeconds(initialSeconds);
    setIsRunning(false);
  };

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-2xl">REST TIMER</h3>
        <Volume2 className="w-5 h-5 text-muted-foreground" />
      </div>

      {/* Timer display */}
      <div className="relative flex items-center justify-center my-6">
        <div className="relative w-40 h-40">
          {/* Background circle */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={seconds === 0 ? "hsl(var(--accent))" : "hsl(var(--primary))"}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className="transition-all duration-300"
            />
          </svg>
          
          {/* Time display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`font-display text-4xl ${seconds === 0 ? "fire-text" : "energy-text"}`}>
              {formatTime(seconds)}
            </span>
          </div>
        </div>
      </div>

      {/* Preset buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {presetTimes.map((time) => (
          <button
            key={time}
            onClick={() => handlePresetClick(time)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              initialSeconds === time
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {time}s
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handleReset}
          className="rounded-full"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
        
        <Button
          size="lg"
          onClick={() => setIsRunning(!isRunning)}
          className={`rounded-full w-16 h-16 ${
            isRunning ? "bg-accent hover:bg-accent/90" : "bg-primary hover:bg-primary/90"
          }`}
        >
          {isRunning ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-1" />
          )}
        </Button>
        
        <div className="w-10" /> {/* Spacer for symmetry */}
      </div>

      {seconds === 0 && (
        <p className="text-center text-accent font-medium mt-4 animate-pulse">
          Time to get back to work! 💪
        </p>
      )}
    </div>
  );
};

export default RestTimer;
