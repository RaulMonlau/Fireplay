// src/hooks/useFavorites.ts
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/firebase/firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  onSnapshot,
  orderBy,
  query
} from 'firebase/firestore';
import { Game } from '@/types/types';

export interface FavoriteItem {
  id: number;
  slug: string;
  name: string;
  image: string;
  added_at: Date;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Suscribirse a cambios en favoritos en tiempo real
  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return () => {};
    }

    console.log('Setting up favorites listener for user:', user.uid);
    setLoading(true);
    
    // Ruta correcta a la subcolección de favoritos
    const favoritesRef = collection(db, 'users', user.uid, 'favorites');
    const q = query(favoritesRef, orderBy('added_at', 'desc'));
    
    // Crear suscripción en tiempo real
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        console.log('Favorites snapshot received:', snapshot.size, 'documents');
        const favoritesData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: Number(doc.id),
            slug: data.slug,
            name: data.name,
            image: data.image,
            added_at: data.added_at?.toDate() || new Date()
          };
        });
        
        console.log('Parsed favorites:', favoritesData);
        setFavorites(favoritesData);
        setLoading(false);
      }, 
      (error) => {
        console.error('Error getting favorites:', error);
        setLoading(false);
      }
    );
    
    return () => {
      console.log('Cleaning up favorites listener');
      unsubscribe();
    };
  }, [user]);

  // Añadir a favoritos
  const addToFavorites = async (game: Game) => {
    if (!user) {
      throw new Error('User must be logged in to add favorites');
    }
    
    console.log('Adding game to favorites:', game.name);
    
    const favoriteItem = {
      id: game.id,
      slug: game.slug,
      name: game.name,
      image: game.background_image || '',
      added_at: new Date()
    };
    
    try {
      // Asegurarse de que la colección 'users/{uid}/favorites' existe
      const userDocRef = doc(db, 'users', user.uid);
      const favDocRef = doc(userDocRef, 'favorites', game.id.toString());
      
      await setDoc(favDocRef, favoriteItem);
      console.log('Game added to favorites successfully');
      
      return true;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  };

  // Eliminar de favoritos
  const removeFromFavorites = async (gameId: number) => {
    if (!user) {
      throw new Error('User must be logged in to remove favorites');
    }
    
    console.log('Removing game from favorites:', gameId);
    
    try {
      const favDocRef = doc(db, 'users', user.uid, 'favorites', gameId.toString());
      await deleteDoc(favDocRef);
      console.log('Game removed from favorites successfully');
      
      return true;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
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
      return false; // Ya no es favorito
    } else {
      await addToFavorites(game);
      return true; // Ahora es favorito
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