'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import Image from 'next/image';
import Link from 'next/link';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import AddToCartButton from '@/components/cart/AddToCartButton';
import { FavoriteItem } from '@/types/types';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  // Cargar favoritos desde Firestore
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        const q = query(collection(db, 'favorites'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        
        const favoritesData: FavoriteItem[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as FavoriteItem;
          favoritesData.push({
            id: data.id,
            slug: data.slug,
            name: data.name,
            image: data.image,
            added_at: data.added_at instanceof Date 
              ? data.added_at 
              : (data.added_at && typeof data.added_at === 'object' && 'seconds' in (data.added_at as any))
                ? new Date((data.added_at as any).seconds * 1000)
                : new Date()
          });
        });
        
        // Ordenar por fecha de adición (más reciente primero)
        favoritesData.sort((a, b) => b.added_at.getTime() - a.added_at.getTime());
        
        setFavorites(favoritesData);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFavorites();
  }, [user]);
  
  // Eliminar un juego de favoritos
  const removeFromFavorites = async (gameId: number) => {
    if (!user) return;
    
    try {
      const favoriteId = `${user.uid}_${gameId}`;
      await deleteDoc(doc(db, 'favorites', favoriteId));
      
      setFavorites(prev => prev.filter(item => item.id !== gameId));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 w-48 mb-8 rounded"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 w-full max-w-3xl rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold mb-6">Mis favoritos</h1>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 max-w-md mx-auto">
          <p className="mb-4">Necesitas iniciar sesión para ver tus favoritos.</p>
          <Link 
            href="/login?redirect=/favorites"
            className="inline-block bg-[var(--color-primary)] text-white px-4 py-2 rounded-md"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mis favoritos</h1>
      
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((game) => (
            <div 
              key={game.id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              <div className="relative h-48">
                <Image
                  src={game.image || '/placeholder.png'}
                  alt={game.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={`/game/${game.slug}`} className="hover:text-[var(--color-primary)]">
                    {game.name}
                  </Link>
                </h2>
                
                <p className="text-sm text-gray-500 mb-4">
                  Añadido el {game.added_at.toLocaleDateString()}
                </p>
                
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => removeFromFavorites(game.id)}
                    variant="outline"
                    icon={FiTrash2}
                    aria-label="Eliminar de favoritos"
                  >
                    Eliminar
                  </Button>
                  
                  <AddToCartButton
                    game={{
                      id: game.id,
                      slug: game.slug,
                      name: game.name,
                      image: game.image,
                      price: 19.99 // Precio estimado
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">No tienes juegos en favoritos</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Explora nuestro catálogo y añade juegos a tus favoritos para verlos aquí.
          </p>
          <Link 
            href="/games" 
            className="inline-block bg-[var(--color-primary)] text-white px-6 py-2 rounded-md"
          >
            Explorar juegos
          </Link>
        </div>
      )}
    </div>
  );
}