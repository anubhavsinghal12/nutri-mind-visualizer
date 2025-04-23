
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Calculator, Weight, Height } from "lucide-react";

export const NutrientCalculator = () => {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState<string>("moderate");
  const [gender, setGender] = useState<string>("male");
  const [age, setAge] = useState<string>("");
  const [goalMultiplier, setGoalMultiplier] = useState<number>(100);
  const [results, setResults] = useState<{
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  } | null>(null);

  const calculateNutrients = () => {
    if (!weight || !height || !age || isNaN(Number(weight)) || isNaN(Number(height)) || isNaN(Number(age))) return;
    
    const weightNum = Number(weight);
    const heightNum = Number(height);
    const ageNum = Number(age);
    
    // Activity level multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };
    
    // BMR calculation using Mifflin-St Jeor Equation
    let bmr;
    if (gender === "male") {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }
    
    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers];
    
    // Apply goal multiplier (percentage)
    const calories = Math.round(tdee * (goalMultiplier / 100));
    
    // Macronutrient calculations
    // Protein: 1.6-2.2g per kg for active individuals
    const protein = Math.round(weightNum * (activityLevel === "sedentary" ? 1.6 : 2.2));
    
    // Fat: 25% of total calories
    const fat = Math.round((calories * 0.25) / 9);
    
    // Remaining calories from carbs
    const carbCalories = calories - (protein * 4) - (fat * 9);
    const carbs = Math.round(carbCalories / 4);
    
    setResults({ calories, protein, carbs, fat });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Advanced Nutrition Calculator
        </CardTitle>
        <CardDescription>
          Calculate your recommended daily nutrition based on your body metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="height" className="flex items-center gap-2">
                <Height className="h-4 w-4" />
                Height (cm)
              </Label>
              <Input
                id="height"
                type="number"
                placeholder="Enter your height in cm"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
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
              onChange={(e) => setAge(e.target.value)}
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

          <div className="space-y-2">
            <Label>Nutrition Goal ({goalMultiplier}% of maintenance)</Label>
            <Slider
              value={[goalMultiplier]}
              onValueChange={(values) => setGoalMultiplier(values[0])}
              min={70}
              max={130}
              step={5}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground mt-1">
              {goalMultiplier < 100 ? "Caloric deficit" : goalMultiplier > 100 ? "Caloric surplus" : "Maintenance"}
            </div>
          </div>
          
          <Button onClick={calculateNutrients} className="w-full">Calculate</Button>
          
          {results && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <h4 className="font-medium text-lg mb-2">Your Custom Nutrition Plan</h4>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span className="font-medium">Daily Calories:</span>
                  <span>{results.calories} kcal</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Daily Protein:</span>
                  <span>{results.protein}g</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Daily Carbs:</span>
                  <span>{results.carbs}g</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Daily Fat:</span>
                  <span>{results.fat}g</span>
                </p>
                <div className="text-xs text-muted-foreground mt-2 space-y-1">
                  <p>* Based on Mifflin-St Jeor equation for BMR calculation</p>
                  <p>* Protein recommendations based on activity level and body weight</p>
                  <p>* Consult a healthcare professional for personalized advice</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

