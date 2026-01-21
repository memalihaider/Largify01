'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { PublicLayout } from '@/components/public';
import { Button } from '@/components/ui';
import { mockCMSServices } from '@/lib/mock-data';

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const service = mockCMSServices.find(s => s.slug === slug);
  const [systemUptime, setSystemUptime] = useState('99.9982%');

  if (!service) {
    return notFound();
  }

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
          
          {/* Breadcrumb / Navigation */}
          <Link href="/services" className="inline-flex items-center gap-2 text-blue-500 hover:text-white mb-12 group transition-colors">
            <span className="text-xs font-black uppercase tracking-widest">[REVERSE_TO_LIBRARY]</span>
          </Link>

          {/* Service Header */}
          <div className="grid lg:grid-cols-12 gap-16 items-start mb-32">
            <div className="lg:col-span-8 border-l-2 border-blue-600 pl-8">
              <div className="inline-block mb-6 px-3 py-1 bg-blue-500/10 border border-blue-500/20">
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em] italic">// DEPLOYMENT_BRIEFING: {service.category}</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-8 leading-[0.9]">
                {service.title.replace(' ', '_')}
              </h1>
              <p className="text-xl text-slate-400 italic uppercase leading-relaxed max-w-2xl tracking-tight">
                {service.shortDescription}
              </p>
            </div>

            {/* Tactical Sidebar */}
            <div className="lg:col-span-4 space-y-6">
               <div className="bg-slate-900 border border-slate-800 p-8 space-y-4">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-500 uppercase">AVAILABILITY:</span>
                    <span className="text-emerald-500 font-bold uppercase italic">IMMEDIATE_DEPLOYMENT</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-500 uppercase">RELIABILITY:</span>
                    <span className="text-white font-bold uppercase">{systemUptime}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-500 uppercase">TECH_STACK:</span>
                    <span className="text-blue-400 font-bold uppercase">HARDENED_V4</span>
                  </div>
                  <div className="h-px bg-slate-800 my-4" />
                  <Link href="/book">
                    <Button className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-black italic uppercase tracking-widest rounded-none shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                      INITIATE_INTEGRATION
                    </Button>
                  </Link>
               </div>
            </div>
          </div>

          {/* Strategic Gains & Deliverables */}
          <div className="grid lg:grid-cols-2 gap-1 px-1 bg-slate-800 border border-slate-800 mb-32">
             <div className="bg-slate-950 p-12 group hover:bg-slate-900 transition-all">
                <h3 className="text-xl font-bold italic uppercase text-blue-500 mb-8 tracking-widest">STRATEGIC_GAINS.</h3>
                <ul className="space-y-6">
                   {service.benefits?.map((benefit, i) => (
                      <li key={i} className="flex gap-4 items-start">
                         <span className="text-blue-600 font-black text-xs pt-1">[+]</span>
                         <span className="text-xs text-slate-400 uppercase italic leading-relaxed tracking-tight group-hover:text-white transition-colors">{benefit}</span>
                      </li>
                   ))}
                </ul>
             </div>
             <div className="bg-slate-950 p-12 group hover:bg-slate-900 transition-all">
                <h3 className="text-xl font-bold italic uppercase text-blue-500 mb-8 tracking-widest">ASSET_DELIVERY.</h3>
                <ul className="space-y-6">
                   {service.deliverables?.map((item, i) => (
                      <li key={i} className="flex gap-4 items-start">
                         <span className="text-slate-700 font-black text-xs pt-1">[-]</span>
                         <span className="text-xs text-slate-400 uppercase italic leading-relaxed tracking-tight group-hover:text-white transition-colors">{item}</span>
                      </li>
                   ))}
                </ul>
             </div>
          </div>

          {/* Process Protocol */}
          <section className="mb-32">
             <div className="text-center mb-16">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">// OPERATIONAL_METHODOLOGY</span>
                <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter mt-4">DEPLOYMENT_SEQUENCE.</h2>
             </div>
             <div className="grid md:grid-cols-4 gap-4">
                {service.processSteps?.map((step, i) => (
                   <div key={i} className="bg-slate-900/50 border border-slate-800 p-8 hover:border-blue-500/50 transition-all">
                      <div className="text-2xl font-black text-slate-800 italic mb-6">P_0{i+1}</div>
                      <h4 className="text-xs font-black text-white italic uppercase tracking-widest mb-4">{step.title}</h4>
                      <p className="text-[9px] text-slate-500 uppercase italic leading-tight tracking-tighter">{step.description}</p>
                   </div>
                ))}
             </div>
          </section>

          {/* Final Conversion Area */}
          <section className="pt-20 border-t border-slate-900 text-center">
             <h2 className="text-4xl md:text-6xl font-black italic uppercase text-white tracking-tighter mb-10 leading-[0.9]">
                READY TO <br />
                <span className="text-blue-600"> INITIALIZE?</span>
             </h2>
             <p className="text-slate-500 text-xs uppercase italic mb-12 tracking-widest">Architectural sessions available for authorized enterprise nodes.</p>
             <div className="flex flex-col sm:flex-row justify-center gap-6">
               <Link href="/book">
                 <Button className="h-16 px-12 bg-blue-600 hover:bg-blue-700 text-white font-black italic uppercase tracking-[0.2em] rounded-none shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                   START_INTEGRATION
                 </Button>
               </Link>
               <Link href="/contact">
                 <Button variant="outline" className="h-16 px-12 border-slate-800 text-slate-400 hover:text-white hover:border-blue-500 rounded-none italic uppercase font-black text-xs tracking-widest">
                   [SIGNAL_LEAD_ARCHITECT]
                 </Button>
               </Link>
             </div>
          </section>

        </div>
      </section>
    </PublicLayout>
  );
}
