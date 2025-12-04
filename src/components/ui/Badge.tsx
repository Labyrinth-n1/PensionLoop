import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'blue' | 'orange' | 'gray';
  className?: string;
}

export function Badge({ children, variant = 'info', className = '' }: BadgeProps) {
  const variants = {
    success: 'bg-[#D1FAE5] text-[#059669] border-[#A7F3D0]',
    warning: 'bg-[#FEF3C7] text-[#F59E0B] border-[#FDE68A]',
    error: 'bg-[#FEE2E2] text-[#DC2626] border-[#FECACA]',
    info: 'bg-[#DBEAFE] text-[#0EA5E9] border-[#BFDBFE]',
    blue: 'bg-[#DBEAFE] text-[#1E40AF] border-[#BFDBFE]',
    orange: 'bg-[#FFEDD5] text-[#FF6B00] border-[#FED7AA]',
    gray: 'bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border body-small ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
