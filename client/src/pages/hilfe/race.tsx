import { Link } from 'wouter';
import { useEffect } from 'react';

export default function RaceHilfe() {
  useEffect(() => {
    document.title = 'Race Hilfe | babixGO';
  }, []);

  return (
    <div className="container mx-auto px-4 py-8" id="top">
      <div className="flex flex-col items-center mb-8">
        <Link href="/hilfe" className="self-start text-[#0A3A68] hover:text-[#FF4C00] mb-4 inline-flex items-center transition-colors">
          <span className="material-icons mr-1">arrow_back</span>
          Zurück zur Hilfe
        </Link>
        <h1 className="font-['Baloo_2'] font-bold text-2xl md:text-3xl bg-[#00CFFF]/10 px-6 py-3 rounded-xl inline-block mx-auto mb-4 border-b-2 border-[#00CFFF] text-[#FF4C00]">
          Race Events - Hilfe & Informationen
        </h1>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="babix-info-header mx-auto mb-6">Tycoon Racers</h2>
          
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-500 text-sm mb-1">babixGO</p>
              <p className="text-gray-500 text-sm mb-1">Veröffentlicht: 26. Feb.</p>
              <p className="text-gray-500 text-sm">Aktualisiert: 2. Apr.</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Monopoly Go's Weg uns die Würfel aus den Taschen zu ziehen</h3>
            
            <p className="mb-6">
              Tycoon Racers – das wohl in der Community unbeliebteste Event welches Monopoly Go hervorgebracht hat.
            </p>
            
            <p className="mb-6">
              An diesem Fakt können wir auch nichts ändern – aber wir können dafür sorgen dass ihr mit ordentlichen Gewinnen aus dem Event herausgeht.
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">3 FREUNDE – 3 RENNEN – 3 TEAMS</h3>
            
            <p className="mb-3">
              Du kannst mit bis zu 3 Freunden ein Team bilden und trittst in 3 Rennen gegen 3 weitere Teams an. Durch das Top- und Side Event, den täglichen Aufgaben usw. erhältst du einige Flaggen. Den nennenswerten Teil deiner Flaggen musst du allerdings als Pickup vom Spielfeld sammeln. Das macht Tycoon Racers zu einem sehr würfelhungrigen Event.
            </p>
            
            <p className="mb-3">
              Die Flaggen nutzt du um zu Würfeln. Je nach Ergebnis legst du eine Gewisse Entfernung auf der Rennstrecke zurück. Gewonnen hat wer am weitesten gekommen ist.
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">FLAGGEN ODER TEAMMITGLIEDER – DU HAST DIE WAHL!</h3>
            
            <p className="mb-4">
              Neben dem Hauptpreis gibt es 54 Rundenbelohnungen zu erspielen. Pro Rennen sind 18 Rundenbelohnungen möglich, für die man 45.000 Punkte erspielen muss.
            </p>
            
            <div className="bg-[#FFEBCC] border-l-4 border-[#FF4C00] p-4 rounded-r-md mb-6">
              <p className="text-gray-700 font-bold">Wichtig:</p>
              <p className="text-gray-700">Wir garantieren nicht dafür am Ende auf Platz 1 zu landen. Mit Team "Rundenbelohnungen" liegen wir aktuell bei einer Siegquote von 92%.</p>
            </div>
            
            <p className="mb-4 font-semibold">
              Wir bieten folgende 3 Möglichkeiten an um möglichst alle Preise zu gewinnen:
            </p>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-bold text-[#0A3A68]">Team-Platz "Rundenbelohnungen"</h4>
              <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-1 px-3 rounded-md transition-colors text-sm inline-flex items-center">
                <span className="material-icons text-sm mr-1">shopping_cart</span>
                Jetzt kaufen
              </button>
            </div>
            
            <div className="mb-6">
              <p className="mb-3">🏎️ 2-3 unserer Accounts bilden mit dir zusammen ein Team.</p>
              <p className="mb-3">🏎️ Pro Rennen erspielen die 2 - 3 Accounts 45.000 Punkte damit du alle Rundenbelohnungen erhältst.</p>
              
              <p className="font-bold mt-4 mb-2">🎁 Dir winken also:</p>
              <ul className="list-none pl-4 mb-4">
                <li className="mb-1">➡️ bis zu 11.000 Würfel</li>
                <li className="mb-1">➡️ bis zu 3 5⭐ Sticker Packs</li>
                <li>➡️ und vieles mehr!</li>
              </ul>
            </div>
          </div>
          
          <div className="mb-8">
            <h4 className="text-lg font-bold text-[#0A3A68] mb-3">Flaggen für deinen Account</h4>
            
            <div className="mb-6">
              <p className="mb-3">❓ Du hast bereits ein Team und möchtest trotzdem vorneweg fahren?</p>
              <p className="mb-3">❗ Wir sammeln für dich Flaggen vom Spielbrett!</p>
              <p className="mb-3">🏎️ Zusätzlich erhältst du alle Belohnungen (inkl. Würfel und Flaggen) aus dem Topevent und dem Bahnhofsturnier.</p>
              <p className="mb-3">🎌 Hier gelten dieselben Voraussetzungen wie beim Würfelboost. Infos dazu sowie zum Ablauf findest du hier: wuerfel.babixgo.de</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-[#00CFFF] transition-colors">
                  <p className="font-bold mb-2">💰 10.000 Flaggen - 20€</p>
                  <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-1 px-3 rounded-md transition-colors text-sm inline-flex items-center">
                    <span className="material-icons text-sm mr-1">shopping_cart</span>
                    Jetzt kaufen
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-[#00CFFF] transition-colors">
                  <p className="font-bold mb-2">💰 20.000 Flaggen - 35€</p>
                  <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-1 px-3 rounded-md transition-colors text-sm inline-flex items-center">
                    <span className="material-icons text-sm mr-1">shopping_cart</span>
                    Jetzt kaufen
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Was du beachten solltest</h3>
            
            <ul className="list-disc pl-5 mb-4">
              <li className="mb-2">Vollständige Teams begeben sich direkt ins Matchmaking und sind damit endgültig.</li>
              <li className="mb-2">Tritt keinen anderen Team bei.</li>
              <li className="mb-2">Lade niemanden ins Team ein.</li>
              <li>Nehme keine Anfragen an.</li>
            </ul>
          </div>
          
          <div className="bg-[#E6F7FF] border-l-4 border-[#00CFFF] p-4 rounded-r-md">
            <h4 className="babix-info-header text-[#0A3A68] mb-2">Race-Plätze kaufen</h4>
            <p className="text-gray-700 mb-3">In der Zwischenzeit können Sie bereits unsere Race-Event-Angebote durchsuchen und bestellen.</p>
            <Link href="/produkte/race">
              <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-2 px-4 rounded-md transition-colors inline-flex items-center">
                <span className="material-icons mr-1">shopping_cart</span>
                Zum Race-Shop
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}