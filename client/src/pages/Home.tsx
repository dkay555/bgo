import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { PricingGrid } from '@/components/PricingCard';

export default function Home() {
  // Load Material Icons from Google CDN
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load Google Fonts: Baloo 2 and Nunito Sans
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700&family=Nunito+Sans:wght@400;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(fontLink);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-['Nunito_Sans'] text-[#0A3A68]" id="top">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-6 md:py-10 flex-grow">
        <div className="space-y-8">
          {/* Hero Section */}
          <section className="text-center">
            <h1 className="font-['Baloo_2'] font-bold text-xl md:text-2xl bg-[#00CFFF]/10 px-6 py-3 rounded-xl inline-block mx-auto my-4 border-b-2 border-[#00CFFF] text-[#FF4C00] animate-[fadeIn_0.5s_ease-out_forwards]">
              Here we go!
            </h1>
            <div className="bg-white rounded-xl p-6 shadow-[0_4px_10px_rgba(0,0,0,0.1)] animate-[fadeIn_0.5s_ease-out_forwards] animation-delay-100">
              <p className="mb-4">Die letzten Tage war es still um babixGO...</p>
              <p className="mb-2">
                Wir haben <a href="#start" className="text-[#FF4C00] font-bold hover:underline transition">
                  (1) uns und unser Vorgehen</a> hinterfragt, daraufhin unsere "Anti-Anticheat Maßnahmen" überdacht, überarbeitet und an über 200 Accounts getestet & zu guter letzt an unserem 
                <a href="#angebot" className="text-[#FF4C00] font-bold hover:underline transition"> (2) Angebot</a> & der 
                <a href="#preise" className="text-[#FF4C00] font-bold hover:underline transition"> (3) Preisliste</a> gearbeitet.
              </p>
            </div>
          </section>

          {/* About Section */}
          <section id="start" className="scroll-mt-20 animate-[fadeIn_0.5s_ease-out_forwards] animation-delay-200">
            <h2 className="font-['Baloo_2'] font-bold text-xl md:text-2xl bg-[#00CFFF]/10 px-6 py-3 rounded-xl inline-block mx-auto my-4 border-b-2 border-[#00CFFF] text-[#FF4C00] text-center">
              Bevor es los geht..
            </h2>
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-[0_4px_10px_rgba(0,0,0,0.1)] border-l-4 border-[#00CFFF]">
              <p className="mb-4">Es war uns immer wichtig das unser Service persönlich ist & bleibt. Wir haben (selbstverständlich unentgeltlich) stundenlang an euren Last-Minute-Album-Abschluss gearbeitet, verloren geglaubte Accounts wieder korrekt mit FB verbunden oder einfach nur über Monopoly Taktiken philosophiert.</p>
              
              <p className="mb-4">Wir hatten und haben ein faires und verständnisvolles miteinander. Das funktioniert, weil wir das Vergnügen an Monopoly GO teilen, weil wir mit babixGO gestartet sind um <span className="font-bold">jedem einen Albumabschluss zu ermöglichen</span> ohne hunderte Euro im Ingame Shop zu zahlen.</p>
              
              <p>In letzter Zeit sprießen die Würfelverkäufer, <span className="font-bold">ohne Know-how über selbst offensichtliche Peaks & Trackingmethoden</span>, mit der Hoffnung auf 'nen schnellen Euro wieder aus jeder Ecke. Wir bekommen viele Nachrichten bzgl. unserer angebotenen Menge & das viele deshalb woanders kaufen würden. Wie bisher jedesmal werden wir an keinen Preiskampf teilnehmen. Unsere Angebote gestalten wir in der Größenordnung, wie es für eure <span className="font-bold">Accounts am sichersten ist & nicht danach, wie wir am meisten Einnahmen generieren.</span></p>
            </div>
          </section>

          {/* Offerings Section */}
          <section id="angebot" className="scroll-mt-20 animate-[fadeIn_0.5s_ease-out_forwards] animation-delay-300">
            <h2 className="font-['Baloo_2'] font-bold text-xl md:text-2xl bg-[#00CFFF]/10 px-6 py-3 rounded-xl inline-block mx-auto my-4 border-b-2 border-[#00CFFF] text-[#FF4C00] text-center">
              Änderungen am Angebot
            </h2>
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-[0_4px_10px_rgba(0,0,0,0.1)] border-l-4 border-[#FF4C00]">
              <h3 className="font-['Baloo_2'] font-bold text-lg text-[#0A3A68] mb-4">Keine kleineren Boosts</h3>
              <p className="mb-4">Bei einem 20.000 Würfel Boost sind wir bereits ca. die Hälfte der Zeit mit der Absicherung beschäftigt. Kleinere Angebote wären also nur aus z.B. diesen Gründen sinnvoll:</p>
              
              <div className="space-y-3 mb-6">
                <p className="flex items-start">
                  <span className="material-icons text-[#FF4C00] mr-2 flex-shrink-0">forward</span>
                  <span><span className="font-bold">Verkaufspsychologisch:</span> Wer klein kauft, kauft öfter und gibt im Endeffekt mehr aus.</span>
                </p>
                <p className="flex items-start">
                  <span className="material-icons text-[#FF4C00] mr-2 flex-shrink-0">forward</span>
                  <span><span className="font-bold">Kundengewinnung:</span> Geringerer Preis, geringere Hürde.</span>
                </p>
              </div>

              <h3 className="font-['Baloo_2'] font-bold text-lg text-[#0A3A68] mb-4">Keine größeren Boosts</h3>
              <p>Es mag schön aussehen 100.000+ als Würfelstand angezeigt zu bekommen, allerdings würden wir so den Boost weit in die Länge ziehen müssen um u.a. einen zu guten Erfolgsquotienten zu vermeiden.</p>
            </div>

            <div className="bg-red-50 rounded-xl p-6 md:p-8 shadow-[0_4px_10px_rgba(0,0,0,0.1)] border-l-4 border-red-500 mt-6 animate-[fadeIn_0.5s_ease-out_forwards] animation-delay-400">
              <h3 className="font-['Baloo_2'] font-bold text-lg text-[#0A3A68] mb-4 flex items-center">
                <span className="material-icons text-red-500 mr-2">warning</span>
                Reminder am Rande
              </h3>
              
              <p className="flex items-center mb-4">
                <span className="material-icons text-red-500 mr-2">warning</span>
                <span className="font-bold text-red-600">Nach dem Boost unbedingt beachten:</span>
              </p>
              
              <p className="mb-4">So wie wir vor & während des Boosts, solltet ihr selbst auch einige Dinge nach dem Boost beachten:</p>
              
              <div className="space-y-2 ml-6">
                <p className="flex items-center">
                  <span className="material-icons text-[#FF4C00] mr-2">arrow_right</span>
                  Baut nicht mehr Städte als üblich!
                </p>
                <p className="flex items-center">
                  <span className="material-icons text-[#FF4C00] mr-2">arrow_right</span>
                  Dreht nach dem Boost einige Runden auf x1 ums Spielbrett.
                </p>
                <p className="flex items-center">
                  <span className="material-icons text-[#FF4C00] mr-2">arrow_right</span>
                  Spielt klug. Verpasst z.B im Topevent nicht den Zeitpunkt um zu stoppen.
                </p>
                <p className="flex items-center">
                  <span className="material-icons text-[#FF4C00] mr-2">arrow_right</span>
                  Es sollte eigentlich klar sein, aber: Spart euch unnötige Screenshots eures Würfelstands auf FB.
                </p>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="preise" className="scroll-mt-20 animate-[fadeIn_0.5s_ease-out_forwards] animation-delay-500">
            <h2 className="font-['Baloo_2'] font-bold text-xl md:text-2xl bg-[#00CFFF]/10 px-6 py-3 rounded-xl inline-block mx-auto my-4 border-b-2 border-[#00CFFF] text-[#FF4C00] flex items-center justify-center">
              <span className="material-icons text-[#FF4C00] mr-2">monetization_on</span>
              Preise & Bedingungen
            </h2>
            
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
              <div className="space-y-3 mb-6">
                <p className="flex items-start">
                  <span className="material-icons text-green-500 mr-2 flex-shrink-0">check_circle</span>
                  <span><span className="font-bold">Eventabschlüsse</span> sind immer inklusive.</span>
                </p>
                <p className="flex items-start">
                  <span className="material-icons text-green-500 mr-2 flex-shrink-0">check_circle</span>
                  <span>Die <span className="font-bold">letzte Aufgabe im Topevent</span> kann offen bleiben, sofern sie nur Würfel liefert.</span>
                </p>
                <p className="flex items-start">
                  <span className="material-icons text-[#FF4C00] mr-2 flex-shrink-0">casino</span>
                  <span>Würfelangaben haben eine <span className="font-bold">Toleranz von ±2.500 Würfeln</span>.<br />
                  <span className="text-gray-600 ml-6">Beispiel: Bei 25.000 Würfeln erhaltet ihr zwischen 22.500 und 27.500.</span>
                  </span>
                </p>
              </div>

              <PricingGrid />
            </div>
          </section>
        </div>
      </main>
      
      <BackToTop />
      <Footer />
    </div>
  );
}
