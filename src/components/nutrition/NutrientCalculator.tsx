
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { UserMetricsInput } from "./UserMetricsInput";
import { GenderSelect } from "./GenderSelect";
import { ActivityLevelSelect } from "./ActivityLevelSelect";
import { NutritionGoalSlider } from "./NutritionGoalSlider";
import { NutritionResults } from "./NutritionResults";

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
    
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };
    
    let bmr;
    if (gender === "male") {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }
    
    const tdee = bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers];
    const calories = Math.round(tdee * (goalMultiplier / 100));
    const protein = Math.round(weightNum * (activityLevel === "sedentary" ? 1.6 : 2.2));
    const fat = Math.round((calories * 0.25) / 9);
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
          <UserMetricsInput
            weight={weight}
            height={height}
            age={age}
            onWeightChange={setWeight}
            onHeightChange={setHeight}
            onAgeChange={setAge}
          />
          
          <GenderSelect
            gender={gender}
            onGenderChange={setGender}
          />
          
          <ActivityLevelSelect
            activityLevel={activityLevel}
            onActivityLevelChange={setActivityLevel}
          />

          <NutritionGoalSlider
            goalMultiplier={goalMultiplier}
            onGoalChange={(values) => setGoalMultiplier(values[0])}
          />
          
          <Button onClick={calculateNutrients} className="w-full">Calculate</Button>
          
          <NutritionResults results={results} />
        </div>
      </CardContent>
    </Card>
  );
};
