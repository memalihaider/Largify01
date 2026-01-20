'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, Badge, StatCard } from '@/components/ui';
import { CheckCircle2, Clock, AlertCircle, Users } from 'lucide-react';
import {
  mockProjects, mockProjectTeamMembers, mockProjectPhases,
  mockTaskAssignments, mockMilestoneAssignments
} from '@/lib/mock-data';
import type { Project } from '@/lib/types';

export default function EmployeeProjectsPage() {
  const router = useRouter();
  const currentUserId = 'emp-002';

  const assignedProjectIds = new Set(
    mockProjectTeamMembers
      .filter(member => member.userId === currentUserId)
      .map(member => member.projectId)
  );

  const myProjects = mockProjects.filter(p => assignedProjectIds.has(p.id)) as Project[];

  const projectStats = myProjects.map(project => {
    const taskCount = mockTaskAssignments.filter(
      t => t.assignedTo === currentUserId &&
      mockProjectPhases.some(ph => ph.projectId === project.id)
    ).length;

    const milestoneCount = mockMilestoneAssignments.filter(
      m => m.assignedTo === currentUserId &&
      mockProjectPhases.some(ph => ph.projectId === project.id)
    ).length;

    const phases = mockProjectPhases.filter(p => p.projectId === project.id);
    const progress = phases.length > 0
      ? Math.round(phases.reduce((sum, p) => sum + (p.completionPercentage || 0), 0) / phases.length)
      : 0;

    return {
      project,
      taskCount,
      milestoneCount,
      progress,
      phases: phases.length,
    };
  });

  const totalTasks = projectStats.reduce((sum, s) => sum + s.taskCount, 0);
  const totalMilestones = projectStats.reduce((sum, s) => sum + s.milestoneCount, 0);
  const avgProgress = projectStats.length > 0
    ? Math.round(projectStats.reduce((sum, s) => sum + s.progress, 0) / projectStats.length)
    : 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">My Projects</h1>
          <p className="text-slate-600">Projects you're assigned to as a team member</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Active Projects"
            value={myProjects.length.toString()}
            trend={myProjects.length}
            icon={<CheckCircle2 className="w-6 h-6" />}
          />
          <StatCard
            title="My Tasks"
            value={totalTasks.toString()}
            trend={totalTasks}
            icon={<AlertCircle className="w-6 h-6" />}
          />
          <StatCard
            title="My Milestones"
            value={totalMilestones.toString()}
            trend={totalMilestones}
            icon={<Clock className="w-6 h-6" />}
          />
          <StatCard
            title="Avg Progress"
            value={`${avgProgress}%`}
            trend={avgProgress}
            icon={<CheckCircle2 className="w-6 h-6" />}
          />
        </div>

        {myProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectStats.map(({ project, taskCount, milestoneCount, progress, phases }) => (
              <Card
                key={project.id}
                className="cursor-pointer hover:shadow-lg transition overflow-hidden group"
                onClick={() => router.push(`/employee/projects/${project.id}`)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-lg group-hover:text-emerald-600 transition">
                        {project.name}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1 line-clamp-2">{project.description}</p>
                    </div>
                    <Badge className={`ml-2 whitespace-nowrap ${
                      project.status === 'completed' ? 'bg-green-100 text-green-700' :
                      project.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                      project.status === 'on_hold' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {project.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4 py-4 border-t border-b border-slate-200">
                    <div className="text-center">
                      <div className="text-xs text-slate-600 mb-1">Tasks</div>
                      <div className="text-lg font-bold text-slate-900">{taskCount}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-slate-600 mb-1">Milestones</div>
                      <div className="text-lg font-bold text-slate-900">{milestoneCount}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-slate-600 mb-1">Phases</div>
                      <div className="text-lg font-bold text-slate-900">{phases}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-900">Progress</span>
                      <span className="text-sm font-bold text-emerald-600">{progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-sm text-slate-600">
                    <span className="font-medium">Client:</span> {project.client?.company?.name || 'Unknown'}
                  </div>

                  <button className="mt-4 w-full py-2 px-4 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition font-medium text-sm">
                    View Project Details
                  </button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Projects Assigned</h3>
            <p className="text-slate-600">You haven't been assigned to any projects yet. Check back soon!</p>
          </Card>
        )}
      </div>
    </div>
  );
}
