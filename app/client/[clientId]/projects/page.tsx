'use client';

import { use } from 'react';
import { Card, Badge } from '@/components/ui';
import {
  mockClientUsers,
  mockClientProjects,
  mockProjects,
} from '@/lib/mock-data';

interface PageProps {
  params: Promise<{
    clientId: string;
  }>;
}

export default function ClientProjectsPage({ params }: PageProps) {
  const { clientId } = use(params);
  const client = mockClientUsers.find(c => c.id === clientId);
  const clientProjects = mockClientProjects.filter(cp => cp.clientId === clientId);

  if (!client) {
    return <div>Client not found</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Projects</h1>
        <p className="text-gray-600">Track all projects assigned to your account</p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clientProjects.length > 0 ? (
          clientProjects.map((cp) => {
            const project = mockProjects.find(p => p.id === cp.projectId);
            if (!project) return null;

            const progressPercent = project.progressPercentage || 0;

            return (
              <Card key={cp.id} variant="bordered" className="hover:shadow-lg transition-shadow">
                <div className="p-6">
                  {/* Status */}
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="success">{cp.status}</Badge>
                    <span className="text-xs text-gray-500">{cp.viewCount} views</span>
                  </div>

                  {/* Project Info */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{project.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-700">Progress</span>
                      <span className="text-xs text-gray-600">{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 transition-all"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Start Date:</span>
                      <span className="font-medium text-gray-900">
                        {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">End Date:</span>
                      <span className="font-medium text-gray-900">
                        {project.targetEndDate ? new Date(project.targetEndDate).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">{Math.round(progressPercent)}%</span> complete
                    </p>
                    <p className="text-xs text-gray-500">
                      Budget: <span className="font-medium">${project.budget?.toLocaleString() || '0'}</span>
                    </p>
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full">
            <Card variant="bordered" className="p-12 text-center">
              <div className="text-gray-400 text-6xl mb-4">📁</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Projects Yet</h3>
              <p className="text-gray-600">
                You don't have any projects assigned to your account yet. <br />
                Once projects are assigned, they will appear here.
              </p>
            </Card>
          </div>
        )}
      </div>

      {/* Project Details Section */}
      {clientProjects.length > 0 && (
        <Card variant="bordered">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h2>
            <div className="space-y-4">
              {clientProjects.map((cp) => {
                const project = mockProjects.find(p => p.id === cp.projectId);
                if (!project) return null;

                return (
                  <div key={cp.id} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{project.name}</h4>
                      <span className="text-xs text-gray-500">
                        Granted: {new Date(cp.accessGrantedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Client:</p>
                        <p className="font-medium text-gray-900">{client.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Budget:</p>
                        <p className="font-medium text-gray-900">
                          {project.budget ? `$${project.budget.toLocaleString()}` : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Progress:</p>
                        <p className="font-medium text-gray-900">{project.progressPercentage || 0}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Status:</p>
                        <p className="font-medium text-gray-900 capitalize">{project.status}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
