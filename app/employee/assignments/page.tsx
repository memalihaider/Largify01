'use client';

import { useState } from 'react';
import { Card, Badge, Button } from '@/components/ui';
import { mockEmployeeWorkload, mockUsers, mockTasks } from '@/lib/mock-data';
import Link from 'next/link';

const CURRENT_USER_ID = 'emp-001'; // Logged in employee (in real app, from auth)

export default function EmployeeAssignmentsPage() {
  const workload = mockEmployeeWorkload.find(w => w.userId === CURRENT_USER_ID);
  const currentUser = mockUsers.find(u => u.id === CURRENT_USER_ID);
  
  const [activeTab, setActiveTab] = useState<'tasks' | 'milestones' | 'overview'>('overview');
  const [taskFilter, setTaskFilter] = useState<string>('all');
  const [milestoneFilter, setMilestoneFilter] = useState<string>('all');

  if (!workload || !currentUser) {
    return (
      <div className="p-6">
        <p className="text-red-600">Workload data not found</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'border-red-500 bg-red-50';
      case 'high':
        return 'border-orange-500 bg-orange-50';
      case 'medium':
        return 'border-blue-500 bg-blue-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  const getProgressPercentage = (assignment: any) => {
    if (assignment.estimatedHours && assignment.actualHours) {
      return Math.min(100, Math.round((assignment.actualHours / assignment.estimatedHours) * 100));
    }
    return assignment.status === 'completed' ? 100 : 0;
  };

  const filteredTasks = workload.assignedTasks.filter(t =>
    taskFilter === 'all' ? true : t.status === taskFilter
  );

  const filteredMilestones = workload.assignedMilestones.filter(m =>
    milestoneFilter === 'all' ? true : m.status === milestoneFilter
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Assignments</h1>
          <p className="text-gray-600 mt-2">Welcome back, {currentUser.firstName}!</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 border-l-4 border-blue-500">
            <p className="text-sm text-gray-600">Total Assigned</p>
            <p className="text-3xl font-bold text-blue-600 mt-1">
              {workload.assignedTasks.length + workload.assignedMilestones.length}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {workload.assignedTasks.length} tasks • {workload.assignedMilestones.length} milestones
            </p>
          </Card>
          <Card className="p-4 border-l-4 border-green-500">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-3xl font-bold text-green-600 mt-1">{workload.tasksCompleted}</p>
            <p className="text-xs text-gray-500 mt-2">Tasks finished</p>
          </Card>
          <Card className="p-4 border-l-4 border-orange-500">
            <p className="text-sm text-gray-600">In Progress</p>
            <p className="text-3xl font-bold text-orange-600 mt-1">{workload.tasksInProgress}</p>
            <p className="text-xs text-gray-500 mt-2">Currently working</p>
          </Card>
          <Card className="p-4 border-l-4 border-red-500">
            <p className="text-sm text-gray-600">Blocked</p>
            <p className="text-3xl font-bold text-red-600 mt-1">{workload.tasksBlocked}</p>
            <p className="text-xs text-gray-500 mt-2">Need attention</p>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200 bg-white rounded-t-lg p-4">
          <div className="flex gap-8">
            {(['overview', 'tasks', 'milestones'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium capitalize transition ${
                  activeTab === tab
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <Card className="p-6 bg-white">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
              {workload.upcomingDeadlines.length > 0 ? (
                <div className="space-y-3">
                  {workload.upcomingDeadlines.map((item, idx) => {
                    const daysUntilDue = Math.ceil(
                      (new Date(item.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                    );
                    const isOverdue = daysUntilDue < 0;
                    const isUrgent = daysUntilDue <= 3;
                    
                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border-l-4 ${
                          isOverdue
                            ? 'border-red-500 bg-red-50'
                            : isUrgent
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-blue-500 bg-blue-50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              {'taskId' in item ? `Task: ${item.id}` : `Milestone: ${'responsibilityType' in item ? item.responsibilityType : 'Deliverable'}`}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              Due: {new Date(item.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge className={getStatusColor(item.status)}>
                            {daysUntilDue < 0 ? `Overdue by ${Math.abs(daysUntilDue)}d` : `${daysUntilDue}d left`}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500">No upcoming deadlines</p>
              )}
            </Card>

            {/* Quick Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white">
                <h3 className="font-semibold text-gray-900 mb-4">Active Tasks</h3>
                <div className="space-y-2">
                  {workload.assignedTasks
                    .filter(t => t.status !== 'completed')
                    .slice(0, 3)
                    .map(task => (
                      <div key={task.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700">{task.priority} priority</span>
                        <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                      </div>
                    ))}
                </div>
              </Card>

              <Card className="p-6 bg-white">
                <h3 className="font-semibold text-gray-900 mb-4">Active Milestones</h3>
                <div className="space-y-2">
                  {workload.assignedMilestones
                    .filter(m => m.status !== 'completed')
                    .slice(0, 3)
                    .map(milestone => (
                      <div key={milestone.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700">{milestone.responsibilityType}</span>
                        <Badge className={getStatusColor(milestone.status)}>{milestone.status}</Badge>
                      </div>
                    ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['all', 'assigned', 'in_progress', 'completed', 'blocked'].map(status => (
                <button
                  key={status}
                  onClick={() => setTaskFilter(status)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition ${
                    taskFilter === status
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                </button>
              ))}
            </div>

            {/* Task Cards */}
            <div className="space-y-4">
              {filteredTasks.length > 0 ? (
                filteredTasks.map(task => {
                  const progress = getProgressPercentage(task);
                  
                  return (
                    <Card key={task.id} className={`p-4 border-l-4 ${getPriorityColor(task.priority)} bg-white`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">Task {task.id}</h3>
                            <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                            <Badge className={task.priority === 'urgent' || task.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}>
                              {task.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {task.estimatedHours && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium text-gray-900">
                              {task.actualHours || 0}h / {task.estimatedHours}h ({progress}%)
                            </span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-600 rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Notes */}
                      {task.completionNotes && (
                        <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded mt-2">
                          {task.completionNotes}
                        </p>
                      )}

                      {/* Action */}
                      <div className="mt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600 hover:bg-green-50"
                        >
                          Update Status
                        </Button>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <Card className="p-6 text-center text-gray-500">
                  No {taskFilter !== 'all' ? taskFilter : ''} tasks assigned
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Milestones Tab */}
        {activeTab === 'milestones' && (
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['all', 'assigned', 'in_progress', 'completed', 'blocked'].map(status => (
                <button
                  key={status}
                  onClick={() => setMilestoneFilter(status)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition ${
                    milestoneFilter === status
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                </button>
              ))}
            </div>

            {/* Milestone Cards */}
            <div className="space-y-4">
              {filteredMilestones.length > 0 ? (
                filteredMilestones.map(milestone => (
                  <Card key={milestone.id} className="p-4 border-l-4 border-purple-500 bg-white">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">Milestone {milestone.id}</h3>
                          <Badge className={getStatusColor(milestone.status)}>{milestone.status}</Badge>
                          <Badge className="bg-purple-100 text-purple-800">
                            {milestone.responsibilityType}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Due: {new Date(milestone.dueDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* Notes */}
                    {milestone.completionNotes && (
                      <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded mb-3">
                        {milestone.completionNotes}
                      </p>
                    )}

                    {/* Action */}
                    <div className="mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 hover:bg-green-50"
                      >
                        Update Status
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-6 text-center text-gray-500">
                  No {milestoneFilter !== 'all' ? milestoneFilter : ''} milestones assigned
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
