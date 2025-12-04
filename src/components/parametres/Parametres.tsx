import React, { useState } from 'react';
import { Users, Bell, Shield, Save } from 'lucide-react';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';

export function Parametres() {
  const [activeTab, setActiveTab] = useState('users');

  const tabs = [
    { id: 'users', label: 'Utilisateurs', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Shield }
  ];

  return (
    <div className="space-y-6">
      <h2>Paramètres</h2>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-[#1E40AF] text-[#1E40AF]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3>Gestion des Utilisateurs</h3>
            <Button variant="primary">
              <Users className="w-4 h-4" />
              Ajouter un Utilisateur
            </Button>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-md-custom overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-600">Nom Complet</th>
                  <th className="px-6 py-3 text-left text-gray-600">Email</th>
                  <th className="px-6 py-3 text-left text-gray-600">Rôle</th>
                  <th className="px-6 py-3 text-left text-gray-600">Département</th>
                  <th className="px-6 py-3 text-left text-gray-600">Dernier Accès</th>
                  <th className="px-6 py-3 text-left text-gray-600">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { name: 'Jean DUPONT', email: 'jean.dupont@gouv.bj', role: 'Super Admin', dept: 'Direction Générale', lastAccess: 'Il y a 2 heures', active: true },
                  { name: 'Marie KOUASSI', email: 'marie.kouassi@gouv.bj', role: 'Admin', dept: 'Finance', lastAccess: 'Il y a 1 jour', active: true },
                  { name: 'Pierre MENSAH', email: 'pierre.mensah@gouv.bj', role: 'Opérateur', dept: 'Operations', lastAccess: 'Il y a 3 jours', active: false }
                ].map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <span>{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 rounded-full text-sm bg-blue-100 text-[#1E40AF]">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{user.dept}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.lastAccess}</td>
                    <td className="px-6 py-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={user.active} className="sr-only peer" readOnly />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#059669]"></div>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Roles Info */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { role: 'Super Admin', desc: 'Accès complet au système', perms: 'Tous les droits' },
              { role: 'Admin', desc: 'Gestion et paiements', perms: 'La plupart des fonctionnalités' },
              { role: 'Opérateur', desc: 'Consultation et reporting', perms: 'Lecture seule' }
            ].map((role, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm-custom">
                <span className="inline-flex px-3 py-1 rounded-full text-sm bg-blue-100 text-[#1E40AF] mb-2">
                  {role.role}
                </span>
                <p className="text-sm mb-1">{role.desc}</p>
                <p className="text-small text-gray-600">{role.perms}</p>
              </div>
            ))}
          </div>
        </div>
      )}

  
      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-md-custom space-y-6">
            <div>
              <h3 className="mb-4">Canaux de Notification</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked />
                  <span className="flex items-center gap-2">
                    📧 Email
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked />
                  <span className="flex items-center gap-2">
                    📱 SMS
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" />
                  <span className="flex items-center gap-2">
                    🔔 Notifications Push
                  </span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="mb-4">Événements à Notifier</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-600">Événement</th>
                      <th className="px-4 py-3 text-center text-gray-600">Email</th>
                      <th className="px-4 py-3 text-center text-gray-600">SMS</th>
                      <th className="px-4 py-3 text-center text-gray-600">Push</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { event: 'Paiement réussi', email: true, sms: false, push: false },
                      { event: 'Paiement échoué', email: true, sms: true, push: true },
                      { event: 'Paiement automatique programmé', email: true, sms: false, push: false },
                      { event: 'Rapport mensuel', email: true, sms: false, push: false },
                      { event: 'Solde faible', email: true, sms: true, push: true }
                    ].map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3">{item.event}</td>
                        <td className="px-4 py-3 text-center">
                          <input type="checkbox" defaultChecked={item.email} />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input type="checkbox" defaultChecked={item.sms} />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input type="checkbox" defaultChecked={item.push} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="mb-4">Destinataires</h3>
              <div className="space-y-2 mb-3">
                {['admin@gouv.bj', 'finance@gouv.bj'].map((email, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{email}</span>
                    <button className="text-red-500 hover:text-red-700 text-sm">✕</button>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm">+ Ajouter une adresse email</Button>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-200">
              <Button variant="primary">
                <Save className="w-4 h-4" />
                Enregistrer les Modifications
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          {/* 2FA */}
          <div className="bg-white rounded-lg p-6 shadow-md-custom">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="mb-1">Authentification à Deux Facteurs</h3>
                <p className="text-gray-600 text-sm">Renforcez la sécurité de votre compte</p>
              </div>
              <span className="inline-flex px-3 py-1 rounded-full text-sm bg-green-100 text-[#059669]">
                Activé
              </span>
            </div>
            <Button variant="secondary" size="sm">Régénérer les codes de secours</Button>
          </div>

          {/* Active Sessions */}
          <div className="bg-white rounded-lg p-6 shadow-md-custom">
            <h3 className="mb-4">Sessions Actives</h3>
            <div className="space-y-3">
              {[
                { device: 'Chrome sur Windows', location: 'Cotonou, Bénin', ip: '192.168.1.1', current: true },
                { device: 'Safari sur macOS', location: 'Porto-Novo, Bénin', ip: '192.168.1.2', current: false }
              ].map((session, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">💻</div>
                    <div>
                      <p>{session.device}</p>
                      <p className="text-sm text-gray-600">{session.location} • {session.ip}</p>
                      {session.current && (
                        <span className="inline-flex px-2 py-1 rounded-full text-small bg-green-100 text-[#059669] mt-1">
                          Cette session
                        </span>
                      )}
                    </div>
                  </div>
                  {!session.current && (
                    <Button variant="outline" size="sm">Déconnecter</Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Password Policy */}
          <div className="bg-white rounded-lg p-6 shadow-md-custom">
            <h3 className="mb-4">Politique de Mot de Passe</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Longueur minimale" type="number" defaultValue="12" />
              <div>
                <label className="block mb-2 text-gray-700">Expiration</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md">
                  <option>30 jours</option>
                  <option>60 jours</option>
                  <option>90 jours</option>
                  <option>Jamais</option>
                </select>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked />
                <span>Exiger des majuscules</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked />
                <span>Exiger des chiffres</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked />
                <span>Exiger des caractères spéciaux</span>
              </label>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="primary">
                <Save className="w-4 h-4" />
                Enregistrer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
