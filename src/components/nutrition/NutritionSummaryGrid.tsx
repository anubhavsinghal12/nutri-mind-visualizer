
import { NutritionSummary } from "@/types";
import { NutrientChart } from "./NutrientChart";

interface NutritionSummaryGridProps {
  summary: NutritionSummary;
}

export const NutritionSummaryGrid = ({ summary }: NutritionSummaryGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <NutrientChart
        nutrientData={summary.calories}
        color="#4ade80"
        secondaryColor="#d1fae5"
      />
      <NutrientChart
        nutrientData={summary.protein}
        color="#8b5cf6"
        secondaryColor="#e5ddff"
      />
      <NutrientChart
        nutrientData={summary.carbs}
        color="#fb923c"
        secondaryColor="#ffedd5"
      />
      <NutrientChart
        nutrientData={summary.fat}
        color="#60a5fa"
        secondaryColor="#dbeafe"
      />
      <NutrientChart
        nutrientData={summary.fiber}
        color="#a3e635"
        secondaryColor="#ecfccb"
      />
      <NutrientChart
        nutrientData={summary.sugar}
        color="#f43f5e"
        secondaryColor="#ffe4e6"
      />
      <NutrientChart
        nutrientData={summary.sodium}
        color="#facc15"
        secondaryColor="#fef9c3"
      />
    </div>
  );
};
