import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Search } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Pencil, X, RefreshCw, Check } from "lucide-react";
import SEOHead from "@/components/SEOHead";

// UI Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Typdefinitionen
interface EmailTemplate {
  id: number;
  templateKey: string;
  name: string;
  subject: string;
  content: string;
  variables: string;
  createdAt: string;
  updatedAt: string;
  updatedBy?: number;
}

export default function AdminEmailVorlagenPage() {
  const { user, isLoading, error, loginMutation } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [editTemplate, setEditTemplate] = useState<EmailTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "", isAdmin: true });

  // Daten abrufen
  const { 
    data: templatesData, 
    isLoading: isLoadingTemplates, 
    error: templatesError,
    refetch: refetchTemplates
  } = useQuery({
    queryKey: ['/api/admin/email-templates'],
    enabled: !!user?.isAdmin,
  });

  // E-Mail-Vorlage aktualisieren
  const updateTemplateMutation = useMutation({
    mutationFn: async (template: Partial<EmailTemplate> & { id: number }) => {
      const { id, ...templateData } = template;
      const res = await apiRequest("PATCH", `/api/admin/email-templates/${id}`, templateData);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Erfolgreich gespeichert",
        description: "Die E-Mail-Vorlage wurde aktualisiert.",
      });
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['/api/admin/email-templates'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Die E-Mail-Vorlage konnte nicht aktualisiert werden: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Login-Handler für Admin-Bereich
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync(credentials);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Logout-Handler
  const handleLogout = async () => {
    // Die Abmeldefunktion aus dem Auth-Hook verwenden
    try {
      await fetch("/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Speichern der bearbeiteten Vorlage
  const handleSaveTemplate = () => {
    if (!editTemplate) return;
    
    updateTemplateMutation.mutate({
      id: editTemplate.id,
      subject: editTemplate.subject,
      content: editTemplate.content
    });
  };

  // Bearbeiten-Dialog öffnen
  const openEditDialog = (template: EmailTemplate) => {
    setEditTemplate({ ...template });
    setIsEditing(true);
  };

  // Variablen aus dem JSON-String parsen
  const parseVariables = (variablesJson: string | undefined): Record<string, string> => {
    if (!variablesJson) return {};
    try {
      return JSON.parse(variablesJson);
    } catch (e) {
      console.error("Fehler beim Parsen der Variablen:", e);
      return {};
    }
  };

  // Filtern der E-Mail-Vorlagen basierend auf Suchbegriff
  const filteredTemplates = templatesData?.templates?.filter((template: EmailTemplate) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      template.name.toLowerCase().includes(searchTermLower) ||
      template.templateKey.toLowerCase().includes(searchTermLower) ||
      template.subject.toLowerCase().includes(searchTermLower)
    );
  }) || [];

  // Loading-Indikator anzeigen während der Admin-Authentifizierung läuft
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // Prüfen, ob Benutzer eingeloggt und Admin ist
  const isAuthenticated = !!user && user.isAdmin === true;

  // Render Login-Formular, wenn nicht authentifiziert
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <SEOHead pageName="Admin Login" />
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Bitte melden Sie sich an, um auf den Admin-Bereich zuzugreifen.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Benutzername
                </label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Passwort
                </label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Anmelden...
                  </>
                ) : (
                  "Anmelden"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  // Render Admin-Bereich, wenn authentifiziert
  return (
    <div className="container mx-auto p-4">
      <SEOHead pageName="E-Mail-Vorlagen verwalten" customTitle="E-Mail-Vorlagen verwalten | babixGO Admin" />
      
      {/* Admin-Navigation */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="flex flex-wrap items-center p-4">
          <h2 className="text-xl font-bold mr-6">Admin-Bereich</h2>
          <div className="flex flex-wrap gap-2">
            <a 
              href="/admin/bestellungen" 
              className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              Bestellungen
            </a>
            <a 
              href="/admin/benutzer" 
              className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              Benutzer
            </a>
            <a 
              href="/admin/email-vorlagen" 
              className="px-4 py-2 rounded-md bg-blue-100 text-blue-800 font-medium"
            >
              E-Mail-Vorlagen
            </a>
          </div>
          <div className="ml-auto mt-2 sm:mt-0">
            <Button onClick={handleLogout} variant="outline" size="sm">
              Abmelden
            </Button>
          </div>
        </div>
      </div>
    
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">E-Mail-Vorlagen</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Suchen..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            onClick={() => refetchTemplates()} 
            variant="outline"
            disabled={isLoadingTemplates}
          >
            {isLoadingTemplates ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              "Aktualisieren"
            )}
          </Button>
        </div>
      </div>

      {isLoadingTemplates ? (
        <div className="flex justify-center p-8">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : templatesError ? (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md">
          Fehler beim Laden der E-Mail-Vorlagen. Bitte versuchen Sie es später erneut.
        </div>
      ) : filteredTemplates.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg text-center">
          {searchTerm ? (
            <p>Keine E-Mail-Vorlagen gefunden, die dem Suchbegriff "{searchTerm}" entsprechen.</p>
          ) : (
            <p>Keine E-Mail-Vorlagen verfügbar.</p>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Schlüssel</TableHead>
                  <TableHead>Betreff</TableHead>
                  <TableHead className="text-right">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTemplates.map((template: EmailTemplate) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">{template.name}</TableCell>
                    <TableCell className="text-sm text-gray-500">{template.templateKey}</TableCell>
                    <TableCell>{template.subject}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 mr-2"
                            onClick={() => {}}
                          >
                            <span className="sr-only">Details anzeigen</span>
                            <Search className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{template.name}</DialogTitle>
                            <DialogDescription>
                              Schlüssel: {template.templateKey}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <h3 className="text-sm font-medium mb-1">Betreff:</h3>
                              <div className="border rounded-md p-3 bg-gray-50">
                                {template.subject}
                              </div>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium mb-1">Inhalt:</h3>
                              <div className="border rounded-md p-3 bg-gray-50 whitespace-pre-wrap max-h-64 overflow-y-auto">
                                {template.content}
                              </div>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium mb-1">Verfügbare Variablen:</h3>
                              <div className="border rounded-md p-3 bg-gray-50 max-h-40 overflow-y-auto">
                                <ul className="list-disc list-inside">
                                  {Object.entries(parseVariables(template.variables)).map(([key, desc]) => (
                                    <li key={key}>
                                      <span className="font-mono text-sm bg-gray-200 px-1 rounded">
                                        {`{{${key}}}`}
                                      </span>
                                      {": "}
                                      {desc}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button 
                              onClick={() => openEditDialog(template)} 
                              className="mr-2"
                            >
                              <Pencil className="h-4 w-4 mr-2" /> Bearbeiten
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => openEditDialog(template)}
                      >
                        <span className="sr-only">Bearbeiten</span>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Bearbeitungsdialog */}
      <Dialog open={isEditing} onOpenChange={(open) => !open && setIsEditing(false)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>E-Mail-Vorlage bearbeiten</DialogTitle>
            <DialogDescription>
              {editTemplate?.name} ({editTemplate?.templateKey})
            </DialogDescription>
          </DialogHeader>
          {editTemplate && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Betreff:
                </label>
                <Input
                  id="subject"
                  value={editTemplate.subject}
                  onChange={(e) => setEditTemplate({ ...editTemplate, subject: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium">
                  Inhalt:
                </label>
                <Textarea
                  id="content"
                  rows={12}
                  value={editTemplate.content}
                  onChange={(e) => setEditTemplate({ ...editTemplate, content: e.target.value })}
                  className="font-mono text-sm"
                />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Verfügbare Variablen:</h3>
                <div className="border rounded-md p-3 bg-gray-50 max-h-40 overflow-y-auto">
                  <ul className="list-disc list-inside">
                    {Object.entries(parseVariables(editTemplate.variables)).map(([key, desc]) => (
                      <li key={key}>
                        <span className="font-mono text-sm bg-gray-200 px-1 rounded">
                          {`{{${key}}}`}
                        </span>
                        {": "}
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              disabled={updateTemplateMutation.isPending}
            >
              Abbrechen
            </Button>
            <Button 
              onClick={handleSaveTemplate} 
              disabled={updateTemplateMutation.isPending}
            >
              {updateTemplateMutation.isPending ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Speichern...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" /> Speichern
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}