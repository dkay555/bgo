import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { PRICES, SPECIAL_OFFER } from '@/lib/constants';

export default function Wuerfel() {
  // Zustand für die ausgewählte Würfelmenge
  const [selectedOption, setSelectedOption] = useState("25000");
  
  useEffect(() => {
    document.title = 'Würfelboost | babixGO';
  }, []);
  
  // Funktion, die den Preis basierend auf der ausgewählten Option zurückgibt
  const getPrice = () => {
    if (selectedOption === "25000") return 25;
    if (selectedOption === "35000") return 35;
    if (selectedOption === "45000") return 45;
    return 25; // Standardpreis
  };

  // Handler für Änderungen im Dropdown
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8" id="top">
      <div className="flex flex-col items-center mb-8">
        <h1 className="babix-info-header text-3xl text-center text-[#0A3A68] mb-2">Würfelboost für Monopoly GO</h1>
        <div className="w-32 h-1 bg-[#00CFFF] rounded"></div>
      </div>

      <div className="mb-6">
        <Link href="/hilfe/wuerfel" className="text-[#00CFFF] hover:text-[#0A3A68] transition-colors flex items-center mb-4">
          <span className="material-icons mr-1">help_outline</span>
          Hilfe zu Würfelboosts
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative">
              <img 
                src="/images/wuerfel.jpg" 
                alt="Würfel Boost" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-0 right-0 bg-[#FF4C00] text-white px-3 py-1 rounded-bl-lg">
                Am beliebtesten
              </div>
            </div>
            <div className="p-6">
              <h2 className="babix-info-header text-2xl text-[#0A3A68] mb-4">Würfelboost</h2>
              <p className="text-gray-700 mb-6">
                Erhalten Sie sofort zusätzliche Würfel für Monopoly GO, um schneller voranzukommen und mehr 
                Belohnungen freizuschalten. Unsere Würfelboosts sind schnell, sicher und zuverlässig.
              </p>
              
              <div className="bg-[#0A3A68] bg-opacity-5 p-4 rounded-lg mb-6">
                <h3 className="babix-info-header text-[#0A3A68] mb-2">Ihre Vorteile</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="material-icons text-[#00CFFF] mr-2 mt-0.5">check_circle</span>
                    <span>Sofortige Lieferung nach Zahlungseingang</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-[#00CFFF] mr-2 mt-0.5">check_circle</span>
                    <span>100% sicher und vertrauenswürdig</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-[#00CFFF] mr-2 mt-0.5">check_circle</span>
                    <span>Support bei Fragen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-[#00CFFF] mr-2 mt-0.5">check_circle</span>
                    <span>Rabatt bei regelmäßiger Nutzung</span>
                  </li>
                </ul>
              </div>
            
              <div className="mt-4 mb-8">
                <h3 className="babix-info-header text-[#0A3A68] mb-4">Wählen Sie Ihre Würfelmenge</h3>
                
                <div className="relative w-full md:w-2/3 mb-6">
                  <select 
                    className="w-full p-3 pe-10 bg-gray-100 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#00CFFF]"
                    value={selectedOption}
                    onChange={handleChange}
                  >
                    <option value="25000">25.000 Würfel - 25€</option>
                    <option value="35000">35.000 Würfel - 35€</option>
                    <option value="45000">45.000 Würfel - 45€</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <span className="material-icons text-gray-600">expand_more</span>
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="text-xl font-bold text-[#0A3A68] mb-2 sm:mb-0">
                    Preis: <span className="text-[#FF4C00]">{getPrice()}€</span>
                  </div>
                  <button className="bg-[#FF4C00] text-white py-3 px-6 rounded-md hover:bg-[#0A3A68] transition-colors inline-flex items-center">
                    <span className="material-icons mr-2">shopping_cart</span>
                    Würfel kaufen
                  </button>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 mt-6">
                <h4 className="babix-info-header text-[#0A3A68] mb-2 flex items-center">
                  <span className="material-icons text-yellow-500 mr-2">info</span>
                  Hinweis
                </h4>
                <p className="text-sm text-gray-700">
                  Um die Würfel zu erhalten, benötigen wir Ihre MonopolyGO-ID. Diese finden Sie in den Einstellungen 
                  Ihres Spiels. Weitere Informationen finden Sie in unserer <Link href="/hilfe/wuerfel" className="text-[#00CFFF] hover:underline">Hilfesektion</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 mb-8">
            <h3 className="babix-info-header text-xl text-[#0A3A68] mb-4">Häufig gestellte Fragen</h3>
            
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h4 className="babix-info-header text-[#0A3A68] mb-2">Wie schnell erhalte ich meine Würfel?</h4>
                <p className="text-gray-700">
                  Nach Zahlungseingang werden die Würfel in der Regel innerhalb von 30 Minuten Ihrem Konto 
                  gutgeschrieben. Bei hohem Aufkommen kann es bis zu 12 Stunden dauern.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="babix-info-header text-[#0A3A68] mb-2">Ist dies sicher für mein Konto?</h4>
                <p className="text-gray-700">
                  Absolut! Wir verwenden nur sichere und von Monopoly GO zugelassene Methoden, um Ihrem Konto 
                  Würfel hinzuzufügen. Es besteht kein Risiko für Ihren Account.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="babix-info-header text-[#0A3A68] mb-2">Benötige ich meinen Monopoly GO Account?</h4>
                <p className="text-gray-700">
                  Wir benötigen lediglich Ihre Spieler-ID, die Sie in den Einstellungen Ihres Spiels finden. 
                  Ihre Anmeldedaten oder persönliche Informationen werden nicht benötigt.
                </p>
              </div>
              
              <div>
                <h4 className="babix-info-header text-[#0A3A68] mb-2">Gibt es einen Mengenrabatt?</h4>
                <p className="text-gray-700">
                  Ja, für regelmäßige Kunden bieten wir spezielle Rabatte an. Kontaktieren Sie unseren 
                  Kundendienst für weitere Informationen.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0A3A68] rounded-xl shadow-lg overflow-hidden p-6 text-white">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="material-icons mr-2">recommend</span>
              {SPECIAL_OFFER.title}
            </h3>
            <p className="mb-4">{SPECIAL_OFFER.description}</p>
            <div className="flex items-center bg-white bg-opacity-10 p-3 rounded-lg mb-4">
              <span className="text-3xl font-bold text-[#FF4C00] mr-3">{SPECIAL_OFFER.discount}%</span>
              <span>Rabatt auf alle Würfelkäufe ab 50€</span>
            </div>
            <button className="bg-[#FF4C00] text-white py-3 px-6 w-full rounded-md hover:bg-opacity-80 transition-colors font-medium">
              Angebot sichern
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}