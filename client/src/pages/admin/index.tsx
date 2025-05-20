import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import Bestellungen from "./Bestellungen";
import Benutzer from "./Benutzer";
import EmailVorlagen from "./EmailVorlagen";
import { ProtectedContent } from "@/lib/protected-route";
import { useAuth } from "@/hooks/use-auth";

function AdminPanel() {
  const { logoutMutation } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("bestellungen");

  // URL-Pfad aus der aktuellen URL erfassen
  const getCurrentUrlPathSegment = () => {
    const path = window.location.pathname;
    const segments = path.split('/');
    return segments.length > 2 ? segments[2] : "bestellungen";
  };

  // Tab basierend auf URL aktualisieren
  useState(() => {
    const segment = getCurrentUrlPathSegment();
    if (segment && ["ubersicht", "bestellungen", "benutzer", "email-vorlagen", "tickets"].includes(segment)) {
      setActiveTab(segment);
    }
  });

  // Beim Tab-Wechsel URL anpassen
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setLocation(`/admin/${value}`);
  };

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
          <Bestellungen />
        </TabsContent>

        <TabsContent value="benutzer">
          <Benutzer />
        </TabsContent>

        <TabsContent value="email-vorlagen">
          <EmailVorlagen />
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

export default function AdminPanelWithAuth() {
  return (
    <ProtectedContent adminOnly={true}>
      <AdminPanel />
    </ProtectedContent>
  );
}