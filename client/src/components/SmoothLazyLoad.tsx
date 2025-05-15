import React, { ComponentType, Suspense, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface SmoothLazyLoadProps {
  component: ComponentType;
  scrollBehavior?: 'smooth' | 'auto' | 'none';
  scrollOffset?: number;
  className?: string;
  id?: string;
}

/**
 * Komponente für sanftes Lazy Loading von Inhalten mit automatischem Scrollen
 * 
 * Diese Komponente lädt Inhalte verzögert (lazy) und scrollt automatisch zum geladenen Inhalt,
 * sobald dieser verfügbar ist. Sie bietet verschiedene Scroll-Optionen und einen anpassbaren Offset.
 * 
 * @param component Die lazy zu ladende Komponente
 * @param scrollBehavior Das Scroll-Verhalten ('smooth', 'auto' oder 'none')
 * @param scrollOffset Abstand vom oberen Rand in Pixeln (Standard: 0)
 * @param className CSS-Klassen für den Container
 * @param id Optional: ID für den Container
 */
export function SmoothLazyLoad({
  component: Component,
  scrollBehavior = 'smooth',
  scrollOffset = 0,
  className,
  id,
}: SmoothLazyLoadProps) {
  const componentRef = useRef<HTMLDivElement>(null);

  // Funktion zum Scrollen zur Komponente
  const scrollToComponent = () => {
    if (componentRef.current && scrollBehavior !== 'none') {
      const headerHeight = document.querySelector('header')?.clientHeight || 0;
      const yOffset = -1 * (headerHeight + scrollOffset);
      const y = componentRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: scrollBehavior === 'smooth' ? 'smooth' : 'auto'
      });
    }
  };

  // Nach dem Rendern zur Komponente scrollen
  useEffect(() => {
    // Verzögerung für das Scrollen, um sicherzustellen, dass die Komponente gerendert wurde
    const timeoutId = setTimeout(() => {
      scrollToComponent();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div ref={componentRef} className={className} id={id}>
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-[#00CFFF]" />
          <p className="mt-4 text-[#0A3A68]">Inhalt wird geladen...</p>
        </div>
      }>
        <Component />
      </Suspense>
    </div>
  );
}