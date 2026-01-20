'use client';

import { useState, useMemo } from 'react';
import { Card, Button, Input, Badge, Avatar, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, StatCard } from '@/components/ui';
import { mockLeads, mockUsers } from '@/lib/mock-data';
import { formatCurrency, formatRelativeTime, statusColors, sourceColors } from '@/lib/utils';
import Link from 'next/link';
import type { Lead, LeadSource, LeadStatus } from '@/lib/types';

const statusFilters = [
  { value: 'all', label: 'All Leads' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'proposal_sent', label: 'Proposal Sent' },
  { value: 'negotiation', label: 'Negotiation' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
];

const sourceFilters = [
  { value: 'all', label: 'All Sources' },
  { value: 'website', label: 'Website' },
  { value: 'booking', label: 'Booking' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'referral', label: 'Referral' },
  { value: 'cold_outreach', label: 'Cold Outreach' },
  { value: 'event', label: 'Event' },
  { value: 'other', label: 'Other' },
];

const leadsData: Lead[] = [...mockLeads];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(leadsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [scoreFilter, setScoreFilter] = useState('all');
  const [valueFilter, setValueFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [currentLead, setCurrentLead] = useState<Lead | null>(null);
  const [formData, setFormData] = useState({
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    company: '',
    status: 'new' as LeadStatus,
    source: 'website' as LeadSource,
    estimatedValue: '',
    serviceInterest: '',
    problemSummary: '',
    budgetRange: '',
    timeline: '',
    score: 50,
    assignedTo: '',
  });

  const filteredLeads = useMemo(() => {
    let filtered = leads;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((lead) => {
        const matchesSearch =
          lead.contact?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.contact?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.company?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.problemSummary?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
      });
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }

    // Source filter
    if (sourceFilter !== 'all') {
      filtered = filtered.filter((lead) => lead.source === sourceFilter);
    }

    // Score filter
    if (scoreFilter !== 'all') {
      const [min, max] = scoreFilter === 'hot' ? [80, 100] : scoreFilter === 'warm' ? [50, 79] : scoreFilter === 'cold' ? [0, 49] : [0, 100];
      filtered = filtered.filter((lead) => lead.score >= min && lead.score <= max);
    }

    // Value filter
    if (valueFilter !== 'all') {
      const [min, max] = valueFilter === 'high' ? [100000, Infinity] : valueFilter === 'medium' ? [25000, 99999] : valueFilter === 'low' ? [0, 24999] : [0, Infinity];
      filtered = filtered.filter((lead) => lead.estimatedValue >= min && lead.estimatedValue <= max);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.score - a.score;
        case 'value':
          return b.estimatedValue - a.estimatedValue;
        case 'name':
          return (a.contact?.fullName || '').localeCompare(b.contact?.fullName || '');
        case 'created':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return filtered;
  }, [leads, searchQuery, statusFilter, sourceFilter, scoreFilter, valueFilter, sortBy]);

  const handleOpenModal = (lead?: Lead) => {
    if (lead) {
      setCurrentLead(lead);
      setFormData({
        contactName: lead.contact?.fullName || '',
        contactEmail: lead.contact?.email || '',
        contactPhone: lead.contact?.phone || '',
        company: lead.company?.name || '',
        status: lead.status || 'new',
        source: lead.source || 'website',
        estimatedValue: lead.estimatedValue?.toString() || '',
        serviceInterest: lead.serviceInterest || '',
        problemSummary: lead.problemSummary || '',
        budgetRange: lead.budgetRange || '',
        timeline: lead.timeline || '',
        score: lead.score || 50,
        assignedTo: lead.assignedTo || '',
      });
    } else {
      setCurrentLead(null);
      setFormData({
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        company: '',
        status: 'new' as LeadStatus,
        source: 'website' as LeadSource,
        estimatedValue: '',
        serviceInterest: '',
        problemSummary: '',
        budgetRange: '',
        timeline: '',
        score: 50,
        assignedTo: '',
      });
    }
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentLead) {
      // Update existing lead
      setLeads(leads.map(l => 
        l.id === currentLead.id 
          ? {
              ...l,
              contact: l.contact ? { ...l.contact, fullName: formData.contactName, email: formData.contactEmail, phone: formData.contactPhone } : undefined,
              company: l.company ? { ...l.company, name: formData.company } : undefined,
              status: formData.status,
              source: formData.source,
              estimatedValue: parseFloat(formData.estimatedValue) || 0,
              serviceInterest: formData.serviceInterest,
              problemSummary: formData.problemSummary,
              budgetRange: formData.budgetRange,
              timeline: formData.timeline,
              score: formData.score,
              assignedTo: formData.assignedTo,
              updatedAt: new Date(),
            }
          : l
      ));
    } else {
      // Create new lead
      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        contact: {
          id: `contact-${Date.now()}`,
          firstName: formData.contactName.split(' ')[0],
          lastName: formData.contactName.split(' ')[1] || '',
          fullName: formData.contactName,
          email: formData.contactEmail,
          phone: formData.contactPhone,
          jobTitle: 'Decision Maker',
          isPrimary: true,
          createdAt: new Date(),
        },
        company: {
          id: `company-${Date.now()}`,
          name: formData.company,
          industry: 'Unknown',
          email: '',
          phone: '',
          website: '',
          address: '',
          city: '',
          country: '',
          status: 'prospect' as const,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        status: formData.status,
        source: formData.source,
        estimatedValue: parseFloat(formData.estimatedValue) || 0,
        serviceInterest: formData.serviceInterest,
        problemSummary: formData.problemSummary,
        budgetRange: formData.budgetRange,
        timeline: formData.timeline,
        score: formData.score,
        assignedTo: formData.assignedTo,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setLeads([newLead, ...leads]);
    }
    
    setShowModal(false);
  };

  const handleDelete = (leadId: string) => {
    setSelectedLeads([leadId]);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setLeads(leads.filter(l => !selectedLeads.includes(l.id)));
    setSelectedLeads([]);
    setShowDeleteConfirm(false);
  };

  const handleBulkAction = (action: string) => {
    if (selectedLeads.length === 0) {
      alert('Please select leads first');
      return;
    }
    
    if (action === 'delete') {
      setShowDeleteConfirm(true);
      return;
    }
    
    if (action === 'status') {
      const newStatus = prompt('Enter new status:', 'contacted');
      if (newStatus) {
        setLeads(leads.map(l => 
          selectedLeads.includes(l.id) ? { ...l, status: newStatus as LeadStatus } : l
        ));
      }
    }
  };

  const handleExport = () => {
    const csv = [
      ['Contact', 'Email', 'Company', 'Status', 'Source', 'Value', 'Score', 'Created'],
      ...filteredLeads.map(l => [
        l.contact?.fullName || '',
        l.contact?.email || '',
        l.company?.name || '',
        l.status,
        l.source,
        l.estimatedValue,
        l.score,
        new Date(l.createdAt).toLocaleDateString(),
      ])
    ]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const toggleSelectLead = (leadId: string) => {
    setSelectedLeads(prev =>
      prev.includes(leadId) ? prev.filter(id => id !== leadId) : [...prev, leadId]
    );
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const allLeads = leads;
    const wonLeads = allLeads.filter(l => l.status === 'won');
    const lostLeads = allLeads.filter(l => l.status === 'lost');
    const pipelineValue = allLeads.filter(l => l.status !== 'won' && l.status !== 'lost').reduce((sum, l) => sum + l.estimatedValue, 0);
    const avgScore = allLeads.length > 0 ? Math.round(allLeads.reduce((sum, l) => sum + l.score, 0) / allLeads.length) : 0;
    
    return { wonLeads: wonLeads.length, lostLeads: lostLeads.length, pipelineValue, avgScore };
  }, [leads]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-500">Manage and track your sales leads</p>
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
            Add Lead
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-500">Total Leads</p>
          <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
          <p className="text-xs text-gray-400 mt-2">{filteredLeads.length} filtered</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Pipeline Value</p>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(stats.pipelineValue)}</p>
          <p className="text-xs text-gray-400 mt-2">Active deals</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Won This Month</p>
          <p className="text-2xl font-bold text-green-600">{stats.wonLeads}</p>
          <p className="text-xs text-gray-400 mt-2">{formatCurrency(leads.filter(l => l.status === 'won').reduce((sum, l) => sum + l.estimatedValue, 0))}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Avg Score</p>
          <p className="text-2xl font-bold text-purple-600">{stats.avgScore}%</p>
          <p className="text-xs text-gray-400 mt-2">Lead quality</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Conversion Rate</p>
          <p className="text-2xl font-bold text-orange-600">
            {leads.length > 0 ? Math.round((stats.wonLeads / leads.length) * 100) : 0}%
          </p>
          <p className="text-xs text-gray-400 mt-2">{leads.length} total</p>
        </Card>
      </div>

      {/* Advanced Filters & Bulk Actions */}
      <Card className="p-4">
        <div className="flex flex-col gap-4">
          {/* Search & Actions */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <Input
                placeholder="Search by name, email, company, or problem..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="created">Newest First</option>
                <option value="score">Highest Score</option>
                <option value="value">Highest Value</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            <div className="text-sm text-gray-600 font-medium py-1.5 px-2">Status:</div>
            {statusFilters.slice(0, 5).map((filter) => (
              <button
                key={filter.value}
                onClick={() => setStatusFilter(filter.value)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                  statusFilter === filter.value
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* More Filters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Source</label>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {sourceFilters.map((f) => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Lead Temperature</label>
              <select
                value={scoreFilter}
                onChange={(e) => setScoreFilter(e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Temperatures</option>
                <option value="hot">🔥 Hot (80-100)</option>
                <option value="warm">🟠 Warm (50-79)</option>
                <option value="cold">❄️ Cold (0-49)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Value Range</label>
              <select
                value={valueFilter}
                onChange={(e) => setValueFilter(e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Values</option>
                <option value="high">High ($100K+)</option>
                <option value="medium">Medium ($25K-$100K)</option>
                <option value="low">Low (&lt;$25K)</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setStatusFilter('all');
                  setSourceFilter('all');
                  setScoreFilter('all');
                  setValueFilter('all');
                  setSearchQuery('');
                }}
                className="flex-1"
              >
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedLeads.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-sm font-medium text-blue-900">
                {selectedLeads.length} selected
              </span>
              <div className="flex gap-2 ml-auto flex-wrap">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('status')}>
                  Change Status
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('delete')} className="text-red-600 hover:bg-red-50">
                  Delete
                </Button>
                <Button size="sm" variant="outline" onClick={() => setSelectedLeads([])}>
                  Clear Selection
                </Button>
              </div>
            </div>
          )}

          {/* Results count */}
          <div className="text-xs text-gray-500">
            Showing {filteredLeads.length} of {leads.length} leads
          </div>
        </div>
      </Card>

      {/* Leads Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedLeads(filteredLeads.map(l => l.id));
                    } else {
                      setSelectedLeads([]);
                    }
                  }}
                />
              </TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-20"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedLeads.includes(lead.id)}
                    onChange={() => toggleSelectLead(lead.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar
                      fallback={lead.contact?.fullName?.split(' ').map(n => n[0]).join('') || '?'}
                      size="sm"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{lead.contact?.fullName}</p>
                      <p className="text-sm text-gray-500">{lead.contact?.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-gray-900 font-medium">{lead.company?.name || '-'}</p>
                  {lead.serviceInterest && <p className="text-xs text-gray-500">{lead.serviceInterest}</p>}
                </TableCell>
                <TableCell>
                  <Badge status={lead.status}>
                    {lead.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge status={lead.source}>
                    {lead.source.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          lead.score >= 80 ? 'bg-green-500' : 
                          lead.score >= 50 ? 'bg-yellow-500' : 
                          'bg-red-500'
                        }`}
                        style={{ width: `${lead.score}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 w-10">{lead.score}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="font-medium text-gray-900">{formatCurrency(lead.estimatedValue)}</p>
                </TableCell>
                <TableCell>
                  <p className="text-sm text-gray-500">{formatRelativeTime(lead.createdAt)}</p>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => handleOpenModal(lead)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                      title="Edit"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleDelete(lead.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                      title="Delete"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredLeads.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <svg className="h-12 w-12 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="font-medium">No leads found</p>
            <p className="text-sm">Try adjusting your filters or create a new lead</p>
          </div>
        )}
      </Card>

      {/* Lead Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {currentLead ? 'Edit Lead' : 'Add New Lead'}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {currentLead 
                      ? `Update information for ${currentLead.contact?.fullName}`
                      : 'Enter lead details and track the opportunity'}
                  </p>
                </div>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                  Contact Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Name *
                    </label>
                    <Input
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <Input
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <Input
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Inc."
                    />
                  </div>
                </div>
              </div>

              {/* Opportunity Details */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 7H7v6h6V7z" />
                  </svg>
                  Opportunity Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Problem Summary
                    </label>
                    <textarea
                      value={formData.problemSummary}
                      onChange={(e) => setFormData({ ...formData, problemSummary: e.target.value })}
                      placeholder="What problem is this lead facing? What are their pain points?"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Interest
                    </label>
                    <Input
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      placeholder="e.g., ERP Implementation, Custom Software"
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Budget Range
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select range...</option>
                        <option value="0-25k">$0 - $25K</option>
                        <option value="25-50k">$25K - $50K</option>
                        <option value="50-100k">$50K - $100K</option>
                        <option value="100-250k">$100K - $250K</option>
                        <option value="250k+">$250K+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select timeline...</option>
                        <option value="immediate">Immediate</option>
                        <option value="1-3-months">1-3 Months</option>
                        <option value="3-6-months">3-6 Months</option>
                        <option value="6-12-months">6-12 Months</option>
                        <option value="12plus-months">12+ Months</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estimated Value *
                      </label>
                      <Input
                        type="number"
                        required
                        min="0"
                        step="1000"
                        value={formData.estimatedValue}
                        onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                        placeholder="50000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sales Stage & Scoring */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="h-5 w-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  Sales Stage & Scoring
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status *
                    </label>
                    <select
                      required
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as LeadStatus })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="proposal_sent">Proposal Sent</option>
                      <option value="negotiation">Negotiation</option>
                      <option value="won">Won</option>
                      <option value="lost">Lost</option>
                      <option value="dormant">Dormant</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Source *
                    </label>
                    <select
                      required
                      value={formData.source}
                      onChange={(e) => setFormData({ ...formData, source: e.target.value as LeadSource })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="website">Website</option>
                      <option value="booking">Booking</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="referral">Referral</option>
                      <option value="cold_outreach">Cold Outreach</option>
                      <option value="event">Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lead Score: <span className="text-blue-600 font-semibold">{formData.score}%</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={formData.score}
                      onChange={(e) => setFormData({ ...formData, score: parseInt(e.target.value) })}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Cold</span>
                      <span>Warm</span>
                      <span>Hot</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assignment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assign To
                </label>
                <select
                  value={formData.assignedTo}
                  onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Unassigned</option>
                  {mockUsers.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.firstName} {user.lastName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {currentLead ? 'Update Lead' : 'Create Lead'}
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
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Lead{selectedLeads.length > 1 ? 's' : ''}</h3>
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''}? This action cannot be undone.
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
