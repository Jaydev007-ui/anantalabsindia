import { NextResponse } from "next/server";
import { queryStaffUsers, insertStaffUser, deleteStaffUser } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await queryStaffUsers();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "Failed to query staff" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.username || !body.password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }
    await insertStaffUser(body);
    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("STAFF_POST_ERROR:", e);
    return NextResponse.json({ error: "Failed to add staff user", details: e.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");
    if (!username) {
      return NextResponse.json({ error: "Username required" }, { status: 400 });
    }
    await deleteStaffUser(username);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to delete staff user" }, { status: 500 });
  }
}
