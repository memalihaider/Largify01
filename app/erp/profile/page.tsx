'use client';

import { useState } from 'react';
import { Button, Card } from '@/components/ui';

export default function AdminProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'System Administrator',
    email: 'admin@largifysolutions.com',
    phone: '+966 59 736 9443',
    department: 'Administration',
    role: 'Administrator',
    country: 'Saudi Arabia',
  });

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/5">
        <div>
          <div className="mb-4 text-5xl">👨‍💼</div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">
            ADMIN <span className="text-purple-400">PROFILE</span>
          </h1>
          <p className="text-slate-400 font-light italic mt-4 max-w-2xl">
            Manage your administrator account and settings.
          </p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          className={`h-14 font-black uppercase tracking-wider rounded-2xl px-8 ${
            isEditing
              ? 'bg-red-600 hover:bg-red-900/200 text-white'
              : 'bg-purple-600 hover:bg-purple-500 text-white'
          }`}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      {/* Profile Card */}
      <Card className="bg-slate-900/50 border-white/5 rounded-[2.5rem] p-10">
        <div className="max-w-2xl">
          {/* Avatar Section */}
          <div className="flex items-start gap-8 mb-12 pb-8 border-b border-white/5">
            <div className="h-24 w-24 bg-purple-500/10 border-2 border-purple-500/20 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0">
              🛡️
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-2">
                {profileData.name}
              </h2>
              <p className="text-sm text-slate-400 mb-4">{profileData.email}</p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-black text-purple-400 uppercase tracking-wider">
                  {profileData.role}
                </span>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="space-y-6 mb-8">
            <h3 className="text-xl font-black text-white uppercase tracking-tight">
              Account Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(profileData).map(([key, value]) => (
                <div key={key}>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 block">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={value as string}
                      onChange={e =>
                        setProfileData({ ...profileData, [key]: e.target.value })
                      }
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50"
                    />
                  ) : (
                    <p className="text-white font-medium">{value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Security Settings */}
          <div className="space-y-6 pb-8 border-b border-white/5">
            <h3 className="text-xl font-black text-white uppercase tracking-tight">
              Security & Permissions
            </h3>

            <div className="space-y-3">
              <Button className="w-full bg-slate-900/5 hover:bg-slate-900/10 text-white font-black uppercase tracking-wider rounded-2xl h-12 border border-white/10">
                🔒 Change Password
              </Button>
              <Button className="w-full bg-slate-900/5 hover:bg-slate-900/10 text-white font-black uppercase tracking-wider rounded-2xl h-12 border border-white/10">
                ✓ Two-Factor Authentication
              </Button>
              <Button className="w-full bg-slate-900/5 hover:bg-slate-900/10 text-white font-black uppercase tracking-wider rounded-2xl h-12 border border-white/10">
                📋 Admin Activity Log
              </Button>
            </div>
          </div>

          {/* Admin Settings */}
          <div className="space-y-6 mt-8">
            <h3 className="text-xl font-black text-white uppercase tracking-tight">
              System Administration
            </h3>

            <div className="space-y-3">
              <Button className="w-full bg-slate-900/5 hover:bg-slate-900/10 text-white font-black uppercase tracking-wider rounded-2xl h-12 border border-white/10">
                👥 Manage Users
              </Button>
              <Button className="w-full bg-slate-900/5 hover:bg-slate-900/10 text-white font-black uppercase tracking-wider rounded-2xl h-12 border border-white/10">
                🔑 Role Management
              </Button>
              <Button className="w-full bg-slate-900/5 hover:bg-slate-900/10 text-white font-black uppercase tracking-wider rounded-2xl h-12 border border-white/10">
                ⚙️ System Settings
              </Button>
            </div>
          </div>

          {/* Save Changes */}
          {isEditing && (
            <div className="flex gap-4 mt-8 pt-8 border-t border-white/5">
              <Button className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-wider rounded-2xl h-12">
                💾 Save Changes
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-slate-900/5 hover:bg-slate-900/10 text-white font-black uppercase tracking-wider rounded-2xl h-12 border border-white/10"
              >
                ✗ Cancel
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
