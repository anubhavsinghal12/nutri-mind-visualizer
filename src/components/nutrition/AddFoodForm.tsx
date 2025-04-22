
import { useState } from "react";
import { useNutrition } from "@/contexts/NutritionContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { toast } from "sonner";

// Sample food database (in a real app, this would come from an API)
const SAMPLE_FOODS = [
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
  {"name": "Chapati", "calories": 104, "protein": 3.5, "carbs": 18, "fat": 3, "fiber": 2.5, "sugar": 0.2, "sodium": 120, "servingSize": "1 medium (40g)"},
  {"name": "Paneer", "calories": 265, "protein": 18, "carbs": 1.2, "fat": 21, "fiber": 0, "sugar": 0.5, "sodium": 22, "servingSize": "100g"},
  {"name": "Dal Tadka", "calories": 180, "protein": 9, "carbs": 23, "fat": 6, "fiber": 4, "sugar": 2, "sodium": 300, "servingSize": "1 cup (200g)"},
  {"name": "Rajma", "calories": 210, "protein": 13, "carbs": 36, "fat": 1, "fiber": 9, "sugar": 2.2, "sodium": 140, "servingSize": "1 cup (200g)"},
  {"name": "Chole", "calories": 230, "protein": 12, "carbs": 30, "fat": 7, "fiber": 8, "sugar": 3, "sodium": 160, "servingSize": "1 cup (200g)"},
  {"name": "Idli", "calories": 58, "protein": 1.6, "carbs": 12, "fat": 0.4, "fiber": 0.8, "sugar": 0.1, "sodium": 80, "servingSize": "1 piece (40g)"},
  {"name": "Dosa", "calories": 133, "protein": 2.7, "carbs": 18, "fat": 5, "fiber": 1, "sugar": 0.2, "sodium": 130, "servingSize": "1 medium (60g)"},
  {"name": "Sambar", "calories": 150, "protein": 6, "carbs": 20, "fat": 4, "fiber": 3, "sugar": 3, "sodium": 250, "servingSize": "1 cup (200g)"},
  {"name": "Poha", "calories": 206, "protein": 4, "carbs": 32, "fat": 6, "fiber": 2.5, "sugar": 1.2, "sodium": 210, "servingSize": "1 cup (150g)"},
  {"name": "Upma", "calories": 220, "protein": 5, "carbs": 35, "fat": 7, "fiber": 2, "sugar": 1, "sodium": 190, "servingSize": "1 cup (150g)"},
  {"name": "Aloo Paratha", "calories": 290, "protein": 6, "carbs": 45, "fat": 10, "fiber": 4, "sugar": 2, "sodium": 230, "servingSize": "1 piece (100g)"},
  {"name": "Pulao", "calories": 250, "protein": 5, "carbs": 35, "fat": 9, "fiber": 2, "sugar": 1, "sodium": 200, "servingSize": "1 cup (200g)"},
  {"name": "Kadhi", "calories": 120, "protein": 6, "carbs": 10, "fat": 6, "fiber": 1, "sugar": 3, "sodium": 300, "servingSize": "1 cup (200g)"},
  {"name": "Vegetable Curry", "calories": 180, "protein": 4, "carbs": 20, "fat": 9, "fiber": 3, "sugar": 4, "sodium": 240, "servingSize": "1 cup (200g)"},
  {"name": "Bhindi Fry", "calories": 140, "protein": 2, "carbs": 10, "fat": 10, "fiber": 4, "sugar": 3, "sodium": 180, "servingSize": "1 cup (150g)"},
  {"name": "Tinda Sabzi", "calories": 110, "protein": 2, "carbs": 10, "fat": 7, "fiber": 3, "sugar": 2, "sodium": 150, "servingSize": "1 cup (150g)"},
  {"name": "Lauki Sabzi", "calories": 90, "protein": 2, "carbs": 8, "fat": 5, "fiber": 2, "sugar": 2, "sodium": 160, "servingSize": "1 cup (150g)"},
  {"name": "Mixed Vegetable", "calories": 160, "protein": 4, "carbs": 18, "fat": 8, "fiber": 4, "sugar": 3, "sodium": 220, "servingSize": "1 cup (200g)"},
  {"name": "Kheer", "calories": 210, "protein": 5, "carbs": 30, "fat": 8, "fiber": 0.5, "sugar": 18, "sodium": 120, "servingSize": "1 cup (150g)"},
  {"name": "Halwa", "calories": 250, "protein": 4, "carbs": 38, "fat": 10, "fiber": 1, "sugar": 25, "sodium": 100, "servingSize": "1 piece (100g)"},
  {"name": "Mango", "calories": 99, "protein": 1.4, "carbs": 25, "fat": 0.6, "fiber": 2.6, "sugar": 23, "sodium": 2, "servingSize": "1 medium (200g)"},
    {"name": "Guava", "calories": 68, "protein": 2.6, "carbs": 14, "fat": 1, "fiber": 5.4, "sugar": 9, "sodium": 2, "servingSize": "1 medium (150g)"},
    {"name": "Papaya", "calories": 59, "protein": 0.9, "carbs": 15, "fat": 0.4, "fiber": 2.5, "sugar": 11, "sodium": 4, "servingSize": "1 cup (140g)"},
    {"name": "Orange", "calories": 62, "protein": 1.2, "carbs": 15.4, "fat": 0.2, "fiber": 3.1, "sugar": 12.2, "sodium": 0, "servingSize": "1 medium (131g)"},
    {"name": "Pomegranate", "calories": 83, "protein": 1.7, "carbs": 19, "fat": 1.2, "fiber": 4, "sugar": 14, "sodium": 3, "servingSize": "1/2 cup (87g)"}
];

export const AddFoodForm = () => {
  const { addFoodItem } = useNutrition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState("");
  const [filteredFoods, setFilteredFoods] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [mealType, setMealType] = useState<"breakfast" | "lunch" | "dinner" | "snack">("breakfast");

  const handleInputChange = (value: string) => {
    setSelectedFood(value);

    const suggestions = SAMPLE_FOODS
      .map((f) => f.name)
      .filter((name) =>
        name.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 5); // max 5 suggestions

    setFilteredFoods(suggestions);
  };

  const handleSuggestionClick = (value: string) => {
    setSelectedFood(value);
    setFilteredFoods([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const foodData = SAMPLE_FOODS.find(food => food.name.toLowerCase() === selectedFood.toLowerCase());
    
    if (!foodData) {
      toast.error("Please select a valid food item from the list");
      return;
    }
    
    addFoodItem({
      ...foodData,
      quantity,
      mealType
    });
    
    toast.success("Food added to your log");

    // Reset form
    setSelectedFood("");
    setFilteredFoods([]);
    setQuantity(1);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Food
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Food to Log</DialogTitle>
          <DialogDescription>
            Select a food item and specify the quantity and meal type.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2 relative">
            <Label htmlFor="food">Food Item</Label>
            <Input
              id="food"
              value={selectedFood}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Start typing a food..."
              autoComplete="off"
              required
            />
            {filteredFoods.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow">
                {filteredFoods.map((item) => (
                  <div
                    key={item}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="0.5"
              step="0.5"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mealType">Meal Type</Label>
            <Input
              id="mealType"
              value={mealType}
              onChange={(e) =>
                setMealType(
                  e.target.value as "breakfast" | "lunch" | "dinner" | "snack"
                )
              }
              list="meal-types"
              required
            />
            <datalist id="meal-types">
              <option value="breakfast" />
              <option value="lunch" />
              <option value="dinner" />
              <option value="snack" />
            </datalist>
          </div>

          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Food</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};