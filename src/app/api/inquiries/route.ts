import { NextResponse } from "next/server";
import { getAdminInquiries, saveAdminInquiry, updateAdminInquiryStatus, deleteAdminInquiry } from "@/lib/adminStorage";
import { insertInquiry, updateInquiryStatus, deleteInquiry } from "@/lib/db";
import { detectThreats, logExploitAttempt } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getAdminInquiries();
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Threat Check
    const check = detectThreats(body);
    if (check.hasThreat) {
      await logExploitAttempt(check.type, check.details, "/api/inquiries");
      return NextResponse.json({ error: "Unify Engine: Security Threat Blocked" }, { status: 400 });
    }

    // Save in persistent admin storage
    const updated = await saveAdminInquiry(body);

    // Also dispatch to background db
    try {
      await insertInquiry(body);
    } catch {}

    return NextResponse.json({ success: true, data: updated });
  } catch (e: any) {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json(); // { id, status }
    const updated = await updateAdminInquiryStatus(body.id, body.status);
    try {
      await updateInquiryStatus(body.id, body.status);
    } catch {}
    return NextResponse.json({ success: true, data: updated });
  } catch (e: any) {
    return NextResponse.json({ error: "Failed to update record" }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const updated = await deleteAdminInquiry(id);
    try {
      await deleteInquiry(id);
    } catch {}
    return NextResponse.json({ success: true, data: updated });
  } catch (e: any) {
    return NextResponse.json({ error: "Failed to delete record" }, { status: 400 });
  }
}
