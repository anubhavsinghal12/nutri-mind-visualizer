
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { FoodData } from "@/data/sampleFoods";

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
  return (
    <div className="space-y-2">
      <Label htmlFor="food">Food Item</Label>
      <Command className="rounded-lg border shadow-md">
        <CommandInput 
          placeholder="Search for a food..."
          value={searchValue}
          onValueChange={onSearchChange}
        />
        <CommandEmpty>No food found.</CommandEmpty>
        <CommandGroup className="max-h-64 overflow-y-auto">
          {foods
            .filter(food => 
              food.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((food) => (
              <CommandItem
                key={food.name}
                value={food.name}
                onSelect={(value) => onFoodSelect(value)}
              >
                {food.name}
              </CommandItem>
            ))}
        </CommandGroup>
      </Command>
    </div>
  );
};
