// src/hooks/useFavorites.ts
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/firebase/firebase';
import { doc, collection, setDoc, deleteDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { FavoriteItem, Game } from '@/types/types';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Cargar favoritos al iniciar
  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const favoritesRef = collection(db, 'users', user.uid, 'favorites');
        const snapshot = await getDocs(favoritesRef);
        
        const favoritesData = snapshot.docs.map(doc => ({
          id: Number(doc.id),
          ...doc.data()
        })) as FavoriteItem[];
        
        setFavorites(favoritesData);
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user]);

  // Añadir a favoritos
  const addToFavorites = async (game: Game) => {
    if (!user) return;
    
    try {
      const favoriteItem: FavoriteItem = {
        id: game.id,
        slug: game.slug,
        name: game.name,
        image: game.background_image || '',
        added_at: new Date()
      };
      
      const docRef = doc(db, 'users', user.uid, 'favorites', game.id.toString());
      await setDoc(docRef, favoriteItem);
      
      setFavorites(prev => [...prev, favoriteItem]);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  // Eliminar de favoritos
  const removeFromFavorites = async (gameId: number) => {
    if (!user) return;
    
    try {
      const docRef = doc(db, 'users', user.uid, 'favorites', gameId.toString());
      await deleteDoc(docRef);
      
      setFavorites(prev => prev.filter(fav => fav.id !== gameId));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  // Comprobar si un juego está en favoritos
  const isFavorite = (gameId: number): boolean => {
    return favorites.some(fav => fav.id === gameId);
  };

  // Toggle favorito
  const toggleFavorite = async (game: Game) => {
    if (isFavorite(game.id)) {
      await removeFromFavorites(game.id);
    } else {
      await addToFavorites(game);
    }
  };

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite
  };
}