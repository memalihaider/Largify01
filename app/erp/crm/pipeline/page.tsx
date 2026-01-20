'use client';

import { useState, useMemo } from 'react';
import { Card, Button, Badge, Input } from '@/components/ui';
import { mockCompanies } from '@/lib/mock-data';
import { formatCurrency, cn } from '@/lib/utils';

export type DealStatus = 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'negotiation' | 'won' | 'lost';

export interface Deal {
  id: string;
  dealName: string;
  company?: string;
  companyId?: string;
  description?: string;
  amount: number;
  stage: DealStatus;
  probability: number;
  expectedCloseDate?: Date;
  assignedTo?: string;
  source: 'website' | 'referral' | 'linkedin' | 'booking' | 'other';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const pipelineStages = [
  { id: 'new', name: 'New', color: 'bg-slate-100', textColor: 'text-slate-700' },
  { id: 'contacted', name: 'Contacted', color: 'bg-blue-100', textColor: 'text-blue-700' },
  { id: 'qualified', name: 'Qualified', color: 'bg-cyan-100', textColor: 'text-cyan-700' },
  { id: 'proposal_sent', name: 'Proposal', color: 'bg-yellow-100', textColor: 'text-yellow-700' },
  { id: 'negotiation', name: 'Negotiation', color: 'bg-orange-100', textColor: 'text-orange-700' },
  { id: 'won', name: 'Won', color: 'bg-green-100', textColor: 'text-green-700' },
  { id: 'lost', name: 'Lost', color: 'bg-red-100', textColor: 'text-red-700' },
];

const mockDeals: Deal[] = [
  {
    id: 'deal-001',
    dealName: 'Enterprise ERP Implementation',
    company: 'TechFlow Industries',
    companyId: 'comp-001',
    amount: 250000,
    stage: 'negotiation',
    probability: 85,
    expectedCloseDate: new Date('2026-02-28'),
    assignedTo: 'Sarah',
    source: 'linkedin',
    notes: 'Large enterprise deal, close to signature',
    createdAt: new Date('2026-01-05'),
    updatedAt: new Date('2026-01-18'),
  },
  {
    id: 'deal-002',
    dealName: 'Custom Software Development',
    company: 'GreenLeaf Healthcare',
    companyId: 'comp-004',
    amount: 85000,
    stage: 'proposal_sent',
    probability: 70,
    expectedCloseDate: new Date('2026-02-15'),
    assignedTo: 'James',
    source: 'referral',
    notes: 'Healthcare management system',
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-17'),
  },
  {
    id: 'deal-003',
    dealName: 'Security Audit & Consultation',
    company: 'Nova Financial',
    companyId: 'comp-005',
    amount: 45000,
    stage: 'qualified',
    probability: 60,
    expectedCloseDate: new Date('2026-03-01'),
    assignedTo: 'Emma',
    source: 'website',
    notes: 'Multi-phase security assessment',
    createdAt: new Date('2026-01-08'),
    updatedAt: new Date('2026-01-16'),
  },
  {
    id: 'deal-004',
    dealName: 'Support Retainer Package',
    company: 'Summit Logistics',
    companyId: 'comp-003',
    amount: 12000,
    stage: 'contacted',
    probability: 40,
    expectedCloseDate: new Date('2026-02-01'),
    assignedTo: 'Michael',
    source: 'other',
    notes: 'Initial contact, needs follow-up',
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-18'),
  },
  {
    id: 'deal-005',
    dealName: 'ERP Training & Support',
    company: 'Bright Future Education',
    companyId: 'comp-002',
    amount: 28000,
    stage: 'new',
    probability: 25,
    expectedCloseDate: new Date('2026-03-15'),
    assignedTo: 'David',
    source: 'booking',
    notes: 'Inbound inquiry from website',
    createdAt: new Date('2026-01-18'),
    updatedAt: new Date('2026-01-18'),
  },
  {
    id: 'deal-006',
    dealName: 'Cloud Migration Project',
    company: 'TechFlow Industries',
    companyId: 'comp-001',
    amount: 165000,
    stage: 'won',
    probability: 100,
    expectedCloseDate: new Date('2026-01-30'),
    assignedTo: 'Sarah',
    source: 'linkedin',
    notes: 'Completed proposal, awaiting contract signing',
    createdAt: new Date('2025-12-20'),
    updatedAt: new Date('2026-01-18'),
  },
];

export default function PipelinePage() {
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [draggedDeal, setDraggedDeal] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [formData, setFormData] = useState({
    dealName: '',
    company: '',
    amount: '',
    stage: 'new' as DealStatus,
    probability: '25',
    expectedCloseDate: '',
    assignedTo: '',
    source: 'website' as 'website' | 'referral' | 'linkedin' | 'booking' | 'other',
    description: '',
  });

  const filteredDeals = useMemo(() => {
    let filtered = deals;
    
    if (searchQuery) {
      filtered = filtered.filter(d =>
        d.dealName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (stageFilter !== 'all') {
      filtered = filtered.filter(d => d.stage === stageFilter);
    }
    
    return filtered;
  }, [deals, searchQuery, stageFilter]);

  const stats = useMemo(() => {
    const totalDeals = deals.length;
    const totalValue = deals.reduce((sum, d) => sum + d.amount, 0);
    const wonDeals = deals.filter(d => d.stage === 'won').length;
    const wonValue = deals.filter(d => d.stage === 'won').reduce((sum, d) => sum + d.amount, 0);
    const activeValue = deals.filter(d => !['won', 'lost'].includes(d.stage)).reduce((sum, d) => sum + (d.amount * d.probability / 100), 0);

    return {
      totalDeals,
      totalValue,
      wonDeals,
      wonValue,
      activeValue,
      avgDealSize: totalDeals > 0 ? totalValue / totalDeals : 0,
    };
  }, [deals]);

  const getStageDeals = (stageId: string) => {
    return filteredDeals.filter(d => d.stage === stageId);
  };

  const getStageValue = (stageId: string) => {
    return getStageDeals(stageId).reduce((sum, d) => sum + d.amount, 0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStage: string) => {
    e.preventDefault();
    if (!draggedDeal) return;

    setDeals(prev => prev.map(deal =>
      deal.id === draggedDeal
        ? { ...deal, stage: newStage as DealStatus, updatedAt: new Date() }
        : deal
    ));
    setDraggedDeal(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      setDeals(prev => prev.map(d =>
        d.id === editingId
          ? {
              ...d,
              dealName: formData.dealName,
              company: formData.company,
              amount: parseFloat(formData.amount) || 0,
              stage: formData.stage,
              probability: parseInt(formData.probability) || 0,
              expectedCloseDate: formData.expectedCloseDate ? new Date(formData.expectedCloseDate) : undefined,
              assignedTo: formData.assignedTo,
              source: formData.source,
              description: formData.description,
              updatedAt: new Date(),
            }
          : d
      ));
      setEditingId(null);
    } else {
      const newDeal: Deal = {
        id: `deal-${Date.now()}`,
        dealName: formData.dealName,
        company: formData.company,
        amount: parseFloat(formData.amount) || 0,
        stage: formData.stage,
        probability: parseInt(formData.probability) || 0,
        expectedCloseDate: formData.expectedCloseDate ? new Date(formData.expectedCloseDate) : undefined,
        assignedTo: formData.assignedTo,
        source: formData.source,
        description: formData.description,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setDeals(prev => [newDeal, ...prev]);
    }

    setFormData({
      dealName: '',
      company: '',
      amount: '',
      stage: 'new',
      probability: '25',
      expectedCloseDate: '',
      assignedTo: '',
      source: 'website',
      description: '',
    });
    setShowModal(false);
  };

  const handleEdit = (deal: Deal) => {
    setFormData({
      dealName: deal.dealName,
      company: deal.company || '',
      amount: deal.amount.toString(),
      stage: deal.stage,
      probability: deal.probability.toString(),
      expectedCloseDate: deal.expectedCloseDate ? deal.expectedCloseDate.toISOString().split('T')[0] : '',
      assignedTo: deal.assignedTo || '',
      source: deal.source,
      description: deal.description || '',
    });
    setEditingId(deal.id);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this deal?')) {
      setDeals(prev => prev.filter(d => d.id !== id));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      dealName: '',
      company: '',
      amount: '',
      stage: 'new',
      probability: '25',
      expectedCloseDate: '',
      assignedTo: '',
      source: 'website',
      description: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Pipeline</h1>
          <p className="text-gray-500">Manage deals through sales stages - drag to move</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Deal
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Deals</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalDeals}</p>
          <p className="text-xs text-gray-400 mt-2">{formatCurrency(stats.totalValue)}</p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="text-sm text-gray-500">Won Deals</p>
          <p className="text-2xl font-bold text-green-600">{stats.wonDeals}</p>
          <p className="text-xs text-gray-400 mt-2">{formatCurrency(stats.wonValue)}</p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="text-sm text-gray-500">Active Value</p>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(stats.activeValue)}</p>
          <p className="text-xs text-gray-400 mt-2">Weighted by probability</p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="text-sm text-gray-500">Avg Deal Size</p>
          <p className="text-2xl font-bold text-purple-600">{formatCurrency(stats.avgDealSize)}</p>
          <p className="text-xs text-gray-400 mt-2">Per deal</p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="text-sm text-gray-500">Close Rate</p>
          <p className="text-2xl font-bold text-orange-600">{stats.totalDeals > 0 ? Math.round((stats.wonDeals / stats.totalDeals) * 100) : 0}%</p>
          <p className="text-xs text-gray-400 mt-2">Won vs total</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl p-4 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search deals by name, company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 font-medium py-1.5 px-2">Stage:</span>
          <button
            onClick={() => setStageFilter('all')}
            className={cn(
              'px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors',
              stageFilter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            All
          </button>
          {pipelineStages.map(stage => (
            <button
              key={stage.id}
              onClick={() => setStageFilter(stage.id)}
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors capitalize',
                stageFilter === stage.id ? `${stage.color} text-gray-900 font-bold` : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {stage.name}
            </button>
          ))}
        </div>
      </div>

      {/* Pipeline Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {pipelineStages.map((stage) => {
            const stageDeals = getStageDeals(stage.id);
            const stageValue = getStageValue(stage.id);
            
            return (
              <div
                key={stage.id}
                className="w-96 shrink-0"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.id)}
              >
                {/* Stage Header */}
                <div className={cn('rounded-t-lg p-4', stage.color)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{stage.name}</h3>
                      <Badge variant="secondary" className="bg-white/50">
                        {stageDeals.length}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{formatCurrency(stageValue)}</p>
                </div>

                {/* Stage Content */}
                <div className="bg-gray-50 rounded-b-lg p-3 min-h-96 space-y-3">
                  {stageDeals.length === 0 ? (
                    <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
                      Drop deals here
                    </div>
                  ) : (
                    stageDeals.map((deal) => (
                      <Card
                        key={deal.id}
                        className={cn(
                          'p-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow bg-white',
                          draggedDeal === deal.id && 'opacity-50'
                        )}
                        draggable
                        onDragStart={() => setDraggedDeal(deal.id)}
                        onDragEnd={() => setDraggedDeal(null)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-sm">{deal.dealName}</h4>
                            <p className="text-xs text-gray-500">{deal.company}</p>
                          </div>
                          <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded ml-2">
                            {deal.probability}%
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="font-semibold text-gray-900">{formatCurrency(deal.amount)}</span>
                          <span className="text-xs text-gray-500">{deal.assignedTo || 'Unassigned'}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <Badge variant="info">{deal.source}</Badge>
                          <span className="text-gray-400">
                            {deal.expectedCloseDate ? new Date(deal.expectedCloseDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No date'}
                          </span>
                        </div>
                        {deal.description && (
                          <p className="text-xs text-gray-600 mt-2 line-clamp-2">{deal.description}</p>
                        )}
                        <div className="flex gap-1 mt-2">
                          <button
                            onClick={() => handleEdit(deal)}
                            className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded text-xs"
                          >
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(deal.id)}
                            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded text-xs"
                          >
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Create/Edit Deal Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{editingId ? 'Edit Deal' : 'Create New Deal'}</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Deal Information Section */}
              <div className="border-b pb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Deal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Deal Name *"
                    value={formData.dealName}
                    onChange={(e) => setFormData({...formData, dealName: e.target.value})}
                    required
                  />
                  <Input
                    label="Company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    rows={2}
                    placeholder="Deal notes or details..."
                  />
                </div>
              </div>

              {/* Deal Financial Section */}
              <div className="border-b pb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Financial Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Deal Amount *"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    required
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Win Probability (%)</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.probability}
                      onChange={(e) => setFormData({...formData, probability: e.target.value})}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.probability}%</p>
                  </div>
                </div>
              </div>

              {/* Deal Status Section */}
              <div className="border-b pb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Deal Status</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
                    <select
                      value={formData.stage}
                      onChange={(e) => setFormData({...formData, stage: e.target.value as DealStatus})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {pipelineStages.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                    <select
                      value={formData.source}
                      onChange={(e) => setFormData({...formData, source: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="website">Website</option>
                      <option value="referral">Referral</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="booking">Booking</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Info Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Additional Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expected Close Date"
                    type="date"
                    value={formData.expectedCloseDate}
                    onChange={(e) => setFormData({...formData, expectedCloseDate: e.target.value})}
                  />
                  <Input
                    label="Assigned To"
                    value={formData.assignedTo}
                    onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                    placeholder="Team member name"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button type="submit">{editingId ? 'Update Deal' : 'Create Deal'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
