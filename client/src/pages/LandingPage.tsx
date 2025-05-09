import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'wouter';

export default function LandingPage() {
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
    <div className="min-h-screen flex flex-col bg-gray-50 font-['Nunito_Sans'] text-[#0A3A68]">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-6 md:py-10 flex-grow">
        <div className="space-y-8">
          {/* Hero Section */}
          <section className="relative">
            <div className="text-center">
              <h1 className="font-['Baloo_2'] font-bold text-2xl md:text-3xl bg-[#00CFFF]/10 px-6 py-3 rounded-xl inline-block mx-auto mb-4 border-b-2 border-[#00CFFF] text-[#FF4C00] animate-[fadeIn_0.5s_ease-out_forwards]">
                Willkommen bei babixGO!
              </h1>
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-[0_4px_10px_rgba(0,0,0,0.1)] animate-[fadeIn_0.5s_ease-out_forwards] animation-delay-100">
                <p className="text-lg mb-4">Monopoly GO Würfelboosts für dein Spielerlebnis</p>
                <p className="mb-6">Der sichere und persönliche Service für deinen Würfelbedarf. Profitiere von unserer Erfahrung und unseren fairen Angeboten.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="orange" size="lg" asChild className="font-bold">
                    <a href="#angebote">Unsere Angebote</a>
                  </Button>
                  <Button variant="darkblue" size="lg" asChild className="font-bold">
                    <a href="#ueber">Über uns</a>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Vorteile Section */}
          <section id="vorteile" className="scroll-mt-20 animate-[fadeIn_0.5s_ease-out_forwards] animation-delay-200">
            <h2 className="font-['Baloo_2'] font-bold text-xl md:text-2xl bg-[#00CFFF]/10 px-6 py-3 rounded-xl inline-block mx-auto my-4 border-b-2 border-[#00CFFF] text-[#FF4C00] text-center">
              Deine Vorteile mit babixGO
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-[0_4px_10px_rgba(0,0,0,0.1)] border-l-4 border-[#00CFFF] transition-transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <span className="material-icons text-[#FF4C00] text-3xl mr-3">security</span>
                  <h3 className="font-['Baloo_2'] font-bold text-lg">Sicher</h3>
                </div>
                <p>Wir legen größten Wert auf die Sicherheit deines Accounts und verwenden fortschrittliche Anti-Anticheat Maßnahmen.</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-[0_4px_10px_rgba(0,0,0,0.1)] border-l-4 border-[#00CFFF] transition-transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <span className="material-icons text-[#FF4C00] text-3xl mr-3">support_agent</span>
                  <h3 className="font-['Baloo_2'] font-bold text-lg">Persönlich</h3>
                </div>
                <p>Individueller Service und persönliche Betreuung. Wir nehmen uns Zeit für deine Fragen und Anliegen.</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-[0_4px_10px_rgba(0,0,0,0.1)] border-l-4 border-[#00CFFF] transition-transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <span className="material-icons text-[#FF4C00] text-3xl mr-3">verified</span>
                  <h3 className="font-['Baloo_2'] font-bold text-lg">Erfahren</h3>
                </div>
                <p>Über 200 erfolgreiche Boosts. Unsere Erfahrung garantiert dir ein optimales Ergebnis mit minimalem Risiko.</p>
              </div>
            </div>
          </section>

          {/* Über Uns Section */}
          <section id="ueber" className="scroll-mt-20 animate-[fadeIn_0.5s_ease-out_forwards] animation-delay-300">
            <h2 className="font-['Baloo_2'] font-bold text-xl md:text-2xl bg-[#00CFFF]/10 px-6 py-3 rounded-xl inline-block mx-auto my-4 border-b-2 border-[#00CFFF] text-[#FF4C00] text-center">
              Über uns
            </h2>
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-[0_4px_10px_rgba(0,0,0,0.1)] border-l-4 border-[#FF4C00]">
              <p className="mb-4">Wir sind ein engagiertes Team von Monopoly GO Enthusiasten, die verstehen, wie frustrierend es sein kann, im Spiel voranzukommen, ohne hunderte Euro im Ingame-Shop auszugeben.</p>
              
              <p className="mb-4">Mit babixGO haben wir einen Service geschaffen, der es <span className="font-bold">jedem ermöglicht, sein Album abzuschließen</span> und im Spiel voranzukommen, ohne das Budget zu sprengen.</p>
              
              <p>Was uns von anderen unterscheidet? Wir konzentrieren uns nicht darauf, möglichst viele Würfel zu verkaufen oder den niedrigsten Preis anzubieten. Stattdessen gestalten wir unsere Angebote in einer Größenordnung, die für deine <span className="font-bold">Accountsicherheit optimal ist</span>. Qualität statt Quantität - das ist unser Motto.</p>
            </div>
          </section>

          {/* Angebote Section */}
          <section id="angebote" className="scroll-mt-20 animate-[fadeIn_0.5s_ease-out_forwards] animation-delay-400">
            <h2 className="font-['Baloo_2'] font-bold text-xl md:text-2xl bg-[#00CFFF]/10 px-6 py-3 rounded-xl inline-block mx-auto my-4 border-b-2 border-[#00CFFF] text-[#FF4C00] text-center">
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
                <div className="bg-[#00CFFF]/10 rounded-lg p-5 border-l-4 border-[#00CFFF]">
                  <h3 className="font-['Baloo_2'] font-bold text-lg mb-3 flex items-center">
                    <span className="material-icons text-[#FF4C00] mr-2">check_circle</span>
                    Inklusive bei jedem Boost
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="material-icons text-[#FF4C00] mr-2 flex-shrink-0">check</span>
                      <span>Eventabschlüsse für laufende Events</span>
                    </li>
                    <li className="flex items-start">
                      <span className="material-icons text-[#FF4C00] mr-2 flex-shrink-0">check</span>
                      <span>Sicherheitsmaßnahmen für deinen Account</span>
                    </li>
                    <li className="flex items-start">
                      <span className="material-icons text-[#FF4C00] mr-2 flex-shrink-0">check</span>
                      <span>Persönliche Betreuung und Support</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-red-50 rounded-lg p-5 border-l-4 border-red-500">
                  <h3 className="font-['Baloo_2'] font-bold text-lg mb-3 flex items-center">
                    <span className="material-icons text-red-500 mr-2">info</span>
                    Warum keine größeren Boosts?
                  </h3>
                  <p>Es mag verlockend sein, einen riesigen Würfelboost zu wollen, aber wir begrenzen unsere Angebote bewusst auf eine sichere Menge.</p>
                  <p className="mt-2">Größere Boosts erhöhen das Risiko für deinen Account erheblich und liefern nicht immer ein besseres Spielerlebnis.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section id="testimonials" className="scroll-mt-20 animate-[fadeIn_0.5s_ease-out_forwards] animation-delay-500">
            <h2 className="font-['Baloo_2'] font-bold text-xl md:text-2xl bg-[#00CFFF]/10 px-6 py-3 rounded-xl inline-block mx-auto my-4 border-b-2 border-[#00CFFF] text-[#FF4C00] text-center">
              Das sagen unsere Kunden
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
                <div className="flex items-center mb-4">
                  <span className="material-icons text-[#FF4C00] text-xl">format_quote</span>
                  <div className="ml-2 text-yellow-500">
                    <span className="material-icons text-sm">star</span>
                    <span className="material-icons text-sm">star</span>
                    <span className="material-icons text-sm">star</span>
                    <span className="material-icons text-sm">star</span>
                    <span className="material-icons text-sm">star</span>
                  </div>
                </div>
                <p className="italic mb-4">"Absolut zuverlässiger Service! Habe meinen Würfelboost innerhalb kürzester Zeit erhalten und konnte endlich mein Album vervollständigen. Sehr empfehlenswert!"</p>
                <p className="font-bold">- Lisa M.</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
                <div className="flex items-center mb-4">
                  <span className="material-icons text-[#FF4C00] text-xl">format_quote</span>
                  <div className="ml-2 text-yellow-500">
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
      
      <BackToTop />
      <Footer />
    </div>
  );
}