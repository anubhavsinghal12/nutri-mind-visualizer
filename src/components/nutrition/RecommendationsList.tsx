
import { Recommendation } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Zap } from "lucide-react";

interface RecommendationsListProps {
  recommendations: Recommendation[];
}

export const RecommendationsList = ({ recommendations }: RecommendationsListProps) => {
  if (recommendations.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            Log your meals to get  recommendations.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {recommendations.map((recommendation) => (
        <Card 
          key={recommendation.id}
          className={`border-l-4 ${
            recommendation.type === "improvement" 
              ? "border-l-blue-500" 
              : recommendation.type === "warning" 
                ? "border-l-amber-500" 
                : "border-l-green-500"
          }`}
        >
          <CardContent className="p-4 flex items-start gap-3">
            {recommendation.type === "improvement" ? (
              <Zap className="h-6 w-6 text-blue-500 shrink-0" />
            ) : recommendation.type === "warning" ? (
              <AlertTriangle className="h-6 w-6 text-amber-500 shrink-0" />
            ) : (
              <CheckCircle className="h-6 w-6 text-green-500 shrink-0" />
            )}
            <div>
              <p className="text-sm font-medium">
                {recommendation.message}
              </p>
              {recommendation.nutrient && (
                <p className="text-xs text-muted-foreground mt-1">
                  Focus nutrient: {recommendation.nutrient}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
