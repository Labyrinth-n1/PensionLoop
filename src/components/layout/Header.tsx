import { useState } from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

export function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-60 z-40">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-gray-600">
          <span>Accueil</span>
          <span>/</span>
          <span className="text-gray-900">Tableau de bord</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#DC2626] rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                alt="Admin"
                className="w-8 h-8 rounded-full"
              />
              <div className="text-left">
                <div className="text-sm">Admin User</div>
                <div className="text-small text-gray-500">Super Admin</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg-custom border border-gray-200 py-2">
                <a href="/profil" className="block px-4 py-2 hover:bg-gray-50">Mon Profil</a>
                <a href="/parametres" className="block px-4 py-2 hover:bg-gray-50">Paramètres</a>
                <hr className="my-2" />
                <a href="/" className="block px-4 py-2 hover:bg-gray-50 text-[#DC2626]">Déconnexion</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
