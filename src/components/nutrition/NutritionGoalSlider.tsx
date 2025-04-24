
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface NutritionGoalSliderProps {
  goalMultiplier: number;
  onGoalChange: (values: number[]) => void;
}

export const NutritionGoalSlider = ({
  goalMultiplier,
  onGoalChange,
}: NutritionGoalSliderProps) => {
  return (
    <div className="space-y-2">
      <Label>Nutrition Goal ({goalMultiplier}% of maintenance)</Label>
      <Slider
        value={[goalMultiplier]}
        onValueChange={onGoalChange}
        min={70}
        max={130}
        step={5}
        className="w-full"
      />
      <div className="text-sm text-muted-foreground mt-1">
        {goalMultiplier < 100 ? "Caloric deficit" : goalMultiplier > 100 ? "Caloric surplus" : "Maintenance"}
      </div>
    </div>
  );
};
