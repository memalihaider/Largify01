'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, StatCard, Badge, Button } from '@/components/ui';
import {
  mockProjects,
  mockTasks,
  mockLeads,
  mockNotifications,
  mockBookings,
  mockInvoices,
  mockProjectPayments,
  mockUsers,
  mockMilestones,
} from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import Link from 'next/link';

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

  // Set initial timestamp on client only to avoid hydration mismatch
  useEffect(() => {
    setLastUpdated(new Date());
  }, []);

  // Calculate real-time dashboard metrics
  const dashboardData = useMemo<DashboardData>(() => {
    // Revenue calculation
    const paidInvoices = mockInvoices.filter(inv => inv.status === 'paid');
    const totalRevenue = paidInvoices.reduce((sum, inv) => sum + (inv.total || inv.totalAmount || 0), 0);

    // Leads
    const activeLeads = mockLeads.filter(lead => 
      lead.status !== 'lost' && lead.status !== 'won'
    ).length;

    // Projects
    const activeProjects = mockProjects.filter(p => p.status === 'in_progress').length;
    const completedProjects = mockProjects.filter(p => p.status === 'completed').length;

    // Tasks
    const tasksInProgress = mockTasks.filter(t => t.status === 'in_progress').length;

    // Invoices
    const pendingInvoices = mockInvoices.filter(inv => inv.status !== 'paid').length;

    // Team
    const teamMembers = mockUsers.filter(u => u.role?.name !== 'admin').length;

    // Milestones
    const upcomingMilestones = mockMilestones.filter(m => m.status === 'pending').length;

    // Budget utilization
    const totalBudget = mockProjects.reduce((sum, p) => sum + (p.budget || 0), 0);
    const totalActualCost = mockProjects.reduce((sum, p) => sum + (p.actualCost || 0), 0);
    const budgetUtilization = totalBudget > 0 ? (totalActualCost / totalBudget) * 100 : 0;

    // Average project progress
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

  // Get filtered data based on date range
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
        .sort((a, b) => {
          const aDate = a.dueDate ? new Date(a.dueDate).getTime() : 0;
          const bDate = b.dueDate ? new Date(b.dueDate).getTime() : 0;
          return aDate - bDate;
        })
        .slice(0, 5),
      recentNotifications: mockNotifications
        .filter(n => new Date(n.createdAt) >= cutoffDate)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 6),
      upcomingBookings: mockBookings
        .filter(b => b.status === 'confirmed' && new Date(b.scheduledDate) >= cutoffDate)
        .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
        .slice(0, 4),
    };
  };

  const filteredData = useMemo(() => {
    switch (dateRange) {
      case 'week':
        return getFilteredData(7);
      case 'month':
        return getFilteredData(30);
      default:
        return getFilteredData(1); // today
    }
  }, [dateRange]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  // Get priority count color
  const getPriorityTrend = () => {
    const highPriority = mockTasks.filter(t => t.priority === 'high' && t.status !== 'done').length;
    return highPriority > 3 ? -10 : highPriority > 0 ? -5 : 5;
  };

  // Get project health indicator
  const getProjectHealthTrend = () => {
    const onTimeProjects = mockProjects.filter(p => {
      if (p.status !== 'in_progress') return false;
      if (!p.targetEndDate) return true;
      return new Date() <= p.targetEndDate;
    }).length;
    const onTimePercentage = mockProjects.length > 0 ? (onTimeProjects / mockProjects.length) * 100 : 0;
    return Math.round(onTimePercentage);
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Header with Real-time Status */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ERP Dashboard</h1>
          <p className="text-gray-600 mt-1">Real-time overview of your business operations</p>
          <p className="text-xs text-gray-500 mt-2">
            Last updated: {lastUpdated ? lastUpdated.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit', 
              second: '2-digit' 
            }) : '--:--:--'}
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as typeof dateRange)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="today">📅 Today</option>
            <option value="week">📊 This Week</option>
            <option value="month">📈 This Month</option>
          </select>
          <Button
            onClick={handleRefresh}
            variant="outline"
            className={`transition-transform ${isRefreshing ? 'animate-spin' : ''}`}
            title="Refresh dashboard data"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="p-4 bg-linear-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-gray-700">Quick Actions:</span>
          <Link href="/erp/crm/leads">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">➕ New Lead</Button>
          </Link>
          <Link href="/erp/projects">
            <Button size="sm" variant="outline">📋 New Project</Button>
          </Link>
          <Link href="/erp/projects/tasks">
            <Button size="sm" variant="outline">✓ New Task</Button>
          </Link>
          <Link href="/erp/finance/invoices">
            <Button size="sm" variant="outline">💰 New Invoice</Button>
          </Link>
          <Link href="/erp/crm/companies">
            <Button size="sm" variant="outline">🏢 Manage Companies</Button>
          </Link>
        </div>
      </Card>

      {/* KPI Stats Grid - Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/erp/finance">
          <StatCard
            title="💰 Total Revenue"
            value={formatCurrency(dashboardData.totalRevenue)}
            trend={12}
            subtitle={`${mockInvoices.filter(i => i.status === 'paid').length} paid invoices`}
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            iconColor="bg-green-100 text-green-600"
          />
        </Link>

        <Link href="/erp/crm/leads">
          <StatCard
            title="👥 Active Leads"
            value={dashboardData.activeLeads.toString()}
            trend={8}
            subtitle={`${mockLeads.filter(l => l.status === 'qualified').length} qualified`}
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            iconColor="bg-blue-100 text-blue-600"
          />
        </Link>

        <Link href="/erp/projects">
          <StatCard
            title="📊 Project Status"
            value={`${dashboardData.activeProjects}/${mockProjects.length}`}
            subtitle={`${dashboardData.avgProjectProgress}% avg progress`}
            trend={getProjectHealthTrend()}
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
            iconColor="bg-purple-100 text-purple-600"
          />
        </Link>

        <Link href="/erp/projects/tasks">
          <StatCard
            title="✓ Tasks Progress"
            value={dashboardData.tasksInProgress.toString()}
            trend={getPriorityTrend()}
            subtitle={`In ${dateRange}`}
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            }
            iconColor="bg-orange-100 text-orange-600"
          />
        </Link>

        <Link href="/erp/finance/invoices">
          <StatCard
            title="📄 Pending Invoices"
            value={dashboardData.pendingInvoices.toString()}
            subtitle={`Total: ${formatCurrency(
              mockInvoices
                .filter(i => i.status !== 'paid')
                .reduce((sum, i) => sum + (i.total || i.totalAmount || 0), 0)
            )}`}
            trend={-3}
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
            iconColor="bg-red-100 text-red-600"
          />
        </Link>

        <Link href="/erp/projects">
          <StatCard
            title="✅ Completed"
            value={dashboardData.completedProjects.toString()}
            subtitle="Projects completed"
            trend={5}
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            iconColor="bg-emerald-100 text-emerald-600"
          />
        </Link>

        <Link href="/erp/team">
          <StatCard
            title="👨‍💼 Team Members"
            value={dashboardData.teamMembers.toString()}
            subtitle="Active employees"
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 8.048M12 9v.75m0 6.248l.75.75M3.75 3.75h16.5M2.25 9h19.5m-16.338 5.662a9 9 0 1118.338 0A.75.75 0 0021 18a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75c0-.268.068-.532.201-.75z" />
              </svg>
            }
            iconColor="bg-indigo-100 text-indigo-600"
          />
        </Link>

        <Card className="p-4 flex flex-col justify-center">
          <div className="text-sm text-gray-600 mb-2">📈 Budget Health</div>
          <div className="text-2xl font-bold text-gray-900">{dashboardData.budgetUtilization.toFixed(1)}%</div>
          <div className="text-xs text-gray-500 mt-2">of total budget allocated</div>
          <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                dashboardData.budgetUtilization > 80 ? 'bg-red-500' :
                dashboardData.budgetUtilization > 60 ? 'bg-yellow-500' :
                'bg-green-500'
              }`}
              style={{ width: `${Math.min(dashboardData.budgetUtilization, 100)}%` }}
            />
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Leads */}
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">👥 Recent Leads</h3>
                <Link href="/erp/crm/leads" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all →
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredData.recentLeads.length > 0 ? (
                filteredData.recentLeads.map(lead => (
                  <Link key={lead.id} href={`/erp/crm/leads/${lead.id}`}>
                    <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{lead.company?.name || lead.contact?.fullName || 'Unknown'}</p>
                          <p className="text-sm text-gray-600 mt-1">{lead.serviceInterest}</p>
                        </div>
                        <div className="flex items-center gap-3 ml-4">
                          <Badge className={`text-xs py-1 px-2 ${
                            lead.status === 'qualified' ? 'bg-green-100 text-green-700' :
                            lead.status === 'proposal_sent' ? 'bg-blue-100 text-blue-700' :
                            lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {lead.status.replace('_', ' ')}
                          </Badge>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900">{lead.score}/100</p>
                            <p className="text-xs text-gray-500">Score</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No leads found in this period
                </div>
              )}
            </div>
          </Card>

          {/* Upcoming Tasks */}
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">✓ Upcoming Tasks</h3>
                <Link href="/erp/projects/tasks" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all →
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredData.urgentTasks.length > 0 ? (
                filteredData.urgentTasks.map(task => (
                  <Link key={task.id} href={`/erp/projects/tasks/${task.id}`}>
                    <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{task.title}</p>
                          <p className="text-sm text-gray-600 mt-1">Project: {task.project?.name || 'N/A'}</p>
                          {task.dueDate && (
                            <p className="text-xs text-gray-500 mt-1">
                              Due: {formatDate(task.dueDate)}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-2 ml-4">
                          <Badge className={`text-xs py-1 px-2 ${
                            task.priority === 'high' ? 'bg-red-100 text-red-700' :
                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No tasks in this period
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Upcoming Bookings */}
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">📅 Bookings</h3>
                <Link href="/erp/bookings" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  All →
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredData.upcomingBookings.length > 0 ? (
                filteredData.upcomingBookings.map(booking => (
                  <Link key={booking.id} href={`/erp/bookings/${booking.id}`}>
                    <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                          <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{booking.guestName}</p>
                          <p className="text-sm text-gray-600 truncate">{booking.service?.name}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(booking.scheduledDate)} at {booking.scheduledTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500 text-sm">
                  No upcoming bookings
                </div>
              )}
            </div>
          </Card>

          {/* Notifications */}
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">🔔 Notifications</h3>
            </div>
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {filteredData.recentNotifications.length > 0 ? (
                filteredData.recentNotifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`p-4 transition-colors cursor-pointer hover:bg-gray-50 ${
                      notification.isRead ? 'bg-white' : 'bg-blue-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${
                        notification.isRead ? 'bg-gray-300' : 'bg-blue-600'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium text-gray-900 ${notification.isRead ? 'font-normal' : 'font-semibold'}`}>
                          {notification.title}
                        </p>
                        {notification.message && (
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(notification.createdAt).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500 text-sm">
                  No notifications
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-200">
              <Link href="/erp/notifications" className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium text-center block">
                View all notifications
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
