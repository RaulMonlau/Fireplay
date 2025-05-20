// src/app/games/page.tsx
import { getGames,verifyApiKey } from '@/lib/api';
import Link from 'next/link';
import GameCard from '@/components/game/GameCard';
import { FiSearch, FiFilter } from 'react-icons/fi';

export const metadata = {
  title: 'Catálogo de juegos | Fireplay',
  description: 'Explora nuestra amplia selección de videojuegos',
};

export default async function GamesPage({
  searchParams,
}: {
  searchParams?: { page?: string; search?: string; genre?: string; platform?: string; };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const search = searchParams?.search || '';
  const genre = searchParams?.genre || '';
  const platform = searchParams?.platform || '';
   await verifyApiKey();
  const { results: games, count, next, previous } = await getGames(search, currentPage, { 
    genres: genre,
    platforms: platform
  });
  
  const totalPages = Math.ceil(count / 10);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Catálogo de juegos</h1>
      
      {/* Search and filters */}
      <div className="mb-8">
        <form className="flex flex-wrap gap-3">
          <div className="flex-grow min-w-[200px]">
            <div className="relative">
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Buscar juegos..."
                className="w-full p-3 pl-10 border rounded-md focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              />
              <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>
          
          <div className="w-full md:w-auto">
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
        {search || genre || platform ? 
          `${count} resultados encontrados` : 
          `Mostrando ${games.length} de ${count} juegos`
        }
      </p>
      
      {/* Games grid */}
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
                pathname: '/games',
                query: {
                  ...(search && { search }),
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
                pathname: '/games',
                query: {
                  ...(search && { search }),
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
      
      {/* No results */}
      {games.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No se encontraron juegos</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Intenta con otra búsqueda o explora nuestro catálogo general
          </p>
          <Link 
            href="/games" 
            className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-md inline-block"
          >
            Ver todos los juegos
          </Link>
        </div>
      )}
    </div>
  );
}