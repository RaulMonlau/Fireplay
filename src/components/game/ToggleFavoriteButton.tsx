// src/components/game/ToggleFavoriteButton.tsx
'use client';

import { useState, useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';
import { useRouter } from 'next/navigation';

interface GameInfo {
  id: number;
  slug: string;
  name: string;
  image?: string;
}

interface ToggleFavoriteButtonProps {
  game: GameInfo;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  fullWidth?: boolean;
}

export default function ToggleFavoriteButton({ 
  game, 
  variant = 'outline',
  fullWidth = false 
}: ToggleFavoriteButtonProps) {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const router = useRouter();
  const [isFav, setIsFav] = useState(false);
  
  // Comprobar estado inicial
  useEffect(() => {
    setIsFav(isFavorite(game.id));
  }, [isFavorite, game.id]);
  
  const handleToggleFavorite = async () => {
    if (!user) {
      router.push(`/login?redirect=/game/${game.slug}`);
      return;
    }
    
    setIsFav(!isFav); // Optimistic update
    await toggleFavorite({
      id: game.id,
      slug: game.slug,
      name: game.name,
      background_image: game.image
    } as any);
  };
  
  return (
    <Button
      onClick={handleToggleFavorite}
      variant={isFav ? 'primary' : variant}
      icon={FiHeart}
      aria-label={isFav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      fullWidth={fullWidth}
    >
      {isFav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
    </Button>
  );
}