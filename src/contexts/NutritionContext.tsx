
import React, { createContext, useContext, useState, useEffect } from "react";
import { FoodItem, DailyNutrition, NutritionSummary, Recommendation } from "@/types";
import { useAuth } from "./AuthContext";

interface NutritionContextType {
  dailyNutrition: DailyNutrition | null;
  recommendations: Recommendation[];
  addFoodItem: (item: Omit<FoodItem, "id" | "timestamp">) => void;
  removeFoodItem: (id: string) => void;
  loading: boolean;
}

const NutritionContext = createContext<NutritionContextType | undefined>(undefined);

// Default recommended values (simplified)
const DEFAULT_RECOMMENDATIONS = {
  calories: { name: "Calories", actual: 0, recommended: 2000, unit: "kcal" },
  protein: { name: "Protein", actual: 0, recommended: 50, unit: "g" },
  carbs: { name: "Carbohydrates", actual: 0, recommended: 275, unit: "g" },
  fat: { name: "Fat", actual: 0, recommended: 78, unit: "g" },
  fiber: { name: "Fiber", actual: 0, recommended: 28, unit: "g" },
  sugar: { name: "Sugar", actual: 0, recommended: 50, unit: "g" },
  sodium: { name: "Sodium", actual: 0, recommended: 2300, unit: "mg" }
};

export const NutritionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [dailyNutrition, setDailyNutrition] = useState<DailyNutrition | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize or load saved data when user changes
  useEffect(() => {
    if (user) {
      const savedData = localStorage.getItem(`nutrimind-nutrition-${user.id}`);
      
      if (savedData) {
        // Convert stored string dates back to Date objects for food items
        const parsed = JSON.parse(savedData);
        parsed.meals.breakfast.forEach((item: any) => item.timestamp = new Date(item.timestamp));
        parsed.meals.lunch.forEach((item: any) => item.timestamp = new Date(item.timestamp));
        parsed.meals.dinner.forEach((item: any) => item.timestamp = new Date(item.timestamp));
        parsed.meals.snack.forEach((item: any) => item.timestamp = new Date(item.timestamp));
        
        setDailyNutrition(parsed);
      } else {
        // Initialize with empty data
        const today = new Date().toISOString().split('T')[0];
        setDailyNutrition({
          date: today,
          summary: { ...DEFAULT_RECOMMENDATIONS },
          meals: {
            breakfast: [],
            lunch: [],
            dinner: [],
            snack: []
          }
        });
      }
      
      // Generate initial recommendations
      generateRecommendations();
      setLoading(false);
    } else {
      setDailyNutrition(null);
      setRecommendations([]);
    }
  }, [user]);

  // Save data when it changes
  useEffect(() => {
    if (user && dailyNutrition) {
      localStorage.setItem(`nutrimind-nutrition-${user.id}`, JSON.stringify(dailyNutrition));
      generateRecommendations();
    }
  }, [dailyNutrition, user]);

  const addFoodItem = (item: Omit<FoodItem, "id" | "timestamp">) => {
    if (!dailyNutrition) return;
    
    const newItem: FoodItem = {
      ...item,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date()
    };
    
    setDailyNutrition(prev => {
      if (!prev) return null;
      
      // Create a copy of the meals
      const updatedMeals = { ...prev.meals };
      // Add the new item to the appropriate meal
      updatedMeals[newItem.mealType] = [...updatedMeals[newItem.mealType], newItem];
      
      // Recalculate the summary
      const updatedSummary = calculateNutritionSummary(updatedMeals);
      
      return {
        ...prev,
        summary: updatedSummary,
        meals: updatedMeals
      };
    });
  };

  const removeFoodItem = (id: string) => {
    if (!dailyNutrition) return;
    
    setDailyNutrition(prev => {
      if (!prev) return null;
      
      // Create a copy of the meals and remove the item
      const updatedMeals = {
        breakfast: prev.meals.breakfast.filter(item => item.id !== id),
        lunch: prev.meals.lunch.filter(item => item.id !== id),
        dinner: prev.meals.dinner.filter(item => item.id !== id),
        snack: prev.meals.snack.filter(item => item.id !== id)
      };
      
      // Recalculate the summary
      const updatedSummary = calculateNutritionSummary(updatedMeals);
      
      return {
        ...prev,
        summary: updatedSummary,
        meals: updatedMeals
      };
    });
  };

  const calculateNutritionSummary = (meals: DailyNutrition["meals"]): NutritionSummary => {
    // Combine all food items
    const allItems = [
      ...meals.breakfast,
      ...meals.lunch,
      ...meals.dinner,
      ...meals.snack
    ];
    
    // Calculate totals
    const totals = {
      calories: allItems.reduce((sum, item) => sum + item.calories * item.quantity, 0),
      protein: allItems.reduce((sum, item) => sum + item.protein * item.quantity, 0),
      carbs: allItems.reduce((sum, item) => sum + item.carbs * item.quantity, 0),
      fat: allItems.reduce((sum, item) => sum + item.fat * item.quantity, 0),
      fiber: allItems.reduce((sum, item) => sum + item.fiber * item.quantity, 0),
      sugar: allItems.reduce((sum, item) => sum + item.sugar * item.quantity, 0),
      sodium: allItems.reduce((sum, item) => sum + item.sodium * item.quantity, 0)
    };
    
    // Create the summary with both actual and recommended values
    return {
      calories: { ...DEFAULT_RECOMMENDATIONS.calories, actual: totals.calories },
      protein: { ...DEFAULT_RECOMMENDATIONS.protein, actual: totals.protein },
      carbs: { ...DEFAULT_RECOMMENDATIONS.carbs, actual: totals.carbs },
      fat: { ...DEFAULT_RECOMMENDATIONS.fat, actual: totals.fat },
      fiber: { ...DEFAULT_RECOMMENDATIONS.fiber, actual: totals.fiber },
      sugar: { ...DEFAULT_RECOMMENDATIONS.sugar, actual: totals.sugar },
      sodium: { ...DEFAULT_RECOMMENDATIONS.sodium, actual: totals.sodium }
    };
  };

  const generateRecommendations = () => {
    if (!dailyNutrition) {
      setRecommendations([]);
      return;
    }

    const newRecommendations: Recommendation[] = [];
    const { summary } = dailyNutrition;

    // Check protein intake
    if (summary.protein.actual < summary.protein.recommended * 0.7) {
      newRecommendations.push({
        id: "1",
        type: "improvement",
        message: "Your protein intake is low. Consider adding lean meats, eggs, or plant-based proteins.",
        nutrient: "protein"
      });
    } else if (summary.protein.actual > summary.protein.recommended * 1.2) {
      newRecommendations.push({
        id: "2",
        type: "warning",
        message: "Your protein intake is higher than recommended. Balance with more fruits and vegetables.",
        nutrient: "protein"
      });
    }

    // Check fiber intake
    if (summary.fiber.actual < summary.fiber.recommended * 0.7) {
      newRecommendations.push({
        id: "3",
        type: "improvement",
        message: "Increase your fiber intake with whole grains, fruits, and vegetables for better digestion.",
        nutrient: "fiber"
      });
    }

    // Check sugar intake
    if (summary.sugar.actual > summary.sugar.recommended * 1.1) {
      newRecommendations.push({
        id: "4",
        type: "warning",
        message: "Your sugar intake is high. Consider reducing processed foods and sugary drinks.",
        nutrient: "sugar"
      });
    }

    // Add a positive recommendation if things look good
    if (
      summary.protein.actual >= summary.protein.recommended * 0.8 &&
      summary.protein.actual <= summary.protein.recommended * 1.2 &&
      summary.fiber.actual >= summary.fiber.recommended * 0.8 &&
      summary.sugar.actual <= summary.sugar.recommended
    ) {
      newRecommendations.push({
        id: "5",
        type: "positive",
        message: "Great job! Your nutrient balance looks good. Keep up the healthy eating!"
      });
    }

    // AI-powered insight (simulated)
    if (summary.calories.actual < summary.calories.recommended * 0.7) {
      newRecommendations.push({
        id: "6",
        type: "improvement",
        message: "Based on AI analysis, your calorie intake is below recommended levels. Consider adding nutrient-dense foods to your diet.",
        nutrient: "calories"
      });
    }

    setRecommendations(newRecommendations);
  };

  return (
    <NutritionContext.Provider
      value={{
        dailyNutrition,
        recommendations,
        addFoodItem,
        removeFoodItem,
        loading
      }}
    >
      {children}
    </NutritionContext.Provider>
  );
};

export const useNutrition = () => {
  const context = useContext(NutritionContext);
  if (context === undefined) {
    throw new Error("useNutrition must be used within a NutritionProvider");
  }
  return context;
};
