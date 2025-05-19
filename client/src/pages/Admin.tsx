import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { useAuth } from "@/hooks/use-auth";

// Lazy load admin components
import { lazy, Suspense } from 'react';
const Bestellungen = lazy(() => import('./admin/Bestellungen'));
const Benutzer = lazy(() => import('./admin/Benutzer'));
const EmailVorlagen = lazy(() => import('./admin/EmailVorlagen'));
const Kontaktanfragen = lazy(() => import('./admin/Kontaktanfragen'));

// Loading component
const AdminTabLoading = () => (
  <div className="flex items-center justify-center h-[400px]">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00CFFF] mb-4 mx-auto"></div>
      <p className="text-[#0A3A68]">Lade Inhalt...</p>
    </div>
  </div>
);

export default function AdminPanel() {
  const { user, logoutMutation, isLoading } = useAuth();
  const [location, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("bestellungen");
  
  // Schütze den Admin-Bereich
  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      setLocation("/");
    }
  }, [user, isLoading, setLocation]);

  // URL-Pfad aus der aktuellen URL erfassen und Tab aktualisieren
  useEffect(() => {
    const path = location;
    if (path === "/admin") {
      setActiveTab("ubersicht");
      return;
    }

    const segments = path.split('/');
    if (segments.length > 2) {
      const tab = segments[2];
      if (["ubersicht", "bestellungen", "kontaktanfragen", "benutzer", "email-vorlagen", "tickets"].includes(tab)) {
        setActiveTab(tab);
      }
    }
  }, [location]);

  // Beim Tab-Wechsel URL anpassen
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setLocation(`/admin/${value}`);
  };

  // Zeige Ladeanzeige während der Authentifizierungsprüfung
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00CFFF] mb-4 mx-auto"></div>
          <p className="text-[#0A3A68] font-bold">Zugriff wird überprüft...</p>
        </div>
      </div>
    );
  }

  // Zeige nichts, wenn kein Admin-Benutzer (Weiterleitung erfolgt durch useEffect)
  if (!user || !user.isAdmin) {
    return null;
  }

  return (
    <main className="px-4 py-6 md:py-10 max-w-6xl mx-auto">
      <SEOHead 
        pageName="Administrator" 
        customTitle="Admin-Bereich | babixGO" 
        customDescription="Administrationsbereich für die Verwaltung von Bestellungen, Benutzern, Tickets und E-Mail-Vorlagen."
      />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin-Bereich</h1>
        <Button onClick={() => logoutMutation.mutate()} variant="outline" size="sm">
          Abmelden
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="ubersicht">Übersicht</TabsTrigger>
          <TabsTrigger value="bestellungen">Bestellungen</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="benutzer">Benutzer</TabsTrigger>
          <TabsTrigger value="email-vorlagen">E-Mail-Vorlagen</TabsTrigger>
        </TabsList>

        <TabsContent value="ubersicht" className="border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Willkommen im Admin-Bereich</h2>
          <p className="mb-4">Hier kannst du alle wichtigen Aspekte der Website verwalten:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2 flex items-center">
                <span className="material-icons mr-2 text-blue-600">shopping_cart</span>
                Bestellungen
              </h3>
              <p className="text-sm text-gray-600">Alle Bestellungen verwalten und bearbeiten.</p>
              <Button 
                variant="link" 
                className="mt-2 p-0 h-auto" 
                onClick={() => handleTabChange("bestellungen")}
              >
                Zu Bestellungen →
              </Button>
            </div>
            
            <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2 flex items-center">
                <span className="material-icons mr-2 text-green-600">support_agent</span>
                Tickets
              </h3>
              <p className="text-sm text-gray-600">Kundensupport-Tickets bearbeiten und verwalten.</p>
              <Button 
                variant="link" 
                className="mt-2 p-0 h-auto" 
                onClick={() => handleTabChange("tickets")}
              >
                Zu Tickets →
              </Button>
            </div>
            
            <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2 flex items-center">
                <span className="material-icons mr-2 text-purple-600">people</span>
                Benutzer
              </h3>
              <p className="text-sm text-gray-600">Benutzerkonten verwalten und bearbeiten.</p>
              <Button 
                variant="link" 
                className="mt-2 p-0 h-auto" 
                onClick={() => handleTabChange("benutzer")}
              >
                Zu Benutzern →
              </Button>
            </div>
            
            <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2 flex items-center">
                <span className="material-icons mr-2 text-orange-600">email</span>
                E-Mail-Vorlagen
              </h3>
              <p className="text-sm text-gray-600">E-Mail-Vorlagen für Benachrichtigungen bearbeiten.</p>
              <Button 
                variant="link" 
                className="mt-2 p-0 h-auto" 
                onClick={() => handleTabChange("email-vorlagen")}
              >
                Zu E-Mail-Vorlagen →
              </Button>
            </div>
          </div>
          
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-bold mb-2 flex items-center">
              <span className="material-icons mr-2 text-blue-600">tips_and_updates</span>
              Schnellzugriff
            </h3>
            <div className="flex flex-wrap gap-2 mt-3">
              <Button variant="outline" size="sm" onClick={() => handleTabChange("bestellungen")}>
                Bestellungen
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleTabChange("kontaktanfragen")}>
                Kontaktanfragen
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleTabChange("tickets")}>
                Tickets
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleTabChange("benutzer")}>
                Benutzer
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleTabChange("email-vorlagen")}>
                E-Mail-Vorlagen
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bestellungen">
          <Suspense fallback={<AdminTabLoading />}>
            <Bestellungen />
          </Suspense>
        </TabsContent>

        <TabsContent value="kontaktanfragen">
          <Suspense fallback={<AdminTabLoading />}>
            <Kontaktanfragen />
          </Suspense>
        </TabsContent>

        <TabsContent value="benutzer">
          <Suspense fallback={<AdminTabLoading />}>
            <Benutzer />
          </Suspense>
        </TabsContent>

        <TabsContent value="email-vorlagen">
          <Suspense fallback={<AdminTabLoading />}>
            <EmailVorlagen />
          </Suspense>
        </TabsContent>

        <TabsContent value="tickets">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Support-Tickets</h2>
            <p>Hier werden die Support-Tickets zur Bearbeitung angezeigt. Dieser Bereich wird noch entwickelt.</p>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}