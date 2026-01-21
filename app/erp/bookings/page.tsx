'use client';

import { useState } from 'react';
import { Card, Button, Input, Badge, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui';
import { mockBookings, mockBookingServices } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const statusColors: Record<string, string> = {
  pending: 'warning',
  confirmed: 'success',
  cancelled: 'secondary',
  completed: 'info',
  no_show: 'danger',
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState(mockBookings);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<any>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    serviceId: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    scheduledDate: '',
    scheduledTime: '',
    notes: '',
    status: 'pending',
  });

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = 
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getService = (serviceId: string) => {
    return mockBookingServices.find(s => s.id === serviceId);
  };

  const handleOpenModal = (booking?: any) => {
    if (booking) {
      setCurrentBooking(booking);
      const service = getService(booking.serviceId || '');
      setFormData({
        serviceId: booking.serviceId || '',
        customerName: booking.customerName || '',
        customerEmail: booking.customerEmail || '',
        customerPhone: booking.guestPhone || '',
        scheduledDate: booking.scheduledDate || '',
        scheduledTime: booking.scheduledTime || '',
        notes: booking.problemSummary || '',
        status: booking.status || 'pending',
      });
    } else {
      setCurrentBooking(null);
      setFormData({
        serviceId: '',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        scheduledDate: '',
        scheduledTime: '',
        notes: '',
        status: 'pending',
      });
    }
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const service = getService(formData.serviceId);
    const scheduledStart = new Date(`${formData.scheduledDate}T${formData.scheduledTime}`);
    const scheduledEnd = new Date(scheduledStart.getTime() + (service?.durationMinutes || 30) * 60000);

    if (currentBooking) {
      setBookings(bookings.map(b => 
        b.id === currentBooking.id 
          ? {
              ...b,
              serviceId: formData.serviceId,
              customerName: formData.customerName,
              customerEmail: formData.customerEmail,
              guestName: formData.customerName,
              guestEmail: formData.customerEmail,
              guestPhone: formData.customerPhone,
              scheduledDate: formData.scheduledDate,
              scheduledTime: formData.scheduledTime,
              scheduledStart,
              scheduledEnd,
              problemSummary: formData.notes,
              status: formData.status as any,
            }
          : b
      ));
      alert('Booking updated successfully!');
    } else {
      const newBooking = {
        id: `book-${Date.now()}`,
        serviceId: formData.serviceId,
        assignedTo: 'usr-001',
        guestCompany: '',
        guestName: formData.customerName,
        customerName: formData.customerName,
        guestEmail: formData.customerEmail,
        customerEmail: formData.customerEmail,
        guestPhone: formData.customerPhone,
        guestBusinessSize: 'small' as const,
        problemSummary: formData.notes,
        scheduledStart,
        scheduledEnd,
        scheduledDate: formData.scheduledDate,
        scheduledTime: formData.scheduledTime,
        timezone: 'America/New_York',
        status: formData.status as any,
        meetingLink: `https://meet.google.com/${Math.random().toString(36).substr(2, 9)}`,
        emailConfirmed: false,
        createdAt: new Date(),
      };
      setBookings([newBooking, ...bookings]);
      alert('Booking created successfully!');
    }
    setShowModal(false);
  };

  const handleDelete = (bookingId: string) => {
    setCurrentBooking(bookings.find(b => b.id === bookingId));
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setBookings(bookings.filter(b => b.id !== currentBooking.id));
    alert('Booking deleted successfully!');
    setShowDeleteConfirm(false);
    setCurrentBooking(null);
  };

  const handleConfirmBooking = (booking: any) => {
    setBookings(bookings.map(b => 
      b.id === booking.id 
        ? { ...b, status: 'confirmed' as any, emailConfirmed: true }
        : b
    ));
    alert(`Booking confirmed for ${booking.customerName}!\nConfirmation email sent to ${booking.customerEmail}`);
  };

  const handleCompleteBooking = (booking: any) => {
    setBookings(bookings.map(b => 
      b.id === booking.id 
        ? { ...b, status: 'completed' as any }
        : b
    ));
    alert('Booking marked as completed!');
  };

  const handleNoShow = (booking: any) => {
    setBookings(bookings.map(b => 
      b.id === booking.id 
        ? { ...b, status: 'no_show' as any }
        : b
    ));
    alert('Booking marked as no-show');
  };

  const handleOpenCancelModal = (booking: any) => {
    setCurrentBooking(booking);
    setCancelReason('');
    setShowCancelModal(true);
  };

  const handleCancelBooking = () => {
    if (!cancelReason.trim()) {
      alert('Please provide a cancellation reason');
      return;
    }
    setBookings(bookings.map(b => 
      b.id === currentBooking.id 
        ? { ...b, status: 'cancelled' as any }
        : b
    ));
    alert(`Booking cancelled.\nReason: ${cancelReason}`);
    setShowCancelModal(false);
    setCancelReason('');
  };

  const handleReschedule = (booking: any) => {
    setCurrentBooking(booking);
    setFormData({
      serviceId: booking.serviceId || '',
      customerName: booking.customerName || '',
      customerEmail: booking.customerEmail || '',
      customerPhone: booking.guestPhone || '',
      scheduledDate: booking.scheduledDate || '',
      scheduledTime: booking.scheduledTime || '',
      notes: booking.problemSummary || '',
      status: booking.status || 'pending',
    });
    setShowRescheduleModal(true);
  };

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const service = getService(formData.serviceId);
    const scheduledStart = new Date(`${formData.scheduledDate}T${formData.scheduledTime}`);
    const scheduledEnd = new Date(scheduledStart.getTime() + (service?.durationMinutes || 30) * 60000);

    setBookings(bookings.map(b => 
      b.id === currentBooking.id 
        ? {
            ...b,
            scheduledDate: formData.scheduledDate,
            scheduledTime: formData.scheduledTime,
            scheduledStart,
            scheduledEnd,
          }
        : b
    ));
    alert('Booking rescheduled successfully!');
    setShowRescheduleModal(false);
  };

  const handleSendReminder = (booking: any) => {
    alert(`Reminder sent to ${booking.customerName} at ${booking.customerEmail}\n\nMeeting: ${getService(booking.serviceId)?.name}\nDate: ${booking.scheduledDate}\nTime: ${booking.scheduledTime}`);
  };

  const handleCalendarView = () => {
    alert('Calendar view coming soon!');
  };

  const handleExport = () => {
    console.log('Exporting bookings...');
    alert('Bookings exported successfully!');
  };

  const handleBulkConfirm = () => {
    if (selectedBookings.length === 0) {
      alert('Please select bookings first');
      return;
    }
    setBookings(bookings.map(b => 
      selectedBookings.includes(b.id) && b.status === 'pending'
        ? { ...b, status: 'confirmed' as any, emailConfirmed: true }
        : b
    ));
    alert(`${selectedBookings.length} booking(s) confirmed!`);
    setSelectedBookings([]);
  };

  const handleBulkCancel = () => {
    if (selectedBookings.length === 0) {
      alert('Please select bookings first');
      return;
    }
    const confirmed = confirm(`Cancel ${selectedBookings.length} booking(s)?`);
    if (confirmed) {
      setBookings(bookings.map(b => 
        selectedBookings.includes(b.id)
          ? { ...b, status: 'cancelled' as any }
          : b
      ));
      alert(`${selectedBookings.length} booking(s) cancelled!`);
      setSelectedBookings([]);
    }
  };

  const toggleSelectBooking = (bookingId: string) => {
    setSelectedBookings(prev =>
      prev.includes(bookingId) ? prev.filter(id => id !== bookingId) : [...prev, bookingId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Bookings</h1>
          <p className="text-slate-400">Manage consultation bookings and appointments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Bookings
          </Button>
          <Button variant="outline" onClick={handleCalendarView}>
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Calendar View
          </Button>
          <Button onClick={() => handleOpenModal()}>
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Booking
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-slate-400">Total Bookings</p>
          <p className="text-2xl font-bold text-white">{bookings.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">Upcoming</p>
          <p className="text-2xl font-bold text-emerald-400">
            {bookings.filter(b => b.status === 'confirmed').length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">Pending Confirmation</p>
          <p className="text-2xl font-bold text-amber-400">
            {bookings.filter(b => b.status === 'pending').length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">Completed This Month</p>
          <p className="text-2xl font-bold text-blue-400">
            {bookings.filter(b => b.status === 'completed').length}
          </p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {['all', 'pending', 'confirmed', 'completed', 'cancelled', 'no_show'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={cn(
                    'px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors capitalize',
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
          {selectedBookings.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-blue-900/20 rounded-lg">
              <span className="text-sm font-medium text-blue-900">
                {selectedBookings.length} selected
              </span>
              <div className="flex gap-2 ml-auto">
                <Button size="sm" variant="outline" onClick={handleBulkConfirm}>
                  Confirm Selected
                </Button>
                <Button size="sm" variant="outline" onClick={handleBulkCancel} className="text-red-400">
                  Cancel Selected
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Bookings Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  className="rounded border-slate-700"
                  checked={selectedBookings.length === filteredBookings.length && filteredBookings.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedBookings(filteredBookings.map(b => b.id));
                    } else {
                      setSelectedBookings([]);
                    }
                  }}
                />
              </TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((booking) => {
              const service = booking.serviceId ? getService(booking.serviceId) : null;
              
              return (
                <TableRow key={booking.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      className="rounded border-slate-700"
                      checked={selectedBookings.includes(booking.id)}
                      onChange={() => toggleSelectBooking(booking.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-white">{booking.customerName}</p>
                      <p className="text-sm text-slate-400">{booking.customerEmail}</p>
                      {booking.guestPhone && (
                        <p className="text-xs text-slate-500">{booking.guestPhone}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: service?.color || '#3B82F6' }}
                      />
                      <div>
                        <span className="text-white">{service?.name || 'Unknown'}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-white">
                        {new Date(booking.scheduledDate).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-slate-400">{booking.scheduledTime}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-slate-400">{service?.durationMinutes || 30} min</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[booking.status] as any || 'secondary'} className="capitalize">
                      {booking.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleOpenModal(booking)}
                        className="p-1 text-slate-500 hover:text-blue-400"
                        title="Edit"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      {booking.status === 'pending' && (
                        <button
                          onClick={() => handleConfirmBooking(booking)}
                          className="p-1 text-slate-500 hover:text-emerald-400"
                          title="Confirm"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      )}
                      {booking.status === 'confirmed' && (
                        <>
                          <button
                            onClick={() => handleCompleteBooking(booking)}
                            className="p-1 text-slate-500 hover:text-blue-400"
                            title="Mark Complete"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleNoShow(booking)}
                            className="p-1 text-slate-500 hover:text-orange-600"
                            title="Mark No-Show"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                          </button>
                        </>
                      )}
                      {(booking.status === 'pending' || booking.status === 'confirmed') && (
                        <>
                          <button
                            onClick={() => handleReschedule(booking)}
                            className="p-1 text-slate-500 hover:text-purple-400"
                            title="Reschedule"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleSendReminder(booking)}
                            className="p-1 text-slate-500 hover:text-indigo-600"
                            title="Send Reminder"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleOpenCancelModal(booking)}
                            className="p-1 text-slate-500 hover:text-red-400"
                            title="Cancel Booking"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(booking.id)}
                        className="p-1 text-slate-500 hover:text-red-400"
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
        {filteredBookings.length === 0 && (
          <div className="p-8 text-center text-slate-400">
            <svg className="h-12 w-12 mx-auto mb-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>No bookings found matching your criteria</p>
          </div>
        )}
      </Card>

      {/* Create/Edit Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {currentBooking ? 'Edit Booking' : 'Create New Booking'}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-slate-400">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Service *
                  </label>
                  <select
                    required
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select service</option>
                    {mockBookingServices.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} ({service.durationMinutes} min)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Customer Name *
                    </label>
                    <Input
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Customer Email *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Customer Phone
                  </label>
                  <Input
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    placeholder="+1 234 567 8900"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Booking Date *
                    </label>
                    <Input
                      type="date"
                      required
                      value={formData.scheduledDate}
                      onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Booking Time *
                    </label>
                    <Input
                      type="time"
                      required
                      value={formData.scheduledTime}
                      onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Additional notes or requirements..."
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Status *
                  </label>
                  <select
                    required
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="no_show">No Show</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    {currentBooking ? 'Update Booking' : 'Create Booking'}
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

      {/* Reschedule Modal */}
      {showRescheduleModal && currentBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Reschedule Booking</h2>
              <button onClick={() => setShowRescheduleModal(false)} className="text-slate-500 hover:text-slate-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleRescheduleSubmit} className="space-y-4">
              <div>
                <p className="text-sm text-slate-400 mb-4">
                  Rescheduling booking for <strong>{currentBooking.customerName}</strong>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  New Date *
                </label>
                <Input
                  type="date"
                  required
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  New Time *
                </label>
                <Input
                  type="time"
                  required
                  value={formData.scheduledTime}
                  onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  Reschedule
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowRescheduleModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cancel Booking Modal */}
      {showCancelModal && currentBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Cancel Booking</h2>
              <button onClick={() => setShowCancelModal(false)} className="text-slate-500 hover:text-slate-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-slate-400">
                You are about to cancel the booking for <strong>{currentBooking.customerName}</strong>.
              </p>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Cancellation Reason *
                </label>
                <textarea
                  required
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Please provide a reason for cancellation..."
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowCancelModal(false)} className="flex-1">
                  Keep Booking
                </Button>
                <Button onClick={handleCancelBooking} className="flex-1 bg-red-600 hover:bg-red-700">
                  Cancel Booking
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && currentBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-red-900/20 flex items-center justify-center">
                <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Delete Booking</h3>
                <p className="text-sm text-slate-400">
                  Are you sure you want to delete this booking? This action cannot be undone.
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
