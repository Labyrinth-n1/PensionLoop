import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, onClick }: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-lg p-6 transition-all duration-200
        ${hover ? 'hover:shadow-lg hover:scale-[1.02] cursor-pointer' : 'card-shadow-md'}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
