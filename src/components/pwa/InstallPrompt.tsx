// src/components/pwa/InstallPrompt.tsx
'use client';

import { useEffect, useState } from 'react';
import { FiDownload, FiX } from 'react-icons/fi';

export default function InstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Comprobar si ya está instalada
    const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches;
    if (isAppInstalled) return;

    // Comprobar si ya se ocultó el banner
    const hasHiddenBanner = localStorage.getItem('pwa-banner-hidden') === 'true';
    if (hasHiddenBanner) return;
    
    // Capturar evento de instalación
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowBanner(true);
    };
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);
  
  const handleInstall = async () => {
    if (!installPrompt) return;
    
    installPrompt.prompt();
    const choiceResult = await installPrompt.userChoice;
    
    setInstallPrompt(null);
    setShowBanner(false);
    
    if (choiceResult.outcome === 'accepted') {
      localStorage.setItem('pwa-banner-hidden', 'true');
    }
  };
  
  const handleDismiss = () => {
    setShowBanner(false);
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    localStorage.setItem('pwa-banner-hidden-until', expiryDate.toISOString());
  };
  
  if (!showBanner) return null;
  
  return (
    <div className="fixed bottom-0 inset-x-0 p-4 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg">Instala Fireplay</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Instala nuestra app para una mejor experiencia offline y acceso rápido.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleInstall}
            className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <FiDownload /> Instalar
          </button>
          <button
            onClick={handleDismiss}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Descartar"
          >
            <FiX size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}