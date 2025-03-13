import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 relative overflow-hidden';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 focus:ring-indigo-500',
    secondary: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 focus:ring-gray-500',
    success: 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 focus:ring-emerald-500',
    danger: 'bg-gradient-to-r from-rose-500 to-red-600 text-white hover:from-rose-600 hover:to-red-700 focus:ring-rose-500',
    warning: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white hover:from-amber-500 hover:to-yellow-600 focus:ring-amber-400',
    info: 'bg-gradient-to-r from-sky-400 to-blue-500 text-white hover:from-sky-500 hover:to-blue-600 focus:ring-sky-400',
    light: 'bg-gradient-to-r from-slate-100 to-gray-200 text-gray-800 hover:from-slate-200 hover:to-gray-300 focus:ring-slate-200',
    dark: 'bg-gradient-to-r from-slate-700 to-gray-800 text-white hover:from-slate-800 hover:to-gray-900 focus:ring-slate-700',
    link: 'bg-transparent text-indigo-600 hover:text-indigo-800 hover:underline focus:ring-indigo-500 p-0 shadow-none hover:shadow-none transform-none',
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'text-sm px-3 py-2',
    md: 'text-base px-5 py-2.5',
    lg: 'text-lg px-7 py-3.5',
  };
  
  // Width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Disabled and loading classes
  const stateClasses = props.disabled || isLoading ? 'opacity-70 cursor-not-allowed hover:transform-none' : '';
  
  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${variant !== 'link' ? sizeClasses[size] : ''}
    ${widthClass}
    ${stateClasses}
    ${className}
  `;
  
  return (
    <button className={buttonClasses} disabled={props.disabled || isLoading} {...props}>
      {/* Effet de brillance */}
      {!props.disabled && !isLoading && variant !== 'link' && (
        <span className="absolute inset-0 overflow-hidden">
          <span className="absolute left-0 top-0 h-full w-1/3 bg-white/20 skew-x-12 transform -translate-x-full animate-shimmer"></span>
        </span>
      )}
      
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!isLoading && icon && <span className="mr-3 transform transition-transform group-hover:scale-110">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
