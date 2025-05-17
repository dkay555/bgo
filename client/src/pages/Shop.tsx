import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, DollarSign, Users, Trophy, ClipboardList } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

export default function Shop() {
  return (
    <main className="px-4 py-6 md:py-10 flex-grow font-['Nunito_Sans'] text-[#0A3A68]">
      <SEOHead 
        pageName="Shop" 
        customTitle="Monopoly Go Shop | babixGO" 
        customDescription="Finde alles, was dein Monopoly Go Herz höher schlagen lässt - Würfel, Sticker, Partnerevents und mehr."
      />
      
      {/* Hero Section */}
      <section className="py-6 md:py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A3A68]/10 to-[#00CFFF]/10 animate-gradient-x"></div>
        <div className="max-w-4xl mx-auto relative px-4">
          <div className="text-center mb-8">
            <h1 className="babix-info-header font-bold text-3xl md:text-4xl px--2 py-2">
              Monopoly Go Shop
            </h1>
            <p className="text-base md:text-lg mb-6">Hier bekommst du alles was dein Monopoly Go Herz höher schlagen lässt.</p>
          </div>
        </div>
      </section>

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
                  <Link href="/shop/preise">
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