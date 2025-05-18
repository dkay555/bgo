import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SEOHead from '@/components/SEOHead';

export default function HilfeUebersicht() {
  return (
    <main className="px-4 py-6 md:py-10 flex-grow font-['Nunito_Sans'] text-[#0A3A68]">
      {/* Hero Section */}
      <SEOHead 
        pageName="Hilfe & Support"
        customTitle="Hilfe & Support | babixGO"
        customDescription="Hilfestellungen und Anleitungen für alle Funktionen von Monopoly GO und babixGO"
      />
      
      <section className="py-6 md:py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A3A68]/10 to-[#00CFFF]/10 animate-gradient-x"></div>
        <div className="max-w-4xl mx-auto relative px-4">
          <div className="text-center mb-8">
            <h1 className="babix-info-header font-bold text-3xl md:text-4xl px--2 py-2">
              Hilfe & Support
            </h1>
            <p className="text-base md:text-lg mb-6">Anleitungen und Erklärungen zu Monopoly GO und unseren Angeboten</p>
          </div>
        </div>
      </section>

      {/* Hilfe Content */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Hilfe zu unseren Leistungen */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#0A3A68] mb-6 border-b-2 border-[#00CFFF] pb-2 inline-block">Hilfe zu unseren Leistungen</h2>
            
            <div className="grid gap-6 md:gap-8">
              {/* Würfelboost */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-[#00CFFF]/10 border-b border-[#00CFFF]/20">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-icons text-[#00CFFF]">casino</span>
                      <span>Würfelboost: Sicher und schnell</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="mb-4">
                    Wie funktioniert unser Würfelboost? Warum ist er sicher? Und wie lange dauert es, bis du deine Würfel erhältst?
                    Alle Fragen rund um unser Würfel-Angebot beantwortet.
                  </p>
                  <div className="flex justify-end">
                    <Link href="/hilfe/wuerfel">
                      <Button variant="outline" className="text-sm px-3 py-1">
                        [Mehr erfahren]
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Partnerevent */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-[#00CFFF]/10 border-b border-[#00CFFF]/20">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-icons text-[#00CFFF]">groups</span>
                      <span>Partnerevents: Maximale Belohnungen</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="mb-4">
                    Bei Partnerevents kannst du riesige Mengen an Würfeln und Stickern gewinnen. Wie funktionieren unsere
                    Partnerevents und wie kannst du das Beste daraus machen? Hier findest du alle Informationen.
                  </p>
                  <div className="flex justify-end">
                    <Link href="/hilfe/partner">
                      <Button variant="outline" className="text-sm px-3 py-1">
                        [Anleitung lesen]
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Tycoon Racers */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-[#00CFFF]/10 border-b border-[#00CFFF]/20">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-icons text-[#00CFFF]">directions_car</span>
                      <span>Tycoon Racers: Teamplätze und Belohnungen</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="mb-4">
                    Mit unserem Tycoon Racers Service sicherst du dir Top-Platzierungen und exklusive Belohnungen. 
                    Erfahre, wie wir dir zu großartigen Erfolgen im Rennen verhelfen können.
                  </p>
                  <div className="flex justify-end">
                    <Link href="/hilfe/race">
                      <Button variant="outline" className="text-sm px-3 py-1">
                        [Details anzeigen]
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Weiterführende Hilfe */}
          <div>
            <h2 className="text-2xl font-bold text-[#0A3A68] mb-6 border-b-2 border-[#00CFFF] pb-2 inline-block">Weiterführende Hilfe</h2>
            
            <div className="grid gap-6 md:gap-8">
              {/* Login Möglichkeiten */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-[#00CFFF]/10 border-b border-[#00CFFF]/20">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-icons text-[#00CFFF]">login</span>
                      <span>Login-Möglichkeiten: Auth-Token vs. Zugangsdaten</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="mb-4">
                    Wir bieten dir zwei Möglichkeiten, uns Zugang zu deinem Konto zu gewähren: den Auth-Token oder deine Facebook-Zugangsdaten.
                    Hier erfährst du, welche Methode für dich die beste ist und welche Vor- und Nachteile sie haben.
                  </p>
                  <div className="flex justify-end">
                    <Link href="/hilfe/login">
                      <Button variant="outline" className="text-sm px-3 py-1">
                        [Vergleich ansehen]
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Auth Token */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-[#00CFFF]/10 border-b border-[#00CFFF]/20">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-icons text-[#00CFFF]">key</span>
                      <span>Facebook Auth-Token: So funktioniert's</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="mb-4">
                    Der Facebook Auth-Token ist die sicherste Methode, mit der wir uns in deinem Namen bei Monopoly GO anmelden können. 
                    Erfahre, wie du deinen Auth-Token ganz einfach findest und warum diese Methode so sicher ist.
                  </p>
                  <div className="flex justify-end">
                    <Link href="/hilfe/authtoken">
                      <Button variant="outline" className="text-sm px-3 py-1">
                        [Zur Anleitung]
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              {/* Kontosicherheit */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-[#00CFFF]/10 border-b border-[#00CFFF]/20">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-icons text-[#00CFFF]">shield</span>
                      <span>Kontosicherheit: So schützt du dein Spiel</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="mb-4">
                    Die Sicherheit deines Kontos hat für uns höchste Priorität. Hier erfährst du, welche Maßnahmen wir ergreifen,
                    um dein Konto zu schützen, und was du selbst tun kannst, um deine Daten zu sichern.
                  </p>
                  <div className="flex justify-end">
                    <Link href="/hilfe/accounts">
                      <Button variant="outline" className="text-sm px-3 py-1">
                        [Sicherheitstipps]
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              {/* Auth-Token Tool */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-[#00CFFF]/10 border-b border-[#00CFFF]/20">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-icons text-[#00CFFF]">build</span>
                      <span>Auth-Token Tool: Dein Zugangs-Helfer</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="mb-4">
                    Mit unserem Auth-Token Tool kannst du deinen Facebook-Zugriffstoken für Monopoly GO schnell und einfach generieren.
                    Der Token wird lokal in deinem Browser gespeichert und ist die sicherste Methode für den Login.
                  </p>
                  <div className="flex justify-end">
                    <Link href="/hilfe/authtoken-tool">
                      <Button variant="outline" className="text-sm px-3 py-1">
                        [Zum Tool]
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}