import { ReactNode } from "react";
import Link from "next/link";
import { PublicLayout } from "@/components/public";
import { Button, Badge } from "@/components/ui";
import { mockCMSServices } from "@/lib/mock-data";

// Icon component factory for different service types
const getServiceIcon = (iconType?: string) => {
  const iconMap: Record<string, ReactNode> = {
    settings: (
      <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    code: (
      <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    shield: (
      <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    ai: (
      <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    mobile: (
      <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    web: (
      <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    consultation: (
      <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    default: (
      <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  };
  return iconMap[iconType || "default"] || iconMap.default;
};

const defaultServices = [
  {
    id: "erp",
    title: "Custom ERP Systems",
    slug: "custom-erp-systems",
    shortDescription: "Tailored enterprise resource planning for your business",
    description: "Our custom ERP solutions are built from the ground up to match your exact business processes.",
    iconType: "settings",
    features: ["Inventory Management", "Financial Reporting", "HR Integration", "Supply Chain Control"],
  }
];

export default function ServicesPage() {
  const publishedServices = mockCMSServices.filter(s => s.isPublished);
  const displayServices = publishedServices.length > 0 ? publishedServices : (defaultServices as any[]);

  return (
    <PublicLayout>
      <section className="relative pt-32 pb-40 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] opacity-50" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="flex flex-col items-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
              <span className="text-xs font-black text-blue-400 uppercase tracking-[0.3em]">Protocol Available</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
              Specialized <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500">Infrastructure</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl italic">
              "We don't just build software. We engineer operational dominance through hardened architectural frameworks and surgical implementation."
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <div className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                <p className="text-3xl font-black text-white tracking-tighter">{mockCMSServices.length}+</p>
                <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Active Protocols</p>
              </div>
              <div className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                <p className="text-3xl font-black text-white tracking-tighter">99.9%</p>
                <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Success Rate</p>
              </div>
              <div className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                <p className="text-3xl font-black text-white tracking-tighter">150ms</p>
                <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Avg Latency</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-950 relative -mt-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {displayServices.map((service) => (
              <Link 
                key={service.id} 
                href={`/services/${service.slug}`}
                className="group relative h-full flex flex-col p-1 bg-linear-to-br from-slate-800 to-transparent hover:from-blue-600 hover:to-cyan-400 rounded-[3rem] transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="flex-1 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.8rem] p-10 lg:p-14 relative overflow-hidden flex flex-col justify-between h-full">
                  <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                    <div className="scale-[3] grayscale group-hover:grayscale-0 transition-all duration-700">
                      <div className="w-20 h-20">{getServiceIcon(service.iconType)}</div>
                    </div>
                  </div>

                  <div className="relative z-10 w-full text-left">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="h-16 w-16 bg-slate-950 rounded-2xl flex items-center justify-center text-blue-400 group-hover:text-white group-hover:bg-blue-600 transition-all duration-500 shadow-xl p-3 border border-white/5">
                        {getServiceIcon(service.iconType)}
                      </div>
                      <div className="h-0.5 flex-1 bg-slate-800 group-hover:bg-blue-500/20" />
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tighter leading-none group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h2>
                    
                    <p className="text-lg text-slate-400 font-medium leading-relaxed mb-10 max-w-md italic">
                      {service.shortDescription || service.description.substring(0, 120) + "..."}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-12">
                      {service.features?.slice(0, 4).map((feature: any, fIdx: number) => (
                        <div key={fIdx} className="flex items-center gap-3 text-left">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 shadow-[0_0_8px_#3b82f6]" />
                          <span className="text-xs font-black text-slate-300 uppercase tracking-widest leading-tight">
                            {typeof feature === "string" ? (feature.length > 20 ? feature.split(" ")[0] + " " + feature.split(" ")[1] : feature) : feature.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between pt-8 border-t border-white/5 mt-auto">
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Impact Potential</span>
                      <span className="text-sm font-black text-blue-400 group-hover:text-white uppercase transition-colors">High Fidelity</span>
                    </div>
                    <div className="h-14 w-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-500 shrink-0">
                      <svg className="h-6 w-6 text-white group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-950/50 relative overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[4rem] p-12 lg:p-24 relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 pointer-events-none">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.2),transparent_70%)]" />
             </div>
             <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                <div className="text-left">
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none">
                    Quantifiable <br />
                    <span className="text-blue-500 italic">Strategic Advantage</span>
                  </h2>
                  <p className="text-xl text-slate-400 font-light leading-relaxed mb-12">
                    Our solutions are measured by their impact on your bottom line and operational velocity.
                  </p>
                  <Button size="lg" className="h-20 px-12 text-xl font-black bg-white text-slate-950 hover:bg-blue-600 hover:text-white rounded-full transition-all">
                    VIEW INFRASTRUCTURE AUDIT
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-6 w-full">
                  {[
                    { label: "OpEx Reduction", val: "42%", sub: "Avg. Year 1" },
                    { label: "Deployment Velocity", val: "3.5x", sub: "VS Industry Std" },
                    { label: "Security Hardening", val: "100%", sub: "Audit Clearance" },
                    { label: "Scalability Index", val: "Infinite", sub: "Cloud Native" }
                  ].map((item, i) => (
                    <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm group hover:bg-white/10 transition-all text-left">
                      <p className="text-sm font-black text-blue-400 uppercase tracking-widest mb-4">{item.label}</p>
                      <p className="text-5xl font-black text-white mb-2 tracking-tighter">{item.val}</p>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{item.sub}</p>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-950 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] mb-12">Hardened for Global Compliance</p>
          <div className="flex flex-wrap justify-center gap-12 lg:gap-24 opacity-30 grayscale hover:opacity-100 invert transition-all duration-1000">
             <div className="text-2xl font-black text-white tracking-tighter italic">SOC2_TYPE_II</div>
             <div className="text-2xl font-black text-white tracking-tighter italic">HIPAA_READY</div>
             <div className="text-2xl font-black text-white tracking-tighter italic">ISO_27001</div>
             <div className="text-2xl font-black text-white tracking-tighter italic">GDPR_COMPLIANT</div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

