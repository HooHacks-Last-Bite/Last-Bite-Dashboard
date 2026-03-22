import Link from "next/link";
import { Header } from "@/components/dashboard/header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { TopWastedFoodsChart } from "@/components/dashboard/top-wasted-foods-chart";
import { WasteOverTimeChart } from "@/components/dashboard/waste-over-time-chart";
import { WasteHeatmap } from "@/components/dashboard/waste-heatmap";
import { InsightsPanel } from "@/components/dashboard/insights-panel";
import { RecentScans } from "@/components/dashboard/recent-scans";
import Dashboard from "@/components/dashboard/dashboard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

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

        {/* Stats Cards */}
        <section className="mb-8">
          <StatsCards />
        </section>


        {/* Charts Row */}
        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <TopWastedFoodsChart />
          <WasteOverTimeChart />
        </section>

        {/* Heatmap */}
        <section className="mb-8">
          <WasteHeatmap />
        </section>

        {/* Insights and Recent Scans */}
        <section className="grid gap-6 lg:grid-cols-2">
          <InsightsPanel />
          <RecentScans />
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>
            Waste Watcher &copy; 2024 &bull; Reducing food waste, one plate at a
            time.
          </p>
        </footer>
      </main>
    </div>
  );
}
