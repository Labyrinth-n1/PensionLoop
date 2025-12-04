import React, { useState } from 'react';
import { Modal } from '../shared/Modal';
import { Button } from '../shared/Button';
import { Check, AlertTriangle } from 'lucide-react';
import { mockRetraites } from '../../data/mockData';

interface PaiementManuelProps {
  onClose: () => void;
}

export function PaiementManuel({ onClose }: PaiementManuelProps) {
  const [step, setStep] = useState(1);
  const [selectedRetraites, setSelectedRetraites] = useState<string[]>([]);
  const [paymentType, setPaymentType] = useState('mobile');
  const [operator, setOperator] = useState('MTN');
  const [confirmed, setConfirmed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(0);

  const totalAmount = mockRetraites
    .filter(r => selectedRetraites.includes(r.id))
    .reduce((sum, r) => sum + r.montantPension, 0);

  const handleStartPayment = () => {
    setProcessing(true);
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setCompleted(count);
      if (count >= selectedRetraites.length) {
        clearInterval(interval);
        setTimeout(() => {
          setProcessing(false);
          setStep(4);
        }, 1000);
      }
    }, 100);
  };

  if (processing) {
    const progress = (completed / selectedRetraites.length) * 100;
    return (
      <Modal isOpen={true} onClose={() => {}} width="lg" showClose={false}>
        <div className="p-12 text-center">
          <h2 className="mb-6">Paiement en cours...</h2>
          
          {/* Progress Circle */}
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#1E40AF"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl text-[#1E40AF]">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-2xl text-[#059669]">{completed}</p>
              <p className="text-sm text-gray-600">Complétés</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-2xl text-[#1E40AF]">{selectedRetraites.length - completed}</p>
              <p className="text-sm text-gray-600">En cours</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-2xl text-[#DC2626]">0</p>
              <p className="text-sm text-gray-600">Échecs</p>
            </div>
          </div>

          <p className="text-gray-600">Temps écoulé: {Math.floor(completed / 10)}:{(completed % 10) * 6}s</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={true} onClose={onClose} width="xl">
      <div className="p-6">
        {/* Progress Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${step >= s ? 'bg-[#1E40AF] text-white' : 'bg-gray-200 text-gray-600'}
                `}>
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-[#1E40AF]' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-600">Sélection</span>
            <span className="text-sm text-gray-600">Configuration</span>
            <span className="text-sm text-gray-600">Confirmation</span>
          </div>
        </div>

        {/* Step 1: Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <h3>Sélectionner les bénéficiaires</h3>
            
            {/* Selection options */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-[#1E40AF]">
                <input 
                  type="radio" 
                  name="selection" 
                  onChange={() => setSelectedRetraites(mockRetraites.filter(r => r.statut === 'Actif').map(r => r.id))}
                />
                <div className="flex-1">
                  <p>Tous les retraités actifs</p>
                  <p className="text-sm text-gray-600">2,456 retraités - 1.2B FCFA</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-[#1E40AF]">
                <input type="radio" name="selection" />
                <div className="flex-1">
                  <p>Mobile Money uniquement</p>
                  <p className="text-sm text-gray-600">1,222 retraités - 650M FCFA</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border-2 border-[#1E40AF] bg-blue-50 rounded-lg cursor-pointer">
                <input 
                  type="radio" 
                  name="selection" 
                  defaultChecked 
                  onChange={() => setSelectedRetraites(mockRetraites.slice(0, 5).map(r => r.id))}
                />
                <div className="flex-1">
                  <p>Sélection personnalisée</p>
                  <p className="text-sm text-gray-600">5 retraités sélectionnés</p>
                </div>
              </label>
            </div>

            {/* Summary */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Retraités sélectionnés</p>
                  <p className="text-2xl text-[#1E40AF]">{selectedRetraites.length || 5}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">Total</p>
                  <p className="text-2xl text-[#1E40AF]">{(totalAmount || 221000).toLocaleString()} FCFA</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Configuration */}
        {step === 2 && (
          <div className="space-y-6">
            <h3>Configuration du paiement</h3>

            {/* Payment Type */}
            <div>
              <label className="block mb-3 text-gray-700">Type de Paiement</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`
                  p-6 border-2 rounded-lg cursor-pointer transition-all text-center
                  ${paymentType === 'bank' ? 'border-[#1E40AF] bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
                `}>
                  <input 
                    type="radio" 
                    name="paymentType" 
                    value="bank"
                    checked={paymentType === 'bank'}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="mb-3"
                  />
                  <div className="text-4xl mb-2">🏦</div>
                  <p>Compte Bancaire</p>
                  <p className="text-sm text-gray-600 mt-1">Virement bancaire direct</p>
                </label>
                <label className={`
                  p-6 border-2 rounded-lg cursor-pointer transition-all text-center
                  ${paymentType === 'mobile' ? 'border-[#1E40AF] bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
                `}>
                  <input 
                    type="radio" 
                    name="paymentType" 
                    value="mobile"
                    checked={paymentType === 'mobile'}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="mb-3"
                  />
                  <div className="text-4xl mb-2">📱</div>
                  <p>Mobile Money</p>
                  <p className="text-sm text-gray-600 mt-1">MTN, Moov, Flooz</p>
                </label>
              </div>
            </div>

            {/* Operator Selection for Mobile Money */}
            {paymentType === 'mobile' && (
              <div>
                <label className="block mb-3 text-gray-700">Sélectionner l'opérateur</label>
                <div className="space-y-2">
                  {['MTN', 'Moov', 'Flooz'].map((op) => (
                    <label key={op} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input 
                        type="radio" 
                        name="operator" 
                        value={op}
                        checked={operator === op}
                        onChange={(e) => setOperator(e.target.value)}
                      />
                      <span>{op} Mobile Money</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Summary Card */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="mb-4">Récapitulatif</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nombre de bénéficiaires</span>
                  <span>{selectedRetraites.length || 5}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type de paiement</span>
                  <span>{paymentType === 'mobile' ? `Mobile Money - ${operator}` : 'Compte Bancaire'}</span>
                </div>
                <div className="flex justify-between pt-3 border-t">
                  <span className="text-gray-600">Total amount</span>
                  <span className="text-xl text-[#1E40AF]">{(totalAmount || 221000).toLocaleString()} FCFA</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-[#F59E0B] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-[#F59E0B] mb-2">Veuillez vérifier les informations avant de continuer</h3>
                <p className="text-gray-700">Cette action ne peut pas être annulée une fois lancée.</p>
              </div>
            </div>

            {/* Summary Sections */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="mb-3">Détails du Paiement</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-small text-gray-600">Nombre de bénéficiaires</p>
                    <p className="text-xl">{selectedRetraites.length || 5}</p>
                  </div>
                  <div>
                    <p className="text-small text-gray-600">Type de paiement</p>
                    <p>{paymentType === 'mobile' ? `Mobile Money - ${operator}` : 'Banque'}</p>
                  </div>
                  <div>
                    <p className="text-small text-gray-600">Date d'exécution</p>
                    <p>Immédiatement</p>
                  </div>
                  <div>
                    <p className="text-small text-gray-600">Heure</p>
                    <p>{new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-300">
                <h3 className="mb-3">Montants</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Montant total pensions</span>
                    <span>{(totalAmount || 221000).toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frais estimés (1.5%)</span>
                    <span>{Math.round((totalAmount || 221000) * 0.015).toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-300">
                    <span>TOTAL À DÉBITER</span>
                    <span className="text-2xl text-[#1E40AF]">
                      {Math.round((totalAmount || 221000) * 1.015).toLocaleString()} FCFA
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation Checkbox */}
            <label className="flex items-start gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-[#1E40AF] transition-colors">
              <input 
                type="checkbox" 
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-1"
              />
              <span className="text-gray-700">
                Je confirme avoir vérifié toutes les informations et autorise ce paiement
              </span>
            </label>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 4 && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-[#059669]" />
            </div>
            <h2 className="text-[#059669] mb-4">Paiement Complété!</h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Total traités</p>
                  <p className="text-xl">{selectedRetraites.length || 5}</p>
                </div>
                <div>
                  <p className="text-gray-600">Réussis</p>
                  <p className="text-xl text-[#059669]">{selectedRetraites.length || 5} (100%)</p>
                </div>
                <div>
                  <p className="text-gray-600">Échoués</p>
                  <p className="text-xl text-[#DC2626]">0 (0%)</p>
                </div>
                <div>
                  <p className="text-gray-600">Durée totale</p>
                  <p className="text-xl">12s</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <Button variant="secondary">Télécharger le Rapport PDF</Button>
              <Button variant="primary" onClick={onClose}>Fermer</Button>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        {step < 4 && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <div>
              {step > 1 && step < 4 && (
                <Button variant="text" onClick={() => setStep(step - 1)}>
                  ← Précédent
                </Button>
              )}
            </div>
            <div>
              {step < 3 ? (
                <Button variant="primary" onClick={() => setStep(step + 1)}>
                  Suivant →
                </Button>
              ) : (
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={handleStartPayment}
                  disabled={!confirmed}
                >
                  Lancer le Paiement
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
