"use client";

import React from 'react';
import Link from 'next/link';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import StudentForm from '@/app/components/forms/StudentForm';

export default function NewStudentPage() {
  // Dans une application réelle, ces données proviendraient de la base de données
  const classes = [
    { id: '1', name: 'CM2' },
    { id: '2', name: 'CE1' },
    { id: '3', name: 'CM1' },
    { id: '4', name: 'CE2' },
  ];

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (data: any) => {
    // Dans une application réelle, cela enverrait les données à l'API
    console.log('Données du formulaire:', data);
    
    // Simuler un délai pour l'enregistrement
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Redirection vers la liste des élèves
    // Dans une application réelle, cela utiliserait la navigation Next.js
    window.location.href = '/dashboard/students';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">Ajouter un nouvel élève</h1>
        <Link href="/dashboard/students">
          <Button variant="light" className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-300">
            Retour à la liste
          </Button>
        </Link>
      </div>

      <Card variant="blue" className="p-6 border-t-4 border-blue-600 shadow-lg">
        <StudentForm 
          onSubmit={handleSubmit}
          classes={classes}
        />
      </Card>
    </div>
  );
}
