import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sticker, stickersWithSets, getAvailableSets, getStickersBySet, calculatePrice } from '@/lib/stickerData';
import { CONTACT } from '@/lib/constants';
import SEOHead from '@/components/SEOHead';
import StickerCart from '@/components/StickerCart';
import { useStickerCart } from '@/hooks/use-sticker-cart';

export default function ShopSticker() {
  const [location, navigate] = useLocation();
  const [activeSection, setActiveSection] = useState('stickerpreise');
  const [selectedSetNumber, setSelectedSetNumber] = useState<number | null>(null);
  const [selectedStickerId, setSelectedStickerId] = useState<number | null>(null);
  const [stickerDetails, setStickerDetails] = useState<Sticker | null>(null);
  const [availableSets, setAvailableSets] = useState<number[]>([]);
  
  // Nutze den Warenkorb-Hook statt eines lokalen States
  const { cartItems, addToCart, removeFromCart, totalPrice } = useStickerCart();

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

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Fügt den ausgewählten Sticker zum Warenkorb hinzu
  const handleAddToCart = () => {
    if (stickerDetails) {
      // Wenn der Sticker golden ist, fügen wir ihn nicht direkt zum Warenkorb hinzu
      if (stickerDetails.isGold) {
        alert('Goldsticker können nur während eines Goldtausch-Events bestellt werden. Bitte kontaktieren Sie uns über WhatsApp für weitere Informationen.');
        return;
      }
      
      addToCart(stickerDetails);
    }
  };

  // Zum Checkout navigieren
  const goToCheckout = () => {
    navigate('/checkout/sticker');
  };

  return (
    <main className="px-4 py-6 md:py-10 flex-grow font-['Nunito_Sans'] text-[#0A3A68]">
      <SEOHead 
        pageName="Sticker kaufen" 
        customTitle="Sticker für Monopoly Go | babixGO Shop" 
        customDescription="Sticker für dein Monopoly Go Album - Vervollständige deine Sammlung mit uns!"
      />
      
      {/* Hero Section */}
      <section className="py-6 md:py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A3A68]/10 to-[#00CFFF]/10 animate-gradient-x"></div>
        <div className="max-w-4xl mx-auto relative px-4">
          <div className="text-center mb-8">
            <h1 className="babix-info-header font-bold text-3xl md:text-4xl px--2 py-2">
              Sticker für dein Monopoly Go Album
            </h1>
            <p className="text-base md:text-lg mb-6">Vervollständige deine Sammlung mit unserer umfangreichen Auswahl:</p>
            
            {/* Navigation Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button 
                onClick={() => scrollToSection('stickerpreise')}
                className={`px-6 ${activeSection === 'stickerpreise' ? 'bg-[#00CFFF]' : 'bg-[#0A3A68]'}`}
              >
                Sticker-Preise
              </Button>
              <Button 
                onClick={() => scrollToSection('stickerauswahl')}
                className={`px-6 ${activeSection === 'stickerauswahl' ? 'bg-[#00CFFF]' : 'bg-[#0A3A68]'}`}
              >
                Sticker auswählen
              </Button>
              <Button 
                onClick={() => scrollToSection('warenkorb')}
                className={`px-6 ${activeSection === 'warenkorb' ? 'bg-[#00CFFF]' : 'bg-[#0A3A68]'}`}
              >
                Warenkorb
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            
            {/* Sticker Preise */}
            <div id="stickerpreise" className="scroll-mt-20">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-[#0A3A68] to-[#0A3A68]/80 p-6">
                  <h2 className="text-2xl font-bold text-white">Sticker-Preise</h2>
                  <p className="text-white/80">Wir haben sie alle! Vervollständige deine Sammlung mit unseren Stickern.</p>
                </div>
                <CardContent className="p-6">
                  <p className="mb-4">
                    Sticker werden i.d.R. innerhalb von 60 Minuten verschickt. Aufgrund des Sendelimits kann es allerdings bis zum Reset der Trades dauern.
                    Solltest du den Sticker also dringend benötigen schicke uns vorher eine Nachricht.
                  </p>
                  
                  <div className="mb-4">
                    <p>Goldsticker können nur während "Goldener Blitz" verschickt werden.</p>
                  </div>
                  
                  <div className="my-6">
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
                  
                  <div className="flex justify-center mt-6">
                    <a href="https://wa.me/49176xxxxxxxx" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-[#25D366] hover:bg-[#25D366]/90 text-white px-8">
                        WhatsApp
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sticker Auswahl */}
            <div id="stickerauswahl" className="scroll-mt-20">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-[#00CFFF] to-[#00CFFF]/80 p-6">
                  <h2 className="text-2xl font-bold text-white">Sticker auswählen</h2>
                  <p className="text-white/80">Wähle Sticker aus, die du benötigst.</p>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Set-Auswahl */}
                    <div>
                      <h3 className="block text-lg font-medium text-[#0A3A68] mb-4">Set auswählen</h3>
                      
                      {/* Mobile und Desktop: Buttons für Set-Auswahl */}
                      <div className="flex flex-wrap gap-2 mb-6">
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

                      {selectedSetNumber && (
                        <div className="mb-6">
                          <h3 className="block text-lg font-medium text-[#0A3A68] mb-2">Sticker auswählen</h3>
                          
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
                    </div>

                    {/* Sticker-Details */}
                    <div>
                      {stickerDetails && (
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h3 className="font-bold text-lg mb-4">Sticker-Details</h3>
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
                            onClick={handleAddToCart}
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
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Warenkorb */}
            <div id="warenkorb" className="scroll-mt-20">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-[#FF4C00] to-[#FF4C00]/80 p-6">
                  <h2 className="text-2xl font-bold text-white">Dein Warenkorb</h2>
                  <p className="text-white/80">Überprüfe deine Auswahl und fahre mit der Bestellung fort.</p>
                </div>
                <CardContent className="p-6">
                  {cartItems.length === 0 ? (
                    <div className="bg-gray-50 p-4 rounded-md text-center">
                      <p className="text-gray-500">Du hast noch keine Sticker ausgewählt.</p>
                    </div>
                  ) : (
                    <div>
                      <ul className="mb-6 border rounded-md divide-y">
                        {cartItems.map((item, index) => (
                          <li key={index} className="py-3 px-4 flex justify-between items-center">
                            <div>
                              <p className="font-medium">{item.name} (Set {Math.ceil(item.id / 9)})</p>
                              <div className="flex items-center">
                                <div className="flex mr-2">
                                  {[...Array(item.stars)].map((_, i) => (
                                    <span key={i} className="material-icons text-yellow-500 text-sm">star</span>
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                  {item.isGold ? 'Goldsticker' : 'Standard'}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className="font-bold text-[#FF4C00] mr-4">{calculatePrice(item).toFixed(2).replace('.', ',')} €</span>
                              <button 
                                onClick={() => removeFromCart(index)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                <span className="material-icons">delete</span>
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="bg-gray-50 p-4 rounded-md mb-6">
                        <div className="flex justify-between items-center text-lg font-bold">
                          <span>Gesamtsumme:</span>
                          <span className="text-[#FF4C00]">{totalPrice.toFixed(2).replace('.', ',')} €</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button 
                          onClick={goToCheckout}
                          className="md:col-span-2 w-full bg-[#FF4C00] hover:bg-[#FF4C00]/90 text-white py-2 px-4 rounded-lg font-bold"
                        >
                          Zur Kasse gehen
                        </button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="babix-info-header text-2xl font-bold mb-6 text-center">Häufig gestellte Fragen</h2>
          
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">Wann bekomme ich die Sticker?</h3>
                <p>Wir versenden in der Regel innerhalb von 60 Minuten, spätestens zum Reset des Trade Limits. In dringenden Fällen schick uns deshalb am Besten eine Nachricht vor dem Kauf.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">Was benötigt ihr für Daten?</h3>
                <p>Wir benötigen nur deinen Freundschaftslink oder -code. Der Sticker wird ganz normal über die Ingame Funktion verschickt.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">Kann ich Goldsticker kaufen?</h3>
                <p>Ja, allerdings nur wenn ein Goldener Blitz angekündigt ist. Schicke uns eine Nachricht um deine Sticker zu reservieren!</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">Wie kann ich bezahlen?</h3>
                <p>Im Shop hast du die Möglichkeit mit PayPal zu bezahlen. Alternativ kannst du per Banküberweisung bezahlen, schicke uns dafür bitte eine Nachricht.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}