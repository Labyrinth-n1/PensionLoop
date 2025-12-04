import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-[#1E40AF] mb-2">GouvPensionloop</h1>
            <h2 className="text-[#111827]">Connexion</h2>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-5 h-5" />}
              required
            />

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-5 h-5" />}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4B5563] hover:text-[#111827]"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 text-[#1E40AF] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#1E40AF]/20"
                />
                <span className="body-small text-[#4B5563]">Se souvenir de moi</span>
              </label>
              <a href="#" className="body-small text-[#1E40AF] hover:text-[#1E3A8A]">
                Mot de passe oublié?
              </a>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
              Se connecter
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="body-small text-[#4B5563]">
              Système sécurisé du Gouvernement du Bénin
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="w-1/2 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center p-12">
        <div className="text-center text-white">
          <div className="flex justify-center gap-8 mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 transform hover:scale-105 transition-transform">
              <Shield className="w-16 h-16 mb-4 mx-auto" />
              <p className="font-semibold">Sécurisé</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 transform hover:scale-105 transition-transform">
              <svg className="w-16 h-16 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-semibold">Paiements</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 transform hover:scale-105 transition-transform">
              <svg className="w-16 h-16 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <p className="font-semibold">Mobile</p>
            </div>
          </div>
          <h2 className="mb-4">Gestion Moderne des Pensions</h2>
          <p className="body-large opacity-90">
            Système intégré de paiement des pensions de retraite
            <br />
            avec suivi en temps réel et rapports automatisés
          </p>
        </div>
      </div>
    </div>
  );
}
