// src/components/cart/AddToCartButton.tsx
'use client';

import { useState } from 'react';
import { FiShoppingCart, FiCheck } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { CartItem } from '@/types/types';

interface AddToCartButtonProps {
  game: {
    id: number;
    name: string;
    slug: string;
    image: string;
    price: number;
  };
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function AddToCartButton({ game, fullWidth = false, variant = 'primary' }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const router = useRouter();
  
  const addToCart = () => {
    setIsAdding(true);
    
    // Recuperar carrito actual de localStorage
    const cartItems: CartItem[] = JSON.parse(localStorage.getItem('fireplayCart') || '[]');
    
    // Verificar si el juego ya está en el carrito
    const existingItemIndex = cartItems.findIndex(item => item.id === game.id);
    
    if (existingItemIndex >= 0) {
      // Si existe, incrementamos la cantidad
      cartItems[existingItemIndex].quantity += 1;
    } else {
      // Si no existe, lo añadimos
      cartItems.push({
        id: game.id,
        slug: game.slug,
        name: game.name,
        image: game.image,
        price: game.price,
        quantity: 1
      });
    }
    
    // Guardar en localStorage
    localStorage.setItem('fireplayCart', JSON.stringify(cartItems));
    
    // Animar cambio de estado
    setIsAdded(true);
    setTimeout(() => {
      setIsAdding(false);
      setTimeout(() => setIsAdded(false), 2000);
    }, 500);
    
    // Opcional: disparar un evento custom para actualizar el contador del carrito en el header
    window.dispatchEvent(new CustomEvent('cart:updated'));
  };
  
  const goToCart = () => {
    router.push('/cart');
  };
  
  return (
    <div className="flex gap-2 w-full">
      <Button 
        onClick={addToCart} 
        variant={variant}
        disabled={isAdding} 
        fullWidth={fullWidth}
        icon={isAdded ? FiCheck : FiShoppingCart}
      >
        {isAdded ? 'Añadido al carrito' : 'Añadir al carrito'}
      </Button>
      
      {isAdded && (
        <Button 
          onClick={goToCart} 
          variant="secondary"
        >
          Ver carrito
        </Button>
      )}
    </div>
  );
}