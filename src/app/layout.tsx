// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import InstallPrompt from '@/components/pwa/InstallPrompt';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fireplay - Tu tienda de videojuegos',
  description: 'Descubre y compra los mejores videojuegos en Fireplay',
  manifest: '/manifest.json',
};


// src/app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#ff5500" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <InstallPrompt />
        </AuthProvider>
      </body>
    </html>
  );
}