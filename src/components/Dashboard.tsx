import React from 'react';
import { Users, DollarSign, Clock, CheckCircle, TrendingUp, ArrowRight, Calendar } from 'lucide-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { dashboardStats, chartData, sampleTransactions } from '../data/sampleData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const recentTransactions = sampleTransactions.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-6">
        {/* Card 1: Total Retraités */}
        <Card hover>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[#4B5563] mb-2">Total Retraités</p>
              <h1 className="text-[#111827] mb-2">{dashboardStats.totalRetraites.toLocaleString()}</h1>
              <div className="flex items-center gap-2 text-[#059669]">
                <TrendingUp className="w-4 h-4" />
                <span className="body-small">+{dashboardStats.newThisMonth} ce mois</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#DBEAFE] flex items-center justify-center">
              <Users className="w-6 h-6 text-[#1E40AF]" />
            </div>
          </div>
        </Card>

        {/* Card 2: Pensions Versées */}
        <Card hover>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[#4B5563] mb-2">Pensions Versées Ce Mois</p>
              <h2 className="text-[#111827] mb-2">{dashboardStats.pensionsVersees.toLocaleString()} FCFA</h2>
              <div className="flex items-center gap-2 text-[#059669]">
                <span className="body-small">{dashboardStats.successRate}% de réussite</span>
              </div>
              <div className="mt-2 h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                <div className="h-full bg-[#059669] rounded-full" style={{ width: `${dashboardStats.successRate}%` }}></div>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#D1FAE5] flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[#059669]" />
            </div>
          </div>
        </Card>

        {/* Card 3: Paiements En Attente */}
        <Card hover>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[#4B5563] mb-2">Paiements En Attente</p>
              <h1 className="text-[#111827] mb-2">{dashboardStats.paiementsEnAttente}</h1>
              <span className="body-small text-[#F59E0B]">À traiter aujourd'hui</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#FEF3C7] flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#F59E0B]" />
            </div>
          </div>
        </Card>

        {/* Card 4: Taux de Réussite */}
        <Card hover>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[#4B5563] mb-2">Taux de Réussite</p>
              <h1 className="text-[#111827] mb-2">{dashboardStats.successRate}%</h1>
              <div className="mt-2">
                <svg className="w-full h-8" viewBox="0 0 100 30">
                  <polyline
                    fill="none"
                    stroke="#059669"
                    strokeWidth="2"
                    points="0,25 20,22 40,18 60,15 80,12 100,10"
                  />
                </svg>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#D1FAE5] flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-[#059669]" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Chart - 2 columns */}
        <Card className="col-span-2">
          <div className="mb-6">
            <h3 className="text-[#111827] mb-1">Évolution des Paiements</h3>
            <p className="text-[#4B5563] body-small">6 derniers mois</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="banque" stroke="#1E40AF" strokeWidth={2} name="Banque (M FCFA)" />
              <Line type="monotone" dataKey="mobile" stroke="#FF6B00" strokeWidth={2} name="Mobile Money (M FCFA)" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Next Auto Payment Card */}
        <Card className="bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] text-white">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="mb-1">Prochains Paiements Automatiques</h3>
              <p className="body-small opacity-90">5 janvier 2025 à 9h00</p>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="body-small opacity-90">Bénéficiaires</span>
              <span className="font-semibold">2,456 retraités</span>
            </div>
            <div className="flex justify-between">
              <span className="body-small opacity-90">Montant estimé</span>
              <span className="font-semibold">850M FCFA</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-white/20">
            <span>Statut</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-white/30 rounded-full peer peer-checked:bg-[#059669] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[#111827]">Dernières Transactions</h3>
          <Button variant="text" onClick={() => onNavigate('historique')}>
            Voir tout <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="text-left py-3 px-4 text-[#4B5563] font-medium body-small">Date</th>
                <th className="text-left py-3 px-4 text-[#4B5563] font-medium body-small">Retraité</th>
                <th className="text-left py-3 px-4 text-[#4B5563] font-medium body-small">Montant</th>
                <th className="text-left py-3 px-4 text-[#4B5563] font-medium body-small">Type</th>
                <th className="text-left py-3 px-4 text-[#4B5563] font-medium body-small">Statut</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-3 px-4">{transaction.dateHeure}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-white body-small">
                        {transaction.retraiteName.charAt(0)}
                      </div>
                      <span>{transaction.retraiteName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold">{transaction.montant.toLocaleString()} FCFA</td>
                  <td className="py-3 px-4">
                    <Badge variant={transaction.type === 'banque' ? 'blue' : 'orange'}>
                      {transaction.type === 'banque' ? '🏦 Banque' : '📱 Mobile Money'}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={transaction.statut === 'reussi' ? 'success' : transaction.statut === 'echoue' ? 'error' : 'warning'}>
                      {transaction.statut === 'reussi' ? '✅ Réussi' : transaction.statut === 'echoue' ? '❌ Échoué' : '⏳ En cours'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
