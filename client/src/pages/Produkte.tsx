import { useEffect } from 'react';
import { Link } from 'wouter';
import { PRODUCT_CATEGORIES } from '@/lib/constants';

export default function Produkte() {
  useEffect(() => {
    document.title = 'Produkte | babixGO';
  }, []);

  return (
    <div className="container mx-auto px-4 py-8" id="top">
      <h1 className="babix-info-header text-3xl md:text-4xl font-bold mb-8 text-center">Unsere Produkte & Dienstleistungen</h1>
      
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-lg mb-12 text-gray-700">
          Wir bieten verschiedene Dienste für Monopoly GO-Spieler an, um Ihr Spielerlebnis zu verbessern. 
          Wählen Sie aus unseren Angeboten:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {PRODUCT_CATEGORIES.map((category, index) => (
            <Link key={index} href={category.path}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 border border-gray-200">
                <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0A3A68]/70 to-[#00CFFF]/70 flex items-center justify-center">
                    <span className="material-icons text-7xl text-white">{category.icon}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0A3A68] mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex justify-end">
                    <span className="inline-flex items-center text-[#FF4C00] font-bold">
                      Mehr erfahren
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4">Warum babixGO wählen?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-[#00CFFF] rounded-full flex items-center justify-center">
                  <span className="material-icons text-white">verified</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Zuverlässigkeit</h3>
                <p className="text-gray-600">
                  Wir liefern unsere Dienste immer pünktlich und gemäß den Vereinbarungen.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-[#00CFFF] rounded-full flex items-center justify-center">
                  <span className="material-icons text-white">security</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Sicherheit</h3>
                <p className="text-gray-600">
                  Ihre Daten und Ihr Spielkonto sind bei uns in sicheren Händen.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-[#00CFFF] rounded-full flex items-center justify-center">
                  <span className="material-icons text-white">support_agent</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Support</h3>
                <p className="text-gray-600">
                  Unser Kundenservice steht Ihnen jederzeit zur Verfügung.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-[#00CFFF] rounded-full flex items-center justify-center">
                  <span className="material-icons text-white">payments</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Faire Preise</h3>
                <p className="text-gray-600">
                  Wir bieten wettbewerbsfähige Preise und regelmäßige Angebote.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Link href="/preise">
            <button className="bg-[#0A3A68] text-white py-3 px-8 rounded-md hover:bg-[#FF4C00] transition-colors inline-flex items-center">
              <span className="material-icons mr-2">price_check</span>
              Unsere Preise ansehen
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}