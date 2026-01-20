'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { mockClientUsers, mockClientProjects, mockProjects, mockClientTaskTracking, mockTasks } from '@/lib/mock-data';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    clientId: string;
  }>;
}

export default function ClientLayout({ children, params }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { clientId } = use(params);
  const client = mockClientUsers.find(c => c.id === clientId);

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Client Not Found</h1>
          <Link href="/login" className="text-green-600 hover:text-green-700 underline">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  const navigation = [
    { name: 'Dashboard', href: `/client/${clientId}`, icon: '📊' },
    { name: 'My Projects', href: `/client/${clientId}/projects`, icon: '📁' },
    { name: 'Applications', href: `/client/${clientId}/applications`, icon: '📋' },
    { name: 'Tasks', href: `/client/${clientId}/tasks`, icon: '✓' },
    { name: 'Messages', href: `/client/${clientId}/messages`, icon: '💬' },
  ];

  // Get client's projects and tasks count
  const clientProjectCount = mockClientProjects.filter(cp => cp.clientId === clientId).length;
  const clientTaskCount = mockClientTaskTracking.filter(ct => ct.clientId === clientId).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Largify Client Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{client.name}</p>
              <p className="text-xs text-gray-500">{client.companyName}</p>
            </div>
            <img
              src={client.logoUrl}
              alt={client.name}
              className="h-10 w-10 rounded-full"
            />
            <Link
              href="/login"
              className="ml-4 text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Logout
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-0'
          } bg-gray-900 text-white overflow-hidden transition-all duration-300 lg:w-64`}
        >
          <div className="p-6 space-y-8 h-screen overflow-y-auto">
            {/* Logo Section */}
            <div>
              <h2 className="text-lg font-bold text-green-400">LARGIFY</h2>
              <p className="text-xs text-gray-400 mt-1">Client Portal</p>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm"
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Quick Stats */}
            <div className="pt-8 border-t border-gray-800 space-y-3">
              <p className="text-xs font-semibold text-gray-400 uppercase">Quick Stats</p>
              <div className="space-y-2">
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Active Projects</p>
                  <p className="text-2xl font-bold text-green-400">{clientProjectCount}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Tracked Tasks</p>
                  <p className="text-2xl font-bold text-green-400">{clientTaskCount}</p>
                </div>
              </div>
            </div>

            {/* Logout */}
            <div className="pt-8 border-t border-gray-800">
              <Link
                href="/login"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-900 transition-colors text-sm text-red-400 hover:text-red-300 w-full"
              >
                <span>🚪</span>
                <span>Logout</span>
              </Link>
            </div>

            {/* Footer */}
            <div className="pt-8 border-t border-gray-800 text-xs text-gray-400 space-y-2">
              <p>Need help? Contact support</p>
              <p>support@largify.com</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300`}>
          {children}
        </main>
      </div>
    </div>
  );
}
