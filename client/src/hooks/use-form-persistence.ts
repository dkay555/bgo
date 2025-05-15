import { useEffect, useState } from 'react';

/**
 * Hook zur Persistierung von Formulardaten im localStorage
 * 
 * Speichert Formulardaten unter einem eindeutigen Schlüssel im localStorage und
 * stellt sie bei erneutem Laden der Seite wieder her.
 * 
 * @param key Ein eindeutiger Schlüssel für die gespeicherten Daten
 * @param initialData Die initialen Standardwerte für das Formular
 * @param ttl Time-to-live in Millisekunden (Optional, Standard: 24 Stunden)
 * @returns Ein Tuple aus den aktuellen Daten und einer Funktion zum Aktualisieren der Daten
 */
export function useFormPersistence<T>(
  key: string,
  initialData: T,
  ttl: number = 24 * 60 * 60 * 1000 // 24 Stunden Standard-TTL
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  // Initialisiere State mit gespeicherten Daten oder initialData
  const [data, setData] = useState<T>(() => {
    // Versuche, gespeicherte Daten aus dem localStorage zu laden
    try {
      const storedItem = localStorage.getItem(`form_${key}`);
      if (storedItem) {
        const parsedItem = JSON.parse(storedItem);
        
        // Überprüfe, ob die gespeicherten Daten abgelaufen sind
        if (parsedItem.expiry && parsedItem.expiry > Date.now()) {
          return parsedItem.data as T;
        } else {
          // Entferne abgelaufene Daten aus dem localStorage
          localStorage.removeItem(`form_${key}`);
        }
      }
    } catch (error) {
      console.error("Fehler beim Laden der gespeicherten Formulardaten:", error);
      // Bei Fehler, lösche den Eintrag
      localStorage.removeItem(`form_${key}`);
    }
    
    // Wenn keine gültigen Daten gefunden wurden, verwende initialData
    return initialData;
  });

  // Speichere Daten im localStorage, wenn sie sich ändern
  useEffect(() => {
    try {
      // Berechne Ablaufzeit
      const expiryTime = Date.now() + ttl;
      
      // Speichere Daten mit Ablaufzeit
      const itemToStore = {
        data,
        expiry: expiryTime,
      };
      
      localStorage.setItem(`form_${key}`, JSON.stringify(itemToStore));
    } catch (error) {
      console.error("Fehler beim Speichern der Formulardaten:", error);
    }
  }, [data, key, ttl]);
  
  // Funktion zum Zurücksetzen der gespeicherten Daten
  const clearPersistedData = () => {
    try {
      localStorage.removeItem(`form_${key}`);
      setData(initialData);
    } catch (error) {
      console.error("Fehler beim Löschen der gespeicherten Formulardaten:", error);
    }
  };

  return [data, setData, clearPersistedData];
}