"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import { motion } from 'framer-motion';

// Types pour les données des dépenses
interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  paymentMethod: string;
  approvedBy: string;
  status: 'Approuvé' | 'En attente' | 'Rejeté';
  description?: string;
}

export default function EditExpensePage() {
  const router = useRouter();
  const params = useParams();
  const expenseId = params.id as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Expense | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Dans une application réelle, vous feriez une requête API ici
    // Simulation de chargement des données
    const fetchExpense = async () => {
      setIsLoading(true);
      try {
        // Simuler un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Données fictives pour la démonstration
        const mockExpenses: Record<string, Expense> = {
          '1': {
            id: '1',
            title: 'Achat de fournitures scolaires',
            amount: 250000,
            date: '2024-09-05',
            category: 'Fournitures',
            paymentMethod: 'Espèces',
            approvedBy: 'Mamadou Diallo',
            status: 'Approuvé',
            description: 'Achat de cahiers, stylos et autres fournitures pour les élèves.'
          },
          '2': {
            id: '2',
            title: 'Réparation de climatiseurs',
            amount: 150000,
            date: '2024-09-10',
            category: 'Maintenance',
            paymentMethod: 'Chèque',
            approvedBy: 'Mamadou Diallo',
            status: 'Approuvé',
            description: 'Réparation de 3 climatiseurs dans les salles de classe.'
          },
          '3': {
            id: '3',
            title: 'Salaires des enseignants - Septembre',
            amount: 3500000,
            date: '2024-09-30',
            category: 'Salaires',
            paymentMethod: 'Virement bancaire',
            approvedBy: 'Mamadou Diallo',
            status: 'Approuvé',
            description: 'Paiement des salaires du mois de septembre pour tous les enseignants.'
          },
          '4': {
            id: '4',
            title: 'Achat de nouveaux ordinateurs',
            amount: 1200000,
            date: '2024-10-05',
            category: 'Équipement',
            paymentMethod: 'Chèque',
            approvedBy: '',
            status: 'En attente',
            description: 'Achat de 5 nouveaux ordinateurs pour la salle informatique.'
          },
          '5': {
            id: '5',
            title: 'Rénovation de la cantine',
            amount: 500000,
            date: '2024-10-10',
            category: 'Infrastructure',
            paymentMethod: 'Virement bancaire',
            approvedBy: '',
            status: 'Rejeté',
            description: 'Travaux de rénovation de la cantine scolaire.'
          }
        };
        
        const expense = mockExpenses[expenseId];
        
        if (!expense) {
          throw new Error('Dépense non trouvée');
        }
        
        setFormData(expense);
      } catch (err) {
        setError('Impossible de charger les informations de la dépense. Veuillez réessayer.');
        console.error('Erreur lors du chargement:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchExpense();
  }, [expenseId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!formData) return;
    
    const { name, value } = e.target;
    setFormData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: name === 'amount' ? parseFloat(value) : value
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    
    setIsSubmitting(true);

    try {
      // Simuler un délai d'envoi
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dans une application réelle, vous enverriez les données au serveur ici
      console.log('Dépense modifiée:', formData);
      
      // Rediriger vers la page des dépenses
      router.push('/dashboard/expenses');
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      setError('Une erreur est survenue lors de la modification. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !formData) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md shadow-sm">
        <p>{error || "Une erreur inattendue s'est produite."}</p>
        <div className="mt-3">
          <Link href="/dashboard/expenses">
            <Button
              variant="light"
              className="text-red-700 border border-red-300 hover:bg-red-100"
            >
              Retour aux dépenses
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
            Modifier la dépense
          </h1>
          <p className="text-blue-500 mt-1">
            Modifiez les informations de la dépense
          </p>
        </div>
        <Link href="/dashboard/expenses">
          <Button
            variant="light"
            className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 border border-blue-200 rounded-lg shadow-sm hover:shadow transition-all duration-200"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour aux dépenses
          </Button>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card variant="blue" className="overflow-hidden shadow-lg rounded-xl border border-blue-200">
          <div className="p-6 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-xl font-medium text-blue-800">Informations sur la dépense</h2>
            <p className="text-sm text-blue-600 mt-1">ID: {formData.id}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Titre */}
              <div className="col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-blue-700 mb-1">
                  Titre de la dépense *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="shadow-sm focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-sm border-gray-300 rounded-md text-black"
                  placeholder="Ex: Achat de fournitures scolaires"
                />
              </div>

              {/* Montant */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-blue-700 mb-1">
                  Montant (FCFA) *
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    min="0"
                    className="focus:ring-blue-600 focus:border-blue-600 block w-full pr-12 sm:text-sm border-gray-300 rounded-md text-black"
                    placeholder="0"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">FCFA</span>
                  </div>
                </div>
              </div>

              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-blue-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="shadow-sm focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-sm border-gray-300 rounded-md text-black"
                />
              </div>

              {/* Catégorie */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-blue-700 mb-1">
                  Catégorie *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="shadow-sm focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-sm border-gray-300 rounded-md text-black"
                >
                  <option value="" disabled>Sélectionner une catégorie</option>
                  <option value="Fournitures">Fournitures</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Salaires">Salaires</option>
                  <option value="Équipement">Équipement</option>
                  <option value="Infrastructure">Infrastructure</option>
                </select>
              </div>

              {/* Méthode de paiement */}
              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-blue-700 mb-1">
                  Méthode de paiement *
                </label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                  className="shadow-sm focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-sm border-gray-300 rounded-md text-black"
                >
                  <option value="" disabled>Sélectionner une méthode</option>
                  <option value="Espèces">Espèces</option>
                  <option value="Chèque">Chèque</option>
                  <option value="Virement bancaire">Virement bancaire</option>
                </select>
              </div>

              {/* Statut */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-blue-700 mb-1">
                  Statut *
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="shadow-sm focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-sm border-gray-300 rounded-md text-black"
                >
                  <option value="En attente">En attente</option>
                  <option value="Approuvé">Approuvé</option>
                  <option value="Rejeté">Rejeté</option>
                </select>
              </div>

              {/* Approuvé par */}
              <div>
                <label htmlFor="approvedBy" className="block text-sm font-medium text-blue-700 mb-1">
                  Approuvé par
                </label>
                <input
                  type="text"
                  id="approvedBy"
                  name="approvedBy"
                  value={formData.approvedBy}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-sm border-gray-300 rounded-md text-black"
                  placeholder="Nom de l'approbateur"
                  disabled={formData.status !== 'Approuvé'}
                />
                {formData.status !== 'Approuvé' && (
                  <p className="mt-1 text-xs text-gray-500">
                    Ce champ est disponible uniquement pour les dépenses approuvées.
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-blue-700 mb-1">
                  Description (optionnelle)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  rows={4}
                  className="shadow-sm focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-sm border-gray-300 rounded-md text-black"
                  placeholder="Informations supplémentaires sur cette dépense..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-blue-100">
              <Link href="/dashboard/expenses">
                <Button
                  type="button"
                  variant="light"
                  className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
                >
                  Annuler
                </Button>
              </Link>
              <Button
                type="submit"
                variant="primary"
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enregistrement...
                  </>
                ) : (
                  'Enregistrer les modifications'
                )}
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
