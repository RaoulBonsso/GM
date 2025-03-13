"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
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
  address?: string;
  education?: string;
  bio?: string;
  attendance?: {
    present: number;
    absent: number;
    late: number;
    total: number;
  };
  performance?: {
    rating: number;
    reviews: number;
    studentSuccess: number;
  };
}

// Données fictives pour l'enseignant
const teachersData: Record<string, Teacher> = {
  '1': {
    id: '1',
    firstName: 'Souleymane',
    lastName: 'Bah',
    gender: 'M',
    email: 'souleymane.bah@example.com',
    phone: '620123456',
    subject: 'Mathématiques',
    classes: ['CM2-A', 'CM1-B', 'CE2-A'],
    joinDate: '2020-09-01',
    status: 'Active',
    address: '123 Rue Principale, Conakry',
    education: 'Master en Mathématiques, Université de Conakry',
    bio: 'Enseignant passionné avec plus de 5 ans d\'expérience dans l\'enseignement des mathématiques. Spécialisé dans les méthodes d\'apprentissage interactives et l\'utilisation de la technologie en classe.',
    attendance: {
      present: 85,
      absent: 5,
      late: 10,
      total: 100,
    },
    performance: {
      rating: 4.8,
      reviews: 45,
      studentSuccess: 92,
    },
  },
  '2': {
    id: '2',
    firstName: 'Fatoumata',
    lastName: 'Camara',
    gender: 'F',
    email: 'fatoumata.camara@example.com',
    phone: '620789012',
    subject: 'Français',
    classes: ['CE1-A', 'CE1-B', 'CP-A'],
    joinDate: '2018-09-01',
    status: 'Active',
    address: '456 Avenue de la République, Conakry',
    education: 'Licence en Lettres Modernes, Université de Conakry',
    bio: 'Enseignante dévouée avec une passion pour la littérature française et africaine. Encourage la créativité et l\'expression personnelle chez ses élèves.',
    attendance: {
      present: 90,
      absent: 3,
      late: 7,
      total: 100,
    },
    performance: {
      rating: 4.7,
      reviews: 38,
      studentSuccess: 88,
    },
  },
};

export default function TeacherDetailPage() {
  const params = useParams();
  const router = useRouter();
  const teacherId = params.id as string;
  
  // État pour les modales
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Récupérer les données de l'enseignant (dans une application réelle, cela viendrait d'une API)
  const teacher = teachersData[teacherId];
  
  // Si l'enseignant n'existe pas, afficher un message d'erreur
  if (!teacher) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h1 className="text-2xl font-bold text-indigo-800 mb-4">Enseignant non trouvé</h1>
        <p className="text-indigo-600 mb-6">L'enseignant que vous recherchez n'existe pas ou a été supprimé.</p>
        <Button 
          variant="primary"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          onClick={() => router.push('/dashboard/teachers')}
        >
          Retour à la liste des enseignants
        </Button>
      </div>
    );
  }
  
  // Formatage de la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };
  
  // Calculer le pourcentage de présence
  const calculateAttendancePercentage = (type: 'present' | 'absent' | 'late') => {
    if (!teacher.attendance) return 0;
    return (teacher.attendance[type] / teacher.attendance.total) * 100;
  };
  
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
  
  // Gérer la suppression de l'enseignant
  const handleDeleteTeacher = () => {
    console.log('Suppression de l\'enseignant:', teacher.id);
    // Dans une application réelle, cela enverrait une requête à l'API
    setIsDeleteModalOpen(false);
    router.push('/dashboard/teachers');
  };
  
  return (
    <div className="space-y-6">
      {/* En-tête avec les informations de base et les actions */}
      <motion.div 
        className="bg-white rounded-lg shadow-md overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mr-4 border-2 border-indigo-300">
                <span className="text-2xl font-bold text-indigo-700">
                  {teacher.firstName.charAt(0)}{teacher.lastName.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-indigo-800">{teacher.lastName} {teacher.firstName}</h1>
                <p className="text-indigo-600">{teacher.subject}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="light"
                className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition-all duration-300"
                onClick={() => setIsEditModalOpen(true)}
              >
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Modifier
              </Button>
              <Button 
                variant="light"
                className="bg-red-100 hover:bg-red-200 text-red-700 transition-all duration-300"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Supprimer
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center text-indigo-700">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {teacher.email}
            </div>
            <div className="flex items-center text-indigo-700">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {teacher.phone}
            </div>
            <div className="flex items-center text-indigo-700">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Depuis {formatDate(teacher.joinDate)}
            </div>
          </div>
          
          <div className="flex items-center">
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
              teacher.status === 'Active' 
                ? 'bg-green-100 text-green-800' 
                : teacher.status === 'En congé' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-gray-100 text-gray-800'
            }`}>
              {teacher.status}
            </span>
          </div>
        </div>
      </motion.div>
      
      {/* Contenu principal */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Colonne de gauche - Informations personnelles */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="h-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-indigo-800 mb-4">Informations personnelles</h2>
              
              <div className="space-y-4">
                {teacher.address && (
                  <div>
                    <h3 className="text-sm font-medium text-indigo-600">Adresse</h3>
                    <p className="text-indigo-900">{teacher.address}</p>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-medium text-indigo-600">Genre</h3>
                  <p className="text-indigo-900">{teacher.gender === 'M' ? 'Masculin' : 'Féminin'}</p>
                </div>
                
                {teacher.education && (
                  <div>
                    <h3 className="text-sm font-medium text-indigo-600">Formation</h3>
                    <p className="text-indigo-900">{teacher.education}</p>
                  </div>
                )}
                
                {teacher.bio && (
                  <div>
                    <h3 className="text-sm font-medium text-indigo-600">Biographie</h3>
                    <p className="text-indigo-900">{teacher.bio}</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
        
        {/* Colonne centrale - Classes et performance */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="mb-6">
            <div className="p-6">
              <h2 className="text-xl font-bold text-indigo-800 mb-4">Classes enseignées</h2>
              
              <div className="space-y-3">
                {teacher.classes.map((cls) => (
                  <div 
                    key={cls} 
                    className="p-3 bg-indigo-50 rounded-lg flex justify-between items-center hover:bg-indigo-100 transition-all duration-300 cursor-pointer"
                    onClick={() => router.push(`/dashboard/classes/${cls}`)}
                  >
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-indigo-200 flex items-center justify-center mr-3">
                        <span className="text-sm font-bold text-indigo-700">{cls.charAt(0)}</span>
                      </div>
                      <span className="text-indigo-800 font-medium">{cls}</span>
                    </div>
                    <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          
          {teacher.performance && (
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold text-indigo-800 mb-4">Performance</h2>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-sm font-medium text-indigo-600">Évaluation globale</h3>
                      <span className="text-indigo-900 font-bold">{teacher.performance.rating}/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2.5 rounded-full" 
                        style={{ width: `${(teacher.performance.rating / 5) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-indigo-500 mt-1">{teacher.performance.reviews} évaluations</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-sm font-medium text-indigo-600">Réussite des élèves</h3>
                      <span className="text-indigo-900 font-bold">{teacher.performance.studentSuccess}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-green-600 h-2.5 rounded-full" 
                        style={{ width: `${teacher.performance.studentSuccess}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </motion.div>
        
        {/* Colonne de droite - Assiduité et statistiques */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          {teacher.attendance && (
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold text-indigo-800 mb-4">Assiduité</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-600">Présent</p>
                      <p className="text-xl font-bold text-green-700">{teacher.attendance.present}%</p>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-yellow-600">Retard</p>
                      <p className="text-xl font-bold text-yellow-700">{teacher.attendance.late}%</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-red-600">Absent</p>
                      <p className="text-xl font-bold text-red-700">{teacher.attendance.absent}%</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-indigo-600 mb-2">Présence</h3>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div 
                        className="bg-green-500 h-2.5 rounded-l-full" 
                        style={{ width: `${calculateAttendancePercentage('present')}%` }}
                      ></div>
                    </div>
                    
                    <h3 className="text-sm font-medium text-indigo-600 mb-2">Retard</h3>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div 
                        className="bg-yellow-500 h-2.5 rounded-l-full" 
                        style={{ width: `${calculateAttendancePercentage('late')}%` }}
                      ></div>
                    </div>
                    
                    <h3 className="text-sm font-medium text-indigo-600 mb-2">Absence</h3>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-red-500 h-2.5 rounded-l-full" 
                        style={{ width: `${calculateAttendancePercentage('absent')}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </motion.div>
      </motion.div>
      
      {/* Modal de suppression */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmer la suppression"
        size="sm"
        footer={
          <>
            <Button 
              variant="danger"
              className="bg-red-600 hover:bg-red-700 mr-2"
              onClick={handleDeleteTeacher}
            >
              Supprimer
            </Button>
            <Button 
              variant="light"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Annuler
            </Button>
          </>
        }
      >
        <div className="py-4">
          <p className="text-gray-700">
            Êtes-vous sûr de vouloir supprimer l'enseignant <span className="font-bold">{teacher.lastName} {teacher.firstName}</span> ?
          </p>
          <p className="text-gray-700 mt-2">
            Cette action est irréversible et supprimera toutes les données associées à cet enseignant.
          </p>
        </div>
      </Modal>
      
      {/* Modal de modification - à implémenter selon les besoins */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Modifier l'enseignant: ${teacher.lastName} ${teacher.firstName}`}
        size="lg"
        footer={
          <>
            <Button 
              variant="primary"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 mr-2"
              onClick={() => setIsEditModalOpen(false)}
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
        <div className="py-4">
          <p className="text-indigo-700 mb-4">
            Formulaire de modification de l'enseignant à implémenter selon les besoins.
          </p>
        </div>
      </Modal>
    </div>
  );
}
