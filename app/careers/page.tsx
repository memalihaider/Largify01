import { PublicLayout } from '@/components/public';
import { Button, Card, CardContent, Badge } from '@/components/ui';
import Link from 'next/link';

export default function CareersPage() {
  const positions = [
    {
      title: 'Infrastructure Architect',
      department: 'Engineering',
      location: 'Remote / Global',
      type: 'Full-time',
      desc: 'Design and implement hardened cloud-native systems for enterprise dominance.',
    },
    {
      title: 'Security Operations Lead',
      department: 'Cybersecurity',
      location: 'Remote',
      type: 'Full-time',
      desc: 'Oversight of autonomous threat detection protocols and penetration testing.',
    },
    {
      title: 'Senior ERP Engineer',
      department: 'Product',
      location: 'Hybrid',
      type: 'Full-time',
      desc: 'Building the next generation of industrial-grade business management software.',
    },
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] opacity-50" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
              <span className="text-xs font-black text-blue-400 uppercase tracking-[0.3em]">Recruitment Active</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
              Join the <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500">Elite Guard</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-12 italic">
              "We don't hire employees. We recruit technical sovereigns capable of engineering the impossible."
            </p>
          </div>
        </div>
      </section>

      {/* Positions Section */}
      <section className="py-32 bg-white relative -mt-20 px-6 rounded-t-[4rem]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-6">
                Open <span className="text-blue-600">Protocols</span>
              </h2>
              <p className="text-lg text-slate-500 font-medium italic">
                Strategic roles available for those who excel in high-pressure specialized environments.
              </p>
            </div>
            <Badge variant="default" className="px-6 py-2 border-slate-200 text-slate-400 font-black uppercase tracking-widest leading-none h-12 flex items-center">
              {positions.length} Slots Available
            </Badge>
          </div>

          <div className="grid gap-6">
            {positions.map((job, idx) => (
              <div 
                key={idx}
                className="group relative bg-slate-50 rounded-[2.5rem] p-10 lg:p-12 border border-slate-100 hover:bg-slate-950 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                  <div className="max-w-xl">
                    <div className="flex flex-wrap gap-3 mb-6">
                      <span className="px-4 py-1.5 bg-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {job.department}
                      </span>
                      <span className="px-4 py-1.5 bg-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full group-hover:bg-white/10 group-hover:text-slate-400 transition-colors">
                        {job.location}
                      </span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 tracking-tighter group-hover:text-white transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-slate-500 font-medium italic group-hover:text-slate-400 transition-colors">
                      {job.desc}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="hidden sm:block text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Clearance Level</p>
                      <p className="text-sm font-black text-slate-900 group-hover:text-blue-400 transition-colors">Level A+ (Top Secret)</p>
                    </div>
                    <Button className="h-20 px-10 bg-slate-950 text-white rounded-[2rem] group-hover:bg-blue-600 transition-all duration-500 font-black uppercase tracking-widest border-none text-sm">
                      APPLY FOR ROLE
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { title: "Sovereign Compensation", desc: "Top 1% market rates with aggressive equity protocols." },
              { title: "Deep Work Zones", desc: "Strict asynchronous standards with zero-latency communications." },
              { title: "Neural Enhancement", desc: "Full stack health coverage including advanced cognitive support." }
            ].map((perk, i) => (
              <div key={i} className="p-10 bg-white border border-slate-100 rounded-[3rem] hover:shadow-xl transition-all group">
                <div className="h-14 w-14 bg-slate-900 rounded-2xl mb-8 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tighter">{perk.title}</h3>
                <p className="text-slate-500 font-medium italic">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture CTA */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="bg-slate-950 rounded-[4rem] p-12 lg:p-24 text-center relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 pointer-events-none">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_70%)]" />
             </div>
             <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none">
                  Ready to <span className="text-blue-500 underline decoration-blue-500/30">Transcend</span>?
                </h2>
                <p className="text-xl text-slate-400 font-light leading-relaxed mb-12">
                  Our vetting process is rigorous, algorithmic, and designed for those who seek technical enlightenment.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <Button size="lg" className="h-20 px-12 text-xl font-black bg-white text-slate-950 hover:bg-blue-600 hover:text-white rounded-full transition-all">
                    START EXAMINATION
                  </Button>
                  <Button variant="outline" size="lg" className="h-20 px-12 text-xl font-black bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-full transition-all">
                    OUR MANIFESTO
                  </Button>
                </div>
             </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
