'use client';

import { use } from 'react';
import Link from 'next/link';
import { Card, Badge, Button } from '@/components/ui';
import {
  mockClientUsers,
  mockClientProjects,
  mockClientApplications,
  mockClientTaskTracking,
  mockProjects,
  mockTasks,
} from '@/lib/mock-data';

interface PageProps {
  params: Promise<{
    clientId: string;
  }>;
}

export default function ClientDashboardPage({ params }: PageProps) {
  const { clientId } = use(params);
  const client = mockClientUsers.find(c => c.id === clientId);
  const clientProjects = mockClientProjects.filter(cp => cp.clientId === clientId);
  const clientApplications = mockClientApplications.filter(ca => ca.clientId === clientId);
  const clientTasks = mockClientTaskTracking.filter(ct => ct.clientId === clientId);

  if (!client) {
    return <div>Client not found</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-linear-to-r from-green-500 to-green-600 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {client.name}!</h1>
        <p className="text-green-50">Track your projects, applications, and tasks in one place</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="bordered" className="p-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">{clientProjects.length}</div>
            <p className="text-gray-600">Active Projects</p>
          </div>
        </Card>
        <Card variant="bordered" className="p-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">{clientApplications.length}</div>
            <p className="text-gray-600">Applications</p>
          </div>
        </Card>
        <Card variant="bordered" className="p-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">{clientTasks.length}</div>
            <p className="text-gray-600">Tasks Tracked</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <Card variant="bordered">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Your Projects</h2>
                <Link
                  href={`/client/${clientId}/projects`}
                  className="text-sm text-green-600 hover:text-green-700 underline"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                {clientProjects.length > 0 ? (
                  clientProjects.slice(0, 3).map((cp) => {
                    const project = mockProjects.find(p => p.id === cp.projectId);
                    if (!project) return null;
                    return (
                      <Link
                        key={cp.id}
                        href={`/client/${clientId}/projects`}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors group"
                      >
                        <div>
                          <p className="font-medium text-gray-900 group-hover:text-green-600">
                            {project.name}
                          </p>
                          <p className="text-sm text-gray-500">{project.description}</p>
                        </div>
                        <Badge variant="info">{cp.viewCount} views</Badge>
                      </Link>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-sm">No projects assigned yet</p>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Applications Status */}
        <Card variant="bordered">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Applications</h2>
            <div className="space-y-3">
              {clientApplications.length > 0 ? (
                clientApplications.slice(0, 2).map((app) => (
                  <div key={app.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-gray-900 text-sm">{app.title}</p>
                      <Badge
                        variant={
                          app.status === 'approved'
                            ? 'success'
                            : app.status === 'rejected'
                            ? 'danger'
                            : app.status === 'under_review'
                            ? 'info'
                            : 'secondary'
                        }
                      >
                        {app.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">{app.type}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No applications</p>
              )}
              <Link
                href={`/client/${clientId}/applications`}
                className="inline-block mt-2 text-sm text-green-600 hover:text-green-700 underline"
              >
                View All Applications
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Tasks */}
      <Card variant="bordered">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Task Updates</h2>
            <Link
              href={`/client/${clientId}/tasks`}
              className="text-sm text-green-600 hover:text-green-700 underline"
            >
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Task</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Priority</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Last Viewed</th>
                </tr>
              </thead>
              <tbody>
                {clientTasks.length > 0 ? (
                  clientTasks.slice(0, 5).map((ct) => {
                    const task = mockTasks.find(t => t.id === ct.taskId);
                    if (!task) return null;
                    return (
                      <tr key={ct.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <p className="font-medium text-gray-900">{task.title}</p>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            variant={
                              task.priority === 'high'
                                ? 'danger'
                                : task.priority === 'medium'
                                ? 'warning'
                                : 'info'
                            }
                          >
                            {task.priority}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant={task.status === 'done' ? 'success' : 'info'}>
                            {task.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-500">
                          {ct.lastViewed ? new Date(ct.lastViewed).toLocaleDateString() : 'Never'}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 px-4 text-center text-gray-500">
                      No tasks tracked
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
