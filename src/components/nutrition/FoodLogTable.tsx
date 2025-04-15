
import { FoodItem } from "@/types";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface FoodLogTableProps {
  foods: FoodItem[];
  onRemove: (id: string) => void;
  mealType: string;
}

export const FoodLogTable = ({ foods, onRemove, mealType }: FoodLogTableProps) => {
  if (foods.length === 0) {
    return (
      <div className="text-center p-4 border rounded-md bg-gray-50">
        <p className="text-muted-foreground">No food items logged for {mealType}.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Food</TableHead>
            <TableHead className="hidden md:table-cell">Quantity</TableHead>
            <TableHead className="hidden md:table-cell">Serving Size</TableHead>
            <TableHead>Calories</TableHead>
            <TableHead className="hidden lg:table-cell">Protein</TableHead>
            <TableHead className="hidden lg:table-cell">Carbs</TableHead>
            <TableHead className="hidden lg:table-cell">Fat</TableHead>
            <TableHead className="hidden sm:table-cell">Added</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {foods.map((food) => (
            <TableRow key={food.id}>
              <TableCell className="font-medium">{food.name}</TableCell>
              <TableCell className="hidden md:table-cell">{food.quantity}</TableCell>
              <TableCell className="hidden md:table-cell">{food.servingSize}</TableCell>
              <TableCell>{food.calories * food.quantity} kcal</TableCell>
              <TableCell className="hidden lg:table-cell">{food.protein * food.quantity}g</TableCell>
              <TableCell className="hidden lg:table-cell">{food.carbs * food.quantity}g</TableCell>
              <TableCell className="hidden lg:table-cell">{food.fat * food.quantity}g</TableCell>
              <TableCell className="hidden sm:table-cell">
                {formatDistanceToNow(food.timestamp, { addSuffix: true })}
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onRemove(food.id)}
                  aria-label="Remove food item"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
