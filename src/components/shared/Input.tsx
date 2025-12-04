import React from 'react';
import { Check, AlertCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
}

export function Input({ label, error, success, icon, className = '', ...props }: InputProps) {
  const inputClasses = `
    w-full px-4 py-2 border rounded-md transition-all
    ${error ? 'border-[#DC2626] focus:border-[#DC2626]' : success ? 'border-[#059669]' : 'border-gray-300 focus:border-[#1E40AF]'}
    ${props.disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
    focus:outline-none focus:ring-2 focus:ring-blue-100
    ${icon ? 'pl-10' : ''}
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1.5 text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input className={inputClasses} {...props} />
        {success && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#059669]">
            <Check className="w-5 h-5" />
          </div>
        )}
        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#DC2626]">
            <AlertCircle className="w-5 h-5" />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-[#DC2626] text-small">{error}</p>
      )}
    </div>
  );
}
