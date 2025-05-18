import { Link } from 'wouter';
import { useEffect } from 'react';

export default function WuerfelHilfe() {
  useEffect(() => {
    document.title = 'Würfelboost Hilfe | babixGO';
  }, []);

  return (
    <div className="container mx-auto px-4 py-8" id="top">
      <div className="flex flex-col items-center mb-8">
        <Link href="/hilfe" className="self-start text-[#0A3A68] hover:text-[#FF4C00] mb-4 inline-flex items-center transition-colors">
          <span className="material-icons mr-1">arrow_back</span>
          Zurück zur Hilfe
        </Link>
        <h1 className="font-['Baloo_2'] font-bold text-2xl md:text-3xl bg-[#00CFFF]/10 px-6 py-3 rounded-xl inline-block mx-auto mb-4 border-b-2 border-[#00CFFF] text-[#FF4C00]">
          Monopoly Go Würfel für deinen Account
        </h1>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <p className="text-gray-700 mb-6">Erfahre mehr darüber wie genau du Würfel (oder Flaggen/Eventwährung) bekommst, welche Voraussetzungen gelten und was beachtet werden sollte um die Accountsicherheit zu wahren.</p>
        
        <div className="mb-8">
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="material-icons text-[#0A3A68] mr-2">list</span>
              <a href="#voraussetzungen" className="font-bold hover:text-[#00CFFF] transition-colors">Voraussetzungen</a>
            </li>
            <li className="flex items-center">
              <span className="material-icons text-[#0A3A68] mr-2">list</span>
              <a href="#ablauf" className="font-bold hover:text-[#00CFFF] transition-colors">Ablauf</a>
            </li>
            <li className="flex items-center">
              <span className="material-icons text-[#0A3A68] mr-2">list</span>
              <a href="#nachBoost" className="font-bold hover:text-[#00CFFF] transition-colors">Nach dem Boost</a>
            </li>
            <li className="flex items-center">
              <span className="material-icons text-[#0A3A68] mr-2">list</span>
              <a href="#sicherheit" className="font-bold hover:text-[#00CFFF] transition-colors">Accountsicherheit</a>
            </li>
            <li className="flex items-center">
              <span className="material-icons text-[#0A3A68] mr-2">list</span>
              <a href="#angebote" className="font-bold hover:text-[#00CFFF] transition-colors">Weitere Würfel-Angebote</a>
            </li>
          </ul>
        </div>
        
        <div className="mb-8" id="voraussetzungen">
          <h2 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Voraussetzungen Würfelboost</h2>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start">
              <span className="material-icons text-[#0A3A68] mr-2 mt-1">check_circle</span>
              <div>
                <p><strong>Ab 100 Würfel ist es ein Versuch Wert</strong>, im Optimalfall sollten es 200 sein.</p>
                <div className="bg-[#E6F7FF] border-l-4 border-[#00CFFF] p-4 rounded-r-md my-3">
                  <h4 className="text-[#0A3A68] font-bold text-lg mb-1 flex items-center">
                    <span className="material-icons text-[#00CFFF] mr-2">lightbulb</span>
                    Zu wenig Würfel?
                  </h4>
                  <p>Lässt sich ein Set vervollständigen? Ist der Freundschaftsbalken gefüllt? Schreib uns und wir finden gemeinsam auch dann eine Lösung wenn es schnell gehen muss.</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="material-icons text-[#0A3A68] mr-2 mt-1">check_circle</span>
              <div>
                <p><strong>Ein verfügbarer High Roller.</strong></p>
                <p className="ml-4">→ Aktuell gibt es diesen als 7. Belohnung im Bahnhofsturnier oder als Flash Event. Aktuelle Listen findest du zum Beispiel auf <a href="https://monopolygo.wiki" target="_blank" rel="noopener noreferrer" className="text-[#00CFFF] hover:text-[#FF4C00] underline">monopolygo.wiki</a>.</p>
                <div className="flex justify-center">
                  <img src="/bahnhofsturnier.jpg" alt="Bahnhofsturnier mit High Roller" className="my-3 rounded-md w-64 h-auto border border-[#0A3A68]/20" />
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="material-icons text-[#0A3A68] mr-2 mt-1">check_circle</span>
              <div>
                <p><strong>Dein Account muss mit Facebook oder Google verbunden sein.</strong></p>
                <p className="ml-4">→ Es ist nicht erforderlich deine FB Zugangsdaten zu teilen.</p>
                <p><strong>Mehr zu dem Thema:</strong> <Link href="/hilfe/login" className="text-[#00CFFF] hover:text-[#FF4C00] underline">Login-Methoden für den Würfelboost</Link></p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#FFEBCC] border-l-4 border-[#FF4C00] p-4 rounded-r-md mt-6">
            <h4 className="text-[#0A3A68] font-bold text-lg mb-2">Zusätzliche Voraussetzungen für das "Lucky Chance/Dice Roll/Frei Parken x2" Angebot:</h4>
            <p className="mb-3">Eines der Events muss einlösbar sein. Sollen wir ein zeitliches begrenztes Flash Event nutzen, solltest du dich früh genug melden & deinen Platz reservieren. Die Plätze sind aufgrund des zeitlichen Fensters sehr begrenzt. Schick uns einfach eine Nachricht wenn du ein Event im Blick hast.</p>
            <div className="mt-2 rounded-md max-w-md mx-auto bg-[#FF4C00]/10 p-6 text-center border border-[#FF4C00]/20">
              <div className="flex items-center justify-center gap-4">
                <div className="flex flex-col items-center">
                  <img src="/images/flash-events/LuckyChance_icon.png" alt="Lucky Chance" className="w-14 h-14 object-contain" />
                  <p className="text-xs mt-1">Lucky Chance</p>
                </div>
                <div className="flex flex-col items-center">
                  <img src="/images/flash-events/RollMatch_icon.png" alt="Dice Roll" className="w-14 h-14 object-contain" />
                  <p className="text-xs mt-1">Dice Roll</p>
                </div>
                <div className="flex flex-col items-center">
                  <img src="/images/flash-events/FreiParken_icon.png" alt="Frei Parken" className="w-14 h-14 object-contain" />
                  <p className="text-xs mt-1">Frei Parken x2</p>
                </div>
              </div>
              <p className="font-bold mt-3">Flash Events für optimalen Würfelboost</p>
            </div>
          </div>
        </div>
        
        <div className="mb-8" id="ablauf">
          <h2 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Ablauf</h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-700">
            <li>Wir erstellen eine virtuelle Umgebung für deinen Account. Mit deinem Einverständnis speichern wir diese für den nächsten Boost.</li>
            <li>Wir informieren dich, dass wir starten.</li>
          </ul>
          
          <div className="bg-[#FFEBEB] border-l-4 border-[#FF4C00] p-4 mt-4 mb-4 rounded-r-md">
            <p className="font-bold text-[#FF4C00] mb-1">Wichtiger Hinweis:</p>
            <p className="text-gray-700">Während wir uns im Spiel befinden öffne nicht die Monopoly Go App. Dies führt zu einem Abbruch und meist zu einer Verzögerung des Würfelboosts.</p>
          </div>
          
          <ul className="list-disc pl-5 space-y-3 text-gray-700">
            <li>Nach dem Login erspielen wir die vereinbarten Würfel. Falls wir uns mit deinen Zugangsdaten eingeloggt haben kannst du diese bereits jetzt ändern.</li>
          </ul>
          
          <div className="bg-[#E6F7FF] border-l-4 border-[#00CFFF] p-4 mt-4 rounded-r-md flex items-start">
            <span className="material-icons text-[#00CFFF] mr-2 mt-1">schedule</span>
            <p className="text-gray-700">Der Boost dauert für z.B. 35k Würfel zwischen 15 und 30 Minuten.</p>
          </div>
          
          <ul className="list-disc pl-5 space-y-3 text-gray-700 mt-4">
            <li>Nach Fertigstellung kontaktieren wir dich per Email/WhatsApp. Du kannst nun wieder ins Spiel gehen.</li>
          </ul>
        </div>
        
        <div className="mb-8" id="nachBoost">
          <h2 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Nach dem Boost</h2>
          <p className="text-gray-700 mb-4">Es kann vorkommen das wir nicht genug Würfel erspielen oder Events nicht zu Ende bringen können. Dies ist zwar selten der Fall, aber wir bitten um Nachsicht. Selbstverständlich werdet ihr zum nächstmöglichen Zeitpunkt all eure Würfel erhalten. Sollte dir etwas auffallen, schick uns eine Nachricht und wir suchen gemeinsam ein passendes Zeitfenster.</p>
          
          <div className="bg-[#FFEBEB] border-l-4 border-[#FF4C00] p-4 rounded-r-md">
            <h4 className="text-[#0A3A68] font-bold text-lg mb-2 flex items-center">
              <span className="material-icons text-[#FF4C00] mr-2">warning</span>
              Wichtig:
            </h4>
            <p className="mb-2">So wie wir vor und während des Boosts einige Dinge beachten müssen, solltest du auch einige Sachen beherzigen:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Baue nicht mehr Städte als üblich. Durch den Boost erhältst du eine Menge Ingame Geld. Vor allem mit niedrigem Vermögenswert kann es da verlockend sein den Wheelboost zu nutzen. Scopely trackt allerdings die Steigerung des Vermögenswert ganz akribisch.</li>
              <li>Drehe ein paar Runden ums Brett. Auf x1 reicht da bereits völlig aus.</li>
              <li>Und zum Schluss: Spiele klug, stoppe rechtzeitig in Events & versuche nicht auf Teufel komm raus die nächste Belohnung im Event zu erreichen. Nutze Flash Events wie z.B. Frei Parken x2. Denn je weniger Boosts du brauchst, desto sicherer ist es für deinen Account.</li>
            </ol>
          </div>
        </div>
        
        <div className="mb-8" id="sicherheit">
          <h2 className="text-xl font-bold text-[#0A3A68] mb-4 border-b-2 border-[#00CFFF] pb-2 inline-block">Accountsicherheit</h2>
          <p className="text-gray-700 mb-4">Solltest du diese Dinge beachten ist das Risiko eines Banns / einer Suspension äußerst gering. Unter 0,1% der von uns durchgeführten Boosts führten zu einer Sperre. Die meisten davon sind mit Sicherheit auf das nicht beachten dieser Punkte zurückzuführen.</p>
          <p className="text-gray-700 mb-4">Wir kennen viele Peaks, unternehmen gegen viele Tracker etwas, nutzen Methoden die lokal, also ungesehen, ins Spiel eingreifen dennoch sei auch hier noch einmal gesagt: Wir können nicht garantieren dass dem so bleibt.</p>
          <p className="text-gray-700">Sollte es zu einer Sperre kommen gibt es beim 1. Vergehen eine 3 Tage Suspension, beim 2. mal eine 7 Tage Suspension gefolgt von dem permamenten Bann.</p>
        </div>
        
        <div id="angebote">
          <h2 className="text-xl font-bold text-[#0A3A68] mb-6 border-b-2 border-[#00CFFF] pb-2 inline-block">Weitere Würfelangebote</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FFEBCC]/30 p-5 rounded-lg border border-[#FF4C00]/30 shadow-md">
              <h3 className="text-[#0A3A68] font-bold text-lg mb-3">Retterpaket</h3>
              <p className="mb-4">Kein High Roller in Sicht aber du brauchst schnell ein paar Würfel um das Event noch beenden zu können? Dann ist dies der Boost deiner Wahl.</p>
              <p className="mb-4 text-sm">Nur per WhatsApp buchbar um sicher zu gehen dass es zeitlich für beide Seiten passt.</p>
              <p className="font-bold text-lg mb-4">4.000 Würfel → 10€</p>
              <Link href="/shop/wuerfel">
                <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-2 px-4 rounded-md transition-colors w-full">
                  Zum Shop
                </button>
              </Link>
            </div>
            
            <div className="bg-[#E6F7FF]/30 p-5 rounded-lg border border-[#00CFFF]/30 shadow-md">
              <h3 className="text-[#0A3A68] font-bold text-lg mb-3">Kennenlern-Paket</h3>
              <p className="font-bold text-lg mb-3">10.000 Würfel für 10€</p>
              <p className="mb-3">Nur online im Shop zu kaufen.</p>
              <p className="mb-4">Da zu viele kleine Boosts das Bannrisiko erheblich erhöhen, gibt es hier einige Einschränkungen:</p>
              <ul className="list-disc pl-5 mb-4 space-y-1 text-gray-700">
                <li>Pro Account nur alle 7 Tage möglich.</li>
                <li>Nur mit dem Authtoken als Login möglich.</li>
                <li>Abschluss von Top- und Seitenevent kostet 5€ extra.</li>
                <li>Ansonsten gelten dieselben Voraussetzungen wie für den normalen Boost.</li>
              </ul>
              <Link href="/shop/wuerfel">
                <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-2 px-4 rounded-md transition-colors w-full">
                  Zum Shop
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}