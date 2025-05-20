// src/app/game/[slug]/page.tsx
import { getGameDetails, getGameScreenshots } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiStar, FiShoppingCart } from 'react-icons/fi';
import { ButtonLink } from '@/components/ui/Button';

export default async function GamePage({ params }: { params: { slug: string } }) {
  const game = await getGameDetails(params.slug);
  const screenshots = await getGameScreenshots(params.slug);
  
  if (!game) {
    notFound();
  }

  // Calcular precio ficticio basado en rating
  const price = game.rating ? Math.round((game.rating * 10) - 10) + 0.99 : 19.99;
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <nav className="text-sm">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/" className="text-gray-500 hover:text-[var(--color-primary)]">
                Inicio
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <Link href="/games" className="text-gray-500 hover:text-[var(--color-primary)]">
                Juegos
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-[var(--color-primary)]">{game.name}</li>
          </ol>
        </nav>
      </div>
      
      {/* Game Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Main image */}
        <div className="md:w-1/2">
          <div className="relative rounded-lg overflow-hidden aspect-video">
            <Image
              src={game.background_image || '/placeholder.png'}
              alt={game.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        
        {/* Game details */}
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{game.name}</h1>
          
          {/* Rating */}
          {game.rating && (
            <div className="flex items-center mb-4">
              <div className="bg-[var(--color-accent)] text-white py-1 px-3 rounded-md flex items-center">
                <FiStar className="mr-1" />
                <span className="font-semibold">{game.rating.toFixed(1)}</span>
              </div>
              <span className="text-sm text-gray-500 ml-2">
                ({game.ratings_count || 0} valoraciones)
              </span>
            </div>
          )}
          
          {/* Genres & Tags */}
          {game.genres && game.genres.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {game.genres.map(genre => (
                  <span key={genre.id} className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Release date */}
          {game.released && (
            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-semibold">Fecha de lanzamiento:</span> {new Date(game.released).toLocaleDateString()}
              </p>
            </div>
          )}
          
          {/* Platforms */}
          {game.platforms && game.platforms.length > 0 && (
            <div className="mb-6">
              <p className="font-semibold mb-1">Plataformas:</p>
              <div className="flex flex-wrap gap-2">
                {game.platforms.map(({ platform }) => (
                  <span key={platform.id} className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md">
                    {platform.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Call to action */}
          <div className="mt-8">
            <div className="flex items-center mb-4">
              <div className="text-3xl font-bold text-[var(--color-primary)]">
                {price.toFixed(2)} €
              </div>
              <div className="ml-4 line-through text-gray-500">
                {(price * 1.3).toFixed(2)} €
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <ButtonLink 
                href={`/product-sheet/${game.slug}`} 
                fullWidth
                icon={FiShoppingCart}
              >
                Comprar ahora
              </ButtonLink>
              <ButtonLink
                href={`/cart?add=${game.id}&slug=${game.slug}&name=${encodeURIComponent(game.name)}&image=${encodeURIComponent(game.background_image || '')}`}
                variant="outline"
                fullWidth
              >
                Añadir al carrito
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
      
      {/* Game description */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Descripción</h2>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <div dangerouslySetInnerHTML={{ __html: game.description || game.description_raw || 'No hay descripción disponible.' }} />
        </div>
      </section>
      
      {/* Screenshots */}
      {screenshots && screenshots.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Capturas de pantalla</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {screenshots.slice(0, 6).map((screenshot: { id: number, image: string }) => (
                <div key={screenshot.id} className="relative rounded-lg overflow-hidden aspect-video">
                    <Image
                        src={screenshot.image}
                        alt={`Screenshot of ${game.name}`}
                        fill
                        className="object-cover"
                    />
                </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Call to action */}
      <section className="mt-12 bg-[var(--color-primary)]/10 rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold mb-3">
          ¿Quieres ver más detalles, opiniones y la ficha técnica completa?
        </h2>
        <ButtonLink href={`/product-sheet/${game.slug}`} variant="primary" size="lg">
          Ver ficha técnica completa
        </ButtonLink>
      </section>
    </div>
  );
}