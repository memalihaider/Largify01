'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@/components/ui';
import { mockUsers, mockEmployees } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const currentUser = mockUsers[1];
const currentEmployee = mockEmployees[1];

interface UserSettings {
  emailNotifications: {
    taskAssigned: boolean;
    projectUpdates: boolean;
    leaveApprovals: boolean;
    expenseUpdates: boolean;
    timelineAlerts: boolean;
  };
  displayPreferences: {
    theme: 'dark' | 'light';
    language: string;
    dateFormat: string;
    timeFormat: '12h' | '24h';
  };
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    sessionTimeout: number;
  };
}

export default function EmployeeSettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'preferences'>('profile');
  const [settings, setSettings] = useState<UserSettings>({
    emailNotifications: {
      taskAssigned: true,
      projectUpdates: true,
      leaveApprovals: true,
      expenseUpdates: true,
      timelineAlerts: false,
    },
    displayPreferences: {
      theme: 'dark',
      language: 'en-US',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '24h',
    },
    security: {
      twoFactorEnabled: false,
      lastPasswordChange: '2025-12-15',
      sessionTimeout: 30,
    },
  });

  const [savedMessage, setSavedMessage] = useState('');

  const handleNotificationToggle = (key: keyof UserSettings['emailNotifications']) => {
    setSettings(prev => ({
      ...prev,
      emailNotifications: {
        ...prev.emailNotifications,
        [key]: !prev.emailNotifications[key],
      },
    }));
  };

  const handleDisplayChange = (key: keyof UserSettings['displayPreferences'], value: string) => {
    setSettings(prev => ({
      ...prev,
      displayPreferences: {
        ...prev.displayPreferences,
        [key]: value,
      },
    }));
  };

  const handleSave = () => {
    setSavedMessage('Settings saved successfully');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-10">
      {/* Tactical Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1 w-8 bg-blue-600 rounded-full" />
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Personnel Configuration Module</span>
          </div>
          <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none mb-2">
            My <span className="text-blue-500">Settings</span>
          </h1>
          <p className="text-slate-400 font-medium max-w-xl">
            Configure your operational preferences, notifications, and security parameters.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 p-1.5 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl w-fit">
        {(['profile', 'notifications', 'security', 'preferences'] as const).map(tab => {
          const labels: Record<typeof tab, string> = {
            profile: 'Profile',
            notifications: 'Notifications',
            security: 'Security',
            preferences: 'Preferences',
          };
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all italic",
                activeTab === tab 
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" 
                    : "text-slate-500 hover:text-slate-300"
              )}
            >
              {labels[tab]}
            </button>
          );
        })}
      </div>

      {/* Save Message */}
      {savedMessage && (
        <div className="p-6 bg-emerald-600/10 border border-emerald-500/20 rounded-2xl flex items-center gap-4">
          <div className="h-8 w-8 rounded-full bg-emerald-600/20 flex items-center justify-center text-emerald-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-sm font-black text-emerald-400 uppercase tracking-widest italic">{savedMessage}</p>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-8">
          <Card className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-12 overflow-hidden">
            <h3 className="text-sm font-black text-white uppercase italic tracking-[0.2em] mb-8 flex items-center gap-3">
              <span className="h-1 w-6 bg-blue-600 rounded-full" />
              Personal Record
            </h3>
            
            <div className="flex flex-col md:flex-row gap-12">
              <div className="shrink-0">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-linear-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000" />
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.fullName}
                    className="relative h-32 w-32 rounded-2xl ring-4 ring-slate-900 object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Primary Designation</label>
                    <p className="text-sm font-black text-white italic tracking-tight">{currentUser.firstName}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Secondary Designation</label>
                    <p className="text-sm font-black text-white italic tracking-tight">{currentUser.lastName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Comm Frequency</label>
                    <p className="text-sm font-black text-white italic tracking-tight">{currentUser.email}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Signal Link</label>
                    <p className="text-sm font-black text-white italic tracking-tight">{currentUser.phone || 'N/A'}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Deployment Cell</label>
                  <p className="text-sm font-black text-white italic tracking-tight">{currentEmployee.department}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Role Designation</label>
                    <p className="text-sm font-black text-white italic tracking-tight">{currentEmployee.position}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Employee ID</label>
                    <p className="text-sm font-black text-white italic tracking-tight">{currentEmployee.employeeCode}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-8">
          <Card className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-12">
            <h3 className="text-sm font-black text-white uppercase italic tracking-[0.2em] mb-8 flex items-center gap-3">
              <span className="h-1 w-6 bg-blue-600 rounded-full" />
              Email Notification Preferences
            </h3>

            <div className="space-y-6">
              {[
                { key: 'taskAssigned' as const, label: 'Task Assignments', desc: 'Receive alerts when tasks are assigned' },
                { key: 'projectUpdates' as const, label: 'Project Updates', desc: 'Get notified of project milestone changes' },
                { key: 'leaveApprovals' as const, label: 'Leave Approvals', desc: 'Notifications for leave request decisions' },
                { key: 'expenseUpdates' as const, label: 'Expense Processing', desc: 'Updates on submitted expense claims' },
                { key: 'timelineAlerts' as const, label: 'Timeline Alerts', desc: 'Critical deadline and schedule notifications' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-6 bg-slate-950/40 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                  <div>
                    <p className="text-sm font-black text-white uppercase italic tracking-tight">{item.label}</p>
                    <p className="text-[10px] font-medium text-slate-500 uppercase tracking-tighter mt-1">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications[item.key]}
                        onChange={() => handleNotificationToggle(item.key)}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-8 bg-slate-800 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-slate-700 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600" />
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-10 border-t border-white/5">
              <Button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white font-black uppercase italic tracking-widest text-xs px-10 py-6 rounded-2xl shadow-xl shadow-blue-600/20 h-auto"
              >
                <span className="flex items-center gap-3">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Preferences
                </span>
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-8">
          {/* Session Security */}
          <Card className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-12">
            <h3 className="text-sm font-black text-white uppercase italic tracking-[0.2em] mb-8 flex items-center gap-3">
              <span className="h-1 w-6 bg-purple-600 rounded-full" />
              Active Sessions
            </h3>

            <div className="space-y-4">
              <div className="p-6 bg-slate-950/40 rounded-2xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 14h8m-8 4h8M4 6h16M9 3h6a2 2 0 012 2v14a2 2 0 01-2 2H9a2 2 0 01-2-2V5a2 2 0 012-2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-black text-white italic uppercase tracking-tight">Current Session</p>
                    <p className="text-[9px] font-medium text-slate-500 uppercase tracking-tighter mt-1">Last Active: Now</p>
                  </div>
                </div>
                <Badge className="bg-emerald-600/10 text-emerald-400 border-emerald-500/20 text-[8px] font-black uppercase italic">Active</Badge>
              </div>
            </div>
          </Card>

          {/* Two Factor Authentication */}
          <Card className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-12">
            <h3 className="text-sm font-black text-white uppercase italic tracking-[0.2em] mb-8 flex items-center gap-3">
              <span className="h-1 w-6 bg-orange-600 rounded-full" />
              Multi-Factor Authentication
            </h3>

            <div className="p-6 bg-slate-950/40 rounded-2xl border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-sm font-black text-white uppercase italic tracking-tight">Two-Factor Authentication</p>
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-tighter mt-2">Status: <span className="text-orange-400">DISABLED</span></p>
              </div>
              <Button className="bg-slate-800 hover:bg-slate-700 text-[9px] font-black uppercase tracking-widest italic px-8 py-5 h-auto rounded-xl">
                Enable 2FA
              </Button>
            </div>

            <p className="mt-6 text-[10px] font-medium text-slate-500 uppercase tracking-tighter italic">
              Two-factor authentication adds an extra layer of security to your account by requiring a second verification method during login.
            </p>
          </Card>

          {/* Password Security */}
          <Card className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-12">
            <h3 className="text-sm font-black text-white uppercase italic tracking-[0.2em] mb-8 flex items-center gap-3">
              <span className="h-1 w-6 bg-red-600 rounded-full" />
              Password Management
            </h3>

            <div className="space-y-6">
              <div className="p-6 bg-slate-950/40 rounded-2xl border border-white/5">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic mb-2">Last Password Change</p>
                <p className="text-sm font-black text-white italic">{settings.security.lastPasswordChange}</p>
                <p className="text-[9px] font-medium text-slate-500 uppercase tracking-tighter mt-3">We recommend changing your password every 90 days</p>
              </div>

              <div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-black uppercase italic tracking-widest text-xs px-10 py-6 rounded-2xl shadow-xl shadow-blue-600/20 h-auto">
                  <span className="flex items-center gap-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    Change Password
                  </span>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div className="space-y-8">
          <Card className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-12">
            <h3 className="text-sm font-black text-white uppercase italic tracking-[0.2em] mb-8 flex items-center gap-3">
              <span className="h-1 w-6 bg-cyan-600 rounded-full" />
              Display Configuration
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  label: 'Theme',
                  key: 'theme',
                  value: settings.displayPreferences.theme,
                  options: [{ val: 'dark', label: 'Dark Mode' }, { val: 'light', label: 'Light Mode' }],
                },
                {
                  label: 'Time Format',
                  key: 'timeFormat',
                  value: settings.displayPreferences.timeFormat,
                  options: [{ val: '12h', label: '12-Hour' }, { val: '24h', label: '24-Hour' }],
                },
                {
                  label: 'Language',
                  key: 'language',
                  value: settings.displayPreferences.language,
                  options: [{ val: 'en-US', label: 'English (US)' }, { val: 'es-ES', label: 'Spanish' }],
                },
                {
                  label: 'Date Format',
                  key: 'dateFormat',
                  value: settings.displayPreferences.dateFormat,
                  options: [{ val: 'MM/DD/YYYY', label: 'MM/DD/YYYY' }, { val: 'DD/MM/YYYY', label: 'DD/MM/YYYY' }],
                },
              ].map((pref, idx) => (
                <div key={idx} className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">{pref.label}</label>
                  <select
                    value={pref.value}
                    onChange={(e) => handleDisplayChange(pref.key as keyof UserSettings['displayPreferences'], e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/10 text-white text-sm font-black italic px-6 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    {pref.options.map(opt => (
                      <option key={opt.val} value={opt.val}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-10 border-t border-white/5">
              <Button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white font-black uppercase italic tracking-widest text-xs px-10 py-6 rounded-2xl shadow-xl shadow-blue-600/20 h-auto"
              >
                <span className="flex items-center gap-3">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Preferences
                </span>
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
