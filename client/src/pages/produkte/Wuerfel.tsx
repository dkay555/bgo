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
        <Link href="/produkte" className="self-start text-[#0A3A68] hover:text-[#FF4C00] mb-4 inline-flex items-center transition-colors">
          <span className="material-icons mr-1">arrow_back</span>
          Zurück zu Produkten
        </Link>
        <h1 className="babix-info-header text-3xl md:text-4xl font-bold mb-8 text-center">Würfelboost Service</h1>
      </div>
      
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-6 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-[#0A3A68] mb-4">Mehr Würfel für Ihr Spiel</h2>
            <p className="text-gray-700 mb-4">
              Mit unserem Würfelboost-Service erhöhen wir die Anzahl der Würfel in Ihrem Monopoly GO-Konto, 
              damit Sie mehr Möglichkeiten im Spiel haben und schneller vorankommen.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="material-icons text-[#00CFFF] mr-2 mt-0.5">check_circle</span>
                <span>Schnelle Lieferung innerhalb von 24 Stunden</span>
              </li>
              <li className="flex items-start">
                <span className="material-icons text-[#00CFFF] mr-2 mt-0.5">check_circle</span>
                <span>Sicher und diskret</span>
              </li>
              <li className="flex items-start">
                <span className="material-icons text-[#00CFFF] mr-2 mt-0.5">check_circle</span>
                <span>Kein Zugriff auf Ihr Passwort erforderlich</span>
              </li>
              <li className="flex items-start">
                <span className="material-icons text-[#00CFFF] mr-2 mt-0.5">check_circle</span>
                <span>Verschiedene Pakete verfügbar</span>
              </li>
            </ul>
            
            <div className="mt-4 mb-8">
              <h3 className="babix-info-header text-[#0A3A68] mb-4">Wählen Sie Ihre Würfelmenge</h3>
              
              <div className="relative w-full md:w-2/3 mb-6">
                <select 
                  className="w-full p-3 pe-10 bg-gray-100 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#00CFFF]"
                  defaultValue="25000"
                >
                  <option value="25000">25.000 Würfel - 25€</option>
                  <option value="35000">35.000 Würfel - 35€</option>
                  <option value="45000">45.000 Würfel - 45€</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <span className="material-icons text-gray-600">expand_more</span>
                </span>
              </div>
              
              <button className="bg-[#FF4C00] text-white py-3 px-6 rounded-md hover:bg-[#0A3A68] transition-colors inline-flex items-center">
                <span className="material-icons mr-2">shopping_cart</span>
                Würfel kaufen
              </button>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 mt-6">
              <h4 className="babix-info-header text-[#0A3A68] mb-2 flex items-center">
                <span className="material-icons text-yellow-500 mr-2">stars</span>
                Sonderangebot
              </h4>
              <p className="text-sm mb-2">Gültig während Lucky Chance, Dice Roll oder Frei Parken x2:</p>
              <p className="text-sm mb-2">40.000 - 50.000 Würfel für <span className="text-xl font-bold text-[#FF4C00]">30€</span></p>
              <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-2 px-4 rounded-md transition-colors inline-flex items-center mt-2">
                <span className="material-icons mr-1">event</span>
                Jetzt reservieren
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-6">Häufig gestellte Fragen</h2>
          
          <div className="space-y-4">
            <details className="group border-b border-gray-200 pb-4">
              <summary className="flex justify-between items-center font-bold cursor-pointer text-[#0A3A68] hover:text-[#FF4C00]">
                Wie lange dauert die Lieferung der Würfel?
                <span className="material-icons transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="mt-2 text-gray-700">
                <p>Nach Zahlungseingang beginnen wir umgehend mit der Bearbeitung Ihrer Bestellung. In der Regel ist die Lieferung innerhalb von 24 Stunden abgeschlossen. Bei hohem Aufkommen kann es in Ausnahmefällen bis zu 48 Stunden dauern.</p>
              </div>
            </details>
            
            <details className="group border-b border-gray-200 pb-4">
              <summary className="flex justify-between items-center font-bold cursor-pointer text-[#0A3A68] hover:text-[#FF4C00]">
                Werden das Top- und Bahnhofsevent mit abgeschlossen?
                <span className="material-icons transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="mt-2 text-gray-700">
                <p>Ab dem Paket mit 25.000 Würfeln sind die Eventabschlüsse (Topevent + 1 Tages Bahnhofsturnier) mit inbegriffen.</p>
              </div>
            </details>
            
            <details className="group border-b border-gray-200 pb-4">
              <summary className="flex justify-between items-center font-bold cursor-pointer text-[#0A3A68] hover:text-[#FF4C00]">
                Benötigen Sie mein Passwort?
                <span className="material-icons transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="mt-2 text-gray-700">
                <p>Nein, wir benötigen niemals Ihr Passwort. Informationen zu Anmeldemethoden finden Sie in unserer Hilfesektion.</p>
              </div>
            </details>
            
            <details className="group">
              <summary className="flex justify-between items-center font-bold cursor-pointer text-[#0A3A68] hover:text-[#FF4C00]">
                Kann ich dafür gesperrt werden?
                <span className="material-icons transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="mt-2 text-gray-700">
                <p>Ja! Die Gefahr besteht. Wir räumen durch diverse Maßnahmen einige Gefahren aus dem Weg. Komplett ausschließen können wir sie aber nicht. Bisher ist uns in fast 24 Monaten allerdings nur 1 Fall bekannt in dem ein Account gesperrt wurde in dem wir aktiv waren.</p>
              </div>
            </details>
          </div>
        </div>
        
        <div className="bg-[#E6F7FF] border-l-4 border-[#00CFFF] p-4 rounded-r-md mb-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h4 className="babix-info-header text-[#0A3A68] mb-2">Hilfe zum Würfelboost</h4>
              <p className="text-gray-700">Erfahre mehr über den Ablauf, die Sicherheit und weitere häufig gestellte Fragen.</p>
            </div>
            <Link href="/hilfe/wuerfel#top">
              <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-2 px-4 rounded-md transition-colors inline-flex items-center">
                <span className="material-icons mr-1">help</span>
                Zur Hilfe
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="mb-6 text-lg">Haben Sie weitere Fragen? Wir sind für Sie da!</p>
        <Link href="/kontakt">
          <button className="bg-[#0A3A68] text-white py-3 px-8 rounded-md hover:bg-[#FF4C00] transition-colors inline-flex items-center">
            <span className="material-icons mr-2">contact_support</span>
            Kontakt aufnehmen
          </button>
        </Link>
      </div>
    </div>
  );
}