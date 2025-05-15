import { useState, useEffect } from 'react';

/**
 * Hook für die Persistierung von Formulardaten im localStorage
 * 
 * @param key Ein eindeutiger Schlüssel für die Speicherung der Daten
 * @param initialValue Anfangswert, falls keine gespeicherten Daten vorhanden sind
 * @param expirationMinutes Gültigkeitsdauer in Minuten (Optional, Standard: 60 Minuten)
 * @returns Ein Tupel mit dem aktuellen Wert, einer Setter-Funktion und einer Funktion zum Löschen der Daten
 */
export function useFormPersistence<T>(
  key: string,
  initialValue: T,
  expirationMinutes: number = 60
): [T, (value: T) => void, () => void] {
  // Verwende den eindeutigen Schlüssel mit einem Präfix für bessere Organisation
  const storageKey = `formData_${key}`;
  
  // Funktion zum Abrufen der gespeicherten Daten
  const getStoredValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const storedData = localStorage.getItem(storageKey);
      
      if (!storedData) {
        return initialValue;
      }
      
      const { value, expiry } = JSON.parse(storedData);
      
      // Prüfen, ob die Daten abgelaufen sind
      if (expiry && new Date().getTime() > expiry) {
        localStorage.removeItem(storageKey);
        return initialValue;
      }
      
      return value as T;
    } catch (error) {
      console.error('Fehler beim Lesen der gespeicherten Formulardaten:', error);
      return initialValue;
    }
  };

  // State mit den gespeicherten Daten oder Anfangswert initialisieren
  const [value, setValue] = useState<T>(() => getStoredValue());

  // Funktion zum Speichern eines neuen Werts
  const setAndPersistValue = (newValue: T): void => {
    try {
      // State updaten
      setValue(newValue);
      
      // Ablaufzeitpunkt berechnen
      const expiry = new Date().getTime() + (expirationMinutes * 60 * 1000);
      
      // Im localStorage speichern
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          value: newValue,
          expiry
        })
      );
    } catch (error) {
      console.error('Fehler beim Speichern der Formulardaten:', error);
    }
  };

  // Funktion zum Löschen der gespeicherten Daten
  const clearValue = (): void => {
    try {
      setValue(initialValue);
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error('Fehler beim Löschen der gespeicherten Formulardaten:', error);
    }
  };

  // Gespeicherte Daten mit Event-Listener aktualisieren (für mehrere Tabs)
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === storageKey && event.newValue) {
        try {
          const { value: newValue, expiry } = JSON.parse(event.newValue);
          
          // Prüfen, ob die Daten abgelaufen sind
          if (expiry && new Date().getTime() > expiry) {
            clearValue();
          } else {
            setValue(newValue as T);
          }
        } catch (error) {
          console.error('Fehler beim Verarbeiten der geänderten Daten:', error);
        }
      }
    };

    // Event-Listener für Änderungen im localStorage registrieren
    window.addEventListener('storage', handleStorageChange);
    
    // Event-Listener beim Aufräumen entfernen
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [storageKey]);

  return [value, setAndPersistValue, clearValue];
}