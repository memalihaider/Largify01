'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Card, Badge, ProjectActionModal } from '@/components/ui';

interface PageProps {
  params: {
    id: string;
  };
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

export default function AdminProjectDetailPage({ params }: PageProps) {
  const { id: projectId } = params;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<'new-development' | 'settings' | 'security-report' | 'request-asset' | 'new-application' | 'initialize-application' | null>(null);
  const [adminStats, setAdminStats] = useState({
    teamSize: 0,
    taskCount: 0,
    completedTasks: 0,
    overdueTasks: 0,
    riskCount: 0,
    highRisks: 0,
  });

  useEffect(() => {
    fetchProjectDetails();
    const interval = setInterval(fetchProjectDetails, 5000);
    return () => clearInterval(interval);
  }, [projectId]);

  const fetchProjectDetails = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}`);
      const data = await response.json();
      if (data.success) {
        setProject(data.project);
        calculateAdminStats(data.project);
      }
    } catch (error) {
      console.error('Failed to fetch project:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateAdminStats = (proj: Project) => {
    setAdminStats({
      teamSize: proj.team?.length || 0,
      taskCount: proj.tasks?.length || 0,
      completedTasks: proj.tasks?.filter(t => t.status === 'completed').length || 0,
      overdueTasks: proj.tasks?.filter(t => t.status === 'overdue').length || 0,
      riskCount: proj.risks?.length || 0,
      highRisks: proj.risks?.filter(r => r.level === 'high').length || 0,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400" />
          <p className="mt-4 text-slate-400">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 font-black uppercase">Project not found</p>
        <Link href="/erp/projects" className="mt-4 text-purple-400 hover:text-purple-300">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-900/200/10 border-red-500/20 text-red-400';
      case 'high':
        return 'bg-orange-500/10 border-orange-500/20 text-orange-400';
      case 'medium':
        return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
      default:
        return 'bg-green-900/200/10 border-green-500/20 text-green-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-900/200/10 border-green-500/20 text-green-400';
      case 'in_progress':
        return 'bg-purple-500/10 border-purple-500/20 text-purple-400';
      case 'on_hold':
        return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
      default:
        return 'bg-slate-700 text-slate-400';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">
            {project.name}
          </h1>
          <div className="flex gap-2 flex-wrap">
            <Badge className={`${getStatusColor(project.status)} border`}>
              {project.status.replace('_', ' ').toUpperCase()}
            </Badge>
            <Badge className={`${getPriorityColor(project.priority)} border`}>
              {project.priority.toUpperCase()}
            </Badge>
          </div>
        </div>
        <Link
          href="/erp/projects"
          className="text-purple-400 hover:text-purple-300 font-black uppercase tracking-wider transition-colors"
        >
          ← Back
        </Link>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {[
          { label: 'Team Members', value: adminStats.teamSize },
          { label: 'Total Tasks', value: adminStats.taskCount },
          { label: 'Completed', value: adminStats.completedTasks },
          { label: 'Overdue', value: adminStats.overdueTasks, highlight: true },
          { label: 'Total Risks', value: adminStats.riskCount },
          { label: 'High Risk', value: adminStats.highRisks, highlight: true },
        ].map((stat, i) => (
          <div
            key={i}
            className={`p-4 border rounded-2xl ${
              stat.highlight
                ? 'bg-red-900/200/10 border-red-500/20'
                : 'bg-slate-900/40 border-white/5'
            }`}
          >
            <p className="text-xs font-black text-slate-600 uppercase tracking-widest mb-1">
              {stat.label}
            </p>
            <p className={`text-2xl font-black ${stat.highlight ? 'text-red-400' : 'text-white'}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Project Overview */}
      <Card className="bg-slate-900/50 border-white/5 rounded-[2.5rem] p-8">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6">Project Overview</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-xs font-black text-slate-600 uppercase tracking-widest mb-2">Description</p>
            <p className="text-slate-300 leading-relaxed">{project.description}</p>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-black text-slate-600 uppercase tracking-widest mb-2">Timeline</p>
              <p className="text-white font-black">
                {new Date(project.startDate).toLocaleDateString()} → {new Date(project.endDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-xs font-black text-slate-600 uppercase tracking-widest mb-2">Budget Status</p>
              <div className="flex items-baseline gap-2">
                <span className="text-white font-black text-xl">
                  ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                </span>
                <span className={`text-sm font-black ${
                  (project.spent / project.budget) > 0.9 ? 'text-red-400' : 'text-green-400'
                }`}>
                  ({Math.round((project.spent / project.budget) * 100)}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Progress */}
      <Card className="bg-slate-900/50 border-white/5 rounded-[2.5rem] p-8">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6">Overall Progress</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-black text-white uppercase">Completion Rate</span>
            <span className="text-2xl font-black text-purple-400">{project.progress}%</span>
          </div>
          <div className="h-4 bg-slate-950/80 rounded-full border border-white/10 p-1 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-500 rounded-full transition-all duration-1000 shadow-lg"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Tasks */}
      <Card className="bg-slate-900/50 border-white/5 rounded-[2.5rem] p-8">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6">Active Tasks</h2>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {project.tasks?.slice(0, 10).map(task => (
            <div key={task.id} className="flex items-center justify-between p-4 bg-slate-800/50 border border-white/5 rounded-xl">
              <div className="flex-1">
                <h3 className="font-black text-white">{task.title}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <div className="h-2 w-24 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 transition-all"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-black text-slate-500">{task.progress}%</span>
                </div>
              </div>
              <Badge className={`${
                task.status === 'completed'
                  ? 'bg-green-900/200/10 border-green-500/20 text-green-400'
                  : 'bg-purple-500/10 border-purple-500/20 text-purple-400'
              } border text-xs`}>
                {task.status}
              </Badge>
            </div>
          ))}
          {project.tasks?.length === 0 && (
            <p className="text-center text-slate-400 py-8">No tasks for this project</p>
          )}
        </div>
      </Card>

      {/* Admin Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Button
          onClick={() => setActiveModal('settings')}
          className="bg-purple-600 hover:bg-purple-500 text-white h-12 font-black uppercase tracking-wider rounded-2xl transition-all"
        >
          ⚙️ Project Settings
        </Button>
        <Button
          onClick={() => setActiveModal('security-report')}
          className="bg-slate-800 hover:bg-slate-700 text-white h-12 font-black uppercase tracking-wider rounded-2xl border border-white/10 transition-all"
        >
          🔒 Security Audit
        </Button>
        <Button
          onClick={() => setActiveModal('request-asset')}
          className="bg-slate-800 hover:bg-slate-700 text-white h-12 font-black uppercase tracking-wider rounded-2xl border border-white/10 transition-all"
        >
          📦 Allocate Resources
        </Button>
        <Button className="bg-slate-800 hover:bg-slate-700 text-white h-12 font-black uppercase tracking-wider rounded-2xl border border-white/10 transition-all">
          👥 Manage Team
        </Button>
        <Button className="bg-slate-800 hover:bg-slate-700 text-white h-12 font-black uppercase tracking-wider rounded-2xl border border-white/10 transition-all">
          📊 Export Report
        </Button>
        <Button className="bg-slate-800 hover:bg-slate-700 text-white h-12 font-black uppercase tracking-wider rounded-2xl border border-white/10 transition-all">
          🔔 Broadcast Message
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
