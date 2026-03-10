import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  FolderGit2, Activity, TrendingUp, FileText, CalendarDays, 
  ChevronRight, Wallet, Clock, CheckCircle
} from "lucide-react";
import { Topbar } from "./Topbar";
import { SectionLabel } from "./shared/SectionLabel";
import { Ring } from "./shared/Ring";

import { Project } from "./_helper/types";
import { Card, CardHeader } from "./shared/Card";
import { STATUS_CFG, UPD_TYPE_CFG } from "./_helper/constants";

interface DashboardProps {
  projects: Project[];
  setView: (v: string) => void;
  onMenu: () => void;
}

export function Dashboard({ projects, setView, onMenu }: DashboardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  
  // Financial calculations
  const totalBudget = projects.reduce((s, p) => s + num(p.budget), 0);
  const totalSpent = projects.reduce((s, p) => s + num(p.spent), 0);
  const pendingReqs = projects.flatMap(p => p.requirements).filter(r => r.status === "pending").length;
  
  // Payment calculations
  const totalPaid = projects.reduce((sum, p) => {
    return sum + (p.milestones?.filter(m => m.status === "paid").reduce((s, m) => s + m.amount, 0) || 0);
  }, 0);
  
  const totalPending = projects.reduce((sum, p) => {
    return sum + (p.milestones?.filter(m => m.status === "pending" || m.status === "overdue").reduce((s, m) => s + m.amount, 0) || 0);
  }, 0);

  const STATS = [
    { 
      label: "Total Projects", 
      val: String(projects.length), 
      color: "#2563eb", 
      Icon: FolderGit2,
      bg: "rgba(37,99,235,0.08)"
    },
    { 
      label: "In Progress", 
      val: String(projects.filter(p => p.status === "in-progress").length), 
      color: "#16a34a", 
      Icon: Activity,
      bg: "rgba(22,163,74,0.08)"
    },
    { 
      label: "Paid Amount", 
      val: `₹${(totalPaid / 100000).toFixed(1)}L`, 
      color: "#7c3aed", 
      Icon: Wallet,
      bg: "rgba(124,58,237,0.08)"
    },
    { 
      label: "Pending Reqs", 
      val: String(pendingReqs), 
      color: "#ea580c", 
      Icon: FileText,
      bg: "rgba(234,88,12,0.08)"
    },
  ];

  const allUpdates = projects
    .flatMap(p => p.updates.map(u => ({ ...u, projectName: p.name, projectColor: p.color })))
    .sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);

  // Upcoming payments
  const upcomingPayments = projects
    .flatMap(p => 
      (p.milestones || [])
        .filter(m => m.status === "pending")
        .map(m => ({
          ...m,
          projectName: p.name,
          projectColor: p.color
        }))
    )
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 4);

  return (
    <div className="flex flex-col flex-1 h-full bg-background">
      <Topbar title="Dashboard" sub="Welcome back — Client Portal" onMenu={onMenu} />
      
      <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-8" ref={ref}>

        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <SectionLabel text="// overview" />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/50 bg-background/50">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-mono text-[10px] text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Stat cards with exact design */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }} 
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="p-5 hover:translate-y-[-2px] transition-all duration-300 cursor-default">
                <div className="flex items-center justify-between mb-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: s.bg }}
                  >
                    <s.Icon size={18} style={{ color: s.color }} />
                  </div>
                  <span className="font-mono text-2xl font-black" style={{ color: s.color }}>
                    {s.val}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-muted-foreground">{s.label}</div>
                <div className="mt-2 h-1 rounded-full overflow-hidden bg-border/50">
                  <motion.div 
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: i === 2 ? `${(totalPaid / totalBudget) * 100}%` : '100%' }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    style={{ background: s.color }}
                  />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
 {/* Active projects with exact card design */}
        <div>
          <SectionLabel text="// active projects" />
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {projects.map((p, i) => {
              const sc = STATUS_CFG[p.status];
              const projectPaid = p.milestones?.filter(m => m.status === "paid").reduce((sum, m) => sum + m.amount, 0) || 0;
              const projectTotal = p.milestones?.reduce((sum, m) => sum + m.amount, 0) || 0;
              
              return (
                <motion.button 
                  key={p.id} 
                  onClick={() => setView(`project-${p.id}`)}
                  initial={{ opacity: 0, y: 14 }} 
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="text-left overflow-hidden relative group"
                >
                  <Card className="p-5 hover:translate-y-[-2px] transition-all duration-300">
                    {/* Accent top line */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                      style={{ background: `linear-gradient(90deg,${p.color},${p.color}40,transparent)` }} 
                    />

                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                          <div className="text-foreground font-black text-sm leading-tight truncate">{p.name}</div>
                        </div>
                        <div className="font-mono text-[10px] mt-1 text-muted-foreground">{p.type}</div>
                      </div>
                      <Ring pct={p.progress} color={p.color} size={46} />
                    </div>

                    <p className="text-[12px] text-muted-foreground leading-relaxed mb-4 line-clamp-2">{p.description}</p>

                    {/* Payment Progress */}
                    {projectTotal > 0 && (
                      <div className="mb-3">
                        <div className="flex justify-between mb-1">
                          <span className="font-mono text-[8px] text-muted-foreground">Payment</span>
                          <span className="font-mono text-[8px] text-muted-foreground">
                            ₹{(projectPaid / 1000).toFixed(0)}K / ₹{(projectTotal / 1000).toFixed(0)}K
                          </span>
                        </div>
                        <div className="h-1 rounded-full overflow-hidden bg-border/50">
                          <motion.div 
                            className="h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(projectPaid / projectTotal) * 100}%` }}
                            transition={{ duration: 0.8, delay: 0.5 + i * 0.05 }}
                            style={{ background: p.color }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span 
                        className="text-[9px] font-bold px-2 py-1 rounded-full"
                        style={{ background: sc.bg, color: sc.color }}
                      >
                        {sc.label}
                      </span>
                      <span className="font-mono text-[9px] text-muted-foreground flex items-center gap-1">
                        <CalendarDays size={9} />{p.deadline}
                      </span>
                    </div>

                    <ChevronRight size={13} className="absolute right-4 bottom-4 text-muted-foreground/50 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all" />
                  </Card>
                </motion.button>
              );
            })}
          </div>
        </div>
        {/* Financial Overview */}
        <div className="grid lg:grid-cols-3 gap-4">
          <Card className="p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wallet size={14} className="text-primary" />
                <span className="text-xs font-bold text-foreground">Budget Overview</span>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">All Projects</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Total Budget</span>
                  <span className="font-mono text-sm font-bold text-foreground">₹{(totalBudget / 100000).toFixed(2)}L</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden bg-border/50">
                  <motion.div 
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(totalSpent / totalBudget) * 100}%` }}
                    transition={{ duration: 1.2 }}
                    style={{ background: "linear-gradient(90deg, #2563eb, #7c3aed)" }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="font-mono text-[10px] text-muted-foreground">Spent: ₹{(totalSpent / 100000).toFixed(2)}L</span>
                  <span className="font-mono text-[10px] text-muted-foreground">{Math.round((totalSpent / totalBudget) * 100)}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl border border-border/50 bg-accent/30">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle size={12} className="text-emerald-600" />
                    <span className="text-[10px] font-mono text-muted-foreground">Paid</span>
                  </div>
                  <span className="font-mono text-lg font-black text-emerald-600">₹{(totalPaid / 100000).toFixed(2)}L</span>
                </div>
                <div className="p-3 rounded-xl border border-border/50 bg-accent/30">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={12} className="text-orange-600" />
                    <span className="text-[10px] font-mono text-muted-foreground">Pending</span>
                  </div>
                  <span className="font-mono text-lg font-black text-orange-600">₹{(totalPending / 100000).toFixed(2)}L</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Upcoming Payments */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-primary" />
                <span className="text-xs font-bold text-foreground">Upcoming Payments</span>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">{upcomingPayments.length} pending</span>
            </div>

            <div className="space-y-3">
              {upcomingPayments.length > 0 ? (
                upcomingPayments.map((payment, i) => (
                  <motion.div
                    key={payment.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-accent/50 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: payment.projectColor }} />
                        <span className="text-xs font-medium text-foreground truncate max-w-[120px]">
                          {payment.title}
                        </span>
                      </div>
                      <p className="font-mono text-[9px] text-muted-foreground mt-1">
                        {payment.projectName} · Due {payment.dueDate}
                      </p>
                    </div>
                    <span className="font-mono text-xs font-bold" style={{ color: payment.projectColor }}>
                      ₹{(payment.amount / 1000).toFixed(1)}K
                    </span>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-xs text-muted-foreground">No pending payments</p>
                </div>
              )}
            </div>
          </Card>
        </div>

       

        {/* Recent activity with exact card design */}
        <div>
          <SectionLabel text="// recent updates" />
          <Card>
            <CardHeader>
              <Activity size={13} className="text-primary" />
              <span className="text-xs font-bold text-foreground">Activity Feed</span>
              <span className="ml-auto font-mono text-[10px] text-muted-foreground">{allUpdates.length} recent</span>
            </CardHeader>
            
            {allUpdates.map((u, i) => {
              const tc = UPD_TYPE_CFG[u.type];
              return (
                <motion.div 
                  key={u.id}
                  initial={{ opacity: 0, x: -8 }} 
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className={`flex items-start gap-3.5 px-5 py-4 hover:bg-accent/30 transition-colors ${i < allUpdates.length - 1 ? "border-b border-border/50" : ""}`}
                >
                  <div 
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${tc.color}08`, border: `1px solid ${tc.color}15` }}
                  >
                    <tc.Icon size={13} style={{ color: tc.color }} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-foreground text-xs font-bold truncate">{u.title}</span>
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: `${u.projectColor}08`, color: u.projectColor }}>
                        {u.projectName}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground line-clamp-2">{u.body}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="font-mono text-[8px] text-muted-foreground flex items-center gap-1">
                        <CalendarDays size={8} />{u.date}
                      </span>
                      <span className="font-mono text-[8px] text-muted-foreground flex items-center gap-1">
                        <Activity size={8} />{u.author}
                      </span>
                    </div>
                  </div>
                  
                  {u.pct && (
                    <div className="text-right">
                      <span className="font-mono text-xs font-bold" style={{ color: u.projectColor }}>{u.pct}%</span>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {allUpdates.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-sm text-muted-foreground">No recent updates</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
function num(budget: string): number {
    return parseInt(budget, 10) || 0;
}


