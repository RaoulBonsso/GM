import { redirect } from 'next/navigation';

export default function Home() {
  // Rediriger vers la page de connexion
  redirect('/auth/login');
  
  // Cette partie ne sera jamais exécutée en raison de la redirection
  return null;
}
