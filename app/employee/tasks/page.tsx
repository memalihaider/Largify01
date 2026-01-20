'use client';

import { useState } from 'react';
import { Card, Badge, Button, Input } from '@/components/ui';
import { mockTasks, mockProjects, mockUsers, mockEmployees, mockTaskComments } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

// Current employee (Sarah Chen - emp-002, usr-002)
const currentEmployee = mockEmployees[1];
const currentUser = mockUsers.find(u => u.id === currentEmployee.userId) || mockUsers[1];

// Filter tasks for current user
const myTasks = mockTasks.filter(t => t.assignedTo === currentUser.id || t.assignedToId === currentUser.id);

type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';

export default function MyTasksPage() {
  const [view, setView] = useState<'list' | 'board'>('list');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const filteredTasks = myTasks.filter(task => {
    if (statusFilter !== 'all' && task.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const tasksByStatus = {
    todo: filteredTasks.filter(t => t.status === 'todo'),
    in_progress: filteredTasks.filter(t => t.status === 'in_progress'),
    review: filteredTasks.filter(t => t.status === 'review'),
    done: filteredTasks.filter(t => t.status === 'done'),
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      todo: 'bg-gray-100 text-gray-700',
      in_progress: 'bg-blue-100 text-blue-700',
      review: 'bg-yellow-100 text-yellow-700',
      done: 'bg-green-100 text-green-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-blue-100 text-blue-700',
      high: 'bg-orange-100 text-orange-700',
      urgent: 'bg-red-100 text-red-700',
    };
    return colors[priority] || 'bg-gray-100 text-gray-700';
  };

  const selectedTaskData = selectedTask ? myTasks.find(t => t.id === selectedTask) : null;
  const selectedProject = selectedTaskData ? mockProjects.find(p => p.id === selectedTaskData.projectId) : null;
  const taskComments = selectedTask ? mockTaskComments.filter(c => c.taskId === selectedTask) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-gray-500">Manage and track your assigned tasks</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView('list')}
            className={cn(
              'p-2 rounded-lg',
              view === 'list' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => setView('board')}
            className={cn(
              'p-2 rounded-lg',
              view === 'board' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Filters */}
      <Card variant="bordered" className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-50">
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Status</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </Card>

      <div className="flex gap-6">
        {/* Main Content */}
        <div className={cn('flex-1', selectedTask && 'lg:w-2/3')}>
          {view === 'list' ? (
            // List View
            <Card variant="bordered">
              <div className="divide-y divide-gray-100">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map(task => {
                    const project = mockProjects.find(p => p.id === task.projectId);
                    return (
                      <div
                        key={task.id}
                        onClick={() => setSelectedTask(task.id)}
                        className={cn(
                          'p-4 hover:bg-gray-50 cursor-pointer transition-colors',
                          selectedTask === task.id && 'bg-green-50'
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(task.status)}`}>
                                {task.status.replace('_', ' ')}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                              </span>
                            </div>
                            <h3 className="font-medium text-gray-900">{task.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">{project?.name || 'No Project'}</p>
                          </div>
                          <div className="text-right">
                            {task.dueDate && (
                              <p className="text-sm text-gray-500">
                                Due: {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </p>
                            )}
                            {task.estimatedHours && (
                              <p className="text-xs text-gray-400 mt-1">
                                {task.actualHours}/{task.estimatedHours}h logged
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-12 text-center text-gray-500">
                    <svg className="h-12 w-12 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <p>No tasks found</p>
                  </div>
                )}
              </div>
            </Card>
          ) : (
            // Board View
            <div className="grid grid-cols-4 gap-4">
              {(['todo', 'in_progress', 'review', 'done'] as TaskStatus[]).map(status => (
                <div key={status} className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-700 capitalize">{status.replace('_', ' ')}</h3>
                    <span className="text-sm text-gray-500">{tasksByStatus[status].length}</span>
                  </div>
                  <div className="space-y-2">
                    {tasksByStatus[status].map(task => {
                      const project = mockProjects.find(p => p.id === task.projectId);
                      return (
                        <Card
                          key={task.id}
                          variant="bordered"
                          className={cn(
                            'p-3 cursor-pointer hover:shadow-md transition-shadow',
                            selectedTask === task.id && 'ring-2 ring-green-500'
                          )}
                          onClick={() => setSelectedTask(task.id)}
                        >
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <h4 className="font-medium text-gray-900 mt-2 text-sm">{task.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">{project?.name}</p>
                          {task.dueDate && (
                            <p className="text-xs text-gray-400 mt-2">
                              Due: {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </p>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Task Detail Panel */}
        {selectedTask && selectedTaskData && (
          <Card variant="bordered" className="hidden lg:block w-1/3 h-fit sticky top-24">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(selectedTaskData.status)}`}>
                  {selectedTaskData.status.replace('_', ' ')}
                </span>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-2">{selectedTaskData.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{selectedProject?.name}</p>

              {selectedTaskData.description && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
                  <p className="text-sm text-gray-600">{selectedTaskData.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-xs text-gray-500">Priority</h4>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded text-sm font-medium ${getPriorityColor(selectedTaskData.priority)}`}>
                    {selectedTaskData.priority}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs text-gray-500">Due Date</h4>
                  <p className="text-sm text-gray-900 mt-1">
                    {selectedTaskData.dueDate 
                      ? new Date(selectedTaskData.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : 'Not set'}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs text-gray-500">Estimated</h4>
                  <p className="text-sm text-gray-900 mt-1">{selectedTaskData.estimatedHours || 0} hours</p>
                </div>
                <div>
                  <h4 className="text-xs text-gray-500">Logged</h4>
                  <p className="text-sm text-gray-900 mt-1">{selectedTaskData.actualHours || 0} hours</p>
                </div>
              </div>

              {/* Progress */}
              {selectedTaskData.estimatedHours && selectedTaskData.estimatedHours > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs text-gray-500">Time Progress</h4>
                    <span className="text-xs text-gray-500">
                      {Math.round((selectedTaskData.actualHours / selectedTaskData.estimatedHours) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={cn(
                        'h-2 rounded-full',
                        selectedTaskData.actualHours > selectedTaskData.estimatedHours
                          ? 'bg-red-500'
                          : 'bg-green-500'
                      )}
                      style={{ width: `${Math.min((selectedTaskData.actualHours / selectedTaskData.estimatedHours) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Comments */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Comments ({taskComments.length})</h4>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {taskComments.map(comment => {
                    const user = mockUsers.find(u => u.id === comment.userId);
                    return (
                      <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">{user?.fullName || 'Unknown'}</span>
                          <span className="text-xs text-gray-400">
                            {new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{comment.content}</p>
                      </div>
                    );
                  })}
                  {taskComments.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">No comments yet</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4 pt-4 border-t">
                <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                  Update Status
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Log Time
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
