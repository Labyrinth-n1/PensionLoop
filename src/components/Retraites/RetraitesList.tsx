import React, { useState } from 'react';
import { Plus, Upload, Download, Search, Filter, MoreVertical } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Retraite } from '../../types';
import { sampleRetraites } from '../../data/sampleData';
import { RetraiteDetailModal } from './RetraiteDetailModal';
import { AddRetraiteModal } from './AddRetraiteModal';
import { ImportCSVModal } from './ImportCSVModal';

export function RetraitesList() {
  const [retraites, setRetraites] = useState<Retraite[]>(sampleRetraites);
  const [selectedRetraite, setSelectedRetraite] = useState<Retraite | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'actif' | 'inactif'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'banque' | 'mobile'>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredRetraites = retraites.filter((r) => {
    const matchesSearch = r.nom.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         r.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         r.identifiant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.statut === statusFilter;
    const matchesType = typeFilter === 'all' || r.typeCompte === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewDetails = (retraite: Retraite) => {
    setSelectedRetraite(retraite);
    setShowDetailModal(true);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredRetraites.map(r => r.id));
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

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <h2 className="text-[#111827]">Gestion des Retraités</h2>
        <div className="flex items-center gap-3">
          <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>
            Ajouter un retraité
          </Button>
          <Button variant="secondary" icon={<Upload className="w-4 h-4" />} onClick={() => setShowImportModal(true)}>
            Importer CSV
          </Button>
          <Button variant="outline" icon={<Download className="w-4 h-4" />}>
            Exporter
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              placeholder="Rechercher par nom..."
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

      {/* Data Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                <th className="text-left py-3 px-4 w-12">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredRetraites.length && filteredRetraites.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 text-[#1E40AF] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#1E40AF]/20"
                  />
                </th>
                <th className="text-left py-3 px-4 text-[#4B5563] font-medium body-small">Nom Complet</th>
                <th className="text-left py-3 px-4 text-[#4B5563] font-medium body-small">Identifiant</th>
                <th className="text-left py-3 px-4 text-[#4B5563] font-medium body-small">Type de Compte</th>
                <th className="text-left py-3 px-4 text-[#4B5563] font-medium body-small">Montant Pension</th>
                <th className="text-left py-3 px-4 text-[#4B5563] font-medium body-small">Statut</th>
                <th className="text-left py-3 px-4 text-[#4B5563] font-medium body-small w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filteredRetraites.map((retraite) => (
                <tr
                  key={retraite.id}
                  className={`border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors cursor-pointer ${selectedIds.includes(retraite.id) ? 'bg-[#EFF6FF] border-l-4 border-l-[#1E40AF]' : ''}`}
                  onClick={() => handleViewDetails(retraite)}
                >
                  <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(retraite.id)}
                      onChange={(e) => handleSelectOne(retraite.id, e.target.checked)}
                      className="w-4 h-4 text-[#1E40AF] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#1E40AF]/20"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-white font-medium">
                        {retraite.prenom.charAt(0)}{retraite.nom.charAt(0)}
                      </div>
                      <span className="font-medium">{retraite.prenom} {retraite.nom}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#4B5563]">{retraite.identifiant}</td>
                  <td className="py-3 px-4">
                    {retraite.typeCompte === 'banque' ? (
                      <Badge variant="blue">🏦 {retraite.operateur}</Badge>
                    ) : (
                      <Badge variant="orange">📱 {retraite.operateur}</Badge>
                    )}
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#111827]">{retraite.montantPension.toLocaleString()} FCFA</td>
                  <td className="py-3 px-4">
                    <Badge variant={retraite.statut === 'actif' ? 'success' : 'gray'}>
                      {retraite.statut === 'actif' ? 'Actif' : 'Inactif'}
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
            <span className="text-[#4B5563] body-small">Afficher:</span>
            <select className="px-3 py-1 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#1E40AF]">
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
            <span className="text-[#4B5563] body-small">par page</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#4B5563] body-small">Affichage de 1-{filteredRetraites.length} sur {retraites.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm">Précédent</Button>
            <Button variant="primary" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Suivant</Button>
          </div>
        </div>
      </Card>

      {/* Modals */}
      {showDetailModal && selectedRetraite && (
        <RetraiteDetailModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          retraite={selectedRetraite}
        />
      )}
      
      {showAddModal && (
        <AddRetraiteModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={(newRetraite) => {
            setRetraites([...retraites, newRetraite]);
            setShowAddModal(false);
          }}
        />
      )}

      {showImportModal && (
        <ImportCSVModal
          isOpen={showImportModal}
          onClose={() => setShowImportModal(false)}
          onImport={(importedRetraites) => {
            setRetraites([...retraites, ...importedRetraites]);
            setShowImportModal(false);
          }}
        />
      )}
    </div>
  );
}
