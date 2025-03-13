import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { autoTable, RowInput } from 'jspdf-autotable';
import { Student } from '../../types/index';

// Ajout des types pour jsPDF
declare module 'jspdf' {
  interface jsPDF {
    autoTable: typeof autoTable;
  }
}

// Types pour les différentes entités qui ne sont pas importés

interface Teacher {
  id: string;
  name: string;
  subject?: string;
  email?: string;
  phone?: string;
  qualification?: string;
  joiningDate?: string;
  status?: string;
}

interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  paymentMethod: string;
  approvedBy: string;
  status: string;
}

interface Payment {
  id: string;
  student: {
    id: string;
    name: string;
    class: string;
  };
  amount: number;
  date: string;
  description: string;
  status: string;
  paymentMethod: string;
}

// Configuration générale du PDF
const pdfConfig = {
  // Couleurs principales
  headerColor: [66, 83, 175] as [number, number, number], // Bleu-violet
  secondaryColor: [100, 116, 200] as [number, number, number], // Bleu-violet plus clair
  accentColor: [142, 68, 173] as [number, number, number], // Violet
  textColor: [50, 50, 50] as [number, number, number], // Gris foncé pour meilleure lisibilité
  lightTextColor: [100, 100, 100] as [number, number, number], // Gris clair pour texte secondaire
  
  // Tailles de police
  titleFontSize: 22,
  subtitleFontSize: 16,
  sectionTitleFontSize: 14,
  normalFontSize: 10,
  smallFontSize: 8,
  
  // Marges et espacement
  margin: 15,
  lineHeight: 7,
  
  // Logo de l'école
  logo: {
    path: '/logo.png',
    width: 40,
    height: 40
  },
  
  // Styles pour les tableaux
  tableStyles: {
    headBackgroundColor: [66, 83, 175] as [number, number, number],
    headTextColor: [255, 255, 255] as [number, number, number],
    alternateRowBackgroundColor: [240, 240, 255] as [number, number, number],
    borderColor: [200, 200, 200] as [number, number, number]
  },
  
  // Informations de l'école
  schoolInfo: {
    name: "École Primaire Excellence",
    address: "Quartier Almamya, Kaloum, Conakry",
    phone: "+224 620 12 34 56",
    email: "contact@ecole-excellence.gn"
  }
};

// Fonction pour formater la date
const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR');
};

// Fonction pour formater le montant
const formatAmount = (amount: number): string => {
  return amount.toLocaleString('fr-FR') + ' F';
};

// Fonction pour ajouter l'en-tête du document
const addDocumentHeader = (doc: jsPDF, title: string, subtitle?: string): void => {
  const pageWidth = (doc as any).internal.pageSize.width;
  
  // Fond coloré pour l'en-tête avec dégradé
  const gradient = doc.setFillColor(pdfConfig.headerColor[0], pdfConfig.headerColor[1], pdfConfig.headerColor[2]);
  doc.rect(0, 0, pageWidth, 35, 'F');
  
  // Bande décorative sous l'en-tête principal
  doc.setFillColor(pdfConfig.accentColor[0], pdfConfig.accentColor[1], pdfConfig.accentColor[2]);
  doc.rect(0, 35, pageWidth, 3, 'F');
  
  // Informations de l'école (en blanc sur le fond coloré)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text(pdfConfig.schoolInfo.name.toUpperCase(), pageWidth / 2, 15, { align: 'center' });
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(pdfConfig.schoolInfo.address, pageWidth / 2, 22, { align: 'center' });
  doc.text(`Tél: ${pdfConfig.schoolInfo.phone} | Email: ${pdfConfig.schoolInfo.email}`, pageWidth / 2, 28, { align: 'center' });
  
  // Logo (à remplacer par votre logo)
  // doc.addImage(pdfConfig.logo.path, 'PNG', pdfConfig.margin, 5, pdfConfig.logo.width, pdfConfig.logo.height);
  
  // Cadre pour le titre
  doc.setFillColor(250, 250, 255);
  doc.setDrawColor(pdfConfig.headerColor[0], pdfConfig.headerColor[1], pdfConfig.headerColor[2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(pageWidth / 2 - 80, 45, 160, subtitle ? 30 : 20, 3, 3, 'FD');
  
  // Titre du document (dans le cadre)
  doc.setFontSize(pdfConfig.titleFontSize);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(pdfConfig.headerColor[0], pdfConfig.headerColor[1], pdfConfig.headerColor[2]);
  doc.text(title, pageWidth / 2, 55, { align: 'center' });
  
  // Sous-titre
  if (subtitle) {
    doc.setFontSize(pdfConfig.subtitleFontSize);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(pdfConfig.textColor[0], pdfConfig.textColor[1], pdfConfig.textColor[2]);
    doc.text(subtitle, pageWidth / 2, 65, { align: 'center' });
  }
  
  // Date d'impression avec icône
  doc.setFontSize(pdfConfig.smallFontSize);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(pdfConfig.lightTextColor[0], pdfConfig.lightTextColor[1], pdfConfig.lightTextColor[2]);
  const today = new Date().toLocaleDateString('fr-FR');
  doc.text(`Document généré le ${today}`, pageWidth - pdfConfig.margin, subtitle ? 75 : 70, { align: 'right' });
};

// Fonction pour ajouter le pied de page
const addDocumentFooter = (doc: jsPDF): void => {
  // Obtenir le nombre de pages (méthode sûre pour jsPDF)
  const pageCount = (doc as any).internal.getNumberOfPages ? (doc as any).internal.getNumberOfPages() : 1;
  const pageWidth = (doc as any).internal.pageSize.width;
  const pageHeight = (doc as any).internal.pageSize.height;
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Bande décorative au-dessus du pied de page
    doc.setFillColor(pdfConfig.accentColor[0], pdfConfig.accentColor[1], pdfConfig.accentColor[2]);
    doc.rect(0, pageHeight - 25, pageWidth, 2, 'F');
    
    // Fond coloré pour le pied de page
    doc.setFillColor(pdfConfig.headerColor[0], pdfConfig.headerColor[1], pdfConfig.headerColor[2], 0.1); // Fond légèrement teinté
    doc.rect(0, pageHeight - 23, pageWidth, 23, 'F');
    
    // Cadre pour le numéro de page
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(pdfConfig.headerColor[0], pdfConfig.headerColor[1], pdfConfig.headerColor[2]);
    doc.setLineWidth(0.3);
    doc.roundedRect(pageWidth / 2 - 20, pageHeight - 18, 40, 12, 2, 2, 'FD');
    
    // Numéro de page
    doc.setFontSize(pdfConfig.smallFontSize);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(pdfConfig.headerColor[0], pdfConfig.headerColor[1], pdfConfig.headerColor[2]);
    doc.text(`Page ${i}/${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    
    // Informations de contact de l'école
    doc.setFontSize(pdfConfig.smallFontSize);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(pdfConfig.textColor[0], pdfConfig.textColor[1], pdfConfig.textColor[2]);
    doc.text(`${pdfConfig.schoolInfo.name} | Tél: ${pdfConfig.schoolInfo.phone}`, pdfConfig.margin, pageHeight - 10);
    
    // Copyright
    doc.setTextColor(pdfConfig.textColor[0], pdfConfig.textColor[1], pdfConfig.textColor[2]);
    doc.text(`© ${new Date().getFullYear()} - Tous droits réservés`, pageWidth - pdfConfig.margin, pageHeight - 10, { align: 'right' });
  }
};

// Fonction pour générer un PDF de la liste des élèves
export const generateStudentListPDF = (students: Student[], title: string = 'Liste des élèves'): void => {
  const doc = new jsPDF();
  
  // Ajouter l'en-tête
  addDocumentHeader(doc, title, `Total: ${students.length} élèves`);
  
  // Définir les colonnes du tableau
  const columns = [
    { header: 'ID', dataKey: 'id' },
    { header: 'Nom', dataKey: 'name' },
    { header: 'Classe', dataKey: 'class' },
    { header: 'Genre', dataKey: 'gender' },
    { header: 'Date de naissance', dataKey: 'formattedDOB' },
    { header: 'Parent', dataKey: 'parentName' },
    { header: 'Contact', dataKey: 'parentContact' },
    { header: 'Statut', dataKey: 'status' }
  ];
  
  // Préparer les données
  const data = students.map(student => ({
    ...student,
    formattedDOB: formatDate(student.dateOfBirth || '')
  }));
  
  // Générer le tableau
  autoTable(doc, {
    startY: 75, // Position ajustée pour le nouvel en-tête
    head: [columns.map(col => col.header)],
    body: data.map(student => columns.map(col => student[col.dataKey as keyof typeof student] || '')) as RowInput[],
    theme: 'grid',
    headStyles: {
      fillColor: pdfConfig.tableStyles.headBackgroundColor,
      textColor: pdfConfig.tableStyles.headTextColor,
      fontStyle: 'bold',
      halign: 'center'
    },
    styles: {
      fontSize: pdfConfig.normalFontSize,
      cellPadding: 6,
      overflow: 'linebreak',
      lineWidth: 0.1,
      lineColor: pdfConfig.tableStyles.borderColor
    },
    alternateRowStyles: {
      fillColor: pdfConfig.tableStyles.alternateRowBackgroundColor
    },
    columnStyles: {
      0: { cellWidth: 15, halign: 'center' }, // ID
      1: { cellWidth: 40 }, // Nom
      2: { cellWidth: 20, halign: 'center' }, // Classe
      3: { cellWidth: 20, halign: 'center' }, // Genre
      4: { cellWidth: 30, halign: 'center' }, // Date de naissance
      5: { cellWidth: 40 }, // Parent
      6: { cellWidth: 30 }, // Contact
      7: { cellWidth: 20, halign: 'center' } // Statut
    },
    didDrawPage: (data) => {
      // Ajouter une légende ou des informations supplémentaires sous le tableau
      if (data.cursor && data.cursor.y < (doc as any).internal.pageSize.height - 40) {
        doc.setFontSize(pdfConfig.smallFontSize);
        doc.setTextColor(pdfConfig.lightTextColor[0], pdfConfig.lightTextColor[1], pdfConfig.lightTextColor[2]);
        doc.text('* Cette liste est générée automatiquement par le système de gestion scolaire.', pdfConfig.margin, data.cursor.y + 15);
      }
    }
  });
  
  // Ajouter le pied de page
  addDocumentFooter(doc);
  
  // Télécharger le PDF
  doc.save(`liste_eleves_${new Date().toISOString().split('T')[0]}.pdf`);
};

// Fonction pour générer un PDF de la liste des enseignants
export const generateTeacherListPDF = (teachers: Teacher[], title: string = 'Liste des enseignants'): void => {
  const doc = new jsPDF();
  
  // Ajouter l'en-tête
  addDocumentHeader(doc, title, `Total: ${teachers.length} enseignants`);
  
  // Définir les colonnes du tableau
  const columns = [
    { header: 'ID', dataKey: 'id' },
    { header: 'Nom', dataKey: 'name' },
    { header: 'Matière', dataKey: 'subject' },
    { header: 'Email', dataKey: 'email' },
    { header: 'Téléphone', dataKey: 'phone' },
    { header: 'Qualification', dataKey: 'qualification' },
    { header: 'Date d\'embauche', dataKey: 'formattedJoiningDate' },
    { header: 'Statut', dataKey: 'status' }
  ];
  
  // Préparer les données
  const data = teachers.map(teacher => ({
    ...teacher,
    formattedJoiningDate: formatDate(teacher.joiningDate || '')
  }));
  
  // Générer le tableau
  autoTable(doc, {
    startY: 40,
    head: [columns.map(col => col.header)],
    body: data.map(teacher => columns.map(col => teacher[col.dataKey as keyof typeof teacher] || '')) as RowInput[],
    theme: 'grid',
    headStyles: {
      fillColor: pdfConfig.headerColor as [number, number, number],
      textColor: [255, 255, 255] as [number, number, number],
      fontStyle: 'bold'
    },
    styles: {
      fontSize: pdfConfig.normalFontSize,
      cellPadding: 5
    },
    alternateRowStyles: {
      fillColor: [240, 240, 255]
    }
  });
  
  // Ajouter le pied de page
  addDocumentFooter(doc);
  
  // Télécharger le PDF
  doc.save(`liste_enseignants_${new Date().toISOString().split('T')[0]}.pdf`);
};

// Fonction pour générer un PDF de la liste des dépenses
export const generateExpenseListPDF = (expenses: Expense[], title: string = 'Liste des dépenses'): void => {
  const doc = new jsPDF();
  
  // Calculer le total des dépenses approuvées
  const totalApprovedExpenses = expenses
    .filter(expense => expense.status === 'Approuvé')
    .reduce((total, expense) => total + expense.amount, 0);
  
  // Ajouter l'en-tête
  addDocumentHeader(doc, title, `Total: ${expenses.length} dépenses | Montant total approuvé: ${formatAmount(totalApprovedExpenses)}`);
  
  // Définir les colonnes du tableau
  const columns = [
    { header: 'ID', dataKey: 'id' },
    { header: 'Titre', dataKey: 'title' },
    { header: 'Montant', dataKey: 'formattedAmount' },
    { header: 'Date', dataKey: 'formattedDate' },
    { header: 'Catégorie', dataKey: 'category' },
    { header: 'Méthode', dataKey: 'paymentMethod' },
    { header: 'Approuvé par', dataKey: 'approvedBy' },
    { header: 'Statut', dataKey: 'status' }
  ];
  
  // Préparer les données
  const data = expenses.map(expense => ({
    ...expense,
    formattedAmount: formatAmount(expense.amount),
    formattedDate: formatDate(expense.date)
  }));
  
  // Générer le tableau
  autoTable(doc, {
    startY: 40,
    head: [columns.map(col => col.header)],
    body: data.map(expense => columns.map(col => expense[col.dataKey as keyof typeof expense] || '')) as RowInput[],
    theme: 'grid',
    headStyles: {
      fillColor: pdfConfig.headerColor as [number, number, number],
      textColor: [255, 255, 255] as [number, number, number],
      fontStyle: 'bold'
    },
    styles: {
      fontSize: pdfConfig.normalFontSize,
      cellPadding: 5
    },
    alternateRowStyles: {
      fillColor: [240, 240, 255]
    }
  });
  
  // Ajouter le pied de page
  addDocumentFooter(doc);
  
  // Télécharger le PDF
  doc.save(`liste_depenses_${new Date().toISOString().split('T')[0]}.pdf`);
};

// Fonction pour générer un PDF de la liste des paiements
export const generatePaymentListPDF = (payments: Payment[], title: string = 'Liste des paiements'): void => {
  const doc = new jsPDF();
  
  // Calculer le total des paiements
  const totalPayments = payments
    .filter(payment => payment.status === 'Payé')
    .reduce((total, payment) => total + payment.amount, 0);
  
  // Ajouter l'en-tête
  addDocumentHeader(doc, title, `Total: ${payments.length} paiements | Montant total: ${formatAmount(totalPayments)}`);
  
  // Définir les colonnes du tableau
  const columns = [
    { header: 'ID', dataKey: 'id' },
    { header: 'Élève', dataKey: 'studentName' },
    { header: 'Classe', dataKey: 'studentClass' },
    { header: 'Montant', dataKey: 'formattedAmount' },
    { header: 'Date', dataKey: 'formattedDate' },
    { header: 'Description', dataKey: 'description' },
    { header: 'Méthode', dataKey: 'paymentMethod' },
    { header: 'Statut', dataKey: 'status' }
  ];
  
  // Préparer les données
  const data = payments.map(payment => ({
    ...payment,
    studentName: payment.student.name,
    studentClass: payment.student.class,
    formattedAmount: formatAmount(payment.amount),
    formattedDate: formatDate(payment.date)
  }));
  
  // Générer le tableau
  autoTable(doc, {
    startY: 75, // Position ajustée pour le nouvel en-tête
    head: [columns.map(col => col.header)],
    body: data.map(payment => columns.map(col => payment[col.dataKey as keyof typeof payment] || '')) as RowInput[],
    theme: 'grid',
    headStyles: {
      fillColor: pdfConfig.tableStyles.headBackgroundColor,
      textColor: pdfConfig.tableStyles.headTextColor,
      fontStyle: 'bold',
      halign: 'center'
    },
    styles: {
      fontSize: pdfConfig.normalFontSize,
      cellPadding: 6,
      overflow: 'linebreak',
      lineWidth: 0.1,
      lineColor: pdfConfig.tableStyles.borderColor
    },
    alternateRowStyles: {
      fillColor: pdfConfig.tableStyles.alternateRowBackgroundColor
    },
    columnStyles: {
      0: { cellWidth: 15, halign: 'center' }, // ID
      1: { cellWidth: 35 }, // Élève
      2: { cellWidth: 20, halign: 'center' }, // Classe
      3: { cellWidth: 25, halign: 'right' }, // Montant
      4: { cellWidth: 25, halign: 'center' }, // Date
      5: { cellWidth: 30 }, // Description
      6: { cellWidth: 20, halign: 'center' }, // Méthode
      7: { cellWidth: 20, halign: 'center' } // Statut
    },
    didDrawPage: (data) => {
      // Ajouter des informations sur le total des paiements
      if (data.cursor && data.cursor.y < (doc as any).internal.pageSize.height - 40) {
        const totalAmount = payments
          .filter(payment => payment.status === 'Payé')
          .reduce((total, payment) => total + payment.amount, 0);
        
        doc.setFontSize(pdfConfig.normalFontSize);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(pdfConfig.headerColor[0], pdfConfig.headerColor[1], pdfConfig.headerColor[2]);
        doc.text(`Total des paiements: ${formatAmount(totalAmount)}`, (doc as any).internal.pageSize.width - pdfConfig.margin, data.cursor.y + 15, { align: 'right' });
      }
    }
  });
  
  // Ajouter le pied de page
  addDocumentFooter(doc);
  
  // Télécharger le PDF
  doc.save(`liste_paiements_${new Date().toISOString().split('T')[0]}.pdf`);
};

// Fonction pour générer un PDF pour une fiche individuelle d'élève
export const generateStudentDetailPDF = (student: Student): void => {
  const doc = new jsPDF();
  const pageWidth = (doc as any).internal.pageSize.width;
  const pageHeight = (doc as any).internal.pageSize.height;
  
  // Ajouter l'en-tête
  addDocumentHeader(doc, 'FICHE INDIVIDUELLE D\'ÉLÈVE', `Année scolaire ${new Date().getFullYear()}-${new Date().getFullYear() + 1}`);
  
  // Définir les positions de départ
  const startY = 80;
  const lineHeight = pdfConfig.lineHeight;
  
  // Cadre pour le titre et la photo
  doc.setFillColor(250, 250, 255);
  doc.setDrawColor(pdfConfig.headerColor[0], pdfConfig.headerColor[1], pdfConfig.headerColor[2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(pdfConfig.margin, startY, pageWidth - (pdfConfig.margin * 2), 40, 3, 3, 'FD');
  
  // Nom de l'élève en grand
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(pdfConfig.headerColor[0], pdfConfig.headerColor[1], pdfConfig.headerColor[2]);
  doc.text(student.name.toUpperCase(), pageWidth / 2, startY + 15, { align: 'center' });
  
  // Identifiant de l'élève
  doc.setFontSize(pdfConfig.normalFontSize);
  doc.setTextColor(pdfConfig.textColor[0], pdfConfig.textColor[1], pdfConfig.textColor[2]);
  doc.text(`Identifiant: ${student.id}`, pageWidth / 2, startY + 25, { align: 'center' });
  
  // Classe actuelle
  doc.setFillColor(pdfConfig.accentColor[0], pdfConfig.accentColor[1], pdfConfig.accentColor[2], 0.2);
  doc.roundedRect(pageWidth / 2 - 30, startY + 28, 60, 10, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(pdfConfig.headerColor[0], pdfConfig.headerColor[1], pdfConfig.headerColor[2]);
  doc.text(`Classe: ${student.class || '-'}`, pageWidth / 2, startY + 35, { align: 'center' });
  
  // Cadre pour la photo d'identité
  const photoX = pageWidth - pdfConfig.margin - 40;
  const photoY = startY + 5;
  const photoWidth = 30;
  const photoHeight = 30;
  
  doc.setDrawColor(pdfConfig.headerColor[0], pdfConfig.headerColor[1], pdfConfig.headerColor[2]);
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(photoX, photoY, photoWidth, photoHeight, 2, 2, 'FD');
  
  // Texte "PHOTO" dans le cadre
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('PHOTO', photoX + photoWidth / 2, photoY + photoHeight / 2, { align: 'center' });
  
  // Cadre d'information principal - Informations personnelles
  doc.setFillColor(250, 250, 255);
  doc.setDrawColor(pdfConfig.headerColor[0], pdfConfig.headerColor[1], pdfConfig.headerColor[2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(pdfConfig.margin, startY + 50, pageWidth - (pdfConfig.margin * 2), 70, 3, 3, 'FD');
  
  // Titre de la section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(pdfConfig.sectionTitleFontSize);
  doc.setTextColor(pdfConfig.headerColor[0], pdfConfig.headerColor[1], pdfConfig.headerColor[2]);
  doc.text('INFORMATIONS PERSONNELLES', pageWidth / 2, startY + 60, { align: 'center' });
  
  // Ligne de séparation sous le titre
  doc.setDrawColor(pdfConfig.accentColor[0], pdfConfig.accentColor[1], pdfConfig.accentColor[2]);
  doc.setLineWidth(0.3);
  doc.line(pdfConfig.margin + 20, startY + 65, pageWidth - pdfConfig.margin - 20, startY + 65);
  
  // Informations personnelles en deux colonnes
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(pdfConfig.normalFontSize);
  doc.setTextColor(pdfConfig.textColor[0], pdfConfig.textColor[1], pdfConfig.textColor[2]);
  
  // Colonne gauche
  const col1X = pdfConfig.margin + 10;
  doc.setFont('helvetica', 'bold');
  doc.text('Genre:', col1X, startY + 75);
  doc.text('Date de naissance:', col1X, startY + 75 + lineHeight);
  doc.text('Lieu de naissance:', col1X, startY + 75 + lineHeight * 2);
  doc.text('Nationalité:', col1X, startY + 75 + lineHeight * 3);
  doc.text('Adresse:', col1X, startY + 75 + lineHeight * 4);
  
  // Colonne droite
  const col2X = pageWidth / 2 + 10;
  doc.setFont('helvetica', 'bold');
  doc.text('Statut:', col2X, startY + 75);
  doc.text('Date d\'inscription:', col2X, startY + 75 + lineHeight);
  doc.text('Année scolaire:', col2X, startY + 75 + lineHeight * 2);
  doc.text('Email:', col2X, startY + 75 + lineHeight * 3);
  doc.text('Téléphone:', col2X, startY + 75 + lineHeight * 4);
  
  // Valeurs colonne gauche
  doc.setFont('helvetica', 'normal');
  doc.text(student.gender || '-', col1X + 45, startY + 75);
  doc.text(student.dateOfBirth ? formatDate(student.dateOfBirth) : '-', col1X + 45, startY + 75 + lineHeight);
  doc.text(student.birthPlace || '-', col1X + 45, startY + 75 + lineHeight * 2);
  doc.text(student.nationality || '-', col1X + 45, startY + 75 + lineHeight * 3);
  
  // Gérer l'adresse potentiellement longue
  const address = student.address || '-';
  if (address.length > 30) {
    const firstLine = address.substring(0, 30);
    const secondLine = address.substring(30);
    doc.text(firstLine, col1X + 45, startY + 75 + lineHeight * 4);
    doc.text(secondLine, col1X + 45, startY + 75 + lineHeight * 5);
  } else {
    doc.text(address, col1X + 45, startY + 75 + lineHeight * 4);
  }
  
  // Valeurs colonne droite
  doc.setFont('helvetica', 'normal');
  doc.text(student.status || 'Actif', col2X + 45, startY + 75);
  doc.text(student.enrollmentDate ? formatDate(student.enrollmentDate) : '-', col2X + 45, startY + 75 + lineHeight);
  doc.text(`${new Date().getFullYear()}-${new Date().getFullYear() + 1}`, col2X + 45, startY + 75 + lineHeight * 2);
  doc.text(student.email || '-', col2X + 45, startY + 75 + lineHeight * 3);
  doc.text(student.phone || '-', col2X + 45, startY + 75 + lineHeight * 4);
  
  // Section des informations du parent/tuteur
  doc.setFillColor(250, 250, 255);
  doc.roundedRect(pdfConfig.margin, startY + 130, pageWidth - (pdfConfig.margin * 2), 60, 3, 3, 'FD');
  
  // Titre de la section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(pdfConfig.sectionTitleFontSize);
  doc.setTextColor(pdfConfig.headerColor[0], pdfConfig.headerColor[1], pdfConfig.headerColor[2]);
  doc.text('INFORMATIONS DU PARENT/TUTEUR', pageWidth / 2, startY + 140, { align: 'center' });
  
  // Ligne de séparation sous le titre
  doc.setDrawColor(pdfConfig.accentColor[0], pdfConfig.accentColor[1], pdfConfig.accentColor[2]);
  doc.setLineWidth(0.3);
  doc.line(pdfConfig.margin + 20, startY + 145, pageWidth - pdfConfig.margin - 20, startY + 145);
  
  // Informations du parent
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(pdfConfig.normalFontSize);
  doc.setTextColor(pdfConfig.textColor[0], pdfConfig.textColor[1], pdfConfig.textColor[2]);
  
  // Colonne gauche - Parent
  doc.setFont('helvetica', 'bold');
  doc.text('Nom du parent/tuteur:', col1X, startY + 155);
  doc.text('Profession:', col1X, startY + 155 + lineHeight);
  doc.text('Relation avec l\'élève:', col1X, startY + 155 + lineHeight * 2);
  
  // Colonne droite - Parent
  doc.setFont('helvetica', 'bold');
  doc.text('Téléphone:', col2X, startY + 155);
  doc.text('Email:', col2X, startY + 155 + lineHeight);
  doc.text('Adresse:', col2X, startY + 155 + lineHeight * 2);
  
  // Valeurs colonne gauche - Parent
  doc.setFont('helvetica', 'normal');
  doc.text(student.parentName || '-', col1X + 45, startY + 155);
  doc.text(student.parentProfession || '-', col1X + 45, startY + 155 + lineHeight);
  doc.text(student.parentRelationship || 'Parent', col1X + 45, startY + 155 + lineHeight * 2);
  
  // Valeurs colonne droite - Parent
  doc.setFont('helvetica', 'normal');
  doc.text(student.parentContact || '-', col2X + 45, startY + 155);
  doc.text(student.parentEmail || '-', col2X + 45, startY + 155 + lineHeight);
  
  // Gérer l'adresse du parent potentiellement longue
  const parentAddress = student.parentAddress || student.address || '-';
  if (parentAddress.length > 30) {
    const firstLine = parentAddress.substring(0, 30);
    const secondLine = parentAddress.substring(30);
    doc.text(firstLine, col2X + 45, startY + 155 + lineHeight * 2);
    doc.text(secondLine, col2X + 45, startY + 155 + lineHeight * 3);
  } else {
    doc.text(parentAddress, col2X + 45, startY + 155 + lineHeight * 2);
  }
  
  // Section pour les informations financières
  doc.setFillColor(250, 250, 255);
  doc.roundedRect(pdfConfig.margin, startY + 200, pageWidth - (pdfConfig.margin * 2), 30, 3, 3, 'FD');
  
  // Titre de la section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(pdfConfig.sectionTitleFontSize);
  doc.setTextColor(pdfConfig.headerColor[0], pdfConfig.headerColor[1], pdfConfig.headerColor[2]);
  doc.text('INFORMATIONS FINANCIÈRES', pageWidth / 2, startY + 210, { align: 'center' });
  
  // Ligne de séparation sous le titre
  doc.setDrawColor(pdfConfig.accentColor[0], pdfConfig.accentColor[1], pdfConfig.accentColor[2]);
  doc.setLineWidth(0.3);
  doc.line(pdfConfig.margin + 20, startY + 215, pageWidth - pdfConfig.margin - 20, startY + 215);
  
  // Informations financières
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(pdfConfig.normalFontSize);
  doc.text('Frais de scolarité:', col1X, startY + 225);
  doc.text('Mode de paiement:', col2X, startY + 225);
  
  // Valeurs financières
  doc.setFont('helvetica', 'normal');
  doc.text(student.tuitionFee ? formatAmount(student.tuitionFee) : '-', col1X + 45, startY + 225);
  doc.text(student.paymentMethod || 'Non spécifié', col2X + 45, startY + 225);
  
  // Zone de signature
  doc.setFillColor(245, 245, 255);
  doc.roundedRect(pdfConfig.margin, pageHeight - 70, pageWidth - (pdfConfig.margin * 2), 40, 3, 3, 'FD');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(pdfConfig.normalFontSize);
  doc.text('Signature du Directeur:', pdfConfig.margin + 10, pageHeight - 50);
  doc.text('Signature du Parent/Tuteur:', pageWidth / 2 + 10, pageHeight - 50);
  doc.text('Date:', pageWidth - pdfConfig.margin - 50, pageHeight - 50);
  
  // Lignes pour les signatures
  doc.setDrawColor(100, 100, 100);
  doc.setLineWidth(0.2);
  doc.line(pdfConfig.margin + 10, pageHeight - 35, pdfConfig.margin + 80, pageHeight - 35);
  doc.line(pageWidth / 2 + 10, pageHeight - 35, pageWidth / 2 + 80, pageHeight - 35);
  doc.line(pageWidth - pdfConfig.margin - 50, pageHeight - 35, pageWidth - pdfConfig.margin - 10, pageHeight - 35);
  
  // Ajouter le pied de page
  addDocumentFooter(doc);
  
  // Télécharger le PDF
  doc.save(`fiche_eleve_${student.id}_${new Date().toISOString().split('T')[0]}.pdf`);
};

// Fonction pour générer un PDF pour une fiche individuelle d'enseignant
export const generateTeacherDetailPDF = (teacher: Teacher): void => {
  const doc = new jsPDF();
  const pageWidth = (doc as any).internal.pageSize.width;
  
  // Ajouter l'en-tête
  addDocumentHeader(doc, 'Fiche individuelle d\'enseignant', `${teacher.name}`);
  
  // Définir les positions de départ
  const startY = 80;
  const lineHeight = pdfConfig.lineHeight;
  
  // Cadre d'information principal - Informations personnelles
  doc.setFillColor(250, 250, 255); // Fond très légèrement bleuté
  doc.setDrawColor(pdfConfig.headerColor[0], pdfConfig.headerColor[1], pdfConfig.headerColor[2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(pdfConfig.margin, startY, pageWidth - (pdfConfig.margin * 2), 60, 3, 3, 'FD');
  
  // Titre de la section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(pdfConfig.sectionTitleFontSize);
  doc.setTextColor(pdfConfig.headerColor[0], pdfConfig.headerColor[1], pdfConfig.headerColor[2]);
  doc.text('INFORMATIONS PERSONNELLES', pageWidth / 2, startY + 10, { align: 'center' });
  
  // Informations personnelles en deux colonnes
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(pdfConfig.normalFontSize);
  doc.setTextColor(pdfConfig.textColor[0], pdfConfig.textColor[1], pdfConfig.textColor[2]);
  
  // Colonne gauche
  const col1X = pdfConfig.margin + 10;
  doc.setFont('helvetica', 'bold');
  doc.text('ID:', col1X, startY + 25);
  doc.text('Nom complet:', col1X, startY + 25 + lineHeight);
  doc.text('Qualification:', col1X, startY + 25 + lineHeight * 2);
  doc.text('Date d\'embauche:', col1X, startY + 25 + lineHeight * 3);
  
  // Colonne droite
  const col2X = pageWidth / 2 + 10;
  doc.setFont('helvetica', 'bold');
  doc.text('Matière:', col2X, startY + 25);
  doc.text('Statut:', col2X, startY + 25 + lineHeight);
  
  // Valeurs colonne gauche
  doc.setFont('helvetica', 'normal');
  doc.text(teacher.id, col1X + 35, startY + 25);
  doc.text(teacher.name, col1X + 35, startY + 25 + lineHeight);
  doc.text(teacher.qualification || '-', col1X + 35, startY + 25 + lineHeight * 2);
  doc.text(teacher.joiningDate ? formatDate(teacher.joiningDate) : '-', col1X + 35, startY + 25 + lineHeight * 3);
  
  // Valeurs colonne droite
  doc.setFont('helvetica', 'normal');
  doc.text(teacher.subject || '-', col2X + 35, startY + 25);
  doc.text(teacher.status || 'Actif', col2X + 35, startY + 25 + lineHeight);
  
  // Section des informations de contact
  doc.setFillColor(250, 250, 255);
  doc.roundedRect(pdfConfig.margin, startY + 70, pageWidth - (pdfConfig.margin * 2), 40, 3, 3, 'FD');
  
  // Titre de la section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(pdfConfig.sectionTitleFontSize);
  doc.setTextColor(pdfConfig.headerColor[0], pdfConfig.headerColor[1], pdfConfig.headerColor[2]);
  doc.text('INFORMATIONS DE CONTACT', pageWidth / 2, startY + 80, { align: 'center' });
  
  // Informations de contact
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(pdfConfig.normalFontSize);
  doc.setTextColor(pdfConfig.textColor[0], pdfConfig.textColor[1], pdfConfig.textColor[2]);
  
  // Libellés
  doc.setFont('helvetica', 'bold');
  doc.text('Email:', col1X, startY + 95);
  doc.text('Téléphone:', col1X, startY + 95 + lineHeight);
  
  // Valeurs
  doc.setFont('helvetica', 'normal');
  doc.text(teacher.email || '-', col1X + 35, startY + 95);
  doc.text(teacher.phone || '-', col1X + 35, startY + 95 + lineHeight);
  
  // Zone de signature
  doc.setFillColor(245, 245, 255);
  doc.roundedRect(pdfConfig.margin, startY + 120, pageWidth - (pdfConfig.margin * 2), 40, 3, 3, 'FD');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(pdfConfig.normalFontSize);
  doc.text('Signature du Directeur:', pdfConfig.margin + 10, startY + 135);
  doc.text('Date:', pageWidth - pdfConfig.margin - 50, startY + 135);
  
  // Ligne pour la signature
  doc.setDrawColor(100, 100, 100);
  doc.setLineWidth(0.2);
  doc.line(pdfConfig.margin + 10, startY + 150, pdfConfig.margin + 80, startY + 150);
  doc.line(pageWidth - pdfConfig.margin - 50, startY + 150, pageWidth - pdfConfig.margin - 10, startY + 150);
  
  // Ajouter le pied de page
  addDocumentFooter(doc);
  
  // Télécharger le PDF
  doc.save(`fiche_enseignant_${teacher.id}_${new Date().toISOString().split('T')[0]}.pdf`);
};

// Fonction pour générer un PDF pour les détails d'une dépense
export const generateExpenseDetailPDF = (expense: Expense): void => {
  const doc = new jsPDF();
  
  // Ajouter l'en-tête
  addDocumentHeader(doc, 'Détails de la dépense', `ID: ${expense.id}`);
  
  // Ajouter les informations de la dépense
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  
  const startY = 50;
  const lineHeight = 10;
  
  // Titre et montant
  doc.setFont('helvetica', 'bold');
  doc.text(`Titre: ${expense.title}`, pdfConfig.margin, startY);
  doc.text(`Montant: ${formatAmount(expense.amount)}`, pdfConfig.margin, startY + lineHeight);
  
  // Informations détaillées
  doc.text('Informations détaillées:', pdfConfig.margin, startY + lineHeight * 3);
  doc.setFont('helvetica', 'normal');
  doc.text(`Date: ${formatDate(expense.date)}`, pdfConfig.margin + 10, startY + lineHeight * 4);
  doc.text(`Catégorie: ${expense.category}`, pdfConfig.margin + 10, startY + lineHeight * 5);
  doc.text(`Méthode de paiement: ${expense.paymentMethod}`, pdfConfig.margin + 10, startY + lineHeight * 6);
  doc.text(`Statut: ${expense.status}`, pdfConfig.margin + 10, startY + lineHeight * 7);
  
  if (expense.status === 'Approuvé') {
    doc.text(`Approuvé par: ${expense.approvedBy}`, pdfConfig.margin + 10, startY + lineHeight * 8);
  }
  
  // Ajouter le pied de page
  addDocumentFooter(doc);
  
  // Télécharger le PDF
  doc.save(`details_depense_${expense.id}_${new Date().toISOString().split('T')[0]}.pdf`);
};

// Fonction pour générer un PDF pour les détails d'un paiement
export const generatePaymentDetailPDF = (payment: Payment): void => {
  const doc = new jsPDF();
  
  // Ajouter l'en-tête
  addDocumentHeader(doc, 'Détails du paiement', `ID: ${payment.id}`);
  
  // Ajouter les informations du paiement
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  
  const startY = 50;
  const lineHeight = 10;
  
  // Informations de l'élève
  doc.setFont('helvetica', 'bold');
  doc.text('Informations de l\'élève:', pdfConfig.margin, startY);
  doc.setFont('helvetica', 'normal');
  doc.text(`Nom: ${payment.student.name}`, pdfConfig.margin + 10, startY + lineHeight);
  doc.text(`Classe: ${payment.student.class}`, pdfConfig.margin + 10, startY + lineHeight * 2);
  doc.text(`ID: ${payment.student.id}`, pdfConfig.margin + 10, startY + lineHeight * 3);
  
  // Informations du paiement
  doc.setFont('helvetica', 'bold');
  doc.text('Informations du paiement:', pdfConfig.margin, startY + lineHeight * 5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Montant: ${formatAmount(payment.amount)}`, pdfConfig.margin + 10, startY + lineHeight * 6);
  doc.text(`Date: ${formatDate(payment.date)}`, pdfConfig.margin + 10, startY + lineHeight * 7);
  doc.text(`Description: ${payment.description}`, pdfConfig.margin + 10, startY + lineHeight * 8);
  doc.text(`Méthode de paiement: ${payment.paymentMethod}`, pdfConfig.margin + 10, startY + lineHeight * 9);
  doc.text(`Statut: ${payment.status}`, pdfConfig.margin + 10, startY + lineHeight * 10);
  
  // Ajouter le pied de page
  addDocumentFooter(doc);
  
  // Télécharger le PDF
  doc.save(`details_paiement_${payment.id}_${new Date().toISOString().split('T')[0]}.pdf`);
};
