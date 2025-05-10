import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

export default function BlogPost() {
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
      
      <main className="w-full max-w-4xl mx-auto px-3 sm:px-4 py-4 md:py-10 flex-grow">
        <article className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-r from-[#0A3A68] to-[#00CFFF] flex items-center justify-center">
              <span className="material-icons text-white text-8xl">article</span>
            </div>
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-[#FF4C00] text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">Tutorial</span>
                <span className="bg-[#00CFFF] text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">Formatierung</span>
              </div>
              <h1 className="text-white text-xl sm:text-2xl md:text-4xl font-['Baloo_2'] font-bold">
                Styling-Optionen für deinen Blogbeitrag
              </h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 text-white/80 text-xs sm:text-sm">
                <div className="flex items-center gap-1">
                  <span className="material-icons text-sm">calendar_today</span>
                  <span className="text-sm">9. Mai 2025</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-icons text-sm">person</span>
                  <span className="text-sm">von Max</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-icons text-sm">schedule</span>
                  <span className="text-sm">5 Min. Lesezeit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 md:p-8">
            {/* Introduction */}
            <div className="mb-6 sm:mb-8">
              <p className="text-base sm:text-lg leading-relaxed mb-4">
                Ein ansprechender Blogbeitrag lebt von guter Formatierung. In diesem Beispielartikel zeigen wir dir verschiedene Styling-Optionen, die du in deinen eigenen Beiträgen verwenden kannst.
              </p>
              <p className="text-lg italic text-gray-600 border-l-4 border-[#00CFFF] pl-4 py-2">
                "Ein gutes Design ist nicht nur das, was man sieht, sondern auch, wie es funktioniert." - Steve Jobs
              </p>
            </div>

            {/* Table of Contents */}
            <div className="bg-gray-50 p-4 rounded-lg mb-8">
              <h3 className="font-['Baloo_2'] text-lg font-bold mb-2 flex items-center text-[#0A3A68]">
                <span className="material-icons mr-2">list</span>Inhaltsverzeichnis
              </h3>
              <ul className="space-y-1">
                <li>
                  <a href="#headings" className="text-[#FF4C00] hover:underline flex items-center">
                    <span className="material-icons text-sm mr-1">arrow_right</span>Überschriften
                  </a>
                </li>
                <li>
                  <a href="#text-formatting" className="text-[#FF4C00] hover:underline flex items-center">
                    <span className="material-icons text-sm mr-1">arrow_right</span>Textformatierung
                  </a>
                </li>
                <li>
                  <a href="#lists" className="text-[#FF4C00] hover:underline flex items-center">
                    <span className="material-icons text-sm mr-1">arrow_right</span>Listen
                  </a>
                </li>
                <li>
                  <a href="#blockquotes" className="text-[#FF4C00] hover:underline flex items-center">
                    <span className="material-icons text-sm mr-1">arrow_right</span>Zitate
                  </a>
                </li>
                <li>
                  <a href="#boxes" className="text-[#FF4C00] hover:underline flex items-center">
                    <span className="material-icons text-sm mr-1">arrow_right</span>Info-Boxen
                  </a>
                </li>
                <li>
                  <a href="#images" className="text-[#FF4C00] hover:underline flex items-center">
                    <span className="material-icons text-sm mr-1">arrow_right</span>Bilder
                  </a>
                </li>
                <li>
                  <a href="#tables" className="text-[#FF4C00] hover:underline flex items-center">
                    <span className="material-icons text-sm mr-1">arrow_right</span>Tabellen
                  </a>
                </li>
                <li>
                  <a href="#code" className="text-[#FF4C00] hover:underline flex items-center">
                    <span className="material-icons text-sm mr-1">arrow_right</span>Code-Blöcke
                  </a>
                </li>
              </ul>
            </div>

            {/* Headings */}
            <section id="headings" className="mb-10 scroll-mt-20">
              <h2 className="font-['Baloo_2'] font-bold text-xl md:text-2xl text-[#FF4C00] mb-4 pb-2 border-b-2 border-[#00CFFF]/50">
                Überschriften
              </h2>
              <p className="mb-4">
                Überschriften helfen, deinen Inhalt zu strukturieren und die Lesbarkeit zu verbessern. Hier sind verschiedene Überschriftenformate:
              </p>

              <div className="space-y-4 mt-6">
                <div className="p-4 bg-gray-50 rounded-md">
                  <h2 className="font-['Baloo_2'] font-bold text-2xl text-[#FF4C00] mb-2">Überschrift Stufe 2</h2>
                  <p className="text-gray-500 text-sm">Wird verwendet für Hauptabschnitte</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-md">
                  <h3 className="font-['Baloo_2'] font-bold text-xl text-[#0A3A68] mb-2">Überschrift Stufe 3</h3>
                  <p className="text-gray-500 text-sm">Wird verwendet für Unterabschnitte</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-md">
                  <h4 className="font-['Baloo_2'] font-bold text-lg text-[#0A3A68] mb-2">Überschrift Stufe 4</h4>
                  <p className="text-gray-500 text-sm">Für kleinere Unterteilungen innerhalb von Abschnitten</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-md">
                  <h2 className="font-['Baloo_2'] font-bold text-xl md:text-2xl bg-[#00CFFF]/10 px-6 py-3 rounded-xl inline-block mb-2 border-b-2 border-[#00CFFF] text-[#FF4C00]">
                    Stilisierte Überschrift
                  </h2>
                  <p className="text-gray-500 text-sm">Mit Hintergrund und Border für besondere Hervorhebung</p>
                </div>
              </div>
            </section>

            {/* Text Formatting */}
            <section id="text-formatting" className="mb-10 scroll-mt-20">
              <h2 className="font-['Baloo_2'] font-bold text-xl md:text-2xl text-[#FF4C00] mb-4 pb-2 border-b-2 border-[#00CFFF]/50">
                Textformatierung
              </h2>
              <p className="mb-6">
                Mit verschiedenen Textformatierungen kannst du wichtige Informationen hervorheben und deinen Inhalt interessanter gestalten:
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="mb-2">Normaler Text in der Standardformatierung.</p>
                  <p className="text-gray-500 text-sm">Standardtext</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="mb-2">Text mit <strong className="font-bold text-[#0A3A68]">fetter Hervorhebung</strong> für wichtige Begriffe.</p>
                  <p className="text-gray-500 text-sm">Fetter Text</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="mb-2">Text mit <em className="italic">kursiver Betonung</em> für Betonung oder Eigennamen.</p>
                  <p className="text-gray-500 text-sm">Kursiver Text</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="mb-2">Text mit <span className="underline decoration-[#FF4C00] decoration-2 underline-offset-2">Unterstreichung</span> für zusätzliche Hervorhebung.</p>
                  <p className="text-gray-500 text-sm">Unterstrichener Text</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="mb-2">Text mit <span className="text-[#FF4C00] font-bold">farbiger Hervorhebung</span> für besonders wichtige Informationen.</p>
                  <p className="text-gray-500 text-sm">Farbiger Text</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="mb-2 text-lg leading-relaxed">Text mit größerer Schriftgröße und weitem Zeilenabstand für Einleitungen oder Zusammenfassungen.</p>
                  <p className="text-gray-500 text-sm">Vergrößerter Text mit erhöhtem Zeilenabstand</p>
                </div>
              </div>
            </section>

            {/* Lists */}
            <section id="lists" className="mb-10 scroll-mt-20">
              <h2 className="font-['Baloo_2'] font-bold text-xl md:text-2xl text-[#FF4C00] mb-4 pb-2 border-b-2 border-[#00CFFF]/50">
                Listen
              </h2>
              <p className="mb-6">
                Listen helfen dabei, Informationen übersichtlich zu strukturieren und leicht erfassbar zu machen:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-md">
                  <h4 className="font-['Baloo_2'] font-bold text-lg text-[#0A3A68] mb-2">Ungeordnete Liste</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Erster Listenpunkt mit normalem Text</li>
                    <li>Zweiter Listenpunkt mit <strong className="text-[#FF4C00]">Hervorhebung</strong></li>
                    <li>Dritter Listenpunkt
                      <ul className="list-circle pl-5 mt-1 space-y-1">
                        <li>Unterpunkt 1</li>
                        <li>Unterpunkt 2</li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-md">
                  <h4 className="font-['Baloo_2'] font-bold text-lg text-[#0A3A68] mb-2">Geordnete Liste</h4>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Erster Schritt der Anleitung</li>
                    <li>Zweiter Schritt mit <strong className="text-[#FF4C00]">Hervorhebung</strong></li>
                    <li>Dritter Schritt
                      <ol className="list-alpha pl-5 mt-1 space-y-1">
                        <li>Teilschritt A</li>
                        <li>Teilschritt B</li>
                      </ol>
                    </li>
                  </ol>
                </div>

                <div className="p-4 bg-gray-50 rounded-md md:col-span-2">
                  <h4 className="font-['Baloo_2'] font-bold text-lg text-[#0A3A68] mb-2">Checkliste</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="material-icons text-green-500 mr-2 flex-shrink-0">check_circle</span>
                      <span>Erster abgeschlossener Punkt der Checkliste</span>
                    </li>
                    <li className="flex items-start">
                      <span className="material-icons text-green-500 mr-2 flex-shrink-0">check_circle</span>
                      <span>Zweiter abgeschlossener Punkt</span>
                    </li>
                    <li className="flex items-start">
                      <span className="material-icons text-[#FF4C00] mr-2 flex-shrink-0">radio_button_unchecked</span>
                      <span>Dritter, noch offener Punkt der Checkliste</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Blockquotes */}
            <section id="blockquotes" className="mb-10 scroll-mt-20">
              <h2 className="font-['Baloo_2'] font-bold text-xl md:text-2xl text-[#FF4C00] mb-4 pb-2 border-b-2 border-[#00CFFF]/50">
                Zitate
              </h2>
              <p className="mb-6">
                Zitate helfen dabei, Aussagen zu betonen oder externe Quellen einzubeziehen:
              </p>

              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-md">
                  <blockquote className="border-l-4 border-[#0A3A68] pl-4 py-2 italic text-gray-700">
                    "Das Geheimnis des Erfolgs ist anzufangen."
                    <footer className="mt-2 text-sm text-[#0A3A68] not-italic">— Mark Twain</footer>
                  </blockquote>
                </div>

                <div className="p-4 bg-gray-50 rounded-md">
                  <blockquote className="bg-[#00CFFF]/10 p-4 rounded-lg italic text-[#0A3A68] relative">
                    <span className="material-icons absolute top-2 left-2 text-[#00CFFF] opacity-20 text-4xl">format_quote</span>
                    <p className="pl-8">
                      "Der beste Weg, die Zukunft vorherzusagen, ist, sie zu erschaffen."
                    </p>
                    <footer className="mt-2 text-sm text-[#0A3A68] not-italic text-right">— Peter Drucker</footer>
                  </blockquote>
                </div>

                <div className="p-4 bg-gray-50 rounded-md">
                  <blockquote className="border border-[#FF4C00]/20 bg-[#FF4C00]/5 p-4 rounded-lg">
                    <div className="flex">
                      <span className="material-icons text-[#FF4C00] mr-3 flex-shrink-0 text-2xl">lightbulb</span>
                      <p className="text-[#0A3A68]">
                        <strong>Tipp:</strong> Blockzitate können auch für Tipps, Warnungen oder besondere Hinweise verwendet werden, nicht nur für wörtliche Zitate.
                      </p>
                    </div>
                  </blockquote>
                </div>
              </div>
            </section>

            {/* Info Boxes */}
            <section id="boxes" className="mb-10 scroll-mt-20">
              <h2 className="font-['Baloo_2'] font-bold text-xl md:text-2xl text-[#FF4C00] mb-4 pb-2 border-b-2 border-[#00CFFF]/50">
                Info-Boxen
              </h2>
              <p className="mb-6">
                Info-Boxen helfen, wichtige Informationen, Warnungen oder Tipps hervorzuheben:
              </p>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-[0_4px_10px_rgba(0,0,0,0.1)] border-l-4 border-[#00CFFF]">
                  <h4 className="font-['Baloo_2'] font-bold text-lg text-[#0A3A68] mb-2 flex items-center">
                    <span className="material-icons text-[#00CFFF] mr-2">info</span>
                    Information
                  </h4>
                  <p>
                    Diese Box enthält zusätzliche Informationen, die für das Thema relevant sind, aber nicht unbedingt im Haupttext stehen müssen.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-[0_4px_10px_rgba(0,0,0,0.1)] border-l-4 border-[#FF4C00]">
                  <h4 className="font-['Baloo_2'] font-bold text-lg text-[#0A3A68] mb-2 flex items-center">
                    <span className="material-icons text-[#FF4C00] mr-2">tips_and_updates</span>
                    Tipp
                  </h4>
                  <p>
                    Diese Box enthält einen nützlichen Tipp oder einen Trick, der dir helfen kann, bessere Ergebnisse zu erzielen.
                  </p>
                </div>

                <div className="bg-red-50 rounded-xl p-6 shadow-[0_4px_10px_rgba(0,0,0,0.1)] border-l-4 border-red-500">
                  <h4 className="font-['Baloo_2'] font-bold text-lg text-[#0A3A68] mb-2 flex items-center">
                    <span className="material-icons text-red-500 mr-2">warning</span>
                    Warnung
                  </h4>
                  <p>
                    In dieser Box stehen wichtige Warnhinweise, die beachtet werden sollten, um Probleme zu vermeiden.
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-6 shadow-[0_4px_10px_rgba(0,0,0,0.1)] border-l-4 border-green-500">
                  <h4 className="font-['Baloo_2'] font-bold text-lg text-[#0A3A68] mb-2 flex items-center">
                    <span className="material-icons text-green-500 mr-2">check_circle</span>
                    Erfolg
                  </h4>
                  <p>
                    Diese Box kann verwendet werden, um erfolgreiche Ergebnisse oder Best-Practice-Beispiele hervorzuheben.
                  </p>
                </div>
              </div>
            </section>

            {/* Images */}
            <section id="images" className="mb-10 scroll-mt-20">
              <h2 className="font-['Baloo_2'] font-bold text-xl md:text-2xl text-[#FF4C00] mb-4 pb-2 border-b-2 border-[#00CFFF]/50">
                Bilder
              </h2>
              <p className="mb-6">
                Bilder lockern deinen Content auf und können komplexe Informationen visualisieren:
              </p>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="aspect-video bg-gradient-to-br from-[#0A3A68] to-[#00CFFF] flex items-center justify-center rounded-md overflow-hidden">
                    <span className="material-icons text-white text-6xl">image</span>
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2 italic">
                    Standardbild mit vollständiger Breite
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <figure className="flex flex-col items-center">
                    <div className="w-1/2 aspect-square bg-gradient-to-br from-[#FF4C00] to-[#FF9D00] flex items-center justify-center rounded-full overflow-hidden">
                      <span className="material-icons text-white text-4xl">image</span>
                    </div>
                    <figcaption className="text-center text-sm text-gray-500 mt-2 italic max-w-md">
                      Bild mit Bildunterschrift für detaillierte Beschreibungen oder Quellenangaben
                    </figcaption>
                  </figure>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/3 aspect-video bg-gradient-to-br from-[#0A3A68] to-[#003366] flex items-center justify-center rounded-md overflow-hidden">
                      <span className="material-icons text-white text-3xl">image</span>
                    </div>
                    <div className="md:w-2/3">
                      <h4 className="font-['Baloo_2'] font-bold text-lg text-[#0A3A68] mb-2">Bild mit Text</h4>
                      <p>
                        Diese Anordnung eignet sich gut für kleinere Bilder, die neben einem erklärenden Text stehen sollen. Der Text kann das Bild beschreiben oder zusätzliche Informationen liefern.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="aspect-square bg-gradient-to-br from-[#0A3A68] to-[#003366] flex items-center justify-center rounded-md overflow-hidden">
                      <span className="material-icons text-white text-xl">image</span>
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-[#00CFFF] to-[#0099CC] flex items-center justify-center rounded-md overflow-hidden">
                      <span className="material-icons text-white text-xl">image</span>
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-[#FF4C00] to-[#FF9D00] flex items-center justify-center rounded-md overflow-hidden">
                      <span className="material-icons text-white text-xl">image</span>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2 italic">
                    Bildergalerie für mehrere verwandte Bilder
                  </p>
                </div>
              </div>
            </section>

            {/* Tables */}
            <section id="tables" className="mb-10 scroll-mt-20">
              <h2 className="font-['Baloo_2'] font-bold text-xl md:text-2xl text-[#FF4C00] mb-4 pb-2 border-b-2 border-[#00CFFF]/50">
                Tabellen
              </h2>
              <p className="mb-6">
                Tabellen sind ideal, um strukturierte Daten oder Vergleiche übersichtlich darzustellen:
              </p>

              <div className="overflow-x-auto -mx-4 sm:mx-0 bg-gray-50 p-2 sm:p-4 rounded-md">
                <table className="w-full min-w-[600px] border-collapse">
                  <thead>
                    <tr className="bg-[#0A3A68] text-white">
                      <th className="border border-gray-300 px-4 py-2 text-left">Produkt</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Beschreibung</th>
                      <th className="border border-gray-300 px-4 py-2 text-right">Preis</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border border-gray-300 px-4 py-2 font-medium">Würfelboost S</td>
                      <td className="border border-gray-300 px-4 py-2">25.000 Würfel</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">25 €</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-medium">Würfelboost M</td>
                      <td className="border border-gray-300 px-4 py-2">35.000 Würfel</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">35 €</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 px-4 py-2 font-medium">Würfelboost L</td>
                      <td className="border border-gray-300 px-4 py-2">45.000 Würfel</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">45 €</td>
                    </tr>
                    <tr className="bg-[#FF4C00]/10">
                      <td className="border border-gray-300 px-4 py-2 font-medium">Sonderangebot</td>
                      <td className="border border-gray-300 px-4 py-2">40.000-50.000 Würfel (während Events)</td>
                      <td className="border border-gray-300 px-4 py-2 text-right font-bold text-[#FF4C00]">30 €</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="overflow-x-auto bg-gray-50 p-4 rounded-md mt-6">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left font-['Baloo_2'] text-[#0A3A68]">Feature</th>
                      <th className="px-4 py-2 text-center font-['Baloo_2'] text-[#0A3A68]">Basis</th>
                      <th className="px-4 py-2 text-center font-['Baloo_2'] text-[#0A3A68]">Premium</th>
                      <th className="px-4 py-2 text-center font-['Baloo_2'] text-[#0A3A68]">VIP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3">Würfelboost</td>
                      <td className="px-4 py-3 text-center">✓</td>
                      <td className="px-4 py-3 text-center">✓</td>
                      <td className="px-4 py-3 text-center">✓</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3">Event-Abschluss</td>
                      <td className="px-4 py-3 text-center">-</td>
                      <td className="px-4 py-3 text-center">✓</td>
                      <td className="px-4 py-3 text-center">✓</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3">Support-Priorität</td>
                      <td className="px-4 py-3 text-center">Standard</td>
                      <td className="px-4 py-3 text-center">Erhöht</td>
                      <td className="px-4 py-3 text-center">Sofort</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Preis</td>
                      <td className="px-4 py-3 text-center">15 €</td>
                      <td className="px-4 py-3 text-center">25 €</td>
                      <td className="px-4 py-3 text-center">40 €</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Code Blocks */}
            <section id="code" className="mb-10 scroll-mt-20">
              <h2 className="font-['Baloo_2'] font-bold text-xl md:text-2xl text-[#FF4C00] mb-4 pb-2 border-b-2 border-[#00CFFF]/50">
                Code-Blöcke
              </h2>
              <p className="mb-6">
                Code-Blöcke sind nützlich, um Programmierbeispiele oder Konfigurationen zu zeigen:
              </p>

              <div className="space-y-6">
                <div className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                  <pre className="font-mono text-sm">
<code>{`// JavaScript-Beispiel
function sendMessage() {
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;
  
  if (!name || !message) {
    alert('Bitte fülle alle Felder aus!');
    return;
  }
  
  console.log('Nachricht gesendet:', { name, message });
  // Hier würde der API-Aufruf erfolgen
}`}</code>
                  </pre>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="mb-2">Inline-Code kann verwendet werden, um <code className="bg-gray-100 text-[#FF4C00] px-1 py-0.5 rounded font-mono">Variablennamen</code> oder kurze Codebeispiele im Text hervorzuheben.</p>
                </div>

                <div className="bg-[#0A3A68] text-white p-4 rounded-md overflow-x-auto">
                  <div className="flex items-center border-b border-white/20 pb-2 mb-2">
                    <span className="material-icons mr-2 text-[#00CFFF]">terminal</span>
                    <span className="font-mono font-bold">Terminal</span>
                  </div>
                  <pre className="font-mono text-sm">
<code>{`$ npm install babixgo-client
$ npm run start

> babixgo-client@1.0.0 start
> node server.js

Server running at http://localhost:3000`}</code>
                  </pre>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-10">
              <h2 className="font-['Baloo_2'] font-bold text-xl md:text-2xl text-[#FF4C00] mb-4 pb-2 border-b-2 border-[#00CFFF]/50">
                Fazit
              </h2>
              <p className="mb-4">
                Mit den gezeigten Formatierungsmöglichkeiten kannst du ansprechende und gut strukturierte Blogbeiträge erstellen. Experimentiere mit den verschiedenen Stilen und finde heraus, welche am besten zu deinem Inhalt passen.
              </p>
              <p>
                Denke daran, dass gutes Design den Inhalt unterstützen soll – nicht davon ablenken. Verwende die Formatierungen gezielt, um die Lesbarkeit zu verbessern und wichtige Informationen hervorzuheben.
              </p>
            </section>

            {/* Author Info */}
            <div className="bg-[#0A3A68]/5 p-4 rounded-lg flex items-center gap-4 mt-8">
              <div className="w-16 h-16 rounded-full bg-[#0A3A68] flex items-center justify-center flex-shrink-0">
                <span className="material-icons text-white text-2xl">person</span>
              </div>
              <div>
                <h3 className="font-['Baloo_2'] font-bold text-lg text-[#0A3A68]">Max</h3>
                <p className="text-sm">Content Creator bei babixGO und Monopoly GO-Enthusiast. Schreibt über Spiel-Strategien, Updates und Community-Themen.</p>
              </div>
            </div>

            {/* Related Posts */}
            <div className="mt-10">
              <h3 className="font-['Baloo_2'] font-bold text-lg text-[#0A3A68] mb-4">
                Verwandte Beiträge
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <a href="#" className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-32 bg-gradient-to-r from-[#0A3A68] to-[#00CFFF] flex items-center justify-center">
                    <span className="material-icons text-white text-3xl">article</span>
                  </div>
                  <div className="p-3">
                    <h4 className="font-['Baloo_2'] font-bold text-[#0A3A68] mb-1 line-clamp-1">Die besten Monopoly GO Strategien</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">Tipps und Tricks, um dein Spielerlebnis zu verbessern und mehr Belohnungen zu erhalten.</p>
                  </div>
                </a>
                <a href="#" className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-32 bg-gradient-to-r from-[#0A3A68] to-[#00CFFF] flex items-center justify-center">
                    <span className="material-icons text-white text-3xl">article</span>
                  </div>
                  <div className="p-3">
                    <h4 className="font-['Baloo_2'] font-bold text-[#0A3A68] mb-1 line-clamp-1">Kommende Events im Überblick</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">Eine Vorschau auf die nächsten Events und wie du dich optimal darauf vorbereiten kannst.</p>
                  </div>
                </a>
                <a href="#" className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-32 bg-gradient-to-r from-[#0A3A68] to-[#00CFFF] flex items-center justify-center">
                    <span className="material-icons text-white text-3xl">article</span>
                  </div>
                  <div className="p-3">
                    <h4 className="font-['Baloo_2'] font-bold text-[#0A3A68] mb-1 line-clamp-1">Stickeralbum-Guide für Sammler</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">Wie du deine Sammlung vervollständigst und die seltensten Sticker findest.</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Comment Section */}
            <div className="mt-10 border-t border-gray-200 pt-6">
              <h3 className="font-['Baloo_2'] font-bold text-lg text-[#0A3A68] mb-4">
                Kommentare (2)
              </h3>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#00CFFF]/30 flex items-center justify-center flex-shrink-0">
                      <span className="material-icons text-[#0A3A68] text-sm">person</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-[#0A3A68]">Sarah</h4>
                        <span className="text-gray-500 text-xs">Vor 2 Tagen</span>
                      </div>
                      <p className="mt-1 text-gray-700">
                        Super hilfreicher Artikel! Die Styling-Optionen sind genau das, was ich gesucht habe. Besonders die Info-Boxen werde ich definitiv verwenden.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FF4C00]/30 flex items-center justify-center flex-shrink-0">
                      <span className="material-icons text-[#0A3A68] text-sm">person</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-[#0A3A68]">Thomas</h4>
                        <span className="text-gray-500 text-xs">Vor 5 Tagen</span>
                      </div>
                      <p className="mt-1 text-gray-700">
                        Danke für die ausführliche Übersicht! Könntest du vielleicht noch ein Beispiel für ein Inhaltsverzeichnis mit Ankerlinks hinzufügen?
                      </p>
                      
                      <div className="mt-3 ml-6 pl-3 border-l-2 border-gray-300">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-[#0A3A68]">Max</h4>
                          <span className="text-gray-500 text-xs">Vor 4 Tagen</span>
                        </div>
                        <p className="mt-1 text-gray-700">
                          Gute Idee, Thomas! Ich habe oben ein Inhaltsverzeichnis mit Ankerlinks eingefügt. Schau es dir an und sag mir, ob das hilft!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-['Baloo_2'] font-bold text-[#0A3A68] mb-3">Schreibe einen Kommentar</h4>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="comment-name" className="block mb-1 font-medium text-sm">Name</label>
                    <input 
                      id="comment-name" 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF]" 
                      required 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="comment-text" className="block mb-1 font-medium text-sm">Kommentar</label>
                    <textarea 
                      id="comment-text" 
                      rows={4} 
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF]" 
                      required
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="bg-[#FF4C00] hover:bg-[#cc3b00] text-white font-bold py-2 px-4 rounded-md transition-colors">
                    Kommentar abschicken
                  </button>
                </form>
              </div>
            </div>
          </div>
        </article>
      </main>
      
      <BackToTop />
      <Footer />
    </div>
  );
}