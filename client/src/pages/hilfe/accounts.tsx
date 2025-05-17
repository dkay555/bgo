import { Link } from 'wouter';
import { useEffect } from 'react';

export default function AccountsHilfe() {
  useEffect(() => {
    document.title = 'Accounts Hilfe | babixGO';
  }, []);

  return (
    <div className="container mx-auto px-4 py-8" id="top">
      <div className="flex flex-col items-center mb-8">
        <Link href="/hilfe" className="self-start text-[#0A3A68] hover:text-[#FF4C00] mb-4 inline-flex items-center transition-colors">
          <span className="material-icons mr-1">arrow_back</span>
          Zurück zur Hilfe
        </Link>
        <h1 className="font-['Baloo_2'] font-bold text-2xl md:text-3xl bg-[#00CFFF]/10 px-6 py-3 rounded-xl inline-block mx-auto mb-4 border-b-2 border-[#00CFFF] text-[#FF4C00]">
          Monopoly GO Accounts - Hilfe & Informationen
        </h1>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="babix-info-header mx-auto mb-6">Monopoly Go Accounts - was du wissen solltest</h2>
          
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-500 text-sm mb-1">babixGO</p>
              <p className="text-gray-500 text-sm">Veröffentlicht: 26. Jan.</p>
            </div>
          </div>
          
          <div className="mb-8">
            <p className="mb-6">
              In letzter Zeit erreichen uns immer häufiger Fragen zu Accounts die von anderen Anbietern verkauft werden. Mit diesem Beitrag wollen wir dir das nötige Wissen an die Hand geben, um beim Kauf eines Monopoly GO Accounts die richtigen Entscheidungen zu treffen.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
              <p className="mb-2 font-semibold">Inhaltsübersicht:</p>
              <ul className="space-y-2">
                <li>
                  <a href="#situation" className="text-[#00CFFF] hover:underline flex items-center">
                    <span className="material-icons text-sm mr-1">link</span>
                    Die aktuelle Situation: Günstige Accounts mit Risiko
                  </a>
                </li>
                <li>
                  <a href="#sicher" className="text-[#00CFFF] hover:underline flex items-center">
                    <span className="material-icons text-sm mr-1">link</span>
                    Woran erkenne ich einen sicheren Account?
                  </a>
                </li>
                <li>
                  <a href="#unsere" className="text-[#00CFFF] hover:underline flex items-center">
                    <span className="material-icons text-sm mr-1">link</span>
                    Unsere Accounts – Qualität statt Risiko
                  </a>
                </li>
                <li>
                  <a href="#fazit" className="text-[#00CFFF] hover:underline flex items-center">
                    <span className="material-icons text-sm mr-1">link</span>
                    Fazit: Sicherheit geht vor
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div id="situation" className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Die aktuelle Situation: Günstige Accounts mit Risiko</h3>
            
            <p className="mb-4">
              Es ist leider gängige Praxis, Accounts zu verkaufen, die erst wenige Stunden oder Tage alt sind. Oftmals werden sie durch massives boosten von Würfeln aufgepeppt und zu vermeintlich günstigen Preisen angeboten. Doch diese „Schnäppchen" haben einen Haken.
            </p>
            
            <h4 className="font-semibold text-[#0A3A68] mb-3 mt-5">Das Problem mit jungen Monopoly Go Accounts</h4>
            <p className="mb-3">
              Seit den „großen Bannwellen" im Oktober und November 2024 geht Monopoly verstärkt gegen solche jungen Accounts vor. Diese Accounts werden mittlerweile genauer überwacht, wie sich auch in den Spieldaten zeigt.
            </p>
            
            <h4 className="font-semibold text-[#0A3A68] mb-3 mt-5">Die Logik dahinter?</h4>
            <p className="mb-3">
              Spieler, deren Accounts gesperrt wurden, hören nicht auf, sondern erstellen neue Profile – und genau diese geraten schnell ins Visier.
            </p>
            
            <h4 className="babix-info-header text-[#0A3A68] mb-3 mt-5">Die Konsequenz?</h4>
            <p className="mb-3">
              Diese Accounts sind meist von Anfang an „geflaggt" und laufen hoher Gefahr, früher oder später gesperrt zu werden.
            </p>
          </div>
          
          <div id="sicher" className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Woran erkenne ich einen sicheren Account?</h3>
            
            <p className="mb-4">
              Damit du sicher spielen kannst, solltest du beim Kauf eines Monopoly GO Accounts folgende Punkte beachten:
            </p>
            
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-5">
              <h4 className="babix-info-header text-[#0A3A68] mb-3">Alter:</h4>
              <ul className="list-disc pl-5 mb-3 space-y-2">
                <li>Vermögenswert: Accounts mit minimalem Spielfortschritt bzw. sehr geringem Vermögenswert sollten euch aufhorchen lassen.</li>
                <li>Prüft die Account ID oder lasst euch die Token und Schilde Sammlung zeigen. Vor allem letzteres lässt einfachen Rückschluss auf das Account Alter zu.</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-5">
              <h4 className="babix-info-header text-[#0A3A68] mb-3">Nutzungssicherheit:</h4>
              <ul className="list-disc pl-5 mb-3 space-y-2">
                <li>Anleitung zur Nutzung: Stellt sicher, dass euch genau erklärt wird, wie der Account sicher verwendet werden kann – besonders, wenn ihr euren Hauptaccount weiterhin nutzen möchtet.</li>
                <li>IDs beachten: Fragt nach den IDs und lasst euch erklären, wie ihr sie verwendet. Diese sind essenziell, um Banns zu vermeiden – vorausgesetzt, der Account wurde sauber und organisch hochgespielt.</li>
              </ul>
            </div>
            
            <div className="bg-[#E6F7FF] border-l-4 border-[#00CFFF] p-4 rounded-r-md mb-5">
              <p className="text-gray-700 italic">
                Randnotiz: Diverse IDs speichern wir von euren Accounts beim Würfelboost. Keine Sorge, sie gewähren keinen Zugriff auf euer Spiel.
              </p>
            </div>
          </div>
          
          <div id="unsere" className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Unsere Accounts – Qualität statt Risiko</h3>
            
            <p className="mb-4">
              Wir gehen einen anderen Weg. Unsere Accounts werden sorgfältig und mit Blick auf Sicherheit aufgebaut:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 hover:border-[#00CFFF] transition-colors">
                <h4 className="babix-info-header text-[#0A3A68] mb-3">„Die Jungen"</h4>
                <p className="mb-4">Diese Accounts werden mindestens sechs Wochen aktiv und mit langsamem, stetigem Wachstum gespielt.</p>
                <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-1 px-3 rounded-md transition-colors text-sm inline-flex items-center">
                  <span className="material-icons text-sm mr-1">shopping_cart</span>
                  Account kaufen
                </button>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 hover:border-[#00CFFF] transition-colors">
                <h4 className="babix-info-header text-[#0A3A68] mb-3">„Die Alten"</h4>
                <p className="mb-4">Diese Accounts haben eine längere Spielhistorie und sind entsprechend erprobt.</p>
                <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-1 px-3 rounded-md transition-colors text-sm inline-flex items-center">
                  <span className="material-icons text-sm mr-1">shopping_cart</span>
                  Account kaufen
                </button>
              </div>
            </div>
            
            <h4 className="babix-info-header text-[#0A3A68] mb-3 mt-5">Allgemein:</h4>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Werden entweder verknüpft mit einem FB-Account oder als Gast Accounts übergeben.</li>
              <li>Ihr erhaltet für den Account einige weitere Dateien, so wie eine Anleitung für das sichere Nutzen von 2 oder mehr Accounts.</li>
            </ul>
          </div>
          
          <div id="fazit" className="mb-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Fazit: Sicherheit geht vor</h3>
            
            <p className="mb-4">
              Der Kauf eines Monopoly GO Accounts sollte gut überlegt sein. Lasst euch nicht von niedrigen Preisen und hohen Würfelmengen blenden. Achtet stattdessen auf die Spielhistorie, den Vermögenswert und eine klare Anleitung zur Nutzung.
            </p>
            
            <div className="bg-[#FFEBCC] border-l-4 border-[#FF4C00] p-4 rounded-r-md mb-6">
              <p className="font-semibold text-[#0A3A68]">
                Bei uns könnt ihr sicher sein: Unsere Accounts sind nachhaltig aufgebaut und bieten euch ein mit langfristiges Spielerlebnis mit dem geringsten möglichen Risiko eines Banns.
              </p>
            </div>
          </div>
          
          <div className="bg-[#E6F7FF] border-l-4 border-[#00CFFF] p-4 rounded-r-md">
            <h4 className="font-bold text-[#0A3A68] mb-2 border-b-2 border-[#00CFFF] pb-2 inline-block">Monopoly GO Accounts kaufen</h4>
            <p className="text-gray-700 mb-3">Besuche unseren Shop, um sicher und langfristig nutzbare Monopoly GO Accounts zu erwerben.</p>
            <Link href="/shop">
              <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-2 px-4 rounded-md transition-colors inline-flex items-center">
                <span className="material-icons mr-1">shopping_cart</span>
                Zum Shop
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}