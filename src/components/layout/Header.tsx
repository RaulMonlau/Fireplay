'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { FiMenu, FiX, FiUser, FiShoppingCart, FiHeart, FiSearch } from 'react-icons/fi';

export default function Header() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-[var(--color-primary)] text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            Fireplay
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/games" className="hover:text-white/80 transition-colors">
              Juegos
            </Link>
            <Link href="/info" className="hover:text-white/80 transition-colors">
              Info
            </Link>
            <Link href="/contact" className="hover:text-white/80 transition-colors">
              Contacto
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <input
              type="text"
              placeholder="Buscar juegos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-1 px-3 rounded-l-md text-gray-800 focus:outline-none"
            />
            <button 
              type="submit" 
              className="bg-[var(--color-accent)] py-1 px-3 rounded-r-md"
            >
              <FiSearch />
            </button>
          </form>

          {/* User Menu - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/favorites" className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <FiHeart size={20} />
            </Link>
            <Link href="/cart" className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <FiShoppingCart size={20} />
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <Link href="/dashboard" className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <FiUser size={18} />
                  </div>
                  <span className="text-sm">{user.displayName || 'Usuario'}</span>
                </Link>
                <button 
                  onClick={() => logout()} 
                  className="text-sm bg-white/10 hover:bg-white/20 py-2 px-3 rounded-md transition-colors"
                >
                  Salir
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="bg-white/10 hover:bg-white/20 py-2 px-4 rounded-md transition-colors"
              >
                Acceder
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-4 space-y-4">
            <form onSubmit={handleSearch} className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Buscar juegos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="py-2 px-3 rounded-l-md text-gray-800 w-full focus:outline-none"
              />
              <button 
                type="submit" 
                className="bg-[var(--color-accent)] py-2 px-4 rounded-r-md"
              >
                <FiSearch />
              </button>
            </form>
            
            <nav className="flex flex-col space-y-3">
              <Link href="/games" className="py-2 px-3 hover:bg-white/10 rounded-md">
                Juegos
              </Link>
              <Link href="/favorites" className="py-2 px-3 hover:bg-white/10 rounded-md">
                Favoritos
              </Link>
              <Link href="/cart" className="py-2 px-3 hover:bg-white/10 rounded-md">
                Carrito
              </Link>
              <Link href="/info" className="py-2 px-3 hover:bg-white/10 rounded-md">
                Info
              </Link>
              <Link href="/contact" className="py-2 px-3 hover:bg-white/10 rounded-md">
                Contacto
              </Link>
              
              {user ? (
                <>
                  <Link href="/dashboard" className="py-2 px-3 hover:bg-white/10 rounded-md">
                    Mi Cuenta
                  </Link>
                  <button 
                    onClick={() => logout()} 
                    className="text-left py-2 px-3 hover:bg-white/10 rounded-md"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Link href="/login" className="py-2 px-3 hover:bg-white/10 rounded-md">
                  Acceder / Registrarse
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}