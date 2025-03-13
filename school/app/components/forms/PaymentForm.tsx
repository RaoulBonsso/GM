"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Alert from '../ui/Alert';

// Schéma de validation pour le formulaire de paiement
const paymentSchema = z.object({
  studentId: z.string().min(1, { message: 'Veuillez sélectionner un élève' }),
  amount: z.string().min(1, { message: 'Veuillez entrer un montant' })
    .refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: 'Le montant doit être un nombre positif',
    }),
  date: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: 'Date invalide',
  }),
  description: z.string().min(5, { message: 'La description doit contenir au moins 5 caractères' }),
  paymentMethod: z.enum(['Espèces', 'Chèque', 'Virement bancaire', 'Mobile Money'], {
    errorMap: () => ({ message: 'Veuillez sélectionner une méthode de paiement' }),
  }),
  status: z.enum(['Payé', 'En attente', 'Annulé'], {
    errorMap: () => ({ message: 'Veuillez sélectionner un statut' }),
  }),
  reference: z.string().optional(),
  notes: z.string().optional(),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  initialData?: Partial<PaymentFormData>;
  onSubmit: (data: PaymentFormData) => Promise<void>;
  students: { id: string; name: string }[];
  preSelectedStudentId?: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ 
  initialData, 
  onSubmit, 
  students,
  preSelectedStudentId 
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      studentId: preSelectedStudentId || initialData?.studentId || '',
      amount: initialData?.amount || '',
      date: initialData?.date || new Date().toISOString().split('T')[0],
      description: initialData?.description || '',
      paymentMethod: initialData?.paymentMethod || 'Espèces',
      status: initialData?.status || 'Payé',
      reference: initialData?.reference || '',
      notes: initialData?.notes || '',
    },
  });

  const handleFormSubmit = async (data: PaymentFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await onSubmit(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de l\'enregistrement');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {error && (
        <Alert
          variant="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="studentId" className="block text-sm font-medium text-blue-700">
            Élève
          </label>
          <select
            id="studentId"
            {...register('studentId')}
            className={`mt-1 block w-full pl-3 pr-10 py-2 text-base text-black border-gray-300 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm rounded-md ${
              errors.studentId ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' : 'bg-white'
            }`}
            disabled={!!preSelectedStudentId}
          >
            <option value="">Sélectionner un élève</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
          {errors.studentId && (
            <p className="mt-1 text-sm text-red-600">{errors.studentId.message}</p>
          )}
        </div>

        <Input
          label="Montant"
          type="number"
          step="0.01"
          {...register('amount')}
          error={errors.amount?.message}
          placeholder="Montant du paiement"
          fullWidth
        />

        <Input
          label="Date"
          type="date"
          {...register('date')}
          error={errors.date?.message}
          fullWidth
        />

        <div className="space-y-1">
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-blue-700">
            Méthode de paiement
          </label>
          <select
            id="paymentMethod"
            {...register('paymentMethod')}
            className={`mt-1 block w-full pl-3 pr-10 py-2 text-base text-black border-gray-300 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm rounded-md ${
              errors.paymentMethod ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' : 'bg-white'
            }`}
          >
            <option value="Espèces">Espèces</option>
            <option value="Chèque">Chèque</option>
            <option value="Virement bancaire">Virement bancaire</option>
            <option value="Mobile Money">Mobile Money</option>
          </select>
          {errors.paymentMethod && (
            <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="status" className="block text-sm font-medium text-blue-700">
            Statut
          </label>
          <select
            id="status"
            {...register('status')}
            className={`mt-1 block w-full pl-3 pr-10 py-2 text-base text-black border-gray-300 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm rounded-md ${
              errors.status ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' : 'bg-white'
            }`}
          >
            <option value="Payé">Payé</option>
            <option value="En attente">En attente</option>
            <option value="Annulé">Annulé</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <Input
            label="Description"
            {...register('description')}
            error={errors.description?.message}
            placeholder="Description du paiement (ex: Frais de scolarité - 1er trimestre)"
            fullWidth
          />
        </div>

        <Input
          label="Référence (optionnel)"
          {...register('reference')}
          error={errors.reference?.message}
          placeholder="Numéro de référence, numéro de chèque, etc."
          fullWidth
        />

        <div className="md:col-span-2">
          <div className="space-y-1">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes (optionnel)
            </label>
            <textarea
              id="notes"
              {...register('notes')}
              rows={3}
              className="shadow-sm focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-sm border-gray-300 rounded-md text-black bg-white"
              placeholder="Informations supplémentaires sur le paiement"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="light"
          className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-300 font-medium py-2 px-6 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
        >
          Annuler
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium py-2 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-200"
        >
          {initialData ? 'Mettre à jour' : 'Enregistrer'}
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;
