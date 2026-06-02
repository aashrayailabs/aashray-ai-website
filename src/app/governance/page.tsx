"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, UserCheck, Eye, RefreshCw, Terminal, CheckCircle2, AlertTriangle, Play, FileText, Ban } from "lucide-react";
import Link from "next/link";

interface Transaction {
  id: string;
  type: string;
  amount: string;
  description: string;
  status: "idle" | "running" | "hitl" | "completed" | "rejected";
  details: string;
}

export default function GovernancePage() {
  const [activeTx, setActiveTx] = useState<Transaction | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [hitlStage, setHitlStage] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const transactions: Transaction[] = [
    {
      id: "TX-901",
      type: "Claims Auto-Settlement",
      amount: "$3,450.00 USD",
      description: "Auto-approve policy reimbursement under the $5,000.00 organizational threshold.",
      status: "idle",
      details: "Claimant ID: CLM-889 • Incident: Windshield Damage • SOP: AutoReimburse_v2"
    },
    {
      id: "TX-902",
      type: "Enterprise Fund Routing",
      amount: "$15,000.00 USD",
      description: "Outbound supplier wire transfer exceeding standard autonomous thresholds.",
      status: "idle",
      details: "Vendor: TechComponents Inc • Ledger Code: VND-402 • SOP: OutboundWire_v4"
    },
    {
      id: "TX-903",
      type: "Lease Agreement Compilation",
      amount: "N/A",
      description: "Compile tenant contract containing flagged custom legal liability language.",
      status: "idle",
      details: "Tenant: LogisticsCorp • Premise: Suite 402B • SOP: LeaseContractDraft_v1"
    }
  ];

  // Auto-scroll logs to bottom
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (text: string, delay: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const time = new Date().toLocaleTimeString();
        setLogs((prev) => [...prev, `[${time}] ${text}`]);
        resolve();
      }, delay);
    });
  };

  const runSimulation = async (tx: Transaction) => {
    if (isSimulating) return;
    setIsSimulating(true);
    setHitlStage(false);
    setProgressStep(0);
    setActiveTx({ ...tx, status: "running" });
    setLogs([]);

    await addLog("INIT: Ingesting transaction payload...", 500);
    setProgressStep(1);
    await addLog(`INGEST: ID ${tx.id} resolved as ${tx.type}.`, 600);
    await addLog(`DECRYPT: Serializing payload parameters. Schema verified.`, 500);
    
    await addLog("SECURITY: Executing PII scrub. No sensitive attributes leaked.", 600);
    setProgressStep(2);
    await addLog("POLICY: Evaluating organizational boundary rules...", 500);

    if (tx.id === "TX-901") {
      // Auto settlement simulation
      await addLog("POLICY: Checked amount $3,450.00 against $5,000.00 auto-limit. [PASSED]", 800);
      await addLog("AUTH: Agent 'claims_eval_09' possesses active credential role 'claims:approve'.", 500);
      setProgressStep(3);
      await addLog("AUDIT: Compiling cryptographic signature ledger hash.", 700);
      await addLog("EGRESS: Executing dispatch via secure API gateway.", 600);
      setProgressStep(4);
      await addLog(`COMPLETED: Transaction ${tx.id} executed successfully.`, 500);
      setIsSimulating(false);
      setActiveTx({ ...tx, status: "completed" });
    } else if (tx.id === "TX-902") {
      // Outbound wire exceeding limit (requires human-in-the-loop approval)
      await addLog("POLICY: Checked amount $15,000.00 against $5,000.00 auto-limit. [FLAGGED]", 800);
      await addLog("POLICY: Outbound wire limits exceeded. Suspended agent automated dispatch.", 500);
      setProgressStep(3);
      await addLog("GATEWAY: Generating Human-in-the-Loop authorization request...", 600);
      await addLog("ALERT: Pushed request to human operations queue. Awaiting signature.", 500);
      setHitlStage(true);
      setActiveTx({ ...tx, status: "hitl" });
    } else if (tx.id === "TX-903") {
      // Custom lease clause flagged
      await addLog("POLICY: Custom text detected in clause 'section_indemnity_09'.", 800);
      await addLog("POLICY: Syntactic comparison shows deviation from standard legal SOP templates. [FLAGGED]", 600);
      setProgressStep(3);
      await addLog("GATEWAY: Generating Human-in-the-Loop review request...", 500);
      await addLog("ALERT: Awaiting human legal counsel confirmation.", 500);
      setHitlStage(true);
      setActiveTx({ ...tx, status: "hitl" });
    }
  };

  const handleHitlAction = async (approved: boolean) => {
    setHitlStage(false);
    if (!activeTx) return;

    if (approved) {
      setActiveTx({ ...activeTx, status: "running" });
      await addLog("HUMAN: Auth token received from administrator 'usr_sec_ops_04'. Signature valid.", 600);
      await addLog("AUTH: Injecting manual override credentials into execution pipeline.", 500);
      await addLog("AUDIT: Logging human authorization reference hash to ledger.", 700);
      setProgressStep(3);
      await addLog("EGRESS: Executing dispatch via secure API gateway.", 600);
      setProgressStep(4);
      await addLog(`COMPLETED: Transaction ${activeTx.id} dispatched successfully.`, 500);
      setActiveTx({ ...activeTx, status: "completed" });
    } else {
      setActiveTx({ ...activeTx, status: "running" });
      await addLog("HUMAN: Rejection command received from administrator. Halting transaction.", 600);
      await addLog("COMPLIANCE: Initiating rollback protocol. Reversing intermediate states.", 500);
      await addLog("AUDIT: Ledger hash written for REJECTED state.", 700);
      setProgressStep(4);
      await addLog(`REJECTED: Transaction ${activeTx.id} safely terminated.`, 500);
      setActiveTx({ ...activeTx, status: "rejected" });
    }
    setIsSimulating(false);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#faf9f6] text-zinc-700 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.015] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-200 bg-teal-50/50 mb-6 font-semibold">
            <UserCheck className="w-3.5 h-3.5 text-teal-700" />
            <span className="text-[10px] font-mono text-teal-800 tracking-wider uppercase font-semibold">Governance &amp; Oversight</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 mb-6 font-display">
            Autonomous Systems <br /> With <span className="text-zinc-500">Deterministic Control</span>
          </h1>
          <p className="text-lg text-zinc-600 font-medium leading-relaxed">
            MitraAI operates within strict organizational boundaries. By wrapping autonomous AI models in code-enforced rules engines, we guarantee predictable compliance and rollback safety.
          </p>
        </div>

        {/* Audit Sandbox Section */}
        <section className="mb-24">
          <div className="text-center md:text-left mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 mb-3 font-display">Operational Audit Sandbox</h2>
            <p className="text-sm text-zinc-500 font-semibold max-w-xl leading-relaxed">Run simulated enterprise operations to observe how policy boundaries trigger human-in-the-loop checks and log audits.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* LEFT Panel: Selector (5 cols) - Styled elegantly in light/dark blend container */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {transactions.map((tx) => {
                const isActive = activeTx?.id === tx.id;
                return (
                  <div
                    key={tx.id}
                    onClick={() => !isSimulating && runSimulation(tx)}
                    className={`p-6 rounded-2xl border text-left cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                      isSimulating && !isActive ? "opacity-40 pointer-events-none" : ""
                    } ${
                      isActive 
                        ? "border-teal-500 bg-teal-50/50 shadow-[0_4px_16px_rgba(24,24,27,0.04)]" 
                        : "border-zinc-200 bg-white hover:border-zinc-300 shadow-sm"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-400 font-bold tracking-wider uppercase">{tx.id}</span>
                        <h4 className="text-sm font-bold text-zinc-800 mt-0.5">{tx.type}</h4>
                      </div>
                      {tx.amount !== "N/A" && (
                        <span className="text-xs font-mono font-bold text-teal-700">{tx.amount}</span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed font-semibold mb-4">{tx.description}</p>
                    
                    <div className="flex justify-between items-center pt-3 border-t border-zinc-100">
                      <span className="text-[9px] text-zinc-400 font-mono italic">Click to audit SOP</span>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-800">
                        {isActive && activeTx.status === "completed" && <span className="text-emerald-600 text-[10px] font-bold">VERIFIED</span>}
                        {isActive && activeTx.status === "rejected" && <span className="text-rose-600 text-[10px] font-bold">HALTED</span>}
                        {isActive && activeTx.status === "hitl" && <span className="text-teal-700 text-[10px] animate-pulse font-bold">PENDING AUTH</span>}
                        {isActive && activeTx.status === "running" && <span className="text-zinc-500 text-[10px]">RUNNING</span>}
                        {(!isActive || activeTx.status === "idle") && (
                          <>
                            <Play className="w-3 h-3 text-teal-750" />
                            <span className="text-teal-750 text-[10px] uppercase font-mono font-bold tracking-wider">Run Audit</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT Panel: Live Console & Outputs (7 cols) - Dark console contrast */}
            <div className="lg:col-span-7 flex flex-col rounded-3xl border border-white/5 bg-[#0c0d0f] overflow-hidden min-h-[450px]">
              {/* Console Header */}
              <div className="px-6 py-4 bg-[#111215] border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-500" />
                  <span className="text-xs font-mono font-bold text-white">Compliance Terminal Log</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-wider">Operational Mode</span>
                </div>
              </div>

              {/* Console Output Area */}
              <div 
                ref={logContainerRef}
                className="flex-1 p-6 font-mono text-[11px] text-gray-400 overflow-y-auto space-y-2.5 max-h-[300px] min-h-[220px] bg-black/40"
              >
                {logs.length > 0 ? (
                  logs.map((log, index) => {
                    const isPassed = log.includes("[PASSED]");
                    const isFlagged = log.includes("[FLAGGED]");
                    const isCompleted = log.includes("COMPLETED");
                    const isHalted = log.includes("REJECTED") || log.includes("HALTED");
                    
                    let textColor = "text-gray-400";
                    if (isPassed) textColor = "text-emerald-400 font-semibold";
                    if (isFlagged) textColor = "text-cyan-400 font-semibold";
                    if (isCompleted) textColor = "text-emerald-400 font-bold";
                    if (isHalted) textColor = "text-red-400 font-bold";

                    return (
                      <div key={index} className={`leading-relaxed border-l-2 border-white/5 pl-2 ${textColor}`}>
                        {log}
                      </div>
                    );
                  })
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-600 font-sans text-xs">
                    <Terminal className="w-8 h-8 text-neutral-800 mb-3" />
                    <span>Select an operational SOP transaction from the left panel</span>
                    <span>to trigger the compliance verification trace.</span>
                  </div>
                )}

                {/* HITL Intervention Modal inside Console */}
                <AnimatePresence>
                  {hitlStage && activeTx && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-6 p-5 rounded-2xl bg-[#111215] border border-cyan-500/30 text-sans font-sans relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/[0.01] blur-xl rounded-full" />
                      <div className="flex gap-3 mb-4">
                        <AlertTriangle className="w-5 h-5 text-cyan-400 shrink-0" />
                        <div>
                          <h5 className="text-xs font-bold text-white uppercase tracking-wider">Human-In-The-Loop Validation Required</h5>
                          <p className="text-[11px] text-zinc-400 mt-1 font-medium leading-relaxed">
                            {activeTx.id === "TX-902" 
                              ? "Wire transfer exceeds standard authorization scope. Signature override required to dispatch funds."
                              : "Custom indemnity text deviates from approved legal template. Review required by corporate counsel."}
                          </p>
                        </div>
                      </div>

                      <div className="p-3 rounded bg-black/60 border border-white/5 font-mono text-[10px] text-zinc-500 mb-4">
                        {activeTx.details}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleHitlAction(true)}
                          className="flex-1 py-2 rounded-lg bg-white text-black text-xs font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          Approve Operation
                        </button>
                        <button
                          onClick={() => handleHitlAction(false)}
                          className="flex-1 py-2 rounded-lg border border-white/10 hover:border-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Reject &amp; Rollback
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Checkpoint Pipeline visual (Footer of console) */}
              <div className="px-6 py-4 bg-[#111215] border-t border-white/5 flex justify-between items-center gap-2">
                {[
                  { name: "Scrub", step: 1 },
                  { name: "Rules Engine", step: 2 },
                  { name: "Auth Scope", step: 3 },
                  { name: "Signed Output", step: 4 }
                ].map((item, i) => {
                  const isActive = progressStep >= item.step;
                  return (
                    <div key={i} className="flex items-center gap-2 flex-1 justify-center">
                      <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold font-mono transition-all ${
                        isActive ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20" : "bg-[#030303] text-gray-650 border border-white/5"
                      }`}>
                        {item.step}
                      </div>
                      <span className={`text-[9px] font-semibold uppercase tracking-wider hidden sm:inline ${
                        isActive ? "text-white" : "text-gray-650"
                      }`}>{item.name}</span>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </section>

        {/* Core Pillars of Control */}
        <section className="mb-20">
          <h3 className="text-xs font-mono text-teal-700 tracking-widest uppercase mb-4 font-semibold">Governance Foundations</h3>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 mb-12">The Governance Control Layer</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center mb-6">
                <ShieldCheck className="w-5 h-5 text-teal-700" />
              </div>
              <h4 className="text-lg font-bold text-zinc-800 mb-3 tracking-tight">Structured Rules Engines</h4>
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-semibold">
                We encapsulate probabilistic model parameters inside custom, static rules logic. AI execution can never select its own states; it is routed along deterministic tracks defined in secure source code.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center mb-6">
                <UserCheck className="w-5 h-5 text-teal-700" />
              </div>
              <h4 className="text-lg font-bold text-zinc-800 mb-3 tracking-tight">Human-in-the-Loop Gates</h4>
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-semibold">
                When thresholds, compliance criteria, or custom edge cases diverge from pre-approved SOP parameters, the execution pipeline halts automatically, locks the state machine, and awaits human verification.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center mb-6">
                <Eye className="w-5 h-5 text-teal-700" />
              </div>
              <h4 className="text-lg font-bold text-zinc-800 mb-3 tracking-tight">Explainability &amp; Auditing</h4>
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-semibold">
                No black boxes. Every classification decision and model choice is coupled with structured prompt memory metadata, allowing system administrators to review decision rationales instantly during standard reviews.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-16 border-t border-zinc-200">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 mb-4 font-display">Design Safe Operational AI</h2>
          <p className="text-sm text-zinc-500 font-medium max-w-md mx-auto mb-8 leading-relaxed">
            Consult our architects on embedding custom corporate governance guidelines, local audit databases, and custom API validation checkpoints.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider bg-zinc-900 text-white hover:bg-zinc-800 transition-colors rounded-full text-center shadow-md cursor-pointer"
            >
              Consult an Architect
            </Link>
            <Link 
              href="/security" 
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider border border-zinc-200 hover:border-zinc-350 bg-white text-zinc-700 transition-colors rounded-full text-center"
            >
              Read Security Details
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
