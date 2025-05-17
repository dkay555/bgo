import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function News() {
  return (
    <main className="px-4 py-6 md:py-10 flex-grow font-['Nunito_Sans'] text-[#0A3A68]">
      {/* Hero Section */}
      <section className="py-6 md:py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A3A68]/10 to-[#00CFFF]/10 animate-gradient-x"></div>
        <div className="max-w-4xl mx-auto relative px-4">
          <div className="text-center mb-8">
            <h1 className="babix-info-header font-bold text-3xl md:text-4xl px--2 py-2">
              News & Updates
            </h1>
            <p className="text-base md:text-lg mb-6">Die neuesten Informationen zu Monopoly GO und unseren Angeboten</p>
          </div>
        </div>
      </section>

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
                  <Link href="/hilfe/news_preise_angebot.html">
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
                  <Link href="/produkte/sticker">
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