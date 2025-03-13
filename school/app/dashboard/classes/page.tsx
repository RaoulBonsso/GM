"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import Pagination from '@/app/components/ui/Pagination';
import Modal from '@/app/components/ui/Modal';

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
}

// Formulaire d'ajout/modification de classe
interface ClassFormData {
  name: string;
  level: string;
  teacher: string;
  year: string;
}

export default function ClassesPage() {
  // États pour les modales et la recherche
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [formData, setFormData] = useState<ClassFormData>({
    name: '',
    level: 'Primaire',
    teacher: '',
    year: '2024-2025',
  });

  // Dans une application réelle, ces données proviendraient de la base de données
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
    },
  ];

  const router = useRouter();

  // Gérer le clic sur une carte de classe
  const handleClassClick = (classItem: Class) => {
    router.push(`/dashboard/classes/${classItem.id}`);
  };

  // Gérer l'ouverture du modal d'ajout
  const handleAddClass = () => {
    setFormData({
      name: '',
      level: 'Primaire',
      teacher: '',
      year: '2024-2025',
    });
    setIsAddModalOpen(true);
  };

  // Gérer l'ouverture du modal de modification
  const handleEditClass = (classItem: Class, e: React.MouseEvent) => {
    e.stopPropagation(); // Empêcher la navigation vers la page de détails
    setSelectedClass(classItem);
    setFormData({
      name: classItem.name,
      level: classItem.level,
      teacher: classItem.teacher,
      year: classItem.year,
    });
    setIsEditModalOpen(true);
  };

  // Gérer la soumission du formulaire d'ajout
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nouvelle classe:', formData);
    // Dans une application réelle, cela enverrait les données à l'API
    setIsAddModalOpen(false);
  };

  // Gérer la soumission du formulaire de modification
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Classe modifiée:', formData);
    // Dans une application réelle, cela enverrait les données à l'API
    setIsEditModalOpen(false);
  };

  // Gérer les changements dans le formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Filtrer les classes en fonction des termes de recherche et du filtre de niveau
  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = searchTerm === '' || 
      classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = levelFilter === '' || classItem.level === levelFilter;
    
    return matchesSearch && matchesLevel;
  });
  
  // Animation variants
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
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.h1 
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Gestion des Classes
        </motion.h1>
        <Button
          variant="primary"
          className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-md hover:shadow-lg"
          onClick={handleAddClass}
        >
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Ajouter une classe
        </Button>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg shadow-md mb-6 border border-blue-200">
          <div className="w-full md:w-auto flex space-x-2 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Rechercher une classe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="shadow-sm focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-sm border-gray-300 rounded-md text-black bg-white"
            />
            <Button 
              variant="light" 
              size="sm"
              className="bg-gradient-to-r from-blue-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200 text-indigo-700 font-medium py-2 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
            >
              Rechercher
            </Button>
          </div>
          <div className="w-full md:w-auto flex space-x-2">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm rounded-md text-black bg-white"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
            >
              <option value="">Tous les niveaux</option>
              <option value="Primaire">Primaire</option>
              <option value="Secondaire">Secondaire</option>
            </select>
            <Button 
              variant="light" 
              size="sm"
              className="bg-gradient-to-r from-blue-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200 text-indigo-700 font-medium py-2 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
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
          {filteredClasses.map((classItem) => (
            <motion.div 
              key={classItem.id} 
              variants={itemVariants}
              className="bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border-t-4 border-blue-600 cursor-pointer"
              onClick={() => handleClassClick(classItem)}
            >
              <div className="p-5 border-b border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-blue-700">{classItem.name}</h3>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                    {classItem.level}
                  </span>
                </div>
                <p className="text-sm text-blue-600">{classItem.year}</p>
              </div>
              
              <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex justify-between mb-4">
                  <div className="text-center">
                    <div className="text-sm text-indigo-600">Total</div>
                    <div className="text-xl font-bold text-indigo-800">{classItem.studentsCount}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-blue-600">Garçons</div>
                    <div className="text-xl font-bold text-blue-700">{classItem.boysCount}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-pink-600">Filles</div>
                    <div className="text-xl font-bold text-pink-700">{classItem.girlsCount}</div>
                  </div>
                </div>
              </div>
              
              <div className="p-5 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-indigo-800">Enseignant</p>
                      <p className="text-sm text-indigo-600">{classItem.teacher}</p>
                    </div>
                  </div>
                  <Button 
                    variant="light" 
                    size="sm"
                    className="bg-purple-100 hover:bg-purple-200 text-purple-700 transition-all duration-300"
                    onClick={(e) => handleEditClass(classItem, e)}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={1}
            totalPages={1}
            onPageChange={(page) => console.log('Page:', page)}
          />
        </div>
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Ajouter une classe"
        size="md"
        footer={
          <>
            <Button 
              variant="primary"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 mr-2"
              onClick={handleAddSubmit}
            >
              Ajouter
            </Button>
            <Button 
              variant="light"
              onClick={() => setIsAddModalOpen(false)}
            >
              Annuler
            </Button>
          </>
        }
      >
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-indigo-700">Nom de la classe</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-black bg-white"
              required
            />
          </div>
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-indigo-700">Niveau</label>
            <select
              name="level"
              id="level"
              value={formData.level}
              onChange={handleInputChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-black bg-white"
              required
            >
              <option value="Primaire">Primaire</option>
              <option value="Secondaire">Secondaire</option>
            </select>
          </div>
          <div>
            <label htmlFor="teacher" className="block text-sm font-medium text-indigo-700">Enseignant</label>
            <input
              type="text"
              name="teacher"
              id="teacher"
              value={formData.teacher}
              onChange={handleInputChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-black bg-white"
              required
            />
          </div>
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-indigo-700">Année scolaire</label>
            <input
              type="text"
              name="year"
              id="year"
              value={formData.year}
              onChange={handleInputChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-black bg-white"
              required
            />
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Modifier la classe: ${selectedClass?.name}`}
        size="md"
        footer={
          <>
            <Button 
              variant="primary"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 mr-2"
              onClick={handleEditSubmit}
            >
              Enregistrer
            </Button>
            <Button 
              variant="light"
              onClick={() => setIsEditModalOpen(false)}
            >
              Annuler
            </Button>
          </>
        }
      >
        <form className="space-y-4">
          <div>
            <label htmlFor="edit-name" className="block text-sm font-medium text-indigo-700">Nom de la classe</label>
            <input
              type="text"
              name="name"
              id="edit-name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-black bg-white"
              required
            />
          </div>
          <div>
            <label htmlFor="edit-level" className="block text-sm font-medium text-indigo-700">Niveau</label>
            <select
              name="level"
              id="edit-level"
              value={formData.level}
              onChange={handleInputChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-black bg-white"
              required
            >
              <option value="Primaire">Primaire</option>
              <option value="Secondaire">Secondaire</option>
            </select>
          </div>
          <div>
            <label htmlFor="edit-teacher" className="block text-sm font-medium text-indigo-700">Enseignant</label>
            <input
              type="text"
              name="teacher"
              id="edit-teacher"
              value={formData.teacher}
              onChange={handleInputChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-black bg-white"
              required
            />
          </div>
          <div>
            <label htmlFor="edit-year" className="block text-sm font-medium text-indigo-700">Année scolaire</label>
            <input
              type="text"
              name="year"
              id="edit-year"
              value={formData.year}
              onChange={handleInputChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-black bg-white"
              required
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
