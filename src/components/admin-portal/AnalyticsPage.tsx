import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, TrendingDown, Calendar, Clock, 
  CheckCircle, AlertCircle, Activity, DollarSign,
  Users, FolderGit2, Award, BarChart3, PieChart as PieChartIcon,
  LineChart as LineChartIcon
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar,
  Legend, LineChart, Line, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ComposedChart
} from "recharts";
import { AdminStatsCard } from "./AdminStatsCard";
import { Project } from "../client-portal/_helper/types";
import { AdminCard } from "./_helper/AdminCard";

interface AnalyticsPageProps {
  projects: Project[];
}

const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4', '#EC4899', '#14B8A6'];

export function AnalyticsPage({ projects }: AnalyticsPageProps) {
  const [timeRange, setTimeRange] = useState<"monthly" | "quarterly" | "yearly">("monthly");

  // Calculate metrics
  const totalBudget = projects.reduce((sum, p) => {
    const budget = parseFloat(p.budget.replace(/[₹,]/g, '')) || 0;
    return sum + budget;
  }, 0);

  const totalSpent = projects.reduce((sum, p) => {
    const spent = parseFloat(p.spent.replace(/[₹,]/g, '')) || 0;
    return sum + spent;
  }, 0);

  const averageProgress = projects.reduce((sum, p) => sum + p.progress, 0) / projects.length;
  
  const completedProjects = projects.filter(p => p.status === "completed").length;
  const completionRate = (completedProjects / projects.length) * 100;

  // Project type distribution for pie chart
  const projectTypeData = projects.reduce((acc, p) => {
    const existing = acc.find(item => item.name === p.type);
    if (existing) {
      existing.value++;
    } else {
      acc.push({ name: p.type, value: 1, color: p.color });
    }
    return acc;
  }, [] as { name: string; value: number; color: string }[]);

  // Status distribution for pie chart
  const statusData = projects.reduce((acc, p) => {
    const existing = acc.find(item => item.name === p.status);
    if (existing) {
      existing.value++;
    } else {
      let color = '#64748b';
      if (p.status === 'completed') color = '#10B981';
      else if (p.status === 'in-progress') color = '#3B82F6';
      else if (p.status === 'review') color = '#F59E0B';
      else if (p.status === 'planning') color = '#8B5CF6';
      else if (p.status === 'on-hold') color = '#EF4444';
      
      acc.push({ 
        name: p.status === 'in-progress' ? 'In Progress' : 
              p.status === 'review' ? 'In Review' :
              p.status === 'planning' ? 'Planning' :
              p.status === 'completed' ? 'Completed' : 'On Hold', 
        value: 1, 
        color 
      });
    }
    return acc;
  }, [] as { name: string; value: number; color: string }[]);

  // Monthly performance data for line/area chart
  const monthlyPerformanceData = React.useMemo(() => {
    const monthlyMap = new Map<string, { month: string; projects: number; revenue: number; progress: number }>();
    
    projects.forEach(p => {
      const month = p.startDate.slice(0, 7);
      if (!monthlyMap.has(month)) {
        monthlyMap.set(month, { month, projects: 0, revenue: 0, progress: 0 });
      }
      const data = monthlyMap.get(month)!;
      data.projects++;
      data.revenue += parseFloat(p.budget.replace(/[₹,]/g, '')) || 0;
      data.progress += p.progress;
    });
    
    return Array.from(monthlyMap.values())
      .sort((a, b) => a.month.localeCompare(b.month))
      .map(d => ({
        ...d,
        avgProgress: Math.round(d.progress / d.projects)
      }));
  }, [projects]);

  // Radar chart data - Project health metrics
  const radarData = [
    { metric: 'On-Time Delivery', value: Math.min(100, Math.round((completedProjects / projects.length) * 100)), fullMark: 100 },
    { metric: 'Budget Efficiency', value: Math.min(100, Math.round((totalSpent / totalBudget) * 100)), fullMark: 100 },
    { metric: 'Client Satisfaction', value: 85, fullMark: 100 },
    { metric: 'Resource Utilization', value: 78, fullMark: 100 },
    { metric: 'Quality Score', value: 92, fullMark: 100 },
    { metric: 'Team Velocity', value: 88, fullMark: 100 },
  ];

  // Budget vs Actual bar chart data
  const budgetVsActualData = projects.map(p => ({
    name: p.name.length > 15 ? p.name.slice(0, 12) + '...' : p.name,
    budget: parseFloat(p.budget.replace(/[₹,]/g, '')) / 1000,
    actual: parseFloat(p.spent.replace(/[₹,]/g, '')) / 1000,
    color: p.color
  })).slice(0, 8);

  // Progress distribution data for bar chart
  const progressDistribution = [
    { range: '0-20%', count: projects.filter(p => p.progress >= 0 && p.progress < 20).length, color: '#EF4444' },
    { range: '21-40%', count: projects.filter(p => p.progress >= 20 && p.progress < 40).length, color: '#F59E0B' },
    { range: '41-60%', count: projects.filter(p => p.progress >= 40 && p.progress < 60).length, color: '#8B5CF6' },
    { range: '61-80%', count: projects.filter(p => p.progress >= 60 && p.progress < 80).length, color: '#3B82F6' },
    { range: '81-100%', count: projects.filter(p => p.progress >= 80).length, color: '#10B981' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 size={18} className="text-primary" />
          <h2 className="text-lg font-black text-foreground">Analytics Dashboard</h2>
        </div>
        <div className="flex gap-2">
          {(["monthly", "quarterly", "yearly"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-mono transition-colors ${
                timeRange === range
                  ? "bg-primary text-white"
                  : "bg-accent text-muted-foreground hover:bg-accent/80"
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatsCard title="Completion Rate" value={`${Math.round(completionRate)}%`} icon={CheckCircle} color="#10B981" />
        <AdminStatsCard title="Avg. Progress" value={`${Math.round(averageProgress)}%`} icon={Activity} color="#3B82F6" />
        <AdminStatsCard title="Total Projects" value={projects.length} icon={FolderGit2} color="#8B5CF6" />
        <AdminStatsCard title="Budget Utilization" value={`${Math.round((totalSpent / totalBudget) * 100)}%`} icon={DollarSign} color="#F59E0B" />
      </div>

      {/* Performance Trends - Area Chart */}
      <AdminCard>
        <div className="flex items-center gap-2 mb-4">
          <LineChartIcon size={14} className="text-primary" />
          <span className="text-xs font-bold text-foreground">Performance Trends</span>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={monthlyPerformanceData}>
            <defs>
              <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
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
            <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#64748b' }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: '#64748b' }} tickFormatter={(value) => `₹${value/1000}K`} />
            <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
            <Legend />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="avgProgress" 
              stroke="#3B82F6" 
              strokeWidth={2}
              fill="url(#progressGradient)" 
              name="Avg Progress (%)"
            />
            <Area 
              yAxisId="right"
              type="monotone" 
              dataKey="revenue" 
              stroke="#10B981" 
              strokeWidth={2}
              fill="url(#revenueGradient)" 
              name="Revenue (₹)"
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="projects" 
              stroke="#8B5CF6" 
              strokeWidth={2}
              name="Projects Started"
              dot={{ fill: '#8B5CF6', r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </AdminCard>

      {/* Charts Grid - Pie Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Project Type Distribution */}
        <AdminCard>
          <div className="flex items-center gap-2 mb-4">
            <PieChartIcon size={14} className="text-primary" />
            <span className="text-xs font-bold text-foreground">Project Type Distribution</span>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={projectTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
              >
                {projectTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} projects`, 'Count']}
                contentStyle={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </AdminCard>

        {/* Project Status Distribution */}
        <AdminCard>
          <div className="flex items-center gap-2 mb-4">
            <Activity size={14} className="text-primary" />
            <span className="text-xs font-bold text-foreground">Project Status Distribution</span>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} projects`, 'Count']}
                contentStyle={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </AdminCard>
      </div>

      {/* Progress Distribution Bar Chart */}
      <AdminCard>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={14} className="text-primary" />
          <span className="text-xs font-bold text-foreground">Project Progress Distribution</span>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={progressDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="range" tick={{ fontSize: 12, fill: '#64748b' }} />
            <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
            <Tooltip 
              formatter={(value: number) => [`${value} projects`, 'Count']}
              contentStyle={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]} name="Projects">
              {progressDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </AdminCard>

      {/* Budget vs Actual - Horizontal Bar Chart */}
      <div className="grid lg:grid-cols-2 gap-6">
        <AdminCard>
          <div className="flex items-center gap-2 mb-4">
            <DollarSign size={14} className="text-primary" />
            <span className="text-xs font-bold text-foreground">Budget vs Actual (Top Projects)</span>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={budgetVsActualData} layout="vertical" margin={{ left: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" tickFormatter={(value) => `₹${value}K`} tick={{ fontSize: 10, fill: '#64748b' }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} width={80} />
              <Tooltip 
                formatter={(value: number) => [`₹${value}K`, '']}
                contentStyle={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}
              />
              <Legend />
              <Bar dataKey="budget" fill="#94A3B8" name="Budget" radius={[0, 4, 4, 0]} />
              <Bar dataKey="actual" fill="#3B82F6" name="Actual" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </AdminCard>

        {/* Radar Chart - Project Health Metrics */}
        <AdminCard>
          <div className="flex items-center gap-2 mb-4">
            <Award size={14} className="text-primary" />
            <span className="text-xs font-bold text-foreground">Project Health Metrics</span>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: '#64748b' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748b' }} />
              <Radar name="Performance" dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Score']}
                contentStyle={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </AdminCard>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={14} className="text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700">Success Rate</span>
          </div>
          <p className="text-2xl font-black text-emerald-700">{Math.round(completionRate)}%</p>
          <p className="text-[10px] text-emerald-600 mt-1">of projects completed successfully</p>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={14} className="text-blue-600" />
            <span className="text-xs font-bold text-blue-700">Avg. Project Value</span>
          </div>
          <p className="text-2xl font-black text-blue-700">₹{Math.round((totalBudget / projects.length) / 1000)}K</p>
          <p className="text-[10px] text-blue-600 mt-1">average budget per project</p>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Users size={14} className="text-purple-600" />
            <span className="text-xs font-bold text-purple-700">Resource Efficiency</span>
          </div>
          <p className="text-2xl font-black text-purple-700">85%</p>
          <p className="text-[10px] text-purple-600 mt-1">resource utilization rate</p>
        </div>
      </div>
    </motion.div>
  );
}