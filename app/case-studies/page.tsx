import Link from 'next/link';
import { PublicLayout } from '@/components/public';
import { Button, Card, CardContent, Badge } from '@/components/ui';

const caseStudies = [
  {
    id: 'techflow-erp',
    company: 'TechFlow Industries',
    industry: 'Manufacturing',
    title: 'Custom ERP Implementation',
    excerpt: 'How we helped TechFlow streamline their manufacturing operations with a tailored ERP system.',
    challenge: 'TechFlow was managing inventory, production, and sales across multiple disconnected spreadsheets and legacy systems. Data silos were causing errors, delays, and lost revenue.',
    solution: 'We designed and built a comprehensive ERP system that unified inventory management, production scheduling, sales orders, and financial reporting into one integrated platform.',
    results: [
      { metric: '40%', label: 'Reduction in order processing time' },
      { metric: '99.5%', label: 'Inventory accuracy (up from 85%)' },
      { metric: '25%', label: 'Increase in production efficiency' },
      { metric: '6 months', label: 'Full ROI achieved' },
    ],
    testimonial: {
      quote: 'Largify transformed our operations. The new system actually fits how we work, not the other way around.',
      author: 'Robert Martinez',
      role: 'CTO, TechFlow Industries',
    },
    tags: ['ERP', 'Manufacturing', 'Inventory'],
    image: '/case-studies/techflow.jpg',
    featured: true,
  },
  {
    id: 'greenleaf-health',
    company: 'GreenLeaf Healthcare',
    industry: 'Healthcare',
    title: 'Patient Management System',
    excerpt: 'Building a HIPAA-compliant patient management system that improved care coordination.',
    challenge: 'GreenLeaf needed a modern patient management system that could handle scheduling, records, billing, and comply with HIPAA regulations—without the complexity of enterprise solutions.',
    solution: 'We built a custom healthcare platform with secure patient records, integrated scheduling, automated billing, and comprehensive audit logging for compliance.',
    results: [
      { metric: '50%', label: 'Faster patient check-in' },
      { metric: '100%', label: 'HIPAA compliance' },
      { metric: '30%', label: 'Reduction in no-shows' },
      { metric: '4.8/5', label: 'Patient satisfaction score' },
    ],
    testimonial: {
      quote: 'Their security-first approach gave us confidence that our patient data is protected. Excellent team to work with.',
      author: 'Emily Johnson',
      role: 'Operations Director, GreenLeaf Healthcare',
    },
    tags: ['Healthcare', 'HIPAA', 'Custom Software'],
    featured: true,
  },
  {
    id: 'summit-logistics',
    company: 'Summit Logistics',
    industry: 'Logistics',
    title: 'Fleet Management System',
    excerpt: 'Real-time fleet tracking and route optimization for a growing logistics company.',
    challenge: 'Summit was struggling to efficiently manage their growing fleet of vehicles. Manual dispatching, lack of real-time visibility, and inefficient routes were cutting into profits.',
    solution: 'We developed a comprehensive fleet management system with GPS tracking, automated route optimization, driver management, and real-time analytics dashboards.',
    results: [
      { metric: '18%', label: 'Fuel cost reduction' },
      { metric: '22%', label: 'More deliveries per day' },
      { metric: '95%', label: 'On-time delivery rate' },
      { metric: 'Real-time', label: 'Fleet visibility' },
    ],
    tags: ['Logistics', 'Fleet Management', 'IoT'],
    featured: false,
  },
];

export default function CaseStudiesPage() {
  const featuredStudies = caseStudies.filter(cs => cs.featured);
  const otherStudies = caseStudies.filter(cs => !cs.featured);

  return (
    <PublicLayout>
      {/* Hero Section - Premium */}
      <section className="relative bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-white py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 1200 1200">
            <defs>
              <pattern id="cases-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="1200" height="1200" fill="url(#cases-grid)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block mb-6 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Impact Analysis</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-10 leading-tight">
              Systems at<br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-cyan-400 font-black">Global Scale</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl">
              Evidence-based engineering transformations. Explore how we architect solutions for complex industrial and digital challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Case Studies - Premium */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-40">
            {featuredStudies.map((study, index) => (
              <div key={study.id} className="grid lg:grid-cols-2 gap-20 items-start">
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} space-y-10`}>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-3 mb-6">
                      {study.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-tighter border border-blue-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm font-bold text-blue-500 uppercase tracking-widest">{study.company} // {study.industry}</p>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">{study.title}</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-10">
                    <div>
                      <h4 className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                        <span className="h-px w-8 bg-gray-200"></span>
                        Executive Challenge
                      </h4>
                      <p className="text-xl text-gray-600 font-light leading-relaxed">{study.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                        <span className="h-px w-8 bg-gray-200"></span>
                        The Framework
                      </h4>
                      <p className="text-xl text-gray-600 font-light leading-relaxed">{study.solution}</p>
                    </div>
                  </div>

                  {study.testimonial && (
                    <div className="relative p-10 bg-slate-50 rounded-3xl border-l-4 border-blue-600 italic group">
                      <div className="absolute top-4 right-8 text-6xl text-blue-200 opacity-50 font-serif">"</div>
                      <p className="text-lg text-slate-700 mb-6 font-medium relative z-10">&quot;{study.testimonial.quote}&quot;</p>
                      <div className="flex items-center gap-3">
                        <div className="h-0.5 w-6 bg-blue-400" />
                        <p className="text-sm text-slate-500 font-bold tracking-tight">
                          {study.testimonial.author}, <span className="text-blue-600">{study.testimonial.role}</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="sticky top-24">
                    <Card variant="bordered" className="p-12 bg-slate-950 border-slate-900 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                      <h4 className="text-xs font-black text-blue-400 uppercase tracking-[0.3em] mb-12 flex items-center gap-4">
                        Success Metrics
                        <div className="flex-1 h-px bg-slate-800"></div>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-8">
                        {study.results.map((result) => (
                          <div key={result.label} className="group">
                            <p className="text-5xl font-black text-white mb-2 tracking-tighter group-hover:text-blue-400 transition-colors duration-300">
                              {result.metric}
                            </p>
                            <p className="text-sm text-slate-400 font-medium uppercase tracking-widest">
                              {result.label}
                            </p>
                            <div className="mt-4 h-1 w-8 bg-blue-600/30 group-hover:w-full transition-all duration-500 rounded-full" />
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-16 p-8 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                        <p className="text-sm text-blue-300 font-light leading-relaxed">
                          "This project utilized our <span className="text-blue-400 font-bold">Secure-Core™</span> infrastructure, ensuring SOC 2 compliance from day one."
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Case Studies - Premium */}
      {otherStudies.length > 0 && (
        <section className="py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div>
                <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">Secondary Impact</h2>
                <p className="text-xl text-gray-600 font-light">Further explorations in technical efficiency.</p>
              </div>
              <div className="h-px flex-1 bg-gray-200 mx-8 hidden md:block mb-6"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {otherStudies.map((study) => (
                <Card key={study.id} variant="bordered" className="group p-10 bg-white hover:border-blue-400 border-gray-200 transition-all duration-500 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 flex flex-col">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-8">
                      {study.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[9px] font-black uppercase tracking-tighter">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">{study.company}</p>
                    <h3 className="text-2xl font-black text-gray-900 mb-6 group-hover:text-blue-600 transition-colors leading-tight">
                      {study.title}
                    </h3>
                    <p className="text-gray-600 text-base font-light mb-10 leading-relaxed italic">
                      "{study.excerpt}"
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-50">
                    {study.results.slice(0, 2).map((result) => (
                      <div key={result.label}>
                        <p className="text-2xl font-black text-gray-900 mb-1">{result.metric}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{result.label}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Premium */}
      <section className="py-32 bg-slate-950 text-white relative">
        <div className="absolute inset-0 bg-linear-to-br from-blue-950/50 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-black mb-10 tracking-tight leading-tight">
            Ready to Architect <br />
            Your <span className="text-blue-400 italic">Success Story?</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-2xl mx-auto font-light leading-relaxed font-serif italic">
            "The best way to predict the future is to engineer it."
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/book">
              <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-500 px-14 py-8 text-lg font-bold rounded-full transition-all shadow-2xl shadow-blue-500/20">
                Start Discovery Phase
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-2 border-white/20 text-white hover:bg-white/10 px-14 py-8 text-lg font-bold rounded-full transition-all backdrop-blur-sm">
                Request Benchmarks
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
   
