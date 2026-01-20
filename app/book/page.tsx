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
        <section className="py-20">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for booking with Largify Solutions. You will receive a confirmation email shortly.
            </p>
            <Card variant="bordered" className="p-6 text-left mb-8">
              <h2 className="font-semibold text-gray-900 mb-4">Booking Details</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Service:</span>
                  <span className="font-medium text-gray-900">{service?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date:</span>
                  <span className="font-medium text-gray-900">
                    {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Time:</span>
                  <span className="font-medium text-gray-900">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-medium text-gray-900">{service?.durationMinutes} minutes</span>
                </div>
              </div>
            </Card>
            <p className="text-sm text-gray-500 mb-4">
              A calendar invite will be sent to {formData.email}
            </p>
            <Button onClick={() => window.location.href = '/'}>
              Back to Home
            </Button>
          </div>
        </section>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Book a Call</h1>
            <p className="text-xl text-gray-300">
              Schedule a free consultation to discuss your project and see how we can help.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Select Service' },
              { num: 2, label: 'Choose Time' },
              { num: 3, label: 'Your Details' },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div
                  className={cn(
                    'h-8 w-8 rounded-full flex items-center justify-center font-medium text-sm',
                    step >= s.num
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  )}
                >
                  {step > s.num ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    s.num
                  )}
                </div>
                <span
                  className={cn(
                    'ml-2 text-sm font-medium hidden sm:block',
                    step >= s.num ? 'text-gray-900' : 'text-gray-500'
                  )}
                >
                  {s.label}
                </span>
                {i < 2 && (
                  <div className={cn(
                    'mx-4 h-0.5 w-16 md:w-32',
                    step > s.num ? 'bg-blue-600' : 'bg-gray-200'
                  )} />
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
