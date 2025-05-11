import { useEffect } from 'react';
import { Link } from 'wouter';

export default function Hilfe() {
  useEffect(() => {
    document.title = 'Hilfe | babixGO';
  }, []);

  const faqItems = [
    {
      question: "Was ist babixGO?",
      answer: "babixGO ist ein Service, der Spielern von Monopoly GO bei verschiedenen Aspekten des Spiels hilft, wie Würfelboosts, Sticker-Sammlungen, Partner-Vermittlung und Race-Events."
    },
    {
      question: "Wie funktionieren Würfelboosts?",
      answer: "Würfelboosts erhöhen die Anzahl der Würfel in Ihrem Monopoly GO-Konto. Nach dem Kauf benötigen wir Ihre Spieler-ID und weitere Informationen, um die Würfel innerhalb von 24 Stunden auf Ihr Konto zu übertragen."
    },
    {
      question: "Wie erhalte ich Sticker?",
      answer: "Über unseren Sticker-Service können Sie bestimmte Sticker für Ihre Sammlung erhalten. Wir helfen Ihnen dabei, schwer zu findende Sticker zu bekommen, um Ihre Alben zu vervollständigen."
    },
    {
      question: "Wie finde ich Spielpartner?",
      answer: "Unser Partner-Service vermittelt Ihnen aktive Spieler für gemeinsame Aktivitäten wie Geschenketausch oder gegenseitige Besuche im Spiel. Alle Partner werden vorher überprüft."
    },
    {
      question: "Was ist der Race-Service?",
      answer: "Unser Race-Service unterstützt Sie bei den zeitlich begrenzten Events in Monopoly GO. Wir können Ihnen helfen, bestimmte Meilensteine zu erreichen und Belohnungen freizuschalten."
    },
    {
      question: "Ist die Nutzung von babixGO sicher?",
      answer: "Wir legen größten Wert auf die Sicherheit Ihrer Daten und Ihres Spielkontos. Alle Transaktionen werden diskret und sicher durchgeführt. Wir benötigen niemals Ihr Passwort oder andere sensible Zugangsdaten."
    },
    {
      question: "Wie lange dauert die Bearbeitung meiner Bestellung?",
      answer: "Nach Zahlungseingang beginnen wir umgehend mit der Bearbeitung Ihrer Bestellung. Die meisten Dienste werden innerhalb von 24 Stunden abgeschlossen."
    },
    {
      question: "Kann ich meine Bestellung stornieren?",
      answer: "Sobald wir mit der Bearbeitung Ihrer Bestellung begonnen haben, ist eine Stornierung nicht mehr möglich. Vor Bearbeitungsbeginn können Sie Ihre Bestellung unter bestimmten Bedingungen stornieren. Weitere Details finden Sie in unseren AGB."
    }
  ];

  const helpCategories = [
    {
      title: "Würfelboost",
      path: "/hilfe/wuerfel",
      icon: "icon_wuerfel_trans_150_150.webp",
      description: "Alles über unseren Würfelboost-Service"
    },
    {
      title: "Sticker",
      path: "/hilfe/sticker",
      icon: "icon_chance_trans_150_150.webp",
      description: "Hilfe zum Sticker-Service"
    },
    {
      title: "Partner",
      path: "/hilfe/partner",
      icon: "icon_account_trans_150_150.webp",
      description: "Informationen zur Partner-Vermittlung"
    },
    {
      title: "Race",
      path: "/hilfe/race",
      icon: "icon_spielbrett_trans_150_150.webp",
      description: "Unterstützung bei Race-Events"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="babix-info-header text-3xl md:text-4xl font-bold mb-8 text-center">Hilfe & Support</h1>
      
      {/* Hilfekategorien */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {helpCategories.map((category, index) => (
          <Link key={index} href={category.path}>
            <div className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105 cursor-pointer hover:shadow-xl border border-gray-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-4 flex items-center justify-center">
                  <span className="material-icons text-5xl text-[#00CFFF]">
                    {category.title === "Würfelboost" ? "casino" : 
                     category.title === "Sticker" ? "collections_bookmark" :
                     category.title === "Partner" ? "people" :
                     "emoji_events"}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0A3A68] mb-2">{category.title}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* FAQ-Bereich */}
      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-[#0A3A68] mb-6 text-center">Häufig gestellte Fragen</h2>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0">
              <details className="group">
                <summary className="flex justify-between items-center font-bold p-4 cursor-pointer text-[#0A3A68] hover:bg-gray-50">
                  {item.question}
                  <span className="material-icons transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="p-4 pt-0 bg-gray-50">
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
      
      {/* Kontaktbereich */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 text-center">Noch Fragen?</h2>
        <p className="text-center text-gray-600 mb-6">
          Wenn Sie weitere Fragen haben oder Hilfe benötigen, kontaktieren Sie uns gerne direkt.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <a
            href="/kontakt"
            className="bg-[#0A3A68] text-white py-3 px-6 rounded-md hover:bg-[#FF4C00] transition-colors flex items-center justify-center"
          >
            <span className="material-icons mr-2">mail</span>
            Kontaktformular
          </a>
          
          <a
            href="https://wa.me/491234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center"
          >
            <span className="material-icons mr-2">whatsapp</span>
            WhatsApp Support
          </a>
        </div>
      </div>
    </div>
  );
}