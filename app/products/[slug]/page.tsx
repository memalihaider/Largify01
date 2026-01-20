import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PublicLayout } from '@/components/public';
import { Button, Card, CardContent, Badge } from '@/components/ui';
import { mockCMSProducts } from '@/lib/mock-data';

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = mockCMSProducts.find(p => p.slug === slug && p.isPublished);

  if (!product) {
    notFound();
  }

  return (
    <PublicLayout>
      {/* Hero Section - Enhanced Premium */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-15" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href="/products" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 font-semibold">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </Link>

          <div className="flex items-start gap-8 mb-12">
            <div className="h-24 w-24 bg-linear-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl flex items-center justify-center text-cyan-400 shrink-0 border border-cyan-500/30 backdrop-blur-xl">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <div className="px-3 py-1 bg-blue-50/10 border border-blue-400/30 rounded-full">
                  <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">{product.category}</span>
                </div>
                {product.isFeatured && (
                  <div className="px-3 py-1 bg-cyan-50/10 border border-cyan-400/30 rounded-full">
                    <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest">Featured</span>
                  </div>
                )}
              </div>
              <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight">{product.name}</h1>
              <p className="text-xl text-cyan-300 mb-4 font-semibold">{product.tagline}</p>
              <p className="text-lg text-gray-300 leading-relaxed font-light">{product.description}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-linear-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl p-6 border border-cyan-500/20 backdrop-blur-sm">
              <p className="text-sm text-gray-400 uppercase tracking-widest font-semibold mb-2">Total Features</p>
              <p className="text-3xl font-black text-cyan-400">{product.features.length}+</p>
            </div>
            {product.technologies && (
              <div className="bg-linear-to-br from-blue-500/5 to-indigo-500/5 rounded-2xl p-6 border border-blue-500/20 backdrop-blur-sm">
                <p className="text-sm text-gray-400 uppercase tracking-widest font-semibold mb-2">Technologies</p>
                <p className="text-3xl font-black text-blue-400">{product.technologies.length}</p>
              </div>
            )}
            {product.pricing?.plans && (
              <div className="bg-linear-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl p-6 border border-indigo-500/20 backdrop-blur-sm">
                <p className="text-sm text-gray-400 uppercase tracking-widest font-semibold mb-2">Pricing Plans</p>
                <p className="text-3xl font-black text-indigo-400">{product.pricing.plans.length}</p>
              </div>
            )}
            {product.useCases && (
              <div className="bg-linear-to-br from-purple-500/5 to-pink-500/5 rounded-2xl p-6 border border-purple-500/20 backdrop-blur-sm">
                <p className="text-sm text-gray-400 uppercase tracking-widest font-semibold mb-2">Use Cases</p>
                <p className="text-3xl font-black text-purple-400">{product.useCases.length}+</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content - Enhanced */}
      <section className="py-28 bg-linear-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-20">
              {/* Features */}
              <div>
                <div className="inline-block mb-6 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
                  <span className="text-sm font-semibold text-blue-700 uppercase tracking-[0.15em]">Complete Feature Set</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-12 leading-tight">
                  Enterprise Capabilities<br />
                  <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600">Fully Packed</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="group flex items-start gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 hover:border-blue-400/60 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
                      <div className="h-10 w-10 bg-linear-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center shrink-0 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all">
                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-900 font-semibold text-base leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <div className="inline-block mb-6 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
                  <span className="text-sm font-semibold text-blue-700 uppercase tracking-[0.15em]">Why Choose This Product</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-12 leading-tight">
                  Proven Benefits<br />
                  <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600">Deliver Results</span>
                </h2>
                <div className="space-y-6">
                  {product.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-6 p-8 bg-white/80 backdrop-blur-sm rounded-2xl border-l-4 border-blue-600 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
                      <div className="h-12 w-12 bg-linear-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center shrink-0">
                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <p className="text-gray-700 font-semibold text-lg leading-relaxed">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              {product.technologies && product.technologies.length > 0 && (
                <div>
                  <div className="inline-block mb-6 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
                    <span className="text-sm font-semibold text-blue-700 uppercase tracking-[0.15em]">Tech Stack</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-12 leading-tight">
                    Built With Modern<br />
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600">Technology</span>
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {product.technologies.map((tech, idx) => (
                      <div key={idx} className="px-6 py-3 bg-white border border-gray-200 rounded-full hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 transition-all group cursor-pointer">
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Use Cases */}
              {product.useCases && product.useCases.length > 0 && (
                <div>
                  <div className="inline-block mb-6 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
                    <span className="text-sm font-semibold text-blue-700 uppercase tracking-[0.15em]">Applications</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-12 leading-tight">
                    Perfect For<br />
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600">Every Industry</span>
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {product.useCases.map((useCase, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                        <svg className="h-6 w-6 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-900 font-semibold">{useCase}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Enhanced */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Pricing Card */}
                {product.pricing && (
                  <Card variant="bordered" className="overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-3xl">
                    <div className="bg-linear-to-br from-blue-600 to-cyan-600 text-white p-8">
                      <h3 className="text-2xl font-black mb-2">Pricing</h3>
                      <p className="text-blue-100 text-sm font-light">{product.pricing.model}</p>
                    </div>
                    <CardContent className="p-8 space-y-6">
                      {product.pricing.plans?.map((plan, idx) => (
                        <div key={idx} className={`p-6 rounded-2xl border-2 transition-all duration-300 ${plan.isPopular ? 'border-blue-600 bg-blue-50 shadow-lg shadow-blue-500/20' : 'border-gray-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10'}`}>
                          {plan.isPopular && (
                            <div className="inline-block mb-3 px-3 py-1 bg-blue-600 text-white rounded-full">
                              <span className="text-xs font-bold uppercase tracking-wider">Most Popular</span>
                            </div>
                          )}
                          <h4 className="font-bold text-lg text-gray-900 mb-3">{plan.name}</h4>
                          <p className="text-3xl font-black bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600 mb-6">{plan.price}</p>
                          <ul className="space-y-3">
                            {plan.features.map((feature, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                                <svg className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
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

                {/* CTA Card */}
                <Card variant="bordered" className="overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-3xl">
                  <CardContent className="p-8 space-y-6">
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 mb-3">Ready to Start?</h3>
                      <p className="text-sm text-gray-600 leading-relaxed font-light">
                        Experience how {product.name} can transform your business operations.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <Link href="/book" className="block">
                        <Button className="w-full bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 h-12">
                          Schedule Demo
                          <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Button>
                      </Link>
                      <Link href="/contact" className="block">
                        <Button variant="outline" className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl h-12">
                          Contact Sales
                        </Button>
                      </Link>
                      {product.demoUrl && (
                        <Link href={product.demoUrl} target="_blank">
                          <Button variant="ghost" className="w-full text-blue-600 hover:bg-blue-50 rounded-xl h-12">
                            Try Live Demo
                            <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Enhanced */}
      <section className="py-32 bg-linear-to-b from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-linear-to-b from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-600/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
            <span className="h-2.5 w-2.5 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-cyan-300 uppercase tracking-wide">Join 500+ Enterprises</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
            Ready to Get Started <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-blue-400">With {product.name}?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-16 max-w-2xl mx-auto leading-relaxed font-light">
            Join hundreds of forward-thinking businesses already transforming their operations with {product.name}.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/book">
              <Button size="lg" className="bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-12 py-6 text-lg font-bold rounded-full shadow-xl shadow-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/40 transition-all hover:scale-105">
                Book a Discovery Call
                <svg className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="border-2 border-gray-400 text-white hover:bg-white/10 hover:border-cyan-400 px-12 py-6 text-lg font-bold rounded-full transition-all backdrop-blur-sm">
                View All Products
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
