import React from 'react';
import { Search, Bell, ChevronDown, User } from 'lucide-react';
import { currentUser } from '../data/sampleData';

interface HeaderProps {
  breadcrumbs: string[];
}

export function Header({ breadcrumbs }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-[#E5E7EB] fixed top-0 left-60 right-0 z-30 flex items-center justify-between px-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[#4B5563]">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span>/</span>}
            <span className={index === breadcrumbs.length - 1 ? 'text-[#111827] font-medium' : ''}>
              {crumb}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20 transition-all"
          />
        </div>
      </div>

      {/* Right Side - Notifications & User */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-[#4B5563]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#DC2626] rounded-full"></span>
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-3 pl-4 border-l border-[#E5E7EB]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-white">
            <User className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="body-small font-medium text-[#111827]">
              {currentUser.prenom} {currentUser.nom}
            </p>
            <p className="body-small text-[#9CA3AF]">{currentUser.role === 'super_admin' ? 'Super Admin' : currentUser.role}</p>
          </div>
          <button className="p-1 hover:bg-[#F3F4F6] rounded transition-colors">
            <ChevronDown className="w-4 h-4 text-[#4B5563]" />
          </button>
        </div>
      </div>
    </header>
  );
}
