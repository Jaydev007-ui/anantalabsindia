import { NextResponse } from "next/server";
import { getSiteStats, saveSiteStats } from "@/lib/adminStorage";
import { SiteStatsData } from "@/lib/siteContent";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await getSiteStats();
    return NextResponse.json(
      { success: true, data: stats },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        },
      }
    );
  } catch (error: any) {
    console.error("Error reading site stats:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load live stats" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<SiteStatsData>;
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid payload" },
        { status: 400 }
      );
    }
    const updated = await saveSiteStats(body);
    return NextResponse.json(
      { success: true, data: updated },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        },
      }
    );
  } catch (error: any) {
    console.error("Error saving site stats:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save live stats" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  return POST(req);
}
