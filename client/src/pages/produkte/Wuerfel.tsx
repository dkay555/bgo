import { useEffect } from 'react';
import { Link } from 'wouter';
import { PRICES, SPECIAL_OFFER } from '@/lib/constants';

export default function Wuerfel() {
  useEffect(() => {
    document.title = 'Würfelboost | babixGO';
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <Link href="/produkte" className="self-start text-[#0A3A68] hover:text-[#FF4C00] mb-4 inline-flex items-center transition-colors">
          <span className="material-icons mr-1">arrow_back</span>
          Zurück zu Produkten
        </Link>
        <h1 className="babix-info-header text-3xl md:text-4xl font-bold mb-8 text-center">Würfelboost Service</h1>
      </div>
      
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2">
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
              <Link href="/preise">
                <button className="bg-[#FF4C00] text-white py-3 px-6 rounded-md hover:bg-[#0A3A68] transition-colors inline-flex items-center">
                  <span className="material-icons mr-2">shopping_cart</span>
                  Jetzt Würfel kaufen
                </button>
              </Link>
            </div>
            <div className="bg-gradient-to-r from-[#0A3A68] to-[#00CFFF] flex items-center justify-center p-10">
              <div className="text-center">
                <span className="material-icons text-white text-9xl">casino</span>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mt-6">
                  <h3 className="text-white font-bold text-xl mb-1">Spezialangebot</h3>
                  <p className="text-white/90">{SPECIAL_OFFER.dice} Würfel für nur {SPECIAL_OFFER.price}€</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="my-12">
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-6 text-center">So funktioniert es</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-[#00CFFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Paket auswählen</h3>
              <p className="text-gray-600">Wählen Sie aus unseren verschiedenen Würfel-Paketen das passende für Sie aus.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-[#00CFFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Daten bereitstellen</h3>
              <p className="text-gray-600">Teilen Sie uns Ihre Spieler-ID mit, damit wir die Würfel übertragen können.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-[#00CFFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Würfel erhalten</h3>
              <p className="text-gray-600">Nach Zahlungseingang erhalten Sie innerhalb von 24 Stunden Ihre Würfel im Spiel.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4">Häufig gestellte Fragen</h2>
          
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
                Benötigen Sie mein Passwort?
                <span className="material-icons transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="mt-2 text-gray-700">
                <p>Nein, wir benötigen niemals Ihr Passwort oder andere sensible Zugangsdaten. Für die Lieferung der Würfel reicht Ihre Spieler-ID oder Ihr Account-Name im Spiel aus.</p>
              </div>
            </details>
            
            <details className="group border-b border-gray-200 pb-4">
              <summary className="flex justify-between items-center font-bold cursor-pointer text-[#0A3A68] hover:text-[#FF4C00]">
                Ist der Würfelboost-Service sicher?
                <span className="material-icons transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="mt-2 text-gray-700">
                <p>Ja, wir legen größten Wert auf die Sicherheit Ihrer Daten und Ihres Spielkontos. Alle Transaktionen werden diskret und sicher durchgeführt.</p>
              </div>
            </details>
            
            <details className="group">
              <summary className="flex justify-between items-center font-bold cursor-pointer text-[#0A3A68] hover:text-[#FF4C00]">
                Kann ich eine spezielle Menge an Würfeln bestellen?
                <span className="material-icons transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="mt-2 text-gray-700">
                <p>Neben unseren Standardpaketen bieten wir auch individuell angepasste Mengen an. Kontaktieren Sie uns gerne für ein personalisiertes Angebot.</p>
              </div>
            </details>
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