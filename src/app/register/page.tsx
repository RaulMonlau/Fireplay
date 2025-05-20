// src/app/register/page.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { FiMail, FiLock, FiUser, FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormValues>();
  const password = watch('password');
  
  const onSubmit = async (data: RegisterFormValues) => {
    setError(null);
    setIsLoading(true);
    
    try {
      await signUp(data.email, data.password, data.name);
      router.push('/');
    } catch (err: Error | unknown) {
      setError(err instanceof Error ? err.message : 'Error al crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Crear cuenta</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Únete a Fireplay y disfruta de todas las ventajas
          </p>
        </div>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-200 rounded-md flex items-center">
            <FiAlertCircle className="mr-2 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre completo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <FiUser />
              </div>
              <input
                id="name"
                type="text"
                placeholder="Tu nombre"
                className={`pl-10 w-full p-2 border rounded-md focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } dark:bg-gray-700 dark:text-white`}
                {...register('name', { 
                  required: 'El nombre es obligatorio',
                  minLength: {
                    value: 3,
                    message: 'El nombre debe tener al menos 3 caracteres'
                  }
                })}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
            )}
          </div>
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Correo electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <FiMail />
              </div>
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                className={`pl-10 w-full p-2 border rounded-md focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } dark:bg-gray-700 dark:text-white`}
                {...register('email', { 
                  required: 'El email es obligatorio',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Dirección de email inválida'
                  }
                })}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
            )}
          </div>
          
          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <FiLock />
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className={`pl-10 w-full p-2 border rounded-md focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                  errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } dark:bg-gray-700 dark:text-white`}
                {...register('password', { 
                  required: 'La contraseña es obligatoria',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 caracteres'
                  }
                })}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
            )}
          </div>
          
          {/* Confirmar contraseña */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirmar contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <FiLock />
              </div>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className={`pl-10 w-full p-2 border rounded-md focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } dark:bg-gray-700 dark:text-white`}
                {...register('confirmPassword', { 
                  required: 'Por favor, confirma tu contraseña',
                  validate: value => value === password || 'Las contraseñas no coinciden'
                })}
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>
            )}
          </div>
          
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
          >
            Crear cuenta
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="text-[var(--color-primary)] hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}