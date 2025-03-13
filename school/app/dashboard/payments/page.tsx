"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import Pagination from '@/app/components/ui/Pagination';

// Types pour les données des paiements
interface Payment {
  id: string;
  student: {
    id: string;
    name: string;
    class: string;
  };
  amount: number;
  date: string;
  description: string;
  status: 'Payé' | 'En attente' | 'Annulé';
  paymentMethod: string;
}



export default function PaymentsPage() {
  // États pour la recherche et le filtrage
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Dans une application réelle, ces données proviendraient de la base de données
  const payments: Payment[] = [
    {
      id: '1',
      student: { id: '1', name: 'Amadou Diallo', class: 'CM2' },
      amount: 75000,
      date: '2024-09-01',
      description: 'Frais de scolarité - 1er trimestre',
      status: 'Payé',
      paymentMethod: 'Espèces',
    },
    {
      id: '2',
      student: { id: '2', name: 'Fatou Sow', class: 'CE1' },
      amount: 75000,
      date: '2024-09-05',
      description: 'Frais de scolarité - 1er trimestre',
      status: 'Payé',
      paymentMethod: 'Virement bancaire',
    },
    {
      id: '3',
      student: { id: '3', name: 'Mamadou Bah', class: 'CM1' },
      amount: 75000,
      date: '2024-09-10',
      description: 'Frais de scolarité - 1er trimestre',
      status: 'Payé',
      paymentMethod: 'Mobile Money',
    },
    {
      id: '4',
      student: { id: '4', name: 'Aissatou Barry', class: 'CE2' },
      amount: 75000,
      date: '2024-09-15',
      description: 'Frais de scolarité - 1er trimestre',
      status: 'En attente',
      paymentMethod: 'Chèque',
    },
    {
      id: '5',
      student: { id: '5', name: 'Ousmane Camara', class: 'CP' },
      amount: 75000,
      date: '2024-09-20',
      description: 'Frais de scolarité - 1er trimestre',
      status: 'Annulé',
      paymentMethod: 'Espèces',
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

    // Animations pour les cartes
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Fonction pour obtenir la couleur de statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Payé':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          badgeBg: 'bg-blue-600',
          badgeText: 'text-white',
          icon: (
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )
        };
      case 'En attente':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-200',
          badgeBg: 'bg-yellow-500',
          badgeText: 'text-white',
          icon: (
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      case 'Annulé':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-200',
          badgeBg: 'bg-red-500',
          badgeText: 'text-white',
          icon: (
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          badgeBg: 'bg-gray-500',
          badgeText: 'text-white',
          icon: null
        };
    }
  };

  // Fonction pour obtenir l'icône de méthode de paiement
  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'Espèces':
        return (
          <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
          </svg>
        );
      case 'Mobile Money':
        return (
          <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  // Gérer le clic sur une carte de paiement
  const handlePaymentClick = (payment: Payment) => {
    // Redirection vers la page de détails du paiement
    console.log('Voir les détails de:', payment);
    // Dans une application réelle, cela utiliserait la navigation Next.js
    // router.push(`/dashboard/payments/${payment.id}`);
  };

  // Filtrer les paiements en fonction des termes de recherche et du filtre de statut
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = searchTerm === '' || 
      payment.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">Gestion des paiements</h1>
          <p className="text-blue-500 mt-1">Suivez et gérez tous les paiements des élèves</p>
        </div>
        <Link href="/dashboard/payments/new">
          <Button
            variant="primary"
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium py-2 px-4 rounded-md shadow-md hover:shadow-lg transition-all duration-200"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            }
          >
            Ajouter un paiement
          </Button>
        </Link>
      </div>

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
                  placeholder="Rechercher un paiement..."
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
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">Tous les statuts</option>
                  <option value="Payé">Payé</option>
                  <option value="En attente">En attente</option>
                  <option value="Annulé">Annulé</option>
                </select>
              </div>
              <Button 
                variant="light" 
                size="sm"
                className="bg-gradient-to-r from-blue-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200 text-indigo-700 font-medium py-2 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
              >
                <svg className="h-5 w-5 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Exporter
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredPayments.map((payment) => {
          const statusColor = getStatusColor(payment.status);
          return (
            <motion.div 
              key={payment.id} 
              variants={itemVariants}
              whileHover="hover"
              className="overflow-hidden rounded-xl shadow-md cursor-pointer"
              onClick={() => handlePaymentClick(payment)}
            >
              <div className="bg-gradient-to-br from-blue-50 to-white border-t-4 border-blue-600">
                {/* En-tête de la carte avec montant et statut */}
                <div className="p-5 border-b border-blue-100">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-blue-700">
                      {formatAmount(payment.amount)}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusColor.badgeBg} ${statusColor.badgeText}`}>
                      <span className="mr-1">{statusColor.icon}</span>
                      {payment.status}
                    </span>
                  </div>
                  <p className="text-sm text-blue-600 mb-2">{formatDate(payment.date)}</p>
                  <p className="text-sm font-medium text-gray-700">{payment.description}</p>
                </div>
                
                {/* Informations sur l'élève et la méthode de paiement */}
                <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-blue-700">Élève</p>
                      <p className="text-sm text-gray-700">{payment.student.name}</p>
                    </div>
                    <div className="ml-auto bg-blue-100 px-2 py-1 rounded text-xs font-medium text-blue-700">
                      {payment.student.class}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      {getPaymentMethodIcon(payment.paymentMethod)}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-blue-700">Méthode de paiement</p>
                      <p className="text-sm text-gray-700">{payment.paymentMethod}</p>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="p-4 border-t border-blue-100 flex justify-end space-x-2">
                  <Link href={`/dashboard/payments/${payment.id}/edit`}>
                    <Button
                      variant="light"
                      size="sm"
                      className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-300"
                    >
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Modifier
                    </Button>
                  </Link>
                  <Button
                    variant="light"
                    size="sm"
                    className="bg-white hover:bg-red-50 text-red-600 border border-red-300"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Supprimer
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-6 flex justify-center">
        <Pagination
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
        />
      </div>
      
      {/* Indicateur de nombre de résultats */}
      <div className="mt-2 text-center text-sm text-blue-500">
        {filteredPayments.length} paiement{filteredPayments.length > 1 ? 's' : ''} affiché{filteredPayments.length > 1 ? 's' : ''}
      </div>
    </div>
  );
}
