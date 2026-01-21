'use client';

import React from 'react';
import { PublicLayout } from '@/components/public';
import { Button } from '@/components/ui';

export default function CareersPage() {
  const positions = [
    {
      id: 'INFRA_ARC_01',
      title: 'INFRASTRUCTURE_ARCHITECT',
      dept: 'ENGINEERING',
      loc: 'REMOTE_GLOBAL',
      desc: 'HARDENING_CLOUD_NATIVE_SYSTEMS. ENTERPRISE_DOMINANCE_STRATEGY.',
    },
    {
      id: 'SEC_OPS_02',
      title: 'SECURITY_OPERATIONS_LEAD',
      dept: 'CYBER_DEFENSE',
      loc: 'REMOTE_ONLY',
      desc: 'AUTONOMOUS_THREAT_DETECTION. PENETRATION_TESTING_PROTOCOL.',
    },
    {
      id: 'ERP_ENG_03',
      title: 'SENIOR_ERP_ENGINEER',
      dept: 'PRODUCT_DEVELOPMENT',
      loc: 'HYBRID_NEXUS',
      desc: 'INDUSTRIAL_GRADE_BUSINESS_LOGIC. SCALE_AUTOMATION.',
    },
  ];

  return (
    <PublicLayout>
      <section className="min-h-screen bg-slate-950 text-white font-mono pt-32 pb-20 relative overflow-hidden">
        {/* Tactical Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <rect width="100%" height="100%" fill="url(#tactical-grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header Section */}
          <div className="max-w-4xl mb-32 border-l-2 border-blue-600 pl-8">
            <div className="inline-block mb-6 px-3 py-1 bg-blue-500/10 border border-blue-500/20">
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em] italic">// PERSONNEL_ACQUISITION</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-10 leading-[0.9]">
               JOIN THE <br />
               <span className="text-blue-600 font-black">ELITE_GUARD.</span>
            </h1>
            <p className="text-lg text-slate-400 italic uppercase leading-relaxed max-w-2xl tracking-tight">
               Recruiting technical sovereigns for the deployment of critical enterprise infrastructure.
            </p>
          </div>

          {/* Open Protocols - Positions List */}
          <section className="mb-32">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
               <div>
                  <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter mb-2">OPEN_PROTOCOLS.</h2>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">ACTIVE_RECRUITMENT_SLOTS</p>
               </div>
               <div className="h-px flex-1 bg-slate-900 mx-8 hidden md:block" />
               <div className="text-xs font-bold text-blue-500 border border-blue-500/30 px-6 py-2 italic bg-blue-500/5">
                  SLOTS_AVAILABLE: {positions.length}
               </div>
            </div>

            <div className="grid gap-px bg-slate-800 border border-slate-800">
               {positions.map(job => (
                  <div key={job.id} className="bg-slate-950 p-10 lg:p-14 group hover:bg-slate-900 transition-all duration-300 relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                        <span className="text-9xl font-black italic">{job.id.split('_').pop()}</span>
                     </div>
                     
                     <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-12">
                        <div className="max-w-2xl">
                           <div className="flex gap-4 mb-8">
                              <span className="text-[9px] font-bold text-blue-500 border border-blue-500/40 px-3 py-1 italic uppercase tracking-widest">{job.dept}</span>
                              <span className="text-[9px] font-bold text-slate-500 border border-slate-800 px-3 py-1 italic uppercase tracking-widest">{job.loc}</span>
                           </div>
                           <h3 className="text-2xl md:text-4xl font-black text-white italic uppercase tracking-widest group-hover:text-blue-400 transition-colors mb-6">{job.title}</h3>
                           <p className="text-xs text-slate-500 uppercase italic tracking-widest">{job.desc}</p>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-10">
                           <div className="text-right">
                              <p className="text-[8px] font-black text-slate-700 uppercase tracking-widest mb-1">CLEARANCE_LEVEL</p>
                              <p className="text-[10px] font-bold text-white uppercase italic tracking-widest">LEVEL_A+ (TOP_SECRET)</p>
                           </div>
                           <Button className="h-14 px-10 bg-slate-900 border border-slate-800 text-white rounded-none font-black italic uppercase text-[10px] tracking-[0.3em] hover:bg-blue-600 hover:border-blue-400 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                              INITIATE_APPLICATION
                           </Button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
          </section>

          {/* Operational Perks */}
          <section className="py-24 border-t border-slate-900 mb-32">
             <div className="grid lg:grid-cols-3 gap-12">
                {[
                   { title: 'SOVEREIGN_COMPENSATION', val: 'TOP_1%_MARKET_RATES. PERFORMANCE_EQUITY_BONUS.' },
                   { title: 'DEEP_WORK_NEXUS', val: '100%_ASYNC_STANDARDS. ZERO_MEETING_CULTURE.' },
                   { title: 'NEURAL_OPTIMIZATION', val: 'PERFORMANCE_HEALTH_PLANS. CONTINUOUS_LEARNING_STIPEND.' },
                ].map(perk => (
                   <div key={perk.title} className="p-10 border border-slate-900 hover:border-blue-500/30 transition-all group">
                      <div className="h-0.5 w-12 bg-blue-600 mb-10 group-hover:w-full transition-all duration-700" />
                      <h4 className="text-xs font-black text-white italic uppercase tracking-widest mb-4 group-hover:text-blue-400">{perk.title}</h4>
                      <p className="text-[10px] text-slate-500 font-bold leading-relaxed uppercase italic tracking-tighter">
                         {perk.val}
                      </p>
                   </div>
                ))}
             </div>
          </section>

          {/* Verification CTA */}
          <section className="text-center bg-slate-900 border border-slate-800 p-20 relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.2),transparent_70%)]" />
             <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-10 leading-[0.9]">
                   READY TO <br />
                   <span className="text-blue-600">TRANSCEND?</span>
                </h2>
                <p className="text-sm text-slate-500 font-bold uppercase italic leading-relaxed mb-12 tracking-tight">
                   Our vetting process is rigorous, algorithmic, and designed for technical enlightenment.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                   <Button className="h-16 px-12 bg-blue-600 hover:bg-blue-700 text-white font-black italic uppercase tracking-[0.2em] rounded-none shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                      START_EXAMINATION
                   </Button>
                   <Button variant="outline" className="h-16 px-12 border-slate-700 text-slate-400 hover:text-white hover:border-blue-500 rounded-none italic uppercase font-black text-[10px] tracking-widest">
                      SYSTEM_MANIFESTO
                   </Button>
                </div>
             </div>
          </section>

        </div>
      </section>
    </PublicLayout>
  );
}