import React, { useState, useEffect, useCallback } from 'react';
import { Download, Search, MoreVertical, RefreshCw, AlertTriangle, Users } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { pensionerService, Pensioner } from '../../services/api';
import { RetraiteDetailModal } from './RetraiteDetailModal';

export function RetraitesList() {
  const [pensioners, setPensioners] = useState<Pensioner[]>([]);
  const [selectedPensioner, setSelectedPensioner] = useState<Pensioner | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'actif' | 'inactif'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'banque' | 'mobile'>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Charger les pensionnés depuis l'API
  const fetchPensioners = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await pensionerService.getAll({
        page,
        limit: 20,
        search: searchQuery || undefined
      });
      setPensioners(response.data || []);
      setTotalPages(response.totalPages || 1);
      setTotalCount(response.total || 0);
    } catch (err) {
      console.error('Erreur lors du chargement des pensionnés:', err);
      setError('Impossible de charger la liste des pensionnés. Le backend n\'est peut-être pas disponible.');
      setPensioners([]);
    } finally {
      setIsLoading(false);
    }
  }, [page, searchQuery]);

  useEffect(() => {
    fetchPensioners();
  }, [fetchPensioners]);

  // Filtre côté client (en plus du filtre API)
  const filteredPensioners = pensioners.filter((p) => {
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesType = typeFilter === 'all' || p.type === typeFilter;
    return matchesStatus && matchesType;
  });

  const handleViewDetails = (pensioner: Pensioner) => {
    setSelectedPensioner(pensioner);
    setShowDetailModal(true);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredPensioners.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(i => i !== id));
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#111827]">Liste des Pensionnés</h2>
          <p className="text-gray-500 text-sm mt-1">
            Liste des bénéficiaires issus du dernier import CSV
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            icon={<RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />}
            onClick={fetchPensioners}
            disabled={isLoading}
          >
            Actualiser
          </Button>
          <Button variant="secondary" icon={<Download className="w-4 h-4" />}>
            Exporter
          </Button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-orange-400 mr-3" />
            <div>
              <p className="text-sm font-medium text-orange-800">Backend non disponible</p>
              <p className="text-sm text-orange-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <Card>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              placeholder="Rechercher par nom ou identifiant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5" />}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20"
          >
            <option value="all">Tous les statuts</option>
            <option value="actif">Actif</option>
            <option value="inactif">Inactif</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20"
          >
            <option value="all">Tous les types</option>
            <option value="banque">Banque</option>
            <option value="mobile">Mobile Money</option>
          </select>
          <Button variant="text">Réinitialiser</Button>
        </div>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <Card className="p-12 text-center">
          <RefreshCw className="w-8 h-8 mx-auto mb-4 text-blue-600 animate-spin" />
          <p className="text-gray-600">Chargement des pensionnés...</p>
        </Card>
      )}

      {/* Empty State */}
      {!isLoading && !error && pensioners.length === 0 && (
        <Card className="p-12 text-center">
          <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun pensionné</h3>
          <p className="text-gray-500">
            Importez un fichier CSV depuis la page "Paiements" pour ajouter des pensionnés.
          </p>
        </Card>
      )}

      {/* Data Table */}
      {!isLoading && filteredPensioners.length > 0 && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                  <th className="text-left py-3 px-4 w-12">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === filteredPensioners.length && filteredPensioners.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="w-4 h-4 text-[#1E40AF] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#1E40AF]/20"
                    />
                  </th>
                  <th className="text-left py-3 px-4 text-[#4B5563] font-medium body-small">Nom Complet</th>
                  <th className="text-left py-3 px-4 text-[#4B5563] font-medium body-small">Identifiant</th>
                  <th className="text-left py-3 px-4 text-[#4B5563] font-medium body-small">Devise</th>
                  <th className="text-left py-3 px-4 text-[#4B5563] font-medium body-small">Montant</th>
                  <th className="text-left py-3 px-4 text-[#4B5563] font-medium body-small">Type</th>
                  <th className="text-left py-3 px-4 text-[#4B5563] font-medium body-small w-12"></th>
                </tr>
              </thead>
              <tbody>
                {filteredPensioners.map((pensioner) => (
                  <tr
                    key={pensioner.id}
                    className={`border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors cursor-pointer ${selectedIds.includes(pensioner.id) ? 'bg-[#EFF6FF] border-l-4 border-l-[#1E40AF]' : ''}`}
                    onClick={() => handleViewDetails(pensioner)}
                  >
                    <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(pensioner.id)}
                        onChange={(e) => handleSelectOne(pensioner.id, e.target.checked)}
                        className="w-4 h-4 text-[#1E40AF] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#1E40AF]/20"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-white font-medium">
                          {pensioner.firstName.charAt(0)}{pensioner.lastName.charAt(0)}
                        </div>
                        <span className="font-medium">{pensioner.firstName} {pensioner.lastName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#4B5563] font-mono text-sm">{pensioner.personalId}</td>
                    <td className="py-3 px-4">
                      <Badge variant="blue">{pensioner.currency}</Badge>
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#111827]">{formatCurrency(pensioner.amount)}</td>
                    <td className="py-3 px-4">
                      <Badge variant={pensioner.typeId === 'banque' ? 'blue' : 'orange'}>
                        {pensioner.typeId === 'banque' ? '🏦 Banque' : '📱 Mobile'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                      <button className="p-1 hover:bg-[#F3F4F6] rounded transition-colors">
                        <MoreVertical className="w-4 h-4 text-[#4B5563]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-[#E5E7EB]">
            <div className="flex items-center gap-2">
              <span className="text-[#4B5563] body-small">Total: {totalCount} pensionnés</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#4B5563] body-small">Page {page} sur {totalPages}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Précédent
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Suivant
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Modals - Détail uniquement (pas d'ajout) */}
      {showDetailModal && selectedPensioner && (
        <RetraiteDetailModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          pensioner={selectedPensioner}
        />
      )}
    </div>
  );
}
