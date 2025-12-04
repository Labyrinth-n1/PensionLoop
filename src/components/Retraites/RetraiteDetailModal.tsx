import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { FileText } from 'lucide-react';
import { Pensioner } from '../../services/api';

interface RetraiteDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  pensioner: Pensioner;
}

export function RetraiteDetailModal({ isOpen, onClose, pensioner }: RetraiteDetailModalProps) {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' ' + pensioner.currency;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Détails du Pensionné" size="lg">
      <div className="p-6 space-y-6">
        {/* Section 1: Personal Info */}
        <div className="flex gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-white text-3xl font-bold">
            {pensioner.firstName.charAt(0)}{pensioner.lastName.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="text-[#111827] mb-4">{pensioner.firstName} {pensioner.lastName}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[#4B5563] body-small mb-1">Identifiant Personnel</p>
                <p className="text-[#111827] font-medium font-mono">{pensioner.personalId}</p>
              </div>
              <div>
                <p className="text-[#4B5563] body-small mb-1">Type ID</p>
                <p className="text-[#111827] font-medium">{pensioner.typeId}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Financial Info */}
        <Card className="bg-[#F9FAFB]">
          <h3 className="text-[#111827] mb-4">Informations de Paiement</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[#4B5563]">Montant</span>
              <span className="text-2xl font-bold text-[#111827]">{formatCurrency(pensioner.amount)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#4B5563]">Devise</span>
              <Badge variant="blue">{pensioner.currency}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#4B5563]">Type de Compte</span>
              {pensioner.typeId === 'banque' ? (
                <Badge variant="blue">🏦 Compte Bancaire</Badge>
              ) : (
                <Badge variant="orange">📱 Mobile Money</Badge>
              )}
            </div>
            {pensioner.batchId && (
              <div className="flex justify-between items-center">
                <span className="text-[#4B5563]">ID Lot Import</span>
                <span className="text-[#111827] font-medium font-mono text-sm">{pensioner.batchId}</span>
              </div>
            )}
          </div>
        </Card>

        {/* Info Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm text-blue-800 font-medium">Données importées du fichier CSV</p>
              <p className="text-sm text-blue-700 mt-1">
                Les informations de ce pensionné proviennent du dernier import CSV.
                Pour modifier les données, veuillez importer un nouveau fichier CSV avec les informations mises à jour.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end pt-6 border-t border-[#E5E7EB]">
          <Button variant="primary" onClick={onClose}>
            Fermer
          </Button>
        </div>
      </div>
    </Modal>
  );
}
