'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, StatCard, Badge, Button } from '@/components/ui';
import { mockInvoices, mockPayments, mockExpenses, mockQuotations } from '@/lib/mock-data';
import { formatCurrency, cn } from '@/lib/utils';
import Link from 'next/link';

interface Transaction {
  id: string;
  type: 'payment' | 'expense';
  description: string;
  amount: number;
  timestamp: Date;
  category?: string;
}

export default function FinancePage() {
  const [liveTransactions, setLiveTransactions] = useState<Transaction[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Initialize transactions from mock data
  useEffect(() => {
    const initialTransactions: Transaction[] = [
      ...mockPayments.map(p => ({
        id: p.id,
        type: 'payment' as const,
        description: `Payment Received - Invoice #${mockInvoices.find(i => i.id === p.invoiceId)?.invoiceNumber || 'N/A'}`,
        amount: p.amount,
        timestamp: new Date(p.paymentDate),
        category: 'payment',
      })),
      ...mockExpenses.map(e => ({
        id: e.id,
        type: 'expense' as const,
        description: e.description,
        amount: e.amount,
        timestamp: new Date(e.expenseDate),
        category: e.category,
      })),
    ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    setLiveTransactions(initialTransactions);
  }, []);

  // Simulate real-time data updates
  useEffect(() => {
    if (!autoRefresh || !isLive) return;

    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Simulate random transaction activity
      const isPayment = Math.random() > 0.5;
      const randomAmount = Math.floor(Math.random() * 10000) + 1000;

      const newTransaction: Transaction = {
        id: `txn-${Date.now()}`,
        type: isPayment ? 'payment' : 'expense',
        description: isPayment 
          ? `Payment Received - Invoice #${Math.floor(Math.random() * 1000)}`
          : 'New Expense Added',
        amount: randomAmount,
        timestamp: new Date(),
        category: isPayment ? 'payment' : ['office', 'travel', 'software', 'utilities'][Math.floor(Math.random() * 4)],
      };

      setLiveTransactions(prev => [newTransaction, ...prev.slice(0, 14)]);
    }, 8000); // Update every 8 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, isLive]);

  // Calculations with real-time data
  const stats = useMemo(() => {
    const totalRevenue = liveTransactions
      .filter(t => t.type === 'payment')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = liveTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const pendingInvoices = mockInvoices.filter(i => i.status === 'sent' || i.status === 'overdue');
    const pendingAmount = pendingInvoices.reduce((sum, i) => sum + i.totalAmount, 0);
    const pendingQuotes = mockQuotations.filter(q => q.status === 'sent');

    return {
      totalRevenue,
      totalExpenses,
      netProfit: totalRevenue - totalExpenses,
      pendingAmount,
      pendingInvoices,
      pendingQuotes,
      overdueInvoices: mockInvoices.filter(i => i.status === 'overdue'),
      pendingExpenses: mockExpenses.filter(e => e.status === 'pending'),
    };
  }, [liveTransactions]);

  // Monthly data for chart (mock)
  const monthlyData = [
    { month: 'Jan', revenue: 45000, expenses: 12000 },
    { month: 'Feb', revenue: 52000, expenses: 15000 },
    { month: 'Mar', revenue: 48000, expenses: 11000 },
    { month: 'Apr', revenue: 61000, expenses: 14000 },
    { month: 'May', revenue: 55000, expenses: 13000 },
    { month: 'Jun', revenue: 67000, expenses: 16000 },
  ];

  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  return (
    <div className="space-y-6">
      {/* Header with Real-time Status */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Finance Overview</h1>
          <p className="text-slate-400">Real-time financial performance and metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 rounded-lg">
            <div className={cn(
              'h-2 w-2 rounded-full animate-pulse',
              isLive ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-600'
            )} />
            <span className="text-sm font-medium text-slate-300">
              {isLive ? 'Live' : 'Offline'}
            </span>
          </div>
          <Button
            size="sm"
            variant={autoRefresh ? 'secondary' : 'outline'}
            onClick={() => setAutoRefresh(!autoRefresh)}
            className="flex gap-2"
          >
            <svg className={cn('h-4 w-4', autoRefresh && 'animate-spin')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {autoRefresh ? 'Auto' : 'Manual'}
          </Button>
        </div>
      </div>

      {/* Live Update Indicator */}
      <Card className="p-4 bg-blue-500/10 border border-blue-500/20">
        <p className="text-sm text-blue-400">
          <strong>Last Update:</strong> {lastUpdate.toLocaleTimeString('en-US')} • 
          <strong className="ml-2">Live Transactions:</strong> {liveTransactions.length}
        </p>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          trend={12}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          iconColor="green"
        />
        <StatCard
          title="Pending Invoices"
          value={formatCurrency(stats.pendingAmount)}
          subtitle={`${stats.pendingInvoices.length} invoices`}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
          iconColor="yellow"
        />
        <StatCard
          title="Total Expenses"
          value={formatCurrency(stats.totalExpenses)}
          trend={-5}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          iconColor="red"
        />
        <StatCard
          title="Net Profit"
          value={formatCurrency(stats.netProfit)}
          trend={8}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
          iconColor="blue"
        />
      </div>

      {/* Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Revenue vs Expenses</h2>
        <div className="space-y-4">
          {monthlyData.map((item) => (
            <div key={item.month} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-300">{item.month}</span>
                <div className="flex gap-4">
                  <span className="text-emerald-400 font-semibold">{formatCurrency(item.revenue)}</span>
                  <span className="text-red-400 font-semibold">{formatCurrency(item.expenses)}</span>
                </div>
              </div>
              <div className="flex gap-2 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="bg-green-900/200 rounded-full"
                  style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Live Transaction Stream */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Live Transaction Stream</h2>
            <p className="text-sm text-slate-400">Real-time payments and expenses</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-900/200 animate-pulse" />
            <span className="text-xs font-medium text-slate-400">Streaming</span>
          </div>
        </div>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {liveTransactions.length === 0 ? (
            <p className="text-center text-slate-400 py-8">No transactions yet</p>
          ) : (
            liveTransactions.map((txn) => (
              <div
                key={txn.id}
                className="p-3 bg-linear-to-r from-gray-50 to-gray-100 rounded-lg border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className={cn(
                    'h-10 w-10 rounded-full flex items-center justify-center',
                    txn.type === 'payment' 
                      ? 'bg-emerald-900/20' 
                      : 'bg-red-900/20'
                  )}>
                    {txn.type === 'payment' ? (
                      <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-6" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 5l3-3m0 0l3 3m-3-3v6" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{txn.description}</p>
                    <p className="text-xs text-slate-400">
                      {txn.timestamp.toLocaleTimeString('en-US')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn(
                    'text-sm font-semibold',
                    txn.type === 'payment' 
                      ? 'text-emerald-400' 
                      : 'text-red-400'
                  )}>
                    {txn.type === 'payment' ? '+' : '-'}{formatCurrency(txn.amount)}
                  </p>
                  {txn.category && (
                    <Badge variant="default" className="text-xs mt-1">{txn.category}</Badge>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Invoices Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-slate-300 mb-2">Pending Quotations</h3>
          <p className="text-2xl font-bold text-white">{stats.pendingQuotes.length}</p>
          <p className="text-xs text-slate-400 mt-2">
            Value: {formatCurrency(stats.pendingQuotes.reduce((sum, q) => sum + (q.total || 0), 0))}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-slate-300 mb-2">Overdue Invoices</h3>
          <p className="text-2xl font-bold text-red-400">{stats.overdueInvoices.length}</p>
          <p className="text-xs text-slate-400 mt-2">
            Amount: {formatCurrency(stats.overdueInvoices.reduce((sum, i) => sum + (i.total || i.totalAmount || 0), 0))}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-slate-300 mb-2">Pending Expenses</h3>
          <p className="text-2xl font-bold text-orange-600">{stats.pendingExpenses.filter(e => e.status === 'pending').length}</p>
          <p className="text-xs text-slate-400 mt-2">
            Awaiting approval
          </p>
        </Card>
      </div>
    </div>
  );
}
