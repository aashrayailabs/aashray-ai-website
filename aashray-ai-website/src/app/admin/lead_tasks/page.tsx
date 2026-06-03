"use client";

import { useState, useEffect } from "react";
import type { LeadTask } from "@/types/lead";

export default function LeadTasksPage() {
  const [tasks, setTasks] = useState<LeadTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/lead_tasks");
        if (!res.ok) throw new Error("Failed to fetch lead tasks");
        const data = await res.json();
        setTasks(data);
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
      <h1 className="text-2xl font-bold mb-6">Lead Tasks (Read-Only)</h1>
      
      {isLoading && <p className="text-gray-500">Loading tasks...</p>}
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
          Error: {error}
        </div>
      )}

      {!isLoading && !error && tasks.length === 0 && (
        <p className="text-gray-500">No tasks found.</p>
      )}

      {!isLoading && !error && tasks.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {task.completed ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{task.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono text-xs">{task.lead_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}
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
