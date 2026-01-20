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
      <section className="py-28 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
              <span className="text-sm font-semibold text-blue-700 uppercase tracking-[0.15em]">Product Catalog</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
              Enterprise-Grade <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600">Products & Services</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product) => (
              <Card key={product.id} variant="bordered" className="group bg-white/80 backdrop-blur-sm border border-gray-200/60 hover:border-blue-400/60 hover:shadow-2xl hover:shadow-blue-500/15 rounded-3xl overflow-hidden transition-all duration-500 flex flex-col h-full">
                <CardContent className="p-10 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="h-16 w-16 bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:shadow-lg group-hover:shadow-blue-500/20 group-hover:scale-110 transition-all duration-300 border border-gray-100/50">
                      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    {product.isFeatured && (
                      <div className="px-3 py-1 bg-linear-to-r from-blue-100 to-cyan-100 border border-blue-300 rounded-full">
                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Featured</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="mb-8 grow">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{product.name}</h2>
                    <p className="text-sm text-blue-600 font-semibold mb-4">{product.tagline}</p>
                    <p className="text-gray-600 mb-6 leading-relaxed font-light">{product.description}</p>
                    
                    <div className="mb-6 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
                      <span className="text-xs font-semibold text-blue-700 uppercase tracking-widest block mb-1">Category</span>
                      <p className="text-sm text-gray-900 font-semibold">{product.category}</p>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-8 pb-8 border-b border-gray-100/50">
                    <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">Key Features:</h3>
                    <ul className="space-y-3">
                      {product.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                          <div className="w-5 h-5 rounded-full bg-linear-to-br from-blue-200 to-blue-300 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                            <svg className="h-3 w-3 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                      {product.features.length > 4 && (
                        <li className="text-xs text-gray-500 italic ml-8">
                          + {product.features.length - 4} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Pricing */}
                  {product.pricing && (
                    <div className="mb-8 p-6 bg-linear-to-br from-blue-50/50 to-indigo-50/50 rounded-2xl border border-blue-100/50">
                      <p className="text-xs text-blue-700 uppercase tracking-widest font-semibold mb-2">Starting Price</p>
                      <p className="text-3xl font-black text-gray-900 mb-1">
                        {product.pricing.plans?.[0]?.price || product.pricing.startingPrice || 'Custom'}
                      </p>
                      <p className="text-xs text-gray-600 font-medium">{product.pricing.model}</p>
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="flex flex-col gap-3">
                    <Link href={`/products/${product.slug}`} className="w-full">
                      <Button className="w-full bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 h-12">
                        View Full Details
                        <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Button>
                    </Link>
                    {product.demoUrl && (
                      <Link href={product.demoUrl} target="_blank">
                        <Button variant="outline" className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl h-12">
                          Live Demo
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
      <section className="py-28 bg-linear-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 rounded-4xl p-16 md:p-24 flex flex-col items-center text-center gap-12 border border-slate-800/50 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>
            <div className="max-w-3xl relative z-10">
              <div className="inline-block mb-6 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest">Custom Solutions</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Need Something More Tailored?
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed font-light mb-12">
                Our products are comprehensive, but we specialize in bespoke architecture. Let's design the perfect solution for your enterprise.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 relative z-10">
              <Link href="/book">
                <Button className="bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-12 py-6 text-lg font-bold rounded-full shadow-xl shadow-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/40 transition-all hover:scale-105">
                  Schedule Consultation
                  <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="border-2 border-gray-400 text-white hover:bg-white/10 hover:border-cyan-400 px-12 py-6 text-lg font-bold rounded-full transition-all backdrop-blur-sm">
                  Explore Custom Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
