import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SEOHead from '@/components/SEOHead';

export default function ShopUebersicht() {
  return (
    <main className="px-4 py-6 md:py-10 flex-grow font-['Nunito_Sans'] text-[#0A3A68]">
      <SEOHead 
        pageName="Übersicht unserer Leistungen" 
        customTitle="Unsere Leistungen | babixGO Shop" 
        customDescription="Hier findest du all unsere Produkte auf einen Blick - Würfel, Sticker, Partnerevents und Tycoon Racers."
      />
      
      {/* Hero Section */}
      <section className="py-6 md:py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A3A68]/10 to-[#00CFFF]/10 animate-gradient-x"></div>
        <div className="max-w-4xl mx-auto relative px-4">
          <div className="text-center mb-8">
            <h1 className="babix-info-header font-bold text-3xl md:text-4xl px--2 py-2">
              Unsere Leistungen
            </h1>
            <p className="text-base md:text-lg mb-6">Hier findest du all unsere Produkte auf einem Blick</p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-10">
            
            {/* Würfel Section */}
            <Card>
              <CardHeader className="bg-[#00CFFF]/10 border-b border-[#00CFFF]/20">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-[#00CFFF]">casino</span>
                    <span>Würfel</span>
                  </div>
                  <div className="flex space-x-2">
                    <Link href="/shop/wuerfel">
                      <span className="inline-flex items-center text-sm bg-[#0A3A68] text-white px-3 py-1 rounded hover:bg-[#0A3A68]/90 transition-colors">
                        <span className="material-icons text-sm mr-1">shopping_cart</span>
                        Shop
                      </span>
                    </Link>
                    <Link href="/hilfe/wuerfel">
                      <span className="inline-flex items-center text-sm bg-[#00CFFF] text-white px-3 py-1 rounded hover:bg-[#00CFFF]/90 transition-colors">
                        <span className="material-icons text-sm mr-1">help_outline</span>
                        Hilfe
                      </span>
                    </Link>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-2 text-left font-medium">Produkt</th>
                        <th className="px-4 py-2 text-left font-medium">Menge</th>
                        <th className="px-4 py-2 text-left font-medium">Preis</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">Würfelboost</td>
                        <td className="px-4 py-3">25.000</td>
                        <td className="px-4 py-3 font-bold text-[#FF4C00]">25€</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium"></td>
                        <td className="px-4 py-3">35.000</td>
                        <td className="px-4 py-3 font-bold text-[#FF4C00]">35€</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium"></td>
                        <td className="px-4 py-3">45.000</td>
                        <td className="px-4 py-3 font-bold text-[#FF4C00]">45€</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">Kennenlernboost</td>
                        <td className="px-4 py-3">10.000</td>
                        <td className="px-4 py-3 font-bold text-[#FF4C00]">10€</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">inkl. Events</td>
                        <td className="px-4 py-3">10.000</td>
                        <td className="px-4 py-3 font-bold text-[#FF4C00]">15€</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">Retterboost</td>
                        <td className="px-4 py-3">4.000</td>
                        <td className="px-4 py-3 font-bold text-[#FF4C00]">10€</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            {/* Sticker Section */}
            <Card>
              <CardHeader className="bg-[#00CFFF]/10 border-b border-[#00CFFF]/20">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-[#00CFFF]">collections_bookmark</span>
                    <span>Sticker</span>
                  </div>
                  <div className="flex space-x-2">
                    <Link href="/shop/sticker">
                      <span className="inline-flex items-center text-sm bg-[#0A3A68] text-white px-3 py-1 rounded hover:bg-[#0A3A68]/90 transition-colors">
                        <span className="material-icons text-sm mr-1">shopping_cart</span>
                        Shop
                      </span>
                    </Link>
                    <Link href="/hilfe/sticker">
                      <span className="inline-flex items-center text-sm bg-[#00CFFF] text-white px-3 py-1 rounded hover:bg-[#00CFFF]/90 transition-colors">
                        <span className="material-icons text-sm mr-1">help_outline</span>
                        Hilfe
                      </span>
                    </Link>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-2 text-left font-medium">Sterneanzahl</th>
                        <th className="px-4 py-2 text-left font-medium">Preis</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">1 bis 3 Sterne</td>
                        <td className="px-4 py-3 font-bold text-[#FF4C00]">2€</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">4 Sterne</td>
                        <td className="px-4 py-3 font-bold text-[#FF4C00]">2,50€</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">5 Sterne</td>
                        <td className="px-4 py-3 font-bold text-[#FF4C00]">3€</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50 bg-yellow-50">
                        <td className="px-4 py-3 font-medium flex items-center">
                          <span className="material-icons text-yellow-500 mr-2 text-sm">stars</span>
                          4 Sterne Gold
                        </td>
                        <td className="px-4 py-3 font-bold text-[#FF4C00]">4€</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50 bg-yellow-50">
                        <td className="px-4 py-3 font-medium flex items-center">
                          <span className="material-icons text-yellow-500 mr-2 text-sm">stars</span>
                          5 Sterne Gold
                        </td>
                        <td className="px-4 py-3 font-bold text-[#FF4C00]">5€</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            {/* Partnerevent Section */}
            <Card>
              <CardHeader className="bg-[#00CFFF]/10 border-b border-[#00CFFF]/20">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-[#00CFFF]">people</span>
                    <span>Partnerevent</span>
                  </div>
                  <div className="flex space-x-2">
                    <Link href="/shop/partnerevent">
                      <span className="inline-flex items-center text-sm bg-[#0A3A68] text-white px-3 py-1 rounded hover:bg-[#0A3A68]/90 transition-colors">
                        <span className="material-icons text-sm mr-1">shopping_cart</span>
                        Shop
                      </span>
                    </Link>
                    <Link href="/hilfe/partner">
                      <span className="inline-flex items-center text-sm bg-[#00CFFF] text-white px-3 py-1 rounded hover:bg-[#00CFFF]/90 transition-colors">
                        <span className="material-icons text-sm mr-1">help_outline</span>
                        Hilfe
                      </span>
                    </Link>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-2 text-left font-medium">Typ</th>
                        <th className="px-4 py-2 text-left font-medium">Menge</th>
                        <th className="px-4 py-2 text-left font-medium">Preis</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">Partner</td>
                        <td className="px-4 py-3">x1</td>
                        <td className="px-4 py-3 font-bold text-[#FF4C00]">7€</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium"></td>
                        <td className="px-4 py-3">x4</td>
                        <td className="px-4 py-3 font-bold text-[#FF4C00]">25€</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">Eventwährung</td>
                        <td className="px-4 py-3">10.000</td>
                        <td className="px-4 py-3 font-bold text-[#FF4C00]">20€</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium"></td>
                        <td className="px-4 py-3">20.000</td>
                        <td className="px-4 py-3 font-bold text-[#FF4C00]">30€</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            {/* Tycoon Racers Section */}
            <Card>
              <CardHeader className="bg-[#00CFFF]/10 border-b border-[#00CFFF]/20">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-[#00CFFF]">emoji_events</span>
                    <span>Tycoon Racers</span>
                  </div>
                  <div className="flex space-x-2">
                    <Link href="/shop/tycoonracers">
                      <span className="inline-flex items-center text-sm bg-[#0A3A68] text-white px-3 py-1 rounded hover:bg-[#0A3A68]/90 transition-colors">
                        <span className="material-icons text-sm mr-1">shopping_cart</span>
                        Shop
                      </span>
                    </Link>
                    <Link href="/hilfe/race">
                      <span className="inline-flex items-center text-sm bg-[#00CFFF] text-white px-3 py-1 rounded hover:bg-[#00CFFF]/90 transition-colors">
                        <span className="material-icons text-sm mr-1">help_outline</span>
                        Hilfe
                      </span>
                    </Link>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-2 text-left font-medium">Typ</th>
                        <th className="px-4 py-2 text-left font-medium">Menge</th>
                        <th className="px-4 py-2 text-left font-medium">Preis</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">Teamplatz</td>
                        <td className="px-4 py-3">x1</td>
                        <td className="px-4 py-3 font-bold text-[#FF4C00]">20€</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium"></td>
                        <td className="px-4 py-3">x3</td>
                        <td className="px-4 py-3 font-bold text-[#FF4C00]">55€</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">Flaggen</td>
                        <td className="px-4 py-3">10.000</td>
                        <td className="px-4 py-3 font-bold text-[#FF4C00]">25€</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium"></td>
                        <td className="px-4 py-3">20.000</td>
                        <td className="px-4 py-3 font-bold text-[#FF4C00]">45€</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0A3A68] text-white rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Bereit, dein Monopoly Go Erlebnis zu verbessern?</h2>
            <p className="mb-4">Wähle das passende Produkt für deine Bedürfnisse und steigere dein Spielerlebnis!</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/shop/wuerfel">
                <span className="inline-flex items-center bg-[#FF4C00] hover:bg-[#FF4C00]/90 text-white px-4 py-2 rounded-md transition-colors">
                  <span className="material-icons mr-2">casino</span>
                  Würfel kaufen
                </span>
              </Link>
              <Link href="/kontakt">
                <span className="inline-flex items-center bg-[#00CFFF] hover:bg-[#00CFFF]/90 text-white px-4 py-2 rounded-md transition-colors">
                  <span className="material-icons mr-2">contact_support</span>
                  Beratung erhalten
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}