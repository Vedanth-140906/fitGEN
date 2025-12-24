import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { indianFoodDatabase, foodCategories, FoodItem } from "@/data/indianFoodDatabase";
import { Calendar, Plus, Trash2, Search, ChevronLeft, ChevronRight, Camera, Utensils, Flame, Beef, Wheat, Droplet, Settings2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import FoodScanner from "./FoodScanner";

interface Meal {
  id: string;
  meal_name: string;
  meal_date: string;
  food_entries: FoodEntry[];
}

interface FoodEntry {
  id: string;
  food_name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface UserGoals {
  calories_goal: number;
  protein_goal: number;
  carbs_goal: number;
  fat_goal: number;
}

const MealCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meals, setMeals] = useState<Meal[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [goals, setGoals] = useState<UserGoals>({
    calories_goal: 2000,
    protein_goal: 150,
    carbs_goal: 250,
    fat_goal: 65,
  });
  const [editingGoals, setEditingGoals] = useState(false);

  useEffect(() => {
    fetchMeals();
    fetchGoals();
  }, [selectedDate]);

  const fetchGoals = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("user_goals")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (data) {
      setGoals(data);
    }
  };

  const saveGoals = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("user_goals")
      .update(goals)
      .eq("user_id", user.id);

    if (error) {
      toast({ title: "Error saving goals", variant: "destructive" });
    } else {
      toast({ title: "Goals updated!" });
      setEditingGoals(false);
    }
  };

  const fetchMeals = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const dateStr = selectedDate.toISOString().split("T")[0];

    const { data: mealsData, error: mealsError } = await supabase
      .from("meals")
      .select("*")
      .eq("user_id", user.id)
      .eq("meal_date", dateStr);

    if (mealsError) {
      console.error("Error fetching meals:", mealsError);
      return;
    }

    const mealsWithEntries: Meal[] = [];
    for (const meal of mealsData || []) {
      const { data: entries } = await supabase
        .from("food_entries")
        .select("*")
        .eq("meal_id", meal.id);

      mealsWithEntries.push({
        ...meal,
        food_entries: entries || [],
      });
    }

    setMeals(mealsWithEntries);
  };

  const addMeal = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({ title: "Please sign in", variant: "destructive" });
      return;
    }

    const dateStr = selectedDate.toISOString().split("T")[0];
    const mealNumber = meals.length + 1;

    const { data, error } = await supabase
      .from("meals")
      .insert({
        user_id: user.id,
        meal_name: `Meal ${mealNumber}`,
        meal_date: dateStr,
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Error creating meal", variant: "destructive" });
      return;
    }

    fetchMeals();
    toast({ title: `Meal ${mealNumber} created!` });
  };

  const deleteMeal = async (mealId: string) => {
    const { error } = await supabase.from("meals").delete().eq("id", mealId);
    if (!error) {
      fetchMeals();
      toast({ title: "Meal deleted" });
    }
  };

  const addFoodToMeal = async (mealId: string, food: FoodItem, quantity: number = 1) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("food_entries").insert({
      user_id: user.id,
      meal_id: mealId,
      food_name: food.name,
      quantity,
      unit: food.servingUnit,
      calories: food.calories * quantity,
      protein: food.protein * quantity,
      carbs: food.carbs * quantity,
      fat: food.fat * quantity,
    });

    if (error) {
      toast({ title: "Error adding food", variant: "destructive" });
      return;
    }

    fetchMeals();
    toast({ title: `Added ${food.name}` });
  };

  const removeFoodEntry = async (entryId: string) => {
    const { error } = await supabase.from("food_entries").delete().eq("id", entryId);
    if (!error) {
      fetchMeals();
    }
  };

  const handleScannedFood = (food: { name: string; calories: number; protein: number; carbs: number; fat: number }) => {
    if (selectedMealId) {
      addFoodToMeal(selectedMealId, { ...food, id: "scanned", category: "Other", servingUnit: "serving", fiber: 0, sugar: 0, sodium: 0 } as FoodItem);
    }
    setShowScanner(false);
  };

  const filteredFoods = indianFoodDatabase.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const dailyTotals = meals.reduce(
    (acc, meal) => {
      meal.food_entries.forEach((entry) => {
        acc.calories += entry.calories;
        acc.protein += entry.protein;
        acc.carbs += entry.carbs;
        acc.fat += entry.fat;
      });
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const navigateDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const MacroProgress = ({ label, current, goal, icon: Icon, color }: { label: string; current: number; goal: number; icon: any; color: string }) => (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1.5">
          <Icon className={`w-3.5 h-3.5 ${color}`} />
          <span className="text-muted-foreground">{label}</span>
        </div>
        <span className="font-medium">
          {Math.round(current)} / {goal}
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${current > goal ? "bg-accent" : "bg-primary"}`}
          style={{ width: `${Math.min((current / goal) * 100, 100)}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="font-display text-3xl md:text-4xl">
          <span className="fire-text">MEAL</span> CALENDAR
        </h2>

        {/* Date Navigation */}
        <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
          <Button variant="ghost" size="icon" onClick={() => navigateDate(-1)}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="px-4 py-1.5 min-w-[140px] text-center">
            <p className="font-medium">
              {selectedDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => navigateDate(1)}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Daily Goals Overview */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-lg">Daily Progress</h3>
          <Dialog open={editingGoals} onOpenChange={setEditingGoals}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Settings2 className="w-4 h-4 mr-2" /> Edit Goals
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Set Daily Goals</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label>Calories</Label>
                  <Input
                    type="number"
                    value={goals.calories_goal}
                    onChange={(e) => setGoals({ ...goals, calories_goal: parseInt(e.target.value) || 0 })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Protein (g)</Label>
                  <Input
                    type="number"
                    value={goals.protein_goal}
                    onChange={(e) => setGoals({ ...goals, protein_goal: parseInt(e.target.value) || 0 })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Carbs (g)</Label>
                  <Input
                    type="number"
                    value={goals.carbs_goal}
                    onChange={(e) => setGoals({ ...goals, carbs_goal: parseInt(e.target.value) || 0 })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Fat (g)</Label>
                  <Input
                    type="number"
                    value={goals.fat_goal}
                    onChange={(e) => setGoals({ ...goals, fat_goal: parseInt(e.target.value) || 0 })}
                    className="mt-1"
                  />
                </div>
                <Button onClick={saveGoals} className="w-full">
                  Save Goals
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MacroProgress label="Calories" current={dailyTotals.calories} goal={goals.calories_goal} icon={Flame} color="text-accent" />
          <MacroProgress label="Protein" current={dailyTotals.protein} goal={goals.protein_goal} icon={Beef} color="text-primary" />
          <MacroProgress label="Carbs" current={dailyTotals.carbs} goal={goals.carbs_goal} icon={Wheat} color="text-primary" />
          <MacroProgress label="Fat" current={dailyTotals.fat} goal={goals.fat_goal} icon={Droplet} color="text-accent" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Meals List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-lg">Meals</h3>
            <Button onClick={addMeal} size="sm">
              <Plus className="w-4 h-4 mr-2" /> Add Meal
            </Button>
          </div>

          {meals.length === 0 ? (
            <div className="glass-card p-12 rounded-xl text-center">
              <Calendar className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No meals logged for this day</p>
              <Button onClick={addMeal} className="mt-4">
                <Plus className="w-4 h-4 mr-2" /> Add Your First Meal
              </Button>
            </div>
          ) : (
            meals.map((meal) => (
              <div key={meal.id} className="glass-card p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">{meal.meal_name}</h4>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedMealId(meal.id);
                        setShowScanner(true);
                      }}
                    >
                      <Camera className="w-4 h-4 mr-2" /> Scan Food
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteMeal(meal.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {meal.food_entries.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No foods added yet</p>
                ) : (
                  <div className="space-y-2">
                    {meal.food_entries.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">{entry.food_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {entry.quantity} {entry.unit} • {Math.round(entry.calories)} cal
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFoodEntry(entry.id)}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Food to Meal */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full mt-4 border-dashed" onClick={() => setSelectedMealId(meal.id)}>
                      <Plus className="w-4 h-4 mr-2" /> Add Food
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add Food to {meal.meal_name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Search foods..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {foodCategories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {filteredFoods.slice(0, 15).map((food) => (
                          <div key={food.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div>
                              <p className="font-medium">{food.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {food.calories} cal • {food.servingUnit}
                              </p>
                            </div>
                            <Button size="sm" onClick={() => addFoodToMeal(meal.id, food)}>
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))
          )}
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="glass-card p-6 rounded-xl">
            <h3 className="font-medium text-lg mb-4">Daily Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Meals</span>
                <span className="font-semibold">{meals.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Foods</span>
                <span className="font-semibold">
                  {meals.reduce((acc, m) => acc + m.food_entries.length, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Calories Left</span>
                <span className={`font-semibold ${dailyTotals.calories > goals.calories_goal ? "text-accent" : "text-primary"}`}>
                  {Math.max(0, goals.calories_goal - dailyTotals.calories)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Food Scanner Dialog */}
      <Dialog open={showScanner} onOpenChange={setShowScanner}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Scan Your Food</DialogTitle>
          </DialogHeader>
          <FoodScanner onFoodDetected={handleScannedFood} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MealCalendar;