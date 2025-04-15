
import { useNutrition } from "@/contexts/NutritionContext";
import { NutritionSummaryGrid } from "@/components/nutrition/NutritionSummaryGrid";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from "recharts";
import { BarChart2, TrendingUp } from "lucide-react";

const Analysis = () => {
  const { dailyNutrition, loading } = useNutrition();

  if (loading) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!dailyNutrition) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">No nutrition data available.</p>
        </div>
      </div>
    );
  }

  // Prepare data for macronutrient distribution chart
  const macroData = [
    {
      name: "Protein",
      value: dailyNutrition.summary.protein.actual,
      percentage: Math.round(
        (dailyNutrition.summary.protein.actual * 4 / dailyNutrition.summary.calories.actual) * 100
      ),
      color: "#8b5cf6"
    },
    {
      name: "Carbs",
      value: dailyNutrition.summary.carbs.actual,
      percentage: Math.round(
        (dailyNutrition.summary.carbs.actual * 4 / dailyNutrition.summary.calories.actual) * 100
      ),
      color: "#fb923c"
    },
    {
      name: "Fat",
      value: dailyNutrition.summary.fat.actual,
      percentage: Math.round(
        (dailyNutrition.summary.fat.actual * 9 / dailyNutrition.summary.calories.actual) * 100
      ),
      color: "#60a5fa"
    }
  ];

  // Mock data for trend analysis (in a real app, this would come from historical data)
  const trendData = [
    { day: "Mon", calories: 1800, protein: 85 },
    { day: "Tue", calories: 2100, protein: 95 },
    { day: "Wed", calories: 1950, protein: 90 },
    { day: "Thu", calories: 2200, protein: 100 },
    { day: "Fri", calories: 2000, protein: 92 },
    { day: "Sat", calories: 2300, protein: 105 },
    { day: "Sun", calories: 1900, protein: 88 }
  ];

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-bold">Nutrition Analysis</h1>
        <p className="text-muted-foreground">
          In-depth analytics and insights about your nutrition
        </p>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-primary" />
              Macronutrient Distribution
            </CardTitle>
            <CardDescription>
              Breakdown of your protein, carbs, and fat intake
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={macroData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" unit="g" />
                  <YAxis yAxisId="right" orientation="right" unit="%" />
                  <Tooltip
                    formatter={(value, name, props) => {
                      const unit = props.unit || "g";
                      return [`${value} ${unit}`, name];
                    }}
                    contentStyle={{ borderRadius: '8px' }}
                  />
                  <Legend />
                  <Bar 
                    yAxisId="left" 
                    dataKey="value" 
                    name="Grams" 
                    fill="#4ade80" 
                    radius={[4, 4, 0, 0]} 
                    unit="g"
                  />
                  <Bar 
                    yAxisId="right" 
                    dataKey="percentage" 
                    name="% of Calories" 
                    fill="#8b5cf6" 
                    radius={[4, 4, 0, 0]} 
                    unit="%"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Weekly Trend Analysis
            </CardTitle>
            <CardDescription>
              Your nutrition trends over the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip contentStyle={{ borderRadius: '8px' }} />
                  <Legend />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="calories" 
                    name="Calories" 
                    stroke="#4ade80" 
                    activeDot={{ r: 8 }} 
                    unit="kcal"
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="protein" 
                    name="Protein" 
                    stroke="#8b5cf6" 
                    unit="g" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Nutrient Intake Analysis</CardTitle>
          <CardDescription>
            Detailed breakdown of all tracked nutrients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NutritionSummaryGrid summary={dailyNutrition.summary} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Analysis;
