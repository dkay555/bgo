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
  size = 50, 
  color = '#00CFFF',
  secondaryColor = '#FF4C00',
  className = ''
}: DiceSpinnerProps) {
  return (
    <div className={`relative ${className}`} style={{ 
      width: size, 
      height: size,
      perspective: `${size * 5}px`
    }}>
      <div className="dice-cube" style={{
        width: size,
        height: size,
        position: 'relative',
        transformStyle: 'preserve-3d',
        transform: 'translateZ(0)',
        animation: 'spin 5s infinite linear',
      }}>
        {/* Würfel Seiten */}
        <div className="dice-face front" style={{
          position: 'absolute',
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: size / 10,
          transform: `translateZ(${size / 2}px)`,
          boxShadow: 'inset 0 0 8px rgba(0,0,0,0.2)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Ein Punkt in der Mitte */}
          <div style={{
            width: size / 5,
            height: size / 5,
            borderRadius: '50%',
            backgroundColor: secondaryColor,
          }}></div>
        </div>

        <div className="dice-face back" style={{
          position: 'absolute',
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: size / 10,
          transform: `rotateY(180deg) translateZ(${size / 2}px)`,
          boxShadow: 'inset 0 0 8px rgba(0,0,0,0.2)'
        }}>
          {/* Sechs Punkte */}
          <div style={{
            position: 'absolute',
            width: size / 6,
            height: size / 6,
            top: size / 4,
            left: size / 4,
            borderRadius: '50%',
            backgroundColor: secondaryColor,
          }}></div>
          <div style={{
            position: 'absolute',
            width: size / 6,
            height: size / 6,
            top: size / 4,
            right: size / 4,
            borderRadius: '50%',
            backgroundColor: secondaryColor,
          }}></div>
          <div style={{
            position: 'absolute',
            width: size / 6,
            height: size / 6,
            top: size / 2 - size / 12,
            left: size / 4,
            borderRadius: '50%',
            backgroundColor: secondaryColor,
          }}></div>
          <div style={{
            position: 'absolute',
            width: size / 6,
            height: size / 6,
            top: size / 2 - size / 12,
            right: size / 4,
            borderRadius: '50%',
            backgroundColor: secondaryColor,
          }}></div>
          <div style={{
            position: 'absolute',
            width: size / 6,
            height: size / 6,
            bottom: size / 4,
            left: size / 4,
            borderRadius: '50%',
            backgroundColor: secondaryColor,
          }}></div>
          <div style={{
            position: 'absolute',
            width: size / 6,
            height: size / 6,
            bottom: size / 4,
            right: size / 4,
            borderRadius: '50%',
            backgroundColor: secondaryColor,
          }}></div>
        </div>

        <div className="dice-face right" style={{
          position: 'absolute',
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: size / 10,
          transform: `rotateY(90deg) translateZ(${size / 2}px)`,
          boxShadow: 'inset 0 0 8px rgba(0,0,0,0.2)'
        }}>
          {/* Drei Punkte */}
          <div style={{
            position: 'absolute',
            width: size / 6,
            height: size / 6,
            top: size / 4,
            left: size / 4,
            borderRadius: '50%',
            backgroundColor: secondaryColor,
          }}></div>
          <div style={{
            position: 'absolute',
            width: size / 6,
            height: size / 6,
            top: size / 2 - size / 12,
            left: size / 2 - size / 12,
            borderRadius: '50%',
            backgroundColor: secondaryColor,
          }}></div>
          <div style={{
            position: 'absolute',
            width: size / 6,
            height: size / 6,
            bottom: size / 4,
            right: size / 4,
            borderRadius: '50%',
            backgroundColor: secondaryColor,
          }}></div>
        </div>

        <div className="dice-face left" style={{
          position: 'absolute',
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: size / 10,
          transform: `rotateY(-90deg) translateZ(${size / 2}px)`,
          boxShadow: 'inset 0 0 8px rgba(0,0,0,0.2)'
        }}>
          {/* Vier Punkte */}
          <div style={{
            position: 'absolute',
            width: size / 6,
            height: size / 6,
            top: size / 4,
            left: size / 4,
            borderRadius: '50%',
            backgroundColor: secondaryColor,
          }}></div>
          <div style={{
            position: 'absolute',
            width: size / 6,
            height: size / 6,
            top: size / 4,
            right: size / 4,
            borderRadius: '50%',
            backgroundColor: secondaryColor,
          }}></div>
          <div style={{
            position: 'absolute',
            width: size / 6,
            height: size / 6,
            bottom: size / 4,
            left: size / 4,
            borderRadius: '50%',
            backgroundColor: secondaryColor,
          }}></div>
          <div style={{
            position: 'absolute',
            width: size / 6,
            height: size / 6,
            bottom: size / 4,
            right: size / 4,
            borderRadius: '50%',
            backgroundColor: secondaryColor,
          }}></div>
        </div>

        <div className="dice-face top" style={{
          position: 'absolute',
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: size / 10,
          transform: `rotateX(90deg) translateZ(${size / 2}px)`,
          boxShadow: 'inset 0 0 8px rgba(0,0,0,0.2)'
        }}>
          {/* Zwei Punkte */}
          <div style={{
            position: 'absolute',
            width: size / 6,
            height: size / 6,
            top: size / 4,
            left: size / 4,
            borderRadius: '50%',
            backgroundColor: secondaryColor,
          }}></div>
          <div style={{
            position: 'absolute',
            width: size / 6,
            height: size / 6,
            bottom: size / 4,
            right: size / 4,
            borderRadius: '50%',
            backgroundColor: secondaryColor,
          }}></div>
        </div>

        <div className="dice-face bottom" style={{
          position: 'absolute',
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: size / 10,
          transform: `rotateX(-90deg) translateZ(${size / 2}px)`,
          boxShadow: 'inset 0 0 8px rgba(0,0,0,0.2)'
        }}>
          {/* Fünf Punkte */}
          <div style={{
            position: 'absolute',
            width: size / 6,
            height: size / 6,
            top: size / 4,
            left: size / 4,
            borderRadius: '50%',
            backgroundColor: secondaryColor,
          }}></div>
          <div style={{
            position: 'absolute',
            width: size / 6,
            height: size / 6,
            top: size / 4,
            right: size / 4,
            borderRadius: '50%',
            backgroundColor: secondaryColor,
          }}></div>
          <div style={{
            position: 'absolute',
            width: size / 6,
            height: size / 6,
            top: size / 2 - size / 12,
            left: size / 2 - size / 12,
            borderRadius: '50%',
            backgroundColor: secondaryColor,
          }}></div>
          <div style={{
            position: 'absolute',
            width: size / 6,
            height: size / 6,
            bottom: size / 4,
            left: size / 4,
            borderRadius: '50%',
            backgroundColor: secondaryColor,
          }}></div>
          <div style={{
            position: 'absolute',
            width: size / 6,
            height: size / 6,
            bottom: size / 4,
            right: size / 4,
            borderRadius: '50%',
            backgroundColor: secondaryColor,
          }}></div>
        </div>
      </div>
    </div>
  );
}