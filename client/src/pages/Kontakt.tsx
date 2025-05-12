import { useEffect } from 'react';

export default function Kontakt() {
  useEffect(() => {
    document.title = 'Kontakt | babixGO';
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl" id="top">
      <h1 className="babix-info-header text-3xl md:text-4xl font-bold mb-8 text-center">Kontakt</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0A3A68]">Schreiben Sie uns</h2>
            <p className="text-gray-700">
              Haben Sie Fragen oder Anliegen? Kontaktieren Sie uns gerne über das Formular oder nutzen Sie unsere anderen Kontaktmöglichkeiten.
            </p>
            
            <div className="flex items-center mt-6">
              <span className="material-icons text-[#00CFFF] mr-3">email</span>
              <a href="mailto:info@babixgo.de" className="text-[#0A3A68] hover:text-[#FF4C00] transition-colors">
                info@babixgo.de
              </a>
            </div>
            
            <div className="flex items-center">
              <span className="material-icons text-[#00CFFF] mr-3">phone</span>
              <a href="tel:+49123456789" className="text-[#0A3A68] hover:text-[#FF4C00] transition-colors">
                +49 123 456 789
              </a>
            </div>
            
            <div className="flex mt-6 space-x-4">
              <a 
                href="https://wa.me/491234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-[#25D366] text-white rounded-full hover:bg-opacity-90 transition-all"
                aria-label="WhatsApp"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.6 6.31999C16.8 5.49999 15.8 4.89999 14.7 4.49999C13.6 4.09999 12.5 3.99999 11.3 4.09999C10.1 4.19999 9 4.49999 8 5.09999C7 5.59999 6.2 6.29999 5.5 7.09999C4.8 7.99999 4.3 8.89999 4.1 9.89999C3.8 10.9 3.8 11.9 4 12.9C4.2 13.9 4.6 14.8 5.2 15.6L4 19.9L8.3 18.7C9.1 19.3 9.9 19.7 10.9 19.9C11.8 20.1 12.7 20.1 13.7 19.9C14.7 19.7 15.6 19.2 16.4 18.7C17.2 18.1 17.9 17.3 18.4 16.4C18.9 15.5 19.2 14.5 19.4 13.4C19.5 12.3 19.4 11.3 19.1 10.2C18.8 9.19999 18.3 8.09999 17.6 6.31999ZM16.4 15.9C15.8 16.4 15.2 16.8 14.4 17C13.6 17.2 12.9 17.2 12.1 17C11.3 16.8 10.6 16.5 9.8 16.1L8.8 15.6L6.5 16.3L7.2 14L6.7 13C6.3 12.3 6 11.5 5.8 10.7C5.6 9.89999 5.7 9.09999 5.8 8.29999C6 7.49999 6.3 6.79999 6.8 6.09999C7.3 5.39999 7.9 4.89999 8.6 4.49999C9.3 4.09999 10.1 3.89999 10.9 3.79999C11.7 3.69999 12.5 3.79999 13.3 3.99999C14.1 4.19999 14.8 4.59999 15.5 5.09999C16.2 5.59999 16.7 6.19999 17.1 6.89999C17.5 7.69999 17.7 8.49999 17.8 9.29999C17.9 10.1 17.8 10.9 17.6 11.6C17.3 12.7 16.9 13.4 16.4 15.9Z" fill="currentColor"/>
                  <path d="M14.8 12.5C14.5 12.3 14.1 12.2 13.9 12.3C13.7 12.4 13.5 12.8 13.3 13C13.2 13.1 13.1 13.1 13 13.1C12.6 13 12.2 12.8 11.9 12.5C11.6 12.2 11.3 11.9 11.1 11.5C11.1 11.4 11.1 11.3 11.2 11.2C11.2 11.1 11.3 11 11.4 10.9C11.5 10.8 11.5 10.6 11.5 10.5C11.5 10.4 11.5 10.2 11.4 10.1C11.3 10 11.1 9.59999 10.9 9.29999C10.8 9.09999 10.6 8.99999 10.5 8.99999H10.1C10 8.99999 9.9 8.99999 9.8 9.09999C9.7 9.19999 9.5 9.19999 9.4 9.29999C9.2 9.39999 9.1 9.49999 9 9.69999C8.9 9.89999 8.8 10 8.8 10.2C8.7 10.4 8.7 10.6 8.7 10.8C8.7 11 8.8 11.3 8.8 11.5C9 12.2 9.3 12.8 9.8 13.4C10 13.7 10.3 13.9 10.5 14.2C10.8 14.4 11.1 14.7 11.4 14.9C11.8 15.1 12.2 15.3 12.6 15.4C12.9 15.5 13.2 15.5 13.6 15.5C13.9 15.5 14.2 15.4 14.5 15.3C14.6 15.2 14.8 15.2 14.9 15.1C15 15 15.1 14.9 15.2 14.8C15.3 14.7 15.4 14.6 15.5 14.5C15.6 14.4 15.6 14.2 15.7 14.1C15.7 14 15.7 13.8 15.7 13.7C15.7 13.6 15.7 13.5 15.7 13.5C15.7 13.3 15.5 13.1 15.3 13C15 12.7 14.9 12.6 14.8 12.5Z" fill="currentColor"/>
                </svg>
              </a>
              <a 
                href="https://facebook.com/babixgo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-[#1877F2] text-white rounded-full hover:bg-opacity-90 transition-all"
                aria-label="Facebook"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF]" 
                  placeholder="Ihr Name" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF]" 
                  placeholder="Ihre E-Mail-Adresse" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Betreff</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF]" 
                  placeholder="Betreff" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Nachricht</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF]" 
                  placeholder="Ihre Nachricht an uns" 
                  required 
                ></textarea>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  className="w-full bg-[#0A3A68] text-white py-3 px-6 rounded-md hover:bg-[#FF4C00] transition-colors"
                >
                  Nachricht senden
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}