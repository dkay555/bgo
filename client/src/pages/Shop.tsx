import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, DollarSign, Users, Trophy, ClipboardList } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

export default function Shop() {
  return (
    <main className="px-0 py-0 md:py-0 flex-grow font-['Nunito_Sans'] text-[#0A3A68] bg-[#e0f7ff]">
      <SEOHead 
        pageName="Shop" 
        customTitle="Monopoly Go Shop | babixGO" 
        customDescription="Finde alles, was dein Monopoly Go Herz höher schlagen lässt - Würfel, Sticker, Partnerevents und mehr."
      />
      
      {/* Hero Section - im Stil der Startseite */}
      <section className="py-0 md:py-0 relative overflow-hidden">
        {/* Gradient Background für Shop-Seite */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#78c6f7] via-[#5ba3d9] to-[#e0f7ff] z-0">
          {/* Hintergrund ohne dekorative Elemente - sauberer Look */}
        </div>

        {/* Shop Hero Image und Box */}
        <div className="max-w-lg mx-auto pt-0 md:pt-2 pb-0 relative px-4 z-10 flex flex-col h-full">
          {/* Shop Image */}
          <div className="w-full max-w-md mx-auto mb-3 mt-2 relative flex justify-center">
            <img 
              src="/src/assets/shop_hero.png" 
              alt="Monopoly GO Shop" 
              className="w-full max-w-[320px] md:max-w-[380px] h-auto object-contain"
            />
          </div>

          {/* Shop Text Box */}
          <div className="bg-[#b0d6f5] rounded-xl shadow-lg px-4 sm:px-6 md:px-8 pt-1 pb-2 text-center mb-6 sm:mb-8">
            <h1 className="text-[#FF4C00] font-bold text-2xl sm:text-3xl md:text-4xl mt-0 mb-0">
              Monopoly Go Shop
            </h1>
            <p className="text-[#0A3A68] text-base sm:text-lg md:text-xl mt-0 font-bold">
              Monopoly Go Würfel, Sticker und mehr
            </p>
          </div>
        </div>
      </section>
      
      {/* Einfacher direkter Übergang ohne Effekte */}
      <div className="h-4"></div>

      {/* Shop Categories */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Übersicht */}
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardHeader className="bg-[#00CFFF]/10 border-b border-[#00CFFF]/20">
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-5 w-5 text-[#00CFFF]" />
                  <span>Übersicht</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="mb-4">
                  Verschaffe dir einen Überblick über unser Angebot! Alle Produkte und Preise auf einen Blick.
                </p>
                <div className="flex justify-end">
                  <Link href="/shop/uebersicht">
                    <Button variant="outline" className="text-sm px-3 py-1">
                      Zur Übersicht
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Würfel */}
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardHeader className="bg-[#00CFFF]/10 border-b border-[#00CFFF]/20">
                <CardTitle className="flex items-center gap-2">
                  <span className="material-icons text-[#00CFFF]">casino</span>
                  <span>Würfel</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="mb-4">
                  Würfel für deinen Monopoly Go Account. Verschiedene Pakete für alle Bedürfnisse.
                </p>
                <div className="flex justify-end">
                  <Link href="/shop/wuerfel">
                    <Button variant="outline" className="text-sm px-3 py-1">
                      Würfel kaufen
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Sticker */}
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardHeader className="bg-[#00CFFF]/10 border-b border-[#00CFFF]/20">
                <CardTitle className="flex items-center gap-2">
                  <span className="material-icons text-[#00CFFF]">collections_bookmark</span>
                  <span>Sticker</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="mb-4">
                  Wir haben sie alle! Vervollständige deine Sammlung mit unseren Stickern.
                </p>
                <div className="flex justify-end">
                  <Link href="/shop/sticker">
                    <Button variant="outline" className="text-sm px-3 py-1">
                      Sticker ansehen
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Partnerevent */}
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardHeader className="bg-[#00CFFF]/10 border-b border-[#00CFFF]/20">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#00CFFF]" />
                  <span>Partnerevent</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="mb-4">
                  Hier findest du einen zuverlässigen Partner oder Eventwährung für gemeinsames Spielen!
                </p>
                <div className="flex justify-end">
                  <Link href="/shop/partnerevent">
                    <Button variant="outline" className="text-sm px-3 py-1">
                      Partner finden
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Tycoon Racers */}
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg md:col-span-2">
              <CardHeader className="bg-[#00CFFF]/10 border-b border-[#00CFFF]/20">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-[#00CFFF]" />
                  <span>Tycoon Racers</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="mb-4">
                  Sichere dir einen Teamplatz oder lass uns für dich Flaggen sammeln! Maximiere deine Gewinne bei Tycoon Racers Events.
                </p>
                <div className="flex justify-end">
                  <Link href="/shop/tycoonracers">
                    <Button variant="outline" className="text-sm px-3 py-1">
                      Team beitreten
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-[#0A3A68] text-white">
            <CardContent className="pt-6 pb-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Brauchst du Hilfe bei der Auswahl?</h2>
                <p className="mb-6">Kontaktiere uns und wir beraten dich persönlich zu deinen Bedürfnissen.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button variant="cyan" asChild className="font-bold">
                    <Link href="/kontakt">
                      Kontakt aufnehmen
                    </Link>
                  </Button>
                  <Button variant="orange" asChild className="font-bold">
                    <Link href="/hilfe">
                      Hilfebereich besuchen
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}