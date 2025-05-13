import { useEffect, useState } from 'react';
import { Link } from 'wouter';

export default function Partner() {
  useEffect(() => {
    document.title = 'Partnerevent-Plätze | babixGO';
  }, []);

  const [partnerCount, setPartnerCount] = useState(1);
  const [price, setPrice] = useState(7);
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'partner' | 'waehrung'>('partner');

  // Preisberechnung für Partner
  const calculatePartnerPrice = (count: number) => {
    // Spezialpreis für 4 Partner
    if (count === 4) return 25;
    
    // Regulärer Preis: 7€ pro Partner
    return count * 7;
  };
  
  // Preisberechnung für Eventwährung
  const calculateWaehrungPrice = (amount: string) => {
    switch (amount) {
      case '15000': return 25;
      case '25000': return 35;
      default: return 0;
    }
  };

  // Partner-Anzahl ändern und Preis aktualisieren
  const handlePartnerCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const count = parseInt(e.target.value);
    setPartnerCount(count);
    setPrice(calculatePartnerPrice(count));
  };
  
  // Beim Wechsel zwischen Partner und Währung den Preis aktualisieren
  useEffect(() => {
    if (selectedOption === 'partner') {
      setPrice(calculatePartnerPrice(partnerCount));
    } else {
      setPrice(calculateWaehrungPrice('15000')); // Standardmäßig 15000 Währung (25€)
    }
  }, [selectedOption]);

  // Preistabelle für Anzeige
  const partnerPrices = [
    { count: 1, price: 7 },
    { count: 2, price: 14 },
    { count: 3, price: 21 },
    { count: 4, price: 25 }, // Sonderpreis
  ];
  
  // Währungsoptionen
  const waehrungOptions = [
    { amount: '15000', price: 25 },
    { amount: '25000', price: 35 },
  ];

  return (
    <div className="container mx-auto px-4 py-8" id="top">
      <div className="flex flex-col items-center mb-8">
        <Link href="/produkte" className="self-start text-[#0A3A68] hover:text-[#FF4C00] mb-4 inline-flex items-center transition-colors">
          <span className="material-icons mr-1">arrow_back</span>
          Zurück zu Produkten
        </Link>
        <h1 className="babix-info-header text-3xl md:text-4xl font-bold mb-8 text-center">Partnerevent</h1>
      </div>
      
      <div className="max-w-4xl mx-auto mb-12">
        {/* Optionenauswahl: Partner oder Eventwährung */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#0A3A68] mb-4">Partnerevent - Wähle deine Option</h2>
            
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div 
                className={`flex-1 border-2 rounded-lg p-6 cursor-pointer transition-all ${
                  selectedOption === 'partner' 
                    ? 'border-[#0A3A68] bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedOption('partner')}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-[#0A3A68]">Zuverlässiger Partner</h3>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedOption === 'partner' ? 'border-[#0A3A68] bg-[#0A3A68]' : 'border-gray-300'
                  }`}>
                    {selectedOption === 'partner' && (
                      <span className="material-icons text-white text-sm">check</span>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">
                  Lehne dich zurück und lass uns die Arbeit machen! Wir übernehmen die vollen 80.000 Punkte.
                </p>
                
                <div className="bg-[#0A3A68]/10 p-3 rounded-md mb-3">
                  <div className="font-semibold text-[#0A3A68]">Preistabelle:</div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>Je Partner 7€</span>
                    <span>4 Partner 25€</span>
                  </div>
                </div>
              </div>
              
              <div 
                className={`flex-1 border-2 rounded-lg p-6 cursor-pointer transition-all ${
                  selectedOption === 'waehrung' 
                    ? 'border-[#0A3A68] bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedOption('waehrung')}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-[#0A3A68]">Eventwährung</h3>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedOption === 'waehrung' ? 'border-[#0A3A68] bg-[#0A3A68]' : 'border-gray-300'
                  }`}>
                    {selectedOption === 'waehrung' && (
                      <span className="material-icons text-white text-sm">check</span>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">
                  Falls du lieber mit deinen liebsten spielen magst, aber trotzdem nicht um den Hauptpreis bangen willst: Wir sammeln Eventwährung vom Spielbrett.
                </p>
                
                <div className="bg-[#0A3A68]/10 p-3 rounded-md mb-3">
                  <div className="font-semibold text-[#0A3A68]">Preistabelle:</div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>15.000 Eventwährung - 25€</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>25.000 Eventwährung - 35€</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Partner Bereich - nur anzeigen, wenn Partner ausgewählt ist */}
            {selectedOption === 'partner' && (
              <div className="bg-white border-2 border-[#0A3A68] rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-[#0A3A68] mb-4">Partner buchen</h3>
                
                <div className="mb-6">
                  <label htmlFor="partnerCount" className="block text-sm font-medium mb-2">Anzahl der Partner:</label>
                  <select 
                    id="partnerCount" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A3A68] text-gray-700"
                    value={partnerCount}
                    onChange={handlePartnerCountChange}
                  >
                    {[1, 2, 3, 4].map(count => (
                      <option key={count} value={count}>{count} {count === 1 ? 'Partner' : 'Partner'}</option>
                    ))}
                  </select>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span>Preis pro Partner:</span>
                    <span>{partnerCount === 4 ? '6,25' : '7,00'} €</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-lg mt-2 pt-2 border-t border-gray-200">
                    <span>Gesamtpreis:</span>
                    <span>{price.toFixed(2).replace('.', ',')} €</span>
                  </div>
                </div>
                
                <Link to={`/checkout/partnerevent?partner=${partnerCount}`} className="block">
                  <button className="w-full bg-[#FF4C00] hover:bg-[#0A3A68] text-white py-3 px-4 rounded-md transition-colors font-bold">
                    <span className="flex items-center justify-center">
                      <span className="material-icons mr-2">shopping_cart</span>
                      Partner buchen
                    </span>
                  </button>
                </Link>
              </div>
            )}
            
            {/* Eventwährung Bereich - nur anzeigen, wenn Währung ausgewählt ist */}
            {selectedOption === 'waehrung' && (
              <div className="bg-white border-2 border-[#0A3A68] rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-[#0A3A68] mb-4">Eventwährung kaufen</h3>
                
                <div className="mb-6">
                  <label htmlFor="waehrungAmount" className="block text-sm font-medium mb-2">Menge wählen:</label>
                  <select 
                    id="waehrungAmount" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A3A68] text-gray-700"
                    onChange={(e) => setPrice(calculateWaehrungPrice(e.target.value))}
                    defaultValue="15000"
                  >
                    {waehrungOptions.map(option => (
                      <option key={option.amount} value={option.amount}>
                        {parseInt(option.amount).toLocaleString('de-DE')} Eventwährung
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 mb-4">
                    Hier gelten dieselben Voraussetzungen wie für den Würfelboost.
                  </p>
                  <div className="flex justify-between items-center font-bold text-lg pt-2 border-t border-gray-200">
                    <span>Preis:</span>
                    <span>{price.toFixed(2).replace('.', ',')} €</span>
                  </div>
                </div>
                
                <Link to="/checkout/wuerfel" className="block">
                  <button className="w-full bg-[#FF4C00] hover:bg-[#0A3A68] text-white py-3 px-4 rounded-md transition-colors font-bold">
                    <span className="flex items-center justify-center">
                      <span className="material-icons mr-2">shopping_cart</span>
                      Jetzt kaufen
                    </span>
                  </button>
                </Link>
              </div>
            )}
            
            {/* FAQ Box */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#0A3A68] mb-4">FAQ</h3>
              
              <ul className="space-y-3">
                <li>
                  <a href="/hilfe/partnerevent" className="text-[#0A3A68] hover:text-[#FF4C00] font-medium underline">
                    Alle Informationen zum Partnerevent findest du hier
                  </a>
                </li>
                <li>
                  <a href="/hilfe/wuerfelboost" className="text-[#0A3A68] hover:text-[#FF4C00] font-medium underline">
                    Die Voraussetzungen für die Eventwährung kannst du auch hier nachlesen
                  </a>
                </li>
                <li>
                  <a href="/kontakt" className="text-[#0A3A68] hover:text-[#FF4C00] font-medium underline">
                    Gerne kannst du uns auch über die hier verlinkten Wege kontaktieren
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Kontaktbox wie in den anderen Seiten */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <span className="material-icons text-[#00CFFF] text-2xl mr-3">help_outline</span>
            <h2 className="text-2xl font-bold text-[#0A3A68]">Du hast noch Fragen?</h2>
          </div>
          
          <p className="text-gray-700 mb-4">
            Schreib uns gerne eine Nachricht. Alle Kontaktmöglichkeiten findest du hier:
          </p>
          
          <Link href="/kontakt" className="inline-block">
            <button className="bg-[#FF4C00] hover:bg-[#0A3A68] text-white py-2 px-4 rounded-md transition-colors inline-flex items-center font-bold">
              <span className="material-icons mr-2">contact_support</span>
              Kontakt aufnehmen
            </button>
          </Link>
        </div>
      </div>
      
      {/* Modal wurde durch direkte Links ersetzt und wird nicht mehr benötigt */}
    </div>
  );
}