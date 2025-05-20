// src/app/search/page.tsx
import { getGames } from '@/lib/api';
import Link from 'next/link';
import GameCard from '@/components/game/GameCard';
import { FiArrowLeft, FiFilter } from 'react-icons/fi';

export const metadata = {
  title: 'Resultados de búsqueda | Fireplay',
  description: 'Encuentra tu próximo juego favorito en Fireplay',
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string; genre?: string; platform?: string; };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const genre = searchParams?.genre || '';
  const platform = searchParams?.platform || '';
  
  const { results: games, count, next, previous } = await getGames(query, currentPage, { 
    genres: genre,
    platforms: platform
  });
  
  const totalPages = Math.ceil(count / 10);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Resultados de búsqueda</h1>
          {query && (
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Mostrando resultados para: <span className="font-medium">"{query}"</span>
            </p>
          )}
        </div>
        
        <Link 
          href="/games" 
          className="flex items-center text-[var(--color-primary)] hover:underline"
        >
          <FiArrowLeft className="mr-2" />
          Volver al catálogo
        </Link>
      </div>
      
      {/* Filters */}
      <div className="mb-8">
        <form className="flex flex-wrap gap-3">
          <input type="hidden" name="query" value={query} />
          
          <div className="w-full md:w-auto flex-grow">
            <div className="relative">
              <select 
                name="genre"
                defaultValue={genre}
                className="w-full md:w-48 p-3 pl-10 border rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent appearance-none"
              >
                <option value="">Todos los géneros</option>
                <option value="action">Acción</option>
                <option value="adventure">Aventura</option>
                <option value="rpg">RPG</option>
                <option value="shooter">Shooter</option>
                <option value="strategy">Estrategia</option>
                <option value="puzzle">Puzzle</option>
                <option value="racing">Carreras</option>
                <option value="sports">Deportes</option>
              </select>
              <FiFilter className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>
          
          <div className="w-full md:w-auto">
            <div className="relative">
              <select 
                name="platform"
                defaultValue={platform}
                className="w-full md:w-48 p-3 pl-10 border rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent appearance-none"
              >
                <option value="">Todas las plataformas</option>
                <option value="4">PC</option>
                <option value="187">PlayStation 5</option>
                <option value="18">PlayStation 4</option>
                <option value="1">Xbox One</option>
                <option value="186">Xbox Series S/X</option>
                <option value="7">Nintendo Switch</option>
              </select>
              <FiFilter className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-6 py-3 rounded-md transition-colors"
          >
            Filtrar
          </button>
        </form>
      </div>
      
      {/* Results count */}
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        {count === 0 ? 'No se encontraron resultados' : `${count} resultados encontrados`}
      </p>
      
      {/* Games grid */}
      {games.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              {currentPage > 1 && (
                <Link
                  href={{
                    pathname: '/search',
                    query: {
                      query,
                      ...(genre && { genre }),
                      ...(platform && { platform }),
                      page: currentPage - 1
                    }
                  }}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Anterior
                </Link>
              )}
              
              <span className="px-4 py-2">
                Página {currentPage} de {totalPages}
              </span>
              
              {next && (
                <Link
                  href={{
                    pathname: '/search',
                    query: {
                      query,
                      ...(genre && { genre }),
                      ...(platform && { platform }),
                      page: currentPage + 1
                    }
                  }}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Siguiente
                </Link>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">No se encontraron resultados para "{query}"</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Prueba con otras palabras clave o explora nuestro catálogo completo de juegos.
          </p>
          <Link 
            href="/games" 
            className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-md inline-block"
          >
            Explorar catálogo
          </Link>
        </div>
      )}
    </div>
  );
}