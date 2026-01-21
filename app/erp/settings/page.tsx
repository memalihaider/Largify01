'use client';

import { useState, useRef } from 'react';
import { Card, Input, Button, Badge, Avatar } from '@/components/ui';
import { mockUsers, mockEmployees } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

// Mock data for employee portal configuration
const portalFeatures = [
  { id: 'projects', name: 'Projects', description: 'View and manage assigned projects', enabled: true },
  { id: 'tasks', name: 'Tasks', description: 'Work on project tasks and subtasks', enabled: true },
  { id: 'time_entries', name: 'Time Tracking', description: 'Log and review work hours', enabled: true },
  { id: 'leave', name: 'Leave & PTO', description: 'Request and track leave', enabled: true },
  { id: 'expenses', name: 'Expenses', description: 'Submit and track reimbursements', enabled: true },
  { id: 'knowledge', name: 'Knowledge Base', description: 'Access internal documentation', enabled: true },
  { id: 'profile', name: 'Profile & Documents', description: 'Manage personal info and documents', enabled: true },
];

const portalRoles = [
  { id: 'portal_admin', name: 'Portal Admin', description: 'Full employee portal administration', employeeCount: 1 },
  { id: 'team_lead', name: 'Team Lead', description: 'Manage team tasks and approvals', employeeCount: 1 },
  { id: 'employee', name: 'Employee', description: 'Standard employee self-service access', employeeCount: 2, isDefault: true },
];

export default function Settings() {
  const currentUser = mockUsers[0];
  const [activeTab, setActiveTab] = useState<'profile' | 'company' | 'notifications' | 'security' | 'portal'>('profile');
  const [features, setFeatures] = useState(portalFeatures);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [companyLogo, setCompanyLogo] = useState<string>('https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&fit=crop');
  const [logoPreview, setLogoPreview] = useState<string>(companyLogo);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [companySaved, setCompanySaved] = useState(false);

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'company', name: 'Company', icon: '🏢' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'portal', name: 'Employee Portal', icon: '🚪' },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-slate-400">Manage your account and system preferences</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-800">
        <nav className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-700'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <Card variant="bordered">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Personal Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    value={currentUser.firstName}
                    readOnly
                  />
                  <Input
                    label="Last Name"
                    value={currentUser.lastName}
                    readOnly
                  />
                </div>
                <Input
                  label="Email"
                  type="email"
                  value={currentUser.email}
                  readOnly
                />
                <Input
                  label="Phone"
                  value={currentUser.phone || ''}
                  readOnly
                />
                <div className="pt-4">
                  <Button>Update Profile</Button>
                </div>
              </div>
            </div>
          </Card>

          <Card variant="bordered">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Avatar</h3>
              <div className="flex items-center gap-6">
                <img
                  src={currentUser.avatarUrl}
                  alt={`${currentUser.firstName} ${currentUser.lastName}`}
                  className="h-24 w-24 rounded-full"
                />
                <div>
                  <Button variant="outline">Change Avatar</Button>
                  <p className="mt-2 text-sm text-slate-400">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Company Tab */}
      {activeTab === 'company' && (
        <div className="space-y-6">
          {/* Company Logo */}
          <Card variant="bordered">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Company Logo</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-8">
                  <div className="shrink-0">
                    <div className="relative">
                      <img
                        src={logoPreview}
                        alt="Company Logo"
                        className="h-32 w-32 rounded-lg border-2 border-slate-800 object-cover shadow-md"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-400 mb-4">
                      Upload a professional company logo that will be displayed on all quotations and documents.
                    </p>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => logoInputRef.current?.click()}
                        variant="outline"
                      >
                        📤 Upload Logo
                      </Button>
                      {logoPreview !== '' && (
                        <Button
                          onClick={() => {
                            setLogoPreview('');
                            setCompanyLogo('');
                            setCompanySaved(false);
                          }}
                          variant="outline"
                          className="text-red-400 hover:text-red-700"
                        >
                          ✕ Remove
                        </Button>
                      )}
                    </div>
                    <p className="mt-3 text-xs text-slate-400">
                      JPG, PNG or GIF. Recommended size: 200x200px. Max size 2MB.
                    </p>
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const result = event.target?.result as string;
                            setLogoPreview(result);
                            setCompanyLogo(result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Button
                    onClick={() => setCompanySaved(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    💾 Save Logo
                  </Button>
                  {companySaved && (
                    <p className="mt-2 text-sm text-emerald-400">✓ Logo saved successfully!</p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Company Information */}
          <Card variant="bordered">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Company Information</h3>
              <div className="space-y-4">
                <Input
                  label="Company Name"
                  defaultValue="Largify Solutions Inc."
                />
                <Input
                  label="Email"
                  type="email"
                  defaultValue="info@largify.com"
                />
                <Input
                  label="Phone"
                  defaultValue="+1 (555) 123-4567"
                />
                <Input
                  label="Website"
                  defaultValue="www.largify.com"
                />
                <Input
                  label="Industry"
                  defaultValue="Technology & Consulting"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Company Size"
                    defaultValue="Small (1-50 employees)"
                  />
                  <Input
                    label="Founded"
                    defaultValue="2024"
                  />
                </div>
                <div className="pt-4 border-t">
                  <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Business Address */}
          <Card variant="bordered">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Business Address</h3>
              <div className="space-y-4">
                <Input
                  label="Street Address"
                  defaultValue="123 Business Avenue"
                />
                <div className="grid grid-cols-3 gap-4">
                  <Input
                    label="City"
                    defaultValue="Tech City"
                  />
                  <Input
                    label="State"
                    defaultValue="TC"
                  />
                  <Input
                    label="ZIP Code"
                    defaultValue="12345"
                  />
                </div>
                <Input
                  label="Country"
                  defaultValue="United States"
                />
                <div className="pt-4">
                  <Button>Save Address</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <Card variant="bordered">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Email Notifications</h3>
              <div className="space-y-4">
                {[
                  { id: 'leads', label: 'New leads', description: 'Get notified when new leads are created' },
                  { id: 'tasks', label: 'Task assignments', description: 'Get notified when tasks are assigned to you' },
                  { id: 'projects', label: 'Project updates', description: 'Get notified about project milestone changes' },
                  { id: 'invoices', label: 'Invoice status', description: 'Get notified when invoices are paid' },
                  { id: 'team', label: 'Team changes', description: 'Get notified about team member updates' },
                ].map(item => (
                  <div key={item.id} className="flex items-center justify-between py-3 border-b border-slate-800">
                    <div>
                      <p className="font-medium text-white">{item.label}</p>
                      <p className="text-sm text-slate-400">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-slate-900 after:border-slate-700 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card variant="bordered">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Push Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-white">Enable push notifications</p>
                    <p className="text-sm text-slate-400">Receive notifications in your browser</p>
                  </div>
                  <Badge variant="warning">Coming Soon</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <Card variant="bordered">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Change Password</h3>
              <div className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  placeholder="Enter current password"
                />
                <Input
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  placeholder="Confirm new password"
                />
                <div className="pt-4">
                  <Button>Update Password</Button>
                </div>
              </div>
            </div>
          </Card>

          <Card variant="bordered">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Two-Factor Authentication</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-white">Enable 2FA</p>
                    <p className="text-sm text-slate-400">Add an extra layer of security to your account</p>
                  </div>
                  <Badge variant="info">Recommended</Badge>
                </div>
                <div className="pt-4">
                  <Button variant="outline">Set Up 2FA</Button>
                </div>
              </div>
            </div>
          </Card>

          <Card variant="bordered">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Active Sessions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-950/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-900/20 rounded-lg">
                      <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-white">MacBook Pro - Current Session</p>
                      <p className="text-sm text-slate-400">San Francisco, CA • Last active: Just now</p>
                    </div>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Portal Management Tab */}
      {activeTab === 'portal' && (
        <div className="space-y-6">
          {/* Portal Features */}
          <Card variant="bordered">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Portal Features</h3>
                  <p className="text-sm text-slate-400">Enable or disable features available to employees</p>
                </div>
                <a 
                  href="/employee" 
                  target="_blank"
                  className="text-sm text-emerald-400 hover:text-green-700 flex items-center gap-1"
                >
                  Preview Portal
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              <div className="space-y-4">
                {features.map((feature) => (
                  <div key={feature.id} className="flex items-center justify-between p-4 bg-slate-950/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">{feature.name}</p>
                      <p className="text-sm text-slate-400">{feature.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={feature.enabled}
                        onChange={() => {
                          setFeatures(features.map(f => 
                            f.id === feature.id ? { ...f, enabled: !f.enabled } : f
                          ));
                        }}
                      />
                      <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-slate-900 after:border-slate-700 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t mt-6">
                <Button>Save Feature Settings</Button>
              </div>
            </div>
          </Card>

          {/* Portal Roles */}
          <Card variant="bordered">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Portal Roles</h3>
                  <p className="text-sm text-slate-400">Manage roles and their feature permissions</p>
                </div>
                <Button variant="outline" size="sm">
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Role
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {portalRoles.map((role) => (
                  <div 
                    key={role.id} 
                    className={cn(
                      "p-4 rounded-lg border-2 cursor-pointer transition-all",
                      selectedRole === role.id 
                        ? "border-green-500 bg-green-900/20" 
                        : "border-slate-800 hover:border-slate-700"
                    )}
                    onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{role.name}</h4>
                      {role.isDefault && <Badge variant="info">Default</Badge>}
                    </div>
                    <p className="text-sm text-slate-400 mb-3">{role.description}</p>
                    <p className="text-xs text-slate-500">{role.employeeCount} employee(s) assigned</p>
                  </div>
                ))}
              </div>
              
              {/* Role Permissions (shown when a role is selected) */}
              {selectedRole && (
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium text-white mb-4">
                    Permissions for: {portalRoles.find(r => r.id === selectedRole)?.name}
                  </h4>
                  <div className="grid gap-3 md:grid-cols-2">
                    {features.map((feature) => (
                      <label key={feature.id} className="flex items-center gap-3 p-3 bg-slate-950/50 rounded-lg cursor-pointer">
                        <input 
                          type="checkbox" 
                          defaultChecked={feature.enabled}
                          className="w-4 h-4 text-emerald-400 bg-slate-800 border-slate-700 rounded focus:ring-green-500"
                        />
                        <span className="text-sm text-slate-300">{feature.name}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm">Save Permissions</Button>
                    <Button variant="outline" size="sm" onClick={() => setSelectedRole(null)}>Cancel</Button>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Employee Role Assignments */}
          <Card variant="bordered">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Employee Role Assignments</h3>
                  <p className="text-sm text-slate-400">Assign portal roles to employees</p>
                </div>
                <Input 
                  placeholder="Search employees..."
                  className="w-64"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium text-slate-400">Employee</th>
                      <th className="pb-3 font-medium text-slate-400">Department</th>
                      <th className="pb-3 font-medium text-slate-400">Current Role</th>
                      <th className="pb-3 font-medium text-slate-400">Portal Access</th>
                      <th className="pb-3 font-medium text-slate-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockEmployees.map((employee) => (
                      <tr key={employee.id} className="border-b">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <Avatar 
                              firstName={employee.user?.firstName || ''}
                              lastName={employee.user?.lastName || ''}
                              size="sm"
                            />
                            <div>
                              <p className="font-medium text-white">
                                {employee.user?.firstName} {employee.user?.lastName}
                              </p>
                              <p className="text-sm text-slate-400">{employee.user?.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-slate-400">{employee.department}</td>
                        <td className="py-4">
                          <select 
                            className="text-sm border border-slate-700 rounded-md px-2 py-1 focus:ring-green-500 focus:border-green-500"
                            defaultValue={employee.position?.includes('Lead') ? 'team_lead' : 'employee'}
                          >
                            {portalRoles.map((role) => (
                              <option key={role.id} value={role.id}>{role.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="py-4">
                          <Badge variant={employee.status === 'active' ? 'success' : 'secondary'}>
                            {employee.status === 'active' ? 'Enabled' : 'Disabled'}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-700">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                              </svg>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pt-6 border-t mt-6 flex justify-between items-center">
                <p className="text-sm text-slate-400">{mockEmployees.length} employees with portal access</p>
                <Button>Save Assignments</Button>
              </div>
            </div>
          </Card>

          {/* Portal Activity Log */}
          <Card variant="bordered">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Recent Portal Activity</h3>
                  <p className="text-sm text-slate-400">Track employee portal usage and changes</p>
                </div>
                <Button variant="outline" size="sm">View All Logs</Button>
              </div>
              <div className="space-y-3">
                {[
                  { action: 'Submitted expense report', user: 'Sarah Chen', time: '5 minutes ago', icon: '💰' },
                  { action: 'Requested time off', user: 'Mike Johnson', time: '1 hour ago', icon: '🏖️' },
                  { action: 'Updated profile information', user: 'Sarah Chen', time: '2 hours ago', icon: '👤' },
                  { action: 'Logged time entry', user: 'John Smith', time: '3 hours ago', icon: '⏰' },
                  { action: 'Accessed knowledge base', user: 'Emily Davis', time: '5 hours ago', icon: '📚' },
                ].map((log, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-slate-950/50 rounded-lg">
                    <span className="text-xl">{log.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm text-white">
                        <span className="font-medium">{log.user}</span> {log.action}
                      </p>
                      <p className="text-xs text-slate-400">{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
