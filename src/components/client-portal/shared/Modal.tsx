import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./Card";

export function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.93, y: 18 }} 
        animate={{ scale: 1, y: 0 }} 
        exit={{ scale: 0.93, y: 10 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="w-full max-w-lg"
        onClick={e => e.stopPropagation()}
      >
        <Card className="overflow-hidden">
          {children}
        </Card>
      </motion.div>
    </motion.div>
  );
}