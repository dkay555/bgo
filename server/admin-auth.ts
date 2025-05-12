import { Request, Response, NextFunction } from 'express';

// Admin-Authentifizierungsdaten
// In einer echten Anwendung sollten diese in einer Datenbank oder einer sicheren Umgebungsvariable gespeichert werden
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'babixAdmin2025';

/**
 * Basic Auth Middleware für den Admin-Bereich
 */
export function adminAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  // Hole Basic Auth Daten aus dem Header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).json({
      success: false,
      message: 'Authentifizierung erforderlich'
    });
  }
  
  // Dekodiere die Base64-kodierten Anmeldedaten
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
  const [username, password] = credentials.split(':');
  
  // Überprüfe die Anmeldedaten
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Authentifizierung erfolgreich
    next();
  } else {
    // Authentifizierung fehlgeschlagen
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).json({
      success: false,
      message: 'Ungültige Anmeldedaten'
    });
  }
}