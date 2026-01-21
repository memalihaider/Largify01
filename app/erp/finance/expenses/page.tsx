'use client';

import { useState } from 'react';
import { Card, Button, Input, Badge, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Avatar } from '@/components/ui';
import { mockExpenses, mockUsers } from '@/lib/mock-data';
import { formatCurrency, cn } from '@/lib/utils';

const statusColors: Record<string, string> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'danger',
  reimbursed: 'info',
};

const categoryIcons: Record<string, string> = {
  software: '💻',
  travel: '✈️',
  office: '🏢',
  marketing: '📢',
  equipment: '🔧',
  other: '📦',
};

export default function ExpensesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [expenses, setExpenses] = useState(mockExpenses);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<any>(null);
  const [selectedExpenses, setSelectedExpenses] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    category: 'software',
    description: '',
    amount: '',
    expenseDate: new Date().toISOString().split('T')[0],
    submittedBy: '',
    status: 'pending',
    notes: '',
  });

  const categories = ['all', ...new Set(mockExpenses.map(e => e.category))];

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || expense.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || expense.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getSubmitter = (userId: string) => {
    return mockUsers.find(u => u.id === userId);
  };

  const handleOpenModal = (expense?: any) => {
    if (expense) {
      setCurrentExpense(expense);
      setFormData({
        category: expense.category,
        description: expense.description,
        amount: expense.amount.toString(),
        expenseDate: expense.expenseDate ? new Date(expense.expenseDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        submittedBy: expense.submittedBy || '',
        status: expense.status,
        notes: expense.notes || '',
      });
    } else {
      setCurrentExpense(null);
      setFormData({
        category: 'software',
        description: '',
        amount: '',
        expenseDate: new Date().toISOString().split('T')[0],
        submittedBy: mockUsers[0]?.id || '',
        status: 'pending',
        notes: '',
      });
    }
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const expenseData = {
      id: currentExpense?.id || `exp-${Date.now()}`,
      category: formData.category,
      description: formData.description,
      amount: parseFloat(formData.amount),
      currency: 'USD',
      expenseDate: new Date(formData.expenseDate),
      submittedBy: formData.submittedBy,
      status: formData.status as any,
      notes: formData.notes,
      createdAt: currentExpense?.createdAt || new Date(),
    };

    if (currentExpense) {
      setExpenses(expenses.map(e => e.id === currentExpense.id ? expenseData : e));
      alert('Expense updated successfully!');
    } else {
      setExpenses([expenseData, ...expenses]);
      alert('Expense created successfully!');
    }
    setShowModal(false);
  };

  const handleDelete = (expenseId: string) => {
    setSelectedExpenses([expenseId]);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setExpenses(expenses.filter(e => !selectedExpenses.includes(e.id)));
    alert(`${selectedExpenses.length} expense(s) deleted successfully!`);
    setSelectedExpenses([]);
    setShowDeleteConfirm(false);
  };

  const handleApprove = (expenseId: string) => {
    setExpenses(expenses.map(e => 
      e.id === expenseId ? { ...e, status: 'approved' as any, approvedBy: 'usr-001' } : e
    ));
    alert('Expense approved successfully!');
  };

  const handleReject = (expenseId: string) => {
    if (confirm('Are you sure you want to reject this expense?')) {
      setExpenses(expenses.map(e => 
        e.id === expenseId ? { ...e, status: 'rejected' as any } : e
      ));
      alert('Expense rejected!');
    }
  };

  const handleMarkReimbursed = (expenseId: string) => {
    setExpenses(expenses.map(e => 
      e.id === expenseId ? { ...e, status: 'reimbursed' as any } : e
    ));
    alert('Expense marked as reimbursed!');
  };

  const handleViewReceipt = (expense: any) => {
    alert(`Viewing receipt for: ${expense.description}`);
  };

  const handleExport = () => {
    alert('Expenses exported successfully!');
  };

  const toggleSelectExpense = (expenseId: string) => {
    setSelectedExpenses(prev =>
      prev.includes(expenseId) ? prev.filter(id => id !== expenseId) : [...prev, expenseId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Expenses</h1>
          <p className="text-slate-400">Track and manage business expenses</p>
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
            Add Expense
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-slate-400">Total Expenses</p>
          <p className="text-2xl font-bold text-white">
            {formatCurrency(expenses.reduce((sum, e) => sum + e.amount, 0))}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">Pending Approval</p>
          <p className="text-2xl font-bold text-amber-400">
            {expenses.filter(e => e.status === 'pending').length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">Approved This Month</p>
          <p className="text-2xl font-bold text-emerald-400">
            {formatCurrency(expenses.filter(e => e.status === 'approved').reduce((sum, e) => sum + e.amount, 0))}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">Reimbursed</p>
          <p className="text-2xl font-bold text-blue-400">
            {formatCurrency(expenses.filter(e => e.status === 'reimbursed').reduce((sum, e) => sum + e.amount, 0))}
          </p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search expenses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {['all', 'pending', 'approved', 'reimbursed'].map((status) => (
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
                  {status === 'all' ? 'All' : status}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors capitalize',
                  categoryFilter === category
                    ? 'bg-purple-900/20 text-purple-700'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-800'
                )}
              >
                {category === 'all' ? 'All Categories' : `${categoryIcons[category] || ''} ${category}`}
              </button>
            ))}
          </div>
          {selectedExpenses.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-blue-900/20 rounded-lg">
              <span className="text-sm font-medium text-blue-900">
                {selectedExpenses.length} selected
              </span>
              <div className="flex gap-2 ml-auto">
                <Button size="sm" variant="outline" onClick={() => setShowDeleteConfirm(true)} className="text-red-400">
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Expenses Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  className="rounded border-slate-700"
                  checked={selectedExpenses.length === filteredExpenses.length && filteredExpenses.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedExpenses(filteredExpenses.map(e => e.id));
                    } else {
                      setSelectedExpenses([]);
                    }
                  }}
                />
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExpenses.map((expense) => {
              const submitter = getSubmitter(expense.submittedBy || '');
              return (
                <TableRow key={expense.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      className="rounded border-slate-700"
                      checked={selectedExpenses.includes(expense.id)}
                      onChange={() => toggleSelectExpense(expense.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{categoryIcons[expense.category]}</span>
                      <span className="capitalize text-white">{expense.category}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-white">{expense.description}</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-white">{formatCurrency(expense.amount)}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-slate-400">
                      {expense.expenseDate ? new Date(expense.expenseDate).toLocaleDateString() : '-'}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar
                        src={submitter?.avatarUrl}
                        fallback={submitter?.fullName?.split(' ').map(n => n[0]).join('') || '?'}
                        size="sm"
                      />
                      <span className="text-sm text-white">{submitter?.fullName || '-'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge status={expense.status}>{expense.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {expense.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(expense.id)}
                            className="p-1 text-slate-500 hover:text-emerald-400"
                            title="Approve"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleReject(expense.id)}
                            className="p-1 text-slate-500 hover:text-red-400"
                            title="Reject"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </>
                      )}
                      {expense.status === 'approved' && (
                        <button
                          onClick={() => handleMarkReimbursed(expense.id)}
                          className="p-1 text-slate-500 hover:text-blue-400"
                          title="Mark Reimbursed"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={() => handleViewReceipt(expense)}
                        className="p-1 text-slate-500 hover:text-purple-400"
                        title="View Receipt"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleOpenModal(expense)}
                        className="p-1 text-slate-500 hover:text-blue-400"
                        title="Edit"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(expense.id)}
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
        {filteredExpenses.length === 0 && (
          <div className="p-8 text-center text-slate-400">
            <svg className="h-12 w-12 mx-auto mb-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>No expenses found matching your criteria</p>
          </div>
        )}
      </Card>

      {/* Expense Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {currentExpense ? 'Edit Expense' : 'New Expense'}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-slate-400">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Category *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="software">💻 Software</option>
                      <option value="travel">✈️ Travel</option>
                      <option value="office">🏢 Office</option>
                      <option value="marketing">📢 Marketing</option>
                      <option value="equipment">🔧 Equipment</option>
                      <option value="other">📦 Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Amount *
                    </label>
                    <Input
                      type="number"
                      required
                      min="0.01"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Description *
                  </label>
                  <Input
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter expense description"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Date *
                    </label>
                    <Input
                      type="date"
                      required
                      value={formData.expenseDate}
                      onChange={(e) => setFormData({ ...formData, expenseDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Submitted By *
                    </label>
                    <select
                      required
                      value={formData.submittedBy}
                      onChange={(e) => setFormData({ ...formData, submittedBy: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select User</option>
                      {mockUsers.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.fullName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Receipt Upload
                  </label>
                  <button
                    type="button"
                    className="w-full px-4 py-2 border-2 border-dashed border-slate-700 rounded-lg text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-colors"
                    onClick={() => alert('Receipt upload functionality (placeholder)')}
                  >
                    <svg className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Click to upload receipt
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Notes
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Additional notes..."
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
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="reimbursed">Reimbursed</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    {currentExpense ? 'Update Expense' : 'Create Expense'}
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
          <div className="bg-slate-900 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-red-900/20 flex items-center justify-center">
                <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Delete Expense{selectedExpenses.length > 1 ? 's' : ''}</h3>
                <p className="text-sm text-slate-400">
                  Are you sure you want to delete {selectedExpenses.length} expense{selectedExpenses.length > 1 ? 's' : ''}? This action cannot be undone.
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
