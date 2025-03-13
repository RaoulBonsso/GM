"use client";

import React from 'react';

interface CardProps {
  title?: string;
  footer?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'lime' | 'blue';
}

const Card: React.FC<CardProps> = ({
  title,
  footer,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  variant = 'default',
  children,
}) => {
  // Définir les classes de base en fonction de la variante
  const variantClasses = {
    default: 'bg-white border-gray-100',
    primary: 'bg-gradient-to-br from-indigo-50 to-white border-indigo-100',
    secondary: 'bg-gradient-to-br from-slate-50 to-white border-slate-100',
    success: 'bg-gradient-to-br from-emerald-50 to-white border-emerald-100',
    info: 'bg-gradient-to-br from-sky-50 to-white border-sky-100',
    warning: 'bg-gradient-to-br from-amber-50 to-white border-amber-100',
    lime: 'bg-gradient-to-br from-lime-50 to-white border-lime-200',
    blue: 'bg-gradient-to-br from-blue-50 to-white border-blue-200'
  };
  return (
    <div className={`card ${variantClasses[variant]} border shadow-sm hover:shadow-md transition-all duration-300 animate-fadeIn ${className}`}>
      {title && (
        <div className={`card-header font-medium text-gray-700 ${headerClassName}`}>
          {title}
        </div>
      )}
      <div className={`card-body ${bodyClassName}`}>
        {children}
      </div>
      {footer && (
        <div className={`card-footer border-t ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
