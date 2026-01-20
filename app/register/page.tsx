'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PublicLayout } from '@/components/public';
import { Button, Input, Card } from '@/components/ui';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
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

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed');
        setIsLoading(false);
        return;
      }

      setSuccessMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      setError('ERROR: REGISTRATION FAILED - ' + (err instanceof Error ? err.message : 'Unknown error'));
      setIsLoading(false);
    }
  };

  const steps = [
    { title: 'Identity Extraction', subtitle: 'Personal identification protocols' },
    { title: 'Enterprise Alignment', subtitle: 'Company & sector diagnostics' },
    { title: 'Deployment Settings', subtitle: 'Secure credentials configuration' }
  ];

  return (
    <PublicLayout>
      <section className="min-h-screen bg-slate-950 pt-32 pb-20 relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>

        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Content - Progress Side */}
            <div className="lg:col-span-4 space-y-12">
              <div>
                <span className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-6">
                  Elite Access Protocol
                </span>
                <h1 className="text-4xl font-black text-white tracking-tighter mb-4">
                  REQUEST <span className="text-blue-500">CLEARANCE</span>
                </h1>
                <p className="text-slate-400 font-light italic leading-relaxed">
                  Join the most exclusive enterprise resource network. Follow the initialization protocol to register your entity.
                </p>
              </div>

              {/* Step Indicators */}
              <div className="space-y-8 relative">
                {/* Connecting Line */}
                <div className="absolute left-[1.35rem] top-2 bottom-2 w-0.5 bg-white/5" />
                
                {steps.map((s, i) => (
                  <div key={i} className="flex gap-6 items-start relative z-10">
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center border-2 transition-all duration-500 ${
                      step > i + 1 ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-500/40' : 
                      step === i + 1 ? 'bg-slate-900 border-blue-500 text-blue-500' : 
                      'bg-slate-900 border-white/10 text-slate-700'
                    }`}>
                      {step > i + 1 ? (
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="font-black">{i + 1}</span>
                      )}
                    </div>
                    <div>
                      <h4 className={`text-sm font-black uppercase tracking-widest mb-1 ${step >= i + 1 ? 'text-white' : 'text-slate-600'}`}>
                        {s.title}
                      </h4>
                      <p className={`text-xs ${step >= i + 1 ? 'text-slate-500' : 'text-slate-700'}`}>
                        {s.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote/Trust Card */}
              <div className="p-8 bg-blue-600/10 border border-blue-400/20 rounded-3xl backdrop-blur-md">
                <p className="text-sm text-slate-300 italic mb-6 leading-relaxed">
                  "Largify has redefined our operational efficiency. Their portal is the standard for modern enterprise management."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-800 border border-white/10" />
                  <div>
                    <p className="text-xs font-black text-white uppercase tracking-widest">A. Sterling</p>
                    <p className="text-[10px] text-blue-400 font-black uppercase tracking-tighter">Director of Operations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Form Side */}
            <div className="lg:col-span-8">
              <Card className="bg-slate-900/40 backdrop-blur-3xl border-white/10 p-10 md:p-14 rounded-[3rem] shadow-2xl relative">
                <div className="absolute top-0 right-10 w-32 h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent" />
                
                <form onSubmit={handleSubmit} className="space-y-10">
                  
                  {/* Error Alert */}
                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-shake">
                      <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] leading-tight text-center">{error}</p>
                    </div>
                  )}

                  {/* Success Alert */}
                  {successMessage && (
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                      <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.2em] leading-tight text-center">{successMessage}</p>
                    </div>
                  )}
                  
                  {/* Step 1: Personal Info */}
                  {step === 1 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Given Name</label>
                          <Input name="firstName" value={formData.firstName} onChange={handleChange} className="h-14 bg-white/5 border-white/10 rounded-xl" placeholder="John" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Surname</label>
                          <Input name="lastName" value={formData.lastName} onChange={handleChange} className="h-14 bg-white/5 border-white/10 rounded-xl" placeholder="Wick" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Signal Address (Email)</label>
                        <Input type="email" name="email" value={formData.email} onChange={handleChange} className="h-14 bg-white/5 border-white/10 rounded-xl" placeholder="operative@domain.com" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Secure Line (Phone)</label>
                        <Input name="phone" value={formData.phone} onChange={handleChange} className="h-14 bg-white/5 border-white/10 rounded-xl" placeholder="+1 - - -  - - -" />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Enterprise Info */}
                  {step === 2 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em]">Organization Identity</label>
                        <Input name="companyName" value={formData.companyName} onChange={handleChange} className="h-14 bg-white/5 border-white/10 rounded-xl" placeholder="Largo Global Ltd." />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em]">Corporate Web Base</label>
                          <Input name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} className="h-14 bg-white/5 border-white/10 rounded-xl" placeholder="https://..." />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em]">Industry Vector</label>
                          <select name="industry" value={formData.industry} onChange={handleChange} className="w-full h-14 bg-slate-800 border-white/10 rounded-xl text-white px-4 font-bold appearance-none">
                            <option value="">Select Vector</option>
                            <option value="tech">Logistics & Supply</option>
                            <option value="finance">Tech Infrastructure</option>
                            <option value="energy">Strategic Energy</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em]">Scale of Operations</label>
                        <div className="grid grid-cols-4 gap-4">
                          {['1-10', '11-50', '51-200', '200+'].map((size) => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => setFormData(p => ({ ...p, companySize: size }))}
                              className={`h-12 rounded-xl text-[10px] font-black tracking-widest border transition-all ${
                                formData.companySize === size ? 'bg-cyan-500 border-cyan-500 text-slate-950' : 'bg-white/5 border-white/10 text-slate-400 hover:border-cyan-500/50'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Security */}
                  {step === 3 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Master Access Key</label>
                        <Input type="password" name="password" value={formData.password} onChange={handleChange} className="h-14 bg-white/5 border-white/10 rounded-xl" placeholder="••••••••••••" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Confirm Master Key</label>
                        <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="h-14 bg-white/5 border-white/10 rounded-xl" placeholder="••••••••••••" />
                      </div>
                      
                      <div className="pt-4">
                        <div className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                          <input 
                            type="checkbox" 
                            id="terms" 
                            name="terms" 
                            checked={formData.terms} 
                            onChange={handleChange}
                            className="h-5 w-5 rounded border-white/10 bg-white/5 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor="terms" className="text-xs text-slate-400 leading-relaxed font-medium italic">
                            I accept the <span className="text-white font-bold underline cursor-pointer">Global Ops Protocol</span> and acknowledge that my identity will be verified against neutral databases.
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex gap-6 pt-6">
                    {step > 1 && (
                      <Button
                        type="button"
                        onClick={prevStep}
                        className="h-16 flex-1 bg-white/5 border border-white/20 text-white font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white/10 transition-all"
                      >
                        BACKTRACK
                      </Button>
                    )}
                    
                    {step < 3 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="h-16 flex-1 bg-blue-600 text-white font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-blue-500 shadow-xl shadow-blue-500/20 transition-all"
                      >
                        NEXT PHASE
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="h-16 flex-1 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-black uppercase tracking-[0.3em] rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/30 transition-all disabled:opacity-50"
                      >
                        {isLoading ? 'ENCRYPTING & DEPLOYING...' : 'INITIALIZE DEPLOYMENT'}
                      </Button>
                    )}
                  </div>

                  <p className="text-center text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] pt-4">
                    Already an operative? <Link href="/login" className="text-blue-500 hover:text-cyan-400 transition-colors">LOGIN NOW</Link>
                  </p>
                </form>
              </Card>
            </div>

          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
