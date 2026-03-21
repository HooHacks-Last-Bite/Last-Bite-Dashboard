"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScanLine, Clock } from "lucide-react";
import { recentScans } from "@/lib/dummy-data";

const wasteLevelStyles = {
  low: "bg-secondary/20 text-secondary border-secondary/30",
  medium: "bg-accent/20 text-accent border-accent/30",
  high: "bg-destructive/20 text-destructive border-destructive/30",
};

const wasteLevelLabels = {
  low: "Low Waste",
  medium: "Medium",
  high: "High Waste",
};

function formatTime(timestamp: string) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function RecentScans() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ScanLine className="h-5 w-5 text-primary" />
          Recent Plate Scans
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Latest detected food waste
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentScans.map((scan) => (
            <div
              key={scan.id}
              className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3 transition-all hover:bg-muted/50"
            >
              <div className="flex-1">
                <div className="flex flex-wrap gap-1.5">
                  {scan.items.map((item) => (
                    <Badge
                      key={item}
                      variant="secondary"
                      className="text-xs font-medium"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatTime(scan.timestamp)}
                </div>
              </div>
              <Badge
                variant="outline"
                className={`ml-3 ${
                  wasteLevelStyles[scan.wasteLevel as keyof typeof wasteLevelStyles]
                }`}
              >
                {wasteLevelLabels[scan.wasteLevel as keyof typeof wasteLevelLabels]}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
