import { useEffect, useState } from 'react';
import { Link } from 'wouter';

export default function Race() {
  useEffect(() => {
    document.title = 'Race Event Plätze | babixGO';
  }, []);

  const [placeCount, setPlaceCount] = useState(1);
  const [price, setPrice] = useState(20);
  const [showModal, setShowModal] = useState(false);

  // Preistabelle für Race-Plätze
  const racePrices = [
    { places: 1, price: 20 },
    { places: 2, price: 39 },
    { places: 3, price: 56 },
    { places: 4, price: 71 },
    { places: 5, price: 86 },
    { places: 6, price: 100 },
  ];

  // Aktualisiert den Preis basierend auf der Anzahl der Plätze
  const handlePlaceCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const count = parseInt(e.target.value);
    setPlaceCount(count);
    
    // Preis aus der Tabelle ermitteln
    const priceItem = racePrices.find(item => item.places === count);
    if (priceItem) {
      setPrice(priceItem.price);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8" id="top">
      <div className="flex flex-col items-center mb-8">
        <Link href="/produkte" className="self-start text-[#0A3A68] hover:text-[#FF4C00] mb-4 inline-flex items-center transition-colors">
          <span className="material-icons mr-1">arrow_back</span>
          Zurück zu Produkten
        </Link>
        <h1 className="babix-info-header text-3xl md:text-4xl font-bold mb-8 text-center">Race Event Plätze</h1>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gradient-to-r from-[#0A3A68] to-[#FF4C00] p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6">
                  <span className="material-icons text-white text-6xl">emoji_events</span>
                </div>
                <h3 className="text-white text-xl font-bold mb-2">Aktives Event:</h3>
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <p className="text-white font-bold">Rush Hour Challenge</p>
                  <p className="text-white/90 text-sm">20.05. - 23.05.2025</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-[#0A3A68] mb-4">Race Event Plätze buchen</h2>
              <p className="text-gray-700 mb-4">
                Mit unseren exklusiven Race Event Plätzen kommen Sie schneller voran und erreichen alle Belohnungsstufen. 
                Unsere erfahrenen Spieler helfen Ihnen, die begehrten Preise des aktuellen Events zu sichern.
              </p>
              
              <div className="mb-6">
                <label htmlFor="placeCount" className="block text-sm font-medium text-gray-700 mb-1">Anzahl der Plätze:</label>
                <select 
                  id="placeCount" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF]"
                  value={placeCount}
                  onChange={handlePlaceCountChange}
                >
                  {racePrices.map(item => (
                    <option key={item.places} value={item.places}>{item.places} {item.places === 1 ? 'Platz' : 'Plätze'}</option>
                  ))}
                </select>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Preis:</span>
                  <span className="text-[#0A3A68]">{price.toFixed(2)} €</span>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Entspricht {(price / placeCount).toFixed(2)} € pro Platz
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full bg-[#FF4C00] hover:bg-[#0A3A68] text-white py-3 px-4 rounded-md transition-colors font-bold"
                >
                  <span className="flex items-center justify-center">
                    <span className="material-icons mr-2">shopping_cart</span>
                    Jetzt buchen
                  </span>
                </button>
                
                <Link href="/hilfe/race">
                  <button className="w-full bg-transparent border border-[#0A3A68] text-[#0A3A68] hover:bg-gray-100 py-2 px-4 rounded-md transition-colors flex items-center justify-center">
                    <span className="material-icons mr-1">help</span>
                    Weitere Informationen zu Race Events
                  </button>
                </Link>
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
                  <th className="px-4 py-2 text-left text-[#0A3A68]">Anzahl Plätze</th>
                  <th className="px-4 py-2 text-right text-[#0A3A68]">Gesamtpreis</th>
                  <th className="px-4 py-2 text-right text-[#0A3A68]">Preis pro Platz</th>
                  <th className="px-4 py-2 text-right text-[#0A3A68]">Ersparnis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {racePrices.map((item, index) => {
                  const basePrice = 20; // Preis für einen Platz
                  const fullPrice = item.places * basePrice;
                  const savings = fullPrice - item.price;
                  const savingsPercent = Math.round((savings / fullPrice) * 100);
                  
                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3">{item.places} {item.places === 1 ? 'Platz' : 'Plätze'}</td>
                      <td className="px-4 py-3 text-right font-semibold">{item.price.toFixed(2)} €</td>
                      <td className="px-4 py-3 text-right text-gray-600">
                        {(item.price / item.places).toFixed(2)} €
                      </td>
                      <td className="px-4 py-3 text-right">
                        {item.places > 1 ? (
                          <span className="text-green-600">
                            {savings.toFixed(2)} € ({savingsPercent}%)
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Vorteile-Box */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-6">Ihre Vorteile mit Race Event Plätzen</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-[#FF4C00] rounded-full flex items-center justify-center">
                  <span className="material-icons text-white">speed</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Schnelleres Vorankommen</h3>
                <p className="text-gray-600">
                  Erreichen Sie Belohnungen und Meilensteine deutlich schneller als im normalen Spielverlauf.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-[#FF4C00] rounded-full flex items-center justify-center">
                  <span className="material-icons text-white">diamond</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Seltene Belohnungen</h3>
                <p className="text-gray-600">
                  Sichern Sie sich wertvolle Sticker, Würfel und andere exklusive Belohnungen aus dem Event.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-[#FF4C00] rounded-full flex items-center justify-center">
                  <span className="material-icons text-white">schedule</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Zeitersparnis</h3>
                <p className="text-gray-600">
                  Sparen Sie wertvolle Zeit, da wir das zeitaufwändige Spielen für Sie übernehmen.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-[#FF4C00] rounded-full flex items-center justify-center">
                  <span className="material-icons text-white">verified</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Garantierte Ergebnisse</h3>
                <p className="text-gray-600">
                  Wir garantieren, dass Sie mindestens 80% der Event-Belohnungen erhalten.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ablauf */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-6">So funktioniert es</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#00CFFF] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="font-bold mb-2">Plätze auswählen</h3>
              <p className="text-gray-600 text-sm">
                Wählen Sie die gewünschte Anzahl an Race-Plätzen aus und buchen Sie diese.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-[#00CFFF] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="font-bold mb-2">Daten teilen</h3>
              <p className="text-gray-600 text-sm">
                Teilen Sie uns Ihre Spieler-ID mit, damit wir mit dem Race für Sie beginnen können.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-[#00CFFF] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="font-bold mb-2">Belohnungen erhalten</h3>
              <p className="text-gray-600 text-sm">
                Wir informieren Sie regelmäßig über den Fortschritt und Sie erhalten alle erspielten Belohnungen.
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
                Wie weit komme ich mit einem Race-Platz?
                <span className="material-icons transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="mt-2 text-gray-700">
                <p>Mit einem Race-Platz erreichen Sie in der Regel etwa 50-60% der Event-Belohnungen. Mit zwei Plätzen kommen Sie auf ca. 70-80%, und mit drei oder mehr Plätzen können Sie nahezu alle Belohnungen des Events freischalten.</p>
              </div>
            </details>
            
            <details className="group border-b border-gray-200 pb-4">
              <summary className="flex justify-between items-center font-bold cursor-pointer text-[#0A3A68] hover:text-[#FF4C00]">
                Benötigen Sie mein Passwort?
                <span className="material-icons transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="mt-2 text-gray-700">
                <p>Nein, wir benötigen niemals Ihr Passwort. Für den Race-Service reicht Ihre Spieler-ID oder Ihr Account-Name in Monopoly GO aus.</p>
              </div>
            </details>
            
            <details className="group border-b border-gray-200 pb-4">
              <summary className="flex justify-between items-center font-bold cursor-pointer text-[#0A3A68] hover:text-[#FF4C00]">
                Wie lange dauert ein Race-Event?
                <span className="material-icons transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="mt-2 text-gray-700">
                <p>Die meisten Race-Events in Monopoly GO dauern zwischen 2 und 4 Tagen. Wir spielen durchgehend während dieser Zeit, um maximale Ergebnisse zu erzielen.</p>
              </div>
            </details>
            
            <details className="group">
              <summary className="flex justify-between items-center font-bold cursor-pointer text-[#0A3A68] hover:text-[#FF4C00]">
                Kann ich auch während eines laufenden Events noch Plätze buchen?
                <span className="material-icons transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="mt-2 text-gray-700">
                <p>Ja, Sie können auch während eines laufenden Events noch Plätze buchen. Der Preis bleibt gleich, aber die erreichbaren Belohnungen können je nach verbleibender Zeit variieren. Kontaktieren Sie uns für eine individuelle Beratung.</p>
              </div>
            </details>
          </div>
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
                href={`https://wa.me/491234567890?text=Ich%20möchte%20${placeCount}%20Race-Plätze%20für%20das%20aktuelle%20Event%20buchen.`}
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