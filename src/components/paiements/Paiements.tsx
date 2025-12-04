import { useState, useEffect, useCallback } from 'react';
import {
  Users,
  Banknote,
  Calendar,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  AlertTriangle,
  Play
} from 'lucide-react';
import { Button } from '../shared/Button';
import {
  paymentService,
  pensionerService,
  PaymentBatch,
  PaymentStatusResponse,
  Pensioner
} from '../../services/api';

// Types locaux
type ViewMode = 'list' | 'import' | 'processing' | 'results';
type BatchStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'partial';

export function Paiements() {
  // États principaux
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [batches, setBatches] = useState<PaymentBatch[]>([]);
  const [currentBatch, setCurrentBatch] = useState<PaymentBatch | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatusResponse | null>(null);

  // États de chargement et erreurs
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Charger les lots de paiements
  const fetchBatches = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await paymentService.getPaymentHistory();
      setBatches(response.data || []);
    } catch (err) {
      console.error('Erreur lors du chargement des lots:', err);
      setError('Impossible de charger l\'historique des paiements. Le backend n\'est peut-être pas disponible.');
      setBatches([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

  // Gestion de l'import CSV
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validation du fichier
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setError('Veuillez sélectionner un fichier CSV valide');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB max
      setError('Le fichier est trop volumineux (max 10MB)');
      return;
    }

    try {
      setIsUploading(true);
      setError(null);
      setUploadProgress(0);

      const result = await pensionerService.importCSV(file, (progress) => {
        setUploadProgress(progress);
      });

      setSuccessMessage(`Import réussi: ${result.pensioners.length} pensionnés importés`);

      // Récupérer le lot créé
      if (result.batchId) {
        const batch = await pensionerService.getBatch(result.batchId);
        setCurrentBatch(batch);
        setViewMode('import');
      }

      // Rafraîchir la liste
      await fetchBatches();
    } catch (err: any) {
      console.error('Erreur lors de l\'import:', err);
      setError(err.response?.data?.message || 'Erreur lors de l\'import du fichier CSV');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      event.target.value = '';
    }
  };

  // Traitement des paiements en masse
  const handleProcessPayments = async (batchId: string) => {
    if (!batchId || isProcessing) return;

    try {
      setIsProcessing(true);
      setError(null);
      setViewMode('processing');

      // Démarrer le traitement
      await paymentService.processBatch(batchId);

      // Polling du statut
      const pollStatus = async () => {
        try {
          const status = await paymentService.getBatchStatus(batchId);
          setPaymentStatus(status);

          if (status.status === 'processing') {
            setTimeout(pollStatus, 2000);
          } else {
            setIsProcessing(false);
            setViewMode('results');
            await fetchBatches();
          }
        } catch (err) {
          console.error('Erreur lors du suivi:', err);
          setIsProcessing(false);
          setError('Erreur lors du suivi du traitement');
        }
      };

      pollStatus();
    } catch (err: any) {
      console.error('Erreur lors du traitement:', err);
      setError(err.response?.data?.message || 'Erreur lors du traitement des paiements');
      setIsProcessing(false);
      setViewMode('list');
    }
  };

  // Télécharger le rapport d'un batch
  const handleDownloadReport = async (batchId: string, format: 'pdf' | 'csv' | 'excel' = 'pdf') => {
    try {
      await paymentService.downloadBatchReport(batchId, format);
      setSuccessMessage('Rapport téléchargé avec succès');
    } catch (err) {
      console.error('Erreur lors du téléchargement:', err);
      setError('Erreur lors du téléchargement du rapport');
    }
  };

  // Réessayer les paiements échoués
  const handleRetryFailed = async (batchId: string) => {
    try {
      setIsProcessing(true);
      await paymentService.retryFailed(batchId);
      setSuccessMessage('Relance des paiements échoués en cours');
      handleProcessPayments(batchId);
    } catch (err) {
      console.error('Erreur lors de la relance:', err);
      setError('Erreur lors de la relance des paiements');
      setIsProcessing(false);
    }
  };

  // Helpers pour l'affichage
  const getStatusColor = (status: BatchStatus): string => {
    const colors: Record<BatchStatus, string> = {
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      processing: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
      partial: 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: BatchStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      case 'processing':
        return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'partial':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: BatchStatus): string => {
    const labels: Record<BatchStatus, string> = {
      completed: 'Terminé',
      failed: 'Échoué',
      processing: 'En cours',
      pending: 'En attente',
      partial: 'Partiel'
    };
    return labels[status] || status;
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Rendu de la vue de traitement en cours
  const renderProcessingView = () => (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <div className="mb-6">
        <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
          <RefreshCw className="w-10 h-10 text-[#1E40AF] animate-spin" />
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">Traitement en cours...</h3>
      <p className="text-gray-600 mb-6">
        Les paiements sont en cours de traitement via Mojaloop
      </p>

      {paymentStatus && (
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm mb-2">
            <span>Progression</span>
            <span>{paymentStatus.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-[#1E40AF] h-3 rounded-full transition-all duration-300"
              style={{ width: `${paymentStatus.progress}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-2xl font-bold text-gray-900">{paymentStatus.processed}</p>
              <p className="text-xs text-gray-500">Traités</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-2xl font-bold text-green-600">{paymentStatus.successCount}</p>
              <p className="text-xs text-gray-500">Réussis</p>
            </div>
            <div className="bg-red-50 rounded-lg p-3">
              <p className="text-2xl font-bold text-red-600">{paymentStatus.failedCount}</p>
              <p className="text-xs text-gray-500">Échoués</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Rendu de la vue des résultats
  const renderResultsView = () => (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="text-center mb-8">
        <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
          paymentStatus?.failedCount === 0 ? 'bg-green-100' : 'bg-orange-100'
        }`}>
          {paymentStatus?.failedCount === 0 ? (
            <CheckCircle className="w-10 h-10 text-green-600" />
          ) : (
            <AlertTriangle className="w-10 h-10 text-orange-600" />
          )}
        </div>
        <h3 className="text-xl font-semibold mt-4">
          {paymentStatus?.failedCount === 0 ? 'Traitement terminé avec succès' : 'Traitement terminé avec des erreurs'}
        </h3>
      </div>

      {paymentStatus && (
        <>
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-gray-900">{paymentStatus.total}</p>
              <p className="text-sm text-gray-500">Total</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{paymentStatus.successCount}</p>
              <p className="text-sm text-gray-500">Réussis</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-red-600">{paymentStatus.failedCount}</p>
              <p className="text-sm text-gray-500">Échoués</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-[#1E40AF]">
                {((paymentStatus.successCount / paymentStatus.total) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-gray-500">Taux de réussite</p>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              variant="secondary"
              onClick={() => handleDownloadReport(paymentStatus.batchId, 'pdf')}
            >
              <Download className="w-4 h-4 mr-2" />
              Télécharger le rapport PDF
            </Button>
            {paymentStatus.failedCount > 0 && (
              <Button
                variant="primary"
                onClick={() => handleRetryFailed(paymentStatus.batchId)}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Réessayer les échecs
              </Button>
            )}
            <Button variant="outline" onClick={() => setViewMode('list')}>
              Retour à la liste
            </Button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Paiements</h2>
          <p className="text-gray-600 mt-1">
            Importez le fichier CSV mensuel des pensionnés et lancez les paiements en masse
          </p>
        </div>
        {viewMode === 'list' && (
          <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#1E40AF] hover:bg-blue-700 cursor-pointer transition-colors">
            <Upload className="w-4 h-4 mr-2" />
            Importer un fichier CSV
            <input
              type="file"
              className="hidden"
              accept=".csv"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </label>
        )}
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
          <div className="flex items-center">
            <XCircle className="h-5 w-5 text-red-400 mr-3" />
            <p className="text-sm text-red-700">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-400 hover:text-red-600"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
            <p className="text-sm text-green-700">{successMessage}</p>
            <button
              onClick={() => setSuccessMessage(null)}
              className="ml-auto text-green-400 hover:text-green-600"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <RefreshCw className="w-5 h-5 text-[#1E40AF] animate-spin mr-3" />
            <span className="text-sm text-blue-700">Import en cours...</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-[#1E40AF] h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Content based on view mode */}
      {viewMode === 'processing' && renderProcessingView()}
      {viewMode === 'results' && renderResultsView()}

      {viewMode === 'list' && (
        <>
          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <RefreshCw className="animate-spin h-8 w-8 text-[#1E40AF]" />
            </div>
          ) : batches.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16 bg-white rounded-lg shadow-md">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun lot de paiement</h3>
              <p className="text-gray-500 mb-6">
                Importez un fichier CSV pour commencer le traitement des paiements
              </p>
              <label className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#1E40AF] hover:bg-blue-700 cursor-pointer">
                <Upload className="w-5 h-5 mr-2" />
                Importer un fichier CSV
                <input
                  type="file"
                  className="hidden"
                  accept=".csv"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          ) : (
            /* Batches List */
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Lots de paiements</h3>
                <button
                  onClick={fetchBatches}
                  className="text-[#1E40AF] hover:text-blue-700 flex items-center gap-1 text-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  Actualiser
                </button>
              </div>
              <div className="divide-y divide-gray-200">
                {batches.map((batch) => (
                  <div key={batch.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-[#1E40AF]" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {batch.fileName || `Lot #${batch.id.slice(0, 8)}`}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDate(batch.createdAt)}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 inline-flex items-center gap-1 text-xs font-semibold rounded-full ${getStatusColor(batch.status)}`}>
                        {getStatusIcon(batch.status)}
                        {getStatusLabel(batch.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Pensionnés</p>
                        <p className="font-semibold">{batch.totalPensioners}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Montant total</p>
                        <p className="font-semibold">{formatCurrency(batch.totalAmount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Réussis</p>
                        <p className="font-semibold text-green-600">{batch.successCount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Échoués</p>
                        <p className="font-semibold text-red-600">{batch.failedCount}</p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      {batch.status === 'completed' || batch.status === 'partial' ? (
                        <>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleDownloadReport(batch.id, 'pdf')}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Rapport
                          </Button>
                          {batch.failedCount > 0 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRetryFailed(batch.id)}
                            >
                              <RefreshCw className="w-4 h-4 mr-1" />
                              Réessayer
                            </Button>
                          )}
                        </>
                      ) : batch.status === 'pending' ? (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleProcessPayments(batch.id)}
                          disabled={isProcessing}
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Lancer les paiements
                        </Button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
