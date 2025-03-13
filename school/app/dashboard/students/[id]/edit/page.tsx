"use client";

import React from 'react';
import Link from 'next/link';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import StudentForm from '@/app/components/forms/StudentForm';

interface EditStudentPageProps {
  params: {
    id: string;
  };
}

// Composant pour gérer le formulaire et les événements
function StudentFormWrapper({ initialData, studentId, classes }: { 
  initialData: any; 
  studentId: string; 
  classes: { id: string; name: string }[] 
}) {
  const handleSubmit = async (data: any) => {
    console.log('Données du formulaire:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.location.href = `/dashboard/students/${studentId}`;
  };

  return (
    <StudentForm
      initialData={initialData}
      onSubmit={handleSubmit}
      classes={classes}
    />
  );
}

export default function EditStudentPage({ params }: EditStudentPageProps) {
  const { id } = params;

  // Dans une application réelle, ces données proviendraient de la base de données
  const classes = [
    { id: '1', name: 'CM2' },
    { id: '2', name: 'CE1' },
    { id: '3', name: 'CM1' },
    { id: '4', name: 'CE2' },
  ];

  // Données initiales de l'élève (simulées)
  const initialData = {
    firstName: 'Amadou',
    lastName: 'Diallo',
    birthDate: '2014-05-12',
    gender: 'M' as const,
    address: '123 Rue Principale, Conakry',
    classId: '1',
    parentName: 'Mamadou Diallo',
    parentPhone: '620123456',
    parentEmail: 'mamadou.diallo@example.com',
    registrationDate: '2024-09-01',
    notes: 'Élève très appliqué et discipliné.',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">Modifier l'élève</h1>
        <div className="flex space-x-3">
          <Link href={`/dashboard/students/${id}`}>
            <Button variant="light" className="bg-gradient-to-r from-cyan-50 to-cyan-100 hover:from-cyan-100 hover:to-cyan-200 text-cyan-700 font-medium py-2 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-200">
              Annuler
            </Button>
          </Link>
          <Link href="/dashboard/students">
            <Button variant="light" className="bg-gradient-to-r from-teal-50 to-teal-100 hover:from-teal-100 hover:to-teal-200 text-teal-700 font-medium py-2 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-200">
              Retour à la liste
            </Button>
          </Link>
        </div>
      </div>

      <Card className="p-6 bg-gradient-to-br from-white to-emerald-50 shadow-lg rounded-xl border border-emerald-100">
        <StudentFormWrapper 
          initialData={initialData}
          studentId={id}
          classes={classes}
        />
      </Card>
    </div>
  );
}
