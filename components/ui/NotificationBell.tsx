'use client';

import { useState, useEffect, useRef } from 'react';
import { Badge } from './Badge';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationBellProps {
  notifications: Notification[];
  onNotificationClick?: (notificationId: string) => void;
  isLoading?: boolean;
}

export function NotificationBell({
  notifications,
  onNotificationClick,
  isLoading,
}: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'project_update':
        return '📊';
      case 'message':
        return '💬';
      case 'task_completed':
        return '✅';
      case 'application_deployed':
        return '🚀';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      default:
        return '🔔';
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
        title="Notifications"
      >
        <span className="text-xl">🔔</span>
        {unreadCount > 0 && (
          <Badge className="absolute top-0 right-0 h-5 w-5 flex items-center justify-center bg-red-500 text-white border-0 text-[10px] font-black rounded-full p-0">
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-80 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/5 bg-slate-800/50">
            <h3 className="text-sm font-black text-white uppercase tracking-tight">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <p className="text-xs text-slate-500 mt-1">
                {unreadCount} unread
              </p>
            )}
          </div>

          {/* Notification List */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-slate-500 text-sm">
                <div className="animate-spin">⏳</div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-6 text-center">
                <div className="text-3xl mb-2">🔔</div>
                <p className="text-sm text-slate-500 italic">No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {notifications.map(notif => (
                  <button
                    key={notif.id}
                    onClick={() => {
                      onNotificationClick?.(notif.id);
                      if (notif.link) {
                        window.location.href = notif.link;
                      }
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-3 hover:bg-white/5 transition-colors ${
                      !notif.isRead ? 'bg-blue-500/5' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="text-lg flex-shrink-0 mt-1">
                        {getNotificationIcon(notif.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex gap-2 items-start">
                          <h4 className="text-xs font-black text-white uppercase tracking-tight flex-1 line-clamp-1">
                            {notif.title}
                          </h4>
                          {!notif.isRead && (
                            <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5" />
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {notif.message}
                        </p>
                        <p className="text-[10px] text-slate-600 mt-2">
                          {formatTime(notif.createdAt)}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-2 border-t border-white/5 bg-slate-800/30 text-center">
              <button className="text-xs font-black text-slate-400 hover:text-slate-300 uppercase tracking-wider">
                View All
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
