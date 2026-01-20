import React from 'react';
import { cn, getInitials } from '@/lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  firstName?: string;
  lastName?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Avatar({
  src,
  alt,
  firstName = '',
  lastName = '',
  fallback,
  size = 'md',
  className,
  ...props
}: AvatarProps) {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  };
  
  const initials = fallback || getInitials(firstName, lastName);
  
  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-medium overflow-hidden',
        sizes[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt || `${firstName} ${lastName}`}
          className="h-full w-full object-cover"
        />
      ) : (
        <span>{initials || '?'}</span>
      )}
    </div>
  );
}

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: Array<{
    src?: string;
    firstName?: string;
    lastName?: string;
  }>;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function AvatarGroup({
  avatars,
  max = 4,
  size = 'md',
  className,
  ...props
}: AvatarGroupProps) {
  const displayAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;
  
  const overlapSizes = {
    sm: '-ml-2',
    md: '-ml-3',
    lg: '-ml-4',
  };
  
  return (
    <div className={cn('flex items-center', className)} {...props}>
      {displayAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          {...avatar}
          size={size}
          className={cn(
            'ring-2 ring-white',
            index > 0 && overlapSizes[size]
          )}
        />
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            'inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-600 font-medium ring-2 ring-white',
            size === 'sm' && 'h-8 w-8 text-xs -ml-2',
            size === 'md' && 'h-10 w-10 text-sm -ml-3',
            size === 'lg' && 'h-12 w-12 text-base -ml-4'
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
