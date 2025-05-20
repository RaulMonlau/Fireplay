'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !user) {
      // Redirigir a login si no hay usuario autenticado
      router.push('/login');
    }
  }, [user, loading, router]);
  
  // Mostrar nada mientras carga o redirige
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="mt-4 h-4 bg-gray-200 dark:bg-gray-700 w-24 rounded"></div>
        </div>
      </div>
    );
  }
  
  // Mostrar el contenido de la ruta protegida
  return <>{children}</>;
}