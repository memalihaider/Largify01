'use client';

import { Card, StatCard, Badge } from '@/components/ui';
import { mockLeads, mockClients, mockCompanies, mockContacts } from '@/lib/mock-data';
import { formatCurrency, cn } from '@/lib/utils';
import Link from 'next/link';

export default function CRMPage() {
  const totalPipelineValue = mockLeads.reduce((sum, l) => sum + l.estimatedValue, 0);
  const wonDeals = mockLeads.filter(l => l.status === 'won');
  const wonValue = wonDeals.reduce((sum, l) => sum + l.estimatedValue, 0);

  const pipelineStages = [
    { id: 'new', name: 'New', count: mockLeads.filter(l => l.status === 'new').length },
    { id: 'contacted', name: 'Contacted', count: mockLeads.filter(l => l.status === 'contacted').length },
    { id: 'qualified', name: 'Qualified', count: mockLeads.filter(l => l.status === 'qualified').length },
    { id: 'proposal_sent', name: 'Proposal', count: mockLeads.filter(l => l.status === 'proposal_sent').length },
    { id: 'negotiation', name: 'Negotiation', count: mockLeads.filter(l => l.status === 'negotiation').length },
    { id: 'won', name: 'Won', count: mockLeads.filter(l => l.status === 'won').length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">CRM Overview</h1>
        <p className="text-gray-500">Manage your customer relationships and sales pipeline</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Leads"
          value={mockLeads.length.toString()}
          trend={12}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          iconColor="blue"
        />
        <StatCard
          title="Active Clients"
          value={mockClients.filter(c => c.status === 'active').length.toString()}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
          iconColor="green"
        />
        <StatCard
          title="Pipeline Value"
          value={formatCurrency(totalPipelineValue)}
          trend={8}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          iconColor="yellow"
        />
        <StatCard
          title="Won This Month"
          value={formatCurrency(wonValue)}
          trend={15}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          iconColor="purple"
        />
      </div>

      {/* Pipeline Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-gray-900">Sales Pipeline</h2>
          <Link href="/erp/crm/pipeline" className="text-sm text-blue-600 hover:text-blue-700">
            View Pipeline →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {pipelineStages.map((stage) => (
            <div key={stage.id} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{stage.count}</p>
              <p className="text-sm text-gray-500">{stage.name}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Links */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/erp/crm/leads">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Leads</h3>
                <p className="text-sm text-gray-500">{mockLeads.length} total leads</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/erp/crm/clients">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Clients</h3>
                <p className="text-sm text-gray-500">{mockClients.length} active clients</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/erp/crm/companies">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Companies</h3>
                <p className="text-sm text-gray-500">{mockCompanies.length} companies</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/erp/crm/pipeline">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Pipeline</h3>
                <p className="text-sm text-gray-500">Visual pipeline view</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Recent Leads</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {mockLeads.slice(0, 5).map((lead) => (
              <div key={lead.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{lead.contact?.fullName}</p>
                    <p className="text-sm text-gray-500">{lead.company?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{formatCurrency(lead.estimatedValue)}</p>
                    <Badge variant={lead.status === 'won' ? 'success' : lead.status === 'new' ? 'info' : 'secondary'} className="text-xs">
                      {lead.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Recent Contacts</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {mockContacts.slice(0, 5).map((contact) => {
              const company = mockCompanies.find(c => c.id === contact.companyId);
              return (
                <div key={contact.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                      {contact.fullName?.split(' ').map(n => n[0]).join('') || '?'}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{contact.fullName}</p>
                      <p className="text-sm text-gray-500">{contact.jobTitle} at {company?.name}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
