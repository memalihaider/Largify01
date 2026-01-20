'use client';

import { useState } from 'react';
import { Card, Badge, Button, Avatar } from '@/components/ui';
import { mockEmployees, mockUsers, mockTimeEntries, mockTasks, mockLeaveRequests } from '@/lib/mock-data';

// Current employee (Sarah Chen - emp-002, usr-002)
const currentEmployee = mockEmployees[1];
const currentUser = mockUsers.find(u => u.id === currentEmployee.userId) || mockUsers[1];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'documents' | 'settings'>('profile');
  const [profileData, setProfileData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    phone: currentUser.phone || '',
    department: currentEmployee.department || '',
    position: currentEmployee.position || '',
    emergencyContactName: '',
    emergencyContactPhone: '',
  });

  // Stats
  const totalHoursLogged = mockTimeEntries
    .filter(t => t.userId === currentUser.id)
    .reduce((sum, t) => sum + t.hours, 0);
  const tasksCompleted = mockTasks
    .filter(t => (t.assignedTo === currentUser.id || t.assignedToId === currentUser.id) && t.status === 'done')
    .length;
  const leavesTaken = mockLeaveRequests
    .filter(l => l.employeeId === currentEmployee.id && l.status === 'approved')
    .reduce((sum, l) => sum + l.daysCount, 0);

  const handleSave = () => {
    // In real app, would save to backend
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  // Mock documents
  const documents = [
    { id: '1', name: 'Employment Contract', type: 'contract', uploadedAt: new Date('2024-03-15'), fileSize: '245 KB' },
    { id: '2', name: 'AWS Developer Associate Certificate', type: 'certificate', uploadedAt: new Date('2024-08-20'), expiryDate: new Date('2027-08-20'), fileSize: '128 KB' },
    { id: '3', name: 'ID Document', type: 'id', uploadedAt: new Date('2024-03-15'), fileSize: '1.2 MB' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500">Manage your personal information and documents</p>
        </div>
      </div>

      {/* Profile Card */}
      <Card variant="bordered" className="overflow-hidden">
        {/* Cover Image */}
        <div className="h-32 bg-linear-to-r from-green-500 to-green-600"></div>
        
        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-12">
            <div className="flex items-end gap-4">
              <Avatar
                src={currentUser.avatarUrl}
                alt={currentUser.fullName || ''}
                fallback={(currentUser.fullName || 'E').split(' ').map(n => n[0]).join('').substring(0, 2)}
                size="xl"
                className="ring-4 ring-white"
              />
              <div className="pb-2">
                <h2 className="text-xl font-bold text-gray-900">{currentUser.fullName}</h2>
                <p className="text-gray-500">{currentEmployee.position}</p>
              </div>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button
                variant={isEditing ? 'primary' : 'outline'}
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className={isEditing ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{totalHoursLogged}</p>
              <p className="text-sm text-gray-500">Hours Logged</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{tasksCompleted}</p>
              <p className="text-sm text-gray-500">Tasks Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{leavesTaken}</p>
              <p className="text-sm text-gray-500">Leave Days</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        {(['profile', 'documents', 'settings'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card variant="bordered" className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{profileData.email}</p>
                <p className="text-xs text-gray-500 mt-1">Contact HR to change your email address</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder="+1 555 0100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.phone || '-'}</p>
                )}
              </div>
            </div>
          </Card>

          {/* Employment Information */}
          <Card variant="bordered" className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Employment Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                <p className="text-gray-900">{currentEmployee.employeeCode}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <p className="text-gray-900">{currentEmployee.department}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <p className="text-gray-900">{currentEmployee.position}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                <p className="text-gray-900 capitalize">{currentEmployee.employmentType?.replace('_', ' ')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <p className="text-gray-900">
                  {currentEmployee.hireDate 
                    ? new Date(currentEmployee.hireDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                    : '-'}
                </p>
              </div>
            </div>
          </Card>

          {/* Skills */}
          <Card variant="bordered" className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Certifications</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                <div className="flex flex-wrap gap-2">
                  {currentEmployee.skills?.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                <div className="flex flex-wrap gap-2">
                  {currentEmployee.certifications?.map((cert, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {cert}
                    </span>
                  )) || <span className="text-gray-500 text-sm">No certifications</span>}
                </div>
              </div>
            </div>
          </Card>

          {/* Emergency Contact */}
          <Card variant="bordered" className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.emergencyContactName}
                    onChange={(e) => setProfileData({ ...profileData, emergencyContactName: e.target.value })}
                    placeholder="Full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.emergencyContactName || 'Not set'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.emergencyContactPhone}
                    onChange={(e) => setProfileData({ ...profileData, emergencyContactPhone: e.target.value })}
                    placeholder="+1 555 0100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.emergencyContactPhone || 'Not set'}</p>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'documents' && (
        <Card variant="bordered" className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">My Documents</h3>
            <Button variant="outline" size="sm">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload Document
            </Button>
          </div>
          <div className="space-y-3">
            {documents.map(doc => (
              <div 
                key={doc.id} 
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{doc.name}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="capitalize">{doc.type}</span>
                      <span>•</span>
                      <span>{doc.fileSize}</span>
                      <span>•</span>
                      <span>Uploaded {new Date(doc.uploadedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {doc.expiryDate && (
                    <span className="text-xs text-gray-500">
                      Expires: {new Date(doc.expiryDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  )}
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card variant="bordered" className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              {[
                { label: 'Email notifications for task updates', enabled: true },
                { label: 'Email notifications for leave approvals', enabled: true },
                { label: 'Browser push notifications', enabled: false },
                { label: 'Weekly summary email', enabled: true },
              ].map((pref, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{pref.label}</span>
                  <button
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      pref.enabled ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        pref.enabled ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="bordered" className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Two-Factor Authentication
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Login History
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
