'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Input, Card } from '@/components/ui';
import { mockClientUsers } from '@/lib/mock-data';

export default function ClientLoginPage() {
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

    // Mock authentication - check if client exists
    const client = mockClientUsers.find(c => c.email === email);
    
    if (client && password === 'password123') {
      // Redirect to client portal
      window.location.href = `/client/${client.id}`;
    } else {
      setError('Invalid email or password');
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (clientId: string) => {
    window.location.href = `/client/${clientId}`;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Largify Client Portal</h1>
          <p className="text-gray-600">Track your projects, applications, and tasks</p>
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
            <span className="text-sm text-gray-500">Demo Credentials</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Demo Logins */}
          <div className="space-y-2">
            <p className="text-xs text-gray-600 mb-3">Try demo client accounts (password: <code className="bg-gray-100 px-1 rounded">password123</code>)</p>
            {mockClientUsers.map((client) => (
              <button
                key={client.id}
                onClick={() => handleDemoLogin(client.id)}
                className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all"
              >
                <div>
                  <p className="font-medium text-gray-900">{client.name}</p>
                  <p className="text-xs text-gray-500">{client.email}</p>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Footer Links */}
        <div className="text-center space-y-2">
          <div className="flex gap-4 justify-center text-sm">
            <Link href="/2365653214" className="text-blue-600 hover:text-blue-700 underline">
              Admin/Employee Login
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
