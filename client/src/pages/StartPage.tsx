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
            {mounted && (
              <>
                <div className="absolute top-[10%] left-[5%] rotate-[15deg]">
                  <img src="/images/icons/dice.svg" alt="" className="w-16 h-16" />
                </div>
                <div className="absolute top-[15%] right-[15%] rotate-[-10deg]">
                  <img src="/images/icons/boot.svg" alt="" className="w-14 h-14" />
                </div>
                <div className="absolute top-[60%] left-[15%] rotate-[5deg]">
                  <img src="/images/icons/house.svg" alt="" className="w-16 h-16" />
                </div>
                <div className="absolute top-[30%] right-[5%] rotate-[20deg]">
                  <img src="/images/icons/spade.svg" alt="" className="w-14 h-14" />
                </div>
                <div className="absolute top-[70%] right-[10%] rotate-[-15deg]">
                  <img src="/images/icons/dice.svg" alt="" className="w-16 h-16" />
                </div>
              </>
            )}
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
            <div className="flex justify-center items-end gap-6 my-8 relative">
              <div className="relative">
                <img src="/images/icons/pawn.svg" alt="Spielfigur" className="w-10 h-10 md:w-14 md:h-14" />
              </div>
              
              <div className="relative z-10">
                {mounted && <DiceSpinner size={70} color="#ffffff" secondaryColor="#0A3A68" className="shadow-lg" />}
              </div>
              
              <div className="relative">
                <img src="/images/icons/house.svg" alt="Haus" className="w-10 h-10 md:w-14 md:h-14" />
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