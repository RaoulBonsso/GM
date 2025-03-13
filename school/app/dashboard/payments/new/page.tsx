"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import PaymentForm from '@/app/components/forms/PaymentForm';

export default function NewPaymentPage() {
  const searchParams = useSearchParams();
  const [studentId, setStudentId] = useState<string | undefined>();
  
  // Récupérer l'ID de l'élève depuis les paramètres de recherche
  useEffect(() => {
    const id = searchParams.get('studentId');
    if (id) setStudentId(id);
  }, [searchParams]);

  // Dans une application réelle, ces données proviendraient de la base de données
  const students = [
    { id: '1', name: 'Amadou Diallo' },
    { id: '2', name: 'Fatou Sow' },
    { id: '3', name: 'Mamadou Bah' },
    { id: '4', name: 'Aissatou Barry' },
    { id: '5', name: 'Ousmane Camara' },
  ];

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (data: any) => {
    // Dans une application réelle, cela enverrait les données à l'API
    console.log('Données du formulaire:', data);
    
    // Simuler un délai pour l'enregistrement
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Redirection vers la liste des paiements
    // Dans une application réelle, cela utiliserait la navigation Next.js
    window.location.href = '/dashboard/payments';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">Ajouter un nouveau paiement</h1>
        <Link href="/dashboard/payments">
          <Button variant="light" className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-300">
            Retour à la liste
          </Button>
        </Link>
      </div>

      <Card variant="blue" className="p-6 border-t-4 border-blue-600 shadow-lg">
        <PaymentForm 
          onSubmit={handleSubmit}
          students={students}
          preSelectedStudentId={studentId}
        />
      </Card>
    </div>
  );
}
