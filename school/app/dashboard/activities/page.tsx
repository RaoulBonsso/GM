"use client";

import React from 'react';
import Link from 'next/link';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import Table from '@/app/components/ui/Table';
import Pagination from '@/app/components/ui/Pagination';

// Types pour les données des activités
interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'payment' | 'enrollment' | 'event' | 'other';
  user: {
    id: string;
    name: string;
    role: string;
  };
}

export default function ActivitiesPage() {
  // Dans une application réelle, ces données proviendraient de la base de données
  const activities: Activity[] = [
    {
      id: '1',
      title: 'Paiement de frais de scolarité',
      description: 'Paiement de 150 000 GNF pour le mois de Mars',
      date: '2025-03-10T14:30:00',
      type: 'payment',
      user: { id: '1', name: 'Mamadou Diallo', role: 'Secrétaire' }
    },
    {
      id: '2',
      title: 'Inscription nouvel élève',
      description: 'Inscription de Fatou Camara en classe de CE1',
      date: '2025-03-09T10:15:00',
      type: 'enrollment',
      user: { id: '2', name: 'Aissatou Barry', role: 'Secrétaire' }
    },
    {
      id: '3',
      title: 'Réunion des parents',
      description: 'Organisation de la réunion des parents pour le trimestre',
      date: '2025-03-08T09:00:00',
      type: 'event',
      user: { id: '3', name: 'Ibrahim Sow', role: 'Directeur' }
    },
    {
      id: '4',
      title: 'Mise à jour du programme',
      description: 'Mise à jour du programme de mathématiques pour CM1',
      date: '2025-03-07T11:45:00',
      type: 'other',
      user: { id: '4', name: 'Mariama Bah', role: 'Enseignant' }
    },
    {
      id: '5',
      title: 'Paiement de frais de scolarité',
      description: 'Paiement de 150 000 GNF pour le mois de Février',
      date: '2025-03-06T15:20:00',
      type: 'payment',
      user: { id: '1', name: 'Mamadou Diallo', role: 'Secrétaire' }
    },
    {
      id: '6',
      title: 'Achat de fournitures',
      description: 'Achat de cahiers et de livres pour la bibliothèque',
      date: '2025-03-05T13:10:00',
      type: 'other',
      user: { id: '5', name: 'Ousmane Camara', role: 'Administrateur' }
    },
    {
      id: '7',
      title: 'Inscription nouvel élève',
      description: 'Inscription de Moussa Baldé en classe de CM2',
      date: '2025-03-04T09:30:00',
      type: 'enrollment',
      user: { id: '2', name: 'Aissatou Barry', role: 'Secrétaire' }
    },
    {
      id: '8',
      title: 'Planification d\'événement',
      description: 'Planification de la journée culturelle de l\'école',
      date: '2025-03-03T10:00:00',
      type: 'event',
      user: { id: '3', name: 'Ibrahim Sow', role: 'Directeur' }
    },
  ];

  // Colonnes pour le tableau
  const columns = [
    {
      header: 'Activité',
      accessor: (activity: Activity) => {
        // Icône en fonction du type d'activité
        let icon;
        switch (activity.type) {
          case 'payment':
            icon = (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
            );
            break;
          case 'enrollment':
            icon = (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
            );
            break;
          case 'event':
            icon = (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            );
            break;
          default:
            icon = (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            );
        }
        
        return (
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3">{icon}</div>
            <div>
              <div className="font-medium text-gray-900">{activity.title}</div>
              <div className="text-sm text-gray-500">{activity.description}</div>
            </div>
          </div>
        );
      },
    },
    {
      header: 'Date',
      accessor: (activity: Activity) => {
        const date = new Date(activity.date);
        return (
          <div>
            <div>{date.toLocaleDateString('fr-FR')}</div>
            <div className="text-sm text-gray-500">{date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        );
      },
    },
    {
      header: 'Utilisateur',
      accessor: (activity: Activity) => (
        <div>
          <div className="font-medium">{activity.user.name}</div>
          <div className="text-sm text-gray-500">{activity.user.role}</div>
        </div>
      ),
    },
    {
      header: 'Actions',
      accessor: (activity: Activity) => (
        <div className="flex justify-end space-x-2">
          <button className="text-primary hover:text-primary-hover">
            <span className="sr-only">Voir</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ),
      className: 'text-right',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Activités récentes</h1>
        <div className="flex space-x-2">
          <Button
            variant="light"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
            }
          >
            Filtrer
          </Button>
          <Button
            variant="light"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            }
          >
            Exporter
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden" variant="primary">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-wrap items-center justify-between">
            <div className="w-full md:w-auto flex space-x-2 mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Rechercher une activité..."
                className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
              />
              <Button variant="light" size="sm" icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              }>
                Rechercher
              </Button>
            </div>
            <div className="w-full md:w-auto flex space-x-2">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                defaultValue=""
              >
                <option value="">Tous les types</option>
                <option value="payment">Paiements</option>
                <option value="enrollment">Inscriptions</option>
                <option value="event">Événements</option>
                <option value="other">Autres</option>
              </select>
            </div>
          </div>
        </div>
        
        <Table
          columns={columns}
          data={activities}
          keyExtractor={(activity) => activity.id}
          onRowClick={(activity) => console.log('Activité sélectionnée:', activity)}
        />
        
        <div className="p-4 border-t border-gray-200">
          <Pagination
            currentPage={1}
            totalPages={3}
            onPageChange={(page) => console.log('Page:', page)}
          />
        </div>
      </Card>
    </div>
  );
}
