import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, Link, Redirect } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";
import { Loader2, Plus, Clock, Check, X, AlertCircle, Package } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { de } from "date-fns/locale";

// Typen für Account-Daten
interface GameAccount {
  id: number;
  name: string;
  friendCode?: string;
  friendLink?: string;
  authToken?: string;
  facebookLogin?: string;
  facebookPassword?: string;
  googleLogin?: string;
  googlePassword?: string;
}

interface UserOrder {
  id: number;
  orderNumber: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  items: { name: string; quantity: number; price: number }[];
}

interface UserTicket {
  id: number;
  subject: string;
  status: string;
  createdAt: string;
  lastUpdated: string;
}

export default function UserProfile() {
  const { user, isLoading: authLoading, updateProfileMutation } = useAuth();
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("ubersicht");
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || ""
  });
  
  // URL-Pfad aus der aktuellen URL erfassen und Tab aktualisieren
  useEffect(() => {
    const path = location;
    if (path === "/profile") {
      setActiveTab("ubersicht");
      return;
    }

    const segments = path.split('/');
    if (segments.length > 2) {
      const tab = segments[2];
      if (["ubersicht", "bestellungen", "tickets", "praemien"].includes(tab)) {
        setActiveTab(tab);
      }
    }
  }, [location]);

  // Beim Tab-Wechsel URL anpassen
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setLocation(`/profile/${value}`);
  };

  // Game-Accounts abrufen (Dummy-Daten für jetzt)
  const [gameAccounts, setGameAccounts] = useState<GameAccount[]>([
    {
      id: 1,
      name: "Hauptaccount",
      friendCode: "123-456-789",
      friendLink: "https://example.com/friend/123456",
      authToken: "abc123xyz"
    }
  ]);

  // Beispiel-Bestellungen
  const { data: ordersData, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['/api/user/orders'],
    queryFn: async () => {
      const response = await fetch('/api/user/orders');
      if (!response.ok) throw new Error('Fehler beim Laden der Bestellungen');
      return response.json();
    },
    enabled: !!user,
  });

  // Beispiel-Tickets
  const { data: ticketsData, isLoading: isLoadingTickets } = useQuery({
    queryKey: ['/api/tickets'],
    queryFn: async () => {
      const response = await fetch('/api/tickets');
      if (!response.ok) throw new Error('Fehler beim Laden der Tickets');
      return response.json();
    },
    enabled: !!user,
  });

  // Profiländerungen speichern
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfileMutation.mutateAsync(profileData);
      toast({
        title: "Profil aktualisiert",
        description: "Deine Profiländerungen wurden erfolgreich gespeichert.",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Die Profiländerungen konnten nicht gespeichert werden.",
        variant: "destructive",
      });
    }
  };

  // Account hinzufügen
  const handleAddAccount = () => {
    // In einer realen Anwendung würde hier ein Modal geöffnet oder eine API aufgerufen werden
    // Füge ein leeres Konto zur Liste hinzu
    const newAccount: GameAccount = {
      id: Date.now(), // Temporäre ID
      name: "Neuer Account",
    };
    
    setGameAccounts([...gameAccounts, newAccount]);
    
    toast({
      title: "Account hinzugefügt",
      description: "Neuer Account wurde hinzugefügt. Bitte fülle die Details aus.",
    });
  };

  // Prüfen ob Benutzer angemeldet ist
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Wenn nicht angemeldet, zur Login-Seite weiterleiten
  if (!user) {
    return <Redirect to="/auth" />;
  }

  // Formatierung für Datumsangaben
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd.MM.yyyy HH:mm', { locale: de });
  };

  // Bestellungsstatus übersetzen
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return { label: 'Ausstehend', color: 'bg-yellow-100 text-yellow-800' };
      case 'completed': return { label: 'Abgeschlossen', color: 'bg-green-100 text-green-800' };
      case 'cancelled': return { label: 'Storniert', color: 'bg-red-100 text-red-800' };
      default: return { label: status, color: 'bg-gray-100 text-gray-800' };
    }
  };

  return (
    <main className="px-4 py-6 md:py-10 max-w-6xl mx-auto">
      <SEOHead 
        pageName="Mein Konto" 
        customTitle="Mein Konto | babixGO" 
        customDescription="Verwalte dein Konto, deine Bestellungen und Tickets."
      />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mein Konto</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="ubersicht">Übersicht</TabsTrigger>
          <TabsTrigger value="bestellungen">Bestellungen</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="praemien">Prämien</TabsTrigger>
        </TabsList>

        {/* Übersicht Tab */}
        <TabsContent value="ubersicht">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Persönliche Daten</CardTitle>
                <CardDescription>Bearbeite deine persönlichen Informationen</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      value={profileData.name} 
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail-Adresse</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profileData.email} 
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      disabled={updateProfileMutation.isPending}
                      className="w-full"
                    >
                      {updateProfileMutation.isPending ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Wird gespeichert...</>
                      ) : "Speichern"}
                    </Button>
                  </div>
                </form>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="text-sm text-gray-500 mb-2">
                    <span className="block">Angemeldet seit:</span>
                    <span className="font-medium text-gray-900">
                      {user.createdAt ? formatDate(String(user.createdAt)) : "Unbekannt"}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <span className="block">Zuletzt aktiv:</span>
                    <span className="font-medium text-gray-900">
                      {user.updatedAt ? formatDate(String(user.updatedAt)) : "Unbekannt"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Spielekonten</CardTitle>
                  <CardDescription>Verwalte deine Monopoly GO Accounts</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddAccount}
                  className="flex items-center"
                >
                  <Plus className="mr-1 h-4 w-4" /> Account hinzufügen
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {gameAccounts.map((account, index) => (
                    <div key={account.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Account {index + 1}: {account.name}</h3>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Bearbeiten</Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`ingame-name-${account.id}`}>Ingame Name</Label>
                          <Input 
                            id={`ingame-name-${account.id}`} 
                            value={account.name} 
                            onChange={() => {}} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`friend-code-${account.id}`}>Freundschafts-Code</Label>
                          <Input 
                            id={`friend-code-${account.id}`} 
                            value={account.friendCode || ""} 
                            onChange={() => {}} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`friend-link-${account.id}`}>Freundschaftslink</Label>
                          <Input 
                            id={`friend-link-${account.id}`} 
                            value={account.friendLink || ""} 
                            onChange={() => {}} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`auth-token-${account.id}`}>
                            Facebook Auth-Token
                            <Link to="/tools/authtoken" className="text-blue-500 text-xs ml-2">
                              Zum Auth-Token Tool
                            </Link>
                          </Label>
                          <Input 
                            id={`auth-token-${account.id}`} 
                            value={account.authToken || ""} 
                            onChange={() => {}} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`fb-login-${account.id}`}>Facebook Login</Label>
                          <Input 
                            id={`fb-login-${account.id}`} 
                            value={account.facebookLogin || ""} 
                            onChange={() => {}} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`fb-pass-${account.id}`}>Facebook Passwort</Label>
                          <Input 
                            id={`fb-pass-${account.id}`} 
                            type="password"
                            value={account.facebookPassword || ""} 
                            onChange={() => {}} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`google-login-${account.id}`}>Google Login</Label>
                          <Input 
                            id={`google-login-${account.id}`} 
                            value={account.googleLogin || ""} 
                            onChange={() => {}} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`google-pass-${account.id}`}>Google Passwort</Label>
                          <Input 
                            id={`google-pass-${account.id}`} 
                            type="password"
                            value={account.googlePassword || ""} 
                            onChange={() => {}} 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Bestellungen Tab */}
        <TabsContent value="bestellungen">
          <Card>
            <CardHeader>
              <CardTitle>Meine Bestellungen</CardTitle>
              <CardDescription>Übersicht über alle deine Bestellungen</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingOrders ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : !ordersData?.orders?.length ? (
                <div className="text-center py-12 text-gray-500">
                  Du hast noch keine Bestellungen aufgegeben.
                  <div className="mt-4">
                    <Button variant="outline" asChild>
                      <Link href="/shop">Jetzt einkaufen</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {ordersData.orders.map((order: UserOrder) => {
                    const status = getStatusLabel(order.status);
                    return (
                      <div key={order.id} className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 p-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">Bestellnummer: {order.orderNumber}</h3>
                            <p className="text-sm text-gray-500">
                              Bestellt am: {formatDate(order.createdAt)}
                            </p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                            {status.label}
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="space-y-2">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between">
                                <span>
                                  {item.name} x{item.quantity}
                                </span>
                                <span className="font-medium">
                                  {new Intl.NumberFormat('de-DE', {
                                    style: 'currency',
                                    currency: 'EUR'
                                  }).format(item.price)}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="border-t mt-4 pt-4 flex justify-between font-medium">
                            <span>Gesamtbetrag:</span>
                            <span>
                              {new Intl.NumberFormat('de-DE', {
                                style: 'currency',
                                currency: 'EUR'
                              }).format(order.totalAmount)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tickets Tab */}
        <TabsContent value="tickets">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Support-Tickets</CardTitle>
                <CardDescription>Sende und verwalte deine Support-Anfragen</CardDescription>
              </div>
              <Button asChild>
                <Link href="/tickets/new">Neues Ticket erstellen</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {isLoadingTickets ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : !ticketsData?.tickets?.length ? (
                <div className="text-center py-12 text-gray-500">
                  Du hast noch keine Support-Tickets erstellt.
                </div>
              ) : (
                <div className="space-y-4">
                  <Tabs defaultValue="open" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="open">Offene Tickets</TabsTrigger>
                      <TabsTrigger value="closed">Geschlossene Tickets</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="open">
                      <div className="space-y-4">
                        {ticketsData.tickets
                          .filter((ticket: UserTicket) => ticket.status !== 'closed')
                          .map((ticket: UserTicket) => (
                            <div key={ticket.id} className="border rounded-lg p-4 flex justify-between items-center">
                              <div>
                                <Link href={`/tickets/${ticket.id}`} className="font-medium hover:underline">
                                  {ticket.subject}
                                </Link>
                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                  <Clock className="h-3 w-3" /> 
                                  Erstellt: {formatDate(ticket.createdAt)}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                {ticket.status === 'new' && (
                                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                    Neu
                                  </span>
                                )}
                                {ticket.status === 'in_progress' && (
                                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                                    In Bearbeitung
                                  </span>
                                )}
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/tickets/${ticket.id}`}>Anzeigen</Link>
                                </Button>
                              </div>
                            </div>
                          ))}
                        {!ticketsData.tickets.some((t: UserTicket) => t.status !== 'closed') && (
                          <div className="text-center py-6 text-gray-500">
                            Keine offenen Tickets vorhanden.
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="closed">
                      <div className="space-y-4">
                        {ticketsData.tickets
                          .filter((ticket: UserTicket) => ticket.status === 'closed')
                          .map((ticket: UserTicket) => (
                            <div key={ticket.id} className="border rounded-lg p-4 flex justify-between items-center">
                              <div>
                                <Link href={`/tickets/${ticket.id}`} className="font-medium hover:underline">
                                  {ticket.subject}
                                </Link>
                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                  <Clock className="h-3 w-3" /> 
                                  Geschlossen: {formatDate(ticket.lastUpdated)}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                                  Geschlossen
                                </span>
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/tickets/${ticket.id}`}>Anzeigen</Link>
                                </Button>
                              </div>
                            </div>
                          ))}
                        {!ticketsData.tickets.some((t: UserTicket) => t.status === 'closed') && (
                          <div className="text-center py-6 text-gray-500">
                            Keine geschlossenen Tickets vorhanden.
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Prämien Tab */}
        <TabsContent value="praemien">
          <Card>
            <CardHeader>
              <CardTitle>Prämien & Boni</CardTitle>
              <CardDescription>Verdiene Belohnungen durch Empfehlungen und Aktivitäten</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-medium mb-3">Wirb einen Freund</h3>
                <p className="mb-4">Empfehle babixGO an Freunde und erhalte Belohnungen für jeden neuen Kunden!</p>
                <p className="text-sm mb-6">Diese Funktion wird in Kürze verfügbar sein.</p>
                <Button disabled>Demnächst verfügbar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}