"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import Pagination from '@/app/components/ui/Pagination';
import { motion } from 'framer-motion';
import { generateExpenseListPDF, generateExpenseDetailPDF } from '@/app/utils/pdf/pdfGenerator';

// Types pour les données des dépenses
interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  paymentMethod: string;
  approvedBy: string;
  status: 'Approuvé' | 'En attente' | 'Rejeté';
}

export default function ExpensesPage() {
  // Dans une application réelle, ces données proviendraient de la base de données
  const expenses: Expense[] = [
    {
      id: '1',
      title: 'Achat de fournitures scolaires',
      amount: 250000,
      date: '2024-09-05',
      category: 'Fournitures',
      paymentMethod: 'Espèces',
      approvedBy: 'Mamadou Diallo',
      status: 'Approuvé',
    },
    {
      id: '2',
      title: 'Réparation de climatiseurs',
      amount: 150000,
      date: '2024-09-10',
      category: 'Maintenance',
      paymentMethod: 'Chèque',
      approvedBy: 'Mamadou Diallo',
      status: 'Approuvé',
    },
    {
      id: '3',
      title: 'Salaires des enseignants - Septembre',
      amount: 3500000,
      date: '2024-09-30',
      category: 'Salaires',
      paymentMethod: 'Virement bancaire',
      approvedBy: 'Mamadou Diallo',
      status: 'Approuvé',
    },
    {
      id: '4',
      title: 'Achat de nouveaux ordinateurs',
      amount: 1200000,
      date: '2024-10-05',
      category: 'Équipement',
      paymentMethod: 'Chèque',
      approvedBy: '',
      status: 'En attente',
    },
    {
      id: '5',
      title: 'Rénovation de la cantine',
      amount: 500000,
      date: '2024-10-10',
      category: 'Infrastructure',
      paymentMethod: 'Virement bancaire',
      approvedBy: '',
      status: 'Rejeté',
    },
  ];

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  // Formater le montant
  const formatAmount = (amount: number) => {
    return amount.toLocaleString('fr-FR') + ' F';
  };

  // État pour la recherche et le filtrage
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Filtrer les dépenses en fonction de la recherche et du filtre
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === '' || expense.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Obtenir les icônes et couleurs en fonction du statut
  const getStatusColor = (status: Expense['status']) => {
    switch (status) {
      case 'Approuvé':
        return {
          bg: 'bg-green-50',
          border: 'border-green-600',
          badgeBg: 'bg-green-100',
          badgeText: 'text-green-800',
          icon: (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )
        };
      case 'En attente':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-600',
          badgeBg: 'bg-yellow-100',
          badgeText: 'text-yellow-800',
          icon: (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      case 'Rejeté':
        return {
          bg: 'bg-red-50',
          border: 'border-red-600',
          badgeBg: 'bg-red-100',
          badgeText: 'text-red-800',
          icon: (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-600',
          badgeBg: 'bg-gray-100',
          badgeText: 'text-gray-800',
          icon: null
        };
    }
  };

  // Obtenir l'icône de la méthode de paiement
  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'Espèces':
        return (
          <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'Chèque':
        return (
          <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'Virement bancaire':
        return (
          <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      default:
        return (
          <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  // Gérer le clic sur une ligne
  const handleRowClick = (expense: Expense) => {
    // Redirection vers la page de détails de la dépense
    // Dans une application réelle, cela utiliserait la navigation Next.js
    console.log('Voir les détails de:', expense);
  };
  
  // Gérer l'impression d'une dépense individuelle
  const handlePrintExpense = (expense: Expense, e: React.MouseEvent) => {
    e.stopPropagation(); // Empêcher la propagation du clic à la carte parente
    generateExpenseDetailPDF(expense);
  };

  // Calculer le total des dépenses
  const totalExpenses = expenses.reduce((total, expense) => {
    if (expense.status === 'Approuvé') {
      return total + expense.amount;
    }
    return total;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">Gestion des dépenses</h1>
          <p className="text-blue-500 mt-1">Suivez et gérez toutes les dépenses de l'école</p>
        </div>
        <Link href="/dashboard/expenses/new">
          <Button
            variant="primary"
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium py-2 px-4 rounded-md shadow-md hover:shadow-lg transition-all duration-200"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            }
          >
            Ajouter une dépense
          </Button>
        </Link>
      </div>

      {/* Barre de recherche et filtres */}
      <Card variant="blue" className="overflow-hidden shadow-lg rounded-xl border border-blue-200 mb-6">
        <div className="p-4 border-b border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex flex-wrap items-center justify-between">
            <div className="w-full md:w-auto flex space-x-2 mb-4 md:mb-0">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Rechercher une dépense..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 shadow-sm focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-sm border-gray-300 rounded-md text-black bg-white"
                />
              </div>
              <Button 
                variant="light" 
                size="sm"
                className="bg-gradient-to-r from-blue-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200 text-indigo-700 font-medium py-2 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
              >
                Rechercher
              </Button>
            </div>
            <div className="w-full md:w-auto flex space-x-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
                <select
                  className="pl-10 block w-full py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm rounded-md text-black bg-white"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">Toutes les catégories</option>
                  <option value="Fournitures">Fournitures</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Salaires">Salaires</option>
                  <option value="Équipement">Équipement</option>
                  <option value="Infrastructure">Infrastructure</option>
                </select>
              </div>
              <Button 
                variant="light" 
                size="sm"
                className="bg-gradient-to-r from-blue-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200 text-indigo-700 font-medium py-2 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
                onClick={() => generateExpenseListPDF(filteredExpenses, 'Liste des dépenses')}
              >
                <svg className="h-5 w-5 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Exporter en PDF
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Résumé des dépenses */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card variant="blue" className="px-4 py-5 sm:p-6 border border-blue-200 shadow-md">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
              <div className="text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-blue-700 truncate">Total des dépenses</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900">
                    {formatAmount(totalExpenses)}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </Card>
      </div>

      {/* Cartes des dépenses */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {filteredExpenses.map((expense) => {
          const statusColor = getStatusColor(expense.status);
          
          return (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-xl shadow-md cursor-pointer"
              onClick={() => handleRowClick(expense)}
            >
              <div className="bg-gradient-to-br from-blue-50 to-white border-t-4 border-blue-600">
                {/* En-tête de la carte avec montant et statut */}
                <div className="p-5 border-b border-blue-100">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-blue-700">
                      {formatAmount(expense.amount)}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusColor.badgeBg} ${statusColor.badgeText}`}>
                      <span className="mr-1">{statusColor.icon}</span>
                      {expense.status}
                    </span>
                  </div>
                  <p className="text-sm text-blue-600 mb-2">{formatDate(expense.date)}</p>
                  <p className="text-sm font-medium text-gray-700">{expense.title}</p>
                </div>
                
                {/* Informations sur la catégorie et la méthode de paiement */}
                <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-blue-700">Catégorie</p>
                      <p className="text-sm text-gray-700">{expense.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      {getPaymentMethodIcon(expense.paymentMethod)}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-blue-700">Méthode de paiement</p>
                      <p className="text-sm text-gray-700">{expense.paymentMethod}</p>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="p-4 border-t border-blue-100 flex justify-end space-x-3">
                  <Link href={`/dashboard/expenses/${expense.id}/edit`} className="block w-full">
                    <Button
                      variant="light"
                      size="sm"
                      className="w-full bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-700 border border-blue-300 rounded-lg shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center"
                    >
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Modifier
                    </Button>
                  </Link>
                  <div className="flex space-x-2 w-full">
                    <Button
                      variant="light"
                      size="sm"
                      className="w-1/2 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 text-green-700 border border-green-300 rounded-lg shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center"
                      onClick={(e) => handlePrintExpense(expense, e)}
                    >
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      PDF
                    </Button>
                    <Button
                      variant="light"
                      size="sm"
                      className="w-1/2 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-red-600 border border-red-300 rounded-lg shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Ici, vous pourriez ajouter une confirmation avant la suppression
                        console.log(`Supprimer la dépense ${expense.id}`);
                      }}
                    >
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Supprimer
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <Pagination
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
        />
      </div>
      
      {/* Indicateur de nombre de résultats */}
      <div className="mt-2 text-center text-sm text-blue-500">
        {filteredExpenses.length} dépense{filteredExpenses.length > 1 ? 's' : ''} affichée{filteredExpenses.length > 1 ? 's' : ''}
      </div>
    </div>
  );
}
