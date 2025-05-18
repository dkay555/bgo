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
    <div className={`dice-container ${className}`} style={{ width: size, height: size }}>
      <div className="dice" style={{ width: size, height: size }}>
        {/* Vorderseite mit einer Punkt */}
        <div className="dice-face front" style={{ 
          width: size, 
          height: size, 
          backgroundColor: color,
          transform: `translateZ(${size/2}px)`
        }}>
          <div className="dice-dot" style={{ 
            width: size/5, 
            height: size/5, 
            backgroundColor: secondaryColor,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}></div>
        </div>
        
        {/* Rückseite mit sechs Punkten */}
        <div className="dice-face back" style={{ 
          width: size, 
          height: size, 
          backgroundColor: color,
          transform: `translateZ(-${size/2}px) rotateY(180deg)`
        }}>
          <div className="dice-dot" style={{ 
            width: size/6, 
            height: size/6, 
            backgroundColor: secondaryColor,
            left: '25%',
            top: '25%',
            transform: 'translate(-50%, -50%)'
          }}></div>
          <div className="dice-dot" style={{ 
            width: size/6, 
            height: size/6, 
            backgroundColor: secondaryColor,
            left: '25%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}></div>
          <div className="dice-dot" style={{ 
            width: size/6, 
            height: size/6, 
            backgroundColor: secondaryColor,
            left: '25%',
            top: '75%',
            transform: 'translate(-50%, -50%)'
          }}></div>
          <div className="dice-dot" style={{ 
            width: size/6, 
            height: size/6, 
            backgroundColor: secondaryColor,
            left: '75%',
            top: '25%',
            transform: 'translate(-50%, -50%)'
          }}></div>
          <div className="dice-dot" style={{ 
            width: size/6, 
            height: size/6, 
            backgroundColor: secondaryColor,
            left: '75%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}></div>
          <div className="dice-dot" style={{ 
            width: size/6, 
            height: size/6, 
            backgroundColor: secondaryColor,
            left: '75%',
            top: '75%',
            transform: 'translate(-50%, -50%)'
          }}></div>
        </div>
        
        {/* Oberseite mit zwei Punkten */}
        <div className="dice-face top" style={{ 
          width: size, 
          height: size, 
          backgroundColor: color,
          transform: `rotateX(90deg) translateZ(${size/2}px)`
        }}>
          <div className="dice-dot" style={{ 
            width: size/5, 
            height: size/5, 
            backgroundColor: secondaryColor,
            left: '25%',
            top: '25%',
            transform: 'translate(-50%, -50%)'
          }}></div>
          <div className="dice-dot" style={{ 
            width: size/5, 
            height: size/5, 
            backgroundColor: secondaryColor,
            left: '75%',
            top: '75%',
            transform: 'translate(-50%, -50%)'
          }}></div>
        </div>
        
        {/* Unterseite mit fünf Punkten */}
        <div className="dice-face bottom" style={{ 
          width: size, 
          height: size, 
          backgroundColor: color,
          transform: `rotateX(-90deg) translateZ(${size/2}px)`
        }}>
          <div className="dice-dot" style={{ 
            width: size/5, 
            height: size/5, 
            backgroundColor: secondaryColor,
            left: '25%',
            top: '25%',
            transform: 'translate(-50%, -50%)'
          }}></div>
          <div className="dice-dot" style={{ 
            width: size/5, 
            height: size/5, 
            backgroundColor: secondaryColor,
            left: '75%',
            top: '25%',
            transform: 'translate(-50%, -50%)'
          }}></div>
          <div className="dice-dot" style={{ 
            width: size/5, 
            height: size/5, 
            backgroundColor: secondaryColor,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}></div>
          <div className="dice-dot" style={{ 
            width: size/5, 
            height: size/5, 
            backgroundColor: secondaryColor,
            left: '25%',
            top: '75%',
            transform: 'translate(-50%, -50%)'
          }}></div>
          <div className="dice-dot" style={{ 
            width: size/5, 
            height: size/5, 
            backgroundColor: secondaryColor,
            left: '75%',
            top: '75%',
            transform: 'translate(-50%, -50%)'
          }}></div>
        </div>
        
        {/* Linke Seite mit vier Punkten */}
        <div className="dice-face left" style={{ 
          width: size, 
          height: size, 
          backgroundColor: color,
          transform: `rotateY(-90deg) translateZ(${size/2}px)`
        }}>
          <div className="dice-dot" style={{ 
            width: size/5, 
            height: size/5, 
            backgroundColor: secondaryColor,
            left: '25%',
            top: '25%',
            transform: 'translate(-50%, -50%)'
          }}></div>
          <div className="dice-dot" style={{ 
            width: size/5, 
            height: size/5, 
            backgroundColor: secondaryColor,
            left: '25%',
            top: '75%',
            transform: 'translate(-50%, -50%)'
          }}></div>
          <div className="dice-dot" style={{ 
            width: size/5, 
            height: size/5, 
            backgroundColor: secondaryColor,
            left: '75%',
            top: '25%',
            transform: 'translate(-50%, -50%)'
          }}></div>
          <div className="dice-dot" style={{ 
            width: size/5, 
            height: size/5, 
            backgroundColor: secondaryColor,
            left: '75%',
            top: '75%',
            transform: 'translate(-50%, -50%)'
          }}></div>
        </div>
        
        {/* Rechte Seite mit drei Punkten */}
        <div className="dice-face right" style={{ 
          width: size, 
          height: size, 
          backgroundColor: color,
          transform: `rotateY(90deg) translateZ(${size/2}px)`
        }}>
          <div className="dice-dot" style={{ 
            width: size/5, 
            height: size/5, 
            backgroundColor: secondaryColor,
            left: '25%',
            top: '25%',
            transform: 'translate(-50%, -50%)'
          }}></div>
          <div className="dice-dot" style={{ 
            width: size/5, 
            height: size/5, 
            backgroundColor: secondaryColor,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}></div>
          <div className="dice-dot" style={{ 
            width: size/5, 
            height: size/5, 
            backgroundColor: secondaryColor,
            left: '75%',
            top: '75%',
            transform: 'translate(-50%, -50%)'
          }}></div>
        </div>
      </div>
    </div>
  );
}