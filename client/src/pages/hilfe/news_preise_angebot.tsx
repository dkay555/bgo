import { useEffect } from 'react';
import { PricingGrid } from '@/components/PricingCard';

export default function NewsPreiseAngebot() {
  // Load Material Icons from Google CDN
  useEffect(() => {
    document.title = 'Neue Preise & Accountsicherheit | babixGO';
    
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
      <h1 className="font-['Baloo_2'] font-bold text-2xl md:text-3xl bg-[#00CFFF]/10 px-6 py-3 rounded-xl inline-block mx-auto my-4 border-b-2 border-[#00CFFF] text-[#FF4C00] babix-info-header">
        Neue Preise für Würfel - Angebotsanpassung
      </h1>
      
      <div className="space-y-8">
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
          <h2 className="babix-info-header">Accountsicherheit / Neue Preise</h2>
          
          <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-[#00CFFF] mb-8">
            <p className="mb-4 text-lg">Die letzten Tage war es still um babixGO...</p>
            
            <p className="mb-4">
              Wir haben uns und unser Vorgehen hinterfragt, daraufhin unsere "Anti-Anticheat Maßnahmen" überdacht, überarbeitet und an über 200 Accounts getestet & zu guter letzt an unserer Preisliste gearbeitet.
            </p>
          </div>
          
          <h3 className="font-['Baloo_2'] font-bold text-xl text-[#0A3A68] mb-4">Unser Versprechen an euch</h3>
          <p className="mb-4">
            Es war uns immer wichtig das unser Service persönlich ist & bleibt. Wir haben (selbstverständlich unentgeltlich) stundenlang an euren Last-Minute-Album-Abschluss gearbeitet, verloren geglaubte Accounts wieder korrekt mit FB verbunden oder einfach nur über Monopoly Taktiken philosophiert.
          </p>
          
          <p className="mb-6">
            Wir hatten und haben ein faires und verständnisvolles miteinander. Das funktioniert, weil wir das Vergnügen an Monopoly GO teilen, weil wir mit babixGO gestartet sind um <span className="font-bold">jeden einen Albumabschluss zu ermöglichen</span> ohne hunderte Euro im Ingame Shop zu zahlen.
          </p>
          
          <p className="mb-6">
            In letzter Zeit sprießen die Würfelverkäufer, <span className="font-bold">ohne Know-how über selbst offensichtliche Peaks & Trackingmethoden</span>, mit der Hoffnung auf 'nen schnellen Euro wieder aus jeder Ecke. Wir bekommen viele Nachrichten bzgl. unserer angebotenen Menge & das viele deshalb woanders kaufen würden. Wie bisher jedesmal werden wir an keinen Preiskampf teilnehmen. Unsere Angebote gestalten wir in der Größenordnung, wie es für eure <span className="font-bold">Accounts am sichersten ist & nicht danach, wie wir am meisten Einnahmen generieren.</span>
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
          <h2 className="babix-info-header">Änderungen am Angebot</h2>
          
          <div className="mb-6">
            <h3 className="font-['Baloo_2'] font-bold text-xl text-[#0A3A68] mb-3 flex items-center">
              <span className="material-icons text-[#FF4C00] mr-2">looks_one</span>
              Keine kleineren Boosts
            </h3>
            <p className="mb-3">
              Bei einem 20.000 Würfel Boost sind wir bereits ca. die Hälfte der Zeit mit der Absicherung beschäftigt. Kleinere Angebote wären also nur aus z.B. diesen Gründen sinnvoll:
            </p>
            
            <ul className="space-y-2 ml-6">
              <li className="flex items-start">
                <span className="material-icons text-[#FF4C00] mr-2 flex-shrink-0">arrow_right</span>
                <span><span className="font-bold">Verkaufspsychologisch:</span> Wer klein kauft, kauft öfter und gibt im Endeffekt mehr aus.</span>
              </li>
              <li className="flex items-start">
                <span className="material-icons text-[#FF4C00] mr-2 flex-shrink-0">arrow_right</span>
                <span><span className="font-bold">Kundengewinnung:</span> Geringerer Preis, geringere Hürde.</span>
              </li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="font-['Baloo_2'] font-bold text-xl text-[#0A3A68] mb-3 flex items-center">
              <span className="material-icons text-[#FF4C00] mr-2">looks_two</span>
              Keine größeren Boosts
            </h3>
            <p>
              Es mag schön aussehen 100.000+ als Würfelstand angezeigt zu bekommen, allerdings würden wir so den Boost weit in die Länge ziehen müssen um u.a. einen zu guten Erfolgsquotienten zu vermeiden.
            </p>
          </div>
        </div>
        
        <div className="bg-red-50 rounded-xl p-6 md:p-8 shadow-[0_4px_10px_rgba(0,0,0,0.1)] border-l-4 border-red-500">
          <h4 className="babix-info-header text-[#0A3A68] mb-4 flex items-center">
            <span className="material-icons text-red-500 mr-2">warning</span>
            Nach dem Boost beachten
          </h4>
          
          <p className="mb-4">
            So wie wir vor & während des Boosts, solltet ihr selbst auch einige Dinge nach dem Boost beachten:
          </p>
          
          <ul className="space-y-2 ml-6">
            <li className="flex items-center">
              <span className="material-icons text-[#FF4C00] mr-2">arrow_right</span>
              Baut nicht mehr Städte als üblich!
            </li>
            <li className="flex items-center">
              <span className="material-icons text-[#FF4C00] mr-2">arrow_right</span>
              Dreht nach dem Boost einige Runden auf x1 ums Spielbrett.
            </li>
            <li className="flex items-center">
              <span className="material-icons text-[#FF4C00] mr-2">arrow_right</span>
              Spielt klug. Verpasst z.B im Topevent nicht den Zeitpunkt um zu stoppen.
            </li>
            <li className="flex items-center">
              <span className="material-icons text-[#FF4C00] mr-2">arrow_right</span>
              Es sollte eigentlich klar sein, aber: Spart euch unnötige Screenshots eures Würfelstands auf FB.
            </li>
          </ul>
        </div>
        
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
          <h2 className="babix-info-header flex items-center">
            <span className="material-icons text-[#FF4C00] mr-2">monetization_on</span>
            Preise & Bedingungen
          </h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <span className="material-icons text-green-500 mr-2 flex-shrink-0">check_circle</span>
              <span><span className="font-bold">Eventabschlüsse</span> sind immer inklusive.</span>
            </div>
            <div className="flex items-start">
              <span className="material-icons text-green-500 mr-2 flex-shrink-0">check_circle</span>
              <span>Die <span className="font-bold">letzte Aufgabe im Topevent</span> kann offen bleiben, sofern sie nur Würfel liefert.</span>
            </div>
            <div className="flex items-start">
              <span className="material-icons text-[#FF4C00] mr-2 flex-shrink-0">casino</span>
              <span>Würfelangaben haben eine <span className="font-bold">Toleranz von ±2.500 Würfeln</span>.<br />
              <span className="text-gray-600 ml-6">Beispiel: Bei 25.000 Würfeln erhaltet ihr zwischen 22.500 und 27.500.</span>
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#00CFFF]/10 p-4 rounded-lg border-l-4 border-[#00CFFF]">
              <h4 className="font-bold text-lg mb-2">25.000 Würfel</h4>
              <p className="text-2xl font-bold text-[#FF4C00]">25€</p>
            </div>
            <div className="bg-[#00CFFF]/10 p-4 rounded-lg border-l-4 border-[#00CFFF]">
              <h4 className="font-bold text-lg mb-2">35.000 Würfel</h4>
              <p className="text-2xl font-bold text-[#FF4C00]">35€</p>
            </div>
            <div className="bg-[#00CFFF]/10 p-4 rounded-lg border-l-4 border-[#00CFFF]">
              <h4 className="font-bold text-lg mb-2">45.000 Würfel</h4>
              <p className="text-2xl font-bold text-[#FF4C00]">45€</p>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-bold text-lg mb-2 flex items-center">
              <span className="material-icons text-yellow-500 mr-2">stars</span>
              Sonderangebot
            </h4>
            <p className="mb-2">Nach Absprache: Während Lucky Chance oder Dice Roll aktiv ist:</p>
            <p className="mb-2"><span className="font-bold">40.000 - 50.000 Würfel</span> für <span className="text-2xl font-bold text-[#FF4C00]">30€</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}