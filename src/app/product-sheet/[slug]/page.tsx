// src/app/product-sheet/[slug]/page.tsx
import { getGameDetails, getGameScreenshots } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiStar, FiShoppingCart, FiHeart, FiCheck, FiX } from 'react-icons/fi';
import { ButtonLink } from '@/components/ui/Button';
import AddToCartButton from '@/components/cart/AddToCartButton';
import ToggleFavoriteButton from '@/components/game/ToggleFavoriteButton';

// Generar metadatos dinámicos para SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const game = await getGameDetails(params.slug);
  
  if (!game) {
    return {
      title: 'Juego no encontrado | Fireplay',
      description: 'El juego que buscas no está disponible',
    };
  }
  
  return {
    title: `${game.name} | Fireplay`,
    description: game.description_raw?.substring(0, 160) || `Compra ${game.name} en Fireplay a los mejores precios`,
    openGraph: {
      images: [{ url: game.background_image }],
    },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const game = await getGameDetails(params.slug);
  const screenshots = await getGameScreenshots(params.slug);
  
  if (!game) {
    notFound();
  }

  // Calcular precio ficticio basado en rating
  const price = game.rating ? Math.round((game.rating * 10) - 10) + 0.99 : 19.99;
  const originalPrice = (price * 1.3).toFixed(2);
  const discount = Math.round(((price * 1.3 - price) / (price * 1.3)) * 100);
  
  // Disponibilidad (simulada)
  const isAvailable = true;
  
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Columna izquierda - Imágenes */}
        <div className="lg:col-span-2">
          {/* Imagen principal */}
          <div className="relative rounded-lg overflow-hidden aspect-video mb-4">
            <Image
              src={game.background_image || '/placeholder.png'}
              alt={game.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Galería de imágenes */}
          {screenshots && screenshots.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {screenshots.slice(0, 4).map((screenshot: { id: number; image: string }) => (
                <div key={screenshot.id} className="relative rounded-lg overflow-hidden aspect-video">
                  <Image
                    src={screenshot.image}
                    alt={`Screenshot of ${game.name}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}
          
          {/* Detalles */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Detalles del juego</h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: game.description || game.description_raw || 'No hay descripción disponible.' }} />
            </div>
            
            {/* Specs y requisitos */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Características</h3>
                <ul className="space-y-2">
                  {game.tags && game.tags.slice(0, 6).map(tag => (
                    <li key={tag.id} className="flex items-center">
                      <FiCheck className="mr-2 text-green-500" />
                      {tag.name}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Plataformas</h3>
                <ul className="space-y-2">
                  {game.platforms && game.platforms.map(({ platform }) => (
                    <li key={platform.id} className="flex items-center">
                      <FiCheck className="mr-2 text-green-500" />
                      {platform.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Desarrollador y publisher */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Desarrollador</h3>
                <p>{game.developers?.map(dev => dev.name).join(', ') || 'No especificado'}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Publicador</h3>
                <p>{game.publishers?.map(pub => pub.name).join(', ') || 'No especificado'}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Columna derecha - Información de compra */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <h1 className="text-3xl font-bold mb-3">{game.name}</h1>
            
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
            
            {/* Disponibilidad */}
            <div className="mt-4 mb-4">
              {isAvailable ? (
                <div className="flex items-center text-green-600">
                  <FiCheck className="mr-2" />
                  <span>En stock</span>
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <FiX className="mr-2" />
                  <span>Agotado</span>
                </div>
              )}
            </div>
            
            {/* Precio */}
            <div className="mt-6">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-[var(--color-primary)]">
                  {price.toFixed(2)} €
                </div>
                <div className="ml-3">
                  <span className="line-through text-gray-500">
                    {originalPrice} €
                  </span>
                  <span className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                    -{discount}%
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Impuestos incluidos
              </p>
            </div>
            
            {/* Botones de acción */}
            <div className="mt-6 space-y-3">
              <AddToCartButton 
                game={{
                  id: game.id,
                  name: game.name,
                  slug: game.slug,
                  image: game.background_image,
                  price: price
                }}
                fullWidth
              />
              
              <div className="flex space-x-3">
                <ToggleFavoriteButton
                  game={{
                    id: game.id,
                    name: game.name,
                    slug: game.slug,
                    image: game.background_image,
                  }}
                  variant="outline"
                  fullWidth
                />
                
                <ButtonLink
                  href={game.website || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  fullWidth
                >
                  Sitio oficial
                </ButtonLink>
              </div>
            </div>
            
            {/* Información adicional */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-3">Información de entrega</h3>
              <ul className="text-sm space-y-2">
                <li className="flex items-center">
                  <FiCheck className="mr-2 text-green-500" />
                  Descarga digital inmediata
                </li>
                <li className="flex items-center">
                  <FiCheck className="mr-2 text-green-500" />
                  Activación mediante código
                </li>
                <li className="flex items-center">
                  <FiCheck className="mr-2 text-green-500" />
                  Soporte 24/7
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}