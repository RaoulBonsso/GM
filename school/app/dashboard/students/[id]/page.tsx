"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import { motion } from 'framer-motion';

interface StudentDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function StudentDetailsPage({ params }: StudentDetailsPageProps) {
  const { id } = await params;

  // Dans une application réelle, ces données proviendraient de la base de données
  const student = {
    id,
    firstName: 'Amadou',
    lastName: 'Diallo',
    gender: 'M',
    birthDate: '2014-05-12',
    address: '123 Rue Principale, Conakry',
    class: { id: '1', name: 'CM2' },
    registrationDate: '2024-09-01',
    parentName: 'Mamadou Diallo',
    parentPhone: '620123456',
    parentEmail: 'mamadou.diallo@example.com',
    notes: 'Élève très appliqué et discipliné.',
    payments: [
      { id: '1', amount: 75000, date: '2024-09-01', status: 'Payé', description: 'Frais de scolarité - 1er trimestre' },
      { id: '2', amount: 75000, date: '2024-12-01', status: 'Payé', description: 'Frais de scolarité - 2ème trimestre' },
      { id: '3', amount: 75000, date: '2025-03-01', status: 'En attente', description: 'Frais de scolarité - 3ème trimestre' },
    ],
    attendance: {
      present: 87,
      absent: 5,
      late: 3,
      total: 95,
    },
  };

  // Formater la date de naissance
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  // Calculer le pourcentage de présence
  const attendancePercentage = Math.round((student.attendance.present / student.attendance.total) * 100);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
    }
  };
  
  const progressVariants = {
    hidden: { width: 0 },
    visible: { 
      width: `${attendancePercentage}%`,
      transition: { 
        duration: 1.5, 
        ease: "easeInOut" 
      } 
    }
  };

  return (
    <motion.div 
      className="space-y-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <motion.h1 
          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <svg className="h-8 w-8 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          {student.lastName} {student.firstName}
        </motion.h1>
        <div className="flex space-x-3">
          <Link href={`/dashboard/students/${id}/edit`}>
            <Button 
              variant="light"
              className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition-all duration-300 shadow-sm hover:shadow px-4 py-2 rounded-lg"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Modifier
            </Button>
          </Link>
          <Link href="/dashboard/students">
            <Button 
              variant="light"
              className="bg-purple-100 hover:bg-purple-200 text-purple-700 transition-all duration-300 shadow-sm hover:shadow px-4 py-2 rounded-lg"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour à la liste
            </Button>
          </Link>
        </div>
      </div>

      <motion.div 
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Informations personnelles */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="p-6 border-t-4 border-indigo-500 bg-gradient-to-br from-white to-indigo-50 shadow-md hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold text-indigo-700 mb-4 flex items-center">
              <svg className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Informations personnelles
            </h2>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-3 rounded-lg transition-all duration-300 hover:shadow-md hover:from-indigo-100 hover:to-indigo-200 border border-indigo-100">
                <h3 className="text-sm font-medium text-indigo-700">Nom complet</h3>
                <p className="mt-1 text-sm font-semibold text-indigo-600">{student.lastName} {student.firstName}</p>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-indigo-100 p-3 rounded-lg transition-all duration-300 hover:shadow-md hover:from-purple-100 hover:to-indigo-200 border border-purple-100">
                <h3 className="text-sm font-medium text-purple-700">Genre</h3>
                <p className="mt-1 text-sm font-semibold">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${student.gender === 'M' ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700' : 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700'}`}>
                    {student.gender === 'M' ? 'Masculin' : 'Féminin'}
                  </span>
                </p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-3 rounded-lg transition-all duration-300 hover:shadow-md hover:from-blue-100 hover:to-indigo-200 border border-blue-100">
                <h3 className="text-sm font-medium text-indigo-700">Date de naissance</h3>
                <p className="mt-1 text-sm font-semibold text-indigo-600">{formatDate(student.birthDate)}</p>
              </div>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-100 p-3 rounded-lg transition-all duration-300 hover:shadow-md hover:from-indigo-100 hover:to-purple-200 border border-indigo-100">
                <h3 className="text-sm font-medium text-purple-700">Classe</h3>
                <p className="mt-1 text-sm font-semibold">
                  <span className="px-2 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-xs font-bold">
                    {student.class.name}
                  </span>
                </p>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-blue-100 p-3 rounded-lg transition-all duration-300 hover:shadow-md hover:from-purple-100 hover:to-blue-200 border border-purple-100">
                <h3 className="text-sm font-medium text-indigo-700">Date d'inscription</h3>
                <p className="mt-1 text-sm font-semibold text-indigo-600">{formatDate(student.registrationDate)}</p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-purple-100 p-3 rounded-lg transition-all duration-300 hover:shadow-md hover:from-blue-100 hover:to-purple-200 border border-blue-100">
                <h3 className="text-sm font-medium text-purple-700">Adresse</h3>
                <p className="mt-1 text-sm font-semibold text-purple-600">{student.address}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Informations du parent */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 border-t-4 border-green-500 bg-gradient-to-br from-white to-green-50 shadow-md hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center">
              <svg className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Contact parent
            </h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-teal-100 p-3 rounded-lg transition-all duration-300 hover:shadow-md hover:from-green-100 hover:to-teal-200 border border-green-100">
                <h3 className="text-sm font-medium text-green-700">Nom du parent</h3>
                <p className="mt-1 text-sm font-semibold text-green-600">{student.parentName}</p>
              </div>
              <div className="bg-gradient-to-r from-teal-50 to-green-100 p-3 rounded-lg transition-all duration-300 hover:shadow-md hover:from-teal-100 hover:to-green-200 border border-teal-100">
                <h3 className="text-sm font-medium text-teal-700">Téléphone</h3>
                <p className="mt-1 text-sm font-semibold text-teal-700">{student.parentPhone}</p>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-100 p-3 rounded-lg transition-all duration-300 hover:shadow-md hover:from-green-100 hover:to-emerald-200 border border-green-100">
                <h3 className="text-sm font-medium text-green-700">Email</h3>
                <p className="mt-1 text-sm font-semibold text-green-600">{student.parentEmail || '-'}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Paiements */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="p-6 border-t-4 border-amber-500 bg-gradient-to-br from-white to-amber-50 shadow-md hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold text-amber-700 mb-4 flex items-center">
              <svg className="h-5 w-5 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Historique des paiements
            </h2>
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full divide-y divide-amber-200">
                <thead className="bg-gradient-to-r from-amber-100 to-amber-200">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">
                      Montant
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-amber-100">
                  {student.payments.map((payment, index) => (
                    <motion.tr 
                      key={payment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                      className="hover:bg-amber-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-600">
                        {payment.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-amber-700">
                        {payment.amount.toLocaleString('fr-FR')} F
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-700">
                        {formatDate(payment.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                          payment.status === 'Payé' 
                            ? 'bg-green-100 text-green-800 border border-green-200' 
                            : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6">
              <Link href={`/dashboard/payments/new?studentId=${id}`}>
                <Button 
                  variant="light"
                  className="bg-amber-100 hover:bg-amber-200 text-amber-700 transition-all duration-300 shadow-sm hover:shadow px-4 py-2 rounded-lg flex items-center"
                >
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Ajouter un paiement
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>

        {/* Assiduité */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 border-t-4 border-blue-500 bg-gradient-to-br from-white to-blue-50 shadow-md hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
              <svg className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Assiduité
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                <span className="text-sm font-medium text-blue-700">Présence</span>
                <span className="text-sm font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">{attendancePercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-blue-400 to-indigo-600 h-3 rounded-full" 
                  variants={progressVariants}
                  initial="hidden"
                  animate="visible"
                ></motion.div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-100 p-3 rounded-lg transition-all duration-300 hover:shadow-md hover:from-green-100 hover:to-emerald-200 text-center border border-green-100">
                  <h3 className="text-sm font-medium text-green-700">Présent</h3>
                  <p className="mt-1 text-lg font-bold text-green-600">{student.attendance.present}</p>
                  <p className="text-xs text-green-600">jours</p>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-rose-100 p-3 rounded-lg transition-all duration-300 hover:shadow-md hover:from-red-100 hover:to-rose-200 text-center border border-red-100">
                  <h3 className="text-sm font-medium text-red-700">Absent</h3>
                  <p className="mt-1 text-lg font-bold text-red-600">{student.attendance.absent}</p>
                  <p className="text-xs text-red-600">jours</p>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-amber-100 p-3 rounded-lg transition-all duration-300 hover:shadow-md hover:from-yellow-100 hover:to-amber-200 text-center border border-yellow-100">
                  <h3 className="text-sm font-medium text-yellow-700">Retard</h3>
                  <p className="mt-1 text-lg font-bold text-yellow-600">{student.attendance.late}</p>
                  <p className="text-xs text-yellow-600">jours</p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-3 rounded-lg transition-all duration-300 hover:shadow-md hover:from-blue-100 hover:to-indigo-200 text-center col-span-3 mt-2 border border-blue-100">
                  <h3 className="text-sm font-medium text-blue-700">Total</h3>
                  <p className="mt-1 text-lg font-bold text-blue-600">{student.attendance.total}</p>
                  <p className="text-xs text-blue-600">jours</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Notes */}
        {student.notes && (
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <Card className="p-6 border-t-4 border-purple-500 bg-gradient-to-br from-white to-purple-50 shadow-md hover:shadow-lg transition-all duration-300">
              <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                <svg className="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Notes
              </h2>
              <div className="bg-gradient-to-r from-purple-50 to-indigo-100 p-4 rounded-lg border border-purple-100 hover:shadow-md transition-all duration-300">
                <p className="text-sm text-purple-600 italic">"{student.notes}"</p>
              </div>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
