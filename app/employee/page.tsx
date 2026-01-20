'use client';

import { useState } from 'react';
import { Card, StatCard, Badge, Avatar, Button } from '@/components/ui';
import { 
  mockEmployees, mockUsers, mockProjects, mockTasks, mockTimeEntries, 
  mockLeaveRequests, mockNotifications 
} from '@/lib/mock-data';
import { formatCurrency, formatRelativeTime } from '@/lib/utils';
import Link from 'next/link';

// Current employee (Sarah Chen - emp-002, usr-002)
const currentEmployee = mockEmployees[1];
const currentUser = mockUsers.find(u => u.id === currentEmployee.userId) || mockUsers[1];

// Filter data for current employee
const myTasks = mockTasks.filter(t => t.assignedTo === currentUser.id || t.assignedToId === currentUser.id);
const myTimeEntries = mockTimeEntries.filter(t => t.userId === currentUser.id);
const myLeaveRequests = mockLeaveRequests.filter(l => l.employeeId === currentEmployee.id);

// Calculate stats
const tasksInProgress = myTasks.filter(t => t.status === 'in_progress').length;
const tasksCompleted = myTasks.filter(t => t.status === 'done').length;
const tasksTodo = myTasks.filter(t => t.status === 'todo').length;
const tasksInReview = myTasks.filter(t => t.status === 'review').length;

const totalHoursThisWeek = myTimeEntries
  .filter(t => {
    const entryDate = new Date(t.date);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return entryDate >= weekAgo;
  })
  .reduce((sum, t) => sum + t.hours, 0);

const pendingLeave = myLeaveRequests.filter(l => l.status === 'pending').length;

export default function EmployeeDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const upcomingTasks = myTasks
    .filter(t => t.status !== 'done')
    .sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    })
    .slice(0, 5);

  const recentTimeEntries = myTimeEntries
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {currentUser.firstName}!</h1>
          <p className="text-gray-500">Here&apos;s your work overview for today.</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleRefresh}
            variant="outline"
            className={isRefreshing ? 'animate-spin' : ''}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <Card variant="bordered" className="p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <Link href="/employee/timesheet">
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Log Time
            </Button>
          </Link>
          <Link href="/employee/tasks">
            <Button size="sm" variant="outline">View All Tasks</Button>
          </Link>
          <Link href="/employee/leave">
            <Button size="sm" variant="outline">Request Leave</Button>
          </Link>
          <Link href="/employee/expenses">
            <Button size="sm" variant="outline">Submit Expense</Button>
          </Link>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/employee/tasks">
          <StatCard
            title="Tasks In Progress"
            value={tasksInProgress.toString()}
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            iconColor="bg-blue-100 text-blue-600"
          />
        </Link>
        <Link href="/employee/tasks">
          <StatCard
            title="Tasks Completed"
            value={tasksCompleted.toString()}
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            iconColor="bg-green-100 text-green-600"
          />
        </Link>
        <Link href="/employee/timesheet">
          <StatCard
            title="Hours This Week"
            value={totalHoursThisWeek.toString()}
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            iconColor="bg-purple-100 text-purple-600"
          />
        </Link>
        <Link href="/employee/leave">
          <StatCard
            title="Pending Requests"
            value={pendingLeave.toString()}
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            iconColor="bg-orange-100 text-orange-600"
          />
        </Link>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* My Tasks */}
          <Card variant="bordered">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">My Tasks</h3>
                <Link href="/employee/tasks" className="text-sm text-green-600 hover:text-green-700">
                  View all →
                </Link>
              </div>
              {upcomingTasks.length > 0 ? (
                <div className="space-y-3">
                  {upcomingTasks.map(task => {
                    const project = mockProjects.find(p => p.id === task.projectId);
                    return (
                      <div key={task.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{task.title}</p>
                          <p className="text-sm text-gray-500">{project?.name || 'No Project'}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge status={task.status}>{task.status.replace('_', ' ')}</Badge>
                          {task.dueDate && (
                            <span className="text-xs text-gray-500">
                              Due {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <svg className="h-12 w-12 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <p>No pending tasks</p>
                </div>
              )}
            </div>
          </Card>

          {/* Task Summary */}
          <Card variant="bordered">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Summary</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-500">{tasksTodo}</p>
                  <p className="text-sm text-gray-500">To Do</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{tasksInProgress}</p>
                  <p className="text-sm text-blue-600">In Progress</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">{tasksInReview}</p>
                  <p className="text-sm text-yellow-600">In Review</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{tasksCompleted}</p>
                  <p className="text-sm text-green-600">Completed</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Recent Time Entries */}
          <Card variant="bordered">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Time Logs</h3>
                <Link href="/employee/timesheet" className="text-sm text-green-600 hover:text-green-700">
                  View all →
                </Link>
              </div>
              {recentTimeEntries.length > 0 ? (
                <div className="space-y-3">
                  {recentTimeEntries.map(entry => {
                    const task = mockTasks.find(t => t.id === entry.taskId);
                    return (
                      <div key={entry.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {entry.description || task?.title || 'Time entry'}
                          </p>
                          <span className="text-sm font-semibold text-green-600">{entry.hours}h</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p className="text-sm">No time entries yet</p>
                </div>
              )}
            </div>
          </Card>

          {/* Leave Balance */}
          <Card variant="bordered">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Balance</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Vacation</span>
                  <span className="font-semibold text-gray-900">15 days</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sick Leave</span>
                  <span className="font-semibold text-gray-900">10 days</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Personal</span>
                  <span className="font-semibold text-gray-900">3 days</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <Link href="/employee/leave">
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Request Leave
                </Button>
              </Link>
            </div>
          </Card>

          {/* Notifications */}
          <Card variant="bordered">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Notifications</h3>
              <div className="space-y-3">
                {mockNotifications.slice(0, 4).map(notification => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg ${notification.isRead ? 'bg-gray-50' : 'bg-green-50 border-l-4 border-green-500'}`}
                  >
                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatRelativeTime(notification.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
