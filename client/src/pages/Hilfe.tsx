import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function Hilfe() {
  // Automatische Weiterleitung zur neuen Hilfe-Übersichtsseite
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    // Umleitung zur neuen Übersichtsseite
    setLocation('/hilfe/uebersicht');
  }, [setLocation]);

  // Zeigt während der Weiterleitung nichts an
  return null;
}