"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingDown,
  Utensils,
  Scale,
  ScanLine,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";
import { summaryStats } from "@/lib/dummy-data";

const stats = [
  {
    title: "Total Waste Today",
    value: `${summaryStats.totalWasteToday} lbs`,
    change: -8,
    icon: Scale,
    trend: "down",
  },
  {
    title: "Meals Served",
    value: summaryStats.totalMealsToday.toLocaleString(),
    change: 5,
    icon: Utensils,
    trend: "up",
  },
  {
    title: "Waste Reduction",
    value: `${summaryStats.wasteReduction}%`,
    change: 12,
    icon: TrendingDown,
    trend: "down",
  },
  {
    title: "Scans Today",
    value: summaryStats.scansToday.toLocaleString(),
    change: 15,
    icon: ScanLine,
    trend: "up",
  },
];

export function StatsCards() {
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
              {stat.trend === "down" ? (
                <ArrowDownRight className="h-4 w-4 text-secondary" />
              ) : (
                <ArrowUpRight className="h-4 w-4 text-secondary" />
              )}
              <span className="text-sm font-medium text-secondary">
                {stat.change}%
              </span>
              <span className="text-sm text-muted-foreground">
                vs last week
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
