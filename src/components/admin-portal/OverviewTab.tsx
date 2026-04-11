import React from "react";
import { motion } from "framer-motion";
import { FolderGit2, Activity, CheckCircle, TrendingUp, Wallet, Award, Clock } from "lucide-react";
import { AdminStatsCard } from "./AdminStatsCard";

import { Project } from "../client-portal/_helper/types";
import { STATUS_CFG } from "../client-portal/_helper/constants";
import { AdminSectionLabel } from "./_helper/AdminSectionLabel";
import { AdminCard } from "./_helper/AdminCard";

interface OverviewTabProps {
  projects: Project[];
  onViewProject: (projectId: string) => void;
}

export function OverviewTab({ projects, onViewProject }: OverviewTabProps) {
  const totalBudget = projects.reduce((sum, p) => {
    const budget = parseFloat(p.budget.replace(/[₹,]/g, '')) || 0;
    return sum + budget;
  }, 0);

  const totalSpent = projects.reduce((sum, p) => {
    const spent = parseFloat(p.spent.replace(/[₹,]/g, '')) || 0;
    return sum + spent;
  }, 0);

  const totalPaid = projects.reduce((sum, p) => {
    return sum + (p.milestones?.filter(m => m.status === "paid").reduce((s, m) => s + m.amount, 0) || 0);
  }, 0);

  const totalPending = projects.reduce((sum, p) => {
    return sum + (p.milestones?.filter(m => m.status === "pending" || m.status === "overdue").reduce((s, m) => s + m.amount, 0) || 0);
  }, 0);

  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === "in-progress" || p.status === "review").length,
    completedProjects: projects.filter(p => p.status === "completed").length,
    totalRevenue: totalSpent,
    pendingPayments: totalPending,
    activeMilestones: projects.reduce((sum, p) => sum + (p.milestones?.filter(m => m.status === "pending").length || 0), 0),
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <AdminStatsCard title="Total Projects" value={stats.totalProjects} icon={FolderGit2} color="#3B82F6" />
        <AdminStatsCard title="Active Projects" value={stats.activeProjects} icon={Activity} color="#10B981" trend={{ value: 8, isPositive: true }} />
        <AdminStatsCard title="Completed" value={stats.completedProjects} icon={CheckCircle} color="#8B5CF6" />
        <AdminStatsCard title="Revenue" value={`₹${(stats.totalRevenue / 100000).toFixed(1)}L`} icon={TrendingUp} color="#F59E0B" trend={{ value: 23, isPositive: true }} />
        <AdminStatsCard title="Pending" value={`₹${(stats.pendingPayments / 100000).toFixed(1)}L`} icon={Wallet} color="#EF4444" />
        <AdminStatsCard title="Milestones" value={stats.activeMilestones} icon={Award} color="#06B6D4" />
      </div>

      {/* Recent Projects */}
      <div>
        <AdminSectionLabel text="// recent projects" />
        <AdminCard>
          {projects.slice(0, 5).map((project, i) => {
            const sc = STATUS_CFG[project.status];
            return (
              <motion.button
                key={project.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onViewProject(project.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-accent/30 transition-all ${
                  i < 4 ? "border-b border-border/50" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${project.color}08`, border: `1px solid ${project.color}15` }}>
                  <FolderGit2 size={16} style={{ color: project.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: project.color }} />
                    <span className="text-sm font-bold text-foreground truncate">{project.name}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-[9px] text-muted-foreground">{project.type}</span>
                    <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: sc.bg, color: sc.color }}>
                      {sc.label}
                    </span>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs font-bold text-foreground">{project.progress}%</span>
                  <span className="font-mono text-[9px] text-muted-foreground">{project.deadline}</span>
                </div>
                <ChevronRight size={14} className="text-muted-foreground/50" />
              </motion.button>
            );
          })}
        </AdminCard>
      </div>

      {/* Financial Overview & Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        <AdminCard className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Wallet size={14} className="text-primary" />
            <span className="text-xs font-bold text-foreground">Financial Overview</span>
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
        </AdminCard>

        <AdminCard>
          <div className="flex items-center gap-2 mb-4">
            <Activity size={14} className="text-primary" />
            <span className="text-xs font-bold text-foreground">Recent Activity</span>
          </div>
          <div className="space-y-3">
            {projects.flatMap(p => p.updates || []).slice(0, 4).map((update, i) => (
              <div key={i} className="p-3 rounded-xl hover:bg-accent/30 transition-colors border border-border/50">
                <p className="text-xs font-medium text-foreground">{update.title}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{update.date} • {update.author}</p>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </motion.div>
  );
}

function ChevronRight(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}