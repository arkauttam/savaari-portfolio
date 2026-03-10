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
        className="flex items-center gap-3 px-5 sm:px-7 py-4 border-b border-border/50 sticky top-0 z-20 shrink-0 shadow-md"
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
        
        <div className="ml-auto flex items-center gap-3 shrink-0">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-8 h-8 rounded-xl flex items-center justify-center border border-border/50 text-muted-foreground hover:text-foreground transition-all relative"
            >
              <Bell size={14} />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-[9px] font-black flex items-center justify-center text-destructive-foreground">
                3
              </span>
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 z-50"
                >
                  <Card className="overflow-hidden">
                    <div className="p-3 border-b border-border/50">
                      <h3 className="text-sm font-bold text-foreground">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-3 border-b border-border/50 last:border-0 hover:bg-accent/50 transition-colors">
                          <p className="text-xs font-medium text-foreground">{n.title}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">{n.project} · {n.time}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-4 h-4 rounded-xl flex items-center justify-center font-black text-xs"
            style={{ 
              background: "hsl(var(--primary)/0.1)", 
              color: "hsl(var(--primary))", 
              border: "1px solid hsl(var(--primary)/0.2)" 
            }}
          >
            <LogOut/>
          </div>
        </div>
      </div>
    </>
  );
}