import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Archive, RefreshCw, Search, Check, X, MessageSquare, Calendar, Mail, Phone } from 'lucide-react';
import { AdminNavigation } from '@/components/AdminNavigation';
import SEOHead from '@/components/SEOHead';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { apiRequest } from '@/lib/queryClient';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

// Typdefinition für Kontaktanfragen
interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  isRead: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminKontaktanfragenPage() {
  const { user, isLoading, error, loginMutation } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("unread");
  const [credentials, setCredentials] = useState({ username: "", password: "", isAdmin: true });

  // Kontaktanfragen abrufen
  const { 
    data: messagesData, 
    isLoading: isLoadingMessages, 
    error: messagesError,
    refetch: refetchMessages
  } = useQuery({
    queryKey: ['/api/admin/contact-messages', activeTab === "archived"],
    queryFn: async () => {
      const response = await fetch(`/api/admin/contact-messages?archived=${activeTab === "archived"}`);
      if (!response.ok) throw new Error('Fehler beim Laden der Kontaktanfragen');
      return response.json();
    },
    enabled: !!user?.isAdmin,
  });

  // Als gelesen markieren
  const markAsReadMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("PATCH", `/api/admin/contact-messages/${id}/read`, {});
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contact-messages'] });
      toast({
        title: "Erfolgreich",
        description: "Die Nachricht wurde als gelesen markiert.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Die Nachricht konnte nicht als gelesen markiert werden: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Archivieren
  const archiveMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("PATCH", `/api/admin/contact-messages/${id}/archive`, {});
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contact-messages'] });
      toast({
        title: "Erfolgreich",
        description: "Die Nachricht wurde archiviert.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Die Nachricht konnte nicht archiviert werden: ${error.message}`,
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

  // Hilfsfunktion für die Filterung nach Suchbegriff
  const filterMessages = (messages: ContactMessage[]) => {
    if (!searchTerm.trim()) return messages;
    
    const lowercaseSearch = searchTerm.toLowerCase();
    return messages.filter(message => 
      message.name.toLowerCase().includes(lowercaseSearch) ||
      message.email.toLowerCase().includes(lowercaseSearch) ||
      (message.subject && message.subject.toLowerCase().includes(lowercaseSearch)) ||
      message.message.toLowerCase().includes(lowercaseSearch) ||
      (message.phone && message.phone.toLowerCase().includes(lowercaseSearch))
    );
  };

  // Login-Formular anzeigen, wenn nicht authentifiziert
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Lade...</div>;
  }

  if (!user?.isAdmin) {
    return (
      <div className="container mx-auto p-4 max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin-Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1">Benutzername</label>
            <Input
              id="username"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">Passwort</label>
            <Input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
            />
          </div>
          <Button type="submit" className="w-full">Anmelden</Button>
          
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {String(error)}
            </div>
          )}
        </form>
      </div>
    );
  }

  // Admin-Bereich, wenn authentifiziert
  const messages = messagesData?.messages || [];
  const filteredMessages = filterMessages(messages);

  return (
    <div className="container mx-auto p-4">
      <SEOHead pageName="Kontaktanfragen" customTitle="Kontaktanfragen verwalten | babixGO Admin" />
      
      {/* Admin-Navigation */}
      <AdminNavigation onLogout={handleLogout} />
    
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Kontaktanfragen</h1>
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
            onClick={() => refetchMessages()} 
            variant="outline"
            disabled={isLoadingMessages}
          >
            {isLoadingMessages ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              "Aktualisieren"
            )}
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="unread">Aktuelle Anfragen</TabsTrigger>
          <TabsTrigger value="archived">Archiv</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {isLoadingMessages ? (
        <div className="flex justify-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : messagesError ? (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Fehler beim Laden der Kontaktanfragen: {String(messagesError instanceof Error ? messagesError.message : 'Unbekannter Fehler')}
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          {searchTerm ? "Keine Kontaktanfragen gefunden, die deiner Suche entsprechen." : 
            activeTab === "archived" ? "Keine archivierten Kontaktanfragen vorhanden." : 
            "Keine neuen Kontaktanfragen vorhanden."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMessages.map(message => (
            <Card key={message.id} className={`overflow-hidden ${!message.isRead ? 'border-primary border-2' : ''}`}>
              <CardHeader className="bg-gray-50 dark:bg-gray-800 pb-3">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="mr-2 truncate">{message.subject || 'Keine Betreffzeile'}</CardTitle>
                  <div className="flex gap-1 flex-shrink-0">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => markAsReadMutation.mutate(message.id)}
                    >
                      {message.isRead ? 
                        <EyeOff className="h-4 w-4" /> : 
                        <Eye className="h-4 w-4" />
                      }
                    </Button>
                    {!message.isArchived && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => archiveMutation.mutate(message.id)}
                      >
                        <Archive className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <CardDescription className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{message.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{format(new Date(message.createdAt), 'dd.MM.yyyy HH:mm', { locale: de })}</span>
                  </div>
                  {message.phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      <span>{message.phone}</span>
                    </div>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 max-h-60 overflow-y-auto">
                <div className="text-sm mb-3 font-medium">
                  Von: {message.name}
                </div>
                <div className="whitespace-pre-line text-sm">
                  {message.message}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}