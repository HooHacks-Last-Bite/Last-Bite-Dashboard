"use client";

import { Header } from "@/components/dashboard/header";

export default function AIInsightsPage() {
  const aiResponses = [
    {
      resp: {
        key_insights:
          "Chicken, rice, and salad are the primary waste drivers...",
        root_causes:
          "High waste for rice and salad on Saturdays indicates...",
        actionable_recommendations:
          "Implement small-batch rice cooking after 17:00..."
      }
    },
    {
      resp: {
        key_insights:
          "Pizza waste spikes late evening across weekdays...",
        root_causes:
          "Overproduction during low-demand periods...",
        actionable_recommendations:
          "Reduce batch sizes after 7PM and monitor demand..."
      }
    }
  ];

  // Column background classes for consistency
  const colBgClasses = ["bg-green-50", "bg-green-100", "bg-green-200"];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-[20px] font-bold text-foreground mb-6">
          AI Insights Dashboard
        </h2>

        {/* Table Header */}
        <div className="grid grid-cols-3 border-b border-border rounded-t-xl shadow-sm">
          <div className={`p-4 font-semibold text-[20px] ${colBgClasses[0]}`}>Insights</div>
          <div className={`p-4 font-semibold text-[20px] ${colBgClasses[1]}`}>Root Causes</div>
          <div className={`p-4 font-semibold text-[20px] ${colBgClasses[2]}`}>Possible Solutions</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-border rounded-b-xl shadow-sm">
          {aiResponses.map((item, index) => (
            <div key={index} className="grid grid-cols-3">
              <div className={`p-4 text-sm ${colBgClasses[0]}`}>{item.resp.key_insights}</div>
              <div className={`p-4 text-sm ${colBgClasses[1]}`}>{item.resp.root_causes}</div>
              <div className={`p-4 text-sm ${colBgClasses[2]}`}>{item.resp.actionable_recommendations}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}