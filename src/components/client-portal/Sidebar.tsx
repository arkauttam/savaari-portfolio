import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FolderGit2,
  Bell,
  Settings,
  LogOut,
  X,
  MessageSquare,
} from "lucide-react";
import { Project } from "./_helper/types";

interface SidebarProps {
  view: string;
  setView: (v: string) => void;
  projects: Project[];
  mobileOpen: boolean;
  setMobileOpen: (b: boolean) => void;
}

export function Sidebar({
  view,
  setView,
  projects,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {

  const content = (
    <div className="flex flex-col h-full bg-white ">
      
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-[18px] border-b border-gray-200 shrink-0">
        <a
          href="#home"
          onClick={() => (window.location.hash = "#home")}
          className="flex items-center shrink-0 pr-6 mr-1 group"
        >
          <img
            src="/logo.png"
            alt="OS tech labs Infotech"
            width={120}
            height={44}
            className="h-10 w-auto object-contain transition-opacity duration-200 group-hover:opacity-85"
            loading="eager"
          />
        </a>

        <button
          className="ml-auto lg:hidden text-gray-500 hover:text-gray-900"
          onClick={() => setMobileOpen(false)}
        >
          <X size={16} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">

        <p className="text-[10px] font-black font-mono uppercase tracking-[0.18em] text-gray-400 px-2 py-1">
          Main
        </p>

        {[
          { id: "dashboard", Icon: LayoutDashboard, label: "Dashboard" },
          { id: "projects", Icon: FolderGit2, label: "My Projects" },
          { id: "chat", Icon: MessageSquare, label: "Chat" },
        ].map((item) => {
          const active = view === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setView(item.id);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                active
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <item.Icon
                size={15}
                className={active ? "text-blue-600" : "text-gray-400"}
              />

              <span className="flex-1 text-left">{item.label}</span>

              {active && (
                <motion.div
                  layoutId="sidebarDot"
                  className="w-1.5 h-1.5 rounded-full bg-blue-500"
                />
              )}
            </button>
          );
        })}

       
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-gray-200 space-y-1 shrink-0">
        {[{ Icon: Settings, label: "Settings" }, { Icon: LogOut, label: "Sign Out" }].map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
          >
            <item.Icon size={14} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="shadow-md hidden lg:flex flex-col w-[230px] xl:w-[248px] shrink-0 fixed left-0 top-0 bottom-0 z-30 bg-white border-r border-gray-200">
        {content}
      </aside>

      <div className="hidden lg:block w-[230px] xl:w-[248px] shrink-0 shadow-md" />

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          >
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="absolute left-0 top-0 bottom-0 w-[248px] bg-white border-r border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              {content}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}