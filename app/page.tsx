"use client";

import Link from "next/link";
import { Header } from "@/components/dashboard/header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { TopWastedFoodsChart } from "@/components/dashboard/top-wasted-foods-chart";
import { WasteOverTimeChart } from "@/components/dashboard/waste-over-time-chart";
import { WasteHeatmap } from "@/components/dashboard/waste-heatmap";
import { InsightsPanel } from "@/components/dashboard/insights-panel";
import { RecentScans } from "@/components/dashboard/recent-scans";
import { useEffect, useState } from "react";

type Metric = {
  foodName: string;
  frequency: number;
  shareOfAllWasted: number;
  shareOfThisWasted: number;
  providedCount: number;
};

type Scan = {
  uuid: string;
  createdAt: string;
  foodName: string;
};

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [scans, setScans] = useState<Scan[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metricsRes, scansRes] = await Promise.all([
          fetch("http://localhost:5000/Metrics/getMetrics/getAll"),
          fetch("http://localhost:5000/Scans/getScans/getAll"),
        ]);

        if (!metricsRes.ok) {
          throw new Error(`Metrics status: ${metricsRes.status}`);
        }

        if (!scansRes.ok) {
          throw new Error(`Scans status: ${scansRes.status}`);
        }

        const metricsData: Metric[] = await metricsRes.json();
        const scansData: Scan[] = await scansRes.json();

        console.log("METRICS DATA:", metricsData);
        console.log("SCANS DATA:", scansData);

        setMetrics(metricsData);
        setScans(scansData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Dashboard Overview
            </h2>
            <p className="mt-1 text-muted-foreground">
              Monitor food waste patterns and discover actionable insights
            </p>
          </div>
          <Link href="/upload" className="text-blue-600 hover:underline">
            Upload Pictures
          </Link>
        </div>

        <section className="mb-8">
          <StatsCards metrics={metrics} />
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <TopWastedFoodsChart metrics={metrics} />
          <WasteOverTimeChart scans={scans} />
        </section>

        <section className="mb-8">
          <WasteHeatmap scans={scans} />
        </section>

      </main>
    </div>
  );
}
