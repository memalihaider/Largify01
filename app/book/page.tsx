'use client';

import { useState } from 'react';
import { PublicLayout } from '@/components/public';
import { Button, Card, Input, Textarea, Select, Badge } from '@/components/ui';
import { mockBookingServices } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
];

const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      dates.push(date);
    }
  }
  return dates.slice(0, 10);
};

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    businessSize: '',
    problemSummary: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const dates = generateDates();
  const service = mockBookingServices.find(s => s.id === selectedService);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <PublicLayout>
        <section className="py-32 bg-slate-950 min-h-screen relative overflow-hidden">
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
              <svg width="100%" height="100%">
                <pattern id="grid-success" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid-success)" />
              </svg>
            </div>
          <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
            <div className="h-24 w-24 bg-slate-900 border border-emerald-500/50 flex items-center justify-center mx-auto mb-12 relative shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <div className="absolute inset-0 bg-emerald-500/5" />
              <svg className="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-emerald-500" />
            </div>
            <h1 className="text-5xl font-black text-white mb-6 italic uppercase tracking-tighter leading-none">DEPLOYMENT_CONFIRMED.</h1>
            <p className="text-sm font-mono text-slate-400 mb-16 uppercase italic tracking-widest leading-relaxed">
               YOUR STRATEGIC CONSULTATION HAS BEEN LOGGED. MISSION INTEL DISPATCHED TO: {formData.email.toUpperCase()}
            </p>
            
            <div className="bg-slate-900 border border-slate-800 p-12 text-left mb-16 relative">
              <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-slate-700">REF::BOOK_ID_{Math.floor(Math.random() * 90000)}</div>
              <h2 className="text-[10px] font-mono font-black text-blue-500 uppercase tracking-[0.4em] mb-10 italic underline decoration-blue-500/30 underline-offset-8 decoration-2 text-center">// MISSION_SPECS //</h2>
              <div className="grid gap-10">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono font-bold text-slate-600 uppercase tracking-widest">Selected_Protocol</span>
                  <span className="font-black text-white text-2xl italic uppercase tracking-tighter">{service?.name}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono font-bold text-slate-600 uppercase tracking-widest">Temporal_Window</span>
                  <span className="font-black text-white text-2xl italic uppercase tracking-tighter">
                    {selectedDate?.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} // {selectedTime}
                  </span>
                </div>
              </div>
            </div>
            
            <Link href="/">
              <Button size="lg" className="bg-blue-600 text-white font-black italic uppercase tracking-[0.2em] rounded-none h-16 px-12 border border-blue-400/50 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                Return_To_Base
              </Button>
            </Link>
          </div>
        </section>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <section className="py-24 bg-slate-950 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Left Sidebar - Status */}
            <div className="lg:col-span-4 space-y-10">
              <div className="bg-slate-900 p-8 border border-white/5 relative">
                 <div className="absolute top-[-1px] left-[-1px] w-4 h-4 border-t border-l border-blue-500" />
                 <div className="inline-block mb-6 px-3 py-1 bg-blue-500/10 border border-blue-500/20">
                    <span className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-[0.3em] italic">Deployment_Initialize</span>
                 </div>
                 <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none mb-6">
                   BOOK YOUR <br />
                   <span className="text-blue-600">INTEL_SESSION.</span>
                 </h1>
                 <p className="text-[10px] font-mono text-slate-500 uppercase italic tracking-widest leading-relaxed">
                   ENGAGE OUR LEAD ARCHITECTS TO AUDIT YOUR CURRENT STACK AND PROPOSE A TACTICAL SCALING PATH.
                 </p>
              </div>

              <div className="space-y-4">
                {[
                  { id: 1, label: 'PROTOCOL_SELECTION', status: step === 1 ? 'ACTIVE' : step > 1 ? 'LOCKED' : 'PENDING' },
                  { id: 2, label: 'TEMPORAL_WINDOW', status: step === 2 ? 'ACTIVE' : step > 2 ? 'LOCKED' : 'PENDING' },
                  { id: 3, label: 'ENTITY_REGISTRATION', status: step === 3 ? 'ACTIVE' : 'PENDING' },
                ].map((s) => (
                  <div key={s.id} className={cn(
                    "p-6 border flex items-center justify-between transition-all",
                    s.status === 'ACTIVE' ? "bg-blue-500/5 border-blue-500/50" : "bg-slate-950 border-slate-900 opacity-40"
                  )}>
                    <div className="flex items-center gap-4">
                      <span className={cn("font-mono text-lg font-bold italic", s.status === 'ACTIVE' ? "text-blue-500" : "text-slate-700")}>0{s.id}</span>
                      <span className={cn("text-[10px] font-mono font-black uppercase tracking-[0.2em]", s.status === 'ACTIVE' ? "text-white" : "text-slate-700")}>{s.label}</span>
                    </div>
                    {s.status === 'LOCKED' && <div className="h-1.5 w-1.5 bg-blue-500 rounded-full" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Interface */}
            <div className="lg:col-span-8 bg-slate-950 border border-slate-900">
               {/* Step 1: Services */}
               {step === 1 && (
                 <div className="p-10 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="flex items-center justify-between mb-12 border-b border-slate-900 pb-8">
                      <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">PROTOCOL_SELECT</h2>
                      <span className="text-xs font-mono text-slate-700 uppercase tracking-widest">STATUS: WAITING_INPUT</span>
                   </div>
                   <div className="grid md:grid-cols-2 gap-px bg-slate-900 border border-slate-900">
                      {mockBookingServices.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setSelectedService(s.id)}
                          className={cn(
                            "p-10 text-left transition-all duration-300 relative group",
                            selectedService === s.id ? "bg-blue-600" : "bg-slate-950 hover:bg-slate-900"
                          )}
                        >
                           <h3 className={cn("text-xl font-black uppercase tracking-tighter italic mb-4", selectedService === s.id ? "text-white" : "text-slate-300")}>{s.name}</h3>
                           <p className={cn("text-[10px] font-mono uppercase italic tracking-widest leading-relaxed mb-6", selectedService === s.id ? "text-blue-100" : "text-slate-600")}>{s.description}</p>
                           <div className="flex justify-between items-center pt-6 border-t border-white/5">
                              <span className={cn("text-[10px] font-mono font-bold", selectedService === s.id ? "text-white" : "text-blue-500")}>DUR: {s.durationMinutes}MIN</span>
                              <span className={cn("font-mono text-[10px] font-black italic", selectedService === s.id ? "text-white" : "text-slate-800")}>_SELECT</span>
                           </div>
                        </button>
                      ))}
                   </div>
                   <div className="mt-12 flex justify-end">
                      <Button 
                        disabled={!selectedService}
                        onClick={() => setStep(2)}
                        className="h-16 px-12 bg-blue-600 font-black italic uppercase tracking-widest rounded-none shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                      >
                        Proceed_To_Window →
                      </Button>
                   </div>
                 </div>
               )}

               {/* Step 2: Calendar */}
               {step === 2 && (
                 <div className="p-10 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center justify-between mb-12 border-b border-slate-900 pb-8">
                      <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">TEMPORAL_LOCK</h2>
                      <button onClick={() => setStep(1)} className="text-[10px] font-mono text-slate-600 uppercase tracking-widest hover:text-white transition-colors">[GOTO:STEP_01]</button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-12">
                       <div className="space-y-6">
                          <label className="text-[10px] font-mono font-black text-slate-600 uppercase tracking-widest block">Available_Dates</label>
                          <div className="grid grid-cols-5 gap-2">
                             {dates.map((date, i) => (
                               <button
                                 key={i}
                                 onClick={() => setSelectedDate(date)}
                                 className={cn(
                                   "aspect-square flex flex-col items-center justify-center border transition-all",
                                   selectedDate?.getTime() === date.getTime() ? "bg-blue-600 border-blue-400" : "bg-slate-900 border-slate-800 hover:border-slate-600"
                                 )}
                               >
                                  <span className="text-[10px] font-mono font-bold text-slate-500 leading-none mb-1">{date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}</span>
                                  <span className="font-black text-lg italic text-white leading-none">{date.getDate()}</span>
                               </button>
                             ))}
                          </div>
                       </div>
                       
                       <div className="space-y-6">
                          <label className="text-[10px] font-mono font-black text-slate-600 uppercase tracking-widest block">Time_Slots (UTC)</label>
                          <div className="grid grid-cols-3 gap-2">
                             {timeSlots.map((time) => (
                               <button
                                 key={time}
                                 onClick={() => setSelectedTime(time)}
                                 className={cn(
                                   "py-3 border font-mono text-xs font-bold transition-all",
                                   selectedTime === time ? "bg-blue-600 text-white border-blue-400 italic" : "bg-slate-900 text-slate-500 border-slate-800 hover:border-slate-600"
                                 )}
                               >
                                 {time}
                               </button>
                             ))}
                          </div>
                       </div>
                    </div>

                    <div className="mt-12 flex justify-end">
                      <Button 
                        disabled={!selectedDate || !selectedTime}
                        onClick={() => setStep(3)}
                        className="h-16 px-12 bg-blue-600 font-black italic uppercase tracking-widest rounded-none shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                      >
                        Finalize_Payload →
                      </Button>
                    </div>
                 </div>
               )}

               {/* Step 3: Form */}
               {step === 3 && (
                 <div className="p-10 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center justify-between mb-12 border-b border-slate-900 pb-8">
                      <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">ENTITY_REG</h2>
                      <button onClick={() => setStep(2)} className="text-[10px] font-mono text-slate-600 uppercase tracking-widest hover:text-white transition-colors">[GOTO:STEP_02]</button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <label className="text-[10px] font-mono font-black text-slate-600 uppercase tracking-widest">Full_Name</label>
                          <Input name="name" required className="bg-slate-900 border-slate-800 rounded-none h-14 font-mono text-sm text-blue-400 uppercase italic placeholder:text-slate-800" placeholder="IDENTIFY_SELF" onChange={handleChange} />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-mono font-black text-slate-600 uppercase tracking-widest">Email_Address</label>
                          <Input name="email" type="email" required className="bg-slate-900 border-slate-800 rounded-none h-14 font-mono text-sm text-blue-400 uppercase italic placeholder:text-slate-800" placeholder="COMM_LINK" onChange={handleChange} />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-mono font-black text-slate-600 uppercase tracking-widest">Organization</label>
                          <Input name="company" required className="bg-slate-900 border-slate-800 rounded-none h-14 font-mono text-sm text-blue-400 uppercase italic placeholder:text-slate-800" placeholder="CO_CORP" onChange={handleChange} />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-mono font-black text-slate-600 uppercase tracking-widest">Business_Scale</label>
                          <Select 
                            name="businessSize" 
                            required 
                            className="bg-slate-900 border-slate-800 rounded-none h-14 font-mono text-sm text-blue-400" 
                            onChange={handleChange}
                            options={[
                              { value: '', label: 'SELECT_SCALE' },
                              { value: '1-10', label: 'ENTITY_LEVEL_1 (1-10)' },
                              { value: '11-50', label: 'ENTITY_LEVEL_2 (11-50)' },
                              { value: '51-200', label: 'ENTITY_LEVEL_3 (51-200)' },
                              { value: '201+', label: 'GLOBAL_SCALE (201+)' },
                            ]}
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-mono font-black text-slate-600 uppercase tracking-widest">Inquiry_Payload</label>
                        <Textarea name="problemSummary" required className="bg-slate-900 border-slate-800 rounded-none min-h-[160px] font-mono text-sm text-blue-400 uppercase italic placeholder:text-slate-800" placeholder="DESCRIBE_OBJECTIVE_AND_CONSTRAINTS" onChange={handleChange} />
                      </div>
                      <Button type="submit" className="w-full h-20 bg-blue-600 text-white font-black italic uppercase tracking-[0.2em] rounded-none shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:scale-[1.01] transition-all">
                        INITIATE_DEPLOYMENT_REQUEST
                      </Button>
                    </form>
                 </div>
               )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signifiers - Tactical */}
      <section className="py-24 bg-slate-950">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-[10px] font-mono font-black text-slate-800 uppercase tracking-[0.6em] mb-12 italic">Secure_Validation_Node_v4.2</p>
            <div className="flex flex-wrap justify-center gap-16 opacity-30 grayscale contrast-125">
               <div className="h-4 w-24 bg-slate-800" />
               <div className="h-4 w-32 bg-slate-800" />
               <div className="h-4 w-28 bg-slate-800" />
               <div className="h-4 w-36 bg-slate-800" />
            </div>
         </div>
      </section>
    </PublicLayout>
  );
}
