'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PublicLayout } from '@/components/public';
import { Button, Card, Input, Textarea, Select } from '@/components/ui';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <PublicLayout>
      {/* Hero Section - Premium */}
      <section className="relative bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-white py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 1200 1200">
            <defs>
              <pattern id="contact-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="1200" height="1200" fill="url(#contact-grid)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block mb-6 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Connect with Architects</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tighter">
              Let&apos;s Architect<br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-cyan-400">Your Future</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
              Have a complex technical challenge? Our engineering team is ready to analyze your requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section - Premium */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Contact Form - 3/5 width */}
            <div className="lg:col-span-3">
              <div className="mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Transmission Protocol</h2>
                <div className="h-1.5 w-20 bg-blue-600 rounded-full"></div>
              </div>
              
              {submitted ? (
                <Card variant="bordered" className="p-16 text-center bg-slate-50 border-blue-100 rounded-4xl shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
                  <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 text-green-600">
                    <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-4">Signal Received</h3>
                  <p className="text-xl text-gray-600 mb-10 font-light italic">
                    "Our architects have been notified. Expect a technical briefing within 12 business hours."
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="outline" size="lg" className="rounded-2xl border-2 px-10 py-6 font-bold hover:bg-slate-100 transition-all">
                    Send New Signal
                  </Button>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 p-12 bg-white border border-gray-100 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-2">
                    <Input
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Alan Turing"
                      className="rounded-xl border-gray-200 focus:border-blue-600 focus:ring-blue-600 p-4"
                    />
                    </div>
                    <div className="space-y-2">
                    <Input
                      label="Corporate Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="e.g. alan@bletchleypark.io"
                      className="rounded-xl border-gray-200 focus:border-blue-600 focus:ring-blue-600 p-4"
                    />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-2">
                    <Input
                      label="Organization"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company Name"
                      className="rounded-xl border-gray-200 focus:border-blue-600 focus:ring-blue-600 p-4"
                    />
                    </div>
                    <div className="space-y-2">
                    <Input
                      label="Phone (Encrypted Line)"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="rounded-xl border-gray-200 focus:border-blue-600 focus:ring-blue-600 p-4"
                    />
                    </div>
                  </div>
                  <div className="space-y-2">
                  <Select
                    label="Objective"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    options={[
                      { value: '', label: 'Select mission objective' },
                      { value: 'general', label: 'Technical Inquiry' },
                      { value: 'project', label: 'Infrastructure Overhaul' },
                      { value: 'support', label: 'System Recovery' },
                      { value: 'partnership', label: 'Strategic Alliance' },
                      { value: 'other', label: 'Other Classification' },
                    ]}
                    className="rounded-xl border-gray-200 focus:border-blue-600 focus:ring-blue-600 p-4"
                  />
                  </div>
                  <div className="space-y-2">
                  <Textarea
                    label="Mission Briefing"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Provide details about your project scope, constraints, and timeline..."
                    className="rounded-xl border-gray-200 focus:border-blue-600 focus:ring-blue-600 p-4"
                  />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-8 rounded-2xl shadow-2xl shadow-blue-500/20 transition-all text-xl uppercase tracking-widest">
                    Initiate Discussion
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Information - 2/5 width */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tight uppercase">Get in Touch</h2>
                
                <div className="space-y-10">
                  {[
                    { icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, title: 'Direct Uplink', info: 'hello@largify.com', sub: 'Technical triage: 12h SLA' },
                    { icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>, title: 'Voice Frequency', info: '+1 (555) 123-4567', sub: 'Available Sync: 09:00 - 18:00 EST' },
                    { icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, title: 'Base of Ops', info: 'Remote-First Architecture', sub: 'Global Distributed Workforce' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-6 group">
                      <div className="h-14 w-14 bg-slate-50 border border-gray-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shrink-0 shadow-sm">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{item.title}</h4>
                        <p className="text-xl font-bold text-gray-900 mb-1 tracking-tight">{item.info}</p>
                        <p className="text-sm text-gray-500 font-light">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Book a Call CTA - Optimized */}
              <div className="relative p-10 bg-slate-950 rounded-[2.5rem] overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-600/40 transition-colors duration-500"></div>
                <h3 className="text-2xl font-black text-white mb-4 relative z-10">Real-time Collaboration?</h3>
                <p className="text-slate-400 mb-8 relative z-10 font-light leading-relaxed">
                  Skip the inbox. Book a high-bandwidth engineering assessment directly into our calendar.
                </p>
                <Link href="/book">
                  <Button size="lg" className="w-full bg-white text-blue-950 hover:bg-blue-50 font-black rounded-2xl transition-all shadow-xl shadow-white/5 relative z-10 text-sm uppercase tracking-widest py-6">
                    Launch Booking Console
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Premium */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Technical FAQ</h2>
            <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid gap-6">
            {[
              { q: 'What is your typical deployment velocity?', a: 'Most enterprise platforms move from discovery to production-ready within 12-24 weeks, depending on system complexity and security hardening requirements.' },
              { q: 'How do you handle legacy migration?', a: 'We employ a "Sidecar Architecture" strategy, incrementally migrating data and services to ensure zero downtime and 100% data integrity during the transition.' },
              { q: 'What is your stack specialization?', a: 'We architect primarily using robust, type-safe ecosystems: Next.js/TypeScript, Rust for performance-critical logic, and PostgreSQL for relational integrity.' },
              { q: 'Do you provide SOC 2 compliance readiness?', a: 'Every system we build is architected with SOC 2 Type II controls in mind from day one, including automated audit logs and encrypted-at-rest data structures.' },
            ].map((faq, idx) => (
              <Card key={idx} variant="bordered" className="group p-8 bg-white hover:border-blue-400 border-gray-100 transition-all duration-300 rounded-3xl shadow-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-600/0 group-hover:bg-blue-600 transition-all duration-300"></div>
                <h3 className="text-xl font-black text-gray-900 mb-4 tracking-tight group-hover:text-blue-600 transition-colors">{faq.q}</h3>
                <p className="text-gray-600 font-light leading-relaxed italic border-l-2 border-gray-100 pl-6 ml-1">"{faq.a}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
