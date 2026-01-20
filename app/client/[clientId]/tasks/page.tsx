'use client';

import { use } from 'react';
import { Card, Badge } from '@/components/ui';
import { mockClientTaskTracking, mockTasks, mockProjects } from '@/lib/mock-data';

interface PageProps {
  params: Promise<{
    clientId: string;
  }>;
}

export default function ClientTasksPage({ params }: PageProps) {
  const { clientId } = use(params);
  const clientTasks = mockClientTaskTracking.filter(ct => ct.clientId === clientId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not_started':
        return 'secondary';
      case 'in_progress':
        return 'warning';
      case 'completed':
        return 'success';
      case 'on_hold':
        return 'info';
      default:
        return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'info';
      case 'medium':
        return 'warning';
      case 'high':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  // Group tasks by status
  const groupedTasks = {
    todo: clientTasks.filter(ct => mockTasks.find(t => t.id === ct.taskId)?.status === 'todo'),
    in_progress: clientTasks.filter(ct => mockTasks.find(t => t.id === ct.taskId)?.status === 'in_progress'),
    done: clientTasks.filter(ct => mockTasks.find(t => t.id === ct.taskId)?.status === 'done'),
    review: clientTasks.filter(ct => mockTasks.find(t => t.id === ct.taskId)?.status === 'review'),
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tracked Tasks</h1>
        <p className="text-gray-600">Monitor tasks from your assigned projects</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card variant="bordered" className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">{clientTasks.length}</div>
          <p className="text-sm text-gray-600">Total Tasks</p>
        </Card>
        <Card variant="bordered" className="p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600 mb-1">{groupedTasks.in_progress.length}</div>
          <p className="text-sm text-gray-600">In Progress</p>
        </Card>
        <Card variant="bordered" className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">{groupedTasks.done.length}</div>
          <p className="text-sm text-gray-600">Completed</p>
        </Card>
        <Card variant="bordered" className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {clientTasks.filter(ct => ct.viewCount === 0).length}
          </div>
          <p className="text-sm text-gray-600">Unread</p>
        </Card>
      </div>

      {/* Kanban Board View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {['todo', 'in_progress', 'done', 'review'].map((status) => {
          const tasks = groupedTasks[status as keyof typeof groupedTasks];
          const statusLabels: Record<string, string> = {
            todo: 'To Do',
            in_progress: 'In Progress',
            done: 'Completed',
            review: 'In Review',
          };

          return (
            <Card key={status} variant="bordered" className="h-full min-h-96">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-900">{statusLabels[status]}</h3>
                <p className="text-sm text-gray-600 mt-1">{tasks.length} tasks</p>
              </div>

              <div className="p-4 space-y-3">
                {tasks.length > 0 ? (
                  tasks.map((ct) => {
                    const task = mockTasks.find(t => t.id === ct.taskId);
                    const project = mockProjects.find(p => p.id === task?.projectId);

                    if (!task) return null;

                    return (
                      <div
                        key={ct.id}
                        className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group"
                      >
                        <div className="flex items-start justify-between mb-2 gap-2">
                          <p className="font-medium text-gray-900 group-hover:text-green-600 line-clamp-2">
                            {task.title}
                          </p>
                          <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                            {task.priority}
                          </Badge>
                        </div>

                        <p className="text-xs text-gray-500 mb-2">{project?.name}</p>

                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">Views: {ct.viewCount}</span>
                          {ct.lastViewed && (
                            <span className="text-gray-400">
                              {new Date(ct.lastViewed).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400 text-sm">No tasks</p>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Detailed List View */}
      <Card variant="bordered">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">All Tasks</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Task</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Project</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Priority</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Views</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Last Viewed</th>
                </tr>
              </thead>
              <tbody>
                {clientTasks.length > 0 ? (
                  clientTasks.map((ct) => {
                    const task = mockTasks.find(t => t.id === ct.taskId);
                    const project = mockProjects.find(p => p.id === task?.projectId);

                    if (!task) return null;

                    return (
                      <tr key={ct.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <p className="font-medium text-gray-900 line-clamp-1">{task.title}</p>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{project?.name}</td>
                        <td className="py-4 px-4">
                          <Badge variant={getStatusColor(task.status)}>
                            {task.status.replace('_', ' ')}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{ct.viewCount}</td>
                        <td className="py-4 px-4 text-gray-600">
                          {ct.lastViewed ? new Date(ct.lastViewed).toLocaleDateString() : 'Never'}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 px-4 text-center text-gray-500">
                      No tasks tracked yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
