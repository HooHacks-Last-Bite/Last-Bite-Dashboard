"use client";

import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type Scan = {
  uuid: string;
  createdAt: string;
  foodName: string;
};

const chartConfig = {
  waste: {
    label: "Scans",
    color: "var(--chart-1)",
  },
};

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function WasteOverTimeChart({ scans }: { scans: Scan[] }) {
  const counts = [0, 0, 0, 0, 0, 0, 0];

  scans.forEach((scan) => {
    const date = new Date(scan.createdAt);
    const day = date.getDay();
    counts[day] += 1;
  });

  const chartData = dayLabels.map((label, index) => ({
    date: label,
    waste: counts[index],
  }));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          Waste Over Time
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Number of waste scans by day of week
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
            >
              <defs>
                <linearGradient id="wasteGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--border)"
              />

              <XAxis
                dataKey="date"
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => [`${value} scans`, "Waste Scans"]}
                  />
                }
              />

              <Area
                type="monotone"
                dataKey="waste"
                stroke="var(--chart-1)"
                fill="url(#wasteGradient)"
                strokeWidth={2}
                dot={{ fill: "var(--chart-1)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "var(--chart-1)" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}