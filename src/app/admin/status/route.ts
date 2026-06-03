import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";

export async function GET() {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const uptime = process.uptime();
  const memory = process.memoryUsage();
  return NextResponse.json({ uptime, memory });
}
