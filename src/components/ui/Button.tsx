import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'text';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#1E40AF] text-white hover:bg-[#1E3A8A] active:transform active:translate-y-[1px] shadow-sm',
    secondary: 'bg-[#F3F4F6] text-[#111827] hover:bg-[#E5E7EB] active:transform active:translate-y-[1px]',
    danger: 'bg-[#DC2626] text-white hover:bg-[#B91C1C] active:transform active:translate-y-[1px] shadow-sm',
    outline: 'border-2 border-[#E5E7EB] text-[#111827] hover:border-[#1E40AF] hover:text-[#1E40AF] hover:bg-[#F9FAFB]',
    ghost: 'text-[#4B5563] hover:bg-[#F3F4F6] hover:text-[#111827]',
    text: 'text-[#1E40AF] hover:text-[#1E3A8A] hover:underline',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 rounded-md',
    md: 'px-4 py-2 rounded-md',
    lg: 'px-6 py-3 rounded-md',
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && icon && icon}
      {children}
    </button>
  );
}
