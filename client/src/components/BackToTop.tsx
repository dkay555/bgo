import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 bg-[#0A3A68]/80 text-white p-3 rounded-full shadow-lg transition-all duration-300 
                 hover:bg-[#0A3A68] focus:outline-none transform hover:scale-110 z-40 ${
                   isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                 }`}
      aria-label="Nach oben scrollen"
      size="icon"
    >
      <span className="material-icons">keyboard_arrow_up</span>
    </Button>
  );
}

export default BackToTop;
