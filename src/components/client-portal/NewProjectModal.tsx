import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  FolderGit2,
  FileText,
  TrendingUp,
  CalendarDays,
  ChevronDown,
  Send,
  Loader2,
} from "lucide-react";

import { Modal } from "./shared/Modal";
import { Field } from "./shared/Field";
import { PROJECT_TYPES, TYPE_COLORS } from "./_helper/constants";
import { Project } from "./_helper/types";

interface NewProjectModalProps {
  onClose: () => void;
  onSave: (p: Project) => void;
}

export function NewProjectModal({ onClose, onSave }: NewProjectModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Web Development");
  const [desc, setDesc] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);

  const color = TYPE_COLORS[type] ?? "#2563eb";

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const submit = async () => {
    if (!name.trim() || !desc.trim() || !deadline) return;

    setSaving(true);

    await new Promise((r) => setTimeout(r, 800));

    onSave({
      id: uid(),
      name,
      type,
      color,
      status: "planning",
      progress: 0,
      startDate: now(),
      deadline,
      description: desc,
      budget: budget || "To be confirmed",
      spent: "₹0",
      pm: "Being assigned",
      dev: "Being assigned",
      requirements: [],
      updates: [],
      milestones: [],
      stack: [],
      documents: files,
    });
  };

  return (
    <Modal onClose={onClose}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-4 border-b border-border/50"
        style={{ background: "hsl(var(--background)/0.95)" }}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${color}08`, border: `1px solid ${color}15` }}
        >
          <FolderGit2 size={14} style={{ color }} />
        </div>

        <div>
          <div className="text-foreground font-semibold text-sm">
            Request New Project
          </div>
          <div className="text-xs text-muted-foreground">
            Our team replies within 4 hours
          </div>
        </div>

        <button
          onClick={onClose}
          className="ml-auto w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all"
        >
          <X size={13} />
        </button>
      </div>

      {/* Body */}
      <div className="p-5 space-y-2 max-h-[70vh] overflow-y-auto">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            label="Project Name"
            icon={FolderGit2}
            accent={color}
            type="text"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            placeholder="e.g. My E-Commerce Store"
          />

          {/* Project Type */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
              Project Type
            </label>

            <div className="relative">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full appearance-none px-4 py-2.5 rounded-xl text-sm text-foreground focus:outline-none border border-border/50 pr-8 transition-all bg-background"
              >
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={12}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <Field
          label="Project Description"
          icon={FileText}
          accent={color}
          textarea
          value={desc}
          onChange={(e: any) => setDesc(e.target.value)}
          placeholder="Describe your project requirements, goals, features..."
          rows={4}
        />

        {/* Upload Section */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-2">
            Upload Documents
          </label>

          <div className="border border-dashed border-border rounded-xl p-4 bg-background/60">
            <label className="flex flex-col items-center justify-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground">
              <FileText size={18} />
              <span>Click to upload files</span>

              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>

            {files.length > 0 && (
              <div className="mt-3 space-y-1">
                {files.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs bg-accent/40 px-3 py-1.5 rounded-lg"
                  >
                    <span className="truncate">{f.name}</span>

                    <button
                      onClick={() => removeFile(i)}
                      className="text-muted-foreground hover:text-red-500"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Budget + Deadline */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            label="Estimated Budget"
            icon={TrendingUp}
            accent={color}
            type="text"
            value={budget}
            onChange={(e: any) => setBudget(e.target.value)}
            placeholder="e.g. ₹50,000"
          />

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
              Expected Deadline
            </label>

            <div className="flex items-center px-3.5 py-2.5 rounded-xl border border-border/50 transition-all bg-background">
              <CalendarDays
                size={13}
                className="text-muted-foreground mr-2.5 shrink-0"
              />

              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-sm font-semibold border border-border/50 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all"
          >
            Cancel
          </button>

          <motion.button
            onClick={submit}
            disabled={saving || !name.trim() || !desc.trim() || !deadline}
            whileHover={saving ? {} : { scale: 1.02 }}
            whileTap={saving ? {} : { scale: 0.97 }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-50"
            style={{ background: color, boxShadow: `0 6px 18px ${color}35` }}
          >
            {saving ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Submitting…
              </>
            ) : (
              <>
                <Send size={14} />
                Submit Request
              </>
            )}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}

function uid(): string {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `${ts}-${rand}`;
}

function now(): string {
  return new Date().toISOString().split("T")[0];
}