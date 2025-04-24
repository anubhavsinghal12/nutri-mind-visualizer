
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Apple, Cookie, Vegan } from "lucide-react";
import { toast } from "sonner";

export const NutritionPreferences = () => {
  const [veganMode, setVeganMode] = useState(false);
  const [calorieGoal, setCalorieGoal] = useState([2000]);
  const [excludeSweets, setExcludeSweets] = useState(false);

  const handleSavePreferences = () => {
    toast.success("Nutrition preferences saved successfully!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Apple className="h-5 w-5 text-primary" />
          Nutrition Preferences
        </CardTitle>
        <CardDescription>
          Customize your nutrition tracking experience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <Vegan className="h-4 w-4 text-green-600" />
            <Label htmlFor="vegan-mode">Vegan Mode</Label>
          </div>
          <Switch
            id="vegan-mode"
            checked={veganMode}
            onCheckedChange={setVeganMode}
          />
        </div>

        <div className="space-y-2">
          <Label>Daily Calorie Goal: {calorieGoal[0]} kcal</Label>
          <Slider
            value={calorieGoal}
            onValueChange={setCalorieGoal}
            min={1200}
            max={4000}
            step={50}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <Cookie className="h-4 w-4 text-amber-600" />
            <Label htmlFor="exclude-sweets">Exclude Sweets</Label>
          </div>
          <Switch
            id="exclude-sweets"
            checked={excludeSweets}
            onCheckedChange={setExcludeSweets}
          />
        </div>

        <Button onClick={handleSavePreferences} className="w-full">
          Save Preferences
        </Button>

        <p className="text-sm text-muted-foreground">
          These preferences will help us provide more personalized nutrition recommendations
        </p>
      </CardContent>
    </Card>
  );
};
