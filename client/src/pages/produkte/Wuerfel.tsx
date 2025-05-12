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
            <h2 className="text-2xl font-bold text-[#0A3A68] mb-4">Würfel für deinen Monopoly Go Account!</h2>
            <p className="text-gray-700 mb-4">
              Weitere Informationen zu den Voraussetzungen, dem Ablauf usw. findest du hier: <Link href="/hilfe/wuerfel" className="text-[#00CFFF] hover:underline">"Würfelboost - Hilfe & Informationen"</Link>
            </p>
            <p className="text-gray-700 mb-4">
              Folgende Paketgrößen bieten wir an:
            </p>
            
            <div className="mt-4 mb-8">
              
              <div className="w-full mb-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
                    <thead className="bg-[#0A3A68] text-white">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Würfelmenge
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Preis
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Info
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className={selectedOption === "25000" ? 'bg-[#00CFFF]/10' : 'hover:bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">25.000 Würfel</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-[#FF4C00]">25€</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Inkl. Topevent + Bahnhofsevent
                        </td>
                      </tr>
                      <tr className={selectedOption === "35000" ? 'bg-[#00CFFF]/10' : 'hover:bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">35.000 Würfel</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-[#FF4C00]">35€</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Inkl. Topevent + Bahnhofsevent
                        </td>
                      </tr>
                      <tr className={selectedOption === "45000" ? 'bg-[#00CFFF]/10' : 'hover:bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">45.000 Würfel</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-[#FF4C00]">45€</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Inkl. Topevent + Bahnhofsevent
                        </td>
                      </tr>
                      <tr className="bg-yellow-50 border-t-2 border-yellow-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            <span className="material-icons text-yellow-500 mr-2">stars</span>
                            40.000-50.000 Würfel
                          </div>
                          <div className="text-xs text-gray-500 mt-1">Sonderangebot</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-[#FF4C00]">30€</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Gültig während Lucky Chance, Dice Roll oder Frei Parken x2
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center">
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
                          <svg className="w-6 h-6 mr-2" viewBox="0 0 50 50" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25,2c-12.7,0 -23,10.3 -23,23c0,4.1 1.1,7.89922 3,11.19922l-3,10.5c-0.1,0.3 -0.00078,0.7 0.19922,1c0.3,0.3 0.7,0.30078 1,0.30078l11,-2.69922c3.2,1.7 6.90078,2.69922 10.80078,2.69922c12.7,0 23,-10.3 23,-23c0,-12.7 -10.3,-23 -23,-23zM25,4c11.6,0 21,9.4 21,21c0,11.6 -9.4,21 -21,21c-3.7,0 -7.19922,-0.99922 -10.19922,-2.69922c-0.2,-0.1 -0.50117,-0.20156 -0.70117,-0.10156l-9.59961,2.40039l2.5,-9.19922c0.1,-0.3 0.00039,-0.50078 -0.09961,-0.80078c-1.8,-3.1 -2.90039,-6.69961 -2.90039,-10.59961c0,-11.6 9.4,-21 21,-21zM18.11328,12.98828c-0.1875,-0.0125 -0.3125,0.01172 -0.3125,0.01172h-1.20117c-0.6,0 -1.49883,0.2 -2.29883,1c-0.5,0.5 -2.30078,2.3 -2.30078,5.5c0,3.4 2.29961,6.29961 2.59961,6.59961c0,0 0.40039,0.50117 0.90039,1.20117c0.5,0.7 1.19961,1.5 2.09961,2.5c1.8,1.9 4.3,4.09844 7.5,5.39844c1.4,0.6 2.6,1.00078 3.5,1.30078c1.6,0.5 3.10117,0.40078 4.20117,0.30078c0.8,-0.1 1.69961,-0.50156 2.59961,-1.10156c0.9,-0.6 1.79922,-1.29883 2.19922,-2.29883c0.3,-0.8 0.4,-1.49961 0.5,-2.09961v-0.80078c0,-0.3 -0.09883,-0.29922 -0.29883,-0.69922c-0.5,-0.8 -1.00156,-0.8 -1.60156,-1c-0.3,-0.2 -1.2,-0.6 -2,-1c-0.9,-0.4 -1.59961,-0.8 -2.09961,-1c-0.3,-0.1 -0.69922,-0.30117 -1.19922,-0.20117c-0.5,0.1 -1.00078,0.40039 -1.30078,0.90039c-0.3,0.4 -1.39883,1.79922 -1.79883,2.19922l-0.10156,-0.09961c-0.4,-0.2 -0.99922,-0.39883 -1.69922,-0.79883c-0.8,-0.4 -1.70078,-1 -2.80078,-2c-1.6,-1.4 -2.7,-3.10117 -3,-3.70117c0.3,-0.4 0.70039,-0.79961 0.90039,-1.09961c0.1,-0.1 0.18125,-0.20078 0.25,-0.30078c0.06875,-0.1 0.12578,-0.19883 0.17578,-0.29883c0.1,-0.2 0.17539,-0.39961 0.27539,-0.59961c0.4,-0.7 0.2,-1.50039 0,-1.90039c0,0 -0.10078,-0.29961 -0.30078,-0.59961c-0.1,-0.3 -0.3,-0.80117 -0.5,-1.20117c-0.4,-0.9 -0.8,-1.9 -1,-2.5c-0.3,-0.7 -0.69922,-1.20039 -1.19922,-1.40039c-0.25,-0.15 -0.5,-0.19844 -0.6875,-0.21094zM16.59961,15h1.09961h0.20117c0,0 0.09922,0.10039 0.19922,0.40039c0.2,0.6 0.7,1.6 1,2.5c0.2,0.4 0.4,0.89922 0.5,1.19922c0.1,0.3 0.20078,0.50117 0.30078,0.70117c0,0.1 0.09961,0.09961 0.09961,0.09961c-0.2,0.4 -0.2,0.49883 -0.5,0.79883c-0.3,0.4 -0.70078,0.8 -0.80078,1c-0.1,0.2 -0.39961,0.40078 -0.59961,0.80078c-0.2,0.4 -0.09883,1.09961 0.20117,1.59961c0.4,0.6 1.6,2.60078 3.5,4.30078c1.2,1.1 2.29922,1.79922 3.19922,2.19922c0.9,0.5 1.60078,0.70078 1.80078,0.80078c0.4,0.2 0.79883,0.29883 1.29883,0.29883c0.5,0 0.90117,-0.39922 1.20117,-0.69922c0.4,-0.4 1.39844,-1.60039 1.89844,-2.40039l0.20117,0.09961c0,0 0.29922,0.10078 0.69922,0.30078c0.4,0.2 0.80078,0.39961 1.30078,0.59961c0.9,0.4 1.7,0.8 2,1l0.59961,0.30078v0.29883c0,0.4 -0.10078,1.00156 -0.30078,1.60156c-0.1,0.3 -0.69883,0.89883 -1.29883,1.29883c-0.7,0.4 -1.50078,0.70078 -1.80078,0.80078c-0.9,0.1 -1.99883,0.19883 -3.29883,-0.20117c-0.8,-0.3 -1.90078,-0.59922 -3.30078,-1.19922c-2.8,-1.2 -5.10078,-3.2 -6.80078,-5c-0.8,-0.9 -1.5,-1.70078 -2,-2.30078c-0.5,-0.6 -0.69844,-0.99922 -0.89844,-1.19922c-0.4,-0.4 -2.30078,-3.00039 -2.30078,-5.40039c0,-2.5 1.20078,-3.49922 1.80078,-4.19922c0.3,-0.4 0.69883,-0.40039 0.79883,-0.40039z"></path>
                          </svg>
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