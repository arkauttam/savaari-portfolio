import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";

import { SEED } from "./client-portal/_helper/constants";
import { Project } from "./client-portal/_helper/types";
import { ProjectDetailsPage } from "./admin-portal/ProjectDetailsPage";
import { AdminSidebar } from "./admin-portal/AdminSidebar";
import { AdminTopbar } from "./admin-portal/AdminTopbar";
import { OverviewTab } from "./admin-portal/OverviewTab";
import { ProjectsTab } from "./admin-portal/ProjectsTab";
import { AnalyticsPage } from "./admin-portal/AnalyticsPage";
import { ClientsTab } from "./admin-portal/ClientsTab";
import { FinancesTab } from "./admin-portal/FinancesTab";
import { ProjectDetailModal } from "./admin-portal/ProjectDetailModal";
import { ChatWindow } from "./client-portal/ChatWindow";

function AdminPortal() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'clients' | 'finances' | 'analytics' | 'chat'>('overview');
  const [projects] = useState<Project[]>(SEED);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [setView, setSetView] = useState<any>(null);
  const [setShowNewProject, setSetShowNewProject] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab') as typeof activeTab;
    if (tab && ['overview', 'projects', 'clients', 'finances', 'analytics', 'chat'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location.search]);

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    navigate(`/admin-portal?tab=${tab}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    navigate('/auth-page');
  };

  const handleViewProject = (projectId: string) => {
    navigate(`/admin-portal/project/${projectId}`);
  };

  // Mock functions for ChatWindow props if not available
  const handleSetView = (view: any) => {
    if (setSetView) setSetView(view);
  };

  const handleNewProject = () => {
    setSetShowNewProject(true);
  };

  const handleMobileMenu = () => {
    setMobileOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
        onLogout={handleLogout}
      />

      <div className="flex-1 lg:ml-[260px] flex flex-col min-w-0 min-h-screen">
        <AdminTopbar 
          title="Admin Portal" 
          sub="Manage clients, projects, and finances" 
          onMenu={() => setMobileMenuOpen(true)}
        />

        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-8">
          {activeTab === 'overview' && (
            <OverviewTab 
              projects={projects}
              onViewProject={handleViewProject}
            />
          )}
          
          {activeTab === 'projects' && (
            <ProjectsTab 
              projects={projects}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              onViewProject={setSelectedProject}
              onViewProjectDetails={handleViewProject}
            />
          )}
          
          {activeTab === 'clients' && <ClientsTab />}
          
          {activeTab === 'finances' && <FinancesTab projects={projects} />}
          
          {activeTab === 'analytics' && <AnalyticsPage projects={projects} />}
          
          {activeTab === "chat" && (
            <motion.div
              key="chat"
              className="flex flex-col flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ChatWindow
                setView={handleSetView}
                onNew={handleNewProject}
                onMenu={handleMobileMenu}
              />
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdminPortal;