"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, User, FileText, Repeat, HeartHandshake, Banknote, 
  Activity, Server, Smartphone, LayoutDashboard, Settings, BarChart3, Clock, 
  CheckCircle2, BellRing, Lock, MessageCircle, Building2, Zap, 
  ShoppingCart, Briefcase, HeartPulse, Landmark, Users, 
  Stethoscope, Send, Bot, Network, ChevronRight, Layers
} from "lucide-react";
import { useEffect, useState } from "react";

type Tab = "Overview" | "Business Case" | "Workflows";

export const INDUSTRY_DATA: Record<string, any> = {
  financial: {
    id: "financial",
    title: "Financial Services",
    icon: Landmark,
    accent: "cyan",
    nodes: [
      { icon: User, label: "Lead Ingest" },
      { icon: FileText, label: "KYC Extract" },
      { icon: ShieldCheck, label: "AML Match" },
      { icon: Users, label: "Human Over" },
      { icon: Server, label: "CRM Sync" }
    ],
    metrics: [
      { label: "KYC Records Parsed", start: 14208, prefix: "", suffix: "", step: 3 },
      { label: "Compliance Checks", start: 380, prefix: "", suffix: "+", step: 1 },
      { label: "AML Verification", start: 100, prefix: "", suffix: "%", step: 0 }
    ],
    feedEvents: [
      { msg: "KYC documentation validated for user R-990", icon: CheckCircle2, color: "text-green-400" },
      { msg: "AML screening complete - No matches found", icon: ShieldCheck, color: "text-emerald-400" },
      { msg: "Risk threshold check bypassed for VIP account", icon: BellRing, color: "text-orange-400" },
      { msg: "Ledger transaction synched to vault database", icon: Server, color: "text-cyan-400" }
    ],
    tableData: {
      headers: ["Record ID", "Client Name", "AML Status", "Routing State"],
      rows: [
        { id: "REC-9931", col2: "Rajiv Sharma", status: "Nominal", action: "Completed", color: "text-green-400", bg: "bg-green-400/10" },
        { id: "REC-7124", col2: "Aditi Patel", status: "Flagged (IP)", action: "Pending Review", color: "text-orange-400", bg: "bg-orange-400/10" },
        { id: "REC-8992", col2: "Sanjay Gupta", status: "Nominal", action: "Completed", color: "text-green-400", bg: "bg-green-400/10" }
      ]
    },
    challenges: [
      "KYC & AML processing bottlenecks causing customer onboarding delays.",
      "High costs and slow response times associated with manual transaction audits.",
      "Regulatory penalties due to human errors in compliance check tracking.",
      "Lack of centralized audit trails across multiple legacy database nodes."
    ],
    improvements: [
      "Automate data extraction from ID cards, reducing processing time from hours to seconds.",
      "Route transactions dynamically to human overrides only when specific risk flags trigger.",
      "Maintain a secure, immutable log of every compliance check for instant audit reporting.",
      "Provide real-time telemetry metrics on transaction latency and system throughput."
    ],
    workflowSteps: [
      { label: "Webhook Ingestion", detail: "Inbound customer onboarding data payload is received via HTTPS webhook." },
      { label: "AI Document Parsing", detail: "Optical AI extracts name, birthdate, and ID number from uploaded documents." },
      { label: "Compliance Risk Check", detail: "Extracted parameters are cross-referenced with regional AML lists." },
      { label: "Supervisor Review Gate", detail: "If a low-confidence score is flagged, the pipeline halts and routes to a supervisor console." },
      { label: "Database Synchronization", detail: "Validated customer record is populated across core ledger tables and CRM databases." }
    ]
  },
  document_operations: {
    id: "document_operations",
    title: "Document Operations",
    icon: ShieldCheck,
    accent: "emerald",
    nodes: [
      { icon: FileText, label: "Doc Ingest" },
      { icon: Bot, label: "Format Scan" },
      { icon: Activity, label: "Policy Check" },
      { icon: Users, label: "Operator Gate" },
      { icon: Smartphone, label: "Queue Dispatch" }
    ],
    metrics: [
      { label: "Documents Processed", start: 8912, prefix: "", suffix: "", step: 2 },
      { label: "Validation Rate", start: 94.2, prefix: "", suffix: "%", step: 0 },
      { label: "Avg Ingestion Time", start: 1.4, prefix: "", suffix: "s", step: 0 }
    ],
    feedEvents: [
      { msg: "Schema lookup complete for Document DOC-402", icon: CheckCircle2, color: "text-green-400" },
      { msg: "Structural layout anomaly detected in page 3", icon: BellRing, color: "text-orange-400" },
      { msg: "Policy governance checklist validated", icon: ShieldCheck, color: "text-emerald-400" },
      { msg: "Workflow dispatch notification triggered", icon: Smartphone, color: "text-blue-400" }
    ],
    tableData: {
      headers: ["Document ID", "Registrant", "Verification State", "Routing State"],
      rows: [
        { id: "DOC-1042", col2: "Rahul Mehta", status: "Validated", action: "Completed", color: "text-green-400", bg: "bg-green-400/10" },
        { id: "DOC-3312", col2: "Priya Singh", status: "Review Required", action: "Route to Operator", color: "text-orange-400", bg: "bg-orange-400/10" },
        { id: "DOC-8819", col2: "Vikram Shah", status: "Validated", action: "Completed", color: "text-green-400", bg: "bg-green-400/10" }
      ]
    },
    challenges: [
      "Document processing backlog due to manual verification of unstructured text layouts.",
      "High operational costs to verify regulatory details and correct document alignment errors.",
      "Poor workflow visibility caused by slow feedback loops and manual copy-pasting.",
      "Lack of centralized audit trails across multiple internal database subnets."
    ],
    improvements: [
      "Extract structured data from clinical/financial PDFs and text layouts instantly.",
      "Automate document verification checks against specific compliance guidelines.",
      "Integrate human review gates seamlessly so operators only evaluate custom exceptions.",
      "Trigger instant notifications and updates across client communication networks."
    ],
    workflowSteps: [
      { label: "Document Ingest Hook", detail: "Customer uploads transaction or registration PDF via gateway." },
      { label: "Format Scan & Verification", detail: "AI parses layout parameters to verify checklist rules and file structures." },
      { label: "Policy Compliance check", detail: "Document variables are cross-referenced with internal database systems." },
      { label: "Operator Review Gate", detail: "Low-confidence extraction values or layout anomalies route to a manual queue." },
      { label: "Queue Dispatch", detail: "Approved files write state updates directly to database logs." }
    ]
  },
  healthcare: {
    id: "healthcare",
    title: "Healthcare Systems",
    icon: HeartPulse,
    accent: "blue",
    nodes: [
      { icon: User, label: "Inquiry Ingest" },
      { icon: Stethoscope, label: "AI Triage" },
      { icon: Server, label: "EHR Index" },
      { icon: Clock, label: "Availability" },
      { icon: Send, label: "Booking" }
    ],
    metrics: [
      { label: "Intake Forms Parsed", start: 24501, prefix: "", suffix: "", step: 5 },
      { label: "HL7 Message Sync", start: 100, prefix: "", suffix: "%", step: 0 },
      { label: "Intake Success Rate", start: 100, prefix: "", suffix: "%", step: 0 }
    ],
    feedEvents: [
      { msg: "Patient triage payload parsed successfully", icon: FileText, color: "text-blue-400" },
      { msg: "EHR database synchronization complete", icon: Server, color: "text-green-400" },
      { msg: "Scheduling conflict resolved by AI", icon: Clock, color: "text-emerald-400" },
      { msg: "Confirmation dispatched via secure chat", icon: Send, color: "text-cyan-400" }
    ],
    tableData: {
      headers: ["Patient ID", "Inquiry Type", "Triage Score", "Booking Status"],
      rows: [
        { id: "PT-8812", col2: "J. Doe (Cardio)", status: "High Priority", action: "Assigned", color: "text-orange-400", bg: "bg-orange-400/10" },
        { id: "PT-4421", col2: "M. Smith (General)", status: "Routine", action: "Booked", color: "text-green-400", bg: "bg-green-400/10" },
        { id: "PT-9930", col2: "L. Johnson (Ortho)", status: "Routine", action: "Booked", color: "text-green-400", bg: "bg-green-400/10" }
      ]
    },
    challenges: [
      "Patient scheduling delays leading to open calendar slots and lost practice revenue.",
      "High administrative overhead compiling unstructured clinical intake forms.",
      "Data silos between electronic health records (EHR) and external registration apps.",
      "Strict HIPAA compliance requirements making automated database updates difficult."
    ],
    improvements: [
      "Triaging inbound inquiries based on urgency and physician availability schedules.",
      "Auto-extracting structured medical data from patient files without human transcription.",
      "Enforcing secure mTLS transmission protocols for all EHR communication pathways.",
      "Enabling instant booking confirmations while syncing availability real-time."
    ],
    workflowSteps: [
      { label: "Intake Hook Ingestion", detail: "Unstructured patient inquiry or clinic referral document is ingested." },
      { label: "Triage Classification", detail: "Clinical criteria parsing classifies patient priority and department requirements." },
      { label: "EHR Sync & Context Search", detail: "Secure query retrieves historical records from local EHR vaults." },
      { label: "Availability Routing", detail: "Orchestrator cross-references physician schedules to locate optimal open slots." },
      { label: "Secure Confirmation", detail: "Confirmed booking syncs with internal logs and alerts patient over secure SMS." }
    ]
  },
  realestate: {
    id: "realestate",
    title: "Real Estate Infrastructure",
    icon: Building2,
    accent: "emerald",
    nodes: [
      { icon: User, label: "Lead Capture" },
      { icon: Activity, label: "Intent Score" },
      { icon: Users, label: "Broker Match" },
      { icon: Clock, label: "Schedule Site" },
      { icon: FileText, label: "Offer Prep" }
    ],
    metrics: [
      { label: "Inbound Leads Routed", start: 7422, prefix: "", suffix: "", step: 1 },
      { label: "Route Match Rate", start: 99.8, prefix: "", suffix: "%", step: 0 },
      { label: "Routing Accuracy", start: 98.4, prefix: "", suffix: "%", step: 0 }
    ],
    feedEvents: [
      { msg: "Lead intake webhook received from portal", icon: CheckCircle2, color: "text-green-400" },
      { msg: "Buyer intent score classified: Hot", icon: Activity, color: "text-cyan-400" },
      { msg: "Matched broker assigned: West Zone", icon: Users, color: "text-emerald-400" },
      { msg: "Site visit confirmation dispatched", icon: Smartphone, color: "text-blue-400" }
    ],
    tableData: {
      headers: ["Lead ID", "Property Budget", "Agent Assigned", "Interaction State"],
      rows: [
        { id: "LD-552", col2: "INR 4.5 Cr", status: "Agent Active", action: "Site Visit Booked", color: "text-green-400", bg: "bg-green-400/10" },
        { id: "LD-881", col2: "INR 2.1 Cr", status: "Agent Active", action: "Catalog Sent", color: "text-blue-400", bg: "bg-blue-400/10" },
        { id: "LD-993", col2: "INR 8.5 Cr", status: "Routing Pending", action: "Review Assignment", color: "text-orange-400", bg: "bg-orange-400/10" }
      ]
    },
    challenges: [
      "Delayed broker response times leading to lost real estate leads and buyer churn.",
      "Incorrect buyer budget classification leading to misaligned property matching.",
      "Fragmented scheduling systems making physical site-visit bookings friction-filled.",
      "Lack of centralized tracking for agreement offers and client interaction history."
    ],
    improvements: [
      "Route buyer details to localized, active brokers within minutes of capture.",
      "Analyze buyer intent, budget restrictions, and preferences via conversational inputs.",
      "Synchronize client calendars with broker availability to arrange site visits instantly.",
      "Track offer drafts and agreement states automatically inside CRM dashboards."
    ],
    workflowSteps: [
      { label: "Lead Hook Ingestion", detail: "Buyer inquiry is captured from property portals or listing websites." },
      { label: "Buyer Intent Extraction", detail: "AI extracts budget parameters, location preferences, and timeframe metrics." },
      { label: "Broker Matching Algorithm", detail: "Deterministic routing rules assign the lead to the best matching regional broker." },
      { label: "Site Visit Coordination", detail: "Integrated calendar API selects appointment times and books slots." },
      { label: "CRM Sync & Lead Log", detail: "Lead profile, broker mapping, and timeline are populated in Salesforce database." }
    ]
  },
  enterprise: {
    id: "enterprise",
    title: "Policy Governance",
    icon: Network,
    accent: "cyan",
    nodes: [
      { icon: FileText, label: "Intake Ingest" },
      { icon: Bot, label: "Schema Match" },
      { icon: ShieldCheck, label: "Compliance" },
      { icon: Users, label: "Operator Gate" },
      { icon: Server, label: "Registry Sync" }
    ],
    metrics: [
      { label: "Payloads Orchestrated", start: 34102, prefix: "", suffix: "", step: 8 },
      { label: "Schema Match Rate", start: 97.8, prefix: "", suffix: "%", step: 0 },
      { label: "Audit Uptime", start: 100, prefix: "", suffix: "%", step: 0 }
    ],
    feedEvents: [
      { msg: "Operational payload ingested from systems queue", icon: FileText, color: "text-blue-400" },
      { msg: "Metadata verified against index table PO-88", icon: CheckCircle2, color: "text-green-400" },
      { msg: "Organization policy compliance check completed", icon: ShieldCheck, color: "text-emerald-400" },
      { msg: "Registry record committed to central database", icon: Server, color: "text-cyan-400" }
    ],
    tableData: {
      headers: ["Process ID", "Origin Entity", "Status", "Routing State"],
      rows: [
        { id: "OP-902", col2: "Acme Systems", status: "Validated", action: "Completed", color: "text-green-400", bg: "bg-green-400/10" },
        { id: "OP-115", col2: "Beta Labs", status: "Review Required", action: "Route to Operations Head", color: "text-orange-400", bg: "bg-orange-400/10" },
        { id: "OP-441", col2: "Global Corp", status: "Validated", action: "Completed", color: "text-green-400", bg: "bg-green-400/10" }
      ]
    },
    challenges: [
      "Manual verification of data payloads causing synchronization delays.",
      "High operational costs to manually verify and audit schema formats.",
      "Slow, manual reviews between internal groups blocking database sync.",
      "Security compliance risks with unverified files directly updating registry cores."
    ],
    improvements: [
      "Match payload lines against structural guidelines dynamically.",
      "Enforce compliance and verification boundaries before database updates.",
      "Introduce state-persistent human-in-the-loop review nodes for discrepancies.",
      "Maintain encrypted, step-level audit trails of every database write."
    ],
    workflowSteps: [
      { label: "Systems Intake", detail: "Billing system intercepts incoming transaction payload." },
      { label: "Schema Validation", detail: "AI reads payload layout, extracting quantities and origin metadata." },
      { label: "PO Index Matching", detail: "Systems query the registry database to match transaction parameters." },
      { label: "Operational Review Gate", detail: "Flagged policy exceptions trigger a validation hold and alert the supervisor." },
      { label: "Audit Ledger Sync", detail: "Validated transactions write state updates directly to database logs." }
    ]
  },
  ecommerce: {
    id: "ecommerce",
    title: "Ecommerce Automation",
    icon: ShoppingCart,
    accent: "violet",
    nodes: [
      { icon: MessageCircle, label: "Chat Ingress" },
      { icon: Bot, label: "Intent Parse" },
      { icon: Server, label: "Order Query" },
      { icon: Users, label: "Support Route" },
      { icon: CheckCircle2, label: "Resolve Log" }
    ],
    metrics: [
      { label: "Queries Auto-Resolved", start: 62451, prefix: "", suffix: "", step: 12 },
      { label: "Support Ticket Deflection", start: 68.4, prefix: "", suffix: "%", step: 0 },
      { label: "Query Response Time", start: 180, prefix: "", suffix: "ms", step: 0 }
    ],
    feedEvents: [
      { msg: "Order status query received from customer", icon: MessageCircle, color: "text-blue-400" },
      { msg: "Intent identified: WISMO (Tracking)", icon: Bot, color: "text-cyan-400" },
      { msg: "Fulfillment coordinates pulled from db", icon: Server, color: "text-green-400" },
      { msg: "Auto-reply dispatched with tracking link", icon: CheckCircle2, color: "text-emerald-400" }
    ],
    tableData: {
      headers: ["Ticket ID", "Customer", "Intent Category", "Current State"],
      rows: [
        { id: "TK-4431", col2: "Amit Sharma", status: "Auto-Resolved", action: "Resolved", color: "text-green-400", bg: "bg-green-400/10" },
        { id: "TK-9082", col2: "Rohan Das", status: "Refund Escalation", action: "Assigned to Agent", color: "text-orange-400", bg: "bg-orange-400/10" },
        { id: "TK-7712", col2: "Neha Gupta", status: "Auto-Resolved", action: "Resolved", color: "text-green-400", bg: "bg-green-400/10" }
      ]
    },
    challenges: [
      "High volume of repetitive support tickets ('Where is my order?') overloading agents.",
      "Customer frustration caused by delayed response times on messaging channels.",
      "Disconnected inventory systems leading to incorrect package tracking updates.",
      "Lack of clean audit trails logging automated responses inside enterprise CRMs."
    ],
    improvements: [
      "Classify customer request intent dynamically and retrieve order logs instantly.",
      "Deflect routine questions using verified knowledge base index lookups.",
      "Route payment and refund escalations directly to human customer service managers.",
      "Sync customer communication history automatically back to core CRM systems."
    ],
    workflowSteps: [
      { label: "Customer Message Intake", detail: "Customer queries order tracking status over WhatsApp, Web, or SMS." },
      { label: "Intent Parsing", detail: "Intent parser classifies query as 'WISMO' and pulls out the order number." },
      { label: "Inventory Lookup", detail: "Orchestrator queries inventory databases to retrieve current shipping status." },
      { label: "Deflection Dispatch", detail: "Automated tracking link, courier info, and arrival timeline are texted to customer." },
      { label: "CRM Engagement Sync", detail: "The interaction transcript and deflection metrics are pushed to Salesforce Service Cloud." }
    ]
  },
  services: {
    id: "services",
    title: "Service Businesses",
    icon: Briefcase,
    accent: "violet",
    nodes: [
      { icon: FileText, label: "Contract Sign" },
      { icon: Bot, label: "Workspace Gen" },
      { icon: Server, label: "Trello Sync" },
      { icon: Layers, label: "Workspace Audit" },
      { icon: Send, label: "Welcome Mail" }
    ],
    metrics: [
      { label: "Onboardings Synced", start: 1840, prefix: "", suffix: "", step: 1 },
      { label: "Intake Queue Uptime", start: 100, prefix: "", suffix: "%", step: 0 },
      { label: "Manual Steps Saved", start: 5, prefix: "", suffix: " / client", step: 0 }
    ],
    feedEvents: [
      { msg: "Signed contract received from portal", icon: FileText, color: "text-green-400" },
      { msg: "Client shared drive directories created", icon: Bot, color: "text-blue-400" },
      { msg: "Project checklist templates populated", icon: Server, color: "text-cyan-400" },
      { msg: "Onboarding checklist dispatched to client", icon: Layers, color: "text-emerald-400" }
    ],
    tableData: {
      headers: ["Client ID", "Onboarding Status", "Onboarding Tasks", "Actions Taken"],
      rows: [
        { id: "CL-902", col2: "Active", status: "Task Setup Complete", action: "Welcome Sent", color: "text-green-400", bg: "bg-green-400/10" },
        { id: "CL-115", col2: "Pending Docs", status: "Awaiting Finance ID", action: "Send Reminder", color: "text-orange-400", bg: "bg-orange-400/10" },
        { id: "CL-441", col2: "Active", status: "Task Setup Complete", action: "Welcome Sent", color: "text-green-400", bg: "bg-green-400/10" }
      ]
    },
    challenges: [
      "Manual client onboarding processes delaying project kickoff timelines.",
      "High human effort required to duplicate task checklists across task boards.",
      "Delayed invoicing and billing setups hurting agency cash flow.",
      "Scattered onboarding documents causing compliance tracking gaps."
    ],
    improvements: [
      "Trigger onboarding workflows immediately when contracts are signed.",
      "Automate shared folder, workspace, and project board template creations.",
      "Sync billing parameters directly to QuickBooks/Stripe upon registration.",
      "Ensure clean client data organization with central execution dashboards."
    ],
    workflowSteps: [
      { label: "Contract Signed Event", detail: "Webhook catches contract signature event from DocuSign or PandaDoc." },
      { label: "Workspace Creation", detail: "System generates shared Google Drive folders and Slack workspace channels." },
      { label: "Task Checklist Populate", detail: "Standard project boards (Trello/Asana) are populated with onboarding checklists." },
      { label: "Operational Review", detail: "Systems compile client profiles and populate workspace registers." },
      { label: "Welcome Notification", detail: "Personalized onboarding checklist links and folders are emailed to primary client contact." }
    ]
  },
  operational: {
    id: "operational",
    title: "Operational Teams",
    icon: Activity,
    accent: "orange",
    nodes: [
      { icon: BellRing, label: "Alert Ingress" },
      { icon: Bot, label: "Triage Score" },
      { icon: FileText, label: "Runbook Pull" },
      { icon: Users, label: "On-Call Pager" },
      { icon: CheckCircle2, label: "Audit Log Sync" }
    ],
    metrics: [
      { label: "Alerts Ingested/min", start: 2450, prefix: "", suffix: "", step: 4 },
      { label: "MTTR Reduction", start: 35.6, prefix: "", suffix: "%", step: 0 },
      { label: "Mitigation Success", start: 99.8, prefix: "", suffix: "%", step: 0 }
    ],
    feedEvents: [
      { msg: "Server warning alert intercepted from PagerDuty", icon: BellRing, color: "text-orange-400" },
      { msg: "Severity classified: Medium priority", icon: Bot, color: "text-cyan-400" },
      { msg: "Mitigation runbook commands fetched", icon: FileText, color: "text-blue-400" },
      { msg: "Incident details synced to Slack channel #ops", icon: CheckCircle2, color: "text-green-400" }
    ],
    tableData: {
      headers: ["Alert ID", "Component", "Severity Level", "Mitigation Status"],
      rows: [
        { id: "ALT-902", col2: "Database Node B", status: "Mitigated", action: "Runbook Executed", color: "text-green-400", bg: "bg-green-400/10" },
        { id: "ALT-115", col2: "Fulfillment Gateway", status: "Active Anomaly", action: "Paged On-Call Engineer", color: "text-orange-400", bg: "bg-orange-400/10" },
        { id: "ALT-441", col2: "Load Balancer C", status: "Mitigated", action: "Runbook Executed", color: "text-green-400", bg: "bg-green-400/10" }
      ]
    },
    challenges: [
      "Alert fatigue causing team members to miss critical infrastructure outages.",
      "High Mean Time to Resolution (MTTR) due to manual diagnostics and runbook searches.",
      "Human errors during manual triaging and incident escalation workflows.",
      "Lack of centralized logs tracing mitigation steps taken by engineers."
    ],
    improvements: [
      "Categorize alerts based on historical telemetry baselines dynamically.",
      "Automate initial diagnostics, pulling corresponding runbooks for on-call engineers.",
      "Route severe outages directly to active schedules, minimizing delay.",
      "Log every alert, diagnostic outcome, and mitigation action for post-mortem audits."
    ],
    workflowSteps: [
      { label: "Alert Hook Ingestion", detail: "System warnings are received from Datadog, Prometheus, or cloud monitoring nodes." },
      { label: "Telemetry Anomaly Triage", detail: "Alert magnitude is compared against statistical baselines to filter out noise." },
      { label: "Runbook Retrieval", detail: "AI pulls pre-validated troubleshooting guides matching the specific incident type." },
      { label: "Engineer Escalation", detail: "Critical issues route alert details and runbooks to active engineer pager systems." },
      { label: "Post-Mortem Logging", detail: "Diagnostics, on-call responses, and resolutions are compiled in secure database logs." }
    ]
  }
};

export default function DynamicIndustryShowcase({ activeIndustryId }: { activeIndustryId: string }) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  
  const data = INDUSTRY_DATA[activeIndustryId] || INDUSTRY_DATA.financial;
  
  // Live Metrics State
  const [m1, setM1] = useState(data.metrics[0].start);
  const [m2, setM2] = useState(data.metrics[1].start);

  // Live Activity Feed State
  const [feed, setFeed] = useState(data.feedEvents.map((e: any, i: number) => ({ id: i, time: i === 0 ? "Just now" : `${i}m ago`, ...e })));

  useEffect(() => {
    setMounted(true);
    // Reset state when industry changes
    setM1(data.metrics[0].start);
    setM2(data.metrics[1].start);
    setFeed(data.feedEvents.map((e: any, i: number) => ({ id: Date.now() + i, time: i === 0 ? "Just now" : `${i}m ago`, ...e })));
    
    const metricInterval = setInterval(() => {
      setM1((prev: number) => prev + data.metrics[0].step);
      setM2((prev: number) => prev + data.metrics[1].step);
    }, 4000);

    const feedInterval = setInterval(() => {
      const randomEvent = data.feedEvents[Math.floor(Math.random() * data.feedEvents.length)];
      setFeed((prev: any) => {
        const newFeed = [{ id: Date.now(), time: "Just now", ...randomEvent }, ...prev];
        return newFeed.slice(0, 5);
      });
    }, 8000);

    return () => {
      clearInterval(metricInterval);
      clearInterval(feedInterval);
    };
  }, [activeIndustryId, data]);

  if (!mounted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      key={activeIndustryId} // Force remount animation on industry change
      className="w-full bg-[#030303] rounded-xl border border-white/10 overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.05)] flex flex-col md:flex-row h-[750px] font-sans"
    >
      
      {/* ---------------- LEFT SIDEBAR (Navigation) ---------------- */}
      <div className="w-full md:w-64 bg-[#080808] border-r border-white/5 flex flex-col shrink-0">
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2 h-2 rounded-full animate-pulse ${data.accent === 'emerald' ? 'bg-emerald-500' : 'bg-cyan-500'}`} />
            <h3 className="text-xs font-bold text-white tracking-widest uppercase">Command Center</h3>
          </div>
          <p className="text-[10px] text-gray-500 font-mono">{data.title}</p>
        </div>
        
        <div className="p-3 space-y-1">
          {(["Overview", "Business Case", "Workflows"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all ${
                activeTab === tab 
                  ? "bg-white/10 text-white border border-white/20" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
              }`}
            >
              {tab === "Overview" && <LayoutDashboard className="w-4 h-4" />}
              {tab === "Business Case" && <Briefcase className="w-4 h-4" />}
              {tab === "Workflows" && <Settings className="w-4 h-4" />}
              {tab}
            </button>
          ))}
        </div>

        {/* Intelligence Telemetry Rail */}
        <div className="p-5 flex-1 flex flex-col justify-end gap-4 opacity-80">
          <div className="space-y-3">
            {[
              { label: "AI PIPELINE STATUS", value: "NOMINAL", color: "text-emerald-400", bg: "bg-emerald-500" },
              { label: "EXECUTION INTEGRITY", value: "VERIFIED", color: "text-cyan-400", bg: "bg-cyan-500" },
              { label: "EDGE PIPELINES", value: "ACTIVE", color: "text-emerald-400", bg: "bg-emerald-500" },
              { label: "AUDIT NODE LOGS", value: "ACTIVE", color: "text-cyan-400", bg: "bg-cyan-500" }
            ].map((stat, i) => (
              <div key={i} className="flex justify-between items-end border-b border-white/[0.03] pb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-1 h-1 rounded-full animate-pulse ${stat.bg} shadow-[0_0_8px_currentColor]`} style={{ color: stat.bg.replace('bg-', '') }} />
                  <span className="text-[9px] text-gray-500 font-mono tracking-widest uppercase">{stat.label}</span>
                </div>
                <span className={`text-[10px] font-mono font-bold ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-2 h-10 relative flex items-end justify-between opacity-20">
             {[...Array(20)].map((_, i) => {
               const heightPercent = 20 + ((i * 13) % 80);
               const durationVal = 1.5 + ((i * 7) % 10) / 10;
               return (
                 <motion.div
                   key={i}
                   className="w-1 bg-cyan-400 rounded-t-sm"
                   animate={{ height: ["20%", `${heightPercent}%`, "20%"] }}
                   transition={{ duration: durationVal, repeat: Infinity, ease: "easeInOut" }}
                 />
               );
             })}
          </div>
        </div>

        <div className="p-5 border-t border-white/5 bg-[#050505]">
          <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-2">
            <Lock className="w-3 h-3" /> Encrypted Processing
          </div>
        </div>
      </div>

      {/* ---------------- CENTER CONSOLE (The Engine) ---------------- */}
      <div className="flex-1 flex flex-col bg-[#020202] relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-center opacity-20 pointer-events-none" />

        {/* Top Metrics Row */}
        <div className="grid grid-cols-3 gap-4 p-6 border-b border-white/5 relative z-10 bg-black/40 backdrop-blur-md">
          <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">{data.metrics[0].label}</p>
            <p className="text-2xl font-mono text-white flex items-center gap-2">
              {data.metrics[0].prefix}{m1.toLocaleString()}{data.metrics[0].suffix} <span className="text-xs text-green-400 font-sans animate-pulse">+</span>
            </p>
          </div>
          <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-4 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-16 h-16 blur-xl rounded-full ${data.accent === 'emerald' ? 'bg-emerald-500/10' : 'bg-cyan-500/10'}`} />
            <p className={`text-[10px] uppercase tracking-widest font-bold mb-1 ${data.accent === 'emerald' ? 'text-emerald-500' : 'text-cyan-500'}`}>{data.metrics[1].label}</p>
            <p className={`text-2xl font-mono ${data.accent === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'}`}>{data.metrics[1].prefix}{m2.toLocaleString()}{data.metrics[1].suffix}</p>
          </div>
          <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">{data.metrics[2].label}</p>
            <p className="text-2xl font-mono text-white">{data.metrics[2].prefix}{data.metrics[2].start}{data.metrics[2].suffix}</p>
          </div>
        </div>

        {/* Main View Area */}
        <div className="flex-1 overflow-y-auto p-6 relative z-10">
          <AnimatePresence mode="wait">
            
            {activeTab === "Overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Live AI Orchestration Pipeline</h2>
                  
                  {/* Animated Workflow Visualizer */}
                  <div className="relative py-12 px-6 bg-[#050505] border border-white/5 rounded-xl mt-6">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: '50%', transform: 'translateY(-50%)' }}>
                       <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="5,5" />
                       <motion.line 
                         x1="10%" y1="50%" x2="90%" y2="50%" 
                         stroke="#06b6d4" strokeWidth="2" 
                         initial={{ strokeDasharray: "0, 1000" }}
                         animate={{ strokeDasharray: ["0, 1000", "1000, 0"] }}
                         transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                       />
                    </svg>
                    
                    <div className="flex justify-between relative z-10">
                      {data.nodes.map((node: any, i: number) => (
                        <div key={i} className="flex flex-col items-center">
                          <motion.div 
                            className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(0,0,0,0.5)] relative"
                            whileHover={{ scale: 1.1, borderColor: "#06b6d4" }}
                          >
                            <node.icon className="w-5 h-5 text-gray-400" />
                            {i === 3 && (
                               <motion.span 
                                 className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-500 rounded-full border border-black"
                                 animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                 transition={{ duration: 2, repeat: Infinity }}
                               />
                            )}
                          </motion.div>
                          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider bg-black/50 px-2 py-1 rounded">{node.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-[#050505] border border-white/5 rounded-xl overflow-hidden mt-6">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#111] border-b border-white/5 text-[10px] uppercase tracking-widest text-gray-500">
                      <tr>
                        {data.tableData.headers.map((h: string, i: number) => (
                          <th key={i} className="p-4 font-semibold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-gray-300">
                      {data.tableData.rows.map((row: any, i: number) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors cursor-pointer">
                          <td className="p-4 font-mono text-xs">{row.id}</td>
                          <td className="p-4">{row.col2}</td>
                          <td className="p-4">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm ${row.color} ${row.bg}`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="p-4 text-xs text-gray-400">{row.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === "Business Case" && (
              <motion.div
                key="business"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-xl font-bold text-white">Business Value Strategy</h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-[#080808] border border-white/5 p-6 rounded-xl">
                    <h3 className="text-sm font-mono text-orange-400 uppercase tracking-widest mb-4">Business Challenges</h3>
                    <ul className="space-y-3">
                      {data.challenges.map((challenge: string, i: number) => (
                        <li key={i} className="text-xs text-gray-400 leading-relaxed flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#080808] border border-white/5 p-6 rounded-xl">
                    <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-4">AI Operational Improvements</h3>
                    <ul className="space-y-3">
                      {data.improvements.map((improvement: string, i: number) => (
                        <li key={i} className="text-xs text-gray-400 leading-relaxed flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "Workflows" && (
              <motion.div
                key="workflows"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-xl font-bold text-white">Workflow Automation Timeline</h2>
                </div>

                <div className="bg-[#080808] border border-white/5 p-6 rounded-xl space-y-6">
                  {data.workflowSteps.map((step: any, i: number) => (
                    <div key={i} className="flex gap-4 items-start relative">
                      <span className="w-6 h-6 rounded-full bg-[#050505] border border-cyan-500/30 flex items-center justify-center text-[10px] font-mono text-cyan-400 shrink-0">
                        {`0${i + 1}`}
                      </span>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                          {step.label}
                          {i < data.workflowSteps.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-gray-600 hidden sm:inline" />}
                        </h4>
                        <p className="text-[11px] text-gray-500 font-medium mt-0.5 leading-relaxed">{step.detail}</p>
                      </div>
                      {i < data.workflowSteps.length - 1 && (
                        <div className="absolute left-3 top-6 bottom-[-24px] w-[1px] bg-white/10" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* ---------------- RIGHT SIDEBAR (Live Activity Feed) ---------------- */}
      <div className="w-full md:w-72 bg-[#050505] border-l border-white/5 flex flex-col shrink-0">
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-xs font-bold text-white tracking-widest uppercase">Live Activity</h3>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] font-mono text-green-500">SYSTEM ONLINE</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden relative p-4">
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#050505] to-transparent z-10" />
          
          <div className="space-y-3 relative z-0">
            <AnimatePresence>
              {feed.map((event: any) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 20, backgroundColor: "rgba(6, 182, 212, 0.2)" }}
                  animate={{ opacity: 1, x: 0, backgroundColor: "rgba(0,0,0,0)" }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="p-3 rounded-lg border border-white/[0.03] bg-[#0a0a0a] flex gap-3"
                >
                  <event.icon className={`w-4 h-4 mt-0.5 shrink-0 ${event.color}`} />
                  <div>
                    <p className="text-xs text-gray-300 leading-snug">{event.msg}</p>
                    <p className="text-[9px] text-gray-600 font-mono mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {event.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

    </motion.div>
  );
}
