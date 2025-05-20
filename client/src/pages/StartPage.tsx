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
      <section className="py-0 md:py-0 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#1e71b8] z-0">
          {/* Background Monopoly Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-[10%] left-[8%] opacity-20">
              <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="90" height="90" rx="10" fill="#b0d6f5" stroke="#b0d6f5" strokeWidth="2"/>
                <circle cx="25" cy="25" r="8" fill="#0A3A68"/>
                <circle cx="75" cy="25" r="8" fill="#0A3A68"/>
                <circle cx="50" cy="50" r="8" fill="#0A3A68"/>
                <circle cx="25" cy="75" r="8" fill="#0A3A68"/>
                <circle cx="75" cy="75" r="8" fill="#0A3A68"/>
              </svg>
            </div>
            <div className="absolute top-[60%] left-[12%] opacity-20">
              <svg width="100" height="70" viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 10H90V60H10V10Z" fill="#b0d6f5"/>
                <path d="M20 20H80V50H20V20Z" fill="#1e71b8"/>
                <path d="M30 30C30 25 70 25 70 30V40C70 45 30 45 30 40V30Z" fill="#b0d6f5"/>
                <path d="M40 22V50" stroke="#b0d6f5" strokeWidth="2"/>
                <path d="M60 22V50" stroke="#b0d6f5" strokeWidth="2"/>
                <rect x="45" y="15" width="10" height="5" fill="#b0d6f5"/>
              </svg>
            </div>
            <div className="absolute top-[15%] right-[12%] opacity-20">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="40" fill="#b0d6f5"/>
                <path d="M50 10C60 30 80 40 80 60C80 75 65 85 55 80C50 85 50 90 50 90C50 90 50 85 45 80C35 85 20 75 20 60C20 40 40 30 50 10Z" fill="#b0d6f5" stroke="#b0d6f5" strokeWidth="3"/>
              </svg>
            </div>
            <div className="absolute bottom-[15%] right-[15%] opacity-20">
              <svg width="100" height="70" viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 20C20 15 30 10 50 10C70 10 80 15 80 20V60C80 65 70 70 50 70C30 70 20 65 20 60V20Z" fill="#b0d6f5"/>
                <ellipse cx="50" cy="15" rx="25" ry="5" fill="#1e71b8"/>
                <path d="M30 25H70V45H30V25Z" fill="#1e71b8"/>
                <path d="M35 35H65" stroke="#b0d6f5" strokeWidth="2"/>
                <path d="M40 30V40" stroke="#b0d6f5" strokeWidth="2"/>
                <path d="M60 30V40" stroke="#b0d6f5" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Monopoly GO Logo and Character */}
        <div className="max-w-lg mx-auto pt-6 pb-0 relative px-4 z-10">
          <div className="flex flex-col items-center justify-center relative mb-4">
            {/* Mr. Monopoly Character */}
            <div className="w-full max-w-[300px] relative flex justify-center mb-2">
              <svg width="260" height="180" viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="z-10">
                {/* Dice */}
                <g className="dice-left">
                  <rect x="20" y="50" width="60" height="60" rx="6" fill="#b0d6f5" fillOpacity="0.8"/>
                  <circle cx="35" cy="65" r="6" fill="#0A3A68"/>
                  <circle cx="65" cy="65" r="6" fill="#0A3A68"/>
                  <circle cx="50" cy="80" r="6" fill="#0A3A68"/>
                  <circle cx="35" cy="95" r="6" fill="#0A3A68"/>
                  <circle cx="65" cy="95" r="6" fill="#0A3A68"/>
                </g>
                
                {/* Money/Card */}
                <g className="money-right">
                  <rect x="180" y="80" width="50" height="60" rx="6" fill="#ffcb54"/>
                  <text x="205" y="120" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#c17e0f">5</text>
                </g>
                
                {/* Mr. Monopoly */}
                <g className="mr-monopoly">
                  {/* Top Hat */}
                  <rect x="95" y="20" width="70" height="10" rx="2" fill="#080808"/>
                  <rect x="105" y="10" width="50" height="20" rx="1" fill="#080808"/>
                  
                  {/* Face */}
                  <circle cx="130" cy="60" r="30" fill="#ffdccd"/>
                  
                  {/* Eyes */}
                  <circle cx="120" cy="50" r="5" fill="white"/>
                  <circle cx="122" cy="50" r="2" fill="black"/>
                  <circle cx="140" cy="50" r="5" fill="white"/>
                  <circle cx="142" cy="50" r="2" fill="black"/>
                  <path d="M115 45 Q120 40 125 45" stroke="white" strokeWidth="2" fill="none"/>
                  <path d="M135 45 Q140 40 145 45" stroke="white" strokeWidth="2" fill="none"/>
                  
                  {/* Mustache */}
                  <path d="M115 65 Q130 75 145 65" stroke="#ffffff" strokeWidth="10" fill="none"/>
                  <path d="M115 65 Q130 75 145 65" stroke="#f0f0f0" strokeWidth="8" fill="none"/>
                  
                  {/* Mouth */}
                  <path d="M120 70 Q130 78 140 70" stroke="black" strokeWidth="2" fill="none"/>
                  
                  {/* Suit */}
                  <rect x="110" y="90" width="40" height="50" rx="5" fill="#080808"/>
                  <rect x="120" y="90" width="20" height="20" rx="2" fill="white"/>
                  <rect x="125" y="90" width="10" height="15" rx="1" fill="#f03030"/>
                  
                  {/* Cane */}
                  <rect x="85" y="50" width="5" height="80" rx="2" fill="#080808"/>
                  <path d="M85 50 Q75 40 85 30" stroke="#080808" strokeWidth="5" fill="none"/>
                  
                  {/* Arms */}
                  <path d="M110 100 Q100 110 90 100" stroke="#080808" strokeWidth="6" fill="none"/>
                  <path d="M150 100 Q170 110 175 90" stroke="#080808" strokeWidth="6" fill="none"/>
                </g>
              </svg>
            </div>
            
            {/* Monopoly GO! Logo */}
            <div className="w-full max-w-[280px] bg-[#ec1c24] text-white py-2 px-4 rounded-md border-4 border-white shadow-lg -mt-2">
              <h2 className="text-center font-bold tracking-wider text-3xl">MONOPOLY</h2>
            </div>
            <div className="w-full max-w-[160px] bg-[#1e71b8] text-white py-1 px-4 rounded-full border-4 border-white shadow-lg -mt-3 mb-4">
              <h2 className="text-center font-bold tracking-wider text-2xl">GO!</h2>
            </div>
          </div>
          
          {/* Welcome Text Box */}
          <div className="bg-[#b0d6f5] rounded-xl shadow-lg px-8 py-6 text-center mb-6">
            <h1 className="text-[#FF4C00] font-bold text-4xl mb-2">
              Willkommen bei babixGO
            </h1>
            <p className="text-[#0A3A68] text-xl">
              Würfel, Events, Sticker & mehr – alles für dein Monopoly GO Abenteuer
            </p>
          </div>
          
          {/* Navigation Buttons - 2 Rows */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-5">
            <Button variant="darkblue" asChild className="font-bold flex items-center justify-center gap-2 h-14 w-full text-lg shadow-md">
              <Link href="/news">
                <span className="material-icons">feed</span>
                News
              </Link>
            </Button>
            
            <Button variant="orange" asChild className="font-bold flex items-center justify-center gap-2 h-14 w-full text-lg shadow-md">
              <Link href="/shop">
                <span className="material-icons">shopping_cart</span>
                Shop
              </Link>
            </Button>
            
            <Button variant="darkblue" asChild className="font-bold flex items-center justify-center gap-2 h-14 w-full text-lg shadow-md">
              <Link href="/hilfe">
                <span className="material-icons">help_outline</span>
                Hilfe
              </Link>
            </Button>
            
            <Button variant="cyan" asChild className="font-bold flex items-center justify-center gap-2 h-14 w-full text-lg shadow-md">
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