import { useState, useEffect } from 'react';
import { Users, Banknote, Clock, CheckCircle, ArrowUpRight, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { dashboardService, DashboardStats, Transaction } from '../../services/api';

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [statsData, transactionsData, chartDataResponse] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getRecentTransactions(),
        dashboardService.getChartData()
      ]);
      setStats(statsData);
      setTransactions(transactionsData);
      setChartData(chartDataResponse);
    } catch (err) {
      console.error('Erreur lors du chargement du dashboard:', err);
      setError('Impossible de charger les données du dashboard');
      // Données de démonstration en cas d'erreur
      setStats({
        totalRetraites: 0,
        newThisMonth: 0,
        pensionsVersees: 0,
        successRate: 0,
        paiementsEnAttente: 0
      });
      setTransactions([]);
      setChartData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'completed': 'bg-green-100 text-[#059669]',
      'reussi': 'bg-green-100 text-[#059669]',
      'processing': 'bg-orange-100 text-[#F59E0B]',
      'en_cours': 'bg-orange-100 text-[#F59E0B]',
      'failed': 'bg-red-100 text-[#DC2626]',
      'echoue': 'bg-red-100 text-[#DC2626]',
      'pending': 'bg-gray-100 text-gray-600'
    };
    return styles[status] || 'bg-gray-100 text-gray-600';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      'completed': 'Réussi',
      'reussi': 'Réussi',
      'processing': 'En cours',
      'en_cours': 'En cours',
      'failed': 'Échoué',
      'echoue': 'Échoué',
      'pending': 'En attente'
    };
    return labels[status] || status;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="w-8 h-8 animate-spin text-[#1E40AF]" />
      </div>
    );
  }

  const statsCards = [
    {
      title: 'Total Retraités',
      value: stats?.totalRetraites?.toLocaleString() || '0',
      subtitle: `+${stats?.newThisMonth || 0} ce mois`,
      icon: Users,
      color: 'bg-blue-100 text-[#1E40AF]',
      trend: stats?.newThisMonth ? `+${((stats.newThisMonth / (stats.totalRetraites || 1)) * 100).toFixed(1)}%` : undefined
    },
    {
      title: 'Pensions Versées Ce Mois',
      value: `${(stats?.pensionsVersees || 0).toLocaleString()} FCFA`,
      subtitle: `${stats?.successRate || 0}% de réussite`,
      icon: Banknote,
      color: 'bg-green-100 text-[#059669]',
      progress: stats?.successRate || 0
    },
    {
      title: 'Paiements En Attente',
      value: (stats?.paiementsEnAttente || 0).toString(),
      subtitle: 'À traiter',
      icon: Clock,
      color: 'bg-orange-100 text-[#F59E0B]'
    },
    {
      title: 'Taux de Réussite',
      value: `${stats?.successRate || 0}%`,
      subtitle: 'Ce mois',
      icon: CheckCircle,
      color: 'bg-green-100 text-[#059669]'
    }
  ];

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800">
          {error} - Affichage des données de démonstration
          <button
            onClick={fetchDashboardData}
            className="ml-4 text-yellow-600 hover:text-yellow-800 underline"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md-custom hover:shadow-lg-custom transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                {stat.trend && (
                  <div className="flex items-center gap-1 text-[#059669] text-sm">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>{stat.trend}</span>
                  </div>
                )}
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                <h3 className="mb-2">{stat.value}</h3>
                <p className="text-small text-gray-500">{stat.subtitle}</p>
                {stat.progress !== undefined && (
                  <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#059669] transition-all"
                      style={{ width: `${stat.progress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Evolution Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-md-custom">
          <h3 className="mb-4">Évolution des Paiements (6 derniers mois)</h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="mois" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
                  formatter={(value) => `${value}M FCFA`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="banque"
                  stroke="#1E40AF"
                  strokeWidth={2}
                  name="Banque"
                  dot={{ fill: '#1E40AF', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="mobileMoney"
                  stroke="#FF6B00"
                  strokeWidth={2}
                  name="Mobile Money"
                  dot={{ fill: '#FF6B00', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              Aucune donnée disponible
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-md-custom overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3>Dernières Transactions</h3>
            <a href="/historique" className="text-[#1E40AF] hover:underline text-sm">
              Voir tout
            </a>
          </div>
          <div className="overflow-y-auto max-h-[300px]">
            {transactions.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {transactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-white text-xs">
                          {transaction.retraiteName?.charAt(0) || 'P'}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{transaction.retraiteName}</p>
                          <p className="text-xs text-gray-500">{transaction.dateHeure}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{transaction.montant?.toLocaleString()} FCFA</p>
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs ${getStatusBadge(transaction.statut)}`}>
                          {getStatusLabel(transaction.statut)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                Aucune transaction récente
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
