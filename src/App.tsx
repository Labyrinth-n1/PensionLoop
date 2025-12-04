import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/auth/Login';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { RetraitesList } from './components/Retraites/RetraitesList';
import { Paiements } from './components/paiements/Paiements';
import { Historique } from './components/historique/Historique';
import { Parametres } from './components/parametres/Parametres';
import { Profil } from './components/profil/Profil';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Sidebar />
      <div className="ml-60">
        <Header />
        <main className="pt-16 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login />} />
        
        {/* Protected Routes with Layout */}
        <Route path="/dashboard" element={
          <AppLayout>
            <Dashboard />
          </AppLayout>
        } />
        
        <Route path="/retraites" element={
          <AppLayout>
            <RetraitesList />
          </AppLayout>
        } />
        
        <Route path="/paiements" element={
          <AppLayout>
            <Paiements />
          </AppLayout>
        } />
        
        <Route path="/historique" element={
          <AppLayout>
            <Historique />
          </AppLayout>
        } />
        
        <Route path="/parametres" element={
          <AppLayout>
            <Parametres />
          </AppLayout>
        } />
        
        <Route path="/profil" element={
          <AppLayout>
            <Profil />
          </AppLayout>
        } />
        
        {/* Redirect any unknown routes to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
