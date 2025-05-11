import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { CONTACT } from '@/lib/constants';

export default function StartPage() {
  return (
    <main className="px-4 py-6 md:py-10 flex-grow font-['Nunito_Sans'] text-[#0A3A68]">
      {/* Hero Section - Noch kleiner */}
      <section className="text-center py-4 md:py-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00CFFF]/10 to-[#FF4C00]/10 animate-gradient-x"></div>
        <div className="max-w-4xl mx-auto relative">
          <h1 className="font-['Baloo_2'] font-bold text-xl md:text-2xl bg-[#00CFFF]/10 px-4 py-2 rounded-xl inline-block mx-auto mb-2 border-b-2 border-[#00CFFF] text-[#FF4C00]">
            Willkommen bei babixGO
          </h1>
          <p className="text-base md:text-lg">Würfel, Events, Sticker & mehr – alles für dein Monopoly GO Abenteuer.</p>
        </div>
      </section>
      
      {/* Was gibt's Neues Sektion */}
      <section className="py-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="babix-info-header mb-4 text-center text-lg md:text-xl mx-auto">Was gibt's Neues?</h2>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-[#0A3A68] font-bold mb-2 border-b border-[#00CFFF] pb-1 inline-block">Angebot und Preisanpassung</h3>
            <p className="text-[#0A3A68]/80 mb-3">
              Aufgrund der hohen Nachfrage und um unseren Service weiterhin in gewohnter Qualität anbieten zu können, 
              haben wir unsere Preisstruktur angepasst. Die neuen Preise gelten ab sofort für alle Dienste.
            </p>
            <div className="flex justify-end">
              <Link href="/news/angebot_und_preisanpassung">
                <Button variant="darkblue" className="text-xs px-3 py-1">
                  Weiterlesen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="angebote" className="py-8 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="babix-info-header mx-auto mb-8 text-center">
            Unsere Bestseller
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product Card 1 */}
            <div className="bg-[#00CFFF]/20 rounded-md overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1">
              <div className="relative">
                <img src="/images/kategorie_wuerfel_trans.png" alt="Würfelboosts" className="w-full h-40 object-contain" />
                <span className="absolute bottom-0 left-4 transform translate-y-1/2 bg-[#0A3A68]/70 text-white font-['Baloo_2'] font-bold px-4 py-2 rounded-md shadow-md">
                  Würfelboosts
                </span>
              </div>
              <div className="p-6 pt-8">
                <p className="mb-6">Ohne sie geht gar nichts bei Monopoly Go: Kaufe Würfel für deinen Monopoly Go Account.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="orange" asChild className="flex-1 font-bold">
                    <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer">Schreib uns</a>
                  </Button>
                  <Button variant="darkblue" asChild className="flex-1 font-bold">
                    <Link href="/produkte/wuerfel">Zum Shop</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="bg-[#00CFFF]/20 rounded-md overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1">
              <div className="relative">
                <img src="/images/kategorie_sticker_trans.png" alt="Sticker" className="w-full h-40 object-contain" />
                <span className="absolute bottom-0 left-4 transform translate-y-1/2 bg-[#0A3A68]/70 text-white font-['Baloo_2'] font-bold px-4 py-2 rounded-md shadow-md">
                  Sticker
                </span>
              </div>
              <div className="p-6 pt-8">
                <p className="mb-6">Fehlende Sticker? - Nicht mit uns, wir haben sie alle!</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="orange" asChild className="flex-1 font-bold">
                    <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer">Schreib uns</a>
                  </Button>
                  <Button variant="darkblue" asChild className="flex-1 font-bold">
                    <Link href="/produkte/sticker">Zum Shop</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className="bg-[#00CFFF]/20 rounded-md overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1">
              <div className="relative">
                <img src="/images/kategorie_partner_trans.png" alt="Partnerevents" className="w-full h-40 object-contain" />
                <span className="absolute bottom-0 left-4 transform translate-y-1/2 bg-[#0A3A68]/70 text-white font-['Baloo_2'] font-bold px-4 py-2 rounded-md shadow-md">
                  Partnerevents
                </span>
              </div>
              <div className="p-6 pt-8">
                <p className="mb-6">Zuverlässige Partner gesucht? Wer, wenn nicht wir?</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="orange" asChild className="flex-1 font-bold">
                    <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer">Schreib uns</a>
                  </Button>
                  <Button variant="darkblue" asChild className="flex-1 font-bold">
                    <Link href="/produkte/partner">Zum Shop</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Product Card 4 - Tycoon Racers */}
            <div className="bg-[#00CFFF]/20 rounded-md overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1">
              <div className="relative">
                <img src="/images/kategorie_racers_trans.png" alt="Tycoon Racers" className="w-full h-40 object-contain" />
                <span className="absolute bottom-0 left-4 transform translate-y-1/2 bg-[#0A3A68]/70 text-white font-['Baloo_2'] font-bold px-4 py-2 rounded-md shadow-md">
                  Tycoon Racers
                </span>
              </div>
              <div className="p-6 pt-8">
                <p className="mb-6">Erreiche höhere Platzierungen bei Tycoon Racers Events und sichere dir exklusive Belohnungen!</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="orange" asChild className="flex-1 font-bold">
                    <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer">Schreib uns</a>
                  </Button>
                  <Button variant="darkblue" asChild className="flex-1 font-bold">
                    <Link href="/produkte/race">Zum Shop</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="ueber" className="py-8 bg-gray-100 my-12 rounded-xl scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="babix-info-header mx-auto mb-6 text-center">
            Über babixGO
          </h2>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="mb-4">babixGO ist deine erste Adresse für alles rund um <strong className="text-[#FF4C00]">Monopoly GO</strong>. Als langjähriger Spieler weiß ich genau, was dir in den wichtigsten Momenten weiterhilft – bei Events, Stickeralben oder Würfelbedarf.</p>
            
            <ul className="space-y-3 mt-6">
              <li className="flex items-start">
                <span className="material-icons text-[#FF4C00] mr-2 flex-shrink-0">check_circle</span>
                <span>Schnelle & zuverlässige Lieferung</span>
              </li>
              <li className="flex items-start">
                <span className="material-icons text-[#FF4C00] mr-2 flex-shrink-0">check_circle</span>
                <span>Individuelle Beratung & faire Preise</span>
              </li>
              <li className="flex items-start">
                <span className="material-icons text-[#FF4C00] mr-2 flex-shrink-0">check_circle</span>
                <span>Sicherheit & Erfahrung</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-8 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="babix-info-header mx-auto mb-6 text-center">
            Kontaktiere uns
          </h2>
          
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
            <form className="space-y-4" action="mailto:support@babixgo.de" method="post" encType="text/plain">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">Dein Name</label>
                <input 
                  id="name" 
                  name="name" 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF]" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">Deine E-Mail</label>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF]" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="nachricht" className="block mb-2 font-medium">Deine Nachricht</label>
                <textarea 
                  id="nachricht" 
                  name="nachricht" 
                  rows={4} 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF]" 
                  required
                ></textarea>
              </div>
              
              <Button variant="orange" type="submit" className="flex items-center gap-2 font-bold">
                <span className="material-icons text-base">send</span>
                Absenden
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}