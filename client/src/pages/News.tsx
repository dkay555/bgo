import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function News() {
  return (
    <main className="px-0 py-0 md:py-0 flex-grow font-['Nunito_Sans'] text-[#0A3A68] bg-[#e0f7ff]">
      
      {/* Hero Section - im Stil der Startseite */}
      <section className="py-0 md:py-0 relative overflow-hidden">
        {/* Gradient Background für News-Seite */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#78c6f7] via-[#5ba3d9] to-[#e0f7ff] z-0">
          {/* Hintergrund ohne dekorative Elemente - sauberer Look */}
        </div>

        {/* News Hero Image und Box */}
        <div className="max-w-lg mx-auto pt-0 md:pt-2 pb-0 relative px-4 z-10 flex flex-col h-full">
          {/* News Image */}
          <div className="w-full max-w-md mx-auto mb-3 mt-2 relative flex justify-center">
            <img 
              src="/images/hero/news_hero.png" 
              alt="Monopoly GO News" 
              className="w-full max-w-[320px] md:max-w-[380px] h-auto object-contain"
            />
          </div>

          {/* News Text Box */}
          <div className="bg-[#b0d6f5] rounded-xl shadow-lg px-4 sm:px-6 md:px-8 pt-1 pb-2 text-center mb-6 sm:mb-8">
            <h1 className="text-[#FF4C00] font-bold text-2xl sm:text-3xl md:text-4xl mt-0 mb-0">
              News & Updates
            </h1>
            <p className="text-[#0A3A68] text-base sm:text-lg md:text-xl mt-0 font-bold">
              Die neuesten Informationen zu Monopoly GO
            </p>
          </div>
        </div>
      </section>
      
      {/* Einfacher direkter Übergang ohne Effekte */}
      <div className="h-4"></div>

      {/* News Content */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 md:gap-8">
            {/* News Item 1 */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-[#00CFFF]/10 border-b border-[#00CFFF]/20">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-[#00CFFF]">feed</span>
                    <span>Neue Preise für Würfel - Angebotsanpassung</span>
                  </div>
                  <span className="text-sm text-gray-500">14.05.2025</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="mb-4">
                  Die letzten Tage war es still um babixGO... Wir haben uns und unser Vorgehen hinterfragt, 
                  daraufhin unsere "Anti-Anticheat Maßnahmen" überdacht, überarbeitet und an über 200 Accounts getestet 
                  & zu guter letzt an unserem Angebot & der Preisliste gearbeitet.
                </p>
                <p className="mb-4">
                  Das Ergebnis: Unsere Würfelboosts sind jetzt noch sicherer und wir können euch 
                  optimierte Pakete mit besserem Preis-Leistungs-Verhältnis anbieten.
                </p>
                <div className="flex justify-end">
                  <Link href="/news/mai_preise">
                    <Button variant="outline" className="text-sm px-3 py-1">
                      [Weiterlesen]
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* News Item 2 */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-[#00CFFF]/10 border-b border-[#00CFFF]/20">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-[#00CFFF]">emoji_events</span>
                    <span>Tycoon Racers - Optimierte Teamplätze</span>
                  </div>
                  <span className="text-sm text-gray-500">10.05.2025</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="mb-4">
                  Für das nächste Tycoon Racers Event haben wir unsere Teams optimiert und bieten jetzt 
                  noch bessere Platzierungschancen. Unsere Teams erreichen regelmäßig die Top-Plätze, und 
                  du kannst Teil davon sein!
                </p>
                <p className="mb-4">
                  Außerdem haben wir unser Flaggen-Angebot erweitert, um dir noch mehr Möglichkeiten zu bieten, 
                  im Event erfolgreich zu sein.
                </p>
                <div className="flex justify-end">
                  <Link href="/shop/tycoonracers">
                    <Button variant="outline" className="text-sm px-3 py-1">
                      [Zu den Angeboten]
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* News Item 3 */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-[#00CFFF]/10 border-b border-[#00CFFF]/20">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-[#00CFFF]">collections_bookmark</span>
                    <span>Neue Sticker verfügbar</span>
                  </div>
                  <span className="text-sm text-gray-500">05.05.2025</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="mb-4">
                  Mit dem neuen Album-Update sind viele neue Sticker ins Spiel gekommen. Unser Angebot wurde 
                  entsprechend aktualisiert, und wir haben jetzt über 250 verschiedene Sticker im Angebot.
                </p>
                <p className="mb-4">
                  Vervollständige deine Sammlung noch heute und sichere dir die wertvollen Belohnungen für 
                  komplette Sets!
                </p>
                <div className="flex justify-end">
                  <Link href="/shop/sticker">
                    <Button variant="outline" className="text-sm px-3 py-1">
                      [Sticker ansehen]
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}