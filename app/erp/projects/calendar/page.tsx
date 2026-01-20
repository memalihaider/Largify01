'use client';

import { useState } from 'react';
import { Card, Badge } from '@/components/ui';
import { mockProjects, mockTasks, mockUsers } from '@/lib/mock-data';

export default function ProjectsCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 19)); // January 19, 2026
  const [view, setView] = useState<'month' | 'week'>('month');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [showTasksModal, setShowTasksModal] = useState(false);

  // Get all tasks with due dates
  const tasksWithDates = mockTasks.filter(task => task.dueDate);

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const totalSlots = Math.ceil((daysInMonth + firstDay) / 7) * 7;

  // Get tasks for a specific date
  const getTasksForDate = (day: number) => {
    const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return tasksWithDates.filter(task => {
      const taskDate = new Date(task.dueDate!);
      return taskDate.getDate() === day &&
             taskDate.getMonth() === currentDate.getMonth() &&
             taskDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const today = new Date(2026, 0, 19);
  const isToday = (day: number) => {
    return day === today.getDate() &&
           currentDate.getMonth() === today.getMonth() &&
           currentDate.getFullYear() === today.getFullYear();
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
    setShowTasksModal(true);
  };

  const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Calendar</h1>
          <p className="text-gray-500">Track project tasks and milestones</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView('month')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'month'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setView('week')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'week'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Week
          </button>
        </div>
      </div>

      {/* Calendar Card */}
      <Card variant="bordered">
        {/* Calendar Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <button
            onClick={previousMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="p-4">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: totalSlots }).map((_, index) => {
              const day = index - firstDay + 1;
              const isValidDay = day > 0 && day <= daysInMonth;
              const dayTasks = isValidDay ? getTasksForDate(day) : [];

              return (
                <div
                  key={index}
                  onClick={() => isValidDay && handleDateClick(day)}
                  className={`min-h-24 p-2 rounded-lg border cursor-pointer transition-all ${
                    isValidDay
                      ? isToday(day)
                        ? 'bg-blue-50 border-blue-300 hover:shadow-md'
                        : 'bg-white border-gray-200 hover:bg-gray-50 hover:shadow-md'
                      : 'bg-gray-50 border-transparent cursor-default'
                  }`}
                >
                  {isValidDay && (
                    <>
                      <div className={`text-sm font-medium mb-1 ${
                        isToday(day) ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {day}
                      </div>
                      <div className="space-y-1">
                        {dayTasks.slice(0, 3).map(task => (
                          <div
                            key={task.id}
                            className="text-xs p-1 rounded bg-blue-100 text-blue-800 truncate"
                            title={task.title}
                          >
                            {task.title}
                          </div>
                        ))}
                        {dayTasks.length > 3 && (
                          <div className="text-xs text-gray-500">
                            +{dayTasks.length - 3} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Date Tasks Modal */}
      {showTasksModal && selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-linear-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between border-b border-blue-800">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  📅 {monthNames[currentDate.getMonth()]} {selectedDate}, {currentDate.getFullYear()}
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  {selectedDateTasks.length} task{selectedDateTasks.length !== 1 ? 's' : ''} on this date
                </p>
              </div>
              <button 
                onClick={() => setShowTasksModal(false)} 
                className="text-blue-100 hover:text-white transition"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {selectedDateTasks.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="h-12 w-12 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500 text-lg font-medium">No tasks on this date</p>
                  <p className="text-gray-400 text-sm mt-1">All caught up! 🎉</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedDateTasks.map(task => {
                    const project = mockProjects.find(p => p.id === task.projectId);
                    const statusColors: Record<string, string> = {
                      todo: 'bg-gray-100 text-gray-700',
                      in_progress: 'bg-blue-100 text-blue-700',
                      review: 'bg-yellow-100 text-yellow-700',
                      done: 'bg-green-100 text-green-700',
                      blocked: 'bg-red-100 text-red-700',
                    };
                    const priorityColors: Record<string, string> = {
                      low: 'bg-blue-100 text-blue-700',
                      medium: 'bg-yellow-100 text-yellow-700',
                      high: 'bg-orange-100 text-orange-700',
                      critical: 'bg-red-100 text-red-700',
                    };
                    
                    return (
                      <div key={task.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-lg">{task.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">{project?.name}</p>
                          </div>
                          {task.status === 'done' && (
                            <svg className="h-5 w-5 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        {task.description && (
                          <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                        )}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[task.status] || 'bg-gray-100 text-gray-700'}`}>
                            {task.status.replace('_', ' ')}
                          </span>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority] || 'bg-gray-100 text-gray-700'}`}>
                            {task.priority}
                          </span>
                          {task.estimatedHours && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                              ⏱️ {task.estimatedHours}h
                            </span>
                          )}
                        </div>
                        {task.assignedToId && (
                          <p className="text-xs text-gray-500">
                            Assigned to: {mockUsers.find(u => u.id === task.assignedToId)?.fullName || 'Unknown'}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
