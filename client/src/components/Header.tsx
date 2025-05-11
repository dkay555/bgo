import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { NAV_LINKS } from '@/lib/constants';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

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
              <Link href="/" className="flex-shrink-0 flex items-center">
                <span className="text-white font-bold text-xl md:text-2xl font-['Baloo_2']">babixGO</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {NAV_LINKS.map((link) => 
                link.href.startsWith('#') ? (
                  <a 
                    key={link.name}
                    href={link.href} 
                    className="text-white hover:text-[#FF4C00] font-bold px-3 py-2 rounded-md transition duration-300"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link 
                    key={link.name}
                    href={link.href.startsWith('/') ? link.href : `/${link.href}`}
                    className="text-white hover:text-[#FF4C00] font-bold px-3 py-2 rounded-md transition duration-300"
                  >
                    {link.name}
                  </Link>
                )
              )}
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
        
        {/* Mobile menu overlay */}
        <div 
          className={`fixed inset-0 bg-black/30 md:hidden z-40 transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={closeMobileMenu}
        />
        
        {/* Mobile menu sidebar */}
        <div 
          className={`fixed top-0 left-0 h-full w-72 bg-[#0A3A68] md:hidden z-50 transform transition-transform duration-300 ease-in-out shadow-xl ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center px-4 pt-4 pb-2 border-b border-white/10">
            <span className="text-white font-bold text-xl font-['Baloo_2']">babixGO</span>
            <button 
              onClick={toggleMobileMenu}
              className="text-white p-2 rounded-md hover:bg-white/10 transition duration-300"
              aria-label="Menü schließen"
            >
              <span className="material-icons text-[#FF4C00]">close</span>
            </button>
          </div>
          
          <div className="px-2 pt-4 pb-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white hover:bg-white/10 hover:text-[#FF4C00] block px-4 py-3 rounded-md font-bold transition duration-300 flex items-center"
                onClick={closeMobileMenu}
              >
                <span className="material-icons mr-3 text-[#00CFFF]">
                  {link.name === "Home" ? "home" : 
                   link.name === "Preise" ? "payments" :
                   link.name === "Blog" ? "article" :
                   "arrow_forward"}
                </span>
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <div className="text-white/80 text-center text-sm">
              <p>© {new Date().getFullYear()} babixGO</p>
              <p className="mt-1">Monopoly GO Service</p>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
