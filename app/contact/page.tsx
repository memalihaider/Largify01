'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/public';
import { Button, Input, Textarea } from '@/components/ui';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  useEffect(() => {
    setTerminalOutput(['[SYSTEM] INITIALIZING_CONTACT_DECK...', '[SYSTEM] UPLINK_ESTABLISHED: 204.85.112.4', '[SYSTEM] ENCRYPTION: ACTIVE']);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTerminalOutput(prev => [...prev, `[USER_SIGNAL] SENDING: ${formData.subject}...`, '[SYSTEM] DATA_STREAM_HARDENED', '[SYSTEM] SIGNAL_SENT_SUCCESSFULLY']);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <PublicLayout>
      <section className="min-h-screen bg-slate-950 text-white font-mono pt-32 pb-20 relative overflow-hidden">
        {/* Tactical Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="contact-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="blue" strokeWidth="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Left Column - Mission Info */}
            <div className="lg:col-span-4 space-y-8">
              <div className="border-l-2 border-blue-600 pl-6 py-2">
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em] italic mb-2 block">// COMMUNICATION_HUB</span>
                <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-4">
                  UPLINK <br />
                  <span className="text-blue-600">COMMAND.</span>
                </h1>
                <p className="text-slate-500 text-xs leading-relaxed uppercase italic">
                  Establish a secure communication channel with our lead systems architects for project analysis.
                </p>
              </div>

              {/* Contact Nodes */}
              <div className="space-y-6">
                {[
                  { label: 'DIRECT_UPLINK', val: 'OPS@LARGIFYSOLUTIONS.COM', sub: '12H_SLA_RESPONSE' },
                  { label: 'SECURE_VOICE', val: '+1.800.TACTICAL', sub: '0900-1800_EST' },
                  { label: 'HQ_ORIGIN', val: 'REMOTE_FIRST', sub: 'GLOBAL_DISTRIBUTED' },
                ].map(node => (
                  <div key={node.label} className="group border border-slate-800 p-4 hover:border-blue-500/50 transition-colors">
                     <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-1">{node.label}</p>
                     <p className="text-sm font-bold text-white italic tracking-tighter group-hover:text-blue-400">{node.val}</p>
                     <p className="text-[8px] text-slate-700 uppercase mt-1 italic">{node.sub}</p>
                  </div>
                ))}
              </div>

              {/* Terminal Log */}
              <div className="bg-black/40 border border-slate-800 p-4 h-32 overflow-hidden flex flex-col-reverse">
                <div className="space-y-1">
                  {terminalOutput.slice().reverse().map((log, i) => (
                    <p key={i} className="text-[8px] uppercase tracking-tighter text-blue-500/70">{log}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Transmission Form */}
            <div className="lg:col-span-8">
              <div className="bg-slate-900 border border-slate-800 p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-1 w-1/3 bg-blue-600/30" />
                
                {submitted ? (
                  <div className="py-20 text-center space-y-8">
                    <div className="h-20 w-20 border border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto animate-pulse">
                      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter">SIG_RECEIVED.</h2>
                      <p className="text-slate-500 text-xs uppercase italic mt-2 tracking-widest">Architects have been notified. Response protocol initiated.</p>
                    </div>
                    <Button 
                      onClick={() => setSubmitted(false)}
                      className="bg-slate-950 border border-slate-800 text-slate-400 hover:text-white rounded-none px-8 font-black italic uppercase text-[10px] tracking-widest"
                    >
                      [NEW_TRANSMISSION]
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">ENTITY_ID</label>
                        <Input 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange} 
                          className="h-12 bg-slate-950 border-slate-800 rounded-none text-xs focus:border-blue-500 uppercase italic" 
                          placeholder="FULL_NAME"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">SIGNAL_ADDRESS</label>
                        <Input 
                          name="email" 
                          type="email"
                          value={formData.email} 
                          onChange={handleChange} 
                          className="h-12 bg-slate-950 border-slate-800 rounded-none text-xs focus:border-blue-500 uppercase italic" 
                          placeholder="USER@DOMAIN.TLD"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">ORGANIZATION_NODE</label>
                        <Input 
                          name="company" 
                          value={formData.company} 
                          onChange={handleChange} 
                          className="h-12 bg-slate-950 border-slate-800 rounded-none text-xs focus:border-blue-500 uppercase italic" 
                          placeholder="COMPANY_NAME"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">MISSION_OBJECTIVE</label>
                        <select 
                          name="subject" 
                          value={formData.subject} 
                          onChange={handleChange} 
                          className="w-full h-12 bg-slate-950 border border-slate-800 rounded-none text-white px-4 text-[10px] font-bold appearance-none focus:border-blue-500 outline-none uppercase italic"
                          required
                        >
                          <option value="">SELECT_OBJECTIVE</option>
                          <option value="ARCHITECTURE">SYSTEM_ARCHITECTURE</option>
                          <option value="SECURITY">SECURITY_HARDENING</option>
                          <option value="STRATEGY">GLOBAL_STRATEGY</option>
                          <option value="RECOVERY">RECOVERY_PROTCOLS</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">MISSION_BRIEFING</label>
                      <Textarea 
                         name="message" 
                         value={formData.message} 
                         onChange={handleChange} 
                         rows={5}
                         className="bg-slate-950 border-slate-800 rounded-none text-xs focus:border-blue-500 uppercase italic"
                         placeholder="PROVIDE_SYSTEM_REQUIREMENTS_AND_CONSTRAINTS..."
                         required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-black italic uppercase tracking-[0.3em] rounded-none shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all"
                    >
                      INITIATE_SIGNAL_BROADCAST
                    </Button>

                    <p className="text-[8px] text-slate-600 text-center uppercase tracking-widest">
                      [DATA_PURGE_ENABLED] // ALL SIGNALS ARE AUTO-ARCHIVED AFTER 90_DAYS
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
