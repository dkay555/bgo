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
        {/* Monopoly GO Board Background */}
        <div className="absolute inset-0 bg-[#43B7BE] z-0">
          {/* Background Game Board Grid */}
          <div className="absolute inset-0">
            <svg width="100%" height="100%" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
              {/* Grid lines */}
              <pattern id="boardGrid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#2D9CA6" strokeWidth="2"/>
              </pattern>
              <rect width="800" height="800" fill="url(#boardGrid)" />
              
              {/* Colored squares */}
              <rect x="300" y="100" width="100" height="100" fill="#F7A14C" fillOpacity="0.7"/>
              <rect x="500" y="200" width="100" height="100" fill="#F7A14C" fillOpacity="0.7"/>
              <rect x="100" y="400" width="100" height="100" fill="#F7A14C" fillOpacity="0.7"/>
              <rect x="600" y="500" width="100" height="100" fill="#F7A14C" fillOpacity="0.7"/>
            </svg>
          </div>
        </div>
        
        {/* Monopoly GO Content */}
        <div className="max-w-lg mx-auto pt-4 md:pt-6 pb-0 relative px-4 z-10 flex flex-col h-full">
          {/* Game Elements Container */}
          <div className="w-full max-w-md mx-auto mb-4 relative">
            <div className="w-full relative h-[300px] sm:h-[350px]">
              {/* Happy Dice */}
              <div className="absolute right-[10%] top-[10%] w-[150px] h-[150px] md:w-[180px] md:h-[180px]">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  {/* Dice body with shadow */}
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="4" dy="4" stdDeviation="5" floodOpacity="0.3"/>
                  </filter>
                  <rect x="10" y="10" width="180" height="180" rx="20" fill="white" filter="url(#shadow)"/>
                  
                  {/* Dice dots */}
                  <circle cx="50" cy="50" r="12" fill="#333333"/>
                  <circle cx="150" cy="50" r="12" fill="#333333"/>
                  <circle cx="50" cy="150" r="12" fill="#333333"/>
                  <circle cx="150" cy="150" r="12" fill="#333333"/>
                  <circle cx="100" cy="100" r="12" fill="#333333"/>
                  
                  {/* Happy face */}
                  <path d="M70 100 Q100 130 130 100" stroke="#333333" strokeWidth="8" fill="none"/>
                </svg>
              </div>
              
              {/* Coins */}
              <div className="absolute left-[5%] top-[20%] w-[80px] h-[80px] md:w-[100px] md:h-[100px]">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <filter id="coinShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3"/>
                  </filter>
                  <circle cx="50" cy="50" r="45" fill="#FFBE16" filter="url(#coinShadow)"/>
                  <circle cx="50" cy="50" r="40" fill="#FFD756"/>
                  <text x="50" y="60" textAnchor="middle" fontSize="40" fontWeight="bold" fill="#C17E0F">$</text>
                </svg>
              </div>
              
              <div className="absolute left-[25%] top-[10%] w-[70px] h-[70px] md:w-[90px] md:h-[90px]">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="45" fill="#FFBE16" filter="url(#coinShadow)"/>
                  <circle cx="50" cy="50" r="40" fill="#FFD756"/>
                  <text x="50" y="60" textAnchor="middle" fontSize="40" fontWeight="bold" fill="#C17E0F">$</text>
                </svg>
              </div>
              
              <div className="absolute left-[15%] bottom-[35%] w-[60px] h-[60px] md:w-[80px] md:h-[80px]">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="45" fill="#FFBE16" filter="url(#coinShadow)"/>
                  <circle cx="50" cy="50" r="40" fill="#FFD756"/>
                  <text x="50" y="60" textAnchor="middle" fontSize="40" fontWeight="bold" fill="#C17E0F">$</text>
                </svg>
              </div>
              
              {/* Game cards in background */}
              <div className="absolute right-[15%] bottom-[25%] w-[70px] h-[70px] rotate-12">
                <svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="5" width="70" height="90" rx="5" fill="#E9F7F8" stroke="#2D9CA6" strokeWidth="2" filter="url(#shadow)"/>
                  <text x="40" y="55" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#2D9CA6">CHANCE</text>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Welcome Box with Buttons */}
          <div className="bg-[rgba(228,247,250,0.8)] backdrop-blur-sm rounded-xl shadow-lg px-5 py-6 text-center mb-6 max-w-md mx-auto">
            <h1 className="text-[#FF4C00] font-bold text-3xl sm:text-4xl md:text-5xl mb-2">
              Willkommen bei babixGO!
            </h1>
            <p className="text-[#0A3A68] text-base sm:text-lg md:text-xl mb-6">
              Würfel, Events, Sticker & mehr – alles für dein Monopoly GO Abenteuer.
            </p>
          
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