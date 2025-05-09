import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { NAV_LINKS } from '@/lib/constants';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      <nav className={`bg-[#0A3A68]/90 backdrop-blur-md transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <a className="flex-shrink-0 flex items-center">
                  <span className="text-white font-bold text-xl md:text-2xl font-['Baloo_2']">babixGO</span>
                </a>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  className="text-white hover:text-[#FF4C00] font-bold px-3 py-2 rounded-md transition duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="flex md:hidden items-center">
              <button 
                onClick={toggleMobileMenu}
                className="text-white p-2 rounded-md hover:bg-[#0A3A68]/50 transition duration-300"
                aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
              >
                <span className="material-icons text-[#FF4C00]">
                  {mobileMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div 
          className={`md:hidden bg-[#0A3A68]/95 backdrop-blur-md transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white hover:text-[#FF4C00] block px-3 py-2 rounded-md font-bold transition duration-300"
                onClick={closeMobileMenu}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
