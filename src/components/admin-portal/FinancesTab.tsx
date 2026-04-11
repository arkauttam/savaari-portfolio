import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  DollarSign, CreditCard, TrendingUp, TrendingDown, 
  Calendar, Download, Filter, Search, Wallet,
  CheckCircle, Clock, AlertCircle, ArrowUpRight,
  ArrowDownRight, FileText, Eye, X
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar,
  Legend, LineChart, Line
} from "recharts";
import { AdminStatsCard } from "./AdminStatsCard";
import { Project } from "../client-portal/_helper/types";
import { AdminCard } from "./_helper/AdminCard";
import { AdminSectionLabel } from "./_helper/AdminSectionLabel";

interface FinancesTabProps {
  projects: Project[];
}

interface Transaction {
  id: string;
  projectName: string;
  milestoneTitle: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  type: 'payment' | 'refund';
  client: string;
}

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-xl shadow-lg border border-border/50">
        <p className="text-xs font-medium text-foreground">{label}</p>
        <p className="text-sm font-bold text-primary mt-1">
          ₹{(payload[0].value / 1000).toFixed(1)}K
        </p>
      </div>
    );
  }
  return null;
};

export function FinancesTab({ projects }: FinancesTabProps) {
  const [dateRange, setDateRange] = useState<"week" | "month" | "year" | "all">("month");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [chartType, setChartType] = useState<"area" | "bar">("area");

  // Calculate financial metrics
  const totalRevenue = projects.reduce((sum, p) => {
    const spent = parseFloat(p.spent.replace(/[₹,]/g, '')) || 0;
    return sum + spent;
  }, 0);

  const totalBudget = projects.reduce((sum, p) => {
    const budget = parseFloat(p.budget.replace(/[₹,]/g, '')) || 0;
    return sum + budget;
  }, 0);

  const totalPaid = projects.reduce((sum, p) => {
    return sum + (p.milestones?.filter(m => m.status === "paid").reduce((s, m) => s + m.amount, 0) || 0);
  }, 0);

  const totalPending = projects.reduce((sum, p) => {
    return sum + (p.milestones?.filter(m => m.status === "pending").reduce((s, m) => s + m.amount, 0) || 0);
  }, 0);

  const totalOverdue = projects.reduce((sum, p) => {
    return sum + (p.milestones?.filter(m => m.status === "overdue").reduce((s, m) => s + m.amount, 0) || 0);
  }, 0);

  // Generate transactions from milestones
  const transactions: Transaction[] = projects.flatMap(p => 
    (p.milestones || []).map(m => {
      let status: 'completed' | 'pending' | 'failed' = 'pending';
      if (m.status === 'paid') status = 'completed';
      else if (m.status === 'overdue') status = 'failed';
      else status = 'pending';
      
      return {
        id: `${p.id}-${m.id}`,
        projectName: p.name,
        milestoneTitle: m.title,
        amount: m.amount,
        date: m.paidDate || m.dueDate,
        status: status,
        type: 'payment' as const,
        client: p.pm
      };
    })
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Prepare monthly revenue data for charts
  const monthlyRevenueData = React.useMemo(() => {
    const monthlyMap = new Map<string, { month: string; revenue: number; pending: number; count: number }>();
    
    transactions.forEach(t => {
      const month = t.date.slice(0, 7);
      if (!monthlyMap.has(month)) {
        monthlyMap.set(month, { month, revenue: 0, pending: 0, count: 0 });
      }
      const data = monthlyMap.get(month)!;
      if (t.status === 'completed') {
        data.revenue += t.amount;
        data.count++;
      } else if (t.status === 'pending') {
        data.pending += t.amount;
      }
    });
    
    return Array.from(monthlyMap.values())
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-6);
  }, [transactions]);

  // Prepare project revenue data for pie chart
  const projectRevenueData = React.useMemo(() => {
    return projects.map(p => ({
      name: p.name,
      value: parseFloat(p.spent.replace(/[₹,]/g, '')) || 0,
      color: p.color
    })).filter(p => p.value > 0);
  }, [projects]);

  // Prepare payment status data for pie chart
  const paymentStatusData = [
    { name: 'Paid', value: totalPaid, color: '#10B981' },
    { name: 'Pending', value: totalPending, color: '#F59E0B' },
    { name: 'Overdue', value: totalOverdue, color: '#EF4444' }
  ].filter(d => d.value > 0);

  // Prepare weekly data for current month
  const weeklyData = React.useMemo(() => {
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const weeklyMap = new Map<string, number>();
    weeks.forEach(week => weeklyMap.set(week, 0));
    
    transactions.forEach(t => {
      const date = new Date(t.date);
      if (date.getMonth() === currentMonth && date.getFullYear() === currentYear && t.status === 'completed') {
        const weekNum = Math.ceil(date.getDate() / 7);
        const weekKey = `Week ${weekNum}`;
        weeklyMap.set(weekKey, (weeklyMap.get(weekKey) || 0) + t.amount);
      }
    });
    
    return weeks.map(week => ({
      week,
      amount: weeklyMap.get(week) || 0
    }));
  }, [transactions]);

  // Colors for charts
  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4', '#EC4899'];

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.milestoneTitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (dateRange === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return matchesSearch && new Date(t.date) >= weekAgo;
    }
    if (dateRange === "month") {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return matchesSearch && new Date(t.date) >= monthAgo;
    }
    if (dateRange === "year") {
      const yearAgo = new Date();
      yearAgo.setFullYear(yearAgo.getFullYear() - 1);
      return matchesSearch && new Date(t.date) >= yearAgo;
    }
    return matchesSearch;
  });

  const completedTransactions = filteredTransactions.filter(t => t.status === "completed");
  const pendingTransactions = filteredTransactions.filter(t => t.status === "pending");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatsCard 
          title="Total Revenue" 
          value={`₹${(totalRevenue / 100000).toFixed(2)}L`} 
          icon={DollarSign} 
          color="#10B981" 
          trend={{ value: 23, isPositive: true }}
        />
        <AdminStatsCard 
          title="Pending Payments" 
          value={`₹${(totalPending / 100000).toFixed(2)}L`} 
          icon={Clock} 
          color="#F59E0B" 
        />
        <AdminStatsCard 
          title="Overdue Amount" 
          value={`₹${(totalOverdue / 100000).toFixed(2)}L`} 
          icon={AlertCircle} 
          color="#EF4444" 
        />
        <AdminStatsCard 
          title="Collection Rate" 
          value={`${Math.round((totalPaid / totalBudget) * 100)}%`} 
          icon={TrendingUp} 
          color="#8B5CF6" 
        />
      </div>

      {/* Revenue Trend Chart - Area/Bar */}
      <AdminCard>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp size={14} className="text-primary" />
            <span className="text-xs font-bold text-foreground">Revenue Trend</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setChartType("area")}
              className={`px-3 py-1 rounded-lg text-[10px] font-mono transition-colors ${
                chartType === "area"
                  ? "bg-primary text-white"
                  : "bg-accent text-muted-foreground hover:bg-accent/80"
              }`}
            >
              Area
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={`px-3 py-1 rounded-lg text-[10px] font-mono transition-colors ${
                chartType === "bar"
                  ? "bg-primary text-white"
                  : "bg-accent text-muted-foreground hover:bg-accent/80"
              }`}
            >
              Bar
            </button>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={350}>
          {chartType === "area" ? (
            <AreaChart data={monthlyRevenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 10, fill: '#64748b' }}
                tickFormatter={(value) => {
                  const date = new Date(value + "-01");
                  return date.toLocaleDateString('default', { month: 'short' });
                }}
              />
              <YAxis 
                tick={{ fontSize: 10, fill: '#64748b' }}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3B82F6" 
                strokeWidth={2}
                fill="url(#revenueGradient)" 
                name="Revenue"
              />
            </AreaChart>
          ) : (
            <BarChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 10, fill: '#64748b' }}
                tickFormatter={(value) => {
                  const date = new Date(value + "-01");
                  return date.toLocaleDateString('default', { month: 'short' });
                }}
              />
              <YAxis 
                tick={{ fontSize: 10, fill: '#64748b' }}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Revenue" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </AdminCard>

      {/* Pie Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue by Project - Pie Chart */}
        <AdminCard>
          <div className="flex items-center gap-2 mb-4">
            <DollarSign size={14} className="text-primary" />
            <span className="text-xs font-bold text-foreground">Revenue by Project</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={projectRevenueData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
              >
                {projectRevenueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`₹${(value / 1000).toFixed(0)}K`, 'Revenue']}
                contentStyle={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </AdminCard>

        {/* Payment Status - Pie Chart */}
        <AdminCard>
          <div className="flex items-center gap-2 mb-4">
            <CreditCard size={14} className="text-primary" />
            <span className="text-xs font-bold text-foreground">Payment Status Distribution</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
              >
                {paymentStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`₹${(value / 1000).toFixed(0)}K`, 'Amount']}
                contentStyle={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </AdminCard>
      </div>

      {/* Weekly Revenue Bar Chart */}
      <AdminCard>
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={14} className="text-primary" />
          <span className="text-xs font-bold text-foreground">Weekly Revenue (Current Month)</span>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#64748b' }} />
            <YAxis 
              tick={{ fontSize: 10, fill: '#64748b' }}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip 
              formatter={(value: number) => [`₹${(value / 1000).toFixed(1)}K`, 'Revenue']}
              contentStyle={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}
            />
            <Bar dataKey="amount" fill="#8B5CF6" radius={[8, 8, 0, 0]} name="Revenue">
              {weeklyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#gradient${index})`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </AdminCard>

      <AdminSectionLabel text="// transaction history" />

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-sm"
          />
        </div>
        <div className="flex gap-2">
          {(["week", "month", "year", "all"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-3 py-2 rounded-lg text-[10px] font-mono transition-colors ${
                dateRange === range
                  ? "bg-primary text-white"
                  : "bg-accent text-muted-foreground hover:bg-accent/80"
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <AdminCard noPadding>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-accent/30 border-b border-border/50">
              <tr>
                <th className="text-left p-4 text-[10px] font-black font-mono uppercase tracking-[0.18em] text-muted-foreground/70">Transaction</th>
                <th className="text-left p-4 text-[10px] font-black font-mono uppercase tracking-[0.18em] text-muted-foreground/70">Project</th>
                <th className="text-left p-4 text-[10px] font-black font-mono uppercase tracking-[0.18em] text-muted-foreground/70">Date</th>
                <th className="text-left p-4 text-[10px] font-black font-mono uppercase tracking-[0.18em] text-muted-foreground/70">Amount</th>
                <th className="text-left p-4 text-[10px] font-black font-mono uppercase tracking-[0.18em] text-muted-foreground/70">Status</th>
                <th className="text-left p-4 text-[10px] font-black font-mono uppercase tracking-[0.18em] text-muted-foreground/70">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredTransactions.slice(0, 10).map((transaction, idx) => (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.02 }}
                  className="hover:bg-accent/30 transition-colors"
                >
                  <td className="p-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{transaction.milestoneTitle}</p>
                      <p className="text-[9px] font-mono text-muted-foreground">ID: {transaction.id.slice(-8)}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">{transaction.projectName}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={10} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{transaction.date}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-bold text-foreground">
                      ₹{transaction.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-bold ${
                      transaction.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                      transaction.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {transaction.status === 'completed' && <CheckCircle size={8} />}
                      {transaction.status === 'pending' && <Clock size={8} />}
                      {transaction.status === 'failed' && <AlertCircle size={8} />}
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => setSelectedTransaction(transaction)}
                      className="p-1.5 hover:bg-accent rounded-lg transition-colors"
                    >
                      <Eye size={14} className="text-muted-foreground" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* Transaction Detail Modal */}
      <AnimatePresence>
        {selectedTransaction && (
          <TransactionDetailModal 
            transaction={selectedTransaction} 
            onClose={() => setSelectedTransaction(null)} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Transaction Detail Modal Component
function TransactionDetailModal({ transaction, onClose }: { transaction: Transaction; onClose: () => void }) {
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
        <div className="p-5 border-b border-border/50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-foreground">Transaction Details</h2>
          <button onClick={onClose} className="p-1 hover:bg-accent rounded-lg">
            <X size={16} className="text-muted-foreground" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="text-center pb-4 border-b border-border/50">
            <div className={`w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center ${
              transaction.status === 'completed' ? 'bg-emerald-100' :
              transaction.status === 'pending' ? 'bg-orange-100' : 'bg-red-100'
            }`}>
              {transaction.status === 'completed' && <DollarSign size={28} className="text-emerald-600" />}
              {transaction.status === 'pending' && <Clock size={28} className="text-orange-600" />}
              {transaction.status === 'failed' && <AlertCircle size={28} className="text-red-600" />}
            </div>
            <p className="text-2xl font-bold text-foreground">₹{transaction.amount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">{transaction.milestoneTitle}</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <span className="text-xs text-muted-foreground">Project</span>
              <span className="text-sm font-medium text-foreground">{transaction.projectName}</span>
            </div>
            <div className="flex justify-between py-2 border-t border-border/50">
              <span className="text-xs text-muted-foreground">Date</span>
              <span className="text-sm font-medium text-foreground">{transaction.date}</span>
            </div>
            <div className="flex justify-between py-2 border-t border-border/50">
              <span className="text-xs text-muted-foreground">Status</span>
              <span className={`text-sm font-medium ${
                transaction.status === 'completed' ? 'text-emerald-600' :
                transaction.status === 'pending' ? 'text-orange-600' : 'text-red-600'
              }`}>
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </span>
            </div>
            <div className="flex justify-between py-2 border-t border-border/50">
              <span className="text-xs text-muted-foreground">Transaction ID</span>
              <span className="text-xs font-mono text-muted-foreground">{transaction.id}</span>
            </div>
          </div>

          {transaction.status === 'pending' && (
            <button className="w-full mt-4 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors">
              Mark as Paid
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}