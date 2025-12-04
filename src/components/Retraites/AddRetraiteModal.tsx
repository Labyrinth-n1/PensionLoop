import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { Retraite } from '../../types';

interface AddRetraiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (retraite: Retraite) => void;
}

export function AddRetraiteModal({ isOpen, onClose, onSave }: AddRetraiteModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    dateNaissance: '',
    identifiant: '',
    telephone: '',
    email: '',
    adresse: '',
    montantPension: '',
    typeCompte: '' as 'banque' | 'mobile' | '',
    operateur: '',
    numeroCompte: '',
    nomTitulaire: '',
    dateDebutPension: '',
  });
  const [confirmed, setConfirmed] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSave = () => {
    const newRetraite: Retraite = {
      id: `${Date.now()}`,
      identifiant: formData.identifiant,
      prenom: formData.prenom,
      nom: formData.nom,
      dateNaissance: formData.dateNaissance,
      age: new Date().getFullYear() - new Date(formData.dateNaissance).getFullYear(),
      telephone: formData.telephone,
      email: formData.email,
      adresse: formData.adresse,
      montantPension: parseFloat(formData.montantPension),
      typeCompte: formData.typeCompte as 'banque' | 'mobile',
      operateur: formData.operateur,
      numeroCompte: formData.numeroCompte,
      nomTitulaire: formData.nomTitulaire,
      dateDebutPension: formData.dateDebutPension,
      prochainPaiement: '05/01/2025',
      statut: 'actif',
      createdAt: new Date().toISOString(),
    };
    onSave(newRetraite);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        {/* Progress Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= s ? 'bg-[#1E40AF] text-white' : 'bg-[#E5E7EB] text-[#9CA3AF]'}`}>
                    {s}
                  </div>
                  <span className={`ml-3 ${step >= s ? 'text-[#111827]' : 'text-[#9CA3AF]'}`}>
                    {s === 1 ? 'Informations Personnelles' : s === 2 ? 'Informations Financières' : 'Récapitulatif'}
                  </span>
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-0.5 mx-4 ${step > s ? 'bg-[#1E40AF]' : 'bg-[#E5E7EB]'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-[#111827]">Informations Personnelles</h3>
            
            {/* Photo Upload */}
            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-full border-2 border-dashed border-[#E5E7EB] flex flex-col items-center justify-center cursor-pointer hover:border-[#1E40AF] transition-colors">
                <Camera className="w-8 h-8 text-[#9CA3AF] mb-2" />
                <span className="body-small text-[#9CA3AF] text-center">Cliquer pour ajouter une photo</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Nom"
                required
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              />
              <Input
                label="Prénom"
                required
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
              />
              <Input
                label="Date de naissance"
                type="date"
                required
                value={formData.dateNaissance}
                onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
              />
              <Input
                label="Identifiant national"
                required
                value={formData.identifiant}
                onChange={(e) => setFormData({ ...formData, identifiant: e.target.value })}
              />
              <Input
                label="Téléphone"
                required
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
              />
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Input
                label="Adresse"
                className="col-span-2"
                value={formData.adresse}
                onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Step 2: Financial Info */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-[#111827]">Informations Financières</h3>

            <div>
              <label className="block mb-2 text-[#111827] font-medium">Montant de la pension <span className="text-[#DC2626]">*</span></label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.montantPension}
                  onChange={(e) => setFormData({ ...formData, montantPension: e.target.value })}
                  className="w-full px-4 py-3 text-2xl font-bold border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20"
                  placeholder="0"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#4B5563] font-semibold">FCFA</span>
              </div>
            </div>

            <div>
              <label className="block mb-3 text-[#111827] font-medium">Type de compte <span className="text-[#DC2626]">*</span></label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, typeCompte: 'banque' })}
                  className={`p-4 rounded-lg border-2 transition-all ${formData.typeCompte === 'banque' ? 'border-[#1E40AF] bg-[#EFF6FF]' : 'border-[#E5E7EB] hover:border-[#9CA3AF]'}`}
                >
                  <div className="text-4xl mb-2">🏦</div>
                  <div className="font-medium text-[#111827]">Compte Bancaire</div>
                  <div className="body-small text-[#4B5563]">Virement bancaire direct</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, typeCompte: 'mobile' })}
                  className={`p-4 rounded-lg border-2 transition-all ${formData.typeCompte === 'mobile' ? 'border-[#1E40AF] bg-[#EFF6FF]' : 'border-[#E5E7EB] hover:border-[#9CA3AF]'}`}
                >
                  <div className="text-4xl mb-2">📱</div>
                  <div className="font-medium text-[#111827]">Mobile Money</div>
                  <div className="body-small text-[#4B5563]">MTN, Moov, Flooz</div>
                </button>
              </div>
            </div>

            {formData.typeCompte === 'banque' && (
              <div className="space-y-4">
                <Input
                  label="Nom de la banque"
                  required
                  value={formData.operateur}
                  onChange={(e) => setFormData({ ...formData, operateur: e.target.value })}
                />
                <Input
                  label="Numéro IBAN"
                  required
                  value={formData.numeroCompte}
                  onChange={(e) => setFormData({ ...formData, numeroCompte: e.target.value })}
                />
                <Input
                  label="Nom du titulaire"
                  required
                  value={formData.nomTitulaire}
                  onChange={(e) => setFormData({ ...formData, nomTitulaire: e.target.value })}
                />
              </div>
            )}

            {formData.typeCompte === 'mobile' && (
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-[#111827]">Opérateur <span className="text-[#DC2626]">*</span></label>
                  <select
                    value={formData.operateur}
                    onChange={(e) => setFormData({ ...formData, operateur: e.target.value })}
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20"
                  >
                    <option value="">Sélectionner un opérateur</option>
                    <option value="MTN Mobile Money">MTN Mobile Money</option>
                    <option value="Moov Money">Moov Money</option>
                    <option value="Flooz">Flooz</option>
                  </select>
                </div>
                <Input
                  label="Numéro de téléphone"
                  required
                  value={formData.numeroCompte}
                  onChange={(e) => setFormData({ ...formData, numeroCompte: e.target.value })}
                />
                <Input
                  label="Nom du compte"
                  required
                  value={formData.nomTitulaire}
                  onChange={(e) => setFormData({ ...formData, nomTitulaire: e.target.value })}
                />
              </div>
            )}

            <Input
              label="Date de début de pension"
              type="date"
              required
              value={formData.dateDebutPension}
              onChange={(e) => setFormData({ ...formData, dateDebutPension: e.target.value })}
            />
          </div>
        )}

        {/* Step 3: Summary */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-[#111827]">Récapitulatif</h3>

            <div className="bg-[#F9FAFB] rounded-lg p-6">
              <h3 className="text-[#111827] mb-4">Informations Personnelles</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="body-small text-[#4B5563]">Nom complet</p>
                  <p className="font-medium text-[#111827]">{formData.prenom} {formData.nom}</p>
                </div>
                <div>
                  <p className="body-small text-[#4B5563]">Date de naissance</p>
                  <p className="font-medium text-[#111827]">{formData.dateNaissance}</p>
                </div>
                <div>
                  <p className="body-small text-[#4B5563]">Identifiant</p>
                  <p className="font-medium text-[#111827]">{formData.identifiant}</p>
                </div>
                <div>
                  <p className="body-small text-[#4B5563]">Téléphone</p>
                  <p className="font-medium text-[#111827]">{formData.telephone}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#EFF6FF] rounded-lg p-6">
              <h3 className="text-[#111827] mb-4">Informations Financières</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="body-small text-[#4B5563]">Montant pension</p>
                  <p className="text-2xl font-bold text-[#1E40AF]">{formData.montantPension} FCFA</p>
                </div>
                <div>
                  <p className="body-small text-[#4B5563]">Type de compte</p>
                  <p className="font-medium text-[#111827]">{formData.typeCompte === 'banque' ? 'Compte Bancaire' : 'Mobile Money'}</p>
                </div>
                <div>
                  <p className="body-small text-[#4B5563]">Opérateur</p>
                  <p className="font-medium text-[#111827]">{formData.operateur}</p>
                </div>
                <div>
                  <p className="body-small text-[#4B5563]">Numéro</p>
                  <p className="font-medium text-[#111827]">{formData.numeroCompte}</p>
                </div>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="w-5 h-5 mt-0.5 text-[#1E40AF] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#1E40AF]/20"
              />
              <span className="text-[#4B5563]">Je confirme l'exactitude de ces informations</span>
            </label>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E5E7EB]">
          <div>
            {step > 1 && (
              <Button variant="outline" icon={<ChevronLeft className="w-4 h-4" />} onClick={handlePrevious}>
                Précédent
              </Button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="text" onClick={onClose}>
              Annuler
            </Button>
            {step < 3 ? (
              <Button variant="primary" onClick={handleNext}>
                Suivant <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSave} disabled={!confirmed} size="lg">
                Enregistrer
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
