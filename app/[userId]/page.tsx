'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Input, Card } from '@/components/ui';
import { mockUsers, mockEmployees } from '@/lib/mock-data';

interface PageProps {
  params: {
    userId: string;
  };
}

export default function UserLoginPage({ params }: PageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock authentication
    const user = mockUsers.find(u => u.email === email);
    
    if (user && password === 'password123') {
      // Check if user is admin or employee
      const employee = mockEmployees.find(emp => emp.userId === user.id);
      
      if (user.id === 'usr-001') {
        // Admin user - redirect to admin portal
        window.location.href = '/erp';
      } else if (employee) {
        // Employee user - redirect to employee portal
        window.location.href = '/employee';
      } else {
        setError('User role not configured');
        setIsLoading(false);
      }
    } else {
      setError('Invalid email or password');
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user?.id === 'usr-001') {
      window.location.href = '/erp';
    } else {
      window.location.href = '/employee';
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Largify Portal</h1>
          <p className="text-gray-600">Admin & Employee Access</p>
        </div>

        {/* Login Card */}
        <Card variant="bordered" className="p-8 mb-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <Input
                label="Email Address"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500">Demo Accounts</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Demo Accounts */}
          <div className="space-y-2">
            <p className="text-xs text-gray-600 mb-3">Try demo accounts (password: <code className="bg-gray-100 px-1 rounded">password123</code>)</p>
            
            {/* Admin Demo */}
            <button
              onClick={() => handleDemoLogin('usr-001')}
              className="w-full p-3 text-left border border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-all bg-blue-50"
            >
              <div>
                <p className="font-medium text-gray-900">
                  👨‍💼 Admin
                </p>
                <p className="text-xs text-gray-600">James Wilson</p>
                <p className="text-xs text-gray-500">{mockUsers[0].email}</p>
              </div>
            </button>

            {/* Employee Demos */}
            {mockUsers.slice(1, 3).map((user) => (
              <button
                key={user.id}
                onClick={() => handleDemoLogin(user.id)}
                className="w-full p-3 text-left border border-green-200 rounded-lg hover:bg-green-50 hover:border-green-400 transition-all bg-green-50"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    👤 Employee
                  </p>
                  <p className="text-xs text-gray-600">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Footer Links */}
        <div className="text-center space-y-2">
          <div className="flex gap-4 justify-center text-sm flex-wrap">
            <Link href="/login" className="text-blue-600 hover:text-blue-700 underline">
              Client Login
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/" className="text-blue-600 hover:text-blue-700 underline">
              Home
            </Link>
          </div>
          <p className="text-xs text-gray-500">
            © 2026 Largify Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
