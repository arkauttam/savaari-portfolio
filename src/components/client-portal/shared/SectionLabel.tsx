import React from "react";

export function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="h-px w-8 bg-primary/30" />
      <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] font-mono">{text}</span>
      <div className="h-px flex-1 bg-border/30" />
    </div>
  );
}