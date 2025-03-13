"use client";

import React, { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import { UserRole } from '../types';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Dans une application réelle, ce rôle serait récupéré depuis la session utilisateur
  // Pour l'instant, nous utilisons un rôle fixe pour le développement
  const userRole = UserRole.ADMIN;
  
  return (
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 transition-all duration-300">
      {/* Sidebar pour mobile */}
      <div 
        className={`fixed inset-0 flex z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} 
        role="dialog" 
        aria-modal="true"
      >
        <div 
          className="fixed inset-0 bg-indigo-900 bg-opacity-50 backdrop-blur-sm transition-all duration-300 ease-in-out" 
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        ></div>
        
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Fermer le menu</span>
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 h-0 overflow-y-auto">
            <Sidebar userRole={userRole} />
          </div>
        </div>
        
        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </div>
      
      {/* Sidebar pour desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <Sidebar userRole={userRole} />
        </div>
      </div>
      
      {/* Contenu principal */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Header onMenuToggle={() => setSidebarOpen(true)} />
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 animate-fadeIn">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-indigo-100/50 transition-all duration-300 hover:shadow-xl">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
