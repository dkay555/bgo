import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function LandingPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-6 md:py-10 flex-grow font-['Nunito_Sans'] text-[#0A3A68]">
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="relative">
          <div className="text-center">
            <h1 className="babix-info-header text-2xl md:text-3xl mx-auto mb-4 text-center animate-[fadeIn_0.5s_ease-out_forwards]">
              Willkommen bei babixGO!
            </h1>
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-[0_4px_10px_rgba(0,0,0,0.1)] animate-[fadeIn_0.5s_ease-out_forwards] animation-delay-100">
              <p className="text-lg mb-4">Monopoly GO Würfelboosts für dein Spielerlebnis</p>
              <p className="mb-6">Der sichere und persönliche Service für deinen Würfelbedarf. Profitiere von unserer Erfahrung und unseren fairen Angeboten.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="orange" size="lg" asChild className="font-bold">
                  <a href="#angebote">Unsere Angebote</a>
                </Button>
                <Button variant="whatsapp" size="lg" asChild className="font-bold">
                  <a href="https://wa.me/4915223842897" target="_blank" rel="noreferrer">
                    <span className="material-icons mr-2">whatsapp</span>
                    Kontakt
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Vorteile Section */}
        <section id="vorteile" className="scroll-mt-20 animate-[fadeIn_0.5s_ease-out_forwards] animation-delay-200">
          <h2 className="babix-info-header mx-auto my-4 text-center">
            Deine Vorteile mit babixGO
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-[0_4px_10px_rgba(0,0,0,0.1)] border-l-4 border-[#00CFFF] transition-transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <span className="material-icons text-[#FF4C00] text-3xl mr-3">security</span>
                <h3 className="font-['Baloo_2'] font-bold text-lg">Sicher</h3>
              </div>
              <p>Alle unsere Methoden sind zu 100% sicher für deinen Account, mit minimalen Risiken und maximaler Sicherheit.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-[0_4px_10px_rgba(0,0,0,0.1)] border-l-4 border-[#00CFFF] transition-transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <span className="material-icons text-[#FF4C00] text-3xl mr-3">speed</span>
                <h3 className="font-['Baloo_2'] font-bold text-lg">Schnell</h3>
              </div>
              <p>Wir sorgen für eine schnelle Abwicklung und Lieferung, damit du sofort weiterspielen kannst.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-[0_4px_10px_rgba(0,0,0,0.1)] border-l-4 border-[#00CFFF] transition-transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <span className="material-icons text-[#FF4C00] text-3xl mr-3">verified_user</span>
                <h3 className="font-['Baloo_2'] font-bold text-lg">Erfahren</h3>
              </div>
              <p>Über 200 erfolgreiche Boosts. Unsere Erfahrung garantiert dir ein optimales Ergebnis mit minimalem Risiko.</p>
            </div>
          </div>
        </section>

        {/* Über Uns Section */}
        <section id="ueber" className="scroll-mt-20 animate-[fadeIn_0.5s_ease-out_forwards] animation-delay-300">
          <h2 className="babix-info-header mx-auto my-4 text-center">
            Über uns
          </h2>
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-[0_4px_10px_rgba(0,0,0,0.1)] border-l-4 border-[#FF4C00]">
            <p className="mb-4">Wir sind ein engagiertes Team von Monopoly GO Enthusiasten, die verstehen, wie frustrierend es sein kann, im Spiel voranzukommen, ohne hunderte Euro im Ingame-Shop auszugeben.</p>
            
            <p className="mb-4">Mit babixGO haben wir einen Service geschaffen, der es <span className="font-bold">jedem ermöglicht, sein Album abzuschließen</span> und im Spiel voranzukommen, ohne das Budget zu sprengen.</p>
            
            <p>Unser Fokus liegt auf Sicherheit, Fairness und Kundenzufriedenheit. Wir bieten nicht nur Würfel, sondern einen umfassenden Service mit persönlicher Beratung.</p>
          </div>
        </section>

        {/* Angebote Section */}
        <section id="angebote" className="scroll-mt-20 animate-[fadeIn_0.5s_ease-out_forwards] animation-delay-400">
          <h2 className="babix-info-header mx-auto my-4 text-center">
            Unsere Angebote
          </h2>
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
            <p className="mb-6 text-center">Entdecke unsere sorgfältig gestalteten Würfelboost-Pakete:</p>
            
            <div className="flex justify-center mb-6">
              <Button variant="orange" size="lg" asChild className="font-bold">
                <Link href="/preise">Zu den Preispaketen</Link>
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-50 p-5 rounded-lg border border-[#00CFFF]/20">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-['Baloo_2'] font-bold text-lg text-[#0A3A68]">
                    Unsere Empfehlung
                  </h3>
                  <span className="bg-[#FF4C00] text-white px-2 py-1 rounded-full text-xs font-bold">Beliebt</span>
                </div>
                <p>Unser mittleres Paket mit 7.500 Würfeln bietet das beste Preis-Leistungs-Verhältnis und ist perfekt für Events und Albenvervollständigung.</p>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-lg border border-[#00CFFF]/20">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-['Baloo_2'] font-bold text-lg text-[#0A3A68]">
                    Warum keine größeren Boosts?
                  </h3>
                  <p>Es mag verlockend sein, einen riesigen Würfelboost zu wollen, aber wir begrenzen unsere Angebote bewusst auf eine sichere Menge.</p>
                  <p className="mt-2">Größere Boosts erhöhen das Risiko für deinen Account erheblich und liefern nicht immer ein besseres Spielerlebnis.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="scroll-mt-20 animate-[fadeIn_0.5s_ease-out_forwards] animation-delay-500">
          <h2 className="babix-info-header mx-auto my-4 text-center">
            Das sagen unsere Kunden
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
              <div className="flex items-center mb-4">
                <span className="material-icons text-[#FF4C00] text-xl">format_quote</span>
                <div className="flex ml-auto">
                  <span className="material-icons text-sm">star</span>
                  <span className="material-icons text-sm">star</span>
                  <span className="material-icons text-sm">star</span>
                  <span className="material-icons text-sm">star</span>
                  <span className="material-icons text-sm">star</span>
                </div>
              </div>
              <p className="italic mb-4">"Super schneller und zuverlässiger Service! Die Würfel waren innerhalb von Minuten auf meinem Account und ich konnte endlich mein Album vervollständigen."</p>
              <p className="font-bold">- Lisa S.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
              <div className="flex items-center mb-4">
                <span className="material-icons text-[#FF4C00] text-xl">format_quote</span>
                <div className="flex ml-auto">
                  <span className="material-icons text-sm">star</span>
                  <span className="material-icons text-sm">star</span>
                  <span className="material-icons text-sm">star</span>
                  <span className="material-icons text-sm">star</span>
                  <span className="material-icons text-sm">star</span>
                </div>
              </div>
              <p className="italic mb-4">"Bereits zum dritten Mal bei babixGO bestellt und nie enttäuscht worden. Der persönliche Kontakt und Service ist unschlagbar. Danke!"</p>
              <p className="font-bold">- Michael K.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="animate-[fadeIn_0.5s_ease-out_forwards] animation-delay-600">
          <div className="bg-[#0A3A68] rounded-xl p-8 shadow-lg text-white text-center">
            <h2 className="font-['Baloo_2'] font-bold text-2xl mb-4">Bereit für deinen Würfelboost?</h2>
            <p className="mb-6">Kontaktiere uns noch heute und sichere dir deinen persönlichen Monopoly GO Boost!</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="orange" size="lg" asChild className="font-bold">
                <Link href="/preise">Preise ansehen</Link>
              </Button>
              <Button variant="whatsapp" size="lg" asChild className="font-bold">
                <a href="https://wa.me/4915223842897" target="_blank" rel="noreferrer">
                  <span className="material-icons mr-2">whatsapp</span>
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}