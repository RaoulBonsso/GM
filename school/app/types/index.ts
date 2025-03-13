// Types pour les utilisateurs
export enum UserRole {
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER',
  SECRETARY = 'SECRETARY'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Types pour les élèves
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: Gender;
  address?: string;
  enrollmentDate: Date;
  isNewStudent: boolean;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
  classId: string;
  parentId: string;
  class?: Class;
  parent?: Parent;
  tuitionPayments?: TuitionPayment[];
  attendanceRecords?: AttendanceRecord[];
}

// Types pour les parents/tuteurs
export interface Parent {
  id: string;
  firstName: string;
  lastName: string;
  relationship: string;
  email?: string;
  phoneNumber: string;
  address?: string;
  occupation?: string;
  createdAt: Date;
  updatedAt: Date;
  students?: Student[];
}

// Types pour les classes
export interface Class {
  id: string;
  name: string;
  grade: string;
  academicYear: string;
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
  teacherId?: string;
  teacher?: Teacher;
  students?: Student[];
  attendanceSheets?: AttendanceSheet[];
}

// Types pour les enseignants
export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  subject?: string;
  qualification?: string;
  joinDate: Date;
  createdAt: Date;
  updatedAt: Date;
  classes?: Class[];
}

// Types pour les paiements de scolarité
export interface TuitionPayment {
  id: string;
  amount: number;
  paymentDate: Date;
  paymentMethod: string;
  receiptNumber?: string;
  academicYear: string;
  term: string;
  isPaid: boolean;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  studentId: string;
  student?: Student;
}

// Types pour les dépenses
export interface Expense {
  id: string;
  title: string;
  description?: string;
  amount: number;
  category: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: User;
}

// Types pour les notifications
export interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: User;
}

// Types pour les présences
export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  EXCUSED = 'EXCUSED'
}

export interface AttendanceRecord {
  id: string;
  date: Date;
  status: AttendanceStatus;
  remark?: string;
  createdAt: Date;
  updatedAt: Date;
  studentId: string;
  student?: Student;
  sheetId: string;
  sheet?: AttendanceSheet;
}

export interface AttendanceSheet {
  id: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  classId: string;
  class?: Class;
  records?: AttendanceRecord[];
}

// Types pour les statistiques
export interface SchoolStatistics {
  id: string;
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  totalIncome: number;
  totalExpenses: number;
  academicYear: string;
  term: string;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Types pour l'authentification
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

// Types pour les tableaux de bord
export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  totalParents: number;
  recentPayments: TuitionPayment[];
  recentExpenses: Expense[];
  notifications: Notification[];
}

// Types pour les formulaires
export interface StudentFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string;
  gender: Gender;
  address?: string;
  isNewStudent: boolean;
  remarks?: string;
  classId: string;
  parentId: string;
}

export interface ParentFormData {
  firstName: string;
  lastName: string;
  relationship: string;
  email?: string;
  phoneNumber: string;
  address?: string;
  occupation?: string;
}

export interface TuitionPaymentFormData {
  amount: number;
  paymentDate: Date | string;
  paymentMethod: string;
  receiptNumber?: string;
  academicYear: string;
  term: string;
  isPaid: boolean;
  dueDate: Date | string;
  studentId: string;
}

export interface ExpenseFormData {
  title: string;
  description?: string;
  amount: number;
  category: string;
  date: Date | string;
  userId: string;
}

// Types pour les réponses API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
