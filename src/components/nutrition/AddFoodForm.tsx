
import { useState, useEffect } from "react";
import { useNutrition } from "@/contexts/NutritionContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { FoodSearch } from "./FoodSearch";
import { MealTypeSelect } from "./MealTypeSelect";
import { SAMPLE_FOODS, FoodData } from "@/data/sampleFoods";

export const AddFoodForm = () => {
  const { addFoodItem } = useNutrition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [mealType, setMealType] = useState<"breakfast" | "lunch" | "dinner" | "snack">("breakfast");
  const [searchValue, setSearchValue] = useState("");
  const [selectedFoodData, setSelectedFoodData] = useState<FoodData | null>(null);
  
  // Update selected food data when food is selected
  useEffect(() => {
    const foodData = SAMPLE_FOODS.find(food => food.name === selectedFood);
    setSelectedFoodData(foodData || null);
  }, [selectedFood]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFoodData) {
      toast.error("Please select a food from the list");
      return;
    }
    
    addFoodItem({
      ...selectedFoodData,
      quantity,
      mealType
    });
    
    toast.success("Food added to your log");
    
    // Reset form
    setSelectedFood("");
    setQuantity(1);
    setSearchValue("");
    setSelectedFoodData(null);
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
          <FoodSearch
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onFoodSelect={(value) => {
              setSelectedFood(value);
              setSearchValue(value);
            }}
            foods={SAMPLE_FOODS}
          />
          
          {selectedFoodData && (
            <div className="rounded-md border p-3 bg-muted/30">
              <h4 className="font-medium">{selectedFoodData.name}</h4>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                <div>Calories: {selectedFoodData.calories} kcal</div>
                <div>Protein: {selectedFoodData.protein}g</div>
                <div>Carbs: {selectedFoodData.carbs}g</div>
                <div>Fat: {selectedFoodData.fat}g</div>
                <div>Serving: {selectedFoodData.servingSize}</div>
              </div>
            </div>
          )}
          
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
          
          <MealTypeSelect
            value={mealType}
            onChange={setMealType}
          />
          
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
