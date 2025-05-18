import React from 'react';

interface DiceSpinnerProps {
  size?: number; // Größe des Würfels in Pixeln
  color?: string; // Hauptfarbe des Würfels
  secondaryColor?: string; // Sekundärfarbe für Punkte
  className?: string; // Zusätzliche CSS-Klassen
}

/**
 * Ein animierter 3D-Würfel, der sich dreht
 * 
 * Diese Komponente zeigt einen stylisierten 3D-Würfel, der als Ladeanimation verwendet werden kann.
 * Der Würfel rotiert kontinuierlich um seine Achse und kann in Größe und Farbe angepasst werden.
 */
export function DiceSpinner({
  size = 40, 
  color = '#00CFFF',
  secondaryColor = '#FF4C00',
  className = ''
}: DiceSpinnerProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <div 
        className="dice" 
        style={{
          width: size,
          height: size,
          position: 'relative',
          perspective: `${size * 3}px`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Vorderseite - 1 */}
        <div
          className="absolute rounded-md flex items-center justify-center"
          style={{
            width: size,
            height: size,
            transform: `translateZ(${size / 2}px)`,
            backgroundColor: color,
            boxShadow: `0 0 ${size / 10}px rgba(0, 0, 0, 0.2) inset`
          }}
        >
          <div 
            className="rounded-full" 
            style={{ 
              width: size / 5, 
              height: size / 5,
              backgroundColor: secondaryColor,
            }} 
          />
        </div>

        {/* Rückseite - 6 */}
        <div
          className="absolute rounded-md grid grid-cols-2 gap-1 p-2"
          style={{
            width: size,
            height: size,
            transform: `translateZ(-${size / 2}px) rotateY(180deg)`,
            backgroundColor: color,
            boxShadow: `0 0 ${size / 10}px rgba(0, 0, 0, 0.2) inset`
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="rounded-full" 
              style={{ 
                width: size / 6, 
                height: size / 6,
                backgroundColor: secondaryColor
              }} 
            />
          ))}
        </div>

        {/* Oberseite - 2 */}
        <div
          className="absolute rounded-md flex items-center justify-between p-2"
          style={{
            width: size,
            height: size,
            transform: `rotateX(90deg) translateZ(${size / 2}px)`,
            backgroundColor: color,
            boxShadow: `0 0 ${size / 10}px rgba(0, 0, 0, 0.2) inset`
          }}
        >
          <div 
            className="rounded-full" 
            style={{ 
              width: size / 5, 
              height: size / 5,
              backgroundColor: secondaryColor
            }} 
          />
          <div 
            className="rounded-full" 
            style={{ 
              width: size / 5, 
              height: size / 5,
              backgroundColor: secondaryColor
            }} 
          />
        </div>

        {/* Unterseite - 5 */}
        <div
          className="absolute rounded-md grid grid-cols-3 items-center justify-items-center"
          style={{
            width: size,
            height: size,
            transform: `rotateX(-90deg) translateZ(${size / 2}px)`,
            backgroundColor: color,
            boxShadow: `0 0 ${size / 10}px rgba(0, 0, 0, 0.2) inset`,
            padding: size / 8
          }}
        >
          <div 
            className="rounded-full" 
            style={{ 
              width: size / 6, 
              height: size / 6,
              backgroundColor: secondaryColor
            }} 
          />
          <div style={{ width: size / 6, height: size / 6 }} /> {/* Leerer Platz */}
          <div 
            className="rounded-full" 
            style={{ 
              width: size / 6, 
              height: size / 6,
              backgroundColor: secondaryColor
            }} 
          />
          <div style={{ width: size / 6, height: size / 6 }} /> {/* Leerer Platz */}
          <div 
            className="rounded-full" 
            style={{ 
              width: size / 6, 
              height: size / 6,
              backgroundColor: secondaryColor
            }} 
          />
          <div style={{ width: size / 6, height: size / 6 }} /> {/* Leerer Platz */}
          <div 
            className="rounded-full" 
            style={{ 
              width: size / 6, 
              height: size / 6,
              backgroundColor: secondaryColor
            }} 
          />
          <div style={{ width: size / 6, height: size / 6 }} /> {/* Leerer Platz */}
          <div 
            className="rounded-full" 
            style={{ 
              width: size / 6, 
              height: size / 6,
              backgroundColor: secondaryColor
            }} 
          />
        </div>

        {/* Linke Seite - 4 */}
        <div
          className="absolute rounded-md grid grid-cols-2 gap-1 items-center justify-items-center"
          style={{
            width: size,
            height: size,
            transform: `rotateY(-90deg) translateZ(${size / 2}px)`,
            backgroundColor: color,
            boxShadow: `0 0 ${size / 10}px rgba(0, 0, 0, 0.2) inset`,
            padding: size / 8
          }}
        >
          <div 
            className="rounded-full" 
            style={{ 
              width: size / 5, 
              height: size / 5,
              backgroundColor: secondaryColor
            }} 
          />
          <div 
            className="rounded-full" 
            style={{ 
              width: size / 5, 
              height: size / 5,
              backgroundColor: secondaryColor
            }} 
          />
          <div 
            className="rounded-full" 
            style={{ 
              width: size / 5, 
              height: size / 5,
              backgroundColor: secondaryColor
            }} 
          />
          <div 
            className="rounded-full" 
            style={{ 
              width: size / 5, 
              height: size / 5,
              backgroundColor: secondaryColor
            }} 
          />
        </div>

        {/* Rechte Seite - 3 */}
        <div
          className="absolute rounded-md"
          style={{
            width: size,
            height: size,
            transform: `rotateY(90deg) translateZ(${size / 2}px)`,
            backgroundColor: color,
            boxShadow: `0 0 ${size / 10}px rgba(0, 0, 0, 0.2) inset`
          }}
        >
          <div className="flex flex-col h-full justify-between p-2">
            <div className="self-start">
              <div 
                className="rounded-full" 
                style={{ 
                  width: size / 5, 
                  height: size / 5,
                  backgroundColor: secondaryColor
                }} 
              />
            </div>
            <div className="self-center">
              <div 
                className="rounded-full" 
                style={{ 
                  width: size / 5, 
                  height: size / 5,
                  backgroundColor: secondaryColor
                }} 
              />
            </div>
            <div className="self-end">
              <div 
                className="rounded-full" 
                style={{ 
                  width: size / 5, 
                  height: size / 5,
                  backgroundColor: secondaryColor
                }} 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Animation wird über globale CSS-Klasse definiert */}
      <style jsx>{`
        .dice {
          transform-style: preserve-3d;
          animation: dice-spin 5s infinite cubic-bezier(0.4, 0.0, 0.2, 1);
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
        }
      `}</style>
    </div>
  );
}