'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Badge, Button, Card, StatCard } from '@/components/ui';
import {
  mockProjects,
  mockProjectPhases,
  mockProjectChecklistItems,
  mockProjectMilestones,
  mockProjectCommunications,
  mockProjectDocuments,
  mockProjectPaymentMilestones,
  mockCompanies,
  mockClients,
} from '@/lib/mock-data';

export default function ProjectDetailPage() {
  const projectId = 'proj-001'; // TechFlow Industries
  const project = mockProjects.find(p => p.id === projectId);
  const phases = mockProjectPhases.filter(p => p.projectId === projectId);
  const checklists = mockProjectChecklistItems.filter(c => 
    phases.some(p => p.id === c.projectPhaseId)
  );
  const milestones = mockProjectMilestones.filter(m => m.projectId === projectId);
  const communications = mockProjectCommunications.filter(c => c.projectId === projectId);
  const documents = mockProjectDocuments.filter(d => d.projectId === projectId);
  const payments = mockProjectPaymentMilestones.filter(p => p.projectId === projectId);

  const [expandedPhases, setExpandedPhases] = useState<string[]>(phases.map(p => p.id).slice(0, 2));
  const [expandedMilestones, setExpandedMilestones] = useState<string[]>(['mile-001']);
  const [activeTab, setActiveTab] = useState<'phases' | 'milestones' | 'communications' | 'documents' | 'payments'>('phases');

  const togglePhase = (phaseId: string) => {
    setExpandedPhases(prev =>
      prev.includes(phaseId)
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const toggleMilestone = (milestoneId: string) => {
    setExpandedMilestones(prev =>
      prev.includes(milestoneId)
        ? prev.filter(id => id !== milestoneId)
        : [...prev, milestoneId]
    );
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      completed: 'bg-emerald-900/20 text-green-800',
      in_progress: 'bg-blue-900/20 text-blue-800',
      pending: 'bg-slate-800 text-slate-400',
      blocked: 'bg-red-900/20 text-red-800',
      paid: 'bg-emerald-900/20 text-green-800',
      due: 'bg-orange-100 text-orange-800',
      overdue: 'bg-red-900/20 text-red-800',
    };
    return variants[status] || 'bg-slate-800 text-slate-400';
  };

  if (!project) {
    return (
      <div className="p-6">
        <p className="text-red-400">Project not found</p>
      </div>
    );
  }

  const completedPhases = phases.filter(p => p.status === 'completed').length;
  const totalPhases = phases.length;
  const completedMilestones = milestones.filter(m => m.clientApproved).length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <Link href="/erp/projects" className="text-blue-400 hover:text-blue-400 mb-4 inline-flex items-center gap-2">
          Back to Projects
        </Link>
        <h1 className="text-3xl font-bold text-white">{project.name}</h1>
        <p className="text-slate-400 mt-2">
          Client: {mockCompanies.find(c => c.id === mockClients.find(cl => cl.id === project.clientId)?.companyId)?.name || 'Unknown'}
          &nbsp;• Status: <Badge className="ml-2">{project.status}</Badge>
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Phases Completed"
          value={`${completedPhases}/${totalPhases}`}
          trend={(completedPhases / totalPhases) * 100}
        />
        <StatCard
          title="Milestones Approved"
          value={`${completedMilestones}/${milestones.length}`}
          trend={(completedMilestones / milestones.length) * 100}
        />
        <StatCard
          title="Documents"
          value={documents.length}
          subtitle={`${documents.filter(d => d.isClientApproved).length} approved`}
        />
        <StatCard
          title="Payments"
          value={`$${payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}`}
          subtitle={`${payments.filter(p => p.status === 'paid').length} received`}
        />
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-slate-800">
        <div className="flex gap-8">
          {(['phases', 'milestones', 'communications', 'documents', 'payments'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-1 border-b-2 font-medium capitalize transition ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Phases Tab */}
      {activeTab === 'phases' && (
        <div className="space-y-4">
          <div className="bg-blue-900/20 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-white mb-2">10-Phase Delivery Model</h3>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all"
                style={{ width: `${(completedPhases / totalPhases) * 100}%` }}
              />
            </div>
            <p className="text-sm text-slate-400 mt-2">{completedPhases} of {totalPhases} phases completed</p>
          </div>

          {phases.map((phase) => (
            <Card key={phase.id} className="border-l-4" style={{ borderLeftColor: phase.status === 'completed' ? '#10B981' : phase.status === 'in_progress' ? '#2563EB' : '#D1D5DB' }}>
              <button
                onClick={() => togglePhase(phase.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-950/50"
              >
                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <h3 className="font-semibold text-white">
                      Phase {phase.phaseNumber}: {phase.phaseName}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">{phase.notes}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge className={getStatusBadge(phase.status)}>
                      {phase.status}
                    </Badge>
                    <p className="text-sm text-slate-400 mt-1">{phase.completionPercentage}% complete</p>
                  </div>
                </div>
              </button>

              {/* Phase Details */}
              {expandedPhases.includes(phase.id) && (
                <div className="border-t border-slate-800 p-4 bg-slate-950/50">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-slate-400">Start Date</p>
                      <p className="font-semibold text-white">
                        {phase.startDate ? new Date(phase.startDate).toLocaleDateString() : 'Not started'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Expected End</p>
                      <p className="font-semibold text-white">
                        {phase.expectedEndDate ? new Date(phase.expectedEndDate).toLocaleDateString() : 'TBD'}
                      </p>
                    </div>
                    {phase.actualEndDate && (
                      <div>
                        <p className="text-sm text-slate-400">Actual End</p>
                        <p className="font-semibold text-white">
                          {new Date(phase.actualEndDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    {phase.assignedTo && (
                      <div>
                        <p className="text-sm text-slate-400">Assigned To</p>
                        <p className="font-semibold text-white">{phase.assignedTo}</p>
                      </div>
                    )}
                  </div>

                  {/* Checklist Items */}
                  <div className="mt-4">
                    <h4 className="font-semibold text-white mb-3">Phase Checklist</h4>
                    <div className="space-y-2">
                      {checklists
                        .filter(c => c.projectPhaseId === phase.id)
                        .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
                        .map(item => (
                          <div key={item.id} className="flex items-start gap-3 p-2 bg-slate-900 rounded border border-slate-800">
                            <div>
                              {item.isCompleted ? (
                                <span className="text-emerald-400">✓</span>
                              ) : (
                                <span className="text-slate-500">○</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className={item.isCompleted ? 'text-slate-400 line-through' : 'text-white'}>
                                {item.itemText}
                              </p>
                              {item.completedBy && (
                                <p className="text-xs text-slate-400 mt-1">
                                  Completed by {item.completedBy}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Milestones Tab */}
      {activeTab === 'milestones' && (
        <div className="space-y-4">
          {milestones.map(milestone => (
            <Card key={milestone.id}>
              <button
                onClick={() => toggleMilestone(milestone.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-950/50"
              >
                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <h3 className="font-semibold text-white">{milestone.milestoneName}</h3>
                    <p className="text-sm text-slate-400 mt-1">{milestone.description}</p>
                  </div>
                </div>
                <Badge className={getStatusBadge(milestone.clientApproved ? 'paid' : 'pending')}>
                  {milestone.clientApproved ? 'Approved' : 'Pending'}
                </Badge>
              </button>

              {expandedMilestones.includes(milestone.id) && (
                <div className="border-t border-slate-800 p-4 bg-slate-950/50 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-400">Milestone Date</p>
                      <p className="font-semibold text-white">
                        {milestone.milestoneDate ? new Date(milestone.milestoneDate).toLocaleDateString() : 'TBD'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Client Approval</p>
                      <p className="font-semibold text-white">
                        {milestone.clientApprovalDate ? new Date(milestone.clientApprovalDate).toLocaleDateString() : 'Awaiting'}
                      </p>
                    </div>
                  </div>

                  {milestone.acceptanceCriteria && (
                    <div>
                      <p className="text-sm font-semibold text-white">Acceptance Criteria</p>
                      <p className="text-slate-300 mt-1">{milestone.acceptanceCriteria}</p>
                    </div>
                  )}

                  {milestone.deliverables && milestone.deliverables.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-white">Deliverables</p>
                      <ul className="mt-1 space-y-1">
                        {milestone.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="text-slate-300">• {deliverable}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Communications Tab */}
      {activeTab === 'communications' && (
        <div className="space-y-4">
          {communications.map(comm => (
            <Card key={comm.id} className="p-4">
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-white">{comm.subject}</h3>
                    <p className="text-sm text-slate-400 mt-1">
                      {new Date(comm.communicationDate).toLocaleString()} • {comm.communicationType}
                    </p>
                  </div>
                  {comm.isClientFacing && (
                    <Badge className="bg-emerald-900/20 text-green-800">Client Facing</Badge>
                  )}
                </div>
                <p className="text-slate-300 mt-3">{comm.notes}</p>
                <div className="mt-3">
                  <p className="text-xs font-semibold text-slate-400">Attendees</p>
                  <p className="text-sm text-slate-300 mt-1">{comm.attendees ? comm.attendees.join(', ') : 'N/A'}</p>
                </div>
                <p className="text-xs text-slate-400 mt-3">Logged by {comm.loggedBy}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="space-y-4">
          {documents.map(doc => (
            <Card key={doc.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{doc.documentName}</h3>
                  <p className="text-sm text-slate-400 mt-1">
                    {doc.documentType} • Version {doc.version} • Uploaded by {doc.uploadedBy}
                  </p>
                  <p className="text-sm text-slate-400 mt-1">{doc.notes}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {doc.isClientApproved ? (
                    <Badge className="bg-emerald-900/20 text-green-800">Approved</Badge>
                  ) : (
                    <Badge className="bg-amber-900/20 text-yellow-800">Pending</Badge>
                  )}
                  <a
                    href={doc.documentUrl}
                    className="text-blue-400 hover:text-blue-400 text-sm font-medium"
                  >
                    View →
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === 'payments' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatCard
              title="Total Contract Value"
              value={`$${payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}`}
            />
            <StatCard
              title="Paid Amount"
              value={`$${payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}`}
            />
            <StatCard
              title="Remaining"
              value={`$${payments.filter(p => p.status !== 'paid').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}`}
            />
          </div>

          {payments.map(payment => (
            <Card key={payment.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{payment.milestoneName}</h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Milestone {payment.milestoneNumber} • Due: {payment.dueDate ? new Date(payment.dueDate).toLocaleDateString() : 'TBD'}
                  </p>
                  <p className="text-sm text-slate-400 mt-1">{payment.notes}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="text-xl font-bold text-white">${payment.amount.toLocaleString()}</p>
                  <Badge className={getStatusBadge(payment.status)}>
                    {payment.status}
                  </Badge>
                  {payment.paidDate && (
                    <p className="text-xs text-slate-400">
                      Paid on {new Date(payment.paidDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
