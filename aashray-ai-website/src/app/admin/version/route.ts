import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";

export async function GET() {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const sha = process.env.VERCEL_GIT_COMMIT_SHA || "unknown";
  return NextResponse.json({ version: sha });
}
