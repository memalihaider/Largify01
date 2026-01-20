'use client';

import { use, useState } from 'react';
import { Button, Card } from '@/components/ui';
import { mockClientUsers } from '@/lib/mock-data';

interface PageProps {
  params: Promise<{
    clientId: string;
  }>;
}

export default function ClientProfilePage({ params }: PageProps) {
  const { clientId } = use(params);
  const client = mockClientUsers.find(c => c.id === clientId);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(client || {
    id: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    companyName: '',
    industry: '',
    website: '',
    country: '',
  });

  if (!client) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Client not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/5">
        <div>
          <div className="mb-4 text-5xl">👤</div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">
            MY <span className="text-cyan-400">PROFILE</span>
          </h1>
          <p className="text-slate-400 font-light italic mt-4 max-w-2xl">
            Manage your account information and portal settings.
          </p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          className={`h-14 font-black uppercase tracking-wider rounded-2xl px-8 ${
            isEditing
              ? 'bg-red-600 hover:bg-red-500 text-white'
              : 'bg-cyan-600 hover:bg-cyan-500 text-white'
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
            <div className="h-24 w-24 bg-cyan-500/10 border-2 border-cyan-500/20 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0">
              🏢
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-2">
                {client.name}
              </h2>
              <p className="text-sm text-slate-400 mb-4">{client.email}</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-black text-cyan-400 uppercase tracking-wider">
                  Client
                </span>
                <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-xs font-black text-green-400 uppercase tracking-wider">
                  Active
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
              <div>
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 block">
                  Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name || ''}
                    onChange={e =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
                  />
                ) : (
                  <p className="text-white font-medium">{client.name}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 block">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email || ''}
                    onChange={e =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
                  />
                ) : (
                  <p className="text-white font-medium">{client.email}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 block">
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone || ''}
                    onChange={e =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
                  />
                ) : (
                  <p className="text-white font-medium">{client.phone || 'N/A'}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 block">
                  Country
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.country || ''}
                    onChange={e =>
                      setProfileData({ ...profileData, country: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
                  />
                ) : (
                  <p className="text-white font-medium">{client.country || 'N/A'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="space-y-6 mb-8 pb-8 border-b border-white/5">
            <h3 className="text-xl font-black text-white uppercase tracking-tight">
              Company Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 block">
                  Company Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.companyName || ''}
                    onChange={e =>
                      setProfileData({ ...profileData, companyName: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
                  />
                ) : (
                  <p className="text-white font-medium">{client.companyName || 'N/A'}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 block">
                  Industry
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.industry || ''}
                    onChange={e =>
                      setProfileData({ ...profileData, industry: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
                  />
                ) : (
                  <p className="text-white font-medium">{client.industry || 'N/A'}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 block">
                  Website
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profileData.website || ''}
                    onChange={e =>
                      setProfileData({ ...profileData, website: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
                  />
                ) : (
                  <p className="text-white font-medium">{client.website || 'N/A'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-white uppercase tracking-tight">
              Security & Privacy
            </h3>

            <div className="space-y-3">
              <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black uppercase tracking-wider rounded-2xl h-12 border border-white/10">
                🔒 Change Password
              </Button>
              <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black uppercase tracking-wider rounded-2xl h-12 border border-white/10">
                ✓ Two-Factor Authentication
              </Button>
              <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black uppercase tracking-wider rounded-2xl h-12 border border-white/10">
                📋 Activity Log
              </Button>
            </div>
          </div>

          {/* Save Changes */}
          {isEditing && (
            <div className="flex gap-4 mt-8 pt-8 border-t border-white/5">
              <Button className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase tracking-wider rounded-2xl h-12">
                💾 Save Changes
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-black uppercase tracking-wider rounded-2xl h-12 border border-white/10"
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
