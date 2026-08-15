import { NextResponse } from "next/server";
import { getMysqlPool, getCollection } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const mysqlPool = await getMysqlPool();
    if (mysqlPool) {
      return NextResponse.json({ provider: "MySQL (Primary Database)" });
    }
    const mongoCollection = await getCollection("orders");
    if (mongoCollection) {
      return NextResponse.json({ provider: "MongoDB (Secondary Database)" });
    }
    return NextResponse.json({ provider: "ExtendsClass (Cloud Fallback)" });
  } catch (e: any) {
    return NextResponse.json({ provider: "ExtendsClass (Cloud Fallback)", error: e.message });
  }
}
