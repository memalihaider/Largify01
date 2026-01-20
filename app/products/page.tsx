import Link from 'next/link';
import { PublicLayout } from '@/components/public';
import { Button, Card, CardContent, Badge } from '@/components/ui';
import { mockCMSProducts } from '@/lib/mock-data';

export default function ProductsPage() {
  const products = mockCMSProducts.filter(p => p.isPublished);

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Largify Products</h1>
            <p className="text-xl text-gray-300">
              Ready-to-deploy software solutions built on years of expertise. 
              Each product is designed to solve real business challenges with proven results.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product) => (
              <Card key={product.id} variant="bordered" className="overflow-hidden hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    {product.isFeatured && (
                      <Badge variant="success">Featured</Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                    </div>
                    <p className="text-sm text-blue-600 font-medium mb-3">{product.tagline}</p>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    
                    <div className="mb-4">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Category</span>
                      <p className="text-sm text-gray-900 font-medium">{product.category}</p>
                    </div>
                  </div>

                  {/* Key Features Preview */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Key Features:</h3>
                    <ul className="space-y-2">
                      {product.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <svg className="h-5 w-5 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                      {product.features.length > 4 && (
                        <li className="text-sm text-gray-500 italic">
                          + {product.features.length - 4} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Pricing */}
                  {product.pricing && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Starting at</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {product.pricing.plans?.[0]?.price || product.pricing.startingPrice || 'Contact us'}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">{product.pricing.model}</p>
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="flex gap-3">
                    <Link href={`/products/${product.slug}`} className="flex-1">
                      <Button className="w-full">
                        View Details
                        <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Button>
                    </Link>
                    {product.demoUrl && (
                      <Link href={product.demoUrl} target="_blank">
                        <Button variant="outline">
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

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our products are just the beginning. We can customize any solution or build something entirely new for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Schedule a Consultation
                <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                View Custom Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
