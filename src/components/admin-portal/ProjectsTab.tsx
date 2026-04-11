import React from "react";
import { motion } from "framer-motion";
import { Search, Filter, FolderGit2 } from "lucide-react";
import { Project } from "../client-portal/_helper/types";
import { STATUS_CFG } from "../client-portal/_helper/constants";
import { AdminCard } from "./_helper/AdminCard";

interface ProjectsTabProps {
  projects: Project[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  statusFilter: string;
  setStatusFilter: (f: string) => void;
  onViewProject: (project: Project | null) => void;
  onViewProjectDetails: (projectId: string) => void;
}

export function ProjectsTab({ 
  projects, 
  searchQuery, 
  setSearchQuery, 
  statusFilter, 
  setStatusFilter,
  onViewProjectDetails
}: ProjectsTabProps) {
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-sm"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl text-xs font-mono border border-border/50 bg-white text-foreground focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredProjects.map((project, i) => {
          const sc = STATUS_CFG[project.status];
          const projectPaid = project.milestones?.filter(m => m.status === "paid").reduce((sum, m) => sum + m.amount, 0) || 0;
          const projectTotal = project.milestones?.reduce((sum, m) => sum + m.amount, 0) || 0;
          
          return (
            <motion.button
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onViewProjectDetails(project.id)}
              className="text-left"
            >
              <AdminCard className="p-5 hover:translate-y-[-2px] transition-all duration-300">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: project.color }} />
                      <span className="font-bold text-sm text-foreground truncate">{project.name}</span>
                    </div>
                    <span className="font-mono text-[10px] mt-1 text-muted-foreground">{project.type}</span>
                  </div>
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 -rotate-90">
                      <circle cx="24" cy="24" r="20" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                      <circle cx="24" cy="24" r="20" fill="none" stroke={project.color} strokeWidth="3" 
                        strokeDasharray={`${2 * Math.PI * 20}`} strokeDashoffset={`${2 * Math.PI * 20 * (1 - project.progress / 100)}`}
                        className="transition-all duration-700" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold" style={{ color: project.color }}>
                      {project.progress}%
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed mb-3 line-clamp-2">{project.description}</p>
                {projectTotal > 0 && (
                  <div className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="font-mono text-[8px] text-muted-foreground">Payment</span>
                      <span className="font-mono text-[8px] text-muted-foreground">₹{(projectPaid / 1000).toFixed(0)}K / ₹{(projectTotal / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="h-1 rounded-full overflow-hidden bg-border/50">
                      <motion.div 
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(projectPaid / projectTotal) * 100}%` }}
                        style={{ background: project.color }}
                      />
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold px-2 py-1 rounded-full" style={{ background: sc.bg, color: sc.color }}>
                    {sc.label}
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground">{project.deadline}</span>
                </div>
              </AdminCard>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}