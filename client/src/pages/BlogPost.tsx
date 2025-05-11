export default function BlogPost() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-6 md:py-10 flex-grow font-['Nunito_Sans'] text-[#0A3A68]">
      <article className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Hero Image */}
        <div className="relative">
          <div className="aspect-video bg-gradient-to-r from-[#0A3A68] to-[#00CFFF] flex items-center justify-center">
            <span className="material-icons text-white text-8xl">article</span>
          </div>
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
            <div className="mb-2">
              <span className="bg-[#00CFFF] text-white px-3 py-1 rounded-full text-sm font-bold">Formatierung</span>
            </div>
            <h1 className="text-white text-2xl md:text-4xl font-['Baloo_2'] font-bold">
              Styling-Optionen für deinen Blogbeitrag
            </h1>
            <div className="flex items-center gap-3 mt-2 text-white/80">
              <div className="flex items-center gap-1">
                <span className="material-icons text-sm">calendar_today</span>
                <span className="text-sm">9. Mai 2025</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-icons text-sm">person</span>
                <span className="text-sm">babixGO Team</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Introduction */}
          <div className="mb-8">
            <p className="text-lg leading-relaxed mb-4">
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
                <a href="#blockquotes" className="text-[#FF4C00] hover:underline flex items-center">
                  <span className="material-icons text-sm mr-1">arrow_right</span>Zitate
                </a>
              </li>
            </ul>
          </div>
          
          {/* Headings */}
          <section id="headings" className="mb-10 scroll-mt-20">
            <h2 className="babix-info-header mb-4">
              Überschriften
            </h2>
            <p className="mb-4">
              Überschriften helfen, deinen Inhalt zu strukturieren und die Lesbarkeit zu verbessern. Hier sind verschiedene Überschriftenformate:
            </p>

            <div className="space-y-4 mt-6">
              <div className="p-4 bg-gray-50 rounded-md">
                <h2 className="babix-info-header mb-2 inline-block">Überschrift Stufe 2</h2>
                <p className="text-gray-500 text-sm">Wird verwendet für Hauptabschnitte</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="font-['Baloo_2'] font-bold text-xl text-[#0A3A68] mb-2">Überschrift Stufe 3</h3>
                <p className="text-gray-500 text-sm">Wird verwendet für Unterabschnitte</p>
              </div>
            </div>
          </section>

          {/* Text Formatting */}
          <section id="text-formatting" className="mb-10 scroll-mt-20">
            <h2 className="babix-info-header mb-4">
              Textformatierung
            </h2>
            <p className="mb-6">
              Mit verschiedenen Textformatierungen kannst du wichtige Informationen hervorheben und deinen Inhalt interessanter gestalten:
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-md">
                <p>Normaler Text: Grundlegende Textformatierung für Inhalte.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-md">
                <p><strong className="font-bold text-[#0A3A68]">Fetter Text:</strong> Um wichtige Informationen hervorzuheben.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-md">
                <p><em className="italic">Kursiver Text:</em> Für Betonung oder Zitate.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-md">
                <p><span className="underline">Unterstrichener Text:</span> Zur Hervorhebung.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-md">
                <p><span className="text-[#FF4C00]">Farbiger Text:</span> Für besondere Akzente.</p>
              </div>
            </div>
          </section>

          {/* Blockquotes */}
          <section id="blockquotes" className="mb-10 scroll-mt-20">
            <h2 className="babix-info-header mb-4">
              Zitate
            </h2>
            <p className="mb-6">
              Zitate helfen dabei, Aussagen zu betonen oder externe Quellen einzubeziehen:
            </p>

            <div className="space-y-4">
              <div className="p-4 border-l-4 border-[#00CFFF] bg-gray-50 italic">
                "Gutes Design sieht man nicht – gutes Design funktioniert."
              </div>
              
              <div className="p-6 bg-[#0A3A68]/5 rounded-lg border border-[#0A3A68]/10">
                <p className="font-['Baloo_2'] text-lg text-[#0A3A68] mb-2">Wichtiger Hinweis</p>
                <p>Dies ist ein hervorgehobener Hinweis, den du verwenden kannst, um wichtige Informationen oder Warnungen zu kommunizieren.</p>
              </div>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}