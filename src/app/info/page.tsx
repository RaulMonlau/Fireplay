// src/app/info/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiInfo, FiHelpCircle, FiFileText, FiShield } from 'react-icons/fi';

export const metadata = {
  title: 'Información | Fireplay',
  description: 'Información sobre Fireplay, nuestra empresa y políticas',
};

export default function InfoPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Acerca de Fireplay</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FiInfo className="mr-2" /> Índice
            </h2>
            <nav className="space-y-2">
              <a href="#about" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                Sobre nosotros
              </a>
              <a href="#faq" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                Preguntas frecuentes
              </a>
              <a href="#terms" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                Términos de uso
              </a>
              <a href="#privacy" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                Política de privacidad
              </a>
            </nav>
          </div>
        </aside>
        
        <div className="lg:col-span-2 space-y-12">
          {/* About section */}
          <section id="about" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FiInfo className="mr-2 text-[var(--color-primary)]" /> Sobre nosotros
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Fireplay es una plataforma moderna para descubrir, explorar y adquirir videojuegos de todas las plataformas.
                Fundada en 2024, nuestra misión es proporcionar a los jugadores una experiencia de compra intuitiva, segura y personalizada.
              </p>
              <p>
                Desarrollada con las últimas tecnologías web como Next.js 15, React 19 y Firebase, Fireplay ofrece una experiencia
                de usuario fluida y responsiva en cualquier dispositivo.
              </p>
              <p>
                Nuestra base de datos cuenta con miles de títulos, descripciones detalladas, capturas de pantalla y toda 
                la información que necesitas para tomar la mejor decisión de compra.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose mt-8">
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3">Misión</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Conectar a jugadores con los mejores juegos de manera sencilla y transparente.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3">Visión</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Ser la plataforma de referencia para la compra de videojuegos en línea.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3">Valores</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Transparencia, innovación, pasión por los videojuegos y satisfacción del cliente.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* FAQ section */}
          <section id="faq" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FiHelpCircle className="mr-2 text-[var(--color-primary)]" /> Preguntas frecuentes
            </h2>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">¿Cómo funciona el proceso de compra?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Simplemente explora nuestro catálogo, añade los juegos deseados al carrito y completa la compra. 
                  Recibirás una clave de activación para la plataforma correspondiente.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">¿Qué métodos de pago aceptan?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Aceptamos tarjetas de crédito/débito, PayPal, transferencias bancarias y varias criptomonedas.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">¿Cuánto tiempo tarda en llegar mi clave de juego?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Las claves se entregan instantáneamente después de confirmar el pago. En caso de revisión manual, 
                  puede tardar hasta 24 horas.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">¿Tienen política de devoluciones?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Debido a la naturaleza digital de nuestros productos, no podemos ofrecer reembolsos por claves ya entregadas. 
                  Sin embargo, estamos aquí para ayudarte con cualquier problema técnico.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">¿Cómo puedo contactar con el servicio de atención al cliente?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Puedes ponerte en contacto con nuestro equipo de soporte a través de nuestro <Link href="/contact" className="text-[var(--color-primary)] hover:underline">formulario de contacto</Link> o 
                  mediante nuestro email: soporte@fireplay.com.
                </p>
              </div>
            </div>
          </section>
          
          {/* Terms of Service */}
          <section id="terms" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FiFileText className="mr-2 text-[var(--color-primary)]" /> Términos de uso
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Al utilizar Fireplay, aceptas cumplir con estos términos de servicio. Por favor, léelos cuidadosamente.
              </p>
              
              <h3>1. Uso del servicio</h3>
              <p>
                Debes tener al menos 18 años o la mayoría de edad en tu jurisdicción para usar Fireplay. 
                Eres responsable de mantener la confidencialidad de tu cuenta y contraseña.
              </p>
              
              <h3>2. Licencias y claves</h3>
              <p>
                Las claves digitales vendidas en Fireplay son para uso personal y no comercial. 
                No se permite la reventa o distribución de estas claves.
              </p>
              
              <h3>3. Comportamiento del usuario</h3>
              <p>
                No debes utilizar el servicio para actividades fraudulentas, ilegales o no autorizadas.
              </p>
              
              <h3>4. Cambios en los términos</h3>
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación.
              </p>
            </div>
          </section>
          
          {/* Privacy Policy */}
          <section id="privacy" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FiShield className="mr-2 text-[var(--color-primary)]" /> Política de privacidad
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                En Fireplay nos tomamos muy en serio la privacidad de nuestros usuarios. Esta política describe cómo recopilamos, usamos y protegemos tu información.
              </p>
              
              <h3>1. Información que recopilamos</h3>
              <p>
                Recopilamos información que proporcionas al registrarte, como tu nombre, dirección de correo electrónico, 
                y los datos de pago necesarios para procesar tus compras.
              </p>
              
              <h3>2. Uso de la información</h3>
              <p>
                Utilizamos tu información para gestionar tu cuenta, procesar pedidos, personalizar tu experiencia y enviarte actualizaciones importantes.
              </p>
              
              <h3>3. Protección de datos</h3>
              <p>
                Implementamos medidas de seguridad para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción.
              </p>
              
              <h3>4. Cookies</h3>
              <p>
                Utilizamos cookies para mejorar tu experiencia, analizar el uso del sitio y personalizar el contenido.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}