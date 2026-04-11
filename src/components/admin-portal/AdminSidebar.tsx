import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BarChart3, FolderGit2, Users, DollarSign,
    LogOut, X, TrendingUp,
    MessageSquare
} from "lucide-react";

interface AdminSidebarProps {
    activeTab: string;
    setActiveTab: (tab: any) => void;
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
    onLogout: () => void;
}

const navItems = [
    { id: "overview", label: "Overview", Icon: BarChart3 },
    { id: "projects", label: "Projects", Icon: FolderGit2 },
    { id: "clients", label: "Clients", Icon: Users },
    { id: "finances", label: "Finances", Icon: DollarSign },
    { id: "analytics", label: "Analytics", Icon: TrendingUp },
    { id: "chat", Icon: MessageSquare, label: "Chat" },

];

export function AdminSidebar({ activeTab, setActiveTab, mobileOpen, setMobileOpen, onLogout }: AdminSidebarProps) {
    const content = (
        <div className="flex flex-col h-full bg-white">
            {/* Logo */}
            <div className="flex items-center gap-3 px-5 py-[18px] border-b border-border/50 shrink-0">
                <a href="#home" className="flex items-center shrink-0 group">
                    <img src="/logo.png" alt="OS tech labs Infotech" width={120} height={44} className="h-10 w-auto object-contain" />
                </a>
                <button className="ml-auto lg:hidden text-muted-foreground" onClick={() => setMobileOpen(false)}>
                    <X size={16} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
                <p className="text-[10px] font-black font-mono uppercase tracking-[0.18em] text-muted-foreground/70 px-2 py-1">
                    Main
                </p>
                {navItems.map((item) => {
                    const active = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id as any)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${active
                                    ? "bg-primary/5 text-primary border border-primary/20"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                }`}
                        >
                            <item.Icon size={15} className={active ? "text-primary" : "text-muted-foreground/70"} />
                            <span className="flex-1 text-left">{item.label}</span>
                            {active && (
                                <motion.div layoutId="sidebarDot" className="w-1.5 h-1.5 rounded-full bg-primary" />
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Bottom */}
            <div className="px-3 py-4 border-t border-border/50">
                <p className="text-[10px] font-black font-mono uppercase tracking-[0.18em] text-muted-foreground/70 px-2 py-1">
                    Admin
                </p>
                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 text-muted-foreground hover:text-red-600 hover:bg-red-50"
                >
                    <LogOut size={15} />
                    <span className="flex-1 text-left">Sign Out</span>
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop */}
            <aside className="hidden lg:flex flex-col w-[260px] shrink-0 fixed left-0 top-0 bottom-0 z-30 bg-white border-r border-border/50">
                {content}
            </aside>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 lg:hidden bg-black/40 backdrop-blur-sm"
                        onClick={() => setMobileOpen(false)}
                    >
                        <motion.aside
                            initial={{ x: -260 }}
                            animate={{ x: 0 }}
                            exit={{ x: -260 }}
                            transition={{ type: "spring", stiffness: 400, damping: 35 }}
                            className="absolute left-0 top-0 bottom-0 w-[260px] bg-white border-r border-border/50"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {content}
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}