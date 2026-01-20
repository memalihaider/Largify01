'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TopBar } from '@/components/ui/TopBar';
import { mockClientUsers } from '@/lib/mock-data';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    clientId: string;
  }>;
}

export default function ClientLayout({ children, params }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { clientId } = use(params);
  const pathname = usePathname();
  const client = mockClientUsers.find(c => c.id === clientId);

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
        <div className="w-full max-w-md p-8 bg-slate-900 border border-white/10 rounded-3xl text-center">
          <div className="h-16 w-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
             <span className="text-3xl">🚫</span>
          </div>
          <h1 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">ACCESS DENIED</h1>
          <p className="text-slate-400 mb-8 text-sm italic">UNAUTHORIZED ENTITY DETECTED. SECURITY PROTOCOLS IN EFFECT.</p>
          <Link href="/login" className="block w-full py-4 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-all">
            RETURN TO LOGIN
          </Link>
        </div>
      </div>
    );
  }

  const navigation = [
    { name: 'Mission Control', href: `/client/${clientId}`, icon: '📊' },
    { name: 'Active Builds', href: `/client/${clientId}/projects`, icon: '🛠️' },
    { name: 'Applications', href: `/client/${clientId}/applications`, icon: '📄' },
    { name: 'Infrastructure', href: `/client/${clientId}/tasks`, icon: '🏗️' },
    { name: 'Messaging', href: `/client/${clientId}/messages`, icon: '🛰️' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500/30 flex flex-col">
      {/* Top Bar */}
      <TopBar
        userName={client.name}
        userRole="Client"
        profileLink={`/client/${clientId}/profile`}
        theme="cyan"
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      {/* Background Infrastructure Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-125 h-125 bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-cyan-500/5 rounded-full blur-[100px]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="flex relative z-10 min-h-screen h-screen">
        {/* Sidebar - Development & Security Vibe */}
        <aside
          className={`${
            sidebarOpen ? 'w-72' : 'w-0'
          } bg-slate-900/40 backdrop-blur-3xl border-r border-white/5 flex flex-col transition-all duration-500 lg:w-72 relative overflow-hidden shrink-0 group`}
        >
          {/* Top Decorative bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-600 via-cyan-400 to-transparent opacity-50" />
          
          <div className="p-8 flex flex-col h-full">
            {/* Branding - Unified Development Hub */}
            <div className="mb-12">
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 bg-linear-to-br from-slate-800 to-slate-950 border border-white/10 rounded-xl flex items-center justify-center shadow-2xl relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <div className="absolute inset-0 bg-linear-to-tr from-blue-600/20 to-transparent" />
                  <span className="text-white font-black text-2xl relative z-10 italic">L</span>
                </div>
                <div>
                  <h2 className="text-xl font-black text-white tracking-tighter leading-none">LARGIFY</h2>
                  <p className="text-[9px] font-black text-blue-500 uppercase tracking-[0.3em] mt-1.5 opacity-80 decoration-cyan-400/50 underline underline-offset-4">DEV-SEC ENGINE</p>
                </div>
              </div>
            </div>

            {/* Client Entity Status */}
            <div className="mb-10 p-5 bg-white/5 border border-white/5 rounded-3xl relative overflow-hidden group/card shadow-2xl">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full blur-xl transition-all group-hover/card:bg-blue-500/20" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="h-12 w-12 rounded-2xl bg-slate-800 border border-white/10 p-2 transform transition-transform group-hover/card:rotate-6">
                  <img src={client.logoUrl} alt={client.name} className="h-full w-full rounded-xl object-contain opacity-80 brightness-150" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black text-white truncate uppercase tracking-widest">{client.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                    <p className="text-[10px] text-slate-500 font-bold truncate uppercase tracking-tighter">Partner Secure</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation - Strategic Links */}
            <nav className="flex-1 space-y-2.5">
              <p className="px-4 text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] mb-5">OPERATIONAL VECTOR</p>
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl group/link transition-all duration-300 border ${
                      isActive 
                        ? 'bg-blue-600/10 border-blue-500/30 text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)]' 
                        : 'bg-transparent border-transparent hover:bg-white/5 text-slate-400 hover:text-white hover:translate-x-1'
                    }`}
                  >
                    <span className={`text-xl transition-all duration-300 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]' : 'group-hover/link:scale-125 opacity-70 group-hover/link:opacity-100'}`}>
                      {item.icon}
                    </span>
                    <span className="text-xs font-black uppercase tracking-[0.2em]">
                      {item.name}
                    </span>
                    {isActive && (
                      <div className="ml-auto flex gap-1">
                        <div className="w-1 h-3 rounded-full bg-blue-500 animate-pulse" />
                      </div>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Footer Logic */}
            <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
               <div className="flex gap-2">
                 {[1,2,3,4,5].map(i => <div key={i} className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden leading-0"><div className="h-full bg-blue-500/20 w-1/2 rounded-full" /></div>)}
               </div>
              <Link href="/login" className="flex items-center gap-4 px-6 py-4 text-slate-600 hover:text-red-400 transition-all group/exit uppercase text-[10px] font-black tracking-[0.3em]">
                <span className="opacity-0 group-hover/exit:opacity-100 transition-opacity">⚔️</span>
                <span>DISCONNECT SESSION</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Interface Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          
          {/* Dynamic Scrollable Content */}
          <main className="flex-1 overflow-y-auto scrollbar-hide p-8 md:p-12 lg:p-16 relative z-10">
            {/* Page header decorations */}
            <div className="absolute top-0 right-0 w-200 h-200 bg-blue-600/5 rounded-full blur-[180px] -z-10 pointer-events-none" />
            
            <div className="max-w-350 mx-auto">
              {children}
            </div>
            
            {/* Interface Footer Info */}
            <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6">
                 <div className="flex gap-1.5">
                   {[1,2,3].map(i => <div key={i} className="h-1 w-8 bg-blue-500/20 rounded-full" />)}
                 </div>
                 <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em]">SECURE DEVELOPMENT PIPELINE INITIALIZED</p>
              </div>
              <div className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em] flex items-center gap-4">
                 <span className="text-blue-900">NODE: HKG-8 &mdash; S-21</span>
                 <span className="text-white/20">&mdash;</span>
                 <span>&copy; 2026 LARGIFY CORP.</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
