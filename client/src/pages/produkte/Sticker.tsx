import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Sticker, stickersWithSets, getAvailableSets, getStickersBySet, calculatePrice } from '@/lib/stickerData';
import { CONTACT } from '@/lib/constants';
import SEOHead from '@/components/SEOHead';

export default function StickerPage() {
  // SEO-Meta-Tags werden über die SEOHead-Komponente gesteuert

  const [selectedSetNumber, setSelectedSetNumber] = useState<number | null>(null);
  const [selectedStickerId, setSelectedStickerId] = useState<number | null>(null);
  const [stickerDetails, setStickerDetails] = useState<Sticker | null>(null);
  const [cart, setCart] = useState<Sticker[]>([]);
  const [availableSets, setAvailableSets] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Lade verfügbare Sets
  useEffect(() => {
    const sets = getAvailableSets();
    setAvailableSets(sets);
    
    // Setze das erste Set als Standard
    if (sets.length > 0 && !selectedSetNumber) {
      setSelectedSetNumber(sets[0]);
    }
  }, []);

  // Lädt Sticker wenn sich das Set ändert
  useEffect(() => {
    if (selectedSetNumber) {
      const stickers = getStickersBySet(selectedSetNumber);
      
      // Setze den ersten Sticker im Set als Standard
      if (stickers.length > 0) {
        setSelectedStickerId(stickers[0].id);
        setStickerDetails(stickers[0]);
      }
    }
  }, [selectedSetNumber]);

  // Lädt Sticker-Details wenn sich der ausgewählte Sticker ändert
  useEffect(() => {
    if (selectedStickerId) {
      const sticker = stickersWithSets.find(s => s.id === selectedStickerId);
      if (sticker) {
        setStickerDetails(sticker);
      }
    }
  }, [selectedStickerId]);

  // Fügt den ausgewählten Sticker zum Warenkorb hinzu
  const addToCart = () => {
    if (stickerDetails) {
      // Wenn der Sticker golden ist, fügen wir ihn nicht direkt zum Warenkorb hinzu
      if (stickerDetails.isGold) {
        alert('Goldsticker können nur während eines Goldtausch-Events bestellt werden. Bitte kontaktieren Sie uns über WhatsApp für weitere Informationen.');
        return;
      }
      
      setCart([...cart, stickerDetails]);
    }
  };

  // Entfernt einen Sticker aus dem Warenkorb
  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // Berechnet den Gesamtpreis des Warenkorbs
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + calculatePrice(item), 0).toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-8" id="top">
      <div className="flex flex-col items-center mb-8">
        <Link href="/produkte" className="self-start text-[#0A3A68] hover:text-[#FF4C00] mb-4 inline-flex items-center transition-colors">
          <span className="material-icons mr-1">arrow_back</span>
          Zurück zu Produkten
        </Link>
        <div className="w-full relative rounded-xl overflow-hidden">
          <div className="h-48 md:h-64 bg-gradient-to-r from-[#00CFFF] to-[#0A3A68] flex items-center justify-center">
            <div className="text-center">
              <h1 className="babix-info-header text-3xl md:text-5xl font-bold text-white px-4 drop-shadow-lg">
                Sticker kaufen
              </h1>
              <p className="text-white text-lg mt-2 max-w-2xl px-4">Vervollständige dein Album mit unserer riesigen Auswahl</p>
              <button 
                onClick={() => setShowModal(true)}
                className="mt-4 bg-white hover:bg-gray-100 text-[#0A3A68] font-bold py-2 px-6 rounded-full shadow-lg transition-colors"
              >
                Sticker bestellen
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-6 flex flex-col justify-center">
            <h2 className="babixgoheader text-2xl font-bold text-[#0A3A68] mb-4">Wir haben sie alle!</h2>
            <p className="text-gray-700 mb-4">
              Sticker werden i.d.R. innerhalb von 60 Minuten verschickt. Aufgrund des Sendelimits kann es allerdings bis zum Reset der Trades dauern.
              Solltest du den Sticker also dringend benötigen schicke uns vorher eine Nachricht.
            </p>
            <p className="text-gray-700 mb-4">
              Goldsticker können nur während "Goldener Blitz" verschickt werden.
            </p>
            
            <div className="mt-4 mb-8">
              <div className="w-full mb-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
                    <thead className="bg-[#0A3A68] text-white">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Sterne
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Preis
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Hinweis
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">1-3 Sterne</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-[#FF4C00]">2,00 €</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Standard
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">4 Sterne</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-[#FF4C00]">2,50 €</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Standard
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">5 Sterne</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-[#FF4C00]">3,00 €</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Standard
                        </td>
                      </tr>
                      <tr className="bg-yellow-50 border-t-2 border-yellow-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            <span className="material-icons text-yellow-500 mr-2">stars</span>
                            4 Sterne Gold
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-[#FF4C00]">4,00 €</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Nur während "Goldener Blitz"
                        </td>
                      </tr>
                      <tr className="bg-yellow-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            <span className="material-icons text-yellow-500 mr-2">stars</span>
                            5 Sterne Gold
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-[#FF4C00]">5,00 €</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Nur während "Goldener Blitz"
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sticker-Auswahl */}
            <div>
              <h2 className="text-xl font-bold text-[#0A3A68] mb-4">Sticker auswählen</h2>
              
              {/* Set-Auswahl */}
              <div className="mb-4">
                <h3 className="block text-sm font-medium text-gray-700 mb-2">Set auswählen</h3>
                
                {/* Mobile und Desktop: Buttons für Set-Auswahl */}
                <div className="flex flex-wrap gap-2">
                  {availableSets.map(setNumber => (
                    <button
                      key={setNumber}
                      className={`px-3 py-2 rounded text-center transition-colors ${
                        selectedSetNumber === setNumber 
                          ? 'bg-[#0A3A68] text-white' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                      onClick={() => setSelectedSetNumber(setNumber)}
                    >
                      Set {setNumber}
                    </button>
                  ))}
                </div>
              </div>
              
              {selectedSetNumber && (
                <div className="mb-4">
                  <h3 className="block text-sm font-medium text-gray-700 mb-2">Sticker auswählen</h3>
                  
                  {/* Mobile und Desktop: Liste von Stickern mit Scroll */}
                  <div className="max-h-[300px] overflow-y-auto border border-gray-200 rounded-md">
                    {getStickersBySet(selectedSetNumber).map(sticker => (
                      <button
                        key={sticker.id}
                        className={`w-full p-2 border-b border-gray-200 text-left transition-colors flex items-center ${
                          selectedStickerId === sticker.id
                            ? 'bg-[#0A3A68] text-white' 
                            : sticker.isGold 
                              ? 'bg-yellow-50 hover:bg-yellow-100 text-gray-800'
                              : 'bg-white hover:bg-gray-50 text-gray-800'
                        }`}
                        onClick={() => setSelectedStickerId(sticker.id)}
                      >
                        <div className="mr-2">
                          {sticker.isGold && (
                            <span className="material-icons text-yellow-500 text-lg">workspace_premium</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{sticker.name}</div>
                          <div className="flex items-center">
                            {[...Array(sticker.stars)].map((_, i) => (
                              <span key={i} className="material-icons text-yellow-500 text-sm">star</span>
                            ))}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Sticker-Details */}
              {stickerDetails && (
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <h3 className="font-bold text-lg mb-2">Sticker-Details</h3>
                  <div className="flex items-center mb-2">
                    <span className="text-gray-700 mr-2">Sterne:</span>
                    <div className="flex">
                      {[...Array(stickerDetails.stars)].map((_, i) => (
                        <span key={i} className="material-icons text-yellow-500">star</span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="text-gray-700 mr-2">Typ:</span>
                    <span className={`font-bold ${stickerDetails.isGold ? 'text-[#FF4C00]' : 'text-[#0A3A68]'}`}>
                      {stickerDetails.isGold ? 'Goldsticker' : 'Standard'}
                    </span>
                  </div>
                  <div className="mb-4">
                    <span className="text-gray-700 mr-2">Preis:</span>
                    <span className="font-bold text-[#0A3A68]">{calculatePrice(stickerDetails).toFixed(2).replace('.', ',')} €</span>
                  </div>
                  
                  {/* Hinweis bei Goldstickern */}
                  {stickerDetails.isGold && (
                    <div className="bg-[#FFEBEB] border-l-4 border-[#FF4C00] p-3 text-sm mb-4">
                      <p className="font-bold text-[#FF4C00]">Hinweis zu Goldstickern:</p>
                      <p>Goldsticker können nur während eines Goldtausch-Events bestellt werden. Bitte kontaktieren Sie uns über WhatsApp für weitere Informationen.</p>
                    </div>
                  )}
                  
                  <button
                    onClick={addToCart}
                    className={`w-full ${
                      stickerDetails.isGold 
                        ? 'bg-gray-400 hover:bg-gray-500' 
                        : 'bg-[#0A3A68] hover:bg-[#FF4C00]'
                    } text-white py-2 px-4 rounded-md transition-colors`}
                    disabled={stickerDetails.isGold}
                  >
                    <span className="material-icons mr-1 text-sm">add_shopping_cart</span>
                    {stickerDetails.isGold ? 'Nur während Goldtausch' : 'Zum Warenkorb hinzufügen'}
                  </button>
                </div>
              )}
            </div>
            
            {/* Hilfsbutton entfernt */}
          </div>
        </div>
        
        {/* Warenkorb Zusammenfassung im selben Design wie Würfelseite */}
        <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#0A3A68] mb-4">Deine Sticker-Auswahl</h2>
            <div className="mb-6">
              {cart.length === 0 ? (
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-gray-500">Du hast noch keine Sticker ausgewählt.</p>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {cart.map((item, index) => (
                      <li key={index} className="py-3 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{item.name} (Set {Math.ceil(item.id / 9)})</p>
                          <div className="flex items-center">
                            <div className="flex mr-2">
                              {[...Array(item.stars)].map((_, i) => (
                                <span key={i} className="material-icons text-yellow-500 text-sm">star</span>
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {item.isGold ? '(Gold)' : ''}
                            </span>
                          </div>
                        </div>
                        <span className="font-bold">{calculatePrice(item).toFixed(2).replace('.', ',')} €</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold">
                    <span>Gesamt:</span>
                    <span className="text-[#FF4C00]">{calculateTotal().replace('.', ',')} €</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Kauf-Button */}
            {cart.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Link 
                  to={`/checkout/sticker?stickers=${encodeURIComponent(JSON.stringify(cart.map(s => s.id)))}`}
                  className="bg-[#FF4C00] text-white py-3 px-6 rounded-md hover:bg-[#0A3A68] transition-colors inline-flex items-center"
                >
                  <span className="material-icons mr-2">shopping_cart</span>
                  Sticker bestellen
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Kontaktbox wie in Würfelseite */}
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
      
      {/* Modal für Kaufoptionen */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#0A3A68]">Wie möchten Sie bestellen?</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="material-icons">close</span>
              </button>
            </div>
            
            <p className="mb-6">
              Wählen Sie Ihre bevorzugte Bestellmethode:
            </p>
            
            <div className="space-y-3">
              {/* Link zum Checkout-Formular */}
              <Link
                href={`/checkout/sticker?set=${selectedSetNumber}`}
                className="block w-full bg-[#FF4C00] hover:bg-[#0A3A68] text-white py-3 px-4 rounded-md transition-colors text-center flex items-center justify-center"
              >
                <span className="material-icons mr-2">shopping_cart</span>
                Weiter zum Kaufen
              </Link>
              
              {/* Formatierte WhatsApp-Nachricht mit Stickerliste erstellen */}
              {(() => {
                const itemsList = cart.map(item => `${item.name} (${item.stars}★) - ${calculatePrice(item).toFixed(2).replace('.', ',')}€`).join(", ");
                const whatsappMessage = encodeURIComponent(`Hallo, ich möchte folgende Sticker kaufen: ${itemsList}. Gesamtpreis: ${calculateTotal().replace('.', ',')}€`);
                
                return (
                  <a
                    href={`${CONTACT.whatsapp}&text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#25D366] hover:bg-opacity-90 text-white py-3 px-4 rounded-md transition-colors text-center"
                  >
                    <span className="flex items-center justify-center">
                      <span className="material-icons mr-2">whatsapp</span>
                      Über WhatsApp bestellen
                    </span>
                  </a>
                );
              })()}
              
              <a 
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#1877F2] hover:bg-opacity-90 text-white py-3 px-4 rounded-md transition-colors text-center"
              >
                <span className="flex items-center justify-center">
                  <span className="material-icons mr-2">facebook</span>
                  Über Facebook bestellen
                </span>
              </a>
              
              <a 
                href="/kontakt"
                className="block w-full bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-3 px-4 rounded-md transition-colors text-center"
              >
                <span className="flex items-center justify-center">
                  <span className="material-icons mr-2">email</span>
                  Über Formular bestellen
                </span>
              </a>
              
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-md transition-colors text-center"
              >
                <span className="flex items-center justify-center">
                  <span className="material-icons mr-2">close</span>
                  Abbrechen
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}