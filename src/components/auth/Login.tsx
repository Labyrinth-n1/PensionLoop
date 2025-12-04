import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Smartphone,
  ArrowRightLeft,
} from "lucide-react";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-2xl flex items-center justify-center mb-4">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-[#1E40AF] text-center mb-2">
              GouvPensionloop
            </h1>
            <p className="text-gray-600 text-center">
              Système de gestion des pensions
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl p-8 shadow-lg-custom">
            <h2 className="mb-6">Connexion</h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="w-5 h-5" />}
                  required
                />
              </div>

              <div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    icon={<Lock className="w-5 h-5" />}
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#1E40AF]"
                  />
                  <span className="text-sm text-gray-600">
                    Se souvenir de moi
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm text-[#1E40AF] hover:underline"
                >
                  Mot de passe oublié ?
                </a>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                loading={loading}
              >
                Se connecter
              </Button>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 mt-6 text-sm">
            🔒 Système sécurisé du Gouvernement du Bénin
          </p>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="flex-1 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex flex-col items-center justify-center p-12 text-white">
        <div className="max-w-md text-center space-y-8">
          <div>
            <h2 className="text-white mb-4">
              Paiement des Pensions de Retraite
            </h2>
            <p className="text-blue-100 text-large">
              Système moderne et sécurisé pour la gestion et le
              versement des pensions de retraite
            </p>
          </div>

          {/* Icons Grid */}
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                <Shield className="w-8 h-8" />
              </div>
              <span className="text-sm">Sécurisé</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                <ArrowRightLeft className="w-8 h-8" />
              </div>
              <span className="text-sm">Rapide</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                <Smartphone className="w-8 h-8" />
              </div>
              <span className="text-sm">Mobile Money</span>
            </div>
          </div>

          <div className="mt-12 p-6 bg-white/10 rounded-xl backdrop-blur">
            <p className="text-sm text-blue-100">
              "Un système fiable qui garantit le paiement
              ponctuel des pensions à tous nos retraités à
              travers le Bénin"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}