import { useEffect, useState } from 'react';
import { Link } from 'wouter';

export default function Race() {
  useEffect(() => {
    document.title = 'Race & Tycoon Events | babixGO';
  }, []);

  // States für Race Event
  const [placeCount, setPlaceCount] = useState(1);
  const [price, setPrice] = useState(20);
  const [showModal, setShowModal] = useState(false);
  
  // States für Tycoon Racers
  const [eventType, setEventType] = useState<'team' | 'flags'>('team');
  const [tycoonPrice, setTycoonPrice] = useState(25);
  const [showTycoonModal, setShowTycoonModal] = useState(false);

  // Preistabelle für Race-Plätze
  const racePrices = [
    { places: 1, price: 20 },
    { places: 2, price: 39 },
    { places: 3, price: 56 },
    { places: 4, price: 71 },
    { places: 5, price: 86 },
    { places: 6, price: 100 },
  ];
  
  // Preistabelle für Tycoon Racers
  const tycoonPrices = {
    team: [
      { level: 'Bronze', price: 25 },
      { level: 'Silber', price: 45 },
      { level: 'Gold', price: 65 },
    ],
    flags: [
      { amount: '100 Flaggen', price: 20 },
      { amount: '250 Flaggen', price: 40 },
      { amount: '500 Flaggen', price: 75 },
    ]
  };

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
  
  // Handler für Tycoon Racers Event-Typ
  const handleTycoonTypeChange = (type: 'team' | 'flags') => {
    setEventType(type);
    // Standardpreis für den jeweiligen Typ setzen
    if (type === 'team') {
      setTycoonPrice(tycoonPrices.team[0].price);
    } else {
      setTycoonPrice(tycoonPrices.flags[0].price);
    }
  };
  
  // Handler für Tycoon Racers Preis-Änderung
  const handleTycoonPriceChange = (price: number) => {
    setTycoonPrice(price);
  };

  // Render das Tycoon Modal
  const renderTycoonModal = () => {
    if (showTycoonModal) {
      return (
        <TycoonConfirmationModal 
          isOpen={showTycoonModal} 
          onClose={() => setShowTycoonModal(false)} 
          eventType={eventType}
          price={tycoonPrice}
        />
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto px-4 py-8" id="top">
      <div className="flex flex-col items-center mb-8">
        <Link href="/produkte" className="self-start text-[#0A3A68] hover:text-[#FF4C00] mb-4 inline-flex items-center transition-colors">
          <span className="material-icons mr-1">arrow_back</span>
          Zurück zu Produkten
        </Link>
        <h1 className="babix-info-header text-3xl md:text-4xl font-bold mb-8 text-center">Race & Tycoon Events</h1>
      </div>
      
      <div className="max-w-4xl mx-auto mb-12">
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
        
        {/* Tycoon Racers Sektion */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-[#8A2BE2] to-[#FF69B4] p-4 text-white">
            <h2 className="text-2xl font-bold text-center">Tycoon Racers</h2>
            <p className="text-center opacity-90">Erhalten Sie Teamplätze oder Flaggen für Ihr Event</p>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4">Du hast die Wahl:</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Team Option */}
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-all ${eventType === 'team' ? 'border-[#8A2BE2] bg-purple-50 shadow-md' : 'border-gray-200 hover:border-purple-300'}`}
                onClick={() => handleTycoonTypeChange('team')}
              >
                <div className="flex items-center mb-2">
                  <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${eventType === 'team' ? 'bg-[#8A2BE2]' : 'border border-gray-400'}`}>
                    {eventType === 'team' && <span className="material-icons text-white text-xs">check</span>}
                  </div>
                  <h4 className="font-bold text-lg">Teamplatz</h4>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  Buchen Sie einen Platz in unserem Team und erhalten Sie die entsprechenden Belohnungen.
                </p>
                <div className="space-y-2">
                  {tycoonPrices.team.map((item, index) => (
                    <div 
                      key={index} 
                      className={`border rounded p-2 cursor-pointer ${tycoonPrice === item.price ? 'border-[#8A2BE2] bg-purple-50' : 'border-gray-200'}`}
                      onClick={() => eventType === 'team' && handleTycoonPriceChange(item.price)}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium">{item.level}</span>
                        <span className="font-bold text-[#FF4C00]">{item.price},00 €</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Flaggen Option */}
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-all ${eventType === 'flags' ? 'border-[#8A2BE2] bg-purple-50 shadow-md' : 'border-gray-200 hover:border-purple-300'}`}
                onClick={() => handleTycoonTypeChange('flags')}
              >
                <div className="flex items-center mb-2">
                  <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${eventType === 'flags' ? 'bg-[#8A2BE2]' : 'border border-gray-400'}`}>
                    {eventType === 'flags' && <span className="material-icons text-white text-xs">check</span>}
                  </div>
                  <h4 className="font-bold text-lg">Flaggen</h4>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  Kaufen Sie Flaggenpakete, um schneller im Event voranzukommen.
                </p>
                <div className="space-y-2">
                  {tycoonPrices.flags.map((item, index) => (
                    <div 
                      key={index} 
                      className={`border rounded p-2 cursor-pointer ${tycoonPrice === item.price ? 'border-[#8A2BE2] bg-purple-50' : 'border-gray-200'}`}
                      onClick={() => eventType === 'flags' && handleTycoonPriceChange(item.price)}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium">{item.amount}</span>
                        <span className="font-bold text-[#FF4C00]">{item.price},00 €</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setShowTycoonModal(true)}
              className="w-full bg-[#8A2BE2] hover:bg-[#7722C9] text-white py-3 px-4 rounded-md transition-colors font-bold"
            >
              <span className="flex items-center justify-center">
                <span className="material-icons mr-2">shopping_cart</span>
                {eventType === 'team' ? 'Teamplatz buchen' : 'Flaggen kaufen'}
              </span>
            </button>
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
      {renderTycoonModal()}
    </div>
  );
}

function TycoonConfirmationModal({ isOpen, onClose, eventType, price }: { 
  isOpen: boolean; 
  onClose: () => void;
  eventType: 'team' | 'flags';
  price: number;
}) {
  const [email, setEmail] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simuliere Verarbeitungszeit
    setTimeout(() => {
      setIsProcessing(false);
      onClose();
      // Hier könnte die Weiterleitung zur Zahlung erfolgen
    }, 1000);
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 z-10 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-[#8A2BE2]">
            {eventType === 'team' ? 'Teamplatz buchen' : 'Flaggen kaufen'}
          </h3>
          <span 
            className="material-icons cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            close
          </span>
        </div>

        <div className="mb-4 p-3 bg-purple-50 rounded-md">
          <div className="font-medium text-[#8A2BE2]">Ihre Auswahl:</div>
          <div className="flex justify-between mt-1">
            <span>{eventType === 'team' ? 'Teamplatz Tycoon Racers' : 'Flaggenpaket Tycoon Racers'}</span>
            <span className="font-bold">{price},00 €</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">
              E-Mail Adresse <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#8A2BE2]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="playerId">
              Monopoly GO Spieler-ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="playerId"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#8A2BE2]"
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Ihre Spieler-ID finden Sie in den Einstellungen des Spiels
            </p>
          </div>
          
          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-3 px-4 rounded-md transition-colors font-bold flex items-center justify-center ${
              isProcessing 
                ? 'bg-purple-300 cursor-not-allowed' 
                : 'bg-[#8A2BE2] hover:bg-[#7722C9] text-white'
            }`}
          >
            {isProcessing ? (
              <>
                <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Verarbeitung...
              </>
            ) : (
              <>
                <span className="material-icons mr-2">payment</span>
                Zur Zahlung
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  ) : null;
}