"use client";

import { useState, useEffect } from "react";
import type { LeadActivity } from "@/types/lead";

export default function LeadActivitiesPage() {
  const [activities, setActivities] = useState<LeadActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/lead_activities");
        if (!res.ok) throw new Error("Failed to fetch lead activities");
        const data = await res.json();
        setActivities(data);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Lead Activities (Read-Only)</h1>
      
      {isLoading && <p className="text-gray-500">Loading activities...</p>}
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
          Error: {error}
        </div>
      )}

      {!isLoading && !error && activities.length === 0 && (
        <p className="text-gray-500">No activities found.</p>
      )}

      {!isLoading && !error && activities.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(activity.created_at || "").toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono text-xs">{activity.lead_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <pre className="text-xs bg-gray-50 p-2 rounded">{JSON.stringify(activity.payload, null, 2)}</pre>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
