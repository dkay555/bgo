import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Info } from 'lucide-react';

// Importiere die Anweisungsbilder
import authtokenStep1 from '@assets/Authtoken_Anleitung_1_720_1561.webp';
import authtokenStep2 from '@assets/Authtoken_Anleitung_2_720_1561.webp';
import authtokenStep3 from '@assets/Authtoken_Anleitung_3_720_1561.webp';
import authtokenStep4 from '@assets/Authtoken_Anleitung_4_720_1561.webp';

export default function AuthTokenHilfePage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-4">
        <Link href="/hilfe">
          <a className="text-[#0A3A68] hover:text-[#00CFFF] flex items-center">
            <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
            Zurück zur Hilfe-Übersicht
          </a>
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-[#0A3A68] mb-2">Auth-Token Anleitung</h1>
      <div className="w-16 h-1 bg-gradient-to-r from-[#00CFFF] to-[#0A3A68] mb-6"></div>

      <div className="mb-8">
        <p className="text-lg mb-4">
          Um deine Würfel sicher auf dein Monopoly GO! Konto zu erhalten, benötigen wir deinen Auth-Token. 
          Dies ist ein sicherer Weg, um auf dein Konto zuzugreifen, ohne deine Login-Daten zu teilen.
        </p>
        
        <div className="bg-blue-50 border-l-4 border-[#00CFFF] p-4 mb-6">
          <div className="flex">
            <Info className="h-6 w-6 text-[#00CFFF] mr-2" />
            <div>
              <p className="font-medium">Wichtiger Hinweis:</p>
              <p>Der Auth-Token ist nur für dich sichtbar und läuft nach einiger Zeit ab. Er muss daher kurz vor deiner Bestellung generiert werden.</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border-l-4 border-[#FF4C00] p-4 mb-6">
          <div className="flex">
            <Info className="h-6 w-6 text-[#FF4C00] mr-2" />
            <div>
              <p className="font-medium">NEU: Facebook Auth Token Tool</p>
              <p className="mb-2">Wir haben ein neues Tool entwickelt, mit dem du deinen Auth-Token noch einfacher extrahieren kannst!</p>
              <Link href="/tools/authtoken">
                <a className="inline-block px-4 py-2 bg-[#FF4C00] text-white font-medium rounded hover:bg-[#cc3b00] transition-colors">
                  Zum Auth Token Tool
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-[#0A3A68] mb-4">Schritt 1: Link öffnen</h2>
            <img src={authtokenStep1} alt="Schritt 1: Link öffnen" className="w-full rounded-lg mb-4" />
            <p>Sende dir den bereitgestellten Link über Messenger (Facebook) und klicke ihn an.</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-[#0A3A68] mb-4">Schritt 2: Fortfahren</h2>
            <img src={authtokenStep2} alt="Schritt 2: Fortfahren" className="w-full rounded-lg mb-4" />
            <p>Klicke auf "Fortfahren", um den Prozess zu beginnen.</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-[#0A3A68] mb-4">Schritt 3: Optionsmenü öffnen</h2>
            <img src={authtokenStep3} alt="Schritt 3: Optionsmenü öffnen" className="w-full rounded-lg mb-4" />
            <p>Es öffnet sich eine weiße Seite. Klicke oben rechts auf die drei Punkte (Menüsymbol).</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-[#0A3A68] mb-4">Schritt 4: Link kopieren</h2>
            <img src={authtokenStep4} alt="Schritt 4: Link kopieren" className="w-full rounded-lg mb-4" />
            <p>Wähle "Link kopieren" und sende uns diesen Link. Der Auth-Token ist in diesem Link enthalten.</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold text-[#0A3A68] mb-4">Häufig gestellte Fragen</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-[#0A3A68]">Ist es sicher, meinen Auth-Token zu teilen?</h3>
            <p>Ja, der Auth-Token ermöglicht nur einen temporären Zugriff, der nach kurzer Zeit abläuft. Er kann nicht für dauerhafte Änderungen an deinem Konto verwendet werden.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-[#0A3A68]">Was passiert, wenn ich meinen Auth-Token nicht finden kann?</h3>
            <p>Solltest du Probleme haben, kannst du alternativ auch die Login-Methode wählen und uns deine Monopoly GO! Anmeldedaten zur Verfügung stellen.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-[#0A3A68]">Wie lange ist der Auth-Token gültig?</h3>
            <p>Der Auth-Token ist für einen begrenzten Zeitraum gültig (ca. 24-48 Stunden). Daher ist es wichtig, ihn kurz vor deiner Bestellung zu generieren.</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link href="/checkout/wuerfel">
          <a className="inline-block px-6 py-3 bg-[#00CFFF] text-white font-bold rounded-lg hover:bg-[#0A3A68] transition-colors">
            Jetzt Würfel bestellen
          </a>
        </Link>
      </div>
    </div>
  );
}