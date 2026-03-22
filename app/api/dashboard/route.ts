import { NextResponse } from "next/server";

const DEFAULT_METRICS_URL =
  "http://172.20.10.9:5000/Metrics/getMetrics/getAll";
const DEFAULT_SCANS_URL = "http://172.20.10.9:5000/Scans/getScans/getAll";

function getMetricsUrl() {
  return process.env.DASHBOARD_METRICS_API_URL || DEFAULT_METRICS_URL;
}

function getScansUrl() {
  return process.env.DASHBOARD_SCANS_API_URL || DEFAULT_SCANS_URL;
}

export async function GET() {
  const metricsUrl = getMetricsUrl();
  const scansUrl = getScansUrl();

  try {
    const [metricsRes, scansRes] = await Promise.all([
      fetch(metricsUrl, {
        method: "GET",
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      }),
      fetch(scansUrl, {
        method: "GET",
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      }),
    ]);

    if (!metricsRes.ok) {
      const text = await metricsRes.text();
      return NextResponse.json(
        {
          error: `Metrics request failed (${metricsRes.status})`,
          details: text,
        },
        { status: metricsRes.status }
      );
    }

    if (!scansRes.ok) {
      const text = await scansRes.text();
      return NextResponse.json(
        {
          error: `Scans request failed (${scansRes.status})`,
          details: text,
        },
        { status: scansRes.status }
      );
    }

    const [metrics, scans] = await Promise.all([
      metricsRes.json(),
      scansRes.json(),
    ]);

    return NextResponse.json({ metrics, scans }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown backend error";

    return NextResponse.json(
      {
        error: "Failed to reach dashboard backend",
        details: message,
      },
      { status: 502 }
    );
  }
}
