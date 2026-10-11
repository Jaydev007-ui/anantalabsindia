import { NextResponse } from "next/server";
import { getAdminOrders, saveAdminOrder, updateAdminOrderStatus, deleteAdminOrder } from "@/lib/adminStorage";
import { insertOrder, updateOrderStatus, deleteOrder } from "@/lib/db";
import { detectThreats, logExploitAttempt } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getAdminOrders();
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
      await logExploitAttempt(check.type, check.details, "/api/orders");
      return NextResponse.json({ error: "Unify Engine: Security Threat Blocked" }, { status: 400 });
    }

    // Save in persistent admin storage
    const updated = await saveAdminOrder(body);

    // Also dispatch to background db
    try {
      await insertOrder(body);
    } catch {}

    return NextResponse.json({ success: true, data: updated });
  } catch (e: any) {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json(); // { id, status }
    const updated = await updateAdminOrderStatus(body.id, body.status);
    try {
      await updateOrderStatus(body.id, body.status);
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

    const updated = await deleteAdminOrder(id);
    try {
      await deleteOrder(id);
    } catch {}
    return NextResponse.json({ success: true, data: updated });
  } catch (e: any) {
    return NextResponse.json({ error: "Failed to delete record" }, { status: 400 });
  }
}
