
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ActivityLevelSelectProps {
  activityLevel: string;
  onActivityLevelChange: (value: string) => void;
}

export const ActivityLevelSelect = ({
  activityLevel,
  onActivityLevelChange,
}: ActivityLevelSelectProps) => {
  return (
    <div className="space-y-2">
      <Label>Activity Level</Label>
      <RadioGroup value={activityLevel} onValueChange={onActivityLevelChange} className="space-y-1">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="sedentary" id="sedentary" />
          <Label htmlFor="sedentary">Sedentary (little or no exercise)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="light" id="light" />
          <Label htmlFor="light">Light (light exercise 1-3 days/week)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="moderate" id="moderate" />
          <Label htmlFor="moderate">Moderate (moderate exercise 3-5 days/week)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="active" id="active" />
          <Label htmlFor="active">Active (hard exercise 6-7 days/week)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="veryActive" id="veryActive" />
          <Label htmlFor="veryActive">Very Active (intense exercise daily)</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
