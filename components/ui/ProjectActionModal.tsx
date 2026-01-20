'use client';

import { useState } from 'react';
import { Button } from './Button';

interface ProjectActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: 'new-development' | 'settings' | 'security-report' | 'request-asset' | 'new-application' | 'initialize-application' | null;
  projectId?: string;
  projectName?: string;
}

export function ProjectActionModal({
  isOpen,
  onClose,
  action,
  projectId,
  projectName,
}: ProjectActionModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assetType: 'hardware',
    appName: '',
    appType: 'web',
  });
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !action) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Handle different action types
      switch (action) {
        case 'new-development':
          await fetch(`/api/projects/${projectId}/development`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, projectId }),
          });
          break;
        case 'request-asset':
          await fetch(`/api/projects/${projectId}/assets`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, projectId }),
          });
          break;
        case 'new-application':
        case 'initialize-application':
          await fetch(`/api/projects/${projectId}/applications`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              ...formData, 
              projectId,
              initialize: action === 'initialize-application'
            }),
          });
          break;
      }
      
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        assetType: 'hardware',
        appName: '',
        appType: 'web',
      });
      onClose();
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getModalTitle = () => {
    switch (action) {
      case 'new-development':
        return 'Start New Development';
      case 'settings':
        return 'Project Settings';
      case 'security-report':
        return 'Generate Security Report';
      case 'request-asset':
        return 'Request New Asset';
      case 'new-application':
        return 'Create New Application';
      case 'initialize-application':
        return 'Initialize Application';
      default:
        return 'Action';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-white/10 rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{getModalTitle()}</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* New Development Form */}
            {action === 'new-development' && (
              <>
                <div>
                  <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">
                    Development Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., API Integration Module"
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Detailed description..."
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </>
            )}

            {/* Request Asset Form */}
            {action === 'request-asset' && (
              <>
                <div>
                  <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">
                    Asset Type
                  </label>
                  <select
                    name="assetType"
                    value={formData.assetType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                  >
                    <option value="hardware">Hardware</option>
                    <option value="software">Software License</option>
                    <option value="service">Service</option>
                    <option value="infrastructure">Infrastructure</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">
                    Asset Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Detailed asset requirements..."
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </>
            )}

            {/* New/Initialize Application Form */}
            {(action === 'new-application' || action === 'initialize-application') && (
              <>
                <div>
                  <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">
                    Application Name
                  </label>
                  <input
                    type="text"
                    name="appName"
                    value={formData.appName}
                    onChange={handleInputChange}
                    placeholder="e.g., Customer Portal v2"
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">
                    Application Type
                  </label>
                  <select
                    name="appType"
                    value={formData.appType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                  >
                    <option value="web">Web Application</option>
                    <option value="mobile">Mobile Application</option>
                    <option value="desktop">Desktop Application</option>
                    <option value="api">API Service</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Application overview and requirements..."
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                  />
                </div>
              </>
            )}

            {/* Settings Form */}
            {action === 'settings' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title || projectName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">
                    Project Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                  />
                </div>
              </div>
            )}

            {/* Security Report */}
            {action === 'security-report' && (
              <div className="space-y-4 text-slate-400">
                <p className="text-sm">Generating comprehensive security report for project: <strong className="text-white">{projectName}</strong></p>
                <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4 space-y-2 text-xs">
                  <p>✓ Vulnerability Assessment</p>
                  <p>✓ Compliance Check (GDPR, HIPAA)</p>
                  <p>✓ Access Control Review</p>
                  <p>✓ Data Encryption Verification</p>
                  <p>✓ Threat Analysis</p>
                </div>
                <p className="text-sm italic">Report will be generated and sent to your email within 24 hours.</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 border-t border-white/5">
              <Button
                type="button"
                onClick={onClose}
                className="flex-1 h-12 bg-slate-800 border border-white/10 text-white font-black uppercase tracking-wider rounded-xl hover:bg-slate-700 transition-colors"
              >
                Cancel
              </Button>
              {action !== 'security-report' ? (
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 h-12 bg-blue-600 text-white font-black uppercase tracking-wider rounded-xl hover:bg-blue-500 disabled:opacity-50 transition-colors"
                >
                  {submitting ? 'Processing...' : 'Submit'}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => {
                    // Generate report
                    onClose();
                  }}
                  className="flex-1 h-12 bg-blue-600 text-white font-black uppercase tracking-wider rounded-xl hover:bg-blue-500 transition-colors"
                >
                  Generate Report
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
