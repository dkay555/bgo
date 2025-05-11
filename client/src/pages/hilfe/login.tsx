import { Link } from 'wouter';
import { useEffect } from 'react';

export default function LoginHilfe() {
  useEffect(() => {
    document.title = 'Login Möglichkeiten Hilfe | babixGO';
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <Link href="/hilfe" className="self-start text-[#0A3A68] hover:text-[#FF4C00] mb-4 inline-flex items-center transition-colors">
          <span className="material-icons mr-1">arrow_back</span>
          Zurück zur Hilfe
        </Link>
        <h1 className="font-['Baloo_2'] font-bold text-2xl md:text-3xl bg-[#00CFFF]/10 px-6 py-3 rounded-xl inline-block mx-auto mb-4 border-b-2 border-[#00CFFF] text-[#FF4C00]">
          Login-Methoden für den Würfelboost
        </h1>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="babix-info-header mx-auto mb-6">Verfügbare Login-Methoden für Würfelboosts</h2>
          <p className="text-gray-600 text-sm mb-6">Zuletzt aktualisiert: 11. Mai 2025</p>
          
          <div className="mb-8">
            <p className="text-gray-700 mb-4">
              Für unseren Würfelboost-Service benötigen wir Zugriff auf deinen Monopoly GO Account. Hier erklären wir dir die verschiedenen Methoden, wie wir uns sicher in deinen Account einloggen können.
            </p>

            <div className="bg-[#E6F7FF] border-l-4 border-[#00CFFF] p-4 mb-6 rounded-r-md">
              <h4 className="font-bold text-[#0A3A68] mb-2 border-b-2 border-[#00CFFF] pb-2 inline-block">💡 Wichtiger Hinweis</h4>
              <p className="text-gray-700">Deine Kontosicherheit hat für uns höchste Priorität. Wir verwenden sichere Methoden und deine Zugangsdaten werden niemals gespeichert.</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Login-Methoden im Überblick</h3>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg">
                <div className="bg-gray-50 p-4 rounded-t-lg">
                  <h4 className="font-bold text-[#0A3A68] flex items-center">
                    <span className="material-icons mr-2 text-[#00CFFF]">login</span>
                    Methode 1: Direkte Zugangsdaten
                  </h4>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <p className="text-gray-700 mb-3">Die einfachste und schnellste Methode ist die Übermittlung deiner Facebook- oder Google-Zugangsdaten an uns.</p>
                  
                  <h5 className="font-semibold text-[#0A3A68] mb-2">Vorteile:</h5>
                  <ul className="list-disc pl-5 mb-3 text-gray-700">
                    <li>Schnellster Start des Würfelboosts</li>
                    <li>Keine technischen Kenntnisse erforderlich</li>
                    <li>Wir können auch bei zusätzlichen Verifizierungen helfen</li>
                  </ul>
                  
                  <h5 className="font-semibold text-[#0A3A68] mb-2">Sicherheitshinweise:</h5>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Deine Zugangsdaten werden nur für die Dauer des Boosts verwendet</li>
                    <li>Wir empfehlen, dein Passwort nach dem Boost zu ändern</li>
                    <li>Du erhältst eine Benachrichtigung über einen neuen Login auf deinem Konto</li>
                  </ul>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg">
                <div className="bg-gray-50 p-4 rounded-t-lg">
                  <h4 className="font-bold text-[#0A3A68] flex items-center">
                    <span className="material-icons mr-2 text-[#00CFFF]">token</span>
                    Methode 2: Facebook Auth-Token
                  </h4>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <p className="text-gray-700 mb-3">Der Facebook Auth-Token ist eine sicherere Alternative, bei der du deine Login-Daten nicht direkt weitergeben musst.</p>
                  
                  <h5 className="font-semibold text-[#0A3A68] mb-2">Vorteile:</h5>
                  <ul className="list-disc pl-5 mb-3 text-gray-700">
                    <li>Höhere Sicherheit, da keine Passwörter weitergegeben werden</li>
                    <li>Der Token hat eine begrenzte Gültigkeitsdauer</li>
                    <li>Du behältst volle Kontrolle über deine Zugangsdaten</li>
                  </ul>
                  
                  <h5 className="font-semibold text-[#0A3A68] mb-2">So erhältst du den Auth-Token:</h5>
                  <ol className="list-decimal pl-5 text-gray-700">
                    <li>Öffne die Facebook-Website in deinem Browser und melde dich an</li>
                    <li>Folge unserer detaillierten Anleitung, die wir dir im Chat zusenden</li>
                    <li>Kopiere den generierten Token und sende ihn uns zu</li>
                    <li>Wir verwenden diesen Token für den einmaligen Login</li>
                  </ol>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg">
                <div className="bg-gray-50 p-4 rounded-t-lg">
                  <h4 className="font-bold text-[#0A3A68] flex items-center">
                    <span className="material-icons mr-2 text-[#00CFFF]">screen_share</span>
                    Methode 3: Fernwartung via TeamViewer/AnyDesk
                  </h4>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <p className="text-gray-700 mb-3">Für Kunden, die maximale Transparenz wünschen, bieten wir eine beaufsichtigte Fernwartungssitzung an.</p>
                  
                  <h5 className="font-semibold text-[#0A3A68] mb-2">Vorteile:</h5>
                  <ul className="list-disc pl-5 mb-3 text-gray-700">
                    <li>Du kannst den gesamten Prozess live verfolgen</li>
                    <li>Wir können dir die einzelnen Schritte erklären</li>
                    <li>Die Verbindung kann jederzeit von dir unterbrochen werden</li>
                  </ul>
                  
                  <h5 className="font-semibold text-[#0A3A68] mb-2">Ablauf der Fernwartung:</h5>
                  <ol className="list-decimal pl-5 text-gray-700">
                    <li>Wir vereinbaren einen Termin für die Fernwartung</li>
                    <li>Du installierst TeamViewer oder AnyDesk auf deinem Gerät</li>
                    <li>Du übermittelst uns die Zugangsdaten für die Fernwartungssoftware</li>
                    <li>Wir führen den Würfelboost durch, während du zuschauen kannst</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Welche Methode ist die Richtige für mich?</h3>
            <p className="text-gray-700 mb-3">
              Jede Methode hat ihre Vor- und Nachteile. Wir empfehlen:
            </p>
            <ul className="list-disc pl-5 text-gray-700 mb-4">
              <li><strong>Für Neukunden:</strong> Methode 1 (Direkte Zugangsdaten) ist am einfachsten für den Einstieg</li>
              <li><strong>Für sicherheitsbewusste Kunden:</strong> Methode 2 (Facebook Auth-Token) bietet mehr Sicherheit</li>
              <li><strong>Für Kunden, die den Prozess verstehen möchten:</strong> Methode 3 (Fernwartung) bietet maximale Transparenz</li>
            </ul>
            <div className="bg-[#FFEBCC] border-l-4 border-[#FF4C00] p-4 rounded-r-md">
              <h4 className="font-bold text-[#0A3A68] mb-2 border-b-2 border-[#FF4C00] pb-2 inline-block">⚠️ Wichtiger Hinweis</h4>
              <p className="text-gray-700">Unabhängig von der gewählten Methode bitten wir dich, das Spiel während des Boosts nicht zu öffnen, um Konflikte zu vermeiden.</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Häufig gestellte Fragen</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg mb-2">
                <div className="bg-gray-50 p-4 rounded-t-lg cursor-pointer flex justify-between items-center">
                  <h4 className="font-bold text-[#0A3A68]">Ist mein Account sicher, wenn ich meine Daten weitergebe?</h4>
                  <span className="material-icons text-[#00CFFF]">expand_more</span>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <p className="text-gray-700 mb-3">Wir legen höchsten Wert auf die Sicherheit deiner Daten. Wir:</p>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Speichern deine Zugangsdaten niemals dauerhaft</li>
                    <li>Verwenden deine Daten ausschließlich für den Würfelboost</li>
                    <li>Haben in über 24 Monaten keine Accountsperrungen durch unsere Boosts erlebt</li>
                    <li>Empfehlen, dein Passwort nach dem Boost zu ändern</li>
                  </ul>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg mb-2">
                <div className="bg-gray-50 p-4 rounded-t-lg cursor-pointer flex justify-between items-center">
                  <h4 className="font-bold text-[#0A3A68]">Kann ich auch die Scopely ID / E-Mail-Login nutzen?</h4>
                  <span className="material-icons text-[#00CFFF]">expand_more</span>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <p className="text-gray-700 mb-3">Ja, wenn dein Account über eine Scopely ID verfügt, können wir auch diese für den Login verwenden. Teile uns einfach deine:</p>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>E-Mail-Adresse</li>
                    <li>Dein Scopely-Passwort</li>
                  </ul>
                  <p className="text-gray-700 mt-3">Beachte, dass bei dieser Methode möglicherweise zusätzliche Verifizierungsschritte erforderlich sind.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#E6F7FF] border-l-4 border-[#00CFFF] p-4 rounded-r-md">
            <h4 className="font-bold text-[#0A3A68] mb-2 border-b-2 border-[#00CFFF] pb-2 inline-block">Benötigst du Hilfe beim Login?</h4>
            <p className="text-gray-700 mb-3">Wenn du Probleme mit dem Login oder der Kontoverknüpfung hast, kontaktiere uns gerne. Wir helfen dir dabei, deinen Spielstand zu sichern und den Würfelboost optimal zu nutzen.</p>
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