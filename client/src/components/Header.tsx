import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { NAV_LINKS } from '@/lib/constants';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown && 
          dropdownRefs.current[openDropdown] && 
          !dropdownRefs.current[openDropdown]?.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  const toggleDropdown = (name: string) => {
    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <nav className={`bg-[#0A3A68] transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <span className="text-white font-bold text-xl md:text-2xl font-['Baloo_2']">babixGO</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {NAV_LINKS.map((link) => 
                link.isDropdown ? (
                  <div 
                    key={link.name}
                    className="relative"
                    ref={el => dropdownRefs.current[link.name] = el}
                  >
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      className="text-white hover:text-[#FF4C00] font-bold px-3 py-2 rounded-md transition duration-300 flex items-center"
                    >
                      {link.name}
                      <span className={`material-icons ml-1 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    
                    {/* Dropdown Menu */}
                    {openDropdown === link.name && (
                      <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                        <div className="py-1">
                          {link.dropdownItems?.map((item, idx) => (
                            <Link 
                              key={idx}
                              href={item.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#FF4C00] transition-colors"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : link.href.startsWith('#') ? (
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
          className={`fixed top-0 left-0 h-full w-72 bg-[#0A3A68] md:hidden z-50 transform transition-transform duration-300 ease-in-out shadow-xl !opacity-100 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{backgroundColor: '#0A3A68', opacity: 1}}
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
          
          <div className="px-2 pt-4 pb-3">
            {/* Start Link */}
            <Link 
              href="/"
              className="text-white hover:bg-white/10 hover:text-[#FF4C00] block px-4 py-3 rounded-md font-bold transition duration-300 flex items-center mb-4"
              onClick={closeMobileMenu}
            >
              <span className="material-icons mr-3 text-[#00CFFF]">home</span>
              Start
            </Link>
            
            {/* Leistungen Kategorie-Überschrift */}
            <div className="text-white/70 px-2 py-1 mb-1 text-sm uppercase tracking-wider border-b border-white/10">
              Leistungen
            </div>
            
            {/* Würfel Dienste */}
            <div className="mb-2 pl-2">
              <div className="text-white font-bold px-2 py-1">Würfel</div>
              <div className="grid grid-cols-2 gap-1 pl-2">
                <Link 
                  href="/produkte/wuerfel"
                  className="text-white/80 hover:text-[#FF4C00] block py-1 px-2 text-sm rounded-md transition duration-300 border border-white/10"
                  onClick={closeMobileMenu}
                >
                  <span className="text-[#00CFFF] mr-1">→</span> Shop
                </Link>
                <Link 
                  href="/hilfe/wuerfel"
                  className="text-white/80 hover:text-[#FF4C00] block py-1 px-2 text-sm rounded-md transition duration-300 border border-white/10"
                  onClick={closeMobileMenu}
                >
                  <span className="text-[#00CFFF] mr-1">→</span> Hilfe
                </Link>
              </div>
            </div>
            
            {/* Sticker Dienste */}
            <div className="mb-2 pl-2">
              <div className="text-white font-bold px-2 py-1">Sticker</div>
              <div className="grid grid-cols-2 gap-1 pl-2">
                <Link 
                  href="/produkte/sticker"
                  className="text-white/80 hover:text-[#FF4C00] block py-1 px-2 text-sm rounded-md transition duration-300 border border-white/10"
                  onClick={closeMobileMenu}
                >
                  <span className="text-[#00CFFF] mr-1">→</span> Shop
                </Link>
                <Link 
                  href="/hilfe/sticker"
                  className="text-white/80 hover:text-[#FF4C00] block py-1 px-2 text-sm rounded-md transition duration-300 border border-white/10"
                  onClick={closeMobileMenu}
                >
                  <span className="text-[#00CFFF] mr-1">→</span> Hilfe
                </Link>
              </div>
            </div>
            
            {/* Partnerevent Dienste */}
            <div className="mb-2 pl-2">
              <div className="text-white font-bold px-2 py-1">Partnerevent</div>
              <div className="grid grid-cols-2 gap-1 pl-2">
                <Link 
                  href="/produkte/partner"
                  className="text-white/80 hover:text-[#FF4C00] block py-1 px-2 text-sm rounded-md transition duration-300 border border-white/10"
                  onClick={closeMobileMenu}
                >
                  <span className="text-[#00CFFF] mr-1">→</span> Shop
                </Link>
                <Link 
                  href="/hilfe/partner"
                  className="text-white/80 hover:text-[#FF4C00] block py-1 px-2 text-sm rounded-md transition duration-300 border border-white/10"
                  onClick={closeMobileMenu}
                >
                  <span className="text-[#00CFFF] mr-1">→</span> Hilfe
                </Link>
              </div>
            </div>
            
            {/* Race Dienste */}
            <div className="mb-2 pl-2">
              <div className="text-white font-bold px-2 py-1">Race</div>
              <div className="grid grid-cols-2 gap-1 pl-2">
                <Link 
                  href="/produkte/race"
                  className="text-white/80 hover:text-[#FF4C00] block py-1 px-2 text-sm rounded-md transition duration-300 border border-white/10"
                  onClick={closeMobileMenu}
                >
                  <span className="text-[#00CFFF] mr-1">→</span> Shop
                </Link>
                <Link 
                  href="/hilfe/race"
                  className="text-white/80 hover:text-[#FF4C00] block py-1 px-2 text-sm rounded-md transition duration-300 border border-white/10"
                  onClick={closeMobileMenu}
                >
                  <span className="text-[#00CFFF] mr-1">→</span> Hilfe
                </Link>
              </div>
            </div>
            
            {/* Kontakt Link */}
            <Link 
              href="/kontakt"
              className="text-white hover:bg-white/10 hover:text-[#FF4C00] block px-4 py-3 rounded-md font-bold transition duration-300 flex items-center mt-4"
              onClick={closeMobileMenu}
            >
              <span className="material-icons mr-3 text-[#00CFFF]">contact_support</span>
              Kontakt
            </Link>
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
