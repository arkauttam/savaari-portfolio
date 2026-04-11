import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, CalendarDays, Users, GitBranch,
  CheckCircle2, Clock, AlertCircle, DollarSign,
  Activity, FileText, Award, Wallet, TrendingUp,
  FolderGit2, Edit, Trash2, BarChart3, LineChart,
  TrendingDown
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart as ReLineChart, Line,
  BarChart, Bar, PieChart, Pie, Cell,
  Legend
} from "recharts";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";
import { Project } from "../client-portal/_helper/types";
import { SEED, STATUS_CFG, PRIORITY_CFG, REQ_STATUS_CFG, UPD_TYPE_CFG } from "../client-portal/_helper/constants";
import { AdminCard } from "./_helper/AdminCard";

interface ProjectDetailsPageProps {
  onMenu?: () => void;
}

export function ProjectDetailsPage({ onMenu }: ProjectDetailsPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'requirements' | 'milestones' | 'updates' | 'analytics'>('overview');

  useEffect(() => {
    const foundProject = SEED.find(p => p.id === id);
    if (foundProject) {
      setProject(foundProject);
    }
    setLoading(false);
  }, [id]);

  const handleBack = () => {
    navigate('/admin-portal?tab=projects');
  };

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    navigate('/auth-page');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen bg-background items-center justify-center">
        <div className="text-center">
          <FolderGit2 size={48} className="mx-auto mb-4 text-muted-foreground/30" />
          <h2 className="text-xl font-bold text-foreground mb-2">Project Not Found</h2>
          <p className="text-sm text-muted-foreground mb-4">The project you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const sc = STATUS_CFG[project.status];
  const totalPaid = project.milestones?.filter(m => m.status === "paid").reduce((sum, m) => sum + m.amount, 0) || 0;
  const totalBudget = project.milestones?.reduce((sum, m) => sum + m.amount, 0) || 0;
  const paymentProgress = totalBudget > 0 ? (totalPaid / totalBudget) * 100 : 0;

  // Prepare chart data from milestones
  const milestoneChartData = project.milestones?.map((m, idx) => ({
    name: m.title.length > 15 ? m.title.slice(0, 12) + '...' : m.title,
    amount: m.amount / 1000,
    status: m.status,
    index: idx + 1
  })) || [];

  // Prepare progress over time data
  const progressData = [
    { month: 'Oct', progress: 0 },
    { month: 'Nov', progress: 25 },
    { month: 'Dec', progress: 45 },
    { month: 'Jan', progress: project.progress },
    { month: 'Feb', progress: Math.min(100, project.progress + 15) },
    { month: 'Mar', progress: Math.min(100, project.progress + 25) },
  ];

  // Payment distribution for pie chart
  const paymentDistribution = [
    { name: 'Paid', value: totalPaid, color: '#10B981' },
    { name: 'Pending', value: totalBudget - totalPaid, color: '#F59E0B' },
  ].filter(d => d.value > 0);

  // Weekly activity data
  const weeklyActivity = [
    { day: 'Mon', commits: 12, meetings: 2, tasks: 5 },
    { day: 'Tue', commits: 18, meetings: 3, tasks: 7 },
    { day: 'Wed', commits: 15, meetings: 2, tasks: 6 },
    { day: 'Thu', commits: 22, meetings: 4, tasks: 8 },
    { day: 'Fri', commits: 20, meetings: 3, tasks: 7 },
    { day: 'Sat', commits: 8, meetings: 1, tasks: 3 },
    { day: 'Sun', commits: 5, meetings: 0, tasks: 2 },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
   

      <AdminSidebar
        activeTab="projects"
        setActiveTab={(tab) => navigate(`/admin-portal?tab=${tab}`)}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
        onLogout={handleLogout}
      />

      <div className="flex-1 lg:ml-[260px] flex flex-col min-w-0 min-h-screen">
        <AdminTopbar
          title={project.name}
          sub={`${project.type} • ${sc.label}`}
          onMenu={() => setMobileMenuOpen(true)}
        />

        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            <ArrowLeft size={14} />
            Back to Projects
          </button>

          {/* Project Header Card */}
          <AdminCard>
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${project.color}08`, border: `1px solid ${project.color}15` }}
                    >
                      <FolderGit2 size={20} style={{ color: project.color }} />
                    </div>
                    <div>
                      <h1 className="text-2xl font-black text-foreground">{project.name}</h1>
                      <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-accent rounded-xl transition-colors">
                    <Edit size={16} className="text-muted-foreground" />
                  </button>
                  <button className="p-2 hover:bg-red-50 rounded-xl transition-colors">
                    <Trash2 size={16} className="text-muted-foreground hover:text-red-600" />
                  </button>
                  <span className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: sc.bg, color: sc.color }}>
                    {sc.label}
                  </span>
                </div>
              </div>

              {/* Project Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                <div>
                  <p className="text-[9px] font-mono text-muted-foreground mb-1">Budget</p>
                  <p className="text-xl font-bold text-foreground">{project.budget}</p>
                </div>
                <div>
                  <p className="text-[9px] font-mono text-muted-foreground mb-1">Spent</p>
                  <p className="text-xl font-bold text-foreground">{project.spent}</p>
                </div>
                <div>
                  <p className="text-[9px] font-mono text-muted-foreground mb-1">Progress</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full overflow-hidden bg-border/50">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1 }}
                        style={{ background: project.color }}
                      />
                    </div>
                    <span className="text-sm font-bold" style={{ color: project.color }}>{project.progress}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-mono text-muted-foreground mb-1">Deadline</p>
                  <p className="text-sm font-medium text-foreground flex items-center gap-1">
                    <CalendarDays size={12} className="text-muted-foreground" />
                    {project.deadline}
                  </p>
                </div>
              </div>
            </div>
          </AdminCard>

          {/* Charts Section */}
          <div className="space-y-6">
            {/* Progress Trend - Area Chart */}
            <AdminCard>
              <div className="p-5 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-primary" />
                  <span className="text-xs font-bold text-foreground">Progress Trend</span>
                </div>
              </div>
              <div className="p-5">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={progressData}>
                    <defs>
                      <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={project.color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={project.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} />
                    <YAxis tick={{ fontSize: 10, fill: '#64748b' }} unit="%" />
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, 'Progress']}
                      contentStyle={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="progress"
                      stroke={project.color}
                      strokeWidth={2}
                      fill="url(#progressGradient)"
                      name="Progress"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </AdminCard>

            {/* Milestone Amounts - Bar Chart & Payment Distribution - Pie Chart */}
            <div className="grid lg:grid-cols-2 gap-6">
              <AdminCard>
                <div className="p-5 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <BarChart3 size={14} className="text-primary" />
                    <span className="text-xs font-bold text-foreground">Milestone Amounts</span>
                  </div>
                </div>
                <div className="p-5">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={milestoneChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} angle={-25} textAnchor="end" height={60} />
                      <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickFormatter={(value) => `₹${value}K`} />
                      <Tooltip
                        formatter={(value: number) => [`₹${value}K`, 'Amount']}
                        contentStyle={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                      />
                      <Bar dataKey="amount" fill={project.color} radius={[4, 4, 0, 0]} name="Amount">
                        {milestoneChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.status === 'paid' ? '#10B981' : project.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </AdminCard>

              <AdminCard>
                <div className="p-5 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <PieChart className="text-primary" />
                    <span className="text-xs font-bold text-foreground">Payment Distribution</span>
                  </div>
                </div>
                <div className="p-5">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={paymentDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
                      >
                        {paymentDistribution.map((entry, index) => (
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
                </div>
              </AdminCard>
            </div>

            {/* Weekly Activity - Area/Line Chart */}
            <AdminCard>
              <div className="p-5 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <Activity size={14} className="text-primary" />
                  <span className="text-xs font-bold text-foreground">Weekly Activity</span>
                </div>
              </div>
              <div className="p-5">
                <ResponsiveContainer width="100%" height={300}>
                  <ReLineChart data={weeklyActivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748b' }} />
                    <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="commits" stroke="#3B82F6" strokeWidth={2} name="Commits" dot={{ fill: '#3B82F6', r: 4 }} />
                    <Line type="monotone" dataKey="tasks" stroke="#10B981" strokeWidth={2} name="Tasks" dot={{ fill: '#10B981', r: 4 }} />
                    <Line type="monotone" dataKey="meetings" stroke="#8B5CF6" strokeWidth={2} name="Meetings" dot={{ fill: '#8B5CF6', r: 4 }} />
                  </ReLineChart>
                </ResponsiveContainer>
              </div>
            </AdminCard>
          </div>

          {/* Payment Progress Card */}
          {totalBudget > 0 && (
            <AdminCard>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Wallet size={14} className="text-primary" />
                  <span className="text-xs font-bold text-foreground">Payment Progress</span>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Paid: ₹{(totalPaid / 1000).toFixed(0)}K</span>
                    <span className="text-sm text-muted-foreground">Total: ₹{(totalBudget / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="h-3 rounded-full overflow-hidden bg-border/50">
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${paymentProgress}%` }}
                      transition={{ duration: 1 }}
                      style={{ background: "linear-gradient(90deg, #10b981, #059669)" }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] font-mono text-muted-foreground">{Math.round(paymentProgress)}% Complete</span>
                    <span className="text-[10px] font-mono text-muted-foreground">Remaining: ₹{((totalBudget - totalPaid) / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </div>
            </AdminCard>
          )}

          {/* Sub Navigation */}
          <div className="flex gap-1 border-b border-border/50">
            {(['overview', 'requirements', 'milestones', 'updates'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-medium transition-all relative capitalize ${activeTab === tab ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="projectSubTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 38 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Overview Sub Tab */}
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <AdminCard>
                  <div className="flex items-center gap-2 mb-4">
                    <Users size={14} className="text-primary" />
                    <span className="text-xs font-bold text-foreground">Team</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">Project Manager</span>
                      <span className="text-sm font-medium text-foreground">{project.pm}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-muted-foreground">Lead Developer</span>
                      <span className="text-sm font-medium text-foreground">{project.dev}</span>
                    </div>
                  </div>
                </AdminCard>

                <AdminCard>
                  <div className="flex items-center gap-2 mb-4">
                    <GitBranch size={14} className="text-primary" />
                    <span className="text-xs font-bold text-foreground">Tech Stack</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-accent/50 rounded-lg text-[10px] font-mono text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                </AdminCard>
              </div>

              {/* Timeline */}
              <AdminCard>
                <div className="flex items-center gap-2 mb-4">
                  <CalendarDays size={14} className="text-primary" />
                  <span className="text-xs font-bold text-foreground">Project Timeline</span>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-border/50" />
                  <div className="space-y-6">
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <CheckCircle2 size={14} className="text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Project Started</p>
                        <p className="text-xs text-muted-foreground">{project.startDate}</p>
                      </div>
                    </div>
                    {project.milestones?.filter(m => m.status === "paid").map((milestone, idx) => (
                      <div key={idx} className="relative pl-10">
                        <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Award size={14} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{milestone.title}</p>
                          <p className="text-xs text-muted-foreground">Completed: {milestone.paidDate}</p>
                        </div>
                      </div>
                    ))}
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <Clock size={14} className="text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Target Completion</p>
                        <p className="text-xs text-muted-foreground">{project.deadline}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AdminCard>
            </motion.div>
          )}

          {/* Requirements Sub Tab */}
          {activeTab === 'requirements' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <AdminCard>
                <div className="divide-y divide-border/50">
                  {project.requirements.map((req) => {
                    const pc = PRIORITY_CFG[req.priority];
                    const rc = REQ_STATUS_CFG[req.status];
                    const ReqIcon = rc.Icon;

                    return (
                      <div key={req.id} className="p-5 hover:bg-accent/30 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <ReqIcon size={12} style={{ color: rc.color }} />
                              <h4 className="text-sm font-bold text-foreground">{req.title}</h4>
                            </div>
                            <p className="text-xs text-muted-foreground">{req.description}</p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <span className="px-2 py-1 rounded-full text-[9px] font-bold" style={{ background: `${pc.color}10`, color: pc.color }}>
                              {pc.label}
                            </span>
                            <span className="px-2 py-1 rounded-full text-[9px] font-bold" style={{ background: `${rc.color}10`, color: rc.color }}>
                              {rc.label}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-[9px] font-mono text-muted-foreground">Created: {req.createdAt}</span>
                          <span className="text-[9px] font-mono text-muted-foreground">By: {req.createdBy}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AdminCard>
            </motion.div>
          )}

          {/* Milestones Sub Tab */}
          {activeTab === 'milestones' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <AdminCard>
                <div className="divide-y divide-border/50">
                  {project.milestones?.map((milestone) => (
                    <div key={milestone.id} className="p-5 hover:bg-accent/30 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`w-2 h-2 rounded-full ${milestone.status === 'paid' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                            <h4 className="text-sm font-bold text-foreground">{milestone.title}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{milestone.description}</p>
                          <div className="flex items-center gap-3">
                            <span className="text-[9px] font-mono text-muted-foreground">Due: {milestone.dueDate}</span>
                            {milestone.paidDate && (
                              <span className="text-[9px] font-mono text-emerald-600">Paid: {milestone.paidDate}</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-foreground">₹{milestone.amount.toLocaleString()}</p>
                          <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${milestone.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                            }`}>
                            {milestone.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AdminCard>
            </motion.div>
          )}

          {/* Updates Sub Tab */}
          {activeTab === 'updates' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <AdminCard>
                <div className="divide-y divide-border/50">
                  {project.updates.map((update) => {
                    const tc = UPD_TYPE_CFG[update.type];
                    return (
                      <div key={update.id} className="p-5 hover:bg-accent/30 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${tc.color}08`, border: `1px solid ${tc.color}15` }}>
                            <tc.Icon size={13} style={{ color: tc.color }} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm font-bold text-foreground">{update.title}</h4>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full" style={{ background: `${tc.color}10`, color: tc.color }}>
                                {tc.label}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">{update.body}</p>
                            <div className="flex items-center gap-3">
                              <span className="text-[9px] font-mono text-muted-foreground">{update.date}</span>
                              <span className="text-[9px] font-mono text-muted-foreground">By: {update.author}</span>
                            </div>
                          </div>
                          {update.pct && (
                            <div className="text-right">
                              <span className="text-xs font-bold" style={{ color: project.color }}>{update.pct}%</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AdminCard>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}