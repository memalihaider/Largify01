'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { Button, Input, Card } from '@/components/ui';
import { mockUsers, mockEmployees } from '@/lib/mock-data';

interface PageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default function UserLoginPage({ params }: PageProps) {
  const { userId } = use(params);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock authentication
    const user = mockUsers.find(u => u.email === email);
    
    if (user && password === 'password123') {
      // Check if user is admin or employee
      const employee = mockEmployees.find(emp => emp.userId === user.id);
      
      if (user.id === 'usr-001') {
        // Admin user - redirect to admin portal
        window.location.href = '/erp';
      } else if (employee) {
        // Employee user - redirect to employee portal
        window.location.href = '/employee';
      } else {
        setError('User role not configured');
        setIsLoading(false);
      }
    } else {
      setError('Invalid email or password');
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user?.id === 'usr-001') {
      window.location.href = '/erp';
    } else {
      window.location.href = '/employee';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-150 h-150 bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-100 h-100 bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

      <div className="w-full max-w-lg relative z-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-6">
            Secure Gateway Access
          </div>
          <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic leading-[0.8] mb-4">
            PORTAL <span className="text-blue-500">NODE</span>
          </h1>
          <p className="text-slate-400 font-light italic tracking-tight text-sm">
            Authorized Personnel only. Authenticating Session Protocol: <span className="text-slate-500 font-mono not-italic uppercase">{userId}</span>
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10 shadow-2xl overflow-hidden relative group/card">
          {/* Decorative Corner Glow */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600/10 blur-2xl group-hover/card:bg-blue-600/20 transition-colors duration-700" />
          
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Network Identity</label>
              <div className="relative group/input">
                <input
                  type="email"
                  placeholder="IDENTITY@LARGIFY.SOLUTIONS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 bg-slate-950/50 border border-white/5 rounded-2xl px-6 text-white text-sm font-medium focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-700 uppercase tracking-widest"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Security Key</label>
              <div className="relative group/input">
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-14 bg-slate-950/50 border border-white/5 rounded-2xl px-6 text-white text-sm font-medium focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-700"
                  required
                />
              </div>
            </div>

            {/* Error Feedback */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 animate-shake">
                <span className="text-xl">⚠️</span>
                <p className="text-[11px] font-black text-red-500 uppercase tracking-widest leading-tight">{error}</p>
              </div>
            )}

            {/* Action Trigger */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 relative overflow-hidden group/btn disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-blue-600/20"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>SYNCHRONIZING...</span>
                </div>
              ) : (
                <>
                  <span>ESTABLISH UPLINK</span>
                  <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                </>
              )}
            </button>
          </form>

          {/* Secure Divider */}
          <div className="my-10 flex items-center gap-4">
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/5 to-transparent"></div>
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">Neural Handshake</span>
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/5 to-transparent"></div>
          </div>

          {/* Sandbox Credentials */}
          <div className="space-y-3">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2 mb-4">Bypass Protocol: <span className="text-blue-500">Demo Access</span></p>
            
            <div className="grid grid-cols-1 gap-3">
              {/* Admin Access Pin */}
              <button
                onClick={() => handleDemoLogin('usr-001')}
                className="w-full p-4 text-left bg-slate-950/50 border border-white/5 rounded-2xl hover:border-blue-500/40 transition-all group/demo"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-[11px] font-black text-white uppercase tracking-widest mb-1 group-hover/demo:text-blue-400 transition-colors inline-flex items-center gap-2">
                       <span className="text-sm">👨‍💼</span> ADMINISTRATOR NODE
                    </h4>
                    <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{mockUsers[0].email}</p>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                </div>
              </button>

              {/* Employee Access Pin */}
              <div className="grid grid-cols-2 gap-3">
                {mockUsers.slice(1, 3).map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleDemoLogin(user.id)}
                    className="p-4 text-left bg-slate-950/50 border border-white/5 rounded-2xl hover:border-cyan-500/40 transition-all group/demo"
                  >
                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-1 group-hover/demo:text-cyan-400 transition-colors inline-flex items-center gap-1">
                      USER-EXT
                    </h4>
                    <p className="text-[9px] text-slate-500 uppercase tracking-tight truncate">{user.email}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* System Breadcrumbs */}
        <div className="mt-12 text-center">
          <div className="flex gap-8 justify-center items-center">
            <Link href="/login" className="text-[10px] font-black text-slate-500 hover:text-blue-400 uppercase tracking-[0.2em] transition-colors flex items-center gap-2 group">
              <span className="h-px w-4 bg-slate-800 group-hover:bg-blue-800 transition-colors" />
              CLIENT PORTAL
            </Link>
            <Link href="/" className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.2em] transition-colors flex items-center gap-2 group">
              <span className="h-px w-4 bg-slate-800 group-hover:bg-white transition-colors" />
              MAIN FRAME
            </Link>
          </div>
          <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.5em] mt-8">
            © 2026 LARGIFY SOLUTIONS // SYSTEM V4.2.0
          </p>
        </div>
      </div>

      {/* Shake Animation Keyframes */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.2s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
}
