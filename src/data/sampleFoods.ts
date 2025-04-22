export interface FoodData {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  servingSize: string;
}

export const SAMPLE_FOODS: FoodData[] = [
  {
    name: "Apple",
    calories: 95,
    protein: 0.5,
    carbs: 25,
    fat: 0.3,
    fiber: 4.4,
    sugar: 19,
    sodium: 2,
    servingSize: "1 medium (182g)"
  },
  {
    name: "Banana",
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fat: 0.4,
    fiber: 3.1,
    sugar: 14,
    sodium: 1,
    servingSize: "1 medium (118g)"
  },
  {
    name: "Chicken Breast",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    sugar: 0,
    sodium: 74,
    servingSize: "100g"
  },
  {
    name: "Brown Rice",
    calories: 112,
    protein: 2.6,
    carbs: 24,
    fat: 0.9,
    fiber: 1.8,
    sugar: 0.4,
    sodium: 5,
    servingSize: "1/2 cup cooked (100g)"
  },
  {
    name: "Egg",
    calories: 72,
    protein: 6.3,
    carbs: 0.4,
    fat: 5,
    fiber: 0,
    sugar: 0.2,
    sodium: 71,
    servingSize: "1 large (50g)"
  },
  {
    name: "Salmon",
    calories: 206,
    protein: 22,
    carbs: 0,
    fat: 13,
    fiber: 0,
    sugar: 0,
    sodium: 59,
    servingSize: "100g"
  },
  {
    name: "Avocado",
    calories: 240,
    protein: 3,
    carbs: 12,
    fat: 22,
    fiber: 10,
    sugar: 1,
    sodium: 10,
    servingSize: "1 whole (150g)"
  },
  {
    name: "Greek Yogurt",
    calories: 100,
    protein: 17,
    carbs: 6,
    fat: 0.4,
    fiber: 0,
    sugar: 6,
    sodium: 36,
    servingSize: "6oz (170g)"
  },
  {
    name: "Sweet Potato",
    calories: 103,
    protein: 2,
    carbs: 24,
    fat: 0.2,
    fiber: 3.8,
    sugar: 6.5,
    sodium: 41,
    servingSize: "1 medium (130g)"
  },
  {
    name: "Quinoa",
    calories: 120,
    protein: 4.4,
    carbs: 21.3,
    fat: 1.9,
    fiber: 2.8,
    sugar: 0.9,
    sodium: 7,
    servingSize: "1/2 cup cooked (100g)"
  },
  {
    name: "Almonds",
    calories: 164,
    protein: 6,
    carbs: 6,
    fat: 14,
    fiber: 3.5,
    sugar: 1.2,
    sodium: 1,
    servingSize: "1 oz (28g)"
  },
  {
    name: "Spinach",
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    fiber: 2.2,
    sugar: 0.4,
    sodium: 79,
    servingSize: "100g"
  },
  {
    name: "Broccoli",
    calories: 34,
    protein: 2.8,
    carbs: 6.6,
    fat: 0.4,
    fiber: 2.6,
    sugar: 1.7,
    sodium: 33,
    servingSize: "100g"
  },
  {
    name: "Carrot",
    calories: 41,
    protein: 0.9,
    carbs: 9.6,
    fat: 0.2,
    fiber: 2.8,
    sugar: 4.7,
    sodium: 69,
    servingSize: "100g"
  },
  {
    name: "Tomato",
    calories: 18,
    protein: 0.9,
    carbs: 3.9,
    fat: 0.2,
    fiber: 1.2,
    sugar: 2.6,
    sodium: 5,
    servingSize: "100g (1 medium)"
  },
  {
    name: "White Bread",
    calories: 265,
    protein: 8.2,
    carbs: 49.2,
    fat: 3.2,
    fiber: 2.7,
    sugar: 5.1,
    sodium: 480,
    servingSize: "100g (2 slices)"
  },
  {
    name: "Whole Wheat Bread",
    calories: 247,
    protein: 13.0,
    carbs: 41.3,
    fat: 3.6,
    fiber: 6.8,
    sugar: 5.6,
    sodium: 540,
    servingSize: "100g (2 slices)"
  },
  {
    name: "Peanut Butter",
    calories: 588,
    protein: 25.1,
    carbs: 20.0,
    fat: 49.9,
    fiber: 5.9,
    sugar: 9.2,
    sodium: 426,
    servingSize: "100g"
  },
  {
    name: "Olive Oil",
    calories: 884,
    protein: 0,
    carbs: 0,
    fat: 100,
    fiber: 0,
    sugar: 0,
    sodium: 2,
    servingSize: "100g (7 tbsp)"
  },
  {
    name: "Black Beans",
    calories: 132,
    protein: 8.9,
    carbs: 23.7,
    fat: 0.5,
    fiber: 8.7,
    sugar: 0.3,
    sodium: 1,
    servingSize: "100g (cooked)"
  },
  {
    name: "Lentils",
    calories: 116,
    protein: 9.0,
    carbs: 20.1,
    fat: 0.4,
    fiber: 7.9,
    sugar: 1.8,
    sodium: 2,
    servingSize: "100g (cooked)"
  },
  {
    name: "Cow's Milk (whole)",
    calories: 61,
    protein: 3.2,
    carbs: 4.8,
    fat: 3.3,
    fiber: 0,
    sugar: 5.1,
    sodium: 44,
    servingSize: "100g (100ml)"
  },
  {
    name: "Almond Milk",
    calories: 15,
    protein: 0.5,
    carbs: 0.7,
    fat: 1.1,
    fiber: 0.5,
    sugar: 0.2,
    sodium: 5,
    servingSize: "100g (100ml)"
  },
  {
    name: "Cheddar Cheese",
    calories: 403,
    protein: 24.9,
    carbs: 1.3,
    fat: 33.1,
    fiber: 0,
    sugar: 0.1,
    sodium: 621,
    servingSize: "100g"
  },
  {
    name: "Blueberries",
    calories: 57,
    protein: 0.7,
    carbs: 14.5,
    fat: 0.3,
    fiber: 2.4,
    sugar: 10.0,
    sodium: 1,
    servingSize: "100g"
  },
  {
    name: "Strawberries",
    calories: 32,
    protein: 0.7,
    carbs: 7.7,
    fat: 0.3,
    fiber: 2.0,
    sugar: 4.9,
    sodium: 1,
    servingSize: "100g"
  }
];
