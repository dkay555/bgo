// Script zum Zurücksetzen des Admin-Passworts
const { db } = require('../server/db');
const { hashPassword } = require('../server/auth');
const { users } = require('../shared/schema');
const { eq } = require('drizzle-orm');

async function resetAdminPassword() {
  try {
    // Neues Passwort generieren und hashen
    const newPassword = 'admin123';
    const hashedPassword = await hashPassword(newPassword);
    
    // Admin-Passwort aktualisieren
    const result = await db.update(users)
      .set({ password: hashedPassword })
      .where(eq(users.username, 'admin'))
      .returning();
    
    if (result.length > 0) {
      console.log('Admin-Passwort erfolgreich zurückgesetzt!');
      console.log('Benutzername: admin');
      console.log('Passwort: admin123');
    } else {
      console.log('Kein Admin-Benutzer gefunden.');
    }
  } catch (error) {
    console.error('Fehler beim Zurücksetzen des Admin-Passworts:', error);
  } finally {
    process.exit();
  }
}

resetAdminPassword();