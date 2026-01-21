'use client';

import { useState, useMemo } from 'react';
import { Card, Button, Input, Badge, Avatar, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui';
import { mockClients as initialClients, mockCompanies, mockContacts, mockUsers } from '@/lib/mock-data';
import { formatCurrency, formatRelativeTime } from '@/lib/utils';
import type { Client } from '@/lib/types';

const statusOptions = [
  { value: 'active', label: 'Active', color: 'success' },
  { value: 'inactive', label: 'Inactive', color: 'secondary' },
  { value: 'pending', label: 'Pending', color: 'warning' },
  { value: 'at_risk', label: 'At Risk', color: 'error' },
  { value: 'churned', label: 'Churned', color: 'error' },
];

const paymentTermsOptions = [
  { value: 'net-15', label: 'Net 15' },
  { value: 'net-30', label: 'Net 30' },
  { value: 'net-45', label: 'Net 45' },
  { value: 'net-60', label: 'Net 60' },
  { value: 'due-on-receipt', label: 'Due on Receipt' },
  { value: 'custom', label: 'Custom' },
];

const clientTierOptions = [
  { value: 'enterprise', label: 'Enterprise', icon: '👑' },
  { value: 'premium', label: 'Premium', icon: '⭐' },
  { value: 'standard', label: 'Standard', icon: '📊' },
  { value: 'startup', label: 'Startup', icon: '🚀' },
];

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [clients, setClients] = useState(initialClients);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created');
  const [selectedClients, setSelectedClients] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    companyId: '',
    contractValue: '',
    contractStart: '',
    contractEnd: '',
    status: 'active',
    primaryContactId: '',
    paymentTerms: 'net-30',
    accountManager: '',
    clientTier: 'standard',
    notes: '',
    annualContractValue: '',
    renewalDate: '',
  });

  const filteredClients = useMemo(() => {
    let filtered = clients;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((client) => {
        const company = mockCompanies.find(c => c.id === client.companyId);
        return (
          company?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company?.industry?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.clientCode?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((client) => client.status === statusFilter);
    }

    // Tier filter
    if (tierFilter !== 'all') {
      filtered = filtered.filter((client) => (client as any).clientTier === tierFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'value':
          return b.totalRevenue - a.totalRevenue;
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'created':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return filtered;
  }, [clients, searchQuery, statusFilter, tierFilter, sortBy]);

  // Get contacts for selected company
  const getCompanyContacts = (companyId: string) => {
    return mockContacts.filter(contact => contact.companyId === companyId);
  };

  const handleOpenModal = (client?: Client) => {
    if (client) {
      setCurrentClient(client);
      setFormData({
        companyId: client.companyId || '',
        contractValue: client.totalRevenue?.toString() || '',
        contractStart: client.contractStart ? new Date(client.contractStart).toISOString().split('T')[0] : '',
        contractEnd: client.contractEnd ? new Date(client.contractEnd).toISOString().split('T')[0] : '',
        status: client.status || 'active',
        primaryContactId: (client as any).primaryContactId || '',
        paymentTerms: (client as any).paymentTerms || 'net-30',
        accountManager: client.accountManager || '',
        clientTier: (client as any).clientTier || 'standard',
        notes: client.notes || '',
        annualContractValue: (client as any).annualContractValue?.toString() || '',
        renewalDate: (client as any).renewalDate ? new Date((client as any).renewalDate).toISOString().split('T')[0] : '',
      });
    } else {
      setCurrentClient(null);
      setFormData({
        companyId: '',
        contractValue: '',
        contractStart: '',
        contractEnd: '',
        status: 'active',
        primaryContactId: '',
        paymentTerms: 'net-30',
        accountManager: '',
        clientTier: 'standard',
        notes: '',
        annualContractValue: '',
        renewalDate: '',
      });
    }
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentClient) {
      // Update existing client
      setClients(clients.map(c => 
        c.id === currentClient.id 
          ? {
              ...c,
              companyId: formData.companyId,
              totalRevenue: parseFloat(formData.contractValue) || 0,
              contractStart: formData.contractStart ? new Date(formData.contractStart) : undefined,
              contractEnd: formData.contractEnd ? new Date(formData.contractEnd) : undefined,
              status: formData.status,
              paymentTerms: formData.paymentTerms,
              accountManager: formData.accountManager,
              notes: formData.notes,
              ...(c as any).clientTier && { clientTier: formData.clientTier },
              ...(c as any).primaryContactId && { primaryContactId: formData.primaryContactId },
              ...(c as any).annualContractValue && { annualContractValue: parseFloat(formData.annualContractValue) || 0 },
              ...(c as any).renewalDate && { renewalDate: formData.renewalDate ? new Date(formData.renewalDate) : undefined },
              updatedAt: new Date(),
            }
          : c
      ));
    } else {
      // Create new client
      const company = mockCompanies.find(c => c.id === formData.companyId);
      const newClient: any = {
        id: `client-${Date.now()}`,
        companyId: formData.companyId,
        company: company,
        clientCode: `CLT-${new Date().getFullYear()}-${String(clients.length + 1).padStart(3, '0')}`,
        status: formData.status,
        contractStart: formData.contractStart ? new Date(formData.contractStart) : new Date(),
        contractEnd: formData.contractEnd ? new Date(formData.contractEnd) : undefined,
        paymentTerms: formData.paymentTerms,
        accountManager: formData.accountManager,
        totalRevenue: parseFloat(formData.contractValue) || 0,
        primaryContactId: formData.primaryContactId,
        clientTier: formData.clientTier,
        notes: formData.notes,
        annualContractValue: parseFloat(formData.annualContractValue) || parseFloat(formData.contractValue) || 0,
        renewalDate: formData.renewalDate ? new Date(formData.renewalDate) : undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setClients([newClient, ...clients]);
    }

    setShowModal(false);
  };

  const handleDelete = (clientId: string) => {
    setClientToDelete(clientId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (clientToDelete) {
      setClients(clients.filter(c => c.id !== clientToDelete));
      setClientToDelete(null);
      setShowDeleteConfirm(false);
    }
  };

  const toggleSelectClient = (clientId: string) => {
    setSelectedClients(prev =>
      prev.includes(clientId) ? prev.filter(id => id !== clientId) : [...prev, clientId]
    );
  };

  const getStatusColor = (status: string) => {
    const option = statusOptions.find(s => s.value === status);
    return option?.color || 'secondary';
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const activeClients = clients.filter(c => c.status === 'active').length;
    const totalValue = clients.reduce((sum, c) => sum + c.totalRevenue, 0);
    const avgValue = clients.length > 0 ? totalValue / clients.length : 0;
    const atRiskClients = (clients as any[]).filter(c => c.status === 'at_risk').length;
    
    return { activeClients, totalValue, avgValue, atRiskClients };
  }, [clients]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Clients</h1>
          <p className="text-slate-400">Manage and monitor your client relationships</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700">
          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Client
        </Button>
      </div>

      {/* Advanced Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <p className="text-sm text-slate-400">Total Clients</p>
          <p className="text-2xl font-bold text-white">{clients.length}</p>
          <p className="text-xs text-slate-500 mt-2">{filteredClients.length} filtered</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">Active</p>
          <p className="text-2xl font-bold text-emerald-400">{stats.activeClients}</p>
          <p className="text-xs text-slate-500 mt-2">{Math.round((stats.activeClients / clients.length) * 100)}% of total</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">Total Value</p>
          <p className="text-2xl font-bold text-blue-400">{formatCurrency(stats.totalValue)}</p>
          <p className="text-xs text-slate-500 mt-2">ARR</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">Avg Value</p>
          <p className="text-2xl font-bold text-purple-400">{formatCurrency(stats.avgValue)}</p>
          <p className="text-xs text-slate-500 mt-2">Per client</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">At Risk</p>
          <p className="text-2xl font-bold text-red-400">{stats.atRiskClients}</p>
          <p className="text-xs text-slate-500 mt-2">Attention needed</p>
        </Card>
      </div>

      {/* Advanced Filters */}
      <Card className="p-4">
        <div className="space-y-4">
          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by company name, industry, or client code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="created">Newest First</option>
              <option value="value">Highest Value</option>
            </select>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <div className="text-sm text-slate-400 font-medium py-1.5 px-2">Status:</div>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                statusFilter === 'all'
                  ? 'bg-blue-900/20 text-blue-400'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              All
            </button>
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setStatusFilter(option.value)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                  statusFilter === option.value
                    ? 'bg-blue-900/20 text-blue-400'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* More Filters */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1 block">Client Tier</label>
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="w-full px-2 py-1.5 border border-slate-800 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Tiers</option>
                {clientTierOptions.map((tier) => (
                  <option key={tier.value} value={tier.value}>
                    {tier.icon} {tier.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2 sm:col-span-1 flex items-end gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setStatusFilter('all');
                  setTierFilter('all');
                  setSearchQuery('');
                }}
                className="flex-1"
              >
                Reset Filters
              </Button>
            </div>
          </div>

          <div className="text-xs text-slate-400">
            Showing {filteredClients.length} of {clients.length} clients
          </div>
        </div>
      </Card>

      {/* Clients Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  className="rounded border-slate-700"
                  checked={selectedClients.length === filteredClients.length && filteredClients.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedClients(filteredClients.map(c => c.id));
                    } else {
                      setSelectedClients([]);
                    }
                  }}
                />
              </TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Contract Value</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-20"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => {
              const company = mockCompanies.find(c => c.id === client.companyId);
              const contact = mockContacts.find(c => c.id === (client as any).primaryContactId);
              const manager = mockUsers.find(u => u.id === client.accountManager);
              
              return (
                <TableRow key={client.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      className="rounded border-slate-700"
                      checked={selectedClients.includes(client.id)}
                      onChange={() => toggleSelectClient(client.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-white">{company?.name}</p>
                      <p className="text-sm text-slate-400">{company?.industry}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-white">{contact?.fullName || 'Not assigned'}</p>
                      <p className="text-sm text-slate-400">{contact?.jobTitle}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge status={client.status}>
                      {statusOptions.find(s => s.value === client.status)?.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <span>{clientTierOptions.find(t => t.value === (client as any).clientTier)?.icon}</span>
                      <span className="text-sm font-medium">{clientTierOptions.find(t => t.value === (client as any).clientTier)?.label}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-semibold text-white">{formatCurrency(client.totalRevenue)}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-slate-400">{formatRelativeTime(client.createdAt)}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleOpenModal(client)}
                        className="p-1.5 text-slate-500 hover:text-blue-400 hover:bg-blue-900/20 rounded"
                        title="Edit"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(client.id)}
                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-900/20 rounded"
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
        {filteredClients.length === 0 && (
          <div className="p-8 text-center text-slate-400">
            <svg className="h-12 w-12 mx-auto mb-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <p className="font-medium">No clients found</p>
            <p className="text-sm">Try adjusting your filters or create a new client</p>
          </div>
        )}
      </Card>

      {/* Advanced Create/Edit Client Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-800 sticky top-0 bg-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {currentClient ? 'Edit Client' : 'Add New Client'}
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    {currentClient 
                      ? 'Update client information and contract details'
                      : 'Register a new client and manage their contract'}
                  </p>
                </div>
                <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-slate-400">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-6">
              {/* Company & Contact */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.707.707a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Company Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Company *
                    </label>
                    <select
                      required
                      value={formData.companyId}
                      onChange={(e) => setFormData({ ...formData, companyId: e.target.value, primaryContactId: '' })}
                      className="w-full px-3 py-2 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a company</option>
                      {mockCompanies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name} ({company.industry})
                        </option>
                      ))}
                    </select>
                  </div>

                  {formData.companyId && (
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">
                        Primary Contact
                      </label>
                      <select
                        value={formData.primaryContactId}
                        onChange={(e) => setFormData({ ...formData, primaryContactId: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select primary contact</option>
                        {getCompanyContacts(formData.companyId).map((contact) => (
                          <option key={contact.id} value={contact.id}>
                            {contact.fullName} - {contact.jobTitle}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Contract Details */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <svg className="h-5 w-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                  Contract Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Contract Value (One-time) *
                    </label>
                    <Input
                      type="number"
                      required
                      min="0"
                      step="1000"
                      value={formData.contractValue}
                      onChange={(e) => setFormData({ ...formData, contractValue: e.target.value })}
                      placeholder="75000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Annual Recurring Revenue (ARR)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      step="1000"
                      value={formData.annualContractValue}
                      onChange={(e) => setFormData({ ...formData, annualContractValue: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Contract Start Date *
                    </label>
                    <Input
                      type="date"
                      required
                      value={formData.contractStart}
                      onChange={(e) => setFormData({ ...formData, contractStart: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Contract End Date
                    </label>
                    <Input
                      type="date"
                      value={formData.contractEnd}
                      onChange={(e) => setFormData({ ...formData, contractEnd: e.target.value })}
                      min={formData.contractStart}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Renewal Date
                    </label>
                    <Input
                      type="date"
                      value={formData.renewalDate}
                      onChange={(e) => setFormData({ ...formData, renewalDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Payment & Terms */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <svg className="h-5 w-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                  Payment & Terms
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Payment Terms *
                    </label>
                    <select
                      value={formData.paymentTerms}
                      onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {paymentTermsOptions.map((term) => (
                        <option key={term.value} value={term.value}>
                          {term.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Client Tier
                    </label>
                    <select
                      value={formData.clientTier}
                      onChange={(e) => setFormData({ ...formData, clientTier: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {clientTierOptions.map((tier) => (
                        <option key={tier.value} value={tier.value}>
                          {tier.icon} {tier.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Account Manager
                    </label>
                    <select
                      value={formData.accountManager}
                      onChange={(e) => setFormData({ ...formData, accountManager: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Unassigned</option>
                      {mockUsers.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.firstName} {user.lastName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Status & Notes */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <svg className="h-5 w-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.002v6a3 3 0 01-.709 1.863l-1.378 2.067A3 3 0 0012.682 17H7.318a3 3 0 01-2.83-4.644l-1.379-2.067A3 3 0 013 12.602v-6a3.066 3.066 0 012.267-3.002z" clipRule="evenodd" />
                  </svg>
                  Status & Notes
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Status *
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any additional notes or special terms..."
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4 border-t border-slate-800">
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {currentClient ? 'Update Client' : 'Create Client'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1">
                  Cancel
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
                <h3 className="text-lg font-semibold text-white">Delete Client</h3>
                <p className="text-sm text-slate-400">
                  Are you sure you want to delete this client? This action cannot be undone.
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
