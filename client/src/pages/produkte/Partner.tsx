import { useEffect, useState } from 'react';
import { Link } from 'wouter';

export default function Partner() {
  useEffect(() => {
    document.title = 'Partnerevent-Plätze | babixGO';
  }, []);

  const [partnerCount, setPartnerCount] = useState(1);
  const [price, setPrice] = useState(7.5);
  const [showModal, setShowModal] = useState(false);

  // Preisberechnung für Partner
  const calculatePrice = (count: number) => {
    const pricePerPartner = 7.5;
    let calculatedPrice = count * pricePerPartner;
    
    // Rabatt bei mehr Partnern (vereinfacht dargestellt)
    if (count >= 4) calculatedPrice = calculatedPrice * 0.97; // 3% Rabatt ab 4 Partner
    if (count >= 8) calculatedPrice = calculatedPrice * 0.95; // weiterer 5% Rabatt ab 8 Partner
    
    return parseFloat(calculatedPrice.toFixed(2));
  };

  // Partner-Anzahl ändern und Preis aktualisieren
  const handlePartnerCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const count = parseInt(e.target.value);
    setPartnerCount(count);
    setPrice(calculatePrice(count));
  };

  // Preistabelle für Anzeige
  const partnerPrices = [
    { count: 1, price: 7.50 },
    { count: 2, price: 14.00 },
    { count: 3, price: 21.00 },
    { count: 4, price: 29.00 },
    { count: 6, price: 43.00 },
    { count: 8, price: 55.00 },
    { count: 10, price: 67.00 },
    { count: 12, price: 75.00 },
  ];

  return (
    <div className="container mx-auto px-4 py-8" id="top">
      <div className="flex flex-col items-center mb-8">
        <Link href="/produkte" className="self-start text-[#0A3A68] hover:text-[#FF4C00] mb-4 inline-flex items-center transition-colors">
          <span className="material-icons mr-1">arrow_back</span>
          Zurück zu Produkten
        </Link>
        <h1 className="babix-info-header text-3xl md:text-4xl font-bold mb-8 text-center">Partnerevent-Plätze</h1>
      </div>
      
      <div className="max-w-4xl mx-auto mb-12">
      
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-[#0A3A68] mb-4">Partnerevent-Plätze buchen</h2>
              <p className="text-gray-700 mb-4">
                Buchen Sie zuverlässige Partnerevent-Plätze für das aktuelle Event in Monopoly GO. 
                Unsere aktiven Spieler tauschen regelmäßig Geschenke mit Ihnen aus und maximieren so Ihre Belohnungen.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="material-icons text-[#00CFFF] mr-2 mt-0.5">check_circle</span>
                  <span>Garantierte tägliche Geschenke</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-[#00CFFF] mr-2 mt-0.5">check_circle</span>
                  <span>Aktive und zuverlässige Partner</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-[#00CFFF] mr-2 mt-0.5">check_circle</span>
                  <span>Maximieren Sie Ihre Event-Belohnungen</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-[#00CFFF] mr-2 mt-0.5">check_circle</span>
                  <span>Bis zu 12 Partner möglich</span>
                </li>
              </ul>
              
              <div className="bg-[#E6F7FF] border-l-4 border-[#00CFFF] p-4 rounded-r-md mb-6">
                <p className="text-gray-700 text-sm">
                  <span className="font-bold">Aktuelles Event:</span> Partnerwoche vom 20.05. - 27.05.2025
                </p>
              </div>
              
              <Link href="/hilfe/partner">
                <button className="bg-transparent border border-[#0A3A68] text-[#0A3A68] hover:bg-gray-100 py-2 px-4 rounded-md transition-colors flex items-center justify-center w-full">
                  <span className="material-icons mr-1">help</span>
                  Weitere Informationen zu Partnerevents
                </button>
              </Link>
            </div>
            <div className="bg-gradient-to-r from-[#0A3A68] to-[#00CFFF] p-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4 text-center">Partner buchen</h3>
                
                <div className="mb-4">
                  <label htmlFor="partnerCount" className="block text-sm font-medium mb-1">Anzahl der Partner:</label>
                  <select 
                    id="partnerCount" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF] text-gray-700"
                    value={partnerCount}
                    onChange={handlePartnerCountChange}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(count => (
                      <option key={count} value={count}>{count} {count === 1 ? 'Partner' : 'Partner'}</option>
                    ))}
                  </select>
                </div>
                
                <div className="bg-white/20 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span>Preis pro Partner:</span>
                    <span>7,50 €</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-lg mt-2 pt-2 border-t border-white/20">
                    <span>Gesamtpreis:</span>
                    <span>{price.toFixed(2)} €</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full bg-white text-[#0A3A68] hover:bg-opacity-90 py-3 px-4 rounded-md transition-colors font-bold"
                  >
                    <span className="flex items-center justify-center">
                      <span className="material-icons mr-2">shopping_cart</span>
                      Jetzt buchen
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Preistabelle */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4">Unsere Preise</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left text-[#0A3A68]">Anzahl Partner</th>
                  <th className="px-4 py-2 text-right text-[#0A3A68]">Preis</th>
                  <th className="px-4 py-2 text-right text-[#0A3A68]">Preis pro Partner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {partnerPrices.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3">{item.count} {item.count === 1 ? 'Partner' : 'Partner'}</td>
                    <td className="px-4 py-3 text-right font-semibold">{item.price.toFixed(2)} €</td>
                    <td className="px-4 py-3 text-right text-gray-600">
                      {(item.price / item.count).toFixed(2)} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Info-Box */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4">So funktionieren Partnerevents</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="w-12 h-12 bg-[#00CFFF] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="material-icons text-white">group_add</span>
              </div>
              <h3 className="font-bold text-center mb-2">1. Partner buchen</h3>
              <p className="text-gray-600 text-sm text-center">
                Wählen Sie die gewünschte Anzahl an Partnern und schließen Sie die Buchung ab.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="w-12 h-12 bg-[#00CFFF] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="material-icons text-white">settings</span>
              </div>
              <h3 className="font-bold text-center mb-2">2. Setup</h3>
              <p className="text-gray-600 text-sm text-center">
                Nach Zahlungseingang richten wir Ihre Partner ein und verbinden sie mit Ihrem Account.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="w-12 h-12 bg-[#00CFFF] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="material-icons text-white">card_giftcard</span>
              </div>
              <h3 className="font-bold text-center mb-2">3. Geschenke erhalten</h3>
              <p className="text-gray-600 text-sm text-center">
                Sie erhalten automatisch täglich Geschenke von Ihren Partnern während des Events.
              </p>
            </div>
          </div>
        </div>
        
        {/* FAQ */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4">Häufig gestellte Fragen</h2>
          
          <div className="space-y-4">
            <details className="group border-b border-gray-200 pb-4">
              <summary className="flex justify-between items-center font-bold cursor-pointer text-[#0A3A68] hover:text-[#FF4C00]">
                Wie lange sind die Partner aktiv?
                <span className="material-icons transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="mt-2 text-gray-700">
                <p>Die gebuchten Partner sind für die Dauer des aktuellen Events aktiv, in der Regel 7 Tage. Sie tauschen täglich Geschenke mit Ihnen aus und helfen Ihnen so, die Event-Ziele zu erreichen.</p>
              </div>
            </details>
            
            <details className="group border-b border-gray-200 pb-4">
              <summary className="flex justify-between items-center font-bold cursor-pointer text-[#0A3A68] hover:text-[#FF4C00]">
                Was benötigen Sie von mir?
                <span className="material-icons transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="mt-2 text-gray-700">
                <p>Für die Einrichtung benötigen wir Ihre Spieler-ID oder Ihren Account-Namen in Monopoly GO. Wir werden Sie nach dem Kauf kontaktieren, um diese Informationen zu erhalten.</p>
              </div>
            </details>
            
            <details className="group">
              <summary className="flex justify-between items-center font-bold cursor-pointer text-[#0A3A68] hover:text-[#FF4C00]">
                Wie viele Partner kann ich maximal buchen?
                <span className="material-icons transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="mt-2 text-gray-700">
                <p>Sie können bis zu 12 Partner für ein Event buchen. Die maximale Anzahl hängt von der aktuellen Verfügbarkeit ab. Je mehr Partner Sie buchen, desto mehr Geschenke erhalten Sie und desto schneller kommen Sie im Event voran.</p>
              </div>
            </details>
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
      
      {/* Modal für Kaufoptionen */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#0A3A68]">Wie möchten Sie bestellen?</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="material-icons">close</span>
              </button>
            </div>
            
            <p className="mb-6">
              Wählen Sie Ihre bevorzugte Bestellmethode:
            </p>
            
            <div className="space-y-3">
              <a
                href={`https://wa.me/491234567890?text=Ich%20möchte%20${partnerCount}%20Partner%20für%20das%20aktuelle%20Event%20buchen.`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#25D366] hover:bg-opacity-90 text-white py-3 px-4 rounded-md transition-colors text-center"
              >
                <span className="flex items-center justify-center">
                  <span className="material-icons mr-2">whatsapp</span>
                  Über WhatsApp bestellen
                </span>
              </a>
              
              <button
                onClick={() => {
                  alert('Hier würde jetzt der normale Bestellprozess starten.');
                  setShowModal(false);
                }}
                className="w-full bg-[#0A3A68] hover:bg-[#FF4C00] text-white py-3 px-4 rounded-md transition-colors"
              >
                <span className="flex items-center justify-center">
                  <span className="material-icons mr-2">shopping_cart</span>
                  Zum Warenkorb
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}