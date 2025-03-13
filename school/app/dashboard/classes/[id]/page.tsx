"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/app/components/ui/Button';
import Card from '@/app/components/ui/Card';

// Types pour les données des élèves
interface Student {
  id: string;
  firstName: string;
  lastName: string;
  gender: 'M' | 'F';
  birthDate: string;
  registrationDate: string;
  parentName: string;
  parentPhone: string;
  photo?: string;
  isNew: boolean;
}

// Types pour les données des classes
interface Class {
  id: string;
  name: string;
  level: string;
  teacher: string;
  studentsCount: number;
  boysCount: number;
  girlsCount: number;
  year: string;
  students: Student[];
}

export default function ClassDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [classData, setClassData] = useState<Class | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'new', 'existing'
  const [genderFilter, setGenderFilter] = useState('all'); // 'all', 'M', 'F'

  // Fonction pour déterminer si un élève est nouveau (inscrit dans les 3 derniers mois)
  const isNewStudent = (registrationDate: string): boolean => {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return new Date(registrationDate) >= threeMonthsAgo;
  };

  // Données simulées pour la classe et ses élèves
  useEffect(() => {
    // Simuler un appel API pour récupérer les données de la classe
    const fetchClassData = () => {
      setLoading(true);
      
      // Données simulées des classes
      const classes: Class[] = [
        {
          id: '1',
          name: 'CM2',
          level: 'Primaire',
          teacher: 'M. Souleymane Bah',
          studentsCount: 32,
          boysCount: 18,
          girlsCount: 14,
          year: '2024-2025',
          students: [
            {
              id: '1',
              firstName: 'Amadou',
              lastName: 'Diallo',
              gender: 'M',
              birthDate: '2014-05-12',
              registrationDate: '2024-09-01',
              parentName: 'Mamadou Diallo',
              parentPhone: '620123456',
              isNew: false,
            },
            {
              id: '2',
              firstName: 'Fatou',
              lastName: 'Sow',
              gender: 'F',
              birthDate: '2017-03-22',
              registrationDate: '2024-09-01',
              parentName: 'Aissatou Sow',
              parentPhone: '621789012',
              isNew: false,
            },
            {
              id: '6',
              firstName: 'Mohamed',
              lastName: 'Camara',
              gender: 'M',
              birthDate: '2014-07-15',
              registrationDate: '2025-03-01',
              parentName: 'Ibrahim Camara',
              parentPhone: '625678901',
              isNew: true,
            },
            {
              id: '7',
              firstName: 'Kadiatou',
              lastName: 'Balde',
              gender: 'F',
              birthDate: '2014-09-30',
              registrationDate: '2025-02-15',
              parentName: 'Mariama Balde',
              parentPhone: '626789012',
              isNew: true,
            }
          ]
        },
        {
          id: '2',
          name: 'CE1',
          level: 'Primaire',
          teacher: 'Mme. Fatoumata Camara',
          studentsCount: 28,
          boysCount: 15,
          girlsCount: 13,
          year: '2024-2025',
          students: [
            {
              id: '3',
              firstName: 'Mamadou',
              lastName: 'Bah',
              gender: 'M',
              birthDate: '2015-11-05',
              registrationDate: '2024-09-01',
              parentName: 'Ibrahima Bah',
              parentPhone: '622345678',
              isNew: false,
            },
            {
              id: '8',
              firstName: 'Fatoumata',
              lastName: 'Diallo',
              gender: 'F',
              birthDate: '2016-04-12',
              registrationDate: '2025-03-05',
              parentName: 'Aissatou Diallo',
              parentPhone: '627890123',
              isNew: true,
            }
          ]
        },
        {
          id: '3',
          name: 'CM1',
          level: 'Primaire',
          teacher: 'M. Ibrahima Diallo',
          studentsCount: 30,
          boysCount: 16,
          girlsCount: 14,
          year: '2024-2025',
          students: []
        },
        {
          id: '4',
          name: 'CE2',
          level: 'Primaire',
          teacher: 'Mme. Mariama Sow',
          studentsCount: 25,
          boysCount: 12,
          girlsCount: 13,
          year: '2024-2025',
          students: [
            {
              id: '4',
              firstName: 'Aissatou',
              lastName: 'Barry',
              gender: 'F',
              birthDate: '2016-07-18',
              registrationDate: '2025-03-01',
              parentName: 'Mariama Barry',
              parentPhone: '623456789',
              isNew: true,
            }
          ]
        },
        {
          id: '5',
          name: 'CP',
          level: 'Primaire',
          teacher: 'M. Ousmane Barry',
          studentsCount: 22,
          boysCount: 10,
          girlsCount: 12,
          year: '2024-2025',
          students: [
            {
              id: '5',
              firstName: 'Ousmane',
              lastName: 'Camara',
              gender: 'M',
              birthDate: '2014-02-28',
              registrationDate: '2024-09-01',
              parentName: 'Abdoulaye Camara',
              parentPhone: '624567890',
              isNew: false,
            }
          ]
        },
      ];
      
      // Trouver la classe correspondant à l'ID dans l'URL
      const classId = params.id as string;
      const foundClass = classes.find(c => c.id === classId);
      
      if (foundClass) {
        setClassData(foundClass);
      } else {
        // Rediriger vers la liste des classes si la classe n'est pas trouvée
        router.push('/dashboard/classes');
      }
      
      setLoading(false);
    };
    
    fetchClassData();
  }, [params.id, router]);

  // Filtrer les élèves en fonction des termes de recherche et des filtres
  const filteredStudents = classData?.students.filter(student => {
    const matchesSearch = searchTerm === '' || 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
      (filter === 'new' && student.isNew) || 
      (filter === 'existing' && !student.isNew);
    
    const matchesGender = genderFilter === 'all' || student.gender === genderFilter;
    
    return matchesSearch && matchesFilter && matchesGender;
  }) || [];

  // Animation variants pour les cartes
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const cardVariants = {
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
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };
  
  // Animation pour l'apparition des badges
  const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
        delay: 0.3
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Classe non trouvée</h2>
        <p className="mt-2 text-gray-600">La classe que vous recherchez n'existe pas.</p>
        <Link href="/dashboard/classes">
          <Button
            variant="primary"
            className="mt-4 bg-indigo-600 hover:bg-indigo-700"
          >
            Retour à la liste des classes
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
      {/* En-tête avec informations de la classe */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-600">
        <div>
          <div className="flex items-center">
            <Link href="/dashboard/classes">
              <Button
                variant="light"
                className="mr-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                }
              >
                Retour
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-indigo-700 flex items-center">
              Classe: <span className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">{classData.name}</span>
            </h1>
          </div>
          <p className="text-gray-600 mt-1">
            Niveau: <span className="font-medium text-indigo-600">{classData.level}</span> | 
            Enseignant: <span className="font-medium text-indigo-600">{classData.teacher}</span> | 
            Année scolaire: <span className="font-medium text-indigo-600">{classData.year}</span>
          </p>
        </div>
        <div className="flex space-x-4">
          <div className="text-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-lg shadow-sm">
            <p className="text-sm text-indigo-600 font-medium">Total</p>
            <p className="text-2xl font-bold text-indigo-700">{classData.studentsCount}</p>
          </div>
          <div className="text-center px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-sm">
            <p className="text-sm text-blue-600 font-medium">Garçons</p>
            <p className="text-2xl font-bold text-blue-700">{classData.boysCount}</p>
          </div>
          <div className="text-center px-4 py-2 bg-gradient-to-r from-pink-100 to-pink-200 rounded-lg shadow-sm">
            <p className="text-sm text-pink-600 font-medium">Filles</p>
            <p className="text-2xl font-bold text-pink-700">{classData.girlsCount}</p>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-wrap items-center justify-between bg-white p-5 rounded-xl shadow-md mb-6 border-l-4 border-indigo-500">
        <div className="w-full md:w-auto flex space-x-2 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Rechercher un élève..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-lg px-4 py-3 transition-all duration-300 text-black"
          />
          <Button 
            variant="light" 
            size="sm" 
            className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition-all duration-300"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            }
          >
            Rechercher
          </Button>
        </div>
        <div className="w-full md:w-auto flex space-x-2">
          <select
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm rounded-lg transition-all duration-300 text-black bg-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Tous les élèves</option>
            <option value="new">Nouveaux élèves</option>
            <option value="existing">Élèves existants</option>
          </select>
          <select
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm rounded-lg transition-all duration-300 text-black bg-white"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="all">Tous les genres</option>
            <option value="M">Garçons</option>
            <option value="F">Filles</option>
          </select>
          <Button 
            variant="light" 
            size="sm" 
            className="bg-gradient-to-r from-blue-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200 text-blue-700 transition-all duration-300"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            }
          >
            Exporter en PDF
          </Button>
        </div>
      </div>

      {/* Affichage des élèves */}
      {filteredStudents.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-xl shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="mt-4 text-xl font-semibold text-gray-700">Aucun élève trouvé</h2>
          <p className="mt-2 text-gray-500">Aucun élève ne correspond à vos critères de recherche.</p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredStudents.map((student) => (
            <motion.div 
              key={student.id} 
              className={`bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 border-t-4 ${student.gender === 'M' ? 'border-blue-500' : 'border-pink-500'}`}
              variants={cardVariants}
              whileHover="hover"
              layoutId={`student-card-${student.id}`}
            >
              <div className="p-5 border-b border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
                      {student.lastName} {student.firstName}
                    </h3>
                    {student.isNew && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 animate-pulse">
                        <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-green-500" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                        Nouvel élève
                      </span>
                    )}
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${student.gender === 'M' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'}`}>
                    {student.gender === 'M' ? 'Garçon' : 'Fille'}
                  </span>
                </div>
              </div>
              
              <div className="relative">
                <div className="h-40 w-full bg-gradient-to-r from-indigo-200 to-purple-200 flex items-center justify-center overflow-hidden">
                  {student.photo ? (
                    <img 
                      src={student.photo} 
                      alt={`${student.firstName} ${student.lastName}`} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                </div>
                {student.isNew && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg transform rotate-3 animate-pulse">
                    NOUVEAU
                  </div>
                )}
              </div>
              
              <div className="p-5 bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">
                      Né(e) le: <span className="text-indigo-600">{new Date(student.birthDate).toLocaleDateString('fr-FR')}</span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">
                      Inscrit(e) le: <span className={`${student.isNew ? 'font-bold text-green-600' : 'text-purple-600'}`}>{new Date(student.registrationDate).toLocaleDateString('fr-FR')}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-5 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-indigo-700">Parent</p>
                      <p className="text-sm font-medium text-gray-700">{student.parentName}</p>
                      <p className="text-sm text-indigo-600">{student.parentPhone}</p>
                    </div>
                  </div>
                  <div>
                    <Button 
                      variant="light" 
                      size="sm"
                      className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition-all duration-300"
                      icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      }
                    >
                      Détails
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Statistiques de la classe */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-indigo-700 mb-4">Statistiques de la classe</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">Répartition par genre</h3>
            <div className="flex items-center justify-around">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{classData.boysCount}</div>
                <div className="text-sm text-gray-600">Garçons</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">{classData.girlsCount}</div>
                <div className="text-sm text-gray-600">Filles</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-green-700 mb-2">Nouveaux élèves</h3>
            <div className="flex items-center justify-around">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {classData.students.filter(s => s.isNew).length}
                </div>
                <div className="text-sm text-gray-600">Nouveaux</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">
                  {classData.students.filter(s => !s.isNew).length}
                </div>
                <div className="text-sm text-gray-600">Existants</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-purple-700 mb-2">Taux de présence</h3>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">98%</div>
                <div className="text-sm text-gray-600">Moyenne</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
