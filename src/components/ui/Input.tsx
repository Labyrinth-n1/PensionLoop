import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
  helperText?: string;
}

export function Input({
  label,
  error,
  success,
  icon,
  helperText,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-[#111827]">
          {label}
          {props.required && <span className="text-[#DC2626] ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B5563]">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full px-3 py-2 rounded border transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20' : ''}
            ${success ? 'border-[#059669] focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20' : ''}
            ${!error && !success ? 'border-[#E5E7EB] focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20' : ''}
            disabled:bg-[#F3F4F6] disabled:cursor-not-allowed
            placeholder:text-[#9CA3AF]
            ${className}
          `}
          {...props}
        />
        {success && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#059669]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        )}
        {error && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#DC2626]">
            <AlertCircle className="w-5 h-5" />
          </div>
        )}
      </div>
      {error && <p className="mt-1 body-small text-[#DC2626]">{error}</p>}
      {helperText && !error && <p className="mt-1 body-small text-[#4B5563]">{helperText}</p>}
    </div>
  );
}
