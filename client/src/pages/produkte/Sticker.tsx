import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Sticker, stickersWithSets, getAvailableSets, getStickersBySet, calculatePrice } from '@/lib/stickerData';
import { CONTACT } from '@/lib/constants';

export default function StickerPage() {
  useEffect(() => {
    document.title = 'Stickerkauf | babixGO';
  }, []);

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

  // Handler für Set-Auswahl
  const handleSetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const setNumber = parseInt(e.target.value, 10);
    setSelectedSetNumber(setNumber);
  };

  // Handler für Sticker-Auswahl
  const handleStickerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stickerId = parseInt(e.target.value, 10);
    setSelectedStickerId(stickerId);
  };

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <Link href="/produkte" className="self-start text-[#0A3A68] hover:text-[#FF4C00] mb-4 inline-flex items-center transition-colors">
          <span className="material-icons mr-1">arrow_back</span>
          Zurück zu Produkten
        </Link>
        <h1 className="babix-info-header text-3xl md:text-4xl font-bold mb-8 text-center">Sticker kaufen</h1>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sticker-Auswahl */}
            <div>
              <h2 className="text-xl font-bold text-[#0A3A68] mb-4">Sticker auswählen</h2>
              
              {/* Mobile: Dropdown für Set-Auswahl */}
              <div className="md:hidden mb-4">
                <h3 className="block text-sm font-medium text-gray-700 mb-2">Set auswählen</h3>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF]"
                  value={selectedSetNumber || ''}
                  onChange={handleSetChange}
                >
                  <option value="">-- Bitte wählen --</option>
                  {availableSets.map(setNumber => (
                    <option key={setNumber} value={setNumber}>Set {setNumber}</option>
                  ))}
                </select>
              </div>

              {/* Desktop: Button-Grid für Set-Auswahl */}
              <div className="hidden md:block mb-4">
                <h3 className="block text-sm font-medium text-gray-700 mb-2">Set auswählen</h3>
                <div className="grid grid-cols-4 lg:grid-cols-5 gap-2">
                  {availableSets.map(setNumber => (
                    <button
                      key={setNumber}
                      className={`p-2 rounded text-center transition-colors ${
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
                <>
                  {/* Mobile: Dropdown für Sticker-Auswahl */}
                  <div className="md:hidden mb-4">
                    <h3 className="block text-sm font-medium text-gray-700 mb-2">Sticker auswählen</h3>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF]"
                      value={selectedStickerId || ''}
                      onChange={handleStickerChange}
                    >
                      <option value="">-- Bitte wählen --</option>
                      {getStickersBySet(selectedSetNumber).map(sticker => (
                        <option key={sticker.id} value={sticker.id}>
                          {sticker.name} ({sticker.stars} {sticker.stars === 1 ? 'Stern' : 'Sterne'}{sticker.isGold ? ' - Gold' : ''})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Desktop: Button-Grid für Sticker-Auswahl */}
                  <div className="hidden md:block mb-4">
                    <h3 className="block text-sm font-medium text-gray-700 mb-2">Sticker auswählen</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto p-1">
                      {getStickersBySet(selectedSetNumber).map(sticker => (
                        <button
                          key={sticker.id}
                          className={`p-2 rounded text-left transition-colors flex items-center ${
                            selectedStickerId === sticker.id
                              ? 'bg-[#0A3A68] text-white' 
                              : sticker.isGold 
                                ? 'bg-yellow-50 hover:bg-yellow-100 text-gray-800 border border-yellow-200'
                                : 'bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200'
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
                </>
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
            
            {/* Warenkorb */}
            <div>
              <h2 className="text-xl font-bold text-[#0A3A68] mb-4">Warenkorb</h2>
              
              {cart.length === 0 ? (
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-gray-500">Ihr Warenkorb ist leer.</p>
                  <p className="text-gray-500 text-sm mt-2">Wählen Sie Sticker aus, um sie hier hinzuzufügen.</p>
                </div>
              ) : (
                <div>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
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
                          <div className="flex items-center">
                            <span className="font-bold mr-3">{calculatePrice(item).toFixed(2).replace('.', ',')} €</span>
                            <button 
                              onClick={() => removeFromCart(index)}
                              className="text-red-500 hover:text-red-700"
                              aria-label="Entfernen"
                            >
                              <span className="material-icons">delete</span>
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between font-bold">
                        <span>Gesamtpreis:</span>
                        <span>{calculateTotal().replace('.', ',')} €</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full bg-[#FF4C00] hover:bg-[#0A3A68] text-white py-3 px-4 rounded-md transition-colors mb-3"
                    disabled={cart.length === 0}
                  >
                    <span className="material-icons mr-1">shopping_cart</span>
                    Jetzt kaufen
                  </button>
                </div>
              )}
              
              <Link href="/hilfe/sticker">
                <button className="w-full bg-transparent border border-[#0A3A68] text-[#0A3A68] hover:bg-gray-100 py-2 px-4 rounded-md transition-colors flex items-center justify-center">
                  <span className="material-icons mr-1">help</span>
                  Weitere Informationen zu Stickern
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Hinweis-Box */}
        <div className="bg-[#E6F7FF] border-l-4 border-[#00CFFF] p-4 rounded-r-md mb-8">
          <h3 className="font-bold text-[#0A3A68] mb-2">Informationen zum Stickerservice:</h3>
          <p className="text-gray-700 mb-2">
            Unsere Sticker werden nach Zahlungseingang innerhalb von 24 Stunden in Ihr Spiel übertragen. 
            Hierfür benötigen wir lediglich Ihre Spieler-ID oder den Account-Namen.
          </p>
          <p className="text-gray-700">
            Die Preise richten sich nach der Seltenheit:
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li>1-3 Sterne: 2,00 €</li>
            <li>4 Sterne: 2,50 €</li>
            <li>5 Sterne: 3,00 €</li>
            <li>4 Sterne Gold: 4,00 € (nur während Goldtausch)</li>
            <li>5 Sterne Gold: 5,00 € (nur während Goldtausch)</li>
          </ul>
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