import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, CreditCard, CheckCircle, Clock, AlertCircle, X, Send, Loader2 } from "lucide-react";
import { Modal } from "./shared/Modal";
import { Field } from "./shared/Field";
import { Milestone } from "./_helper/types";
import { Card, CardHeader } from "./shared/Card";
import { PAYMENT_STATUS_CFG } from "./_helper/constants";


interface MilestonePaymentProps {
  milestones: Milestone[];
  projectColor: string;
  onPaymentSubmit: (milestoneId: string, paymentDetails: any) => void;
}

export function MilestonePayment({ milestones, projectColor, onPaymentSubmit }: MilestonePaymentProps) {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "bank">("card");
  const [processing, setProcessing] = useState(false);

  const totalPaid = milestones
    .filter(m => m.status === "paid")
    .reduce((sum, m) => sum + m.amount, 0);
  
  const totalPending = milestones
    .filter(m => m.status === "pending" || m.status === "overdue")
    .reduce((sum, m) => sum + m.amount, 0);

  const handlePayment = async () => {
    if (!selectedMilestone) return;
    setProcessing(true);
    await new Promise(r => setTimeout(r, 1500));
    onPaymentSubmit(selectedMilestone.id, { method: paymentMethod });
    setProcessing(false);
    setShowPaymentModal(false);
    setSelectedMilestone(null);
  };

  return (
    <div className="space-y-4">
      {/* Payment Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${projectColor}15` }}>
              <Wallet size={14} style={{ color: projectColor }} />
            </div>
            <span className="text-xs font-mono text-muted-foreground">Total Budget</span>
          </div>
          <div className="font-mono text-2xl font-black" style={{ color: projectColor }}>
            ₹{(totalPaid + totalPending).toLocaleString()}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#16a34a15" }}>
              <CheckCircle size={14} style={{ color: "#16a34a" }} />
            </div>
            <span className="text-xs font-mono text-muted-foreground">Paid</span>
          </div>
          <div className="font-mono text-2xl font-black text-[#16a34a]">
            ₹{totalPaid.toLocaleString()}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#ea580c15" }}>
              <Clock size={14} style={{ color: "#ea580c" }} />
            </div>
            <span className="text-xs font-mono text-muted-foreground">Pending</span>
          </div>
          <div className="font-mono text-2xl font-black text-[#ea580c]">
            ₹{totalPending.toLocaleString()}
          </div>
        </Card>
      </div>

      {/* Milestones List */}
      <Card>
        <CardHeader>
          <Wallet size={13} className="text-primary" />
          <span className="text-xs font-bold text-foreground">Milestone-wise Payments</span>
          <span className="ml-auto font-mono text-[10px] text-muted-foreground">
            {milestones.filter(m => m.status === "paid").length}/{milestones.length} completed
          </span>
        </CardHeader>

        <div className="divide-y divide-border/50">
          {milestones.map((milestone, index) => {
            const status = PAYMENT_STATUS_CFG[milestone.status];
            return (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-5 hover:bg-accent/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-foreground">{milestone.title}</h4>
                      <span 
                        className="text-[9px] font-black px-2 py-0.5 rounded-full"
                        style={{ background: status.bg, color: status.color }}
                      >
                        {status.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{milestone.description}</p>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-foreground">₹{milestone.amount.toLocaleString()}</span>
                      <span className="font-mono text-[10px] text-muted-foreground flex items-center gap-1">
                        <Clock size={10} /> Due: {milestone.dueDate}
                      </span>
                      {milestone.paidDate && (
                        <span className="font-mono text-[10px] text-[#16a34a] flex items-center gap-1">
                          <CheckCircle size={10} /> Paid: {milestone.paidDate}
                        </span>
                      )}
                    </div>
                  </div>

                  {milestone.status === "pending" && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedMilestone(milestone);
                        setShowPaymentModal(true);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white shrink-0"
                      style={{ background: projectColor }}
                    >
                      Pay Now
                    </motion.button>
                  )}

                  {milestone.status === "overdue" && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedMilestone(milestone);
                        setShowPaymentModal(true);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white shrink-0"
                      style={{ background: "#dc2626" }}
                    >
                      Pay Overdue
                    </motion.button>
                  )}
                </div>

                {/* Progress indicator for paid milestones */}
                {milestone.status === "paid" && (
                  <div className="mt-3 h-1 rounded-full overflow-hidden bg-border/50">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${projectColor}, ${projectColor}80)` }}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && selectedMilestone && (
          <Modal onClose={() => setShowPaymentModal(false)}>
            <div 
              className="flex items-center gap-3 px-5 py-4 border-b border-border/50" 
              style={{ background: "hsl(var(--background)/0.95)" }}
            >
              <div 
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${projectColor}15`, border: `1px solid ${projectColor}25` }}
              >
                <CreditCard size={14} style={{ color: projectColor }} />
              </div>
              <div>
                <div className="text-foreground font-bold text-sm">Make Payment</div>
                <div className="font-mono text-[10px] text-muted-foreground">
                  {selectedMilestone.title} · ₹{selectedMilestone.amount.toLocaleString()}
                </div>
              </div>
              <button 
                onClick={() => setShowPaymentModal(false)} 
                className="ml-auto w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all"
              >
                <X size={13} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-[10px] font-black font-mono uppercase tracking-[0.18em] text-muted-foreground mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "card", label: "Card", icon: CreditCard },
                    { id: "upi", label: "UPI", icon: Send },
                    { id: "bank", label: "Bank", icon: Wallet },
                  ].map(method => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as any)}
                      className="py-3 rounded-xl text-xs font-medium border transition-all flex flex-col items-center gap-1"
                      style={{
                        borderColor: paymentMethod === method.id ? `${projectColor}50` : "hsl(var(--border))",
                        background: paymentMethod === method.id ? `${projectColor}08` : "transparent",
                        color: paymentMethod === method.id ? projectColor : "hsl(var(--muted-foreground))",
                      }}
                    >
                      <method.icon size={14} />
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-3">
                  <Field
                    label="Card Number"
                    icon={CreditCard}
                    accent={projectColor}
                    type="text"
                    placeholder="4242 4242 4242 4242"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Field
                      label="Expiry"
                      icon={CreditCard}
                      accent={projectColor}
                      type="text"
                      placeholder="MM/YY"
                    />
                    <Field
                      label="CVV"
                      icon={CreditCard}
                      accent={projectColor}
                      type="text"
                      placeholder="123"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "upi" && (
                <Field
                  label="UPI ID"
                  icon={Send}
                  accent={projectColor}
                  type="text"
                  placeholder="username@okhdfcbank"
                />
              )}

              {paymentMethod === "bank" && (
                <div className="p-4 rounded-xl border border-border/50 bg-accent/30">
                  <p className="text-xs text-muted-foreground mb-2">Bank Transfer Details</p>
                  <div className="space-y-1 font-mono text-[10px]">
                    <p className="text-foreground">Account: 1234567890</p>
                    <p className="text-foreground">IFSC: HDFC0001234</p>
                    <p className="text-foreground">Bank: HDFC Bank</p>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 py-3 rounded-xl text-sm font-bold border border-border/50 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all font-mono"
                >
                  Cancel
                </button>
                <motion.button 
                  onClick={handlePayment}
                  disabled={processing}
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-50"
                  style={{ background: projectColor, boxShadow: `0 6px 18px ${projectColor}35` }}
                >
                  {processing ? (
                    <><Loader2 size={14} className="animate-spin" />Processing…</>
                  ) : (
                    <><Send size={14} />Pay ₹{selectedMilestone.amount.toLocaleString()}</>
                  )}
                </motion.button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}