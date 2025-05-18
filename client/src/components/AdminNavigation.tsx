import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

interface AdminNavigationProps {
  onLogout?: () => void;
}

export function AdminNavigation({ onLogout }: AdminNavigationProps) {
  const [location] = useLocation();
  
  // Aktuelle Seite bestimmen
  const isActive = (path: string) => {
    return location.startsWith(path);
  };
  
  return (
    <div className="bg-white shadow mb-6 rounded-lg">
      <div className="flex items-center p-4">
        <h2 className="text-xl font-bold mr-6">Admin-Bereich</h2>
        <div className="flex flex-wrap gap-2">
          <a 
            href="/admin/bestellungen" 
            className={`px-4 py-2 rounded-md transition-colors ${
              isActive("/admin/bestellungen") 
                ? "bg-blue-100 text-blue-800 font-medium" 
                : "hover:bg-gray-100"
            }`}
          >
            Bestellungen
          </a>
          <a 
            href="/admin/benutzer" 
            className={`px-4 py-2 rounded-md transition-colors ${
              isActive("/admin/benutzer") 
                ? "bg-blue-100 text-blue-800 font-medium" 
                : "hover:bg-gray-100"
            }`}
          >
            Benutzer
          </a>
          <a 
            href="/admin/email-vorlagen" 
            className={`px-4 py-2 rounded-md transition-colors ${
              isActive("/admin/email-vorlagen") 
                ? "bg-blue-100 text-blue-800 font-medium" 
                : "hover:bg-gray-100"
            }`}
          >
            E-Mail-Vorlagen
          </a>
        </div>
        {onLogout && (
          <div className="ml-auto">
            <Button onClick={onLogout} variant="outline" size="sm">
              Abmelden
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}