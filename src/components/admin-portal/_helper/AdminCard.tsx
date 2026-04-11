import React from "react";

interface AdminCardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function AdminCard({ children, className = "", noPadding = false }: AdminCardProps) {
  return (
    <div className={`bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden ${className}`}>
      {noPadding ? children : <div className="p-5">{children}</div>}
    </div>
  );
}