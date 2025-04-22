
import { useState } from "react";
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
import { SAMPLE_FOODS } from "@/data/sampleFoods";

export const AddFoodForm = () => {
  const { addFoodItem } = useNutrition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [mealType, setMealType] = useState<"breakfast" | "lunch" | "dinner" | "snack">("breakfast");
  const [searchValue, setSearchValue] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const foodData = SAMPLE_FOODS.find(food => food.name === selectedFood);
    
    if (!foodData) {
      toast.error("Please select a food from the list");
      return;
    }
    
    addFoodItem({
      ...foodData,
      quantity,
      mealType
    });
    
    toast.success("Food added to your log");
    
    setSelectedFood("");
    setQuantity(1);
    setSearchValue("");
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
