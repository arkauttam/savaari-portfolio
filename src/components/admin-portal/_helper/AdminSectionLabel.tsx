import React from "react";

interface AdminSectionLabelProps {
  text: string;
}

export function AdminSectionLabel({ text }: AdminSectionLabelProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="h-px w-4 bg-primary/30" />
      <span className="text-[10px] font-black font-mono uppercase tracking-[0.18em] text-primary/70">
        {text}
      </span>
    </div>
  );
}