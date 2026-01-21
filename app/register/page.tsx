'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PublicLayout } from '@/components/public';
import { Button, Input } from '@/components/ui';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const [systemTime, setSystemTime] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    companyWebsite: '',
    industry: '',
    companySize: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date().toISOString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const nextStep = () => {
    setError('');
    setStep(s => Math.min(s + 1, 3));
  };
  const prevStep = () => {
    setError('');
    setStep(s => Math.max(s - 1, 1));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate validation
    if (step === 3 && formData.password !== formData.confirmPassword) {
      setError('ERROR: CREDENTIAL_MISMATCH - PASSWORDS DO NOT MATCH');
      setIsLoading(false);
      return;
    }

    try {
      // In a real app, you'd call your API here
      // const response = await fetch('/api/auth/register', { ... });
      
      // Simulating success for the tactical UI demonstration
      setTimeout(() => {
        setSuccessMessage('SUCCESS: ENTITY_REGISTERED. REDIRECTING TO AUTH_GATE...');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }, 1500);

    } catch (err) {
      setError('ERROR: REGISTRATION_FAILED - ' + (err instanceof Error ? err.message : 'UNKNOWN_EXCEPTION'));
      setIsLoading(false);
    }
  };

  const steps = [
    { id: '01', title: 'IDENTITY_EXTRACTION', desc: 'Personal Identification' },
    { id: '02', title: 'ENTITY_DIAGNOSTICS', desc: 'Organization Parameters' },
    { id: '03', title: 'CREDENTIAL_INIT', desc: 'Security Protocol' }
  ];

  return (
    <PublicLayout>
      <section className="min-h-screen bg-slate-950 text-white font-mono pt-32 pb-20 relative overflow-hidden">
        {/* Tactical Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="reg-grid" width="5" height="5" patternUnits="userSpaceOnUse">
                <path d="M 5 0 L 0 0 0 5" fill="none" stroke="blue" strokeWidth="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#reg-grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Left Sidebar - Protocol Meta */}
            <div className="lg:col-span-4 space-y-8">
              <div className="border-l-2 border-blue-600 pl-6 py-2">
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em] italic mb-2 block">// CLEARANCE_REQUEST</span>
                <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-4">
                  REQUEST <br />
                  <span className="text-blue-600 font-black">CLEARANCE.</span>
                </h1>
                <p className="text-slate-500 text-xs leading-relaxed uppercase italic">
                  Initiate the registration sequence to gain authorized access to the tactical development system.
                </p>
              </div>

              {/* Technical Readout */}
              <div className="bg-slate-900/50 border border-slate-800 p-6 space-y-4">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">SYSTEM_TIME:</span>
                  <span className="text-blue-400">{systemTime || 'STABLE_ORBIT'}</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">PROTOCOL:</span>
                  <span className="text-white">REG_AUTH_V4</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">ENCRYPTION:</span>
                  <span className="text-emerald-500">AES_256_ACTIVE</span>
                </div>
                <div className="h-px bg-slate-800" />
                <div className="space-y-4">
                  {steps.map((s, idx) => {
                    const isActive = step === idx + 1;
                    const isCompleted = step > idx + 1;
                    return (
                      <div key={s.id} className="flex gap-4 items-center">
                        <div className={`h-8 w-8 flex items-center justify-center text-xs font-bold border transition-all ${
                          isActive ? 'bg-blue-600 border-blue-400 text-white' : 
                          isCompleted ? 'bg-slate-800 border-slate-700 text-emerald-500' : 
                          'bg-transparent border-slate-800 text-slate-700'
                        }`}>
                          {isCompleted ? '✓' : s.id}
                        </div>
                        <div>
                          <p className={`text-[10px] font-bold uppercase italic tracking-widest ${isActive ? 'text-white' : 'text-slate-600'}`}>{s.title}</p>
                          <p className="text-[8px] text-slate-700 uppercase tracking-tight">{s.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Warning */}
              <div className="border border-yellow-500/20 bg-yellow-500/5 p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-1 bg-yellow-500/20 text-[8px] font-bold text-yellow-500">CAUTION</div>
                <p className="text-[9px] text-yellow-500/70 uppercase leading-tight italic">
                  All registration attempts are logged via [NEURAL_INDEX]. Unuthorized data spoofing will trigger immediate IP blacklisting.
                </p>
              </div>
            </div>

            {/* Right Main - Form Interface */}
            <div className="lg:col-span-8">
              <div className="bg-slate-900 border border-slate-800 p-8 md:p-12 relative">
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                   <svg viewBox="0 0 100 100"><path d="M0 0 L100 0 L100 100 Z" fill="blue" /></svg>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                  {error && (
                    <div className="p-4 bg-red-950/30 border border-red-500/50 text-red-500 text-[10px] font-black uppercase italic tracking-widest text-center animate-pulse">
                      {error}
                    </div>
                  )}

                  {successMessage && (
                    <div className="p-4 bg-emerald-950/30 border border-emerald-500/50 text-emerald-500 text-[10px] font-black uppercase italic tracking-widest text-center">
                      {successMessage}
                    </div>
                  )}

                  {/* Step 1: Personal Identification */}
                  {step === 1 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Given_Name</label>
                          <Input name="firstName" value={formData.firstName} onChange={handleChange} className="h-12 bg-slate-950 border-slate-800 rounded-none text-xs focus:border-blue-500 transition-colors uppercase italic" placeholder="OPERATIVE_FIRST" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Surname</label>
                          <Input name="lastName" value={formData.lastName} onChange={handleChange} className="h-12 bg-slate-950 border-slate-800 rounded-none text-xs focus:border-blue-500 transition-colors uppercase italic" placeholder="OPERATIVE_LAST" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Signal_Address (Email)</label>
                        <Input type="email" name="email" value={formData.email} onChange={handleChange} className="h-12 bg-slate-950 border-slate-800 rounded-none text-xs focus:border-blue-500 transition-colors uppercase italic tracking-widest" placeholder="USER@DOMAIN.TLD" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Secure_Pulse (Phone)</label>
                        <Input name="phone" value={formData.phone} onChange={handleChange} className="h-12 bg-slate-950 border-slate-800 rounded-none text-xs focus:border-blue-500 transition-colors uppercase italic tracking-widest" placeholder="+XX XXX XXX XXX" />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Entity Diagnostics */}
                  {step === 2 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Entity_Designation</label>
                        <Input name="companyName" value={formData.companyName} onChange={handleChange} className="h-12 bg-slate-950 border-slate-800 rounded-none text-xs focus:border-blue-500 transition-colors uppercase italic" placeholder="ORGANIZATION_NAME" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Web_Nexus</label>
                          <Input name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} className="h-12 bg-slate-950 border-slate-800 rounded-none text-xs focus:border-blue-500 transition-colors uppercase italic" placeholder="HTTPS://..." />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sector_Vector</label>
                          <select 
                            name="industry" 
                            value={formData.industry} 
                            onChange={handleChange} 
                            className="w-full h-12 bg-slate-950 border border-slate-800 rounded-none text-white px-4 text-[10px] font-bold appearance-none focus:border-blue-500 outline-none uppercase italic"
                          >
                            <option value="">SELECT_SECTOR</option>
                            <option value="logistics">LOGISTICS_&_SUPPLY</option>
                            <option value="tech">TECH_INFRASTRUCTURE</option>
                            <option value="energy">STRATEGIC_ENERGY</option>
                            <option value="finance">QUANT_FINANCE</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Operational_Scale</label>
                        <div className="grid grid-cols-4 gap-px bg-slate-800 border border-slate-800">
                          {['1-10', '11-50', '51-200', '200+'].map((size) => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => setFormData(p => ({ ...p, companySize: size }))}
                              className={`h-12 text-[10px] font-black tracking-widest transition-all ${
                                formData.companySize === size ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'bg-slate-950 text-slate-500 hover:text-slate-300'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Security Protocol */}
                  {step === 3 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Encryption_Key</label>
                        <Input type="password" name="password" value={formData.password} onChange={handleChange} className="h-12 bg-slate-950 border-slate-800 rounded-none text-xs focus:border-blue-500 transition-colors tracking-[1em]" placeholder="********" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Repeat_Key_Sequence</label>
                        <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="h-12 bg-slate-950 border-slate-800 rounded-none text-xs focus:border-blue-500 transition-colors tracking-[1em]" placeholder="********" />
                      </div>
                      
                      <div className="pt-4">
                        <div className="flex items-start gap-4 p-6 bg-slate-950 border border-slate-800">
                          <input 
                            type="checkbox" 
                            id="terms" 
                            name="terms" 
                            checked={formData.terms} 
                            onChange={handleChange}
                            className="mt-1 h-3 w-3 rounded-none border-slate-800 bg-slate-900 text-blue-600 focus:ring-0"
                          />
                          <label htmlFor="terms" className="text-[9px] text-slate-500 leading-relaxed uppercase italic tracking-tighter">
                            I CONSENT TO THE <span className="text-blue-500 font-bold hover:underline cursor-pointer">[GLOBAL_OPS_PROTOCOL]</span> AND ACKNOWLEDGE THE SYSTEM DATA USAGE CLAUSES.
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Sequence */}
                  <div className="flex gap-4 pt-4">
                    {step > 1 && (
                      <Button
                        type="button"
                        onClick={prevStep}
                        className="h-14 flex-1 bg-transparent border border-slate-800 text-slate-500 font-black italic uppercase tracking-widest rounded-none hover:bg-slate-800 hover:text-white transition-all"
                      >
                        [REVERSE_PHASE]
                      </Button>
                    )}
                    
                    {step < 3 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="h-14 flex-1 bg-blue-600 text-white font-black italic uppercase tracking-widest rounded-none hover:bg-blue-700 shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all"
                      >
                        CONTINUE_TO_P0{step + 1}
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="h-14 flex-1 bg-blue-600 text-white font-black italic uppercase tracking-widest rounded-none hover:bg-blue-700 shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all disabled:opacity-50"
                      >
                        {isLoading ? 'ENCRYPTING...' : 'INITIALIZE_DEPLOYMENT'}
                      </Button>
                    )}
                  </div>

                  <div className="text-center pt-8 border-t border-slate-800">
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] italic">
                      ENTITY ALREADY REGISTERED? <Link href="/login" className="text-blue-500 hover:text-white transition-colors underline">[INITIATE_HANDSHAKE]</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
