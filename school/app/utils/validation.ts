import { z } from 'zod';
import { Gender, UserRole, AttendanceStatus } from '../types';

// Validation pour l'authentification
export const loginSchema = z.object({
  email: z.string().email({ message: 'Email invalide' }),
  password: z.string().min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
});

// Validation pour les utilisateurs
export const userSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  email: z.string().email({ message: 'Email invalide' }),
  password: z.string().min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
  role: z.nativeEnum(UserRole, { message: 'Rôle invalide' }),
  isActive: z.boolean().default(true),
});

export const updateUserSchema = userSchema.partial().omit({ password: true }).extend({
  password: z.string().min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }).optional(),
});

// Validation pour les élèves
export const studentSchema = z.object({
  firstName: z.string().min(2, { message: 'Le prénom doit contenir au moins 2 caractères' }),
  lastName: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  dateOfBirth: z.string().or(z.date()),
  gender: z.nativeEnum(Gender, { message: 'Genre invalide' }),
  address: z.string().optional(),
  isNewStudent: z.boolean().default(true),
  remarks: z.string().optional(),
  classId: z.string().uuid({ message: 'ID de classe invalide' }),
  parentId: z.string().uuid({ message: 'ID de parent invalide' }),
});

export const updateStudentSchema = studentSchema.partial();

// Validation pour les parents
export const parentSchema = z.object({
  firstName: z.string().min(2, { message: 'Le prénom doit contenir au moins 2 caractères' }),
  lastName: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  relationship: z.string().min(2, { message: 'La relation doit être spécifiée' }),
  email: z.string().email({ message: 'Email invalide' }).optional().nullable(),
  phoneNumber: z.string().min(10, { message: 'Numéro de téléphone invalide' }),
  address: z.string().optional().nullable(),
  occupation: z.string().optional().nullable(),
});

export const updateParentSchema = parentSchema.partial();

// Validation pour les classes
export const classSchema = z.object({
  name: z.string().min(2, { message: 'Le nom de la classe doit contenir au moins 2 caractères' }),
  grade: z.string().min(1, { message: 'Le niveau doit être spécifié' }),
  academicYear: z.string().min(4, { message: 'L\'année académique doit être spécifiée' }),
  capacity: z.number().int().positive({ message: 'La capacité doit être un nombre positif' }),
  teacherId: z.string().uuid({ message: 'ID d\'enseignant invalide' }).optional().nullable(),
});

export const updateClassSchema = classSchema.partial();

// Validation pour les enseignants
export const teacherSchema = z.object({
  firstName: z.string().min(2, { message: 'Le prénom doit contenir au moins 2 caractères' }),
  lastName: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  email: z.string().email({ message: 'Email invalide' }),
  phoneNumber: z.string().min(10, { message: 'Numéro de téléphone invalide' }),
  subject: z.string().optional().nullable(),
  qualification: z.string().optional().nullable(),
  joinDate: z.string().or(z.date()),
});

export const updateTeacherSchema = teacherSchema.partial();

// Validation pour les paiements de scolarité
export const tuitionPaymentSchema = z.object({
  amount: z.number().positive({ message: 'Le montant doit être positif' }),
  paymentDate: z.string().or(z.date()),
  paymentMethod: z.string().min(2, { message: 'La méthode de paiement doit être spécifiée' }),
  receiptNumber: z.string().optional().nullable(),
  academicYear: z.string().min(4, { message: 'L\'année académique doit être spécifiée' }),
  term: z.string().min(1, { message: 'Le trimestre doit être spécifié' }),
  isPaid: z.boolean().default(false),
  dueDate: z.string().or(z.date()),
  studentId: z.string().uuid({ message: 'ID d\'élève invalide' }),
});

export const updateTuitionPaymentSchema = tuitionPaymentSchema.partial();

// Validation pour les dépenses
export const expenseSchema = z.object({
  title: z.string().min(2, { message: 'Le titre doit contenir au moins 2 caractères' }),
  description: z.string().optional().nullable(),
  amount: z.number().positive({ message: 'Le montant doit être positif' }),
  category: z.string().min(2, { message: 'La catégorie doit être spécifiée' }),
  date: z.string().or(z.date()),
  userId: z.string().uuid({ message: 'ID d\'utilisateur invalide' }),
});

export const updateExpenseSchema = expenseSchema.partial();

// Validation pour les présences
export const attendanceRecordSchema = z.object({
  date: z.string().or(z.date()),
  status: z.nativeEnum(AttendanceStatus, { message: 'Statut de présence invalide' }),
  remark: z.string().optional().nullable(),
  studentId: z.string().uuid({ message: 'ID d\'élève invalide' }),
  sheetId: z.string().uuid({ message: 'ID de feuille de présence invalide' }),
});

export const updateAttendanceRecordSchema = attendanceRecordSchema.partial();

// Validation pour les feuilles de présence
export const attendanceSheetSchema = z.object({
  date: z.string().or(z.date()),
  classId: z.string().uuid({ message: 'ID de classe invalide' }),
});

export const updateAttendanceSheetSchema = attendanceSheetSchema.partial();

// Validation pour les notifications
export const notificationSchema = z.object({
  title: z.string().min(2, { message: 'Le titre doit contenir au moins 2 caractères' }),
  message: z.string().min(2, { message: 'Le message doit contenir au moins 2 caractères' }),
  userId: z.string().uuid({ message: 'ID d\'utilisateur invalide' }),
});

export const updateNotificationSchema = notificationSchema.partial();
