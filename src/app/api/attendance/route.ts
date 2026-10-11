import { NextResponse } from "next/server";
import { getAttendance, addAttendance } from "@/lib/adminStorage";
import { AttendanceRecord } from "@/lib/siteContent";

export async function GET() {
  try {
    const list = await getAttendance();
    return NextResponse.json({ success: true, data: list });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load attendance" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { memberId, memberName, passkey, workDone } = body;

    if (!workDone || String(workDone).trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "You must provide a description of the work you completed today before marking attendance." },
        { status: 400 }
      );
    }

    if (!memberName || !passkey) {
      return NextResponse.json(
        { success: false, error: "Member information is missing" },
        { status: 400 }
      );
    }

    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    const record: AttendanceRecord = {
      id: `att-${Date.now()}`,
      memberId: memberId || passkey,
      memberName,
      passkey,
      date: dateStr,
      time: timeStr,
      workDone: String(workDone).trim(),
      timestamp: Date.now(),
    };

    const updated = await addAttendance(record);
    return NextResponse.json({ success: true, record, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to mark attendance" },
      { status: 500 }
    );
  }
}
