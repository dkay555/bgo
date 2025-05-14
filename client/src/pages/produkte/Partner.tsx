import { useEffect, useState } from 'react';
import { Link } from 'wouter';

export default function Partner() {
  useEffect(() => {
    document.title = 'Partnerevent-Plätze | babixGO';
  }, []);

  // Preistabelle für Partner
  const partnerPrices = [
    { count: 1, price: 7 },
    { count: 2, price: 14 },
    { count: 3, price: 21 },
    { count: 4, price: 25 }, // Sonderpreis
  ];
  
  // Währungsoptionen
  const waehrungOptions = [
    { amount: '15.000 Währung', price: 25 },
    { amount: '25.000 Währung', price: 35 },
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
        {/* Partnerevent Hauptbox */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8" style={{background: '#f0f9ff'}}>
          <div className="bg-white/95 p-8">
            {/* Zuverlässiger Partner Box */}
            <div className="mb-12">
              <h2 className="babixgoheader text-center text-3xl md:text-4xl font-bold mb-4 text-[#FF4C00]">
                Zuverlässiger Partner<br />für deinen Account
              </h2>
              
              <p className="text-center text-gray-800 mb-8 max-w-2xl mx-auto">
                Lehne dich zurück und lass uns die Arbeit machen! Wir übernehmen die vollen 80.000 Punkte.
              </p>
              
              <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg p-4 mb-6">
                <table className="w-full">
                  <tbody>
                    {partnerPrices.map((item, index) => (
                      <tr key={index} className={index < partnerPrices.length - 1 ? "border-b border-gray-100" : ""}>
                        <td className="py-2">
                          <div className="flex items-center">
                            <span className="material-icons mr-2 text-[#0A3A68]">group</span>
                            <span className="font-medium">{item.count} {item.count === 1 ? 'Partner' : 'Partner'}</span>
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
                <Link href="/checkout/partnerevent">
                  <button
                    className="bg-[#FF4C00] hover:bg-[#E03A00] text-white py-3 px-12 rounded-full transition-colors font-bold text-lg"
                  >
                    Partner buchen
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="border-t border-gray-200 my-10 max-w-2xl mx-auto"></div>
            
            {/* Eventwährung Box */}
            <div className="mb-8">
              <h2 className="babixgoheader text-center text-3xl md:text-4xl font-bold mb-4 text-[#FF4C00]">
                Eventwährung<br />leicht gemacht
              </h2>
              
              <p className="text-center text-gray-800 mb-8 max-w-2xl mx-auto">
                Falls du lieber mit deinen liebsten spielen magst, aber trotzdem nicht um den Hauptpreis bangen willst: Wir sammeln Eventwährung vom Spielbrett.
              </p>
              
              <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg p-4 mb-6">
                <table className="w-full">
                  <tbody>
                    {waehrungOptions.map((item, index) => (
                      <tr key={index} className={index < waehrungOptions.length - 1 ? "border-b border-gray-100" : ""}>
                        <td className="py-2">
                          <div className="flex items-center">
                            <span className="material-icons mr-2 text-[#FF4C00]">currency_exchange</span>
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
                <Link href="/checkout/eventwaehrung">
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
            <Link href="/hilfe/partnerevent" className="text-[#8A2BE2] hover:text-[#7B1FA2] font-medium block">
              <div className="flex items-center">
                <span className="material-icons mr-2">article</span>
                Alle Informationen zum Partnerevent findest du hier
              </div>
            </Link>
            <Link href="/hilfe/wuerfelboost" className="text-[#8A2BE2] hover:text-[#7B1FA2] font-medium block">
              <div className="flex items-center">
                <span className="material-icons mr-2">article</span>
                Die Voraussetzungen für die Eventwährung kannst du auch hier nachlesen
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