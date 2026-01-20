'use client';

import { useState, use } from 'react';
import { Card, Badge, Button, Input } from '@/components/ui';
import { mockClientApplications } from '@/lib/mock-data';

interface PageProps {
  params: Promise<{
    clientId: string;
  }>;
}

export default function ClientApplicationsPage({ params }: PageProps) {
  const { clientId } = use(params);
  const clientApplications = mockClientApplications.filter(ca => ca.clientId === clientId);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApplications = clientApplications.filter(app => {
    if (filterStatus !== 'all' && app.status !== filterStatus) return false;
    if (filterType !== 'all' && app.type !== filterType) return false;
    if (searchQuery && !app.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'info';
      case 'in_progress':
        return 'warning';
      case 'under_review':
        return 'info';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'danger';
      case 'completed':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'low':
        return '🟢';
      case 'medium':
        return '🟡';
      case 'high':
        return '🔴';
      case 'urgent':
        return '🔴🔴';
      default:
        return '◯';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Applications & Inquiries</h1>
        <p className="text-gray-600">Track your submitted applications and support requests</p>
      </div>

      {/* Filters */}
      <Card variant="bordered" className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <Input
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="under_review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">All Types</option>
            <option value="project_inquiry">Project Inquiry</option>
            <option value="support_request">Support Request</option>
            <option value="consultation_request">Consultation</option>
            <option value="partnership_proposal">Partnership</option>
          </select>
        </div>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((app) => (
            <Card key={app.id} variant="bordered" className="hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{app.title}</h3>
                      <Badge variant="secondary">{app.type}</Badge>
                    </div>
                    <p className="text-gray-600">{app.description}</p>
                  </div>
                  <Badge variant={getStatusColor(app.status)}>
                    {app.status.replace('_', ' ')}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-600">Priority</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span>{getPriorityIcon(app.priority)}</span>
                      <span className="font-medium text-gray-900">{app.priority}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600">Submitted</p>
                    <p className="font-medium text-gray-900 mt-1">
                      {new Date(app.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Assigned To</p>
                    <p className="font-medium text-gray-900 mt-1">{app.assignedTo ? 'Support Team' : 'Pending'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Last Updated</p>
                    <p className="font-medium text-gray-900 mt-1">
                      {app.updatedAt ? new Date(app.updatedAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>

                {app.notes && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900 mb-4">
                    <p className="font-medium mb-1">📝 Notes:</p>
                    <p>{app.notes}</p>
                  </div>
                )}

                {app.tags && app.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {app.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-4 pt-4 border-t flex gap-2">
                  {app.status === 'new' && (
                    <Button variant="outline" size="sm">
                      Edit Application
                    </Button>
                  )}
                  {['new', 'in_progress'].includes(app.status) && (
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      Withdraw
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card variant="bordered" className="p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Applications Found</h3>
            <p className="text-gray-600">
              {searchQuery || filterStatus !== 'all' || filterType !== 'all'
                ? 'No applications match your filters. Try adjusting your search criteria.'
                : 'You have not submitted any applications yet.'}
            </p>
          </Card>
        )}
      </div>

      {/* Submit New Application */}
      <Card variant="bordered" className="p-6 bg-green-50 border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Have a new inquiry?</h3>
            <p className="text-gray-600">Submit a new project inquiry, support request, or partnership proposal</p>
          </div>
          <Button>Submit New Application</Button>
        </div>
      </Card>
    </div>
  );
}
