"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Button from '../ui/Button';

interface HeaderProps {
  title?: string;
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuToggle }) => {
  const pathname = usePathname();
  
  // Déterminer le titre en fonction du chemin si aucun titre n'est fourni
  const getTitle = () => {
    if (title) return title;
    
    // Extraire le dernier segment du chemin
    const segments = pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    
    // Mapper les segments aux titres
    const titles: { [key: string]: string } = {
      'dashboard': 'Tableau de bord',
      'students': 'Gestion des élèves',
      'classes': 'Gestion des classes',
      'teachers': 'Gestion des enseignants',
      'payments': 'Gestion des paiements',
      'expenses': 'Gestion des dépenses',
      'attendance': 'Suivi des présences',
      'statistics': 'Statistiques',
      'users': 'Gestion des utilisateurs',
      'settings': 'Paramètres',
    };
    
    return titles[lastSegment] || 'Tableau de bord';
  };
  
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-md z-10 rounded-b-lg transition-all duration-300 hover:shadow-lg">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center lg:hidden">
              <button
                type="button"
                className="p-2 rounded-md text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
                onClick={onMenuToggle}
              >
                <span className="sr-only">Ouvrir le menu</span>
                <svg
                  className="h-6 w-6"
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent transition-all duration-300 hover:from-blue-500 hover:to-indigo-600">{getTitle()}</h1>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Button
                variant="primary"
                size="sm"
                className="ml-4 bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                }
              >
                Aide
              </Button>
            </div>
            <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
              {/* Icône de notification */}
              <button
                type="button"
                className="p-1 rounded-full text-indigo-500 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-110 relative"
              >
                <span className="sr-only">Voir les notifications</span>
                <div className="relative">
                  <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 animate-ping"></span>
                  <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
                  <svg
                    className="h-6 w-6"
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
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
