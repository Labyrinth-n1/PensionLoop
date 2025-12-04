import React, { useState } from 'react';
import { Plus, Upload, Download, Search, Filter, MoreVertical } from 'lucide-react';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { mockRetraites } from '../../data/mockData';
import { Modal } from '../shared/Modal';
import { RetraiteDetail } from './RetraiteDetail';
import { AddRetraiteForm } from './AddRetraiteForm';

export function RetraitesList() {
  const [selectedRetraite, setSelectedRetraite] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [typeFilter, setTypeFilter] = useState('Tous');

  const filteredRetraites = mockRetraites.filter(r => {
    const matchesSearch = r.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Tous' || r.statut === statusFilter;
    const matchesType = typeFilter === 'Tous' || r.typeCompte === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewDetail = (retraite: any) => {
    setSelectedRetraite(retraite);
    setShowDetail(true);
  };

  const getTypeBadge = (type: string, operateur?: string, banque?: string) => {
    if (type === 'Mobile Money') {
      const colors = {
        'MTN': 'bg-orange-100 text-[#FF6B00]',
        'Moov': 'bg-blue-100 text-[#0EA5E9]',
        'Flooz': 'bg-green-100 text-[#00B050]'
      };
      return (
        <span className={`inline-flex px-3 py-1 rounded-full text-sm ${colors[operateur as keyof typeof colors]}`}>
          Mobile Money {operateur}
        </span>
      );
    }
    return (
      <span className="inline-flex px-3 py-1 rounded-full text-sm bg-blue-100 text-[#1E40AF]">
        {banque}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <h2>Gestion des Retraités</h2>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setShowAddForm(true)}>
            <Upload className="w-4 h-4" />
            Importer CSV
          </Button>
          <Button variant="secondary">
            <Download className="w-4 h-4" />
            Exporter
          </Button>
          <Button variant="primary" onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4" />
            Ajouter un retraité
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-md-custom">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Rechercher par nom..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-5 h-5" />}
            />
          </div>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#1E40AF]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>Tous</option>
            <option>Actif</option>
            <option>Inactif</option>
          </select>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#1E40AF]"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option>Tous</option>
            <option>Banque</option>
            <option>Mobile Money</option>
          </select>
          <Button variant="text">
            Réinitialiser
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md-custom overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input type="checkbox" className="w-4 h-4" />
                </th>
                <th className="px-6 py-3 text-left text-gray-600">Nom Complet</th>
                <th className="px-6 py-3 text-left text-gray-600">Identifiant</th>
                <th className="px-6 py-3 text-left text-gray-600">Type de Compte</th>
                <th className="px-6 py-3 text-left text-gray-600">Montant Pension</th>
                <th className="px-6 py-3 text-left text-gray-600">Statut</th>
                <th className="px-6 py-3 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRetraites.map((retraite) => (
                <tr key={retraite.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="w-4 h-4" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={retraite.photo}
                        alt={retraite.nom}
                        className="w-10 h-10 rounded-full"
                      />
                      <span>{retraite.nom}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{retraite.id}</td>
                  <td className="px-6 py-4">
                    {getTypeBadge(retraite.typeCompte, retraite.operateur, retraite.banque)}
                  </td>
                  <td className="px-6 py-4">
                    {retraite.montantPension.toLocaleString()} FCFA
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm ${
                      retraite.statut === 'Actif' 
                        ? 'bg-green-100 text-[#059669]' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {retraite.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleViewDetail(retraite)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-600" />
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
            <span className="text-sm text-gray-600">Affichage de 1-10 sur {filteredRetraites.length}</span>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">2</button>
              <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">3</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showDetail && selectedRetraite && (
        <RetraiteDetail 
          retraite={selectedRetraite} 
          onClose={() => setShowDetail(false)} 
        />
      )}

      {showAddForm && (
        <AddRetraiteForm onClose={() => setShowAddForm(false)} />
      )}
    </div>
  );
}
