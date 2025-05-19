import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Formatiert einen Preis für die Anzeige (mit Komma) oder für PayPal (mit Punkt)
 * @param price Der Preis als Zahl
 * @param forPayPal Ob der Preis für PayPal (true) oder Anzeige (false) formatiert werden soll
 * @returns Formatierter Preis als String
 */
export function formatPrice(price: number, forPayPal: boolean = false): string {
  const formattedPrice = price.toFixed(2);
  
  // Für PayPal benötigen wir einen Punkt als Dezimaltrenner, für die Anzeige ein Komma
  return forPayPal ? formattedPrice : formattedPrice.replace('.', ',');
}
