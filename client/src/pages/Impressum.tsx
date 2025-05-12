import { useEffect } from 'react';
import { MainLayout } from "@/layouts/MainLayout";

export default function Impressum() {
  useEffect(() => {
    document.title = 'Impressum | babixGO';
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl" id="top">
        <h1 className="babix-info-header text-3xl md:text-4xl font-bold mb-8 text-center">Impressum</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4">Angaben gemäß § 5 TMG</h2>
          
          <div className="mb-6">
            <p className="text-xl font-bold text-[#0A3A68]">babixGO</p>
            <p className="mb-1">Dennis Kemper</p>
            <p className="mb-1">Kaiserstraße 26</p>
            <p className="mb-1">58706 Menden</p>
            <p className="mb-1">Germany</p>
          </div>
          
          <h3 className="text-xl font-bold text-[#0A3A68] mb-2">Kontakt</h3>
          <div className="mb-6">
            <p className="mb-1">Telefon: 015734509031</p>
            <p className="mb-1">E-Mail: denniskemper@outlook.de</p>
          </div>
          
          <h3 className="text-xl font-bold text-[#0A3A68] mb-2">Verantwortlich gemäß § 18 MStV</h3>
          <div className="mb-6">
            <p className="mb-1">Dennis Kemper</p>
            <p className="mb-1">Kaiserstraße 26</p>
            <p className="mb-1">58706 Menden</p>
          </div>
          
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">EU-Streitschlichtung</h2>
          <p className="mb-2">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer" className="text-[#00CFFF] hover:text-[#FF4C00] transition-colors ml-1">
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          
          <p className="mb-6">
            <strong>Wichtiger Hinweis:</strong> Die Plattform zur Online-Streitbeilegung (OS) wird zum 20.7.2025 endgültig eingestellt. 
            Die Einreichung von Beschwerden auf der OS-Plattform wird daher bereits am 20.3.2025 eingestellt.
          </p>
          
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">Verbraucherstreitbeilegung</h2>
          <p className="mb-6">
            Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht bereit.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}