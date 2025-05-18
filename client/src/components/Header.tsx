import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { NAV_LINKS } from '@/lib/constants';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Ticket, ClipboardList, LogOut } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  const { user, logoutMutation } = useAuth();

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
                      className="text-white hover:text-[#FF4C00] font-bold px-2 py-1.5 rounded-md transition duration-300 flex items-center text-sm"
                    >
                      {link.name}
                      <span className={`material-icons ml-0.5 text-sm transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`}>
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
                    className="text-white hover:text-[#FF4C00] font-bold px-2 py-1.5 rounded-md transition duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link 
                    key={link.name}
                    href={link.href.startsWith('/') ? link.href : `/${link.href}`}
                    className="text-white hover:text-[#FF4C00] font-bold px-2 py-1.5 rounded-md transition duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                )
              )}
              
              {/* Benutzerbereich */}
              <div className="ml-1">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full ring-1 ring-white text-white hover:text-[#FF4C00] hover:bg-transparent p-0">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="bg-[#00CFFF]/20 text-white text-xs">
                          {user.name ? user.name.charAt(0).toUpperCase() : 
                           user.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.name || user.username}
                        </p>
                        {user.email && (
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        )}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="w-full cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Mein Profil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/order-history" className="w-full cursor-pointer">
                        <ClipboardList className="mr-2 h-4 w-4" />
                        <span>Bestellungen</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/tickets" className="w-full cursor-pointer">
                        <Ticket className="mr-2 h-4 w-4" />
                        <span>Support Tickets</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => logoutMutation.mutate()}
                      className="text-red-600 focus:text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Abmelden</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/auth">
                  <Button className="bg-[#00CFFF]/20 hover:bg-[#00CFFF]/30 text-white border-none rounded-md ml-2">
                    <User className="mr-2 h-4 w-4" />
                    Anmelden
                  </Button>
                </Link>
              )}
              </div>
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
          className={`fixed top-0 left-0 h-full w-64 bg-[#0A3A68] md:hidden z-50 transform transition-transform duration-300 ease-in-out shadow-xl !opacity-100 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{backgroundColor: '#0A3A68', opacity: 1}}
        >
          <div className="flex justify-between items-center px-3 pt-2 pb-1 border-b border-white/10">
            <span className="text-white font-bold text-lg font-['Baloo_2']">babixGO</span>
            <button 
              onClick={toggleMobileMenu}
              className="text-white p-1 rounded-md hover:bg-white/10 transition duration-300"
              aria-label="Menü schließen"
            >
              <span className="material-icons text-[#FF4C00] text-base">close</span>
            </button>
          </div>
          
          <div className="h-full overflow-y-auto pb-16">
            <div className="px-2 pt-2 pb-3">
              {/* Hauptnavigation: Start, News, Hilfe, Kontakt */}
              <div className="grid grid-cols-2 gap-1 mb-2">
                <Link 
                  href="/"
                  className="text-white hover:bg-white/10 hover:text-[#FF4C00] py-2 px-3 rounded-md text-center transition duration-300 border border-white/10 flex flex-col items-center"
                  onClick={closeMobileMenu}
                >
                  <span className="material-icons text-[#00CFFF] text-lg mb-1">home</span>
                  <span className="text-xs font-medium">Start</span>
                </Link>
                
                <Link 
                  href="/news"
                  className="text-white hover:bg-white/10 hover:text-[#FF4C00] py-2 px-3 rounded-md text-center transition duration-300 border border-white/10 flex flex-col items-center"
                  onClick={closeMobileMenu}
                >
                  <span className="material-icons text-[#00CFFF] text-lg mb-1">article</span>
                  <span className="text-xs font-medium">News</span>
                </Link>
                
                <Link 
                  href="/hilfe"
                  className="text-white hover:bg-white/10 hover:text-[#FF4C00] py-2 px-3 rounded-md text-center transition duration-300 border border-white/10 flex flex-col items-center"
                  onClick={closeMobileMenu}
                >
                  <span className="material-icons text-[#00CFFF] text-lg mb-1">help</span>
                  <span className="text-xs font-medium">Hilfe</span>
                </Link>
                
                <Link 
                  href="/kontakt"
                  className="text-white hover:bg-white/10 hover:text-[#FF4C00] py-2 px-3 rounded-md text-center transition duration-300 border border-white/10 flex flex-col items-center"
                  onClick={closeMobileMenu}
                >
                  <span className="material-icons text-[#00CFFF] text-lg mb-1">contact_support</span>
                  <span className="text-xs font-medium">Kontakt</span>
                </Link>
              </div>
              
              {/* Leistungen Kategorie-Überschrift */}
              <div className="text-white/70 py-1 mb-1 text-xs uppercase tracking-wider border-b border-white/10 text-center font-medium">
                Leistungen
              </div>
              
              {/* Dienste mit Symbol und Name - Würfel & Sticker */}
              <div className="grid grid-cols-2 gap-1 mb-1">
                {/* Würfel */}
                <Link 
                  href="/shop/wuerfel"
                  className="text-white hover:bg-white/10 hover:text-[#FF4C00] py-2 px-3 rounded-md transition duration-300 border border-white/10 flex flex-col items-center"
                  onClick={closeMobileMenu}
                >
                  <span className="material-icons text-[#00CFFF] text-lg mb-1">casino</span>
                  <span className="text-xs font-medium">Würfel</span>
                </Link>
                
                {/* Sticker */}
                <Link 
                  href="/shop/sticker"
                  className="text-white hover:bg-white/10 hover:text-[#FF4C00] py-2 px-3 rounded-md transition duration-300 border border-white/10 flex flex-col items-center"
                  onClick={closeMobileMenu}
                >
                  <span className="material-icons text-[#00CFFF] text-lg mb-1">collections_bookmark</span>
                  <span className="text-xs font-medium">Sticker</span>
                </Link>
              </div>
              
              {/* Dienste - Partnerevents & Tycoon Racers */}
              <div className="grid grid-cols-2 gap-1">
                {/* Partnerevents */}
                <Link 
                  href="/shop/partnerevent"
                  className="text-white hover:bg-white/10 hover:text-[#FF4C00] py-2 px-3 rounded-md transition duration-300 border border-white/10 flex flex-col items-center"
                  onClick={closeMobileMenu}
                >
                  <span className="material-icons text-[#00CFFF] text-lg mb-1">people</span>
                  <span className="text-xs font-medium">Partnerevents</span>
                </Link>
                
                {/* Tycoon Racers */}
                <Link 
                  href="/shop/tycoonracers"
                  className="text-white hover:bg-white/10 hover:text-[#FF4C00] py-2 px-3 rounded-md transition duration-300 border border-white/10 flex flex-col items-center"
                  onClick={closeMobileMenu}
                >
                  <span className="material-icons text-[#00CFFF] text-lg mb-1">emoji_events</span>
                  <span className="text-xs font-medium">Tycoon Racers</span>
                </Link>
              </div>
              
              {/* Kundenkonto Überschrift */}
              <div className="text-white/70 py-1 mt-2 mb-1 text-xs uppercase tracking-wider border-b border-white/10 text-center font-medium">
                Kundenkonto
              </div>
            
              {/* Login/User Bereich für Mobil */}
              <div className="grid grid-cols-2 gap-1 mt-1">
                {user ? (
                  <>
                    {/* Profil */}
                    <Link
                      href="/profile"
                      className="text-white hover:bg-white/10 hover:text-[#FF4C00] py-2 px-3 rounded-md transition duration-300 border border-white/10 flex flex-col items-center"
                      onClick={closeMobileMenu}
                    >
                      <User className="text-[#00CFFF] h-5 w-5 mb-1" />
                      <span className="text-xs font-medium">Profil</span>
                    </Link>
                    
                    {/* Bestellungen */}
                    <Link
                      href="/order-history"
                      className="text-white hover:bg-white/10 hover:text-[#FF4C00] py-2 px-3 rounded-md transition duration-300 border border-white/10 flex flex-col items-center"
                      onClick={closeMobileMenu}
                    >
                      <ClipboardList className="text-[#00CFFF] h-5 w-5 mb-1" />
                      <span className="text-xs font-medium">Bestellungen</span>
                    </Link>
                    
                    {/* Tickets */}
                    <Link
                      href="/tickets"
                      className="text-white hover:bg-white/10 hover:text-[#FF4C00] py-2 px-3 rounded-md transition duration-300 border border-white/10 flex flex-col items-center"
                      onClick={closeMobileMenu}
                    >
                      <Ticket className="text-[#00CFFF] h-5 w-5 mb-1" />
                      <span className="text-xs font-medium">Tickets</span>
                    </Link>
                    
                    {/* Abmelden */}
                    <button
                      onClick={() => {
                        logoutMutation.mutate();
                        closeMobileMenu();
                      }}
                      className="text-white hover:bg-white/10 hover:text-[#FF4C00] py-2 px-3 rounded-md transition duration-300 border border-white/10 flex flex-col items-center w-full"
                    >
                      <LogOut className="text-red-400 h-5 w-5 mb-1" />
                      <span className="text-xs font-medium">Abmelden</span>
                    </button>
                  </>
                ) : (
                  <>
                    {/* Anmelden */}
                    <Link
                      href="/auth"
                      className="text-white hover:bg-white/10 hover:text-[#FF4C00] py-2 px-3 rounded-md transition duration-300 border border-white/10 flex flex-col items-center"
                      onClick={closeMobileMenu}
                    >
                      <User className="text-[#00CFFF] h-5 w-5 mb-1" />
                      <span className="text-xs font-medium">Anmelden</span>
                    </Link>
                    
                    {/* Registrieren */}
                    <Link
                      href="/auth?register=true"
                      className="text-white hover:bg-white/10 hover:text-[#FF4C00] py-2 px-3 rounded-md transition duration-300 border border-white/10 flex flex-col items-center"
                      onClick={closeMobileMenu}
                    >
                      <span className="material-icons text-[#00CFFF] text-lg mb-1">person_add</span>
                      <span className="text-xs font-medium">Registrieren</span>
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-white/10">
              <div className="text-white/80 text-center text-xs">
                <p>© {new Date().getFullYear()} babixGO</p>
                <p className="mt-0.5">Monopoly GO Service</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;