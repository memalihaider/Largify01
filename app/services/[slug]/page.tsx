import { ReactNode } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PublicLayout } from '@/components/public';
import { Button, Card, CardContent, Badge } from '@/components/ui';
import { mockCMSServices } from '@/lib/mock-data';

// Icon component factory
const getServiceIcon = (iconType?: string, size: 'sm' | 'lg' = 'lg') => {
  const className = size === 'lg' ? 'h-16 w-16' : 'h-8 w-8';
  const iconMap: Record<string, ReactNode> = {
    settings: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    code: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    shield: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    ai: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 15L18 16.25l-1.25.25 1.25.25.25 1.25 1.25-1.25.25-1.25zM15.75 15.75l.25-1.25 1.25-.25-1.25-.25-.25-1.25-1.25 1.25-.25 1.25z" />
      </svg>
    ),
    mobile: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    web: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.003 9.003 0 008.34-5.662m.002-4.676A9.003 9.003 0 0012 3m0 18a9.003 9.003 0 01-8.34-5.662m.002-4.676A9.003 9.003 0 0112 3m0 18v-8m0-10V5m8 6l-8 8m8-8l-8-8m0 0l8 8" />
      </svg>
    ),
  };
  return iconMap[iconType || 'default'] || iconMap.settings;
};

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = mockCMSServices.find(s => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <PublicLayout>
      {/* Hero Section - Premium Enterprise */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-12 group transition-all">
            <div className="h-8 w-8 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="text-sm font-bold uppercase tracking-widest">Back to Library</span>
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
                <span className="h-2 w-2 bg-blue-400 rounded-full animate-ping" />
                <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">{service.category}</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter">
                {service.title.split(' ').map((word, i) => (
                  <span key={i} className={i % 2 === 1 ? "bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-cyan-400 to-indigo-400 animate-pulse" : ""}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed font-light italic border-l-4 border-blue-500 pl-6 bg-blue-500/5 py-4 rounded-r-2xl">
                "{service.shortDescription}"
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-10 border-t border-white/10">
                <div className="space-y-2 group cursor-default">
                  <p className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.2em] group-hover:text-blue-400 transition-colors">Efficiency Range</p>
                  <p className="text-2xl font-black text-white">{service.timeline}</p>
                </div>
                <div className="space-y-2 group cursor-default">
                  <p className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.2em] group-hover:text-cyan-400 transition-colors">Success Rate</p>
                  <p className="text-2xl font-black text-white">99.9%</p>
                </div>
                <div className="space-y-2 group cursor-default">
                  <p className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.2em] group-hover:text-indigo-400 transition-colors">Active Deployments</p>
                  <p className="text-2xl font-black text-white">{service.usedInProjects}+ Units</p>
                </div>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
              <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-12 rounded-[3.5rem] shadow-2xl relative z-10 overflow-hidden group">
                <div className="absolute -right-20 -top-20 h-60 w-60 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700" />
                <div className="h-32 w-32 bg-linear-to-br from-blue-600 via-blue-500 to-cyan-400 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-blue-500/40 mb-10 transform -rotate-6 group-hover:rotate-0 transition-transform duration-700">
                  {getServiceIcon(service.iconType, 'lg')}
                </div>
                <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-wider relative z-10">Enterprise Stack</h3>
                <div className="flex flex-wrap gap-3 relative z-10">
                  {service.technologies?.map((tech) => (
                    <Badge key={tech} className="bg-white/5 hover:bg-blue-500 hover:text-white border-white/10 text-gray-300 py-2.5 px-5 rounded-xl transition-all cursor-default text-xs font-bold uppercase tracking-widest">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="mt-10 pt-8 border-t border-white/5">
                  <div className="flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    <span>Architecture Stability</span>
                    <span className="text-cyan-400">Production Ready</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-linear-to-r from-blue-600 to-cyan-400 w-[94%] rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Impact Dashboard - NEW SECTION */}
      <section className="py-24 bg-slate-950 relative overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Avg. ROI Increase', value: '340%', sub: 'Within 12 months', color: 'blue' },
              { label: 'Process Latency', value: '-82%', sub: 'Optimized throughput', color: 'cyan' },
              { label: 'Security Hardening', value: '100%', sub: 'Zero breaches in prod', color: 'indigo' },
              { label: 'Scale Capacity', value: '10x', sub: 'Infinite growth ready', color: 'blue' },
            ].map((stat, i) => (
              <div key={i} className="relative group">
                <div className={`absolute inset-0 bg-${stat.color}-500/5 rounded-3xl blur-xl group-hover:bg-${stat.color}-500/10 transition-all`} />
                <Card className="relative p-8 bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-all rounded-3xl overflow-hidden h-full">
                  <div className={`h-1 w-12 bg-linear-to-r from-${stat.color}-500 to-cyan-500 mb-6 rounded-full`} />
                  <p className="text-4xl lg:text-5xl font-black text-white mb-2 tracking-tighter">{stat.value}</p>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">{stat.label}</p>
                  <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{stat.sub}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview & Strategic Impact */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-20 items-start">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 tracking-tight">
                  Strategic <span className="text-blue-600">Impact</span>
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed font-light mb-10">
                  {service.description}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h3 className="text-sm font-black text-blue-700 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                    <span className="h-1 w-8 bg-blue-600 rounded-full" />
                    Strategic Gains
                  </h3>
                  {service.benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-5 p-6 rounded-3xl hover:bg-slate-50 transition-all group border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5">
                      <div className="h-10 w-10 bg-linear-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all">
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-900 font-bold leading-relaxed text-lg">{benefit}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-6">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                    <span className="h-1 w-8 bg-slate-900 rounded-full" />
                    Asset Delivery
                  </h3>
                  {service.deliverables?.map((item, index) => (
                    <div key={index} className="flex items-start gap-5 p-6 rounded-3xl hover:bg-slate-50 transition-all group border border-slate-100 hover:border-slate-300">
                      <div className="h-10 w-10 bg-slate-900 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 shadow-lg group-hover:-rotate-6 transition-transform">
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <p className="text-gray-900 font-bold leading-relaxed text-lg">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-32">
              <Card variant="bordered" className="p-10 bg-slate-950 border-slate-800 text-white rounded-[2.5rem] shadow-2xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-blue-500/20 transition-all" />
                <h3 className="text-2xl font-black mb-6 relative z-10 tracking-tight">Enterprise Discovery</h3>
                <p className="text-gray-400 mb-10 leading-relaxed font-light relative z-10 uppercase text-xs tracking-widest">
                  Schedule a high-level technical session with our lead architects to blueprint your transformation.
                </p>
                <div className="space-y-4 relative z-10">
                  <Link href="/book" className="block">
                    <Button size="lg" className="w-full bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-black py-8 rounded-2xl shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02]">
                      Initiate Protocol
                    </Button>
                  </Link>
                  <Link href="/contact" className="block">
                    <Button variant="outline" size="lg" className="w-full border-2 border-slate-800 text-white hover:bg-white/5 py-8 rounded-2xl transition-all">
                      Speak with Sales
                    </Button>
                  </Link>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-800 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Pricing Model</span>
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{service.priceModel}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">SLA Commitment</span>
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">99.99% Uptime</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Technical Capabilities - Premium Grid */}
      <section className="py-32 bg-slate-50 relative border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Technical Capabilities</h2>
            <div className="h-1.5 w-24 bg-linear-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.features?.map((feature, index) => (
              <div 
                key={index}
                className="group p-8 bg-white border border-gray-200/60 rounded-4xl shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-blue-50 to-cyan-50 rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="h-14 w-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight leading-snug">{feature}</h3>
                <div className="h-1 w-12 bg-gray-100 group-hover:w-full group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-cyan-500 transition-all duration-700 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment Process - Enhanced Steps */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="lg:w-1/3">
                <div className="inline-block mb-6 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Our Protocol</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter">Hardened <br />Process</h2>
                <p className="text-xl text-gray-500 font-light leading-relaxed">
                  A battle-tested methodology designed for maximum speed and zero operational risk.
                </p>
              </div>
              
              <div className="lg:w-2/3 space-y-6 relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-100 hidden md:block" />
                {service.processSteps.map((step, index) => (
                  <div key={index} className="relative z-10 flex gap-8 p-8 rounded-3xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
                    <div className="shrink-0">
                      <div className="h-16 w-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl group-hover:scale-110 group-hover:bg-blue-600 transition-all">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">{step.title}</h3>
                      <p className="text-lg text-gray-500 font-light leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Infrastructure */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <pattern id="faq-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
              <rect width="100" height="100" fill="url(#faq-pattern)" />
            </svg>
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Operational Clarity</h2>
              <p className="text-xl text-gray-400 font-light">Addressing common enterprise inquiries regarding our delivery framework.</p>
            </div>
            <div className="space-y-6">
              {service.faqs.map((faq, index) => (
                <div key={index} className="group p-8 bg-white/5 border border-white/10 rounded-4xl hover:bg-white/10 transition-all duration-300">
                  <h3 className="text-xl font-black text-white mb-4 flex items-center gap-4">
                    <span className="h-1.5 w-1.5 bg-blue-500 rounded-full group-hover:scale-[3] transition-transform" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-400 text-lg font-light leading-relaxed pl-6 border-l border-white/10 ml-0.5">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final Conversion Unit */}
      <section className="py-40 bg-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-150 bg-linear-to-b from-blue-50 to-transparent rounded-full blur-[120px] -z-10 opacity-50" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-block mb-8 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full">
            <span className="text-sm font-black text-blue-600 uppercase tracking-[0.2em]">Deployment Ready</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black text-slate-900 mb-10 tracking-tighter leading-[0.9]">
            Ready to <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-500">Transform?</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-500 mb-16 font-light leading-relaxed max-w-3xl mx-auto">
            Our specialized {service.title.toLowerCase()} protocol is currently available for new enterprise partners. Start your architectural session today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/book">
              <Button size="lg" className="bg-slate-950 text-white hover:bg-blue-600 px-16 py-10 text-xl font-black rounded-3xl transition-all duration-500 shadow-2xl shadow-slate-900/20 hover:scale-105 group">
                Schedule Architecture Call
                <svg className="h-6 w-6 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
            <Link href="/case-studies">
              <Button variant="outline" size="lg" className="border-2 border-gray-100 px-16 py-10 text-xl font-black rounded-3xl hover:bg-gray-50 transition-all hover:scale-105">
                View Impact Reports
              </Button>
            </Link>
          </div>
          <div className="mt-20 flex flex-wrap justify-center gap-10 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
             <span className="text-xs font-bold uppercase tracking-widest text-slate-400">SOC2 Certified</span>
             <span className="text-xs font-bold uppercase tracking-widest text-slate-400">HIPAA Compliant</span>
             <span className="text-xs font-bold uppercase tracking-widest text-slate-400">GDPR Ready</span>
             <span className="text-xs font-bold uppercase tracking-widest text-slate-400">ISO 27001</span>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

export async function generateStaticParams() {
  return mockCMSServices
    .filter(s => s.isPublished && s.slug)
    .map((service) => ({
      slug: service.slug,
    }));
}
