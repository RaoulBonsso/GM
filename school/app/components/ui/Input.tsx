import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = '',
      containerClassName = '',
      id,
      ...props
    },
    ref
  ) => {
    // Générer un ID unique si non fourni
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    // Classes pour l'input
    const inputClasses = `
      block px-4 py-3 w-full rounded-lg
      transition-all duration-200 ease-in-out
      ${error 
        ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50' 
        : 'border-gray-200 focus:ring-blue-600 focus:border-blue-600 hover:border-blue-300 bg-white text-black placeholder-gray-500'}
      ${leftIcon ? 'pl-8' : ''}
      ${rightIcon ? 'pr-10' : ''}
      shadow-sm hover:shadow focus:shadow-md
      ${className}
    `;

    // Classes pour le conteneur
    const containerClasses = `
      ${fullWidth ? 'w-full' : ''}
      ${containerClassName}
    `;

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-200 ease-in-out hover:text-blue-700">
            {label}
          </label>
        )}
        <div className="relative rounded-md shadow-sm">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            style={{color: 'black', backgroundColor: 'white'}}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600 bg-red-50 p-1.5 rounded-md border border-red-100" id={`${inputId}-error`}>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-2 text-sm text-gray-500 bg-gray-50 p-1.5 rounded-md border border-gray-100" id={`${inputId}-helper`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
