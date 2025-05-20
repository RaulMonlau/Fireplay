// src/hooks/useCart.ts
'use client';

import { useState, useEffect } from 'react';
import { CartItem } from '@/types/types';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Cargar carrito al iniciar
  useEffect(() => {
    setLoading(true);
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
  
  // Añadir al carrito
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
    
    let newCartItems: CartItem[];
    
    if (existingItemIndex >= 0) {
      // Si el producto ya existe en el carrito, incrementar cantidad
      newCartItems = [...cartItems];
      newCartItems[existingItemIndex].quantity += 1;
    } else {
      // Si es un producto nuevo, añadir con cantidad 1
      newCartItems = [...cartItems, { ...item, quantity: 1 }];
    }
    
    setCartItems(newCartItems);
    localStorage.setItem('fireplayCart', JSON.stringify(newCartItems));
    window.dispatchEvent(new CustomEvent('cart:updated'));
  };
  
  // Eliminar del carrito
  const removeFromCart = (itemId: number) => {
    const newCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(newCartItems);
    localStorage.setItem('fireplayCart', JSON.stringify(newCartItems));
    window.dispatchEvent(new CustomEvent('cart:updated'));
  };
  
  // Actualizar cantidad
  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity < 1) return;
    
    const newCartItems = cartItems.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    );
    
    setCartItems(newCartItems);
    localStorage.setItem('fireplayCart', JSON.stringify(newCartItems));
    window.dispatchEvent(new CustomEvent('cart:updated'));
  };
  
  // Calcular totales
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.21; // 21% IVA
  const total = subtotal + tax;
  
  // Vaciar carrito
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('fireplayCart');
    window.dispatchEvent(new CustomEvent('cart:updated'));
  };
  
  return {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    tax,
    total
  };
}