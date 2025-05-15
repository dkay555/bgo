import React, { lazy, useState } from 'react';
import { SmoothLazyLoad } from '@/components/SmoothLazyLoad';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SEOHead from '@/components/SEOHead';

// Komponenten für Lazy Loading
const LazyContent1 = lazy(() => {
  // Simuliere eine Verzögerung beim Laden
  return new Promise(resolve => {
    const component = import('@/components/demo/LazyContentOne');
    setTimeout(() => {
      resolve(component);
    }, 1000);
  });
});

const LazyContent2 = lazy(() => {
  // Simuliere eine Verzögerung beim Laden
  return new Promise(resolve => {
    const component = import('@/components/demo/LazyContentTwo');
    setTimeout(() => {
      resolve(component);
    }, 1500);
  });
});

const LazyContent3 = lazy(() => {
  // Simuliere eine Verzögerung beim Laden
  return new Promise(resolve => {
    const component = import('@/components/demo/LazyContentThree');
    setTimeout(() => {
      resolve(component);
    }, 2000);
  });
});

export default function SmoothLoadExamplePage() {
  const [showSection1, setShowSection1] = useState(false);
  const [showSection2, setShowSection2] = useState(false);
  const [showSection3, setShowSection3] = useState(false);
  
  return (
    <div className="container mx-auto py-10 px-4">
      <SEOHead pageName="Smooth Lazy Load Beispiel" />
      
      <h1 className="font-['Baloo_2'] font-bold text-2xl md:text-3xl bg-[#00CFFF]/10 px-6 py-3 rounded-xl inline-block mb-8 border-b-2 border-[#00CFFF] text-[#FF4C00]">
        Smooth Lazy Loading Demo
      </h1>
      
      <div className="grid gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Smooth Lazy Loading Demonstration</CardTitle>
            <CardDescription>
              Diese Seite demonstriert das Lazy Loading von Komponenten mit sanftem Scrolling zum geladenen Inhalt.
              Klicken Sie auf die Buttons, um Inhalte dynamisch zu laden.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => setShowSection1(true)} 
                disabled={showSection1}
                variant={showSection1 ? "outline" : "default"}
              >
                Sektion 1 laden
              </Button>
              
              <Button 
                onClick={() => setShowSection2(true)} 
                disabled={showSection2}
                variant={showSection2 ? "outline" : "default"}
              >
                Sektion 2 laden
              </Button>
              
              <Button 
                onClick={() => setShowSection3(true)} 
                disabled={showSection3}
                variant={showSection3 ? "outline" : "default"}
              >
                Sektion 3 laden
              </Button>
              
              <Button 
                onClick={() => {
                  setShowSection1(false);
                  setShowSection2(false);
                  setShowSection3(false);
                }}
                variant="outline"
              >
                Zurücksetzen
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Erstes Lazy-Load-Beispiel */}
      {showSection1 && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-[#0A3A68]">Sektion 1: Standard-Scrolling</h2>
          <SmoothLazyLoad
            component={LazyContent1}
            scrollBehavior="smooth"
            scrollOffset={100}
            className="bg-white p-6 rounded-lg shadow-md"
            id="section-1"
          />
        </div>
      )}
      
      {/* Zweites Lazy-Load-Beispiel */}
      {showSection2 && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-[#0A3A68]">Sektion 2: Auto-Scrolling</h2>
          <SmoothLazyLoad
            component={LazyContent2}
            scrollBehavior="auto"
            scrollOffset={100}
            className="bg-white p-6 rounded-lg shadow-md"
            id="section-2"
          />
        </div>
      )}
      
      {/* Drittes Lazy-Load-Beispiel */}
      {showSection3 && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-[#0A3A68]">Sektion 3: Kein Scrolling</h2>
          <SmoothLazyLoad
            component={LazyContent3}
            scrollBehavior="none"
            className="bg-white p-6 rounded-lg shadow-md"
            id="section-3"
          />
        </div>
      )}
    </div>
  );
}