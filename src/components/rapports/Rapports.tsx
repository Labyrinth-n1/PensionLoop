import React, { useState, useEffect, useCallback } from 'react';
import { TrendingUp, DollarSign, Users, FileText, Download, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '../shared/Button';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { paymentService, dashboardService } from '../../services/api';

export function Rapports() {
  const [period, setPeriod] = useState('month');
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour télécharger un rapport
  const handleDownloadReport = async (format: 'pdf' | 'excel' | 'csv') => {
    setIsDownloading(true);
    try {
      const blob = await paymentService.downloadReport({
        format,
        period,
        includeDetails: true
      });

      // Créer un lien de téléchargement
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rapport-pensions-${period}-${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Erreur téléchargement rapport:', err);
      setError('Impossible de télécharger le rapport. Le backend n\'est pas disponible.');
    } finally {
      setIsDownloading(false);
    }
  };

  const evolutionData = [
    { mois: 'Jan', total: 820, transactions: 2400 },
    { mois: 'Fév', total: 850, transactions: 2420 },
    { mois: 'Mar', total: 870, transactions: 2440 },
    { mois: 'Avr', total: 890, transactions: 2450 },
    { mois: 'Mai', total: 920, transactions: 2455 },
    { mois: 'Juin', total: 950, transactions: 2456 },
    { mois: 'Juil', total: 830, transactions: 2456 },
    { mois: 'Août', total: 900, transactions: 2456 },
    { mois: 'Sep', total: 970, transactions: 2456 },
    { mois: 'Oct', total: 970, transactions: 2456 },
    { mois: 'Nov', total: 996, transactions: 2456 },
    { mois: 'Déc', total: 1130, transactions: 2456 }
  ];

  const repartitionData = [
    { name: 'Compte Bancaire', value: 45, color: '#1E40AF' },
    { name: 'MTN Mobile Money', value: 30, color: '#FF6B00' },
    { name: 'Moov Money', value: 15, color: '#0EA5E9' },
    { name: 'Flooz', value: 10, color: '#00B050' }
  ];

  const tauxReussiteData = [
    { operateur: 'BOA', taux: 99.5 },
    { operateur: 'Ecobank', taux: 99.2 },
    { operateur: 'MTN', taux: 98.5 },
    { operateur: 'Moov', taux: 97.8 },
    { operateur: 'Flooz', taux: 96.5 }
  ];

  const topMontantsData = [
    { nom: 'Ibrahim SOULE', montant: 55000 },
    { nom: 'Fatou DIALLO', montant: 52000 },
    { nom: 'Pierre ASSOGBA', montant: 48000 },
    { nom: 'Abdoul SANI', montant: 47000 },
    { nom: 'Mamadou KONE', montant: 45000 },
    { nom: 'Mariama SISSOKO', montant: 43000 },
    { nom: 'Marie HOUNGBO', montant: 42000 },
    { nom: 'Aissatou BARRY', montant: 41000 },
    { nom: 'Aminata TRAORE', montant: 39000 },
    { nom: 'Jean AGBODJAN', montant: 38000 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Rapports & Analytics</h2>
          <p className="text-gray-600 mt-1">Analyses détaillées des paiements et transactions</p>
        </div>
        <div className="flex gap-2">
          {['week', 'month', 'quarter', 'year'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                period === p 
                  ? 'bg-[#1E40AF] text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {p === 'week' && 'Cette Semaine'}
              {p === 'month' && 'Ce Mois'}
              {p === 'quarter' && 'Ce Trimestre'}
              {p === 'year' && 'Cette Année'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-md-custom">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[#1E40AF]" />
            </div>
            <div className="flex items-center gap-1 text-[#059669] text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+12%</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Versé</p>
          <p className="text-2xl mb-1">2.5B FCFA</p>
          {/* Mini sparkline */}
          <div className="h-8 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={evolutionData.slice(-6)}>
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#1E40AF" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md-custom">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-[#059669]" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Transactions</p>
          <p className="text-2xl mb-1">12,345</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#059669]" style={{ width: '98.5%' }}></div>
            </div>
            <span className="text-sm text-gray-600">98.5%</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md-custom">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Bénéficiaires</p>
          <p className="text-2xl mb-1">2,456</p>
          <div className="mt-2 space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Actifs</span>
              <span className="text-[#059669]">2,400</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Inactifs</span>
              <span className="text-gray-500">56</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md-custom">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[#F59E0B]" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Frais Totaux</p>
          <p className="text-2xl mb-1">38M FCFA</p>
          <p className="text-sm text-gray-600 mt-2">
            Moyenne: 3,080 FCFA/transaction
          </p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Evolution Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-md-custom">
          <h3 className="mb-4">Évolution des Montants (12 derniers mois)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={evolutionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="mois" stroke="#6B7280" />
              <YAxis yAxisId="left" stroke="#1E40AF" />
              <YAxis yAxisId="right" orientation="right" stroke="#059669" />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
              />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="total" 
                stroke="#1E40AF" 
                strokeWidth={3}
                name="Total versé (M FCFA)"
                dot={{ fill: '#1E40AF', r: 4 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="transactions" 
                stroke="#059669" 
                strokeWidth={3}
                name="Nombre de transactions"
                dot={{ fill: '#059669', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-lg p-6 shadow-md-custom">
          <h3 className="mb-4">Répartition par Type de Paiement</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={repartitionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {repartitionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {repartitionData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 10 Bar Chart */}
        <div className="bg-white rounded-lg p-6 shadow-md-custom">
          <h3 className="mb-4">Top 10 Plus Gros Montants</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={topMontantsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" stroke="#6B7280" />
              <YAxis dataKey="nom" type="category" width={120} stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
                formatter={(value) => `${value} FCFA`}
              />
              <Bar dataKey="montant" fill="#1E40AF" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Success Rate Chart */}
        <div className="bg-white rounded-lg p-6 shadow-md-custom">
          <h3 className="mb-4">Taux de Réussite par Opérateur</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={tauxReussiteData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="operateur" stroke="#6B7280" />
              <YAxis domain={[95, 100]} stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
                formatter={(value) => `${value}%`}
              />
              <Bar dataKey="taux" fill="#059669" radius={[4, 4, 0, 0]}>
                {tauxReussiteData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.taux >= 99 ? '#059669' : entry.taux >= 98 ? '#F59E0B' : '#DC2626'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Report Table */}
      <div className="bg-white rounded-lg shadow-md-custom overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3>Rapport Détaillé Mensuel</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">Période</th>
                <th className="px-6 py-3 text-left text-gray-600">Transactions</th>
                <th className="px-6 py-3 text-left text-gray-600">Montant</th>
                <th className="px-6 py-3 text-left text-gray-600">Success Rate</th>
                <th className="px-6 py-3 text-left text-gray-600">Frais</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {evolutionData.slice(-6).reverse().map((data, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{data.mois} 2024</td>
                  <td className="px-6 py-4">{data.transactions.toLocaleString()}</td>
                  <td className="px-6 py-4">{data.total}M FCFA</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 rounded-full text-sm bg-green-100 text-[#059669]">
                      98.5%
                    </span>
                  </td>
                  <td className="px-6 py-4">{Math.round(data.total * 1000000 * 0.015 / 1000000)}M FCFA</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-orange-400 mr-3" />
            <div>
              <p className="text-sm font-medium text-orange-800">Attention</p>
              <p className="text-sm text-orange-700">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-orange-500 hover:text-orange-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Export Section */}
      <div className="bg-white rounded-lg p-6 shadow-md-custom">
        <h3 className="mb-4">Générer et Exporter les Rapports</h3>
        <p className="text-gray-600 mb-4">
          Téléchargez les rapports et données analytiques dans le format de votre choix.
          Les rapports sont générés à partir des données du backend.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            onClick={() => handleDownloadReport('pdf')}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            Rapport Complet PDF
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleDownloadReport('excel')}
            disabled={isDownloading}
          >
            <Download className="w-4 h-4" />
            Données Brutes Excel
          </Button>
          <Button
            variant="outline"
            onClick={() => handleDownloadReport('csv')}
            disabled={isDownloading}
          >
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Note: Les rapports sont générés en temps réel à partir des données du serveur.
        </p>
      </div>
    </div>
  );
}
