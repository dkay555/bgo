import { Link } from 'wouter';
import { useEffect } from 'react';

export default function Hilfe() {
  useEffect(() => {
    document.title = 'Hilfe | babixGO';
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-['Baloo_2'] font-bold text-2xl md:text-3xl bg-[#00CFFF]/10 px-6 py-3 rounded-xl inline-block mx-auto mb-4 border-b-2 border-[#00CFFF] text-[#FF4C00] text-center">
        Hilfe & Informationen
      </h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="babix-info-header mx-auto mb-6">Hilfe zu unseren Diensten</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200 hover:border-[#00CFFF] transition-colors">
              <h3 className="text-xl font-bold text-[#0A3A68] mb-3 flex items-center border-b-2 border-[#00CFFF] pb-2">
                <span className="material-icons mr-2 text-[#00CFFF]">casino</span>
                Würfelboost
              </h3>
              <p className="text-gray-700 mb-4">
                Erfahre alles über unseren Würfelboost-Service: Wie er funktioniert, Preise und häufig gestellte Fragen.
              </p>
              <Link href="/hilfe/wuerfel">
                <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-2 px-4 rounded-md transition-colors inline-flex items-center">
                  <span className="material-icons mr-1">help</span>
                  Zur Würfelboost-Hilfe
                </button>
              </Link>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200 hover:border-[#00CFFF] transition-colors">
              <h3 className="text-xl font-bold text-[#0A3A68] mb-3 flex items-center border-b-2 border-[#00CFFF] pb-2">
                <span className="material-icons mr-2 text-[#00CFFF]">account_circle</span>
                Accounts
              </h3>
              <p className="text-gray-700 mb-4">
                Informationen zu Monopoly GO Accounts: Was du beim Kauf beachten solltest und wie wir für Sicherheit sorgen.
              </p>
              <Link href="/hilfe/accounts">
                <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-2 px-4 rounded-md transition-colors inline-flex items-center">
                  <span className="material-icons mr-1">help</span>
                  Zur Account-Hilfe
                </button>
              </Link>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200 hover:border-[#00CFFF] transition-colors">
              <h3 className="text-xl font-bold text-[#0A3A68] mb-3 flex items-center">
                <span className="material-icons mr-2 text-[#00CFFF]">people</span>
                Partnerevents
              </h3>
              <p className="text-gray-700 mb-4">
                Alles zu unseren Partnerevent-Angeboten: Voraussetzungen, Ablauf und was du darüber wissen solltest.
              </p>
              <Link href="/hilfe/partner">
                <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-2 px-4 rounded-md transition-colors inline-flex items-center">
                  <span className="material-icons mr-1">help</span>
                  Zur Partnerevent-Hilfe
                </button>
              </Link>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200 hover:border-[#00CFFF] transition-colors">
              <h3 className="text-xl font-bold text-[#0A3A68] mb-3 flex items-center">
                <span className="material-icons mr-2 text-[#00CFFF]">emoji_events</span>
                Race Events
              </h3>
              <p className="text-gray-700 mb-4">
                Informationen zu unseren Race-Event-Angeboten: Was wir anbieten und wie du teilnehmen kannst.
              </p>
              <Link href="/hilfe/race">
                <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-2 px-4 rounded-md transition-colors inline-flex items-center">
                  <span className="material-icons mr-1">help</span>
                  Zur Race-Event-Hilfe
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="babix-info-header mx-auto mb-6">Aktuelles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200 hover:border-[#00CFFF] transition-colors">
              <h3 className="text-xl font-bold text-[#0A3A68] mb-3 flex items-center border-b-2 border-[#00CFFF] pb-2">
                <span className="material-icons mr-2 text-[#00CFFF]">new_releases</span>
                Angebot und Preisanpassung
              </h3>
              <p className="text-gray-700 mb-4">
                Informationen zu aktuellen Angeboten und Preisanpassungen unserer Dienstleistungen.
              </p>
              <Link href="/news/angebot_und_preisanpassung">
                <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-2 px-4 rounded-md transition-colors inline-flex items-center">
                  <span className="material-icons mr-1">info</span>
                  Mehr erfahren
                </button>
              </Link>
            </div>
          </div>
        </div>
          
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="babix-info-header mx-auto mb-6">Weitere Hilfsartikel</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200 hover:border-[#00CFFF] transition-colors">
              <h3 className="text-xl font-bold text-[#0A3A68] mb-3 flex items-center border-b-2 border-[#00CFFF] pb-2">
                <span className="material-icons mr-2 text-[#00CFFF]">login</span>
                Login-Hilfe
              </h3>
              <p className="text-gray-700 mb-4">
                Erfahre alles über die verschiedenen Login-Methoden und wie du dich für unsere Dienste anmelden kannst.
              </p>
              <Link href="/hilfe/login">
                <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-2 px-4 rounded-md transition-colors inline-flex items-center">
                  <span className="material-icons mr-1">help</span>
                  Zur Login-Hilfe
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-[#E6F7FF] border-l-4 border-[#00CFFF] p-4 rounded-r-md mb-8">
          <h3 className="font-bold text-[#0A3A68] mb-2 border-b-2 border-[#00CFFF] pb-2 inline-block">Noch Fragen?</h3>
          <p className="text-gray-700 mb-3">
            Falls du hier nicht die Antwort auf deine Frage findest, kontaktiere uns einfach direkt. Wir helfen dir gerne weiter!
          </p>
          <Link href="/kontakt">
            <button className="bg-[#0A3A68] hover:bg-[#FF4C00] text-white py-2 px-4 rounded-md transition-colors inline-flex items-center">
              <span className="material-icons mr-1">contact_support</span>
              Kontakt aufnehmen
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}