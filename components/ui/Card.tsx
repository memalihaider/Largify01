import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated';
}

export function Card({ children, className, variant = 'default', ...props }: CardProps) {
  const variants = {
    default: 'bg-slate-900/50 backdrop-blur-md rounded-xl border border-slate-800',
    bordered: 'bg-slate-900/50 backdrop-blur-md rounded-xl border border-slate-800 shadow-xl shadow-black/20',
    elevated: 'bg-slate-900 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.4)] border border-slate-800/50',
  };
  
  return (
    <div className={cn(variants[variant], className)} {...props}>
      {children}
    </div>
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <div className={cn('px-6 py-4 border-b border-slate-800/50', className)} {...props}>
      {children}
    </div>
  );
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function CardTitle({ children, className, ...props }: CardTitleProps) {
  return (
    <h3 className={cn('text-lg font-bold text-white tracking-tight', className)} {...props}>
      {children}
    </h3>
  );
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function CardDescription({ children, className, ...props }: CardDescriptionProps) {
  return (
    <p className={cn('text-sm text-slate-400 mt-1 font-medium', className)} {...props}>
      {children}
    </p>
  );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ children, className, ...props }: CardFooterProps) {
  return (
    <div className={cn('px-6 py-4 border-t border-slate-800/50', className)} {...props}>
      {children}
    </div>
  );
}
