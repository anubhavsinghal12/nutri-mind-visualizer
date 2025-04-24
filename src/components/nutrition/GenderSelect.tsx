
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface GenderSelectProps {
  gender: string;
  onGenderChange: (value: string) => void;
}

export const GenderSelect = ({ gender, onGenderChange }: GenderSelectProps) => {
  return (
    <div className="space-y-2">
      <Label>Gender</Label>
      <RadioGroup value={gender} onValueChange={onGenderChange} className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="male" id="male" />
          <Label htmlFor="male">Male</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="female" id="female" />
          <Label htmlFor="female">Female</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
