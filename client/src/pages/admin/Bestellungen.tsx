import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Order } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  CreditCard, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  Package, 
  DollarSign, 
  Shield, 
  Check, 
  X, 
  RefreshCw,
  Search,
  Eye,
  Facebook,
  Key,
  Link2,
  Clock
} from "lucide-react";

interface AdminCredentials {
  username: string;
  password: string;
}

export default function Bestellungen() {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<AdminCredentials>({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [newStatus, setNewStatus] = useState<string>("");
  const [statusReference, setStatusReference] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [emailSubject, setEmailSubject] = useState<string>("");
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("payment"); // payment, status, email
  const [orderStatusUpdate, setOrderStatusUpdate] = useState<{ status: string, note: string }>({
    status: "",
    note: ""
  });

  // Abfrage für Bestellungen, aber nur wenn authentifiziert
  const { data: orders, isLoading: ordersLoading, refetch } = useQuery<{ success: boolean, orders: Order[] }>({
    queryKey: ["/api/admin/orders"],
    queryFn: async () => {
      if (!isAuthenticated) return { success: false, orders: [] };
      
      const response = await fetch("/api/admin/orders", {
        headers: {
          "Authorization": `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          setIsAuthenticated(false);
          throw new Error("Nicht authentifiziert");
        }
        throw new Error("Fehler beim Laden der Bestellungen");
      }
      
      return response.json();
    },
    enabled: isAuthenticated
  });

  // Mutation zum Aktualisieren des Zahlungsstatus
  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status, reference }: { orderId: number, status: string, reference?: string }) => {
      const response = await fetch(`/api/orders/${orderId}/payment`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`
        },
        body: JSON.stringify({ status, reference })
      });
      
      if (!response.ok) {
        throw new Error("Fehler beim Aktualisieren des Status");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/orders"] });
      toast({
        title: "Status aktualisiert",
        description: "Der Zahlungsstatus wurde erfolgreich aktualisiert."
      });
      setIsDetailOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Fehler",
        description: `${error}`,
        variant: "destructive"
      });
    }
  });
  
  // Mutation zum Senden einer E-Mail an den Kunden
  const sendEmailMutation = useMutation({
    mutationFn: async ({ orderId, subject, message }: { orderId: number, subject: string, message: string }) => {
      const response = await fetch(`/api/orders/${orderId}/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`
        },
        body: JSON.stringify({ subject, message })
      });
      
      if (!response.ok) {
        throw new Error("Fehler beim Senden der E-Mail");
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "E-Mail gesendet",
        description: "Die E-Mail wurde erfolgreich an den Kunden gesendet."
      });
    },
    onError: (error) => {
      toast({
        title: "Fehler",
        description: `${error}`,
        variant: "destructive"
      });
    }
  });
  
  // Mutation zum Aktualisieren des Bestellungsstatus
  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({ orderId, status, note }: { orderId: number, status: string, note?: string }) => {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`
        },
        body: JSON.stringify({ status, note })
      });
      
      if (!response.ok) {
        throw new Error("Fehler beim Aktualisieren des Bestellungsstatus");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/orders"] });
      toast({
        title: "Bestellungsstatus aktualisiert",
        description: "Der Bestellungsstatus wurde erfolgreich aktualisiert."
      });
    },
    onError: (error) => {
      toast({
        title: "Fehler",
        description: `${error}`,
        variant: "destructive"
      });
    }
  });

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/admin/orders", {
        headers: {
          "Authorization": `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`
        }
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
        toast({
          title: "Erfolgreich angemeldet",
          description: "Willkommen im Admin-Bereich."
        });
      } else {
        toast({
          title: "Anmeldung fehlgeschlagen",
          description: "Ungültige Anmeldedaten.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Bei der Anmeldung ist ein Fehler aufgetreten.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Status Change
  const handleStatusChange = (orderId: number) => {
    if (!newStatus) {
      toast({
        title: "Fehler",
        description: "Bitte wählen Sie einen Status aus.",
        variant: "destructive"
      });
      return;
    }
    
    updateStatusMutation.mutate({ 
      orderId, 
      status: newStatus,
      reference: statusReference 
    });
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCredentials({ username: "", password: "" });
    toast({
      title: "Abgemeldet",
      description: "Sie wurden erfolgreich abgemeldet."
    });
  };

  // Funktion zum Öffnen der Detailansicht
  const openOrderDetail = (order: Order) => {
    setSelectedOrder(order);
    
    // Zahlungsstatus-Tab vorbereiten
    setNewStatus(order.paymentStatus);
    setStatusReference(order.paymentReference || "");
    
    // Bestellungsstatus-Tab vorbereiten
    setOrderStatusUpdate({
      status: order.paymentStatus,
      note: ""
    });
    
    // E-Mail-Tab vorbereiten
    setEmailSubject("");
    setEmailMessage("");
    
    // Standardtab setzen
    setActiveTab("payment");
    
    setIsDetailOpen(true);
  };
  
  // Funktion zum Zurücksetzen der Email-Form
  const resetEmailForm = () => {
    setEmailSubject("");
    setEmailMessage("");
  };
  
  // Funktion zum Senden einer E-Mail an den Kunden
  const handleSendEmail = async (orderId: number) => {
    if (!emailSubject.trim() || !emailMessage.trim()) {
      toast({
        title: "Fehler",
        description: "Bitte geben Sie Betreff und Nachricht ein.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await sendEmailMutation.mutateAsync({
        orderId,
        subject: emailSubject,
        message: emailMessage
      });
      
      resetEmailForm();
      setActiveTab("payment");
    } catch (error) {
      console.error("Fehler beim Senden der E-Mail:", error);
    }
  };
  
  // Funktion zum Aktualisieren des Bestellungsstatus
  const handleOrderStatusChange = async (orderId: number) => {
    if (!orderStatusUpdate.status) {
      toast({
        title: "Fehler",
        description: "Bitte wählen Sie einen Status aus.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await updateOrderStatusMutation.mutateAsync({
        orderId,
        status: orderStatusUpdate.status,
        note: orderStatusUpdate.note
      });
      
      setActiveTab("payment");
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Bestellungsstatus:", error);
    }
  };

  // Gefilterte Bestellungen basierend auf der Suche
  const filteredOrders = orders?.orders.filter(order => {
    if (!searchTerm) return true;
    
    const searchTermLower = searchTerm.toLowerCase();
    return (
      order.name.toLowerCase().includes(searchTermLower) ||
      order.email.toLowerCase().includes(searchTermLower) ||
      order.ingameName.toLowerCase().includes(searchTermLower) ||
      order.id.toString().includes(searchTermLower)
    );
  }) || [];

  // Formatieren des Datums
  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Hilfsfunktion zur Anzeige des Zahlungsstatus mit farbiger Markierung
  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'started':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
      case 'problem':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Statusfarbe basierend auf dem Status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Render Login-Formular, wenn nicht authentifiziert
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
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
      {/* Admin-Navigation */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="flex items-center p-4">
          <h2 className="text-xl font-bold mr-6">Admin-Bereich</h2>
          <div className="flex flex-wrap gap-2">
            <a 
              href="/admin/bestellungen" 
              className="px-4 py-2 rounded-md bg-blue-100 text-blue-800 font-medium"
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
              className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              E-Mail-Vorlagen
            </a>
          </div>
          <div className="ml-auto">
            <Button onClick={handleLogout} variant="outline" size="sm">
              Abmelden
            </Button>
          </div>
        </div>
      </div>
    
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bestellungsübersicht</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Suchen..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => refetch()} variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {ordersLoading ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Package className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">Keine Bestellungen gefunden</h3>
          <p className="mt-2 text-sm text-gray-500">
            Es wurden keine Bestellungen gefunden, die Ihren Suchkriterien entsprechen.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Paket</TableHead>
                <TableHead>Preis</TableHead>
                <TableHead>Zahlungsstatus</TableHead>
                <TableHead>Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.package} Würfel</TableCell>
                  <TableCell>{order.price} €</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus === 'completed' && <Check className="mr-1 h-3 w-3" />}
                      {order.paymentStatus === 'pending' && <RefreshCw className="mr-1 h-3 w-3" />}
                      {order.paymentStatus === 'failed' && <X className="mr-1 h-3 w-3" />}
                      {order.paymentStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => openOrderDetail(order)}>
                      <Eye className="h-4 w-4 mr-1" /> Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Detailansicht Dialog */}
      {selectedOrder && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Bestelldetails #{selectedOrder.id}</DialogTitle>
              <DialogDescription>
                Erstellt am {formatDate(selectedOrder.createdAt)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Persönliche Daten</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">Name:</span>
                    <span className="ml-2">{selectedOrder.name}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">E-Mail:</span>
                    <span className="ml-2">{selectedOrder.email}</span>
                  </div>
                  {selectedOrder.whatsapp && (
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-medium">WhatsApp:</span>
                      <span className="ml-2">{selectedOrder.whatsapp}</span>
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-medium pt-2">Bestelldetails</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Package className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">Produkttyp:</span>
                    <span className="ml-2">
                      {selectedOrder.productType === 'dice' && 'Würfelboost'}
                      {selectedOrder.productType === 'partnerevent' && 'Partnerevent'}
                      {selectedOrder.productType === 'tycoonracers' && 'Tycoon Racers'}
                      {selectedOrder.productType === 'sticker' && 'Sticker'}
                      {!selectedOrder.productType && 'Würfelboost'}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Package className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">Paket:</span>
                    <span className="ml-2">{selectedOrder.package}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">Preis:</span>
                    <span className="ml-2">{selectedOrder.price} €</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">Zahlungsmethode:</span>
                    <span className="ml-2">{selectedOrder.paymentMethod === 'paypal' ? 'PayPal' : 'Überweisung'}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">Status:</span>
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${getStatusBadgeClass(selectedOrder.paymentStatus)}`}>
                      {selectedOrder.paymentStatus === 'completed' ? 'Bezahlt' : 
                       selectedOrder.paymentStatus === 'pending' ? 'Ausstehend' :
                       selectedOrder.paymentStatus === 'started' ? 'In Bearbeitung' :
                       selectedOrder.paymentStatus}
                    </span>
                  </div>
                  {selectedOrder.paymentReference && (
                    <div className="flex items-center text-sm">
                      <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-medium">Zahlungsreferenz:</span>
                      <span className="ml-2 text-xs max-w-xs truncate">{selectedOrder.paymentReference}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Monopoly-Kontodaten</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">Spielername:</span>
                    <span className="ml-2">{selectedOrder.ingameName}</span>
                  </div>
                  
                  {/* Nur für Würfelboost-Bestellungen Auth-Methode anzeigen */}
                  {(selectedOrder.productType === 'dice' || !selectedOrder.productType) && (
                    <>
                      <div className="flex items-center text-sm">
                        <Shield className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="font-medium">Auth-Methode:</span>
                        <span className="ml-2">{selectedOrder.authMethod}</span>
                      </div>
                      
                      {/* Auth-Daten aus JSON parsen und anzeigen */}
                      {selectedOrder.accountData && (
                        (() => {
                          try {
                            const accountData = JSON.parse(selectedOrder.accountData);
                            return (
                              <>
                                {accountData.authToken && (
                                  <div className="flex items-center text-sm">
                                    <Key className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="font-medium">Auth-Token:</span>
                                    <span className="ml-2 text-xs max-w-xs truncate">{accountData.authToken}</span>
                                  </div>
                                )}
                                
                                {accountData.fbEmail && (
                                  <div className="flex items-center text-sm">
                                    <Facebook className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="font-medium">FB E-Mail:</span>
                                    <span className="ml-2">{accountData.fbEmail}</span>
                                  </div>
                                )}
                                
                                {accountData.fbPassword && (
                                  <div className="flex items-center text-sm">
                                    <Shield className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="font-medium">FB Passwort:</span>
                                    <span className="ml-2">•••••••••••</span>
                                  </div>
                                )}
                                
                                {accountData.executionTime && (
                                  <div className="flex items-center text-sm">
                                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="font-medium">Ausführungszeitpunkt:</span>
                                    <span className="ml-2">
                                      {accountData.executionTime === 'sofort' ? 'Sofort' :
                                       accountData.executionTime === 'abends' ? 'Abends (18-22 Uhr)' :
                                       accountData.executionTime === 'morgens' ? 'Morgens (8-12 Uhr)' :
                                       accountData.executionTime === 'spezifisch' && accountData.specificExecutionTime ? 
                                         `Spezifisch: ${accountData.specificExecutionTime}` :
                                         accountData.executionTime}
                                    </span>
                                  </div>
                                )}
                              </>
                            );
                          } catch (e) {
                            return null;
                          }
                        })()
                      )}
                    </>
                  )}
                  
                  {/* Für Sticker, Partnerevent und Tycoon Racers andere Felder anzeigen */}
                  {['sticker', 'partnerevent', 'tycoonracers'].includes(selectedOrder.productType || '') && selectedOrder.accountData && (
                    (() => {
                      try {
                        const accountData = JSON.parse(selectedOrder.accountData);
                        
                        if (selectedOrder.productType === 'sticker') {
                          return (
                            <div className="flex items-center text-sm">
                              <Link2 className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="font-medium">Freundschaftslink:</span>
                              <span className="ml-2">{selectedOrder.friendshipLink || accountData.friendshipLink}</span>
                            </div>
                          );
                        }
                        
                        if (selectedOrder.productType === 'partnerevent') {
                          return (
                            <>
                              <h4 className="text-md font-medium pt-2 text-[#00CFFF]">Partnerevent-Daten</h4>
                              {accountData.accounts && accountData.accounts.map((account: any, index: number) => (
                                <div key={index} className="mt-2 p-2 bg-gray-50 rounded-md">
                                  <div className="text-sm font-medium mb-1">Account {index + 1} ({account.partnerCount} Partner)</div>
                                  <div className="flex items-center text-sm">
                                    <User className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="font-medium">Spielername:</span>
                                    <span className="ml-2">{account.ingameName}</span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <Link2 className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="font-medium">Freundschaftslink:</span>
                                    <span className="ml-2">{account.friendshipLink}</span>
                                  </div>
                                </div>
                              ))}
                            </>
                          );
                        }
                        
                        if (selectedOrder.productType === 'tycoonracers') {
                          return (
                            <>
                              <h4 className="text-md font-medium pt-2 text-[#00CFFF]">Tycoon Racers Daten</h4>
                              <div className="flex items-center text-sm">
                                <Package className="h-4 w-4 mr-2 text-gray-500" />
                                <span className="font-medium">Typ:</span>
                                <span className="ml-2">{accountData.type === 'team' ? 'Teamplatz' : 'Flaggen'}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Package className="h-4 w-4 mr-2 text-gray-500" />
                                <span className="font-medium">Level:</span>
                                <span className="ml-2">{accountData.level}</span>
                              </div>
                              {accountData.places && accountData.places.map((place: any, index: number) => (
                                <div key={index} className="mt-2 p-2 bg-gray-50 rounded-md">
                                  <div className="text-sm font-medium mb-1">
                                    {accountData.type === 'team' ? 'Teamplatz' : 'Flaggenpaket'} {index + 1}
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <User className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="font-medium">Spielername:</span>
                                    <span className="ml-2">{place.ingameName}</span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <Link2 className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="font-medium">Freundschaftslink:</span>
                                    <span className="ml-2">{place.friendshipLink}</span>
                                  </div>
                                </div>
                              ))}
                            </>
                          );
                        }
                        
                        return null;
                      } catch (e) {
                        return null;
                      }
                    })()
                  )}
                  
                  {selectedOrder.fbLogin && (
                    <div className="flex items-center text-sm">
                      <Facebook className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-medium">Facebook Login:</span>
                      <span className="ml-2">{selectedOrder.fbLogin}</span>
                    </div>
                  )}
                  
                  {selectedOrder.authToken && (
                    <div className="flex items-center text-sm">
                      <Key className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-medium">Auth Token:</span>
                      <span className="ml-2">{selectedOrder.authToken}</span>
                    </div>
                  )}
                  
                  {selectedOrder.friendshipLink && (
                    <div className="flex items-center text-sm">
                      <Link2 className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-medium">Freundschaftslink:</span>
                      <span className="ml-2">{selectedOrder.friendshipLink}</span>
                    </div>
                  )}
                  
                  {selectedOrder.accountName && (
                    <div className="flex items-center text-sm">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-medium">Account-Name:</span>
                      <span className="ml-2">{selectedOrder.accountName}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Navigation Tabs */}
            <div className="flex border-b">
              <button
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'payment' ? 'border-b-2 border-[#00CFFF] text-[#0A3A68]' : 'text-gray-600 hover:text-[#0A3A68]'}`}
                onClick={() => setActiveTab('payment')}
              >
                Zahlungsstatus
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'status' ? 'border-b-2 border-[#00CFFF] text-[#0A3A68]' : 'text-gray-600 hover:text-[#0A3A68]'}`}
                onClick={() => setActiveTab('status')}
              >
                Bestellungsstatus
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'email' ? 'border-b-2 border-[#00CFFF] text-[#0A3A68]' : 'text-gray-600 hover:text-[#0A3A68]'}`}
                onClick={() => setActiveTab('email')}
              >
                E-Mail an Kunde
              </button>
            </div>
            
            {/* Tab Content */}
            <div className="py-4">
              {/* 1. Zahlungsstatus Tab */}
              {activeTab === 'payment' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Zahlungsstatus aktualisieren</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <Select value={newStatus} onValueChange={setNewStatus}>
                        <SelectTrigger>
                          <SelectValue placeholder="Status auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Ausstehend</SelectItem>
                          <SelectItem value="completed">Abgeschlossen</SelectItem>
                          <SelectItem value="failed">Fehlgeschlagen</SelectItem>
                          <SelectItem value="refunded">Erstattet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Referenz (optional)</label>
                      <Input
                        value={statusReference}
                        onChange={(e) => setStatusReference(e.target.value)}
                        placeholder="z.B. PayPal-Transaktions-ID"
                      />
                    </div>
                    
                    <Button 
                      onClick={() => handleStatusChange(selectedOrder.id)}
                      disabled={updateStatusMutation.isPending || newStatus === selectedOrder.paymentStatus}
                      className="w-full"
                    >
                      {updateStatusMutation.isPending ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Aktualisieren...
                        </>
                      ) : (
                        "Zahlungsstatus aktualisieren"
                      )}
                    </Button>
                  </div>
                </div>
              )}
              
              {/* 2. Bestellungsstatus Tab */}
              {activeTab === 'status' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Bestellungsstatus aktualisieren</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <Select 
                        value={orderStatusUpdate.status} 
                        onValueChange={(value) => setOrderStatusUpdate({...orderStatusUpdate, status: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Status auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Offen</SelectItem>
                          <SelectItem value="started">In Bearbeitung</SelectItem>
                          <SelectItem value="completed">Abgeschlossen</SelectItem>
                          <SelectItem value="problem">Problem</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Bemerkung (wird an Kunden gesendet)</label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF]"
                        value={orderStatusUpdate.note}
                        onChange={(e) => setOrderStatusUpdate({...orderStatusUpdate, note: e.target.value})}
                        placeholder="z.B. 'Wir haben Ihnen soeben 25.000 Würfel gutgeschrieben. Viel Spaß!'"
                        rows={4}
                      />
                    </div>
                    
                    <Button 
                      onClick={() => handleOrderStatusChange(selectedOrder.id)}
                      disabled={updateOrderStatusMutation.isPending || (orderStatusUpdate.status === selectedOrder.paymentStatus && !orderStatusUpdate.note)}
                      className="w-full"
                    >
                      {updateOrderStatusMutation.isPending ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Aktualisieren...
                        </>
                      ) : (
                        "Bestellungsstatus aktualisieren"
                      )}
                    </Button>
                  </div>
                </div>
              )}
              
              {/* 3. E-Mail Tab */}
              {activeTab === 'email' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">E-Mail an Kunden senden</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Betreff</label>
                      <Input
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        placeholder="z.B. 'Ihre Bestellung #123 bei babixGO'"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nachricht</label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF]"
                        value={emailMessage}
                        onChange={(e) => setEmailMessage(e.target.value)}
                        placeholder="Geben Sie hier Ihre Nachricht ein..."
                        rows={6}
                      />
                    </div>
                    
                    <Button 
                      onClick={() => handleSendEmail(selectedOrder.id)}
                      disabled={sendEmailMutation.isPending || !emailSubject.trim() || !emailMessage.trim()}
                      className="w-full"
                    >
                      {sendEmailMutation.isPending ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Senden...
                        </>
                      ) : (
                        "E-Mail senden"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                Schließen
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}