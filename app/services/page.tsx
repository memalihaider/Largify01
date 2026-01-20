import { ReactNode } from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/public';
import { Button, Card, CardContent } from '@/components/ui';
import { mockCMSServices } from '@/lib/mock-data';

// Icon component factory for different service types
const getServiceIcon = (iconType?: string) => {
  const iconMap: Record<string, ReactNode> = {
    settings: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    code: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    shield: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    ai: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    mobile: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    web: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    consultation: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    default: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  };
  return iconMap[iconType || 'default'] || iconMap.default;
};

// Default fallback services in case mockCMSServices is empty
const defaultServices = [
  {
    id: 'erp',
    title: 'Custom ERP Systems',
    slug: 'custom-erp-systems',
    shortDescription: 'Tailored enterprise resource planning for your business',
    description: 'Our custom ERP solutions are built from the ground up to match your exact business processes. Unlike off-the-shelf solutions, our systems adapt to how you work, not the other way around.',
    iconType: 'erp',
    features: [
      'Inventory & Supply Chain Management',
      'Sales & Order Processing',
      'Financial Management & Reporting',
      'HR & Payroll Integration',
      'Manufacturing & Production',
      'Business Intelligence & Analytics',
    ],
    benefits: [
      'Eliminate manual data entry and reduce errors',
      'Real-time visibility across all operations',
      'Scalable architecture that grows with you',
      'Seamless integration with existing tools',
    ],
  },
  {
    id: 'software',
    title: 'Custom Software Development',
    slug: 'custom-software-development',
    shortDescription: 'Bespoke solutions for unique business challenges',
    description: 'When your business needs don\'t fit into a box, we build software that does exactly what you need. From internal tools to customer-facing platforms, we create solutions that solve real problems.',
    iconType: 'software',
    features: [
      'Web Applications & Portals',
      'Mobile Applications (iOS & Android)',
      'Internal Business Tools',
      'API Development & Integration',
      'Legacy System Modernization',
      'Workflow Automation',
    ],
    benefits: [
      'Solutions tailored to your exact requirements',
      'Modern, maintainable codebase',
      'Comprehensive documentation',
      'Ongoing support and updates',
    ],
  },
  {
    id: 'security',
    title: 'Security Audits & Implementation',
    slug: 'security-audits',
    shortDescription: 'Security-first architecture and hardening',
    description: 'Security isn\'t an afterthought—it\'s the foundation. We build systems with security embedded at every layer, from architecture to deployment, ensuring your data and operations stay protected.',
    iconType: 'security',
    features: [
      'Security Architecture Design',
      'Penetration Testing & Vulnerability Assessment',
      'Secure Code Review',
      'Compliance Implementation (HIPAA, SOC2, etc.)',
      'Security Monitoring & Incident Response',
      'Employee Security Training',
    ],
    benefits: [
      'Reduced risk of data breaches',
      'Compliance with industry regulations',
      'Peace of mind for you and your clients',
      'Proactive threat detection',
    ],
  },
];

// Merge CMS services with defaults, filtering out unpublished ones
const services = mockCMSServices.filter(s => s.isPublished).map(s => ({
  id: s.id,
  title: s.title,
  slug: s.slug,
  shortDescription: s.description.substring(0, 100) + '...',
  description: s.description,
  iconType: s.iconType,
  features: s.features || [],
  benefits: s.features?.slice(0, 4) || [],
})).length > 0 
  ? mockCMSServices.filter(s => s.isPublished).map(s => ({
      id: s.id,
      title: s.title,
      slug: s.slug,
      shortDescription: s.description.substring(0, 100) + '...',
      description: s.description,
      iconType: s.iconType,
      features: s.features || [],
      benefits: s.features?.slice(0, 4) || [],
    }))
  : defaultServices;

export default function ServicesPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-gray-300">
              Comprehensive technology solutions designed to transform your business operations. 
              From custom ERP systems to security hardening, we build systems that work.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="h-16 w-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                    {getServiceIcon(service.iconType)}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <div className="mb-8">
                    <h3 className="font-semibold text-gray-900 mb-3">Key Benefits:</h3>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2">
                          <svg className="h-5 w-5 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-4">
                    <Link href={`/services/${service.slug}`}>
                      <Button>
                        Learn More
                        <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Button>
                    </Link>
                    <Link href="/book">
                      <Button variant="outline">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <Card variant="bordered" className="p-8">
                    <h3 className="font-semibold text-gray-900 mb-4">What&apos;s Included:</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="h-1.5 w-1.5 bg-blue-600 rounded-full" />
                          {feature}
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

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A proven methodology that delivers results, on time and on budget.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'We dive deep into your business to understand your needs, challenges, and goals.' },
              { step: '02', title: 'Design', description: 'We create a detailed blueprint of the solution, including architecture and user experience.' },
              { step: '03', title: 'Develop', description: 'Our team builds your solution using modern technologies and best practices.' },
              { step: '04', title: 'Deploy', description: 'We launch your system and provide training, documentation, and ongoing support.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 bg-blue-600 text-white text-2xl font-bold rounded-full mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Book a free consultation to discuss your project and see how we can help transform your business.
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
