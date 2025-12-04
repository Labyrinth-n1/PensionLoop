import { useState, useEffect, useCallback } from 'react';
import { Download, Filter, Calendar, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '../shared/Button';
import { Modal } from '../shared/Modal';
import { paymentService, Transaction } from '../../services/api';

export function Historique() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    startDate: '',
    endDate: ''
  });

  const fetchTransactions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await paymentService.getTransactionHistory({
        page,
        limit: 20,
        status: filters.status !== 'all' ? filters.status : undefined,
        type: filters.type !== 'all' ? filters.type : undefined,
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined
      });
      setTransactions(response.data || []);
      setTotalPages(response.totalPages || 1);
    } catch (err) {
      console.error('Erreur lors du chargement des transactions:', err);
      setError('Impossible de charger l\'historique. Le backend n\'est peut-être pas disponible.');
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

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

      {/* Loading State */}
      {isLoading && (
        <div className="bg-white rounded-lg shadow-md-custom p-12 text-center">
          <RefreshCw className="w-8 h-8 mx-auto mb-4 text-blue-600 animate-spin" />
          <p className="text-gray-600">Chargement des transactions...</p>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-white rounded-lg shadow-md-custom p-8">
          <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
            <div>
              <p className="font-medium text-orange-800">Backend non disponible</p>
              <p className="text-sm text-orange-700">{error}</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Button onClick={fetchTransactions} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />Réessayer
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      {!isLoading && !error && (
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
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      Aucune transaction trouvée. Importez un fichier CSV pour commencer.
                    </td>
                  </tr>
                ) : (
                  transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm">
                        <div>
                          <p>{new Date(transaction.dateHeure).toLocaleDateString('fr-FR')}</p>
                          <p className="text-gray-500">{new Date(transaction.dateHeure).toLocaleTimeString('fr-FR')}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{transaction.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${transaction.retraiteName}`}
                            alt={transaction.retraiteName}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm">{transaction.retraiteName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {transaction.montant.toLocaleString()} FCFA
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 rounded-full text-sm bg-blue-100 text-[#1E40AF]">
                          {transaction.type === 'banque' ? 'Banque' : 'Mobile Money'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{transaction.reference}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm ${getStatusBadge(
                          transaction.statut === 'completed' || transaction.statut === 'reussi' ? 'Réussi' :
                          transaction.statut === 'failed' || transaction.statut === 'echoue' ? 'Échoué' : 'En cours'
                        )}`}>
                          {transaction.statut === 'completed' || transaction.statut === 'reussi' ? 'Réussi' :
                           transaction.statut === 'failed' || transaction.statut === 'echoue' ? 'Échoué' : 'En cours'}
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
                  ))
                )}
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
              <span className="text-sm text-gray-600">Page {page} sur {totalPages}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  Précédent
                </button>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  Suivant
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                      <p className="text-small text-gray-600">Date & Heure</p>
                      <p>{new Date(selectedTransaction.dateHeure).toLocaleString('fr-FR')}</p>
                    </div>
                    <div>
                      <p className="text-small text-gray-600">Type</p>
                      <span className="inline-flex px-3 py-1 rounded-full text-sm bg-blue-100 text-[#1E40AF]">
                        {selectedTransaction.type === 'banque' ? 'Banque' : 'Mobile Money'}
                      </span>
                    </div>
                    <div>
                      <p className="text-small text-gray-600">Référence</p>
                      <p className="font-mono text-sm">{selectedTransaction.reference}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3">Bénéficiaire</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedTransaction.retraiteName}`}
                      alt={selectedTransaction.retraiteName}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p>{selectedTransaction.retraiteName}</p>
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
                      <span>Total</span>
                      <span className="text-xl text-[#1E40AF]">
                        {(selectedTransaction.montant + selectedTransaction.frais).toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3">Statut</h3>
                  <div className={`p-4 rounded-lg ${
                    selectedTransaction.statut === 'completed' || selectedTransaction.statut === 'reussi'
                      ? 'bg-green-50'
                      : selectedTransaction.statut === 'failed' || selectedTransaction.statut === 'echoue'
                      ? 'bg-red-50'
                      : 'bg-orange-50'
                  }`}>
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm ${getStatusBadge(
                      selectedTransaction.statut === 'completed' || selectedTransaction.statut === 'reussi' ? 'Réussi' :
                      selectedTransaction.statut === 'failed' || selectedTransaction.statut === 'echoue' ? 'Échoué' : 'En cours'
                    )}`}>
                      {selectedTransaction.statut === 'completed' || selectedTransaction.statut === 'reussi' ? 'Réussi' :
                       selectedTransaction.statut === 'failed' || selectedTransaction.statut === 'echoue' ? 'Échoué' : 'En cours'}
                    </span>
                    {selectedTransaction.errorMessage && (
                      <p className="mt-2 text-sm text-red-600">{selectedTransaction.errorMessage}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
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
