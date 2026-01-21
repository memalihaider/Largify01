import React from 'react';
import { cn, statusColors } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'outline' | 'ghost';
  size?: 'sm' | 'md';
  status?: string;
}

export function Badge({
  children,
  className,
  variant = 'default',
  size = 'md',
  status,
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border border-slate-700',
    secondary: 'bg-slate-900/50 text-slate-400 border border-slate-800',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]',
    danger: 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]',
    info: 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]',
    outline: 'bg-transparent border border-slate-700 text-slate-400',
    ghost: 'bg-transparent text-slate-500',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
  };
  
  // Use status color if status is provided, otherwise use variant
  const colorClass = status && statusColors[status] ? statusColors[status] : variants[variant];
  
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full capitalize',
        colorClass,
        sizes[size],
        className
      )}
      {...props}
    >
      {children || status?.replace(/_/g, ' ')}
    </span>
  );
}
