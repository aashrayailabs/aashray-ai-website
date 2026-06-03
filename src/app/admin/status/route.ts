import { NextResponse } from "next/server";
import { getServerSession } from "@supabase/auth-helpers-nextjs";

export async function GET() {
  const { data: { session } } = await getServerSession();
  if (!session?.user?.role?.includes("super_admin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const uptime = process.uptime();
  const memory = process.memoryUsage();
  return NextResponse.json({ uptime, memory });
}
