"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import Pagination from '@/app/components/ui/Pagination';
import { motion } from 'framer-motion';

// Types pour les données des élèves
interface Student {
  id: string;
  firstName: string;
  lastName: string;
  class: {
    id: string;
    name: string;
  };
  gender: 'M' | 'F';
  birthDate: string;
  registrationDate: string;
  parentName: string;
  parentPhone: string;
}

export default function StudentsPage() {
  // Dans une application réelle, ces données proviendraient de la base de données
  const students: Student[] = [
    {
      id: '1',
      firstName: 'Amadou',
      lastName: 'Diallo',
      class: { id: '1', name: 'CM2' },
      gender: 'M',
      birthDate: '2014-05-12',
      registrationDate: '2024-09-01',
      parentName: 'Mamadou Diallo',
      parentPhone: '620123456',
    },
    {
      id: '2',
      firstName: 'Fatou',
      lastName: 'Sow',
      class: { id: '2', name: 'CE1' },
      gender: 'F',
      birthDate: '2017-03-22',
      registrationDate: '2024-09-01',
      parentName: 'Aissatou Sow',
      parentPhone: '621789012',
    },
    {
      id: '3',
      firstName: 'Mamadou',
      lastName: 'Bah',
      class: { id: '3', name: 'CM1' },
      gender: 'M',
      birthDate: '2015-11-05',
      registrationDate: '2024-09-01',
      parentName: 'Ibrahima Bah',
      parentPhone: '622345678',
    },
    {
      id: '4',
      firstName: 'Aissatou',
      lastName: 'Barry',
      class: { id: '4', name: 'CE2' },
      gender: 'F',
      birthDate: '2016-07-18',
      registrationDate: '2025-03-01',
      parentName: 'Mariama Barry',
      parentPhone: '623456789',
    },
    {
      id: '5',
      firstName: 'Ousmane',
      lastName: 'Camara',
      class: { id: '1', name: 'CM2' },
      gender: 'M',
      birthDate: '2014-02-28',
      registrationDate: '2024-09-01',
      parentName: 'Abdoulaye Camara',
      parentPhone: '624567890',
    },
  ];

  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Gérer le clic sur une carte d'élève
  const handleStudentClick = (student: Student) => {
    router.push(`/dashboard/students/${student.id}`);
  };

  // Filtrer les élèves en fonction du terme de recherche et du filtre de classe
  const filteredStudents = students.filter(student => {
    const matchesSearch = searchTerm === '' || 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === '' || student.class.id === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });
  
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

  return (
    <div className="space-y-6 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-700 flex items-center">
          <svg className="h-8 w-8 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Gestion des élèves
        </h1>
        <Link href="/dashboard/students/new">
          <Button
            variant="primary"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            }
          >
            Ajouter un élève
          </Button>
        </Link>
      </div>

      <div className="mb-6">
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
              defaultValue=""
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="">Toutes les classes</option>
              <option value="1">CM2</option>
              <option value="2">CE1</option>
              <option value="3">CM1</option>
              <option value="4">CE2</option>
              <option value="5">CP</option>
            </select>
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm rounded-lg transition-all duration-300 text-black bg-white"
              defaultValue=""
            >
              <option value="">Tous les enseignants</option>
              <option value="1">M. Diallo</option>
              <option value="2">Mme Sow</option>
              <option value="3">M. Camara</option>
              <option value="4">Mme Barry</option>
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
              Exporter
            </Button>
          </div>
        </div>

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
              onClick={() => handleStudentClick(student)}
              variants={cardVariants}
              whileHover="hover"
              layoutId={`student-card-${student.id}`}
            >
              <div className="p-5 border-b border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
                    {student.lastName} {student.firstName}
                  </h3>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${student.gender === 'M' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'}`}>
                    {student.gender === 'M' ? 'Garçon' : 'Fille'}
                  </span>
                </div>
                <p className="text-sm font-medium text-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50 inline-block px-2 py-1 rounded-md">
                  Classe: {student.class.name}
                </p>
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
                      Inscrit(e) le: <span className="text-purple-600">{new Date(student.registrationDate).toLocaleDateString('fr-FR')}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-5 border-t border-gray-100">
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
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={1}
            totalPages={1}
            onPageChange={(page) => console.log('Page:', page)}
          />
        </div>
      </div>
    </div>
  );
}
