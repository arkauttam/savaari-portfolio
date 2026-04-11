import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, UserPlus, MoreVertical, Search, Filter, 
  Mail, Phone, Calendar, DollarSign, FolderGit2,
  Edit, Trash2, Eye, CheckCircle, XCircle, AlertCircle
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { X, TrendingUp } from "lucide-react";
import { AdminCard } from "./_helper/AdminCard";
import { AdminSectionLabel } from "./_helper/AdminSectionLabel";

interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  joinDate: string;
  status: 'active' | 'inactive';
  projects: number;
  totalSpent: number;
  avatar?: string;
  lastActive?: string;
}

const MOCK_CLIENTS: Client[] = [
  {
    id: "c1",
    name: "Rajesh Kumar",
    email: "client@demo.com",
    company: "FoodRush Pvt Ltd",
    phone: "+91 98765 43210",
    joinDate: "2024-10-01",
    status: "active",
    projects: 1,
    totalSpent: 122400,
    lastActive: "2025-01-15"
  },
  {
    id: "c2",
    name: "Priya Sharma",
    email: "demo@os.com",
    company: "StyleVibe Fashion",
    phone: "+91 87654 32109",
    joinDate: "2024-08-15",
    status: "active",
    projects: 1,
    totalSpent: 218400,
    lastActive: "2025-01-18"
  },
  {
    id: "c3",
    name: "Amit Patel",
    email: "amit@lendsmart.com",
    company: "LendSmart Technologies",
    phone: "+91 76543 21098",
    joinDate: "2025-01-20",
    status: "active",
    projects: 1,
    totalSpent: 43200,
    lastActive: "2025-01-22"
  },
  {
    id: "c4",
    name: "Neha Gupta",
    email: "neha@healthfirst.com",
    company: "HealthFirst Diagnostics",
    phone: "+91 99887 66554",
    joinDate: "2024-11-10",
    status: "inactive",
    projects: 0,
    totalSpent: 0,
    lastActive: "2024-12-01"
  }
];

export function ClientsTab() {
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === "active").length,
    inactive: clients.filter(c => c.status === "inactive").length,
    totalRevenue: clients.reduce((sum, c) => sum + c.totalSpent, 0),
    avgSpent: clients.reduce((sum, c) => sum + c.totalSpent, 0) / clients.length,
  };

  const handleStatusToggle = (clientId: string) => {
    setClients(prev => prev.map(c => 
      c.id === clientId 
        ? { ...c, status: c.status === "active" ? "inactive" : "active" }
        : c
    ));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono text-muted-foreground">Total Clients</p>
              <p className="text-2xl font-black text-foreground mt-1">{stats.total}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users size={18} className="text-primary" />
            </div>
          </div>
        </AdminCard>

        <AdminCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono text-muted-foreground">Active Clients</p>
              <p className="text-2xl font-black text-emerald-600 mt-1">{stats.active}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <CheckCircle size={18} className="text-emerald-600" />
            </div>
          </div>
        </AdminCard>

        <AdminCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-black text-foreground mt-1">₹{(stats.totalRevenue / 100000).toFixed(1)}L</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <DollarSign size={18} className="text-blue-600" />
            </div>
          </div>
        </AdminCard>

        <AdminCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono text-muted-foreground">Avg. Spend</p>
              <p className="text-2xl font-black text-foreground mt-1">₹{(stats.avgSpent / 1000).toFixed(0)}K</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <TrendingUp size={18} className="text-purple-600" />
            </div>
          </div>
        </AdminCard>
      </div>

      <AdminSectionLabel text="// client management" />

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search clients by name, email, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-sm"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2.5 rounded-xl text-xs font-mono border border-border/50 bg-white text-foreground focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition-all"
          >
            <UserPlus size={14} />
            Add Client
          </button>
        </div>
      </div>

      {/* Clients Table */}
      <AdminCard noPadding>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-accent/30 border-b border-border/50">
              <tr>
                <th className="text-left p-4 text-[10px] font-black font-mono uppercase tracking-[0.18em] text-muted-foreground/70">Client</th>
                <th className="text-left p-4 text-[10px] font-black font-mono uppercase tracking-[0.18em] text-muted-foreground/70">Company</th>
                <th className="text-left p-4 text-[10px] font-black font-mono uppercase tracking-[0.18em] text-muted-foreground/70">Contact</th>
                <th className="text-left p-4 text-[10px] font-black font-mono uppercase tracking-[0.18em] text-muted-foreground/70">Projects</th>
                <th className="text-left p-4 text-[10px] font-black font-mono uppercase tracking-[0.18em] text-muted-foreground/70">Spent</th>
                <th className="text-left p-4 text-[10px] font-black font-mono uppercase tracking-[0.18em] text-muted-foreground/70">Status</th>
                <th className="text-left p-4 text-[10px] font-black font-mono uppercase tracking-[0.18em] text-muted-foreground/70">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredClients.map((client, idx) => (
                <motion.tr 
                  key={client.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="hover:bg-accent/30 transition-colors group"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">
                          {client.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{client.name}</p>
                        <p className="text-[10px] font-mono text-muted-foreground">{client.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{client.company}</p>
                      <p className="text-[9px] font-mono text-muted-foreground/70">Joined: {client.joinDate}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Phone size={12} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{client.phone}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/5 text-primary rounded-full text-[10px] font-mono font-bold">
                      <FolderGit2 size={10} />
                      {client.projects} projects
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-medium text-foreground">
                      ₹{client.totalSpent.toLocaleString()}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleStatusToggle(client.id)}
                      className={`px-2 py-1 rounded-full text-[9px] font-bold transition-all ${
                        client.status === 'active' 
                          ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      {client.status === 'active' ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => setSelectedClient(client)}
                        className="p-1.5 hover:bg-accent rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={14} className="text-muted-foreground" />
                      </button>
                      <button className="p-1.5 hover:bg-accent rounded-lg transition-colors" title="Edit">
                        <Edit size={14} className="text-muted-foreground" />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <Trash2 size={14} className="text-muted-foreground hover:text-red-600" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* Client Detail Modal */}
      <AnimatePresence>
        {selectedClient && (
          <ClientDetailModal client={selectedClient} onClose={() => setSelectedClient(null)} />
        )}
      </AnimatePresence>

      {/* Add Client Modal */}
      <AnimatePresence>
        {showAddModal && (
          <AddClientModal onClose={() => setShowAddModal(false)} onAdd={(client) => {
            setClients(prev => [client, ...prev]);
            setShowAddModal(false);
          }} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Client Detail Modal Component
function ClientDetailModal({ client, onClose }: { client: Client; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-border/50 p-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <span className="text-xl font-bold text-primary">{client.name.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">{client.name}</h2>
              <p className="text-xs text-muted-foreground">{client.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-accent rounded-xl transition-colors">
            <X size={16} className="text-muted-foreground" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Client Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-accent/20 rounded-xl">
              <p className="text-[9px] font-mono text-muted-foreground">Company</p>
              <p className="text-sm font-medium text-foreground mt-1">{client.company}</p>
            </div>
            <div className="p-3 bg-accent/20 rounded-xl">
              <p className="text-[9px] font-mono text-muted-foreground">Phone</p>
              <p className="text-sm font-medium text-foreground mt-1">{client.phone}</p>
            </div>
            <div className="p-3 bg-accent/20 rounded-xl">
              <p className="text-[9px] font-mono text-muted-foreground">Join Date</p>
              <p className="text-sm font-medium text-foreground mt-1">{client.joinDate}</p>
            </div>
            <div className="p-3 bg-accent/20 rounded-xl">
              <p className="text-[9px] font-mono text-muted-foreground">Last Active</p>
              <p className="text-sm font-medium text-foreground mt-1">{client.lastActive || 'N/A'}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-xl">
              <FolderGit2 size={16} className="text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{client.projects}</p>
              <p className="text-[10px] font-mono text-muted-foreground">Total Projects</p>
            </div>
            <div className="text-center p-4 bg-primary/5 rounded-xl">
              <DollarSign size={16} className="text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">₹{(client.totalSpent / 1000).toFixed(0)}K</p>
              <p className="text-[10px] font-mono text-muted-foreground">Total Spent</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Add Client Modal Component
function AddClientModal({ onClose, onAdd }: { onClose: () => void; onAdd: (client: Client) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient: Client = {
      id: `c${Date.now()}`,
      ...formData,
      joinDate: new Date().toISOString().slice(0, 10),
      status: "active",
      projects: 0,
      totalSpent: 0,
    };
    onAdd(newClient);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-md w-full"
      >
        <div className="p-5 border-b border-border/50">
          <h2 className="text-lg font-bold text-foreground">Add New Client</h2>
          <p className="text-xs text-muted-foreground mt-1">Enter client details below</p>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-[10px] font-mono text-muted-foreground mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-muted-foreground mb-1">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              placeholder="john@company.com"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-muted-foreground mb-1">Company Name</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-3 py-2 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              placeholder="Company Pvt Ltd"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-muted-foreground mb-1">Phone Number</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              placeholder="+91 98765 43210"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-border/50 rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors"
            >
              Add Client
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

