import { NextResponse } from "next/server";
import { getHubData, saveHubData } from "@/lib/adminStorage";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getHubData();
    return NextResponse.json(
      { success: true, data },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        },
      }
    );
  } catch (error: any) {
    console.error("Error reading hub registry:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load hub data" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid payload" },
        { status: 400 }
      );
    }
    const updated = await saveHubData(body);
    return NextResponse.json(
      { success: true, data: updated },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        },
      }
    );
  } catch (error: any) {
    console.error("Error saving hub registry:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save hub data" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  return POST(req);
}
