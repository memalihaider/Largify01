import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PublicLayout } from '@/components/public';
import { Button, Card, CardContent } from '@/components/ui';
import { mockCMSProducts } from '@/lib/mock-data';

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = mockCMSProducts.find(p => p.slug === slug && p.isPublished);

  if (!product) {
    notFound();
  }

  return (
    <PublicLayout>
      {/* Hero Section - Tactical High-Fidelity */}
      <section className="relative pt-44 pb-32 overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] -mr-96 -mt-96" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] -ml-40 -mb-40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href="/products" className="inline-flex items-center gap-3 text-blue-400 hover:text-white mb-12 font-black uppercase text-[10px] tracking-[0.3em] transition-all group">
            <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            System Catalog
          </Link>

          <div className="flex flex-col lg:flex-row items-start gap-16">
            <div className="h-32 w-32 bg-slate-900 rounded-[2.5rem] flex items-center justify-center text-blue-400 shrink-0 border border-white/10 backdrop-blur-xl shadow-3xl">
              <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-8 flex-wrap">
                <div className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full">
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">{product.category}</span>
                </div>
                {product.isFeatured && (
                  <div className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                    <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">High-Priority Asset</span>
                  </div>
                )}
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9] tracking-tighter uppercase italic">{product.name}</h1>
              <p className="text-2xl text-blue-400 font-black mb-8 uppercase tracking-[0.1em] italic">{product.tagline}</p>
              <div className="max-w-3xl">
                <p className="text-xl text-slate-300 leading-relaxed font-light italic border-l-2 border-white/10 pl-10">
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          {/* Dynamic Specs Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
            <div className="bg-slate-900/40 backdrop-blur-md rounded-[2rem] p-8 border border-white/5 transition-all hover:border-blue-500/50 group">
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black mb-3">Module Count</p>
              <p className="text-4xl font-black text-white group-hover:text-blue-400 transition-colors uppercase italic">{product.features.length}+</p>
            </div>
            {product.technologies && (
              <div className="bg-slate-900/40 backdrop-blur-md rounded-[2rem] p-8 border border-white/5 transition-all hover:border-blue-500/50 group">
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black mb-3">Core Stack</p>
                <p className="text-4xl font-black text-white group-hover:text-blue-400 transition-colors uppercase italic">{product.technologies.length}</p>
              </div>
            )}
            {product.pricing?.plans && (
              <div className="bg-slate-900/40 backdrop-blur-md rounded-[2rem] p-8 border border-white/5 transition-all hover:border-blue-500/50 group">
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black mb-3">Tier Options</p>
                <p className="text-4xl font-black text-white group-hover:text-blue-400 transition-colors uppercase italic">{product.pricing.plans.length}</p>
              </div>
            )}
            <div className="bg-slate-900/40 backdrop-blur-md rounded-[2rem] p-8 border border-white/5 transition-all hover:border-blue-500/50 group">
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black mb-3">Security Level</p>
              <p className="text-4xl font-black text-emerald-400 group-hover:scale-105 transition-all uppercase italic">Level 4</p>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Intelligence - Dark Sweep */}
      <section className="py-32 bg-slate-950 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-20">
            {/* Intel Stream */}
            <div className="lg:col-span-2 space-y-32">
              {/* Capabilities */}
              <div>
                <div className="inline-block mb-10 px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full">
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Operational Capabilities</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white mb-16 tracking-tighter italic uppercase leading-[0.9]">
                  System <br />
                  <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-cyan-400">Specifications</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="group flex items-start gap-6 p-8 bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 hover:border-blue-500/50 transition-all duration-500">
                      <div className="h-12 w-12 bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-all shadow-2xl">
                        <svg className="h-6 w-6 text-blue-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-slate-300 font-bold text-lg leading-snug italic group-hover:text-white transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategic Advantages */}
              <div>
                <div className="inline-block mb-10 px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full">
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Performance Metrics</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white mb-16 tracking-tighter italic uppercase leading-[0.9]">
                  Strategic <br />
                  <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-cyan-400">Yield</span>
                </h2>
                <div className="space-y-8">
                  {product.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-8 p-10 bg-slate-900/40 backdrop-blur-xl rounded-[3rem] border-l-8 border-blue-600 hover:bg-slate-900/60 transition-all group">
                      <div className="h-14 w-14 bg-slate-800 rounded-[1.5rem] flex items-center justify-center shrink-0 group-hover:scale-110 transition-all">
                        <svg className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <p className="text-slate-100 font-black text-2xl leading-tight italic uppercase tracking-tighter">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack */}
              {product.technologies && product.technologies.length > 0 && (
                <div>
                  <div className="inline-block mb-10 px-4 py-1.5 bg-slate-500/10 border border-slate-500/30 rounded-full">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Core Architecture</span>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {product.technologies.map((tech, idx) => (
                      <div key={idx} className="px-8 py-4 bg-slate-900/60 border border-white/5 rounded-2xl hover:border-blue-500/50 hover:bg-slate-900 transition-all group cursor-pointer shadow-2xl">
                        <span className="text-lg font-black text-slate-400 group-hover:text-blue-400 transition-colors uppercase italic tracking-widest">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tactical Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-10">
                {/* Pricing Allocation */}
                {product.pricing && (
                  <Card variant="bordered" className="overflow-hidden bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[3rem] shadow-3xl">
                    <div className="bg-blue-600 text-white p-10 text-center">
                      <h3 className="text-2xl font-black uppercase tracking-widest italic">Asset Allocation</h3>
                      <p className="text-blue-200 text-[10px] font-black uppercase tracking-[0.4em] mt-2">{product.pricing.model}</p>
                    </div>
                    <CardContent className="p-10 space-y-8">
                      {product.pricing.plans?.map((plan, idx) => (
                        <div key={idx} className={`p-8 rounded-[2rem] border-2 transition-all duration-500 ${plan.isPopular ? 'border-blue-500 bg-blue-500/10 shadow-2xl shadow-blue-500/20' : 'border-white/5 hover:border-white/20'}`}>
                          {plan.isPopular && (
                            <div className="inline-block mb-4 px-3 py-1 bg-blue-500 text-white rounded-full">
                              <span className="text-[8px] font-black uppercase tracking-widest">Priority Config</span>
                            </div>
                          )}
                          <h4 className="font-black text-xl text-white mb-4 uppercase italic tracking-tighter">{plan.name}</h4>
                          <p className="text-4xl font-black text-blue-400 mb-8 italic">{plan.price}</p>
                          <ul className="space-y-4">
                            {plan.features.map((feature, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-4 text-xs text-slate-400 font-bold uppercase tracking-tight">
                                <svg className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Operations Control */}
                <Card variant="bordered" className="overflow-hidden bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 shadow-3xl">
                  <h3 className="text-3xl font-black text-white mb-4 italic uppercase tracking-tighter leading-none">Initiate <br />Deployment</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-widest mb-10">
                    Authorize the implementation sequence for {product.name} within your infrastructure.
                  </p>
                  <div className="space-y-4">
                    <Link href="/book" className="block">
                      <Button className="w-full bg-white text-slate-950 hover:bg-slate-200 font-black rounded-2xl shadow-2xl transition-all h-20 uppercase text-xs tracking-[0.4em]">
                        Sync With Command
                      </Button>
                    </Link>
                    <Link href="/contact" className="block">
                      <Button variant="outline" className="w-full border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl h-14 uppercase text-[10px] tracking-widest transition-all">
                        Request Intel
                      </Button>
                    </Link>
                    {product.demoUrl && (
                      <Link href={product.demoUrl} target="_blank" className="block mt-6">
                        <Button variant="ghost" className="w-full text-blue-400 hover:text-blue-300 hover:bg-blue-500/5 rounded-2xl h-12 uppercase text-[9px] tracking-[0.3em] font-black italic">
                          Simulate Environment
                          <svg className="h-4 w-4 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Button>
                      </Link>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deployment Banner - High Fidelity */}
      <section className="py-40 bg-slate-950 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-4 bg-blue-500/10 border border-blue-500/30 rounded-full px-6 py-2.5 mb-12">
            <span className="h-3 w-3 bg-blue-400 rounded-full animate-ping" />
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.5em]">Network Expansion Active</span>
          </div>
          <h2 className="text-6xl md:text-9xl font-black text-white mb-10 leading-[0.8] tracking-tighter uppercase italic">
            Advance Your <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-cyan-400 to-indigo-400 font-outline-2">Frontier</span>
          </h2>
          <p className="text-2xl text-slate-400 mb-20 max-w-3xl mx-auto leading-relaxed font-light italic">
            Join the elite network of enterprises orchestrating their future with {product.name}.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link href="/book">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white px-16 py-8 text-xs font-black rounded-2xl shadow-3xl transition-all hover:scale-105 uppercase tracking-[0.4em]">
                Secure Appointment
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 px-16 py-8 text-xs font-black rounded-2xl transition-all uppercase tracking-[0.4em]">
                Full Inventory
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

export async function generateStaticParams() {
  return mockCMSProducts
    .filter(p => p.isPublished && p.slug)
    .map((product) => ({
      slug: product.slug,
    }));
}
