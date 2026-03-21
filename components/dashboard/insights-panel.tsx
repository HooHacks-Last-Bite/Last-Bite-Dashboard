"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Info, Lightbulb } from "lucide-react";
import { insights } from "@/lib/dummy-data";

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircle,
  info: Info,
};

const styleMap = {
  warning: {
    bg: "bg-accent/10",
    border: "border-accent/30",
    icon: "text-accent",
    metric: "text-accent",
  },
  success: {
    bg: "bg-secondary/10",
    border: "border-secondary/30",
    icon: "text-secondary",
    metric: "text-secondary",
  },
  info: {
    bg: "bg-primary/10",
    border: "border-primary/30",
    icon: "text-primary",
    metric: "text-primary",
  },
};

export function InsightsPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="h-5 w-5 text-accent" />
          Actionable Insights
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          AI-powered recommendations based on waste patterns
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => {
            const Icon = iconMap[insight.type as keyof typeof iconMap];
            const style = styleMap[insight.type as keyof typeof styleMap];

            return (
              <div
                key={insight.id}
                className={`rounded-xl border p-4 ${style.bg} ${style.border} transition-all hover:shadow-md`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 ${style.icon}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-foreground">
                        {insight.title}
                      </h4>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${style.metric} ${style.bg}`}
                      >
                        {insight.metric}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {insight.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
