import { useEffect, useState } from 'react';
import { Link } from 'wouter';

export default function TycoonRacers() {
  useEffect(() => {
    document.title = 'Tycoon Racers | babixGO';
  }, []);
  
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

  return (
    <div className="container mx-auto px-4 py-8" id="top">
      <div className="flex flex-col items-center mb-8">
        <Link href="/produkte" className="self-start text-[#0A3A68] hover:text-[#FF4C00] mb-4 inline-flex items-center transition-colors">
          <span className="material-icons mr-1">arrow_back</span>
          Zurück zu Produkten
        </Link>
        <div className="w-full relative rounded-xl overflow-hidden">
          <div className="h-48 md:h-64 bg-gradient-to-r from-[#0A3A68] to-[#FF4C00] flex items-center justify-center">
            <div className="text-center">
              <h1 className="babix-info-header text-3xl md:text-5xl font-bold text-white px-4 drop-shadow-lg">
                Tycoon Racers
              </h1>
              <p className="text-white text-lg mt-2 max-w-2xl px-4">Sammle Flaggen und sichere dir alle Rundenbelohnungen</p>
            </div>
          </div>
        </div>
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
              
              <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg p-4 mb-6">
                <table className="w-full">
                  <tbody>
                    {tycoonPrices.team.map((item, index) => (
                      <tr key={index} className={index < tycoonPrices.team.length - 1 ? "border-b border-gray-100" : ""}>
                        <td className="py-2">
                          <div className="flex items-center">
                            <span className="material-icons mr-2 text-[#0A3A68]">flag</span>
                            <span className="font-medium">{item.slots} Platz{item.slots > 1 ? 'e' : ''}</span>
                          </div>
                        </td>
                        <td className="py-2 text-right">
                          <span className="font-bold text-[#0A3A68]">{item.price} €</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-center">
                <Link href="/checkout/tycoonracers">
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
              
              <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg p-4 mb-6">
                <table className="w-full">
                  <tbody>
                    {tycoonPrices.flags.map((item, index) => (
                      <tr key={index} className={index < tycoonPrices.flags.length - 1 ? "border-b border-gray-100" : ""}>
                        <td className="py-2">
                          <div className="flex items-center">
                            <span className="material-icons mr-2 text-[#FF4C00]">flag</span>
                            <span className="font-medium">{item.amount}</span>
                          </div>
                        </td>
                        <td className="py-2 text-right">
                          <span className="font-bold text-[#0A3A68]">{item.price} €</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-center">
                <Link href="/checkout/flaggen">
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
        
        {/* Noch Fragen */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h3 className="font-bold text-lg text-[#0A3A68] mb-4">Noch Fragen?</h3>
          
          <p className="text-gray-700 mb-4">
            Hier findest du weitere Informationen zu diesem Angebot:
          </p>
          
          <div className="space-y-3">
            <Link href="/hilfe/tycoon-racers" className="text-[#8A2BE2] hover:text-[#7B1FA2] font-medium block">
              <div className="flex items-center">
                <span className="material-icons mr-2">article</span>
                Alle Informationen zu Tycoon Racers findest du hier
              </div>
            </Link>
            <Link href="/hilfe/race" className="text-[#8A2BE2] hover:text-[#7B1FA2] font-medium block">
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
  );
}