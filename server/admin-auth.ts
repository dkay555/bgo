import { Request, Response, NextFunction } from 'express';
import { storage } from './storage';
import { comparePasswords } from './auth';

/**
 * Middleware für den Admin-Bereich, die entweder Basic Auth oder Session Auth unterstützt
 */
export async function adminAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  // 1. Prüfen auf Basic Auth Header
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Basic ')) {
    // Basic Auth verarbeiten
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');
    
    try {
      // Benutzer aus der Datenbank abrufen
      const user = await storage.getUserByUsername(username);
      
      // Prüfen ob Benutzer existiert und ein Admin ist
      if (!user || !user.isAdmin) {
        return res.status(401).json({
          success: false,
          message: 'Ungültige Anmeldedaten oder keine Administratorrechte'
        });
      }
      
      // Passwort überprüfen
      const passwordValid = await comparePasswords(password, user.password);
      if (!passwordValid) {
        return res.status(401).json({
          success: false,
          message: 'Ungültige Anmeldedaten'
        });
      }
      
      // Authentifizierung erfolgreich
      next();
      return;
    } catch (error) {
      console.error('Fehler bei der Admin-Authentifizierung:', error);
      return res.status(500).json({
        success: false,
        message: 'Serverfehler bei der Authentifizierung'
      });
    }
  }
  
  // 2. Alternativ: Prüfen auf Session-basierte Authentifizierung
  if (req.isAuthenticated()) {
    // @ts-ignore - wir wissen, dass req.user ein User-Objekt mit isAdmin ist
    if (req.user.isAdmin) {
      return next();
    } else {
      return res.status(403).json({
        success: false,
        message: 'Keine Administratorrechte'
      });
    }
  }
  
  // Weder Basic Auth noch Session Auth erfolgreich
  return res.status(401).json({
    success: false,
    message: 'Nicht angemeldet'
  });
}