import Link from 'next/link';
import { PublicLayout } from '@/components/public';
import { Button, Card, CardContent, Badge } from '@/components/ui';

const caseStudies = [
  {
    id: 'techflow-erp',
    company: 'TechFlow Industries',
    industry: 'Manufacturing',
    title: 'Custom ERP Implementation',
    excerpt: 'How we helped TechFlow streamline their manufacturing operations with a tailored ERP system.',
    challenge: 'TechFlow was managing inventory, production, and sales across multiple disconnected spreadsheets and legacy systems. Data silos were causing errors, delays, and lost revenue.',
    solution: 'We designed and built a comprehensive ERP system that unified inventory management, production scheduling, sales orders, and financial reporting into one integrated platform.',
    results: [
      { metric: '40%', label: 'Reduction in order processing time' },
      { metric: '99.5%', label: 'Inventory accuracy (up from 85%)' },
      { metric: '25%', label: 'Increase in production efficiency' },
      { metric: '6 months', label: 'Full ROI achieved' },
    ],
    testimonial: {
      quote: 'Largify transformed our operations. The new system actually fits how we work, not the other way around.',
      author: 'Robert Martinez',
      role: 'CTO, TechFlow Industries',
    },
    tags: ['ERP', 'Manufacturing', 'Inventory'],
    image: '/case-studies/techflow.jpg',
    featured: true,
  },
  {
    id: 'greenleaf-health',
    company: 'GreenLeaf Healthcare',
    industry: 'Healthcare',
    title: 'Patient Management System',
    excerpt: 'Building a HIPAA-compliant patient management system that improved care coordination.',
    challenge: 'GreenLeaf needed a modern patient management system that could handle scheduling, records, billing, and comply with HIPAA regulations—without the complexity of enterprise solutions.',
    solution: 'We built a custom healthcare platform with secure patient records, integrated scheduling, automated billing, and comprehensive audit logging for compliance.',
    results: [
      { metric: '50%', label: 'Faster patient check-in' },
      { metric: '100%', label: 'HIPAA compliance' },
      { metric: '30%', label: 'Reduction in no-shows' },
      { metric: '4.8/5', label: 'Patient satisfaction score' },
    ],
    testimonial: {
      quote: 'Their security-first approach gave us confidence that our patient data is protected. Excellent team to work with.',
      author: 'Emily Johnson',
      role: 'Operations Director, GreenLeaf Healthcare',
    },
    tags: ['Healthcare', 'HIPAA', 'Custom Software'],
    featured: true,
  },
  {
    id: 'summit-logistics',
    company: 'Summit Logistics',
    industry: 'Logistics',
    title: 'Fleet Management System',
    excerpt: 'Real-time fleet tracking and route optimization for a growing logistics company.',
    challenge: 'Summit was struggling to efficiently manage their growing fleet of vehicles. Manual dispatching, lack of real-time visibility, and inefficient routes were cutting into profits.',
    solution: 'We developed a comprehensive fleet management system with GPS tracking, automated route optimization, driver management, and real-time analytics dashboards.',
    results: [
      { metric: '18%', label: 'Fuel cost reduction' },
      { metric: '22%', label: 'More deliveries per day' },
      { metric: '95%', label: 'On-time delivery rate' },
      { metric: 'Real-time', label: 'Fleet visibility' },
    ],
    tags: ['Logistics', 'Fleet Management', 'IoT'],
    featured: false,
  },
];

export default function CaseStudiesPage() {
  const featuredStudies = caseStudies.filter(cs => cs.featured);
  const otherStudies = caseStudies.filter(cs => !cs.featured);

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Case Studies</h1>
            <p className="text-xl text-gray-300">
              Real stories of how we&apos;ve helped businesses transform their operations 
              with custom technology solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Projects</h2>
          <div className="space-y-16">
            {featuredStudies.map((study, index) => (
              <div key={study.id} className="grid lg:grid-cols-2 gap-12 items-start">
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.tags.map(tag => (
                      <Badge key={tag} variant="info">{tag}</Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{study.company} · {study.industry}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{study.title}</h3>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">The Challenge</h4>
                    <p className="text-gray-600">{study.challenge}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Our Solution</h4>
                    <p className="text-gray-600">{study.solution}</p>
                  </div>

                  {study.testimonial && (
                    <Card variant="bordered" className="p-4 bg-blue-50 border-blue-100 mb-6">
                      <p className="text-gray-700 italic mb-2">&quot;{study.testimonial.quote}&quot;</p>
                      <p className="text-sm text-gray-600">— {study.testimonial.author}, {study.testimonial.role}</p>
                    </Card>
                  )}
                </div>
                
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <Card variant="bordered" className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Key Results</h4>
                    <div className="grid grid-cols-2 gap-6">
                      {study.results.map((result) => (
                        <div key={result.label}>
                          <p className="text-3xl font-bold text-blue-600">{result.metric}</p>
                          <p className="text-sm text-gray-600">{result.label}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Case Studies */}
      {otherStudies.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">More Success Stories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherStudies.map((study) => (
                <Card key={study.id} variant="bordered" className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {study.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} size="sm" variant="info">{tag}</Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{study.company}</p>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{study.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{study.excerpt}</p>
                    <div className="grid grid-cols-2 gap-4">
                      {study.results.slice(0, 2).map((result) => (
                        <div key={result.label}>
                          <p className="text-xl font-bold text-blue-600">{result.metric}</p>
                          <p className="text-xs text-gray-600">{result.label}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Be Our Next Success Story?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help transform your business operations.
          </p>
          <Link href="/book">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Book Your Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
