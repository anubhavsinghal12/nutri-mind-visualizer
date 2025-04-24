
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Weight, Ruler } from "lucide-react";

interface UserMetricsInputProps {
  weight: string;
  height: string;
  age: string;
  onWeightChange: (value: string) => void;
  onHeightChange: (value: string) => void;
  onAgeChange: (value: string) => void;
}

export const UserMetricsInput = ({
  weight,
  height,
  age,
  onWeightChange,
  onHeightChange,
  onAgeChange,
}: UserMetricsInputProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="weight" className="flex items-center gap-2">
            <Weight className="h-4 w-4" />
            Weight (kg)
          </Label>
          <Input
            id="weight"
            type="number"
            placeholder="Enter your weight in kg"
            value={weight}
            onChange={(e) => onWeightChange(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="height" className="flex items-center gap-2">
            <Ruler className="h-4 w-4" />
            Height (cm)
          </Label>
          <Input
            id="height"
            type="number"
            placeholder="Enter your height in cm"
            value={height}
            onChange={(e) => onHeightChange(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">Age (years)</Label>
        <Input
          id="age"
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => onAgeChange(e.target.value)}
        />
      </div>
    </div>
  );
};
