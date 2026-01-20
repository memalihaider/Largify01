'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Badge, Button } from '@/components/ui';
import {
  mockClientUsers,
  mockClientProjects,
  mockProjects,
} from '@/lib/mock-data';

interface PageProps {
  params: Promise<{
    clientId: string;
  }>;
}

interface ProjectData {
  id: string;
  name: string;
  progress: number;
  status: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export default function ClientProjectsPage({ params }: PageProps) {
  const { clientId } = use(params);
  const client = mockClientUsers.find(c => c.id === clientId);
  const clientProjects = mockClientProjects.filter(cp => cp.clientId === clientId);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [assetForm, setAssetForm] = useState({
    name: '',
    type: 'infrastructure',
    priority: 'medium',
    budget: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
  });

  useEffect(() => {
    fetchProjects();
    // Poll for real-time updates every 5 seconds
    const interval = setInterval(fetchProjects, 5000);
    return () => clearInterval(interval);
  }, [clientId]);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`/api/projects?clientId=${clientId}`);
      const data = await response.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] bg-slate-900 border border-white/5 rounded-[3rem] p-12 text-center">
        <div className="h-16 w-16 bg-red-500/10 rounded-full flex items-center justify-center text-3xl mb-6">🚫</div>
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">PROJECT REGISTRY OFFLINE</h2>
        <p className="text-slate-500 italic text-sm mt-2">Unable to synchronize with project database.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/5">
        <div>
          <Badge variant="outline" className="mb-4 bg-blue-500/5 text-blue-400 border-blue-500/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.4em]">
            Asset Control & Deployment
          </Badge>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">
            ACTIVE <span className="text-blue-500">BUILDS</span>
          </h1>
          <p className="text-slate-400 font-light italic mt-4 max-w-xl">
            Monitor the lifecycle of your infrastructure developments. Real-time trajectory tracking for all authorized enterprise initiatives.
          </p>
        </div>
        <div className="flex gap-4">
           <Button 
             onClick={() => setShowAssetModal(true)}
             className="h-14 bg-blue-600 text-white font-black uppercase tracking-[0.2em] rounded-2xl px-8 hover:bg-blue-500 transition-all">
              REQUEST NEW ASSET
           </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { label: 'Total Initiatives', val: projects.length },
           { label: 'Mean Velocity', val: `${Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / Math.max(projects.length, 1))}%` },
           { label: 'Security Handshakes', val: '100%' },
           { label: 'Trajectory Status', val: 'STABLE' },
         ].map((s, i) => (
           <div key={i} className="p-6 bg-slate-900/40 border border-white/5 rounded-3xl">
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">{s.label}</p>
              <p className="text-xl font-black text-white italic">{s.val}</p>
           </div>
         ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <div className="animate-pulse text-slate-400 font-black uppercase">Loading projects...</div>
          </div>
        ) : projects.length > 0 ? (
          projects.map((project) => {
            const progress = project.progress || 0;

            return (
              <Link key={project.id} href={`/client/${clientId}/projects/${project.id}`}>
              <Card className="group relative bg-slate-900 border-white/5 hover:border-blue-500/40 rounded-[2.5rem] overflow-hidden transition-all duration-500 shadow-2xl cursor-pointer h-full">
                {/* Visual Progress Background */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-600/5 to-transparent pointer-events-none" />
                <div 
                  className="absolute left-0 bottom-0 h-1 bg-linear-to-r from-blue-600 to-cyan-400 transition-all duration-1000 group-hover:h-2" 
                  style={{ width: `${progress}%` }} 
                />

                <div className="p-10 relative z-10">
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-10">
                    <div className="flex gap-4 items-center">
                       <div className="h-14 w-14 bg-slate-950 border border-white/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-xl">
                          🏗️
                       </div>
                       <div>
                          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[9px] font-black tracking-widest uppercase px-3 py-1 mb-1">
                             {project.status || 'Active'}
                          </Badge>
                          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">ID: {project.id}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <span className="text-3xl font-black text-white monospace italic">{Math.round(progress)}%</span>
                       <p className="text-[9px] font-black text-slate-500 uppercase mt-1">Completion</p>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="mb-10">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 group-hover:text-blue-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-slate-400 font-medium italic leading-relaxed line-clamp-3">
                      {project.description || 'Enterprise infrastructure project with multiple integration points and security requirements.'}
                    </p>
                  </div>

                  {/* Infrastructure Progress Area */}
                  <div className="space-y-8 mb-10 pb-10 border-b border-white/5">
                    {/* Progress Track */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center group/log">
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Infrastructure Build Progress</span>
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] opacity-0 group-hover/log:opacity-100 transition-opacity italic">Live Node: HKG-8</span>
                      </div>
                      <div className="h-3 w-full bg-slate-950/80 rounded-full border border-white/5 p-1">
                        <div
                          className="h-full bg-linear-to-r from-blue-600 via-cyan-400 to-blue-500 border border-white/20 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all duration-1000 relative overflow-hidden"
                          style={{ width: `${progress}%` }}
                        >
                           <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] w-20 animate-shimmer" style={{ animation: 'shimmer 2s infinite linear' }} />
                        </div>
                      </div>
                    </div>

                    {/* Meta Info Grid */}
                    <div className="grid grid-cols-2 gap-8">
                       <div className="space-y-1">
                          <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Deployment Origin</p>
                          <p className="text-sm font-black text-white uppercase tracking-tight italic">
                            {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'INITIALIZING...'}
                          </p>
                       </div>
                       <div className="space-y-1 text-right">
                          <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Target Convergence</p>
                          <p className="text-sm font-black text-blue-400 uppercase tracking-tight italic">
                            {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'UNKNOWN'}
                          </p>
                       </div>
                    </div>
                  </div>

                  {/* Operational Controls */}
                  <div className="flex flex-col sm:flex-row gap-4">
                     <Button className="flex-1 h-14 bg-white/5 border border-white/10 rounded-2xl hover:bg-white hover:text-slate-950 font-black uppercase tracking-[0.2em] text-[10px] transition-all">
                        VIEW BUILD LOGS
                     </Button>
                     <Button className="flex-1 h-14 bg-blue-600/10 border border-blue-500/30 text-blue-400 hover:bg-blue-600 hover:text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all">
                        SECURITY HANDSHAKE
                     </Button>
                  </div>
                </div>
              </Card>
              </Link>
            );
          })
        ) : (
          <div className="col-span-full p-20 bg-slate-900 border border-dashed border-white/10 rounded-[3rem] text-center">
             <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">📁</div>
             <p className="text-xl font-black text-white uppercase tracking-tighter italic">NO ACTIVE BUILDS DETECTED</p>
             <p className="text-slate-500 text-sm mt-2 italic font-medium">Initiate your first infrastructure project to begin tracking.</p>
             <Button className="mt-8 bg-blue-600 text-white font-black uppercase tracking-widest px-10 h-14 rounded-2xl">INITIALIZE BUILD</Button>
          </div>
        )}
      </div>

      {/* Decorative Shimmer Keyframe */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>

      {/* REQUEST NEW ASSET MODAL */}
      {showAssetModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={() => setShowAssetModal(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-white/10 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8 border-b border-white/5 flex items-center justify-between sticky top-0 bg-slate-900">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">REQUEST NEW ASSET</h2>
                <button onClick={() => setShowAssetModal(false)} className="text-slate-400 hover:text-white text-2xl">✕</button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                setShowAssetModal(false);
                setAssetForm({ name: '', type: 'infrastructure', priority: 'medium', budget: '', description: '', startDate: new Date().toISOString().split('T')[0], endDate: '' });
                alert(`Asset "${assetForm.name}" submitted for approval! Your request has been forwarded to the infrastructure team.`);
              }} className="p-8 space-y-6">
                
                {/* Project Name */}
                <div>
                  <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">Asset Name *</label>
                  <input 
                    type="text" 
                    value={assetForm.name} 
                    onChange={(e) => setAssetForm({...assetForm, name: e.target.value})} 
                    placeholder="e.g., Cloud Infrastructure Upgrade" 
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                    required 
                  />
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Asset Type */}
                  <div>
                    <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">Asset Type *</label>
                    <select 
                      value={assetForm.type} 
                      onChange={(e) => setAssetForm({...assetForm, type: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                    >
                      <option value="infrastructure">Infrastructure</option>
                      <option value="software">Software</option>
                      <option value="hardware">Hardware</option>
                      <option value="service">Service</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">Priority</label>
                    <select 
                      value={assetForm.priority} 
                      onChange={(e) => setAssetForm({...assetForm, priority: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                {/* Budget & Dates */}
                <div className="grid grid-cols-3 gap-6">
                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">Budget (USD)</label>
                    <input 
                      type="number" 
                      value={assetForm.budget} 
                      onChange={(e) => setAssetForm({...assetForm, budget: e.target.value})} 
                      placeholder="e.g., 50000" 
                      className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">Start Date</label>
                    <input 
                      type="date" 
                      value={assetForm.startDate} 
                      onChange={(e) => setAssetForm({...assetForm, startDate: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>

                  {/* End Date */}
                  <div>
                    <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">Target End Date</label>
                    <input 
                      type="date" 
                      value={assetForm.endDate} 
                      onChange={(e) => setAssetForm({...assetForm, endDate: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">Description & Requirements</label>
                  <textarea 
                    value={assetForm.description} 
                    onChange={(e) => setAssetForm({...assetForm, description: e.target.value})} 
                    placeholder="Describe the asset, its purpose, specifications, and any specific requirements..." 
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                  />
                </div>

                {/* Information Box */}
                <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-4 space-y-2">
                  <p className="text-sm font-black text-blue-400 uppercase tracking-wider">📋 SUBMISSION PROCESS</p>
                  <p className="text-xs text-slate-300 italic">Your asset request will be reviewed by the infrastructure team within 24 hours. You'll receive email confirmation and status updates as the request progresses through approval.</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t border-white/5">
                  <Button 
                    type="button" 
                    onClick={() => setShowAssetModal(false)} 
                    className="flex-1 h-12 bg-slate-800 border border-white/10 text-white font-black uppercase tracking-wider rounded-xl hover:bg-slate-700 transition-colors"
                  >
                    CANCEL
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 h-12 bg-blue-600 text-white font-black uppercase tracking-wider rounded-xl hover:bg-blue-500 transition-colors"
                  >
                    SUBMIT REQUEST
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
