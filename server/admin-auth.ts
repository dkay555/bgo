import { Request, Response, NextFunction } from 'express';

/**
 * Middleware für den Admin-Bereich, die prüft, ob der angemeldete Benutzer Admin-Rechte hat
 */
export function adminAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  // Prüfen, ob der Benutzer angemeldet ist
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      message: 'Nicht angemeldet'
    });
  }
  
  // Prüfen, ob der angemeldete Benutzer Admin-Rechte hat
  // @ts-ignore - wir wissen, dass req.user ein User-Objekt mit isAdmin ist
  if (!req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      message: 'Keine Administratorrechte'
    });
  }
  
  // Benutzer ist angemeldet und hat Admin-Rechte
  next();
}