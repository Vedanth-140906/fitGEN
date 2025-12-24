import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Loader2, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DetectedFood {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface FoodScannerProps {
  onFoodDetected: (food: DetectedFood) => void;
}

const FoodScanner = ({ onFoodDetected }: FoodScannerProps) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Convert to base64 and send to AI
    await analyzeImage(file);
  };

  const analyzeImage = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const base64 = await fileToBase64(file);

      const { data, error: fnError } = await supabase.functions.invoke("analyze-food", {
        body: { image: base64 },
      });

      if (fnError) {
        if (fnError.message.includes("429")) {
          setError("Rate limit exceeded. Please try again in a moment.");
        } else if (fnError.message.includes("402")) {
          setError("AI credits exhausted. Please add credits to continue.");
        } else {
          throw fnError;
        }
        return;
      }

      if (data?.food) {
        onFoodDetected(data.food);
        toast({ title: `Detected: ${data.food.name}` });
      } else {
        setError("Could not identify the food. Please try a clearer image.");
      }
    } catch (err: any) {
      console.error("Error analyzing food:", err);
      setError("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />

      {preview ? (
        <div className="relative">
          <img src={preview} alt="Food preview" className="w-full h-64 object-cover rounded-lg" />
          {loading && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                <p className="mt-2 text-sm text-muted-foreground">Analyzing food...</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={triggerFileInput}
          className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-primary/50 transition-colors"
        >
          <Camera className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Tap to take a photo or upload an image</p>
          <p className="text-sm text-muted-foreground/70 mt-2">AI will identify the food and estimate nutrition</p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="flex gap-2">
        <Button onClick={triggerFileInput} className="flex-1" disabled={loading}>
          <Camera className="w-4 h-4 mr-2" />
          {preview ? "Take Another" : "Take Photo"}
        </Button>
        <Button variant="outline" onClick={triggerFileInput} disabled={loading}>
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>
    </div>
  );
};

export default FoodScanner;