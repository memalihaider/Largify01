'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, Badge, Button, Input } from '@/components/ui';
import {
  mockCMSServices,
  mockCMSCaseStudies,
  mockCMSTestimonials,
  mockCMSFAQs,
  mockCMSTeamMembers,
  mockCMSCertifications,
} from '@/lib/mock-data';

type CMSTab = 'services' | 'case-studies' | 'testimonials' | 'faqs' | 'team' | 'certifications';

export default function CMSPage() {
  const [activeTab, setActiveTab] = useState<CMSTab>('services');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'services', label: 'Services', count: mockCMSServices.length },
    { id: 'case-studies', label: 'Case Studies', count: mockCMSCaseStudies.length },
    { id: 'testimonials', label: 'Testimonials', count: mockCMSTestimonials.length },
    { id: 'faqs', label: 'FAQs', count: mockCMSFAQs.length },
    { id: 'team', label: 'Team Members', count: mockCMSTeamMembers.length },
    { id: 'certifications', label: 'Certifications', count: mockCMSCertifications.length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600 mt-1">Manage website content, services, case studies, and more</p>
        </div>
        <div className="flex gap-3">
          <Link href="/erp/cms/services-management">
            <Button className="bg-purple-600 hover:bg-purple-700">
              ⚙️ Services Management
            </Button>
          </Link>
          <Button className="bg-blue-600 hover:bg-blue-700">
            + Add New Content
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 flex gap-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as CMSTab)}
            className={`px-4 py-3 font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
            <span className="ml-2 bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <Input
          type="search"
          placeholder="Search content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Services Tab */}
      {activeTab === 'services' && (
        <div className="grid gap-6">
          {mockCMSServices.map((service) => (
            <Card key={service.id} variant="bordered">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                  </div>
                  <Badge variant={service.isPublished ? 'success' : 'secondary'}>
                    {service.isPublished ? 'Published' : 'Draft'}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.features?.map((feature) => (
                    <Badge key={feature} variant="info" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Link href={`/erp/cms/services/${service.id}`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Case Studies Tab */}
      {activeTab === 'case-studies' && (
        <div className="grid gap-6">
          {mockCMSCaseStudies.map((study) => (
            <Card key={study.id} variant="bordered">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{study.title}</h3>
                      {study.isFeatured && (
                        <Badge variant="success" className="text-xs">★ Featured</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{study.companyName}</p>
                    <p className="text-xs text-gray-500 mt-1">{study.industry}</p>
                  </div>
                  <Badge variant={study.isPublished ? 'success' : 'secondary'}>
                    {study.isPublished ? 'Published' : 'Draft'}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {study.results.map((result, idx) => (
                    <div key={idx} className="bg-blue-50 rounded-lg p-3">
                      <p className="text-lg font-bold text-blue-600">{result.metric}</p>
                      <p className="text-xs text-gray-600">{result.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Link href={`/erp/cms/case-studies/${study.id}`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Testimonials Tab */}
      {activeTab === 'testimonials' && (
        <div className="grid gap-6">
          {mockCMSTestimonials.map((testimonial) => (
            <Card key={testimonial.id} variant="bordered">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-lg font-semibold text-gray-900">{testimonial.authorName}</p>
                      {testimonial.isFeatured && (
                        <Badge variant="success" className="text-xs">★ Featured</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {testimonial.authorRole} {testimonial.authorCompany && `at ${testimonial.authorCompany}`}
                    </p>
                  </div>
                  <Badge variant={testimonial.isPublished ? 'success' : 'secondary'}>
                    {testimonial.isPublished ? 'Published' : 'Draft'}
                  </Badge>
                </div>
                <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-700 mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Link href={`/erp/cms/testimonials/${testimonial.id}`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* FAQs Tab */}
      {activeTab === 'faqs' && (
        <div className="grid gap-6">
          {mockCMSFAQs.map((faq) => (
            <Card key={faq.id} variant="bordered">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {faq.category && (
                        <Badge variant="info" className="text-xs">
                          {faq.category}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  </div>
                  <Badge variant={faq.isPublished ? 'success' : 'secondary'}>
                    {faq.isPublished ? 'Published' : 'Draft'}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-4">{faq.answer}</p>
                <div className="flex gap-2">
                  <Link href={`/erp/cms/faqs/${faq.id}`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Team Members Tab */}
      {activeTab === 'team' && (
        <div className="grid gap-6 md:grid-cols-2">
          {mockCMSTeamMembers.map((member) => (
            <Card key={member.id} variant="bordered">
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  {member.avatarUrl && (
                    <img
                      src={member.avatarUrl}
                      alt={`${member.firstName} ${member.lastName}`}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {member.firstName} {member.lastName}
                      </h3>
                      <Badge variant={member.isPublished ? 'success' : 'secondary'}>
                        {member.isPublished ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-blue-600">{member.jobTitle}</p>
                    {member.bio && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{member.bio}</p>}
                  </div>
                </div>
                {member.expertise && member.expertise.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.expertise.slice(0, 3).map((exp) => (
                      <Badge key={exp} variant="info" className="text-xs">
                        {exp}
                      </Badge>
                    ))}
                    {member.expertise.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{member.expertise.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
                <div className="flex gap-2">
                  <Link href={`/erp/cms/team/${member.id}`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Certifications Tab */}
      {activeTab === 'certifications' && (
        <div className="grid gap-6 md:grid-cols-2">
          {mockCMSCertifications.map((cert) => (
            <Card key={cert.id} variant="bordered">
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  {cert.logoUrl && (
                    <img
                      src={cert.logoUrl}
                      alt={cert.providerName}
                      className="h-16 w-16 rounded-lg object-cover bg-gray-100"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-600">{cert.providerName}</p>
                      <Badge 
                        variant={cert.isActive ? 'success' : 'secondary'}
                        className="text-xs"
                      >
                        {cert.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{cert.certificationName}</h3>
                    {cert.description && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{cert.description}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  {cert.issuedDate && (
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Issued</p>
                      <p className="text-gray-900">{cert.issuedDate.toLocaleDateString()}</p>
                    </div>
                  )}
                  {cert.expiryDate && (
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Expires</p>
                      <p className="text-gray-900">{cert.expiryDate.toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link href={`/erp/cms/certifications/${cert.id}`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
