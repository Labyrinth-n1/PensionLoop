import React, { useState } from 'react';
import { Calendar, Bell, Save } from 'lucide-react';
import { Button } from '../shared/Button';

export function PaiementAutomatique() {
  const [enabled, setEnabled] = useState(true);
  const [config, setConfig] = useState({
    day: '5',
    time: '09:00',
    type: 'both',
    includeAll: true,
    excludeErrors: false,
    alert24h: true,
    reportAfter: true,
    alertOnFailure: false,
    email: 'admin@gouv.bj'
  });

  return (
    <div className="space-y-6">
      {/* Enable/Disable Toggle */}
      <div className="bg-white rounded-lg shadow-md-custom p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="mb-2">Paiements Automatiques</h3>
            <p className="text-gray-600">Automatisez les paiements mensuels récurrents</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={enabled} 
              onChange={(e) => setEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#1E40AF]"></div>
          </label>
        </div>

        {!enabled && (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🤖</div>
            <h3 className="mb-2">Les paiements automatiques sont désactivés</h3>
            <p className="text-gray-600 mb-4">
              Activez cette fonctionnalité pour programmer des paiements mensuels récurrents
            </p>
            <Button variant="primary" onClick={() => setEnabled(true)}>
              Activer
            </Button>
          </div>
        )}

        {enabled && (
          <div className="space-y-6">
            {/* Configuration */}
            <div className="space-y-4">
              <h3>Configuration</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-gray-700">Jour du Mois</label>
                  <select 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#1E40AF]"
                    value={config.day}
                    onChange={(e) => setConfig({...config, day: e.target.value})}
                  >
                    <option value="1">1er du mois</option>
                    <option value="5">5 du mois</option>
                    <option value="10">10 du mois</option>
                    <option value="15">15 du mois</option>
                    <option value="20">20 du mois</option>
                    <option value="25">25 du mois</option>
                    <option value="28">28 du mois</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">Heure</label>
                  <input 
                    type="time"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#1E40AF]"
                    value={config.time}
                    onChange={(e) => setConfig({...config, time: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-3 text-gray-700">Type de Paiement par Défaut</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input 
                      type="radio" 
                      name="paymentType" 
                      value="bank"
                      checked={config.type === 'bank'}
                      onChange={(e) => setConfig({...config, type: e.target.value})}
                    />
                    <span>Compte Bancaire uniquement</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input 
                      type="radio" 
                      name="paymentType" 
                      value="both"
                      checked={config.type === 'both'}
                      onChange={(e) => setConfig({...config, type: e.target.value})}
                    />
                    <span>Mobile Money (selon préférence retraité)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block mb-3 text-gray-700">Bénéficiaires</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3">
                    <input 
                      type="checkbox"
                      checked={config.includeAll}
                      onChange={(e) => setConfig({...config, includeAll: e.target.checked})}
                    />
                    <span>Tous les retraités actifs</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input 
                      type="checkbox"
                      checked={config.excludeErrors}
                      onChange={(e) => setConfig({...config, excludeErrors: e.target.checked})}
                    />
                    <span>Exclure les comptes en erreur</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Next Payment Info */}
            <div className="bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-lg p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-6 h-6" />
                <h3 className="text-white">Prochain Paiement Programmé</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-blue-100 text-sm">Date et heure</p>
                  <p className="text-2xl">5 Janvier 2025 à 09:00</p>
                </div>
                <div className="pt-3 border-t border-blue-300">
                  <div className="flex justify-between mb-2">
                    <span className="text-blue-100">Bénéficiaires</span>
                    <span>2,456 retraités</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Montant estimé</span>
                    <span className="text-xl">850,000,000 FCFA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div>
              <h3 className="mb-4">Notifications</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input 
                    type="checkbox"
                    checked={config.alert24h}
                    onChange={(e) => setConfig({...config, alert24h: e.target.checked})}
                  />
                  <span>M'alerter 24h avant le paiement</span>
                </label>
                <label className="flex items-center gap-3">
                  <input 
                    type="checkbox"
                    checked={config.reportAfter}
                    onChange={(e) => setConfig({...config, reportAfter: e.target.checked})}
                  />
                  <span>Recevoir un rapport après chaque paiement</span>
                </label>
                <label className="flex items-center gap-3">
                  <input 
                    type="checkbox"
                    checked={config.alertOnFailure}
                    onChange={(e) => setConfig({...config, alertOnFailure: e.target.checked})}
                  />
                  <span>Alerter en cas d'échec seulement</span>
                </label>
              </div>

              <div className="mt-4">
                <label className="block mb-2 text-gray-700">Email de destination</label>
                <input 
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#1E40AF]"
                  value={config.email}
                  onChange={(e) => setConfig({...config, email: e.target.value})}
                />
              </div>
            </div>

            {/* History */}
            <div>
              <h3 className="mb-4">Historique des Paiements Automatiques</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm text-gray-600">Date</th>
                      <th className="px-4 py-3 text-left text-sm text-gray-600">Bénéficiaires</th>
                      <th className="px-4 py-3 text-left text-sm text-gray-600">Montant</th>
                      <th className="px-4 py-3 text-left text-sm text-gray-600">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { date: '05/12/2024', count: 2456, amount: 850000000, status: 'Complété' },
                      { date: '05/11/2024', count: 2450, amount: 848000000, status: 'Complété' },
                      { date: '05/10/2024', count: 2445, amount: 845000000, status: 'Complété' },
                      { date: '05/09/2024', count: 2440, amount: 843000000, status: 'Complété' },
                      { date: '05/08/2024', count: 2435, amount: 841000000, status: 'Complété' }
                    ].map((payment, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{payment.date}</td>
                        <td className="px-4 py-3 text-sm">{payment.count}</td>
                        <td className="px-4 py-3 text-sm">{payment.amount.toLocaleString()} FCFA</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex px-3 py-1 rounded-full text-sm bg-green-100 text-[#059669]">
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <a href="/historique" className="text-[#1E40AF] hover:underline text-sm mt-3 inline-block">
                Voir tout l'historique →
              </a>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <Button variant="primary" size="lg">
                <Save className="w-5 h-5" />
                Enregistrer les Modifications
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
