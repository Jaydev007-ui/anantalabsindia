import { NextResponse } from "next/server";
import { getTargets, addTarget, updateTarget } from "@/lib/adminStorage";
import { TargetTask } from "@/lib/siteContent";

export async function GET() {
  try {
    const list = await getTargets();
    return NextResponse.json({ success: true, data: list });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load targets" },
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
      duration,
      deadline,
      assignedToId,
      assignedToName,
      assignedById,
      assignedByName,
    } = body;

    if (!title || !description || !assignedToName) {
      return NextResponse.json(
        { success: false, error: "Title, Description, and Assignee are required." },
        { status: 400 }
      );
    }

    const newTask: TargetTask = {
      id: `task-${Date.now()}`,
      title,
      description,
      duration: duration || "3 Days",
      deadline: deadline || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      assignedToId: assignedToId || "unknown",
      assignedToName,
      assignedById: assignedById || "unknown",
      assignedByName: assignedByName || "Admin",
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    const updated = await addTarget(newTask);
    return NextResponse.json({ success: true, task: newTask, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create target task" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status, completionNote, completionFileName, completionFileData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Task ID is required" },
        { status: 400 }
      );
    }

    const updates: Partial<TargetTask> = {};
    if (status) updates.status = status;
    if (completionNote !== undefined) updates.completionNote = completionNote;
    if (completionFileName !== undefined) updates.completionFileName = completionFileName;
    if (completionFileData !== undefined) updates.completionFileData = completionFileData;
    if (status === "Completed") {
      updates.completedAt = new Date().toISOString();
    }

    const updated = await updateTarget(id, updates);
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update target task" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  return PATCH(req);
}
