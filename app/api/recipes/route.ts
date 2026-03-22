import { NextResponse } from "next/server";

const DEFAULT_BACKEND_URL = "http://172.20.10.10:8000/janky-recipes";

function getBackendUrl() {
  return (
    process.env.RECIPE_IDEAS_API_URL ||
    process.env.NEXT_PUBLIC_RECIPE_IDEAS_API_URL ||
    DEFAULT_BACKEND_URL
  );
}

export async function GET() {
  const backendUrl = getBackendUrl();

  try {
    const response = await fetch(backendUrl, {
      method: "GET",
      cache: "no-store",
      signal: AbortSignal.timeout(100000),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        {
          error: `Backend request failed (${response.status})`,
          details: text,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown backend error";

    return NextResponse.json(
      {
        error: "Failed to reach recipe backend",
        details: message,
      },
      { status: 502 }
    );
  }
}
