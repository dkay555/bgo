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
    { count: 4, price: 25 }, // Sonderpreis
  ];
  
  // Währungsoptionen
  const waehrungOptions = [
    { amount: '10.000 Währung', price: 20 },
    { amount: '20.000 Währung', price: 30 },
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
                    Hier findest du weitere Infos zum Event und dem Ablauf:
                    <Link href="/hilfe/partnerevent">
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
                    <a 
                      href="https://www.paypal.com/ncp/payment/MJ97DPNYHAVE2" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="no-underline"
                    >
                      <button 
                        style={{
                          textAlign: 'center',
                          border: 'none',
                          borderRadius: '0.25rem',
                          minWidth: '11.625rem',
                          padding: '0 2rem',
                          height: '2.5rem',
                          fontWeight: 'bold',
                          backgroundColor: '#FFD140',
                          color: '#000000',
                          fontFamily: '"Helvetica Neue",Arial,sans-serif',
                          fontSize: '0.875rem',
                          lineHeight: '1.125rem',
                          cursor: 'pointer'
                        }}
                      >
                        Partner buchen
                      </button>
                      <div className="flex flex-col items-center mt-2 space-y-1">
                        <img src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg" alt="Zahlungsmethoden" className="h-5" />
                        <div className="text-xs">
                          Abgewickelt durch <img src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg" alt="PayPal" className="h-3.5 inline align-middle" />
                        </div>
                      </div>
                    </a>
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
                    Wir sammeln Eventwährung vom Spielbrett für dich. Es gelten dieselben Voraussetzungen wie beim Würfelboost. Diese kannst du hier nachlesen:
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
                    <a 
                      href="https://www.paypal.com/ncp/payment/8PSVV4EJQSPXS" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="no-underline"
                    >
                      <button 
                        style={{
                          textAlign: 'center',
                          border: 'none',
                          borderRadius: '0.25rem',
                          minWidth: '11.625rem',
                          padding: '0 2rem',
                          height: '2.5rem',
                          fontWeight: 'bold',
                          backgroundColor: '#FFD140',
                          color: '#000000',
                          fontFamily: '"Helvetica Neue",Arial,sans-serif',
                          fontSize: '0.875rem',
                          lineHeight: '1.125rem',
                          cursor: 'pointer'
                        }}
                      >
                        Jetzt kaufen
                      </button>
                      <div className="flex flex-col items-center mt-2 space-y-1">
                        <img src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg" alt="Zahlungsmethoden" className="h-5" />
                        <div className="text-xs">
                          Abgewickelt durch <img src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg" alt="PayPal" className="h-3.5 inline align-middle" />
                        </div>
                      </div>
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
                <h3 className="font-bold text-lg mb-2">Wann bekomme ich meine Partner?</h3>
                <p>Spätestens zum Eventstart bekommst du den Freundschaftslink und Ingame Namen deines Partners mitgeteilt. Gerne kannst du diesen dann schon hinzufügen und eine Einladung senden. Ansonsten übernehmen wir das sobald der Account an der Reihe ist.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">Wann macht ihr den Turm fertig?</h3>
                <p>Wir bieten bewusst keine "Rush Plätze" an. Alle Türme werden rechtzeitig beendet.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">Wie bekomme ich Eventwährung?</h3>
                <p>Der Ablauf und die Voraussetzungen dafür sind dieselben wie beim Würfelboost. Wir sammeln erst Würfel und tauschen diese dann gegen Eventwährung ein.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}