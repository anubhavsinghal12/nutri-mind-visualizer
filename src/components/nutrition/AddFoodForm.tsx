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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Plus } from "lucide-react";
import { toast } from "sonner";

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
  }
];

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
          <div className="space-y-2">
            <Label htmlFor="food">Food Item</Label>
            <Command className="rounded-lg border shadow-md">
              <CommandInput 
                placeholder="Search for a food..."
                value={searchValue}
                onValueChange={setSearchValue}
              />
              <CommandEmpty>No food found.</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-y-auto">
                {SAMPLE_FOODS
                  .filter(food => 
                    food.name.toLowerCase().includes(searchValue.toLowerCase())
                  )
                  .map((food) => (
                    <CommandItem
                      key={food.name}
                      value={food.name}
                      onSelect={(value) => {
                        setSelectedFood(value);
                        setSearchValue(value);
                      }}
                    >
                      {food.name}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </Command>
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
            <Select
              value={mealType}
              onValueChange={(value) => 
                setMealType(value as "breakfast" | "lunch" | "dinner" | "snack")
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
              </SelectContent>
            </Select>
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
