import { Link } from 'wouter';
import { useEffect } from 'react';

export default function StickerHilfe() {
  useEffect(() => {
    document.title = 'Sticker Hilfe | babixGO';
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <Link href="/hilfe" className="self-start text-[#0A3A68] hover:text-[#FF4C00] mb-4 inline-flex items-center transition-colors">
          <span className="material-icons mr-1">arrow_back</span>
          Zurück zur Hilfe
        </Link>
        <h1 className="font-['Baloo_2'] font-bold text-2xl md:text-3xl bg-[#00CFFF]/10 px-6 py-3 rounded-xl inline-block mx-auto mb-4 border-b-2 border-[#00CFFF] text-[#FF4C00]">
          Sticker - Hilfe & Informationen
        </h1>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="babix-info-header mx-auto mb-6">Hilfe zu Stickern</h2>
          <p className="mb-6">
            Dieser Bereich wird in Kürze mit detaillierten Hilfe-Informationen zu Stickern gefüllt.
          </p>
          
          <div className="bg-[#E6F7FF] border-l-4 border-[#00CFFF] p-4 rounded-r-md">
            <h4 className="babix-info-header text-[#0A3A68] mb-2">Sticker kaufen</h4>
            <p className="text-gray-700 mb-3">In der Zwischenzeit können Sie bereits unsere Sticker-Angebote durchsuchen und bestellen.</p>
            <Link href="/produkte/sticker">
              <button className="bg-[#0A3A68] hover:bg-[#00CFFF] text-white py-2 px-4 rounded-md transition-colors inline-flex items-center">
                <span className="material-icons mr-1">shopping_cart</span>
                Zum Sticker-Shop
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}