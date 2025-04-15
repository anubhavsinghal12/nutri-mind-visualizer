
import { useNutrition } from "@/contexts/NutritionContext";
import { NutritionSummaryGrid } from "@/components/nutrition/NutritionSummaryGrid";
import { RecommendationsList } from "@/components/nutrition/RecommendationsList";
import { AddFoodForm } from "@/components/nutrition/AddFoodForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Brain, BrainCircuit, ChevronRight, Utensils } from "lucide-react";

const Dashboard = () => {
  const { dailyNutrition, recommendations, loading } = useNutrition();

  if (loading) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!dailyNutrition) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">No nutrition data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Nutrition Dashboard</h1>
          <p className="text-muted-foreground">
            Your daily nutrition summary and AI recommendations
          </p>
        </div>
        <AddFoodForm />
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Utensils className="h-5 w-5 text-primary" />
                Nutrition Summary
              </CardTitle>
              <CardDescription>
                Your daily nutrient intake compared to recommended values
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="charts" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="charts">Charts</TabsTrigger>
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                </TabsList>
                <TabsContent value="charts">
                  <NutritionSummaryGrid summary={dailyNutrition.summary} />
                </TabsContent>
                <TabsContent value="summary">
                  <div className="space-y-4">
                    {Object.entries(dailyNutrition.summary).map(([key, nutrient]) => (
                      <div key={key} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{nutrient.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {nutrient.actual} / {nutrient.recommended} {nutrient.unit}
                          </p>
                        </div>
                        <div className="w-32">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-primary h-2.5 rounded-full"
                              style={{ width: `${Math.min(100, (nutrient.actual / nutrient.recommended) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Utensils className="h-5 w-5 text-primary" />
                Today's Meals
              </CardTitle>
              <CardDescription>
                A summary of what you've eaten today
              </CardDescription>
            </CardHeader>
            <CardContent>
              {dailyNutrition && (
                <>
                  {Object.entries(dailyNutrition.meals).map(([mealType, foods]) => (
                    <div key={mealType} className="mb-4 last:mb-0">
                      <h3 className="text-lg font-medium capitalize mb-2">{mealType}</h3>
                      {foods.length > 0 ? (
                        <ul className="space-y-1">
                          {foods.map((food) => (
                            <li key={food.id} className="flex justify-between border-b pb-1 text-sm">
                              <span>{food.name} ({food.quantity} × {food.servingSize})</span>
                              <span className="font-medium">{food.calories * food.quantity} kcal</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">No food logged</p>
                      )}
                    </div>
                  ))}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-secondary" />
                AI Recommendations
              </CardTitle>
              <CardDescription>
                Personalized insights based on your nutrition data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecommendationsList recommendations={recommendations} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                <Brain className="h-5 w-5 text-secondary" />
                AI Nutrient Insight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-secondary/10 rounded-md border border-secondary/20">
                <p className="text-sm text-secondary-foreground">
                  Based on your current nutrient intake, NutriMind AI suggests focusing on 
                  increasing protein-rich foods and reducing sodium content in your next meals.
                </p>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2 text-sm">Suggested foods to add:</h4>
                <ul className="space-y-2">
                  <li className="text-sm flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    Greek yogurt (high protein, low sodium)
                  </li>
                  <li className="text-sm flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    Lentils (fiber and protein rich)
                  </li>
                  <li className="text-sm flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    Fresh berries (antioxidants, low sugar)
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
