'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Card, Badge, ProjectActionModal } from '@/components/ui';

interface PageProps {
  params: Promise<{
    clientId: string;
    projectId: string;
  }>;
}

interface Project {
  id: string;
  clientId: string;
  name: string;
  description: string;
  status: string;
  priority: string;
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  team: string[];
  tasks: Array<{ id: string; title: string; status: string; progress: number }>;
  milestones: Array<{ id: string; title: string; date: string; completed: boolean }>;
  risks: Array<{ id: string; title: string; level: string; mitigation: string }>;
  lastUpdate: string;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const { clientId, projectId } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<'new-development' | 'settings' | 'security-report' | 'request-asset' | 'new-application' | 'initialize-application' | null>(null);

  useEffect(() => {
    fetchProjectDetails();
    // Poll for real-time updates every 5 seconds
    const interval = setInterval(fetchProjectDetails, 5000);
    return () => clearInterval(interval);
  }, [projectId]);

  const fetchProjectDetails = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}`);
      const data = await response.json();
      if (data.success) {
        setProject(data.project);
      }
    } catch (error) {
      console.error('Failed to fetch project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400" />
          <p className="mt-4 text-slate-400">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 font-black uppercase">Project not found</p>
        <Link href={`/client/${clientId}/projects`} className="mt-4 text-cyan-400 hover:text-cyan-300">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500/10 border-red-500/20 text-red-400';
      case 'high':
        return 'bg-orange-500/10 border-orange-500/20 text-orange-400';
      case 'medium':
        return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
      default:
        return 'bg-green-500/10 border-green-500/20 text-green-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 border-green-500/20 text-green-400';
      case 'in_progress':
        return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
      case 'on_hold':
        return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
      case 'planning':
        return 'bg-purple-500/10 border-purple-500/20 text-purple-400';
      default:
        return 'bg-slate-500/10 border-slate-500/20 text-slate-400';
    }
  };

  const budgetUtilization = ((project.spent / project.budget) * 100).toFixed(1);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/5">
        <div className="flex-1">
          <Link
            href={`/client/${clientId}/projects`}
            className="text-cyan-400 hover:text-cyan-300 text-sm font-black uppercase tracking-wider mb-4 inline-block"
          >
            ← BACK TO PROJECTS
          </Link>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase mb-2">
            {project.name}
          </h1>
          <p className="text-slate-400 font-light italic">{project.description}</p>
        </div>
        <div className="flex gap-2">
          <Badge className={`${getPriorityColor(project.priority)} border`}>
            {project.priority.toUpperCase()}
          </Badge>
          <Badge className={`${getStatusColor(project.status)} border`}>
            {project.status.toUpperCase().replace('_', ' ')}
          </Badge>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="bg-slate-900/50 border-white/5 rounded-[2.5rem] p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Overall Progress */}
          <div className="space-y-3">
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Overall Progress</p>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-black text-cyan-400">{project.progress}%</span>
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-blue-600 to-cyan-400 transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Budget Tracking */}
          <div className="space-y-3">
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Budget Utilization</p>
            <div className="flex items-end gap-3">
              <div>
                <p className="text-2xl font-black text-white">${(project.spent / 1000).toFixed(0)}K</p>
                <p className="text-xs text-slate-400">of ${(project.budget / 1000).toFixed(0)}K</p>
              </div>
              <div className="flex-1">
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      parseFloat(budgetUtilization) > 90
                        ? 'bg-red-500'
                        : 'bg-linear-to-r from-green-600 to-cyan-400'
                    }`}
                    style={{ width: `${budgetUtilization}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">{budgetUtilization}% utilized</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-3">
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Timeline</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-slate-400">Start:</span>
                <span className="text-xs font-black text-white">{new Date(project.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-slate-400">End:</span>
                <span className="text-xs font-black text-white">{new Date(project.endDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-slate-400">Days Remaining:</span>
                <span className="text-xs font-black text-cyan-400">
                  {Math.ceil(
                    (new Date(project.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                  )} days
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tasks */}
      <Card className="bg-slate-900/50 border-white/5 rounded-[2.5rem] p-8">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6">Project Tasks</h2>
        <div className="space-y-4">
          {project.tasks.map(task => (
            <div
              key={task.id}
              className="p-4 bg-slate-800/50 border border-white/5 rounded-2xl hover:border-white/10 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-black text-white uppercase tracking-wider">{task.title}</h3>
                <Badge
                  className={`text-xs font-black uppercase tracking-wider ${
                    task.status === 'done'
                      ? 'bg-green-500/10 border-green-500/20 text-green-400'
                      : task.status === 'in_progress'
                      ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                      : 'bg-slate-500/10 border-slate-500/20 text-slate-400'
                  } border`}
                >
                  {task.status.replace('_', ' ')}
                </Badge>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                  style={{ width: `${task.progress}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-2">{task.progress}% complete</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Milestones */}
      <Card className="bg-slate-900/50 border-white/5 rounded-[2.5rem] p-8">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6">Milestones</h2>
        <div className="space-y-3">
          {project.milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className="flex items-start gap-4 p-4 bg-slate-800/50 border border-white/5 rounded-2xl"
            >
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 font-black text-sm ${
                  milestone.completed
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-slate-700 text-slate-400'
                }`}
              >
                {milestone.completed ? '✓' : index + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-black text-white uppercase tracking-wider">{milestone.title}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  {milestone.completed ? 'Completed ' : 'Due '} {new Date(milestone.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Risks */}
      <Card className="bg-slate-900/50 border-white/5 rounded-[2.5rem] p-8">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6">Identified Risks</h2>
        <div className="space-y-4">
          {project.risks.map(risk => (
            <div
              key={risk.id}
              className={`p-4 border rounded-2xl ${
                risk.level === 'high'
                  ? 'bg-red-500/10 border-red-500/20'
                  : 'bg-yellow-500/10 border-yellow-500/20'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-black text-white uppercase tracking-wider">{risk.title}</h3>
                <Badge
                  className={`text-xs font-black uppercase tracking-wider border ${
                    risk.level === 'high'
                      ? 'bg-red-500/10 border-red-500/20 text-red-400'
                      : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {risk.level}
                </Badge>
              </div>
              <p className="text-sm text-slate-300">
                <span className="font-black text-slate-400">Mitigation: </span>
                {risk.mitigation}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Button
          onClick={() => setActiveModal('new-development')}
          className="bg-blue-600 hover:bg-blue-500 text-white h-12 font-black uppercase tracking-wider rounded-2xl transition-all"
        >
          ✨ New Development
        </Button>
        <Button
          onClick={() => setActiveModal('settings')}
          className="bg-slate-800 hover:bg-slate-700 text-white h-12 font-black uppercase tracking-wider rounded-2xl border border-white/10 transition-all"
        >
          ⚙️ Settings
        </Button>
        <Button
          onClick={() => setActiveModal('security-report')}
          className="bg-slate-800 hover:bg-slate-700 text-white h-12 font-black uppercase tracking-wider rounded-2xl border border-white/10 transition-all"
        >
          🔒 Security Report
        </Button>
        <Button
          onClick={() => setActiveModal('request-asset')}
          className="bg-slate-800 hover:bg-slate-700 text-white h-12 font-black uppercase tracking-wider rounded-2xl border border-white/10 transition-all"
        >
          📦 Request Asset
        </Button>
        <Button
          onClick={() => setActiveModal('new-application')}
          className="bg-slate-800 hover:bg-slate-700 text-white h-12 font-black uppercase tracking-wider rounded-2xl border border-white/10 transition-all"
        >
          🆕 New Application
        </Button>
        <Button
          onClick={() => setActiveModal('initialize-application')}
          className="bg-slate-800 hover:bg-slate-700 text-white h-12 font-black uppercase tracking-wider rounded-2xl border border-white/10 transition-all"
        >
          🚀 Initialize App
        </Button>
      </div>

      {/* Action Modal */}
      <ProjectActionModal
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        action={activeModal}
        projectId={projectId}
        projectName={project?.name}
      />
    </div>
  );
}
