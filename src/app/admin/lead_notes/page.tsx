"use client";

import { useState, useEffect } from "react";
import type { LeadNote } from "@/types/lead";

export default function LeadNotesPage() {
  const [notes, setNotes] = useState<LeadNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/lead_notes");
        if (!res.ok) throw new Error("Failed to fetch lead notes");
        const data = await res.json();
        setNotes(data);
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
      <h1 className="text-2xl font-bold mb-6">Lead Notes (Read-Only)</h1>
      
      {isLoading && <p className="text-gray-500">Loading notes...</p>}
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
          Error: {error}
        </div>
      )}

      {!isLoading && !error && notes.length === 0 && (
        <p className="text-gray-500">No notes found.</p>
      )}

      {!isLoading && !error && notes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div key={note.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
              <div className="text-xs text-gray-500 mb-2">
                {new Date(note.created_at || "").toLocaleString()}
              </div>
              <div className="font-semibold text-sm text-gray-900 mb-1">Author: {note.author}</div>
              <div className="text-xs text-gray-400 mb-3 font-mono">Lead: {note.lead_id}</div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded">{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
