'use client';

import { useState } from 'react';
import { Card, Button, Input, Badge, Avatar, AvatarGroup } from '@/components/ui';
import { mockProjects, mockMilestones, mockTasks, mockClients, mockUsers } from '@/lib/mock-data';
import { formatCurrency, formatRelativeTime, cn } from '@/lib/utils';
import type { Project, ProjectStatus, ProjectType, Priority } from '@/lib/types';
import Link from 'next/link';

const statusColors: Record<string, string> = {
  planning: 'bg-slate-800 text-slate-300',
  in_progress: 'bg-blue-900/20 text-blue-400',
  on_hold: 'bg-amber-900/20 text-yellow-700',
  completed: 'bg-emerald-900/20 text-green-700',
  cancelled: 'bg-red-900/20 text-red-700',
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState(mockProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    projectCode: '',
    description: '',
    clientId: '',
    type: 'other',
    status: 'planning',
    priority: 'medium',
    budget: '',
    actualCost: '',
    startDate: '',
    endDate: '',
    targetEndDate: '',
    projectManager: '',
    tags: '',
  });

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getProjectProgress = (projectId: string) => {
    const projectTasks = mockTasks.filter(t => 
      mockMilestones.some(m => m.projectId === projectId && t.milestoneId === m.id)
    );
    if (projectTasks.length === 0) return 0;
    const completedTasks = projectTasks.filter(t => t.status === 'done').length;
    return Math.round((completedTasks / projectTasks.length) * 100);
  };

  const calculateBudgetUtilization = (project: any) => {
    if (!project.budget || project.budget === 0) return 0;
    const actualCost = project.actualCost || 0;
    return Math.round((actualCost / project.budget) * 100);
  };

  const handleOpenModal = (project?: any) => {
    if (project) {
      setCurrentProject(project);
      setFormData({
        name: project.name || '',
        projectCode: project.projectCode || '',
        description: project.description || '',
        clientId: project.clientId || '',
        type: project.type || 'other',
        status: project.status || 'planning',
        priority: project.priority || 'medium',
        budget: project.budget?.toString() || '',
        actualCost: project.actualCost?.toString() || '',
        startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
        endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
        targetEndDate: project.targetEndDate ? new Date(project.targetEndDate).toISOString().split('T')[0] : '',
        projectManager: project.projectManager || '',
        tags: (project.tags || []).join(', '),
      });
    } else {
      setCurrentProject(null);
      setFormData({
        name: '',
        projectCode: `PRJ-2026-${(projects.length + 1).toString().padStart(3, '0')}`,
        description: '',
        clientId: '',
        type: 'other',
        status: 'planning',
        priority: 'medium',
        budget: '',
        actualCost: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        targetEndDate: '',
        projectManager: '',
        tags: '',
      });
    }
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name) {
      alert('Project name is required');
      return;
    }

    // Validate dates
    if (formData.startDate && formData.endDate) {
      if (new Date(formData.endDate) < new Date(formData.startDate)) {
        alert('End date must be after start date');
        return;
      }
    }

    if (formData.startDate && formData.targetEndDate) {
      if (new Date(formData.targetEndDate) < new Date(formData.startDate)) {
        alert('Target end date must be after start date');
        return;
      }
    }

    // Validate budget
    if (formData.budget && parseFloat(formData.budget) < 0) {
      alert('Budget must be a positive number');
      return;
    }

    if (currentProject) {
      // Update existing project
      setProjects(projects.map(p => 
        p.id === currentProject.id 
          ? {
              ...p,
              name: formData.name,
              projectCode: formData.projectCode,
              description: formData.description,
              clientId: formData.clientId,
              type: formData.type as ProjectType,
              status: formData.status as ProjectStatus,
              priority: formData.priority as Priority,
              budget: formData.budget ? parseFloat(formData.budget) : undefined,
              actualCost: formData.actualCost ? parseFloat(formData.actualCost) : 0,
              startDate: formData.startDate ? new Date(formData.startDate) : undefined,
              endDate: formData.endDate ? new Date(formData.endDate) : undefined,
              targetEndDate: formData.targetEndDate ? new Date(formData.targetEndDate) : undefined,
              projectManager: formData.projectManager,
              tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
              updatedAt: new Date(),
            }
          : p
      ));
      alert('Project updated successfully!');
    } else {
      // Create new project
      const newProject: Project = {
        id: `proj-${Date.now()}`,
        projectCode: formData.projectCode,
        name: formData.name,
        description: formData.description,
        clientId: formData.clientId,
        type: formData.type as ProjectType,
        status: formData.status as ProjectStatus,
        priority: formData.priority as Priority,
        budget: formData.budget ? parseFloat(formData.budget) : undefined,
        actualCost: formData.actualCost ? parseFloat(formData.actualCost) : 0,
        startDate: formData.startDate ? new Date(formData.startDate) : undefined,
        endDate: formData.endDate ? new Date(formData.endDate) : undefined,
        targetEndDate: formData.targetEndDate ? new Date(formData.targetEndDate) : undefined,
        projectManager: formData.projectManager,
        progressPercentage: 0,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setProjects([...projects, newProject]);
      alert('Project created successfully!');
    }
    setShowModal(false);
  };

  const handleDelete = (projectId: string) => {
    setProjectToDelete(projectId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      setProjects(projects.filter(p => p.id !== projectToDelete));
      alert('Project deleted successfully!');
    }
    setProjectToDelete(null);
    setShowDeleteConfirm(false);
  };

  const handleViewBudget = (project: any) => {
    const budget = project.budget || 0;
    const actualCost = project.actualCost || 0;
    const remaining = budget - actualCost;
    const utilization = calculateBudgetUtilization(project);
    
    alert(
      `Budget Breakdown for ${project.name}:\n\n` +
      `Total Budget: ${formatCurrency(budget)}\n` +
      `Actual Spend: ${formatCurrency(actualCost)}\n` +
      `Remaining: ${formatCurrency(remaining)}\n` +
      `Utilization: ${utilization}%`
    );
  };

  const handleExport = () => {
    console.log('Exporting projects...');
    alert('Projects exported successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-slate-400">Manage and track all your projects</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </Button>
          <Button onClick={() => handleOpenModal()}>
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Project
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-slate-400">Total Projects</p>
          <p className="text-2xl font-bold text-white">{projects.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">In Progress</p>
          <p className="text-2xl font-bold text-blue-400">
            {projects.filter(p => p.status === 'in_progress').length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">Total Budget</p>
          <p className="text-2xl font-bold text-white">
            {formatCurrency(projects.reduce((sum, p) => sum + (p.budget || 0), 0))}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">Completed</p>
          <p className="text-2xl font-bold text-emerald-400">
            {projects.filter(p => p.status === 'completed').length}
          </p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {['all', 'planning', 'in_progress', 'on_hold', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors',
                  statusFilter === status
                    ? 'bg-blue-900/20 text-blue-400'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-800'
                )}
              >
                {status === 'all' ? 'All' : status.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const progress = getProjectProgress(project.id);
          const projectMilestones = mockMilestones.filter(m => m.projectId === project.id);
          const budgetUtilization = calculateBudgetUtilization(project);
          
          return (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{project.name}</h3>
                    <p className="text-sm text-slate-400 line-clamp-2">{project.description}</p>
                  </div>
                  <Badge className={statusColors[project.status] || 'bg-slate-800'}>
                    {project.status.replace('_', ' ')}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-slate-400">Progress</span>
                    <span className="font-medium text-white">{progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-900/200 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Budget Utilization */}
                {project.budget && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-400">Budget Utilization</span>
                      <span className="font-medium text-white">{budgetUtilization}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          budgetUtilization > 90 ? 'bg-red-600' : budgetUtilization > 75 ? 'bg-yellow-600' : 'bg-green-600'
                        )}
                        style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Project Details */}
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-slate-400">Budget</p>
                    <p className="font-medium text-white">{project.budget ? formatCurrency(project.budget) : 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Milestones</p>
                    <p className="font-medium text-white">{projectMilestones.length}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Start Date</p>
                    <p className="font-medium text-white">
                      {project.startDate ? new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">End Date</p>
                    <p className="font-medium text-white">
                      {project.endDate ? new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-'}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mb-4 pt-4 border-t border-slate-800">
                  <Link href={`/erp/projects/${project.id}`} className="flex-1">
                    <button
                      className="w-full px-3 py-1.5 text-sm font-medium text-purple-400 bg-purple-50 rounded-lg hover:bg-purple-900/20 transition-colors"
                      title="View Project Lifecycle"
                    >
                      Lifecycle
                    </button>
                  </Link>
                  <button
                    onClick={() => handleOpenModal(project)}
                    className="flex-1 px-3 py-1.5 text-sm font-medium text-blue-400 bg-blue-900/20 rounded-lg hover:bg-blue-900/20 transition-colors"
                    title="Edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleViewBudget(project)}
                    className="flex-1 px-3 py-1.5 text-sm font-medium text-emerald-400 bg-green-900/20 rounded-lg hover:bg-emerald-900/20 transition-colors"
                    title="View Budget"
                  >
                    Budget
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="flex-1 px-3 py-1.5 text-sm font-medium text-red-400 bg-red-900/20 rounded-lg hover:bg-red-900/20 transition-colors"
                    title="Delete"
                  >
                    Delete
                  </button>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <AvatarGroup
                    max={3}
                    avatars={[
                      { firstName: 'J', lastName: 'D' },
                      { firstName: 'S', lastName: 'M' },
                    ]}
                  />
                  <Link href={`/erp/projects/tasks?project=${project.id}`}>
                    <Button variant="ghost" size="sm">
                      View Tasks
                      <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <Card className="p-8 text-center text-slate-400">
          <svg className="h-12 w-12 mx-auto mb-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p>No projects found</p>
        </Card>
      )}

      {/* Create/Edit Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-linear-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between border-b border-blue-800">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {currentProject ? '✏️ Edit Project' : '📋 Create New Project'}
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  {currentProject ? 'Update project details and lifecycle' : 'Initialize a new project with detailed configuration'}
                </p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-blue-100 hover:text-white transition">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-6">
              {/* Section 1: Basic Information */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-white mb-4">📌 Basic Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Project Name *</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., TechFlow ERP Implementation"
                      className="text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Project Code</label>
                    <Input
                      value={formData.projectCode}
                      onChange={(e) => setFormData({ ...formData, projectCode: e.target.value })}
                      placeholder="e.g., PRJ-2026-001"
                      className="text-base bg-slate-950/50"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Provide a detailed description of the project scope, objectives, and deliverables..."
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Section 2: Project Configuration */}
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold text-white mb-4">⚙️ Project Configuration</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Client</label>
                    <select
                      value={formData.clientId}
                      onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a client...</option>
                      {mockClients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.clientCode}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Project Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="erp_implementation">ERP Implementation</option>
                      <option value="custom_development">Custom Development</option>
                      <option value="support">Support</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="consulting">Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">🟢 Low</option>
                      <option value="medium">🟡 Medium</option>
                      <option value="high">🔴 High</option>
                      <option value="critical">🔴 Critical</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Project Lifecycle */}
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold text-white mb-4">🔄 Project Lifecycle</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Status *</label>
                    <select
                      required
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="planning">📋 Planning</option>
                      <option value="in_progress">⚡ In Progress</option>
                      <option value="on_hold">⏸️ On Hold</option>
                      <option value="completed">✅ Completed</option>
                      <option value="cancelled">❌ Cancelled</option>
                    </select>
                    <p className="text-xs text-slate-400 mt-1">Current phase in project lifecycle</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Project Manager</label>
                    <select
                      value={formData.projectManager}
                      onChange={(e) => setFormData({ ...formData, projectManager: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select project manager...</option>
                      {mockUsers.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.fullName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 4: Timeline */}
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-lg font-semibold text-white mb-4">📅 Timeline</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Start Date</label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Target End Date</label>
                    <Input
                      type="date"
                      value={formData.targetEndDate}
                      onChange={(e) => setFormData({ ...formData, targetEndDate: e.target.value })}
                      min={formData.startDate}
                    />
                    <p className="text-xs text-slate-400 mt-1">Expected completion date</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Actual End Date</label>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      min={formData.startDate}
                    />
                    <p className="text-xs text-slate-400 mt-1">When project actually ended</p>
                  </div>
                </div>
              </div>

              {/* Section 5: Financial Details */}
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="text-lg font-semibold text-white mb-4">💰 Financial Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Budget Allocated ($)</label>
                    <Input
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                    <p className="text-xs text-slate-400 mt-1">Total approved budget</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Actual Cost ($)</label>
                    <Input
                      type="number"
                      value={formData.actualCost}
                      onChange={(e) => setFormData({ ...formData, actualCost: e.target.value })}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                    <p className="text-xs text-slate-400 mt-1">Cumulative spending to date</p>
                  </div>
                </div>
                {formData.budget && formData.actualCost && (
                  <div className="mt-3 p-3 bg-slate-950/50 rounded-lg">
                    <p className="text-sm text-slate-400">
                      Budget Utilization: <span className="font-semibold text-white">
                        {((parseFloat(formData.actualCost) / parseFloat(formData.budget)) * 100).toFixed(1)}%
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Section 6: Tags */}
              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="text-lg font-semibold text-white mb-4">🏷️ Tags & Labels</h3>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Tags</label>
                  <Input
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="Enter tags separated by commas (e.g., urgent, high-risk, cloud-based)"
                  />
                  <p className="text-xs text-slate-400 mt-1">Add comma-separated tags for easy filtering and organization</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t border-slate-800">
                <Button type="submit" className="flex-1 bg-blue-900/200 hover:bg-blue-700 text-base py-3">
                  {currentProject ? '💾 Update Project' : '➕ Create Project'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1 text-base py-3">
                  ❌ Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-red-900/20 flex items-center justify-center">
                <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Delete Project</h3>
                <p className="text-sm text-slate-400">
                  Are you sure you want to delete this project? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={confirmDelete} className="flex-1 bg-red-600 hover:bg-red-700">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
