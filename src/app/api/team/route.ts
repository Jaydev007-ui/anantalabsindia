import { NextResponse } from "next/server";
import { getTeamMembers, addTeamMember, deleteTeamMember } from "@/lib/adminStorage";
import { TeamMember, JAYDEV_ADMIN } from "@/lib/siteContent";

export async function GET() {
  try {
    const team = await getTeamMembers();
    return NextResponse.json({ success: true, data: team });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load team" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, role, department, passkey } = body;

    if (!name || !role) {
      return NextResponse.json(
        { success: false, error: "Name and Role are required" },
        { status: 400 }
      );
    }

    // Generate numeric 8-digit passkey if not provided
    const generatedPasskey =
      passkey && String(passkey).trim().length > 0
        ? String(passkey).trim()
        : Math.floor(10000000 + Math.random() * 90000000).toString();

    const colors = ["#7FBFA0", "#00ffff", "#f59e0b", "#a855f7", "#ec4899", "#3b82f6"];
    const avatarColor = colors[Math.floor(Math.random() * colors.length)];

    const member: TeamMember = {
      id: body.id || `team-${Date.now()}`,
      passkey: generatedPasskey,
      name,
      email: email || `${name.toLowerCase().replace(/\s+/g, ".")}@anantalabsindia.org`,
      phone: phone || "",
      role: role || "Associate",
      department: department || "Research & Development",
      joinedDate: body.joinedDate || new Date().toISOString().split("T")[0],
      active: body.active !== false,
      avatarColor: body.avatarColor || avatarColor,
    };

    const updated = await addTeamMember(member);
    return NextResponse.json({ success: true, member, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save team member" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const passkey = searchParams.get("passkey");

    if (!passkey) {
      return NextResponse.json(
        { success: false, error: "Passkey is required" },
        { status: 400 }
      );
    }

    if (passkey === JAYDEV_ADMIN.passkey) {
      return NextResponse.json(
        { success: false, error: "Cannot delete master administrator" },
        { status: 403 }
      );
    }

    const ok = await deleteTeamMember(passkey);
    const team = await getTeamMembers();
    return NextResponse.json({ success: ok, data: team });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete member" },
      { status: 500 }
    );
  }
}
