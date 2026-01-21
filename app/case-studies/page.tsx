'use client';

import React from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/public';
import { Button } from '@/components/ui';

const caseStudies = [
  {
    id: 'TECHFLOW_01',
    company: 'TECHFLOW_INDUSTRIES',
    industry: 'MANUFACTURING',
    title: 'CUSTOM_ERP_INTEGRATION',
    challenge: 'UNIFIED_DATA_SILOS.Spreadsheet-based_inventory_critical_failure.',
    solution: 'DEPLOYED_CENTRAL_CORE_ERP.Real-time_supply_chain_visibility.',
    results: [
      { metric: '40%', label: 'PROCESSING_VELOCITY' },
      { metric: '99.5%', label: 'INVENTORY_ACCURACY' },
      { metric: '25%', label: 'EFFICIENCY_GAIN' },
    ],
    tags: ['ERP', 'MANUFACTURING', 'CORE'],
  },
  {
    id: 'GREENLEAF_02',
    company: 'GREENLEAF_HEALTH',
    industry: 'HEALTHCARE',
    title: 'SECURE_PATIENT_NEXUS',
    challenge: 'HIPAA_COMPLIANCE_HARDENING.Legacy_data_exposure_risks.',
    solution: 'ENCRYPTED_ADAPTIVE_HUB.Zero-trust_patient_record_access.',
    results: [
      { metric: '50%', label: 'CHECK_IN_SPEED' },
      { metric: '100%', label: 'COMPLIANCE_LOCK' },
      { metric: '30%', label: 'CHURN_REDUCTION' },
    ],
    tags: ['HEALTHCARE', 'SECURE', 'Pii'],
  },
  {
    id: 'SUMMIT_03',
    company: 'SUMMIT_LOGISTICS',
    industry: 'LOGISTICS',
    title: 'FLEET_OPTIM_PROTOCOL',
    challenge: 'ROUTE_INEFFICIENCY.High_latency_dispatch_logic.',
    solution: 'LOW_LATENCY_FLEET_CORE.Autonomous_route_optimization.',
    results: [
      { metric: '18%', label: 'FUEL_REDUCTION' },
      { metric: '22%', label: 'UPLINK_DENSITY' },
      { metric: '95%', label: 'ON_TIME_REL' },
    ],
    tags: ['LOGISTICS', 'AUTO', 'FLEET'],
  },
];

export default function CaseStudiesPage() {
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
          
          {/* Header Readout */}
          <div className="max-w-4xl mb-32 border-l-2 border-blue-600 pl-8">
            <div className="inline-block mb-6 px-3 py-1 bg-blue-500/10 border border-blue-500/20">
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em] italic">// OPERATIONAL_VALIDATION</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-10 leading-[0.9]">
               IMPACT <br />
               <span className="text-blue-600">ARCHIVE.</span>
            </h1>
            <p className="text-lg text-slate-400 italic uppercase leading-relaxed max-w-2xl tracking-tight">
               Verified deployment logs and performance metrics across diverse industrial and digital sectors.
            </p>
          </div>

          {/* Case Study Grid */}
          <div className="space-y-40">
            {caseStudies.map((study, idx) => (
              <div key={study.id} className="grid lg:grid-cols-12 gap-16 items-start py-12 border-t border-slate-900">
                
                {/* ID & Meta */}
                <div className="lg:col-span-1">
                   <div className="text-4xl font-black text-slate-800 italic">[{idx+1}]</div>
                   <div className="h-20 w-px bg-slate-800 my-8 mx-auto hidden lg:block" />
                </div>

                {/* Content */}
                <div className="lg:col-span-7 space-y-12">
                   <div>
                      <div className="flex gap-4 mb-6">
                         {study.tags.map(tag => (
                            <span key={tag} className="text-[9px] text-blue-500 font-bold border border-blue-500/30 px-2 py-0.5 italic">#{tag}</span>
                         ))}
                      </div>
                      <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-4">{study.title}</h2>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{study.company} // {study.industry}</p>
                   </div>

                   <div className="grid md:grid-cols-2 gap-12">
                      <div>
                         <h4 className="text-[10px] font-bold text-blue-600 uppercase mb-4 tracking-[0.2em] italic">PROBLEM_SET</h4>
                         <p className="text-sm text-slate-400 uppercase italic leading-relaxed tracking-tight">
                            {study.challenge}
                         </p>
                      </div>
                      <div>
                         <h4 className="text-[10px] font-bold text-emerald-500 uppercase mb-4 tracking-[0.2em] italic">SYSTEM_SOLUTION</h4>
                         <p className="text-sm text-slate-400 uppercase italic leading-relaxed tracking-tight">
                            {study.solution}
                         </p>
                      </div>
                   </div>
                </div>

                {/* Metrics Card */}
                <div className="lg:col-span-4 bg-slate-900 border border-slate-800 p-8 relative">
                   <div className="absolute top-0 right-0 p-2 bg-blue-600/20 text-[8px] font-bold text-blue-400 italic">VAL_LOG: {study.id}</div>
                   <h4 className="text-[10px] font-black italic uppercase tracking-[0.2em] mb-10 text-white">OPERATIONAL_METRICS:</h4>
                   <div className="space-y-8">
                      {study.results.map(res => (
                         <div key={res.label}>
                            <div className="flex justify-between items-end mb-1">
                               <p className="text-3xl font-black text-white italic tracking-tighter">{res.metric}</p>
                               <p className="text-[9px] font-bold text-blue-500 mb-1">{res.label}</p>
                            </div>
                            <div className="h-1 bg-slate-800 w-full overflow-hidden">
                               <div className="h-full bg-blue-600 w-3/4" />
                            </div>
                         </div>
                      ))}
                   </div>
                   <div className="mt-8 pt-6 border-t border-slate-800">
                      <p className="text-[8px] text-slate-600 uppercase italic tracking-widest">VERIFIED_ROI_SYNCED</p>
                   </div>
                </div>

              </div>
            ))}
          </div>

          {/* Tactical CTA */}
          <section className="pt-40 text-center">
            <div className="inline-flex items-center gap-3 bg-slate-900/50 border border-blue-500/30 rounded-xs px-4 py-1.5 mb-12 backdrop-blur-md">
              <span className="h-2 w-2 bg-blue-500 rounded-full animate-ping" />
              <span className="text-[10px] font-mono font-bold text-blue-400 italic uppercase tracking-[0.2em]">Ready_For_Deployment</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-12 leading-[0.9]">
               ARCHITECT YOUR <br />
               <span className="text-blue-600 font-black"> SUCCESS_SEQUENCE.</span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/book">
                <Button className="h-16 px-12 bg-blue-600 hover:bg-blue-700 text-white font-black italic uppercase tracking-[0.2em] rounded-none shadow-[0_0_25px_rgba(37,99,235,0.4)]">
                  Start_Integration
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="h-16 px-12 border-slate-700 text-slate-400 hover:text-white hover:border-blue-500 rounded-none italic uppercase font-black text-xs tracking-widest">
                  [Request_Detailed_Archive]
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </section>
    </PublicLayout>
  );
}

