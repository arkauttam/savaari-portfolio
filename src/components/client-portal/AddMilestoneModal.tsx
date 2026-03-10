import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Calendar,
  DollarSign,
  FileText,
  Tag,
  Send,
  Upload,
} from "lucide-react";

import { Modal } from "./shared/Modal";
import { Field } from "./shared/Field";
import { Milestone } from "./_helper/types";

interface AddMilestoneModalProps {
  color: string;
  onClose: () => void;
  onSave: (milestone: Milestone) => void;
}

export function AddMilestoneModal({ color, onClose, onSave }: AddMilestoneModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newMilestone: Milestone = {
      id: `ms-${Date.now()}`,
      title,
      description,
      amount: parseFloat(amount) || 0,
      dueDate,
      status: "pending",
      paidDate: undefined,
      document: file
    };

    onSave(newMilestone);
  };

  const isFormValid = title && description && amount && dueDate;

  return (
    <Modal onClose={onClose}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-4 border-b border-border/50"
        style={{ background: "hsl(var(--background)/0.95)" }}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${color}15`, border: `1px solid ${color}25` }}
        >
          <DollarSign size={14} style={{ color }} />
        </div>

        <div>
          <div className="text-foreground font-bold text-sm">
            Add Payment Milestone
          </div>
          <div className="text-xs text-muted-foreground">
            Create a new milestone for this project
          </div>
        </div>

        <button
          onClick={onClose}
          className="ml-auto w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all"
        >
          <X size={13} />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-5 space-y-4">

        <Field
          label="Milestone Title"
          icon={Tag}
          accent={color}
          type="text"
          placeholder="e.g., UI/UX Design Completion"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-2">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what this milestone includes..."
            className="w-full px-3 py-2.5 text-sm bg-transparent border border-border/50 rounded-xl focus:outline-none focus:border-border transition-all resize-none h-20"
            required
          />
        </div>

        <Field
          label="Amount (₹)"
          icon={DollarSign}
          accent={color}
          type="number"
          placeholder="e.g., 50000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          step="1000"
          required
        />

        <Field
          label="Due Date"
          icon={Calendar}
          accent={color}
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />

        {/* PDF Upload */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-2">
            Upload PDF Document
          </label>

          <div className="border border-dashed border-border rounded-xl p-4 text-center bg-background/60">

            <label className="flex flex-col items-center justify-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground">

              <Upload size={18} />

              <span>Click to upload PDF</span>

              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>

            {file && (
              <div className="mt-3 flex items-center justify-between bg-accent/40 px-3 py-2 rounded-lg text-xs">

                <div className="flex items-center gap-2">
                  <FileText size={14} />
                  <span className="truncate">{file.name}</span>
                </div>

                <button
                  type="button"
                  onClick={removeFile}
                  className="text-muted-foreground hover:text-red-500"
                >
                  <X size={12} />
                </button>

              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-4">

          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-sm font-semibold border border-border/50 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all"
          >
            Cancel
          </button>

          <motion.button
            type="submit"
            disabled={!isFormValid}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: color,
              boxShadow: `0 6px 18px ${color}35`,
              opacity: !isFormValid ? 0.5 : 1,
            }}
          >
            <Send size={14} />
            Create Milestone
          </motion.button>

        </div>

      </form>
    </Modal>
  );
}