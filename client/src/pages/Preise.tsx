import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// Komponente für Preiskarten mit flexiblem Design
const PriceCard = ({ 
  title, 
  price, 
  features, 
  cta, 
  link, 
  highlight = false, 
  description = "",
}: { 
  title: string, 
  price: string | React.ReactNode, 
  features: string[], 
  cta: string, 
  link: string, 
  highlight?: boolean,
  description?: string,
}) => (
  <motion.div 
    className={`rounded-xl shadow-lg overflow-hidden ${highlight ? 'border-2 border-[#FF4C00]' : 'border border-gray-200'}`}
    variants={item}
  >
    <div className={`p-6 ${highlight ? 'bg-gradient-to-br from-[#FF4C00]/10 to-[#FF4C00]/5' : 'bg-gradient-to-br from-[#00CFFF]/10 to-[#00CFFF]/5'}`}>
      <h3 className="font-['Baloo_2'] text-xl font-bold text-[#0A3A68]">{title}</h3>
      {description && <p className="mt-2 text-gray-600 text-sm">{description}</p>}
      <div className="mt-4 font-['Baloo_2'] text-2xl font-bold text-[#0A3A68]">
        {price}
      </div>
    </div>
    <div className="p-6 bg-white">
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="material-icons text-[#00CFFF] mr-2 text-lg flex-shrink-0">check_circle</span>
            <span dangerouslySetInnerHTML={{ __html: feature }} />
          </li>
        ))}
      </ul>
      <Link href={link}>
        <Button
          className={`w-full ${highlight ? 'bg-[#FF4C00] hover:bg-[#FF4C00]/90' : 'bg-[#00CFFF] hover:bg-[#00CFFF]/90'}`}
        >
          {cta}
        </Button>
      </Link>
    </div>
  </motion.div>
);

export default function Preise() {
  // Würfel Preispakete
  const dicePackages = [
    {
      title: "Standard Boost",
      price: <>25 <span className="text-base font-normal">€</span></>,
      features: [
        "25.000 Würfel",
        "Eventabschlüsse <b>inklusive</b>",
        "Zuverlässige Lieferung",
        "Sicherer Boost-Prozess"
      ],
      cta: "Jetzt bestellen",
      link: "/produkte/wuerfel#top",
    },
    {
      title: "Erweitert",
      price: <>35 <span className="text-base font-normal">€</span></>,
      features: [
        "35.000 Würfel",
        "Eventabschlüsse <b>inklusive</b>",
        "Zuverlässige Lieferung",
        "Sicherer Boost-Prozess",
        "Mehr Würfel für mehr Spielspaß"
      ],
      cta: "Jetzt bestellen",
      link: "/produkte/wuerfel#top",
      highlight: true,
    },
    {
      title: "Premium",
      price: <>45 <span className="text-base font-normal">€</span></>,
      features: [
        "45.000 Würfel",
        "Eventabschlüsse <b>inklusive</b>",
        "Zuverlässige Lieferung",
        "Sicherer Boost-Prozess",
        "Maximale Spielzeit mit großem Würfelpaket"
      ],
      cta: "Jetzt bestellen",
      link: "/produkte/wuerfel#top",
    },
  ];

  // Tycoon Racers Preispakete
  const racerPackages = [
    {
      title: "Teamplätze",
      description: "Sichere dir einen Platz in einem erfolgreichen Team",
      price: <>Ab 20 <span className="text-base font-normal">€</span></>,
      features: [
        "1 Teamplatz für 20€",
        "2 Teamplätze für 38€",
        "3 Teamplätze für 55€",
        "Qualifizierte Teams",
        "Erfolgreiche Platzierungen"
      ],
      cta: "Jetzt buchen",
      link: "/produkte/tycoonracers#top",
    },
    {
      title: "Flaggen",
      description: "Event-Währung für Tycoon Racers",
      price: <>Ab 30 <span className="text-base font-normal">€</span></>,
      features: [
        "15.000 Flaggen für 30€",
        "25.000 Flaggen für 40€",
        "Schnelle Lieferung",
        "Erfolgreiche Events",
        "Sichere Transaktion"
      ],
      cta: "Jetzt kaufen",
      link: "/produkte/tycoonracers#top",
      highlight: true,
    }
  ];

  // Partner Preispakete
  const partnerPackages = [
    {
      title: "Zuverlässiger Partner",
      description: "Aktive Partner für gemeinsames Spielen",
      price: <>Ab 7 <span className="text-base font-normal">€</span></>,
      features: [
        "1 Partner für 7€",
        "4 Partner für 25€",
        "Aktive Spieler",
        "Schnelle Aktionen",
        "Verlässlicher Service"
      ],
      cta: "Partner finden",
      link: "/produkte/partner#top",
    },
    {
      title: "Eventwährung",
      description: "Währung für Partnerevents",
      price: <>Ab 25 <span className="text-base font-normal">€</span></>,
      features: [
        "15.000 für 25€",
        "25.000 für 35€",
        "Schnelle Lieferung",
        "Erfolgreiche Events",
        "Sicherer Prozess"
      ],
      cta: "Jetzt kaufen",
      link: "/produkte/partner#top",
      highlight: true,
    }
  ];

  // Sticker Preispakete
  const stickerPackages = [
    {
      title: "Sticker Pakete",
      description: "Vervollständige deine Sammlung",
      price: <>Individuelle <span className="text-base font-normal">Preise</span></>,
      features: [
        "Über 250 verschiedene Sticker",
        "Schnelle Lieferung",
        "Sichere Übertragung",
        "Faire Preise",
        "Komplette Sets erhältlich"
      ],
      cta: "Sticker ansehen",
      link: "/produkte/sticker#top",
      highlight: true,
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-['Nunito_Sans']">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0A3A68] to-[#102C4C] text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8">
            <h1 className="font-['Baloo_2'] text-3xl md:text-4xl font-bold mb-4">
              Unsere Preise & Angebote
            </h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Faire Preise für alle Monopoly Go Dienstleistungen. Wähle das passende Paket für deine Spielweise.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <Tabs defaultValue="wuerfel" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="wuerfel" className="text-sm md:text-base">Würfelboost</TabsTrigger>
              <TabsTrigger value="race" className="text-sm md:text-base">Tycoon Racers</TabsTrigger>
              <TabsTrigger value="partner" className="text-sm md:text-base">Partnerevents</TabsTrigger>
              <TabsTrigger value="sticker" className="text-sm md:text-base">Sticker</TabsTrigger>
            </TabsList>
            
            <TabsContent value="wuerfel">
              <div className="mb-6">
                <h2 className="font-['Baloo_2'] text-2xl font-bold text-[#0A3A68] mb-2">Würfelboost Pakete</h2>
                <p className="text-gray-600">
                  Unsere Würfelboosts werden immer mit größter Sorgfalt und Sicherheit durchgeführt. 
                  Alle Angebote beinhalten den Abschluss laufender Events und eine Toleranz von ±2.500 Würfeln.
                </p>
              </div>
              
              <motion.div 
                className="grid gap-6 md:grid-cols-3"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {dicePackages.map((pkg, index) => (
                  <PriceCard key={index} {...pkg} />
                ))}
              </motion.div>
              
              <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-xl">
                <h3 className="font-['Baloo_2'] text-lg font-bold text-[#0A3A68] flex items-center">
                  <span className="material-icons text-amber-500 mr-2">campaign</span>
                  Sonderangebot für Events
                </h3>
                <p className="mt-2">
                  Während der Events "Lucky Chance" oder "Dice Roll" bieten wir spezielle Pakete mit 40.000-50.000 Würfeln 
                  für nur 30€ an. Diese Angebote sind zeitlich begrenzt und nur nach vorheriger Absprache verfügbar.
                </p>
                <Link href="/produkte/wuerfel#top">
                  <Button variant="outline" className="mt-4">
                    Mehr erfahren
                  </Button>
                </Link>
              </div>
            </TabsContent>
            
            <TabsContent value="race">
              <div className="mb-6">
                <h2 className="font-['Baloo_2'] text-2xl font-bold text-[#0A3A68] mb-2">Tycoon Racers Angebote</h2>
                <p className="text-gray-600">
                  Sichere dir einen Platz in erfolgreichen Teams oder erwirb Flaggen für das Tycoon Racers Event. 
                  Wir bieten verschiedene Pakete für unterschiedliche Bedürfnisse.
                </p>
              </div>
              
              <motion.div 
                className="grid gap-6 md:grid-cols-2"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {racerPackages.map((pkg, index) => (
                  <PriceCard key={index} {...pkg} />
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="partner">
              <div className="mb-6">
                <h2 className="font-['Baloo_2'] text-2xl font-bold text-[#0A3A68] mb-2">Partnerevent Angebote</h2>
                <p className="text-gray-600">
                  Finde zuverlässige Partner für gemeinsames Spielen oder erwerbe Eventwährung für Partnerevents. 
                  Wir bieten verschiedene Optionen für erfolgreiches Spielen.
                </p>
              </div>
              
              <motion.div 
                className="grid gap-6 md:grid-cols-2"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {partnerPackages.map((pkg, index) => (
                  <PriceCard key={index} {...pkg} />
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="sticker">
              <div className="mb-6">
                <h2 className="font-['Baloo_2'] text-2xl font-bold text-[#0A3A68] mb-2">Sticker Angebote</h2>
                <p className="text-gray-600">
                  Vervollständige deine Sticker-Sammlung mit unserer Hilfe. Wir bieten über 250 verschiedene Sticker an, 
                  die dir helfen, deine Alben zu komplettieren.
                </p>
              </div>
              
              <motion.div 
                className="grid gap-6 md:grid-cols-2"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {stickerPackages.map((pkg, index) => (
                  <PriceCard key={index} {...pkg} />
                ))}
              </motion.div>
              
              <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                <h3 className="font-['Baloo_2'] text-lg font-bold text-[#0A3A68] flex items-center">
                  <span className="material-icons text-blue-500 mr-2">info</span>
                  Individuelle Anfragen
                </h3>
                <p className="mt-2">
                  Du suchst spezifische Sticker oder hast besondere Anforderungen? Kontaktiere uns direkt für ein 
                  individuelles Angebot. Wir helfen dir gerne, deine Sammlung zu vervollständigen.
                </p>
                <Link href="/kontakt">
                  <Button variant="outline" className="mt-4">
                    Kontakt aufnehmen
                  </Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* FAQ Bereich */}
          <div className="mt-16">
            <h2 className="font-['Baloo_2'] text-2xl font-bold text-[#0A3A68] mb-6">Häufig gestellte Fragen</h2>
            
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-['Baloo_2'] text-lg font-bold text-[#0A3A68] mb-2">Wie funktioniert der Würfelboost?</h3>
                <p className="text-gray-600">
                  Nach deiner Bestellung nehmen wir Kontakt mit dir auf und vereinbaren einen Zeitpunkt. Der Boost wird dann remote 
                  durchgeführt, wobei wir besondere Sicherheitsmaßnahmen ergreifen, um deinen Account zu schützen. Mehr Details findest 
                  du in unserer <Link href="/hilfe/wuerfel" className="text-[#00CFFF] hover:underline">Hilfsektion zum Würfelboost</Link>.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-['Baloo_2'] text-lg font-bold text-[#0A3A68] mb-2">Wann erhalte ich meine Sticker?</h3>
                <p className="text-gray-600">
                  Nach Zahlungseingang werden die Sticker in der Regel innerhalb von 24 Stunden übertragen. Bei größeren Bestellungen 
                  kann es etwas länger dauern. Die genaue Prozedur wird nach der Bestellung mit dir abgestimmt.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-['Baloo_2'] text-lg font-bold text-[#0A3A68] mb-2">Sind die Preise verhandelbar?</h3>
                <p className="text-gray-600">
                  Unsere Preise sind fair kalkuliert und beinhalten den Aufwand, der für sichere und zuverlässige Dienstleistungen notwendig ist. 
                  Bei größeren Bestellungen oder Stammkunden bieten wir gelegentlich Sonderkonditionen an. Sprich uns einfach an!
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Noch Fragen?</p>
              <Link href="/kontakt">
                <Button className="bg-[#0A3A68] hover:bg-[#0A3A68]/90">
                  Kontaktiere uns
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}