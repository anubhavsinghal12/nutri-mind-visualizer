
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { FoodData } from "@/data/sampleFoods";
import { useState, useEffect } from "react";

interface FoodSearchProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onFoodSelect: (foodName: string) => void;
  foods: FoodData[];
}

export const FoodSearch = ({
  searchValue,
  onSearchChange,
  onFoodSelect,
  foods
}: FoodSearchProps) => {
  const [filteredFoods, setFilteredFoods] = useState<FoodData[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Filter foods based on search value
    const filtered = foods.filter(food => 
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredFoods(filtered);
  }, [searchValue, foods]);

  return (
    <div className="space-y-2">
      <Label htmlFor="food">Food Item</Label>
      <div className="relative">
        <Command className="rounded-lg border shadow-md">
          <CommandInput 
            placeholder="Search for a food..."
            value={searchValue}
            onValueChange={onSearchChange}
          />
          <CommandEmpty>No food found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-y-auto">
            {filteredFoods.map((food) => (
              <CommandItem
                key={food.name}
                value={food.name}
                onSelect={(value) => {
                  onFoodSelect(value);
                  setOpen(false);
                }}
                className="flex flex-col items-start py-2"
              >
                <div className="font-medium">{food.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  <span className="font-semibold">{food.calories} kcal</span> • 
                  <span className="ml-1">P: {food.protein}g</span> • 
                  <span className="ml-1">C: {food.carbs}g</span> • 
                  <span className="ml-1">F: {food.fat}g</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {food.servingSize}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </div>
    </div>
  );
};
