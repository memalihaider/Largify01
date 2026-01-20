'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Badge, Card, StatCard } from '@/components/ui';
import {
  ChevronDown, ChevronUp, CheckCircle2, Clock, AlertCircle, Users, FileText
} from 'lucide-react';
import {
  mockProjects, mockProjectPhases, mockProjectMilestones,
  mockProjectCommunications, mockProjectDocuments, mockTaskAssignments,
  mockMilestoneAssignments, mockProjectModules, mockProjectTeamMembers,
  mockUsers
} from '@/lib/mock-data';
import type { Project, ProjectPhase, TaskAssignment, MilestoneAssignment } from '@/lib/types';

export default function EmployeeProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const projectId = resolvedParams.id;
  const currentUserId = 'emp-002'; // This would come from session in real app

  const project = mockProjects.find(p => p.id === projectId) as Project | undefined;
  const [expandedPhases, setExpandedPhases] = React.useState<Set<string>>(new Set(['phase-001']));

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="text-center p-8">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Project Not Found</h2>
        </Card>
      </div>
    );
  }

  // Get data for this project
  const phases = useMemo(
    () => mockProjectPhases.filter(p => p.projectId === projectId),
    [projectId]
  );

  const modules = useMemo(
    () => mockProjectModules.filter(m => m.projectId === projectId),
    [projectId]
  );

  const teamMembers = useMemo(
    () => mockProjectTeamMembers.filter(t => t.projectId === projectId),
    [projectId]
  );

  const myTaskAssignments = useMemo(
    () => mockTaskAssignments.filter(t => t.assignedTo === currentUserId),
    [currentUserId]
  );

  const myMilestoneAssignments = useMemo(
    () => mockMilestoneAssignments.filter(m => m.assignedTo === currentUserId),
    [currentUserId]
  );

  const communications = useMemo(
    () => mockProjectCommunications.filter(c => c.projectId === projectId),
    [projectId]
  );

  const documents = useMemo(
    () => mockProjectDocuments.filter(d => d.projectId === projectId),
    [projectId]
  );

  const currentUser = mockUsers.find(u => u.id === currentUserId);
  const projectProgress = phases.length > 0
    ? Math.round(phases.reduce((sum, p) => sum + (p.completionPercentage || 0), 0) / phases.length)
    : 0;

  const togglePhase = (phaseId: string) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phaseId)) {
      newExpanded.delete(phaseId);
    } else {
      newExpanded.add(phaseId);
    }
    setExpandedPhases(newExpanded);
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'in_progress':
        return 'blue';
      case 'blocked':
        return 'red';
      default:
        return 'yellow';
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="text-emerald-600 hover:text-emerald-700 mb-4 flex items-center gap-1"
          >
            ← Back
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">{project.name}</h1>
              <p className="text-slate-600">{project.description}</p>
              <p className="text-sm text-slate-500 mt-2">Role: Frontend Developer • Allocation: 80%</p>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 px-4 py-2">Active</Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Project Progress"
            value={`${projectProgress}%`}
            trend={projectProgress}
            icon={<CheckCircle2 className="w-6 h-6" />}
          />
          <StatCard
            title="My Tasks"
            value={myTaskAssignments.length.toString()}
            trend={myTaskAssignments.length}
            icon={<AlertCircle className="w-6 h-6" />}
          />
          <StatCard
            title="My Milestones"
            value={myMilestoneAssignments.length.toString()}
            trend={myMilestoneAssignments.length}
            icon={<Clock className="w-6 h-6" />}
          />
          <StatCard
            title="Team Size"
            value={teamMembers.length.toString()}
            trend={teamMembers.length}
            icon={<Users className="w-6 h-6" />}
          />
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* MY ASSIGNMENTS SECTION */}
          <Card className="p-6 border-2 border-emerald-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">My Assignments</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* My Tasks */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-emerald-600" />
                  Tasks ({myTaskAssignments.length})
                </h3>
                <div className="space-y-3">
                  {myTaskAssignments.length > 0 ? (
                    myTaskAssignments.map(task => (
                      <div key={task.id} className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium text-slate-900">Task #{task.id.slice(-3)}</div>
                          <Badge className={`text-xs bg-${getTaskStatusColor(task.status)}-100 text-${getTaskStatusColor(task.status)}-700`}>
                            {task.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-slate-600 mb-2">
                          Estimated: {task.estimatedHours}h | Actual: {task.actualHours || 0}h
                        </div>
                        <div className="text-xs text-slate-500">
                          Due: {task.dueDate?.toLocaleDateString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-600 text-sm">No tasks assigned yet</p>
                  )}
                </div>
              </div>

              {/* My Milestones */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Milestones ({myMilestoneAssignments.length})
                </h3>
                <div className="space-y-3">
                  {myMilestoneAssignments.length > 0 ? (
                    myMilestoneAssignments.map(milestone => (
                      <div key={milestone.id} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium text-slate-900">Milestone #{milestone.id.slice(-3)}</div>
                          <Badge className={`text-xs bg-${getTaskStatusColor(milestone.status)}-100 text-${getTaskStatusColor(milestone.status)}-700`}>
                            {milestone.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-slate-600 mb-2">
                          Role: {milestone.responsibilityType}
                        </div>
                        <div className="text-xs text-slate-500">
                          Due: {milestone.dueDate?.toLocaleDateString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-600 text-sm">No milestones assigned yet</p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* PROJECT PHASES */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Project Phases</h2>

            <div className="space-y-4">
              {phases.map(phase => (
                <div key={phase.id} className="border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => togglePhase(phase.id)}
                    className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      {expandedPhases.has(phase.id) ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                      <div className="text-left">
                        <div className="font-semibold text-slate-900">Phase {phase.phaseNumber}: {phase.phaseName}</div>
                        <div className="text-sm text-slate-500">{phase.notes || 'No notes'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm font-medium">{phase.completionPercentage}% Complete</div>
                        <div className="text-xs text-slate-500">
                          {phase.startDate?.toLocaleDateString()} - {phase.expectedEndDate?.toLocaleDateString()}
                        </div>
                      </div>
                      <Badge className={`bg-${
                        phase.status === 'completed' ? 'green' :
                        phase.status === 'in_progress' ? 'blue' : 'slate'
                      }-100 text-${
                        phase.status === 'completed' ? 'green' :
                        phase.status === 'in_progress' ? 'blue' : 'slate'
                      }-700`}>
                        {phase.status}
                      </Badge>
                    </div>
                  </button>

                  {expandedPhases.has(phase.id) && (
                    <div className="p-4 bg-white border-t border-slate-200">
                      <div className="text-sm text-slate-600">
                        <p>Status: {phase.status}</p>
                        <p className="mt-2">{phase.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* PROJECT MODULES */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Project Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {modules.map(module => (
                <div key={module.id} className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition">
                  <div className="font-semibold text-slate-900 mb-2">{module.moduleName}</div>
                  <Badge className="text-xs mb-2">{module.moduleType}</Badge>
                  <p className="text-sm text-slate-600 mb-3">{module.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div>
                      <span className="text-slate-500">Status:</span>
                      <div className="font-medium">{module.status}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Budget:</span>
                      <div className="font-medium">${(module.budgetAllocated || 0).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* TEAM MEMBERS */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Team Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMembers.map(member => {
                const user = mockUsers.find(u => u.id === member.userId);
                return (
                  <div key={member.id} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-slate-900">{user?.fullName || `${user?.firstName} ${user?.lastName}` || 'Unknown'}</div>
                        <div className="text-sm text-emerald-600 font-medium">{member.role}</div>
                        <div className="text-sm text-slate-600 mt-2">{member.responsibility}</div>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-700">{member.allocationPercentage}%</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* COMMUNICATIONS */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Project Communications</h2>
            <div className="space-y-4">
              {communications.map(comm => (
                <div key={comm.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-semibold text-slate-900">{comm.subject}</div>
                    <Badge className="text-xs">{comm.communicationType}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{comm.notes}</p>
                  <div className="text-xs text-slate-500">{comm.communicationDate?.toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* DOCUMENTS */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Project Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map(doc => (
                <div key={doc.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{doc.documentName}</div>
                      <div className="text-sm text-slate-600 mt-1">{doc.documentType}</div>
                      <div className="text-xs text-slate-500 mt-2">
                        {doc.createdAt?.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
