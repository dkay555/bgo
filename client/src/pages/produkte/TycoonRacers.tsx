import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { CONTACT } from '@/lib/constants';

export default function TycoonRacers() {
  useEffect(() => {
    document.title = 'Tycoon Racers | babixGO';
  }, []);
  
  // States für Tycoon Racers
  const [eventType, setEventType] = useState<'team' | 'flags'>('team');
  const [tycoonPrice, setTycoonPrice] = useState(25);
  const [showTycoonModal, setShowTycoonModal] = useState(false);

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4">Bestätigung</h3>
            <p className="mb-4">
              Vielen Dank für deine Auswahl! Du hast dich für {eventType === 'team' ? 'einen Teamplatz' : 'ein Flaggenpaket'} für die Tycoon Racers entschieden.
            </p>
            <p className="font-semibold mb-6">Preis: {tycoonPrice} €</p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowTycoonModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
              >
                Abbrechen
              </button>
              <Link
                to={`/checkout/tycoonracers?type=${eventType}&level=${eventType === 'team' ? 
                  (tycoonPrice === 25 ? 'bronze' : tycoonPrice === 45 ? 'silver' : 'gold') : 
                  (tycoonPrice === 20 ? '100' : tycoonPrice === 40 ? '250' : '500')}`}
                className="px-4 py-2 bg-[#FF4C00] hover:bg-[#FF4C00]/80 text-white rounded-md transition-colors"
              >
                Weiter zum Kaufen
              </Link>
            </div>
          </div>
        </div>
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
        <h1 className="babix-info-header text-3xl md:text-4xl font-bold mb-8 text-center">Tycoon Racers</h1>
      </div>
      
      <div className="max-w-4xl mx-auto mb-12">
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
              className="w-full bg-[#8A2BE2] hover:bg-[#7B1FA2] text-white py-3 px-6 rounded-md transition-colors font-bold flex items-center justify-center"
            >
              <span className="material-icons mr-2">shopping_cart</span>
              Jetzt buchen
            </button>
            
            <div className="mt-8 space-y-4 bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-lg text-[#0A3A68]">Häufig gestellte Fragen:</h3>
              
              <details className="group">
                <summary className="flex justify-between items-center font-bold cursor-pointer text-[#0A3A68] hover:text-[#FF4C00]">
                  Was sind Tycoon Racers Events?
                  <span className="material-icons transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="mt-2 text-gray-700">
                  <p>Tycoon Racers sind spezielle Events in Monopoly GO, bei denen Sie in Teams antreten oder Flaggen sammeln, um wertvolle Belohnungen zu erhalten. Unsere Pakete helfen Ihnen, bei diesen Events schneller voranzukommen.</p>
                </div>
              </details>
              
              <details className="group">
                <summary className="flex justify-between items-center font-bold cursor-pointer text-[#0A3A68] hover:text-[#FF4C00]">
                  Wie funktionieren Teamplätze?
                  <span className="material-icons transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="mt-2 text-gray-700">
                  <p>Bei einem Teamplatz nehmen wir Sie in unser Team für das Tycoon Racers Event auf. Je nach gewähltem Level (Bronze, Silber, Gold) erhalten Sie unterschiedliche Belohnungen. Sie profitieren von unserem erfahrenen Team und erhalten alle entsprechenden Belohnungen.</p>
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
      
      {/* Render das Modal */}
      {renderTycoonModal()}
    </div>
  );
}