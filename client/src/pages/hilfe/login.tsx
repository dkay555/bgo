import { Link } from 'wouter';
import { useEffect } from 'react';

export default function LoginHilfe() {
  useEffect(() => {
    document.title = 'Login Möglichkeiten Hilfe | babixGO';
  }, []);

  return (
    <div className="container mx-auto px-4 py-8" id="top">
      <div className="flex flex-col items-center mb-8">
        <Link href="/hilfe" className="self-start text-[#0A3A68] hover:text-[#FF4C00] mb-4 inline-flex items-center transition-colors">
          <span className="material-icons mr-1">arrow_back</span>
          Zurück zur Hilfe
        </Link>
        <h1 className="babix-info-header font-bold text-2xl md:text-3xl text-center mb-8">
          Verfügbare Login-Methoden für Würfelboosts
        </h1>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <p className="text-gray-700 mb-4">
          Für den Würfelboost benötigen wir Zugriff auf deinen Monopoly GO Account. 
          Hier erklären wir dir die verschiedenen Methoden, wie wir uns in deinen Account einloggen können.
        </p>

        <div className="babix-info-box">
          <h3 className="babix-box-title">💡 Wichtiger Hinweis</h3>
          <p className="text-gray-700">Wir verstehen, dass es für manche ein sensibles Thema ist und garantieren, dass wir den Login nur nutzen, um die nötigen Spieldaten zu erhalten. In aller Regel kann das Passwort wenige Minuten nach dem Login von dir geändert werden.</p>
        </div>
        
        <div className="mb-8">
          <p className="font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Login-Methoden im Überblick</p>
          
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg">
              <div className="bg-gray-50 p-4 rounded-t-lg">
                <p className="font-bold text-[#0A3A68] flex items-center">
                  <span className="material-icons mr-2 text-[#00CFFF]">login</span>
                  Methode 1: Facebook: Zugangsdaten
                </p>
              </div>
              <div className="p-4 border-t border-gray-200">
                <p className="text-gray-700 mb-4 font-semibold">Login mit deinen Zugangsdaten</p>
                <p className="text-gray-700 mb-3">Was wir von dir benötigen:</p>
                
                <ul className="mb-5 space-y-2 text-gray-700">
                  <li className="pl-4">• Die hinterlegte E-Mail Adresse oder Handynummer</li>
                  <li className="pl-4">• Dein Passwort</li>
                </ul>
                
                <p className="text-gray-700 mb-3 font-semibold">Für Käufe über den Shop:</p>
                <p className="text-gray-700 mb-3">Wenn du eine 2 Faktor Authentifizierung nutzt benötigen wir außerdem noch:</p>
                
                <ul className="mb-5 space-y-2 text-gray-700">
                  <li className="pl-4">• 2 Wiederherstellungscodes</li>
                </ul>
                
                <p className="text-gray-700 mb-3">Die Wiederherstellungscodes benötigen wir um die 2 Faktor Authentifizierung zu umgehen.</p>
                
                <p className="text-gray-700 mb-3">Wie du die Codes erhältst, ob deine 2 FA überhaupt aktiv ist und weitere Informationen dazu findest du direkt bei Facebook unter folgenden Link: <a href="https://m.facebook.com/help/148104135383285/?locale=de_DE" target="_blank" rel="noopener noreferrer" className="text-[#00CFFF] hover:text-[#FF4C00] underline transition-colors">https://m.facebook.com/help/148104135383285/?locale=de_DE</a></p>
                
                <p className="text-gray-700">Alternativ zu den Codes kannst du den Login auch selbst bestätigen. Dafür muss man im Moment des Logins in Kontakt stehen, daher nutzen wir diese Möglichkeit nur bei Käufen über WhatsApp oder dem Messenger.</p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg">
              <div className="bg-gray-50 p-4 rounded-t-lg">
                <p className="font-bold text-[#0A3A68] flex items-center">
                  <span className="material-icons mr-2 text-[#00CFFF]">token</span>
                  Methode 2: Facebook: Authtoken (empfohlen)
                </p>
              </div>
              <div className="p-4 border-t border-gray-200">
                <p className="text-gray-700 mb-4 font-semibold">Login mit dem Authtoken</p>
                <p className="text-gray-700 mb-3">Dieser Token wird nach deinem Anmeldevorgang generiert. Monopoly schickt diesen an Facebook als Beweis dafür, dass du die erforderlichen Berechtigungen erteilt hast. Er ist nur für Monopoly Go gültig!</p>
                
                <p className="text-gray-700 mb-3">Was wir von dir benötigen:</p>
                <ul className="mb-5 space-y-2 text-gray-700">
                  <li className="pl-4">• Deinen Authtoken</li>
                </ul>
                
                <p className="text-gray-700 mb-4 font-semibold">So erhältst du den Token:</p>
                
                <div className="bg-[#E6F7FF] p-3 rounded-lg mb-4">
                  <p className="text-gray-700 mb-2">Wir haben ein Tool bereitgestellt mit welchem ihr diesen ganz einfach erhaltet:</p>
                  <Link href="/tools/authtoken" className="text-[#00CFFF] hover:text-[#FF4C00] font-bold underline transition-colors">
                    Zum Auth-Token-Tool
                  </Link>
                </div>
                
                <p className="text-gray-700 mb-3 font-semibold">Alternative:</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-5">
                  <div className="border border-gray-200 p-2 rounded-lg">
                    <img src="/images/auth-token/step1.webp" alt="Schritt 1: Den Link im Messenger verschicken & anklicken" className="w-full h-auto" />
                    <p className="text-center mt-2 text-sm text-gray-700">1. Den Link im Messenger verschicken & anklicken</p>
                  </div>
                  <div className="border border-gray-200 p-2 rounded-lg">
                    <img src="/images/auth-token/step2.webp" alt="Schritt 2: Fortfahren" className="w-full h-auto" />
                    <p className="text-center mt-2 text-sm text-gray-700">2. Fortfahren</p>
                  </div>
                  <div className="border border-gray-200 p-2 rounded-lg">
                    <img src="/images/auth-token/step3.webp" alt="Schritt 3: Es öffnet sich eine weiße Seite. Oben rechts auf die 3 Punkte klicken" className="w-full h-auto" />
                    <p className="text-center mt-2 text-sm text-gray-700">3. Es öffnet sich eine weiße Seite. Oben rechts auf die 3 Punkte klicken</p>
                  </div>
                  <div className="border border-gray-200 p-2 rounded-lg">
                    <img src="/images/auth-token/step4.webp" alt="Schritt 4: Link kopieren wählen & mir diesen schicken" className="w-full h-auto" />
                    <p className="text-center mt-2 text-sm text-gray-700">4. Link kopieren wählen & mir diesen schicken</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-3">Den Link den ihr erhaltet hat dieses Format:</p>
                <div className="bg-gray-100 p-3 rounded-lg mb-4 overflow-x-auto">
                  <code className="text-sm text-gray-800">https://m.facebook.com/dialog/return/arbiter?protocol=https&response=%7B%22access_token%22%3A%22EAAEDOsLhrQsBOzRy2O1iBmrfaTY9jvAk2Vk4mUlKiogi4XZCWjfqndrLXUfhfghcdvxfvfXIFow1dnrMnbfnRDrCKHPm3qFGcGlFXMnHrZAcqlJXZghgggfgh......</code>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg">
              <div className="bg-gray-50 p-4 rounded-t-lg">
                <p className="font-bold text-[#0A3A68] flex items-center">
                  <span className="material-icons mr-2 text-[#00CFFF]">phone_android</span>
                  Methode 3: Google Play Games: Zugangsdaten
                </p>
              </div>
              <div className="p-4 border-t border-gray-200">
                <p className="text-gray-700 mb-4 font-semibold">Google Play Games</p>
                <p className="text-gray-700 mb-4">Sollte dein Account mit Google Play Games verknüpft sein, schreibe uns bitte über WhatsApp oder über Facebook.</p>
                
                <p className="text-gray-700 mb-3">Was wir von dir benötigen:</p>
                <ul className="mb-5 space-y-2 text-gray-700">
                  <li className="pl-4">• Deine Gmail-Adresse</li>
                  <li className="pl-4">• Dein Google-Konto-Passwort</li>
                </ul>
                
                <p className="text-gray-700">Du musst den Login unter Umständen auf deinem Gerät bestätigen.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[#E6F7FF] border-l-4 border-[#00CFFF] p-4 rounded-r-md">
          <p className="font-bold text-[#0A3A68] mb-2 border-b-2 border-[#00CFFF] pb-2 inline-block">Hast du noch Fragen?</p>
          <p className="text-gray-700 mb-3">Falls du Hilfe benötigst oder noch Fragen zu dem Thema hast zögere nicht uns anzuschreiben.</p>
          <Link href="/kontakt">
            <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-2 px-4 rounded-md transition-colors inline-flex items-center">
              <span className="material-icons mr-1">contact_support</span>
              Kontakt aufnehmen
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}