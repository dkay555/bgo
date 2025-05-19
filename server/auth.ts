import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

export async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

// Admin-Benutzer erstellen, falls noch keiner existiert
async function createAdminUserIfNotExists() {
  try {
    // Prüfen, ob bereits ein Admin existiert (mit besserer Fehlerbehandlung)
    let existingAdmin;
    try {
      existingAdmin = await storage.getUserByUsername("admin");
    } catch (dbError) {
      // Falls ein Datenbankfehler auftritt, geben wir eine Warnung aus, aber brechen nicht ab
      console.warn("Warnung: Konnte nicht prüfen, ob Admin-Benutzer existiert:", dbError.message);
      return; // Früh zurückkehren, um die weitere Verarbeitung zu überspringen
    }
    
    // Nur fortfahren, wenn wir sicher wissen, dass kein Admin existiert
    if (!existingAdmin) {
      console.log("Erstelle Admin-Benutzer...");
      try {
        await storage.createUser({
          username: "admin",
          password: await hashPassword("admin123"), // Temporäres Passwort
          email: "admin@example.com",
          name: "Administrator",
          isAdmin: true
        });
        console.log("Admin-Benutzer erstellt. Bitte ändern Sie das Passwort bei der ersten Anmeldung.");
      } catch (createError) {
        console.warn("Konnte Admin-Benutzer nicht erstellen:", createError.message);
      }
    }
  } catch (error) {
    console.error("Fehler im Admin-Erstellungsprozess:", error.message);
    // Fehler protokollieren, aber nicht werfen, damit die App weiterläuft
  }
}

export function setupAuth(app: Express) {
  // Erstelle einen Admin-Benutzer (falls nicht vorhanden)
  createAdminUserIfNotExists();
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "monopoly-go-secret-key",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 Tage
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user || null);
    } catch (error) {
      done(error);
    }
  });

  // Registrierungsendpunkt
  app.post("/api/register", async (req, res, next) => {
    try {
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Benutzername existiert bereits"
        });
      }

      const user = await storage.createUser({
        ...req.body,
        password: await hashPassword(req.body.password),
      });

      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json({
          success: true,
          user
        });
      });
    } catch (error) {
      next(error);
    }
  });

  // Login-Endpunkt mit Admin-Unterstützung
  app.post("/api/login", (req, res, next) => {
    // Prüfen, ob der Admin-Login angefordert wurde
    const isAdminLogin = req.body.isAdmin === true;
    
    passport.authenticate("local", (err: Error | null, user: Express.User | false, info: { message: string } | undefined) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Falscher Benutzername oder Passwort"
        });
      }
      
      // Wenn Admin-Login angefordert wurde, überprüfen, ob der Benutzer Admin ist
      if (isAdminLogin && !user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: "Keine Administratorrechte"
        });
      }
      
      req.login(user, (loginErr) => {
        if (loginErr) return next(loginErr);
        return res.status(200).json({
          success: true,
          user
        });
      });
    })(req, res, next);
  });

  // Logout-Endpunkt
  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.status(200).json({
        success: true,
        message: "Erfolgreich abgemeldet"
      });
    });
  });

  // Aktuelle Benutzerinformationen abrufen
  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        success: false,
        message: "Nicht authentifiziert"
      });
    }
    res.json({
      success: true,
      user: req.user
    });
  });
  
  // Auth-Token des Benutzers aktualisieren
  app.post("/api/user/authtoken", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({
          success: false,
          message: "Nicht authentifiziert"
        });
      }

      const userId = req.user!.id;
      const { authToken } = req.body;

      if (!authToken) {
        return res.status(400).json({
          success: false,
          message: "Auth-Token ist erforderlich"
        });
      }

      const updatedUser = await storage.updateUserAuthToken(userId, authToken);

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "Benutzer nicht gefunden"
        });
      }

      res.json({
        success: true,
        message: "Auth-Token erfolgreich aktualisiert"
      });
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Auth-Tokens:", error);
      res.status(500).json({
        success: false,
        message: "Ein Serverfehler ist aufgetreten"
      });
    }
  });
  
  // Persönliche Benutzerdaten aktualisieren
  app.patch("/api/user/profile", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({
          success: false,
          message: "Nicht authentifiziert"
        });
      }
      
      const userId = req.user!.id;
      const { name, email } = req.body;
      
      // Überprüfen, ob die E-Mail-Adresse bereits verwendet wird
      if (email && email !== req.user!.email) {
        const existingUser = await storage.getUserByEmail(email);
        if (existingUser && existingUser.id !== userId) {
          return res.status(400).json({
            success: false,
            message: "Diese E-Mail-Adresse wird bereits verwendet"
          });
        }
      }
      
      // Benutzerdaten aktualisieren
      const updatedUser = await storage.updateUserProfile(userId, {
        name: name || req.user!.name,
        email: email || req.user!.email
      });
      
      if (!updatedUser) {
        return res.status(500).json({
          success: false,
          message: "Fehler beim Aktualisieren des Benutzerprofils"
        });
      }
      
      res.json({
        success: true,
        user: updatedUser,
        message: "Profil wurde erfolgreich aktualisiert"
      });
    } catch (error) {
      next(error);
    }
  });

  // Auth-Token speichern oder aktualisieren
  app.post("/api/auth-token", (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        success: false,
        message: "Nicht authentifiziert"
      });
    }
    
    const { authToken } = req.body;
    if (!authToken) {
      return res.status(400).json({
        success: false,
        message: "Auth-Token ist erforderlich"
      });
    }

    try {
      storage.updateUserAuthToken(req.user.id, authToken)
        .then(updatedUser => {
          res.status(200).json({
            success: true,
            message: "Auth-Token erfolgreich gespeichert",
            user: updatedUser
          });
        })
        .catch(error => {
          next(error);
        });
    } catch (error) {
      next(error);
    }
  });
}