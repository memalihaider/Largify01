import Link from 'next/link';
import { PublicLayout } from '@/components/public';
import { Button, Card, CardContent, Badge } from '@/components/ui';
import { mockCMSProducts } from '@/lib/mock-data';

export default function ProductsPage() {
  const products = mockCMSProducts.filter(p => p.isPublished);

  return (
    <PublicLayout>
      {/* Hero Section - Enhanced Premium */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-linear-to-br from-slate-950 via-blue-950 to-slate-950">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-15" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-600/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
            <span className="h-2.5 w-2.5 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-cyan-300 uppercase tracking-wide">Enterprise Solutions</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-tight">
            Pre-Built Enterprise <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-blue-400">Solutions</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light mb-12">
            Battle-tested products designed for immediate deployment. From security infrastructure to AI automation, we've engineered solutions that scale.
          </p>
          
          <div className="inline-flex gap-6 text-gray-300 text-sm">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Production-Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Highly Customizable</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid - Enhanced */}
      <section className="py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
              <span className="text-sm font-black text-blue-400 uppercase tracking-[0.2em]">Product Catalog</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
              Enterprise-Grade <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-cyan-400">Products & Services</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product) => (
              <Card key={product.id} variant="bordered" className="group bg-slate-900/40 backdrop-blur-xl border border-white/5 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 rounded-[2.5rem] overflow-hidden transition-all duration-700 flex flex-col h-full relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <CardContent className="p-10 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-10">
                    <div className="h-16 w-16 bg-slate-800 rounded-2xl flex items-center justify-center text-blue-400 group-hover:shadow-2xl group-hover:shadow-blue-500/40 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 border border-white/5">
                      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    {product.isFeatured && (
                      <div className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full backdrop-blur-md">
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest italic">Mission Critical</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="mb-8 grow">
                    <h2 className="text-3xl font-black text-white mb-2 group-hover:text-blue-400 transition-colors tracking-tight">{product.name}</h2>
                    <p className="text-xs text-blue-400 font-black uppercase tracking-widest mb-4 opacity-70 italic">{product.tagline}</p>
                    <p className="text-slate-400 mb-8 leading-relaxed font-light text-lg">{product.description}</p>
                    
                    <div className="mb-8 p-5 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-blue-500/5 group-hover:border-blue-500/20 transition-all duration-500 overflow-hidden relative">
                      <div className="absolute -right-4 -bottom-4 h-16 w-16 bg-blue-500/5 rounded-full" />
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Sector Classification</span>
                      <p className="text-sm text-white font-bold">{product.category}</p>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-10 pb-10 border-b border-white/5">
                    <h3 className="text-[10px] font-black text-slate-500 mb-6 uppercase tracking-[0.2em]">Operational Capabilities:</h3>
                    <ul className="space-y-4">
                      {product.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-4 text-sm text-slate-300 font-medium group/feat">
                          <div className="w-6 h-6 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center shrink-0 group-hover/feat:bg-blue-500/20 group-hover/feat:border-blue-500/40 transition-all">
                            <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="group-hover/feat:text-white transition-colors">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing */}
                  {product.pricing && (
                    <div className="mb-10 p-8 bg-linear-to-br from-blue-600/10 to-indigo-600/10 rounded-3xl border border-white/5 relative overflow-hidden group-hover:border-blue-500/30 transition-all">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <svg className="h-12 w-12 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                        </svg>
                      </div>
                      <p className="text-[10px] text-blue-400 uppercase tracking-widest font-black mb-2">Resource Allocation</p>
                      <p className="text-4xl font-black text-white mb-1 tracking-tighter">
                        {product.pricing.plans?.[0]?.price || product.pricing.startingPrice || 'Custom'}
                      </p>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{product.pricing.model}</p>
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="flex flex-col gap-4">
                    <Link href={`/products/${product.slug}`} className="w-full">
                      <Button className="w-full bg-white text-slate-950 hover:bg-slate-200 font-black uppercase tracking-widest rounded-2xl shadow-2xl transition-all duration-300 h-14 text-xs">
                        Access Full Intelligence
                        <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Button>
                    </Link>
                    {product.demoUrl && (
                      <Link href={product.demoUrl} target="_blank" className="w-full">
                        <Button variant="outline" className="w-full border-white/10 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl h-14 font-bold uppercase tracking-widest text-[10px]">
                          Live Operations Demo
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/60 backdrop-blur-3xl rounded-[3rem] p-16 md:p-24 flex flex-col items-center text-center gap-12 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-600 via-cyan-400 to-indigo-600" />
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px]" />
            </div>
            <div className="max-w-3xl relative z-10">
              <div className="inline-block mb-8 px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full">
                <span className="text-xs font-black text-blue-400 uppercase tracking-[0.2em]">Custom Protocol</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tighter">
                Need Bespoke <br />Architecture?
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed font-light mb-12 max-w-2xl mx-auto">
                While our pre-built solutions are powerful, we specialize in high-stakes bespoke systems. Let's engineer your competitive advantage.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 relative z-10">
              <Link href="/book">
                <Button className="bg-blue-600 hover:bg-blue-500 text-white px-14 py-8 text-xs font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-blue-600/20 hover:shadow-blue-600/40 transition-all hover:scale-105">
                  Schedule Directive
                  <svg className="h-5 w-5 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="border border-white/10 text-white hover:bg-white/5 hover:border-blue-400 px-14 py-8 text-xs font-black uppercase tracking-[0.2em] rounded-2xl transition-all backdrop-blur-sm">
                  Service Inventory
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
