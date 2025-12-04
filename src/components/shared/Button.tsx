import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'text';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  children, 
  className = '',
  disabled,
  ...props 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-[#1E40AF] text-white hover:bg-[#1E3A8A] active:translate-y-[1px]',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:translate-y-[1px]',
    danger: 'bg-[#DC2626] text-white hover:bg-red-700 active:translate-y-[1px]',
    outline: 'border-2 border-[#1E40AF] text-[#1E40AF] hover:bg-blue-50 active:translate-y-[1px]',
    ghost: 'text-[#1E40AF] hover:bg-blue-50 active:translate-y-[1px]',
    text: 'text-[#1E40AF] hover:underline'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 rounded-[4px]',
    md: 'px-4 py-2 rounded-[6px]',
    lg: 'px-6 py-3 rounded-[6px]'
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
