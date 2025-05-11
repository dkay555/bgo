import { Link } from 'wouter';
import { useEffect } from 'react';

export default function PartnerHilfe() {
  useEffect(() => {
    document.title = 'Partnerevent Hilfe | babixGO';
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <Link href="/hilfe" className="self-start text-[#0A3A68] hover:text-[#FF4C00] mb-4 inline-flex items-center transition-colors">
          <span className="material-icons mr-1">arrow_back</span>
          Zurück zur Hilfe
        </Link>
        <h1 className="font-['Baloo_2'] font-bold text-2xl md:text-3xl bg-[#00CFFF]/10 px-6 py-3 rounded-xl inline-block mx-auto mb-4 border-b-2 border-[#00CFFF] text-[#FF4C00]">
          Partnerevent - Hilfe & Informationen
        </h1>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="babix-info-header mx-auto mb-6">Partnerevents in Monopoly Go</h2>
          
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-500 text-sm mb-1">babixGO</p>
              <p className="text-gray-500 text-sm mb-1">Veröffentlicht: 12. Feb.</p>
              <p className="text-gray-500 text-sm">Aktualisiert: 17. Feb.</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Mit uns nutzt du sie optimal!</h3>
            
            <p className="mb-6">
              Möchtest du dein Album schneller vervollständigen und dabei jede Menge Würfel gewinnen? Dann solltest du das Partnerevent in Monopoly Go nicht verpassen! Es bietet großzügige Belohnungen und ermöglicht es dir, gemeinsam mit Freunden noch schneller Fortschritte zu machen.
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Wie funktioniert das Partnerevent?</h3>
            
            <p className="mb-4">
              Während des Events baust du mit vier Partnern je ein Gebäude und sammelst dabei wertvolle Belohnungen. Jede abgeschlossene Etappe bringt dich deinem Ziel näher – und sichert dir wertvolle Extras!
            </p>
            
            <h4 className="font-semibold text-[#0A3A68] mb-3 mt-5">So erhältst du Eventwährung:</h4>
            <ul className="mb-5 space-y-2">
              <li>🔹 Als Pickup auf dem Spielfeld</li>
              <li>🔹 Durch Belohnungen im Topevent und Bahnhofsturnier</li>
              <li>🔹 Über tägliche Logins, das 8-Stunden-Geschenk und tägliche Aufgaben</li>
            </ul>
            
            <h4 className="font-semibold text-[#0A3A68] mb-3 mt-5">Dein Ziel im Event:</h4>
            <ul className="mb-5 space-y-2">
              <li>🏗 4 Gebäude errichten</li>
              <li>🎯 5 Etappen pro Gebäude abschließen</li>
              <li>🎁 Bei jedem Fortschritt wertvolle Belohnungen kassieren</li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Belohnungen</h3>
            
            <p className="mb-4">
              Du kannst bis zu 11.400 Würfel sowie ordentlich Sticker während des Events gewinnen. Hier siehst du was es wo gibt:
            </p>
            
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-5">
              <h4 className="font-semibold text-[#0A3A68] mb-3 border-b border-gray-200 pb-2">Etappenpreise</h4>
              <p className="mb-3">Pro Gebäude gibt es 5 Etappen zu meistern. Insgesamt erhaltet ihr dadurch:</p>
              <ul className="mb-3 space-y-2">
                <li>bis zu 6.400🎲</li>
                <li>4 Sticker Packs inkl. garantierten 4⭐ Sticker</li>
                <li>Mehrere Sideboosts, Cash usw.</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-5">
              <h4 className="font-semibold text-[#0A3A68] mb-3 border-b border-gray-200 pb-2">Hauptpreis</h4>
              <p className="mb-3">Für den Abschluss aller 4 Bauwerke winkt der Hauptpreis:</p>
              <ul className="mb-3 space-y-2">
                <li>5.000 Würfel</li>
                <li>Tausch-Sticker-Pack</li>
                <li>Ein neuer Token</li>
                <li>3 neue Emojis</li>
              </ul>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Unsere Unterstützung für dein Partnerevent in Monopoly Go</h3>
            
            <p className="mb-4">
              Möchtest du dein Partnerevent optimal abschließen? Wir helfen dir mit einem passenden Partner oder sammeln Eventwährung für dich, damit du schneller ans Ziel kommst!
            </p>
            
            <h4 className="font-semibold text-[#0A3A68] mb-3 mt-5">Unsere Partner-Optionen im Überblick</h4>
            <p className="mb-4">
              Wir bieten verschiedene Partner-Optionen, die perfekt auf deine Bedürfnisse zugeschnitten sind – egal ob schnell, zuverlässig oder besonders kostengünstig.
            </p>
            
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 hover:border-[#00CFFF] transition-colors mb-5">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-[#0A3A68]">1️⃣ Der Normale – Solide und bewährt</h4>
                <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-1 px-3 rounded-md transition-colors text-sm inline-flex items-center">
                  <span className="material-icons text-sm mr-1">shopping_cart</span>
                  Jetzt kaufen
                </button>
              </div>
              <ul className="mb-4 space-y-2">
                <li>📌 Punkte: 80.000</li>
                <li>⏳ Abschlusszeit: innerhalb von 96 Stunden</li>
              </ul>
              <div className="mb-3">
                <p className="font-semibold mb-2">💰 Preis:</p>
                <ul className="space-y-1 pl-4">
                  <li>1 Platz: 8 €</li>
                  <li>4 Plätze: 30 €</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Eventwährung & Würfel</h3>
            
            <p className="mb-4">
              Wir schließen für dich das Top- und Bahnhofsevent ab und sammeln Würfel, um sie komplett oder teilweise in Eventwährung umzuwandeln.
            </p>
            
            <p className="mb-4">
              Es gelten dieselben Voraussetzungen und derselbe Ablauf wie auch für den Würfelboost ➡️ <Link href="/hilfe/wuerfel" className="text-[#00CFFF] hover:underline">Link</Link>
            </p>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[#0A3A68]">Eventwährung</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[#0A3A68]">Preis</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-[#0A3A68]">Aktion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">5.000</td>
                    <td className="px-6 py-4">15€</td>
                    <td className="px-6 py-4 text-center">
                      <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-1 px-3 rounded-md transition-colors text-sm inline-flex items-center">
                        <span className="material-icons text-sm mr-1">shopping_cart</span>
                        Kaufen
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">10.000</td>
                    <td className="px-6 py-4">25€</td>
                    <td className="px-6 py-4 text-center">
                      <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-1 px-3 rounded-md transition-colors text-sm inline-flex items-center">
                        <span className="material-icons text-sm mr-1">shopping_cart</span>
                        Kaufen
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">20.000</td>
                    <td className="px-6 py-4">45€</td>
                    <td className="px-6 py-4 text-center">
                      <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-1 px-3 rounded-md transition-colors text-sm inline-flex items-center">
                        <span className="material-icons text-sm mr-1">shopping_cart</span>
                        Kaufen
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Wichtige Hinweise</h3>
            
            <ul className="mb-5 space-y-3">
              <li className="flex items-start">
                <span className="text-[#00CFFF] font-bold mr-2">✔️</span>
                <span>Wir erledigen die Bauwerke in der Reihenfolge, in der wir deinen Platz bestätigen. Wer zuerst kommt, wird zuerst bedient.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#00CFFF] font-bold mr-2">✔️</span>
                <span>Es kann bis in den Abend dauern, bis alle Einladungen verschickt und angenommen sind.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#00CFFF] font-bold mr-2">✔️</span>
                <span>Akzeptiere nur die In-Game-Namen, die wir dir schicken – eine nachträgliche Änderung der Partner ist nicht möglich.</span>
              </li>
            </ul>
            
            <p className="font-semibold text-[#0A3A68]">
              Nutze unser Angebot, um dein Partnerevent effizient abzuschließen und die besten Belohnungen zu sichern! 🎲💎
            </p>
          </div>
          
          <div className="bg-[#E6F7FF] border-l-4 border-[#00CFFF] p-4 rounded-r-md">
            <h4 className="font-bold text-[#0A3A68] mb-2 border-b-2 border-[#00CFFF] pb-2 inline-block">Partnerevent-Plätze kaufen</h4>
            <p className="text-gray-700 mb-3">In der Zwischenzeit können Sie bereits unsere Partnerevent-Angebote durchsuchen und bestellen.</p>
            <Link href="/produkte/partner">
              <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-2 px-4 rounded-md transition-colors inline-flex items-center">
                <span className="material-icons mr-1">shopping_cart</span>
                Zum Partnerevent-Shop
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}