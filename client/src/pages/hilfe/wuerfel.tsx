import { Link } from 'wouter';
import { useEffect } from 'react';

export default function WuerfelHilfe() {
  useEffect(() => {
    document.title = 'Würfelboost Hilfe | babixGO';
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <Link href="/hilfe" className="self-start text-[#0A3A68] hover:text-[#FF4C00] mb-4 inline-flex items-center transition-colors">
          <span className="material-icons mr-1">arrow_back</span>
          Zurück zur Hilfe
        </Link>
        <h1 className="font-['Baloo_2'] font-bold text-2xl md:text-3xl bg-[#00CFFF]/10 px-6 py-3 rounded-xl inline-block mx-auto mb-4 border-b-2 border-[#00CFFF] text-[#FF4C00]">
          Würfelboost - Hilfe & Informationen
        </h1>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="babix-info-header mx-auto mb-6">Der Würfelboost - Würfel für deinen Monopoly GO Account</h2>
          <p className="text-gray-600 text-sm mb-6">Zuletzt aktualisiert: 2. März</p>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Voraussetzungen</h3>
            <ul className="list-disc pl-5 space-y-4 text-gray-700">
              <li>
                <p><strong>Event-Status:</strong> Topevent oder Bahnhofsturnier sollten maximal bis kurz vor dem 1. High Roller bespielt sein oder müssen einen späteren High Roller als nächste Belohnung haben.</p>
              </li>
              <li>
                <p><strong>Würfelbestand:</strong> Es sollten mindestens 200 Würfel vorhanden sein. Je mehr, desto besser und schneller kann dein Boost beendet werden.</p>
              </li>
              <li>
                <p><strong>Account-Verknüpfung:</strong> Der Account muss mit Facebook oder Google Play Games verknüpft sein. Es werden nicht zwingend deine FB Zugangsdaten benötigt.</p>
              </li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Ablauf</h3>
            <ol className="list-decimal pl-5 space-y-4 text-gray-700">
              <li>
                <p><strong>Vorbereitung:</strong> Wir bereiten eine "ungenutzte Umgebung" für deinen Account vor. Für Scopely wirkt es also so, als würdest Du auf einem neuen Gerät spielen. Dadurch verhindern wir unnötige Multi-Account-Flags auf deinen Account.</p>
              </li>
              <li>
                <p><strong>Login:</strong> Wir loggen uns ein, dafür gibt es 2 Möglichkeiten:</p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li><span className="font-medium">Einfach und schnell:</span> Über deine Facebook / Google Zugangsdaten. Je nach deinen Account Einstellungen musst Du den LogIn bestätigen. <Link href="/hilfe/login" className="text-[#00CFFF] hover:text-[#FF4C00] underline">Mehr zu Login-Methoden</Link></li>
                  <li><span className="font-medium">Über den FB-Authtoken:</span> Um an diesen zu gelangen musst du 4 einfache Schritte ausführen. Gerne sind wir dabei behilflich. <Link href="/hilfe/login" className="text-[#00CFFF] hover:text-[#FF4C00] underline">Mehr Infos hier</Link></li>
                </ul>
              </li>
              <li>
                <p><strong>Durchführung:</strong> Wir erspielen die Würfel / Eventwährung / etc.</p>
              </li>
            </ol>
            
            <div className="bg-[#FFEBEB] border-l-4 border-[#FF4C00] p-4 mt-4 rounded-r-md">
              <p className="font-bold text-[#FF4C00] mb-1">Wichtige Hinweise:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Wir können aus dem Spiel geworfen werden, was zu einer Verzögerung des Würfelboosts führen kann.</li>
                <li>Es wird eine Multi-Device-Meldung an den Server gesendet.</li>
              </ul>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Preise</h3>
            <p className="mb-3 text-gray-700">Grundsätzlich ist jede Würfelmenge möglich. <strong>Hinweis:</strong> Würfelangaben haben eine Toleranz von ±2.500 Würfeln.</p>
            <p className="mb-3 text-sm text-gray-600">Beispiel: Bei 25.000 Würfeln erhaltet ihr zwischen 22.500 und 27.500.</p>
            
            <div className="mt-5 mb-5 bg-[#E6F7FF] border-l-4 border-[#00CFFF] p-4 rounded-r-md">
              <h4 className="babix-info-header text-[#0A3A68] mb-2">💡 Zu wenig Würfel?</h4>
              <p className="text-gray-700">Lässt sich ein Set vervollständigen? Ist der Freundschaftsbalken gefüllt? Schreib uns und wir finden gemeinsam auch dann eine Lösung wenn es schnell gehen muss.</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#0A3A68] text-white">
                    <th className="py-2 px-4 text-left">Menge</th>
                    <th className="py-2 px-4 text-left">Preis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">25.000 Würfel 🎲</td>
                    <td className="py-3 px-4">25€</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">35.000 Würfel 🎲</td>
                    <td className="py-3 px-4">35€</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">45.000 Würfel 🎲</td>
                    <td className="py-3 px-4">45€</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 bg-[#FFEBEB] border-l-4 border-[#FF4C00] p-4 rounded-r-md">
              <h4 className="font-bold text-[#FF4C00] mb-2">💥 Sonderangebot</h4>
              <p className="mb-1 text-gray-700">(während „Lucky Chance" oder „Dice Roll", nach Absprache)</p>
              <p className="font-bold text-lg">40.000–50.000 Würfel → 30€ 🎲</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Häufig gestellte Fragen</h3>
            
            <div className="mt-5 mb-5 bg-[#FFEBCC] border-l-4 border-[#FF4C00] p-4 rounded-r-md">
              <h4 className="font-bold text-[#0A3A68] mb-2 border-b-2 border-[#FF4C00] pb-2 inline-block">⚠️ Wichtiger Hinweis</h4>
              <p className="text-gray-700 font-semibold">Öffne nicht die Monopoly Go App solange der Würfelboost läuft - warte damit auf unsere Rückmeldung.</p>
            </div>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg mb-2">
                <div className="bg-gray-50 p-4 rounded-t-lg cursor-pointer flex justify-between items-center">
                  <h4 className="babix-info-header text-[#0A3A68]">Werden das Top- und Bahnhofsevent mit abgeschlossen?</h4>
                  <span className="material-icons text-[#00CFFF]">expand_more</span>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <p className="text-gray-700">Ab dem Paket mit 25.000 Würfeln sind die Eventabschlüsse (Topevent + 1 Tages Bahnhofsturnier) mit inbegriffen.</p>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg mb-2">
                <div className="bg-gray-50 p-4 rounded-t-lg cursor-pointer flex justify-between items-center">
                  <h4 className="babix-info-header text-[#0A3A68]">Wie kann ich wissen ob noch ein High Roller im Turnier folgt?</h4>
                  <span className="material-icons text-[#00CFFF]">expand_more</span>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <p className="text-gray-700">Besuche <a href="https://monopolygo.wiki/" target="_blank" rel="noopener noreferrer" className="text-[#00CFFF] hover:text-[#FF4C00] underline transition-colors">https://monopolygo.wiki/</a> für eine aktuelle Liste der Turnierbelohnungen oder um kommende Special Events in Erfahrung zu bringen.</p>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg mb-2">
                <div className="bg-gray-50 p-4 rounded-t-lg cursor-pointer flex justify-between items-center">
                  <h4 className="font-bold text-[#0A3A68]">Wie lange dauert der Boost?</h4>
                  <span className="material-icons text-[#00CFFF]">expand_more</span>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <p className="text-gray-700">Um ein paar Werte zu nennen:</p>
                  <ul className="list-disc pl-5 mt-2 text-gray-700">
                    <li>25.000 Würfel dauern im Durchschnitt 15, maximal 30 Minuten sobald man im Spiel ist.</li>
                    <li>40.000 Würfel 30 Minuten im Durchschnitt, bis zu maximal 45 Minuten.</li>
                  </ul>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg mb-2">
                <div className="bg-gray-50 p-4 rounded-t-lg cursor-pointer flex justify-between items-center">
                  <h4 className="font-bold text-[#0A3A68]">Können größere Würfelboost Pakete aufgeteilt werden?</h4>
                  <span className="material-icons text-[#00CFFF]">expand_more</span>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <p className="text-gray-700">Natürlich, vorausgesetzt unsere Kapazitäten lassen es zu. Ab 60.000 Würfeln kann der Boost auf zwei Mal verteilt werden. So kannst du z.B. das Top- und Bahnhofsevent ein weiteres Mal abgeschlossen bekommen. Frag uns einfach beim Kauf ob und wie es passt.</p>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg mb-2">
                <div className="bg-gray-50 p-4 rounded-t-lg cursor-pointer flex justify-between items-center">
                  <h4 className="font-bold text-[#0A3A68]">Kann ich dafür gesperrt werden?</h4>
                  <span className="material-icons text-[#00CFFF]">expand_more</span>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <p className="text-gray-700">Ja! Die Gefahr besteht. Wir räumen durch diverse Maßnahmen einige Gefahren aus dem Weg. Komplett ausschließen können wir sie aber nicht. Bisher ist uns in fast 24 Monaten allerdings nur 1 Fall bekannt in dem ein Account gesperrt wurde in dem wir aktiv waren.</p>
                  <p className="text-gray-700 mt-1">Dazu und zum Thema Accountsicherheit folgt "mit Sicherheit" noch ein größerer Beitrag.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#E6F7FF] border-l-4 border-[#00CFFF] p-4 rounded-r-md">
            <h4 className="font-bold text-[#0A3A68] mb-2">Noch Fragen?</h4>
            <p className="text-gray-700 mb-3">Gerne beantworten wir deine Fragen zum Würfelboost und helfen dir bei der Auswahl des richtigen Pakets.</p>
            <Link href="/kontakt">
              <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-2 px-4 rounded-md transition-colors inline-flex items-center">
                <span className="material-icons mr-1">contact_support</span>
                Kontakt aufnehmen
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}