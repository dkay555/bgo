import { Button } from '@/components/ui/button';
import { CONTACT, FOOTER_LINKS } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-[#0A3A68] text-white mt-14 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
          <Button 
            variant="whatsapp" 
            asChild 
            className="flex items-center justify-center rounded-lg font-bold w-full"
            size="lg"
          >
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="flex items-center justify-center">
              <span className="material-icons">whatsapp</span>
            </a>
          </Button>
          
          <Button 
            variant="facebook" 
            asChild 
            className="flex items-center justify-center rounded-lg font-bold w-full"
            size="lg"
          >
            <a href={CONTACT.facebook} target="_blank" rel="noreferrer" className="flex items-center justify-center">
              <span className="material-icons">facebook</span>
            </a>
          </Button>
          
          <Button 
            variant="email" 
            asChild 
            className="flex items-center justify-center rounded-lg font-bold w-full"
            size="lg"
          >
            <a href={CONTACT.email} className="flex items-center justify-center">
              <span className="material-icons">email</span>
            </a>
          </Button>
        </div>
        
        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6">
            {FOOTER_LINKS.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-[#FF4C00] hover:underline font-bold transition"
              >
                {link.name}
              </a>
            ))}
          </div>
          <p className="text-sm opacity-80">© {new Date().getFullYear()} babixGO – Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
