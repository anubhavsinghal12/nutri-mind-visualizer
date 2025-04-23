
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calculator } from "lucide-react";

export const NutrientCalculator = () => {
  const [weight, setWeight] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState<string>("moderate");
  const [gender, setGender] = useState<string>("male");
  const [results, setResults] = useState<{
    calories: number;
    protein: number;
  } | null>(null);

  const calculateNutrients = () => {
    if (!weight || isNaN(Number(weight))) return;
    
    const weightNum = Number(weight);
    
    // Activity level multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };
    
    // Gender based multipliers
    const genderMultiplier = gender === "male" ? 1 : 0.9;
    
    // Base calculations
    // Basic BMR calculation (simplified)
    const bmr = weightNum * 10 * genderMultiplier;
    
    // Calculate daily calories based on activity level
    const calories = Math.round(bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers]);
    
    // Calculate protein (0.8g - 1.6g per kg of body weight depending on activity)
    const proteinMultiplier = 
      activityLevel === "sedentary" ? 0.8 :
      activityLevel === "light" ? 1.0 :
      activityLevel === "moderate" ? 1.2 :
      activityLevel === "active" ? 1.4 : 1.6;
    
    const protein = Math.round(weightNum * proteinMultiplier);
    
    setResults({ calories, protein });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Calorie & Protein Calculator
        </CardTitle>
        <CardDescription>
          Calculate your recommended daily calories and protein intake based on your weight
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="Enter your weight in kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-4">
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
          
          <div className="space-y-2">
            <Label>Activity Level</Label>
            <RadioGroup value={activityLevel} onValueChange={setActivityLevel} className="space-y-1">
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
          
          <Button onClick={calculateNutrients} className="w-full">Calculate</Button>
          
          {results && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <h4 className="font-medium text-lg mb-2">Results</h4>
              <div className="space-y-2">
                <p><span className="font-medium">Daily Calories:</span> {results.calories} kcal</p>
                <p><span className="font-medium">Daily Protein:</span> {results.protein}g</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Note: These are estimates based on your weight and activity level. Consult a healthcare professional for personalized advice.
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
