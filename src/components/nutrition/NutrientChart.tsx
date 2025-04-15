
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { NutrientData } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NutrientChartProps {
  nutrientData: NutrientData;
  color: string;
  secondaryColor: string;
}

export const NutrientChart = ({ nutrientData, color, secondaryColor }: NutrientChartProps) => {
  const { name, actual, recommended, unit } = nutrientData;
  
  // Calculate remaining amount (cap at 0 to handle excess)
  const remaining = Math.max(0, recommended - actual);
  
  // Calculate percentage
  const percentage = Math.min(100, Math.round((actual / recommended) * 100));
  
  // Data for pie chart
  const data = [
    { name: "Consumed", value: actual },
    { name: "Remaining", value: remaining }
  ];
  
  // Colors for the chart
  const COLORS = [color, secondaryColor];
  
  return (
    <Card className="h-full">
      <CardHeader className="py-4">
        <CardTitle className="text-lg font-medium">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="w-full h-32 sm:h-40 md:h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={60}
                innerRadius={40}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `${value} ${unit}`}
                contentStyle={{ borderRadius: '8px' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-center">
          <p className="text-2xl font-bold">{percentage}%</p>
          <p className="text-sm text-muted-foreground">
            {actual} / {recommended} {unit}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
