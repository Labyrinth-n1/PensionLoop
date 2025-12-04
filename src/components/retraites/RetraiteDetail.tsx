import React from 'react';
import { Modal } from '../shared/Modal';
import { Button } from '../shared/Button';
import { Edit, Trash2, Banknote, Phone, Mail, MapPin, Calendar, CreditCard } from 'lucide-react';

interface RetraiteDetailProps {
  retraite: any;
  onClose: () => void;
}

export function RetraiteDetail({ retraite, onClose }: RetraiteDetailProps) {
  const age = new Date().getFullYear() - parseInt(retraite.dateNaissance.split('/')[2]);

  const recentPayments = [
    { date: '05/12/2024', montant: retraite.montantPension, statut: 'Réussi' },
    { date: '05/11/2024', montant: retraite.montantPension, statut: 'Réussi' },
    { date: '05/10/2024', montant: retraite.montantPension, statut: 'Réussi' },
    { date: '05/09/2024', montant: retraite.montantPension, statut: 'Réussi' },
    { date: '05/08/2024', montant: retraite.montantPension, statut: 'Réussi' }
  ];

  return (
    <Modal isOpen={true} onClose={onClose} title="Détails du Retraité" width="lg">
      <div className="space-y-6">
        {/* Personal Info */}
        <div className="flex items-start gap-6">
          <img 
            src={retraite.photo}
            alt={retraite.nom}
            className="w-24 h-24 rounded-full"
          />
          <div className="flex-1">
            <h3 className="mb-4">{retraite.nom}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <CreditCard className="w-4 h-4" />
                <div>
                  <p className="text-small text-gray-500">Identifiant</p>
                  <p>{retraite.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <div>
                  <p className="text-small text-gray-500">Date de naissance</p>
                  <p>{retraite.dateNaissance} ({age} ans)</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <div>
                  <p className="text-small text-gray-500">Téléphone</p>
                  <p>{retraite.telephone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <div>
                  <p className="text-small text-gray-500">Email</p>
                  <p>{retraite.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600 col-span-2">
                <MapPin className="w-4 h-4" />
                <div>
                  <p className="text-small text-gray-500">Adresse</p>
                  <p>{retraite.adresse}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Info */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="mb-4">Informations Financières</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-small text-gray-600 mb-1">Montant Pension</p>
              <p className="text-2xl text-[#1E40AF]">{retraite.montantPension.toLocaleString()} FCFA</p>
            </div>
            <div>
              <p className="text-small text-gray-600 mb-1">Type de Compte</p>
              <span className={`inline-flex px-3 py-1 rounded-full text-sm ${
                retraite.typeCompte === 'Mobile Money' 
                  ? 'bg-orange-100 text-[#FF6B00]' 
                  : 'bg-blue-100 text-[#1E40AF]'
              }`}>
                {retraite.typeCompte}
              </span>
            </div>
            <div>
              <p className="text-small text-gray-600 mb-1">
                {retraite.typeCompte === 'Mobile Money' ? 'Opérateur' : 'Banque'}
              </p>
              <p>{retraite.typeCompte === 'Mobile Money' ? `${retraite.operateur} Mobile Money` : retraite.banque}</p>
            </div>
            <div>
              <p className="text-small text-gray-600 mb-1">
                {retraite.typeCompte === 'Mobile Money' ? 'Numéro' : 'IBAN'}
              </p>
              <p className="text-sm">{retraite.typeCompte === 'Mobile Money' ? retraite.numeroCompte : retraite.iban}</p>
            </div>
            <div>
              <p className="text-small text-gray-600 mb-1">Date Début Pension</p>
              <p>{retraite.dateDebutPension}</p>
            </div>
            <div>
              <p className="text-small text-gray-600 mb-1">Prochain Paiement</p>
              <p>05/01/2025</p>
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div>
          <h3 className="mb-4">Historique des Paiements</h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm text-gray-600">Date</th>
                  <th className="px-4 py-2 text-left text-sm text-gray-600">Montant</th>
                  <th className="px-4 py-2 text-left text-sm text-gray-600">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentPayments.map((payment, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm">{payment.date}</td>
                    <td className="px-4 py-2 text-sm">{payment.montant.toLocaleString()} FCFA</td>
                    <td className="px-4 py-2">
                      <span className="inline-flex items-center gap-1 text-[#059669] text-sm">
                        ✓ {payment.statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <a href="/historique" className="text-[#1E40AF] hover:underline text-sm mt-3 inline-block">
            Voir l'historique complet →
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <Button variant="outline">
            <Trash2 className="w-4 h-4" />
            Supprimer
          </Button>
          <Button variant="secondary">
            <Edit className="w-4 h-4" />
            Modifier
          </Button>
          <Button variant="primary">
            <Banknote className="w-4 h-4" />
            Payer Maintenant
          </Button>
        </div>
      </div>
    </Modal>
  );
}
