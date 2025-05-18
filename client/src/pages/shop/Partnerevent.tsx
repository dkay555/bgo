import { useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEOHead from '@/components/SEOHead';

export default function ShopPartnerevent() {
  const [activeSection, setActiveSection] = useState('zuverlässiger-partner');

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

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="px-4 py-6 md:py-10 flex-grow font-['Nunito_Sans'] text-[#0A3A68]">
      <SEOHead 
        pageName="Partnerevents" 
        customTitle="Partnerevents für Monopoly Go | babixGO Shop" 
        customDescription="Zuverlässige Partner und Eventwährung für deinen Erfolg in Monopoly Go Events."
      />
      
      {/* Hero Section */}
      <section className="py-6 md:py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A3A68]/10 to-[#00CFFF]/10 animate-gradient-x"></div>
        <div className="max-w-4xl mx-auto relative px-4">
          <div className="text-center mb-8">
            <h1 className="babix-info-header font-bold text-3xl md:text-4xl px--2 py-2">
              Partnerevents für Monopoly Go
            </h1>
            <p className="text-base md:text-lg mb-6">Zuverlässige Partner und Eventwährung für deinen Erfolg:</p>
            
            {/* Navigation Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button 
                onClick={() => scrollToSection('zuverlässiger-partner')}
                className={`px-6 ${activeSection === 'zuverlässiger-partner' ? 'bg-[#00CFFF]' : 'bg-[#0A3A68]'}`}
              >
                Partner buchen
              </Button>
              <Button 
                onClick={() => scrollToSection('eventwährung')}
                className={`px-6 ${activeSection === 'eventwährung' ? 'bg-[#00CFFF]' : 'bg-[#0A3A68]'}`}
              >
                Eventwährung
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            
            {/* Zuverlässiger Partner */}
            <div id="zuverlässiger-partner" className="scroll-mt-20">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-[#0A3A68] to-[#0A3A68]/80 p-6">
                  <h2 className="text-2xl font-bold text-white">Zuverlässiger Partner</h2>
                  <p className="text-white/80">Lehne dich zurück und lass uns die Arbeit machen! Wir übernehmen die vollen 80.000 Punkte.</p>
                </div>
                <CardContent className="p-6">
                  <p className="mb-4">
                    Weitere Voraussetzungen, Infos zum Ablauf usw. bekommst du hier:
                    <Link href="/hilfe/partner">
                      <span className="text-[#00CFFF] hover:underline ml-1 inline-flex items-center">
                        Hilfsartikel lesen
                        <span className="material-icons text-sm ml-1">help_outline</span>
                      </span>
                    </Link>
                  </p>
                  
                  <div className="my-6">
                    <h3 className="text-lg font-bold mb-2">Preise:</h3>
                    <div className="space-y-2">
                      {partnerPrices.map((item, index) => (
                        <div key={index} className="flex justify-between items-center border-b border-gray-100 py-2">
                          <span className="font-medium flex items-center">
                            <span className="material-icons mr-2 text-[#0A3A68]">group</span>
                            {item.count} {item.count === 1 ? 'Partner' : 'Partner'}
                          </span>
                          <span className="font-bold text-[#FF4C00]">{item.price}€</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <Link href="/checkout/partnerevent">
                      <Button className="bg-[#FF4C00] hover:bg-[#FF4C00]/90 text-white px-8">
                        Partner buchen
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Eventwährung */}
            <div id="eventwährung" className="scroll-mt-20">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-[#00CFFF] to-[#00CFFF]/80 p-6">
                  <h2 className="text-2xl font-bold text-white">Eventwährung</h2>
                  <p className="text-white/80">Falls du lieber mit deinen liebsten spielen magst, aber trotzdem nicht um den Hauptpreis bangen willst.</p>
                </div>
                <CardContent className="p-6">
                  <p className="mb-4">
                    Wir sammeln Eventwährung vom Spielbrett für dich. Weitere Informationen findest du hier:
                    <Link href="/hilfe/partner">
                      <span className="text-[#00CFFF] hover:underline ml-1 inline-flex items-center">
                        Hilfsartikel lesen
                        <span className="material-icons text-sm ml-1">help_outline</span>
                      </span>
                    </Link>
                  </p>
                  
                  <div className="my-6">
                    <h3 className="text-lg font-bold mb-2">Preise:</h3>
                    <div className="space-y-2">
                      {waehrungOptions.map((item, index) => (
                        <div key={index} className="flex justify-between items-center border-b border-gray-100 py-2">
                          <span className="font-medium flex items-center">
                            <span className="material-icons mr-2 text-[#FF4C00]">currency_exchange</span>
                            {item.amount}
                          </span>
                          <span className="font-bold text-[#FF4C00]">{item.price}€</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <Link href="/checkout/eventwaehrung">
                      <Button className="bg-[#FF4C00] hover:bg-[#FF4C00]/90 text-white px-8">
                        Jetzt kaufen
                      </Button>
                    </Link>
                  </div>
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
                <h3 className="font-bold text-lg mb-2">Wie funktionieren Partnerevents?</h3>
                <p>Bei einem Partnerevent spielen wir mit dir gemeinsam, um die maximale Punktzahl zu erreichen. Du musst dabei nicht aktiv sein - wir übernehmen für dich. Detaillierte Informationen findest du in unserem Hilfsartikel.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">Wie lange dauert ein Event?</h3>
                <p>Die Dauer variiert je nach Event, in der Regel zwischen 1-3 Tagen. Während dieser Zeit kümmern wir uns um dein Konto und sammeln die benötigten Punkte.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">Wie kann ich bezahlen?</h3>
                <p>Im Shop hast du die Möglichkeit mit PayPal zu bezahlen. Alternativ bieten wir die Bezahlung via Überweisung an. Schicke uns dafür eine Nachricht.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}