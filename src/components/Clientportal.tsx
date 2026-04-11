import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./client-portal/Sidebar";
import { Dashboard } from "./client-portal/Dashboard";
import { ProjectDetail } from "./client-portal/ProjectDetail";
import { NewProjectModal } from "./client-portal/NewProjectModal";
import { Project, Requirement, Milestone } from "./client-portal/_helper/types";
import { SEED } from "./client-portal/_helper/constants";
import { ProjectsList } from "./client-portal/ProjectsList";
import { ChatWindow } from "./client-portal/ChatWindow";
import { SettingsPage } from "./client-portal/Settings";



export default function ClientPortal() {
  const [projects, setProjects] = useState<Project[]>(SEED);
  const [view, setView] = useState("dashboard");
  const [showNewProject, setShowNewProject] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const activeProject = view.startsWith("project-")
    ? projects.find(p => p.id === view.replace("project-", ""))
    : null;

  const addReq = (projectId: string, req: Requirement) =>
    setProjects(prev => prev.map(p =>
      p.id === projectId ? { ...p, requirements: [req, ...p.requirements] } : p
    ));

  const addMilestone = (projectId: string, milestone: Milestone) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        // Calculate new total budget
        const currentTotal = p.milestones?.reduce((sum, m) => sum + m.amount, 0) || 0;
        const newTotal = currentTotal + milestone.amount;

        return {
          ...p,
          milestones: [...(p.milestones || []), milestone],
          budget: `₹${newTotal.toLocaleString()}`
        };
      }
      return p;
    }));
  };

  const addProject = (p: Project) => {
    setProjects(prev => [p, ...prev]);
    setShowNewProject(false);
    setView(`project-${p.id}`);
  };

  const handlePayment = (projectId: string, milestoneId: string, paymentDetails: any) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const updatedMilestones = p.milestones.map(m =>
          m.id === milestoneId
            ? { ...m, status: "paid" as const, paidDate: new Date().toISOString().slice(0, 10) }
            : m
        );

        // Calculate total spent
        const totalSpent = updatedMilestones
          .filter(m => m.status === "paid")
          .reduce((sum, m) => sum + m.amount, 0);

        return {
          ...p,
          milestones: updatedMilestones,
          spent: `₹${totalSpent.toLocaleString()}`
        };
      }
      return p;
    }));
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
     

      <Sidebar
        view={view}
        setView={setView}
        projects={projects}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AnimatePresence mode="wait">
          {view === "dashboard" && (
            <motion.div
              key="dash"
              className="flex flex-col flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Dashboard
                projects={projects}
                setView={setView}
                onMenu={() => setMobileOpen(true)}
              />
            </motion.div>
          )}

          {view === "projects" && (
            <motion.div
              key="projs"
              className="flex flex-col flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProjectsList
                projects={projects}
                setView={setView}
                onNew={() => setShowNewProject(true)}
                onMenu={() => setMobileOpen(true)}
              />
            </motion.div>
          )}
          {view === "chat" && (
            <motion.div
              key="chat"
              className="flex flex-col flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ChatWindow
                setView={setView}
                onNew={() => setShowNewProject(true)}
                onMenu={() => setMobileOpen(true)}
              />
            </motion.div>
          )}
          {view === "settings" && (
            <motion.div
              key="settings"
              className="flex flex-col flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SettingsPage
                setView={setView}
                onNew={() => setShowNewProject(true)}
                onMenu={() => setMobileOpen(true)}
              />
            </motion.div>
          )}

          {activeProject && (
            <motion.div
              key={view}
              className="flex flex-col flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProjectDetail
                project={activeProject}
                onBack={() => setView("projects")}
                onAddReq={(req) => addReq(activeProject.id, req)}
                onAddMilestone={(milestone) => addMilestone(activeProject.id, milestone)}
                onMenu={() => setMobileOpen(true)}
                onPaymentSubmit={(milestoneId, details) => handlePayment(activeProject.id, milestoneId, details)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
        {showNewProject && (
          <NewProjectModal
            onClose={() => setShowNewProject(false)}
            onSave={addProject}
          />
        )}
      </AnimatePresence>
    </div>
  );
}