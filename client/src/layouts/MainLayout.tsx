import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  // Load global styles and resources
  useEffect(() => {
    // Load Material Icons from Google CDN
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load Google Fonts: Baloo 2 and Nunito Sans
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700&family=Nunito+Sans:wght@400;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // Load Materialize CSS for some components
    const materializeCss = document.createElement('link');
    materializeCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css';
    materializeCss.rel = 'stylesheet';
    document.head.appendChild(materializeCss);

    // Load Materialize JS
    const materializeJs = document.createElement('script');
    materializeJs.src = 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js';
    document.body.appendChild(materializeJs);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(fontLink);
      document.head.removeChild(materializeCss);
      document.body.removeChild(materializeJs);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {children}
      
      <BackToTop />
      <Footer />
    </div>
  );
}

export default MainLayout;