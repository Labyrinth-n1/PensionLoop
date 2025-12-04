import React, { useState } from 'react';
import { Users, Banknote, Calendar, Settings } from 'lucide-react';
import { Button } from '../shared/Button';
import { PaiementManuel } from './PaiementManuel';
import { PaiementAutomatique } from './PaiementAutomatique';

export function Paiements() {
  const [activeTab, setActiveTab] = useState<'manuel' | 'automatique'>('manuel');
  const [showManuelFlow, setShowManuelFlow] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2>Gestion des Paiements</h2>
        <p className="text-gray-600 mt-1">Effectuer des paiements manuels ou configurer les paiements automatiques</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('manuel')}
          className={`px-6 py-3 border-b-2 transition-colors ${
            activeTab === 'manuel'
              ? 'border-[#1E40AF] text-[#1E40AF]'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <Banknote className="w-5 h-5" />
            <span>Paiement Manuel</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('automatique')}
          className={`px-6 py-3 border-b-2 transition-colors ${
            activeTab === 'automatique'
              ? 'border-[#1E40AF] text-[#1E40AF]'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>Paiement Automatique</span>
          </div>
        </button>
      </div>

      {/* Content */}
      {activeTab === 'manuel' && (
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => setShowManuelFlow(true)}
              className="p-6 bg-white rounded-lg border-2 border-gray-200 hover:border-[#1E40AF] hover:shadow-md-custom transition-all text-left"
            >
              <Users className="w-8 h-8 text-[#1E40AF] mb-3" />
              <h3 className="mb-2">Paiement Individuel</h3>
              <p className="text-gray-600 text-sm">Sélectionnez manuellement les retraités à payer</p>
            </button>

            <button 
              onClick={() => setShowManuelFlow(true)}
              className="p-6 bg-white rounded-lg border-2 border-gray-200 hover:border-[#1E40AF] hover:shadow-md-custom transition-all text-left"
            >
              <Users className="w-8 h-8 text-[#059669] mb-3" />
              <h3 className="mb-2">Paiement Par Lot</h3>
              <p className="text-gray-600 text-sm">Payer tous les retraités d'un groupe</p>
            </button>

            <button className="p-6 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-lg text-white hover:shadow-lg-custom transition-all text-left">
              <Banknote className="w-8 h-8 mb-3" />
              <h3 className="text-white mb-2">Paiement Rapide</h3>
              <p className="text-blue-100 text-sm">Tous les retraités actifs ce mois</p>
              <p className="text-white mt-2">2,456 retraités - 850M FCFA</p>
            </button>
          </div>

          {/* Recent Batches */}
          <div className="bg-white rounded-lg shadow-md-custom p-6">
            <h3 className="mb-4">Lots de Paiement Récents</h3>
            <div className="space-y-4">
              {[
                { date: '05/12/2024', count: 2456, amount: 850000000, status: 'Complété' },
                { date: '05/11/2024', count: 2450, amount: 848000000, status: 'Complété' },
                { date: '05/10/2024', count: 2445, amount: 845000000, status: 'Complété' }
              ].map((batch, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Banknote className="w-6 h-6 text-[#1E40AF]" />
                    </div>
                    <div>
                      <p>{batch.date}</p>
                      <p className="text-small text-gray-600">{batch.count} retraités</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p>{batch.amount.toLocaleString()} FCFA</p>
                    <span className="inline-flex px-3 py-1 rounded-full text-sm bg-green-100 text-[#059669]">
                      {batch.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'automatique' && <PaiementAutomatique />}

      {showManuelFlow && <PaiementManuel onClose={() => setShowManuelFlow(false)} />}
    </div>
  );
}
