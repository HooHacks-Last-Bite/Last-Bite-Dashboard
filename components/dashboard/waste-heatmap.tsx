"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Scan = {
  uuid: string;
  createdAt: string;
  foodName: string;
};

const mealTimes = ["breakfast", "lunch", "dinner"] as const;

const mealTimeLabels = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
};

function getMealTime(date: Date): "breakfast" | "lunch" | "dinner" {
  const hour = date.getUTCHours();

  if (hour < 11) return "breakfast";
  if (hour < 16) return "lunch";
  return "dinner";
}

function getHeatColor(value: number): string {
  if (value === 0) return "bg-muted";
  if (value < 15) return "bg-secondary/40";
  if (value < 25) return "bg-secondary/70";
  if (value < 35) return "bg-accent/60";
  return "bg-accent";
}

function getTextColor(value: number): string {
  if (value === 0) return "text-muted-foreground";
  if (value < 25) return "text-foreground";
  return "text-foreground font-semibold";
}

export function WasteHeatmap({ scans }: { scans: Scan[] }) {
  const grouped: Record<
    string,
    { breakfast: number; lunch: number; dinner: number; total: number }
  > = {};

  scans.forEach((scan) => {
    const food = scan.foodName?.trim();
    if (!food) return;

    if (!grouped[food]) {
      grouped[food] = {
        breakfast: 0,
        lunch: 0,
        dinner: 0,
        total: 0,
      };
    }

    const mealTime = getMealTime(new Date(scan.createdAt));
    grouped[food][mealTime] += 1;
    grouped[food].total += 1;
  });

  const heatmapData = Object.entries(grouped)
    .map(([food, counts]) => ({
      food,
      breakfast:
        counts.total > 0 ? Math.round((counts.breakfast / counts.total) * 100) : 0,
      lunch: counts.total > 0 ? Math.round((counts.lunch / counts.total) * 100) : 0,
      dinner: counts.total > 0 ? Math.round((counts.dinner / counts.total) * 100) : 0,
      total: counts.total,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 8);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          Waste Heatmap
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Waste distribution by meal time for top scanned foods
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                  Food Item
                </th>
                {mealTimes.map((time) => (
                  <th
                    key={time}
                    className="pb-3 text-center text-sm font-medium text-muted-foreground"
                  >
                    {mealTimeLabels[time]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {heatmapData.map((row, idx) => (
                <tr key={row.food}>
                  <td
                    className={`py-2 pr-4 text-sm font-medium text-foreground ${
                      idx !== heatmapData.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    {row.food}
                  </td>

                  {mealTimes.map((time) => {
                    const value = row[time];
                    return (
                      <td
                        key={`${row.food}-${time}`}
                        className={`py-2 text-center ${
                          idx !== heatmapData.length - 1 ? "border-b border-border" : ""
                        }`}
                      >
                        <div
                          className={`mx-auto flex h-10 w-14 items-center justify-center rounded-lg ${getHeatColor(
                            value
                          )} ${getTextColor(value)} text-sm transition-all hover:scale-105`}
                        >
                          {value}%
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}

              {heatmapData.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-6 text-center text-sm text-muted-foreground"
                  >
                    No scan data available yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-secondary/40"></div>
            <span className="text-xs text-muted-foreground">Low</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-secondary/70"></div>
            <span className="text-xs text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-accent/60"></div>
            <span className="text-xs text-muted-foreground">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-accent"></div>
            <span className="text-xs text-muted-foreground">Critical</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}