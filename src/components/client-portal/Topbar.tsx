import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Menu, Bell, X, User, UserCircle, LogOutIcon, LogOut } from "lucide-react";
import { Card } from "./shared/Card";
interface TopbarProps {
  title: string;
  sub?: string;
  back?: boolean;
  onBack?: () => void;
  onMenu: () => void;
  color?: string;
}

export function Topbar({ title, sub, back, onBack, onMenu, color }: TopbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications = [
    { id: 1, title: "New requirement added", project: "FoodRush Web App", time: "5 min ago" },
    { id: 2, title: "Milestone payment due", project: "StyleVibe Mobile App", time: "2 hours ago" },
    { id: 3, title: "Project update posted", project: "LendSmart AI Engine", time: "1 day ago" },
  ];

  return (
    <>
      <div 
        className="flex items-center gap-3 px-5 sm:px-7 py-4 border-b border-border/50 sticky top-0 z-20 shrink-0"
        style={{ background: "hsl(var(--background)/0.95)", backdropFilter: "blur(12px)" }}
      >
        {/* Mobile hamburger */}
        <button 
          className="lg:hidden w-8 h-8 rounded-xl flex items-center justify-center border border-border/50 text-muted-foreground hover:text-foreground transition-colors mr-1"
          onClick={onMenu}
        >
          <Menu size={15} />
        </button>
        
        {back && (
          <button onClick={onBack}
            className="w-8 h-8 rounded-xl flex items-center justify-center border border-border/50 text-muted-foreground hover:text-foreground transition-all shrink-0">
            <ArrowLeft size={14} />
          </button>
        )}
        
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {color && <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />}
            <h1 className="text-foreground font-black text-base sm:text-lg leading-tight truncate">{title}</h1>
          </div>
          {sub && <p className="font-mono text-[10px] text-muted-foreground mt-0.5 truncate">{sub}</p>}
        </div>
        
        
      </div>
    </>
  );
}