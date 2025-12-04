import React, { useState } from 'react';
import { Camera, Save, AlertTriangle } from 'lucide-react';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';

export function Profil() {
  const [formData, setFormData] = useState({
    prenom: 'Admin',
    nom: 'User',
    email: 'admin@gouv.bj',
    telephone: '+229 97 00 00 00',
    departement: 'Direction Générale',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const handlePasswordChange = (value: string) => {
    setFormData({ ...formData, newPassword: value });
    // Simple password strength calculation
    let strength = 0;
    if (value.length >= 8) strength += 25;
    if (value.length >= 12) strength += 25;
    if (/[A-Z]/.test(value)) strength += 25;
    if (/[0-9]/.test(value)) strength += 25;
    setPasswordStrength(strength);
  };

  const getStrengthColor = () => {
    if (passwordStrength < 50) return 'bg-red-500';
    if (passwordStrength < 75) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (passwordStrength < 50) return 'Faible';
    if (passwordStrength < 75) return 'Moyen';
    return 'Fort';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2>Mon Profil</h2>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-md-custom p-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-gray-200"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full transition-all flex items-center justify-center cursor-pointer">
              <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <button className="mt-3 text-[#1E40AF] hover:underline text-sm">
            Changer la photo
          </button>
        </div>

        {/* Personal Info */}
        <div className="mb-8">
          <h3 className="mb-4">Informations Personnelles</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Prénom" 
              value={formData.prenom}
              onChange={(e) => setFormData({...formData, prenom: e.target.value})}
            />
            <Input 
              label="Nom" 
              value={formData.nom}
              onChange={(e) => setFormData({...formData, nom: e.target.value})}
            />
            <div>
              <Input 
                label="Email" 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <span className="inline-flex items-center gap-1 mt-1 text-sm text-[#059669]">
                ✓ Vérifié
              </span>
            </div>
            <Input 
              label="Téléphone" 
              value={formData.telephone}
              onChange={(e) => setFormData({...formData, telephone: e.target.value})}
            />
            <div>
              <label className="block mb-2 text-gray-700">Département</label>
              <select 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#1E40AF]"
                value={formData.departement}
                onChange={(e) => setFormData({...formData, departement: e.target.value})}
              >
                <option>Direction Générale</option>
                <option>Finance</option>
                <option>Operations</option>
                <option>Support</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Rôle</label>
              <div className="px-4 py-2 bg-gray-100 rounded-md">
                <span className="inline-flex px-3 py-1 rounded-full text-sm bg-blue-100 text-[#1E40AF]">
                  Super Admin
                </span>
              </div>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Date de création:</span> 15/01/2024
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="secondary">Modifier les Informations</Button>
          </div>
        </div>

        <hr className="my-8" />

        {/* Change Password */}
        <div className="mb-8">
          <h3 className="mb-4">Modifier le mot de passe</h3>
          <div className="space-y-4 max-w-xl">
            <Input 
              label="Mot de passe actuel" 
              type="password"
              value={formData.currentPassword}
              onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
            />
            <div>
              <Input 
                label="Nouveau mot de passe" 
                type="password"
                value={formData.newPassword}
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
              {formData.newPassword && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Force du mot de passe:</span>
                    <span className="text-sm text-gray-900">{getStrengthText()}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getStrengthColor()} transition-all`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            <Input 
              label="Confirmer le nouveau mot de passe" 
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="primary">Changer le Mot de Passe</Button>
          </div>
        </div>

        <hr className="my-8" />

        {/* Preferences */}
        <div className="mb-8">
          <h3 className="mb-4">Préférences</h3>
          <div className="grid grid-cols-2 gap-4 max-w-xl">
            <div>
              <label className="block mb-2 text-gray-700">Langue</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#1E40AF]">
                <option>🇫🇷 Français</option>
                <option>🇬🇧 English</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Format de date</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#1E40AF]">
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Fuseau horaire</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#1E40AF]">
                <option>Africa/Porto-Novo (GMT+1)</option>
                <option>Africa/Abidjan (GMT)</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Thème</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#1E40AF]">
                <option>Clair</option>
                <option>Sombre</option>
                <option>Auto</option>
              </select>
            </div>
          </div>
        </div>

        <hr className="my-8" />

        {/* Activity Summary */}
        <div className="mb-8">
          <h3 className="mb-4">Votre Activité</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-gray-600 text-sm mb-1">Dernière connexion</p>
                <p>Il y a 2 heures</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Paiements initiés ce mois</p>
                <p className="text-2xl text-[#1E40AF]">12</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Retraités ajoutés</p>
                <p className="text-2xl text-[#1E40AF]">45</p>
              </div>
            </div>
          </div>
          <a href="#" className="text-[#1E40AF] hover:underline text-sm mt-3 inline-block">
            Voir l'historique complet →
          </a>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button variant="primary" size="lg">
            <Save className="w-5 h-5" />
            Enregistrer les Modifications
          </Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-lg shadow-md-custom p-6 border-2 border-red-200">
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-[#DC2626] flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-[#DC2626]">Zone Dangereuse</h3>
            <p className="text-gray-600 text-sm mt-1">
              Ces actions sont irréversibles. Procédez avec prudence.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            Déconnecter tous les appareils
          </Button>
          <Button variant="outline">
            Désactiver mon compte
          </Button>
        </div>
      </div>
    </div>
  );
}
