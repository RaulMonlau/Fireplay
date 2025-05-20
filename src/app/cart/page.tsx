// src/app/cart/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { CartItem } from '@/types/types';
import { useAuth } from '@/contexts/AuthContext';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();
  
  // Cargar carrito de localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('fireplayCart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    setLoading(false);
    
    // Escuchar cambios en el carrito
    const handleCartUpdate = () => {
      const updatedCart = localStorage.getItem('fireplayCart');
      if (updatedCart) {
        setCartItems(JSON.parse(updatedCart));
      }
    };
    
    window.addEventListener('cart:updated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cart:updated', handleCartUpdate);
    };
  }, []);
  
  // Calcular totales
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.21; // 21% IVA
  const total = subtotal + tax;
  
  // Eliminar un producto
  const removeItem = (itemId: number) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('fireplayCart', JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent('cart:updated'));
  };
  
  // Actualizar cantidad
  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('fireplayCart', JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent('cart:updated'));
  };
  
  // Proceso de checkout
  const handleCheckout = () => {
    if (!user) {
      router.push('/login?redirect=/cart');
      return;
    }
    
    // Aquí iría la lógica de checkout real
    router.push('/cart/checkout');
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
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Carrito de compra</h1>
      
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left">Producto</th>
                    <th className="py-3 px-4 text-center">Precio</th>
                    <th className="py-3 px-4 text-center">Cantidad</th>
                    <th className="py-3 px-4 text-right">Total</th>
                    <th className="py-3 px-4 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {cartItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="h-16 w-16 relative flex-shrink-0">
                            <Image
                              src={item.image || '/placeholder.png'}
                              alt={item.name}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div className="ml-4">
                            <Link 
                              href={`/game/${item.slug}`}
                              className="font-semibold text-[var(--color-primary)] hover:underline"
                            >
                              {item.name}
                            </Link>
                            <p className="text-sm text-gray-500">Código digital</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {item.price.toFixed(2)} €
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                            disabled={item.quantity <= 1}
                          >
                            <FiMinus size={16} />
                          </button>
                          <span className="w-10 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                          >
                            <FiPlus size={16} />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-semibold">
                        {(item.price * item.quantity).toFixed(2)} €
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                          aria-label="Eliminar"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                  <span>{subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">IVA (21%)</span>
                  <span>{tax.toFixed(2)} €</span>
                </div>
                <div className="border-t pt-3 mt-3 border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-[var(--color-primary)]">{total.toFixed(2)} €</span>
                  </div>
                </div>
              </div>
              
              <Button
                className="mt-6"
                fullWidth
                onClick={handleCheckout}
                icon={FiShoppingBag}
              >
                Proceder al pago
              </Button>
              
              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                <p>Al proceder con la compra aceptas nuestros términos y condiciones.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Explora nuestro catálogo y añade juegos a tu carrito.
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