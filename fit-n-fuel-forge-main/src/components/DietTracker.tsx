import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { indianFoodDatabase, foodCategories, FoodItem } from "@/data/indianFoodDatabase";
import { Plus, Trash2, Search, Utensils, Flame, Beef, Wheat, Droplet } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FoodEntry {
  id: string;
  food: FoodItem;
  servings: number;
}

const DietTracker = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [dailyGoal, setDailyGoal] = useState({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65,
  });

  const filteredFoods = useMemo(() => {
    return indianFoodDatabase.filter(food => {
      const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || food.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const totals = useMemo(() => {
    return foodEntries.reduce(
      (acc, entry) => ({
        calories: acc.calories + entry.food.calories * entry.servings,
        protein: acc.protein + entry.food.protein * entry.servings,
        carbs: acc.carbs + entry.food.carbs * entry.servings,
        fat: acc.fat + entry.food.fat * entry.servings,
        fiber: acc.fiber + entry.food.fiber * entry.servings,
        sugar: acc.sugar + entry.food.sugar * entry.servings,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 }
    );
  }, [foodEntries]);

  const addFood = (food: FoodItem) => {
    const newEntry: FoodEntry = {
      id: Date.now().toString(),
      food,
      servings: 1,
    };
    setFoodEntries([...foodEntries, newEntry]);
    toast({ title: `Added ${food.name}` });
  };

  const updateServings = (entryId: string, servings: number) => {
    if (servings < 0.5) return;
    setFoodEntries(foodEntries.map(entry =>
      entry.id === entryId ? { ...entry, servings } : entry
    ));
  };

  const removeEntry = (entryId: string) => {
    setFoodEntries(foodEntries.filter(entry => entry.id !== entryId));
  };

  const getProgressColor = (current: number, goal: number) => {
    const ratio = current / goal;
    if (ratio < 0.5) return "bg-muted";
    if (ratio < 0.8) return "bg-primary";
    if (ratio <= 1) return "bg-primary";
    return "bg-accent";
  };

  const MacroCard = ({ 
    icon: Icon, 
    label, 
    current, 
    goal, 
    unit = "g",
    color = "primary" 
  }: { 
    icon: any;
    label: string; 
    current: number; 
    goal: number; 
    unit?: string;
    color?: string;
  }) => (
    <div className="glass-card p-4 rounded-xl">
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-2 rounded-lg ${color === "accent" ? "bg-accent/20" : "bg-primary/20"}`}>
          <Icon className={`w-4 h-4 ${color === "accent" ? "text-accent" : "text-primary"}`} />
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-end gap-1 mb-2">
        <span className="font-display text-2xl">{Math.round(current)}</span>
        <span className="text-muted-foreground text-sm mb-1">/ {goal}{unit}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${getProgressColor(current, goal)}`}
          style={{ width: `${Math.min((current / goal) * 100, 100)}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-3xl md:text-4xl">
          <span className="fire-text">DIET</span> TRACKER
        </h2>
        <span className="text-sm text-muted-foreground">Indian Food Database</span>
      </div>

      {/* Macro Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MacroCard icon={Flame} label="Calories" current={totals.calories} goal={dailyGoal.calories} unit="" color="accent" />
        <MacroCard icon={Beef} label="Protein" current={totals.protein} goal={dailyGoal.protein} />
        <MacroCard icon={Wheat} label="Carbs" current={totals.carbs} goal={dailyGoal.carbs} />
        <MacroCard icon={Droplet} label="Fat" current={totals.fat} goal={dailyGoal.fat} color="accent" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Food Search */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="font-medium text-lg mb-4">Search Foods</h3>
          
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search Indian foods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted border-border"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-muted border-border">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {foodCategories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="max-h-[400px] overflow-y-auto space-y-2">
              {filteredFoods.slice(0, 20).map((food, index) => (
                <div 
                  key={food.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-all animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{food.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {food.calories} cal • {food.servingUnit}
                    </p>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => addFood(food)}
                    className="ml-2 bg-primary hover:bg-primary/90"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              
              {filteredFoods.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No foods found matching your search
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Food Log */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="font-medium text-lg mb-4">Today's Log</h3>

          {foodEntries.length === 0 ? (
            <div className="text-center py-12">
              <Utensils className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No foods logged yet</p>
              <p className="text-muted-foreground/70 text-sm mt-2">Search and add foods to track your nutrition</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {foodEntries.map((entry, index) => (
                <div 
                  key={entry.id}
                  className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{entry.food.name}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{Math.round(entry.food.calories * entry.servings)} cal</span>
                      <span>P: {Math.round(entry.food.protein * entry.servings)}g</span>
                      <span>C: {Math.round(entry.food.carbs * entry.servings)}g</span>
                      <span>F: {Math.round(entry.food.fat * entry.servings)}g</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateServings(entry.id, entry.servings - 0.5)}
                      className="h-8 w-8"
                    >
                      -
                    </Button>
                    <span className="w-8 text-center font-medium">{entry.servings}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateServings(entry.id, entry.servings + 0.5)}
                      className="h-8 w-8"
                    >
                      +
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeEntry(entry.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Summary */}
          {foodEntries.length > 0 && (
            <div className="mt-6 pt-4 border-t border-border">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Total Fiber:</span>
                  <span className="ml-2 font-medium">{Math.round(totals.fiber)}g</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Sugar:</span>
                  <span className="ml-2 font-medium">{Math.round(totals.sugar)}g</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DietTracker;
