"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Alert from '../ui/Alert';

// Schéma de validation pour le formulaire de connexion
const loginSchema = z.object({
  email: z.string().email({ message: 'Adresse email invalide' }),
  password: z.string().min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleFormSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await onSubmit(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 p-1 text-black">
      {error && (
        <Alert
          variant="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      <div>
        <Input
          label="Adresse email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
          placeholder="exemple@ecole.fr"
          fullWidth
          autoComplete="email"

        />
      </div>

      <div>
        <Input
          label="Mot de passe"
          type="password"
          {...register('password')}
          error={errors.password?.message}
          placeholder="••••••••"
          fullWidth
          autoComplete="current-password"

        />
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-black hover:text-gray-900 transition-colors">
            Se souvenir de moi
          </label>
        </div>

        <div className="text-sm">
          <a href="/forgot-password" className="font-medium text-blue-700 hover:text-blue-900 transition-all hover:underline">
            Mot de passe oublié?
          </a>
        </div>
      </div>

      <div className="mt-6">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
          className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 py-3 text-base font-medium shadow-lg transition-all duration-200 transform hover:translate-y-[-2px] hover:shadow-xl"
        >
          Se connecter
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
