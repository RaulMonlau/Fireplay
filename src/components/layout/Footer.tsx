import Link from 'next/link';
import { 
  FiGithub, 
  FiTwitter, 
  FiInstagram, 
  FiMail
} from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[var(--color-secondary)] text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Fireplay</h3>
            <p className="text-gray-300 text-sm">
              Tu tienda online de videojuegos. Explora, descubre y compra los mejores títulos del mercado.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/games" className="hover:text-white transition-colors">
                  Catálogo de juegos
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-white transition-colors">
                  Mis favoritos
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Carrito
                </Link>
              </li>
              <li>
                <Link href="/info" className="hover:text-white transition-colors">
                  Acerca de nosotros
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Help */}
          <div>
            <h3 className="text-lg font-bold mb-4">Ayuda</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/info#faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/info#privacy" className="hover:text-white transition-colors">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/info#terms" className="hover:text-white transition-colors">
                  Términos de servicio
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Social */}
          <div>
            <h3 className="text-lg font-bold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[var(--color-primary)] transition-colors">
                <FiTwitter size={24} />
              </a>
              <a href="#" className="hover:text-[var(--color-primary)] transition-colors">
                <FiInstagram size={24} />
              </a>
              <a href="#" className="hover:text-[var(--color-primary)] transition-colors">
                <FiGithub size={24} />
              </a>
              <a href="mailto:info@fireplay.com" className="hover:text-[var(--color-primary)] transition-colors">
                <FiMail size={24} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom credits */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-center text-gray-400">
          <p>© {currentYear} Fireplay. Todos los derechos reservados.</p>
          <p className="mt-2">Desarrollado con Next.js 15, React 19, Firebase y Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}