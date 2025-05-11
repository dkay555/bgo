import { PricingGrid } from '@/components/PricingCard';

export default function PreiseHilfe() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="font-['Baloo_2'] font-bold text-2xl md:text-3xl bg-[#00CFFF]/10 px-6 py-3 rounded-xl inline-block mx-auto my-4 border-b-2 border-[#00CFFF] text-[#FF4C00]">
        Preise & Bedingungen
      </h1>

      <div className="bg-white rounded-xl p-6 md:p-8 shadow-[0_4px_10px_rgba(0,0,0,0.1)] mb-8">
        <p className="mb-6">
          Hier finden Sie einen Überblick über unsere Preise und Bedingungen für die verschiedenen Dienste von babixGO.
          Wir bemühen uns stets um transparente Preisgestaltung und faire Konditionen.
        </p>

        <h2 className="font-['Baloo_2'] font-bold text-xl text-[#0A3A68] mb-4">
          Unsere Grundkonditionen
        </h2>

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

        <div className="mb-8">
          <h2 className="font-['Baloo_2'] font-bold text-xl text-[#0A3A68] mb-4">
            Wichtige Hinweise
          </h2>
          
          <div className="bg-red-50 rounded-xl p-6 shadow-[0_4px_10px_rgba(0,0,0,0.1)] border-l-4 border-red-500">
            <h3 className="font-['Baloo_2'] font-bold text-lg text-[#0A3A68] mb-4 flex items-center">
              <span className="material-icons text-red-500 mr-2">warning</span>
              Nach dem Boost beachten
            </h3>
            
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
        </div>

        <h2 className="font-['Baloo_2'] font-bold text-xl text-[#0A3A68] mb-4">
          Aktuelle Preisübersicht
        </h2>
        
        <PricingGrid />

        <div className="bg-[#00CFFF]/10 p-4 rounded-lg mt-6">
          <p className="text-sm text-[#0A3A68]">
            <span className="font-bold">Hinweis:</span> Alle Preise sind in Euro angegeben und beinhalten die gesetzliche Mehrwertsteuer. Preisänderungen vorbehalten.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 md:p-8 shadow-[0_4px_10px_rgba(0,0,0,0.1)] mb-8">
        <h2 className="font-['Baloo_2'] font-bold text-xl text-[#0A3A68] mb-4">
          Häufig gestellte Fragen zu Preisen
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-[#0A3A68] mb-2">Warum bietet ihr keine kleineren Boosts an?</h3>
            <p className="mb-4">Bei einem 20.000 Würfel Boost sind wir bereits ca. die Hälfte der Zeit mit der Absicherung beschäftigt. Kleinere Angebote wären für uns wirtschaftlich nicht sinnvoll und würden das Verhältnis zwischen Aufwand und Nutzen verschlechtern.</p>
          </div>

          <div>
            <h3 className="font-bold text-[#0A3A68] mb-2">Warum bietet ihr keine größeren Boosts (über 50.000) an?</h3>
            <p className="mb-4">Es mag verlockend erscheinen, 100.000+ als Würfelstand angezeigt zu bekommen, allerdings müssten wir den Boost dann weit in die Länge ziehen, um den Algorithmus nicht zu alarmieren. Unsere Priorität liegt auf der Sicherheit eurer Accounts, nicht auf maximalen Würfelzahlen.</p>
          </div>

          <div>
            <h3 className="font-bold text-[#0A3A68] mb-2">Gibt es Rabatte für Stammkunden?</h3>
            <p className="mb-4">Wir schätzen unsere treuen Kunden. Aktuelle Sonderaktionen und Rabatte kommunizieren wir direkt über unsere Kanäle. Kontaktieren Sie uns gerne für individuelle Angebote.</p>
          </div>
        </div>
      </div>
    </div>
  );
}