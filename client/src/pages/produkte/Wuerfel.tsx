import { useEffect } from 'react';
import { Link } from 'wouter';
import { PRICES, SPECIAL_OFFER } from '@/lib/constants';

export default function Wuerfel() {
  useEffect(() => {
    document.title = 'Würfelboost | babixGO';
  }, []);

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
            
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {PRICES.map((price, index) => (
                  <div 
                    key={index} 
                    className={`border ${price.highlight ? 'border-[#FF4C00]' : 'border-gray-200'} 
                              rounded-lg p-4 flex flex-col items-center justify-between text-center
                              ${price.highlight ? 'bg-orange-50' : 'bg-white'}
                              hover:shadow-md transition-all`}
                  >
                    <div className="w-full">
                      <h4 className="babix-info-header text-[#0A3A68] text-lg mb-2">{price.dice.toLocaleString('de-DE')} Würfel</h4>
                      <div className="text-2xl font-bold text-[#FF4C00]">{price.price}€</div>
                    </div>
                    <Link href="/checkout/wuerfel" className="mt-3 bg-[#FF4C00] text-white py-2 px-4 w-full rounded-md hover:bg-[#0A3A68] transition-colors inline-flex items-center justify-center">
                      <span className="material-icons mr-1" style={{ fontSize: '18px' }}>shopping_cart</span>
                      Kaufen
                    </Link>
                  </div>
                ))}
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
              Sonderangebot
            </h3>
            <p className="mb-4">Holen Sie sich jetzt unser bestes Angebot für eine begrenzte Zeit!</p>
            <div className="flex items-center bg-white bg-opacity-10 p-3 rounded-lg mb-4">
              <span className="text-3xl font-bold text-[#FF4C00] mr-3">15%</span>
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