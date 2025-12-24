import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scale, TrendingDown, TrendingUp, Minus, Trash2, Calculator } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

interface WeightLog {
  id: string;
  weight_kg: number;
  recorded_at: string;
  notes: string | null;
}

const WeightTracker = () => {
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([]);
  const [newWeight, setNewWeight] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [loading, setLoading] = useState(false);
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");

  useEffect(() => {
    fetchWeightLogs();
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("height_cm")
      .eq("user_id", user.id)
      .maybeSingle();

    if (data?.height_cm) {
      setHeightCm(data.height_cm.toString());
    }
  };

  const fetchWeightLogs = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("weight_logs")
      .select("*")
      .eq("user_id", user.id)
      .order("recorded_at", { ascending: true });

    if (error) {
      console.error("Error fetching weight logs:", error);
      return;
    }
    setWeightLogs(data || []);
  };

  const saveHeight = async () => {
    if (!heightCm) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({ height_cm: parseFloat(heightCm) })
      .eq("user_id", user.id);

    if (error) {
      toast({ title: "Error saving height", variant: "destructive" });
      return;
    }
    toast({ title: "Height saved" });
  };

  const addWeightLog = async () => {
    if (!newWeight) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({ title: "Please sign in", variant: "destructive" });
      return;
    }

    setLoading(true);
    let weightKg = parseFloat(newWeight);
    if (weightUnit === "lbs") {
      weightKg = weightKg / 2.205;
    }

    const { error } = await supabase.from("weight_logs").insert({
      user_id: user.id,
      weight_kg: weightKg,
    });

    if (error) {
      toast({ title: "Error logging weight", variant: "destructive" });
    } else {
      toast({ title: "Weight logged!" });
      setNewWeight("");
      fetchWeightLogs();
    }
    setLoading(false);
  };

  const deleteLog = async (id: string) => {
    const { error } = await supabase.from("weight_logs").delete().eq("id", id);
    if (!error) {
      fetchWeightLogs();
      toast({ title: "Entry deleted" });
    }
  };

  const convertWeight = (kg: number) => {
    return weightUnit === "kg" ? kg : kg * 2.205;
  };

  const calculateBMI = () => {
    if (!heightCm || weightLogs.length === 0) return null;
    const heightM = parseFloat(heightCm) / 100;
    const latestWeight = weightLogs[weightLogs.length - 1].weight_kg;
    return latestWeight / (heightM * heightM);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-blue-400" };
    if (bmi < 25) return { label: "Normal", color: "text-primary" };
    if (bmi < 30) return { label: "Overweight", color: "text-yellow-400" };
    return { label: "Obese", color: "text-accent" };
  };

  const getWeightTrend = () => {
    if (weightLogs.length < 2) return null;
    const recent = weightLogs.slice(-7);
    if (recent.length < 2) return null;
    const diff = recent[recent.length - 1].weight_kg - recent[0].weight_kg;
    return diff;
  };

  const bmi = calculateBMI();
  const trend = getWeightTrend();
  const chartData = weightLogs.slice(-30).map((log) => ({
    date: new Date(log.recorded_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    weight: convertWeight(log.weight_kg).toFixed(1),
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-3xl md:text-4xl">
          <span className="energy-text">WEIGHT</span> TRACKER
        </h2>
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

      <div className="grid md:grid-cols-3 gap-6">
        {/* BMI Calculator */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/20">
              <Calculator className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-medium text-lg">BMI Calculator</h3>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Height (cm)</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  type="number"
                  placeholder="170"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="bg-muted"
                />
                <Button onClick={saveHeight} variant="outline" size="sm">
                  Save
                </Button>
              </div>
            </div>

            {bmi && (
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-muted-foreground text-sm mb-1">Your BMI</p>
                <p className="font-display text-4xl">{bmi.toFixed(1)}</p>
                <p className={`text-sm mt-1 ${getBMICategory(bmi).color}`}>
                  {getBMICategory(bmi).label}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Log Weight */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-accent/20">
              <Scale className="w-5 h-5 text-accent" />
            </div>
            <h3 className="font-medium text-lg">Log Weight</h3>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Weight ({weightUnit})</Label>
              <Input
                type="number"
                step="0.1"
                placeholder={weightUnit === "kg" ? "70.5" : "155"}
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                className="bg-muted mt-1"
              />
            </div>
            <Button
              onClick={addWeightLog}
              disabled={loading || !newWeight}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Log Today's Weight
            </Button>
          </div>

          {trend !== null && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                {trend < 0 ? (
                  <TrendingDown className="w-4 h-4 text-primary" />
                ) : trend > 0 ? (
                  <TrendingUp className="w-4 h-4 text-accent" />
                ) : (
                  <Minus className="w-4 h-4 text-muted-foreground" />
                )}
                <span className="text-sm">
                  {trend < 0 ? "Down" : trend > 0 ? "Up" : "No change"}{" "}
                  {Math.abs(convertWeight(trend)).toFixed(1)} {weightUnit} this week
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="font-medium text-lg mb-4">Statistics</h3>
          {weightLogs.length > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current</span>
                <span className="font-semibold">
                  {convertWeight(weightLogs[weightLogs.length - 1].weight_kg).toFixed(1)} {weightUnit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Starting</span>
                <span className="font-semibold">
                  {convertWeight(weightLogs[0].weight_kg).toFixed(1)} {weightUnit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Change</span>
                <span
                  className={`font-semibold ${
                    weightLogs[weightLogs.length - 1].weight_kg - weightLogs[0].weight_kg < 0
                      ? "text-primary"
                      : "text-accent"
                  }`}
                >
                  {convertWeight(
                    weightLogs[weightLogs.length - 1].weight_kg - weightLogs[0].weight_kg
                  ).toFixed(1)}{" "}
                  {weightUnit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Entries</span>
                <span className="font-semibold">{weightLogs.length}</span>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No data yet</p>
          )}
        </div>
      </div>

      {/* Weight Chart */}
      {chartData.length > 1 && (
        <div className="glass-card p-6 rounded-xl">
          <h3 className="font-medium text-lg mb-4">Progress Chart</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={["auto", "auto"]} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Recent Entries */}
      {weightLogs.length > 0 && (
        <div className="glass-card p-6 rounded-xl">
          <h3 className="font-medium text-lg mb-4">Recent Entries</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {weightLogs
              .slice()
              .reverse()
              .slice(0, 10)
              .map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      {convertWeight(log.weight_kg).toFixed(1)} {weightUnit}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(log.recorded_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteLog(log.id)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeightTracker;