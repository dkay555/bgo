import { useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEOHead from '@/components/SEOHead';

export default function ShopWuerfel() {
  const [activeSection, setActiveSection] = useState('wuerfelboost');

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
        pageName="Würfel kaufen" 
        customTitle="Würfel für Monopoly Go | babixGO Shop" 
        customDescription="Kaufe Würfel für deinen Monopoly Go Account - verschiedene Pakete für alle Bedürfnisse."
      />
      
      {/* Hero Section */}
      <section className="py-6 md:py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A3A68]/10 to-[#00CFFF]/10 animate-gradient-x"></div>
        <div className="max-w-4xl mx-auto relative px-4">
          <div className="text-center mb-8">
            <h1 className="babix-info-header font-bold text-3xl md:text-4xl px--2 py-2">
              Würfel für deinen Monopoly Go Account
            </h1>
            <p className="text-base md:text-lg mb-6">Wir bieten dir für jede Situation das passende Angebot:</p>
            
            {/* Navigation Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button 
                onClick={() => scrollToSection('wuerfelboost')}
                className={`px-6 ${activeSection === 'wuerfelboost' ? 'bg-[#00CFFF]' : 'bg-[#0A3A68]'}`}
              >
                Würfelboost
              </Button>
              <Button 
                onClick={() => scrollToSection('schnupperboost')}
                className={`px-6 ${activeSection === 'schnupperboost' ? 'bg-[#00CFFF]' : 'bg-[#0A3A68]'}`}
              >
                Schnupperboost
              </Button>
              <Button 
                onClick={() => scrollToSection('retterboost')}
                className={`px-6 ${activeSection === 'retterboost' ? 'bg-[#00CFFF]' : 'bg-[#0A3A68]'}`}
              >
                Retterboost
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            
            {/* Würfelboost */}
            <div id="wuerfelboost" className="scroll-mt-20">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-[#0A3A68] to-[#0A3A68]/80 p-6">
                  <h2 className="text-2xl font-bold text-white">Würfelboost</h2>
                  <p className="text-white/80">Der Klassiker. Bitte beachte, dass wir Zugriff auf deinen Account benötigen.</p>
                </div>
                <CardContent className="p-6">
                  <p className="mb-4">
                    Weitere Voraussetzungen, Infos zum Ablauf usw. bekommst du hier:
                    <Link href="/hilfe/wuerfel">
                      <span className="text-[#00CFFF] hover:underline ml-1 inline-flex items-center">
                        Hilfsartikel lesen
                        <span className="material-icons text-sm ml-1">help_outline</span>
                      </span>
                    </Link>
                  </p>
                  
                  <div className="my-6">
                    <h3 className="text-lg font-bold mb-2">Preise:</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center border-b border-gray-100 py-2">
                        <span className="font-medium">25.000 Würfel</span>
                        <span className="font-bold text-[#FF4C00]">25€</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-100 py-2">
                        <span className="font-medium">35.000 Würfel</span>
                        <span className="font-bold text-[#FF4C00]">35€</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-100 py-2">
                        <span className="font-medium">45.000 Würfel</span>
                        <span className="font-bold text-[#FF4C00]">45€</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-100 py-2 bg-yellow-50">
                        <span className="font-medium">40.000 - 50.000 Würfel <span className="text-sm text-gray-600">(während Lucky Chance/Dice Match/Frei Parken x2)</span></span>
                        <span className="font-bold text-[#FF4C00]">50€</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <Link href="/checkout/wuerfel">
                      <Button className="bg-[#FF4C00] hover:bg-[#FF4C00]/90 text-white px-8">
                        Jetzt kaufen
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Schnupperboost */}
            <div id="schnupperboost" className="scroll-mt-20">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-[#00CFFF] to-[#00CFFF]/80 p-6">
                  <h2 className="text-2xl font-bold text-white">Schnupperboost</h2>
                  <p className="text-white/80">Unser Kennenlern Angebot.</p>
                </div>
                <CardContent className="p-6">
                  <p className="mb-4">
                    Schaue bitte vor dem Kauf in unserem Hilfsartikel vorbei:
                    <Link href="/hilfe/wuerfel">
                      <span className="text-[#00CFFF] hover:underline ml-1 inline-flex items-center">
                        Hilfsartikel lesen
                        <span className="material-icons text-sm ml-1">help_outline</span>
                      </span>
                    </Link>
                  </p>
                  
                  <div className="my-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center border-b border-gray-100 py-2">
                        <span className="font-medium">10.000 Würfel</span>
                        <span className="font-bold text-[#FF4C00]">10€</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-100 py-2">
                        <span className="font-medium">10.000 Würfel + Eventabschlüsse</span>
                        <span className="font-bold text-[#FF4C00]">15€</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <Link href="/checkout/wuerfel">
                      <Button className="bg-[#FF4C00] hover:bg-[#FF4C00]/90 text-white px-8">
                        Jetzt kaufen
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Retterboost */}
            <div id="retterboost" className="scroll-mt-20">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-[#FF4C00] to-[#FF4C00]/80 p-6">
                  <h2 className="text-2xl font-bold text-white">Retterboost</h2>
                  <p className="text-white/80">Kein High Roller notwendig! Es ist kurz vor knapp und du brauchst ein paar Würfel? Dann ist dies der Boost deiner Wahl.</p>
                </div>
                <CardContent className="p-6">
                  <p className="mb-4">
                    Nur per WhatsApp buchbar um sicher zu gehen dass es zeitlich für beide Seiten passt.
                  </p>
                  
                  <div className="my-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center border-b border-gray-100 py-2">
                        <span className="font-medium">4.000 Würfel</span>
                        <span className="font-bold text-[#FF4C00]">10€</span>
                      </div>
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
                <h3 className="font-bold text-lg mb-2">Wie funktioniert der Würfelboost?</h3>
                <p>Nach deiner Bestellung benötigen wir Zugriff auf deinen Account. Wir führen dann den Boost durch und informieren dich, sobald der Vorgang abgeschlossen ist. Mehr Details in unserem Hilfsartikel.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">Wie lange dauert ein Boost?</h3>
                <p>In der Regel dauert ein Boost zwischen 10-30 Minuten. Bei hohem Aufkommen kann es jedoch etwas länger dauern. Wir halten dich über den Status informiert.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">Ist der Boost sicher für meinen Account?</h3>
                <p>Ja, wir nutzen speziell entwickelte Anti-Anticheat-Maßnahmen, um deine Accountsicherheit zu gewährleisten. Wir haben langjährige Erfahrung und tausende zufriedene Kunden.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}