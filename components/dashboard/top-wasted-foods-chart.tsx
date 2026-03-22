"use client";

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type Metric = {
  foodName: string;
  frequency: number;
  shareOfAllWasted: number;
  shareOfThisWasted: number;
  providedCount: number;
};

const chartConfig = {
  wasteRate: {
    label: "Waste Rate",
    color: "var(--chart-1)",
  },
};

export function TopWastedFoodsChart({ metrics }: { metrics: Metric[] }) {
  const chartData = metrics
    .filter((item) => item.frequency > 0)
    .map((item) => ({
      name: item.foodName,
      wasteRate: Number((item.shareOfThisWasted * 100).toFixed(1)),
    }))
    .sort((a, b) => b.wasteRate - a.wasteRate)
    .slice(0, 6);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          Top Wasted Foods
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Percentage of each food item wasted
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 0, right: 20, bottom: 0, left: 60 }}
            >
              <XAxis
                type="number"
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: "var(--foreground)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={80}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => [`${value}%`, "Waste Rate"]}
                  />
                }
              />
              <Bar dataKey="wasteRate" radius={[0, 4, 4, 0]} maxBarSize={24}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.wasteRate > 30
                        ? "var(--accent)"
                        : "var(--secondary)"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}