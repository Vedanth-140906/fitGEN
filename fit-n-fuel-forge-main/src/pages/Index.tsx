import { useState } from "react";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import MotivationalHero from "@/components/MotivationalHero";
import WorkoutTracker from "@/components/WorkoutTracker";
import FoodList from "@/components/FoodList";
import WeightTracker from "@/components/WeightTracker";
import MealCalendar from "@/components/MealCalendar";
import AITrainerChat from "@/components/AITrainerChat";
import { Dumbbell, Apple, TrendingUp, Target, Timer, Calendar, Bot, Scale } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"home" | "workout" | "food" | "weight" | "calendar">("home");

  const features = [
    {
      icon: Dumbbell,
      title: "Progressive Overload",
      description: "Track weights, reps, and sets with MuscleWiki demos",
      color: "primary",
    },
    {
      icon: Timer,
      title: "Rest Timer",
      description: "Built-in timer to optimize your rest periods between sets",
      color: "accent",
    },
    {
      icon: Scale,
      title: "Weight & BMI",
      description: "Track your weight journey with charts and BMI calculator",
      color: "primary",
    },
    {
      icon: Apple,
      title: "Food Database",
      description: "Browse 70+ Indian foods with nutrition information",
      color: "accent",
    },
    {
      icon: Bot,
      title: "AI Trainer",
      description: "Get personalized fitness advice from your AI coach",
      color: "primary",
    },
    {
      icon: Calendar,
      title: "Meal Calendar",
      description: "Plan and track meals daily with AI food scanning",
      color: "accent",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {activeTab === "home" && (
            <div className="space-y-12 animate-fade-in">
              <MotivationalHero />
              
              {/* Quick Actions */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveTab("workout")}
                  className="group glass-card p-5 text-left transition-all hover:border-primary/30 cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Dumbbell className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Workout</h3>
                      <p className="text-muted-foreground text-xs">Log exercises</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("food")}
                  className="group glass-card p-5 text-left transition-all hover:border-accent/30 cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Apple className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Foods</h3>
                      <p className="text-muted-foreground text-xs">Browse database</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("calendar")}
                  className="group glass-card p-5 text-left transition-all hover:border-primary/30 cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Meal Plan</h3>
                      <p className="text-muted-foreground text-xs">Daily calendar</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("weight")}
                  className="group glass-card p-5 text-left transition-all hover:border-accent/30 cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Scale className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Weight</h3>
                      <p className="text-muted-foreground text-xs">Track & BMI</p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Features Grid */}
              <div>
                <h2 className="text-xl font-semibold mb-6">
                  What you can do
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div 
                        key={index}
                        className="glass-card p-5 animate-slide-up"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className={`w-9 h-9 rounded-lg mb-3 flex items-center justify-center ${
                          feature.color === "accent" ? "bg-accent/10" : "bg-primary/10"
                        }`}>
                          <Icon className={`w-4 h-4 ${
                            feature.color === "accent" ? "text-accent" : "text-primary"
                          }`} />
                        </div>
                        <h3 className="font-medium text-sm mb-1">{feature.title}</h3>
                        <p className="text-muted-foreground text-xs leading-relaxed">{feature.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === "workout" && (
            <div className="animate-fade-in">
              <WorkoutTracker />
            </div>
          )}

          {activeTab === "food" && (
            <div className="animate-fade-in">
              <FoodList />
            </div>
          )}

          {activeTab === "weight" && (
            <div className="animate-fade-in">
              <WeightTracker />
            </div>
          )}

          {activeTab === "calendar" && (
            <div className="animate-fade-in">
              <MealCalendar />
            </div>
          )}
        </div>
      </main>

      {/* AI Trainer Chat */}
      <AITrainerChat />

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-xs">
          <p>FITGEN • Your AI-powered fitness companion</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;