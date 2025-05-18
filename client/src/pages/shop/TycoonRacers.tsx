import { useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEOHead from '@/components/SEOHead';

export default function ShopTycoonRacers() {
  const [activeSection, setActiveSection] = useState('team');
  
  // Preistabelle für Tycoon Racers
  const tycoonPrices = {
    team: [
      { slots: 1, price: 20 },
      { slots: 3, price: 55 },
    ],
    flags: [
      { amount: '10.000 Flaggen', price: 25 },
      { amount: '20.000 Flaggen', price: 45 },
    ]
  };

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
        pageName="Tycoon Racers" 
        customTitle="Tycoon Racers für Monopoly Go | babixGO Shop" 
        customDescription="Team-Slots und Flaggen für Tycoon Racers Events - Sichere dir alle Rundenbelohnungen ohne Aufwand."
      />
      
      {/* Hero Section */}
      <section className="py-6 md:py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A3A68]/10 to-[#FF4C00]/10 animate-gradient-x"></div>
        <div className="max-w-4xl mx-auto relative px-4">
          <div className="text-center mb-8">
            <h1 className="babix-info-header font-bold text-3xl md:text-4xl px--2 py-2">
              Tycoon Racers für Monopoly Go
            </h1>
            <p className="text-base md:text-lg mb-6">Sichere dir alle 54 Rundenbelohnungen - ganz ohne Aufwand!</p>
            
            {/* Navigation Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button 
                onClick={() => scrollToSection('team')}
                className={`px-6 ${activeSection === 'team' ? 'bg-[#00CFFF]' : 'bg-[#0A3A68]'}`}
              >
                Teamplätze
              </Button>
              <Button 
                onClick={() => scrollToSection('flaggen')}
                className={`px-6 ${activeSection === 'flaggen' ? 'bg-[#00CFFF]' : 'bg-[#0A3A68]'}`}
              >
                Flaggen
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            
            {/* Teamplätze */}
            <div id="team" className="scroll-mt-20">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-[#0A3A68] to-[#0A3A68]/80 p-6">
                  <h2 className="text-2xl font-bold text-white">Teamplätze für deinen Account</h2>
                  <p className="text-white/80">Schließe dich unserem Racing-Team an und sichere dir alle 54 Rundenbelohnungen - ganz ohne Aufwand!</p>
                </div>
                <CardContent className="p-6">
                  <p className="mb-4">
                    Weitere Voraussetzungen, Infos zum Ablauf usw. bekommst du hier:
                    <Link href="/hilfe/tycoon-racers">
                      <span className="text-[#00CFFF] hover:underline ml-1 inline-flex items-center">
                        Hilfsartikel lesen
                        <span className="material-icons text-sm ml-1">help_outline</span>
                      </span>
                    </Link>
                  </p>
                  
                  <div className="my-6">
                    <h3 className="text-lg font-bold mb-2">Preise:</h3>
                    <div className="space-y-2">
                      {tycoonPrices.team.map((item, index) => (
                        <div key={index} className="flex justify-between items-center border-b border-gray-100 py-2">
                          <span className="font-medium flex items-center">
                            <span className="material-icons mr-2 text-[#0A3A68]">flag</span>
                            {item.slots} Platz{item.slots > 1 ? 'e' : ''}
                          </span>
                          <span className="font-bold text-[#FF4C00]">{item.price}€</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <Link href="/checkout/tycoonracers">
                      <Button className="bg-[#FF4C00] hover:bg-[#FF4C00]/90 text-white px-8">
                        Teamplatz sichern
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Flaggen */}
            <div id="flaggen" className="scroll-mt-20">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-[#00CFFF] to-[#00CFFF]/80 p-6">
                  <h2 className="text-2xl font-bold text-white">Flaggen sammeln</h2>
                  <p className="text-white/80">Fahre dein Team zum Sieg. Wir helfen beim Flaggen sammeln!</p>
                </div>
                <CardContent className="p-6">
                  <p className="mb-4">
                    Wir sammeln Flaggen für dich, wenn du selbst keine Zeit hast. Weitere Informationen findest du hier:
                    <Link href="/hilfe/flaggen">
                      <span className="text-[#00CFFF] hover:underline ml-1 inline-flex items-center">
                        Hilfsartikel lesen
                        <span className="material-icons text-sm ml-1">help_outline</span>
                      </span>
                    </Link>
                  </p>
                  
                  <div className="my-6">
                    <h3 className="text-lg font-bold mb-2">Preise:</h3>
                    <div className="space-y-2">
                      {tycoonPrices.flags.map((item, index) => (
                        <div key={index} className="flex justify-between items-center border-b border-gray-100 py-2">
                          <span className="font-medium flex items-center">
                            <span className="material-icons mr-2 text-[#FF4C00]">flag</span>
                            {item.amount}
                          </span>
                          <span className="font-bold text-[#FF4C00]">{item.price}€</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <Link href="/checkout/flaggen">
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
                <h3 className="font-bold text-lg mb-2">Wie funktionieren Tycoon Racers Teams?</h3>
                <p>Bei Tycoon Racers bist du Teil unseres Teams und erhältst alle 54 Rundenbelohnungen, ohne selbst aktiv spielen zu müssen. Wir kümmern uns um alles und stellen sicher, dass unser Team die Ziele erreicht.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">Wie lange dauert ein Tycoon Racers Event?</h3>
                <p>Ein Tycoon Racers Event dauert in der Regel 3-4 Tage. Während dieser Zeit sammelt unser Team fleißig Flaggen, um alle Belohnungen freizuschalten.</p>
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