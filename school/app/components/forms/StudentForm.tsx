"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Alert from '../ui/Alert';

// Schéma de validation pour le formulaire d'élève
const studentSchema = z.object({
  firstName: z.string().min(2, { message: 'Le prénom doit contenir au moins 2 caractères' }),
  lastName: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  birthDate: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: 'Date de naissance invalide',
  }),
  gender: z.enum(['M', 'F'], {
    errorMap: () => ({ message: 'Veuillez sélectionner un genre' }),
  }),
  address: z.string().min(5, { message: 'L\'adresse doit contenir au moins 5 caractères' }),
  classId: z.string().min(1, { message: 'Veuillez sélectionner une classe' }),
  parentName: z.string().min(2, { message: 'Le nom du parent doit contenir au moins 2 caractères' }),
  parentPhone: z.string().min(8, { message: 'Le numéro de téléphone doit contenir au moins 8 chiffres' }),
  parentEmail: z.string().email({ message: 'Adresse email invalide' }).optional().or(z.literal('')),
  registrationDate: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: 'Date d\'inscription invalide',
  }),
  notes: z.string().optional(),
});

type StudentFormData = z.infer<typeof studentSchema>;

interface StudentFormProps {
  initialData?: Partial<StudentFormData>;
  onSubmit: (data: StudentFormData) => Promise<void>;
  classes: { id: string; name: string }[];
}

const StudentForm: React.FC<StudentFormProps> = ({ initialData, onSubmit, classes }) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstName: initialData?.firstName || '',
      lastName: initialData?.lastName || '',
      birthDate: initialData?.birthDate || '',
      gender: initialData?.gender || 'M',
      address: initialData?.address || '',
      classId: initialData?.classId || '',
      parentName: initialData?.parentName || '',
      parentPhone: initialData?.parentPhone || '',
      parentEmail: initialData?.parentEmail || '',
      registrationDate: initialData?.registrationDate || new Date().toISOString().split('T')[0],
      notes: initialData?.notes || '',
    },
  });

  const handleFormSubmit = async (data: StudentFormData) => {
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
        <Input
          label="Prénom"
          {...register('firstName')}
          error={errors.firstName?.message}
          placeholder="Prénom de l'élève"
          fullWidth
        />

        <Input
          label="Nom"
          {...register('lastName')}
          error={errors.lastName?.message}
          placeholder="Nom de l'élève"
          fullWidth
        />

        <Input
          label="Date de naissance"
          type="date"
          {...register('birthDate')}
          error={errors.birthDate?.message}
          fullWidth
        />

        <div className="space-y-1">
          <label className="block text-sm font-medium text-blue-700">Genre</label>
          <div className="flex space-x-4 mt-1">
            <div className="flex items-center">
              <input
                id="gender-male"
                type="radio"
                value="M"
                {...register('gender')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300"
              />
              <label htmlFor="gender-male" className="ml-2 block text-sm text-gray-700">
                Masculin
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="gender-female"
                type="radio"
                value="F"
                {...register('gender')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300"
              />
              <label htmlFor="gender-female" className="ml-2 block text-sm text-gray-700">
                Féminin
              </label>
            </div>
          </div>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <Input
            label="Adresse"
            {...register('address')}
            error={errors.address?.message}
            placeholder="Adresse de l'élève"
            fullWidth
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="classId" className="block text-sm font-medium text-blue-700">
            Classe
          </label>
          <select
            id="classId"
            {...register('classId')}
            className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm rounded-md text-black bg-white ${
              errors.classId ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' : ''
            }`}
          >
            <option value="">Sélectionner une classe</option>
            {classes.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </select>
          {errors.classId && (
            <p className="mt-1 text-sm text-red-600">{errors.classId.message}</p>
          )}
        </div>

        <Input
          label="Date d'inscription"
          type="date"
          {...register('registrationDate')}
          error={errors.registrationDate?.message}
          fullWidth
        />

        <div className="md:col-span-2">
          <h3 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 mb-3">Informations du parent</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input
              label="Nom complet"
              {...register('parentName')}
              error={errors.parentName?.message}
              placeholder="Nom complet du parent"
              fullWidth
            />

            <Input
              label="Téléphone"
              {...register('parentPhone')}
              error={errors.parentPhone?.message}
              placeholder="Numéro de téléphone"
              fullWidth
            />

            <Input
              label="Email (optionnel)"
              type="email"
              {...register('parentEmail')}
              error={errors.parentEmail?.message}
              placeholder="Adresse email"
              fullWidth
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="space-y-1">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes (optionnel)
            </label>
            <textarea
              id="notes"
              {...register('notes')}
              rows={3}
              className="shadow-sm focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-sm border-gray-300 rounded-md bg-white text-black"
              placeholder="Informations supplémentaires sur l'élève"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="light"
          className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-300"
        >
          Annuler
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-md"
          isLoading={isLoading}
        >
          {initialData ? 'Mettre à jour' : 'Enregistrer'}
        </Button>
      </div>
    </form>
  );
};

export default StudentForm;
