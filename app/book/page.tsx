'use client';

import { useState } from 'react';
import { PublicLayout } from '@/components/public';
import { Button, Card, Input, Textarea, Select, Badge } from '@/components/ui';
import { mockBookingServices } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
];

// Generate next 14 days for calendar
const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    // Skip weekends
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

  const canProceedToStep2 = selectedService !== null;
  const canProceedToStep3 = selectedDate !== null && selectedTime !== null;

  if (submitted) {
    return (
      <PublicLayout>
        <section className="py-32 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 text-green-600 shadow-xl shadow-green-500/10 border-4 border-white">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">Deployment Scheduled</h1>
            <p className="text-xl text-gray-600 mb-12 font-light leading-relaxed">
              Your engineering consultation is confirmed. A calendar invitation with the secure meeting link has been dispatched.
            </p>
            
            <Card variant="bordered" className="p-10 text-left mb-12 bg-slate-50 border-blue-100 rounded-3xl shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16"></div>
              <h2 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-6 border-b border-blue-100 pb-4">Mission Specs</h2>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Protocol</span>
                  <span className="font-bold text-gray-900 text-lg">{service?.name}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Temporal Window</span>
                  <span className="font-bold text-gray-900 text-lg">
                    {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {selectedTime}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Duration</span>
                  <span className="font-bold text-gray-900 text-lg">{service?.durationMinutes} minutes</span>
                </div>
              </div>
            </Card>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-slate-950 text-white hover:bg-slate-800 px-12 py-8 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-slate-950/20" onClick={() => window.location.href = '/'}>
                Return to Command
              </Button>
            </div>
          </div>
        </section>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      {/* Hero Section - Premium */}
      <section className="relative bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 1200 1200">
            <defs>
              <pattern id="book-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="1200" height="1200" fill="url(#book-grid)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Direct Access</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tighter">
              Reserve Your <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-cyan-400">Architect Session</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
              Synchronize with our technical leads to map your system requirements and scalability goals.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps - Premium */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-50 -translate-y-1/2"></div>
            {[
              { num: 1, label: 'Technical Protocol' },
              { num: 2, label: 'Temporal Window' },
              { num: 3, label: 'Mission Briefing' },
            ].map((s, i) => (
              <div key={s.num} className="relative z-10 flex flex-col items-center group">
                <div
                  className={cn(
                    'h-14 w-14 rounded-2xl flex items-center justify-center font-black text-xl transition-all duration-500 shadow-lg border-4 border-white',
                    step >= s.num
                      ? 'bg-blue-600 text-white scale-110 rotate-12'
                      : 'bg-white text-gray-300 border-gray-100'
                  )}
                >
                  {step > s.num ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    s.num
                  )}
                </div>
                <span
                  className={cn(
                    'mt-4 text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-500 text-center w-32 px-2',
                    step >= s.num ? 'text-blue-600' : 'text-gray-300'
                  )}
                >
                  {s.label}
                </span>
                
                {/* Connector pulse for current step */}
                {step === s.num && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 bg-blue-600/10 rounded-full animate-ping pointer-events-none"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select a Service</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {mockBookingServices.map((svc) => (
                  <Card
                    key={svc.id}
                    variant="bordered"
                    className={cn(
                      'p-6 cursor-pointer transition-all',
                      selectedService === svc.id
                        ? 'ring-2 ring-blue-600 border-blue-600'
                        : 'hover:border-gray-300'
                    )}
                    onClick={() => setSelectedService(svc.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="h-3 w-3 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: svc.color || '#3B82F6' }}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{svc.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{svc.description}</p>
                        <p className="text-sm text-gray-600 mt-2">
                          <span className="font-medium">{svc.durationMinutes} minutes</span>
                        </p>
                      </div>
                      {selectedService === svc.id && (
                        <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!canProceedToStep2}
                >
                  Continue
                  <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose a Time</h2>
              <p className="text-gray-600 mb-6">
                Select a date and time that works for you. All times are shown in your local timezone.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Date Selection */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Select a Date</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {dates.map((date) => (
                      <button
                        key={date.toISOString()}
                        onClick={() => setSelectedDate(date)}
                        className={cn(
                          'p-3 rounded-lg border text-left transition-all',
                          selectedDate?.toDateString() === date.toDateString()
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        <p className="text-xs text-gray-500">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </p>
                        <p className="font-semibold text-gray-900">
                          {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Select a Time</h3>
                  {selectedDate ? (
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            'py-2 px-3 rounded-lg border text-sm font-medium transition-all',
                            selectedTime === time
                              ? 'border-blue-600 bg-blue-600 text-white'
                              : 'border-gray-200 text-gray-700 hover:border-gray-300'
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Please select a date first</p>
                  )}
                </div>
              </div>

              {/* Selected Summary */}
              {selectedDate && selectedTime && (
                <Card variant="bordered" className="mt-8 p-4 bg-blue-50 border-blue-100">
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium text-gray-900">
                      {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {selectedTime}
                    </span>
                  </div>
                </Card>
              )}

              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!canProceedToStep3}
                >
                  Continue
                  <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Details */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Details</h2>
              <p className="text-gray-600 mb-6">
                Tell us a bit about yourself and your project.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input
                        label="Your Name *"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Smith"
                      />
                      <Input
                        label="Email Address *"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@company.com"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input
                        label="Company Name"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company Name"
                      />
                      <Input
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <Select
                      label="Business Size"
                      name="businessSize"
                      value={formData.businessSize}
                      onChange={handleChange}
                      options={[
                        { value: '', label: 'Select business size' },
                        { value: 'solo', label: 'Solo / Freelancer' },
                        { value: 'micro', label: '1-10 employees' },
                        { value: 'small', label: '11-50 employees' },
                        { value: 'medium', label: '51-200 employees' },
                        { value: 'large', label: '200+ employees' },
                      ]}
                    />
                    <Textarea
                      label="What would you like to discuss? *"
                      name="problemSummary"
                      value={formData.problemSummary}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Tell us about your project, challenges, or questions..."
                    />

                    <div className="flex justify-between pt-4">
                      <Button variant="outline" type="button" onClick={() => setStep(2)}>
                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                      </Button>
                      <Button type="submit">
                        Confirm Booking
                        <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </Button>
                    </div>
                  </form>
                </div>

                {/* Booking Summary */}
                <div>
                  <Card variant="bordered" className="p-6 sticky top-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Booking Summary</h3>
                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="text-gray-500">Service</p>
                        <p className="font-medium text-gray-900">{service?.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Date & Time</p>
                        <p className="font-medium text-gray-900">
                          {selectedDate?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </p>
                        <p className="font-medium text-gray-900">{selectedTime}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Duration</p>
                        <p className="font-medium text-gray-900">{service?.durationMinutes} minutes</p>
                      </div>
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-gray-500">Price</p>
                        <p className="text-lg font-bold text-green-600">Free Consultation</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
