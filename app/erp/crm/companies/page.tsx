'use client';

import { useState, useMemo } from 'react';
import { Card, Button, Input } from '@/components/ui';
import { mockCompanies, mockContacts } from '@/lib/mock-data';
import { formatRelativeTime } from '@/lib/utils';
import { Company } from '@/lib/types';

const statusOptions = ['active', 'inactive', 'prospect'];
const sizeOptions = ['small', 'medium', 'large', 'enterprise'];
const industryOptions = [
  'Technology', 'Healthcare', 'Manufacturing', 'Financial Services',
  'Education', 'Retail', 'Logistics', 'Construction', 'Real Estate',
  'Hospitality', 'Energy', 'Telecommunications'
];

export default function CompaniesPage() {
  const [companies, setCompanies] = useState(mockCompanies);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentCompany, setCurrentCompany] = useState<any>(null);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    website: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    status: 'active',
    annualRevenue: '',
    employeeCount: '',
    foundedYear: '',
  });

  // Advanced filtering with useMemo
  const filteredCompanies = useMemo(() => {
    let filtered = companies;

    // Search by company name, industry, email, location
    if (searchQuery) {
      filtered = filtered.filter(c =>
        c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.industry?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.city?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    // Industry filter
    if (industryFilter !== 'all') {
      filtered = filtered.filter(c => c.industry === industryFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'created') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'revenue') {
        return (b.annualRevenue || 0) - (a.annualRevenue || 0);
      }
      return 0;
    });

    return filtered;
  }, [companies, searchQuery, statusFilter, industryFilter, sortBy]);

  // Statistics
  const stats = useMemo(() => ({
    total: companies.length,
    active: companies.filter(c => c.status === 'active').length,
    prospect: companies.filter(c => c.status === 'prospect').length,
    totalRevenue: companies.reduce((sum, c) => sum + (c.annualRevenue || 0), 0),
    avgRevenue: companies.length > 0 ? companies.reduce((sum, c) => sum + (c.annualRevenue || 0), 0) / companies.length : 0,
  }), [companies]);

  const handleOpenModal = (company?: any) => {
    if (company) {
      setCurrentCompany(company);
      setFormData({
        name: company.name || '',
        industry: company.industry || '',
        website: company.website || '',
        email: company.email || '',
        phone: company.phone || '',
        address: company.address || '',
        city: company.city || '',
        country: company.country || '',
        status: company.status || 'active',
        annualRevenue: company.annualRevenue?.toString() || '',
        employeeCount: company.employeeCount?.toString() || '',
        foundedYear: company.foundedYear?.toString() || '',
      });
    } else {
      setCurrentCompany(null);
      setFormData({
        name: '',
        industry: '',
        website: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        status: 'active',
        annualRevenue: '',
        employeeCount: '',
        foundedYear: '',
      });
    }
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentCompany) {
      setCompanies(companies.map(c =>
        c.id === currentCompany.id
          ? {
              ...c,
              name: formData.name,
              industry: formData.industry,
              website: formData.website,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
              city: formData.city,
              country: formData.country,
              status: formData.status as 'active' | 'inactive' | 'prospect' | undefined,
              annualRevenue: parseFloat(formData.annualRevenue) || 0,
              employeeCount: parseInt(formData.employeeCount) || 0,
              foundedYear: parseInt(formData.foundedYear) || new Date().getFullYear(),
              updatedAt: new Date(),
            }
          : c
      ));
    } else {
      const newCompany: any = {
        id: `comp-${Date.now()}`,
        companyCode: `CMP-${companies.length + 1}`,
        name: formData.name,
        industry: formData.industry,
        website: formData.website,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        status: formData.status,
        annualRevenue: parseFloat(formData.annualRevenue) || 0,
        employeeCount: parseInt(formData.employeeCount) || 0,
        foundedYear: parseInt(formData.foundedYear) || new Date().getFullYear(),
        size: 'small',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setCompanies([newCompany, ...companies]);
    }
    setShowModal(false);
  };

  const handleDelete = (companyId: string) => {
    setCurrentCompany(companies.find(c => c.id === companyId));
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setCompanies(companies.filter(c => c.id !== currentCompany.id));
    setShowDeleteConfirm(false);
    setCurrentCompany(null);
  };

  const toggleSelectCompany = (companyId: string) => {
    setSelectedCompanies(prev =>
      prev.includes(companyId) ? prev.filter(id => id !== companyId) : [...prev, companyId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-900/20 text-green-800';
      case 'prospect': return 'bg-amber-900/20 text-yellow-800';
      case 'inactive': return 'bg-slate-800 text-slate-400';
      default: return 'bg-slate-800 text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Companies</h1>
          <p className="text-slate-400">Manage company profiles and business relationships</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </Button>
          <Button onClick={() => handleOpenModal()}>
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Company
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <p className="text-sm text-slate-400">Total Companies</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
          <p className="text-xs text-slate-500 mt-2">{filteredCompanies.length} filtered</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">Active</p>
          <p className="text-2xl font-bold text-emerald-400">{stats.active}</p>
          <p className="text-xs text-slate-500 mt-2">{Math.round((stats.active / stats.total) * 100)}% of total</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">Prospects</p>
          <p className="text-2xl font-bold text-amber-400">{stats.prospect}</p>
          <p className="text-xs text-slate-500 mt-2">Pipeline</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">Total Revenue</p>
          <p className="text-2xl font-bold text-blue-400">${(stats.totalRevenue / 1000000).toFixed(1)}M</p>
          <p className="text-xs text-slate-500 mt-2">Annual</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">Avg Revenue</p>
          <p className="text-2xl font-bold text-purple-400">${(stats.avgRevenue / 1000000).toFixed(1)}M</p>
          <p className="text-xs text-slate-500 mt-2">Per company</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search by name, industry, email, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-900"
            >
              <option value="created">Newest First</option>
              <option value="name">Name A-Z</option>
              <option value="revenue">Highest Revenue</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="text-sm text-slate-400 font-medium py-1.5 px-2">Status:</div>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                statusFilter === 'all'
                  ? 'bg-blue-900/20 text-blue-400'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              All
            </button>
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors capitalize ${
                  statusFilter === status
                    ? 'bg-blue-900/20 text-blue-400'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div>
            <label className="text-xs font-medium text-slate-400 mb-2 block">Industry</label>
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-900"
            >
              <option value="all">All Industries</option>
              {industryOptions.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Companies Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-slate-950/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider w-12">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCompanies(filteredCompanies.map(c => c.id));
                      } else {
                        setSelectedCompanies([]);
                      }
                    }}
                    checked={selectedCompanies.length === filteredCompanies.length && filteredCompanies.length > 0}
                    className="rounded border-slate-700"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Industry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider w-20">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-900 divide-y divide-gray-200">
              {filteredCompanies.map((company) => (
                <tr key={company.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedCompanies.includes(company.id)}
                      onChange={() => toggleSelectCompany(company.id)}
                      className="rounded border-slate-700"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        {company.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-white">{company.name}</p>
                        {company.email && (
                          <p className="text-xs text-slate-400">{company.email}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                    {company.industry}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                    {company.city}, {company.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    ${((company.annualRevenue || 0) / 1000000) > 0 ? `${((company.annualRevenue || 0) / 1000000).toFixed(1)}M` : '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center font-medium rounded-full capitalize px-2.5 py-1 text-xs ${getStatusColor(company.status || 'active')}`}>
                      {company.status || 'active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                    {formatRelativeTime(company.updatedAt || company.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleOpenModal(company)}
                        className="p-1.5 text-slate-500 hover:text-blue-400 hover:bg-blue-900/20 rounded"
                        title="Edit"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(company.id)}
                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-900/20 rounded"
                        title="Delete"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-slate-800 text-xs text-slate-400">
          Showing {filteredCompanies.length} of {companies.length} companies
        </div>
      </Card>

      {/* Company Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {currentCompany ? 'Edit Company' : 'Add New Company'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-slate-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-6">
              {/* Company Info Section */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Company Information</h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">
                        Company Name *
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Acme Corporation"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">
                        Industry *
                      </label>
                      <select
                        required
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Industry</option>
                        {industryOptions.map((industry) => (
                          <option key={industry} value={industry}>
                            {industry}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">
                        Website
                      </label>
                      <Input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info Section */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="contact@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">
                        Phone
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Address
                    </label>
                    <Input
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="123 Business Street"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">
                        City
                      </label>
                      <Input
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="San Francisco"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">
                        Country
                      </label>
                      <Input
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="USA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">
                        Founded Year
                      </label>
                      <Input
                        type="number"
                        value={formData.foundedYear}
                        onChange={(e) => setFormData({ ...formData, foundedYear: e.target.value })}
                        placeholder={new Date().getFullYear().toString()}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Details Section */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Business Details</h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">
                        Annual Revenue ($)
                      </label>
                      <Input
                        type="number"
                        value={formData.annualRevenue}
                        onChange={(e) => setFormData({ ...formData, annualRevenue: e.target.value })}
                        placeholder="5000000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">
                        Employee Count
                      </label>
                      <Input
                        type="number"
                        value={formData.employeeCount}
                        onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                        placeholder="150"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-800">
                <Button type="submit" className="flex-1">
                  {currentCompany ? 'Update Company' : 'Create Company'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-red-900/20 flex items-center justify-center">
                <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Delete Company</h3>
                <p className="text-sm text-slate-400">
                  Are you sure you want to delete {currentCompany?.name}? This action cannot be undone.
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
