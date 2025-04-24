
interface NutritionResultsProps {
  results: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  } | null;
}

export const NutritionResults = ({ results }: NutritionResultsProps) => {
  if (!results) return null;

  return (
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
  );
};
