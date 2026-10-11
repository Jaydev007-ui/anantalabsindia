import fs from "fs";
import path from "path";
import {
  INITIAL_SITE_CONTENT,
  JAYDEV_ADMIN,
  SiteContentData,
  SiteStatsData,
  INITIAL_SITE_STATS,
  TeamMember,
  RDResearchItem,
  AttendanceRecord,
  TargetTask,
} from "./siteContent";
import { getCollection, getKvData, saveKvData } from "./db";

// Memory caches
let memoryContent: SiteContentData = { ...INITIAL_SITE_CONTENT };
let memoryStats: SiteStatsData = { ...INITIAL_SITE_STATS };
let memoryTeam: TeamMember[] = [{ ...JAYDEV_ADMIN }];
let memoryRD: RDResearchItem[] = [];
let memoryAttendance: AttendanceRecord[] = [];
let memoryTargets: TargetTask[] = [];

// Local file system storage path (in .next or data folder)
const DATA_DIR = path.join(process.cwd(), ".admin_data");

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch {
    // Ignore in read-only serverless filesystems
  }
}

function readLocalFile<T>(filename: string, defaultValue: T): T {
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn(`File read fallback for ${filename}:`, e);
  }
  return defaultValue;
}

function writeLocalFile<T>(filename: string, data: T) {
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.warn(`File write fallback for ${filename}:`, e);
  }
}

// ---------------- Site Content ----------------
export async function getSiteContent(): Promise<SiteContentData> {
  try {
    const col = await getCollection("site_content");
    if (col) {
      const doc = await col.findOne({ _id: "current_content" as any });
      if (doc && doc.data) {
        memoryContent = doc.data;
        return memoryContent;
      }
    }
  } catch (e) {
    console.error("DB read error for site_content", e);
  }

  // Fallback to local file or memory
  const fileData = readLocalFile<SiteContentData>("site_content.json", memoryContent);
  memoryContent = fileData;
  return memoryContent;
}

export async function saveSiteContent(data: SiteContentData): Promise<SiteContentData> {
  memoryContent = data;
  writeLocalFile("site_content.json", data);

  try {
    const col = await getCollection("site_content");
    if (col) {
      await col.updateOne(
        { _id: "current_content" as any },
        { $set: { data, updatedAt: new Date().toISOString() } },
        { upsert: true }
      );
    }
  } catch (e) {
    console.error("DB write error for site_content", e);
  }

  return memoryContent;
}

// ---------------- Team Members ----------------
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const col = await getCollection("team_members");
    if (col) {
      const docs = await col.find({}).toArray();
      if (docs && docs.length > 0) {
        // Ensure Jaydev exists
        const list: TeamMember[] = docs.map((d: any) => ({
          id: d.id || d._id?.toString(),
          passkey: d.passkey,
          name: d.name,
          email: d.email,
          phone: d.phone,
          role: d.role,
          department: d.department,
          joinedDate: d.joinedDate,
          active: d.active !== false,
          avatarColor: d.avatarColor || "#7FBFA0",
        }));
        if (!list.some((m) => m.passkey === JAYDEV_ADMIN.passkey)) {
          list.unshift(JAYDEV_ADMIN);
        }
        memoryTeam = list;
        return memoryTeam;
      }
    }
  } catch (e) {
    console.error("DB read error for team_members", e);
  }

  const fileData = readLocalFile<TeamMember[]>("team_members.json", memoryTeam);
  if (!fileData.some((m) => m.passkey === JAYDEV_ADMIN.passkey)) {
    fileData.unshift(JAYDEV_ADMIN);
  }
  memoryTeam = fileData;
  return memoryTeam;
}

export async function addTeamMember(member: TeamMember): Promise<TeamMember[]> {
  const current = await getTeamMembers();
  const existingIdx = current.findIndex((m) => m.passkey === member.passkey);
  if (existingIdx >= 0) {
    current[existingIdx] = member;
  } else {
    current.push(member);
  }
  memoryTeam = current;
  writeLocalFile("team_members.json", current);

  try {
    const col = await getCollection("team_members");
    if (col) {
      await col.updateOne(
        { passkey: member.passkey },
        { $set: member },
        { upsert: true }
      );
    }
  } catch (e) {
    console.error("DB write error for team_members", e);
  }

  return memoryTeam;
}

export async function deleteTeamMember(passkey: string): Promise<boolean> {
  if (passkey === JAYDEV_ADMIN.passkey) {
    return false; // Cannot delete master admin
  }
  const current = await getTeamMembers();
  const filtered = current.filter((m) => m.passkey !== passkey);
  memoryTeam = filtered;
  writeLocalFile("team_members.json", filtered);

  try {
    const col = await getCollection("team_members");
    if (col) {
      await col.deleteOne({ passkey });
    }
  } catch (e) {
    console.error("DB delete error for team_members", e);
  }
  return true;
}

// ---------------- R&D Internal Submissions ----------------
export async function getRDItems(): Promise<RDResearchItem[]> {
  try {
    const col = await getCollection("rd_research");
    if (col) {
      const docs = await col.find({}).sort({ date: -1 }).toArray();
      if (docs && docs.length > 0) {
        memoryRD = docs.map((d: any) => ({
          id: d.id || d._id?.toString(),
          title: d.title,
          description: d.description,
          purpose: d.purpose,
          authorId: d.authorId,
          authorName: d.authorName,
          fileName: d.fileName,
          fileData: d.fileData,
          fileType: d.fileType,
          fileSize: d.fileSize,
          designFileName: d.designFileName,
          designFileData: d.designFileData,
          designFileType: d.designFileType,
          designFileSize: d.designFileSize,
          date: d.date,
          status: d.status || "Approved",
        }));
        return memoryRD;
      }
    }
  } catch (e) {
    console.error("DB read error for rd_research", e);
  }

  memoryRD = readLocalFile<RDResearchItem[]>("rd_research.json", memoryRD);
  return memoryRD;
}

export async function addRDItem(item: RDResearchItem): Promise<RDResearchItem[]> {
  const current = await getRDItems();
  current.unshift(item);
  memoryRD = current;
  writeLocalFile("rd_research.json", current);

  try {
    const col = await getCollection("rd_research");
    if (col) {
      await col.insertOne(item as any);
    }
  } catch (e) {
    console.error("DB write error for rd_research", e);
  }

  return memoryRD;
}

// ---------------- Daily Attendance ----------------
export async function getAttendance(): Promise<AttendanceRecord[]> {
  try {
    const col = await getCollection("attendance");
    if (col) {
      const docs = await col.find({}).sort({ timestamp: -1 }).toArray();
      if (docs && docs.length > 0) {
        memoryAttendance = docs.map((d: any) => ({
          id: d.id || d._id?.toString(),
          memberId: d.memberId,
          memberName: d.memberName,
          passkey: d.passkey,
          date: d.date,
          time: d.time,
          workDone: d.workDone,
          timestamp: d.timestamp || Date.now(),
        }));
        return memoryAttendance;
      }
    }
  } catch (e) {
    console.error("DB read error for attendance", e);
  }

  memoryAttendance = readLocalFile<AttendanceRecord[]>("attendance.json", memoryAttendance);
  return memoryAttendance;
}

export async function addAttendance(record: AttendanceRecord): Promise<AttendanceRecord[]> {
  const current = await getAttendance();
  current.unshift(record);
  memoryAttendance = current;
  writeLocalFile("attendance.json", current);

  try {
    const col = await getCollection("attendance");
    if (col) {
      await col.insertOne(record as any);
    }
  } catch (e) {
    console.error("DB write error for attendance", e);
  }

  return memoryAttendance;
}

// ---------------- Targets / Tasks ----------------
export async function getTargets(): Promise<TargetTask[]> {
  try {
    const col = await getCollection("targets");
    if (col) {
      const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
      if (docs && docs.length > 0) {
        memoryTargets = docs.map((d: any) => ({
          id: d.id || d._id?.toString(),
          title: d.title,
          description: d.description,
          duration: d.duration,
          deadline: d.deadline,
          assignedToId: d.assignedToId,
          assignedToName: d.assignedToName,
          assignedById: d.assignedById,
          assignedByName: d.assignedByName,
          status: d.status || "Pending",
          createdAt: d.createdAt,
          completionNote: d.completionNote,
          completionFileName: d.completionFileName,
          completionFileData: d.completionFileData,
          completedAt: d.completedAt,
        }));
        return memoryTargets;
      }
    }
  } catch (e) {
    console.error("DB read error for targets", e);
  }

  memoryTargets = readLocalFile<TargetTask[]>("targets.json", memoryTargets);
  return memoryTargets;
}

export async function addTarget(task: TargetTask): Promise<TargetTask[]> {
  const current = await getTargets();
  current.unshift(task);
  memoryTargets = current;
  writeLocalFile("targets.json", current);

  try {
    const col = await getCollection("targets");
    if (col) {
      await col.insertOne(task as any);
    }
  } catch (e) {
    console.error("DB write error for targets", e);
  }

  return memoryTargets;
}

export async function updateTarget(id: string, updates: Partial<TargetTask>): Promise<TargetTask[]> {
  const current = await getTargets();
  const idx = current.findIndex((t) => t.id === id);
  if (idx >= 0) {
    current[idx] = { ...current[idx], ...updates };
  }
  memoryTargets = current;
  writeLocalFile("targets.json", current);

  try {
    const col = await getCollection("targets");
    if (col) {
      await col.updateOne({ id }, { $set: updates });
    }
  } catch (e) {
    console.error("DB update error for targets", e);
  }

  return memoryTargets;
}

// ---------------- Orders Management ----------------
let memoryOrders: any[] = [];

export async function getAdminOrders(): Promise<any[]> {
  try {
    const col = await getCollection("orders");
    if (col) {
      const docs = await col.find({}).sort({ date: -1 }).toArray();
      if (docs && docs.length > 0) {
        memoryOrders = docs.map(({ _id, ...rest }) => rest);
        return memoryOrders;
      }
    }
  } catch (e) {
    console.error("DB read error for orders", e);
  }

  memoryOrders = readLocalFile<any[]>("orders.json", memoryOrders);
  return memoryOrders;
}

export async function saveAdminOrder(order: any): Promise<any[]> {
  const current = await getAdminOrders();
  const existingIdx = current.findIndex((o) => o.id === order.id);
  if (existingIdx >= 0) {
    current[existingIdx] = order;
  } else {
    current.unshift(order);
  }
  memoryOrders = current;
  writeLocalFile("orders.json", current);

  try {
    const col = await getCollection("orders");
    if (col) {
      await col.updateOne({ id: order.id }, { $set: order }, { upsert: true });
    }
  } catch (e) {
    console.error("DB write error for orders", e);
  }

  return memoryOrders;
}

export async function updateAdminOrderStatus(id: string, status: string): Promise<any[]> {
  const current = await getAdminOrders();
  const idx = current.findIndex((o) => o.id === id);
  if (idx >= 0) {
    current[idx].status = status;
  }
  memoryOrders = current;
  writeLocalFile("orders.json", current);

  try {
    const col = await getCollection("orders");
    if (col) {
      await col.updateOne({ id }, { $set: { status } });
    }
  } catch (e) {
    console.error("DB update error for orders", e);
  }

  return memoryOrders;
}

export async function deleteAdminOrder(id: string): Promise<any[]> {
  const current = await getAdminOrders();
  const filtered = current.filter((o) => o.id !== id);
  memoryOrders = filtered;
  writeLocalFile("orders.json", filtered);

  try {
    const col = await getCollection("orders");
    if (col) {
      await col.deleteOne({ id });
    }
  } catch (e) {
    console.error("DB delete error for orders", e);
  }

  return memoryOrders;
}

// ---------------- Inquiries Management ----------------
let memoryInquiries: any[] = [];

export async function getAdminInquiries(): Promise<any[]> {
  try {
    const col = await getCollection("inquiries");
    if (col) {
      const docs = await col.find({}).sort({ date: -1 }).toArray();
      if (docs && docs.length > 0) {
        memoryInquiries = docs.map(({ _id, ...rest }) => rest);
        return memoryInquiries;
      }
    }
  } catch (e) {
    console.error("DB read error for inquiries", e);
  }

  memoryInquiries = readLocalFile<any[]>("inquiries.json", memoryInquiries);
  return memoryInquiries;
}

export async function saveAdminInquiry(inquiry: any): Promise<any[]> {
  const current = await getAdminInquiries();
  const existingIdx = current.findIndex((i) => i.id === inquiry.id);
  if (existingIdx >= 0) {
    current[existingIdx] = inquiry;
  } else {
    current.unshift(inquiry);
  }
  memoryInquiries = current;
  writeLocalFile("inquiries.json", current);

  try {
    const col = await getCollection("inquiries");
    if (col) {
      await col.updateOne({ id: inquiry.id }, { $set: inquiry }, { upsert: true });
    }
  } catch (e) {
    console.error("DB write error for inquiries", e);
  }

  return memoryInquiries;
}

export async function updateAdminInquiryStatus(id: string, status: string): Promise<any[]> {
  const current = await getAdminInquiries();
  const idx = current.findIndex((i) => i.id === id);
  if (idx >= 0) {
    current[idx].status = status;
  }
  memoryInquiries = current;
  writeLocalFile("inquiries.json", current);

  try {
    const col = await getCollection("inquiries");
    if (col) {
      await col.updateOne({ id }, { $set: { status } });
    }
  } catch (e) {
    console.error("DB update error for inquiries", e);
  }

  return memoryInquiries;
}

export async function deleteAdminInquiry(id: string): Promise<any[]> {
  const current = await getAdminInquiries();
  const filtered = current.filter((i) => i.id !== id);
  memoryInquiries = filtered;
  writeLocalFile("inquiries.json", filtered);

  try {
    const col = await getCollection("inquiries");
    if (col) {
      await col.deleteOne({ id });
    }
  } catch (e) {
    console.error("DB delete error for inquiries", e);
  }

  return memoryInquiries;
}

// ---------------- Dynamic Live Statistics ----------------
export async function getSiteStats(): Promise<SiteStatsData> {
  // 1. Try MongoDB first if configured
  try {
    const col = await getCollection("site_stats");
    if (col) {
      const doc = await col.findOne({ _id: "current_stats" as any });
      if (doc && doc.data) {
        memoryStats = { ...INITIAL_SITE_STATS, ...doc.data };
        return memoryStats;
      }
    }
  } catch (e) {
    console.error("DB read error for site_stats", e);
  }

  // 2. Try Persistent Cloud KV (extendsclass bin) for serverless durability across restarts
  try {
    const cloudData = await getKvData<SiteStatsData>("stats");
    if (cloudData && typeof cloudData === "object" && cloudData.projectsCount) {
      memoryStats = { ...INITIAL_SITE_STATS, ...cloudData };
      return memoryStats;
    }
  } catch (e) {
    console.error("Cloud KV read error for stats:", e);
  }

  // 3. Fallback to local file or memory
  const fileData = readLocalFile<SiteStatsData>("site_stats.json", memoryStats);
  memoryStats = { ...INITIAL_SITE_STATS, ...fileData };
  return memoryStats;
}

export async function saveSiteStats(data: Partial<SiteStatsData>): Promise<SiteStatsData> {
  const current = await getSiteStats();
  const merged: SiteStatsData = {
    ...current,
    ...data,
  };
  memoryStats = merged;

  // Persist locally
  writeLocalFile("site_stats.json", merged);

  // Persist to Cloud KV storage
  try {
    await saveKvData("stats", merged);
  } catch (e) {
    console.error("Cloud KV write error for stats:", e);
  }

  // Persist to MongoDB if available
  try {
    const col = await getCollection("site_stats");
    if (col) {
      await col.updateOne(
        { _id: "current_stats" as any },
        { $set: { data: merged, updatedAt: new Date().toISOString() } },
        { upsert: true }
      );
    }
  } catch (e) {
    console.error("DB write error for site_stats", e);
  }

  return memoryStats;
}
