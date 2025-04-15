
import { useNutrition } from "@/contexts/NutritionContext";
import { FoodLogTable } from "@/components/nutrition/FoodLogTable";
import { AddFoodForm } from "@/components/nutrition/AddFoodForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Utensils } from "lucide-react";

const FoodLog = () => {
  const { dailyNutrition, removeFoodItem, loading } = useNutrition();

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
          <h1 className="text-3xl font-bold">Food Log</h1>
          <p className="text-muted-foreground">
            Track and manage your daily food intake
          </p>
        </div>
        <AddFoodForm />
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Utensils className="h-5 w-5 text-primary" />
            Today's Meals
          </CardTitle>
          <CardDescription>
            View and manage what you've eaten today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Meals</TabsTrigger>
              <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
              <TabsTrigger value="lunch">Lunch</TabsTrigger>
              <TabsTrigger value="dinner">Dinner</TabsTrigger>
              <TabsTrigger value="snack">Snacks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Breakfast</h3>
                  <FoodLogTable 
                    foods={dailyNutrition.meals.breakfast} 
                    onRemove={removeFoodItem}
                    mealType="breakfast"
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Lunch</h3>
                  <FoodLogTable 
                    foods={dailyNutrition.meals.lunch} 
                    onRemove={removeFoodItem}
                    mealType="lunch"
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Dinner</h3>
                  <FoodLogTable 
                    foods={dailyNutrition.meals.dinner} 
                    onRemove={removeFoodItem}
                    mealType="dinner"
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Snacks</h3>
                  <FoodLogTable 
                    foods={dailyNutrition.meals.snack} 
                    onRemove={removeFoodItem}
                    mealType="snack"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="breakfast">
              <FoodLogTable 
                foods={dailyNutrition.meals.breakfast} 
                onRemove={removeFoodItem}
                mealType="breakfast"
              />
            </TabsContent>
            
            <TabsContent value="lunch">
              <FoodLogTable 
                foods={dailyNutrition.meals.lunch} 
                onRemove={removeFoodItem}
                mealType="lunch"
              />
            </TabsContent>
            
            <TabsContent value="dinner">
              <FoodLogTable 
                foods={dailyNutrition.meals.dinner} 
                onRemove={removeFoodItem}
                mealType="dinner"
              />
            </TabsContent>
            
            <TabsContent value="snack">
              <FoodLogTable 
                foods={dailyNutrition.meals.snack} 
                onRemove={removeFoodItem}
                mealType="snack"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FoodLog;
