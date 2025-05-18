import { useEffect } from 'react';

export default function Authtoken() {
  useEffect(() => {
    document.title = 'Auth-Token Tool | babixGO';
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold text-[#0A3A68] mb-6">Auth-Token Tool</h1>

          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              Mit diesem Tool kannst du deinen Auth-Token für deinen Monopoly GO Account generieren.
              Folge einfach der Video-Anleitung oder den Schritten unten.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-[#0A3A68] mb-6 text-center">Anleitung</h2>

          <div className="mb-8 border border-gray-200 rounded-lg p-4 flex justify-center">
            <div className="w-full max-w-2xl">
              <video 
                width="100%"
                height="auto"
                controls
                muted
                playsInline
              >
                <source src="/videos/anleitung_tokentool.mp4" type="video/mp4" />
                Dein Browser unterstützt keine Videos. Bitte sieh dir die Anleitung weiter unten an.
              </video>
            </div>
          </div>

          <h3 className="text-xl font-bold text-[#0A3A68] mb-3">Schriftliche Anleitung</h3>

          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="mb-3">
                  <img src="/images/auth-token/step1.webp" alt="Schritt 1" className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-[#0A3A68] mb-2">Schritt 1</h4>
                <p className="text-gray-700">
                  Öffne Chrome und gehe auf m.facebook.com. Melde dich mit deinen Facebook-Zugangsdaten an.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="mb-3">
                  <img src="/images/auth-token/step2.webp" alt="Schritt 2" className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-[#0A3A68] mb-2">Schritt 2</h4>
                <p className="text-gray-700">
                  Öffne die Entwickler-Tools deines Browsers (F12 drücken oder rechte Maustaste → Untersuchen).
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="mb-3">
                  <img src="/images/auth-token/step3.webp" alt="Schritt 3" className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-[#0A3A68] mb-2">Schritt 3</h4>
                <p className="text-gray-700">
                  Gehe zum Tab "Netzwerk". Tippe "graphql" in das Suchfeld ein. Lade die Seite neu (F5).
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="mb-3">
                  <img src="/images/auth-token/step4.webp" alt="Schritt 4" className="w-full h-auto rounded-lg" />
                </div>
                <h4 className="font-bold text-[#0A3A68] mb-2">Schritt 4</h4>
                <p className="text-gray-700">
                  Klicke auf einen der "graphql"-Einträge. Suche den Cookie-Header und kopiere den kompletten Wert des "c_user"-Cookies.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#E6F7FF] border-l-4 border-[#00CFFF] p-4 rounded-r-md">
            <p className="font-bold text-[#0A3A68] mb-2">Noch Fragen?</p>
            <p className="text-gray-700">
              Wenn du Probleme beim Generieren deines Auth-Tokens hast, kontaktiere uns einfach über unseren Support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}