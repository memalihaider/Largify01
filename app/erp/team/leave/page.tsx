'use client';

import { useState } from 'react';
import { Card, Button, Badge, Avatar, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Input } from '@/components/ui';
import { mockEmployees, mockUsers } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

type LeaveStatus = 'pending' | 'approved' | 'rejected';
type LeaveType = 'vacation' | 'sick' | 'personal' | 'maternity' | 'paternity';

interface LeaveRequest {
  id: string;
  employeeId: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  status: LeaveStatus;
  reason: string;
}

const initialLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    employeeId: 'emp-001',
    type: 'vacation',
    startDate: '2024-02-15',
    endDate: '2024-02-20',
    days: 5,
    status: 'pending',
    reason: 'Family vacation',
  },
  {
    id: '2',
    employeeId: 'emp-002',
    type: 'sick',
    startDate: '2024-02-10',
    endDate: '2024-02-11',
    days: 2,
    status: 'approved',
    reason: 'Medical appointment',
  },
  {
    id: '3',
    employeeId: 'emp-003',
    type: 'personal',
    startDate: '2024-02-25',
    endDate: '2024-02-25',
    days: 1,
    status: 'pending',
    reason: 'Personal matters',
  },
];

const leaveTypeColors: Record<string, string> = {
  vacation: 'info',
  sick: 'warning',
  personal: 'secondary',
  maternity: 'success',
  paternity: 'success',
};

const statusColors: Record<string, string> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'danger',
};

export default function LeavePage() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<LeaveRequest | null>(null);
  const [formData, setFormData] = useState<{
    employeeId: string;
    type: LeaveType;
    startDate: string;
    endDate: string;
    reason: string;
  }>({
    employeeId: '',
    type: 'vacation',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const filteredRequests = leaveRequests.filter((request) => {
    return statusFilter === 'all' || request.status === statusFilter;
  });

  const getEmployee = (employeeId: string) => {
    const employee = mockEmployees.find(e => e.id === employeeId);
    const user = employee ? mockUsers.find(u => u.id === employee.userId) : null;
    return { employee, user };
  };

  const calculateDays = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleOpenModal = (request?: any) => {
    if (request) {
      setCurrentRequest(request);
      setFormData({
        employeeId: request.employeeId,
        type: request.type,
        startDate: request.startDate,
        endDate: request.endDate,
        reason: request.reason || '',
      });
    } else {
      setCurrentRequest(null);
      setFormData({
        employeeId: '',
        type: 'vacation',
        startDate: '',
        endDate: '',
        reason: '',
      });
    }
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const days = calculateDays(formData.startDate, formData.endDate);
    
    if (currentRequest) {
      // Update existing request
      setLeaveRequests(prev => prev.map(req => 
        req.id === currentRequest.id 
          ? { ...req, ...formData, days }
          : req
      ));
      alert('Leave request updated successfully!');
    } else {
      // Create new request
      const newRequest = {
        id: Date.now().toString(),
        ...formData,
        days,
        status: 'pending' as const,
      };
      setLeaveRequests(prev => [...prev, newRequest]);
      alert('Leave request created successfully!');
    }
    setShowModal(false);
  };

  const handleApprove = (request: any) => {
    setCurrentRequest(request);
    setShowApproveConfirm(true);
  };

  const confirmApprove = () => {
    if (!currentRequest) return;
    setLeaveRequests(prev => prev.map(req => 
      req.id === currentRequest.id 
        ? { ...req, status: 'approved' }
        : req
    ));
    alert('Leave request approved successfully!');
    setShowApproveConfirm(false);
    setCurrentRequest(null);
  };

  const handleReject = (request: LeaveRequest) => {
    setCurrentRequest(request);
    setShowRejectConfirm(true);
  };

  const confirmReject = () => {
    if (!currentRequest) return;
    setLeaveRequests(prev => prev.map(req => 
      req.id === currentRequest.id 
        ? { ...req, status: 'rejected' }
        : req
    ));
    alert('Leave request rejected!');
    setShowRejectConfirm(false);
    setCurrentRequest(null);
  };

  const handleDelete = (request: any) => {
    setCurrentRequest(request);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (!currentRequest) return;
    setLeaveRequests(prev => prev.filter(req => req.id !== currentRequest.id));
    alert('Leave request deleted successfully!');
    setShowDeleteConfirm(false);
    setCurrentRequest(null);
  };

  const handleExport = () => {
    console.log('Exporting leave report...');
    alert('Leave report exported successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-gray-500">Review and manage leave requests</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Leave Report
          </Button>
          <Button onClick={() => handleOpenModal()}>
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Request Leave
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-500">Pending Requests</p>
          <p className="text-2xl font-bold text-yellow-600">
            {leaveRequests.filter(r => r.status === 'pending').length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Approved This Month</p>
          <p className="text-2xl font-bold text-green-600">
            {leaveRequests.filter(r => r.status === 'approved').length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Currently On Leave</p>
          <p className="text-2xl font-bold text-blue-600">1</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Total Days Off (Month)</p>
          <p className="text-2xl font-bold text-gray-900">
            {leaveRequests.reduce((sum, r) => sum + r.days, 0)}
          </p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {['all', 'pending', 'approved', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors capitalize',
                statusFilter === status
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {status === 'all' ? 'All Requests' : status}
            </button>
          ))}
        </div>
      </Card>

      {/* Leave Requests Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Days</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => {
              const { employee, user } = getEmployee(request.employeeId);
              
              return (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={user?.avatarUrl}
                        fallback={user?.fullName?.split(' ').map(n => n[0]).join('') || '?'}
                        size="sm"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{user?.fullName || 'Unknown'}</p>
                        <p className="text-sm text-gray-500">{employee?.department}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={leaveTypeColors[request.type] as any || 'secondary'} className="capitalize">
                      {request.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-900">
                      {new Date(request.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(request.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-gray-900">{request.days}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-600 max-w-xs truncate">{request.reason}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[request.status] as any || 'secondary'} className="capitalize">
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {request.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(request)}
                            className="p-1 text-gray-400 hover:text-green-600"
                            title="Approve"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleReject(request)}
                            className="p-1 text-gray-400 hover:text-red-600"
                            title="Reject"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleOpenModal(request)}
                            className="p-1 text-gray-400 hover:text-blue-600"
                            title="Edit"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(request)}
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
        {filteredRequests.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <svg className="h-12 w-12 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>No leave requests found</p>
          </div>
        )}
      </Card>

      {/* Leave Balance Summary */}
      <Card className="p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Team Leave Balance</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {mockEmployees.slice(0, 3).map((employee) => {
            const user = mockUsers.find(u => u.id === employee.userId);
            const employeeLeaves = leaveRequests.filter(r => r.employeeId === employee.id);
            const totalDays = employeeLeaves.reduce((sum, r) => sum + r.days, 0);
            
            return (
              <div key={employee.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Avatar
                  src={user?.avatarUrl}
                  fallback={user?.fullName?.split(' ').map(n => n[0]).join('') || '?'}
                  size="md"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{user?.fullName}</p>
                  <div className="flex gap-4 mt-1 text-sm">
                    <span className="text-gray-500">{employeeLeaves.length} requests</span>
                    <span className="text-gray-500">{totalDays} days</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Leave Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {currentRequest ? 'Edit Leave Request' : 'Create Leave Request'}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee *
                  </label>
                  <select
                    required
                    value={formData.employeeId}
                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select employee</option>
                    {mockEmployees.map((employee) => {
                      const user = mockUsers.find(u => u.id === employee.userId);
                      return (
                        <option key={employee.id} value={employee.id}>
                          {user?.fullName} - {employee.department}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Leave Type *
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as LeaveType })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="vacation">Vacation</option>
                    <option value="sick">Sick Leave</option>
                    <option value="personal">Personal Leave</option>
                    <option value="maternity">Maternity Leave</option>
                    <option value="paternity">Paternity Leave</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date *
                    </label>
                    <Input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date *
                    </label>
                    <Input
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      min={formData.startDate}
                    />
                  </div>
                </div>

                {formData.startDate && formData.endDate && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-900">
                      <span className="font-medium">Total Days:</span> {calculateDays(formData.startDate, formData.endDate)}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason
                  </label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    placeholder="Enter reason for leave request..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    {currentRequest ? 'Update Request' : 'Create Request'}
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

      {/* Approve Confirmation Modal */}
      {showApproveConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Approve Leave Request</h3>
                <p className="text-sm text-gray-500">
                  Are you sure you want to approve this leave request?
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowApproveConfirm(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={confirmApprove} className="flex-1 bg-green-600 hover:bg-green-700">
                Approve
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Confirmation Modal */}
      {showRejectConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Reject Leave Request</h3>
                <p className="text-sm text-gray-500">
                  Are you sure you want to reject this leave request?
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowRejectConfirm(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={confirmReject} className="flex-1 bg-red-600 hover:bg-red-700">
                Reject
              </Button>
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
                <h3 className="text-lg font-semibold text-gray-900">Delete Leave Request</h3>
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this leave request? This action cannot be undone.
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
