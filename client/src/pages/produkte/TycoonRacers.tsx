import { useEffect, useState } from 'react';
import { Link } from 'wouter';

export default function TycoonRacers() {
  useEffect(() => {
    document.title = 'Tycoon Racers | babixGO';
  }, []);
  
  // States für Tycoon Racers
  const [teamPrice, setTeamPrice] = useState(20);
  const [flaggenPrice, setFlaggenPrice] = useState(30);

  // Preistabelle für Tycoon Racers
  const tycoonPrices = {
    team: [
      { slots: 1, price: 20 },
      { slots: 2, price: 38 },
      { slots: 3, price: 55 },
    ],
    flags: [
      { amount: '15.000 Flaggen', price: 30 },
      { amount: '25.000 Flaggen', price: 40 },
    ]
  };

  // Handler für Team Preis-Änderung
  const handleTeamPriceChange = (price: number) => {
    setTeamPrice(price);
  };
  
  // Handler für Flaggen Preis-Änderung
  const handleFlaggenPriceChange = (price: number) => {
    setFlaggenPrice(price);
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
        {/* Tycoon Racers Hauptbox */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center mb-6">
            <span className="material-icons text-[#8A2BE2] text-2xl mr-3">event</span>
            <h2 className="text-2xl font-bold text-[#0A3A68]">Teamplätze / Flaggen für deinen Account</h2>
          </div>
          
          <div className="prose max-w-none mb-8">
            <p className="text-gray-700 mb-4">
              Werde Teil unseres Teams und sichere die alle 54 Rundenbelohnungen!
            </p>
          </div>
          
          {/* Teamplätze Box */}
          <div className="border rounded-lg p-6 bg-purple-50 mb-8">
            <h3 className="font-bold text-lg text-[#0A3A68] mb-4">Teamplätze</h3>
            
            <div className="space-y-3 mb-6">
              {tycoonPrices.team.map((item, index) => (
                <div 
                  key={index} 
                  className={`border rounded p-3 cursor-pointer ${teamPrice === item.price ? 'border-[#8A2BE2] bg-white shadow-md' : 'border-gray-200 bg-white'}`}
                  onClick={() => handleTeamPriceChange(item.price)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${teamPrice === item.price ? 'bg-[#8A2BE2]' : 'border border-gray-400'}`}>
                        {teamPrice === item.price && <span className="material-icons text-white text-xs">check</span>}
                      </div>
                      <span className="font-medium">{item.slots} {item.slots === 1 ? 'Platz' : 'Plätze'}</span>
                    </div>
                    <span className="font-bold text-[#FF4C00]">{item.price},00 €</span>
                  </div>
                </div>
              ))}
            </div>
            
            <Link href={`/checkout/tycoonracers?price=${teamPrice}`}>
              <button
                className="w-full bg-[#8A2BE2] hover:bg-[#7B1FA2] text-white py-3 px-6 rounded-md transition-colors font-bold flex items-center justify-center"
              >
                <span className="material-icons mr-2">group_add</span>
                Teamplatz sichern
              </button>
            </Link>
          </div>
          
          {/* Flaggen Box */}
          <div className="border rounded-lg p-6 bg-blue-50 mb-8">
            <h3 className="font-bold text-lg text-[#0A3A68] mb-4">Flaggen</h3>
            
            <p className="text-gray-700 mb-4">
              Fahre dein Team zum Sieg. Wir helfen beim Flaggen sammeln!
            </p>
            
            <div className="space-y-3 mb-6">
              {tycoonPrices.flags.map((item, index) => (
                <div 
                  key={index} 
                  className={`border rounded p-3 cursor-pointer ${flaggenPrice === item.price ? 'border-[#8A2BE2] bg-white shadow-md' : 'border-gray-200 bg-white'}`}
                  onClick={() => handleFlaggenPriceChange(item.price)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${flaggenPrice === item.price ? 'bg-[#8A2BE2]' : 'border border-gray-400'}`}>
                        {flaggenPrice === item.price && <span className="material-icons text-white text-xs">check</span>}
                      </div>
                      <span className="font-medium">{item.amount}</span>
                    </div>
                    <span className="font-bold text-[#FF4C00]">{item.price},00 €</span>
                  </div>
                </div>
              ))}
            </div>
            
            <Link href={`/checkout/flaggen?price=${flaggenPrice}`}>
              <button
                className="w-full bg-[#8A2BE2] hover:bg-[#7B1FA2] text-white py-3 px-6 rounded-md transition-colors font-bold flex items-center justify-center"
              >
                <span className="material-icons mr-2">flag</span>
                Jetzt kaufen
              </button>
            </Link>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-8 space-y-4 bg-purple-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-[#0A3A68]">Häufig gestellte Fragen:</h3>
            
            <details className="group">
              <summary className="flex justify-between items-center font-bold cursor-pointer text-[#0A3A68] hover:text-[#FF4C00]">
                Was sind Tycoon Racers Events?
                <span className="material-icons transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="mt-2 text-gray-700">
                <p>Tycoon Racers sind spezielle Events in Monopoly GO, bei denen du in Teams antrittst oder Flaggen sammelst, um wertvolle Belohnungen zu erhalten. Unsere Pakete helfen dir, bei diesen Events schneller voranzukommen und alle Belohnungen zu sichern.</p>
              </div>
            </details>
            
            <details className="group">
              <summary className="flex justify-between items-center font-bold cursor-pointer text-[#0A3A68] hover:text-[#FF4C00]">
                Wie funktionieren Teamplätze?
                <span className="material-icons transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="mt-2 text-gray-700">
                <p>Bei einem Teamplatz nehmen wir dich in unser Team für das Tycoon Racers Event auf. Je nach gewählter Anzahl der Plätze erhältst du unterschiedliche Belohnungen. Du profitierst von unserem erfahrenen Team und erhältst alle 54 Rundenbelohnungen.</p>
              </div>
            </details>
            
            <details className="group">
              <summary className="flex justify-between items-center font-bold cursor-pointer text-[#0A3A68] hover:text-[#FF4C00]">
                Kann ich auch während eines laufenden Events noch Plätze buchen?
                <span className="material-icons transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="mt-2 text-gray-700">
                <p>Ja, du kannst auch während eines laufenden Events noch Plätze buchen. Der Preis bleibt gleich, aber die erreichbaren Belohnungen können je nach verbleibender Zeit variieren. Kontaktiere uns für eine individuelle Beratung.</p>
              </div>
            </details>
          </div>
        </div>
        
        {/* FAQ-Box mit Links */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <span className="material-icons text-[#00CFFF] text-2xl mr-3">help_outline</span>
            <h2 className="text-2xl font-bold text-[#0A3A68]">Hilfreiche Informationen</h2>
          </div>
          
          <p className="text-gray-700 mb-4">
            Hier findest du weitere Informationen zu unseren Angeboten:
          </p>
          
          <div className="space-y-3">
            <Link href="/hilfe/tycoon-racers" className="text-[#8A2BE2] hover:text-[#7B1FA2] font-medium block">
              <div className="flex items-center">
                <span className="material-icons mr-2">article</span>
                Alle Informationen zu Tycoon Racers findest du hier
              </div>
            </Link>
            <Link href="/hilfe/flaggen" className="text-[#8A2BE2] hover:text-[#7B1FA2] font-medium block">
              <div className="flex items-center">
                <span className="material-icons mr-2">article</span>
                Die Voraussetzungen für Flaggen-Rewards kannst du auch hier nachlesen
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}