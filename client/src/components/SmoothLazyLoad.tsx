import React, { Suspense, ReactNode, useEffect, useState, useRef } from 'react';

interface SmoothLazyLoadProps {
  /**
   * Die Komponente, die lazy geladen werden soll
   */
  component: React.ComponentType<any>;
  
  /**
   * Props, die an die Komponente weitergegeben werden
   */
  componentProps?: Record<string, any>;
  
  /**
   * Fallback-Komponente, die während des Ladens angezeigt wird
   */
  fallback?: ReactNode;
  
  /**
   * Scrollverhalten beim Laden der Komponente
   * - smooth: Sanftes Scrollen zur Komponente
   * - auto: Direktes Springen zur Komponente
   * - none: Kein automatisches Scrollen
   */
  scrollBehavior?: 'smooth' | 'auto' | 'none';
  
  /**
   * Offset in Pixeln für das Scrollziel
   */
  scrollOffset?: number;
  
  /**
   * Verzögerung in Millisekunden vor dem Scrollen
   */
  scrollDelay?: number;
  
  /**
   * CSS-Klasse für den Container
   */
  className?: string;
  
  /**
   * Eindeutige ID für das Scroll-Target
   */
  id?: string;
}

/**
 * Komponente für das Lazy Loading mit Smooth Scrolling
 * Lädt Komponenten asynchron und scrollt sanft zu ihnen nach dem Laden
 */
export function SmoothLazyLoad({
  component: Component,
  componentProps = {},
  fallback = <div className="animate-pulse p-4 bg-gray-100 rounded-md min-h-[100px]" />,
  scrollBehavior = 'smooth',
  scrollOffset = 0,
  scrollDelay = 100,
  className = '',
  id
}: SmoothLazyLoadProps) {
  // Ref für den Container
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State für das Tracking des Ladestatus
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Eindeutige ID generieren, falls keine angegeben wurde
  const componentId = id || `lazy-component-${Math.random().toString(36).substring(2, 9)}`;
  
  // Effekt für das Scrollverhalten nach dem Laden
  useEffect(() => {
    if (isLoaded && scrollBehavior !== 'none') {
      // Verzögerung für das Scrollen, damit die Komponente vollständig gerendert werden kann
      const scrollTimer = setTimeout(() => {
        if (containerRef.current) {
          const targetElement = document.getElementById(componentId);
          
          if (targetElement) {
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - scrollOffset;
            
            window.scrollTo({
              top: targetPosition,
              behavior: scrollBehavior === 'smooth' ? 'smooth' : 'auto'
            });
          }
        }
      }, scrollDelay);
      
      return () => clearTimeout(scrollTimer);
    }
  }, [isLoaded, scrollBehavior, componentId, scrollOffset, scrollDelay]);
  
  return (
    <div ref={containerRef} id={componentId} className={className}>
      <Suspense fallback={fallback}>
        <Component 
          {...componentProps} 
          onLoad={() => setIsLoaded(true)}
          onLoadComplete={() => setIsLoaded(true)}
        />
      </Suspense>
    </div>
  );
}

/**
 * HOC (Higher Order Component) für das Wrapping einer Komponente mit SmoothLazyLoad
 */
export function withSmoothLazyLoad<P extends object>(
  Component: React.ComponentType<P>,
  options: Omit<SmoothLazyLoadProps, 'component' | 'componentProps'> = {}
) {
  return function WithSmoothLazyLoad(props: P) {
    return (
      <SmoothLazyLoad
        component={Component}
        componentProps={props}
        {...options}
      />
    );
  };
}