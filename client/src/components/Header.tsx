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
  
  console.log("Current user:", user);

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
              
              {/* Benutzerbereich */}
              <div className="ml-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-white text-white hover:text-[#FF4C00] hover:bg-transparent">
                      <Avatar>
                        <AvatarFallback className="bg-[#00CFFF]/20 text-white">
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
                      <Link href="/order-history" className="cursor-pointer flex w-full items-center">
                        <ClipboardList className="mr-2 h-4 w-4" />
                        <span>Bestellhistorie</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/tickets" className="cursor-pointer flex w-full items-center">
                        <Ticket className="mr-2 h-4 w-4" />
                        <span>Support-Tickets</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => logoutMutation.mutate()} 
                      className="cursor-pointer text-red-600 focus:text-red-600"
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
            {/* Hauptnavigation: Start, Hilfe und Kontakt */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <Link 
                href="/"
                className="text-white hover:bg-white/10 hover:text-[#FF4C00] py-2 px-3 rounded-md font-bold text-center transition duration-300 border border-white/10"
                onClick={closeMobileMenu}
              >
                <span className="material-icons mb-1 text-[#00CFFF] block mx-auto">home</span>
                Start
              </Link>
              
              <Link 
                href="/hilfe"
                className="text-white hover:bg-white/10 hover:text-[#FF4C00] py-2 px-3 rounded-md font-bold text-center transition duration-300 border border-white/10"
                onClick={closeMobileMenu}
              >
                <span className="material-icons mb-1 text-[#00CFFF] block mx-auto">help</span>
                Hilfe
              </Link>
              
              <Link 
                href="/kontakt"
                className="text-white hover:bg-white/10 hover:text-[#FF4C00] py-2 px-3 rounded-md font-bold text-center transition duration-300 border border-white/10"
                onClick={closeMobileMenu}
              >
                <span className="material-icons mb-1 text-[#00CFFF] block mx-auto">contact_support</span>
                Kontakt
              </Link>
            </div>
            
            {/* Leistungen Kategorie-Überschrift */}
            <div className="text-white/70 py-1 mb-2 text-sm uppercase tracking-wider border-b border-white/10 text-center font-bold">
              Leistungen
            </div>
            
            {/* Dienste mit Symbol und Name */}
            <div className="grid grid-cols-2 gap-2 p-1">
              {/* Würfel */}
              <Link 
                href="/produkte/wuerfel"
                className="text-white hover:bg-white/10 hover:text-[#FF4C00] p-2 rounded-md transition duration-300 border border-white/10 flex flex-col items-center"
                onClick={closeMobileMenu}
              >
                <span className="material-icons text-[#00CFFF] text-xl mb-1">casino</span>
                <span className="font-bold">Würfel</span>
              </Link>
              
              {/* Sticker */}
              <Link 
                href="/produkte/sticker"
                className="text-white hover:bg-white/10 hover:text-[#FF4C00] p-2 rounded-md transition duration-300 border border-white/10 flex flex-col items-center"
                onClick={closeMobileMenu}
              >
                <span className="material-icons text-[#00CFFF] text-xl mb-1">collections_bookmark</span>
                <span className="font-bold">Sticker</span>
              </Link>
              
              {/* Partnerevent */}
              <Link 
                href="/produkte/partner"
                className="text-white hover:bg-white/10 hover:text-[#FF4C00] p-2 rounded-md transition duration-300 border border-white/10 flex flex-col items-center"
                onClick={closeMobileMenu}
              >
                <span className="material-icons text-[#00CFFF] text-xl mb-1">people</span>
                <span className="font-bold">Partner</span>
              </Link>
              
              {/* Race */}
              <Link 
                href="/produkte/race"
                className="text-white hover:bg-white/10 hover:text-[#FF4C00] p-2 rounded-md transition duration-300 border border-white/10 flex flex-col items-center"
                onClick={closeMobileMenu}
              >
                <span className="material-icons text-[#00CFFF] text-xl mb-1">emoji_events</span>
                <span className="font-bold">Race</span>
              </Link>
            </div>
          </div>
          
          {/* Login/User Bereich für Mobil */}
          <div className="mt-4 mb-2 px-4">
            {user ? (
              <div className="border border-white/10 rounded-md p-3 bg-white/5">
                <div className="flex items-center space-x-3 mb-2">
                  <Avatar>
                    <AvatarFallback className="bg-[#00CFFF]/20 text-white">
                      {user.name ? user.name.charAt(0).toUpperCase() : 
                       user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-bold">{user.name || user.username}</p>
                    {user.email && (
                      <p className="text-white/70 text-xs">{user.email}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/order-history"
                    className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-white py-2 px-3 rounded-md text-sm"
                    onClick={closeMobileMenu}
                  >
                    <ClipboardList className="mr-2 h-4 w-4" />
                    Bestellungen
                  </Link>
                  <Link
                    href="/tickets"
                    className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-white py-2 px-3 rounded-md text-sm"
                    onClick={closeMobileMenu}
                  >
                    <Ticket className="mr-2 h-4 w-4" />
                    Tickets
                  </Link>
                  <button
                    onClick={() => {
                      logoutMutation.mutate();
                      closeMobileMenu();
                    }}
                    className="flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 text-red-500 py-2 px-3 rounded-md text-sm col-span-2 mt-1"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Abmelden
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/auth"
                className="flex items-center justify-center bg-[#00CFFF]/20 hover:bg-[#00CFFF]/30 text-white py-3 px-4 rounded-md font-bold w-full"
                onClick={closeMobileMenu}
              >
                <User className="mr-2 h-5 w-5" />
                Anmelden / Registrieren
              </Link>
            )}
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
