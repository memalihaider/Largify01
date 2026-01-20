'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PublicLayout } from '@/components/public';
import { Button, Input } from '@/components/ui';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!email || !password) {
        setError('CRITICAL: AUTHENTICATION CREDENTIALS REQUIRED');
        setIsLoading(false);
        return;
      }
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'AUTHENTICATION FAILED');
        setIsLoading(false);
        return;
      }

      // Success - redirect to client portal
      router.push(`/client/${data.clientId}`);
    } catch (err) {
      setError('ERROR: SECURE HANDSHAKE FAILED');
      setIsLoading(false);
    }
  };

  return (
    <PublicLayout>
      <section className="min-h-screen flex flex-col lg:flex-row bg-slate-950 overflow-hidden">
        {/* Left Side: Strategic Impact & Trust */}
        <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center p-20 overflow-hidden">
          {/* Background Branding */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-blue-600/20 via-slate-950 to-cyan-500/10" />
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-xl">
            <div className="mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-[0.3em] uppercase mb-6">
                Intelligence Hub
              </span>
              <h1 className="text-6xl font-black text-white tracking-tighter leading-[0.9] mb-8">
                COMMAND <br />
                <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500">YOUR ASSETS</span>
              </h1>
              <p className="text-xl text-slate-400 font-light leading-relaxed italic">
                Access the Largify Enterprise Dashboard to manage global projects, analyze real-time trajectory, and deploy strategic resources.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 gap-8 mb-16">
              {[
                { title: 'Neural Analytics', desc: 'Predictive modeling for your business growth.', icon: '🧠' },
                { title: 'Nexus Control', desc: 'Centralized management of cross-functional teams.', icon: '🛰️' },
                { title: 'Quantum Security', desc: 'Military-grade encryption for all enterprise data.', icon: '🛡️' }
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-6 group cursor-default">
                  <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-blue-500/50 transition-all duration-500 text-2xl">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-black uppercase tracking-widest text-sm mb-1 group-hover:text-blue-400 transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Bar */}
            <div className="pt-12 border-t border-white/5">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-6">
                Trusted by Infrastructure Leaders
              </p>
              <div className="flex gap-10 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                {['TECH', 'GLOBAL', 'QUANTUM', 'NEXUS'].map((l) => (
                  <span key={l} className="text-xl font-black text-white tracking-tighter">{l}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Authentication Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-24 relative">
          {/* Mobile Background */}
          <div className="lg:hidden absolute inset-0 bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 -z-10" />
          
          <div className="w-full max-w-md">
            {/* Branding for Mobile */}
            <div className="lg:hidden text-center mb-10">
              <div className="inline-flex items-center justify-center h-16 w-16 bg-linear-to-br from-blue-600 to-cyan-500 rounded-2xl shadow-lg shadow-blue-500/20 mb-6 mx-auto">
                <span className="text-white font-black text-3xl">L</span>
              </div>
              <h2 className="text-3xl font-black text-white tracking-tighter">SECURE ACCESS</h2>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-600 via-cyan-400 to-blue-600"></div>

              <div className="mb-10 text-center lg:text-left transition-all">
                <h2 className="hidden lg:block text-3xl font-black text-white tracking-tighter mb-2">Welcome Back</h2>
                <p className="text-slate-400 text-sm italic font-light">Identify yourself to continue the mission.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Enterprise Identifier</label>
                  <div className="relative group">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      placeholder="name@enterprise.com"
                      className="h-14 px-6 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-0 transition-all duration-300 font-medium"
                    />
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-600 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em]">Access Key</label>
                    <Link href="#" className="text-[10px] font-black text-slate-500 hover:text-blue-400 uppercase tracking-[0.2em] transition-colors">Recover</Link>
                  </div>
                  <div className="relative group">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError('');
                      }}
                      placeholder="••••••••••••"
                      className="h-14 px-6 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:border-cyan-500/50 focus:ring-0 transition-all duration-300 font-medium pr-14"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-cyan-400 transition-colors"
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                {/* Error Box */}
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-shake">
                    <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] leading-tight text-center">{error}</p>
                  </div>
                )}

                {/* Remember Me */}
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="remember" className="h-4 w-4 rounded border-white/10 bg-white/5 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-950" />
                  <label htmlFor="remember" className="text-xs font-bold text-slate-500 uppercase tracking-widest cursor-pointer select-none">Persistent Session</label>
                </div>

                {/* Submit Action */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full h-14 bg-white text-slate-950 hover:bg-blue-600 hover:text-white font-black uppercase tracking-[0.3em] rounded-xl transition-all duration-500 disabled:opacity-50 overflow-hidden"
                >
                  <span className="relative z-10">{isLoading ? 'BYPASSING PROTOCOLS...' : 'INITIALIZE SYSTEM'}</span>
                  <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Button>

                {/* Social Login Divider */}
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                  <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.4em]"><span className="bg-slate-900 px-4 text-slate-600">Enterprise SSO</span></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button type="button" className="flex items-center justify-center gap-3 h-12 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
                    <span className="text-sm font-bold text-white uppercase tracking-tighter">Github</span>
                  </button>
                  <button type="button" className="flex items-center justify-center gap-3 h-12 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
                    <span className="text-sm font-bold text-white uppercase tracking-tighter">Google</span>
                  </button>
                </div>
              </form>

              {/* Create Account Link */}
              <div className="mt-10 text-center">
                <p className="text-xs text-slate-500 font-medium tracking-widest uppercase">
                  No authorization yet? {' '}
                  <Link href="/register" className="text-blue-400 hover:text-blue-300 font-black tracking-widest underline decoration-2 underline-offset-4 decoration-blue-500/30 hover:decoration-blue-500 transition-all">
                    REQUEST ACCESS
                  </Link>
                </p>
              </div>
            </div>
            
            {/* Legal Links */}
            <div className="mt-8 flex justify-center gap-8 text-[9px] font-black text-slate-700 uppercase tracking-[0.3em]">
              <Link href="#" className="hover:text-slate-500 transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-slate-500 transition-colors">Security</Link>
              <Link href="#" className="hover:text-slate-500 transition-colors">Infrastructure</Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
