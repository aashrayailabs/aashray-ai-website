"use client";

import { useState, useEffect } from "react";
import type { AuditLog } from "@/types/lead";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/audit_logs");
        if (!res.ok) throw new Error("Failed to fetch audit logs");
        const data = await res.json();
        setLogs(data);
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
      <h1 className="text-2xl font-bold mb-6">System Audit Logs (Read-Only)</h1>
      
      {isLoading && <p className="text-gray-500">Loading audit trail...</p>}
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
          Error: {error}
        </div>
      )}

      {!isLoading && !error && logs.length === 0 && (
        <p className="text-gray-500">No audit logs found.</p>
      )}

      {!isLoading && !error && logs.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performed By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Changes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(log.timestamp || "").toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{log.action}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono text-xs">{log.lead_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.performed_by}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                    <details>
                      <summary className="cursor-pointer text-blue-600 hover:text-blue-800">View Data</summary>
                      <div className="mt-2 text-xs bg-gray-50 p-2 rounded">
                        <div className="font-semibold text-red-600">Old:</div>
                        <pre className="overflow-x-auto">{JSON.stringify(log.old_value, null, 2)}</pre>
                        <div className="font-semibold text-green-600 mt-2">New:</div>
                        <pre className="overflow-x-auto">{JSON.stringify(log.new_value, null, 2)}</pre>
                      </div>
                    </details>
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
