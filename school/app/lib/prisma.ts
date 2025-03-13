import { PrismaClient } from '@prisma/client';

// Déclaration globale pour éviter les multiples instances de PrismaClient
declare global {
  var prisma: PrismaClient | undefined;
}

// Création d'une instance unique de PrismaClient
export const prisma = global.prisma || new PrismaClient();

// En développement, nous gardons l'instance de PrismaClient dans l'objet global
// pour éviter les multiples connexions lors du hot-reloading
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
