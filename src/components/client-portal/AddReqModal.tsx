import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, FileText, MessageSquare, Send, Loader2 } from "lucide-react";
import { Modal } from "./shared/Modal";
import { Field } from "./shared/Field";
import { PRIORITY_CFG } from "./_helper/constants";
import { Requirement, Priority } from "./_helper/types";

interface AddReqModalProps {
  color: string;
  onClose: () => void;
  onSave: (r: Requirement) => void;
}

export function AddReqModal({ color, onClose, onSave }: AddReqModalProps) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    if (!title.trim() || !desc.trim()) return;
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    onSave({ 
      id: uid(), 
      title, 
      description: desc, 
      priority, 
      status: "pending", 
      createdAt: now(), 
      createdBy: "client" 
    });
  };

  return (
    <Modal onClose={onClose}>
      <div 
        className="flex items-center gap-3 px-5 py-4 border-b border-border/50" 
        style={{ background: "hsl(var(--background)/0.95)" }}
      >
        <div 
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${color}08`, border: `1px solid ${color}15` }}
        >
          <Plus size={14} style={{ color }} />
        </div>
        <div>
          <div className="text-foreground font-bold text-sm">Add Requirement</div>
          <div className="font-mono text-[10px] text-muted-foreground">Submitted as Client · {now()}</div>
        </div>
        <button 
          onClick={onClose} 
          className="ml-auto w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all"
        >
          <X size={13} />
        </button>
      </div>

      <div className="p-5 space-y-4">
        <Field 
          label="Requirement Title" 
          icon={FileText} 
          accent={color}
          type="text" 
          value={title} 
          onChange={(e: any) => setTitle(e.target.value)}
          placeholder="e.g. Add dark mode toggle" 
        />

        <Field 
          label="Description" 
          icon={MessageSquare} 
          accent={color} 
          textarea
          value={desc} 
          onChange={(e: any) => setDesc(e.target.value)}
          placeholder="Describe expected behaviour, any constraints, references…" 
          rows={4} 
        />

        <div>
          <label className="block text-[10px] font-black font-mono uppercase tracking-[0.18em] text-muted-foreground mb-1.5">
            Priority
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(["low", "medium", "high", "critical"] as Priority[]).map(p => {
              const pm = PRIORITY_CFG[p];
              const active = priority === p;
              return (
                <button 
                  key={p} 
                  onClick={() => setPriority(p)}
                  className="py-2 rounded-xl text-[11px] font-black font-mono border border-border/50 transition-all"
                  style={{
                    borderColor: active ? `${pm.color}50` : "hsl(var(--border))",
                    background: active ? `${pm.color}08` : "transparent",
                    color: active ? pm.color : "hsl(var(--muted-foreground))",
                  }}
                >
                  {pm.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button 
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-sm font-bold border border-border/50 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all font-mono"
          >
            Cancel
          </button>
          <motion.button 
            onClick={submit} 
            disabled={saving || !title.trim() || !desc.trim()}
            whileHover={saving ? {} : { scale: 1.02 }} 
            whileTap={saving ? {} : { scale: 0.97 }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-50"
            style={{ background: color, boxShadow: `0 6px 18px ${color}35` }}
          >
            {saving ? (
              <><Loader2 size={14} className="animate-spin" />Saving…</>
            ) : (
              <><Send size={14} />Submit</>
            )}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}

function now(): string {
    return new Date().toLocaleString();
}


function uid(): string {
    throw new Error("Function not implemented.");
}
