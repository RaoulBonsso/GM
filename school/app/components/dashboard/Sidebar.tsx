"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserRole } from '@/app/types';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

interface SidebarProps {
  userRole: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const pathname = usePathname();

  // Navigation items with role-based access
  const navigation: NavItem[] = [
    {
      name: 'Tableau de bord',
      href: '/dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
      roles: [UserRole.ADMIN, UserRole.SECRETARY, UserRole.DEVELOPER],
    },
    {
      name: 'Élèves',
      href: '/dashboard/students',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      ),
      roles: [UserRole.ADMIN, UserRole.SECRETARY, UserRole.DEVELOPER],
    },
    {
      name: 'Classes',
      href: '/dashboard/classes',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
      ),
      roles: [UserRole.ADMIN, UserRole.SECRETARY, UserRole.DEVELOPER],
    },
    {
      name: 'Enseignants',
      href: '/dashboard/teachers',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      ),
      roles: [UserRole.ADMIN, UserRole.SECRETARY, UserRole.DEVELOPER],
    },
    {
      name: 'Paiements',
      href: '/dashboard/payments',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ),
      roles: [UserRole.ADMIN, UserRole.SECRETARY, UserRole.DEVELOPER],
    },
    {
      name: 'Dépenses',
      href: '/dashboard/expenses',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      ),
      roles: [UserRole.ADMIN, UserRole.DEVELOPER],
    },
    {
      name: 'Présences',
      href: '/dashboard/attendance',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ),
      roles: [UserRole.ADMIN, UserRole.SECRETARY, UserRole.DEVELOPER],
    },
    {
      name: 'Statistiques',
      href: '/dashboard/statistics',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      ),
      roles: [UserRole.ADMIN, UserRole.DEVELOPER],
    },
    {
      name: 'Utilisateurs',
      href: '/dashboard/users',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      ),
      roles: [UserRole.ADMIN, UserRole.DEVELOPER],
    },
    {
      name: 'Paramètres',
      href: '/dashboard/settings',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      ),
      roles: [UserRole.ADMIN, UserRole.DEVELOPER],
    },
  ];

  // Filtrer les éléments de navigation en fonction du rôle de l'utilisateur
  const filteredNavigation = navigation.filter(item => item.roles.includes(userRole));

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-indigo-900 to-blue-800 border-r border-indigo-700 shadow-lg transition-all duration-300">
      <div className="flex items-center justify-center h-20 border-b border-indigo-700/50">
        <h1 className="text-2xl font-bold text-white tracking-wide animate-pulse">Gestion Scolaire</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="mt-5 px-3 space-y-2">
          {filteredNavigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 transform ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md translate-x-1'
                    : 'text-indigo-100 hover:bg-indigo-700/50 hover:text-white hover:translate-x-1'
                }`}
              >
                <div className={`mr-3 ${isActive ? 'text-white' : 'text-indigo-300 group-hover:text-white'} transition-colors duration-200`}>
                  {item.icon}
                </div>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-indigo-700/50 bg-indigo-800/50 backdrop-blur-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-inner border border-indigo-400/30 transition-all duration-300 hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Utilisateur</p>
            <p className="text-xs text-indigo-200">{userRole}</p>
          </div>
        </div>
        <div className="mt-3">
          <Link
            href="/auth/logout"
            className="flex items-center px-3 py-2 mt-2 text-sm font-medium rounded-lg text-white bg-red-500/70 hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1h-3a1 1 0 110-2h3a3 3 0 013 3v12a3 3 0 01-3 3H3a3 3 0 01-3-3V4a3 3 0 013-3h3a1 1 0 010 2H3zm10.293 4.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L14.586 11H7a1 1 0 110-2h7.586l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Déconnexion
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
