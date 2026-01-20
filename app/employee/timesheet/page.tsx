'use client';

import { useState } from 'react';
import { Card, Badge, Button, Input } from '@/components/ui';
import { mockTimeEntries, mockTasks, mockProjects, mockUsers, mockEmployees } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

// Current employee (Sarah Chen - emp-002, usr-002)
const currentEmployee = mockEmployees[1];
const currentUser = mockUsers.find(u => u.id === currentEmployee.userId) || mockUsers[1];

// Filter time entries for current user
const myTimeEntries = mockTimeEntries.filter(t => t.userId === currentUser.id);

// Get my tasks for logging time
const myTasks = mockTasks.filter(t => t.assignedTo === currentUser.id || t.assignedToId === currentUser.id);

export default function TimesheetPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<Date>(new Date());
  const [newEntry, setNewEntry] = useState({
    taskId: '',
    hours: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    billable: true,
  });

  // Get week range
  const getWeekRange = (date: Date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return { start, end };
  };

  const weekRange = getWeekRange(selectedWeek);

  // Filter entries for selected week
  const weekEntries = myTimeEntries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate >= weekRange.start && entryDate <= weekRange.end;
  });

  // Calculate totals
  const totalHours = weekEntries.reduce((sum, e) => sum + e.hours, 0);
  const billableHours = weekEntries.filter(e => e.billable).reduce((sum, e) => sum + e.hours, 0);

  // Group entries by date
  const entriesByDate: Record<string, typeof myTimeEntries> = {};
  weekEntries.forEach(entry => {
    const dateKey = new Date(entry.date).toISOString().split('T')[0];
    if (!entriesByDate[dateKey]) {
      entriesByDate[dateKey] = [];
    }
    entriesByDate[dateKey].push(entry);
  });

  // Generate week days
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(weekRange.start);
    day.setDate(day.getDate() + i);
    weekDays.push(day);
  }

  const handlePrevWeek = () => {
    const newDate = new Date(selectedWeek);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedWeek(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(selectedWeek);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedWeek(newDate);
  };

  const handleAddEntry = () => {
    // In real app, would save to backend
    console.log('Adding entry:', newEntry);
    setShowAddModal(false);
    setNewEntry({
      taskId: '',
      hours: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      billable: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Time Tracking</h1>
          <p className="text-gray-500">Log and manage your working hours</p>
        </div>
        <Button 
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Log Time
        </Button>
      </div>

      {/* Week Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="bordered" className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalHours}h</p>
              <p className="text-sm text-gray-500">Total Hours</p>
            </div>
          </div>
        </Card>
        <Card variant="bordered" className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{billableHours}h</p>
              <p className="text-sm text-gray-500">Billable Hours</p>
            </div>
          </div>
        </Card>
        <Card variant="bordered" className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{weekEntries.length}</p>
              <p className="text-sm text-gray-500">Entries</p>
            </div>
          </div>
        </Card>
        <Card variant="bordered" className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{Math.round(totalHours / 5)}h</p>
              <p className="text-sm text-gray-500">Avg/Day</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Week Navigation */}
      <Card variant="bordered" className="p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevWeek}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              {weekRange.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {weekRange.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </h2>
            <button 
              onClick={() => setSelectedWeek(new Date())}
              className="text-sm text-green-600 hover:text-green-700"
            >
              Go to current week
            </button>
          </div>
          <button
            onClick={handleNextWeek}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </Card>

      {/* Weekly View */}
      <Card variant="bordered">
        <div className="grid grid-cols-7 divide-x divide-gray-200">
          {weekDays.map((day, index) => {
            const dateKey = day.toISOString().split('T')[0];
            const dayEntries = entriesByDate[dateKey] || [];
            const dayTotal = dayEntries.reduce((sum, e) => sum + e.hours, 0);
            const isToday = day.toDateString() === new Date().toDateString();

            return (
              <div key={index} className="min-h-50">
                {/* Day Header */}
                <div className={cn(
                  'p-3 text-center border-b',
                  isToday ? 'bg-green-50' : 'bg-gray-50'
                )}>
                  <p className={cn(
                    'text-sm font-medium',
                    isToday ? 'text-green-700' : 'text-gray-700'
                  )}>
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <p className={cn(
                    'text-lg font-bold',
                    isToday ? 'text-green-700' : 'text-gray-900'
                  )}>
                    {day.getDate()}
                  </p>
                  {dayTotal > 0 && (
                    <p className="text-xs text-gray-500 mt-1">{dayTotal}h logged</p>
                  )}
                </div>

                {/* Day Entries */}
                <div className="p-2 space-y-2">
                  {dayEntries.map(entry => {
                    const task = mockTasks.find(t => t.id === entry.taskId);
                    const project = mockProjects.find(p => p.id === entry.projectId);
                    return (
                      <div
                        key={entry.id}
                        className="p-2 bg-gray-50 rounded text-xs hover:bg-gray-100 cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-green-600">{entry.hours}h</span>
                          {entry.billable && (
                            <span className="px-1 bg-green-100 text-green-700 rounded text-[10px]">$</span>
                          )}
                        </div>
                        <p className="text-gray-700 truncate">{entry.description || task?.title}</p>
                        <p className="text-gray-400 truncate">{project?.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* All Entries List */}
      <Card variant="bordered">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">All Time Entries</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Project</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Task</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Description</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Hours</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Billable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {myTimeEntries
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map(entry => {
                    const task = mockTasks.find(t => t.id === entry.taskId);
                    const project = mockProjects.find(p => p.id === entry.projectId);
                    return (
                      <tr key={entry.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{project?.name || '-'}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{task?.title || '-'}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{entry.description || '-'}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-gray-900">{entry.hours}h</td>
                        <td className="py-3 px-4 text-center">
                          {entry.billable ? (
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Yes</span>
                          ) : (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">No</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Add Time Entry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Card variant="bordered" className="w-full max-w-md mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Log Time</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Task</label>
                  <select
                    value={newEntry.taskId}
                    onChange={(e) => setNewEntry({ ...newEntry, taskId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select a task...</option>
                    {myTasks.filter(t => t.status !== 'done').map(task => {
                      const project = mockProjects.find(p => p.id === task.projectId);
                      return (
                        <option key={task.id} value={task.id}>
                          {task.title} ({project?.name})
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="24"
                    value={newEntry.hours}
                    onChange={(e) => setNewEntry({ ...newEntry, hours: e.target.value })}
                    placeholder="Enter hours..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newEntry.description}
                    onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                    rows={3}
                    placeholder="What did you work on?"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="billable"
                    checked={newEntry.billable}
                    onChange={(e) => setNewEntry({ ...newEntry, billable: e.target.checked })}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="billable" className="ml-2 text-sm text-gray-700">
                    Billable hours
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={handleAddEntry}
                >
                  Save Entry
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
