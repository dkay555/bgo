import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { CONTACT } from '@/lib/constants';
import { useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export default function StartPage() {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    subject: 'Kontaktanfrage von der Startseite',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await apiRequest('POST', '/api/contact', formState);
      if (response.ok) {
        toast({
          title: "Nachricht gesendet",
          description: "Vielen Dank für deine Nachricht. Wir werden uns so schnell wie möglich bei dir melden.",
          variant: "default",
        });
        // Formular zurücksetzen
        setFormState({
          name: '',
          email: '',
          message: '',
          subject: 'Kontaktanfrage von der Startseite',
          phone: ''
        });
      } else {
        const data = await response.json();
        toast({
          title: "Fehler",
          description: data.message || "Ein Fehler ist aufgetreten. Bitte versuche es später erneut.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Ein Fehler ist aufgetreten. Bitte versuche es später erneut.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  return (
    <main className="px-4 py-6 md:py-10 flex-grow font-['Nunito_Sans'] text-[#0A3A68]" id="top">
      {/* Hero Section - Überschrift und direkte Links */}
      <section className="py-6 md:py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00CFFF]/10 to-[#FF4C00]/10 animate-gradient-x"></div>
        <div className="max-w-4xl mx-auto relative px-4">
          <div className="text-center mb-8">
            <h1 className="babix-info-header font-bold text-3xl md:text-4xl px--2 py-2">
              Willkommen bei babixGO!
            </h1>
            <p className="text-base md:text-lg mb-6">Würfel, Events, Sticker & mehr – alles für dein Monopoly GO Abenteuer.</p>
            
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <Button variant="darkblue" asChild className="font-bold flex items-center gap-2">
                <Link href="/news">
                  <span className="material-icons">feed</span>
                  News
                </Link>
              </Button>
              
              <Button variant="cyan" asChild className="font-bold flex items-center gap-2">
                <Link href="/produkte">
                  <span className="material-icons">shopping_cart</span>
                  Shop
                </Link>
              </Button>
              
              <Button variant="orange" asChild className="font-bold flex items-center gap-2">
                <Link href="/auth">
                  <span className="material-icons">person</span>
                  Login
                </Link>
              </Button>
              
              <Button variant="darkblue" asChild className="font-bold flex items-center gap-2">
                <Link href="/hilfe">
                  <span className="material-icons">help_outline</span>
                  Hilfe
                </Link>
              </Button>
              
              <Button variant="cyan" asChild className="font-bold flex items-center gap-2">
                <Link href="/kontakt">
                  <span className="material-icons">contact_support</span>
                  Kontakt
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* News Sektion */}
      <section className="py-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="babix-info-header mx-auto mb-8 text-center">News</h2>
          
          <div className="bg-white rounded-lg shadow-md p-5">
            <h3 className="font-bold text-[#0A3A68] text-xl mb-3">Neue Preise für Würfel - Angebotsanpassung</h3>
            <p className="text-[#0A3A68]/80 mb-3">
              Die letzten Tage war es still um babixGO... Wir haben unser Angebot überarbeitet und optimiert.
            </p>
            <div className="flex justify-end">
              <Link href="/hilfe/news_preise_angebot.html">
                <Button variant="darkblue" className="text-sm px-3 py-1">
                  [weiterlesen]
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
            Was wir dir bieten:
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
                    <Link href="/produkte/wuerfel#top">Zum Shop</Link>
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
                    <Link href="/produkte/sticker#top">Zum Shop</Link>
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
                    <Link href="/produkte/partner#top">Zum Shop</Link>
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
                    <Link href="/produkte/race#top">Zum Shop</Link>
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
            Warum du babixGO wählen solltest
          </h2>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="mb-4">Es ist kein Geheimnis: Am Ende gewinnt immer die Bank. Daran können wir auch nichts ändern. Was wir allerdings können: Den Wert der Würfel soweit verschieben, dass Event-, Set- und Albumabschlüsse für jeden möglich sind.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#0A3A68] text-lg flex items-center">
                    <span className="material-icons text-[#FF4C00] mr-2">check_circle</span>
                    Alles aus einer Hand
                  </h3>
                  <p className="ml-8 text-[#0A3A68]/80">Würfelboosts, Sticker, Solo-, Team- und Partnerevents sowie komplette Accounts – und das alles an einem Ort.</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-[#0A3A68] text-lg flex items-center">
                    <span className="material-icons text-[#FF4C00] mr-2">check_circle</span>
                    Persönlicher Service über WhatsApp
                  </h3>
                  <p className="ml-8 text-[#0A3A68]/80">Direkter Kontakt, individuelle Betreuung und schnelle Antworten. Bei babixGO bekommst du den Service, den du verdienst.</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-[#0A3A68] text-lg flex items-center">
                    <span className="material-icons text-[#FF4C00] mr-2">check_circle</span>
                    Technisches Verständnis & Accountsicherheit
                  </h3>
                  <p className="ml-8 text-[#0A3A68]/80">Mit fundiertem Wissen über die Spielmechaniken, Sicherheitsmaßnahmen und Tracking-Funktionen sorgen wir dafür, dass dein Account in sicheren Händen bleibt.</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-[#0A3A68] text-lg flex items-center">
                    <span className="material-icons text-[#FF4C00] mr-2">check_circle</span>
                    Kontinuität und Erfahrung
                  </h3>
                  <p className="ml-8 text-[#0A3A68]/80">Seit dem Release von Monopoly Go ist babixGO am Puls der Zeit und bringt fast zwei Jahre Erfahrung und Leidenschaft für das Spiel mit.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-bold text-[#0A3A68] text-xl mb-2">Dein Vorteil:</h3>
                
                <div>
                  <h3 className="font-bold text-[#0A3A68] text-lg flex items-center">
                    <span className="material-icons text-[#FF4C00] mr-2">check_circle</span>
                    Faire Preise
                  </h3>
                  <p className="ml-8 text-[#0A3A68]/80">Wir legen großen Wert darauf, dir einen fairen und erschwinglichen Preis anzubieten - für jedes Budget ist etwas passendes dabei. Durch Gewinnspiele können wir auch an die etwas geben, die kein Geld für Monopoly Go ausgeben möchten.</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-[#0A3A68] text-lg flex items-center">
                    <span className="material-icons text-[#FF4C00] mr-2">check_circle</span>
                    Zuverlässige Leistungen
                  </h3>
                  <p className="ml-8 text-[#0A3A68]/80">Wir reagieren schnell auf Änderungen im Spiel. Durch unser inzwischen großes Netzwerk bemerken wir Änderungen früh und können dadurch schon Lösungen präsentieren bevor überhaupt alle Accounts betroffen sind.</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-[#0A3A68] text-lg flex items-center">
                    <span className="material-icons text-[#FF4C00] mr-2">check_circle</span>
                    Transparente Kommunikation
                  </h3>
                  <p className="ml-8 text-[#0A3A68]/80">Egal, ob es unsere Angebote und Preise betrifft, Änderungen an der Spielmechanik die Dich und deinen Account betreffen könnten oder es sich um dein Feedback handelt. Je offener wir miteinander sprechen, desto unkomplizierter Dein Erlebnis.</p>
                </div>
              </div>
            </div>
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
            <form className="space-y-4" onSubmit={handleContactSubmit}>
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">Dein Name</label>
                <input 
                  id="name" 
                  name="name" 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF]" 
                  required
                  value={formState.name}
                  onChange={handleInputChange}
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
                  value={formState.email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2 font-medium">Deine Telefonnummer (optional)</label>
                <input 
                  id="phone" 
                  name="phone" 
                  type="tel" 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF]"
                  value={formState.phone}
                  onChange={handleInputChange} 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">Deine Nachricht</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF]" 
                  required
                  value={formState.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              
              <Button 
                variant="orange" 
                type="submit" 
                className="flex items-center gap-2 font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">
                      <span className="material-icons text-base">sync</span>
                    </span>
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    <span className="material-icons text-base">send</span>
                    Absenden
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}