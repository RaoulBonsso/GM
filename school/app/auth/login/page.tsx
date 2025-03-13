import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import LoginForm from '@/app/components/forms/LoginForm';
import Card from '@/app/components/ui/Card';

export default function LoginPage() {
  // Cette fonction sera implémentée plus tard avec l'API route
  const handleLogin = async (data: { email: string; password: string }) => {
    'use server';
    
    // Simulation d'une attente pour montrer le loader
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Vérification des identifiants de test
    if (data.email === 'admin@ecole.fr' && data.password === 'admin123') {
      // Admin login success
      console.log('Admin connecté');
      return redirect('/dashboard');
    } else if (data.email === 'secretaire@ecole.fr' && data.password === 'secret123') {
      // Secretary login success
      console.log('Secrétaire connecté');
      return redirect('/dashboard');
    } else if (data.email === 'dev@ecole.fr' && data.password === 'dev123') {
      // Developer login success
      console.log('Développeur connecté');
      return redirect('/dashboard');
    } else {
      // Login failed
      throw new Error('Identifiants incorrects. Utilisez les identifiants fournis.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 backdrop-blur-sm bg-white/70 p-8 rounded-2xl shadow-2xl border border-white/50">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-black">
            Gestion Scolaire
          </h1>
          <p className="mt-2 text-sm text-black font-medium">
            Connectez-vous à votre compte
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 backdrop-filter backdrop-blur-sm bg-opacity-80 transition-all duration-300 hover:shadow-xl">
          <LoginForm onSubmit={handleLogin} />
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-black">
                  Vous n'avez pas de compte?
                </span>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-center text-sm text-black">
                Contactez l'administrateur pour créer un compte.
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100/50 shadow-inner">
            <h3 className="text-sm font-medium text-black mb-2">Identifiants de connexion</h3>
            <div className="text-xs text-black space-y-2 text-left">
              <p className="p-2 bg-white rounded-lg border border-blue-200 shadow-sm text-black"><strong>Administrateur:</strong> admin@ecole.fr / admin123</p>
              <p className="p-2 bg-white rounded-lg border border-blue-200 shadow-sm text-black"><strong>Secrétaire:</strong> secretaire@ecole.fr / secret123</p>
              <p className="p-2 bg-white rounded-lg border border-blue-200 shadow-sm text-black"><strong>Développeur:</strong> dev@ecole.fr / dev123</p>
            </div>
          </div>
          <p className="text-xs text-black mt-4">
            &copy; {new Date().getFullYear()} Gestion Scolaire. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}
