import Link from 'next/link';
import { PublicLayout, InteractiveSystem } from '@/components/public';
import { Button, Card, CardContent, ClientEngagement } from '@/components/ui';
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
      <section className="relative bg-slate-950 text-white overflow-hidden pb-16 pt-28 md:pt-40 md:pb-24 border-b border-blue-900/30">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 opacity-[0.10]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="tactical-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="blue" strokeWidth="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tactical-grid)" />
          </svg>
        </div>
        
        {/* Radar Blip Effect */}
        <div className="absolute top-1/4 left-1/4 w-125 h-125 bg-blue-600/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-100 h-100 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 bg-slate-900/50 border border-blue-500/30 rounded-xs px-4 py-1.5 mb-8 backdrop-blur-md">
              <span className="h-2 w-2 bg-blue-500 rounded-full animate-ping" />
              <span className="text-[10px] font-mono font-bold text-blue-400 italic uppercase tracking-[0.2em]">System Initialized // v4.2.0-Production</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] mb-8 tracking-tighter italic uppercase">
              ENGINEERING THE <br />
              <span className="text-blue-500">DEVELOPMENT</span> <br />
              SYSTEM.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed font-medium font-mono uppercase tracking-tight italic">
              Building the next generation of enterprise control systems. <br />
              Deploying secure, scalable, and autonomous infrastructure.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
              <Link href="/book">
                <Button size="lg" className="h-14 px-10 text-xs font-black italic uppercase tracking-widest bg-blue-600 hover:bg-blue-700 rounded-none border border-blue-400/50 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                  Initialize Project
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button variant="outline" size="lg" className="h-14 px-10 text-xs font-black italic uppercase tracking-widest border-slate-700 text-white hover:bg-slate-900 rounded-none font-mono">
                  [View_Archive]
                </Button>
              </Link>
            </div>
            
            {/* Status Readouts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-slate-800/60 max-w-3xl">
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Status</div>
                <div className="text-emerald-500 font-mono font-bold text-xs uppercase italic tracking-wider flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  Operational
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Coverage</div>
                <div className="text-white font-mono font-bold text-xs uppercase italic tracking-wider">
                  Global_Nodes
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Latency</div>
                <div className="text-blue-400 font-mono font-bold text-xs uppercase italic tracking-wider">
                  12.4ms_Avg
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Uptime</div>
                <div className="text-white font-mono font-bold text-xs uppercase italic tracking-wider">
                  99.9982%
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Path Selector - Client Engagement */}
      <section className="bg-slate-950 py-12 border-b border-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="flex flex-col">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-2">[SELECT_YOUR_OBJECTIVE]</span>
                <div className="flex flex-wrap gap-3">
                   {['SCALE_ENTERPRISE', 'SECURE_INFRA', 'OPTIMIZE_FLOW'].map(path => (
                      <Button key={path} variant="outline" className="h-10 px-6 text-[10px] font-black italic uppercase tracking-widest border-slate-800 text-slate-400 hover:text-white hover:border-blue-500 rounded-none transition-all">
                         {path}
                      </Button>
                   ))}
                </div>
             </div>
             <div className="h-px md:h-12 w-full md:w-px bg-slate-800" />
             <div className="flex gap-12">
                <div>
                   <div className="text-2xl font-black text-white italic tracking-tighter">50+</div>
                   <div className="text-[10px] font-mono text-slate-600 uppercase">Deployed</div>
                </div>
                <div>
                   <div className="text-2xl font-black text-white italic tracking-tighter">99.9%</div>
                   <div className="text-[10px] font-mono text-slate-600 uppercase">Stability</div>
                </div>
                <div>
                   <div className="text-2xl font-black text-white italic tracking-tighter">24/7</div>
                   <div className="text-[10px] font-mono text-slate-600 uppercase">Pulse</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Premium */}
      <section className="bg-linear-to-b from-slate-950 to-slate-900 py-16 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, idx) => (
              <div key={stat.label} className="relative group">
                <div className="absolute inset-0 bg-slate-900 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative text-center py-6">
                  <div className="flex items-center justify-center mb-3">
                    <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-cyan-600 rounded-full opacity-10" />
                    <p className="relative text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600">{stat.value}</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-300 uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive System Simulation */}
      <InteractiveSystem />

      {/* Development Core Section - Tactical */}
      <section className="py-28 bg-slate-950 text-white relative overflow-hidden border-b border-slate-900">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="inline-block mb-4 px-3 py-1 bg-blue-500/10 border border-blue-500/20">
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-[0.3em] italic">Architecture_Protocol</span>
              </div>
              <h3 className="text-4xl md:text-6xl font-black mb-6 leading-[0.9] italic uppercase">
                CORE SYSTEM <br />
                <span className="text-blue-600">DEVELOPMENT.</span>
              </h3>
              <p className="leading-relaxed font-mono uppercase text-sm italic tracking-tight text-slate-400">
                Our proprietary development stack is engineered for speed, stability, and autonomous scaling. We don't just secure systems—we build them from the ground up to be indestructible.
              </p>
            </div>
            <div className="hidden md:block text-right">
              <div className="font-mono text-[10px] text-slate-600 uppercase mb-2">Build_Sequences</div>
              <div className="space-y-1">
                <div className="h-1.5 w-48 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 w-[85%] animate-pulse" />
                </div>
                <div className="h-1.5 w-48 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 w-[60%]" />
                </div>
                <div className="h-1.5 w-48 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-700 w-[30%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-1 border border-slate-800 bg-slate-800">
            {/* Security Pillar */}
            <div className="group p-10 bg-slate-950 hover:bg-slate-900 transition-all duration-300">
              <div className="font-mono text-[10px] text-blue-500 mb-6 tracking-widest">[NODE_01]</div>
              <h4 className="text-xl font-bold mb-6 italic uppercase tracking-wider text-white group-hover:text-blue-400 transition-colors">Tactical_DevSecOps</h4>
              <ul className="space-y-4 font-mono text-xs uppercase italic text-slate-400">
                <li className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-blue-500" />
                  <span>CI/CD Automata</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-blue-500" />
                  <span>Kernel_Hardening</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-blue-500" />
                  <span>Threat_Vector_Analysis</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-blue-500" />
                  <span>Encrypted_Pipelines</span>
                </li>
              </ul>
            </div>

            {/* Reliability Pillar */}
            <div className="group p-10 bg-slate-950 hover:bg-slate-900 transition-all duration-300">
              <div className="font-mono text-[10px] text-blue-500 mb-6 tracking-widest">[NODE_02]</div>
              <h4 className="text-xl font-bold mb-6 italic uppercase tracking-wider text-white group-hover:text-blue-400 transition-colors">Distributed_Compute</h4>
              <ul className="space-y-4 font-mono text-xs uppercase italic text-slate-400">
                <li className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-blue-500" />
                  <span>Edge_Logic_Engines</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-blue-500" />
                  <span>Auto_Scaling_Clusters</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-blue-500" />
                  <span>Fault_Tolerant_Grids</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-blue-500" />
                  <span>Low_Latency_Nexus</span>
                </li>
              </ul>
            </div>

            {/* Performance Pillar */}
            <div className="group p-10 bg-slate-950 hover:bg-slate-900 transition-all duration-300">
              <div className="font-mono text-[10px] text-blue-500 mb-6 tracking-widest">[NODE_03]</div>
              <h4 className="text-xl font-bold mb-6 italic uppercase tracking-wider text-white group-hover:text-blue-400 transition-colors">Neural_Networks</h4>
              <ul className="space-y-4 font-mono text-xs uppercase italic text-slate-400">
                <li className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-blue-500" />
                  <span>Predictive_Modeling</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-blue-500" />
                  <span>Autonomous_Optimization</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-blue-500" />
                  <span>Pattern_Recognition</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-blue-500" />
                  <span>LLM_Core_Integration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Cloud Section - Tactical */}
      <section className="py-16 bg-linear-to-b from-slate-950 to-slate-900 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-wider mb-12">
            ✓ Trusted by Industry Leaders & Fortune 500 Companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {['TechFlow', 'GreenLeaf', 'Summit', 'Nexus', 'Pulse', 'Vertex'].map((partner) => (
              <div key={partner} className="group flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full opacity-50 group-hover:opacity-100 transition-all" />
                <span className="text-xl font-bold text-slate-300 group-hover:text-blue-400 transition-colors cursor-pointer">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Tactical Development Modules */}
      <section className="py-28 bg-slate-950 border-t border-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="inline-block mb-4 px-3 py-1 bg-blue-500/10 border border-blue-500/20">
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-[0.3em] italic">Module_Repository</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[0.9] italic uppercase">
                SYSTEM <br />
                <span className="text-blue-600">INVENTORIES.</span>
              </h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-800 border border-slate-800">
            {services.map((service) => (
              <div key={service.title} className="bg-slate-950 p-10 hover:bg-slate-900 transition-all duration-300 group">
                <div className="mb-8 opacity-50 group-hover:opacity-100 transition-opacity">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 italic uppercase tracking-wider group-hover:text-blue-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 mb-8 leading-relaxed font-mono text-xs uppercase italic tracking-tight">
                  {service.description}
                </p>
                
                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {(service as any).features?.map((feature: string) => (
                    <div key={feature} className="flex items-center gap-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-300 transition-colors">
                      <div className="w-1 h-1 bg-slate-700 group-hover:bg-blue-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href={`/services/${service.slug}`}>
                  <Button className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black italic uppercase tracking-widest rounded-none border border-slate-800 hover:border-blue-400 transition-all duration-300 h-12 text-[10px]">
                    Deploy_Module
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operational Differentiation - Tactical */}
      <section className="py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block mb-6 px-3 py-1 bg-blue-500/10 border border-blue-500/20">
                <span className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-[0.3em] italic">System_Differentiators</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-[0.9] italic uppercase">
                WHY OUR SYSTEM <br />
                <span className="text-blue-600">IS SUPERIOR.</span>
              </h2>
              <p className="text-slate-400 mb-12 leading-relaxed font-mono uppercase text-xs italic tracking-tight">
                We don&apos;t build static software. We deploy dynamic business operating systems that evolve alongside your enterprise requirements.
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: 'SECURE_KERNEL_ARCHITECTURE',
                    description: 'Zero-trust logic gates embedded at every interface layer, from API to storage.',
                  },
                  {
                    title: 'MODULAR_EXPANSION_NODE',
                    description: 'Micro-services framework that adapts to scale without architectural regression.',
                  },
                  {
                    title: 'ENTERPRISE_SLA_LOGIC',
                    description: 'Automated failover protocols ensuring 99.99% operational continuity.',
                  },
                  {
                    title: 'STRATEGIC_COMMAND_INTEL',
                    description: 'Dedicated architect support for long-term roadmap synchronization.',
                  },
                ].map((item) => (
                  <div key={item.title} className="group flex gap-4 p-6 bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer">
                    <div className="shrink-0 pt-1">
                      <div className="w-1.5 h-1.5 bg-blue-500 group-hover:animate-ping" />
                    </div>
                    <div>
                      <h3 className="font-mono font-bold text-white text-sm italic uppercase tracking-widest group-hover:text-blue-400 transition-colors">{item.title}</h3>
                      <p className="text-slate-500 text-[10px] mt-2 font-mono uppercase italic leading-tight tracking-wider">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-slate-900 border border-slate-800 p-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl" />
                <h3 className="text-2xl font-black mb-6 italic uppercase tracking-tighter">Ready to Initialise?</h3>
                <p className="text-slate-400 mb-8 font-mono text-xs uppercase italic leading-relaxed">
                  Connect with our systems architects to define your integration sequence and deployment roadmap.
                </p>
                <Link href="/book">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-black italic uppercase tracking-widest rounded-none h-12 w-full border border-blue-400/50">
                    Schedule_Discovery_Call
                  </Button>
                </Link>
                <div className="mt-8 pt-8 border-t border-slate-800 flex justify-between items-center">
                  <div className="font-mono text-[10px] text-slate-600 uppercase">System_Active</div>
                  <div className="flex gap-1">
                    <div className="h-1 w-1 bg-blue-500" />
                    <div className="h-1 w-1 bg-blue-500" />
                    <div className="h-1 w-1 bg-blue-500" />
                    <div className="h-1 w-1 bg-slate-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deployment Phases - Tactical Methodology */}
      <section className="py-28 bg-slate-950 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-start mb-24">
            <div className="md:w-2/3">
              <div className="inline-block mb-6 px-3 py-1 bg-blue-500/10 border border-blue-500/20">
                <span className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-[0.3em] italic">Operational_Methodology</span>
              </div>
              <h3 className="text-4xl md:text-6xl font-black text-white leading-[0.9] italic uppercase">
                FROM CONCEPT TO <br />
                <span className="text-blue-600">ENTERPRISE SCALE.</span>
              </h3>
            </div>
            <div className="md:w-1/3">
              <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-[0.2em] italic leading-relaxed">
                Refined through hundreds of deployments, our battle-tested sequence ensures precision-engineered transitions for complex systems.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-px bg-slate-800 border border-slate-800">
            {[
              {
                step: '01',
                title: 'Strategic_Sync',
                description: 'Deep-dive alignment to synchronize business intelligence with core systems architecture.',
              },
              {
                step: '02',
                title: 'Kernel_Architect',
                description: 'Designing resilient hubs and secure nodes using ultra-low-latency tech stacks.',
              },
              {
                step: '03',
                title: 'Sprint_Sequence',
                description: 'Rapid, iterative engineering with rigorous automated testing and continuous feedback loops.',
              },
              {
                step: '04',
                title: 'Full_Deployment',
                description: 'Seamless system initialization followed by autonomous monitoring and scale-up protocols.',
              },
            ].map((item) => (
              <div key={item.step} className="bg-slate-950 p-10 group hover:bg-slate-900/50 transition-all">
                <div className="text-4xl font-black text-slate-800 mb-6 font-mono group-hover:text-blue-600 transition-colors">
                  [{item.step}]
                </div>
                <h3 className="text-xl font-bold text-white mb-4 italic uppercase tracking-wider group-hover:text-blue-400 transition-colors font-mono">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-[10px] font-mono uppercase italic leading-tight tracking-wider">
                  {item.description}
                </p>
                <div className="mt-8 h-px w-12 bg-slate-800 group-hover:w-full group-hover:bg-blue-600 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack - Tactical Engineering Readout */}
      <section className="py-28 bg-slate-950 overflow-hidden relative border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <div className="inline-block mb-6 px-3 py-1 bg-blue-500/10 border border-blue-500/20">
                <span className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-[0.3em] italic">Engineering_Specifications</span>
              </div>
              <h3 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[0.9] italic uppercase">
                AI_READY. <br />
                <span className="text-blue-600">QUANTUM_PREPARED.</span>
              </h3>
              <p className="text-slate-400 font-mono uppercase text-xs italic tracking-tight">
                Architecting systems using advanced-tier technologies to ensure future-proof operational supremacy.
              </p>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-1 border border-slate-800 bg-slate-800">
            <div className="bg-slate-950 p-12">
              <div className="h-0.5 w-12 bg-blue-600 mb-10"></div>
              <h3 className="text-2xl font-black text-white mb-10 italic uppercase tracking-tighter">FRONTEND_LAYER</h3>
              <div className="grid grid-cols-2 gap-y-10 gap-x-12 font-mono text-[10px] uppercase italic tracking-widest text-slate-500">
                {[
                  { name: 'Next.js 15+', detail: 'Server_Side_Render' },
                  { name: 'TypeScript 5.x', detail: 'Type_Safety_Protocol' },
                  { name: 'Tailwind v4', detail: 'Design_System_Core' },
                  { name: 'Socket.io', detail: 'Real_Time_Sync' },
                  { name: 'State_Orch', detail: 'Jotai_Context' },
                  { name: 'React Server', detail: 'Streaming_UI' },
                ].map((tech) => (
                  <div key={tech.name} className="group">
                    <p className="font-bold text-slate-300 mb-1 group-hover:text-blue-400 transition-colors uppercase">{tech.name}</p>
                    <p className="text-[8px] opacity-70">{tech.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-900 p-12">
              <div className="h-0.5 w-12 bg-blue-400 mb-10"></div>
              <h3 className="text-2xl font-black mb-10 italic uppercase tracking-tighter text-slate-100">BACKEND_KERNEL</h3>
              <div className="grid grid-cols-2 gap-y-10 gap-x-12 font-mono text-[10px] uppercase italic tracking-widest text-slate-400">
                {[
                  { name: 'PostgreSQL 16+', detail: 'Relational_Core' },
                  { name: 'Node.js Hub', detail: 'Async_Parallel' },
                  { name: 'Kubernetes', detail: 'Network_Mesh' },
                  { name: 'AWS_MultiRegion', detail: 'Cloud_Sovereignty' },
                  { name: 'GraphQL', detail: 'Data_Federation' },
                  { name: 'Redis_Cluster', detail: 'Latent_Cache' },
                ].map((tech) => (
                  <div key={tech.name} className="group">
                    <p className="font-bold text-slate-300 mb-1 group-hover:text-blue-400 transition-colors uppercase">{tech.name}</p>
                    <p className="text-[8px] opacity-70">{tech.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Tactical */}
      <section className="py-28 bg-slate-950 overflow-hidden relative border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="max-w-xl">
              <div className="inline-block mb-6 px-3 py-1 bg-blue-500/10 border border-blue-500/20">
                <span className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-[0.3em] italic">Human_Capital_Assets</span>
              </div>
              <h3 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[0.9] italic uppercase">
                ARCHITECTING <br />
                <span className="text-blue-600">EXCELLENCE.</span>
              </h3>
              <p className="text-slate-400 font-mono uppercase text-xs italic tracking-tight">
                A globally distributed collective of senior architects and systems engineers focused on technical perfection.
              </p>
            </div>
            <Link href="/about">
              <Button variant="outline" className="h-14 px-10 text-xs font-black italic uppercase tracking-widest border-slate-700 text-white hover:bg-slate-900 rounded-none font-mono">
                [View_System_Leads]
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800 border border-slate-800">
            {mockCMSTeamMembers.filter(member => member.isPublished).slice(0, 4).map((member) => (
              <div key={member.id} className="group relative bg-slate-950 p-8 hover:bg-slate-900 transition-all duration-300">
                <div className="aspect-square mb-8 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 border border-slate-800">
                  {member.avatarUrl ? (
                    <img
                      src={member.avatarUrl}
                      alt={`${member.firstName} ${member.lastName}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900">
                      <div className="font-mono text-xs text-slate-700 uppercase italic">[No_Bio_Scan]</div>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white italic uppercase tracking-wider group-hover:text-blue-400 transition-colors">
                    {member.firstName} {member.lastName}
                  </h3>
                  <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-2 italic">{member.jobTitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Compliance - Tactical */}
      <section className="py-28 bg-slate-950 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <div className="inline-block mb-6 px-3 py-1 bg-blue-500/10 border border-blue-500/20">
                <span className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-[0.3em] italic">Governance_&_Protocols</span>
              </div>
              <h3 className="text-4xl md:text-6xl font-black text-white leading-[0.9] italic uppercase">
                VALIDATED <br />
                <span className="text-blue-600">COMPLIANCE.</span>
              </h3>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800 border border-slate-800">
            {mockCMSCertifications.filter(cert => cert.isPublished && cert.isActive).map((cert) => (
              <div key={cert.id} className="bg-slate-950 p-10 flex flex-col items-center justify-center text-center group hover:bg-slate-900 transition-all">
                <div className="h-16 flex items-center justify-center mb-8 opacity-40 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">
                  {cert.logoUrl ? (
                    <img
                      src={cert.logoUrl}
                      alt={cert.providerName}
                      className="h-12 w-auto object-contain"
                    />
                  ) : (
                    <div className="font-mono text-[10px] font-bold text-blue-500">[CERT_EXP]</div>
                  )}
                </div>
                <h4 className="font-mono font-bold text-white text-xs uppercase italic tracking-widest group-hover:text-blue-400 transition-colors">{cert.providerName}</h4>
                <p className="text-[8px] font-mono text-slate-600 uppercase mt-2">{cert.certificationName}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Tactical */}
      <section className="py-28 bg-slate-950 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="inline-block mb-6 px-3 py-1 bg-blue-500/10 border border-blue-500/20">
                <span className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-[0.3em] italic">Knowledge_Base</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[0.9] italic uppercase">
                SYSTEM <br />
                <span className="text-blue-600">QUERY_LOGS.</span>
              </h2>
            </div>
          </div>
          <div className="max-w-4xl space-y-px bg-slate-800 border border-slate-800">
            {mockCMSFAQs.filter(faq => faq.isPublished).map((faq) => (
              <div key={faq.id} className="bg-slate-950 group">
                <details className="group">
                  <summary className="flex items-center justify-between p-10 cursor-pointer focus:outline-none list-none group-hover:bg-slate-900 transition-all">
                    <h3 className="text-lg font-bold text-white italic uppercase tracking-wider group-hover:text-blue-400 transition-colors font-mono">
                      {faq.question}
                    </h3>
                    <span className="text-blue-500 font-mono text-xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-10 pb-10 text-slate-400 font-mono text-xs uppercase italic tracking-tight leading-relaxed bg-slate-900/50">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof of Impact - Client Testimonials */}
      <section className="py-28 bg-slate-950 border-b border-slate-900 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="inline-block mb-6 px-3 py-1 bg-blue-500/10 border border-blue-500/20">
                <span className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-[0.3em] italic">Operational_Feedback</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[0.9] italic uppercase">
                SUCCESS <br />
                <span className="text-blue-600">REPORTS.</span>
              </h2>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-1 bg-slate-800 border border-slate-800">
            {mockCMSTestimonials.filter(t => t.isPublished).slice(0, 4).map((testimonial) => (
              <div key={testimonial.id} className="bg-slate-950 p-12 group hover:bg-slate-900 transition-all duration-500 relative">
                <div className="text-blue-500 mb-8 opacity-20 group-hover:opacity-100 transition-opacity">
                   <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017V14H17.017C15.3601 14 14.017 12.6569 14.017 11V8C14.017 6.34315 15.3601 5 17.017 5H20.017C21.6738 5 23.017 6.34315 23.017 8V21H14.017ZM2.01691 21L2.01691 18C2.01691 16.8954 2.91234 16 4.01691 16H7.01691V14H5.01691C3.36006 14 2.01691 12.6569 2.01691 11V8C2.01691 6.34315 3.36006 5 5.01691 5H8.01691C9.67376 5 11.0169 6.34315 11.0169 8V21H2.01691Z" /></svg>
                </div>
                <p className="text-xl md:text-2xl font-black text-white italic uppercase tracking-tighter leading-tight mb-10 group-hover:text-blue-400 transition-colors">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center gap-4">
                   <div className="h-12 w-12 rounded-none border border-slate-700 overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                      <img src={testimonial.authorAvatarUrl} alt={testimonial.authorName} className="h-full w-full object-cover" />
                   </div>
                   <div>
                      <div className="text-sm font-bold text-white uppercase italic tracking-widest">{testimonial.authorName}</div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase italic tracking-widest">{testimonial.authorRole} // {testimonial.authorCompany}</div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Interaction Simulator */}
      <section className="py-28 bg-slate-950 border-b border-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="inline-block mb-6 px-3 py-1 bg-blue-500/10 border border-blue-500/20">
                <span className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-[0.3em] italic">Command_Interface_v4.2</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[0.9] italic uppercase">
                YOUR <br />
                <span className="text-blue-600">COMMAND_CENTER.</span>
              </h2>
              <p className="text-slate-400 font-mono text-[10px] uppercase italic tracking-widest leading-relaxed">
                Take direct control of your enterprise infrastructure through our unified command interface. 
                Experience the precision of tactical engineering.
              </p>
            </div>
          </div>
          <ClientEngagement />
        </div>
      </section>

      {/* Final CTA - Tactical */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <rect width="100%" height="100%" fill="url(#tactical-grid)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 bg-slate-900/50 border border-blue-500/30 rounded-xs px-4 py-1.5 mb-12 backdrop-blur-md">
            <span className="h-2 w-2 bg-blue-500 rounded-full animate-ping" />
            <span className="text-[10px] font-mono font-bold text-blue-400 italic uppercase tracking-[0.2em]">Ready_For_Deployment</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.9] italic uppercase">
            INITIALIZE YOUR <br />
            <span className="text-blue-600">NEW_OPERATING_SYSTEM.</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 mb-16 max-w-3xl mx-auto leading-relaxed font-mono uppercase italic tracking-tight">
            Deploy enterprise-grade architecture engineered for total security and global scale.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link href="/book">
              <Button size="lg" className="h-16 px-12 text-sm font-black italic uppercase tracking-widest bg-blue-600 hover:bg-blue-700 rounded-none border border-blue-400/50 shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all hover:scale-105">
                Start_Integration
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="h-16 px-12 text-sm font-black italic uppercase tracking-widest border-slate-700 text-white hover:bg-slate-900 rounded-none font-mono">
                [Speak_With_Lead_Architect]
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Tactical */}
      <section className="py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 border border-slate-800 p-16 md:p-24 flex flex-col items-center text-center gap-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-3xl pointer-events-none" />
            <div className="max-w-3xl relative z-10">
              <div className="inline-block mb-6 px-3 py-1 bg-blue-500/10 border border-blue-500/20">
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-[0.3em] italic">Data_Stream_Broadcast</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 italic uppercase tracking-tighter">
                SYSTEM <br />
                <span className="text-blue-600">INTELLIGENCE.</span>
              </h2>
              <p className="text-slate-400 leading-relaxed font-mono uppercase text-xs italic tracking-tight">
                Architectural patterns, deployment logs, and industry trends curated for lead developers.
              </p>
            </div>
            <div className="w-full max-w-lg relative z-10">
              <form className="flex flex-col sm:flex-row gap-px bg-slate-800 border border-slate-800">
                <input
                  type="email"
                  placeholder="USER@DOMAIN.COM"
                  className="grow px-6 py-4 bg-slate-950 text-white placeholder-slate-700 focus:outline-none font-mono text-xs uppercase italic"
                  required
                />
                <Button className="shrink-0 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black italic uppercase tracking-widest rounded-none border-l border-blue-400/30">
                  Subscribe
                </Button>
              </form>
              <p className="text-[10px] text-slate-500 mt-6 font-mono uppercase italic tracking-widest">
                [Protocol_Safe] // Zero_Spam_Tolerance
              </p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
