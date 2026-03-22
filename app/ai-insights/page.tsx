"use client";

import { Header } from "@/components/dashboard/header";
import { useEffect, useState } from "react";

// Example GET request function — adjust API_URL to your backend
async function getInsights() {
  const API_URL = "http://172.20.10.10:8000/get-insights"; // replace with your host IP and port
  const response = await fetch(API_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

  const data = await response.json();
  return data.resp; // expect { key_insights: string[], root_causes: string[], actionable_recommendations: string[] }
}

// Align arrays into table rows
function alignLists(resp: {
  key_insights: string[];
  root_causes: string[];
  actionable_recommendations: string[];
}) {
  const { key_insights, root_causes, actionable_recommendations } = resp;
  const maxLength = Math.max(key_insights.length, root_causes.length, actionable_recommendations.length);

  const rows = Array.from({ length: maxLength }, (_, i) => ({
    key_insights: key_insights[i] || "",
    root_causes: root_causes[i] || "",
    actionable_recommendations: actionable_recommendations[i] || "",
  }));

  return rows;
}

export default function AIInsightsPage() {
  const [rows, setRows] = useState<
    { key_insights: string; root_causes: string; actionable_recommendations: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await getInsights();
        const alignedRows = alignLists(resp);
        setRows(alignedRows);
      } catch (err) {
        console.error(err);
        setError("Failed to load AI insights.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-[20px] font-bold text-foreground mb-6">
          AI Insights
        </h2>

        {loading && <p className="text-sm text-muted-foreground">Loading insights...</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="rounded-xl border border-gray-300 shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-3 border-b border-gray-300">
              <div className="p-4 font-semibold text-[20px] border-r border-gray-300">Insights</div>
              <div className="p-4 font-semibold text-[20px] border-r border-gray-300">Root Causes</div>
              <div className="p-4 font-semibold text-[20px]">Possible Solutions</div>
            </div>

            {/* Table Rows */}
            {rows.map((row, idx) => (
              <div key={idx} className="grid grid-cols-3 border-b border-gray-300">
                <div className="p-4 text-sm border-r border-gray-300">{row.key_insights}</div>
                <div className="p-4 text-sm border-r border-gray-300">{row.root_causes}</div>
                <div className="p-4 text-sm">{row.actionable_recommendations}</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}