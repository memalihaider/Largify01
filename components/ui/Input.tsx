import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s/g, '-');
  
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-black text-slate-500 mb-2 uppercase tracking-[0.2em]"
        >
          {label}
        </label>
      )}
      <div className="relative group">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            'block w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white placeholder-slate-600 font-medium',
            'focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50',
            'disabled:bg-slate-900 disabled:text-slate-600 disabled:cursor-not-allowed',
            'transition-all duration-300 shadow-inner',
            leftIcon ? 'pl-12' : '',
            rightIcon ? 'pr-12' : '',
            error ? 'border-red-500/50 focus:ring-red-500/20' : '',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-[10px] font-bold text-red-500 uppercase tracking-tighter">{error}</p>}
      {helperText && !error && (
        <p className="mt-2 text-[10px] font-bold text-slate-600 uppercase tracking-tighter">{helperText}</p>
      )}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Textarea({
  label,
  error,
  helperText,
  className,
  id,
  ...props
}: TextareaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s/g, '-');
  
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={cn(
          'block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
          'transition-all duration-200 resize-none',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export function Select({
  label,
  error,
  options,
  className,
  id,
  ...props
}: SelectProps) {
  const inputId = id || label?.toLowerCase().replace(/\s/g, '-');
  
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <select
        id={inputId}
        className={cn(
          'block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
          'transition-all duration-200',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
