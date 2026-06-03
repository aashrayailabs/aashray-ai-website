import { NextResponse } from "next/server";
import { getServerSession } from "@supabase/auth-helpers-nextjs";

export async function GET() {
  const { data: { session } } = await getServerSession();
  if (!session?.user?.role?.includes("super_admin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const sha = process.env.VERCEL_GIT_COMMIT_SHA || "unknown";
  return NextResponse.json({ version: sha });
}
