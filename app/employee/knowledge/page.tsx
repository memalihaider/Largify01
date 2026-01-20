'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input } from '@/components/ui';
import { mockKnowledgeCategories, mockKnowledgeDocuments } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function EmployeeKnowledgePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const filteredDocuments = mockKnowledgeDocuments.filter(doc => {
    if (selectedCategory && doc.categoryId !== selectedCategory) return false;
    if (searchQuery && !doc.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return doc.status === 'published';
  });

  const selectedDoc = selectedDocument 
    ? mockKnowledgeDocuments.find(d => d.id === selectedDocument) 
    : null;

  const getCategoryIcon = (icon?: string) => {
    const icons: Record<string, React.ReactNode> = {
      FileText: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      Code: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      Copy: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      Users: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      Shield: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    };
    return icons[icon || 'FileText'] || icons.FileText;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="text-gray-500">Access company documentation and resources</p>
        </div>
      </div>

      {/* Search */}
      <Card variant="bordered" className="p-4">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documentation..."
            className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </Card>

      <div className="flex gap-6">
        {/* Categories Sidebar */}
        <div className="w-64 shrink-0">
          <Card variant="bordered" className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors',
                  !selectedCategory
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                All Documents
              </button>
              {mockKnowledgeCategories.map(category => {
                const docCount = mockKnowledgeDocuments.filter(
                  d => d.categoryId === category.id && d.status === 'published'
                ).length;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      'w-full flex items-center justify-between gap-3 px-3 py-2 text-sm rounded-lg transition-colors',
                      selectedCategory === category.id
                        ? 'bg-green-50 text-green-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(category.icon)}
                      {category.name}
                    </div>
                    <span className="text-xs text-gray-400">{docCount}</span>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Quick Links */}
          <Card variant="bordered" className="p-4 mt-4">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-green-600 hover:text-green-700">
                → Employee Handbook
              </a>
              <a href="#" className="block text-sm text-green-600 hover:text-green-700">
                → Onboarding Guide
              </a>
              <a href="#" className="block text-sm text-green-600 hover:text-green-700">
                → Development Setup
              </a>
              <a href="#" className="block text-sm text-green-600 hover:text-green-700">
                → Code Review Guidelines
              </a>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {selectedDoc ? (
            // Document View
            <Card variant="bordered" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to list
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {selectedDoc.viewsCount} views
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className={cn(
                  'px-2 py-1 rounded text-xs font-medium',
                  selectedDoc.type === 'sop' ? 'bg-blue-100 text-blue-700' :
                  selectedDoc.type === 'architecture' ? 'bg-purple-100 text-purple-700' :
                  selectedDoc.type === 'template' ? 'bg-orange-100 text-orange-700' :
                  'bg-gray-100 text-gray-700'
                )}>
                  {selectedDoc.type}
                </span>
                {selectedDoc.tags?.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-4">{selectedDoc.title}</h1>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b">
                <span>Last updated: {selectedDoc.updatedAt ? new Date(selectedDoc.updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A'}</span>
                <span>•</span>
                <span>Version {selectedDoc.version}</span>
              </div>

              <div className="prose prose-green max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{selectedDoc.content}</p>
              </div>
            </Card>
          ) : (
            // Document List
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedCategory 
                    ? mockKnowledgeCategories.find(c => c.id === selectedCategory)?.name 
                    : 'All Documents'}
                </h2>
                <span className="text-sm text-gray-500">{filteredDocuments.length} documents</span>
              </div>

              {filteredDocuments.length > 0 ? (
                <div className="space-y-3">
                  {filteredDocuments.map(doc => {
                    const category = mockKnowledgeCategories.find(c => c.id === doc.categoryId);
                    return (
                      <Card
                        key={doc.id}
                        variant="bordered"
                        className="p-4 hover:shadow-md cursor-pointer transition-shadow"
                        onClick={() => setSelectedDocument(doc.id)}
                      >
                        <div className="flex items-start gap-4">
                          <div className={cn(
                            'p-2 rounded-lg shrink-0',
                            doc.type === 'sop' ? 'bg-blue-100 text-blue-600' :
                            doc.type === 'architecture' ? 'bg-purple-100 text-purple-600' :
                            doc.type === 'template' ? 'bg-orange-100 text-orange-600' :
                            'bg-gray-100 text-gray-600'
                          )}>
                            {getCategoryIcon(category?.icon)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-gray-900">{doc.title}</h3>
                              <span className={cn(
                                'px-2 py-0.5 rounded text-xs font-medium',
                                doc.type === 'sop' ? 'bg-blue-100 text-blue-700' :
                                doc.type === 'architecture' ? 'bg-purple-100 text-purple-700' :
                                doc.type === 'template' ? 'bg-orange-100 text-orange-700' :
                                'bg-gray-100 text-gray-700'
                              )}>
                                {doc.type}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                              {doc.content?.substring(0, 150)}...
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-400">
                              <span>{category?.name}</span>
                              <span>•</span>
                              <span>{doc.viewsCount} views</span>
                              <span>•</span>
                              <span>Updated {doc.updatedAt ? new Date(doc.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A'}</span>
                            </div>
                          </div>
                          <svg className="h-5 w-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card variant="bordered" className="p-12">
                  <div className="text-center">
                    <svg className="h-12 w-12 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Documents Found</h3>
                    <p className="text-gray-500">Try adjusting your search or category filter.</p>
                  </div>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
