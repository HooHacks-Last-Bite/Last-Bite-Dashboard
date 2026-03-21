"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { heatmapData } from "@/lib/dummy-data";

const mealTimes = ["breakfast", "lunch", "dinner"] as const;
const mealTimeLabels = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
};

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

export function WasteHeatmap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          Waste Heatmap
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Food waste distribution by meal time (% wasted)
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
            </tbody>
          </table>
        </div>

        {/* Legend */}
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
