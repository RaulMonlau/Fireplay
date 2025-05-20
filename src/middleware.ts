// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

// Rutas que requieren autenticación
const protectedRoutes = [
  '/dashboard',
  '/favorites',
  '/cart/checkout',
];

// Rutas accesibles solo para usuarios NO autenticados
const authRoutes = [
  '/login',
  '/register',
];

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('fireplayAuth')?.value;
  
  // Verificar si la ruta actual está en rutas protegidas
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(`${route}/`)
  );
  
  // Verificar si la ruta actual es una ruta de autenticación
  const isAuthRoute = authRoutes.some(route => request.nextUrl.pathname === route);
  
  // Redirigir a login si intenta acceder a una ruta protegida sin estar autenticado
  if (isProtectedRoute && !currentUser) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }
  
  // Redirigir al dashboard si intenta acceder a login/register estando ya autenticado
  if (isAuthRoute && currentUser) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/favorites/:path*',
    '/cart/checkout',
    '/login',
    '/register',
  ],
};