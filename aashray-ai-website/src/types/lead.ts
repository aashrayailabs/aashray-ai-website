// src/types/lead.ts
// -------------------------------------------------------------------
// Lead-related TypeScript interfaces – shared across API, UI & services
// -------------------------------------------------------------------

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'won' | 'lost';

export interface Lead {
  id?: string; // UUID – assigned by DB
  full_name: string;
  business_name: string;
  email: string;
  phone: string;
  country: string;
  business_type: string;
  interest: string;
  budget: string;
  requirements: string;
  created_at?: string;
  status?: LeadStatus;
}

export interface LeadActivity {
  id?: string;
  lead_id: string;
  type: string; // e.g., 'email_sent', 'call_made', 'status_changed'
  payload: Record<string, unknown>;
  created_at?: string;
}

export interface LeadNote {
  id?: string;
  lead_id: string;
  author: string;
  content: string;
  created_at?: string;
}

export interface LeadTask {
  id?: string;
  lead_id: string;
  title: string;
  due_date?: string;
  completed: boolean;
  created_at?: string;
}

export interface Notification {
  id?: string;
  lead_id: string;
  channel: 'whatsapp' | 'email' | 'sms';
  status: 'pending' | 'sent' | 'failed';
  payload: Record<string, unknown>;
  created_at?: string;
}

export interface AuditLog {
  id?: number;
  lead_id: string;
  action: string;
  performed_by: string; // auth.user_id() or 'service_role'
  old_value?: Record<string, unknown>;
  new_value?: Record<string, unknown>;
  timestamp?: string;
}

export interface AgentMessage {
  id?: string;
  lead_id?: string; // Optional if tied to a lead
  agent_id: string;
  message: string;
  created_at?: string;
}

export interface ArchitectureRequest {
  id?: string;
  lead_id?: string;
  request_details: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  created_at?: string;
}
