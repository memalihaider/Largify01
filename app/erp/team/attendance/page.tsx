'use client';

import { useState, useMemo } from 'react';
import { Card, Button, Badge, Input } from '@/components/ui';
import { mockUsers } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

type AttendanceStatus = 'present' | 'absent' | 'late' | 'leave' | 'remote';

interface AttendanceRecord {
  userId: string;
  date: Date;
  status: AttendanceStatus;
  checkIn?: string;
  checkOut?: string;
  hours?: number;
  notes?: string;
}

const statusColors: Record<AttendanceStatus, string> = {
  present: 'bg-green-100 text-green-700',
  absent: 'bg-red-100 text-red-700',
  late: 'bg-yellow-100 text-yellow-700',
  leave: 'bg-blue-100 text-blue-700',
  remote: 'bg-purple-100 text-purple-700',
};

const statusIcons: Record<AttendanceStatus, string> = {
  present: '✓',
  absent: '✕',
  late: '⏱',
  leave: '📅',
  remote: '🏠',
};

// Initialize attendance records for today with marketing team marked present
const today = new Date();
const initializeAttendance = (): AttendanceRecord[] => {
  const marketingUsers = mockUsers.filter(u => u.department === 'Sales'); // Sales department for marketing
  const otherUsers = mockUsers.filter(u => u.department !== 'Sales');

  return [
    ...marketingUsers.map(user => ({
      userId: user.id,
      date: new Date(today),
      status: 'present' as const,
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
      hours: 8,
      notes: 'Marked present',
    })),
    ...otherUsers.map((user, idx) => ({
      userId: user.id,
      date: new Date(today),
      status: (idx % 3 === 0 ? 'remote' : idx % 2 === 0 ? 'present' : 'late') as AttendanceStatus,
      checkIn: idx % 3 === 0 ? '08:30 AM' : idx % 2 === 0 ? '09:00 AM' : '09:45 AM',
      checkOut: idx % 3 === 0 ? undefined : '06:00 PM',
      hours: idx % 3 === 0 ? 7.5 : idx % 2 === 0 ? 8 : 7.25,
      notes: idx % 3 === 0 ? 'Working from home' : '',
    })),
  ];
};

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(initializeAttendance());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(today));
  const [view, setView] = useState<'today' | 'week' | 'month' | 'calendar'>('today');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showBulkMarkModal, setShowBulkMarkModal] = useState(false);

  // Get departments
  const departments = useMemo(() => {
    const depts = Array.from(new Set(mockUsers.map(u => u.department || 'Other').filter(d => d))).sort();
    return ['all', ...depts];
  }, []);

  // Filter attendance records
  const filteredAttendance = useMemo(() => {
    return attendance.filter(record => {
      const user = mockUsers.find(u => u.id === record.userId);
      if (!user) return false;

      const matchesSearch = 
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment = departmentFilter === 'all' || user.department === departmentFilter;
      const matchesStatus = statusFilter === 'all' || record.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [attendance, searchQuery, departmentFilter, statusFilter]);

  // Statistics
  const stats = useMemo(() => {
    const present = attendance.filter(a => a.status === 'present').length;
    const remote = attendance.filter(a => a.status === 'remote').length;
    const late = attendance.filter(a => a.status === 'late').length;
    const absent = attendance.filter(a => a.status === 'absent').length;
    const leave = attendance.filter(a => a.status === 'leave').length;
    const avgHours = attendance.reduce((sum, a) => sum + (a.hours || 0), 0) / (attendance.length || 1);

    return { present, remote, late, absent, leave, avgHours };
  }, [attendance]);

  const handleStatusChange = (userId: string, newStatus: AttendanceStatus) => {
    setAttendance(prev => prev.map(a => 
      a.userId === userId ? { ...a, status: newStatus } : a
    ));
    setEditingId(null);
  };

  const handleCheckIn = (userId: string) => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setAttendance(prev => prev.map(a =>
      a.userId === userId ? { ...a, checkIn: time, status: 'present' } : a
    ));
  };

  const handleCheckOut = (userId: string) => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const record = attendance.find(a => a.userId === userId);
    if (record?.checkIn) {
      const [inHour, inMin] = record.checkIn.split(':').map(x => parseInt(x));
      const [outHour, outMin] = time.split(':').map(x => parseInt(x));
      const hours = (outHour - inHour) + (outMin - inMin) / 60;
      
      setAttendance(prev => prev.map(a =>
        a.userId === userId ? { ...a, checkOut: time, hours: Math.max(0, hours) } : a
      ));
    }
  };

  const handleMarkDepartmentPresent = (dept: string) => {
    const deptUsers = mockUsers.filter(u => u.department === dept).map(u => u.id);
    setAttendance(prev => prev.map(a => {
      if (deptUsers.includes(a.userId)) {
        return {
          ...a,
          status: 'present' as const,
          checkIn: '09:00 AM',
          checkOut: '06:00 PM',
          hours: 8,
        };
      }
      return a;
    }));
    setShowBulkMarkModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Attendance</h1>
          <p className="text-gray-500">Track and manage employee attendance</p>
        </div>
        <Button onClick={() => setShowBulkMarkModal(true)} className="flex gap-2">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Mark Department
        </Button>
      </div>

      {/* View Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {['today', 'week', 'month', 'calendar'].map((v) => (
          <button
            key={v}
            onClick={() => setView(v as any)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
              view === v
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            )}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="p-4">
          <p className="text-xs text-gray-500">Present</p>
          <p className="text-2xl font-bold text-green-600">{stats.present}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-gray-500">Remote</p>
          <p className="text-2xl font-bold text-purple-600">{stats.remote}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-gray-500">Late</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.late}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-gray-500">Leave</p>
          <p className="text-2xl font-bold text-blue-600">{stats.leave}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-gray-500">Absent</p>
          <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-gray-500">Avg Hours</p>
          <p className="text-2xl font-bold text-gray-900">{stats.avgHours.toFixed(1)}h</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="space-y-4">
          <Input
            placeholder="Search employee name, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="present">Present</option>
                <option value="remote">Remote</option>
                <option value="late">Late</option>
                <option value="leave">Leave</option>
                <option value="absent">Absent</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Attendance Table */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Attendance - {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </h3>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAttendance.map((record) => {
                  const user = mockUsers.find(u => u.id === record.userId);
                  if (!user) return null;

                  return (
                    <tr key={record.userId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="font-medium text-gray-900">{user.fullName}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">{user.department}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative">
                          <button
                            onClick={() => setEditingId(editingId === record.userId ? null : record.userId)}
                            className={cn(
                              'px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1',
                              statusColors[record.status]
                            )}
                          >
                            {statusIcons[record.status]} {record.status}
                          </button>
                          {editingId === record.userId && (
                            <div className="absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-2 space-y-1">
                              {(['present', 'remote', 'late', 'leave', 'absent'] as AttendanceStatus[]).map((status) => (
                                <button
                                  key={status}
                                  onClick={() => handleStatusChange(record.userId, status)}
                                  className={cn(
                                    'block w-full text-left px-3 py-2 rounded text-sm',
                                    record.status === status ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                                  )}
                                >
                                  {status}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.checkIn || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.checkOut || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {record.hours ? `${record.hours.toFixed(1)}h` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCheckIn(record.userId)}
                            className="text-green-600 hover:bg-green-50"
                          >
                            In
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCheckOut(record.userId)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            Out
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Bulk Mark Modal */}
      {showBulkMarkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Mark Department Present</h2>
              <div className="space-y-2 mb-6">
                {departments.filter(d => d !== 'all').map((dept) => (
                  <button
                    key={dept}
                    onClick={() => handleMarkDepartmentPresent(dept)}
                    className="w-full px-4 py-2 text-left border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    <p className="font-medium text-gray-900">{dept}</p>
                    <p className="text-xs text-gray-500">
                      {mockUsers.filter(u => u.department === dept).length} members
                    </p>
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowBulkMarkModal(false)}
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
