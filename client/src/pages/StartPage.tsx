import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useState, useEffect } from 'react';

export default function StartPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="px-0 py-0 md:py-0 flex-grow font-['Nunito_Sans'] text-[#0A3A68] bg-[#e0f7ff]" id="top">
      {/* Hero Section - Monopoly GO Style */}
      <section className="py-0 md:py-0 relative overflow-hidden">
        {/* Gradient Background for Monopoly GO - Fading to very light cyan at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#78c6f7] via-[#5ba3d9] to-[#e0f7ff] z-0">
          {/* Hintergrund ohne dekorative Elemente - sauberer Look */}
        </div>

        {/* Monopoly GO Image - New Version */}
        <div className="max-w-lg mx-auto pt-0 md:pt-2 pb-0 relative px-4 z-10 flex flex-col h-full">
          {/* Monopoly GO Character and Logo - Using the hero image */}
          <div className="w-full max-w-md mx-auto mb-3 mt-2 relative flex justify-center">
            <img 
              src="/src/assets/hero_startseite.png" 
              alt="Monopoly GO" 
              className="w-full max-w-[320px] md:max-w-[380px] h-auto object-contain"
            />
          </div>

          {/* Welcome Text Box - Responsive padding and text */}
          <div className="bg-[#b0d6f5] rounded-xl shadow-lg px-4 sm:px-6 md:px-8 pt-1 pb-2 text-center mb-6 sm:mb-8">
            <h1 className="text-[#FF4C00] font-bold text-2xl sm:text-3xl md:text-4xl mt-0 mb-0">
              Willkommen bei babixGO
            </h1>
            <p className="text-[#0A3A68] text-base sm:text-lg md:text-xl mt-0 font-bold">
              Würfel, Events, Sticker & mehr – alles für dein Monopoly GO Abenteuer
            </p>
          </div>

          {/* Navigation Buttons - Mobile optimized layout */}
          <div className="w-full max-w-md mx-auto mb-5">
            {/* Erste Reihe: 3 Buttons */}
            <div className="grid grid-cols-3 gap-2 mb-2">
              <Button variant="darkblue" asChild className="font-bold flex items-center justify-center gap-1 h-10 sm:h-12 w-full text-sm sm:text-base shadow-md">
                <Link href="/news">
                  <span className="material-icons text-sm sm:text-base">feed</span>
                  News
                </Link>
              </Button>

              <Button variant="orange" asChild className="font-bold flex items-center justify-center gap-1 h-10 sm:h-12 w-full text-sm sm:text-base shadow-md">
                <Link href="/shop">
                  <span className="material-icons text-sm sm:text-base">shopping_cart</span>
                  Shop
                </Link>
              </Button>

              <Button variant="cyan" asChild className="font-bold flex items-center justify-center gap-1 h-10 sm:h-12 w-full text-sm sm:text-base shadow-md">
                <Link href="/auth-page">
                  <span className="material-icons text-sm sm:text-base">login</span>
                  Login
                </Link>
              </Button>
            </div>

            {/* Zweite Reihe: 2 Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button variant="darkblue" asChild className="font-bold flex items-center justify-center gap-1 h-10 sm:h-12 w-full text-sm sm:text-base shadow-md">
                <Link href="/hilfe">
                  <span className="material-icons text-sm sm:text-base">help_outline</span>
                  <span>Hilfe</span>
                </Link>
              </Button>

              <Button variant="cyan" asChild className="font-bold flex items-center justify-center gap-1 h-10 sm:h-12 w-full text-sm sm:text-base shadow-md">
                <Link href="/kontakt">
                  <span className="material-icons text-sm sm:text-base">contact_support</span>
                  <span>Kontakt</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Einfacher direkter Übergang ohne Effekte */}
      <div className="h-2"></div>

      {/* News-Sektion mit hellcyan Hintergrund */}
      <section className="pt-0 pb-6 bg-[#e0f7ff]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="babix-info-header mx-auto mb-3 text-center">News</h2>

          <div className="bg-white rounded-lg shadow-md p-3 pb-4">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-bold text-[#0A3A68] text-xl mt-0">Neue Preise für Würfel - Angebotsanpassung</h3>
              <Link href="/hilfe/news_preise_angebot.html">
                <Button variant="darkblue" className="text-xs px-2 py-0.5 h-auto whitespace-nowrap ml-2">
                  weiterlesen →
                </Button>
              </Link>
            </div>
            <p className="text-[#0A3A68]/80 mb-3">
              Die letzten Tage war es still um babixGO... Wir haben unser Angebot überarbeitet und optimiert.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section mit einheitlichem Hintergrund */}
      <section id="angebote" className="py-8 scroll-mt-20 bg-[#e0f7ff]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="babix-info-header mx-auto mb-8 text-center">
            Was wir dir bieten:
          </h2>

          <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            {/* Würfelboost Karte */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden text-center p-3 p-md-5">
              <div className="flex justify-center mb-2 md:mb-4">
                <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center">
                  <img src="/images/Shop-Kategorien/kategorie_wuerfel_trans.png" alt="Würfelboosts" className="h-16 md:h-24 object-contain" />
                </div>
              </div>
              <h3 className="text-[#0A3A68] text-xl md:text-2xl font-bold mb-1 md:mb-2">Würfelboost</h3>
              <p className="text-gray-700 mb-3 md:mb-4 text-sm md:text-base">Mehr Würfel, schneller Fortschritt!</p>
              <Button variant="orange" asChild className="w-full font-bold text-sm md:text-base">
                <Link href="/produkte/wuerfel#top">Jetzt entdecken</Link>
              </Button>
            </div>

            {/* Sticker Karte */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden text-center p-3 p-md-5">
              <div className="flex justify-center mb-2 md:mb-4">
                <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center">
                  <img src="/images/Shop-Kategorien/kategorie_sticker_trans.png" alt="Sticker" className="h-16 md:h-24 object-contain" />
                </div>
              </div>
              <h3 className="text-[#0A3A68] text-xl md:text-2xl font-bold mb-1 md:mb-2">Sticker</h3>
              <p className="text-gray-700 mb-3 md:mb-4 text-sm md:text-base">Besondere Sticker für dein Album</p>
              <Button variant="orange" asChild className="w-full font-bold text-sm md:text-base">
                <Link href="/produkte/sticker#top">Jetzt entdecken</Link>
              </Button>
            </div>

            {/* Partner Event Karte */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden text-center p-3 p-md-5">
              <div className="flex justify-center mb-2 md:mb-4">
                <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center">
                  <img src="/images/Shop-Kategorien/kategorie_partner_trans.png" alt="Partnerevents" className="h-16 md:h-24 object-contain" />
                </div>
              </div>
              <h3 className="text-[#0A3A68] text-xl md:text-2xl font-bold mb-1 md:mb-2">Partnerevent</h3>
              <p className="text-gray-700 mb-3 md:mb-4 text-sm md:text-base">Gemeinsam mehr erreichen</p>
              <Button variant="orange" asChild className="w-full font-bold text-sm md:text-base">
                <Link href="/produkte/partner#top">Jetzt entdecken</Link>
              </Button>
            </div>
            
            {/* Tycoon Racers Karte */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden text-center p-3 p-md-5">
              <div className="flex justify-center mb-2 md:mb-4">
                <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center">
                  <img src="/images/Shop-Kategorien/kategorie_racers_trans.png" alt="Tycoon Racers" className="h-16 md:h-24 object-contain" />
                </div>
              </div>
              <h3 className="text-[#0A3A68] text-xl md:text-2xl font-bold mb-1 md:mb-2">Tycoon Racers</h3>
              <p className="text-gray-700 mb-3 md:mb-4 text-sm md:text-base">Top-Platzierungen sichern</p>
              <Button variant="orange" asChild className="w-full font-bold text-sm md:text-base">
                <Link href="/produkte/race#top">Jetzt entdecken</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section mit einheitlichem Hintergrund */}
      <section id="ueber" className="py-8 bg-[#e0f7ff] my-12 rounded-xl scroll-mt-20">
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