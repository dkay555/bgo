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
                    Hier findest du weitere Infos zum Event und dem Ablauf:
                    <Link href="/hilfe/race">
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
                    <a 
                      href="https://www.paypal.com/ncp/payment/J45WB9SDG2J2L" 
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
                        Teamplatz sichern
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

            {/* Flaggen */}
            <div id="flaggen" className="scroll-mt-20">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-[#00CFFF] to-[#00CFFF]/80 p-6">
                  <h2 className="text-2xl font-bold text-white">Flaggen sammeln</h2>
                  <p className="text-white/80">Fahre dein Team zum Sieg. Wir helfen beim Flaggen sammeln!</p>
                </div>
                <CardContent className="p-6">
                  <p className="mb-4">
                    Wir sammeln Flaggen für dich, wenn du selbst keine Zeit hast. Es gelten dieselben Voraussetzungen wie für den Würfelboost. Diese kannst du hier nachlesen:
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
                    <a 
                      href="https://www.paypal.com/ncp/payment/J45WB9SDG2J2L" 
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
                <h3 className="font-bold text-lg mb-2">Wie sind die Teams aufgebaut?</h3>
                <p>Wir befüllen jedes Team mit mindestens 2 unserer Accounts. Die restlichen Plätze bieten wir euch an.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">Wie läuft das ab?</h3>
                <p>Du bekommst spätestens zum Start des Events den Freundschaftslink und Ingame Namen deines Teampartners mitgeteilt.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">Was muss ich beachten?</h3>
                <p>Tritt keinen anderen Team bei und lasse niemand anderen ins Team! Sobald ein Team komplett ist kann man es nicht mehr verlassen.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">Gewinnen wir ganz sicher?</h3>
                <p>Nein. Wir erspielen 45.000 Punkte - das wars. Sollte es mal knapp werden legen wir noch etwas nach um Platz 1 zu erreichen, wir beteiligen uns aber nicht an Rennen mit Gegnern die mehrere 100k Punkte pro Rennen erspielen.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">Wie oft gewinnt ihr?</h3>
                <p>Über 90% unserer Teams haben Platz 1 erreicht!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}