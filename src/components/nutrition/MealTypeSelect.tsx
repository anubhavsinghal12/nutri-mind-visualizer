
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface MealTypeSelectProps {
  value: string;
  onChange: (value: "breakfast" | "lunch" | "dinner" | "snack") => void;
}

export const MealTypeSelect = ({ value, onChange }: MealTypeSelectProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="mealType">Meal Type</Label>
      <Select
        value={value}
        onValueChange={(value) => 
          onChange(value as "breakfast" | "lunch" | "dinner" | "snack")
        }
        required
      >
        <SelectTrigger>
          <SelectValue placeholder="Select meal type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="breakfast">Breakfast</SelectItem>
          <SelectItem value="lunch">Lunch</SelectItem>
          <SelectItem value="dinner">Dinner</SelectItem>
          <SelectItem value="snack">Snack</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
