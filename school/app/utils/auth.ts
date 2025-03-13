import { UserRole } from '../types';
import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';

// Secret pour signer les JWT tokens
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default_jwt_secret_key_for_development'
);

// Durée de validité du token (24 heures)
const TOKEN_EXPIRATION = '24h';

/**
 * Génère un JWT token pour un utilisateur authentifié
 */
export async function generateToken(payload: {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRATION)
    .sign(JWT_SECRET);

  return token;
}

/**
 * Vérifie et décode un JWT token
 */
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

/**
 * Définit le cookie d'authentification
 */
export function setAuthCookie(token: string) {
  // Utiliser l'API de cookies de Next.js
  // @ts-ignore - Ignorer l'erreur de type pour l'API cookies
  cookies().set({
    name: 'auth-token',
    value: token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 24 heures
  });
}

/**
 * Supprime le cookie d'authentification
 */
export function removeAuthCookie() {
  // Utiliser l'API de cookies de Next.js
  // @ts-ignore - Ignorer l'erreur de type pour l'API cookies
  cookies().delete('auth-token');
}

/**
 * Récupère le token d'authentification depuis les cookies
 */
export function getAuthToken() {
  // Utiliser l'API de cookies de Next.js
  // @ts-ignore - Ignorer l'erreur de type pour l'API cookies
  return cookies().get('auth-token')?.value;
}

/**
 * Vérifie si l'utilisateur est authentifié
 */
export async function isAuthenticated() {
  const token = getAuthToken();
  if (!token) return false;

  const payload = await verifyToken(token);
  return !!payload;
}

/**
 * Récupère les informations de l'utilisateur actuel
 */
export async function getCurrentUser() {
  const token = getAuthToken();
  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload) return null;

  return {
    id: payload.id as string,
    email: payload.email as string,
    name: payload.name as string,
    role: payload.role as UserRole,
  };
}

/**
 * Vérifie si l'utilisateur a le rôle requis
 */
export async function hasRole(requiredRole: UserRole | UserRole[]) {
  const user = await getCurrentUser();
  if (!user) return false;

  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(user.role);
  }

  return user.role === requiredRole;
}

/**
 * Vérifie si l'utilisateur est un administrateur
 */
export async function isAdmin() {
  return hasRole(UserRole.ADMIN);
}

/**
 * Vérifie si l'utilisateur est un développeur
 */
export async function isDeveloper() {
  return hasRole(UserRole.DEVELOPER);
}

/**
 * Vérifie si l'utilisateur est un secrétaire
 */
export async function isSecretary() {
  return hasRole(UserRole.SECRETARY);
}

/**
 * Vérifie si l'utilisateur est un administrateur ou un développeur
 */
export async function isAdminOrDeveloper() {
  return hasRole([UserRole.ADMIN, UserRole.DEVELOPER]);
}
