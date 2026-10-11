import { NextResponse } from "next/server";
import { getSiteContent, saveSiteContent } from "@/lib/adminStorage";
import { SiteContentData } from "@/lib/siteContent";

export async function GET() {
  try {
    const content = await getSiteContent();
    return NextResponse.json({ success: true, data: content });
  } catch (error: any) {
    console.error("Error reading site content:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load content" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SiteContentData;
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid payload" },
        { status: 400 }
      );
    }
    const updated = await saveSiteContent(body);
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("Error saving site content:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save content" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  return POST(req);
}
