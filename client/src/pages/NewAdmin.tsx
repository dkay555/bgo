import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { useAuth } from "@/hooks/use-auth";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  FileText, 
  TicketIcon, 
  LogOut,
  Menu,
  X
} from "lucide-react";

// Lazy load admin components
import { lazy, Suspense } from 'react';
const Dashboard = lazy(() => import('./admin/Dashboard'));
const NewBestellungen = lazy(() => import('./admin/NewBestellungen'));
const NewBenutzer = lazy(() => import('./admin/NewBenutzer'));
const NewEmailVorlagen = lazy(() => import('./admin/NewEmailVorlagen'));
const Tickets = lazy(() => import('./admin/Tickets'));

// Loading component
const AdminTabLoading = () => (
  <div className="flex items-center justify-center h-[400px]">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00CFFF] mb-4 mx-auto"></div>
      <p className="text-[#0A3A68]">Lade Inhalt...</p>
    </div>
  </div>
);

export default function NewAdminPanel() {
  const { user, logoutMutation, isLoading } = useAuth();
  const [location, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
  
  // Initialisierung: Bei erstem Laden die korrekte URL setzen
  useEffect(() => {
    if (location === "/admin") {
      // Wir sind auf der Hauptseite, alles ist gut
      return;
    }
    
    const segments = location.split('/');
    if (segments.length <= 2) {
      // Falls wir keine Unterseite haben, zum Dashboard weiterleiten
      setLocation("/admin/dashboard");
    }
  }, []);

  // Beim Tab-Wechsel URL anpassen
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Statt zur Unterseite zu navigieren, bleiben wir auf der Admin-Seite und zeigen den Tab direkt an
    if (location !== "/admin") {
      setLocation(`/admin`);
    }
    setIsMobileMenuOpen(false);
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
          
          {/* Mobile menu toggle */}
          <button 
            className="md:hidden p-2" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
          
          <div className="hidden md:flex items-center space-x-4">
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
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-700 border-b border-gray-200 shadow-sm">
          <nav className="px-4 py-2 space-y-1">
            <Button 
              variant={activeTab === "dashboard" ? "default" : "ghost"} 
              className="w-full justify-start my-1" 
              onClick={() => handleTabChange("dashboard")}
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button 
              variant={activeTab === "bestellungen" ? "default" : "ghost"} 
              className="w-full justify-start my-1" 
              onClick={() => handleTabChange("bestellungen")}
            >
              <Package className="h-4 w-4 mr-2" />
              Bestellungen
            </Button>
            <Button 
              variant={activeTab === "tickets" ? "default" : "ghost"} 
              className="w-full justify-start my-1" 
              onClick={() => handleTabChange("tickets")}
            >
              <TicketIcon className="h-4 w-4 mr-2" />
              Tickets
            </Button>
            <Button 
              variant={activeTab === "benutzer" ? "default" : "ghost"} 
              className="w-full justify-start my-1" 
              onClick={() => handleTabChange("benutzer")}
            >
              <Users className="h-4 w-4 mr-2" />
              Benutzer
            </Button>
            <Button 
              variant={activeTab === "email-vorlagen" ? "default" : "ghost"} 
              className="w-full justify-start my-1" 
              onClick={() => handleTabChange("email-vorlagen")}
            >
              <FileText className="h-4 w-4 mr-2" />
              E-Mail-Vorlagen
            </Button>
            
            <div className="border-t border-gray-200 my-2 pt-2">
              <Button 
                onClick={() => logoutMutation.mutate()} 
                variant="ghost" 
                className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Abmelden
              </Button>
            </div>
          </nav>
        </div>
      )}
      
      <div className="flex flex-1">
        {/* Side navigation */}
        <aside className="w-64 hidden md:block" style={{backgroundColor: '#1e40af', borderRight: '1px solid #e5e7eb', opacity: 1}}>
          <nav className="p-4 space-y-1">
            <Button 
              variant={activeTab === "dashboard" ? "default" : "ghost"} 
              className="w-full justify-start text-white hover:text-white hover:bg-blue-700" 
              onClick={() => handleTabChange("dashboard")}
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button 
              variant={activeTab === "bestellungen" ? "default" : "ghost"} 
              className="w-full justify-start text-white hover:text-white hover:bg-blue-700" 
              onClick={() => handleTabChange("bestellungen")}
            >
              <Package className="h-4 w-4 mr-2" />
              Bestellungen
            </Button>
            <Button 
              variant={activeTab === "tickets" ? "default" : "ghost"} 
              className="w-full justify-start text-white hover:text-white hover:bg-blue-700" 
              onClick={() => handleTabChange("tickets")}
            >
              <TicketIcon className="h-4 w-4 mr-2" />
              Tickets
            </Button>
            <Button 
              variant={activeTab === "benutzer" ? "default" : "ghost"} 
              className="w-full justify-start text-white hover:text-white hover:bg-blue-700" 
              onClick={() => handleTabChange("benutzer")}
            >
              <Users className="h-4 w-4 mr-2" />
              Benutzer
            </Button>
            <Button 
              variant={activeTab === "email-vorlagen" ? "default" : "ghost"} 
              className="w-full justify-start text-white hover:text-white hover:bg-blue-700" 
              onClick={() => handleTabChange("email-vorlagen")}
            >
              <FileText className="h-4 w-4 mr-2" />
              E-Mail-Vorlagen
            </Button>
          </nav>
        </aside>
        
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
                <Dashboard />
              </Suspense>
            )}
            
            {activeTab === "bestellungen" && (
              <Suspense fallback={<AdminTabLoading />}>
                <NewBestellungen />
              </Suspense>
            )}
            
            {activeTab === "benutzer" && (
              <Suspense fallback={<AdminTabLoading />}>
                <NewBenutzer />
              </Suspense>
            )}
            
            {activeTab === "email-vorlagen" && (
              <Suspense fallback={<AdminTabLoading />}>
                <NewEmailVorlagen />
              </Suspense>
            )}
            
            {activeTab === "tickets" && (
              <Suspense fallback={<AdminTabLoading />}>
                <Tickets />
              </Suspense>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}