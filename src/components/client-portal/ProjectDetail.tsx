import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FileText, GitBranch, CalendarDays, User, Plus,
  MessageSquare, Activity, Zap, AlertCircle, Upload,
  Wallet, Milestone
} from "lucide-react";
import { Topbar } from "./Topbar";
import { Project, ReqStatus, Requirement, Milestone as MilestoneType } from "./_helper/types";
import { PRIORITY_CFG, REQ_STATUS_CFG, STATUS_CFG, UPD_TYPE_CFG } from "./_helper/constants";
import { Card, CardHeader } from "./shared/Card";
import { AddReqModal } from "./AddReqModal";
import { MilestonePayment } from "./PaymentMilestones";
import { AddMilestoneModal } from "./AddMilestoneModal";

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onAddReq: (r: Requirement) => void;
  onAddMilestone: (milestone: MilestoneType) => void;
  onMenu: () => void;
  onPaymentSubmit: (milestoneId: string, paymentDetails: any) => void;
}

export function ProjectDetail({
  project,
  onBack,
  onAddReq,
  onAddMilestone,
  onMenu,
  onPaymentSubmit
}: ProjectDetailProps) {
  const [tab, setTab] = useState<"overview" | "requirements" | "updates" | "payments">("overview");
  const [showReqForm, setShowReqForm] = useState(false);
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const sc = STATUS_CFG[project.status];

  return (
    <div className="flex flex-col flex-1 h-full">
      <Topbar
        title={project.name}
        sub={project.type}
        back
        onBack={onBack}
        onMenu={onMenu}
        color={project.color}
      />

      <div className="flex-1 overflow-y-auto" ref={ref}>
        {/* Hero band */}
        <div
          className="relative px-5 sm:px-7 py-6 border-b border-border/50 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.color}08 0%, hsl(var(--background)) 75%)`,
          }}
        >
          <div
            className="absolute -top-12 -right-12 w-56 h-56 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${project.color}10, transparent 70%)`,
              filter: "blur(40px)"
            }}
          />

          <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
            {[
              { label: "Status", val: sc.label, color: sc.color, mono: false },
              { label: "Progress", val: `${project.progress}%`, color: project.color, mono: true },
              { label: "Budget", val: project.budget, color: "#16a34a", mono: true },
              { label: "Deadline", val: project.deadline, color: "#ea580c", mono: true },
            ].map(m => (
              <div key={m.label}>
                <div className="text-[10px] font-black font-mono uppercase tracking-[0.18em] text-muted-foreground mb-1">
                  {m.label}
                </div>
                <div className={`font-black text-lg leading-tight ${m.mono ? "font-mono" : ""}`} style={{ color: m.color }}>
                  {m.val}
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="relative h-2 rounded-full overflow-hidden bg-border/50">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}80)` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="font-mono text-[10px] text-muted-foreground">Started {project.startDate}</span>
            <span className="font-mono text-[10px] text-muted-foreground">Due {project.deadline}</span>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="flex items-center gap-1 px-5 sm:px-7 py-3 border-b border-border/50 sticky top-0 z-10"
          style={{ background: "hsl(var(--background)/0.95)", backdropFilter: "blur(12px)" }}
        >
          {(["overview", "requirements", "updates", "payments"] as const).map(t => {
            const active = tab === t;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="relative px-4 py-2 rounded-xl text-xs font-black uppercase tracking-[0.12em] font-mono transition-all"
              >
                {active && (
                  <motion.div
                    layoutId="tabBg"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: `${project.color}08`, border: `1px solid ${project.color}15` }}
                  />
                )}
                <span className="relative" style={{ color: active ? project.color : "hsl(var(--muted-foreground))" }}>
                  {t === "payments" ? "💰 Payments" : t}
                </span>
                {t === "requirements" && (
                  <span
                    className="relative ml-1.5 text-[9px] px-1.5 py-0.5 rounded-full font-mono"
                    style={{ background: `${project.color}08`, color: project.color }}
                  >
                    {project.requirements.length}
                  </span>
                )}
                {t === "payments" && project.milestones && (
                  <span
                    className="relative ml-1.5 text-[9px] px-1.5 py-0.5 rounded-full font-mono"
                    style={{
                      background: `${project.milestones.filter(m => m.status === "pending").length > 0 ? "#ea580c15" : "#16a34a15"}`,
                      color: project.milestones.filter(m => m.status === "pending").length > 0 ? "#ea580c" : "#16a34a"
                    }}
                  >
                    {project.milestones.length}
                  </span>
                )}
              </button>
            );
          })}

          {/* Dynamic Add Button based on active tab */}
          <div className="ml-auto flex items-center gap-2">
            {tab === "requirements" && (
              <motion.button
                onClick={() => setShowReqForm(true)}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold font-mono"
                style={{ background: `${project.color}08`, color: project.color, border: `1px solid ${project.color}15` }}
              >
                <Plus size={12} />
                <span className="hidden sm:block">Add Requirement</span>
                <span className="sm:hidden">Add</span>
              </motion.button>
            )}

            {tab === "payments" && (
              <motion.button
                onClick={() => setShowMilestoneForm(true)}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold font-mono"
                style={{ background: `${project.color}08`, color: project.color, border: `1px solid ${project.color}15` }}
              >
                <Plus size={12} />
                <span className="hidden sm:block">Add Milestone</span>
                <span className="sm:hidden">Add</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Tab content */}
        <div className="p-5 sm:p-7">
          <AnimatePresence mode="wait">

            {/* OVERVIEW */}
            {tab === "overview" && (
              <motion.div
                key="ov"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                <div className="grid lg:grid-cols-2 gap-5">
                  {/* Brief */}
                  <Card>
                    <CardHeader>
                      <FileText size={13} className="text-primary" />
                      <span className="text-xs font-bold text-foreground">Project Brief</span>
                    </CardHeader>
                    <div className="p-5">
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.map(s => (
                          <span
                            key={s}
                            className="text-[10px] font-bold font-mono px-2.5 py-1 rounded-lg"
                            style={{
                              background: `${project.color}08`,
                              color: project.color,
                              border: `1px solid ${project.color}15`
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>

                  {/* Team + Budget */}
                  <div className="space-y-3">
                    <Card className="p-5">
                      <div className="text-[10px] font-black font-mono uppercase tracking-[0.18em] text-muted-foreground mb-3">
                        Team
                      </div>
                      {[
                        { role: "Project Manager", name: project.pm },
                        { role: "Lead Developer", name: project.dev },
                      ].map(m => (
                        <div key={m.role} className="flex items-center gap-3 mb-2.5 last:mb-0">
                          <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0"
                            style={{ background: `${project.color}08`, color: project.color }}
                          >
                            {m.name[0]}
                          </div>
                          <div>
                            <div className="text-foreground text-xs font-bold">{m.name}</div>
                            <div className="font-mono text-[10px] text-muted-foreground">{m.role}</div>
                          </div>
                        </div>
                      ))}
                    </Card>

                    <Card className="p-5">
                      <div className="text-[10px] font-black font-mono uppercase tracking-[0.18em] text-muted-foreground mb-3">
                        Budget
                      </div>

                      {[
                        { label: "Total Budget", val: project.budget, color: "hsl(var(--foreground))" },
                        { label: "Amount Spent", val: project.spent, color: project.color },
                      ].map((b) => (
                        <div key={b.label} className="flex justify-between mb-2">
                          <span className="text-[11px] text-muted-foreground">{b.label}</span>
                          <span className="font-mono text-sm font-bold" style={{ color: b.color }}>
                            {b.val}
                          </span>
                        </div>
                      ))}
                    </Card>
                  </div>
                </div>

                {/* Req summary */}
                <Card>
                  <CardHeader>
                    <GitBranch size={13} className="text-primary" />
                    <span className="text-xs font-bold text-foreground">Requirements Breakdown</span>
                    <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                      {project.requirements.length} total
                    </span>
                  </CardHeader>
                  <div className="grid grid-cols-3 sm:grid-cols-5 divide-x divide-border/50">
                    {(Object.entries(REQ_STATUS_CFG) as [ReqStatus, typeof REQ_STATUS_CFG[ReqStatus]][]).map(([k, m]) => {
                      const count = project.requirements.filter(r => r.status === k).length;
                      return (
                        <div
                          key={k}
                          className="flex flex-col items-center py-5 gap-1.5"
                        >
                          <m.Icon size={14} style={{ color: m.color }} />
                          <span className="font-mono text-xl font-black" style={{ color: m.color }}>{count}</span>
                          <span className="font-mono text-[9px] text-muted-foreground uppercase">{m.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* REQUIREMENTS */}
            {tab === "requirements" && (
              <motion.div
                key="rq"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {project.requirements.length === 0 && (
                  <div className="text-center py-16 font-mono text-sm text-muted-foreground">
                    No requirements yet.{" "}
                    <button onClick={() => setShowReqForm(true)} className="underline" style={{ color: project.color }}>
                      Add the first one →
                    </button>
                  </div>
                )}
                {project.requirements.map((req, i) => {
                  const rs = REQ_STATUS_CFG[req.status];
                  const rp = PRIORITY_CFG[req.priority];
                  return (
                    <motion.div
                      key={req.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.07 }}
                    >
                      <Card className="p-5">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2.5 flex-1 min-w-0">
                            <rs.Icon size={14} style={{ color: rs.color }} className="shrink-0 mt-0.5" />
                            <h3 className="text-foreground text-sm font-bold leading-tight">{req.title}</h3>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                              style={{ background: `${rp.color}08`, color: rp.color }}
                            >
                              {rp.label}
                            </span>
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                              style={{ background: `${rs.color}08`, color: rs.color }}
                            >
                              {rs.label}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed ml-[22px] mb-3">{req.description}</p>
                        {req.notes && (
                          <div
                            className="ml-[22px] px-4 py-2.5 rounded-xl text-xs text-muted-foreground italic border border-border/50"
                            style={{ background: "hsl(var(--background))" }}
                          >
                            💬 {req.notes}
                          </div>
                        )}
                        <div className="flex items-center gap-4 mt-3 ml-[22px]">
                          <span className="font-mono text-[10px] text-muted-foreground flex items-center gap-1">
                            <CalendarDays size={9} />{req.createdAt}
                          </span>
                          <span className="font-mono text-[10px] text-muted-foreground flex items-center gap-1">
                            <User size={9} />{req.createdBy === "client" ? "You" : "OS tech labs Team"}
                          </span>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* UPDATES / TIMELINE */}
            {tab === "updates" && (
              <motion.div
                key="up"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="relative"
              >
                {/* Vertical timeline rail */}
                <div
                  className="absolute left-5 top-5 bottom-5 w-px hidden sm:block bg-border/50"
                />

                <div className="space-y-4">
                  {project.updates.map((upd, i) => {
                    const tc = UPD_TYPE_CFG[upd.type];
                    return (
                      <motion.div
                        key={upd.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-4 sm:gap-5"
                      >
                        {/* Node */}
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 relative z-10 hidden sm:flex"
                          style={{ background: `${tc.color}08`, border: `1.5px solid ${tc.color}15` }}
                        >
                          <tc.Icon size={15} style={{ color: tc.color }} />
                        </div>
                        <Card className="flex-1 p-5">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1 min-w-0">
                              {/* Type label */}
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className="text-[9px] font-black font-mono uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
                                  style={{ background: `${tc.color}08`, color: tc.color }}
                                >
                                  {tc.label}
                                </span>
                              </div>
                              <h3 className="text-foreground text-sm font-bold leading-tight">{upd.title}</h3>
                              <div className="flex items-center gap-3 mt-0.5">
                                <span className="font-mono text-[10px] text-muted-foreground flex items-center gap-1">
                                  <CalendarDays size={9} />{upd.date}
                                </span>
                                <span className="font-mono text-[10px] text-muted-foreground flex items-center gap-1">
                                  <User size={9} />{upd.author}
                                </span>
                              </div>
                            </div>
                            {upd.pct !== undefined && (
                              <span className="font-mono text-base font-black shrink-0" style={{ color: project.color }}>
                                {upd.pct}%
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{upd.body}</p>
                          {upd.pct !== undefined && (
                            <div className="mt-3 h-1 rounded-full overflow-hidden bg-border/50">
                              <motion.div
                                className="h-full rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${upd.pct}%` }}
                                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 * i }}
                                style={{ background: `linear-gradient(90deg,${project.color},${project.color}70)` }}
                              />
                            </div>
                          )}
                        </Card>
                      </motion.div>
                    );
                  })}
                  {project.updates.length === 0 && (
                    <div className="text-center py-14 font-mono text-sm text-muted-foreground">No updates posted yet.</div>
                  )}
                </div>
              </motion.div>
            )}

            {/* PAYMENTS */}
            {tab === "payments" && project.milestones && (
              <motion.div
                key="pay"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <MilestonePayment
                  milestones={project.milestones}
                  projectColor={project.color}
                  onPaymentSubmit={onPaymentSubmit}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Requirement modal */}
      <AnimatePresence>
        {showReqForm && (
          <AddReqModal
            color={project.color}
            onClose={() => setShowReqForm(false)}
            onSave={req => { onAddReq(req); setShowReqForm(false); }}
          />
        )}
      </AnimatePresence>

      {/* Milestone modal */}
      <AnimatePresence>
        {showMilestoneForm && (
          <AddMilestoneModal
            color={project.color}
            onClose={() => setShowMilestoneForm(false)}
            onSave={milestone => {
              onAddMilestone(milestone);
              setShowMilestoneForm(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function num(budget: string): number {
  return parseInt(budget, 10) || 0;
}