import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { useAuth } from "@/hooks/use-auth";
import { LayoutDashboard, Package, Users, FileText, TicketIcon, LogOut } from "lucide-react";

// Lazy load admin components
import { lazy, Suspense } from 'react';
const Bestellungen = lazy(() => import('./admin/Bestellungen'));
const Benutzer = lazy(() => import('./admin/Benutzer'));
const EmailVorlagen = lazy(() => import('./admin/EmailVorlagen'));
const AdminDashboard = lazy(() => import('./admin/Dashboard'));

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
  const [activeTab, setActiveTab] = useState("dashboard");
  
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
      setActiveTab("dashboard");
      return;
    }

    const segments = path.split('/');
    if (segments.length > 2) {
      const tab = segments[2];
      if (["dashboard", "bestellungen", "benutzer", "email-vorlagen", "tickets"].includes(tab)) {
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SEOHead 
        pageName="Administrator" 
        customTitle="Admin-Bereich | babixGO" 
        customDescription="Administrationsbereich für die Verwaltung von Bestellungen, Benutzern, Tickets und E-Mail-Vorlagen."
      />
      
      {/* Top navigation bar */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-[#0A3A68] font-bold text-xl">babixGO</span>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">Admin</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Willkommen, {user.username}
            </span>
            <Button 
              onClick={() => logoutMutation.mutate()} 
              variant="ghost" 
              size="sm"
              className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              Abmelden
            </Button>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Side navigation */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
          <nav className="p-4 space-y-1">
            <Button 
              variant={activeTab === "dashboard" ? "secondary" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => handleTabChange("dashboard")}
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button 
              variant={activeTab === "bestellungen" ? "secondary" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => handleTabChange("bestellungen")}
            >
              <Package className="h-4 w-4 mr-2" />
              Bestellungen
            </Button>
            <Button 
              variant={activeTab === "tickets" ? "secondary" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => handleTabChange("tickets")}
            >
              <TicketIcon className="h-4 w-4 mr-2" />
              Tickets
            </Button>
            <Button 
              variant={activeTab === "benutzer" ? "secondary" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => handleTabChange("benutzer")}
            >
              <Users className="h-4 w-4 mr-2" />
              Benutzer
            </Button>
            <Button 
              variant={activeTab === "email-vorlagen" ? "secondary" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => handleTabChange("email-vorlagen")}
            >
              <FileText className="h-4 w-4 mr-2" />
              E-Mail-Vorlagen
            </Button>
          </nav>
        </aside>
        
        {/* Mobile navigation */}
        <div className="md:hidden w-full bg-white border-b border-gray-200 px-4 py-2">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="dashboard" className="flex items-center justify-center gap-1">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="bestellungen" className="flex items-center justify-center gap-1">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Bestellungen</span>
              </TabsTrigger>
              <TabsTrigger value="tickets" className="flex items-center justify-center gap-1">
                <TicketIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Tickets</span>
              </TabsTrigger>
              <TabsTrigger value="benutzer" className="flex items-center justify-center gap-1">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Benutzer</span>
              </TabsTrigger>
              <TabsTrigger value="email-vorlagen" className="flex items-center justify-center gap-1">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">E-Mails</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Main content area */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {/* Page title and description */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === "dashboard" && "Dashboard"}
                {activeTab === "bestellungen" && "Bestellungen verwalten"}
                {activeTab === "tickets" && "Support-Tickets"}
                {activeTab === "benutzer" && "Benutzerverwaltung"}
                {activeTab === "email-vorlagen" && "E-Mail-Vorlagen bearbeiten"}
              </h1>
              <p className="text-gray-600 mt-1">
                {activeTab === "dashboard" && "Übersicht über alle wichtigen Aktivitäten und Statistiken"}
                {activeTab === "bestellungen" && "Hier können Sie alle Bestellungen einsehen und verwalten"}
                {activeTab === "tickets" && "Support-Anfragen und Tickets der Benutzer bearbeiten"}
                {activeTab === "benutzer" && "Verwalten Sie Benutzerkonten und Berechtigungen"}
                {activeTab === "email-vorlagen" && "Bearbeiten Sie die E-Mail-Vorlagen für das System"}
              </p>
            </div>
            
            {/* Tab contents */}
            {activeTab === "dashboard" && (
              <Suspense fallback={<AdminTabLoading />}>
                <AdminDashboard />
              </Suspense>
            )}
            
            {activeTab === "bestellungen" && (
              <Suspense fallback={<AdminTabLoading />}>
                <Bestellungen />
              </Suspense>
            )}
            
            {activeTab === "benutzer" && (
              <Suspense fallback={<AdminTabLoading />}>
                <Benutzer />
              </Suspense>
            )}
            
            {activeTab === "email-vorlagen" && (
              <Suspense fallback={<AdminTabLoading />}>
                <EmailVorlagen />
              </Suspense>
            )}
            
            {activeTab === "tickets" && (
              <div className="bg-white border rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-medium mb-4">Support-Tickets</h2>
                <p className="text-gray-600">
                  Hier werden die Support-Tickets zur Bearbeitung angezeigt. Dieser Bereich wird noch entwickelt.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}