'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, Badge, Button } from '@/components/ui';
import {
  mockProjects,
  mockTasks,
  mockLeads,
  mockNotifications,
  mockBookings,
  mockInvoices,
  mockUsers,
  mockMilestones,
} from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import Link from 'next/link';
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  CheckSquare, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  Target,
  RefreshCw,
  Bell,
  Calendar,
  ChevronRight,
  Activity,
  Cpu,
  ShieldCheck,
  Zap,
  HardDrive
} from 'lucide-react';

interface DashboardData {
  totalRevenue: number;
  activeLeads: number;
  activeProjects: number;
  tasksInProgress: number;
  pendingInvoices: number;
  completedProjects: number;
  teamMembers: number;
  upcomingMilestones: number;
  budgetUtilization: number;
  avgProjectProgress: number;
}

export default function ERPDashboard() {
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month'>('today');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    setLastUpdated(new Date());
  }, []);

  const dashboardData = useMemo<DashboardData>(() => {
    const paidInvoices = mockInvoices.filter(inv => inv.status === 'paid');
    const totalRevenue = paidInvoices.reduce((sum, inv) => sum + (inv.total || inv.totalAmount || 0), 0);
    const activeLeads = mockLeads.filter(lead => lead.status !== 'lost' && lead.status !== 'won').length;
    const activeProjects = mockProjects.filter(p => p.status === 'in_progress').length;
    const completedProjects = mockProjects.filter(p => p.status === 'completed').length;
    const tasksInProgress = mockTasks.filter(t => t.status === 'in_progress').length;
    const pendingInvoices = mockInvoices.filter(inv => inv.status !== 'paid').length;
    const teamMembers = mockUsers.filter(u => u.role?.name !== 'admin').length;
    const upcomingMilestones = mockMilestones.filter(m => m.status === 'pending').length;
    const totalBudget = mockProjects.reduce((sum, p) => sum + (p.budget || 0), 0);
    const totalActualCost = mockProjects.reduce((sum, p) => sum + (p.actualCost || 0), 0);
    const budgetUtilization = totalBudget > 0 ? (totalActualCost / totalBudget) * 100 : 0;
    const avgProjectProgress = mockProjects.length > 0
      ? Math.round(mockProjects.reduce((sum, p) => sum + (p.progressPercentage || 0), 0) / mockProjects.length)
      : 0;

    return {
      totalRevenue,
      activeLeads,
      activeProjects,
      tasksInProgress,
      pendingInvoices,
      completedProjects,
      teamMembers,
      upcomingMilestones,
      budgetUtilization: Math.round(budgetUtilization * 10) / 10,
      avgProjectProgress,
    };
  }, []);

  const getFilteredData = (days: number) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return {
      recentLeads: mockLeads
        .filter(l => new Date(l.createdAt) >= cutoffDate)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5),
      urgentTasks: mockTasks
        .filter(t => t.status !== 'done' && t.dueDate && new Date(t.dueDate) >= cutoffDate)
        .sort((a, b) => (a.dueDate ? new Date(a.dueDate).getTime() : 0) - (b.dueDate ? new Date(b.dueDate).getTime() : 0))
        .slice(0, 5),
      recentNotifications: mockNotifications
        .filter(n => new Date(n.createdAt) >= cutoffDate)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 6),
    };
  };

  const filteredData = useMemo(() => {
    switch (dateRange) {
      case 'week': return getFilteredData(7);
      case 'month': return getFilteredData(30);
      default: return getFilteredData(1);
    }
  }, [dateRange]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-700">
      {/* HUD Header */}
      <div className="relative group overflow-hidden bg-slate-900/40 backdrop-blur-3xl border border-blue-500/20 rounded-2xl p-6 shadow-2xl shadow-blue-500/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900/200/5 blur-3xl -mr-32 -mt-32 rounded-full" />
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500 animate-pulse" />
              <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase">ERP CENTRAL COMMAND</h1>
            </div>
            <p className="text-blue-400 font-mono text-xs tracking-[0.2em] flex items-center gap-2">
              <Zap className="w-3 h-3 fill-blue-500" /> SYSTEM STATUS: OPTIMIZED
            </p>
            <div className="flex items-center gap-4 pt-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
                Synchronized: {lastUpdated?.toLocaleTimeString()}
              </span>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`w-1 h-3 rounded-full ${i <= 4 ? 'bg-blue-900/200/50' : 'bg-slate-700'}`} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-950/80 border border-blue-500/30 rounded-lg p-1 flex items-center shadow-lg shadow-blue-500/5">
              {(['today', 'week', 'month'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setDateRange(r)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase transition-all duration-300 ${
                    dateRange === r 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                      : 'text-slate-400 hover:text-blue-400'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <Button
              onClick={handleRefresh}
              className="bg-slate-950 border border-blue-500/30 text-blue-400 hover:bg-blue-600 hover:text-white transition-all shadow-xl group rounded-lg"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'}`} />
              RE-SYNC
            </Button>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Net Revenue', value: formatCurrency(dashboardData.totalRevenue), icon: DollarSign, trend: '+12.5%', color: 'blue' },
          { label: 'Active Pipeline', value: dashboardData.activeLeads, icon: Target, trend: '+4', color: 'cyan' },
          { label: 'Operative Projects', value: dashboardData.activeProjects, icon: Briefcase, trend: '89%', color: 'indigo' },
          { label: 'Pending Tasks', value: dashboardData.tasksInProgress, icon: CheckSquare, trend: '-2', color: 'emerald' },
        ].map((stat, idx) => (
          <div key={idx} className="group relative overflow-hidden bg-slate-900/60 backdrop-blur-xl border border-blue-500/10 hover:border-blue-500/40 rounded-xl p-5 transition-all duration-500">
            <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity text-${stat.color}-500`}>
              <stat.icon size={48} />
            </div>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-black italic tracking-tighter text-white">{stat.value}</h3>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded bg-${stat.color}-500/10 text-${stat.color}-400 border border-${stat.color}-500/20`}>
                {stat.trend}
              </span>
            </div>
            <div className="mt-3 w-full bg-slate-800 h-px relative overflow-hidden">
               <div className="absolute top-0 left-0 h-full bg-blue-900/200 w-1/3 animate-ping opacity-20" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts & Logs */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-slate-900/40 border-blue-500/10 p-5 backdrop-blur-3xl rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-b from-blue-500/5 to-transparent pointer-events-none" />
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h3 className="text-sm font-black italic tracking-tighter text-white uppercase flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-500" /> System Logs
              </h3>
              <Badge className="bg-blue-900/200/10 text-blue-400 border-none text-[10px] font-mono">REAL-TIME</Badge>
            </div>
            <div className="space-y-4 relative z-10">
              {filteredData.recentNotifications.map((n, i) => (
                <div key={i} className="flex gap-3 group cursor-pointer hover:bg-blue-900/200/5 p-2 -m-2 rounded-lg transition-colors border-l-2 border-transparent hover:border-blue-500/30">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-900/200 mt-1.5 shadow-lg shadow-blue-500/50" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-300 font-medium line-clamp-1 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{n.title}</p>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">{formatDate(n.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-slate-950/50 border-blue-500/10 p-5 overflow-hidden relative group rounded-2xl">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-blue-500/50 to-transparent animate-pulse" />
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black italic tracking-tighter text-white uppercase flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Resource Health
              </h3>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Core CPU', val: 78, color: 'blue' },
                { label: 'Mem Cache', val: 42, color: 'emerald' },
                { label: 'DB Latency', val: 12, color: 'cyan' },
              ].map((r, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono uppercase tracking-tighter">
                    <span className="text-slate-500">{r.label}</span>
                    <span className={`text-${r.color}-400`}>{r.val}%</span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full bg-${r.color}-500 transition-all duration-1000 ease-out`} style={{ width: `${r.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Tactical Overview */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-900/40 border-blue-500/10 p-6 backdrop-blur-3xl rounded-2xl relative">
             <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
               <Cpu size={120} className="text-blue-500" />
             </div>
             <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-black italic tracking-tighter text-white uppercase">Critical Operations</h3>
                <p className="text-[10px] text-slate-500 font-mono mt-1 uppercase tracking-widest">High Priority Execution Queue</p>
              </div>
              <Link href="/erp/projects" className="text-[10px] font-mono text-blue-500 hover:text-blue-400 uppercase tracking-widest flex items-center gap-1 group">
                Full Manifest <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="space-y-3 relative z-10">
              {filteredData.urgentTasks.map((task, i) => (
                <div key={i} className="bg-slate-950/40 border border-blue-500/10 hover:border-blue-500/30 p-4 rounded-xl flex items-center justify-between group transition-all backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-lg bg-blue-900/200/10 border border-blue-500/20 shadow-inner group-hover:scale-105 transition-transform group-hover:bg-blue-900/200/20">
                      <Zap className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-200 font-bold tracking-tight uppercase group-hover:text-white transition-colors">{task.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[9px] font-mono bg-blue-900/200/10 text-blue-400 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                          {task.priority} Priority
                        </span>
                        <span className="text-[9px] font-mono text-slate-600 uppercase">
                          ID: OP-{Math.floor(Math.random() * 9999)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-slate-500 mb-1">{formatDate(task.dueDate || new Date())}</div>
                    <Badge className={`border-none text-[8px] font-black rounded ${
                      task.status === 'in_progress' ? 'bg-blue-600/20 text-blue-400' : 'bg-slate-800 text-slate-500'
                    }`}>
                      {task.status?.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Card className="bg-linear-to-br from-blue-600/10 to-transparent border-blue-500/20 p-6 flex flex-col items-center text-center group hover:bg-blue-600/20 transition-all cursor-pointer rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/200/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-14 h-14 rounded-2xl bg-blue-900/200/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xl shadow-blue-500/20 relative z-10">
                  <BarChart3 className="w-7 h-7 text-blue-400" />
                </div>
                <h4 className="text-white font-black italic uppercase text-lg tracking-tighter relative z-10">FINANCIAL ANALYTICS</h4>
                <p className="text-slate-500 text-[10px] mt-1 font-mono uppercase tracking-tighter relative z-10">Inspect revenue streams and overhead</p>
             </Card>

             <Card className="bg-linear-to-br from-emerald-600/10 to-transparent border-emerald-500/20 p-6 flex flex-col items-center text-center group hover:bg-emerald-600/20 transition-all cursor-pointer rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xl shadow-emerald-500/20 relative z-10">
                  <Users className="w-7 h-7 text-emerald-400" />
                </div>
                <h4 className="text-white font-black italic uppercase text-lg tracking-tighter relative z-10">OPERATIONS HUB</h4>
                <p className="text-slate-500 text-[10px] mt-1 font-mono uppercase tracking-tighter relative z-10">Manage active deployments and team</p>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
