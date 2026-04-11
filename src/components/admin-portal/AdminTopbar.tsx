import React from "react";
import { Bell, LogOut } from "lucide-react";

interface AdminTopbarProps {
  title: string;
  sub: string;
  onMenu?: () => void;
}

export function AdminTopbar({ title, sub, onMenu }: AdminTopbarProps) {
  return (
    <div className="sticky top-0 z-40 bg-background border-b border-border/50">
      <div className="flex items-center justify-between px-5 sm:px-7 py-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-black text-foreground tracking-tight">{title}</h1>
            <p className="text-[11px] font-mono text-muted-foreground mt-0.5">{sub}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-xl hover:bg-accent transition-colors">
            <Bell size={16} className="text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>
    </div>
  );
}