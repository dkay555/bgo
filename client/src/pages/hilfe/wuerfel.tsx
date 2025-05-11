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
        <h1 className="babix-info-header text-3xl md:text-4xl font-bold mb-8 text-center">Würfelboost - Hilfe & Informationen</h1>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-6">Der Würfelboost - Würfel für deinen Monopoly GO Account</h2>
          <p className="text-gray-600 text-sm mb-6">Zuletzt aktualisiert: 2. März</p>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b pb-2">Voraussetzungen</h3>
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
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b pb-2">Ablauf</h3>
            <ol className="list-decimal pl-5 space-y-4 text-gray-700">
              <li>
                <p><strong>Vorbereitung:</strong> Wir bereiten eine "ungenutzte Umgebung" für deinen Account vor. Für Scopely wirkt es also so, als würdest Du auf einem neuen Gerät spielen. Dadurch verhindern wir unnötige Multi-Account-Flags auf deinen Account.</p>
              </li>
              <li>
                <p><strong>Login:</strong> Wir loggen uns ein, dafür gibt es 2 Möglichkeiten:</p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li><span className="font-medium">Einfach und schnell:</span> Über deine Facebook / Google Zugangsdaten. Je nach deinen Account Einstellungen musst Du den LogIn bestätigen.</li>
                  <li><span className="font-medium">Über den FB-Authtoken:</span> Um an diesen zu gelangen musst du 4 einfache Schritte ausführen. Gerne sind wir dabei behilflich.</li>
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
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b pb-2">Preise</h3>
            <p className="mb-3 text-gray-700">Grundsätzlich ist jede Würfelmenge möglich.</p>
            
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
                    <td className="py-3 px-4 font-medium">11.500 Würfel</td>
                    <td className="py-3 px-4">25€</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">25.000 Würfel</td>
                    <td className="py-3 px-4">35€</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">40.000 Würfel</td>
                    <td className="py-3 px-4">55€</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">60.000 Würfel</td>
                    <td className="py-3 px-4">80€</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">80.000 Würfel</td>
                    <td className="py-3 px-4">105€</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b pb-2">Häufig gestellte Fragen</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-[#0A3A68] mb-1">Werden das Top- und Bahnhofsevent mit abgeschlossen?</h4>
                <p className="text-gray-700">Ab dem Paket mit 25.000 Würfeln sind die Eventabschlüsse (Topevent + 1 Tages Bahnhofsturnier) mit inbegriffen.</p>
              </div>
              
              <div>
                <h4 className="font-bold text-[#0A3A68] mb-1">Wie kann ich wissen ob noch ein High Roller im Turnier folgt?</h4>
                <p className="text-gray-700">Kontaktiere uns gerne direkt, wir helfen dir bei der Überprüfung.</p>
              </div>
              
              <div>
                <h4 className="font-bold text-[#0A3A68] mb-1">Wie lange dauert der Boost?</h4>
                <p className="text-gray-700">Die Dauer hängt von der Würfelmenge ab. Kleinere Boosts (11.500) können in wenigen Stunden erledigt sein, während größere Pakete bis zu 24 Stunden dauern können.</p>
              </div>
              
              <div>
                <h4 className="font-bold text-[#0A3A68] mb-1">Können größere Würfelboost Pakete aufgeteilt werden?</h4>
                <p className="text-gray-700">Ja, nach Absprache können wir größere Pakete auf mehrere Sessions aufteilen.</p>
              </div>
              
              <div>
                <h4 className="font-bold text-[#0A3A68] mb-1">Kann ich dafür gesperrt werden?</h4>
                <p className="text-gray-700">Wir arbeiten mit größter Sorgfalt, um das Risiko einer Sperrung zu minimieren. Durch die Nutzung unserer "ungenutzten Umgebung" werden Multi-Account-Flags vermieden. Bisher gab es keine Sperrungen durch unsere Würfelboosts.</p>
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