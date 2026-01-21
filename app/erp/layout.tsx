'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, Badge } from '@/components/ui';
import { mockUsers, mockNotifications } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const navigation = [
  {
    name: 'Dashboard',
    href: '/erp',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: 'CRM',
    href: '/erp/crm',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    children: [
      { name: 'Leads', href: '/erp/crm/leads' },
      { name: 'Clients', href: '/erp/crm/clients' },
      { name: 'Companies', href: '/erp/crm/companies' },
      { name: 'Pipeline', href: '/erp/crm/pipeline' },
    ],
  },
  {
    name: 'Projects',
    href: '/erp/projects',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    children: [
      { name: 'All Projects', href: '/erp/projects' },
      { name: 'Tasks', href: '/erp/projects/tasks' },
      { name: 'Calendar', href: '/erp/projects/calendar' },
    ],
  },
  {
    name: 'Team',
    href: '/erp/team',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    children: [
      { name: 'Directory', href: '/erp/team' },
      { name: 'Leave Management', href: '/erp/team/leave' },
      { name: 'Attendance', href: '/erp/team/attendance' },
    ],
  },
  {
    name: 'Finance',
    href: '/erp/finance',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    children: [
      { name: 'Overview', href: '/erp/finance' },
      { name: 'Quotations', href: '/erp/finance/quotations' },
      { name: 'Invoices', href: '/erp/finance/invoices' },
      { name: 'Expenses', href: '/erp/finance/expenses' },
    ],
  },
  {
    name: 'Knowledge Base',
    href: '/erp/knowledge',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    name: 'Content Management',
    href: '/erp/cms',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    name: 'Bookings',
    href: '/erp/bookings',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Settings',
    href: '/erp/settings',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const currentUser = mockUsers[0];
const unreadNotifications = mockNotifications.filter(n => !n.isRead).length;

export default function ERPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['CRM', 'Projects', 'Finance']);

  const toggleExpanded = (name: string) => {
    if (isSidebarCollapsed) {
      setIsSidebarCollapsed(false);
      if (!expandedItems.includes(name)) {
        setExpandedItems(prev => [...prev, name]);
      }
      return;
    }
    setExpandedItems(prev =>
      prev.includes(name)
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  const isActive = (href: string) => {
    if (href === '/erp') {
      return pathname === '/erp';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-slate-950/50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-800 transform transition-transform duration-300 ease-in-out lg:hidden',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800">
          <Link href="/erp" className="flex items-center">
            <span className="text-xl font-bold text-blue-500">Largify</span>
            <Badge variant="outline" className="ml-2 text-xs border-blue-500/50 text-blue-400">ERP</Badge>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-slate-400 hover:text-white"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <SidebarContent
          navigation={navigation}
          pathname={pathname}
          expandedItems={expandedItems}
          toggleExpanded={toggleExpanded}
          isActive={isActive}
          isCollapsed={false}
        />
      </div>

      {/* Desktop sidebar */}
      <div className={cn(
        "hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col transition-all duration-300 ease-in-out",
        isSidebarCollapsed ? "lg:w-20" : "lg:w-64"
      )}>
        <div className="flex flex-col flex-1 min-h-0 bg-slate-950 border-r border-slate-800">
          <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800">
            {!isSidebarCollapsed && (
              <Link href="/erp" className="flex items-center animate-in fade-in duration-300">
                <span className="text-xl font-bold text-blue-500 tracking-tighter">Largify</span>
                <Badge variant="outline" className="ml-2 text-[10px] py-0 border-blue-500/50 text-blue-400">SYSTEM</Badge>
              </Link>
            )}
            {isSidebarCollapsed && (
              <div className="flex justify-center w-full animate-in zoom-in duration-300">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <span className="text-white font-black text-xs">L</span>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="absolute -right-3 top-20 h-6 w-6 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white z-50 shadow-xl shadow-black/50 transition-transform duration-300 hover:scale-110"
            >
              <svg className={cn("h-4 w-4 transition-transform duration-300", isSidebarCollapsed ? "rotate-0" : "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <SidebarContent
            navigation={navigation}
            pathname={pathname}
            expandedItems={expandedItems}
            toggleExpanded={toggleExpanded}
            isActive={isActive}
            isCollapsed={isSidebarCollapsed}
          />
        </div>
      </div>

      {/* Main content */}
      <div className={cn(
        "flex flex-col min-h-screen bg-slate-950 transition-all duration-300 ease-in-out",
        isSidebarCollapsed ? "lg:pl-20" : "lg:pl-64"
      )}>
        {/* Top header */}
        <header className="sticky top-0 z-30 flex items-center h-16 px-6 bg-slate-950/40 backdrop-blur-xl border-b border-white/5 gap-6">
          {/* Mobile menu button */}
          <button
            className="lg:hidden text-slate-400 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Breadcrumbs / Page Title */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
            <span className="text-slate-500">ROOT</span>
            <span className="text-slate-800">/</span>
            <span className="text-blue-500/80">{pathname.split('/').pop()?.toUpperCase() || 'DASHBOARD'}</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md ml-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/5 rounded-xl blur-md group-focus-within:bg-blue-500/10 transition-all duration-500" />
              <div className="relative flex items-center">
                <svg
                  className="absolute left-4 h-4 w-4 text-slate-500 group-focus-within:text-blue-400 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="search"
                  placeholder="Execute command or search..."
                  className="w-full pl-11 pr-4 py-2.5 text-xs bg-slate-900/40 border border-slate-800/50 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all font-mono"
                />
                <div className="absolute right-3 flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-800 bg-slate-950/50 text-[10px] text-slate-600 font-mono">
                  <span>⌘</span>
                  <span>K</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-5">
            {/* System Status */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className="text-[10px] font-black text-emerald-500/80 uppercase tracking-widest">System Optimal</span>
            </div>

            {/* Notifications */}
            <button className="relative p-2.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10 group">
              <svg className="h-5 w-5 transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadNotifications > 0 && (
                <span className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
                </span>
              )}
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-5 border-l border-slate-800/50">
              <div className="hidden md:block text-right">
                <p className="text-[11px] font-black text-white uppercase tracking-wider">{currentUser?.fullName || 'Root Admin'}</p>
                <p className="text-[10px] text-blue-500/70 font-bold uppercase tracking-widest">{currentUser?.role?.name || 'Superuser'}</p>
              </div>
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Avatar
                  src={currentUser?.avatarUrl}
                  alt={currentUser?.fullName || 'User'}
                  fallback={(currentUser?.fullName || 'U').split(' ').map(n => n[0]).join('').substring(0, 2)}
                  size="md"
                  className="relative border border-white/10 group-hover:border-blue-500/50 transition-colors"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarContent({
  navigation,
  pathname,
  expandedItems,
  toggleExpanded,
  isActive,
  isCollapsed,
}: {
  navigation: Array<{
    name: string;
    href: string;
    icon: React.ReactElement;
    children?: Array<{ name: string; href: string }>;
  }>;
  pathname: string;
  expandedItems: string[];
  toggleExpanded: (name: string) => void;
  isActive: (href: string) => boolean;
  isCollapsed: boolean;
}) {
  return (
    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-hide">
      {navigation.map((item) => (
        <div key={item.name}>
          {item.children ? (
            <>
              <button
                onClick={() => toggleExpanded(item.name)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-3 text-sm font-medium rounded-xl transition-all duration-300',
                  isActive(item.href)
                    ? 'bg-blue-600/10 text-blue-400 shadow-[inset_0_0_12px_rgba(59,130,246,0.1)] border border-blue-500/10'
                    : 'text-slate-400 hover:bg-slate-900/80 hover:text-white border border-transparent'
                )}
                title={isCollapsed ? item.name : ''}
              >
                <div className="flex items-center gap-4">
                  <span className={cn(
                    'transition-all duration-300 flex-shrink-0',
                    isActive(item.href) ? 'text-blue-500 scale-110' : 'text-slate-500 group-hover:text-slate-300'
                  )}>
                    {item.icon}
                  </span>
                  {!isCollapsed && <span className="animate-in fade-in slide-in-from-left-2 duration-300">{item.name}</span>}
                </div>
                {!isCollapsed && (
                  <svg
                    className={cn(
                      'h-4 w-4 transition-transform duration-300 text-slate-600',
                      expandedItems.includes(item.name) ? 'rotate-180 text-blue-500' : ''
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
              {!isCollapsed && expandedItems.includes(item.name) && (
                <div className="ml-9 mt-2 space-y-1.5 border-l-2 border-slate-800/50 pl-4 animate-in slide-in-from-top-2 duration-300">
                  {item.children.map((child: { name: string; href: string }) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        'block px-3 py-2 text-xs rounded-lg transition-all duration-300',
                        pathname === child.href
                          ? 'text-blue-400 font-bold bg-blue-500/5'
                          : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                      )}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <Link
              href={item.href}
              className={cn(
                'flex items-center gap-4 px-3 py-3 text-sm font-medium rounded-xl transition-all duration-300',
                isActive(item.href)
                  ? 'bg-blue-600/10 text-blue-400 shadow-[inset_0_0_12px_rgba(59,130,246,0.1)] border border-blue-500/10'
                  : 'text-slate-400 hover:bg-slate-900/80 hover:text-white border border-transparent'
              )}
              title={isCollapsed ? item.name : ''}
            >
              <span className={cn(
                'transition-all duration-300 flex-shrink-0',
                isActive(item.href) ? 'text-blue-400 scale-110' : 'text-slate-500 group-hover:text-slate-300'
              )}>
                {item.icon}
              </span>
              {!isCollapsed && <span className="animate-in fade-in slide-in-from-left-2 duration-300">{item.name}</span>}
              {!isCollapsed && isActive(item.href) && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              )}
            </Link>
          )}
        </div>
      ))}
      
      {/* Logout Button */}
      <div className="pt-6 border-t border-slate-800/50 mt-6 mx-2">
        <Link
          href="/2365653214"
          className={cn(
            "flex items-center gap-4 px-4 py-3 text-sm font-medium text-slate-500 hover:text-red-400 hover:bg-red-900/10 rounded-xl transition-all duration-300 group",
            isCollapsed ? "justify-center px-0" : ""
          )}
          title={isCollapsed ? "Logout" : ""}
        >
          <span className="text-xl transition-transform duration-300 group-hover:-translate-x-1">🚪</span>
          {!isCollapsed && <span className="animate-in fade-in duration-300">Terminate Session</span>}
        </Link>
      </div>
    </nav>
  );
}
