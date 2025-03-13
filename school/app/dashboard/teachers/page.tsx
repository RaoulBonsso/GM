"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import Pagination from '@/app/components/ui/Pagination';
import Modal from '@/app/components/ui/Modal';

// Types pour les données des enseignants
interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  gender: 'M' | 'F';
  email: string;
  phone: string;
  subject: string;
  classes: string[];
  joinDate: string;
  status: 'Active' | 'En congé' | 'Retraité';
  photo?: string;
}

// Formulaire d'ajout/modification d'enseignant
interface TeacherFormData {
  firstName: string;
  lastName: string;
  gender: 'M' | 'F';
  email: string;
  phone: string;
  subject: string;
  classes: string[];
  joinDate: string;
  status: 'Active' | 'En congé' | 'Retraité';
}

export default function TeachersPage() {
  // États pour les modales et la recherche
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [formData, setFormData] = useState<TeacherFormData>({
    firstName: '',
    lastName: '',
    gender: 'M',
    email: '',
    phone: '',
    subject: '',
    classes: [],
    joinDate: '',
    status: 'Active',
  });

  // Dans une application réelle, ces données proviendraient de la base de données
  const teachers: Teacher[] = [
    {
      id: '1',
      firstName: 'Souleymane',
      lastName: 'Bah',
      gender: 'M',
      email: 'souleymane.bah@example.com',
      phone: '620123456',
      subject: 'Mathématiques',
      classes: ['CM2'],
      joinDate: '2020-09-01',
      status: 'Active',
    },
    {
      id: '2',
      firstName: 'Fatoumata',
      lastName: 'Camara',
      gender: 'F',
      email: 'fatoumata.camara@example.com',
      phone: '620789012',
      subject: 'Français',
      classes: ['CE1'],
      joinDate: '2018-09-01',
      status: 'Active',
    },
    {
      id: '3',
      firstName: 'Ibrahima',
      lastName: 'Diallo',
      gender: 'M',
      email: 'ibrahima.diallo@example.com',
      phone: '620345678',
      subject: 'Sciences',
      classes: ['CM1'],
      joinDate: '2019-09-01',
      status: 'Active',
    },
    {
      id: '4',
      firstName: 'Mariama',
      lastName: 'Sow',
      gender: 'F',
      email: 'mariama.sow@example.com',
      phone: '620901234',
      subject: 'Histoire-Géographie',
      classes: ['CE2'],
      joinDate: '2021-09-01',
      status: 'Active',
    },
    {
      id: '5',
      firstName: 'Ousmane',
      lastName: 'Barry',
      gender: 'M',
      email: 'ousmane.barry@example.com',
      phone: '620567890',
      subject: 'Éducation Physique',
      classes: ['CP'],
      joinDate: '2017-09-01',
      status: 'En congé',
    },
  ];

  // Formatage de la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  // Gérer l'ouverture du modal d'ajout
  const handleAddTeacher = () => {
    setFormData({
      firstName: '',
      lastName: '',
      gender: 'M',
      email: '',
      phone: '',
      subject: '',
      classes: [],
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Active',
    });
    setIsAddModalOpen(true);
  };

  // Gérer l'ouverture du modal de modification
  const handleEditTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setFormData({
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      gender: teacher.gender,
      email: teacher.email,
      phone: teacher.phone,
      subject: teacher.subject,
      classes: teacher.classes,
      joinDate: teacher.joinDate,
      status: teacher.status,
    });
    setIsEditModalOpen(true);
  };

  // Gérer la soumission du formulaire d'ajout
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nouvel enseignant:', formData);
    // Dans une application réelle, cela enverrait les données à l'API
    setIsAddModalOpen(false);
  };

  // Gérer la soumission du formulaire de modification
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enseignant modifié:', formData);
    // Dans une application réelle, cela enverrait les données à l'API
    setIsEditModalOpen(false);
  };

  // Gérer les changements dans le formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Filtrer les enseignants en fonction des termes de recherche et du filtre de statut
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = searchTerm === '' || 
      teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || teacher.status === statusFilter;
    
    return matchesSearch && matchesStatus;
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
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Gestion des Enseignants
        </motion.h1>
        <Button 
          variant="primary"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
          onClick={handleAddTeacher}
        >
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Ajouter un enseignant
        </Button>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="w-full md:w-auto flex space-x-2 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Rechercher un enseignant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-indigo-900"
            />
            <Button 
              variant="light" 
              size="sm"
              className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition-all duration-300"
            >
              Rechercher
            </Button>
          </div>
          <div className="w-full md:w-auto flex space-x-2">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-indigo-900"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Tous les statuts</option>
              <option value="Active">Actif</option>
              <option value="En congé">En congé</option>
              <option value="Retraité">Retraité</option>
            </select>
            <Button 
              variant="light" 
              size="sm"
              className="bg-purple-100 hover:bg-purple-200 text-purple-700 transition-all duration-300"
            >
              Exporter
            </Button>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredTeachers.map((teacher) => (
            <motion.div 
              key={teacher.id}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border-t-4 border-indigo-500"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <span className="text-xl font-bold text-indigo-700">
                        {teacher.firstName.charAt(0)}{teacher.lastName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-indigo-800">{teacher.lastName} {teacher.firstName}</h3>
                      <p className="text-sm text-indigo-600">{teacher.subject}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    teacher.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : teacher.status === 'En congé' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-gray-100 text-gray-800'
                  }`}>
                    {teacher.status}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-indigo-700">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {teacher.email}
                  </div>
                  <div className="flex items-center text-indigo-700">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {teacher.phone}
                  </div>
                  <div className="flex items-center text-indigo-700">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Depuis {formatDate(teacher.joinDate)}
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {teacher.classes.map((cls) => (
                    <span key={cls} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                      {cls}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-2">
                <Button 
                  variant="light" 
                  size="sm"
                  className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition-all duration-300"
                  onClick={() => handleEditTeacher(teacher)}
                >
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Modifier
                </Button>
                <Button 
                  variant="light" 
                  size="sm"
                  className="bg-purple-100 hover:bg-purple-200 text-purple-700 transition-all duration-300"
                  onClick={() => window.location.href = `/dashboard/teachers/${teacher.id}`}
                >
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Détails
                </Button>
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

      {/* Modal d'ajout d'enseignant */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Ajouter un enseignant"
        size="lg"
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
          <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-indigo-700">Prénom</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-indigo-900"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-indigo-700">Nom</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-indigo-900"
                required
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-indigo-700">Genre</label>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-indigo-900"
                required
              >
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
              </select>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-indigo-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-indigo-900"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-indigo-700">Téléphone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-indigo-900"
                required
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-indigo-700">Matière enseignée</label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-indigo-900"
                required
              />
            </div>
            <div>
              <label htmlFor="joinDate" className="block text-sm font-medium text-indigo-700">Date d'entrée</label>
              <input
                type="date"
                name="joinDate"
                id="joinDate"
                value={formData.joinDate}
                onChange={handleInputChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-indigo-900"
                required
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-indigo-700">Statut</label>
              <select
                name="status"
                id="status"
                value={formData.status}
                onChange={handleInputChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-indigo-900"
                required
              >
                <option value="Active">Actif</option>
                <option value="En congé">En congé</option>
                <option value="Retraité">Retraité</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>

      {/* Modal de modification d'enseignant */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Modifier l'enseignant: ${selectedTeacher?.lastName} ${selectedTeacher?.firstName}`}
        size="lg"
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
          <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
            <div>
              <label htmlFor="edit-firstName" className="block text-sm font-medium text-indigo-700">Prénom</label>
              <input
                type="text"
                name="firstName"
                id="edit-firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-indigo-900"
                required
              />
            </div>
            <div>
              <label htmlFor="edit-lastName" className="block text-sm font-medium text-indigo-700">Nom</label>
              <input
                type="text"
                name="lastName"
                id="edit-lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-indigo-900"
                required
              />
            </div>
            <div>
              <label htmlFor="edit-gender" className="block text-sm font-medium text-indigo-700">Genre</label>
              <select
                name="gender"
                id="edit-gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-indigo-900"
                required
              >
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
              </select>
            </div>
            <div>
              <label htmlFor="edit-email" className="block text-sm font-medium text-indigo-700">Email</label>
              <input
                type="email"
                name="email"
                id="edit-email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-indigo-900"
                required
              />
            </div>
            <div>
              <label htmlFor="edit-phone" className="block text-sm font-medium text-indigo-700">Téléphone</label>
              <input
                type="tel"
                name="phone"
                id="edit-phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-indigo-900"
                required
              />
            </div>
            <div>
              <label htmlFor="edit-subject" className="block text-sm font-medium text-indigo-700">Matière enseignée</label>
              <input
                type="text"
                name="subject"
                id="edit-subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-indigo-900"
                required
              />
            </div>
            <div>
              <label htmlFor="edit-joinDate" className="block text-sm font-medium text-indigo-700">Date d'entrée</label>
              <input
                type="date"
                name="joinDate"
                id="edit-joinDate"
                value={formData.joinDate}
                onChange={handleInputChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-indigo-900"
                required
              />
            </div>
            <div>
              <label htmlFor="edit-status" className="block text-sm font-medium text-indigo-700">Statut</label>
              <select
                name="status"
                id="edit-status"
                value={formData.status}
                onChange={handleInputChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-indigo-900"
                required
              >
                <option value="Active">Actif</option>
                <option value="En congé">En congé</option>
                <option value="Retraité">Retraité</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
