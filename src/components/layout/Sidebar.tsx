import React from 'react';
import { BarChart3, Users, Banknote, FileText, Settings, User, Shield } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const menuItems = [
  { icon: BarChart3, label: 'Tableau de bord', path: '/dashboard' },
  { icon: Users, label: 'Retraités', path: '/retraites' },
  { icon: Banknote, label: 'Paiements', path: '/paiements' },
  { icon: FileText, label: 'Historique', path: '/historique' },
  { icon: Settings, label: 'Paramètres', path: '/parametres' },
  { icon: User, label: 'Profil', path: '/profil' }
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-60 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 flex flex-col shadow-md-custom">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-bold text-[#1E40AF]">GouvPensionloop</div>
            <div className="text-small text-gray-500">Gouvernement du Bénin</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${isActive 
                      ? 'bg-blue-50 text-[#1E40AF] border-l-4 border-[#1E40AF] pl-3' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Version */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-small text-gray-500">Version 1.0.0</div>
      </div>
    </div>
  );
}
