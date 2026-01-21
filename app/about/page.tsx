'use client';

import React from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/public';
import { Button } from '@/components/ui';

const team = [
  {
    name: 'JAMES_WILSON',
    role: 'CHIEF_SYSTEM_LEAD',
    bio: 'FORMER_ENTERPRISE_ARCHITECT. 15+ YEARS_BUILDING_CRITICAL_INFRASTRUCTURE. LEAD_STRATEGIST.',
    id: 'NODE_001',
  },
  {
    name: 'SARAH_CHEN',
    role: 'CORE_ENGINEERING_LEAD',
    bio: 'FULL_STACK_OPERATIVE. SPECIALIZATION: SCALABLE_ARCHITECTURES & SECURITY_HARDENING.',
    id: 'NODE_002',
  },
  {
    name: 'MICHAEL_ROBERTS',
    role: 'SYSTEMS_OPERATOR',
    bio: 'UI_ENGINEER. FOCUS: HIGH_EFFICIENCY_DATA_VISUALIZATION & SYSTEM_INTERFACES.',
    id: 'NODE_003',
  },
];

const values = [
  {
    title: 'SECURITY_FIRST_PRINCIPLES',
    desc: 'ZERO-TRUST_LOGIC_GATES_EMBEDDED_IN_CORE_KERNEL. NO_PERIMETER_RELIANCE.',
  },
  {
    title: 'TECHNICAL_RIGOR',
    desc: 'BATTLE-TESTED_CODE_PATTERNS. RIGOROUS_AUTOMATED_STRESS_TESTING.',
  },
  {
    title: 'LONG_TERM_STABILITY',
    desc: '10+ YEAR_ARCHITECTURAL_VIABILITY. NO_TECHNICAL_DEBT_TOLERANCE.',
  },
  {
    title: 'TOTAL_TRANSPARENCY',
    desc: 'REAL-TIME_LOGGING. CLEAR_TECHNICAL_COMMUNICATION_CHANNELS.',
  },
];

export default function AboutPage() {
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
          
          {/* Hero Readout */}
          <div className="max-w-4xl mb-32">
            <div className="inline-block mb-6 px-3 py-1 bg-blue-500/10 border border-blue-500/30">
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em] italic">// THE_COLLECTIVE_ORIGIN</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-8 leading-[0.9]">
              ENGINEERING <br />
              <span className="text-blue-600">INTELLECT.</span>
            </h1>
            <p className="text-lg text-slate-400 italic uppercase leading-relaxed max-w-2xl tracking-tight">
              A distributed collective of senior architects dedicated to the precision engineering of enterprise operating systems.
            </p>
          </div>

          {/* Core Methodology */}
          <section className="py-24 border-y border-slate-900 mb-32">
             <div className="grid lg:grid-cols-2 gap-16 items-start">
                <div>
                   <h2 className="text-3xl font-black italic uppercase text-white mb-8 tracking-tighter">OUR_MISSION_PROTOCOL.</h2>
                   <div className="space-y-6 text-slate-500 text-sm uppercase italic leading-relaxed">
                      <p>WE BELIEVE ARCHITECTURAL EXCELLENCE SHOULD BE NATIVE TO EVERY SYSTEM, NOT AN OPTIONAL PARAMETER.</p>
                      <p>OUR METHODOLOGY COMBINES RIGOROUS MATHEMATICAL MODELS WITH PRAGMATIC BUSINESS LOGIC TO DEPLOY RESILIENT INFRASTRUCTURE.</p>
                   </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-10 relative">
                   <div className="absolute top-0 right-10 w-20 h-px bg-blue-500" />
                   <h3 className="text-xl font-bold italic mb-8 uppercase text-blue-500 tracking-widest">SYSTEM_DIFFERENTIATORS</h3>
                   <div className="space-y-4">
                      {['ZERO_DEBT_ENGINEERING', 'STOCHASTIC_SECURITY_MODELS', 'HYPER_SCALE_COMPATIBILITY'].map((item, idx) => (
                         <div key={idx} className="flex gap-4 items-center">
                            <span className="text-xs text-slate-700 font-bold">[{idx+1}]</span>
                            <span className="text-xs font-bold text-white uppercase tracking-widest">{item}</span>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </section>

          {/* Collective Intel - Team */}
          <section className="mb-32">
            <div className="text-center mb-20 text-slate-400">
               <span className="text-[10px] font-bold uppercase tracking-widest italic">// PERSONNEL_RECORDS</span>
               <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mt-2">SYSTEM_LEADS.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-px bg-slate-800 border border-slate-800">
               {team.map(member => (
                  <div key={member.id} className="bg-slate-950 p-10 group hover:bg-slate-900 transition-all duration-300">
                     <div className="text-[10px] text-blue-600 font-bold mb-6">[{member.id}]</div>
                     <h3 className="text-xl font-black text-white italic uppercase tracking-widest group-hover:text-blue-400 transition-colors">{member.name}</h3>
                     <p className="text-[10px] font-bold text-slate-500 mt-2 mb-8 italic tracking-widest uppercase">{member.role}</p>
                     <p className="text-[10px] text-slate-500 font-bold leading-relaxed uppercase italic tracking-tighter opacity-60 group-hover:opacity-100 transition-opacity">
                        {member.bio}
                     </p>
                  </div>
               ))}
            </div>
          </section>

          {/* Operational Principles */}
          <section className="py-24 border-t border-slate-900">
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map(val => (
                   <div key={val.title} className="space-y-4">
                      <div className="h-0.5 w-10 bg-blue-600" />
                      <h4 className="text-xs font-black text-white italic uppercase tracking-widest">{val.title}</h4>
                      <p className="text-[9px] text-slate-500 font-bold leading-relaxed uppercase italic">{val.desc}</p>
                   </div>
                ))}
             </div>
          </section>

          {/* Tactical CTA */}
          <section className="pt-32 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-12">
               INITIALIZE <br />
               <span className="text-blue-600"> COLLABORATION.</span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/book">
                <Button className="h-16 px-12 bg-blue-600 hover:bg-blue-700 text-white font-black italic uppercase tracking-[0.2em] rounded-none shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                  Start_Integration
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="h-16 px-12 border-slate-800 text-slate-400 hover:text-white hover:border-blue-500 rounded-none italic uppercase font-black text-xs tracking-widest">
                  [Signal_Architect]
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </section>
    </PublicLayout>
  );
}
