import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";

export async function GET() {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  // Vercel deployment metadata via environment variables provided at build time
  const deployments = [];
  if (process.env.VERCEL_DEPLOYMENT_URL) {
    deployments.push({ url: process.env.VERCEL_DEPLOYMENT_URL, sha: process.env.VERCEL_GIT_COMMIT_SHA });
  }
  return NextResponse.json({ deployments });

}
