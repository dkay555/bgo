import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { PRICES, SPECIAL_OFFER } from '@/lib/constants';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

export default function Wuerfel() {
  const [selectedOption, setSelectedOption] = useState("25000");
  const [price, setPrice] = useState(25);
  
  useEffect(() => {
    document.title = 'Würfelboost | babixGO';
  }, []);
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedOption(value);
    
    // Setze den entsprechenden Preis basierend auf der Auswahl
    switch(value) {
      case "25000":
        setPrice(25);
        break;
      case "35000":
        setPrice(35);
        break;
      case "45000":
        setPrice(45);
        break;
      default:
        setPrice(25);
    }
  };

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
              
              <div className="w-full md:w-2/3 mb-6">
                <div className="space-y-3">
                  <div className={`flex items-center p-3 rounded-lg ${selectedOption === "25000" ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border border-gray-200'}`}>
                    <input 
                      type="radio" 
                      id="dice-25000" 
                      name="dice-amount" 
                      value="25000" 
                      checked={selectedOption === "25000"} 
                      onChange={handleSelectChange}
                      className="w-5 h-5 text-[#00CFFF] border-gray-300 focus:ring-[#00CFFF]" 
                    />
                    <label htmlFor="dice-25000" className="ml-3 block font-medium text-gray-700 w-full cursor-pointer">
                      25.000 Würfel - 25€
                    </label>
                  </div>
                  
                  <div className={`flex items-center p-3 rounded-lg ${selectedOption === "35000" ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border border-gray-200'}`}>
                    <input 
                      type="radio" 
                      id="dice-35000" 
                      name="dice-amount" 
                      value="35000" 
                      checked={selectedOption === "35000"} 
                      onChange={handleSelectChange}
                      className="w-5 h-5 text-[#00CFFF] border-gray-300 focus:ring-[#00CFFF]" 
                    />
                    <label htmlFor="dice-35000" className="ml-3 block font-medium text-gray-700 w-full cursor-pointer">
                      35.000 Würfel - 35€
                    </label>
                  </div>
                  
                  <div className={`flex items-center p-3 rounded-lg ${selectedOption === "45000" ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border border-gray-200'}`}>
                    <input 
                      type="radio" 
                      id="dice-45000" 
                      name="dice-amount" 
                      value="45000" 
                      checked={selectedOption === "45000"} 
                      onChange={handleSelectChange}
                      className="w-5 h-5 text-[#00CFFF] border-gray-300 focus:ring-[#00CFFF]" 
                    />
                    <label htmlFor="dice-45000" className="ml-3 block font-medium text-gray-700 w-full cursor-pointer">
                      45.000 Würfel - 45€
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="text-xl font-bold text-[#0A3A68] mb-2 sm:mb-0 bg-[#00CFFF]/10 px-4 py-2 rounded-md border border-[#00CFFF]">
                  Preis: <span className="text-[#FF4C00]">{price}€</span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="bg-[#FF4C00] text-white py-3 px-6 rounded-md hover:bg-[#0A3A68] transition-colors inline-flex items-center">
                      <span className="material-icons mr-2">shopping_cart</span>
                      Würfel kaufen
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-[#0A3A68]">Bestelloptionen</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <p className="mb-4">
                        Du hast 2 Möglichkeiten deine Würfel zu bestellen:
                      </p>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <span className="material-icons text-[#0A3A68] mr-2">looks_one</span>
                          <div>
                            <strong>Option 1:</strong> Du schreibst uns persönlich und wir gehen den Login gemeinsam durch oder helfen dir an deinen Authtoken zu gelangen. <em className="text-[#FF4C00]">(Empfohlen)</em>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="material-icons text-[#0A3A68] mr-2">looks_two</span>
                          <div>
                            <strong>Option 2:</strong> Ein Klick auf "Weiter ..." führt dich zum Warenkorb. Daten ausfüllen, abschicken, zahlen .. Fertig.
                          </div>
                        </li>
                      </ul>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                        <a href="https://wa.me/4915237250453" className="bg-[#25D366] text-white py-2 px-4 rounded-md hover:bg-opacity-80 transition-colors text-center flex items-center justify-center">
                          <span className="material-icons mr-2">whatsapp</span>
                          WhatsApp öffnen
                        </a>
                        <a href="https://m.me/babixgo" className="bg-[#0078FF] text-white py-2 px-4 rounded-md hover:bg-opacity-80 transition-colors text-center flex items-center justify-center">
                          <span className="material-icons mr-2">message</span>
                          Zum Messenger
                        </a>
                        <Link href={`/checkout/wuerfel?package=${selectedOption}`} className="bg-[#FF4C00] text-white py-2 px-4 rounded-md hover:bg-opacity-80 transition-colors text-center flex items-center justify-center">
                          <span className="material-icons mr-2">shopping_cart</span>
                          Weiter zum Warenkorb
                        </Link>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
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