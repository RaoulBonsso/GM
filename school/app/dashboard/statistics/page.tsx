"use client";

import React, { useState, useEffect } from 'react';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import Card from '@/app/components/ui/Card';
import { motion } from 'framer-motion';

// Enregistrement des composants ChartJS
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
);

export default function StatisticsPage() {
  // Définition des interfaces pour les données statistiques
  interface ClassData {
    name: string;
    count: number;
  }

  interface SubjectData {
    subject: string;
    count: number;
  }

  interface MonthlyPaymentData {
    month: string;
    amount: number;
  }

  interface AttendanceData {
    name: string;
    rate: number;
  }

  interface StatsData {
    students: {
      total: number;
      newStudents: number;
      returningStudents: number;
      byGender: { male: number; female: number };
      byClass: ClassData[];
    };
    teachers: {
      total: number;
      bySubject: SubjectData[];
    };
    payments: {
      totalCollected: number;
      firstInstallment: { paid: number; pending: number };
      secondInstallment: { paid: number; pending: number };
      thirdInstallment: { paid: number; pending: number };
      byMonth: MonthlyPaymentData[];
    };
    attendance: {
      averageRate: number;
      byClass: AttendanceData[];
    };
  }

  // États pour les données statistiques
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<StatsData>({
    students: {
      total: 0,
      newStudents: 0,
      returningStudents: 0,
      byGender: { male: 0, female: 0 },
      byClass: []
    },
    teachers: {
      total: 0,
      bySubject: []
    },
    payments: {
      totalCollected: 0,
      firstInstallment: { paid: 0, pending: 0 },
      secondInstallment: { paid: 0, pending: 0 },
      thirdInstallment: { paid: 0, pending: 0 },
      byMonth: []
    },
    attendance: {
      averageRate: 0,
      byClass: []
    }
  });

  // Simuler le chargement des données (dans une application réelle, cela viendrait d'une API)
  useEffect(() => {
    // Simulation d'un appel API
    setTimeout(() => {
      setStats({
        students: {
          total: 250,
          newStudents: 75,
          returningStudents: 175,
          byGender: { male: 130, female: 120 },
          byClass: [
            { name: 'CP', count: 35 },
            { name: 'CE1', count: 40 },
            { name: 'CE2', count: 45 },
            { name: 'CM1', count: 50 },
            { name: 'CM2', count: 55 },
            { name: '6ème', count: 25 }
          ]
        },
        teachers: {
          total: 18,
          bySubject: [
            { subject: 'Mathématiques', count: 4 },
            { subject: 'Français', count: 4 },
            { subject: 'Sciences', count: 3 },
            { subject: 'Histoire-Géo', count: 3 },
            { subject: 'Anglais', count: 2 },
            { subject: 'Sport', count: 2 }
          ]
        },
        payments: {
          totalCollected: 15750000,
          firstInstallment: { paid: 230, pending: 20 },
          secondInstallment: { paid: 200, pending: 50 },
          thirdInstallment: { paid: 180, pending: 70 },
          byMonth: [
            { month: 'Septembre', amount: 6000000 },
            { month: 'Octobre', amount: 1500000 },
            { month: 'Novembre', amount: 750000 },
            { month: 'Décembre', amount: 3000000 },
            { month: 'Janvier', amount: 1500000 },
            { month: 'Février', amount: 750000 },
            { month: 'Mars', amount: 2250000 }
          ]
        },
        attendance: {
          averageRate: 92,
          byClass: [
            { name: 'CP', rate: 94 },
            { name: 'CE1', rate: 93 },
            { name: 'CE2', rate: 91 },
            { name: 'CM1', rate: 90 },
            { name: 'CM2', rate: 92 },
            { name: '6ème', rate: 89 }
          ]
        }
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  // Formater les montants en FCFA
  const formatAmount = (amount: number) => {
    return amount.toLocaleString('fr-FR') + ' F';
  };

  // Données pour le graphique des élèves par genre
  const studentsByGenderData = {
    labels: ['Garçons', 'Filles'],
    datasets: [
      {
        data: [stats.students.byGender.male, stats.students.byGender.female],
        backgroundColor: ['rgba(54, 162, 235, 0.8)', 'rgba(255, 99, 132, 0.8)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // Données pour le graphique des nouveaux vs anciens élèves
  const studentStatusData = {
    labels: ['Nouveaux élèves', 'Élèves existants'],
    datasets: [
      {
        data: [stats.students.newStudents, stats.students.returningStudents],
        backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(153, 102, 255, 0.8)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // Données pour le graphique des élèves par classe
  const studentsByClassData = {
    labels: stats.students.byClass.map(c => c.name),
    datasets: [
      {
        label: 'Nombre d\'élèves',
        data: stats.students.byClass.map(c => c.count),
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Données pour le graphique des paiements par tranche
  const paymentInstallmentsData = {
    labels: ['1ère Tranche', '2ème Tranche', '3ème Tranche'],
    datasets: [
      {
        label: 'Payé',
        data: [
          stats.payments.firstInstallment.paid,
          stats.payments.secondInstallment.paid,
          stats.payments.thirdInstallment.paid
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'En attente',
        data: [
          stats.payments.firstInstallment.pending,
          stats.payments.secondInstallment.pending,
          stats.payments.thirdInstallment.pending
        ],
        backgroundColor: 'rgba(255, 159, 64, 0.8)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Données pour le graphique des paiements par mois
  const paymentsByMonthData = {
    labels: stats.payments.byMonth.map(m => m.month),
    datasets: [
      {
        label: 'Montant collecté',
        data: stats.payments.byMonth.map(m => m.amount),
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  // Données pour le graphique du taux de présence par classe
  const attendanceByClassData = {
    labels: stats.attendance.byClass.map(c => c.name),
    datasets: [
      {
        label: 'Taux de présence (%)',
        data: stats.attendance.byClass.map(c => c.rate),
        backgroundColor: 'rgba(255, 205, 86, 0.8)',
        borderColor: 'rgba(255, 205, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Options pour les graphiques
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: ${formatAmount(value)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return formatAmount(value);
          }
        }
      },
    },
  };

  // Animation variants pour framer-motion
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

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
      <motion.h1 
        className="text-3xl font-bold text-indigo-800 mb-6 flex items-center"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg className="h-8 w-8 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Tableau de bord statistique
      </motion.h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <motion.div 
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Résumé des statistiques clés */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-gradient-to-br from-white to-blue-50 shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-500">Total Élèves</h3>
                  <p className="text-3xl font-bold text-blue-600">{stats.students.total}</p>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="px-2 py-1 bg-gradient-to-r from-green-100 to-blue-100 text-green-700 rounded-full text-xs font-bold">
                      {stats.students.newStudents} nouveaux
                    </span>
                  </div>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-white to-purple-50 shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-500">Total Enseignants</h3>
                  <p className="text-3xl font-bold text-purple-600">{stats.teachers.total}</p>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="text-purple-600">
                      {stats.teachers.bySubject.length} matières
                    </span>
                  </div>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-white to-green-50 shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-500">Paiements Collectés</h3>
                  <p className="text-2xl font-bold text-green-600">{formatAmount(stats.payments.totalCollected)}</p>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="px-2 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-xs font-bold">
                      {Math.round((stats.payments.firstInstallment.paid / (stats.payments.firstInstallment.paid + stats.payments.firstInstallment.pending)) * 100)}% 1ère tranche
                    </span>
                  </div>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-white to-amber-50 shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-amber-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-500">Taux de Présence</h3>
                  <p className="text-3xl font-bold text-amber-600">{stats.attendance.averageRate}%</p>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="text-amber-600">
                      Moyenne de l'école
                    </span>
                  </div>
                </div>
                <div className="bg-amber-100 p-3 rounded-full">
                  <svg className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Statistiques des élèves */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center">
              <svg className="h-6 w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Statistiques des élèves
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-gradient-to-br from-white to-indigo-50 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-medium text-indigo-700 mb-4">Répartition par genre</h3>
                <div className="h-64">
                  <Pie data={studentsByGenderData} options={pieOptions} />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-white to-indigo-50 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-medium text-indigo-700 mb-4">Nouveaux vs Existants</h3>
                <div className="h-64">
                  <Pie data={studentStatusData} options={pieOptions} />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-white to-indigo-50 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-medium text-indigo-700 mb-4">Élèves par classe</h3>
                <div className="h-64">
                  <Bar data={studentsByClassData} options={barOptions} />
                </div>
              </Card>
            </div>
          </motion.div>

          {/* Statistiques des paiements */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center">
              <svg className="h-6 w-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Statistiques des paiements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-to-br from-white to-green-50 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-medium text-green-700 mb-4">Paiements par tranche</h3>
                <div className="h-80">
                  <Bar data={paymentInstallmentsData} options={barOptions} />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-100 p-3 rounded-lg border border-green-100 text-center">
                    <h4 className="text-sm font-medium text-green-700">1ère Tranche</h4>
                    <p className="text-lg font-bold text-green-600">
                      {Math.round((stats.payments.firstInstallment.paid / (stats.payments.firstInstallment.paid + stats.payments.firstInstallment.pending)) * 100)}%
                    </p>
                    <p className="text-xs text-green-600">payée</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-100 p-3 rounded-lg border border-green-100 text-center">
                    <h4 className="text-sm font-medium text-green-700">2ème Tranche</h4>
                    <p className="text-lg font-bold text-green-600">
                      {Math.round((stats.payments.secondInstallment.paid / (stats.payments.secondInstallment.paid + stats.payments.secondInstallment.pending)) * 100)}%
                    </p>
                    <p className="text-xs text-green-600">payée</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-100 p-3 rounded-lg border border-green-100 text-center">
                    <h4 className="text-sm font-medium text-green-700">3ème Tranche</h4>
                    <p className="text-lg font-bold text-green-600">
                      {Math.round((stats.payments.thirdInstallment.paid / (stats.payments.thirdInstallment.paid + stats.payments.thirdInstallment.pending)) * 100)}%
                    </p>
                    <p className="text-xs text-green-600">payée</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-white to-green-50 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-medium text-green-700 mb-4">Paiements par mois</h3>
                <div className="h-80">
                  <Line data={paymentsByMonthData} options={lineOptions} />
                </div>
              </Card>
            </div>
          </motion.div>

          {/* Statistiques de présence */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-amber-700 mb-4 flex items-center">
              <svg className="h-6 w-6 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Statistiques de présence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-to-br from-white to-amber-50 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-medium text-amber-700 mb-4">Taux de présence par classe</h3>
                <div className="h-80">
                  <Bar data={attendanceByClassData} options={barOptions} />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-white to-amber-50 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-medium text-amber-700 mb-4">Détails de présence</h3>
                <div className="space-y-4">
                  {stats.attendance.byClass.map((classData, index) => (
                    <div key={index} className="bg-gradient-to-r from-amber-50 to-yellow-100 p-4 rounded-lg border border-amber-100">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-amber-700">{classData.name}</h4>
                        <span className="text-sm font-bold text-amber-600">{classData.rate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-gradient-to-r from-amber-400 to-yellow-500 h-2.5 rounded-full" 
                          style={{ width: `${classData.rate}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </motion.div>

          {/* Nouveaux élèves - Liste détaillée */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center">
              <svg className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Nouveaux élèves ({stats.students.newStudents})
            </h2>
            <Card className="p-6 bg-gradient-to-br from-white to-blue-50 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-blue-200">
                  <thead className="bg-gradient-to-r from-blue-100 to-indigo-100">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Nom</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Classe</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Date d'inscription</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Statut paiement</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-blue-100">
                    {/* Données d'exemple pour les nouveaux élèves */}
                    {[
                      { id: 1, name: 'Amadou Diallo', class: 'CM2', date: '2024-09-01', paymentStatus: 'Complet' },
                      { id: 2, name: 'Fatou Camara', class: 'CE1', date: '2024-09-02', paymentStatus: '1ère tranche' },
                      { id: 3, name: 'Mamadou Bah', class: 'CP', date: '2024-09-03', paymentStatus: 'Complet' },
                      { id: 4, name: 'Aïssatou Barry', class: 'CM1', date: '2024-09-05', paymentStatus: '1ère tranche' },
                      { id: 5, name: 'Ibrahim Sow', class: 'CE2', date: '2024-09-10', paymentStatus: 'En attente' },
                    ].map((student, index) => (
                      <motion.tr 
                        key={student.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="hover:bg-blue-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{student.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <span className="px-2 py-1 bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 rounded-full text-xs font-bold">
                            {student.class}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(student.date).toLocaleDateString('fr-FR')}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${student.paymentStatus === 'Complet' ? 'bg-green-100 text-green-700' : student.paymentStatus === 'En attente' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {student.paymentStatus}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
