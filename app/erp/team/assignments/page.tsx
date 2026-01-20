'use client';

import { useState } from 'react';
import { Card, Badge, Button, Input } from '@/components/ui';
import { mockEmployees, mockProjectPhases, mockProjectMilestones, mockTasks, mockUsers } from '@/lib/mock-data';
import Link from 'next/link';

export default function AdminAssignmentsPage() {
  const [assignmentType, setAssignmentType] = useState<'task' | 'milestone'>('task');
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [estimatedHours, setEstimatedHours] = useState('');
  const [responsibility, setResponsibility] = useState('deliverable');

  const [assignments, setAssignments] = useState<any[]>([
    // Pre-filled with mock data
    { id: 'taskas-001', type: 'task', assignedTo: 'emp-001', itemId: 'task-001', status: 'in_progress', dueDate: '2026-01-25' },
    { id: 'taskas-002', type: 'task', assignedTo: 'emp-002', itemId: 'task-002', status: 'assigned', dueDate: '2026-02-10' },
    { id: 'mileas-001', type: 'milestone', assignedTo: 'emp-001', itemId: 'mile-001', status: 'in_progress', dueDate: '2026-01-20' },
  ]);

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedEmployee || !selectedItem || !dueDate) {
      alert('Please fill all required fields');
      return;
    }

    const newAssignment = {
      id: `assign-${Date.now()}`,
      type: assignmentType,
      assignedTo: selectedEmployee,
      itemId: selectedItem,
      status: 'assigned',
      dueDate,
      ...(assignmentType === 'task' && { priority, estimatedHours: parseFloat(estimatedHours) || 0 }),
      ...(assignmentType === 'milestone' && { responsibility }),
    };

    setAssignments([...assignments, newAssignment]);
    
    // Reset form
    setSelectedEmployee('');
    setSelectedItem('');
    setDueDate('');
    setEstimatedHours('');
    setPriority('medium');
    setResponsibility('deliverable');
    setShowForm(false);
  };

  const handleRemove = (id: string) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const getEmployeeName = (id: string) => {
    const emp = mockUsers.find(u => u.id === id);
    return emp ? `${emp.firstName} ${emp.lastName}` : 'Unknown';
  };

  const getItemName = (type: string, id: string) => {
    if (type === 'task') {
      return `Task: ${id}`;
    } else {
      const milestone = mockProjectMilestones.find(m => m.id === id);
      return milestone ? milestone.milestoneName : `Milestone: ${id}`;
    }
  };

  const filteredAssignments = assignments;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Team Assignments</h1>
        <p className="text-gray-600 mt-2">Manage project tasks and milestone assignments for your team</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4">
          <p className="text-sm text-gray-600">Total Assignments</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">{assignments.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Task Assignments</p>
          <p className="text-3xl font-bold text-green-600 mt-1">{assignments.filter(a => a.type === 'task').length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Milestone Assignments</p>
          <p className="text-3xl font-bold text-purple-600 mt-1">{assignments.filter(a => a.type === 'milestone').length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Team Members</p>
          <p className="text-3xl font-bold text-orange-600 mt-1">
            {new Set(assignments.map(a => a.assignedTo)).size}
          </p>
        </Card>
      </div>

      {/* New Assignment Button */}
      <div className="mb-6">
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {showForm ? 'Cancel' : '+ New Assignment'}
        </Button>
      </div>

      {/* New Assignment Form */}
      {showForm && (
        <Card className="p-6 mb-8 border-2 border-blue-200 bg-blue-50">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Assignment</h2>
          <form onSubmit={handleAssign} className="space-y-4">
            {/* Type Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="task"
                      checked={assignmentType === 'task'}
                      onChange={(e) => setAssignmentType(e.target.value as 'task' | 'milestone')}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700">Task</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="milestone"
                      checked={assignmentType === 'milestone'}
                      onChange={(e) => setAssignmentType(e.target.value as 'task' | 'milestone')}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700">Milestone</span>
                  </label>
                </div>
              </div>

              {/* Employee Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assign To Employee *</label>
                <select
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select employee...</option>
                  {mockUsers.filter(u => u.id.startsWith('emp')).map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.firstName} {emp.lastName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Item Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select {assignmentType === 'task' ? 'Task' : 'Milestone'} *
              </label>
              <select
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select {assignmentType}...</option>
                {assignmentType === 'task'
                  ? mockTasks.slice(0, 5).map(task => (
                      <option key={task.id} value={task.id}>
                        {task.title}
                      </option>
                    ))
                  : mockProjectMilestones.slice(0, 5).map(mile => (
                      <option key={mile.id} value={mile.id}>
                        {mile.milestoneName}
                      </option>
                    ))}
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            {/* Task-Specific Fields */}
            {assignmentType === 'task' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Hours</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.5"
                    value={estimatedHours}
                    onChange={(e) => setEstimatedHours(e.target.value)}
                    placeholder="e.g., 8"
                  />
                </div>
              </div>
            )}

            {/* Milestone-Specific Fields */}
            {assignmentType === 'milestone' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Responsibility Type</label>
                <select
                  value={responsibility}
                  onChange={(e) => setResponsibility(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="deliverable">Deliverable</option>
                  <option value="review">Review</option>
                  <option value="approval">Approval</option>
                  <option value="coordination">Coordination</option>
                </select>
              </div>
            )}

            {/* Submit */}
            <div className="flex gap-2">
              <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                Create Assignment
              </Button>
              <Button
                type="button"
                onClick={() => setShowForm(false)}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Assignments List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Active Assignments</h2>
        
        {filteredAssignments.length > 0 ? (
          <div className="space-y-3">
            {filteredAssignments.map(assignment => (
              <Card key={assignment.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={assignment.type === 'task' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}>
                        {assignment.type}
                      </Badge>
                      <Badge className={getStatusColor(assignment.status)}>
                        {assignment.status}
                      </Badge>
                      {assignment.priority && (
                        <Badge className={
                          assignment.priority === 'urgent' || assignment.priority === 'high'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }>
                          {assignment.priority}
                        </Badge>
                      )}
                    </div>
                    <p className="font-semibold text-gray-900 mb-1">
                      {getItemName(assignment.type, assignment.itemId)}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Assigned to: <strong>{getEmployeeName(assignment.assignedTo)}</strong></span>
                      <span>Due: <strong>{new Date(assignment.dueDate).toLocaleDateString()}</strong></span>
                      {assignment.estimatedHours && (
                        <span>Est: <strong>{assignment.estimatedHours}h</strong></span>
                      )}
                      {assignment.responsibility && (
                        <span>Role: <strong>{assignment.responsibility}</strong></span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-blue-600 hover:bg-blue-50"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => handleRemove(assignment.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center text-gray-500">
            No assignments yet. Create one to get started!
          </Card>
        )}
      </div>

      {/* Team Workload Summary */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Team Workload Summary</h2>
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from(new Set(assignments.map(a => a.assignedTo))).map(empId => {
              const empAssignments = assignments.filter(a => a.assignedTo === empId);
              const taskCount = empAssignments.filter(a => a.type === 'task').length;
              const milestoneCount = empAssignments.filter(a => a.type === 'milestone').length;

              return (
                <div key={empId} className="p-4 border border-gray-200 rounded-lg">
                  <p className="font-semibold text-gray-900">{getEmployeeName(empId)}</p>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p>Tasks: <strong className="text-blue-600">{taskCount}</strong></p>
                    <p>Milestones: <strong className="text-purple-600">{milestoneCount}</strong></p>
                    <p>Total: <strong className="text-green-600">{empAssignments.length}</strong></p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
