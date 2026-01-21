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
        setError('CRITICAL_FAIL: AUTHENTICATION_DATA_REQUIRED');
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
        setError(data.error || 'ACCESS_DENIED: AUTHENTICATION_FAILURE');
        setIsLoading(false);
        return;
      }

      router.push(`/client/${data.clientId}`);
    } catch (err) {
      setError('SYSTEM_ERROR: SECURE_HANDSHAKE_TIMEOUT');
      setIsLoading(false);
    }
  };

  return (
    <PublicLayout>
      <section className="min-h-screen flex flex-col lg:flex-row bg-slate-950 overflow-hidden font-mono">
        
        {/* Left Side: Strategic Metadata */}
        <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center p-20 border-r border-slate-900 bg-slate-950">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg width="100%" height="100%">
              <pattern id="grid-login" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid-login)" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="mb-16">
              <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black tracking-[0.4em] uppercase mb-10 italic">
                SECURE_AUTHENTICATION_GATE
              </div>
              <h1 className="text-7xl font-black text-white tracking-tighter italic leading-none mb-10 uppercase">
                AUTHORIZED <br />
                <span className="text-blue-600">PERSONNEL_ONLY.</span>
              </h1>
              <p className="text-sm font-mono text-slate-500 leading-relaxed uppercase italic max-w-md tracking-widest">
                ACCESS THE TACTICAL DEVELOPMENT SYSTEM TO DEPLOY ARCHITECTURE, MONITOR GLOBAL NODES, AND MANAGE MISSION-CRITICAL ASSETS.
              </p>
            </div>

            {/* Feature Specs */}
            <div className="space-y-6 mb-20">
              {[
                { title: 'CORE_ANALYTICS', desc: 'Real-time trajectory modeling.', code: '0xACE-42' },
                { title: 'NEXUS_SYNC', desc: 'Global resource orchestration.', code: 'SYNC_STABLE' },
                { title: 'PROTOCOL_V4', desc: 'Secure infrastructure shielding.', code: 'ENCRYPTED' }
              ].map((f, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-slate-900/50 border border-slate-800">
                  <div className="flex gap-6 items-center">
                    <span className="text-blue-500 font-black text-lg">[{i + 1}]</span>
                    <div>
                      <h3 className="text-white font-black uppercase tracking-widest text-xs mb-1 italic">{f.title}</h3>
                      <p className="text-slate-600 text-[10px] uppercase tracking-widest">{f.desc}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-800">{f.code}</span>
                </div>
              ))}
            </div>

            {/* Log Data */}
            <div className="pt-10 border-t border-slate-900">
              <div className="flex justify-between items-center opacity-30">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.5em]">System_Uptime::99.999%</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.5em]">SSL_Grade::Military</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.5em]">Node_Region::Global</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Identity Verification */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-24 bg-slate-950">
          <div className="w-full max-w-md relative">
            
            <div className="bg-slate-900 p-10 border border-slate-800 relative">
              <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-slate-700">AUTH_SEQ_v2.01</div>
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-blue-500" />
              
              <div className="mb-12 text-center">
                 <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-4">IDENTIFY_SELF</h2>
                 <p className="text-[10px] text-slate-600 uppercase tracking-[0.3em] italic">Enter secure credentials to establish link.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Email Input */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">ENTITY_ID</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="NAME@PROTOCOL.COM"
                    className="h-14 bg-slate-950 border-slate-800 rounded-none text-blue-400 font-bold placeholder:text-slate-800 focus:border-blue-500 transition-all italic text-sm"
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">ACCESS_KEY</label>
                    <Link href="#" className="text-[10px] text-slate-700 hover:text-blue-500 transition-colors uppercase">[RECOVER]</Link>
                  </div>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError('');
                      }}
                      placeholder="••••••••••••"
                      className="h-14 bg-slate-950 border-slate-800 rounded-none text-blue-400 font-bold placeholder:text-slate-800 focus:border-blue-500 transition-all italic text-sm pr-14"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700 hover:text-blue-500 transition-colors text-xs font-bold"
                    >
                      {showPassword ? '[HIDE]' : '[SHOW]'}
                    </button>
                  </div>
                </div>

                {/* Error Box */}
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/50">
                    <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] italic text-center leading-relaxed">
                      {error}
                    </p>
                  </div>
                )}

                {/* Submit Action */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-16 bg-blue-600 text-white font-black uppercase italic tracking-[0.3em] rounded-none hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                >
                  {isLoading ? 'ESTABLISHING_LINK...' : 'INITIATE_HANDSHAKE'}
                </Button>

                {/* SSO Divider */}
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
                  <div className="relative flex justify-center text-[9px] font-bold uppercase tracking-[0.4em]"><span className="bg-slate-900 px-4 text-slate-700">Federated_ID_Proxy</span></div>
                </div>

                <div className="grid grid-cols-2 gap-px bg-slate-800 border border-slate-800">
                  <button type="button" className="h-12 bg-slate-900 text-[10px] font-bold text-slate-500 hover:bg-slate-800 hover:text-white transition-all uppercase tracking-widest">GitHub</button>
                  <button type="button" className="h-12 bg-slate-900 text-[10px] font-bold text-slate-500 hover:bg-slate-800 hover:text-white transition-all uppercase tracking-widest">Google</button>
                </div>
              </form>

              {/* Create Account Link */}
              <div className="mt-12 text-center pt-8 border-t border-white/5">
                <p className="text-[10px] text-slate-600 font-bold tracking-widest uppercase">
                  No authorization yet? {' '}
                  <Link href="/book" className="text-blue-500 hover:text-blue-400 underline decoration-blue-500/30 underline-offset-4">
                    REQUEST_ACCESS_MISSION
                  </Link>
                </p>
              </div>
            </div>
            
            {/* Structural Links */}
            <div className="mt-10 flex justify-center gap-10 text-[9px] font-bold text-slate-800 uppercase tracking-[0.4em]">
              <Link href="#" className="hover:text-slate-500 transition-colors">Privacy_Laws</Link>
              <Link href="#" className="hover:text-slate-500 transition-colors">Cyber_Sec</Link>
              <Link href="#" className="hover:text-slate-500 transition-colors">Entity_TOS</Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
