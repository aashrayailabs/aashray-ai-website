import { NextResponse } from "next/server";
import { getServerSession } from "@supabase/auth-helpers-nextjs";

export async function GET() {
  const { data: { session } } = await getServerSession();
  if (!session?.user?.role?.includes("super_admin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  // Vercel deployment metadata via environment variables provided at build time
  const deployments = [];
  if (process.env.VERCEL_DEPLOYMENT_URL) {
    deployments.push({ url: process.env.VERCEL_DEPLOYMENT_URL, sha: process.env.VERCEL_GIT_COMMIT_SHA });
  }
  return NextResponse.json({ deployments });
}
