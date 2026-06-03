import { getServerSession } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

export const metadata = { title: "Admin Dashboard" };

export default async function AdminDashboard() {
  const { data: { session } } = await getServerSession();
  if (!session?.user?.role?.includes("super_admin")) redirect("/login");
  return (
    <main className="min-h-screen bg-gray-900/80 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-gray-800/60 p-4 rounded-xl shadow-lg">
          <h2 className="text-xl font-medium mb-2">Version</h2>
          <p id="admin-version">Loading…</p>
        </section>
        <section className="bg-gray-800/60 p-4 rounded-xl shadow-lg">
          <h2 className="text-xl font-medium mb-2">Status</h2>
          <p id="admin-status">Loading…</p>
        </section>
      </div>
    </main>
  );
}
