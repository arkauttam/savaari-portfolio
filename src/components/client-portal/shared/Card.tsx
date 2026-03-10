import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = "", onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-xl xs:rounded-2xl sm:rounded-3xl 
        border border-border/50 
        bg-background/85 backdrop-blur-xl
        transition-all duration-200
        ${onClick ? 'cursor-pointer hover:shadow-lg' : ''}
        ${className}
      `}
      style={{
        boxShadow: "0 10px 30px rgba(0,0,0,0.08), 0 0 0 1px hsl(var(--border)/0.4)"
      }}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-3 px-5 py-4 border-b border-border/50 ${className}`}>
      {children}
    </div>
  );
}