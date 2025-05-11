import { useEffect } from 'react';
import { Link } from 'wouter';

export default function Weitere() {
  useEffect(() => {
    document.title = 'Weitere Services | babixGO';
  }, []);

  // Für zukünftige Services
  const upcomingServices = [
    {
      title: "Event-Betreuung",
      description: "Persönliche Betreuung während spezieller Spielevents mit maßgeschneiderten Strategien für Ihre Spielweise.",
      icon: "event_available",
      soon: true
    },
    {
      title: "Account-Service",
      description: "Professionelle Verwaltung und Optimierung Ihres Spielkontos für maximalen Fortschritt.",
      icon: "manage_accounts",
      soon: false,
      link: "/hilfe/accounts"
    },
    {
      title: "Spielberatung",
      description: "Individuelle Beratung zu Spielstrategien, Sammlungen und Event-Teilnahmen durch erfahrene Spieler.",
      icon: "psychology",
      soon: true
    },
    {
      title: "Premium-Membership",
      description: "Exklusiver Zugang zu allen Services mit Preisvorteil, Prioritäts-Support und besonderen Angeboten.",
      icon: "workspace_premium",
      soon: true
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <Link href="/produkte" className="self-start text-[#0A3A68] hover:text-[#FF4C00] mb-4 inline-flex items-center transition-colors">
          <span className="material-icons mr-1">arrow_back</span>
          Zurück zu Produkten
        </Link>
        <h1 className="babix-info-header text-3xl md:text-4xl font-bold mb-8 text-center">Weitere Services</h1>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 text-center">
          <span className="material-icons text-[#00CFFF] text-5xl mb-4">construction</span>
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4">Neue Services in Entwicklung</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Wir arbeiten ständig an neuen Services, um Ihr Monopoly GO-Erlebnis zu verbessern. 
            Hier finden Sie einen Vorgeschmack auf kommende Angebote, die bald verfügbar sein werden.
          </p>
        </div>
        
        {/* Zukünftige Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {upcomingServices.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 relative overflow-hidden">
              {service.soon && (
                <div className="absolute -right-10 -top-10 bg-[#FF4C00] text-white transform rotate-45 w-40 text-center text-xs py-1">
                  <span>Coming Soon</span>
                </div>
              )}
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="material-icons text-[#0A3A68]">{service.icon}</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-lg mb-2 text-[#0A3A68]">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  {service.link && (
                    <Link href={service.link}>
                      <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-1 px-3 rounded-md transition-colors text-sm inline-flex items-center">
                        <span className="material-icons text-sm mr-1">info</span>
                        Mehr Informationen
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Kontakt-Box */}
        <div className="bg-gradient-to-r from-[#0A3A68] to-[#00CFFF] rounded-lg shadow-lg p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h2 className="text-2xl font-bold mb-3">Interesse an neuen Services?</h2>
              <p className="mb-4 max-w-md">
                Haben Sie spezielle Anforderungen oder Wünsche? Kontaktieren Sie uns für individuelle Angebote oder um mehr über unsere geplanten Services zu erfahren.
              </p>
              <div className="flex items-center mb-2">
                <span className="material-icons mr-2">email</span>
                <a href="mailto:info@babixgo.de" className="hover:underline">
                  info@babixgo.de
                </a>
              </div>
              <div className="flex items-center">
                <span className="material-icons mr-2">phone</span>
                <a href="tel:+49123456789" className="hover:underline">
                  +49 123 456 789
                </a>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <a
                href="https://wa.me/491234567890?text=Ich%20interessiere%20mich%20für%20weitere%20Services%20von%20babixGO."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-opacity-90 text-white py-3 px-6 rounded-md transition-colors text-center"
              >
                <span className="flex items-center justify-center">
                  <span className="material-icons mr-2">whatsapp</span>
                  WhatsApp Kontakt
                </span>
              </a>
              
              <Link href="/kontakt">
                <button className="bg-white text-[#0A3A68] hover:bg-opacity-90 py-3 px-6 rounded-md transition-colors w-full">
                  <span className="flex items-center justify-center">
                    <span className="material-icons mr-2">message</span>
                    Kontaktformular
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 text-center">Bleiben Sie informiert</h2>
          <p className="text-gray-700 mb-6 text-center max-w-2xl mx-auto">
            Abonnieren Sie unseren Newsletter und erfahren Sie als Erster von neuen Services, 
            Sonderangeboten und exklusiven Aktionen.
          </p>
          
          <form className="max-w-lg mx-auto">
            <div className="flex flex-col md:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Ihre E-Mail-Adresse" 
                className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF]"
                required
              />
              <button 
                type="submit"
                className="bg-[#0A3A68] hover:bg-[#FF4C00] text-white py-3 px-6 rounded-md transition-colors whitespace-nowrap"
              >
                Anmelden
              </button>
            </div>
            <div className="mt-3 text-center text-sm text-gray-500">
              <label className="flex items-center justify-center">
                <input type="checkbox" className="mr-2" required />
                Ich akzeptiere die <a href="/datenschutz" className="text-[#00CFFF] hover:underline ml-1">Datenschutzbestimmungen</a>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}