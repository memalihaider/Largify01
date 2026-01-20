'use client';

import { useEffect, useState } from 'react';
import { NotificationBell } from './NotificationBell';

interface TopBarProps {
  userName?: string;
  userRole?: string;
  profileLink?: string;
  theme?: 'cyan' | 'purple' | 'green';
  onSidebarToggle?: () => void;
}

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export function TopBar({
  userName = 'User',
  userRole = 'Client',
  profileLink = '#',
  theme = 'cyan',
  onSidebarToggle,
}: TopBarProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(true);

  // Fetch notifications on mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications');
      const data = await response.json();
      if (data.success) {
        setNotifications(data.notifications || []);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setIsLoadingNotifications(false);
    }
  };

  const handleNotificationClick = async (notificationId: string) => {
    try {
      await fetch(`/api/notifications/${notificationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true }),
      });
      
      // Update local state
      setNotifications(prev =>
        prev.map(n =>
          n.id === notificationId
            ? { ...n, isRead: true, readAt: new Date().toISOString() }
            : n
        )
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const getThemeColor = () => {
    switch (theme) {
      case 'purple':
        return 'text-purple-400 hover:text-purple-300';
      case 'green':
        return 'text-green-400 hover:text-green-300';
      default:
        return 'text-cyan-400 hover:text-cyan-300';
    }
  };

  return (
    <div className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left: Sidebar Toggle (Mobile) + Logo/Brand */}
        <div className="flex items-center gap-3">
          {onSidebarToggle && (
            <button
              onClick={onSidebarToggle}
              className="h-10 w-10 text-slate-500 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-all flex items-center justify-center lg:hidden"
              title="Toggle sidebar"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
          <span className="text-2xl">⚡</span>
          <span className="text-sm font-black text-white uppercase tracking-widest hidden sm:inline">
            Largify
          </span>
        </div>

        {/* Center: Search (optional) */}
        <div className="flex-1 hidden md:flex justify-center">
          {/* Optional search bar can go here */}
        </div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center gap-4">
          {/* Notifications Bell */}
          <NotificationBell
            notifications={notifications}
            onNotificationClick={handleNotificationClick}
            isLoading={isLoadingNotifications}
          />

          {/* Profile Icon & Menu */}
          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <a
              href={profileLink}
              className={`p-2 rounded-full hover:bg-white/10 transition-colors ${getThemeColor()}`}
              title={`${userRole} Profile`}
            >
              <span className="text-lg">👤</span>
            </a>
            
            {/* User Info */}
            <div className="hidden sm:block">
              <p className="text-xs text-slate-400 uppercase tracking-widest">
                {userRole}
              </p>
              <p className="text-sm font-black text-white truncate max-w-xs">
                {userName}
              </p>
            </div>

            {/* Logout / Menu (optional) */}
            <button
              className="ml-2 p-1.5 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
              title="Menu"
            >
              <span className="text-lg">⋮</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
