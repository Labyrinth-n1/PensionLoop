import React from 'react';
import { BarChart3, Users, DollarSign, ScrollText, Settings, User, Shield } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: BarChart3 },
    { id: 'retraites', label: 'Retraités', icon: Users },
    { id: 'paiements', label: 'Paiements', icon: DollarSign },
    { id: 'historique', label: 'Historique', icon: ScrollText },
    { id: 'parametres', label: 'Paramètres', icon: Settings },
    { id: 'profil', label: 'Profil', icon: User },
  ];

  return (
    <div className="w-60 h-screen bg-white card-shadow-md flex flex-col fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="p-6 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-[#1E40AF]">GouvPension<span className="font-normal">loop</span></h3>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-6 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-[#1E40AF] text-white shadow-sm' 
                      : 'text-[#4B5563] hover:bg-[#F3F4F6] hover:text-[#111827]'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className={isActive ? 'font-medium' : ''}>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Version */}
      <div className="p-6 border-t border-[#E5E7EB]">
        <p className="body-small text-[#9CA3AF] text-center">
          Version 1.0.0
        </p>
      </div>
    </div>
  );
}
