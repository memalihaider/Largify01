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
      {/* Hero Section */}
      <section className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Link href="/products" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Products
            </Link>

            <div className="flex items-start gap-6 mb-6">
              <div className="h-20 w-20 bg-blue-500 rounded-2xl flex items-center justify-center text-white shrink-0">
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="secondary">{product.category}</Badge>
                  {product.isFeatured && <Badge variant="success">Featured Product</Badge>}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3">{product.name}</h1>
                <p className="text-xl text-blue-300 mb-4">{product.tagline}</p>
                <p className="text-lg text-gray-300">{product.description}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-gray-300 mb-1">Features</p>
                <p className="text-2xl font-bold">{product.features.length}+</p>
              </div>
              {product.technologies && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm text-gray-300 mb-1">Technologies</p>
                  <p className="text-2xl font-bold">{product.technologies.length}</p>
                </div>
              )}
              {product.pricing?.plans && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm text-gray-300 mb-1">Pricing Plans</p>
                  <p className="text-2xl font-bold">{product.pricing.plans.length}</p>
                </div>
              )}
              {product.useCases && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm text-gray-300 mb-1">Use Cases</p>
                  <p className="text-2xl font-bold">{product.useCases.length}+</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Features */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Feature Set</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                      <svg className="h-6 w-6 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-900 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Benefits</h2>
                <div className="space-y-4">
                  {product.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-5 bg-white rounded-lg border-l-4 border-blue-600">
                      <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                        <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <p className="text-gray-700 font-medium">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              {product.technologies && product.technologies.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Built With Modern Technology</h2>
                  <div className="flex flex-wrap gap-3">
                    {product.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="px-4 py-2 text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Use Cases */}
              {product.useCases && product.useCases.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Perfect For</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {product.useCases.map((useCase, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                        <svg className="h-5 w-5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-900">{useCase}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Pricing Card */}
                {product.pricing && (
                  <Card variant="bordered" className="overflow-hidden">
                    <div className="bg-blue-600 text-white p-6">
                      <h3 className="text-xl font-bold mb-2">Pricing</h3>
                      <p className="text-blue-100 text-sm">{product.pricing.model}</p>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      {product.pricing.plans?.map((plan, idx) => (
                        <div key={idx} className={`p-4 rounded-lg border-2 ${plan.isPopular ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
                          {plan.isPopular && (
                            <Badge variant="info" className="mb-2">Most Popular</Badge>
                          )}
                          <h4 className="font-bold text-lg text-gray-900 mb-1">{plan.name}</h4>
                          <p className="text-2xl font-bold text-blue-600 mb-3">{plan.price}</p>
                          <ul className="space-y-2">
                            {plan.features.map((feature, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2 text-sm text-gray-600">
                                <svg className="h-4 w-4 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
                <Card variant="bordered">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-bold text-gray-900">Get Started Today</h3>
                    <p className="text-sm text-gray-600">
                      Book a demo to see how {product.name} can transform your business operations.
                    </p>
                    <Link href="/book">
                      <Button className="w-full">
                        Schedule Demo
                        <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button variant="outline" className="w-full">
                        Contact Sales
                      </Button>
                    </Link>
                    {product.demoUrl && (
                      <Link href={product.demoUrl} target="_blank">
                        <Button variant="ghost" className="w-full">
                          Try Live Demo
                          <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses already using {product.name} to streamline their operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Book a Discovery Call
                <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
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
