// src/components/ui/Button.tsx
import React from 'react';
import { IconType } from 'react-icons';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: IconType;
  isLoading?: boolean;
  fullWidth?: boolean;
}

interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: IconType;
  isLoading?: boolean;
  fullWidth?: boolean;
}

// Configuración de clases base por variante
const variantStyles = {
  primary: "bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white",
  secondary: "bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white",
  outline: "border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10",
  ghost: "text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10",
  danger: "bg-red-500 hover:bg-red-600 text-white"
};

// Configuración de tamaño
const sizeStyles = {
  sm: "py-1 px-2 text-sm",
  md: "py-2 px-4",
  lg: "py-3 px-6 text-lg"
};

// Componente Button
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  isLoading = false,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        ${variantStyles[variant]} 
        ${sizeStyles[size]} 
        ${fullWidth ? 'w-full' : ''}
        rounded-md font-medium transition-all flex items-center justify-center
        ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Cargando...
        </>
      ) : (
        <>
          {Icon && <Icon className="mr-2" size={16} />}
          {children}
        </>
      )}
    </button>
  );
}

// Componente ButtonLink
export function ButtonLink({
  children,
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  isLoading = false,
  fullWidth = false,
  className = '',
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`
        ${variantStyles[variant]} 
        ${sizeStyles[size]} 
        ${fullWidth ? 'w-full' : ''}
        rounded-md font-medium transition-all flex items-center justify-center
        ${isLoading ? 'opacity-70 pointer-events-none' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Cargando...
        </>
      ) : (
        <>
          {Icon && <Icon className="mr-2" size={16} />}
          {children}
        </>
      )}
    </Link>
  );
}