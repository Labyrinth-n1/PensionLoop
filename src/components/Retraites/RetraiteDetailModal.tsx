import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Edit, Trash2, DollarSign, User } from 'lucide-react';
import { Retraite } from '../../types';

interface RetraiteDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  retraite: Retraite;
}

export function RetraiteDetailModal({ isOpen, onClose, retraite }: RetraiteDetailModalProps) {
  const recentPayments = [
    { date: '05/12/2024', montant: retraite.montantPension, statut: 'reussi' },
    { date: '05/11/2024', montant: retraite.montantPension, statut: 'reussi' },
    { date: '05/10/2024', montant: retraite.montantPension, statut: 'reussi' },
    { date: '05/09/2024', montant: retraite.montantPension, statut: 'reussi' },
    { date: '05/08/2024', montant: retraite.montantPension, statut: 'reussi' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Détails du Retraité" size="lg">
      <div className="p-6 space-y-6">
        {/* Section 1: Personal Info */}
        <div className="flex gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-white text-3xl font-bold">
            {retraite.prenom.charAt(0)}{retraite.nom.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="text-[#111827] mb-4">{retraite.prenom} {retraite.nom}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[#4B5563] body-small mb-1">Identifiant</p>
                <p className="text-[#111827] font-medium">{retraite.identifiant}</p>
              </div>
              <div>
                <p className="text-[#4B5563] body-small mb-1">Date de naissance</p>
                <p className="text-[#111827] font-medium">{retraite.dateNaissance}</p>
              </div>
              <div>
                <p className="text-[#4B5563] body-small mb-1">Âge</p>
                <p className="text-[#111827] font-medium">{retraite.age} ans</p>
              </div>
              <div>
                <p className="text-[#4B5563] body-small mb-1">Téléphone</p>
                <p className="text-[#111827] font-medium">{retraite.telephone}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[#4B5563] body-small mb-1">Email</p>
                <p className="text-[#111827] font-medium">{retraite.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Financial Info */}
        <Card className="bg-[#F9FAFB]">
          <h3 className="text-[#111827] mb-4">Informations Financières</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[#4B5563]">Montant Pension</span>
              <span className="text-2xl font-bold text-[#111827]">{retraite.montantPension.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#4B5563]">Type de Compte</span>
              {retraite.typeCompte === 'banque' ? (
                <Badge variant="blue">🏦 Compte Bancaire</Badge>
              ) : (
                <Badge variant="orange">📱 Mobile Money</Badge>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#4B5563]">Opérateur</span>
              <span className="text-[#111827] font-medium">{retraite.operateur}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#4B5563]">Numéro</span>
              <span className="text-[#111827] font-medium">{retraite.numeroCompte}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#4B5563]">Date Début Pension</span>
              <span className="text-[#111827] font-medium">{retraite.dateDebutPension}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#4B5563]">Prochain Paiement</span>
              <span className="text-[#111827] font-medium">{retraite.prochainPaiement}</span>
            </div>
          </div>
        </Card>

        {/* Section 3: Payment History */}
        <div>
          <h3 className="text-[#111827] mb-4">Historique des Paiements</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E5E7EB]">
                  <th className="text-left py-2 text-[#4B5563] body-small font-medium">Date</th>
                  <th className="text-left py-2 text-[#4B5563] body-small font-medium">Montant</th>
                  <th className="text-left py-2 text-[#4B5563] body-small font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((payment, index) => (
                  <tr key={index} className="border-b border-[#E5E7EB]">
                    <td className="py-2 text-[#4B5563]">{payment.date}</td>
                    <td className="py-2 font-semibold">{payment.montant.toLocaleString()} FCFA</td>
                    <td className="py-2">
                      <Badge variant="success">✅ Réussi</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <Button variant="text">Voir l'historique complet</Button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <Button variant="secondary" icon={<Edit className="w-4 h-4" />}>
              Modifier
            </Button>
            <Button variant="outline" className="text-[#DC2626] border-[#DC2626] hover:bg-[#FEE2E2]" icon={<Trash2 className="w-4 h-4" />}>
              Supprimer
            </Button>
          </div>
          <Button variant="primary" icon={<DollarSign className="w-4 h-4" />}>
            Payer Maintenant
          </Button>
        </div>
      </div>
    </Modal>
  );
}
