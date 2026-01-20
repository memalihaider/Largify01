import Link from 'next/link';
import { PublicLayout } from '@/components/public';
import { Button, Card, CardContent } from '@/components/ui';

const team = [
  {
    name: 'James Wilson',
    role: 'Founder & CEO',
    bio: 'Former enterprise architect with 15+ years building business systems for companies of all sizes.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
  },
  {
    name: 'Sarah Chen',
    role: 'Lead Developer',
    bio: 'Full-stack engineer specializing in scalable architectures and security-first development.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  },
  {
    name: 'Michael Roberts',
    role: 'Full Stack Developer',
    bio: 'Passionate about creating intuitive user experiences and clean, maintainable code.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
  },
];

const values = [
  {
    title: 'Security First',
    description: 'We believe security should be built-in, not bolted on. Every system we create starts with security at its foundation.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Quality Over Quantity',
    description: 'We take on fewer projects to ensure each one gets the attention it deserves. No cookie-cutter solutions.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: 'Long-term Partnership',
    description: 'We don\'t disappear after delivery. We build relationships that last because your success is our success.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Transparency',
    description: 'No hidden costs, no surprise delays. We communicate clearly and honestly throughout every project.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero Section - Premium */}
      <section className="relative bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-white py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 1200 1200">
            <defs>
              <pattern id="about-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="1200" height="1200" fill="url(#about-grid)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block mb-6 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Our Story</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              Engineering the<br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-cyan-400">Future of Business</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl">
              We architect secure, high-performance systems that empower enterprises to scale without technical debt or security trade-offs.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section - Premium */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-block mb-6 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Our Mission</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
                Democratizing<br />
                <span className="text-blue-600 font-black">Enterprise Architecture</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed font-light">
                We believe global-scale architectural excellence shouldn't be reserved for the Fortune 500. Our mission is to provide every growing enterprise with the same security, reliability, and scalability used by tech giants.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed font-light">
                Our approach combines deep mathematical precision with pragmatic business logic to create systems that grow with you, not against you.
              </p>
              <div className="flex items-center gap-4 p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white shrink-0">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-blue-900 tracking-tight">
                  Driving $500M+ in collective enterprise value through optimized infrastructure.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 to-cyan-600/10 rounded-3xl transform group-hover:scale-[1.02] transition-transform duration-500 blur-xl"></div>
              <Card variant="bordered" className="relative p-12 bg-slate-950 border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <h3 className="text-3xl font-bold text-white mb-8">The Largify Edge</h3>
                <div className="space-y-8">
                  {[
                    { title: 'Zero-Debt Engineering', desc: 'Code systems designed for 10+ year longevity.' },
                    { title: 'Math-Driven Security', desc: 'Cryptographically verified data integrity.' },
                    { title: 'Impact Realization', desc: 'Direct correlation between code and revenue.' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="text-blue-400 font-bold text-lg pt-1">{idx + 1}.</div>
                      <div>
                        <h4 className="font-bold text-white mb-1">{item.title}</h4>
                        <p className="text-slate-400 text-sm font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Premium */}
      <section className="py-32 bg-gray-50 border-y border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-block mb-6 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Our Culture</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8">The Principles We Code By</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              In a world of fast-moving "MVPs", we stand for technical rigor, security first-principles, and lasting engineering value.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card key={value.title} variant="bordered" className="group p-8 bg-white hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 rounded-2xl">
                <div className="h-14 w-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 border border-blue-100/50">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{value.title}</h3>
                <p className="text-gray-600 text-sm font-light leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Premium */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-block mb-6 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">The Collective</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8">Meet the Architects</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Technical experts from across the globe, united by a passion for building the world's most resilient business systems.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {team.map((member) => (
              <div key={member.name} className="group text-center">
                <div className="relative mb-8 mx-auto w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-blue-400 group-hover:scale-105 transition-all duration-500 shadow-xl">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{member.name}</h3>
                <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mt-2 mb-4">{member.role}</p>
                <div className="w-12 h-0.5 bg-gray-200 mx-auto group-hover:w-20 group-hover:bg-blue-400 transition-all duration-500 mb-6" />
                <p className="text-gray-600 text-base leading-relaxed font-light px-4">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Premium */}
      <section className="py-32 bg-linear-to-b from-slate-900 via-blue-900 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3)_0%,transparent_70%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-black mb-10 tracking-tight">
            Build Systems That<br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-cyan-400">Outlast the Competition</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
            Ready to secure your future with enterprise-grade infrastructure? Let&apos;s start the discussion.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/book">
              <Button size="lg" className="bg-white text-blue-950 hover:bg-blue-50 px-12 py-8 text-lg font-bold rounded-full transition-all shadow-xl shadow-white/10">
                Schedule Engineering Review
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-2 border-white/20 text-white hover:bg-white/10 px-12 py-8 text-lg font-bold rounded-full backdrop-blur-sm transition-all">
                Speak to an Architect
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
