'use client';

import { useState, useMemo } from 'react';
import { Card, Button, Input, Badge, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui';
import { mockQuotations, mockClients, mockCompanies } from '@/lib/mock-data';
import { formatCurrency, cn } from '@/lib/utils';
import { generateQuotationPDF } from '@/lib/pdf-templates';

// @ts-ignore - html2pdf.js doesn't have TypeScript definitions and uses 'self' which is not available in SSR
let html2pdf: any = null;
if (typeof window !== 'undefined') {
  html2pdf = require('html2pdf.js');
}

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  total: number;
}

export default function QuotationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [quotations, setQuotations] = useState(mockQuotations);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentQuotation, setCurrentQuotation] = useState<any>(null);
  const [selectedQuotations, setSelectedQuotations] = useState<string[]>([]);
  const [clientFilter, setClientFilter] = useState('all');
  const [dateRangeFilter, setDateRangeFilter] = useState('all');
  const [formData, setFormData] = useState({
    clientId: '',
    quotationNumber: '',
    issueDate: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'draft',
    termsConditions: '50% upfront, 50% on completion. Net 30 payment terms.',
    lineItems: [{ id: '1', description: '', quantity: 1, rate: 0, total: 0 }] as LineItem[],
  });

  const filteredQuotations = useMemo(() => {
    return quotations.filter((quote) => {
      const matchesSearch = 
        quote.quotationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quote.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
      const matchesClient = clientFilter === 'all' || quote.clientId === clientFilter || quote.leadId === clientFilter;
      
      let matchesDateRange = true;
      if (dateRangeFilter !== 'all' && quote.issueDate) {
        const issueDate = new Date(quote.issueDate);
        const today = new Date();
        const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        if (dateRangeFilter === '30days') matchesDateRange = issueDate >= thirtyDaysAgo;
      }
      return matchesSearch && matchesStatus && matchesClient && matchesDateRange;
    });
  }, [quotations, searchQuery, statusFilter, clientFilter, dateRangeFilter]);

  const stats = useMemo(() => {
    const totalValue = quotations.reduce((sum, q) => sum + q.total, 0);
    const sentValue = quotations.filter(q => q.status === 'sent').reduce((sum, q) => sum + q.total, 0);
    const acceptedValue = quotations.filter(q => q.status === 'accepted').reduce((sum, q) => sum + q.total, 0);
    const acceptedCount = quotations.filter(q => q.status === 'accepted').length;
    const pendingCount = quotations.filter(q => q.status === 'sent').length;
    const conversionRate = quotations.length > 0 ? Math.round((acceptedCount / quotations.length) * 100) : 0;
    const avgQuotationValue = quotations.length > 0 ? totalValue / quotations.length : 0;
    return { totalValue, sentValue, acceptedValue, acceptedCount, pendingCount, conversionRate, avgQuotationValue, totalQuotations: quotations.length };
  }, [quotations]);

  const generateQuotationNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const count = quotations.length + 1;
    return `QT-${year}-${month}-${String(count).padStart(3, '0')}`;
  };

  const calculateLineItemTotal = (quantity: number, rate: number) => quantity * rate;
  const calculateTotals = (items: LineItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.1;
    return { subtotal, tax, total: subtotal + tax };
  };

  const handleOpenModal = (quotation?: any) => {
    if (quotation) {
      setCurrentQuotation(quotation);
      setFormData({
        clientId: quotation.clientId || quotation.leadId || '',
        quotationNumber: quotation.quotationNumber,
        issueDate: quotation.issueDate ? new Date(quotation.issueDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        validUntil: quotation.validUntil ? new Date(quotation.validUntil).toISOString().split('T')[0] : '',
        status: quotation.status,
        termsConditions: quotation.termsConditions || '',
        lineItems: quotation.items?.map((item: any) => ({
          id: item.id,
          description: item.description,
          quantity: item.quantity,
          rate: item.unitPrice,
          total: item.total,
        })) || [{ id: '1', description: '', quantity: 1, rate: 0, total: 0 }],
      });
    } else {
      setCurrentQuotation(null);
      setFormData({
        clientId: '',
        quotationNumber: generateQuotationNumber(),
        issueDate: new Date().toISOString().split('T')[0],
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'draft',
        termsConditions: '50% upfront, 50% on completion. Net 30 payment terms.',
        lineItems: [{ id: '1', description: '', quantity: 1, rate: 0, total: 0 }],
      });
    }
    setShowModal(true);
  };

  const handleLineItemChange = (index: number, field: keyof LineItem, value: any) => {
    const newLineItems = [...formData.lineItems];
    newLineItems[index] = { ...newLineItems[index], [field]: value };
    if (field === 'quantity' || field === 'rate') {
      newLineItems[index].total = calculateLineItemTotal(newLineItems[index].quantity, newLineItems[index].rate);
    }
    setFormData({ ...formData, lineItems: newLineItems });
  };

  const addLineItem = () => {
    setFormData({
      ...formData,
      lineItems: [...formData.lineItems, { id: Date.now().toString(), description: '', quantity: 1, rate: 0, total: 0 }]
    });
  };

  const removeLineItem = (index: number) => {
    if (formData.lineItems.length > 1) {
      setFormData({ ...formData, lineItems: formData.lineItems.filter((_: any, i: number) => i !== index) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { subtotal, tax, total } = calculateTotals(formData.lineItems);
    
    const quotationData = {
      id: currentQuotation?.id || `quot-${Date.now()}`,
      quotationNumber: formData.quotationNumber,
      clientId: formData.clientId,
      leadId: formData.clientId,
      title: formData.lineItems[0]?.description || 'Quotation',
      description: formData.lineItems.map((i: any) => i.description).join(', '),
      status: formData.status as any,
      subtotal,
      taxRate: 0.1,
      taxAmount: tax,
      discountAmount: 0,
      total,
      currency: 'USD',
      issueDate: new Date(formData.issueDate),
      validUntil: new Date(formData.validUntil),
      termsConditions: formData.termsConditions,
      items: formData.lineItems.map((item: LineItem, idx: number) => ({
        id: item.id,
        quotationId: currentQuotation?.id || `quot-${Date.now()}`,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.rate,
        total: item.total,
        orderIndex: idx,
      })),
      createdAt: currentQuotation?.createdAt || new Date(),
    };

    if (currentQuotation) {
      setQuotations(quotations.map(q => q.id === currentQuotation.id ? quotationData : q));
    } else {
      setQuotations([quotationData, ...quotations]);
    }
    setShowModal(false);
  };

  const handleStatusChange = (quotationId: string, newStatus: string) => {
    setQuotations(quotations.map(q => q.id === quotationId ? { ...q, status: newStatus as any } : q));
  };

  const handleExport = () => alert('Quotations exported successfully!');

  const handleDownloadPDF = (quotation: any) => {
    try {
      const company = {
        name: quotation.companyName || 'Largify Solutions Inc.',
        logo: quotation.companyLogo,
        email: quotation.companyEmail || 'info@largify.com',
        phone: quotation.companyPhone || '+1 (555) 123-4567',
        address: quotation.companyAddress || '123 Business Avenue, Tech City, TC 12345, USA',
        website: quotation.companyWebsite || 'www.largify.com',
      };

      const clientCompany = getClientCompany(quotation.leadId || quotation.clientId || '');
      const client = {
        name: clientCompany?.name || 'Client Name',
        email: clientCompany?.email || 'client@email.com',
        phone: clientCompany?.phone || '',
        address: clientCompany?.address || '',
      };

      const items = quotation.items && quotation.items.length > 0 
        ? quotation.items.map((item: any) => ({
            id: item.id,
            description: item.description,
            quantity: item.quantity,
            rate: item.unitPrice,
            total: item.total,
          }))
        : [];

      const htmlContent = generateQuotationPDF(quotation, company, client, items);
      
      const opt = {
        margin: 10,
        filename: `${quotation.quotationNumber}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
      };

      html2pdf().set(opt).from(htmlContent).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const toggleSelectQuotation = (quotationId: string) => {
    setSelectedQuotations(prev => prev.includes(quotationId) ? prev.filter(id => id !== quotationId) : [...prev, quotationId]);
  };

  const getClientCompany = (clientId: string) => {
    const client = mockClients.find(c => c.id === clientId);
    return client ? mockCompanies.find(co => co.id === client.companyId) : null;
  };

  const handleViewDetails = (quotation: any) => {
    setCurrentQuotation(quotation);
    setShowDetailModal(true);
  };

  const confirmDelete = () => {
    setQuotations(quotations.filter(q => !selectedQuotations.includes(q.id)));
    setSelectedQuotations([]);
    setShowDeleteConfirm(false);
  };

  const { subtotal, tax, total } = calculateTotals(formData.lineItems);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Quotations</h1>
          <p className="text-slate-400">Advanced quotation management system</p>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-1 bg-slate-800 rounded-lg p-1">
            <button onClick={() => setViewMode('table')} className={cn('px-3 py-1.5 rounded text-sm font-medium', viewMode === 'table' ? 'bg-slate-900 text-blue-400 shadow-sm' : 'text-slate-400')}>Table</button>
            <button onClick={() => setViewMode('grid')} className={cn('px-3 py-1.5 rounded text-sm font-medium', viewMode === 'grid' ? 'bg-slate-900 text-blue-400 shadow-sm' : 'text-slate-400')}>Grid</button>
          </div>
          <Button variant="outline" onClick={handleExport}>Export</Button>
          <Button onClick={() => handleOpenModal()}>New Quotation</Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6"><p className="text-sm text-slate-400">Total Value</p><p className="text-2xl font-bold text-white mt-2">{formatCurrency(stats.totalValue)}</p><p className="text-xs text-slate-400 mt-1">{stats.totalQuotations} quotations</p></Card>
        <Card className="p-6"><p className="text-sm text-slate-400">Pending</p><p className="text-2xl font-bold text-amber-400 mt-2">{formatCurrency(stats.sentValue)}</p><p className="text-xs text-slate-400 mt-1">{stats.pendingCount} awaiting</p></Card>
        <Card className="p-6"><p className="text-sm text-slate-400">Accepted</p><p className="text-2xl font-bold text-emerald-400 mt-2">{formatCurrency(stats.acceptedValue)}</p><p className="text-xs text-slate-400 mt-1">{stats.acceptedCount} conversions</p></Card>
        <Card className="p-6"><p className="text-sm text-slate-400">Conversion Rate</p><p className="text-2xl font-bold text-purple-400 mt-2">{stats.conversionRate}%</p><p className="text-xs text-slate-400 mt-1">Avg: {formatCurrency(stats.avgQuotationValue)}</p></Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input placeholder="Search quotations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <select value={clientFilter} onChange={(e) => setClientFilter(e.target.value)} className="px-3 py-2 border border-slate-700 rounded-lg text-sm">
            <option value="all">All Clients</option>
            {mockClients.map(client => (<option key={client.id} value={client.id}>{mockCompanies.find(c => c.id === client.companyId)?.name}</option>))}
          </select>
          <select value={dateRangeFilter} onChange={(e) => setDateRangeFilter(e.target.value)} className="px-3 py-2 border border-slate-700 rounded-lg text-sm">
            <option value="all">All Dates</option>
            <option value="30days">Last 30 Days</option>
          </select>
          <div className="flex gap-2 overflow-x-auto">
            {['all', 'draft', 'sent', 'accepted', 'rejected'].map((status) => (<button key={status} onClick={() => setStatusFilter(status)} className={cn('px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap', statusFilter === status ? 'bg-blue-900/20 text-blue-400' : 'bg-slate-800 text-slate-400')}>{status}</button>))}
          </div>
        </div>
      </Card>

      {/* Table View */}
      {viewMode === 'table' && (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quotation #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuotations.map((quote) => {
                const company = getClientCompany(quote.leadId || quote.clientId || '');
                return (
                  <TableRow key={quote.id}>
                    <TableCell><p className="font-medium text-blue-400 cursor-pointer hover:underline" onClick={() => handleViewDetails(quote)}>{quote.quotationNumber}</p></TableCell>
                    <TableCell><p>{company?.name || '-'}</p></TableCell>
                    <TableCell><p className="text-slate-400">{quote.issueDate ? new Date(quote.issueDate).toLocaleDateString() : '-'}</p></TableCell>
                    <TableCell><p className="text-slate-400">{quote.validUntil ? new Date(quote.validUntil).toLocaleDateString() : '-'}</p></TableCell>
                    <TableCell><p className="font-semibold">{formatCurrency(quote.total)}</p></TableCell>
                    <TableCell><Badge status={quote.status}>{quote.status}</Badge></TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <button onClick={() => handleViewDetails(quote)} className="text-blue-400 hover:text-blue-800" title="View"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button>
                        <button onClick={() => handleOpenModal(quote)} className="text-slate-400 hover:text-slate-400" title="Edit"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                        {quote.status === 'draft' && <button onClick={() => handleStatusChange(quote.id, 'sent')} className="text-emerald-400 hover:text-green-800" title="Send"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg></button>}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuotations.map((quote) => {
            const company = getClientCompany(quote.leadId || quote.clientId || '');
            return (
              <Card key={quote.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleViewDetails(quote)}>
                <div className="flex justify-between items-start mb-4">
                  <div><h3 className="font-semibold text-white">{quote.quotationNumber}</h3><p className="text-sm text-slate-400">{quote.title}</p></div>
                  <Badge status={quote.status}>{quote.status}</Badge>
                </div>
                <div className="mb-3"><p className="text-sm text-slate-400">Client</p><p className="font-medium">{company?.name || '-'}</p></div>
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div><p className="text-slate-400">Issue Date</p><p className="font-medium">{quote.issueDate ? new Date(quote.issueDate).toLocaleDateString() : '-'}</p></div>
                  <div><p className="text-slate-400">Valid Until</p><p className="font-medium">{quote.validUntil ? new Date(quote.validUntil).toLocaleDateString() : '-'}</p></div>
                </div>
                <div className="pt-4 border-t"><p className="text-2xl font-bold text-blue-400">{formatCurrency(quote.total)}</p></div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Advanced Detail Modal with Company Branding */}
      {showDetailModal && currentQuotation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-xl max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
            {/* Header with Company Logo */}
            <div className="bg-linear-to-r from-blue-50 to-blue-100 p-8 border-b border-blue-200">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-6 flex-1">
                  {currentQuotation.companyLogo || getClientCompany(currentQuotation.leadId || currentQuotation.clientId)?.logoUrl ? (
                    <div className="bg-slate-900 p-3 rounded-lg shadow-sm">
                      <img 
                        src={currentQuotation.companyLogo || getClientCompany(currentQuotation.leadId || currentQuotation.clientId)?.logoUrl} 
                        alt="Company Logo" 
                        className="h-16 w-16 object-contain"
                      />
                    </div>
                  ) : (
                    <div className="bg-slate-900 p-3 rounded-lg shadow-sm flex items-center justify-center h-16 w-16">
                      <svg className="h-8 w-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m0 0h5" /></svg>
                    </div>
                  )}
                  <div className="flex-1">
                    <div>
                      <p className="text-sm text-blue-400 font-medium">Quotation</p>
                      <h1 className="text-3xl font-bold text-white">{currentQuotation.quotationNumber}</h1>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-400">Company</p>
                        <p className="font-semibold text-white">{currentQuotation.companyName || getClientCompany(currentQuotation.leadId || currentQuotation.clientId)?.name || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Status</p>
                        <Badge status={currentQuotation.status}>{currentQuotation.status}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={() => setShowDetailModal(false)} className="text-slate-400 hover:text-slate-300 p-2">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            {/* Company Details Section */}
            <div className="p-8 border-b border-slate-800">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase">Email</p>
                  <p className="text-sm text-white font-medium mt-1">{currentQuotation.companyEmail || getClientCompany(currentQuotation.leadId || currentQuotation.clientId)?.email || '-'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase">Phone</p>
                  <p className="text-sm text-white font-medium mt-1">{currentQuotation.companyPhone || getClientCompany(currentQuotation.leadId || currentQuotation.clientId)?.phone || '-'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase">Website</p>
                  <p className="text-sm text-blue-400 font-medium mt-1">{currentQuotation.companyWebsite || getClientCompany(currentQuotation.leadId || currentQuotation.clientId)?.website || '-'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase">Industry</p>
                  <p className="text-sm text-white font-medium mt-1">{getClientCompany(currentQuotation.leadId || currentQuotation.clientId)?.industry || '-'}</p>
                </div>
              </div>
            </div>

            {/* Quotation Details */}
            <div className="p-8">
              <div className="grid grid-cols-4 gap-4 mb-8 pb-8 border-b">
                <div>
                  <p className="text-xs text-slate-400 font-medium">Issue Date</p>
                  <p className="text-lg font-semibold text-white mt-1">{currentQuotation.issueDate ? new Date(currentQuotation.issueDate).toLocaleDateString() : '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Valid Until</p>
                  <p className="text-lg font-semibold text-white mt-1">{currentQuotation.validUntil ? new Date(currentQuotation.validUntil).toLocaleDateString() : '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Client Contact</p>
                  <p className="text-lg font-semibold text-white mt-1">{getClientCompany(currentQuotation.leadId || currentQuotation.clientId)?.name || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Currency</p>
                  <p className="text-lg font-semibold text-white mt-1">{currentQuotation.currency}</p>
                </div>
              </div>

              {/* Line Items Table */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Line Items</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-950/50">
                        <th className="text-left py-3 px-4 font-semibold text-slate-300">Description</th>
                        <th className="text-right py-3 px-4 font-semibold text-slate-300">Qty</th>
                        <th className="text-right py-3 px-4 font-semibold text-slate-300">Unit Price</th>
                        <th className="text-right py-3 px-4 font-semibold text-slate-300">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentQuotation.items?.map((item: any) => (
                        <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-950/50">
                          <td className="py-3 px-4 text-white">{item.description}</td>
                          <td className="text-right py-3 px-4 text-slate-400">{item.quantity}</td>
                          <td className="text-right py-3 px-4 text-slate-400">{formatCurrency(item.unitPrice)}</td>
                          <td className="text-right py-3 px-4 font-semibold text-white">{formatCurrency(item.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Financial Summary */}
              <div className="grid grid-cols-3 gap-6">
                <div></div>
                <div></div>
                <div className="bg-linear-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b border-blue-200">
                      <p className="text-slate-300">Subtotal</p>
                      <p className="font-semibold text-white">{formatCurrency(currentQuotation.subtotal)}</p>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-blue-200">
                      <p className="text-slate-300">Tax ({currentQuotation.taxRate * 100}%)</p>
                      <p className="font-semibold text-white">{formatCurrency(currentQuotation.taxAmount)}</p>
                    </div>
                    {currentQuotation.discountAmount > 0 && (
                      <div className="flex justify-between items-center pb-3 border-b border-blue-200">
                        <p className="text-slate-300">Discount</p>
                        <p className="font-semibold text-white">-{formatCurrency(currentQuotation.discountAmount)}</p>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2">
                      <p className="text-lg font-bold text-white">Total Amount</p>
                      <p className="text-3xl font-bold text-blue-400">{formatCurrency(currentQuotation.total)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              {currentQuotation.termsConditions && (
                <div className="mt-8 pt-8 border-t border-slate-800">
                  <h3 className="text-lg font-semibold text-white mb-3">Terms & Conditions</h3>
                  <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                    <p className="text-sm text-slate-300 whitespace-pre-wrap">{currentQuotation.termsConditions}</p>
                  </div>
                </div>
              )}

              {/* Company Address */}
              {currentQuotation.companyAddress && (
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <h3 className="text-lg font-semibold text-white mb-3">Address</h3>
                  <p className="text-slate-400">{currentQuotation.companyAddress}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="p-8 bg-slate-950/50 border-t border-slate-800 flex gap-3 sticky bottom-0">
              <Button onClick={() => { setShowDetailModal(false); handleOpenModal(currentQuotation); }} className="flex-1 bg-blue-600 hover:bg-blue-700">
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                Edit Quotation
              </Button>
              <Button onClick={() => alert('Quotation sent to ' + (getClientCompany(currentQuotation.leadId || currentQuotation.clientId)?.email || 'client'))} variant="secondary" className="flex-1">
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                Send
              </Button>
              <Button onClick={() => handleDownloadPDF(currentQuotation)} variant="outline" className="flex-1">
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download PDF
              </Button>
              <Button onClick={() => setShowDetailModal(false)} variant="outline">Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Quotation Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-xl max-w-5xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="bg-linear-to-r from-blue-50 to-blue-100 px-8 py-6 border-b border-blue-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">{currentQuotation ? '✎ Edit Quotation' : '+ Create New Quotation'}</h2>
                <p className="text-sm text-slate-400 mt-1">Manage your quotation details and pricing</p>
              </div>
              <button type="button" onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-300 p-2 bg-slate-900 rounded-lg">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Section 1: Client & Basic Info */}
              <div className="border-b pb-8">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                  <span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm mr-3">1</span>
                  Client & Quotation Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-white mb-2">📋 Select Client *</label>
                    <select value={formData.clientId} onChange={(e) => setFormData({ ...formData, clientId: e.target.value })} required className="w-full px-4 py-2.5 border-2 border-slate-700 rounded-lg text-sm focus:border-blue-500 focus:outline-none bg-slate-900 hover:border-gray-400 transition">
                      <option value="">Choose a client...</option>
                      {mockClients.map(c => <option key={c.id} value={c.id}>{mockCompanies.find(co => co.id === c.companyId)?.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">🏷️ Quotation # *</label>
                    <Input value={formData.quotationNumber} onChange={(e) => setFormData({ ...formData, quotationNumber: e.target.value })} placeholder="QUO-2025-001" required className="border-2" />
                  </div>
                </div>
              </div>

              {/* Section 2: Dates & Status */}
              <div className="border-b pb-8">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                  <span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm mr-3">2</span>
                  Dates & Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">📅 Issue Date *</label>
                    <Input type="date" value={formData.issueDate} onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })} required className="border-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">⏰ Valid Until *</label>
                    <Input type="date" value={formData.validUntil} onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })} required className="border-2" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-white mb-2">📊 Status *</label>
                    <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2.5 border-2 border-slate-700 rounded-lg text-sm focus:border-blue-500 focus:outline-none bg-slate-900">
                      <option value="draft">📝 Draft</option>
                      <option value="sent">✉️ Sent</option>
                      <option value="accepted">✅ Accepted</option>
                      <option value="rejected">❌ Rejected</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Line Items */}
              <div className="border-b pb-8">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                  <span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm mr-3">3</span>
                  Line Items
                </h3>
                
                {/* Table Header */}
                <div className="mb-3">
                  <div className="grid grid-cols-12 gap-3 px-4 py-3 bg-slate-800 rounded-lg border border-slate-800">
                    <div className="col-span-6 text-xs font-bold text-slate-300">DESCRIPTION</div>
                    <div className="col-span-2 text-xs font-bold text-slate-300 text-right">QTY</div>
                    <div className="col-span-2 text-xs font-bold text-slate-300 text-right">RATE</div>
                    <div className="col-span-1 text-xs font-bold text-slate-300 text-right">ACTION</div>
                  </div>
                </div>

                {/* Line Items */}
                <div className="space-y-3 mb-4">
                  {formData.lineItems.map((item, idx) => (
                    <div key={item.id} className="grid grid-cols-12 gap-3 items-center p-4 border border-slate-800 rounded-lg hover:bg-slate-950/50 transition">
                      <div className="col-span-6">
                        <Input 
                          placeholder="e.g., Web Development, Design Services" 
                          value={item.description} 
                          onChange={(e) => handleLineItemChange(idx, 'description', e.target.value)} 
                          className="border-slate-700"
                        />
                      </div>
                      <div className="col-span-2">
                        <Input 
                          type="number" 
                          min="1"
                          placeholder="Qty" 
                          value={item.quantity} 
                          onChange={(e) => handleLineItemChange(idx, 'quantity', parseFloat(e.target.value) || 0)} 
                          className="border-slate-700 text-right"
                        />
                      </div>
                      <div className="col-span-2">
                        <Input 
                          type="number" 
                          min="0"
                          step="0.01"
                          placeholder="Rate" 
                          value={item.rate} 
                          onChange={(e) => handleLineItemChange(idx, 'rate', parseFloat(e.target.value) || 0)} 
                          className="border-slate-700 text-right"
                        />
                      </div>
                      <div className="col-span-1 text-right">
                        <div className="font-semibold text-blue-400">{formatCurrency(item.total)}</div>
                        {formData.lineItems.length > 1 && (
                          <button 
                            type="button" 
                            onClick={() => removeLineItem(idx)} 
                            className="text-red-500 hover:text-red-700 text-sm mt-1 block mx-auto"
                            title="Remove item"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Item Button */}
                <Button type="button" size="sm" onClick={addLineItem} variant="outline" className="border-dashed border-2 w-full text-slate-400 hover:text-white">
                  + Add Line Item
                </Button>
              </div>

              {/* Section 4: Financial Summary */}
              <div className="border-b pb-8">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                  <span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm mr-3">4</span>
                  Financial Summary
                </h3>
                <div className="bg-linear-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-slate-300">
                      <span className="text-sm">Subtotal:</span>
                      <span className="text-lg font-semibold">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span className="text-sm">Tax (10%):</span>
                      <span className="text-lg font-semibold text-orange-600">{formatCurrency(tax)}</span>
                    </div>
                    <div className="border-t-2 border-blue-200 pt-3 flex justify-between items-center">
                      <span className="text-base font-bold text-white">Total Amount:</span>
                      <span className="text-3xl font-bold text-blue-400">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5: Terms & Conditions */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                  <span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm mr-3">5</span>
                  Terms & Conditions
                </h3>
                <label className="block text-sm font-semibold text-white mb-2">Terms Details</label>
                <textarea 
                  rows={3} 
                  value={formData.termsConditions} 
                  onChange={(e) => setFormData({ ...formData, termsConditions: e.target.value })} 
                  placeholder="e.g., 50% upfront, 50% on completion. Net 30 payment terms."
                  className="w-full px-4 py-2.5 border-2 border-slate-700 rounded-lg text-sm focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t">
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 text-base font-semibold rounded-lg">
                  {currentQuotation ? '💾 Update Quotation' : '✓ Create Quotation'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1 py-3 text-base font-semibold rounded-lg">
                  ✕ Cancel
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
            <h3 className="text-lg font-semibold mb-2">Delete Quotation(s)?</h3>
            <p className="text-slate-400 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} className="flex-1">Cancel</Button>
              <Button onClick={confirmDelete} className="flex-1 bg-red-600 hover:bg-red-700">Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
