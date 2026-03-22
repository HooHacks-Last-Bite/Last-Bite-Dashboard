"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingDown,
  Utensils,
  Scale,
  ArrowDownRight,
} from "lucide-react";

type Metric = {
  foodName: string;
  frequency: number;
  shareOfAllWasted: number;
  shareOfThisWasted: number;
  providedCount: number;
};

export function StatsCards({ metrics }: { metrics: Metric[] }) {
  const totalWasteCount = metrics.reduce((sum, item) => sum + item.frequency, 0);
  const totalMealsServed = metrics.reduce(
    (sum, item) => sum + item.providedCount,
    0
  );

  const overallWasteRate =
    totalMealsServed > 0 ? (totalWasteCount / totalMealsServed) * 100 : 0;

  const uniqueFoodsWasted = metrics.filter((item) => item.frequency > 0).length;

  const stats = [
    {
      title: "Total Waste Count",
      value: totalWasteCount.toLocaleString(),
      icon: Scale,
    },
    {
      title: "Meals Served",
      value: totalMealsServed.toLocaleString(),
      icon: Utensils,
    },
    {
      title: "Overall Waste Rate",
      value: `${overallWasteRate.toFixed(1)}%`,
      icon: TrendingDown,
    },
    {
      title: "Foods Wasted",
      value: uniqueFoodsWasted.toLocaleString(),
      icon: Scale,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="mt-2 text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1">
              <ArrowDownRight className="h-4 w-4 text-secondary" />
              <span className="text-sm text-muted-foreground">
                Live from metrics API
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}