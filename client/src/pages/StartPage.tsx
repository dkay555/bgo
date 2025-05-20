import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useState, useEffect } from 'react';

export default function StartPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <main className="px-0 py-0 md:py-0 flex-grow font-['Nunito_Sans'] text-[#0A3A68]" id="top">
      {/* Hero Section - Monopoly GO Style */}
      <section className="py-0 md:py-0 relative overflow-hidden min-h-[600px] md:min-h-[700px]">
        {/* Gradient Background for Monopoly GO */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#78c6f7] via-[#5ba3d9] to-[#7cbff0] z-0">
          {/* Background Monopoly Elements - Hidden on smallest screens */}
          <div className="absolute inset-0 hidden sm:block">
            <div className="absolute top-[10%] left-[10%] opacity-30">
              <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="90" height="90" rx="10" fill="white" stroke="#0A3A68" strokeWidth="2"/>
                <circle cx="25" cy="25" r="8" fill="#0A3A68"/>
                <circle cx="75" cy="25" r="8" fill="#0A3A68"/>
                <circle cx="50" cy="50" r="8" fill="#0A3A68"/>
                <circle cx="25" cy="75" r="8" fill="#0A3A68"/>
                <circle cx="75" cy="75" r="8" fill="#0A3A68"/>
              </svg>
            </div>
            <div className="absolute bottom-[20%] left-[15%] opacity-30">
              <svg width="100" height="60" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 10 L30 5 L70 5 L90 10 L90 40 L70 50 L30 50 L10 40 Z" fill="white" stroke="#0A3A68" strokeWidth="2"/>
                <circle cx="30" cy="20" r="5" fill="#0A3A68"/>
                <circle cx="70" cy="20" r="5" fill="#0A3A68"/>
                <path d="M30 35 L70 35" stroke="#0A3A68" strokeWidth="2"/>
              </svg>
            </div>
            <div className="absolute top-[15%] right-[15%] opacity-30">
              <svg width="100" height="60" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="80" height="40" rx="5" fill="#ffcb54" stroke="#c17e0f" strokeWidth="2"/>
                <text x="50" y="35" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#c17e0f">5</text>
              </svg>
            </div>
            <div className="absolute bottom-[25%] right-[10%] opacity-30">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40 10 C45 10 50 15 50 25 L50 40 C50 50 45 55 40 55 C35 55 30 50 30 40 L30 25 C30 15 35 10 40 10 Z" fill="#0A3A68"/>
                <rect x="30" y="55" width="20" height="15" fill="#0A3A68"/>
                <ellipse cx="40" cy="70" rx="15" ry="5" fill="#0A3A68"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Monopoly GO Image - New Version */}
        <div className="max-w-lg mx-auto pt-4 md:pt-6 pb-0 relative px-4 z-10 flex flex-col h-full">
          {/* Monopoly GO Character and Logo - Using the uploaded image */}
          <div className="w-full max-w-md mx-auto mb-4 relative flex justify-center">
            <img 
              src="/images/hero_startseite.png" 
              alt="Monopoly GO" 
              className="w-full max-w-[350px] md:max-w-[400px] h-auto object-contain"
            />
          </div>
          
          {/* Welcome Text Box - Responsive padding and text */}
          <div className="bg-[#b0d6f5] rounded-xl shadow-lg px-4 sm:px-6 md:px-8 py-4 sm:py-6 text-center mb-4 sm:mb-6">
            <h1 className="text-[#FF4C00] font-bold text-2xl sm:text-3xl md:text-4xl mb-1 md:mb-2">
              Willkommen bei babixGO
            </h1>
            <p className="text-[#0A3A68] text-base sm:text-lg md:text-xl">
              Würfel, Events, Sticker & mehr – alles für dein Monopoly GO Abenteuer
            </p>
          </div>
          
          {/* Navigation Buttons - Mobile optimized layout */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto mb-5">
            {/* On mobile: Full width buttons stacked */}
            <Button variant="darkblue" asChild className="font-bold flex items-center justify-center gap-2 h-12 sm:h-14 w-full text-base sm:text-lg shadow-md">
              <Link href="/news">
                <span className="material-icons">feed</span>
                News
              </Link>
            </Button>
            
            <Button variant="orange" asChild className="font-bold flex items-center justify-center gap-2 h-12 sm:h-14 w-full text-base sm:text-lg shadow-md">
              <Link href="/shop">
                <span className="material-icons">shopping_cart</span>
                Shop
              </Link>
            </Button>
            
            <Button variant="darkblue" asChild className="font-bold flex items-center justify-center gap-2 h-12 sm:h-14 w-full text-base sm:text-lg shadow-md">
              <Link href="/hilfe">
                <span className="material-icons">help_outline</span>
                Hilfe
              </Link>
            </Button>
            
            <Button variant="cyan" asChild className="font-bold flex items-center justify-center gap-2 h-12 sm:h-14 w-full text-base sm:text-lg shadow-md">
              <Link href="/kontakt">
                <span className="material-icons">contact_support</span>
                Kontakt
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* News Sektion */}
      <section className="py-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="babix-info-header mx-auto mb-8 text-center">News</h2>
          
          <div className="bg-white rounded-lg shadow-md p-5">
            <h3 className="font-bold text-[#0A3A68] text-xl mb-3">Neue Preise für Würfel - Angebotsanpassung</h3>
            <p className="text-[#0A3A68]/80 mb-3">
              Die letzten Tage war es still um babixGO... Wir haben unser Angebot überarbeitet und optimiert.
            </p>
            <div className="flex justify-end">
              <Link href="/hilfe/news_preise_angebot.html">
                <Button variant="darkblue" className="text-sm px-3 py-1">
                  [weiterlesen]
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="angebote" className="py-8 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="babix-info-header mx-auto mb-8 text-center">
            Was wir dir bieten:
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product Card 1 */}
            <div className="bg-[#00CFFF]/20 rounded-md overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1">
              <div className="relative">
                <img src="/images/Shop-Kategorien/kategorie_wuerfel_trans.png" alt="Würfelboosts" className="w-full h-40 object-contain" />
                <span className="absolute bottom-0 left-4 transform translate-y-1/2 bg-[#0A3A68]/70 text-white font-['Baloo_2'] font-bold px-4 py-2 rounded-md shadow-md">
                  Würfelboosts
                </span>
              </div>
              <div className="p-6 pt-8">
                <p className="mb-6">Ohne sie geht gar nichts bei Monopoly Go: Kaufe Würfel für deinen Monopoly Go Account.</p>
                <div className="flex justify-center">
                  <Button variant="darkblue" asChild className="font-bold">
                    <Link href="/produkte/wuerfel#top">Zum Shop</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="bg-[#00CFFF]/20 rounded-md overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1">
              <div className="relative">
                <img src="/images/Shop-Kategorien/kategorie_sticker_trans.png" alt="Sticker" className="w-full h-40 object-contain" />
                <span className="absolute bottom-0 left-4 transform translate-y-1/2 bg-[#0A3A68]/70 text-white font-['Baloo_2'] font-bold px-4 py-2 rounded-md shadow-md">
                  Sticker
                </span>
              </div>
              <div className="p-6 pt-8">
                <p className="mb-6">Fehlende Sticker? - Nicht mit uns, wir haben sie alle!</p>
                <div className="flex justify-center">
                  <Button variant="darkblue" asChild className="font-bold">
                    <Link href="/produkte/sticker#top">Zum Shop</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className="bg-[#00CFFF]/20 rounded-md overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1">
              <div className="relative">
                <img src="/images/Shop-Kategorien/kategorie_partner_trans.png" alt="Partnerevents" className="w-full h-40 object-contain" />
                <span className="absolute bottom-0 left-4 transform translate-y-1/2 bg-[#0A3A68]/70 text-white font-['Baloo_2'] font-bold px-4 py-2 rounded-md shadow-md">
                  Partnerevents
                </span>
              </div>
              <div className="p-6 pt-8">
                <p className="mb-6">Zuverlässige Partner gesucht? Wer, wenn nicht wir?</p>
                <div className="flex justify-center">
                  <Button variant="darkblue" asChild className="font-bold">
                    <Link href="/produkte/partner#top">Zum Shop</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Product Card 4 - Tycoon Racers */}
            <div className="bg-[#00CFFF]/20 rounded-md overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1">
              <div className="relative">
                <img src="/images/Shop-Kategorien/kategorie_racers_trans.png" alt="Tycoon Racers" className="w-full h-40 object-contain" />
                <span className="absolute bottom-0 left-4 transform translate-y-1/2 bg-[#0A3A68]/70 text-white font-['Baloo_2'] font-bold px-4 py-2 rounded-md shadow-md">
                  Tycoon Racers
                </span>
              </div>
              <div className="p-6 pt-8">
                <p className="mb-6">Erreiche höhere Platzierungen bei Tycoon Racers Events und sichere dir exklusive Belohnungen!</p>
                <div className="flex justify-center">
                  <Button variant="darkblue" asChild className="font-bold">
                    <Link href="/produkte/race#top">Zum Shop</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="ueber" className="py-8 bg-gray-100 my-12 rounded-xl scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="babix-info-header mx-auto mb-6 text-center">
            Warum du babixGO wählen solltest
          </h2>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="mb-4">Es ist kein Geheimnis: Am Ende gewinnt immer die Bank. Daran können wir auch nichts ändern. Was wir allerdings können: Den Wert der Würfel soweit verschieben, dass Event-, Set- und Albumabschlüsse für jeden möglich sind.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#0A3A68] text-lg flex items-center">
                    <span className="material-icons text-[#FF4C00] mr-2">check_circle</span>
                    Alles aus einer Hand
                  </h3>
                  <p className="ml-8 text-[#0A3A68]/80">Würfelboosts, Sticker, Solo-, Team- und Partnerevents sowie komplette Accounts – und das alles an einem Ort.</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-[#0A3A68] text-lg flex items-center">
                    <span className="material-icons text-[#FF4C00] mr-2">check_circle</span>
                    Persönlicher Service über WhatsApp
                  </h3>
                  <p className="ml-8 text-[#0A3A68]/80">Direkter Kontakt, individuelle Betreuung und schnelle Antworten. Bei babixGO bekommst du den Service, den du verdienst.</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-[#0A3A68] text-lg flex items-center">
                    <span className="material-icons text-[#FF4C00] mr-2">check_circle</span>
                    Technisches Verständnis & Accountsicherheit
                  </h3>
                  <p className="ml-8 text-[#0A3A68]/80">Mit fundiertem Wissen über die Spielmechaniken, Sicherheitsmaßnahmen und Tracking-Funktionen sorgen wir dafür, dass dein Account in sicheren Händen bleibt.</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-[#0A3A68] text-lg flex items-center">
                    <span className="material-icons text-[#FF4C00] mr-2">check_circle</span>
                    Kontinuität und Erfahrung
                  </h3>
                  <p className="ml-8 text-[#0A3A68]/80">Seit dem Release von Monopoly Go ist babixGO am Puls der Zeit und bringt fast zwei Jahre Erfahrung und Leidenschaft für das Spiel mit.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-bold text-[#0A3A68] text-xl mb-2">Dein Vorteil:</h3>
                
                <div>
                  <h3 className="font-bold text-[#0A3A68] text-lg flex items-center">
                    <span className="material-icons text-[#FF4C00] mr-2">check_circle</span>
                    Faire Preise
                  </h3>
                  <p className="ml-8 text-[#0A3A68]/80">Wir legen großen Wert darauf, dir einen fairen und erschwinglichen Preis anzubieten - für jedes Budget ist etwas passendes dabei. Durch Gewinnspiele können wir auch an die etwas geben, die kein Geld für Monopoly Go ausgeben möchten.</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-[#0A3A68] text-lg flex items-center">
                    <span className="material-icons text-[#FF4C00] mr-2">check_circle</span>
                    Zuverlässige Leistungen
                  </h3>
                  <p className="ml-8 text-[#0A3A68]/80">Wir reagieren schnell auf Änderungen im Spiel. Durch unser inzwischen großes Netzwerk bemerken wir Änderungen früh und können dadurch schon Lösungen präsentieren bevor überhaupt alle Accounts betroffen sind.</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-[#0A3A68] text-lg flex items-center">
                    <span className="material-icons text-[#FF4C00] mr-2">check_circle</span>
                    Transparente Kommunikation
                  </h3>
                  <p className="ml-8 text-[#0A3A68]/80">Egal, ob es unsere Angebote und Preise betrifft, Änderungen an der Spielmechanik die Dich und deinen Account betreffen könnten oder es sich um dein Feedback handelt. Je offener wir miteinander sprechen, desto unkomplizierter Dein Erlebnis.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}