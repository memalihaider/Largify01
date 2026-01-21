'use client';

import { useState, useMemo } from 'react';
import { Card, Button, Input, Badge, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui';
import { mockInvoices, mockClients, mockCompanies } from '@/lib/mock-data';
import { formatCurrency, cn } from '@/lib/utils';
import { generateInvoicePDF } from '@/lib/pdf-templates';

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

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [invoices, setInvoices] = useState(mockInvoices);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<any>(null);
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [clientFilter, setClientFilter] = useState('all');
  const [dateRangeFilter, setDateRangeFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  
  const [formData, setFormData] = useState({
    clientId: '',
    invoiceNumber: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'draft',
    paymentTerms: 'net_30',
    notes: '',
    lineItems: [{ id: '1', description: '', quantity: 1, rate: 0, total: 0 }] as LineItem[],
  });

  const [paymentData, setPaymentData] = useState({
    amount: '',
    paymentMethod: 'bank_transfer',
    paymentDate: new Date().toISOString().split('T')[0],
    reference: '',
  });

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const matchesSearch = 
        invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
      const matchesClient = clientFilter === 'all' || invoice.clientId === clientFilter;
      const matchesPayment = 
        paymentFilter === 'all' ||
        (paymentFilter === 'paid' && invoice.amountPaid >= invoice.total) ||
        (paymentFilter === 'partial' && invoice.amountPaid > 0 && invoice.amountPaid < invoice.total) ||
        (paymentFilter === 'unpaid' && invoice.amountPaid === 0);
      
      let matchesDateRange = true;
      if (dateRangeFilter !== 'all' && invoice.issueDate) {
        const issueDate = new Date(invoice.issueDate);
        const today = new Date();
        const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        if (dateRangeFilter === '30days') matchesDateRange = issueDate >= thirtyDaysAgo;
      }
      
      return matchesSearch && matchesStatus && matchesClient && matchesPayment && matchesDateRange;
    });
  }, [invoices, searchQuery, statusFilter, clientFilter, paymentFilter, dateRangeFilter]);

  const stats = useMemo(() => {
    const totalValue = invoices.reduce((sum, i) => sum + i.total, 0);
    const paidValue = invoices.filter(i => i.amountPaid >= i.total).reduce((sum, i) => sum + i.total, 0);
    const pendingValue = invoices.filter(i => i.status === 'draft' || i.status === 'sent').reduce((sum, i) => sum + i.total, 0);
    const overdueValue = invoices.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.total, 0);
    const totalReceived = invoices.reduce((sum, i) => sum + i.amountPaid, 0);
    const totalOutstanding = invoices.reduce((sum, i) => sum + (i.total - i.amountPaid), 0);
    
    return {
      totalInvoices: invoices.length,
      totalValue,
      paidValue,
      pendingValue,
      overdueValue,
      totalReceived,
      totalOutstanding,
      avgInvoiceValue: invoices.length > 0 ? totalValue / invoices.length : 0,
    };
  }, [invoices]);

  const getClientCompany = (clientId: string) => {
    const client = mockClients.find(c => c.id === clientId);
    return client ? mockCompanies.find(co => co.id === client.companyId) : null;
  };

  const generateInvoiceNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const count = invoices.length + 1;
    return `INV-${year}-${month}-${String(count).padStart(3, '0')}`;
  };

  const calculateLineItemTotal = (quantity: number, rate: number) => {
    return quantity * rate;
  };

  const calculateTotals = (items: LineItem[], amountPaid = 0) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    const balance = total - amountPaid;
    return { subtotal, tax, total, balance };
  };

  const handleOpenModal = (invoice?: any) => {
    if (invoice) {
      setCurrentInvoice(invoice);
      setFormData({
        clientId: invoice.clientId || '',
        invoiceNumber: invoice.invoiceNumber,
        issueDate: invoice.issueDate ? new Date(invoice.issueDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        dueDate: invoice.dueDate ? new Date(invoice.dueDate).toISOString().split('T')[0] : '',
        status: invoice.status,
        paymentTerms: invoice.terms || 'net_30',
        notes: invoice.notes || '',
        lineItems: invoice.items?.map((item: any) => ({
          id: item.id,
          description: item.description,
          quantity: item.quantity,
          rate: item.unitPrice,
          total: item.total,
        })) || [{ id: '1', description: '', quantity: 1, rate: 0, total: 0 }],
      });
    } else {
      setCurrentInvoice(null);
      setFormData({
        clientId: '',
        invoiceNumber: generateInvoiceNumber(),
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'draft',
        paymentTerms: 'net_30',
        notes: '',
        lineItems: [{ id: '1', description: '', quantity: 1, rate: 0, total: 0 }],
      });
    }
    setShowModal(true);
  };

  const handleLineItemChange = (index: number, field: keyof LineItem, value: any) => {
    const newLineItems = [...formData.lineItems];
    newLineItems[index] = { ...newLineItems[index], [field]: value };
    
    if (field === 'quantity' || field === 'rate') {
      newLineItems[index].total = calculateLineItemTotal(
        newLineItems[index].quantity,
        newLineItems[index].rate
      );
    }
    
    setFormData({ ...formData, lineItems: newLineItems });
  };

  const addLineItem = () => {
    setFormData({
      ...formData,
      lineItems: [
        ...formData.lineItems,
        { id: Date.now().toString(), description: '', quantity: 1, rate: 0, total: 0 }
      ]
    });
  };

  const removeLineItem = (index: number) => {
    if (formData.lineItems.length > 1) {
      setFormData({
        ...formData,
        lineItems: formData.lineItems.filter((_, i) => i !== index)
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { subtotal, tax, total } = calculateTotals(formData.lineItems, currentInvoice?.amountPaid || 0);
    
    const invoiceData = {
      id: currentInvoice?.id || `inv-${Date.now()}`,
      invoiceNumber: formData.invoiceNumber,
      clientId: formData.clientId,
      title: formData.lineItems[0]?.description || 'Invoice',
      status: formData.status as any,
      subtotal,
      taxRate: 0.1,
      taxAmount: tax,
      discountAmount: 0,
      total,
      totalAmount: total,
      amountPaid: currentInvoice?.amountPaid || 0,
      currency: 'USD',
      issueDate: new Date(formData.issueDate),
      dueDate: new Date(formData.dueDate),
      terms: formData.paymentTerms,
      createdAt: currentInvoice?.createdAt || new Date(),
    };

    if (currentInvoice) {
      setInvoices(invoices.map(i => i.id === currentInvoice.id ? invoiceData : i));
      alert('Invoice updated successfully!');
    } else {
      setInvoices([invoiceData, ...invoices]);
      alert('Invoice created successfully!');
    }
    setShowModal(false);
  };

  const handleDelete = (invoiceId: string) => {
    setSelectedInvoices([invoiceId]);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setInvoices(invoices.filter(i => !selectedInvoices.includes(i.id)));
    alert(`${selectedInvoices.length} invoice(s) deleted successfully!`);
    setSelectedInvoices([]);
    setShowDeleteConfirm(false);
  };

  const handleStatusChange = (invoiceId: string, newStatus: string) => {
    setInvoices(invoices.map(i => 
      i.id === invoiceId ? { ...i, status: newStatus as any } : i
    ));
    alert(`Invoice marked as ${newStatus}!`);
  };

  const handleOpenPaymentModal = (invoice: any) => {
    setCurrentInvoice(invoice);
    const balance = invoice.total - invoice.amountPaid;
    setPaymentData({
      amount: balance.toString(),
      paymentMethod: 'bank_transfer',
      paymentDate: new Date().toISOString().split('T')[0],
      reference: '',
    });
    setShowPaymentModal(true);
  };

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const paymentAmount = parseFloat(paymentData.amount);
    const newAmountPaid = currentInvoice.amountPaid + paymentAmount;
    const newStatus = newAmountPaid >= currentInvoice.total ? 'paid' : 'partial';
    
    setInvoices(invoices.map(i => 
      i.id === currentInvoice.id 
        ? { ...i, amountPaid: newAmountPaid, status: newStatus as any, paidAt: newStatus === 'paid' ? new Date() : i.paidAt }
        : i
    ));
    
    alert(`Payment of ${formatCurrency(paymentAmount)} recorded successfully!`);
    setShowPaymentModal(false);
  };

  const handleMarkAsPaid = (invoice: any) => {
    setInvoices(invoices.map(i => 
      i.id === invoice.id 
        ? { ...i, amountPaid: i.total, status: 'paid' as any, paidAt: new Date() }
        : i
    ));
    alert('Invoice marked as paid!');
  };

  const handleDownloadPDF = (invoice: any) => {
    try {
      const company = {
        name: 'Largify Solutions Inc.',
        logo: undefined,
        email: 'info@largify.com',
        phone: '+1 (555) 123-4567',
        address: '123 Business Avenue, Tech City, TC 12345, USA',
        website: 'www.largify.com',
      };

      const clientCompany = getClientCompany(invoice.clientId || '');
      const client = {
        name: clientCompany?.name || 'Client Name',
        email: clientCompany?.email || 'client@email.com',
        phone: clientCompany?.phone || '',
        address: clientCompany?.address || '',
      };

      const items = invoice.items && invoice.items.length > 0
        ? invoice.items.map((item: any) => ({
            id: item.id,
            description: item.description,
            quantity: item.quantity,
            rate: item.unitPrice,
            total: item.total,
          }))
        : [];

      const htmlContent = generateInvoicePDF(invoice, company, client, items);

      const opt = {
        margin: 10,
        filename: `${invoice.invoiceNumber}.pdf`,
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

  const handleExport = () => {
    alert('Invoices exported successfully!');
  };

  const toggleSelectInvoice = (invoiceId: string) => {
    setSelectedInvoices(prev =>
      prev.includes(invoiceId) ? prev.filter(id => id !== invoiceId) : [...prev, invoiceId]
    );
  };

  const handleViewDetails = (invoice: any) => {
    setCurrentInvoice(invoice);
    setShowDetailModal(true);
  };

  const { subtotal, tax, total } = calculateTotals(formData.lineItems);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Invoices</h1>
          <p className="text-slate-400">Manage and track all invoices</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </Button>
          <Button onClick={() => handleOpenModal()}>
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Invoice
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-slate-400">Total Invoices</p>
          <p className="text-2xl font-bold text-white">{invoices.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">Paid</p>
          <p className="text-2xl font-bold text-emerald-400">
            {formatCurrency(invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.totalAmount, 0))}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">Pending</p>
          <p className="text-2xl font-bold text-amber-400">
            {formatCurrency(invoices.filter(i => i.status === 'sent').reduce((sum, i) => sum + i.totalAmount, 0))}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">Overdue</p>
          <p className="text-2xl font-bold text-red-400">
            {formatCurrency(invoices.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.totalAmount, 0))}
          </p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {['all', 'draft', 'sent', 'paid', 'overdue'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={cn(
                    'px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors capitalize',
                    statusFilter === status
                      ? 'bg-blue-900/20 text-blue-400'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-800'
                  )}
                >
                  {status === 'all' ? 'All' : status}
                </button>
              ))}
            </div>
          </div>
          {selectedInvoices.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-blue-900/20 rounded-lg">
              <span className="text-sm font-medium text-blue-900">
                {selectedInvoices.length} selected
              </span>
              <div className="flex gap-2 ml-auto">
                <Button size="sm" variant="outline" onClick={() => setShowDeleteConfirm(true)} className="text-red-400">
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Invoices Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  className="rounded border-slate-700"
                  checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedInvoices(filteredInvoices.map(i => i.id));
                    } else {
                      setSelectedInvoices([]);
                    }
                  }}
                />
              </TableHead>
              <TableHead>Invoice #</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => {
              const company = getClientCompany(invoice.clientId || '');
              const balance = invoice.total - invoice.amountPaid;
              return (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      className="rounded border-slate-700"
                      checked={selectedInvoices.includes(invoice.id)}
                      onChange={() => toggleSelectInvoice(invoice.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-white">{invoice.invoiceNumber}</p>
                    <p className="text-sm text-slate-400">{invoice.title}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-white">{company?.name || '-'}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-slate-400">
                      {invoice.issueDate ? new Date(invoice.issueDate).toLocaleDateString() : '-'}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-slate-400">
                      {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : '-'}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-white">{formatCurrency(invoice.total)}</p>
                  </TableCell>
                  <TableCell>
                    <p className={cn(
                      "font-medium",
                      balance > 0 ? "text-red-400" : "text-emerald-400"
                    )}>
                      {formatCurrency(balance)}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge status={invoice.status}>{invoice.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {(invoice.status === 'sent' || invoice.status === 'partial') && (
                        <>
                          <button
                            onClick={() => handleOpenPaymentModal(invoice)}
                            className="p-1 text-slate-500 hover:text-emerald-400"
                            title="Record Payment"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleMarkAsPaid(invoice)}
                            className="p-1 text-slate-500 hover:text-emerald-400"
                            title="Mark as Paid"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                        </>
                      )}
                      {invoice.status === 'draft' && (
                        <button
                          onClick={() => handleStatusChange(invoice.id, 'sent')}
                          className="p-1 text-slate-500 hover:text-blue-400"
                          title="Send Invoice"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={() => handleDownloadPDF(invoice)}
                        className="p-1 text-slate-500 hover:text-purple-400"
                        title="Download PDF"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleOpenModal(invoice)}
                        className="p-1 text-slate-500 hover:text-blue-400"
                        title="Edit"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(invoice.id)}
                        className="p-1 text-slate-500 hover:text-red-400"
                        title="Delete"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {filteredInvoices.length === 0 && (
          <div className="p-8 text-center text-slate-400">
            <svg className="h-12 w-12 mx-auto mb-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>No invoices found matching your criteria</p>
          </div>
        )}
      </Card>

      {/* Invoice Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {currentInvoice ? 'Edit Invoice' : 'New Invoice'}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-slate-400">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Client *
                    </label>
                    <select
                      required
                      value={formData.clientId}
                      onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Client</option>
                      {mockClients.map((client) => {
                        const company = mockCompanies.find(c => c.id === client.companyId);
                        return (
                          <option key={client.id} value={client.id}>
                            {company?.name} ({client.clientCode})
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Invoice Number
                    </label>
                    <Input
                      required
                      value={formData.invoiceNumber}
                      onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                      placeholder="INV-2026-01-001"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Issue Date *
                    </label>
                    <Input
                      type="date"
                      required
                      value={formData.issueDate}
                      onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Due Date *
                    </label>
                    <Input
                      type="date"
                      required
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Payment Terms *
                    </label>
                    <select
                      required
                      value={formData.paymentTerms}
                      onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="net_15">Net 15</option>
                      <option value="net_30">Net 30</option>
                      <option value="net_60">Net 60</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Status *
                    </label>
                    <select
                      required
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="draft">Draft</option>
                      <option value="sent">Sent</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Line Items *
                    </label>
                    <Button type="button" size="sm" onClick={addLineItem}>
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Item
                    </Button>
                  </div>
                  <div className="space-y-3 border border-slate-800 rounded-lg p-4">
                    {formData.lineItems.map((item, index) => (
                      <div key={item.id} className="grid grid-cols-12 gap-3 items-start">
                        <div className="col-span-5">
                          <Input
                            required
                            placeholder="Description"
                            value={item.description}
                            onChange={(e) => handleLineItemChange(index, 'description', e.target.value)}
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            required
                            min="1"
                            placeholder="Qty"
                            value={item.quantity}
                            onChange={(e) => handleLineItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            placeholder="Rate"
                            value={item.rate}
                            onChange={(e) => handleLineItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            disabled
                            value={formatCurrency(item.total)}
                            className="bg-slate-950/50"
                          />
                        </div>
                        <div className="col-span-1">
                          <button
                            type="button"
                            onClick={() => removeLineItem(index)}
                            disabled={formData.lineItems.length === 1}
                            className="p-2 text-slate-500 hover:text-red-400 disabled:opacity-30"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950/50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-400">Subtotal:</span>
                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-400">Tax (10%):</span>
                    <span className="font-medium">{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-800">
                    <span className="font-semibold text-white">Total:</span>
                    <span className="font-bold text-lg">{formatCurrency(total)}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    {currentInvoice ? 'Update Invoice' : 'Create Invoice'}
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

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Record Payment</h2>
              <button onClick={() => setShowPaymentModal(false)} className="text-slate-500 hover:text-slate-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div>
                <p className="text-sm text-slate-400 mb-2">
                  Invoice: <span className="font-medium text-white">{currentInvoice?.invoiceNumber}</span>
                </p>
                <p className="text-sm text-slate-400 mb-2">
                  Total Amount: <span className="font-medium text-white">{formatCurrency(currentInvoice?.total || 0)}</span>
                </p>
                <p className="text-sm text-slate-400 mb-4">
                  Amount Paid: <span className="font-medium text-white">{formatCurrency(currentInvoice?.amountPaid || 0)}</span>
                </p>
                <p className="text-sm font-medium text-red-400">
                  Balance Due: {formatCurrency((currentInvoice?.total || 0) - (currentInvoice?.amountPaid || 0))}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Payment Amount *
                </label>
                <Input
                  type="number"
                  required
                  min="0.01"
                  step="0.01"
                  value={paymentData.amount}
                  onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Payment Date *
                </label>
                <Input
                  type="date"
                  required
                  value={paymentData.paymentDate}
                  onChange={(e) => setPaymentData({ ...paymentData, paymentDate: e.target.value })}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  Record Payment
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowPaymentModal(false)}>
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
                <h3 className="text-lg font-semibold text-white">Delete Invoice{selectedInvoices.length > 1 ? 's' : ''}</h3>
                <p className="text-sm text-slate-400">
                  Are you sure you want to delete {selectedInvoices.length} invoice{selectedInvoices.length > 1 ? 's' : ''}? This action cannot be undone.
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
