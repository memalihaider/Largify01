'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { Card, Badge, Button } from '@/components/ui';
import {
  mockClientUsers,
  mockClientProjects,
  mockClientApplications,
  mockClientTaskTracking,
  mockProjects,
} from '@/lib/mock-data';

interface PageProps {
  params: Promise<{
    clientId: string;
  }>;
}

export default function ClientDashboardPage({ params }: PageProps) {
  const { clientId } = use(params);
  const client = mockClientUsers.find(c => c.id === clientId);
  const clientProjects = mockClientProjects.filter(cp => cp.clientId === clientId);
  const clientApplications = mockClientApplications.filter(ca => ca.clientId === clientId);
  const clientTasks = mockClientTaskTracking.filter(ct => ct.clientId === clientId);

  const [showDeploymentModal, setShowDeploymentModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [deploymentForm, setDeploymentForm] = useState({
    name: '',
    environment: 'production',
    version: '',
    description: '',
  });
  const [settingsForm, setSettingsForm] = useState({
    companyName: client?.name || '',
    apiKey: '',
    webhookUrl: '',
    maxDeployments: '10',
  });

  if (!client) {
    return <div>Client not found</div>;
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Hero Welcome Section - Dynamic Growth Vibe */}
      <section className="relative p-12 lg:p-16 bg-slate-900 border border-white/10 rounded-[3rem] overflow-hidden group shadow-2xl">
        {/* Animated Background Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-blue-600/10 to-transparent" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-700" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          <div className="max-w-2xl">
            <Badge variant="info" className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
              Operational Intelligence Dashboard
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-8">
              WELCOME BACK, <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500 uppercase">{client.name.split(' ')[0]}</span>
            </h1>
            <p className="text-xl text-slate-400 font-light leading-relaxed italic max-w-lg">
              Deployment protocols are live. Track your enterprise trajectory and infrastructure development in real-time.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 min-w-[280px]">
            <div className="p-6 bg-slate-950/50 backdrop-blur-xl border border-white/5 rounded-3xl group/metric">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1 group-hover/metric:text-cyan-400 transition-colors">Infrastructure Health</p>
              <div className="flex items-center justify-between">
                 <span className="text-2xl font-black text-white italic">OPTIMAL</span>
                 <span className="text-green-500 font-bold text-xs animate-pulse">● v4.2</span>
              </div>
              <div className="mt-4 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                 <div className="h-full bg-linear-to-r from-blue-600 to-cyan-400 w-[94%]" />
              </div>
            </div>
            <div className="flex gap-4">
              <Button 
                onClick={() => setShowDeploymentModal(true)}
                className="flex-1 bg-blue-600 text-white hover:bg-blue-500 font-black uppercase tracking-widest text-[10px] h-14 rounded-2xl transition-all">
                NEW DEPLOYMENT
              </Button>
              <Button 
                onClick={() => setShowSettingsModal(true)}
                variant="outline" 
                className="h-14 w-14 border-white/10 text-white rounded-2xl hover:bg-white/5">
                ⚙️
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trajectory Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Builds', value: clientProjects.length, trend: '+2 this week', icon: '🏗️', color: 'blue' },
          { label: 'Security Vaults', value: clientApplications.length, trend: 'Fully Encrypted', icon: '🛡️', color: 'cyan' },
          { label: 'Infrastructure Tasks', value: clientTasks.length, trend: '84% Velocity', icon: '📊', color: 'purple' },
          { label: 'Network Points', value: '142', trend: 'Global Reach', icon: '🛰️', color: 'slate' }
        ].map((stat, i) => (
          <Card key={i} className="bg-slate-900/40 border-white/5 p-8 rounded-[2rem] hover:border-blue-500/30 transition-all group overflow-hidden shadow-xl">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity transform group-hover:rotate-12 group-hover:scale-125">
                <span className="text-4xl">{stat.icon}</span>
             </div>
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">{stat.label}</p>
             <div className="flex items-baseline gap-3 mb-4">
                <span className="text-5xl font-black text-white tracking-tighter italic">{stat.value}</span>
                <span className={`text-[10px] font-bold text-${stat.color}-400 uppercase tracking-widest`}>{stat.trend}</span>
             </div>
             <div className="h-1 w-12 bg-blue-600 rounded-full group-hover:w-full transition-all duration-700" />
          </Card>
        ))}
      </div>

      {/* Main Dev & Sec Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Projects & Progress */}
        <div className="lg:col-span-8 space-y-10">
          <div className="flex items-center justify-between">
             <div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Strategic Projections</h3>
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mt-1">Development Roadmap Tracking</p>
             </div>
             <Link href={`/client/${clientId}/projects`} className="text-[10px] font-black text-blue-500 hover:text-cyan-400 uppercase tracking-widest transition-colors font-sans px-4 py-2 bg-blue-500/5 rounded-lg border border-blue-500/20">
                EXPLORE ALL BUILDS →
             </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clientProjects.slice(0, 4).map((cp) => {
              const project = mockProjects.find(p => p.id === cp.projectId);
              if (!project) return null;
              return (
                <Link
                  key={cp.id}
                  href={`/client/${clientId}/projects`}
                  className="group relative flex flex-col p-8 bg-slate-950/20 border border-white/5 rounded-3xl hover:bg-slate-900/50 hover:border-blue-500/20 transition-all duration-500 h-full overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-600/20 group-hover:bg-blue-600 transition-colors" />
                  <div className="flex justify-between items-start mb-6">
                     <div className="h-10 w-10 flex items-center justify-center bg-white/5 rounded-xl text-xl opacity-70 group-hover:opacity-100 transition-opacity">
                        🛠️
                     </div>
                     <Badge variant="outline" className="text-[8px] font-black tracking-widest uppercase border-white/10 opacity-50">#PROJECT-{project.id}</Badge>
                  </div>
                  <h4 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors mb-2">
                    {project.name}
                  </h4>
                  <p className="text-xs text-slate-500 italic mb-8 line-clamp-2 font-medium">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                     <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Growth Velocity</span>
                     <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-white italic">84%</span>
                        <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-500 w-[84%]" />
                        </div>
                     </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Column: Security Status & Intelligence */}
        <div className="lg:col-span-4 space-y-10">
          <div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Security Feed</h3>
             <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mt-1">Live Intelligence Logs</p>
          </div>

          <div className="bg-slate-900/50 border border-white/5 rounded-[2.5rem] p-8 space-y-8 relative overflow-hidden shadow-2xl">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-10" />
             
             {/* Dynamic Log Feed */}
             <div className="space-y-6 relative z-10">
                {[
                  { time: 'T-02:14:12', msg: 'Core infrastructure scaled to v2.04', type: 'system', icon: '⚡' },
                  { time: 'T-04:08:45', msg: 'Security firewall handshake successful', type: 'security', icon: '🛡️' },
                  { time: 'T-08:52:10', msg: 'New deployment module: "Quantum-1" initialized', type: 'build', icon: '📦' },
                  { time: 'T-12:33:04', msg: 'Authorized access granted: ADMIN_PORTAL', type: 'access', icon: '🔑' },
                  { time: 'T-15:20:55', msg: 'Intelligence sync with node HKG-8 complete', type: 'sync', icon: '🛰️' }
                ].map((log, i) => (
                  <div key={i} className="flex gap-4 group/log cursor-default">
                    <div className="text-[10px] font-black text-slate-700 monospace shrink-0 pt-0.5 group-hover/log:text-blue-500 transition-colors italic">{log.time}</div>
                    <div className="flex flex-col gap-1 min-w-0">
                       <div className="flex items-center gap-2">
                          <span className="text-xs">{log.icon}</span>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide group-hover/log:text-white transition-colors">{log.msg}</span>
                       </div>
                       <div className="h-px w-0 group-hover/log:w-full bg-linear-to-r from-blue-500/50 to-transparent transition-all duration-500" />
                    </div>
                  </div>
                ))}
             </div>

             {/* Bottom Action Card */}
             <div className="p-6 bg-blue-600/10 border border-blue-500/20 rounded-3xl relative overflow-hidden group/action">
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover/action:opacity-20 transition-opacity">
                   <svg className="h-24 w-24 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 14.1c-2.35-.95-4.2-2.73-4.85-4.6h9.7c-.65 1.87-2.5 3.65-4.85 4.6z"/></svg>
                </div>
                <h5 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-2">Vault Status</h5>
                <p className="text-sm font-black text-white italic mb-4">CYBER-PHYSICAL SHIELD ACTIVE</p>
                <Link href="#" className="inline-block text-[9px] font-black text-white uppercase tracking-widest underline decoration-blue-500 underline-offset-4 hover:text-cyan-400 hover:decoration-cyan-400 transition-all">GENERATE SECURITY REPORT →</Link>
             </div>
          </div>
        </div>
      </div>

      {/* Featured Application Infrastructure */}
      <section className="pt-10 border-t border-white/5">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Operational Reservoirs</h3>
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Active Application Clusters</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clientApplications.slice(0, 3).map((app, i) => (
              <div key={i} className="group p-8 bg-slate-900/60 border border-white/5 rounded-[2.5rem] hover:shadow-2xl hover:shadow-blue-500/10 transition-all">
                <div className="flex items-center gap-6 mb-8">
                   <div className="h-14 w-14 bg-linear-to-br from-slate-800 to-slate-950 border border-white/10 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {['📦', '🏗️', '📄'][i % 3]}
                   </div>
                   <div>
                      <h4 className="text-lg font-black text-white uppercase tracking-tighter italic">{app.title || 'Core Module ' + (i+1)}</h4>
                      <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Active Node</p>
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      <span>Deployment Latency</span>
                      <span className="text-white monospace">0.4s</span>
                   </div>
                   <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 w-3/4 group-hover:w-full transition-all duration-1000" />
                   </div>
                </div>
                <button className="mt-8 w-full py-4 bg-slate-800 border border-white/10 rounded-2xl text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] group-hover:bg-slate-700 group-hover:text-white transition-all duration-300">
                   ACCESS TERMINAL
                </button>
              </div>
            ))}
         </div>
      </section>

      {/* NEW DEPLOYMENT MODAL */}
      {showDeploymentModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={() => setShowDeploymentModal(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-white/10 rounded-3xl shadow-2xl max-w-md w-full">
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">New Deployment</h2>
                <button onClick={() => setShowDeploymentModal(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                setShowDeploymentModal(false);
                alert(`Deployment "${deploymentForm.name}" initiated successfully!`);
              }} className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">Deployment Name</label>
                  <input type="text" value={deploymentForm.name} onChange={(e) => setDeploymentForm({...deploymentForm, name: e.target.value})} placeholder="e.g., Production v2.1" className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" required />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">Environment</label>
                  <select value={deploymentForm.environment} onChange={(e) => setDeploymentForm({...deploymentForm, environment: e.target.value})} className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50">
                    <option value="production">Production</option>
                    <option value="staging">Staging</option>
                    <option value="development">Development</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">Version</label>
                  <input type="text" value={deploymentForm.version} onChange={(e) => setDeploymentForm({...deploymentForm, version: e.target.value})} placeholder="e.g., 2.1.0" className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" required />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">Description</label>
                  <textarea value={deploymentForm.description} onChange={(e) => setDeploymentForm({...deploymentForm, description: e.target.value})} placeholder="Deployment notes..." rows={3} className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 resize-none" />
                </div>
                <div className="flex gap-4 pt-4 border-t border-white/5">
                  <Button type="button" onClick={() => setShowDeploymentModal(false)} className="flex-1 h-12 bg-slate-800 border border-white/10 text-white font-black uppercase tracking-wider rounded-xl hover:bg-slate-700">Cancel</Button>
                  <Button type="submit" className="flex-1 h-12 bg-blue-600 text-white font-black uppercase tracking-wider rounded-xl hover:bg-blue-500">Deploy</Button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* SETTINGS MODAL */}
      {showSettingsModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={() => setShowSettingsModal(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-white/10 rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8 border-b border-white/5 flex items-center justify-between sticky top-0 bg-slate-900">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Settings</h2>
                <button onClick={() => setShowSettingsModal(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                setShowSettingsModal(false);
                alert('Settings saved successfully!');
              }} className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">Company Name</label>
                  <input type="text" value={settingsForm.companyName} onChange={(e) => setSettingsForm({...settingsForm, companyName: e.target.value})} className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50" />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">API Key</label>
                  <input type="password" value={settingsForm.apiKey} onChange={(e) => setSettingsForm({...settingsForm, apiKey: e.target.value})} placeholder="••••••••••••" className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">Webhook URL</label>
                  <input type="url" value={settingsForm.webhookUrl} onChange={(e) => setSettingsForm({...settingsForm, webhookUrl: e.target.value})} placeholder="https://..." className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">Max Deployments/Day</label>
                  <input type="number" value={settingsForm.maxDeployments} onChange={(e) => setSettingsForm({...settingsForm, maxDeployments: e.target.value})} className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50" />
                </div>
                <div className="pt-6 border-t border-white/5 space-y-4">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <p className="text-xs text-blue-400 font-black uppercase tracking-wider">API Version</p>
                    <p className="text-sm text-white font-black mt-1">v2.1.4</p>
                  </div>
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <p className="text-xs text-green-400 font-black uppercase tracking-wider">Status</p>
                    <p className="text-sm text-white font-black mt-1">Active & Operational</p>
                  </div>
                </div>
                <div className="flex gap-4 pt-4 border-t border-white/5">
                  <Button type="button" onClick={() => setShowSettingsModal(false)} className="flex-1 h-12 bg-slate-800 border border-white/10 text-white font-black uppercase tracking-wider rounded-xl hover:bg-slate-700">Cancel</Button>
                  <Button type="submit" className="flex-1 h-12 bg-blue-600 text-white font-black uppercase tracking-wider rounded-xl hover:bg-blue-500">Save</Button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
