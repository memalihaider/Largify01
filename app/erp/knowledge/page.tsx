'use client';

import { useState } from 'react';
import { Card, Button, Input, Badge } from '@/components/ui';
import { mockKnowledgeDocuments, mockKnowledgeCategories, mockUsers } from '@/lib/mock-data';
import { formatRelativeTime, cn } from '@/lib/utils';

const categoryIcons: Record<string, string> = {
  'Standard Operating Procedures': '📋',
  'Architecture Documents': '⚙️',
  'Templates': '📄',
  'Client Documentation': '👥',
  'Security Guidelines': '🔒',
};

export default function KnowledgePage() {
  const [documents, setDocuments] = useState(mockKnowledgeDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentDoc, setCurrentDoc] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    content: '',
    tags: '',
    authorId: 'usr-001',
    status: 'draft',
  });

  const categories = [{ id: 'all', name: 'All Categories' }, ...mockKnowledgeCategories];

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || doc.categoryId === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategory = (categoryId: string) => {
    return mockKnowledgeCategories.find(c => c.id === categoryId);
  };

  const getAuthor = (userId: string) => {
    return mockUsers.find(u => u.id === userId);
  };

  const handleOpenModal = (doc?: any) => {
    if (doc) {
      setCurrentDoc(doc);
      setFormData({
        title: doc.title || '',
        categoryId: doc.categoryId || '',
        content: doc.content || '',
        tags: doc.tags?.join(', ') || '',
        authorId: doc.authorId || 'usr-001',
        status: doc.status || 'draft',
      });
    } else {
      setCurrentDoc(null);
      setFormData({
        title: '',
        categoryId: '',
        content: '',
        tags: '',
        authorId: 'usr-001',
        status: 'draft',
      });
    }
    setShowModal(true);
  };

  const handleViewDocument = (doc: any) => {
    setCurrentDoc(doc);
    setShowViewModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tagsArray = formData.tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t);

    if (currentDoc) {
      setDocuments(documents.map(doc => 
        doc.id === currentDoc.id 
          ? {
              ...doc,
              title: formData.title,
              categoryId: formData.categoryId,
              content: formData.content,
              tags: tagsArray,
              authorId: formData.authorId,
              status: formData.status,
              updatedAt: new Date(),
              version: (doc.version || 1) + 1,
            } as any
          : doc
      ));
      alert('Document updated successfully!');
    } else {
      const newDoc = {
        id: `kdoc-${Date.now()}`,
        categoryId: formData.categoryId,
        title: formData.title,
        slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
        content: formData.content,
        type: 'sop' as const,
        status: formData.status as any,
        isInternal: true,
        visibility: 'all' as const,
        tags: tagsArray,
        version: 1,
        viewsCount: 0,
        authorId: formData.authorId,
        publishedAt: formData.status === 'published' ? new Date() : undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setDocuments([newDoc, ...documents]);
      alert('Document created successfully!');
    }
    setShowModal(false);
  };

  const handleDelete = (docId: string) => {
    setCurrentDoc(documents.find(d => d.id === docId));
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setDocuments(documents.filter(d => d.id !== currentDoc.id));
    alert('Document deleted successfully!');
    setShowDeleteConfirm(false);
    setCurrentDoc(null);
  };

  const handleTogglePublish = (doc: any) => {
    const newStatus = doc.status === 'published' ? 'draft' : 'published';
    setDocuments(documents.map(d => 
      d.id === doc.id 
        ? {
            ...d,
            status: newStatus,
            publishedAt: newStatus === 'published' ? new Date() : d.publishedAt,
            updatedAt: new Date(),
          } as any
        : d
    ));
    alert(`Document ${newStatus === 'published' ? 'published' : 'unpublished'} successfully!`);
  };

  const handleCopyLink = (doc: any) => {
    const link = `${window.location.origin}/knowledge/${doc.slug}`;
    navigator.clipboard.writeText(link);
    alert(`Link copied to clipboard:\n${link}`);
  };

  const handleExport = () => {
    console.log('Exporting documentation...');
    alert('Documentation exported successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Knowledge Base</h1>
          <p className="text-slate-400">Find guides, documentation, and resources</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Documentation
          </Button>
          <Button onClick={() => handleOpenModal()}>
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Document
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-slate-400">Total Documents</p>
          <p className="text-2xl font-bold text-white">{documents.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">Published</p>
          <p className="text-2xl font-bold text-emerald-400">
            {documents.filter(d => d.status === 'published').length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">Drafts</p>
          <p className="text-2xl font-bold text-amber-400">
            {documents.filter(d => d.status === 'draft').length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">Total Views</p>
          <p className="text-2xl font-bold text-blue-400">
            {documents.reduce((sum, d) => sum + (d.viewsCount || 0), 0)}
          </p>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-lg border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </Card>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((category) => {
          const docCount = category.id === 'all'
            ? documents.length
            : documents.filter(d => d.categoryId === category.id).length;
          
          return (
            <button
              key={category.id}
              onClick={() => setCategoryFilter(category.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors',
                categoryFilter === category.id
                  ? 'bg-blue-900/20 text-blue-400'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-800'
              )}
            >
              {category.id !== 'all' && (
                <span>{categoryIcons[category.name] || '📄'}</span>
              )}
              <span className="font-medium">{category.name}</span>
              <Badge variant="secondary" className="bg-slate-900/50">{docCount}</Badge>
            </button>
          );
        })}
      </div>

      {/* Documents Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc) => {
          const category = doc.categoryId ? getCategory(doc.categoryId) : null;
          const author = doc.authorId ? getAuthor(doc.authorId) : null;
          
          return (
            <Card key={doc.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-900/20 flex items-center justify-center text-xl">
                    {categoryIcons[category?.name || ''] || '📄'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white line-clamp-1 flex-1">{doc.title}</h3>
                      <Badge 
                        status={doc.status === 'published' ? 'success' : 'warning'}
                        className="text-xs"
                      >
                        {doc.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400">{category?.name}</p>
                  </div>
                </div>
                
                <p className="text-sm text-slate-400 line-clamp-3 mb-4">
                  {doc.content?.replace(/<[^>]*>/g, '').substring(0, 150)}...
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatRelativeTime(doc.updatedAt)}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="text-sm text-slate-400">{doc.viewsCount}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 mb-4">
                  <span>By {author?.fullName || 'Unknown'}</span>
                  {doc.version && <span> • v{doc.version}</span>}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewDocument(doc)}
                    className="flex-1"
                  >
                    <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </Button>
                  <button
                    onClick={() => handleOpenModal(doc)}
                    className="p-2 text-slate-500 hover:text-blue-400 border border-slate-800 rounded-lg"
                    title="Edit"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleTogglePublish(doc)}
                    className="p-2 text-slate-500 hover:text-emerald-400 border border-slate-800 rounded-lg"
                    title={doc.status === 'published' ? 'Unpublish' : 'Publish'}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleCopyLink(doc)}
                    className="p-2 text-slate-500 hover:text-purple-400 border border-slate-800 rounded-lg"
                    title="Copy Link"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="p-2 text-slate-500 hover:text-red-400 border border-slate-800 rounded-lg"
                    title="Delete"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredDocs.length === 0 && (
        <Card className="p-12 text-center">
          <svg className="h-16 w-16 mx-auto mb-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-semibold text-white mb-2">No documents found</h3>
          <p className="text-slate-400 mb-4">Try adjusting your search or filters</p>
          <Button onClick={() => handleOpenModal()}>Create First Document</Button>
        </Card>
      )}

      {/* Create/Edit Document Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {currentDoc ? 'Edit Document' : 'Create New Document'}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-slate-400">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Title *
                  </label>
                  <Input
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Document title"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Category *
                    </label>
                    <select
                      required
                      value={formData.categoryId}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select category</option>
                      {mockKnowledgeCategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Author *
                    </label>
                    <select
                      required
                      value={formData.authorId}
                      onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {mockUsers.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.fullName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Content *
                  </label>
                  <textarea
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Document content (supports markdown)..."
                    rows={12}
                    className="w-full px-3 py-2 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Tags
                  </label>
                  <Input
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="tag1, tag2, tag3"
                  />
                  <p className="text-xs text-slate-400 mt-1">Separate tags with commas</p>
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.status === 'published'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.checked ? 'published' : 'draft' })}
                      className="rounded border-slate-700 text-blue-400 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-slate-300">
                      Publish immediately
                    </span>
                  </label>
                  <p className="text-xs text-slate-400 ml-6">Uncheck to save as draft</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    {currentDoc ? 'Update Document' : 'Create Document'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Document Modal */}
      {showViewModal && currentDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white">{currentDoc.title}</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge status={currentDoc.status === 'published' ? 'success' : 'warning'}>
                      {currentDoc.status}
                    </Badge>
                    <span className="text-sm text-slate-400">
                      {getCategory(currentDoc.categoryId)?.name}
                    </span>
                    <span className="text-sm text-slate-400">
                      • v{currentDoc.version || 1}
                    </span>
                    <span className="text-sm text-slate-400">
                      • {currentDoc.viewsCount} views
                    </span>
                  </div>
                </div>
                <button onClick={() => setShowViewModal(false)} className="text-slate-500 hover:text-slate-400">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="bg-slate-950/50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-6 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{getAuthor(currentDoc.authorId)?.fullName || 'Unknown'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Updated {formatRelativeTime(currentDoc.updatedAt)}</span>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-slate-300 leading-relaxed">
                  {currentDoc.content}
                </div>
              </div>

              {currentDoc.tags && currentDoc.tags.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <div className="flex flex-wrap gap-2">
                    {currentDoc.tags.map((tag: string, idx: number) => (
                      <Badge key={idx} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && currentDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-red-900/20 flex items-center justify-center">
                <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Delete Document</h3>
                <p className="text-sm text-slate-400">
                  Are you sure you want to delete &quot;{currentDoc.title}&quot;? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={confirmDelete} className="flex-1 bg-red-600 hover:bg-red-700">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
