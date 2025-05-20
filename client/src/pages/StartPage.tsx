import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { DiceSpinner } from '@/components/DiceSpinner';
import { useState, useEffect } from 'react';

export default function StartPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <main className="px-4 py-6 md:py-10 flex-grow font-['Nunito_Sans'] text-[#0A3A68]" id="top">
      {/* Hero Section - Basierend auf dem Design-Bild */}
      <section className="py-6 md:py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#e6f9ff] z-0">
          {/* Background Dice Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-[10%] left-[5%] rotate-[15deg]">
              <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="90" height="90" rx="10" fill="#ffffff" stroke="#0A3A68" strokeWidth="4"/>
                <circle cx="25" cy="25" r="8" fill="#0A3A68"/>
                <circle cx="75" cy="25" r="8" fill="#0A3A68"/>
                <circle cx="50" cy="50" r="8" fill="#0A3A68"/>
                <circle cx="25" cy="75" r="8" fill="#0A3A68"/>
                <circle cx="75" cy="75" r="8" fill="#0A3A68"/>
              </svg>
            </div>
            <div className="absolute top-[15%] right-[15%] rotate-[-10deg]">
              <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 80C30 80 20 50 20 40C20 30 30 25 35 25C40 25 40 30 45 30C55 30 70 15 75 15C80 15 85 20 80 25C75 30 65 40 65 40L80 60C80 60 85 70 80 75C75 80 30 80 30 80Z" fill="#00CFFF" stroke="#0A3A68" strokeWidth="3"/>
                <path d="M35 25C35 25 40 35 45 30" stroke="#0A3A68" strokeWidth="2"/>
                <path d="M65 40L75 50" stroke="#0A3A68" strokeWidth="2"/>
                <path d="M30 80H80C80 80 85 85 80 90C75 95 35 95 30 90C25 85 30 80 30 80Z" fill="#0A3A68"/>
                <circle cx="50" cy="35" r="5" fill="#ffffff" fillOpacity="0.6"/>
              </svg>
            </div>
            <div className="absolute top-[60%] left-[15%] rotate-[5deg]">
              <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 50V90H90V50L50 15L10 50Z" fill="#00CFFF" stroke="#0A3A68" strokeWidth="4"/>
                <path d="M5 50L50 10L95 50" stroke="#0A3A68" strokeWidth="4" strokeLinecap="round"/>
                <rect x="40" y="60" width="20" height="30" fill="#0A3A68"/>
                <rect x="65" y="60" width="15" height="15" fill="#ffffff" stroke="#0A3A68" strokeWidth="2"/>
                <rect x="20" y="60" width="15" height="15" fill="#ffffff" stroke="#0A3A68" strokeWidth="2"/>
              </svg>
            </div>
            <div className="absolute top-[30%] right-[5%] rotate-[20deg]">
              <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 10C60 30 85 40 85 60C85 75 70 85 60 80C55 85 50 90 50 90C50 90 45 85 40 80C30 85 15 75 15 60C15 40 40 30 50 10Z" fill="#00CFFF" stroke="#0A3A68" strokeWidth="3"/>
                <path d="M45 80C45 80 50 90 50 90C50 90 55 80 55 80" stroke="#0A3A68" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="40" cy="50" r="5" fill="#ffffff" fillOpacity="0.6"/>
              </svg>
            </div>
            <div className="absolute top-[70%] right-[10%] rotate-[-15deg]">
              <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="90" height="90" rx="10" fill="#ffffff" stroke="#0A3A68" strokeWidth="4"/>
                <circle cx="25" cy="25" r="8" fill="#0A3A68"/>
                <circle cx="75" cy="25" r="8" fill="#0A3A68"/>
                <circle cx="50" cy="50" r="8" fill="#0A3A68"/>
                <circle cx="25" cy="75" r="8" fill="#0A3A68"/>
                <circle cx="75" cy="75" r="8" fill="#0A3A68"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto relative px-4 z-10">
          <div className="text-center mb-10 relative">
            <h2 className="font-bold text-[#0A3A68] text-3xl md:text-4xl mb-4">
              babixGO
            </h2>
            
            <h1 className="babix-info-header font-bold text-4xl md:text-5xl mb-4">
              Willkommen bei babixGO!
            </h1>
            
            <p className="text-base md:text-lg mb-8">
              Würfel, Events, Sticker & mehr – alles für dein Monopoly GO Abenteuer
            </p>
            
            {/* Dice Illustrations */}
            <div className="flex justify-center items-end gap-10 my-8 relative">
              <div className="relative bg-white rounded-full p-2 shadow-md">
                <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-125">
                  {/* Base */}
                  <ellipse cx="50" cy="85" rx="30" ry="10" fill="#0A3A68"/>
                  
                  {/* Stem */}
                  <path d="M40 85V55C40 45 60 45 60 55V85" fill="#00CFFF" stroke="#0A3A68" strokeWidth="3"/>
                  
                  {/* Head */}
                  <circle cx="50" cy="35" r="20" fill="#00CFFF" stroke="#0A3A68" strokeWidth="3"/>
                  
                  {/* Highlight */}
                  <circle cx="45" cy="30" r="5" fill="#ffffff" fillOpacity="0.6"/>
                </svg>
              </div>
              
              <div className="relative z-10">
                {mounted && <DiceSpinner size={70} color="#ffffff" secondaryColor="#0A3A68" className="shadow-lg" />}
              </div>
              
              <div className="relative bg-white rounded-md p-2 shadow-md">
                <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-125">
                  {/* House Base */}
                  <path d="M10 50V90H90V50L50 15L10 50Z" fill="#00CFFF" stroke="#0A3A68" strokeWidth="4"/>
                  
                  {/* Roof */}
                  <path d="M5 50L50 10L95 50" stroke="#0A3A68" strokeWidth="4" strokeLinecap="round"/>
                  
                  {/* Door */}
                  <rect x="40" y="60" width="20" height="30" fill="#0A3A68"/>
                  
                  {/* Window */}
                  <rect x="65" y="60" width="15" height="15" fill="#ffffff" stroke="#0A3A68" strokeWidth="2"/>
                  <rect x="20" y="60" width="15" height="15" fill="#ffffff" stroke="#0A3A68" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            
            {/* Navigation Buttons - 2 Rows (3+2) */}
            <div className="flex flex-col gap-3 mt-6 max-w-lg mx-auto">
              {/* First Row - 3 Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <Button variant="darkblue" asChild className="font-bold flex items-center justify-center gap-1 h-12 w-full text-sm">
                  <Link href="/news">
                    <span className="material-icons text-base">feed</span>
                    News
                  </Link>
                </Button>
                
                <Button variant="cyan" asChild className="font-bold flex items-center justify-center gap-1 h-12 w-full text-sm">
                  <Link href="/shop">
                    <span className="material-icons text-base">shopping_cart</span>
                    Shop
                  </Link>
                </Button>
                
                <Button variant="orange" asChild className="font-bold flex items-center justify-center gap-1 h-12 w-full text-sm">
                  <Link href="/auth">
                    <span className="material-icons text-base">person</span>
                    Login
                  </Link>
                </Button>
              </div>
              
              {/* Second Row - 2 Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="darkblue" asChild className="font-bold flex items-center justify-center gap-1 h-12 w-full text-sm">
                  <Link href="/hilfe">
                    <span className="material-icons text-base">help_outline</span>
                    Hilfe
                  </Link>
                </Button>
                
                <Button variant="cyan" asChild className="font-bold flex items-center justify-center gap-1 h-12 w-full text-sm">
                  <Link href="/kontakt">
                    <span className="material-icons text-base">contact_support</span>
                    Kontakt
                  </Link>
                </Button>
              </div>
            </div>
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

      {/* Der Kontaktbereich wurde entfernt, da Kunden jetzt direkt über PayPal kaufen können */}
    </main>
  );
}