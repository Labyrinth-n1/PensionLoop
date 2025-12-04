import axios, { AxiosProgressEvent } from 'axios';

// Configuration de l'URL de base de l'API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001/api';

// Types exportés
export interface DashboardStats {
  totalRetraites: number;
  newThisMonth: number;
  pensionsVersees: number;
  successRate: number;
  paiementsEnAttente: number;
}

export interface Pensioner {
  id: string;
  typeId: string;        // type_id du CSV (banque, mobile, etc.)
  personalId: string;    // personal_id du CSV
  firstName: string;     // first_name du CSV
  lastName: string;      // last_name du CSV
  amount: number;        // amount du CSV
  currency: string;      // currency du CSV (XOF par défaut)
  status?: PaymentStatus;
  type?: 'banque' | 'mobile';
  paymentDate?: string;
  reference?: string;
  errorMessage?: string;
  batchId?: string;      // ID du lot d'import
}

export interface Transaction {
  id: string;
  retraiteId: string;
  retraiteName: string;
  montant: number;
  frais: number;
  type: 'banque' | 'mobile';
  operateur?: string;
  reference: string;
  statut: PaymentStatus;
  dateHeure: string;
  errorMessage?: string;
}

export interface PaymentBatch {
  id: string;
  fileName: string;
  uploadDate: string;
  totalPensioners: number;
  totalAmount: number;
  currency: string;
  status: BatchStatus;
  processedCount: number;
  successCount: number;
  failedCount: number;
  pensioners: Pensioner[];
  createdAt: string;
  processedAt?: string;
  completedAt?: string;
}

export interface PaymentStatusResponse {
  batchId: string;
  status: BatchStatus;
  progress: number;
  processed: number;
  total: number;
  successCount: number;
  failedCount: number;
  details?: {
    pensionerId: string;
    status: PaymentStatus;
    message?: string;
    reference?: string;
  }[];
}

export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'reussi' | 'echoue' | 'en_cours';
export type BatchStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'partial';

// Configuration Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 secondes
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs d'authentification
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Service Dashboard
export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    try {
      const response = await api.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      console.error('Erreur API getStats:', error);
      throw error;
    }
  },

  getRecentTransactions: async (): Promise<Transaction[]> => {
    try {
      const response = await api.get('/dashboard/transactions/recent');
      return response.data;
    } catch (error) {
      console.error('Erreur API getRecentTransactions:', error);
      throw error;
    }
  },

  getChartData: async (): Promise<any[]> => {
    try {
      const response = await api.get('/dashboard/chart-data');
      return response.data;
    } catch (error) {
      console.error('Erreur API getChartData:', error);
      throw error;
    }
  }
};

// Service de gestion des pensionnés (import CSV)
export const pensionerService = {
  // Récupérer la liste de tous les pensionnés
  getAll: async (params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  } = {}): Promise<{ data: Pensioner[]; total: number; page: number; limit: number; totalPages: number }> => {
    try {
      const response = await api.get('/pensioners', { params });
      return response.data;
    } catch (error) {
      console.error('Erreur API getAll pensioners:', error);
      throw error;
    }
  },

  // Importer un fichier CSV de pensionnés
  importCSV: async (
    file: File,
    onUploadProgress?: (progress: number) => void
  ): Promise<{ batchId: string; pensioners: Pensioner[]; totalAmount: number }> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/pensioners/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (onUploadProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onUploadProgress(progress);
          }
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erreur API importCSV:', error);
      throw error;
    }
  },

  // Récupérer la liste des lots importés
  getBatches: async (params: { page?: number; limit?: number } = {}): Promise<PaymentBatch[]> => {
    try {
      const response = await api.get('/pensioners/batches', { params });
      return response.data;
    } catch (error) {
      console.error('Erreur API getBatches:', error);
      throw error;
    }
  },

  // Récupérer un lot spécifique
  getBatch: async (batchId: string): Promise<PaymentBatch> => {
    try {
      const response = await api.get(`/pensioners/batches/${batchId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur API getBatch:', error);
      throw error;
    }
  },

  // Valider un lot avant paiement
  validateBatch: async (batchId: string): Promise<{ valid: boolean; errors: string[] }> => {
    try {
      const response = await api.post(`/pensioners/batches/${batchId}/validate`);
      return response.data;
    } catch (error) {
      console.error('Erreur API validateBatch:', error);
      throw error;
    }
  },

  // Importer des données déjà parsées (utilisé pour la sync hors-ligne)
  importParsedData: async (
    pensioners: Omit<Pensioner, 'id' | 'batchId'>[]
  ): Promise<{ batchId: string; pensioners: Pensioner[]; totalAmount: number }> => {
    try {
      const response = await api.post('/pensioners/import-data', { pensioners });
      return response.data;
    } catch (error) {
      console.error('Erreur API importParsedData:', error);
      throw error;
    }
  }
};

// Service de paiement via Mojaloop
export const paymentService = {
  // Démarrer le traitement des paiements en masse
  processBatch: async (batchId: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await api.post(`/payments/process/${batchId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur API processBatch:', error);
      throw error;
    }
  },

  // Obtenir le statut d'un lot de paiements en temps réel
  getBatchStatus: async (batchId: string): Promise<PaymentStatusResponse> => {
    try {
      const response = await api.get(`/payments/status/${batchId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur API getBatchStatus:', error);
      throw error;
    }
  },

  // Obtenir l'historique des paiements (lots)
  getPaymentHistory: async (params: {
    page?: number;
    limit?: number;
    status?: PaymentStatus;
    startDate?: string;
    endDate?: string;
  } = {}): Promise<{ data: PaymentBatch[]; total: number; page: number; limit: number; totalPages: number }> => {
    try {
      const response = await api.get('/payments/history', { params });
      return response.data;
    } catch (error) {
      console.error('Erreur API getPaymentHistory:', error);
      throw error;
    }
  },

  // Obtenir l'historique des transactions individuelles
  getTransactionHistory: async (params: {
    page?: number;
    limit?: number;
    status?: string;
    type?: string;
    startDate?: string;
    endDate?: string;
  } = {}): Promise<{ data: Transaction[]; total: number; page: number; limit: number; totalPages: number }> => {
    try {
      const response = await api.get('/payments/transactions', { params });
      return response.data;
    } catch (error) {
      console.error('Erreur API getTransactionHistory:', error);
      throw error;
    }
  },

  // Générer un rapport de paiement
  generateReport: async (batchId: string, format: 'pdf' | 'csv' | 'excel' = 'pdf'): Promise<Blob> => {
    try {
      const response = await api.get(`/payments/report/${batchId}`, {
        params: { format },
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Erreur API generateReport:', error);
      throw error;
    }
  },

  // Télécharger le rapport d'un batch spécifique
  downloadBatchReport: async (batchId: string, format: 'pdf' | 'csv' | 'excel' = 'pdf') => {
    try {
      const blob = await paymentService.generateReport(batchId, format);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const extension = format === 'excel' ? 'xlsx' : format;
      link.setAttribute('download', `rapport-paiement-${batchId}.${extension}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur téléchargement rapport:', error);
      throw error;
    }
  },

  // Télécharger un rapport global (pour la page Rapports)
  downloadReport: async (params: {
    format: 'pdf' | 'csv' | 'excel';
    period?: string;
    includeDetails?: boolean;
  }): Promise<Blob> => {
    try {
      const response = await api.get('/reports/download', {
        params,
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Erreur API downloadReport:', error);
      throw error;
    }
  },

  // Réessayer les paiements échoués
  retryFailed: async (batchId: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await api.post(`/payments/retry/${batchId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur API retryFailed:', error);
      throw error;
    }
  }
};

// Service d'authentification
export const authService = {
  login: async (email: string, password: string): Promise<{ token: string; user: any }> => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Erreur API login:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    window.location.href = '/';
  },

  verifyToken: async (): Promise<boolean> => {
    try {
      await api.get('/auth/verify');
      return true;
    } catch (error) {
      return false;
    }
  }
};

export default api;
