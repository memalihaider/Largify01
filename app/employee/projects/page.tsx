'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Card, Badge } from '@/components/ui';

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  priority: string;
  progress: number;
  startDate: string;
  endDate: string;
  team: string[];
  tasks: Array<{ id: string; title: string; status: string; progress: number }>;
}

export default function EmployeeProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    assignedCount: 0,
    activeCount: 0,
    completedCount: 0,
    tasksCount: 0,
  });

  useEffect(() => {
    fetchAssignedProjects();
    const interval = setInterval(fetchAssignedProjects, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchAssignedProjects = async () => {
    try {
      const response = await fetch(`/api/projects`);
      const data = await response.json();
      if (data.success) {
        const assigned = data.projects || [];
        setProjects(assigned);
        
        const active = assigned.filter((p: any) => p.status === 'in_progress').length;
        const completed = assigned.filter((p: any) => p.status === 'completed').length;
        const tasks = assigned.reduce((sum: number, p: any) => sum + (p.tasks?.length || 0), 0);
        
        setStats({
          assignedCount: assigned.length,
          activeCount: active,
          completedCount: completed,
          tasksCount: tasks,
        });
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
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
      default:
        return 'bg-slate-700 text-slate-400';
    }
  };

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

  return (
    <div className="min-h-screen bg-slate-950 p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">
          My Projects
        </h1>
        <p className="text-slate-400 text-lg">Track and manage your assigned projects in real-time</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Assigned Projects', value: stats.assignedCount, color: 'blue' },
          { label: 'Active', value: stats.activeCount, color: 'green' },
          { label: 'Completed', value: stats.completedCount, color: 'emerald' },
          { label: 'My Tasks', value: stats.tasksCount, color: 'purple' },
        ].map((stat, i) => (
          <Card
            key={i}
            className={`rounded-2xl p-6 border bg-${stat.color}-500/10 border-${stat.color}-500/20`}
          >
            <p className={`text-xs font-black text-${stat.color}-600 uppercase tracking-widest mb-1`}>
              {stat.label}
            </p>
            <p className={`text-3xl font-black text-${stat.color}-400`}>{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mb-4" />
            <p className="text-slate-400">Loading your projects...</p>
          </div>
        ) : projects.length > 0 ? (
          projects.map(project => (
            <Card
              key={project.id}
              className="group bg-slate-900/50 border-white/5 rounded-[2.5rem] p-8 hover:border-green-500/40 transition-all cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex gap-2 items-center mb-2">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter group-hover:text-green-400 transition-colors">
                      {project.name}
                    </h3>
                    <Badge className={`${getStatusColor(project.status)} border text-xs`}>
                      {project.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <Badge className={`${getPriorityColor(project.priority)} border text-xs`}>
                      {project.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400">{project.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-green-400">{project.progress}%</p>
                  <p className="text-xs font-black text-slate-500 uppercase mt-1">Complete</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-3 w-full bg-slate-950/80 rounded-full border border-white/5 p-1 mb-6 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-600 via-green-400 to-green-500 rounded-full transition-all duration-1000 shadow-lg"
                  style={{ width: `${project.progress}%` }}
                />
              </div>

              {/* Info Grid */}
              <div className="grid md:grid-cols-4 gap-6 mb-6 pb-6 border-b border-white/5">
                <div>
                  <p className="text-xs font-black text-slate-600 uppercase tracking-widest mb-1">Start Date</p>
                  <p className="text-white font-black">{new Date(project.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs font-black text-slate-600 uppercase tracking-widest mb-1">End Date</p>
                  <p className="text-white font-black">{new Date(project.endDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs font-black text-slate-600 uppercase tracking-widest mb-1">Team Size</p>
                  <p className="text-white font-black">{project.team?.length || 0} Members</p>
                </div>
                <div>
                  <p className="text-xs font-black text-slate-600 uppercase tracking-widest mb-1">My Tasks</p>
                  <p className="text-white font-black">{project.tasks?.length || 0} Tasks</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Link href={`/employee/projects/${project.id}`} className="flex-1">
                  <Button className="w-full bg-green-600 hover:bg-green-500 text-white h-10 font-black uppercase tracking-wider rounded-xl transition-all">
                    View Details
                  </Button>
                </Link>
                <Button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white h-10 font-black uppercase tracking-wider rounded-xl border border-white/10 transition-all">
                  My Tasks
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <Card className="bg-slate-900/50 border-dashed border-white/10 rounded-[2.5rem] p-16 text-center">
            <p className="text-2xl font-black text-white uppercase mb-2">No Projects Assigned</p>
            <p className="text-slate-400">You haven't been assigned to any projects yet. Check back soon!</p>
          </Card>
        )}
      </div>
    </div>
  );
}
