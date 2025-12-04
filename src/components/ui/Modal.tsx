import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  hideClose?: boolean;
}

export function Modal({ isOpen, onClose, title, children, size = 'md', hideClose = false }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full m-4',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 animate-in fade-in duration-200"
        onClick={hideClose ? undefined : onClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-white rounded-lg ${sizes[size]} w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 fade-in duration-200 card-shadow-lg`}>
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
            <h3>{title}</h3>
            {!hideClose && (
              <button
                onClick={onClose}
                className="text-[#4B5563] hover:text-[#111827] transition-colors p-1 hover:bg-[#F3F4F6] rounded"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
        
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {children}
        </div>
      </div>
    </div>
  );
}
