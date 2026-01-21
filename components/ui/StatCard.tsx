import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  trend?: number; // Changed from string to number
  subtitle?: string;
  icon?: React.ReactNode;
  iconColor?: string;
  description?: string;
}

export function StatCard({
  title,
  value,
  change,
  trend,
  subtitle,
  icon,
  iconColor = 'bg-blue-500/10 text-blue-400',
  description,
}: StatCardProps) {
  return (
    <Card variant="bordered" className="p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -mr-16 -mt-16 rounded-full group-hover:bg-blue-500/10 transition-all duration-500" />
      <div className="flex items-start justify-between relative z-10">
        <div className="flex-1">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{title}</p>
          <p className="mt-2 text-3xl font-black text-white italic tracking-tighter">{value}</p>
          {change && (
            <div className="mt-2 flex items-center gap-1">
              {change.type === 'increase' ? (
                <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              ) : (
                <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
              <span
                className={cn(
                  'text-sm font-bold',
                  change.type === 'increase' ? 'text-emerald-400' : 'text-red-400'
                )}
              >
                {change.value}%
              </span>
              <span className="text-xs text-slate-600 font-medium uppercase ml-1">vs last month</span>
            </div>
          )}
          {description && (
            <p className="mt-2 text-xs text-slate-500 font-medium italic">{description}</p>
          )}
        </div>
        {icon && (
          <div className={cn('p-3 rounded-xl border border-white/5 shadow-inner transition-transform group-hover:scale-110 duration-300', iconColor)}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
