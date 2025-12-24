import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { muscleGroups, exerciseDatabase, getExercisesByMuscleGroup, Exercise } from "@/data/workoutDatabase";
import { Plus, Trash2, TrendingUp, Check, Dumbbell, Info, Play, X, ChevronRight, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import RestTimer from "./RestTimer";

interface WorkoutSet {
  id: string;
  weight: number;
  reps: number;
  completed: boolean;
}

interface ExerciseEntry {
  id: string;
  exerciseId: string;
  exerciseName: string;
  muscleWikiUrl?: string;
  imageUrl: string;
  sets: WorkoutSet[];
  previousBest?: { weight: number; reps: number };
}

const WorkoutTracker = () => {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>("");
  const [selectedExercise, setSelectedExercise] = useState<string>("");
  const [exercises, setExercises] = useState<ExerciseEntry[]>([]);
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [previewExercise, setPreviewExercise] = useState<Exercise | null>(null);

  const availableExercises = selectedMuscleGroup 
    ? getExercisesByMuscleGroup(selectedMuscleGroup) 
    : [];

  const addExercise = (exercise?: Exercise) => {
    const ex = exercise || exerciseDatabase.find(e => e.id === selectedExercise);
    if (!ex) {
      toast({ title: "Select an exercise first", variant: "destructive" });
      return;
    }

    const newExercise: ExerciseEntry = {
      id: Date.now().toString(),
      exerciseId: ex.id,
      exerciseName: ex.name,
      muscleWikiUrl: ex.muscleWikiUrl,
      imageUrl: ex.imageUrl,
      sets: [
        { id: "1", weight: 0, reps: 0, completed: false },
      ],
      previousBest: undefined,
    };

    setExercises([...exercises, newExercise]);
    setSelectedExercise("");
    setPreviewExercise(null);
    toast({ title: `Added ${ex.name}` });
  };

  const addSet = (exerciseId: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        const lastSet = ex.sets[ex.sets.length - 1];
        return {
          ...ex,
          sets: [
            ...ex.sets,
            {
              id: Date.now().toString(),
              weight: lastSet?.weight || 0,
              reps: lastSet?.reps || 0,
              completed: false,
            },
          ],
        };
      }
      return ex;
    }));
  };

  const updateSet = (exerciseId: string, setId: string, field: "weight" | "reps", value: number) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: ex.sets.map(set => 
            set.id === setId ? { ...set, [field]: value } : set
          ),
        };
      }
      return ex;
    }));
  };

  const toggleSetComplete = (exerciseId: string, setId: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: ex.sets.map(set => 
            set.id === setId ? { ...set, completed: !set.completed } : set
          ),
        };
      }
      return ex;
    }));
  };

  const removeSet = (exerciseId: string, setId: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: ex.sets.filter(set => set.id !== setId),
        };
      }
      return ex;
    }));
  };

  const removeExercise = (exerciseId: string) => {
    setExercises(exercises.filter(ex => ex.id !== exerciseId));
  };

  const calculateVolume = (entry: ExerciseEntry) => {
    return entry.sets.reduce((total, set) => {
      if (set.completed) {
        return total + (set.weight * set.reps);
      }
      return total;
    }, 0);
  };

  const completedSets = exercises.reduce((acc, ex) => acc + ex.sets.filter(s => s.completed).length, 0);
  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets.length, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl md:text-4xl">
            <span className="energy-text">WORKOUT</span> TRACKER
          </h2>
          {exercises.length > 0 && (
            <p className="text-muted-foreground mt-1">
              {completedSets}/{totalSets} sets completed
            </p>
          )}
        </div>
        
        {/* Unit toggle */}
        <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
          <button
            onClick={() => setWeightUnit("kg")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
              weightUnit === "kg" 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            KG
          </button>
          <button
            onClick={() => setWeightUnit("lbs")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
              weightUnit === "lbs" 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            LBS
          </button>
        </div>
      </div>

      {/* Muscle Group Quick Select */}
      <div className="flex flex-wrap gap-2">
        {muscleGroups.map((group) => (
          <button
            key={group.id}
            onClick={() => setSelectedMuscleGroup(group.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
              selectedMuscleGroup === group.id
                ? "bg-primary text-primary-foreground scale-105"
                : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>{group.icon}</span>
            <span>{group.name}</span>
          </button>
        ))}
      </div>

      {/* Exercise Selection Cards */}
      {selectedMuscleGroup && (
        <div className="glass-card p-6 rounded-xl animate-fade-in">
          <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Select Exercise
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableExercises.map((exercise, index) => (
              <div
                key={exercise.id}
                className="group relative overflow-hidden rounded-xl border border-border bg-card hover:border-primary/50 transition-all cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setPreviewExercise(exercise)}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={exercise.imageUrl}
                    alt={exercise.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4 className="font-semibold text-sm truncate">{exercise.name}</h4>
                    <p className="text-xs text-muted-foreground">{exercise.equipment}</p>
                  </div>
                  <button
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      addExercise(exercise);
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {/* Exercise List */}
          {exercises.length === 0 ? (
            <div className="glass-card p-12 rounded-xl text-center">
              <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                <Dumbbell className="w-10 h-10 text-muted-foreground/50" />
              </div>
              <p className="text-muted-foreground text-lg">No exercises added yet</p>
              <p className="text-muted-foreground/70 text-sm mt-2">Select a muscle group above to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {exercises.map((entry, index) => (
                <div 
                  key={entry.id} 
                  className="glass-card rounded-xl overflow-hidden animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Exercise Header with Image */}
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={entry.imageUrl}
                      alt={entry.exerciseName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
                    <div className="absolute inset-0 p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-xl">{entry.exerciseName}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm text-muted-foreground">
                            Volume: {calculateVolume(entry).toLocaleString()} {weightUnit}
                          </span>
                          {calculateVolume(entry) > 0 && (
                            <span className="flex items-center gap-1 text-primary text-sm">
                              <TrendingUp className="w-4 h-4" />
                              Progressive!
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            const ex = exerciseDatabase.find(e => e.id === entry.exerciseId);
                            if (ex) setPreviewExercise(ex);
                          }}
                          className="bg-background/50 hover:bg-background/80"
                        >
                          <Info className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeExercise(entry.id)}
                          className="bg-destructive/20 text-destructive hover:bg-destructive/30"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Sets Table */}
                  <div className="p-4 space-y-2">
                    <div className="grid grid-cols-12 gap-2 text-xs text-muted-foreground font-medium px-2 uppercase tracking-wide">
                      <div className="col-span-2">Set</div>
                      <div className="col-span-4">{weightUnit}</div>
                      <div className="col-span-3">Reps</div>
                      <div className="col-span-3 text-right">Done</div>
                    </div>

                    {entry.sets.map((set, setIndex) => (
                      <div 
                        key={set.id}
                        className={`grid grid-cols-12 gap-2 items-center p-2 rounded-lg transition-all ${
                          set.completed 
                            ? "bg-primary/10 border border-primary/20" 
                            : "bg-muted/50 hover:bg-muted"
                        }`}
                      >
                        <div className="col-span-2">
                          <span className={`font-display text-lg ${set.completed ? "text-primary" : ""}`}>
                            {setIndex + 1}
                          </span>
                        </div>
                        <div className="col-span-4">
                          <Input
                            type="number"
                            value={set.weight || ""}
                            onChange={(e) => updateSet(entry.id, set.id, "weight", Number(e.target.value))}
                            placeholder="0"
                            className="bg-background/50 h-9 text-center"
                          />
                        </div>
                        <div className="col-span-3">
                          <Input
                            type="number"
                            value={set.reps || ""}
                            onChange={(e) => updateSet(entry.id, set.id, "reps", Number(e.target.value))}
                            placeholder="0"
                            className="bg-background/50 h-9 text-center"
                          />
                        </div>
                        <div className="col-span-3 flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleSetComplete(entry.id, set.id)}
                            className={`h-9 w-9 transition-all ${
                              set.completed 
                                ? "bg-primary text-primary-foreground hover:bg-primary/90 scale-110" 
                                : "hover:bg-primary/20"
                            }`}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          {entry.sets.length > 1 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeSet(entry.id, set.id)}
                              className="h-9 w-9 hover:bg-destructive/20 text-muted-foreground"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      onClick={() => addSet(entry.id)}
                      className="w-full mt-2 border-dashed hover:border-primary hover:bg-primary/5"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Set
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rest Timer Sidebar */}
        <div className="md:col-span-1">
          <div className="sticky top-24 space-y-4">
            <RestTimer />
            
            {/* Quick Stats */}
            {exercises.length > 0 && (
              <div className="glass-card p-4 rounded-xl">
                <h4 className="font-medium text-sm text-muted-foreground mb-3">Session Stats</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Exercises</span>
                    <span className="font-semibold">{exercises.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Sets</span>
                    <span className="font-semibold">{totalSets}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Completed</span>
                    <span className="font-semibold text-primary">{completedSets}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden mt-3">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${totalSets > 0 ? (completedSets / totalSets) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Exercise Preview Dialog */}
      <Dialog open={!!previewExercise} onOpenChange={() => setPreviewExercise(null)}>
        <DialogContent className="max-w-lg">
          {previewExercise && (
            <>
              <div className="relative aspect-video rounded-lg overflow-hidden -mt-2 -mx-2">
                <img
                  src={previewExercise.imageUrl}
                  alt={previewExercise.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
              <DialogHeader className="-mt-12 relative z-10">
                <DialogTitle className="text-2xl">{previewExercise.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="px-2 py-1 bg-muted rounded">{previewExercise.equipment}</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded capitalize">{previewExercise.muscleGroup}</span>
                </div>
                
                <p className="text-muted-foreground">{previewExercise.description}</p>
                
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4 text-primary" />
                    Pro Tips
                  </h4>
                  <ul className="space-y-2">
                    {previewExercise.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  className="w-full" 
                  onClick={() => addExercise(previewExercise)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Workout
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkoutTracker;