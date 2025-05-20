// src/app/page.tsx
import { getGames } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiShoppingCart, FiHeart, FiUser } from 'react-icons/fi';
import { ButtonLink } from '@/components/ui/Button';
import GameCard from '@/components/game/GameCard';

export default async function Home() {
  const { results: featuredGames } = await getGames('', 1);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] text-white py-20 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold">Descubre el universo gaming</h1>
            <p className="text-xl opacity-90">
              Explora miles de juegos, compara precios y compra tus favoritos en Fireplay.
            </p>
            <div className="flex space-x-4">
              <ButtonLink href="/games" size="lg">
                Explorar juegos
              </ButtonLink>
              <ButtonLink href="/register" variant="outline" size="lg">
                Crear cuenta
              </ButtonLink>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md h-64 md:h-96">
              <Image
                src="/hero-image.jpg"
                alt="Gaming setup"
                fill
                className="object-cover rounded-lg shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Juegos destacados</h2>
            <Link href="/games" className="flex items-center text-[var(--color-primary)] hover:underline">
              Ver todos <FiArrowRight className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredGames.slice(0, 8).map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>
      
      {/* How it works */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Cómo funciona Fireplay</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div className="mb-4 mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <FiUser size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Crea tu cuenta</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Regístrate gratis para acceder a todas las funcionalidades y guardar tus favoritos.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div className="mb-4 mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <FiHeart size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Explora y guarda</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Navega por nuestro catálogo y guarda tus juegos favoritos para no perderlos.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div className="mb-4 mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <FiShoppingCart size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Compra tus juegos</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Añade juegos a tu carrito y completa tu compra con nuestro sistema seguro.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">¿Qué es Fireplay?</h2>
            <p className="text-lg mb-6">
              Fireplay es la plataforma definitiva para descubrir, explorar y adquirir los mejores videojuegos.
              Diseñada para gamers por gamers, ofrecemos la mayor selección de títulos con información detallada.
            </p>
            <p className="text-lg mb-8">
              Utilizamos las tecnologías más modernas como Next.js 15, React 19 y Firebase para garantizar
              una experiencia fluida y segura en cualquier dispositivo.
            </p>
            <ButtonLink href="/info">
              Conocer más sobre nosotros
            </ButtonLink>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-[var(--color-primary)] text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para empezar?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete hoy a nuestra comunidad y descubre lo fácil que es encontrar tu próximo juego favorito.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <ButtonLink href="/games" variant="secondary" size="lg">
              Explorar catálogo
            </ButtonLink>
            <ButtonLink href="/register" variant="outline" size="lg">
              Crear cuenta gratuita
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}