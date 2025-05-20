// src/app/offline/page.tsx
import Link from 'next/link';
import { FiWifiOff, FiRefreshCw } from 'react-icons/fi';

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-full">
            <FiWifiOff size={64} className="text-[var(--color-primary)]" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Sin conexión</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
          Parece que no tienes conexión a Internet. Algunas funciones pueden no estar disponibles.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => window.location.reload()} 
            className="flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-md font-medium"
          >
            <FiRefreshCw />
            Intentar de nuevo
          </button>
          <Link 
            href="/"
            className="flex items-center justify-center bg-gray-200 dark:bg-gray-700 px-6 py-3 rounded-md font-medium"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}