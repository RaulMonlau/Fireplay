// src/app/game/[slug]/not-found.tsx
import { FiHome, FiSearch } from 'react-icons/fi';
import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-[var(--color-primary)]">404</h1>
        <h2 className="text-2xl font-semibold mt-4 mb-6">Juego no encontrado</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Lo sentimos, pero el juego que estás buscando no existe o ha sido eliminado.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <ButtonLink href="/" icon={FiHome}>
            Volver al inicio
          </ButtonLink>
          <ButtonLink href="/games" variant="secondary" icon={FiSearch}>
            Explorar juegos
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}