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
          Die verschiedenen Login Möglichkeiten in Monopoly GO
        </h1>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="babix-info-header mx-auto mb-6">Übersicht der Anmeldemethoden</h2>
          <p className="text-gray-600 text-sm mb-6">Zuletzt aktualisiert: 11. Mai 2025</p>
          
          <div className="mb-8">
            <p className="text-gray-700 mb-4">
              In Monopoly GO gibt es verschiedene Möglichkeiten, sich anzumelden und seine Spieldaten zu sichern. Hier erfährst du alles über die verschiedenen Login-Optionen und ihre Vor- und Nachteile.
            </p>

            <div className="bg-[#E6F7FF] border-l-4 border-[#00CFFF] p-4 mb-6 rounded-r-md">
              <h4 className="font-bold text-[#0A3A68] mb-2 border-b-2 border-[#00CFFF] pb-2 inline-block">💡 Wichtiger Hinweis</h4>
              <p className="text-gray-700">Um deinen Spielfortschritt zu sichern, ist es immer empfehlenswert, dein Spiel mit einem Account zu verknüpfen. So kannst du auch bei Gerätewechsel oder Neuinstallation auf deine Spieldaten zugreifen.</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Login-Methoden im Überblick</h3>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg">
                <div className="bg-gray-50 p-4 rounded-t-lg">
                  <h4 className="font-bold text-[#0A3A68] flex items-center">
                    <span className="material-icons mr-2 text-[#00CFFF]">facebook</span>
                    Facebook-Login
                  </h4>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <p className="text-gray-700 mb-3">Der Facebook-Login ist eine der einfachsten und verbreitetsten Methoden, um dein Monopoly GO-Konto zu sichern.</p>
                  
                  <h5 className="font-semibold text-[#0A3A68] mb-2">Vorteile:</h5>
                  <ul className="list-disc pl-5 mb-3 text-gray-700">
                    <li>Einfache Einrichtung – nur wenige Klicks erforderlich</li>
                    <li>Automatische Synchronisierung beim Gerätewechsel</li>
                    <li>Ermöglicht das Senden und Empfangen von Geschenken mit Facebook-Freunden</li>
                  </ul>
                  
                  <h5 className="font-semibold text-[#0A3A68] mb-2">So richtest du den Facebook-Login ein:</h5>
                  <ol className="list-decimal pl-5 text-gray-700">
                    <li>Öffne Monopoly GO und tippe auf das Einstellungs-Icon (⚙️)</li>
                    <li>Wähle "Mit Facebook verbinden"</li>
                    <li>Melde dich mit deinen Facebook-Zugangsdaten an</li>
                    <li>Bestätige die Berechtigungen, die Monopoly GO benötigt</li>
                  </ol>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg">
                <div className="bg-gray-50 p-4 rounded-t-lg">
                  <h4 className="font-bold text-[#0A3A68] flex items-center">
                    <span className="material-icons mr-2 text-[#00CFFF]">phone_android</span>
                    Apple Game Center / Google Play Games
                  </h4>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <p className="text-gray-700 mb-3">Je nach Betriebssystem deines Smartphones kannst du dein Spiel mit Apple Game Center (iOS) oder Google Play Games (Android) verknüpfen.</p>
                  
                  <h5 className="font-semibold text-[#0A3A68] mb-2">Vorteile:</h5>
                  <ul className="list-disc pl-5 mb-3 text-gray-700">
                    <li>Keine zusätzliche Anmeldung nötig, wenn du bereits mit deinem Apple/Google-Konto angemeldet bist</li>
                    <li>Automatische Synchronisierung auf allen Geräten mit demselben Apple/Google-Konto</li>
                    <li>Keine Weitergabe von Daten an Facebook</li>
                  </ul>
                  
                  <h5 className="font-semibold text-[#0A3A68] mb-2">So richtest du die Verknüpfung ein:</h5>
                  <ol className="list-decimal pl-5 text-gray-700">
                    <li>Öffne Monopoly GO und tippe auf das Einstellungs-Icon (⚙️)</li>
                    <li>Wähle je nach Gerät "Mit Apple Game Center verbinden" oder "Mit Google Play Games verbinden"</li>
                    <li>Folge den Anweisungen auf dem Bildschirm</li>
                  </ol>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg">
                <div className="bg-gray-50 p-4 rounded-t-lg">
                  <h4 className="font-bold text-[#0A3A68] flex items-center">
                    <span className="material-icons mr-2 text-[#00CFFF]">email</span>
                    Email-Login (Scopely ID)
                  </h4>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <p className="text-gray-700 mb-3">Du kannst dein Spiel auch mit einer E-Mail-Adresse verknüpfen und so eine Scopely ID erstellen.</p>
                  
                  <h5 className="font-semibold text-[#0A3A68] mb-2">Vorteile:</h5>
                  <ul className="list-disc pl-5 mb-3 text-gray-700">
                    <li>Keine Abhängigkeit von Drittanbietern wie Facebook oder Google</li>
                    <li>Einfacher Geräte- und Plattformwechsel möglich</li>
                    <li>Höhere Privatsphäre</li>
                  </ul>
                  
                  <h5 className="font-semibold text-[#0A3A68] mb-2">So richtest du die E-Mail-Verknüpfung ein:</h5>
                  <ol className="list-decimal pl-5 text-gray-700">
                    <li>Öffne Monopoly GO und tippe auf das Einstellungs-Icon (⚙️)</li>
                    <li>Wähle "Mit E-Mail verbinden"</li>
                    <li>Gib deine E-Mail-Adresse ein und erstelle ein Passwort</li>
                    <li>Bestätige deine E-Mail-Adresse über den Bestätigungslink, den du per E-Mail erhältst</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Mehrere Login-Methoden gleichzeitig?</h3>
            <p className="text-gray-700 mb-3">
              Es ist tatsächlich möglich, mehrere Login-Methoden für dasselbe Monopoly GO-Konto einzurichten. Dies kann als zusätzliche Sicherung dienen, falls eine Methode nicht mehr funktioniert.
            </p>
            <p className="text-gray-700">
              Beachte jedoch: Wenn du dein Spiel bereits mit einer Methode verknüpft hast und dann eine andere hinzufügst, werden diese miteinander verbunden. Das bedeutet, du kannst nicht verschiedene Spielstände auf demselben Gerät mit unterschiedlichen Login-Methoden haben.
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Probleme beim Login?</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg mb-2">
                <div className="bg-gray-50 p-4 rounded-t-lg cursor-pointer flex justify-between items-center">
                  <h4 className="font-bold text-[#0A3A68]">Ich kann mich nicht mit Facebook anmelden</h4>
                  <span className="material-icons text-[#00CFFF]">expand_more</span>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <p className="text-gray-700 mb-2">Versuche folgende Schritte:</p>
                  <ol className="list-decimal pl-5 text-gray-700">
                    <li>Stelle sicher, dass die Facebook-App auf deinem Gerät installiert und du dort angemeldet bist</li>
                    <li>Überprüfe deine Internetverbindung</li>
                    <li>Schließe Monopoly GO vollständig und starte es neu</li>
                    <li>Aktualisiere sowohl die Facebook-App als auch Monopoly GO auf die neueste Version</li>
                  </ol>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg mb-2">
                <div className="bg-gray-50 p-4 rounded-t-lg cursor-pointer flex justify-between items-center">
                  <h4 className="font-bold text-[#0A3A68]">Ich habe mein Spiel mit Facebook verknüpft, aber mein Spielstand ist weg</h4>
                  <span className="material-icons text-[#00CFFF]">expand_more</span>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <p className="text-gray-700 mb-2">Dies kann passieren, wenn:</p>
                  <ul className="list-disc pl-5 text-gray-700 mb-3">
                    <li>Du dich mit einem anderen Facebook-Konto angemeldet hast als zuvor</li>
                    <li>Das Spiel eine neue Spielsitzung gestartet hat, bevor die Verknüpfung vollständig abgeschlossen war</li>
                  </ul>
                  <p className="text-gray-700">Kontaktiere in diesem Fall den Scopely-Support direkt im Spiel über das Einstellungsmenü.</p>
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