// Core Types
export interface Retraite {
  id: string;
  identifiant: string;
  prenom: string;
  nom: string;
  dateNaissance: string;
  age: number;
  telephone: string;
  email: string;
  adresse: string;
  photo?: string;
  montantPension: number;
  typeCompte: 'banque' | 'mobile';
  operateur?: string;
  numeroCompte: string;
  nomTitulaire: string;
  dateDebutPension: string;
  prochainPaiement: string;
  statut: 'actif' | 'inactif';
  createdAt: string;
}

export interface Transaction {
  id: string;
  retraiteId: string;
  retraiteName: string;
  retraitePhoto?: string;
  montant: number;
  frais: number;
  type: 'banque' | 'mobile';
  operateur?: string;
  reference: string;
  statut: 'reussi' | 'echoue' | 'en_cours';
  dateHeure: string;
  errorMessage?: string;
  traitePar?: string;
}

export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  photo?: string;
  role: 'super_admin' | 'admin' | 'operateur';
  departement: string;
  dateCreation: string;
  dernierAcces: string;
  actif: boolean;
}

export interface PaymentBatch {
  id: string;
  date: string;
  nombreBeneficiaires: number;
  montantTotal: number;
  type: 'banque' | 'mobile';
  operateur?: string;
  statut: 'complete' | 'en_cours' | 'echoue';
  reussis: number;
  echoues: number;
  duree: string;
}

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  whatsapp: boolean;
  events: {
    paiementReussi: { email: boolean; sms: boolean; push: boolean };
    paiementEchoue: { email: boolean; sms: boolean; push: boolean };
    paiementAuto: { email: boolean; sms: boolean; push: boolean };
    rapportMensuel: { email: boolean; sms: boolean; push: boolean };
    nouveauRetraite: { email: boolean; sms: boolean; push: boolean };
    soldeFaible: { email: boolean; sms: boolean; push: boolean };
    activiteSuspecte: { email: boolean; sms: boolean; push: boolean };
  };
  emails: string[];
}

export interface AutoPaymentConfig {
  enabled: boolean;
  dayOfMonth: number;
  time: string;
  paymentType: 'banque' | 'mobile' | 'preference';
  includeTousActifs: boolean;
  excludeErrors: boolean;
  notifyBefore24h: boolean;
  sendReport: boolean;
  alertOnFailureOnly: boolean;
  nextPayment: {
    date: string;
    beneficiaires: number;
    montant: number;
  };
}

export interface FintechConfig {
  id: string;
  name: string;
  logo: string;
  active: boolean;
  apiKey: string;
  secretKey: string;
  webhookUrl: string;
  fees: number;
  limitPerTransaction: number;
}
