// Définition des rôles utilisateur
export enum UserRole {
  ADMIN = 'Administrateur',
  SECRETARY = 'Secrétaire',
  TEACHER = 'Enseignant',
  STUDENT = 'Élève',
  PARENT = 'Parent',
  DEVELOPER = 'Développeur'
}

// Types pour les élèves
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: 'M' | 'F';
  address: string;
  phone: string;
  email: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  classId: string;
  enrollmentDate: Date;
  status: 'active' | 'inactive';
}

// Types pour les classes
export interface Class {
  id: string;
  name: string;
  level: string;
  teacherId: string;
  academicYear: string;
  capacity: number;
  students: Student[];
}

// Types pour les paiements
export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  type: 'tuition' | 'supplies' | 'activities' | 'other';
  date: Date;
  status: 'pending' | 'completed' | 'failed';
  description?: string;
}

// Types pour les dépenses
export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: Date;
  approvedBy: string;
  description?: string;
}

// Types pour les utilisateurs
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
}
