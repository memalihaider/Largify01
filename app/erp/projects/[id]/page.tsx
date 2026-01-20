'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Badge, Button, Card, Input, StatCard } from '@/components/ui';
import {
  ChevronDown, ChevronUp, Trash2, Plus, Edit2, Save, X,
  AlertCircle, CheckCircle2, Clock, DollarSign, Users
} from 'lucide-react';
import {
  mockProjects, mockProjectPhases, mockProjectMilestones,
  mockProjectCommunications, mockProjectDocuments, mockProjectPaymentMilestones,
  mockProjectModules, mockProjectTeamMembers, mockProjectPayments,
  mockUsers
} from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import type {
  Project, ProjectPhase, ProjectMilestone, ProjectCommunication,
  ProjectDocument, ProjectPaymentMilestone, ProjectModule, ProjectTeamMember,
  ProjectPayment
} from '@/lib/types';

interface EditableState {
  phases: ProjectPhase[];
  modules: ProjectModule[];
  teamMembers: ProjectTeamMember[];
  payments: ProjectPayment[];
  communications: ProjectCommunication[];
  documents: ProjectDocument[];
}

interface EditingItem {
  type: 'phase' | 'module' | 'team' | 'payment' | 'communication' | 'document' | null;
  id: string | null;
}

interface FormData {
  [key: string]: any;
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const projectId = resolvedParams.id;

  const project = mockProjects.find(p => p.id === projectId) as Project | undefined;
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set(['phase-001']));
  const [editingItem, setEditingItem] = useState<EditingItem>({ type: null, id: null });
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({});

  const [state, setState] = useState<EditableState>({
    phases: mockProjectPhases.filter(p => p.projectId === projectId),
    modules: mockProjectModules.filter(m => m.projectId === projectId),
    teamMembers: mockProjectTeamMembers.filter(t => t.projectId === projectId),
    payments: mockProjectPayments.filter(p => p.projectId === projectId),
    communications: mockProjectCommunications.filter(c => c.projectId === projectId),
    documents: mockProjectDocuments.filter(d => d.projectId === projectId),
  });

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="text-center p-8">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Project Not Found</h2>
          <Button onClick={() => router.back()} className="mt-4">Back to Projects</Button>
        </Card>
      </div>
    );
  }

  const togglePhase = (phaseId: string) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phaseId)) {
      newExpanded.delete(phaseId);
    } else {
      newExpanded.add(phaseId);
    }
    setExpandedPhases(newExpanded);
  };

  // Phase Handlers
  const openPhaseModal = (phaseId?: string) => {
    if (phaseId) {
      const phase = state.phases.find(p => p.id === phaseId);
      if (phase) {
        setFormData({
          phaseName: phase.phaseName,
          notes: phase.notes || '',
          status: phase.status,
          completionPercentage: phase.completionPercentage || 0,
          startDate: phase.startDate ? new Date(phase.startDate).toISOString().split('T')[0] : '',
          expectedEndDate: phase.expectedEndDate ? new Date(phase.expectedEndDate).toISOString().split('T')[0] : '',
        });
        setEditingItem({ type: 'phase', id: phaseId });
      }
    } else {
      setFormData({
        phaseName: '',
        notes: '',
        status: 'pending',
        completionPercentage: 0,
        startDate: new Date().toISOString().split('T')[0],
        expectedEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      });
      setEditingItem({ type: 'phase', id: null });
    }
    setShowModal(true);
  };

  const savePhase = () => {
    if (!formData.phaseName) {
      alert('Phase name is required');
      return;
    }

    if (editingItem.id) {
      // Update existing
      setState({
        ...state,
        phases: state.phases.map(p =>
          p.id === editingItem.id
            ? {
                ...p,
                phaseName: formData.phaseName,
                notes: formData.notes,
                status: formData.status,
                completionPercentage: formData.completionPercentage,
                startDate: new Date(formData.startDate),
                expectedEndDate: new Date(formData.expectedEndDate),
                updatedAt: new Date(),
              }
            : p
        ),
      });
    } else {
      // Create new
      const newPhase: ProjectPhase = {
        id: `phase-${Date.now()}`,
        projectId,
        phaseNumber: state.phases.length + 1,
        phaseName: formData.phaseName,
        status: formData.status,
        startDate: new Date(formData.startDate),
        expectedEndDate: new Date(formData.expectedEndDate),
        completionPercentage: formData.completionPercentage,
        notes: formData.notes,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setState({ ...state, phases: [...state.phases, newPhase] });
    }
    setShowModal(false);
    setEditingItem({ type: null, id: null });
    alert('Phase saved successfully!');
  };

  const handleDeletePhase = (phaseId: string) => {
    if (confirm('Are you sure you want to delete this phase?')) {
      setState({ ...state, phases: state.phases.filter(p => p.id !== phaseId) });
    }
  };

  // Module Handlers
  const openModuleModal = (moduleId?: string) => {
    if (moduleId) {
      const module = state.modules.find(m => m.id === moduleId);
      if (module) {
        setFormData({
          moduleName: module.moduleName,
          description: module.description,
          moduleType: module.moduleType,
          status: module.status,
          budgetAllocated: module.budgetAllocated || 0,
          startDate: module.startDate ? new Date(module.startDate).toISOString().split('T')[0] : '',
          endDate: module.endDate ? new Date(module.endDate).toISOString().split('T')[0] : '',
        });
        setEditingItem({ type: 'module', id: moduleId });
      }
    } else {
      setFormData({
        moduleName: '',
        description: '',
        moduleType: 'custom',
        status: 'planned',
        budgetAllocated: 0,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      });
      setEditingItem({ type: 'module', id: null });
    }
    setShowModal(true);
  };

  const saveModule = () => {
    if (!formData.moduleName) {
      alert('Module name is required');
      return;
    }

    if (editingItem.id) {
      setState({
        ...state,
        modules: state.modules.map(m =>
          m.id === editingItem.id
            ? {
                ...m,
                moduleName: formData.moduleName,
                description: formData.description,
                moduleType: formData.moduleType,
                status: formData.status,
                budgetAllocated: parseFloat(formData.budgetAllocated),
                startDate: new Date(formData.startDate),
                endDate: new Date(formData.endDate),
                updatedAt: new Date(),
              }
            : m
        ),
      });
    } else {
      const newModule: ProjectModule = {
        id: `mod-${Date.now()}`,
        projectId,
        moduleName: formData.moduleName,
        description: formData.description,
        moduleType: formData.moduleType,
        orderIndex: state.modules.length,
        status: formData.status,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        budgetAllocated: parseFloat(formData.budgetAllocated),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setState({ ...state, modules: [...state.modules, newModule] });
    }
    setShowModal(false);
    setEditingItem({ type: null, id: null });
    alert('Module saved successfully!');
  };

  const handleDeleteModule = (moduleId: string) => {
    if (confirm('Are you sure you want to delete this module?')) {
      setState({ ...state, modules: state.modules.filter(m => m.id !== moduleId) });
    }
  };

  // Team Member Handlers
  const openTeamModal = (memberId?: string) => {
    if (memberId) {
      const member = state.teamMembers.find(t => t.id === memberId);
      if (member) {
        setFormData({
          userId: member.userId,
          role: member.role,
          responsibility: member.responsibility,
          allocationPercentage: member.allocationPercentage,
        });
        setEditingItem({ type: 'team', id: memberId });
      }
    } else {
      setFormData({
        userId: 'emp-001',
        role: 'Developer',
        responsibility: '',
        allocationPercentage: 50,
      });
      setEditingItem({ type: 'team', id: null });
    }
    setShowModal(true);
  };

  const saveTeamMember = () => {
    if (formData.allocationPercentage < 0 || formData.allocationPercentage > 100) {
      alert('Allocation percentage must be between 0 and 100');
      return;
    }

    if (editingItem.id) {
      setState({
        ...state,
        teamMembers: state.teamMembers.map(m =>
          m.id === editingItem.id
            ? {
                ...m,
                userId: formData.userId,
                role: formData.role,
                responsibility: formData.responsibility,
                allocationPercentage: formData.allocationPercentage,
              }
            : m
        ),
      });
    } else {
      const newMember: ProjectTeamMember = {
        id: `ptm-${Date.now()}`,
        projectId,
        userId: formData.userId,
        role: formData.role,
        responsibility: formData.responsibility,
        allocationPercentage: formData.allocationPercentage,
        assignedAt: new Date(),
      };
      setState({ ...state, teamMembers: [...state.teamMembers, newMember] });
    }
    setShowModal(false);
    setEditingItem({ type: null, id: null });
    alert('Team member saved successfully!');
  };

  const handleDeleteTeamMember = (memberId: string) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      setState({ ...state, teamMembers: state.teamMembers.filter(m => m.id !== memberId) });
    }
  };

  // Payment Handlers
  const openPaymentModal = (paymentId?: string) => {
    if (paymentId) {
      const payment = state.payments.find(p => p.id === paymentId);
      if (payment) {
        setFormData({
          paymentType: payment.paymentType,
          amount: payment.amount,
          currency: payment.currency,
          status: payment.status,
          dueDate: payment.dueDate ? new Date(payment.dueDate).toISOString().split('T')[0] : '',
          paymentMethod: payment.paymentMethod || '',
          referenceNumber: payment.referenceNumber || '',
        });
        setEditingItem({ type: 'payment', id: paymentId });
      }
    } else {
      setFormData({
        paymentType: 'milestone',
        amount: 0,
        currency: 'USD',
        status: 'pending',
        dueDate: new Date().toISOString().split('T')[0],
        paymentMethod: '',
        referenceNumber: '',
      });
      setEditingItem({ type: 'payment', id: null });
    }
    setShowModal(true);
  };

  const savePayment = () => {
    if (formData.amount <= 0) {
      alert('Amount must be greater than 0');
      return;
    }

    if (editingItem.id) {
      setState({
        ...state,
        payments: state.payments.map(p =>
          p.id === editingItem.id
            ? {
                ...p,
                paymentType: formData.paymentType,
                amount: parseFloat(formData.amount),
                currency: formData.currency,
                status: formData.status,
                dueDate: new Date(formData.dueDate),
                paymentMethod: formData.paymentMethod,
                referenceNumber: formData.referenceNumber,
                updatedAt: new Date(),
              }
            : p
        ),
      });
    } else {
      const newPayment: ProjectPayment = {
        id: `pp-${Date.now()}`,
        projectId,
        paymentType: formData.paymentType,
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        dueDate: new Date(formData.dueDate),
        status: formData.status,
        paymentMethod: formData.paymentMethod,
        referenceNumber: formData.referenceNumber,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setState({ ...state, payments: [...state.payments, newPayment] });
    }
    setShowModal(false);
    setEditingItem({ type: null, id: null });
    alert('Payment saved successfully!');
  };

  const handleDeletePayment = (paymentId: string) => {
    if (confirm('Are you sure you want to delete this payment?')) {
      setState({ ...state, payments: state.payments.filter(p => p.id !== paymentId) });
    }
  };

  const handleSaveChanges = () => {
    // In a real app, this would save to a database
    alert('All changes saved successfully!');
  };

  const totalPaymentsDue = state.payments.reduce((sum, p) => sum + (p.status === 'due' ? p.amount : 0), 0);
  const totalPaymentsPaid = state.payments.reduce((sum, p) => sum + (p.status === 'paid' ? p.amount : 0), 0);
  const projectProgress = state.phases.length > 0
    ? Math.round(state.phases.reduce((sum, p) => sum + (p.completionPercentage || 0), 0) / state.phases.length)
    : 0;

  // Modal Component
  const renderModal = () => {
    if (!showModal) return null;

    let title = '';
    let fields: Array<{ key: string; label: string; type: string; required?: boolean; min?: number; max?: number }> = [];

    if (editingItem.type === 'phase') {
      title = editingItem.id ? 'Edit Phase' : 'Add Phase';
      fields = [
        { key: 'phaseName', label: 'Phase Name', type: 'text', required: true },
        { key: 'status', label: 'Status', type: 'select', required: true },
        { key: 'completionPercentage', label: 'Completion %', type: 'number', min: 0, max: 100 },
        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
        { key: 'expectedEndDate', label: 'End Date', type: 'date', required: true },
        { key: 'notes', label: 'Notes', type: 'textarea' },
      ];
    } else if (editingItem.type === 'module') {
      title = editingItem.id ? 'Edit Module' : 'Add Module';
      fields = [
        { key: 'moduleName', label: 'Module Name', type: 'text', required: true },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'moduleType', label: 'Module Type', type: 'select', required: true },
        { key: 'status', label: 'Status', type: 'select', required: true },
        { key: 'budgetAllocated', label: 'Budget Allocated', type: 'number', min: 0 },
        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
        { key: 'endDate', label: 'End Date', type: 'date', required: true },
      ];
    } else if (editingItem.type === 'team') {
      title = editingItem.id ? 'Edit Team Member' : 'Add Team Member';
      fields = [
        { key: 'userId', label: 'Team Member', type: 'select', required: true },
        { key: 'role', label: 'Role', type: 'text', required: true },
        { key: 'responsibility', label: 'Responsibility', type: 'textarea' },
        { key: 'allocationPercentage', label: 'Allocation %', type: 'number', min: 0, max: 100 },
      ];
    } else if (editingItem.type === 'payment') {
      title = editingItem.id ? 'Edit Payment' : 'Add Payment';
      fields = [
        { key: 'paymentType', label: 'Payment Type', type: 'select', required: true },
        { key: 'amount', label: 'Amount', type: 'number', required: true, min: 0 },
        { key: 'currency', label: 'Currency', type: 'text', required: true },
        { key: 'status', label: 'Status', type: 'select', required: true },
        { key: 'dueDate', label: 'Due Date', type: 'date', required: true },
        { key: 'paymentMethod', label: 'Payment Method', type: 'text' },
        { key: 'referenceNumber', label: 'Reference Number', type: 'text' },
      ];
    }

    const statusOptions = ['pending', 'in_progress', 'completed'];
    const moduleTypeOptions = ['custom', 'design', 'development', 'testing', 'deployment'];
    const moduleStatusOptions = ['planned', 'in_progress', 'completed'];
    const paymentTypeOptions = ['advance', 'milestone', 'final'];
    const paymentStatusOptions = ['pending', 'due', 'paid'];
    const userOptions = mockUsers.slice(0, 3);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Card className="w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <button onClick={() => { setShowModal(false); setEditingItem({ type: null, id: null }); }}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {fields.map(field => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {field.label}
                  {field.required && <span className="text-red-600">*</span>}
                </label>
                {field.type === 'select' ? (
                  <select
                    value={formData[field.key] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="">Select...</option>
                    {field.key === 'status' && statusOptions.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                    {field.key === 'moduleType' && moduleTypeOptions.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                    {field.key === 'status' && editingItem.type === 'module' && moduleStatusOptions.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                    {field.key === 'paymentType' && paymentTypeOptions.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                    {field.key === 'status' && editingItem.type === 'payment' && paymentStatusOptions.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                    {field.key === 'userId' && userOptions.map(u => (
                      <option key={u.id} value={u.id}>{u.fullName || `${u.firstName} ${u.lastName}`}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    value={formData[field.key] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    rows={3}
                  />
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.key] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.key]: field.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value })}
                    min={field.min}
                    max={field.max}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => {
                if (editingItem.type === 'phase') savePhase();
                else if (editingItem.type === 'module') saveModule();
                else if (editingItem.type === 'team') saveTeamMember();
                else if (editingItem.type === 'payment') savePayment();
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Save
            </Button>
            <Button
              onClick={() => { setShowModal(false); setEditingItem({ type: null, id: null }); }}
              variant="ghost"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-1"
          >
            ← Back to Projects
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">{project.name}</h1>
              <p className="text-slate-600">{project.description}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveChanges} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Save All Changes
              </Button>
              <Button onClick={() => router.back()} variant="ghost">
                Close
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Overall Progress"
            value={`${projectProgress}%`}
            trend={projectProgress}
            icon={<CheckCircle2 className="w-6 h-6" />}
          />
          <StatCard
            title="Total Budget"
            value={formatCurrency(project.budget || 0)}
            trend={project.budget || 0}
            icon={<DollarSign className="w-6 h-6" />}
          />
          <StatCard
            title="Team Members"
            value={state.teamMembers.length.toString()}
            trend={state.teamMembers.length}
            icon={<Users className="w-6 h-6" />}
          />
          <StatCard
            title="Due Payments"
            value={formatCurrency(totalPaymentsDue)}
            trend={totalPaymentsDue}
            icon={<AlertCircle className="w-6 h-6" />}
          />
        </div>

        {/* Main Content Tabs */}
        <div className="space-y-6">
          {/* PHASES SECTION */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Project Phases</h2>
              <Button onClick={() => openPhaseModal()} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Phase
              </Button>
            </div>

            <div className="space-y-4">
              {state.phases.map(phase => (
                <div key={phase.id} className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="px-4 py-3 bg-slate-50 hover:bg-slate-100 flex justify-between items-center cursor-pointer" onClick={() => togglePhase(phase.id)}>
                    <div className="flex items-center gap-3">
                      {expandedPhases.has(phase.id) ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                      <div className="text-left">
                        <div className="font-semibold text-slate-900">Phase {phase.phaseNumber}: {phase.phaseName}</div>
                        <div className="text-sm text-slate-500">{phase.notes || 'No notes'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`bg-${
                        phase.status === 'completed' ? 'green' :
                        phase.status === 'in_progress' ? 'blue' : 'slate'
                      }-100 text-${
                        phase.status === 'completed' ? 'green' :
                        phase.status === 'in_progress' ? 'blue' : 'slate'
                      }-700`}>
                        {phase.status}
                      </Badge>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openPhaseModal(phase.id);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePhase(phase.id);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {expandedPhases.has(phase.id) && (
                    <div className="p-4 bg-white border-t border-slate-200">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Phase Name</label>
                          <Input value={phase.phaseName} placeholder="Phase name" readOnly />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                          <div className="p-2 bg-slate-50 rounded text-sm">{phase.status}</div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Completion</label>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${phase.completionPercentage || 0}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{phase.completionPercentage || 0}%</span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                        <div className="p-2 bg-slate-50 rounded text-sm">{phase.notes || '-'}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                          <div className="p-2 bg-slate-50 rounded text-sm">{phase.startDate ? formatDate(phase.startDate) : '-'}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                          <div className="p-2 bg-slate-50 rounded text-sm">{phase.expectedEndDate ? formatDate(phase.expectedEndDate) : '-'}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* PROJECT MODULES SECTION */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Project Modules</h2>
              <Button onClick={() => openModuleModal()} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Module
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {state.modules.map(module => (
                <div key={module.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-slate-900">{module.moduleName}</h3>
                      <Badge className="text-xs mt-1 bg-blue-100 text-blue-700">{module.moduleType}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModuleModal(module.id)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteModule(module.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{module.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <span className="text-slate-500">Start:</span>
                      <div className="font-medium">{module.startDate ? formatDate(module.startDate) : '-'}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">End:</span>
                      <div className="font-medium">{module.endDate ? formatDate(module.endDate) : '-'}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Budget:</span>
                      <div className="font-medium">{formatCurrency(module.budgetAllocated || 0)}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Status:</span>
                      <div className="font-medium">{module.status}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* TEAM MEMBERS SECTION */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Team Members</h2>
              <Button onClick={() => openTeamModal()} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Team Member
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Name</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Role</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Responsibility</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Allocation</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {state.teamMembers.map(member => {
                    const user = mockUsers.find(u => u.id === member.userId);
                    return (
                      <tr key={member.id} className="border-t border-slate-200">
                        <td className="px-4 py-3 text-sm">{user?.fullName || `${user?.firstName} ${user?.lastName}` || 'Unknown'}</td>
                        <td className="px-4 py-3 text-sm font-medium">{member.role}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{member.responsibility}</td>
                        <td className="px-4 py-3 text-sm">{member.allocationPercentage}%</td>
                        <td className="px-4 py-3 text-sm flex gap-2">
                          <button
                            onClick={() => openTeamModal(member.id)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTeamMember(member.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* PAYMENTS SECTION */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Payment Tracking</h2>
              <Button onClick={() => openPaymentModal()} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Payment
              </Button>
            </div>

            <div className="space-y-3 mb-6">
              {state.payments.map(payment => (
                <div key={payment.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">{payment.paymentType.toUpperCase()}</div>
                    <div className="text-sm text-slate-600">
                      Due: {payment.dueDate ? formatDate(payment.dueDate) : 'N/A'}
                    </div>
                  </div>
                  <div className="text-right mr-4">
                    <div className="font-semibold text-slate-900">{formatCurrency(payment.amount)}</div>
                    <Badge className={`text-xs mt-1 bg-${
                      payment.status === 'paid' ? 'green' :
                      payment.status === 'due' ? 'red' : 'yellow'
                    }-100 text-${
                      payment.status === 'paid' ? 'green' :
                      payment.status === 'due' ? 'red' : 'yellow'
                    }-700`}>
                      {payment.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openPaymentModal(payment.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePayment(payment.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              <div>
                <div className="text-sm text-slate-600">Total Due</div>
                <div className="text-2xl font-bold text-red-600">{formatCurrency(totalPaymentsDue)}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600">Total Paid</div>
                <div className="text-2xl font-bold text-green-600">{formatCurrency(totalPaymentsPaid)}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600">Total Invoiced</div>
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(state.payments.reduce((sum, p) => sum + p.amount, 0))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {renderModal()}
    </div>
  );
}
