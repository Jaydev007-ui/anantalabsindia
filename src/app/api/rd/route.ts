import { NextResponse } from "next/server";
import { getRDItems, addRDItem } from "@/lib/adminStorage";
import { RDResearchItem } from "@/lib/siteContent";

export async function GET() {
  try {
    const items = await getRDItems();
    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load R&D items" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      purpose,
      authorId,
      authorName,
      fileName,
      fileData,
      fileType,
      fileSize,
      designFileName,
      designFileData,
      designFileType,
      designFileSize,
    } = body;

    if (!title || !description || !purpose) {
      return NextResponse.json(
        { success: false, error: "Title, Description, and Purpose of research are required." },
        { status: 400 }
      );
    }

    const newItem: RDResearchItem = {
      id: `rd-${Date.now()}`,
      title,
      description,
      purpose,
      authorId: authorId || "unknown",
      authorName: authorName || "Admin Researcher",
      fileName: fileName || undefined,
      fileData: fileData || undefined,
      fileType: fileType || undefined,
      fileSize: fileSize || undefined,
      designFileName: designFileName || undefined,
      designFileData: designFileData || undefined,
      designFileType: designFileType || undefined,
      designFileSize: designFileSize || undefined,
      date: new Date().toISOString(),
      status: "Approved",
    };

    const updated = await addRDItem(newItem);
    return NextResponse.json({ success: true, item: newItem, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit R&D research" },
      { status: 500 }
    );
  }
}
