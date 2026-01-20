'use client';

import { useState } from 'react';
import { Card, Button, Input, Badge, Avatar, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui';
import { mockTasks as initialMockTasks, mockMilestones, mockProjects, mockUsers } from '@/lib/mock-data';
import { cn, priorityColors } from '@/lib/utils';

const statusFilters = [
  { value: 'all', label: 'All Tasks' },
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'review', label: 'In Review' },
  { value: 'done', label: 'Done' },
];

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
];

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'review', label: 'Review' },
  { value: 'done', label: 'Done' },
  { value: 'blocked', label: 'Blocked' },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialMockTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'board'>('list');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentTask, setCurrentTask] = useState<any>(null);
  const [draggedTask, setDraggedTask] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    milestoneId: '',
    assignedToId: '',
    priority: 'medium',
    status: 'todo',
    dueDate: '',
    estimatedHours: '',
  });

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const getMilestone = (milestoneId: string) => {
    return mockMilestones.find(m => m.id === milestoneId);
  };

  const getProject = (milestoneId: string) => {
    const milestone = getMilestone(milestoneId);
    return milestone ? mockProjects.find(p => p.id === milestone.projectId) : null;
  };

  const getAssignee = (userId?: string) => {
    return userId ? mockUsers.find(u => u.id === userId) : null;
  };

  const handleOpenModal = (task?: any) => {
    if (task) {
      setCurrentTask(task);
      setFormData({
        title: task.title || '',
        description: task.description || '',
        milestoneId: task.milestoneId || '',
        assignedToId: task.assignedToId || '',
        priority: task.priority || 'medium',
        status: task.status || 'todo',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        estimatedHours: task.estimatedHours?.toString() || '',
      });
    } else {
      setCurrentTask(null);
      setFormData({
        title: '',
        description: '',
        milestoneId: '',
        assignedToId: '',
        priority: 'medium',
        status: 'todo',
        dueDate: '',
        estimatedHours: '',
      });
    }
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentTask) {
      // Update existing task
      setTasks(tasks.map(t => 
        t.id === currentTask.id 
          ? {
              ...t,
              title: formData.title,
              description: formData.description,
              milestoneId: formData.milestoneId,
              assignedToId: formData.assignedToId,
              assignedTo: formData.assignedToId,
              priority: formData.priority as any,
              status: formData.status as any,
              dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
              estimatedHours: formData.estimatedHours ? parseInt(formData.estimatedHours) : undefined,
            }
          : t
      ));
      alert('Task updated successfully!');
    } else {
      // Create new task
      const newTask = {
        id: `task-${Date.now()}`,
        projectId: formData.milestoneId ? getMilestone(formData.milestoneId)?.projectId || '' : '',
        milestoneId: formData.milestoneId,
        title: formData.title,
        description: formData.description,
        status: formData.status as any,
        priority: formData.priority as any,
        assignedTo: formData.assignedToId,
        assignedToId: formData.assignedToId,
        estimatedHours: formData.estimatedHours ? parseInt(formData.estimatedHours) : 0,
        actualHours: 0,
        dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
        tags: [],
        orderIndex: tasks.length + 1,
        createdAt: new Date(),
      };
      setTasks([...tasks, newTask]);
      alert('Task created successfully!');
    }
    setShowModal(false);
  };

  const handleDelete = (taskId: string) => {
    setCurrentTask(tasks.find(t => t.id === taskId));
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (currentTask) {
      setTasks(tasks.filter(t => t.id !== currentTask.id));
      alert('Task deleted successfully!');
    }
    setShowDeleteConfirm(false);
    setCurrentTask(null);
  };

  const handleQuickStatusChange = (taskId: string, newStatus: string) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, status: newStatus as any } : t
    ));
  };

  const handleQuickPriorityChange = (taskId: string, newPriority: string) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, priority: newPriority as any } : t
    ));
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, task: any) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== newStatus) {
      setTasks(tasks.map(t => 
        t.id === draggedTask.id ? { ...t, status: newStatus as any } : t
      ));
    }
    setDraggedTask(null);
  };

  const statusColumns = [
    { id: 'todo', name: 'To Do', color: 'bg-gray-100' },
    { id: 'in_progress', name: 'In Progress', color: 'bg-blue-100' },
    { id: 'review', name: 'Review', color: 'bg-yellow-100' },
    { id: 'done', name: 'Done', color: 'bg-green-100' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-500">Manage tasks across all projects</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'px-3 py-2 text-sm',
                viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-50'
              )}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('board')}
              className={cn(
                'px-3 py-2 text-sm',
                viewMode === 'board' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-50'
              )}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
            </button>
          </div>
          <Button onClick={() => handleOpenModal()}>
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Task
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-500">Total Tasks</p>
          <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">To Do</p>
          <p className="text-2xl font-bold text-gray-600">
            {tasks.filter(t => t.status === 'todo').length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">In Progress</p>
          <p className="text-2xl font-bold text-blue-600">
            {tasks.filter(t => t.status === 'in_progress').length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-green-600">
            {tasks.filter(t => t.status === 'done').length}
          </p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {statusFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setStatusFilter(filter.value)}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors',
                  statusFilter === filter.value
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* List View */}
      {viewMode === 'list' && (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => {
                const project = task.milestoneId ? getProject(task.milestoneId) : undefined;
                const assignee = getAssignee(task.assignedToId);
                
                return (
                  <TableRow key={task.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={task.status === 'done'}
                        onChange={(e) => handleQuickStatusChange(task.id, e.target.checked ? 'done' : 'todo')}
                      />
                    </TableCell>
                    <TableCell>
                      <p className={cn(
                        'font-medium',
                        task.status === 'done' ? 'text-gray-400 line-through' : 'text-gray-900'
                      )}>
                        {task.title}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-gray-600">{project?.name || '-'}</p>
                    </TableCell>
                    <TableCell>
                      <select
                        value={task.priority}
                        onChange={(e) => handleQuickPriorityChange(task.id, e.target.value)}
                        className="px-2 py-1 text-xs rounded-lg border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {priorityOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </TableCell>
                    <TableCell>
                      <select
                        value={task.status}
                        onChange={(e) => handleQuickStatusChange(task.id, e.target.value)}
                        className="px-2 py-1 text-xs rounded-lg border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {statusOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </TableCell>
                    <TableCell>
                      <p className={cn(
                        'text-sm',
                        task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done'
                          ? 'text-red-600 font-medium'
                          : 'text-gray-500'
                      )}>
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US') : '-'}
                      </p>
                    </TableCell>
                    <TableCell>
                      {assignee ? (
                        <Avatar
                          src={assignee.avatarUrl}
                          fallback={assignee.fullName?.split(' ').map(n => n[0]).join('') || '?'}
                          size="sm"
                        />
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <button 
                          onClick={() => handleOpenModal(task)}
                          className="p-1 text-gray-400 hover:text-blue-600"
                          title="Edit"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleDelete(task.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                          title="Delete"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {filteredTasks.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <p>No tasks found</p>
            </div>
          )}
        </Card>
      )}

      {/* Board View */}
      {viewMode === 'board' && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {statusColumns.map((column) => {
              const columnTasks = getTasksByStatus(column.id);
              
              return (
                <div 
                  key={column.id} 
                  className="w-72 shrink-0"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, column.id)}
                >
                  <div className={cn('rounded-t-lg p-4', column.color)}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{column.name}</h3>
                      <Badge variant="secondary" className="bg-white/50">
                        {columnTasks.length}
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-b-lg p-2 min-h-125 space-y-2">
                    {columnTasks.map((task) => {
                      const project = task.milestoneId ? getProject(task.milestoneId) : undefined;
                      const assignee = getAssignee(task.assignedToId);
                      const isDragging = draggedTask?.id === task.id;
                      
                      return (
                        <Card 
                          key={task.id} 
                          className={cn(
                            "p-4 cursor-move hover:shadow-md transition-all",
                            isDragging && "opacity-50 scale-95"
                          )}
                          draggable
                          onDragStart={(e) => handleDragStart(e, task)}
                          onDragEnd={handleDragEnd}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <p className="font-medium text-gray-900 flex-1">{task.title}</p>
                            <div className="flex gap-1 ml-2">
                              <button 
                                onClick={() => handleOpenModal(task)}
                                className="p-1 text-gray-400 hover:text-blue-600"
                                title="Edit"
                              >
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button 
                                onClick={() => handleDelete(task.id)}
                                className="p-1 text-gray-400 hover:text-red-600"
                                title="Delete"
                              >
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          {project && (
                            <p className="text-xs text-gray-500 mb-2">{project.name}</p>
                          )}
                          {task.dueDate && (
                            <p className={cn(
                              'text-xs mb-2',
                              new Date(task.dueDate) < new Date() && task.status !== 'done'
                                ? 'text-red-600 font-medium'
                                : 'text-gray-500'
                            )}>
                              Due: {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-3">
                            <select
                              value={task.priority}
                              onChange={(e) => {
                                e.stopPropagation();
                                handleQuickPriorityChange(task.id, e.target.value);
                              }}
                              className="px-2 py-1 text-xs rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {priorityOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                            {assignee && (
                              <Avatar
                                src={assignee.avatarUrl}
                                fallback={assignee.fullName?.split(' ').map(n => n[0]).join('')}
                                size="sm"
                              />
                            )}
                          </div>
                        </Card>
                      );
                    })}
                    {columnTasks.length === 0 && (
                      <div className="text-center py-8 text-gray-400 text-sm">
                        Drop tasks here
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {currentTask ? 'Edit Task' : 'Add New Task'}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <Input
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter task title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter task description"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-25"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Milestone
                    </label>
                    <select
                      value={formData.milestoneId}
                      onChange={(e) => setFormData({ ...formData, milestoneId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">No milestone</option>
                      {mockMilestones.map((milestone) => {
                        const project = mockProjects.find(p => p.id === milestone.projectId);
                        return (
                          <option key={milestone.id} value={milestone.id}>
                            {milestone.name} ({project?.name})
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assignee
                    </label>
                    <select
                      value={formData.assignedToId}
                      onChange={(e) => setFormData({ ...formData, assignedToId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Unassigned</option>
                      {mockUsers.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.fullName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority *
                    </label>
                    <select
                      required
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {priorityOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status *
                    </label>
                    <select
                      required
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {statusOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Due Date
                    </label>
                    <Input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estimated Hours
                    </label>
                    <Input
                      type="number"
                      min="0"
                      step="0.5"
                      value={formData.estimatedHours}
                      onChange={(e) => setFormData({ ...formData, estimatedHours: e.target.value })}
                      placeholder="e.g., 8"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    {currentTask ? 'Update Task' : 'Create Task'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Task</h3>
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this task? This action cannot be undone.
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
