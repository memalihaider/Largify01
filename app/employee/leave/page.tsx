'use client';

import { useState } from 'react';
import { Card, Badge, Button } from '@/components/ui';
import { mockLeaveRequests, mockEmployees, mockUsers } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

// Current employee (Sarah Chen - emp-002, usr-002)
const currentEmployee = mockEmployees[1];
const currentUser = mockUsers.find(u => u.id === currentEmployee.userId) || mockUsers[1];

// Filter leave requests for current employee
const myLeaveRequests = mockLeaveRequests.filter(l => l.employeeId === currentEmployee.id);

// Leave balances (mock data)
const leaveBalances = {
  vacation: { total: 20, used: 5, pending: 5 },
  sick: { total: 10, used: 0, pending: 0 },
  personal: { total: 5, used: 2, pending: 0 },
};

export default function LeavePage() {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [newRequest, setNewRequest] = useState({
    type: 'vacation',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const filteredRequests = statusFilter === 'all'
    ? myLeaveRequests
    : myLeaveRequests.filter(r => r.status === statusFilter);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-700',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      vacation: 'bg-blue-100 text-blue-700',
      sick: 'bg-purple-100 text-purple-700',
      personal: 'bg-orange-100 text-orange-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const handleSubmitRequest = () => {
    // In real app, would save to backend
    console.log('Submitting leave request:', newRequest);
    setShowRequestModal(false);
    setNewRequest({
      type: 'vacation',
      startDate: '',
      endDate: '',
      reason: '',
    });
  };

  const calculateDays = () => {
    if (!newRequest.startDate || !newRequest.endDate) return 0;
    const start = new Date(newRequest.startDate);
    const end = new Date(newRequest.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leave Requests</h1>
          <p className="text-gray-500">Request and manage your time off</p>
        </div>
        <Button 
          onClick={() => setShowRequestModal(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Request Leave
        </Button>
      </div>

      {/* Leave Balances */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Vacation */}
        <Card variant="bordered" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Vacation</h3>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
              {leaveBalances.vacation.total - leaveBalances.vacation.used - leaveBalances.vacation.pending} days left
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Total</span>
              <span className="font-medium">{leaveBalances.vacation.total} days</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Used</span>
              <span className="font-medium text-green-600">{leaveBalances.vacation.used} days</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Pending</span>
              <span className="font-medium text-yellow-600">{leaveBalances.vacation.pending} days</span>
            </div>
            <div className="pt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${((leaveBalances.vacation.used + leaveBalances.vacation.pending) / leaveBalances.vacation.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Sick Leave */}
        <Card variant="bordered" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Sick Leave</h3>
            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
              {leaveBalances.sick.total - leaveBalances.sick.used - leaveBalances.sick.pending} days left
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Total</span>
              <span className="font-medium">{leaveBalances.sick.total} days</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Used</span>
              <span className="font-medium text-green-600">{leaveBalances.sick.used} days</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Pending</span>
              <span className="font-medium text-yellow-600">{leaveBalances.sick.pending} days</span>
            </div>
            <div className="pt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full" 
                  style={{ width: `${((leaveBalances.sick.used + leaveBalances.sick.pending) / leaveBalances.sick.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Personal */}
        <Card variant="bordered" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Personal</h3>
            <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
              {leaveBalances.personal.total - leaveBalances.personal.used - leaveBalances.personal.pending} days left
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Total</span>
              <span className="font-medium">{leaveBalances.personal.total} days</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Used</span>
              <span className="font-medium text-green-600">{leaveBalances.personal.used} days</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Pending</span>
              <span className="font-medium text-yellow-600">{leaveBalances.personal.pending} days</span>
            </div>
            <div className="pt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-600 h-2 rounded-full" 
                  style={{ width: `${((leaveBalances.personal.used + leaveBalances.personal.pending) / leaveBalances.personal.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {['all', 'pending', 'approved', 'rejected'].map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              statusFilter === status
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {status === 'all' ? 'All Requests' : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Leave Requests List */}
      <Card variant="bordered">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">My Requests</h3>
          {filteredRequests.length > 0 ? (
            <div className="space-y-4">
              {filteredRequests.map(request => {
                const approver = request.approvedBy ? mockUsers.find(u => u.id === request.approvedBy) : null;
                return (
                  <div key={request.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(request.type)}`}>
                            {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div>
                            <span className="text-gray-400">From:</span>{' '}
                            {new Date(request.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                          <div>
                            <span className="text-gray-400">To:</span>{' '}
                            {new Date(request.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                          <div>
                            <span className="text-gray-400">Days:</span>{' '}
                            <span className="font-medium">{request.daysCount}</span>
                          </div>
                        </div>
                        {request.reason && (
                          <p className="text-sm text-gray-600 mt-2">
                            <span className="text-gray-400">Reason:</span> {request.reason}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        {request.status === 'pending' && (
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            Cancel
                          </Button>
                        )}
                        {request.status === 'approved' && approver && (
                          <p className="text-xs text-gray-500">
                            Approved by {approver.fullName}
                            <br />
                            {request.approvedAt && new Date(request.approvedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <svg className="h-12 w-12 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p>No leave requests found</p>
            </div>
          )}
        </div>
      </Card>

      {/* Upcoming Holidays */}
      <Card variant="bordered">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Company Holidays</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Presidents Day', date: new Date('2026-02-16') },
              { name: 'Good Friday', date: new Date('2026-04-03') },
              { name: 'Memorial Day', date: new Date('2026-05-25') },
              { name: 'Independence Day', date: new Date('2026-07-03') },
            ].map((holiday, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="font-medium text-gray-900">{holiday.name}</p>
                <p className="text-sm text-gray-500">
                  {holiday.date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Request Leave Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Card variant="bordered" className="w-full max-w-md mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Request Leave</h2>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                  <select
                    value={newRequest.type}
                    onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="vacation">Vacation ({leaveBalances.vacation.total - leaveBalances.vacation.used - leaveBalances.vacation.pending} days available)</option>
                    <option value="sick">Sick Leave ({leaveBalances.sick.total - leaveBalances.sick.used - leaveBalances.sick.pending} days available)</option>
                    <option value="personal">Personal ({leaveBalances.personal.total - leaveBalances.personal.used - leaveBalances.personal.pending} days available)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={newRequest.startDate}
                      onChange={(e) => setNewRequest({ ...newRequest, startDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      value={newRequest.endDate}
                      onChange={(e) => setNewRequest({ ...newRequest, endDate: e.target.value })}
                      min={newRequest.startDate}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                {newRequest.startDate && newRequest.endDate && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      <span className="font-medium">{calculateDays()} day(s)</span> of leave requested
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason (Optional)</label>
                  <textarea
                    value={newRequest.reason}
                    onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
                    rows={3}
                    placeholder="Provide a brief reason for your leave request..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowRequestModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={handleSubmitRequest}
                  disabled={!newRequest.startDate || !newRequest.endDate}
                >
                  Submit Request
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
