'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, Badge, Button, Input, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui';
import { mockCMSServices, mockClients, mockProjects } from '@/lib/mock-data';
import { formatCurrency, cn } from '@/lib/utils';

interface Service {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  category?: string;
  iconType?: string;
  price?: number;
  features?: string[];
  benefits?: string[];
  imageUrl?: string;
  isPublished: boolean;
  isFeatured: boolean;
  orderIndex?: number;
  usedInProjects?: number;
  usedByClients?: number;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

type ViewMode = 'table' | 'grid';
type SortField = 'title' | 'orderIndex' | 'createdAt' | 'usedInProjects';
type SortOrder = 'asc' | 'desc';

export default function ServicesManagementPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPublished, setFilterPublished] = useState<'all' | 'published' | 'draft'>('all');
  const [sortField, setSortField] = useState<SortField>('orderIndex');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [services, setServices] = useState<Service[]>(
    mockCMSServices.map(s => ({
      ...s,
      shortDescription: s.description.substring(0, 100) + '...',
      category: 'Standard',
      price: Math.floor(Math.random() * 50000) + 5000,
      benefits: [
        'Increased efficiency',
        'Cost reduction',
        'Better integration',
        'Scalable solution'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      isFeatured: Math.random() > 0.6,
      usedInProjects: Math.floor(Math.random() * 50) + 1,
      usedByClients: Math.floor(Math.random() * 30) + 1,
    }))
  );

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    category: 'Standard',
    iconType: 'settings',
    price: '',
    features: [] as string[],
    benefits: [] as string[],
    isPublished: false,
    isFeatured: false,
  });

  // Filtering and sorting
  const filteredServices = useMemo(() => {
    let filtered = services.filter(service => {
      const matchesSearch = 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPublished = filterPublished === 'all' ? true : 
        filterPublished === 'published' ? service.isPublished :
        !service.isPublished;
      return matchesSearch && matchesPublished;
    });

    filtered.sort((a, b) => {
      let aVal = a[sortField] ?? '';
      let bVal = b[sortField] ?? '';
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  }, [services, searchQuery, filterPublished, sortField, sortOrder]);

  const stats = useMemo(() => {
    return {
      total: services.length,
      published: services.filter(s => s.isPublished).length,
      draft: services.filter(s => !s.isPublished).length,
      featured: services.filter(s => s.isFeatured).length,
      totalValue: services.reduce((sum, s) => sum + (s.price || 0), 0),
      totalClients: services.reduce((sum, s) => sum + (s.usedByClients || 0), 0),
    };
  }, [services]);

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setCurrentService(service);
      setFormData({
        title: service.title,
        description: service.description,
        shortDescription: service.shortDescription || '',
        category: service.category || 'Standard',
        iconType: service.iconType || 'settings',
        price: service.price?.toString() || '',
        features: service.features || [],
        benefits: service.benefits || [],
        isPublished: service.isPublished,
        isFeatured: service.isFeatured,
      });
    } else {
      setCurrentService(null);
      setFormData({
        title: '',
        description: '',
        shortDescription: '',
        category: 'Standard',
        iconType: 'settings',
        price: '',
        features: [],
        benefits: [],
        isPublished: false,
        isFeatured: false,
      });
    }
    setShowModal(true);
  };

  const handleSaveService = () => {
    if (currentService) {
      setServices(services.map(s => 
        s.id === currentService.id 
          ? {
              ...s,
              title: formData.title,
              description: formData.description,
              shortDescription: formData.shortDescription,
              category: formData.category,
              iconType: formData.iconType,
              price: formData.price ? parseInt(formData.price) : undefined,
              features: formData.features,
              benefits: formData.benefits,
              isPublished: formData.isPublished,
              isFeatured: formData.isFeatured,
              updatedAt: new Date(),
            }
          : s
      ));
    } else {
      const newService: Service = {
        id: `svc-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        shortDescription: formData.shortDescription,
        category: formData.category,
        iconType: formData.iconType,
        price: formData.price ? parseInt(formData.price) : undefined,
        features: formData.features,
        benefits: formData.benefits,
        isPublished: formData.isPublished,
        isFeatured: formData.isFeatured,
        orderIndex: services.length + 1,
        usedInProjects: 0,
        usedByClients: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setServices([...services, newService]);
    }
    setShowModal(false);
  };

  const handleDeleteServices = () => {
    setServices(services.filter(s => !selectedServices.includes(s.id)));
    setSelectedServices([]);
    setShowDeleteConfirm(false);
  };

  const toggleSelectService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Services Management</h1>
          <p className="text-slate-400 mt-1">Manage all available services across your platform</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700">
          + Add New Service
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-slate-400">Total Services</p>
          <p className="text-3xl font-bold text-white mt-2">{stats.total}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-slate-400">Published</p>
          <p className="text-3xl font-bold text-emerald-400 mt-2">{stats.published}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-slate-400">Featured</p>
          <p className="text-3xl font-bold text-purple-400 mt-2">{stats.featured}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-slate-400">Total Portfolio Value</p>
          <p className="text-3xl font-bold text-blue-400 mt-2">{formatCurrency(stats.totalValue)}</p>
        </Card>
      </div>

      {/* Controls */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Input 
            placeholder="Search services..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select 
            value={filterPublished} 
            onChange={(e) => setFilterPublished(e.target.value as any)}
            className="px-3 py-2 border border-slate-700 rounded-lg text-sm"
          >
            <option value="all">All Services</option>
            <option value="published">Published Only</option>
            <option value="draft">Drafts Only</option>
          </select>
          <div className="flex gap-2">
            <button 
              onClick={() => setViewMode('table')}
              className={cn('flex-1 px-3 py-2 rounded-lg text-sm font-medium', 
                viewMode === 'table' ? 'bg-blue-900/20 text-blue-400' : 'bg-slate-800 text-slate-300'
              )}
            >
              Table View
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={cn('flex-1 px-3 py-2 rounded-lg text-sm font-medium', 
                viewMode === 'grid' ? 'bg-blue-900/20 text-blue-400' : 'bg-slate-800 text-slate-300'
              )}
            >
              Grid View
            </button>
          </div>
        </div>

        {selectedServices.length > 0 && (
          <div className="flex items-center justify-between pt-4 border-t">
            <p className="text-sm text-slate-400">{selectedServices.length} selected</p>
            <button 
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-900/20 text-red-400 hover:bg-red-900/20 rounded-lg text-sm font-medium"
            >
              Delete Selected
            </button>
          </div>
        )}
      </Card>

      {/* Table View */}
      {viewMode === 'table' && (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input 
                    type="checkbox" 
                    checked={selectedServices.length === filteredServices.length && filteredServices.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedServices(filteredServices.map(s => s.id));
                      } else {
                        setSelectedServices([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead 
                  onClick={() => setSortField('title')}
                  className="cursor-pointer hover:bg-slate-950/50"
                >
                  Title {sortField === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Used in Projects</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <input 
                      type="checkbox"
                      checked={selectedServices.includes(service.id)}
                      onChange={() => toggleSelectService(service.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-white cursor-pointer hover:text-blue-400" 
                        onClick={() => { setCurrentService(service); setShowDetailModal(true); }}
                      >
                        {service.title}
                      </p>
                      <p className="text-xs text-slate-400">{service.shortDescription}</p>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="info">{service.category}</Badge></TableCell>
                  <TableCell>{service.price ? formatCurrency(service.price) : '-'}</TableCell>
                  <TableCell>{service.usedInProjects} projects</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Badge variant={service.isPublished ? 'success' : 'secondary'}>
                        {service.isPublished ? 'Published' : 'Draft'}
                      </Badge>
                      {service.isFeatured && <Badge variant="warning">Featured</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleOpenModal(service)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-400 hover:bg-red-900/20"
                        onClick={() => setServices(services.filter(s => s.id !== service.id))}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-linear-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white flex-1">{service.title}</h3>
                  {service.isFeatured && <Badge variant="warning" className="ml-2">★</Badge>}
                </div>
                <p className="text-sm text-slate-400 mb-4">{service.shortDescription}</p>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-slate-400">Category</p>
                    <p className="font-medium text-white">{service.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Price</p>
                    <p className="font-medium text-blue-400">{service.price ? formatCurrency(service.price) : '-'}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4 text-xs text-slate-400">
                  <span>{service.usedInProjects} projects</span>
                  <span>{service.usedByClients} clients</span>
                </div>
                <Badge variant={service.isPublished ? 'success' : 'secondary'} className="mb-4 block">
                  {service.isPublished ? 'Published' : 'Draft'}
                </Badge>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                    onClick={() => handleOpenModal(service)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-400 hover:bg-red-900/20"
                    onClick={() => setServices(services.filter(s => s.id !== service.id))}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
            <div className="p-8 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                {currentService ? '✎ Edit Service' : '+ Create New Service'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-300">
                ✕
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSaveService(); }} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Service Title *</label>
                <Input 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Custom ERP Implementation"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Description *</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Detailed description of the service"
                  rows={4}
                  required
                  className="w-full px-4 py-2 border border-slate-700 rounded-lg text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-700 rounded-lg text-sm"
                  >
                    <option>Standard</option>
                    <option>Premium</option>
                    <option>Enterprise</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Price</label>
                  <Input 
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="e.g., 50000"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center">
                  <input 
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                    className="rounded"
                  />
                  <span className="ml-2 text-sm text-white">Publish Service</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                    className="rounded"
                  />
                  <span className="ml-2 text-sm text-white">Featured</span>
                </label>
              </div>

              <div className="flex gap-3 pt-6 border-t">
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  {currentService ? 'Update Service' : 'Create Service'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Delete Services?</h3>
            <p className="text-slate-400 mb-6">This will delete {selectedServices.length} service(s). This action cannot be undone.</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleDeleteServices} className="flex-1 bg-red-600 hover:bg-red-700">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
