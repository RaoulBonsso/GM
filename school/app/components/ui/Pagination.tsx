import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  // Ne pas afficher la pagination s'il n'y a qu'une seule page
  if (totalPages <= 1) {
    return null;
  }

  // Calculer les pages à afficher
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Afficher toutes les pages si le nombre total est inférieur ou égal au maximum à afficher
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Toujours afficher la première page
      pageNumbers.push(1);
      
      // Calculer les pages du milieu
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Ajuster si on est près du début ou de la fin
      if (currentPage <= 3) {
        endPage = 4;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }
      
      // Ajouter des ellipses si nécessaire
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      // Ajouter les pages du milieu
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Ajouter des ellipses si nécessaire
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Toujours afficher la dernière page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className={`flex justify-center mt-4 ${className}`}>
      <ul className="flex space-x-1">
        {/* Bouton Précédent */}
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
            aria-label="Précédent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </li>
        
        {/* Pages */}
        {pageNumbers.map((page, index) => (
          <li key={index}>
            {page === '...' ? (
              <span className="px-3 py-1 text-gray-700">...</span>
            ) : (
              <button
                onClick={() => typeof page === 'number' && onPageChange(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </li>
        ))}
        
        {/* Bouton Suivant */}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
            aria-label="Suivant"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
