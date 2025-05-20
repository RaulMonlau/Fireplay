// src/components/game/GameCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { Game } from '@/types/types';

interface GameCardProps {
  game: Game;
  isFavorite?: boolean;
  onToggleFavorite?: (gameId: number) => void;
}

export default function GameCard({ game, isFavorite = false, onToggleFavorite }: GameCardProps) {
  const { user } = useAuth();
  const [isHovering, setIsHovering] = useState(false);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(game.id);
    }
  };

  // Calculamos un precio ficticio basado en el rating (solo para simulación)
  const price = game.rating ? Math.round((game.rating * 10) - 10) + 0.99 : 19.99;
  
  return (
    <Link 
      href={`/game/${game.slug}`}
      className="group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="card overflow-hidden transition-all duration-300 h-full flex flex-col">
        {/* Image container with overlay */}
        <div className="relative h-48 overflow-hidden">
          {game.background_image ? (
            <Image
              src={game.background_image}
              alt={game.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-transform duration-500 ${isHovering ? 'scale-110 brightness-90' : 'scale-100'}`}
              priority={false}
            />
          ) : (
            <div className="bg-gray-300 dark:bg-gray-700 h-full w-full flex items-center justify-center">
              <span className="text-gray-500">No image</span>
            </div>
          )}
          
          {/* Favorite button */}
          {user && (
            <button
              onClick={handleFavoriteClick}
              className={`absolute top-2 right-2 p-2 rounded-full 
                ${isFavorite 
                  ? 'bg-[var(--color-primary)] text-white' 
                  : 'bg-black/40 text-white hover:bg-black/60'
                } transition-all`}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <FiHeart fill={isFavorite ? "white" : "none"} />
            </button>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg truncate">{game.name}</h3>
            
            {/* Genres tags */}
            {game.genres && game.genres.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {game.genres.slice(0, 2).map(genre => (
                  <span 
                    key={genre.id} 
                    className="text-xs bg-[var(--color-accent)]/10 text-[var(--color-accent)] px-2 py-1 rounded-full"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="text-[var(--color-primary)] font-bold">
              {price.toFixed(2)} €
            </div>
            {game.rating && (
              <div className="inline-flex items-center">
                <span className="bg-[var(--color-accent)] text-white text-sm px-2 py-0.5 rounded">
                  {game.rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}