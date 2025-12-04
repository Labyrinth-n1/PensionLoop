import React from 'react';
import { Users, Banknote, Clock, CheckCircle, TrendingUp, ArrowUpRight, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { chartData, mockTransactions } from '../../data/mockData';

export function Dashboard() {
  const stats = [
    {
      title: 'Total Retraités',
      value: '2,456',
      subtitle: '+124 ce mois',
      icon: Users,
      color: 'bg-blue-100 text-[#1E40AF]',
      trend: '+5.3%'
    },
    {
      title: 'Pensions Versées Ce Mois',
      value: '1,234,567,890 FCFA',
      subtitle: '98.5% de réussite',
      icon: Banknote,
      color: 'bg-green-100 text-[#059669]',
      progress: 98.5
    },
    {
      title: 'Paiements En Attente',
      value: '45',
      subtitle: 'À traiter aujourd\'hui',
      icon: Clock,
      color: 'bg-orange-100 text-[#F59E0B]'
    },
    {
      title: 'Taux de Réussite',
      value: '98.5%',
      subtitle: 'Ce mois',
      icon: CheckCircle,
      color: 'bg-green-100 text-[#059669]'
    }
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      'Réussi': 'bg-green-100 text-[#059669]',
      'En cours': 'bg-orange-100 text-[#F59E0B]',
      'Échoué': 'bg-red-100 text-[#DC2626]'
    };
    return styles[status as keyof typeof styles] || '';
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
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
                {stat.progress && (
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
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.evolution}>
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
        </div>

        {/* Next Payment Card */}
        <div className="bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-lg p-6 shadow-md-custom text-white">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-6 h-6" />
            <h3 className="text-white">Prochains Paiements Automatiques</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-blue-100 text-sm mb-2">Date prévue</p>
              <p className="text-xl">5 janvier 2025 à 9h00</p>
            </div>
            <div className="pt-4 border-t border-blue-300">
              <div className="flex justify-between mb-1">
                <span className="text-blue-100">Bénéficiaires</span>
                <span>2,456 retraités</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-100">Montant total</span>
                <span>850M FCFA</span>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between">
              <span className="text-sm">Paiement automatique</span>
              <button className="bg-white/20 backdrop-blur px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                Activé
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-md-custom overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3>Dernières Transactions</h3>
          <a href="/historique" className="text-[#1E40AF] hover:underline text-sm">
            Voir tout
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">Date</th>
                <th className="px-6 py-3 text-left text-gray-600">Retraité</th>
                <th className="px-6 py-3 text-left text-gray-600">Montant</th>
                <th className="px-6 py-3 text-left text-gray-600">Type</th>
                <th className="px-6 py-3 text-left text-gray-600">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm">{transaction.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${transaction.retaiteName}`}
                        alt={transaction.retaiteName}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{transaction.retaiteName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {transaction.montant.toLocaleString()} FCFA
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 rounded-full text-sm bg-blue-100 text-[#1E40AF]">
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm ${getStatusBadge(transaction.statut)}`}>
                      {transaction.statut}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
