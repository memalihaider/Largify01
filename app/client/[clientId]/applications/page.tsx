'use client';

import { use } from 'react';
import { Card, Badge, Button } from '@/components/ui';
import {
  mockClientUsers,
  mockClientApplications,
} from '@/lib/mock-data';

interface PageProps {
  params: Promise<{
    clientId: string;
  }>;
}

export default function ClientApplicationsPage({ params }: PageProps) {
  const { clientId } = use(params);
  const client = mockClientUsers.find(c => c.id === clientId);
  const applications = mockClientApplications.filter(ca => ca.clientId === clientId);

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] bg-slate-900 border border-white/5 rounded-[3rem] p-12 text-center">
        <div className="h-16 w-16 bg-red-500/10 rounded-full flex items-center justify-center text-3xl mb-6">🚫</div>
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">APP VAULT LOCKED</h2>
        <p className="text-slate-500 italic text-sm mt-2">Authentication failed for application database access.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/5">
        <div>
          <Badge variant="outline" className="mb-4 bg-cyan-500/5 text-cyan-400 border-cyan-500/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.4em]">
            Software Infrastructure & Vaults
          </Badge>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
            APPLICATION <span className="text-cyan-400">PROTOCOLS</span>
          </h1>
          <p className="text-slate-400 font-light italic mt-6 max-w-xl">
            Centralized management for your enterprise software assets. Monitor deployment status, security integrity, and application health.
          </p>
        </div>
      </div>

      {/* Grid of Applications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {applications.length > 0 ? (
          applications.map((app, i) => (
            <Card key={app.id || i} className="group bg-slate-900 border-white/5 hover:border-cyan-500/40 rounded-[2.5rem] overflow-hidden transition-all duration-500 shadow-2xl relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -z-10 group-hover:bg-cyan-500/10 transition-all" />
              
              <div className="p-10">
                <div className="flex justify-between items-start mb-10">
                   <div className="h-16 w-16 bg-slate-950 border border-white/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-3 transition-all">
                      {['🛡️', '🛰️', '🔒', '📱'][i % 4]}
                   </div>
                   <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 text-[9px] font-black tracking-widest uppercase px-3 py-1">
                      {app.status || 'DEPLOYED'}
                   </Badge>
                </div>

                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 group-hover:text-cyan-400 transition-colors italic">
                  {app.title || `Application Module ${i + 1}`}
                </h3>
                
                <p className="text-xs text-slate-500 italic mb-10 line-clamp-2 font-medium">
                   High-performance software asset deployed on Largify's secure infrastructure nodes. Features multi-layer encryption.
                </p>

                <div className="space-y-6 pt-8 border-t border-white/5">
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-600">Health Index</span>
                      <span className="text-green-500 italic">Excellent</span>
                   </div>
                   <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-linear-to-r from-cyan-600 to-blue-500 w-full group-hover:animate-pulse" />
                   </div>
                   <div className="flex justify-between gap-4 pt-4">
                      <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex-1 text-center">
                         <p className="text-[8px] font-black text-slate-600 uppercase mb-1">Runtime</p>
                         <p className="text-xs font-black text-white italic">99.9%</p>
                      </div>
                      <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex-1 text-center">
                         <p className="text-[8px] font-black text-slate-600 uppercase mb-1">Latency</p>
                         <p className="text-xs font-black text-white italic">14ms</p>
                      </div>
                   </div>
                </div>

                <button className="mt-10 w-full py-4 bg-slate-800 border border-white/10 rounded-2xl text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] group-hover:bg-cyan-600 group-hover:text-white group-hover:border-cyan-500 transition-all duration-300">
                   INITIALIZE CONSOLE
                </button>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full p-20 bg-slate-900 border border-dashed border-white/10 rounded-[3rem] text-center">
             <div className="h-20 w-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">🛡️</div>
             <p className="text-2xl font-black text-white uppercase tracking-tighter italic">NO REGISTERED APPLICATIONS</p>
             <p className="text-slate-500 text-sm mt-4 italic font-medium">Your software vault is currently empty. Contact Largify Dev Ops to deploy assets.</p>
             <Button className="mt-10 bg-cyan-600 text-slate-950 font-black uppercase tracking-widest px-12 h-16 rounded-2xl hover:bg-cyan-400 transition-colors">DEPOY NEW APP</Button>
          </div>
        )}
      </div>
    </div>
  );
}
