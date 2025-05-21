// src/components/game/FavoriteButton.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiHeart } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';
import { Game } from '@/types/types';

interface FavoriteButtonProps {
  game: Game;
  className?: string;
  iconOnly?: boolean;
}

export default function FavoriteButton({ game, className = '', iconOnly = false }: FavoriteButtonProps) {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const isFav = isFavorite(game.id);
  
  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      console.log('User not logged in, redirecting to login');
      router.push('/login?redirect=/games');
      return;
    }
    
    setIsLoading(true);
    console.log('Toggling favorite for game:', game.name, 'Current state:', isFav);
    
    try {
      await toggleFavorite(game);
      console.log('Toggle favorite completed');
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`
        ${className}
        ${iconOnly ? 'p-2' : 'px-4 py-2'}
        ${isFav 
          ? 'text-red-500 hover:text-red-600' 
          : 'text-gray-400 hover:text-red-500'
        }
        transition-colors duration-200 focus:outline-none
      `}
      aria-label={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
    >
      <FiHeart 
        className={`${isFav ? 'fill-current' : ''} ${isLoading ? 'animate-pulse' : ''}`} 
        size={iconOnly ? 20 : 18} 
      />
      {!iconOnly && (
        <span className="ml-2">{isFav ? 'Quitar de favoritos' : 'Añadir a favoritos'}</span>
      )}
    </button>
  );
}