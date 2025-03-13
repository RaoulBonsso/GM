import nodemailer from 'nodemailer';

// Configuration du transporteur d'emails
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.example.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || 'user@example.com',
    pass: process.env.EMAIL_PASSWORD || 'password',
  },
});

// Interface pour les options d'email
interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

/**
 * Envoie un email
 */
export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'Système de Gestion Scolaire <noreply@example.com>',
      to,
      subject,
      text,
      html,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return { success: false, error };
  }
}

/**
 * Envoie un email de notification pour une dépense
 */
export async function sendExpenseNotification(
  to: string,
  userName: string,
  expenseTitle: string,
  expenseAmount: number,
  expenseDate: Date
) {
  const subject = `Nouvelle dépense: ${expenseTitle}`;
  const formattedAmount = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(expenseAmount);
  
  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'full',
  }).format(expenseDate);

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Notification de dépense</h2>
      <p>Bonjour ${userName},</p>
      <p>Une nouvelle dépense a été enregistrée dans le système de gestion de l'établissement scolaire.</p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Titre:</strong> ${expenseTitle}</p>
        <p><strong>Montant:</strong> ${formattedAmount}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
      </div>
      <p>Veuillez vous connecter au système pour plus de détails.</p>
      <p>Cordialement,<br>Système de Gestion Scolaire</p>
    </div>
  `;

  return sendEmail({ to, subject, html });
}

/**
 * Envoie un email de bienvenue à un nouvel utilisateur
 */
export async function sendWelcomeEmail(to: string, userName: string, password: string) {
  const subject = 'Bienvenue au Système de Gestion Scolaire';
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Bienvenue au Système de Gestion Scolaire</h2>
      <p>Bonjour ${userName},</p>
      <p>Votre compte a été créé avec succès dans notre système de gestion d'établissement scolaire.</p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Email:</strong> ${to}</p>
        <p><strong>Mot de passe temporaire:</strong> ${password}</p>
      </div>
      <p>Veuillez vous connecter et changer votre mot de passe dès que possible.</p>
      <p>Cordialement,<br>Système de Gestion Scolaire</p>
    </div>
  `;

  return sendEmail({ to, subject, html });
}

/**
 * Envoie un email de réinitialisation de mot de passe
 */
export async function sendPasswordResetEmail(to: string, userName: string, resetToken: string) {
  const subject = 'Réinitialisation de votre mot de passe';
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Réinitialisation de mot de passe</h2>
      <p>Bonjour ${userName},</p>
      <p>Vous avez demandé la réinitialisation de votre mot de passe pour le Système de Gestion Scolaire.</p>
      <p>Cliquez sur le bouton ci-dessous pour réinitialiser votre mot de passe:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="background-color: #4f46e5; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Réinitialiser mon mot de passe
        </a>
      </div>
      <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>
      <p>Ce lien expirera dans 1 heure.</p>
      <p>Cordialement,<br>Système de Gestion Scolaire</p>
    </div>
  `;

  return sendEmail({ to, subject, html });
}
