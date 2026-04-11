import React from "react";
import { motion } from "framer-motion";
import { 
  X, CalendarDays, Users, GitBranch, CheckCircle2, 
  Clock, AlertCircle, DollarSign, Activity, FileText,
  Award, Wallet, TrendingUp, FolderGit2
} from "lucide-react";
import { Project } from "../client-portal/_helper/types";
import { STATUS_CFG, PRIORITY_CFG, REQ_STATUS_CFG } from "../client-portal/_helper/constants";

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const sc = STATUS_CFG[project.status];
  const totalPaid = project.milestones?.filter(m => m.status === "paid").reduce((sum, m) => sum + m.amount, 0) || 0;
  const totalBudget = project.milestones?.reduce((sum, m) => sum + m.amount, 0) || 0;
  const paymentProgress = totalBudget > 0 ? (totalPaid / totalBudget) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border/50 p-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `${project.color}08`, border: `1px solid ${project.color}15` }}
            >
              <FolderGit2 size={20} style={{ color: project.color }} />
            </div>
            <div>
              <h2 className="text-xl font-black text-foreground">{project.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-mono text-muted-foreground">{project.type}</span>
                <span 
                  className="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: sc.bg, color: sc.color }}
                >
                  {sc.label}
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-accent rounded-xl transition-colors">
            <X size={18} className="text-muted-foreground" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-accent/20 rounded-xl">
              <p className="text-[9px] font-mono text-muted-foreground">Budget</p>
              <p className="text-lg font-bold text-foreground mt-1">{project.budget}</p>
            </div>
            <div className="p-3 bg-accent/20 rounded-xl">
              <p className="text-[9px] font-mono text-muted-foreground">Spent</p>
              <p className="text-lg font-bold text-foreground mt-1">{project.spent}</p>
            </div>
            <div className="p-3 bg-accent/20 rounded-xl">
              <p className="text-[9px] font-mono text-muted-foreground">Progress</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-border/50">
                  <motion.div 
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    style={{ background: project.color }}
                  />
                </div>
                <span className="text-sm font-bold" style={{ color: project.color }}>{project.progress}%</span>
              </div>
            </div>
            <div className="p-3 bg-accent/20 rounded-xl">
              <p className="text-[9px] font-mono text-muted-foreground">Deadline</p>
              <p className="text-sm font-medium text-foreground mt-1 flex items-center gap-1">
                <CalendarDays size={12} className="text-muted-foreground" />
                {project.deadline}
              </p>
            </div>
          </div>

          {/* Payment Progress */}
          {totalBudget > 0 && (
            <div className="p-4 bg-primary/5 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Wallet size={14} className="text-primary" />
                <span className="text-xs font-bold text-foreground">Payment Progress</span>
              </div>
              <div className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Paid: ₹{(totalPaid / 1000).toFixed(0)}K</span>
                  <span className="text-xs text-muted-foreground">Total: ₹{(totalBudget / 1000).toFixed(0)}K</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden bg-border/50">
                  <motion.div 
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${paymentProgress}%` }}
                    transition={{ duration: 1 }}
                    style={{ background: "linear-gradient(90deg, #10b981, #059669)" }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[9px] font-mono text-muted-foreground">{Math.round(paymentProgress)}% Complete</span>
                  <span className="text-[9px] font-mono text-muted-foreground">Remaining: ₹{((totalBudget - totalPaid) / 1000).toFixed(0)}K</span>
                </div>
              </div>
            </div>
          )}

          {/* Team & Stack */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border border-border/50 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Users size={14} className="text-primary" />
                <span className="text-xs font-bold text-foreground">Team</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Project Manager</span>
                  <span className="text-xs font-medium text-foreground">{project.pm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Lead Developer</span>
                  <span className="text-xs font-medium text-foreground">{project.dev}</span>
                </div>
              </div>
            </div>

            <div className="p-4 border border-border/50 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <GitBranch size={14} className="text-primary" />
                <span className="text-xs font-bold text-foreground">Tech Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-accent/50 rounded-lg text-[9px] font-mono text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Milestones Section */}
          {project.milestones && project.milestones.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award size={14} className="text-primary" />
                <span className="text-xs font-bold text-foreground">Milestones</span>
              </div>
              <div className="space-y-2">
                {project.milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-center justify-between p-3 bg-accent/20 rounded-xl">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${milestone.status === 'paid' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                        <p className="text-sm font-medium text-foreground">{milestone.title}</p>
                      </div>
                      <p className="text-[10px] text-muted-foreground">{milestone.description}</p>
                      <p className="text-[9px] font-mono text-muted-foreground mt-1">Due: {milestone.dueDate}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm font-bold text-foreground">₹{milestone.amount.toLocaleString()}</p>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                        milestone.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {milestone.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requirements Section */}
          {project.requirements && project.requirements.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText size={14} className="text-primary" />
                <span className="text-xs font-bold text-foreground">Requirements</span>
              </div>
              <div className="space-y-2">
                {project.requirements.map((req) => {
                  const pc = PRIORITY_CFG[req.priority];
                  const rc = REQ_STATUS_CFG[req.status];
                  const ReqIcon = rc.Icon;
                  
                  return (
                    <div key={req.id} className="p-3 border border-border/50 rounded-xl hover:bg-accent/30 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <ReqIcon size={10} style={{ color: rc.color }} />
                            <p className="text-sm font-medium text-foreground">{req.title}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">{req.description}</p>
                          <div className="flex gap-2 mt-2">
                            <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold" style={{ background: `${pc.color}10`, color: pc.color }}>
                              {pc.label}
                            </span>
                            <span className="text-[8px] font-mono text-muted-foreground">Created: {req.createdAt}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}