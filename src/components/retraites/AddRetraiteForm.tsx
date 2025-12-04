import React, { useState } from 'react';
import { Modal } from '../shared/Modal';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { Camera, Check } from 'lucide-react';

interface AddRetraiteFormProps {
  onClose: () => void;
}

export function AddRetraiteForm({ onClose }: AddRetraiteFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    identifiant: '',
    telephone: '',
    email: '',
    adresse: '',
    montantPension: '',
    typeCompte: 'banque',
    banque: '',
    iban: '',
    operateur: '',
    numeroMobile: '',
    dateDebutPension: ''
  });
  const [confirmed, setConfirmed] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose} width="lg">
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
            <span className="text-sm text-gray-600">Informations Personnelles</span>
            <span className="text-sm text-gray-600">Informations Financières</span>
            <span className="text-sm text-gray-600">Récapitulatif</span>
          </div>
        </div>

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-6">
            <h3>Informations Personnelles</h3>
            
            {/* Photo Upload */}
            <div className="flex justify-center">
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-full flex flex-col items-center justify-center cursor-pointer hover:border-[#1E40AF] transition-colors">
                <Camera className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Ajouter photo</span>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-4">
              <Input label="Nom *" value={formData.nom} onChange={(e) => setFormData({...formData, nom: e.target.value})} />
              <Input label="Prénom *" value={formData.prenom} onChange={(e) => setFormData({...formData, prenom: e.target.value})} />
              <Input label="Date de naissance *" type="date" value={formData.dateNaissance} onChange={(e) => setFormData({...formData, dateNaissance: e.target.value})} />
              <Input label="Identifiant national *" value={formData.identifiant} onChange={(e) => setFormData({...formData, identifiant: e.target.value})} />
              <Input label="Téléphone *" value={formData.telephone} onChange={(e) => setFormData({...formData, telephone: e.target.value})} />
              <Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              <div className="col-span-2">
                <Input label="Adresse" value={formData.adresse} onChange={(e) => setFormData({...formData, adresse: e.target.value})} />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Financial Info */}
        {step === 2 && (
          <div className="space-y-6">
            <h3>Informations Financières</h3>
            
            <div>
              <label className="block mb-2 text-gray-700">Montant de la pension *</label>
              <div className="relative">
                <Input 
                  type="number" 
                  placeholder="0"
                  value={formData.montantPension}
                  onChange={(e) => setFormData({...formData, montantPension: e.target.value})}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">FCFA</span>
              </div>
            </div>

            {/* Account Type */}
            <div>
              <label className="block mb-3 text-gray-700">Type de compte *</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`
                  p-4 border-2 rounded-lg cursor-pointer transition-all
                  ${formData.typeCompte === 'banque' ? 'border-[#1E40AF] bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
                `}>
                  <input 
                    type="radio" 
                    name="typeCompte" 
                    value="banque"
                    checked={formData.typeCompte === 'banque'}
                    onChange={(e) => setFormData({...formData, typeCompte: e.target.value})}
                    className="mr-2"
                  />
                  <span>🏦 Compte Bancaire</span>
                </label>
                <label className={`
                  p-4 border-2 rounded-lg cursor-pointer transition-all
                  ${formData.typeCompte === 'mobile' ? 'border-[#1E40AF] bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
                `}>
                  <input 
                    type="radio" 
                    name="typeCompte" 
                    value="mobile"
                    checked={formData.typeCompte === 'mobile'}
                    onChange={(e) => setFormData({...formData, typeCompte: e.target.value})}
                    className="mr-2"
                  />
                  <span>📱 Mobile Money</span>
                </label>
              </div>
            </div>

            {/* Bank Fields */}
            {formData.typeCompte === 'banque' && (
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-gray-700">Nom de la banque *</label>
                  <select 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#1E40AF]"
                    value={formData.banque}
                    onChange={(e) => setFormData({...formData, banque: e.target.value})}
                  >
                    <option value="">Sélectionner...</option>
                    <option value="BOA">Bank of Africa</option>
                    <option value="Ecobank">Ecobank</option>
                    <option value="BIBE">BIBE</option>
                    <option value="SGBB">SGBB</option>
                  </select>
                </div>
                <Input label="Numéro IBAN *" value={formData.iban} onChange={(e) => setFormData({...formData, iban: e.target.value})} />
              </div>
            )}

            {/* Mobile Money Fields */}
            {formData.typeCompte === 'mobile' && (
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-gray-700">Opérateur *</label>
                  <select 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#1E40AF]"
                    value={formData.operateur}
                    onChange={(e) => setFormData({...formData, operateur: e.target.value})}
                  >
                    <option value="">Sélectionner...</option>
                    <option value="MTN">MTN Mobile Money</option>
                    <option value="Moov">Moov Money</option>
                    <option value="Flooz">Flooz</option>
                  </select>
                </div>
                <Input label="Numéro de téléphone *" value={formData.numeroMobile} onChange={(e) => setFormData({...formData, numeroMobile: e.target.value})} />
              </div>
            )}

            <Input label="Date de début de pension *" type="date" value={formData.dateDebutPension} onChange={(e) => setFormData({...formData, dateDebutPension: e.target.value})} />
          </div>
        )}

        {/* Step 3: Summary */}
        {step === 3 && (
          <div className="space-y-6">
            <h3>Récapitulatif</h3>
            
            {/* Personal Info Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="mb-4">Informations Personnelles</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-small text-gray-500">Nom complet</p>
                  <p>{formData.prenom} {formData.nom}</p>
                </div>
                <div>
                  <p className="text-small text-gray-500">Date de naissance</p>
                  <p>{formData.dateNaissance}</p>
                </div>
                <div>
                  <p className="text-small text-gray-500">Téléphone</p>
                  <p>{formData.telephone}</p>
                </div>
                <div>
                  <p className="text-small text-gray-500">Email</p>
                  <p>{formData.email || 'Non renseigné'}</p>
                </div>
              </div>
            </div>

            {/* Financial Info Summary */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="mb-4">Informations Financières</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-small text-gray-500">Montant pension</p>
                  <p className="text-xl text-[#1E40AF]">{formData.montantPension} FCFA</p>
                </div>
                <div>
                  <p className="text-small text-gray-500">Type de compte</p>
                  <p>{formData.typeCompte === 'banque' ? 'Compte Bancaire' : 'Mobile Money'}</p>
                </div>
                <div>
                  <p className="text-small text-gray-500">
                    {formData.typeCompte === 'banque' ? 'Banque' : 'Opérateur'}
                  </p>
                  <p>{formData.typeCompte === 'banque' ? formData.banque : formData.operateur}</p>
                </div>
                <div>
                  <p className="text-small text-gray-500">Date de début</p>
                  <p>{formData.dateDebutPension}</p>
                </div>
              </div>
            </div>

            {/* Confirmation */}
            <label className="flex items-start gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-[#1E40AF] transition-colors">
              <input 
                type="checkbox" 
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-1"
              />
              <span className="text-gray-700">
                Je confirme l'exactitude de ces informations
              </span>
            </label>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <div>
            {step > 1 && (
              <Button variant="text" onClick={handlePrevious}>
                ← Précédent
              </Button>
            )}
          </div>
          <div>
            {step < 3 ? (
              <Button variant="primary" onClick={handleNext}>
                Suivant →
              </Button>
            ) : (
              <Button 
                variant="primary" 
                size="lg" 
                onClick={handleSubmit}
                disabled={!confirmed}
              >
                Enregistrer
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
