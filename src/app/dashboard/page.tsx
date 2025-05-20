// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/firebase/firebase';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { FiUser, FiHeart, FiShoppingBag, FiMail, FiLogOut } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useFavorites } from '@/hooks/useFavorites';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { favorites } = useFavorites();
  const [messages, setMessages] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchMessages = async () => {
      if (!user) return;
      
      try {
        const messagesRef = collection(db, 'messages');
        const q = query(
          messagesRef,
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc'),
          limit(5)
        );
        
        const snapshot = await getDocs(q);
        const messagesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setMessages(messagesData);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    
    fetchMessages();
  }, [user]);
  
  const handleLogout = async () => {
    await logout();
    router.push('/');
  };
  
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Mi cuenta</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center mb-4">
                  <FiUser size={40} className="text-[var(--color-primary)]" />
                </div>
                <h2 className="text-xl font-semibold">{user?.displayName || 'Usuario'}</h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              
              <nav className="space-y-2">
                <Link href="/dashboard" className="flex items-center p-3 rounded-md bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  <FiUser className="mr-3" />
                  <span>Mi cuenta</span>
                </Link>
                <Link href="/favorites" className="flex items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <FiHeart className="mr-3" />
                  <span>Mis favoritos</span>
                </Link>
                <Link href="/cart" className="flex items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <FiShoppingBag className="mr-3" />
                  <span>Mi carrito</span>
                </Link>
                <Link href="/contact" className="flex items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <FiMail className="mr-3" />
                  <span>Contactar</span>
                </Link>
                <Button 
                  onClick={handleLogout} 
                  variant="ghost" 
                  icon={FiLogOut}
                  className="w-full justify-start"
                >
                  Cerrar sesión
                </Button>
              </nav>
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:col-span-3">
            {/* Welcome section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Bienvenido/a, {user?.displayName || 'Usuario'}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Desde este panel puedes gestionar tu perfil, ver tus favoritos y acceder a todas las funciones de Fireplay.
              </p>
            </div>
            
            {/* Recent favorites */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Juegos favoritos recientes</h2>
                <Link href="/favorites" className="text-[var(--color-primary)] text-sm hover:underline">
                  Ver todos
                </Link>
              </div>
              
              {favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {favorites.slice(0, 3).map((game) => (
                    <Link key={game.id} href={`/game/${game.slug}`} className="group">
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all hover:shadow-md">
                        <div className="relative h-32 w-full">
                          <Image
                            src={game.image || '/placeholder.png'}
                            alt={game.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium group-hover:text-[var(--color-primary)] transition-colors">
                            {game.name}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No tienes juegos favoritos todavía</p>
                  <Link href="/games" className="text-[var(--color-primary)] hover:underline">
                    Explorar juegos
                  </Link>
                </div>
              )}
            </div>
            
            {/* Recent messages */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Mensajes recientes</h2>
                <Link href="/contact" className="text-[var(--color-primary)] text-sm hover:underline">
                  Nuevo mensaje
                </Link>
              </div>
              
              {messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium">{message.subject}</h3>
                        <span className="text-sm text-gray-500">
                          {message.createdAt.toDate().toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                        {message.message}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No has enviado ningún mensaje todavía</p>
                  <Link href="/contact" className="text-[var(--color-primary)] hover:underline">
                    Contactar con nosotros
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}