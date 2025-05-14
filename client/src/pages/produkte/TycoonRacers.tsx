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
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8" style={{background: '#f0f9ff'}}>
          <div className="bg-white/95 p-8">
            {/* Teamplätze Box */}
            <div className="mb-12">
              <h2 className="babixgoheader text-center text-3xl md:text-4xl font-bold mb-4 text-[#FF4C00]">
                Teamplätze für <br />deinen Account
              </h2>
              
              <p className="text-center text-gray-800 mb-8 max-w-2xl mx-auto">
                Schließe dich unserem Racing-Team an und sichere dir alle 54 Rundenbelohnungen - ganz ohne Aufwand!
              </p>
              
              <div className="max-w-md mx-auto space-y-4 mb-6">
                {tycoonPrices.team.map((item, index) => (
                  <div 
                    key={index} 
                    className={`border rounded-lg p-3 cursor-pointer bg-white hover:border-[#FF4C00] transition-all ${teamPrice === item.price ? 'border-[#FF4C00] shadow-md' : 'border-gray-200'}`}
                    onClick={() => handleTeamPriceChange(item.price)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="material-icons mr-2 text-[#0A3A68]">flag</span>
                        <span className="font-medium">{item.slots} Platz{item.slots > 1 ? 'e' : ''}</span>
                      </div>
                      <span className="font-bold text-[#0A3A68]">{item.price} €</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center">
                <Link href={`/checkout/tycoonracers?price=${teamPrice}`}>
                  <button
                    className="bg-[#FF4C00] hover:bg-[#E03A00] text-white py-3 px-12 rounded-full transition-colors font-bold text-lg"
                  >
                    Teamplatz sichern
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="border-t border-gray-200 my-10 max-w-2xl mx-auto"></div>
            
            {/* Flaggen Box */}
            <div className="mb-8">
              <h2 className="babixgoheader text-center text-3xl md:text-4xl font-bold mb-4 text-[#FF4C00]">
                Flaggen sammeln<br />leicht gemacht
              </h2>
              
              <p className="text-center text-gray-800 mb-8 max-w-2xl mx-auto">
                Fahre dein Team zum Sieg. Wir helfen beim Flaggen sammeln!
              </p>
              
              <div className="max-w-md mx-auto space-y-4 mb-6">
                {tycoonPrices.flags.map((item, index) => (
                  <div 
                    key={index} 
                    className={`border rounded-lg p-3 cursor-pointer bg-white hover:border-[#FF4C00] transition-all ${flaggenPrice === item.price ? 'border-[#FF4C00] shadow-md' : 'border-gray-200'}`}
                    onClick={() => handleFlaggenPriceChange(item.price)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="material-icons mr-2 text-[#FF4C00]">flag</span>
                        <span className="font-medium">{item.amount}</span>
                      </div>
                      <span className="font-bold text-[#0A3A68]">{item.price} €</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center">
                <Link href={`/checkout/flaggen?price=${flaggenPrice}`}>
                  <button
                    className="bg-[#0A3A68] hover:bg-[#072a4e] text-white py-3 px-12 rounded-full transition-colors font-bold text-lg"
                  >
                    Jetzt kaufen
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-bold text-lg text-[#0A3A68] mb-4">Häufig gestellte Fragen</h3>
            
            <div className="space-y-4">
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
          
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-bold text-lg text-[#0A3A68] mb-4">Noch Fragen?</h3>
            
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
                  Die Voraussetzungen für Flaggen-Rewards kannst du hier nachlesen
                </div>
              </Link>
              
              <div className="mt-6">
                <Link href="/kontakt" className="inline-block">
                  <button className="bg-[#FF4C00] hover:bg-[#E03A00] text-white py-2 px-4 rounded-md transition-colors inline-flex items-center font-bold">
                    <span className="material-icons mr-2">contact_support</span>
                    Kontakt aufnehmen
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}