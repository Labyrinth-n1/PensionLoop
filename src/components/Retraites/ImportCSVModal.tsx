import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Upload, Download, CheckCircle, AlertTriangle, XCircle, Loader2 } from 'lucide-react';
import { Retraite } from '../../types';

interface ImportCSVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (retraites: Retraite[]) => void;
}

type ImportState = 'upload' | 'processing' | 'preview' | 'results';

export function ImportCSVModal({ isOpen, onClose, onImport }: ImportCSVModalProps) {
  const [state, setState] = useState<ImportState>('upload');
  const [validCount, setValidCount] = useState(245);
  const [duplicateCount, setDuplicateCount] = useState(12);
  const [errorCount, setErrorCount] = useState(3);

  const handleFileSelect = () => {
    setState('processing');
    setTimeout(() => {
      setState('preview');
    }, 2000);
  };

  const handleImport = () => {
    setState('processing');
    setTimeout(() => {
      setState('results');
    }, 1500);
  };

  const handleFinish = () => {
    const mockImported: Retraite[] = [
      {
        id: `${Date.now()}-1`,
        identifiant: 'BEN-2024-00999',
        prenom: 'Imported',
        nom: 'USER',
        dateNaissance: '01/01/1960',
        age: 64,
        telephone: '+229 XX XX XX XX',
        email: 'imported@email.bj',
        adresse: 'Imported Address',
        montantPension: 40000,
        typeCompte: 'mobile',
        operateur: 'MTN Mobile Money',
        numeroCompte: '+229 XX XX XX XX',
        nomTitulaire: 'Imported USER',
        dateDebutPension: '01/01/2025',
        prochainPaiement: '05/01/2025',
        statut: 'actif',
        createdAt: new Date().toISOString(),
      },
    ];
    onImport(mockImported);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" hideClose={state === 'processing'}>
      <div className="p-6">
        {state === 'upload' && (
          <>
            <h3 className="text-[#111827] mb-6">Importer des Retraités</h3>
            
            <div className="mb-6">
              <div
                className="border-2 border-dashed border-[#E5E7EB] rounded-lg p-12 text-center hover:border-[#1E40AF] transition-colors cursor-pointer"
                onClick={handleFileSelect}
              >
                <Upload className="w-16 h-16 mx-auto mb-4 text-[#9CA3AF]" />
                <p className="text-[#111827] mb-2">Glissez votre fichier CSV ici</p>
                <p className="text-[#4B5563] body-small mb-4">ou</p>
                <Button variant="secondary">Parcourir les fichiers</Button>
                <p className="text-[#9CA3AF] body-small mt-4">Format accepté: .csv | Taille max: 5 MB</p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Button variant="text" icon={<Download className="w-4 h-4" />}>
                Télécharger le modèle CSV
              </Button>
            </div>
          </>
        )}

        {state === 'processing' && (
          <div className="py-12 text-center">
            <Loader2 className="w-16 h-16 mx-auto mb-4 text-[#1E40AF] animate-spin" />
            <h3 className="text-[#111827] mb-2">Traitement en cours...</h3>
            <p className="text-[#4B5563]">Veuillez patienter pendant que nous analysons votre fichier</p>
            
            <div className="mt-6 max-w-md mx-auto">
              <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                <div className="h-full bg-[#1E40AF] rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        )}

        {state === 'preview' && (
          <>
            <h3 className="text-[#111827] mb-6">Aperçu des Données</h3>

            {/* Preview Table */}
            <div className="mb-6 overflow-x-auto">
              <table className="w-full body-small">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                    <th className="text-left py-2 px-3">Nom</th>
                    <th className="text-left py-2 px-3">Prénom</th>
                    <th className="text-left py-2 px-3">Identifiant</th>
                    <th className="text-left py-2 px-3">Pension</th>
                    <th className="text-left py-2 px-3">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="border-b border-[#E5E7EB]">
                      <td className="py-2 px-3">KONE</td>
                      <td className="py-2 px-3">Mamadou</td>
                      <td className="py-2 px-3">BEN-2024-{i.toString().padStart(5, '0')}</td>
                      <td className="py-2 px-3">45,000 FCFA</td>
                      <td className="py-2 px-3">Mobile</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Validation Summary */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 p-3 bg-[#D1FAE5] rounded-lg">
                <CheckCircle className="w-5 h-5 text-[#059669]" />
                <span className="text-[#059669] font-medium">{validCount} retraités valides</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#FEF3C7] rounded-lg">
                <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
                <span className="text-[#F59E0B] font-medium">{duplicateCount} doublons détectés</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#FEE2E2] rounded-lg">
                <XCircle className="w-5 h-5 text-[#DC2626]" />
                <span className="text-[#DC2626] font-medium">{errorCount} erreurs à corriger</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button variant="outline" onClick={onClose}>Annuler</Button>
              <Button variant="primary" onClick={handleImport}>Importer</Button>
            </div>
          </>
        )}

        {state === 'results' && (
          <>
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-[#D1FAE5] flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-[#059669]" />
              </div>
              <h3 className="text-[#111827] mb-2">Importation Complétée!</h3>
              
              <div className="mt-6 space-y-2 max-w-md mx-auto">
                <div className="flex justify-between p-3 bg-[#F9FAFB] rounded-lg">
                  <span className="text-[#4B5563]">Retraités ajoutés avec succès</span>
                  <span className="font-semibold text-[#059669]">{validCount}</span>
                </div>
                <div className="flex justify-between p-3 bg-[#F9FAFB] rounded-lg">
                  <span className="text-[#4B5563]">Doublons ignorés</span>
                  <span className="font-semibold text-[#F59E0B]">{duplicateCount}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-6 border-t border-[#E5E7EB]">
              <Button variant="text" icon={<Download className="w-4 h-4" />}>
                Télécharger le rapport
              </Button>
              <Button variant="primary" onClick={handleFinish}>
                Fermer
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
