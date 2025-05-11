import { useEffect, useState } from 'react';
import { Link } from 'wouter';

export default function Sticker() {
  useEffect(() => {
    document.title = 'Stickerkauf | babixGO';
  }, []);

  const [selectedSet, setSelectedSet] = useState('');
  const [selectedSticker, setSelectedSticker] = useState('');
  const [stickerDetails, setStickerDetails] = useState({
    stars: 0,
    isGold: false,
    price: 0,
  });
  const [cart, setCart] = useState<Array<{id: string, name: string, stars: number, isGold: boolean, price: number}>>([]);

  // Beispiel-Sets und Sticker
  const stickerSets = [
    { id: 'set1', name: 'Set 1: Stadtansichten' },
    { id: 'set2', name: 'Set 2: Hochhäuser' },
    { id: 'set3', name: 'Set 3: Monopoly Klassiker' },
    { id: 'set4', name: 'Set 4: Strand & Meer' },
  ];

  const stickersInSet: {[key: string]: Array<{id: string, name: string, stars: number, isGold: boolean}>} = {
    'set1': [
      { id: 's1_1', name: 'Berlin', stars: 1, isGold: false },
      { id: 's1_2', name: 'Paris', stars: 2, isGold: false },
      { id: 's1_3', name: 'London', stars: 3, isGold: false },
      { id: 's1_4', name: 'Rom', stars: 4, isGold: false },
      { id: 's1_5', name: 'New York', stars: 5, isGold: false },
      { id: 's1_6', name: 'Golden Gate', stars: 4, isGold: true },
      { id: 's1_7', name: 'Tokyo', stars: 5, isGold: true },
    ],
    'set2': [
      { id: 's2_1', name: 'Empire State', stars: 2, isGold: false },
      { id: 's2_2', name: 'Taipei 101', stars: 3, isGold: false },
      { id: 's2_3', name: 'Burj Khalifa', stars: 4, isGold: false },
      { id: 's2_4', name: 'CN Tower', stars: 5, isGold: false },
      { id: 's2_5', name: 'Willis Tower', stars: 4, isGold: true },
    ],
    'set3': [
      { id: 's3_1', name: 'Spielfigur Schiff', stars: 1, isGold: false },
      { id: 's3_2', name: 'Spielfigur Hut', stars: 2, isGold: false },
      { id: 's3_3', name: 'Spielfigur Auto', stars: 3, isGold: false },
      { id: 's3_4', name: 'Spielbrett', stars: 4, isGold: false },
      { id: 's3_5', name: 'Geldscheine', stars: 5, isGold: false },
      { id: 's3_6', name: 'Goldener Pokal', stars: 5, isGold: true },
    ],
    'set4': [
      { id: 's4_1', name: 'Palmen', stars: 1, isGold: false },
      { id: 's4_2', name: 'Strandkorb', stars: 2, isGold: false },
      { id: 's4_3', name: 'Segelboot', stars: 3, isGold: false },
      { id: 's4_4', name: 'Leuchtturm', stars: 4, isGold: false },
      { id: 's4_5', name: 'Yacht', stars: 4, isGold: true },
      { id: 's4_6', name: 'Luxusyacht', stars: 5, isGold: true },
    ],
  };

  // Berechnet den Preis basierend auf Sterne und Gold-Status
  const calculatePrice = (stars: number, isGold: boolean) => {
    if (isGold) {
      return stars === 5 ? 5 : 4;
    } else {
      return stars >= 4 ? (stars === 5 ? 3 : 2.5) : 2;
    }
  };

  // Setzt die Sticker-Details, wenn ein neuer Sticker ausgewählt wird
  const handleStickerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stickerId = e.target.value;
    setSelectedSticker(stickerId);
    
    if (stickerId && selectedSet) {
      const sticker = stickersInSet[selectedSet].find(s => s.id === stickerId);
      if (sticker) {
        const price = calculatePrice(sticker.stars, sticker.isGold);
        setStickerDetails({
          stars: sticker.stars,
          isGold: sticker.isGold,
          price: price
        });
      }
    }
  };

  // Fügt den ausgewählten Sticker zum Warenkorb hinzu
  const addToCart = () => {
    if (selectedSticker && selectedSet) {
      const sticker = stickersInSet[selectedSet].find(s => s.id === selectedSticker);
      if (sticker) {
        // Wenn der Sticker golden ist, fügen wir ihn nicht direkt zum Warenkorb hinzu
        if (sticker.isGold) {
          alert('Goldsticker können nur während eines Goldtausch-Events bestellt werden. Bitte kontaktieren Sie uns über WhatsApp für weitere Informationen.');
          return;
        }
        
        const price = calculatePrice(sticker.stars, sticker.isGold);
        const setName = stickerSets.find(set => set.id === selectedSet)?.name || '';
        
        setCart([...cart, {
          id: sticker.id,
          name: `${setName} - ${sticker.name}`,
          stars: sticker.stars,
          isGold: sticker.isGold,
          price: price
        }]);
        
        // Reset
        setSelectedSticker('');
        setStickerDetails({ stars: 0, isGold: false, price: 0 });
      }
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
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  // Öffnet das Kauf-Modal
  const [showModal, setShowModal] = useState(false);

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
              
              <div className="mb-4">
                <label htmlFor="stickerSet" className="block text-sm font-medium text-gray-700 mb-1">Set auswählen</label>
                <select 
                  id="stickerSet" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF]"
                  value={selectedSet}
                  onChange={(e) => {
                    setSelectedSet(e.target.value);
                    setSelectedSticker('');
                    setStickerDetails({ stars: 0, isGold: false, price: 0 });
                  }}
                >
                  <option value="">-- Bitte wählen --</option>
                  {stickerSets.map(set => (
                    <option key={set.id} value={set.id}>{set.name}</option>
                  ))}
                </select>
              </div>
              
              {selectedSet && (
                <div className="mb-4">
                  <label htmlFor="sticker" className="block text-sm font-medium text-gray-700 mb-1">Sticker auswählen</label>
                  <select 
                    id="sticker" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF]"
                    value={selectedSticker}
                    onChange={handleStickerChange}
                  >
                    <option value="">-- Bitte wählen --</option>
                    {stickersInSet[selectedSet].map(sticker => (
                      <option key={sticker.id} value={sticker.id}>
                        {sticker.name} ({sticker.stars} {sticker.stars === 1 ? 'Stern' : 'Sterne'}{sticker.isGold ? ' - Gold' : ''})
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              {/* Sticker-Details */}
              {selectedSticker && (
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
                    <span className="font-bold text-[#0A3A68]">{stickerDetails.price.toFixed(2)} €</span>
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
                            <p className="font-medium">{item.name}</p>
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
                            <span className="font-bold mr-3">{item.price.toFixed(2)} €</span>
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
                        <span>{calculateTotal()} €</span>
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
              <a
                href="https://wa.me/491234567890?text=Ich%20möchte%20folgende%20Sticker%20bestellen:%20"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#25D366] hover:bg-opacity-90 text-white py-3 px-4 rounded-md transition-colors text-center"
              >
                <span className="flex items-center justify-center">
                  <span className="material-icons mr-2">whatsapp</span>
                  Über WhatsApp bestellen
                </span>
              </a>
              
              <button
                onClick={() => {
                  alert('Hier würde jetzt der normale Bestellprozess starten.');
                  setShowModal(false);
                }}
                className="w-full bg-[#0A3A68] hover:bg-[#FF4C00] text-white py-3 px-4 rounded-md transition-colors"
              >
                <span className="flex items-center justify-center">
                  <span className="material-icons mr-2">shopping_cart</span>
                  Zum Bestellformular
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}