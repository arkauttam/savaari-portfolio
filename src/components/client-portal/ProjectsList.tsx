import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Search, Plus, FolderGit2, ChevronRight, CalendarDays, 
  Wallet, Clock, CheckCircle, Filter, ArrowUpDown
} from "lucide-react";
import { Topbar } from "./Topbar";
import { SectionLabel } from "./shared/SectionLabel";
import { Project } from "./_helper/types";
import { STATUS_CFG } from "./_helper/constants";
import { Card, CardHeader } from "./shared/Card";

interface ProjectsListProps {
  projects: Project[];
  setView: (v: string) => void;
  onNew: () => void;
  onMenu: () => void;
}

export function ProjectsList({ projects, setView, onNew, onMenu }: ProjectsListProps) {
  const [q, setQ] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"deadline" | "progress" | "name">("deadline");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  // Filter projects
  const filtered = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(q.toLowerCase()) ||
                         p.type.toLowerCase().includes(q.toLowerCase());
    const matchesStatus = filterStatus === "all" || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Sort projects
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "deadline") return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    if (sortBy === "progress") return b.progress - a.progress;
    return a.name.localeCompare(b.name);
  });

  // Calculate stats
  const totalBudget = projects.reduce((sum, p) => {
    const budget = parseFloat(p.budget.replace(/[₹,]/g, '')) || 0;
    return sum + budget;
  }, 0);

  const totalPaid = projects.reduce((sum, p) => {
    return sum + (p.milestones?.filter(m => m.status === "paid").reduce((s, m) => s + m.amount, 0) || 0);
  }, 0);

  const activeProjects = projects.filter(p => p.status === "in-progress" || p.status === "review").length;

  return (
    <div className="flex flex-col flex-1 h-full bg-background">
      <Topbar title="My Projects" sub={`${projects.length} project${projects.length !== 1 ? "s" : ""}`} onMenu={onMenu} />
      
      <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6" ref={ref}>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Card className="p-4">
            <p className="text-[10px] font-mono text-muted-foreground mb-1">Total Projects</p>
            <p className="font-mono text-2xl font-black text-foreground">{projects.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-[10px] font-mono text-muted-foreground mb-1">Active</p>
            <p className="font-mono text-2xl font-black text-[#2563eb]">{activeProjects}</p>
          </Card>
          <Card className="p-4">
            <p className="text-[10px] font-mono text-muted-foreground mb-1">Budget</p>
            <p className="font-mono text-2xl font-black text-[#16a34a]">₹{(totalBudget / 100000).toFixed(1)}L</p>
          </Card>
          <Card className="p-4">
            <p className="text-[10px] font-mono text-muted-foreground mb-1">Paid</p>
            <p className="font-mono text-2xl font-black text-[#7c3aed]">₹{(totalPaid / 100000).toFixed(1)}L</p>
          </Card>
        </div>

        <SectionLabel text="// all projects" />

        {/* Enhanced Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-border/50 bg-background w-full sm:w-auto">
            <Search size={13} className="text-muted-foreground shrink-0" />
            <input 
              value={q} 
              onChange={e => setQ(e.target.value)} 
              placeholder="Search projects by name or type…"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none font-mono" 
            />
            {q && (
              <button onClick={() => setQ("")} className="text-muted-foreground hover:text-foreground">
                <ChevronRight size={13} className="rotate-90" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Status Filter */}
            <div className="relative">
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="appearance-none px-3 py-2.5 pr-8 rounded-xl text-xs font-mono border border-border/50 bg-background text-foreground focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select>
              <Filter size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>

            {/* Sort By */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="appearance-none px-3 py-2.5 pr-8 rounded-xl text-xs font-mono border border-border/50 bg-background text-foreground focus:outline-none"
              >
                <option value="deadline">By Deadline</option>
                <option value="progress">By Progress</option>
                <option value="name">By Name</option>
              </select>
              <ArrowUpDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>

            <motion.button 
              onClick={onNew} 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white shrink-0"
              style={{ background: "hsl(var(--primary))", boxShadow: "0 4px 12px hsl(var(--primary)/0.3)" }}
            >
              <Plus size={14} />
              <span className="hidden sm:block">Request Project</span>
              <span className="sm:hidden">New</span>
            </motion.button>
          </div>
        </div>

        {/* Projects Table/Cards */}
        <Card>
          <CardHeader>
            <span className="flex-1 text-[10px] font-black font-mono uppercase tracking-[0.18em] text-muted-foreground/70">Project Details</span>
            <span className="hidden sm:block text-[10px] font-black font-mono uppercase tracking-[0.18em] text-muted-foreground/70 w-28 text-center">Progress</span>
            <span className="hidden md:block text-[10px] font-black font-mono uppercase tracking-[0.18em] text-muted-foreground/70 w-28 text-center">Payment</span>
            <span className="hidden lg:block text-[10px] font-black font-mono uppercase tracking-[0.18em] text-muted-foreground/70 w-24 text-right">Deadline</span>
          </CardHeader>

          {sorted.length > 0 ? (
            sorted.map((p, i) => {
              const sc = STATUS_CFG[p.status];
              const projectPaid = p.milestones?.filter(m => m.status === "paid").reduce((sum, m) => sum + m.amount, 0) || 0;
              const projectTotal = p.milestones?.reduce((sum, m) => sum + m.amount, 0) || 0;
              const paymentPercent = projectTotal > 0 ? (projectPaid / projectTotal) * 100 : 0;
              
              return (
                <motion.button 
                  key={p.id} 
                  onClick={() => setView(`project-${p.id}`)}
                  initial={{ opacity: 0, x: -10 }} 
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.06 }}
                  className={`w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-accent/30 transition-all duration-200 group ${
                    i < sorted.length - 1 ? "border-b border-border/50" : ""
                  }`}
                >
                  {/* Project Info */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
                      style={{ background: `${p.color}08`, border: `1px solid ${p.color}15` }}
                    >
                      <FolderGit2 size={16} style={{ color: p.color }} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
                        <div className="text-foreground text-sm font-bold truncate">{p.name}</div>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-[9px] text-muted-foreground">{p.type}</span>
                        <span 
                          className="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{ background: sc.bg, color: sc.color }}
                        >
                          {sc.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="hidden sm:flex flex-col items-center gap-1 w-28 shrink-0">
                    <div className="w-full h-1.5 rounded-full overflow-hidden bg-border/50">
                      <motion.div 
                        className="h-full rounded-full"
                        initial={{ width: 0 }} 
                        animate={{ width: `${p.progress}%` }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 + 0.2 }}
                        style={{ background: p.color }} 
                      />
                    </div>
                    <span className="font-mono text-[9px]" style={{ color: p.color }}>{p.progress}%</span>
                  </div>

                  {/* Payment */}
                  <div className="hidden md:flex flex-col items-center w-28 shrink-0">
                    {projectTotal > 0 ? (
                      <>
                        <div className="flex items-center gap-1 mb-1">
                          {paymentPercent >= 100 ? (
                            <CheckCircle size={10} className="text-emerald-600" />
                          ) : (
                            <Clock size={10} className="text-orange-600" />
                          )}
                          <span className="font-mono text-[9px]" style={{ color: paymentPercent >= 100 ? "#16a34a" : "#ea580c" }}>
                            {paymentPercent >= 100 ? "Paid" : `${Math.round(paymentPercent)}%`}
                          </span>
                        </div>
                        <span className="font-mono text-[8px] text-muted-foreground">
                          ₹{(projectPaid / 1000).toFixed(0)}K / ₹{(projectTotal / 1000).toFixed(0)}K
                        </span>
                      </>
                    ) : (
                      <span className="font-mono text-[8px] text-muted-foreground">No milestones</span>
                    )}
                  </div>

                  {/* Deadline */}
                  <span className="hidden lg:block font-mono text-[10px] text-muted-foreground w-24 text-right shrink-0">
                    {p.deadline}
                  </span>

                  {/* Arrow */}
                  <ChevronRight size={14} className="text-muted-foreground/50 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
                </motion.button>
              );
            })
          ) : (
            <div className="py-16 text-center">
              <FolderGit2 size={32} className="mx-auto mb-3 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground mb-2">No projects match your search</p>
              <button 
                onClick={() => { setQ(""); setFilterStatus("all"); }}
                className="text-xs text-primary hover:underline font-mono"
              >
                Clear filters
              </button>
            </div>
          )}
        </Card>

        {/* Project Categories */}
        <div className="grid sm:grid-cols-3 gap-4">
          {["Web Development", "Mobile App", "AI / ML"].map(category => {
            const catProjects = projects.filter(p => p.type === category);
            if (catProjects.length === 0) return null;
            
            return (
              <Card key={category} className="p-4">
                <h3 className="text-xs font-bold text-foreground mb-3">{category}</h3>
                <div className="space-y-2">
                  {catProjects.slice(0, 3).map(p => (
                    <button
                      key={p.id}
                      onClick={() => setView(`project-${p.id}`)}
                      className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
                      <span className="flex-1 text-xs text-left truncate text-muted-foreground hover:text-foreground">
                        {p.name}
                      </span>
                      <span className="font-mono text-[8px] text-muted-foreground">{p.progress}%</span>
                    </button>
                  ))}
                  {catProjects.length > 3 && (
                    <p className="text-[9px] text-muted-foreground text-center pt-1">
                      +{catProjects.length - 3} more
                    </p>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}