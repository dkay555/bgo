import { lazy, Suspense, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DiceSpinner } from '@/components/DiceSpinner';
import { Button } from '@/components/ui/button';

type LazyModule = Promise<typeof import('@/components/demo/LazyContentOne')>;

// Lazy-geladene Komponenten mit Verzögerung
const LazyContent1 = lazy(() => {
  return new Promise<typeof import('@/components/demo/LazyContentOne')>((resolve) => {
    // Importiere die Komponente direkt
    import('@/components/demo/LazyContentOne')
      .then((module) => {
        // Simuliere eine Verzögerung beim Laden
        setTimeout(() => {
          resolve(module);
        }, 1000);
      });
  });
});

const LazyContent2 = lazy(() => {
  return new Promise<typeof import('@/components/demo/LazyContentTwo')>((resolve) => {
    import('@/components/demo/LazyContentTwo')
      .then((module) => {
        // Simuliere eine Verzögerung beim Laden
        setTimeout(() => {
          resolve(module);
        }, 1500);
      });
  });
});

const LazyContent3 = lazy(() => {
  return new Promise<typeof import('@/components/demo/LazyContentThree')>((resolve) => {
    import('@/components/demo/LazyContentThree')
      .then((module) => {
        // Simuliere eine Verzögerung beim Laden
        setTimeout(() => {
          resolve(module);
        }, 2000);
      });
  });
});

const Ladebildschirm = () => (
  <div className="flex items-center justify-center p-4">
    <div className="text-center">
      <div className="mx-auto mb-4 flex justify-center">
        <DiceSpinner size={40} color="#00CFFF" secondaryColor="#FF4C00" />
      </div>
      <p className="text-[#0A3A68] font-bold">Wird geladen...</p>
    </div>
  </div>
);

export default function SmoothLoadExample() {
  const [showComponents, setShowComponents] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-10 flex-grow w-full">
        <h1 className="text-2xl font-bold text-center mb-8">Smooth Loading Beispiel</h1>

        <div className="mb-8 text-center">
          <Button 
            onClick={() => setShowComponents(!showComponents)}
            className="bg-[#00CFFF] hover:bg-[#00CFFF]/80"
          >
            {showComponents ? "Komponenten ausblenden" : "Komponenten laden"}
          </Button>
        </div>

        {showComponents && (
          <div className="space-y-6">
            <div className="border rounded-lg overflow-hidden">
              <h2 className="bg-slate-100 p-4 font-bold">Komponente 1</h2>
              <div className="p-4">
                <Suspense fallback={<Ladebildschirm />}>
                  <LazyContent1 />
                </Suspense>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <h2 className="bg-slate-100 p-4 font-bold">Komponente 2</h2>
              <div className="p-4">
                <Suspense fallback={<Ladebildschirm />}>
                  <LazyContent2 />
                </Suspense>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <h2 className="bg-slate-100 p-4 font-bold">Komponente 3</h2>
              <div className="p-4">
                <Suspense fallback={<Ladebildschirm />}>
                  <LazyContent3 />
                </Suspense>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 bg-blue-50 p-4 rounded-lg">
          <p className="text-sm">
            Diese Seite demonstriert das verzögerte Laden von Komponenten mit künstlichen Verzögerungen.
            Jede Komponente wird mit einer anderen Verzögerung geladen, um den Effekt zu veranschaulichen.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}