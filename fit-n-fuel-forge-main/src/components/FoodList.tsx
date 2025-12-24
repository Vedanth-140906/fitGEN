import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { indianFoodDatabase, foodCategories } from "@/data/indianFoodDatabase";
import { Search, Apple } from "lucide-react";

const FoodList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredFoods = useMemo(() => {
    return indianFoodDatabase.filter(food => {
      const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || food.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-3xl md:text-4xl">
          <span className="fire-text">FOOD</span> DATABASE
        </h2>
        <span className="text-sm text-muted-foreground">Indian Foods</span>
      </div>

      {/* Search & Filter */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search foods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted border-border"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="bg-muted border-border w-full sm:w-[200px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {foodCategories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Food Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFoods.map((food, index) => (
          <div 
            key={food.id}
            className="glass-card p-5 rounded-xl hover:border-primary/30 transition-all animate-fade-in"
            style={{ animationDelay: `${index * 0.03}s` }}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Apple className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{food.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{food.category}</p>
                <p className="text-sm text-muted-foreground mt-2">{food.servingUnit}</p>
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Calories:</span>
                      <span className="ml-1 font-medium">{food.calories}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Protein:</span>
                      <span className="ml-1 font-medium">{food.protein}g</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Carbs:</span>
                      <span className="ml-1 font-medium">{food.carbs}g</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Fat:</span>
                      <span className="ml-1 font-medium">{food.fat}g</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {filteredFoods.length === 0 && (
          <div className="col-span-full text-center py-12 glass-card rounded-xl">
            <Apple className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No foods found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodList;