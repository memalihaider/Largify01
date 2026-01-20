import Link from 'next/link';
import { PublicLayout } from '@/components/public';
import { Button, Card, CardContent } from '@/components/ui';
import {
  mockCMSTeamMembers,
  mockCMSCertifications,
} from '@/lib/mock-data';

const services = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: 'Custom ERP Systems',
    slug: 'custom-erp-systems',
    description: 'Tailored enterprise resource planning solutions designed for your unique business processes.',
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Custom Software',
    slug: 'custom-software-development',
    description: 'Bespoke software solutions built to solve your specific business challenges.',
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Website Development',
    slug: 'website-development',
    description: 'Modern, responsive websites that convert visitors into customers.',
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Mobile App Development',
    slug: 'mobile-app-development',
    description: 'Native and cross-platform mobile apps for iOS and Android.',
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'AI Solutions',
    slug: 'ai-solutions',
    description: 'Transform your business with intelligent automation and AI-powered solutions.',
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Security by Design',
    slug: 'security-audits',
    description: 'Security-first architecture ensuring your systems are protected from day one.',
  },
];

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Support Available' },
  { value: '10+', label: 'Industries Served' },
];

const testimonials = [
  {
    quote: "Largify transformed our operations with a custom ERP that actually fits how we work. The ROI was visible within months.",
    author: "Robert Martinez",
    role: "CTO, TechFlow Industries",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
  },
  {
    quote: "Their security-first approach gave us confidence that our healthcare data is protected. Excellent team to work with.",
    author: "Emily Johnson",
    role: "Operations Director, GreenLeaf Healthcare",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
];

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6">
              <span className="h-2 w-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-sm text-blue-300">Secure Business Systems</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Build Systems That
              <span className="text-blue-400"> Scale With </span>
              Your Business
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
              Largify Solutions builds secure, custom business systems for SMEs. 
              From ERP to custom software, we create solutions that drive efficiency and growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book">
                <Button size="lg" className="w-full sm:w-auto">
                  Book a Discovery Call
                  <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-gray-600 text-white hover:bg-gray-800">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Build
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive technology solutions designed to transform your business operations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} variant="bordered" className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 text-blue-600 font-medium mt-4 hover:text-blue-700"
                  >
                    Learn more
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Largify Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Largify?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We don&apos;t just build software — we build business operating systems that grow with you.
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: 'Security First',
                    description: 'Every system we build has security embedded from the architecture level, not bolted on after.',
                  },
                  {
                    title: 'Modular & Scalable',
                    description: 'Start with what you need, expand as you grow. Our systems are designed for evolution.',
                  },
                  {
                    title: 'SME Focused',
                    description: 'We understand the unique challenges of small and medium enterprises and build accordingly.',
                  },
                  {
                    title: 'Long-term Partnership',
                    description: 'We&apos;re not just vendors — we&apos;re partners invested in your success.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="shrink-0">
                      <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-linear-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Operations?</h3>
                <p className="text-blue-100 mb-6">
                  Book a free discovery call to discuss your business needs and see how we can help.
                </p>
                <Link href="/book">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100">
                    Schedule Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.author} variant="bordered" className="p-8">
                <div className="flex items-start gap-4">
                  <svg className="h-8 w-8 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <div>
                    <p className="text-gray-700 text-lg mb-4">{testimonial.quote}</p>
                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.author}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how we&apos;ve helped businesses transform their operations and achieve measurable results.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                company: 'TechFlow Industries',
                industry: 'Manufacturing',
                result: '40% faster order processing',
                metric: '6 months',
                label: 'ROI achieved',
              },
              {
                company: 'GreenLeaf Healthcare',
                industry: 'Healthcare',
                result: '100% HIPAA compliant',
                metric: '50%',
                label: 'Faster check-in',
              },
              {
                company: 'Summit Logistics',
                industry: 'Logistics',
                result: '18% fuel cost reduction',
                metric: '95%',
                label: 'On-time delivery',
              },
            ].map((item) => (
              <Card key={item.company} variant="bordered" className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <p className="text-sm font-semibold text-blue-600 uppercase mb-2">{item.industry}</p>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.company}</h3>
                  <p className="text-gray-600 mb-6">{item.result}</p>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-2xl font-bold text-blue-600">{item.metric}</p>
                    <p className="text-sm text-gray-600">{item.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/case-studies">
              <Button variant="outline" size="lg">
                View All Case Studies
                <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Industries We Serve Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From manufacturing to healthcare, we bring industry-specific expertise to every project.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Manufacturing',
              'Healthcare',
              'Logistics',
              'Retail',
              'Finance',
              'Education',
              'Real Estate',
              'Professional Services',
            ].map((industry) => (
              <Card key={industry} variant="bordered" className="p-6 text-center hover:shadow-md transition-shadow">
                <p className="font-semibold text-gray-900">{industry}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Modern Technology Stack
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We build with the latest, most reliable technologies to ensure your systems are secure, scalable, and future-proof.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Frontend</h3>
              <div className="space-y-3">
                {['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Real-time Dashboards'].map((tech) => (
                  <div key={tech} className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    <p className="text-gray-700">{tech}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Backend & Infrastructure</h3>
              <div className="space-y-3">
                {['PostgreSQL', 'Node.js / Python', 'Docker & Kubernetes', 'AWS / Cloud Native'].map((tech) => (
                  <div key={tech} className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    <p className="text-gray-700">{tech}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A proven methodology for delivering solutions that work.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Discovery',
                description: 'We understand your business, challenges, and goals through detailed workshops and analysis.',
              },
              {
                step: '2',
                title: 'Design',
                description: 'We architect a solution tailored to your needs, with security and scalability built in.',
              },
              {
                step: '3',
                title: 'Build',
                description: 'Our team develops your system with regular updates and transparency throughout.',
              },
              {
                step: '4',
                title: 'Support',
                description: 'We launch your system and provide ongoing support, maintenance, and improvements.',
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-lg font-bold text-blue-600">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                {item.step !== '4' && (
                  <div className="absolute top-6 -right-4 w-8 h-1 bg-blue-200 hidden md:block"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real feedback from companies we&apos;ve partnered with.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: 'Largify transformed our operations. The new system actually fits how we work. ROI was visible within months.',
                author: 'Robert Martinez',
                role: 'CTO, TechFlow Industries',
              },
              {
                quote: 'Their security-first approach gave us confidence that our healthcare data is protected. Excellent team to work with.',
                author: 'Emily Johnson',
                role: 'Operations Director, GreenLeaf Healthcare',
              },
            ].map((testimonial) => (
              <Card key={testimonial.author} variant="bordered" className="p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to building solutions that drive your business forward.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {mockCMSTeamMembers.filter(member => member.isPublished).slice(0, 5).map((member) => (
              <Card key={member.id} variant="bordered" className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-linear-to-br from-blue-100 to-blue-50 relative overflow-hidden">
                  {member.avatarUrl && (
                    <img
                      src={member.avatarUrl}
                      alt={`${member.firstName} ${member.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">
                    {member.firstName} {member.lastName}
                  </h3>
                  <p className="text-sm font-medium text-blue-600 mb-2">{member.jobTitle}</p>
                  {member.expertise && member.expertise.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {member.expertise.slice(0, 2).map((exp) => (
                        <span key={exp} className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                          {exp}
                        </span>
                      ))}
                      {member.expertise.length > 2 && (
                        <span className="text-xs text-gray-600">+{member.expertise.length - 2}</span>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Meet the full team and learn more about our expertise</p>
            <Link href="/services">
              <Button variant="outline">
                View Full Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted & Certified
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We maintain the highest standards of security, compliance, and service quality.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCMSCertifications.filter(cert => cert.isPublished && cert.isActive).map((cert) => (
              <Card key={cert.id} variant="bordered" className="p-6 hover:shadow-lg transition-shadow text-center">
                <div className="h-20 flex items-center justify-center mb-4 bg-gray-50 rounded-lg">
                  {cert.logoUrl && (
                    <img
                      src={cert.logoUrl}
                      alt={cert.providerName}
                      className="h-16 w-auto object-contain"
                    />
                  )}
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">{cert.providerName}</p>
                <h3 className="font-semibold text-gray-900 mb-2">{cert.certificationName}</h3>
                {cert.certificationId && (
                  <p className="text-xs text-gray-500 mb-3">ID: {cert.certificationId}</p>
                )}
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-green-600 font-medium">✓ Active & Current</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Your Business System?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how Largify can help you streamline operations, improve security, and scale your business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/book">
              <Button size="lg" className="w-full sm:w-auto">
                Book a Call
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-gray-600 text-white hover:bg-gray-800">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
