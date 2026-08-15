import { NextResponse } from "next/server";
import { queryOrders, insertOrder, updateOrderStatus, deleteOrder } from "@/lib/db";
import { detectThreats, logExploitAttempt } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await queryOrders();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Unify Threat Scan
    const check = detectThreats(body);
    if (check.hasThreat) {
      await logExploitAttempt(check.type, check.details, "/api/orders");
      return NextResponse.json({ error: "Unify Engine: Security Threat Blocked" }, { status: 400 });
    }

    await insertOrder(body);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json(); // { id, status }
    await updateOrderStatus(body.id, body.status);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to update record" }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    
    await deleteOrder(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to delete record" }, { status: 400 });
  }
}
