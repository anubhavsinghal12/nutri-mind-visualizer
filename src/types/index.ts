
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface NutrientData {
  name: string;
  actual: number;
  recommended: number;
  unit: string;
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  servingSize: string;
  quantity: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  timestamp: Date;
}

export interface NutritionSummary {
  calories: NutrientData;
  protein: NutrientData;
  carbs: NutrientData;
  fat: NutrientData;
  fiber: NutrientData;
  sugar: NutrientData;
  sodium: NutrientData;
}

export interface DailyNutrition {
  date: string;
  summary: NutritionSummary;
  meals: {
    breakfast: FoodItem[];
    lunch: FoodItem[];
    dinner: FoodItem[];
    snack: FoodItem[];
  };
}

export interface Recommendation {
  id: string;
  type: 'improvement' | 'warning' | 'positive';
  message: string;
  nutrient?: string;
}
