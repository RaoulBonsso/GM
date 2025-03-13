/**
 * Utilitaires pour le formatage des dates, montants et autres données
 */

/**
 * Formate une date au format français
 */
export function formatDate(date: Date | string): string {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(dateObj);
}

/**
 * Formate une date avec l'heure au format français
 */
export function formatDateTime(date: Date | string): string {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj);
}

/**
 * Formate un montant en euros
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
}

/**
 * Calcule l'âge à partir d'une date de naissance
 */
export function calculateAge(birthDate: Date | string): number {
  if (!birthDate) return 0;
  
  const birthDateObj = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
  const today = new Date();
  
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * Formate un nom complet (prénom + nom)
 */
export function formatFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`.trim();
}

/**
 * Formate un numéro de téléphone français
 */
export function formatPhoneNumber(phoneNumber: string): string {
  if (!phoneNumber) return '';
  
  // Supprime tous les caractères non numériques
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Format français: XX XX XX XX XX
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
  }
  
  return phoneNumber;
}

/**
 * Tronque un texte à une longueur maximale
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return `${text.substring(0, maxLength)}...`;
}

/**
 * Formate une année académique (ex: 2023-2024)
 */
export function formatAcademicYear(year: string | number): string {
  if (!year) return '';
  
  const startYear = typeof year === 'string' ? parseInt(year) : year;
  const endYear = startYear + 1;
  
  return `${startYear}-${endYear}`;
}

/**
 * Génère un numéro de reçu unique
 */
export function generateReceiptNumber(): string {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000);
  
  return `REC-${timestamp}-${random}`;
}

/**
 * Convertit une chaîne en slug (pour les URLs)
 */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}
