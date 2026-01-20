import Link from 'next/link';
import { PublicLayout } from '@/components/public';
import { Button, Card, CardContent } from '@/components/ui';
import {
  mockCMSTeamMembers,
  mockCMSCertifications,
  mockCMSTestimonials,
  mockCMSFAQs,
  mockCMSServices,
} from '@/lib/mock-data';

const logoPartners = [
  { name: 'TechFlow', logo: 'https://cdn.brandfetch.io/id678_123/w/400/h/400/theme/dark/logo.png' },
  { name: 'GreenLeaf', logo: 'https://cdn.brandfetch.io/id678_123/w/400/h/400/theme/dark/logo.png' },
  { name: 'Summit', logo: 'https://cdn.brandfetch.io/id678_123/w/400/h/400/theme/dark/logo.png' },
  { name: 'Nexus', logo: 'https://cdn.brandfetch.io/id678_123/w/400/h/400/theme/dark/logo.png' },
  { name: 'Pulse', logo: 'https://cdn.brandfetch.io/id678_123/w/400/h/400/theme/dark/logo.png' },
];

const services = [
  {
    icon: (
      <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 19.428a8.046 8.046 0 00-1.29-10.856 8.046 8.046 0 00-10.856-1.29A8.046 8.046 0 004.572 19.428m14.856 0a8.046 8.046 0 01-12.148-9.564" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21V10m0 0a2 2 0 100-4 2 2 0 000 4zm0 0a2 2 0 110-4 2 2 0 010 4zm0 0v11m-4-3h8" />
      </svg>
    ),
    title: 'Enterprise System Architecture',
    slug: 'enterprise-architecture',
    description: 'High-level strategic planning and design of your core technology infrastructure for scalability and resilience.',
    features: ['Scalability Planning', 'Resilience by Design', 'Technology Roadmapping'],
  },
  {
    icon: (
      <svg className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Secure Software Development',
    slug: 'secure-development',
    description: 'Building robust applications with security embedded at every stage of the development lifecycle (DevSecOps).',
    features: ['DevSecOps Integration', 'Threat Modeling', 'Code Auditing'],
  },
  {
    icon: (
      <svg className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Digital Transformation',
    slug: 'digital-transformation',
    description: 'Modernizing legacy systems and migrating to high-performance, cloud-native architectures for agility.',
    features: ['Legacy System Modernization', 'Cloud Migration', 'Microservice Architecture'],
  },
  {
    icon: (
      <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    title: 'Cloud-Native Infrastructure',
    slug: 'cloud-infrastructure',
    description: 'Designing and managing scalable, secure, and cost-efficient cloud environments on AWS, Azure, or GCP.',
    features: ['Infrastructure as Code (IaC)', 'Kubernetes & Orchestration', 'Multi-Cloud Strategy'],
  },
  {
    icon: (
      <svg className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'AI-Powered Automation',
    slug: 'ai-automation',
    description: 'Implementing intelligent automation and predictive analytics to optimize business processes and drive efficiency.',
    features: ['Predictive Analytics', 'LLM Integration', 'Robotic Process Automation (RPA)'],
  },
  {
    icon: (
      <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Cybersecurity & Compliance',
    slug: 'cybersecurity-compliance',
    description: 'Comprehensive security audits, penetration testing, and governance to protect assets and ensure compliance.',
    features: ['Penetration Testing', 'Security Audits', 'Governance & Compliance (SOC 2, ISO)'],
  },
];

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Support Available' },
  { value: '10+', label: 'Industries Served' },
];

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden pb-16 pt-28 md:pt-40 md:pb-24">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 1200 1200">
            <defs>
              <pattern id="premium-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="1200" height="1200" fill="url(#premium-grid)" />
          </svg>
        </div>
        <div className="absolute top-0 right-1/4 -mr-40 -mt-40 w-200 h-200 bg-blue-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 -ml-32 -mb-32 w-120 h-120 bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 -mr-32 w-100 h-100 bg-cyan-600/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600/20 to-cyan-600/20 border border-cyan-500/30 rounded-full px-5 py-2 mb-8 backdrop-blur-md hover:border-cyan-400/50 transition-all">
              <span className="h-2 w-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-cyan-200">✦ Trusted by Fortune 500 Companies</span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-8 tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-white via-blue-200 to-cyan-200">
              Enterprise Systems <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-300 via-cyan-300 to-indigo-300">
                Built for Trust & Scale
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
              Quantum-ready architecture. Zero-trust security. 99.99% uptime guarantee.
              <br className="hidden md:block" />
              Enterprise-grade infrastructure trusted by global leaders.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/book">
                <Button size="lg" className="h-14 px-8 text-base bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25">
                  Start Your Project
                  <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button variant="outline" size="lg" className="h-14 px-8 text-base border-gray-700 text-white hover:bg-gray-800">
                  View Success Stories
                </Button>
              </Link>
            </div>
            
            {/* Hero Trust Badges - Premium */}
            <div className="pt-12 border-t border-white/10 inline-flex flex-wrap items-center justify-center gap-8 md:gap-12 text-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-linear-to-r from-cyan-400 to-blue-400" />
                <div className="text-left">
                  <div className="text-lg font-bold text-white">250+</div>
                  <div className="text-xs uppercase tracking-widest text-gray-400">Enterprise Clients</div>
                </div>
              </div>
              <div className="h-6 w-px bg-white/20 hidden sm:block" />
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-linear-to-r from-blue-400 to-indigo-400" />
                <div className="text-left">
                  <div className="text-lg font-bold text-white">99.99%</div>
                  <div className="text-xs uppercase tracking-widest text-gray-400">Uptime SLA</div>
                </div>
              </div>
              <div className="h-6 w-px bg-white/20 hidden sm:block" />
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-linear-to-r from-cyan-400 to-emerald-400" />
                <div className="text-left">
                  <div className="text-lg font-bold text-white">SOC 2</div>
                  <div className="text-xs uppercase tracking-widest text-gray-400">Type II Certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Premium */}
      <section className="bg-linear-to-b from-white to-gray-50 py-16 border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, idx) => (
              <div key={stat.label} className="relative group">
                <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative text-center py-6">
                  <div className="flex items-center justify-center mb-3">
                    <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-cyan-600 rounded-full opacity-10" />
                    <p className="relative text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600">{stat.value}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-700 uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & System Impact Section - Enhanced */}
      <section className="py-28 bg-linear-to-br from-slate-900 via-black to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-15" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-10" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-4 px-4 py-2 bg-cyan-500/15 border border-cyan-300/30 rounded-full">
              <span className="text-sm font-semibold text-cyan-300 uppercase tracking-[0.15em]">Digital Fortress</span>
            </div>
            <h3 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              Mission-Critical Systems
              <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-300 to-blue-300">Secured & Scaled</span>
            </h3>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Our architecture is engineered for zero-downtime, uncompromising security, and limitless scale. We protect your most valuable digital assets.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Security Pillar */}
            <div className="group p-10 bg-linear-to-br from-cyan-500/5 to-blue-500/5 rounded-3xl border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-500 backdrop-blur-xl hover:shadow-2xl hover:shadow-cyan-500/10">
              <div className="h-14 w-14 bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-8 border border-cyan-500/30">
                <svg className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold mb-6">Fortified Security</h4>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Zero-Trust Architecture</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Quantum-Resistant Encryption</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>AI-Powered Threat Intelligence</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>SOC 2 & ISO 27001 Compliant</span>
                </li>
              </ul>
            </div>

            {/* Reliability Pillar */}
            <div className="group p-10 bg-linear-to-br from-blue-500/5 to-indigo-500/5 rounded-3xl border border-blue-500/30 hover:border-blue-400/60 transition-all duration-500 backdrop-blur-xl hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="h-14 w-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/30">
                <svg className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold mb-6">Unbreakable Reliability</h4>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span>Geo-Redundant Infrastructure</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span>Automated Failover & Recovery</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span>99.999% Uptime SLA</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span>Proactive 24/7 Monitoring</span>
                </li>
              </ul>
            </div>

            {/* Performance Pillar */}
            <div className="group p-10 bg-linear-to-br from-indigo-500/5 to-purple-500/5 rounded-3xl border border-indigo-500/30 hover:border-indigo-400/60 transition-all duration-500 backdrop-blur-xl hover:shadow-2xl hover:shadow-indigo-500/10">
              <div className="h-14 w-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-8 border border-indigo-500/30">
                <svg className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0122 12c0 3-1 7-7 7a8.003 8.003 0 01-7.343-4.343z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold mb-6">Hyperscale Performance</h4>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 mt-1">✓</span>
                  <span>Global Edge Network</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 mt-1">✓</span>
                  <span>Sub-50ms Latency</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 mt-1">✓</span>
                  <span>Serverless Compute at Scale</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 mt-1">✓</span>
                  <span>In-Memory Data Grids</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-gray-700/50">
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">99.999%</div>
              <div className="text-sm text-gray-400 uppercase tracking-widest">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">&lt;50ms</div>
              <div className="text-sm text-gray-400 uppercase tracking-widest">Global Latency</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-400 mb-2">Zero-Trust</div>
              <div className="text-sm text-gray-400 uppercase tracking-widest">Security Model</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">ISO 27001</div>
              <div className="text-sm text-gray-400 uppercase tracking-widest">Certified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Cloud Section - Premium */}
      <section className="py-16 bg-linear-to-b from-white to-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-bold text-gray-600 uppercase tracking-wider mb-12">
            ✓ Trusted by Industry Leaders & Fortune 500 Companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {['TechFlow', 'GreenLeaf', 'Summit', 'Nexus', 'Pulse', 'Vertex'].map((partner) => (
              <div key={partner} className="group flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full opacity-50 group-hover:opacity-100 transition-all" />
                <span className="text-xl font-bold text-gray-700 group-hover:text-blue-600 transition-colors cursor-pointer">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Premium */}
      <section className="py-28 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
              <span className="text-sm font-semibold text-blue-700 uppercase tracking-[0.15em]">Our Core Services</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
              Enterprise Solutions <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600">Engineered for Scale</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Premium software architecture designed for the world's most demanding enterprises.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} variant="bordered" className="bg-white/80 backdrop-blur-sm border border-gray-200/60 group hover:border-blue-400/60 hover:shadow-2xl hover:shadow-blue-500/15 transition-all duration-500 overflow-hidden">
                <CardContent className="p-8">
                  <div className="h-16 w-16 bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center mb-8 group-hover:shadow-lg group-hover:shadow-blue-500/20 group-hover:scale-110 transition-all duration-300 border border-gray-100/50">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-8 leading-relaxed font-light">
                    {service.description}
                  </p>
                  
                  {/* Features List */}
                  <div className="space-y-3 mb-8 pb-8 border-b border-gray-100/50">
                    {(service as any).features?.map((feature: string) => (
                      <div key={feature} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                        <div className="w-5 h-5 rounded-full bg-linear-to-br from-blue-200 to-blue-300 flex items-center justify-center shrink-0 shadow-sm">
                          <svg className="h-3 w-3 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 h-12">
                    Explore Service →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Largify - Premium Section */}
      <section className="py-28 bg-linear-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block mb-6 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Why We're Different</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
                Enterprise Solutions,<br />
                <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600">Built for Real Challenges</span>
              </h2>
              <p className="text-lg text-gray-600 mb-12 leading-relaxed font-light">
                We don&apos;t just build software — we architect business systems that become competitive advantages.
              </p>
              <div className="space-y-5">
                {[
                  {
                    title: '🔒 Security First Architecture',
                    description: 'Zero-trust model embedded at every layer, from API design to data persistence.',
                  },
                  {
                    title: '⚙️ Modular & Infinitely Scalable',
                    description: 'Start small, scale globally. Microservices-ready systems that grow without rewrites.',
                  },
                  {
                    title: '🎯 Enterprise-Grade Reliability',
                    description: '99.99% uptime SLA with automatic failover and distributed redundancy.',
                  },
                  {
                    title: '🤝 Long-term Strategic Partnership',
                    description: 'Dedicated support teams, roadmap alignment, and continuous optimization.',
                  },
                ].map((item) => (
                  <div key={item.title} className="group flex gap-4 p-4 rounded-xl hover:bg-white/60 transition-all duration-300 cursor-pointer">
                    <div className="shrink-0">
                      <div className="h-8 w-8 bg-linear-to-br from-blue-200 to-cyan-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <svg className="h-5 w-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base group-hover:text-blue-600 transition-colors">{item.title}</h3>
                      <p className="text-gray-600 text-sm mt-1 leading-relaxed font-light">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-linear-to-br from-blue-600/95 via-blue-700 to-indigo-900 rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl shadow-blue-500/20 border border-blue-400/20">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"></div>
                <h3 className="text-3xl font-black mb-6 relative z-10">Ready to Scale Your Enterprise?</h3>
                <p className="text-blue-100 mb-8 relative z-10 text-lg leading-relaxed font-light">
                  Let's discuss how our architecture-first approach can become your competitive advantage.
                </p>
                <Link href="/book" className="relative z-10">
                  <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-lg shadow-white/20 h-12">
                    Schedule Discovery Call →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Premium */}
      <section className="py-28 bg-linear-to-b from-slate-950 to-slate-900 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-end mb-24">
            <div className="lg:w-2/3">
              <div className="inline-block mb-6 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Our Methodology</span>
              </div>
              <h3 className="text-4xl md:text-6xl font-black text-white leading-tight">
                From Vision to<br />
                <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-cyan-400">Enterprise Scale</span>
              </h3>
            </div>
            <div className="lg:w-1/3">
              <p className="text-lg text-gray-400 leading-relaxed font-light">
                Refined through hundreds of enterprise deployments, our battle-tested process ensures success from day one.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Strategic Alignment',
                description: 'Deep-dive workshops to align business goals with technical architecture and measurable outcomes.',
              },
              {
                step: '02',
                title: 'Technical Architecture',
                description: 'Designing resilient, secure, and scalable systems using cutting-edge tech stacks.',
              },
              {
                step: '03',
                title: 'Iterative Development',
                description: 'Transparent engineering with bi-weekly demos, rigorous QA, and continuous feedback.',
              },
              {
                step: '04',
                title: 'Continuous Optimization',
                description: 'Seamless deployment followed by data-driven monitoring and performance scaling.',
              },
            ].map((item) => (
              <div key={item.step} className="group relative">
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative p-8 rounded-2xl border border-slate-700/50 group-hover:border-blue-500/50 transition-all duration-500">
                  <div className="text-7xl font-black text-white/10 mb-6 group-hover:text-blue-500/20 transition-colors">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed font-light">
                    {item.description}
                  </p>
                  <div className="mt-6 h-1 w-12 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Preview - Premium */}
      <section className="py-28 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Case Studies</span>
            </div>
            <h3 className="text-4xl md:text-6xl font-black text-gray-900 mb-8">
              Enterprise Wins Built<br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600">on Our Architecture</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Real results from demanding enterprises that chose architecture-first engineering.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                company: 'TechFlow Industries',
                industry: 'Global Logistics',
                result: 'Automated 85% of order fulfillment workflows across 12 countries.',
                metric: '40%',
                label: 'Efficiency Gain',
                accent: 'bg-blue-600',
              },
              {
                company: 'GreenLeaf Healthcare',
                industry: 'Telemedicine',
                result: 'Architected a zero-trust HIPAA infrastructure supporting 10k concurrent users.',
                metric: '100%',
                label: 'Security Compliance',
                accent: 'bg-green-600',
              },
              {
                company: 'Summit Logistics',
                industry: 'Supply Chain',
                result: 'Machine learning enabled predictive route optimization reducing fuel overhead.',
                metric: '18%',
                label: 'Cost Reduction',
                accent: 'bg-orange-600',
              },
            ].map((item) => (
              <Card key={item.company} variant="bordered" className="group relative bg-white/80 backdrop-blur-sm border border-gray-200/60 hover:border-blue-400/60 hover:shadow-2xl hover:shadow-blue-500/15 rounded-3xl overflow-hidden transition-all duration-500">
                <CardContent className="p-10">
                  <div className="inline-block mb-6 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
                    <p className="text-xs font-bold text-blue-700 uppercase tracking-widest">{item.industry}</p>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-blue-600 transition-colors">{item.company}</h3>
                  <p className="text-gray-600 mb-10 leading-relaxed font-light">{item.result}</p>
                  
                  <div className="flex items-center gap-6 pt-6 border-t border-gray-100/50">
                    <div className={`rounded-2xl p-0.5 bg-linear-to-br ${item.accent === 'bg-blue-600' ? 'from-blue-500 to-blue-600' : item.accent === 'bg-green-600' ? 'from-green-500 to-green-600' : 'from-orange-500 to-orange-600'}`}>
                      <div className="bg-white rounded-xl px-6 py-4">
                        <p className={`text-4xl font-black ${item.accent === 'bg-blue-600' ? 'text-blue-600' : item.accent === 'bg-green-600' ? 'text-green-600' : 'text-orange-600'}`}>
                          {item.metric}
                        </p>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter mt-2">{item.label}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Measurable Impact</p>
                      <p className="text-xs text-gray-500">Enterprise performance at scale</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-20">
            <Link href="/case-studies">
              <Button variant="outline" size="lg" className="rounded-full px-10 border-2 font-bold hover:bg-gray-50">
                View Engagement Portfolio
                <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Premium */}
      <section className="py-28 bg-linear-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Client Voices</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8">
              Trusted by Enterprise<br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600">Leadership Teams</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              CTOs, CEOs, and technical leaders share how our solutions transformed their operations.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {mockCMSTestimonials.filter(t => t.isPublished).slice(0, 3).map((testimonial) => (
              <Card key={testimonial.id} variant="bordered" className="group bg-white/80 backdrop-blur-sm border border-gray-200/60 hover:border-blue-400/60 hover:shadow-2xl hover:shadow-blue-500/15 rounded-3xl overflow-hidden transition-all duration-500 flex flex-col h-full">
                <CardContent className="p-10 flex flex-col h-full">
                  <div className="flex gap-1.5 mb-8">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-12 leading-relaxed grow text-base font-light">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4 pt-8 border-t border-gray-100/50">
                    <div className="h-14 w-14 rounded-full overflow-hidden bg-linear-to-br from-blue-100 to-cyan-100 shrink-0 border-2 border-white shadow-md">
                      <img src={testimonial.authorAvatarUrl} alt={testimonial.authorName} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-base">{testimonial.authorName}</p>
                      <p className="text-sm text-gray-600 font-light">{testimonial.authorRole} <span className="text-blue-600 font-semibold">@ {testimonial.authorCompany}</span></p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve - Premium */}
      <section className="py-28 bg-linear-to-b from-gray-50 to-white border-y border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Industry Expertise</span>
            </div>
            <h3 className="text-4xl md:text-6xl font-black text-gray-900 mb-8">
              Specialized Experience Across<br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600">Every Critical Sector</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Deep domain expertise combined with proven architectural patterns for your industry's unique challenges.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Manufacturing', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
              { name: 'Healthcare', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
              { name: 'Logistics', icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0' },
              { name: 'FinTech', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
              { name: 'SaaS', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
              { name: 'EdTech', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
              { name: 'Real Estate', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
              { name: 'GovTech', icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z' },
            ].map((industry) => (
              <div key={industry.name} className="group p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 hover:border-blue-400/60 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 text-center cursor-pointer">
                <div className="h-14 w-14 bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/20 group-hover:scale-110 transition-all duration-300 border border-gray-100/50">
                  <svg className="h-7 w-7 text-blue-600 group-hover:text-cyan-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={industry.icon} />
                  </svg>
                </div>
                <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-lg">{industry.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack - Premium */}
      <section className="py-28 bg-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Engineering Excellence</span>
            </div>
            <h3 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
              AI-Ready. Quantum-Prepared.<br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600">Future-Proof Infrastructure</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              We architect systems using the world's most advanced technologies to ensure your business stays ahead of the curve.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="relative group h-full">
              <div className="absolute inset-0 bg-blue-600/5 rounded-[2.5rem] transform group-hover:scale-[1.02] transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
              <Card variant="bordered" className="relative bg-white p-12 rounded-[2.5rem] border border-gray-100 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden h-full flex flex-col">
                <div className="h-2 w-24 bg-linear-to-r from-blue-600 to-cyan-400 rounded-full mb-12"></div>
                <h3 className="text-3xl font-bold text-gray-900 mb-10">🚀 Next-Gen Frontend</h3>
                <div className="grid grid-cols-2 gap-y-10 gap-x-12">
                  {[
                    { name: 'Next.js 15+', detail: 'Server-side rendering' },
                    { name: 'TypeScript 5.x', detail: 'Type safety at scale' },
                    { name: 'Tailwind v4', detail: 'Zero-runtime CSS' },
                    { name: 'Real-time APIs', detail: 'WebSocket architecture' },
                    { name: 'State Orchestration', detail: 'Redux/Jotai patterns' },
                    { name: 'React Server Components', detail: 'Streaming UI updates' },
                  ].map((tech) => (
                    <div key={tech.name} className="group/item">
                      <p className="font-bold text-gray-900 mb-1 group-hover/item:text-blue-600 transition-colors">{tech.name}</p>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{tech.detail}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            
            <div className="relative group h-full">
              <div className="absolute inset-0 bg-slate-900/5 rounded-[2.5rem] transform group-hover:scale-[1.02] transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
              <Card variant="bordered" className="relative bg-slate-900 p-12 rounded-[2.5rem] border border-slate-800 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 overflow-hidden h-full flex flex-col">
                <div className="h-2 w-24 bg-linear-to-r from-cyan-400 to-blue-600 rounded-full mb-12"></div>
                <h3 className="text-3xl font-bold text-white mb-10">⚙️ Enterprise Backend</h3>
                <div className="grid grid-cols-2 gap-y-10 gap-x-12">
                  {[
                    { name: 'PostgreSQL 16+', detail: 'Partitioned databases' },
                    { name: 'Node.js / Deno', detail: 'Async-first runtime' },
                    { name: 'Kubernetes Mesh', detail: 'Service orchestration' },
                    { name: 'AWS / GCP', detail: 'Multi-cloud resilience' },
                    { name: 'GraphQL Layer', detail: 'API federation' },
                    { name: 'Redis Cluster', detail: 'Nanosecond caching' },
                  ].map((tech) => (
                    <div key={tech.name} className="group/item">
                      <p className="font-bold text-white mb-1 group-hover/item:text-cyan-400 transition-colors">{tech.name}</p>
                      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{tech.detail}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Advanced Capabilities - Premium Grid */}
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="group p-10 bg-linear-to-br from-blue-500/5 to-cyan-500/5 rounded-3xl border border-blue-500/20 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 backdrop-blur-sm cursor-pointer">
              <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300">🤖</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">AI & ML Ready</h4>
              <p className="text-gray-600 leading-relaxed font-light">Vector databases, LLM integrations, and predictive models natively embedded into your core business logic.</p>
            </div>
            <div className="group p-10 bg-linear-to-br from-cyan-500/5 to-blue-500/5 rounded-3xl border border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 backdrop-blur-sm cursor-pointer">
              <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300">🔐</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-cyan-600 transition-colors">Zero-Trust Security</h4>
              <p className="text-gray-600 leading-relaxed font-light">Decentralized authentication, multi-layer encryption, and compliance-ready architecture for total data sovereignty.</p>
            </div>
            <div className="group p-10 bg-linear-to-br from-purple-500/5 to-pink-500/5 rounded-3xl border border-purple-500/20 hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 backdrop-blur-sm cursor-pointer">
              <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300">⚡</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">Edge Computing</h4>
              <p className="text-gray-600 leading-relaxed font-light">Global CDN deployment, distributed edge functions, and adaptive routing for sub-100ms response times worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Premium */}
      <section className="py-28 bg-linear-to-b from-white to-gray-50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="max-w-xl">
              <div className="inline-block mb-6 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Global Talent</span>
              </div>
              <h3 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
                Architectural Mastery,<br />
                <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600">Engineering Excellence</span>
              </h3>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                A globally distributed collective of senior architects, cybersecurity experts, and product strategists focused on technical perfection.
              </p>
            </div>
            <Link href="/about">
              <Button variant="outline" className="rounded-full px-10 py-6 border-2 font-bold group hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300">
                Meet the Leadership Hub
                <svg className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {mockCMSTeamMembers.filter(member => member.isPublished).slice(0, 4).map((member) => (
              <div key={member.id} className="group relative cursor-pointer">
                <div className="aspect-4/5 rounded-[2.5rem] overflow-hidden bg-linear-to-br from-blue-50 to-indigo-50 mb-8 border border-gray-100 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                  {member.avatarUrl ? (
                    <img
                      src={member.avatarUrl}
                      alt={`${member.firstName} ${member.lastName}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-blue-200">
                      <svg className="h-24 w-24 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  )}
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="px-2">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-all duration-300">
                    {member.firstName} {member.lastName}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-4 h-0.5 bg-blue-500 group-hover:w-8 transition-all duration-300" />
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{member.jobTitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Compliance - Premium */}
      <section className="py-28 bg-linear-to-b from-white to-gray-50 border-y border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Trust & Security</span>
            </div>
            <h3 className="text-4xl md:text-6xl font-black text-gray-900 mb-8">
              Certifications That<br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600">Prove Our Commitment</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Enterprise-grade security and compliance validated by industry leaders. We walk the talk.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockCMSCertifications.filter(cert => cert.isPublished && cert.isActive).map((cert) => (
              <Card key={cert.id} variant="bordered" className="group bg-white/80 backdrop-blur-sm border border-gray-200/60 hover:border-blue-400/60 hover:shadow-2xl hover:shadow-blue-500/15 rounded-3xl overflow-hidden transition-all duration-500 flex flex-col items-center justify-center text-center p-10">
                <div className="h-20 flex items-center justify-center mb-8 filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100">
                  {cert.logoUrl ? (
                    <img
                      src={cert.logoUrl}
                      alt={cert.providerName}
                      className="h-16 w-auto object-contain drop-shadow-lg group-hover:drop-shadow-xl transition-all"
                    />
                  ) : (
                    <div className="h-16 w-16 bg-linear-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center text-gray-400 shadow-md group-hover:shadow-lg transition-all">
                      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  )}
                </div>
                <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors text-lg">{cert.providerName}</h4>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{cert.certificationName}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Premium */}
      <section className="py-28 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">FAQ</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8">
              Questions About Our<br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600">Engineering Process</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Transparent answers to technical, commercial, and partnership questions from enterprise decision-makers.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {mockCMSFAQs.filter(faq => faq.isPublished).map((faq) => (
              <div key={faq.id} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 hover:border-blue-400/60 hover:shadow-xl hover:shadow-blue-500/10 overflow-hidden transition-all duration-300 group">
                <details className="group">
                  <summary className="flex items-center justify-between p-8 cursor-pointer focus:outline-none list-none">
                    <h3 className="text-xl font-bold text-gray-900 pr-8 group-hover:text-blue-600 transition-colors">
                      {faq.question}
                    </h3>
                    <span className="shrink-0 transition-transform duration-500 group-open:rotate-180 bg-linear-to-br from-blue-50 to-indigo-50 h-12 w-12 rounded-full flex items-center justify-center shadow-md border border-gray-100/50">
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-8 pb-8 text-gray-600 text-base leading-relaxed font-light border-t border-gray-100/50 bg-linear-to-b from-transparent to-blue-50/30">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link href="/contact" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 hover:gap-4 transition-all group">
              Have more questions? 
              <span className="text-gray-600">Talk to our engineering leads</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA - Premium */}
      <section className="py-32 bg-linear-to-b from-slate-950 via-blue-950/50 to-slate-950 relative overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-linear-to-b from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-linear-to-t from-indigo-500/10 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-600/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-10 backdrop-blur-sm">
            <span className="h-2.5 w-2.5 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-cyan-300 uppercase tracking-wide">Ready for Enterprise Scale?</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tight leading-tight">
            Transform Your <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-400 animate-pulse">
              Digital Operating System
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
            Enterprise-grade architecture designed for security, global scale, and future-ready innovation.
            <br className="hidden md:block" />
            Join 250+ companies trusting Largify for their digital transformation.
          </p>
          
          {/* Impact Metrics */}
          <div className="mb-20 grid md:grid-cols-3 gap-8 py-12 px-8 rounded-3xl border border-slate-700/50 bg-linear-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-xl">
            <div className="group cursor-pointer">
              <div className="text-6xl font-black bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-blue-400 mb-3 group-hover:scale-110 transition-transform">10x</div>
              <p className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors">Faster Deployment</p>
            </div>
            <div className="group cursor-pointer">
              <div className="text-6xl font-black bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-indigo-400 mb-3 group-hover:scale-110 transition-transform">99.99%</div>
              <p className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors">Uptime Guarantee</p>
            </div>
            <div className="group cursor-pointer">
              <div className="text-6xl font-black bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-purple-400 mb-3 group-hover:scale-110 transition-transform">&lt;100ms</div>
              <p className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors">Global Latency</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-16">
            <Link href="/book">
              <Button size="lg" className="bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-6 text-lg font-bold rounded-full shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all hover:scale-105 w-full sm:w-auto">
                Start Your Transformation
                <svg className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-2 border-gray-400 text-white hover:bg-white/10 hover:border-blue-400 px-12 py-6 text-lg font-bold rounded-full transition-all backdrop-blur-sm w-full sm:w-auto">
                Schedule Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Premium */}
      <section className="py-28 bg-linear-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 rounded-4xl p-16 md:p-24 flex flex-col items-center text-center gap-12 border border-slate-800/50 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>
            <div className="max-w-3xl relative z-10">
              <div className="inline-block mb-6 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest">Stay Informed</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Enterprise Architecture<br />
                <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-blue-400">Intelligence Monthly</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed font-light">
                Deep technical insights, architectural patterns, and industry trends curated for enterprise engineering leaders. No marketing fluff.
              </p>
            </div>
            <div className="w-full max-w-lg relative z-10">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="your@company.com"
                  className="grow px-8 py-4 rounded-full bg-white/10 border border-gray-600/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent backdrop-blur-sm hover:border-gray-500/50 transition-all"
                  required
                />
                <Button className="shrink-0 px-10 py-4 rounded-full bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30 transition-all">
                  Subscribe
                  <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </Button>
              </form>
              <p className="text-sm text-gray-400 mt-6 not-italic font-medium">
                We respect your privacy. No spam, just engineering excellence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
