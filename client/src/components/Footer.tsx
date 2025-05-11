import { Button } from '@/components/ui/button';
import { CONTACT, FOOTER_LINKS } from '@/lib/constants';
import { Link } from 'wouter';

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
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.6 6.31999C16.8 5.49999 15.8 4.89999 14.7 4.49999C13.6 4.09999 12.5 3.99999 11.3 4.09999C10.1 4.19999 9 4.49999 8 5.09999C7 5.59999 6.2 6.29999 5.5 7.09999C4.8 7.99999 4.3 8.89999 4.1 9.89999C3.8 10.9 3.8 11.9 4 12.9C4.2 13.9 4.6 14.8 5.2 15.6L4 19.9L8.3 18.7C9.1 19.3 9.9 19.7 10.9 19.9C11.8 20.1 12.7 20.1 13.7 19.9C14.7 19.7 15.6 19.2 16.4 18.7C17.2 18.1 17.9 17.3 18.4 16.4C18.9 15.5 19.2 14.5 19.4 13.4C19.5 12.3 19.4 11.3 19.1 10.2C18.8 9.19999 18.3 8.09999 17.6 6.31999Z" />
                <path d="M14.8 12.5C14.5 12.3 14.1 12.2 13.9 12.3C13.7 12.4 13.5 12.8 13.3 13C13.2 13.1 13.1 13.1 13 13.1C12.6 13 12.2 12.8 11.9 12.5C11.6 12.2 11.3 11.9 11.1 11.5C11.1 11.4 11.1 11.3 11.2 11.2C11.2 11.1 11.3 11 11.4 10.9C11.5 10.8 11.5 10.6 11.5 10.5C11.5 10.4 11.5 10.2 11.4 10.1C11.3 10 11.1 9.59999 10.9 9.29999C10.8 9.09999 10.6 8.99999 10.5 8.99999H10.1C10 8.99999 9.9 8.99999 9.8 9.09999C9.7 9.19999 9.5 9.19999 9.4 9.29999C9.2 9.39999 9.1 9.49999 9 9.69999C8.9 9.89999 8.8 10 8.8 10.2C8.7 10.4 8.7 10.6 8.7 10.8C8.7 11 8.8 11.3 8.8 11.5C9 12.2 9.3 12.8 9.8 13.4C10 13.7 10.3 13.9 10.5 14.2C10.8 14.4 11.1 14.7 11.4 14.9C11.8 15.1 12.2 15.3 12.6 15.4C12.9 15.5 13.2 15.5 13.6 15.5C13.9 15.5 14.2 15.4 14.5 15.3C14.6 15.2 14.8 15.2 14.9 15.1C15 15 15.1 14.9 15.2 14.8C15.3 14.7 15.4 14.6 15.5 14.5C15.6 14.4 15.6 14.2 15.7 14.1C15.7 14 15.7 13.8 15.7 13.7C15.7 13.6 15.7 13.5 15.7 13.5C15.7 13.3 15.5 13.1 15.3 13C15 12.7 14.9 12.6 14.8 12.5Z" />
              </svg>
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
