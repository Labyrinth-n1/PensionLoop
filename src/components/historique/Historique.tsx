import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Filter, Calendar } from 'lucide-react';
import { Button } from '../shared/Button';
import { mockTransactions } from '../../data/mockData';
import { Modal } from '../shared/Modal';

export function Historique() {
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const getStatusBadge = (status: string) => {
    const styles = {
      'Réussi': 'bg-green-100 text-[#059669]',
      'En cours': 'bg-orange-100 text-[#F59E0B]',
      'Échoué': 'bg-red-100 text-[#DC2626]'
    };
    return styles[status as keyof typeof styles] || '';
  };

  const handleViewDetail = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowDetail(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Historique des Transactions</h2>
          <p className="text-gray-600 mt-1">Consultez toutes les transactions effectuées</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300">
            <Calendar className="w-5 h-5 text-gray-600" />
            <input type="date" className="border-none outline-none" />
            <span>au</span>
            <input type="date" className="border-none outline-none" />
          </div>
          <Button variant="secondary">
            <Download className="w-4 h-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md-custom">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span>Filtres Avancés</span>
          </div>
          <span className="text-gray-400">{showFilters ? '−' : '+'}</span>
        </button>
        
        {showFilters && (
          <div className="px-6 pb-6 border-t border-gray-200">
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div>
                <label className="block mb-2 text-sm text-gray-700">Statut</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option>Tous</option>
                  <option>Réussi</option>
                  <option>Échoué</option>
                  <option>En cours</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-700">Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option>Tous</option>
                  <option>Banque</option>
                  <option>Mobile Money</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-700">Montant Min</label>
                <input type="number" placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-700">Montant Max</label>
                <input type="number" placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="primary" size="sm">Appliquer</Button>
              <Button variant="text" size="sm">Réinitialiser</Button>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md-custom overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">Date & Heure</th>
                <th className="px-6 py-3 text-left text-gray-600">ID Transaction</th>
                <th className="px-6 py-3 text-left text-gray-600">Retraité</th>
                <th className="px-6 py-3 text-left text-gray-600">Montant</th>
                <th className="px-6 py-3 text-left text-gray-600">Type</th>
                <th className="px-6 py-3 text-left text-gray-600">Référence</th>
                <th className="px-6 py-3 text-left text-gray-600">Statut</th>
                <th className="px-6 py-3 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm">
                    <div>
                      <p>{transaction.date}</p>
                      <p className="text-gray-500">{transaction.heure}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{transaction.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${transaction.retaiteName}`}
                        alt={transaction.retaiteName}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm">{transaction.retaiteName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {transaction.montant.toLocaleString()} FCFA
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 rounded-full text-sm bg-blue-100 text-[#1E40AF]">
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{transaction.reference}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm ${getStatusBadge(transaction.statut)}`}>
                      {transaction.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleViewDetail(transaction)}
                      className="text-[#1E40AF] hover:underline text-sm"
                    >
                      Voir détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Afficher:</span>
            <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
            <span className="text-sm text-gray-600">par page</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Affichage de 1-5 sur 5,678 transactions</span>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">2</button>
              <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">3</button>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {showDetail && selectedTransaction && (
        <Modal isOpen={true} onClose={() => setShowDetail(false)} title="Détails de la Transaction" width="lg">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <h3 className="mb-3">Informations Générales</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-small text-gray-600">ID Transaction</p>
                      <p className="font-mono">{selectedTransaction.id}</p>
                    </div>
                    <div>
                      <p className="text-small text-gray-600">Date</p>
                      <p>{selectedTransaction.date}</p>
                    </div>
                    <div>
                      <p className="text-small text-gray-600">Heure</p>
                      <p>{selectedTransaction.heure}</p>
                    </div>
                    <div>
                      <p className="text-small text-gray-600">Type</p>
                      <span className="inline-flex px-3 py-1 rounded-full text-sm bg-blue-100 text-[#1E40AF]">
                        {selectedTransaction.type}
                      </span>
                    </div>
                    <div>
                      <p className="text-small text-gray-600">Référence externe</p>
                      <p className="font-mono text-sm">{selectedTransaction.reference}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3">Bénéficiaire</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedTransaction.retaiteName}`}
                      alt={selectedTransaction.retaiteName}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p>{selectedTransaction.retaiteName}</p>
                      <p className="text-sm text-gray-600">{selectedTransaction.retraiteId}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <h3 className="mb-3">Montants</h3>
                  <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Montant pension</span>
                      <span>{selectedTransaction.montant.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frais transaction</span>
                      <span>{selectedTransaction.frais.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-blue-200">
                      <span>Total débité</span>
                      <span className="text-xl text-[#1E40AF]">
                        {(selectedTransaction.montant + selectedTransaction.frais).toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3">Statut</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#059669] rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">Initié</p>
                        <p className="text-small text-gray-500">14:35:00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#059669] rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">Validé</p>
                        <p className="text-small text-gray-500">14:35:05</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#059669] rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">En Traitement</p>
                        <p className="text-small text-gray-500">14:35:10</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#059669] rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">Complété</p>
                        <p className="text-small text-gray-500">14:35:42</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
              <Button variant="secondary">
                <FileText className="w-4 h-4" />
                Télécharger Reçu PDF
              </Button>
              <Button variant="primary" onClick={() => setShowDetail(false)}>
                Fermer
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
