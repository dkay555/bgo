import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Order } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
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
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  CreditCard, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  Package, 
  DollarSign, 
  Check, 
  X, 
  RefreshCw,
  Search,
  Eye,
  Facebook,
  Key,
  Link2,
  Clock,
  Filter,
  SortAsc,
  Download
} from "lucide-react";

export default function NewBestellungen() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [newStatus, setNewStatus] = useState<string>("");
  const [statusReference, setStatusReference] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [emailSubject, setEmailSubject] = useState<string>("");
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [activeOrderTab, setActiveOrderTab] = useState<string>("payment");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [orderStatusUpdate, setOrderStatusUpdate] = useState<{ status: string, note: string }>({
    status: "",
    note: ""
  });

  // Abfrage für Bestellungen
  const { data: orders, isLoading: ordersLoading, refetch } = useQuery<{ success: boolean, orders: Order[] }>({
    queryKey: ["/api/admin/orders"],
    queryFn: async () => {
      const response = await fetch("/api/admin/orders");
      
      if (!response.ok) {
        throw new Error("Fehler beim Laden der Bestellungen");
      }
      
      return response.json();
    },
    enabled: !!user?.isAdmin
  });

  // Mutation zum Aktualisieren des Zahlungsstatus
  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status, reference }: { orderId: number, status: string, reference?: string }) => {
      const response = await fetch(`/api/orders/${orderId}/payment`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
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
          "Content-Type": "application/json"
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
          "Content-Type": "application/json"
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
    setActiveOrderTab("payment");
    
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
      setActiveOrderTab("payment");
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
      
      setActiveOrderTab("payment");
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Bestellungsstatus:", error);
    }
  };

  // Filter und Suchfunktionen
  const getFilteredOrders = () => {
    if (!orders?.orders) return [];
    
    let filtered = [...orders.orders];
    
    // Filtern nach Status
    if (statusFilter !== "all") {
      filtered = filtered.filter(order => order.paymentStatus === statusFilter);
    }
    
    // Filtern nach Suchbegriff
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter(order => (
        order.name.toLowerCase().includes(searchTermLower) ||
        order.email.toLowerCase().includes(searchTermLower) ||
        order.ingameName.toLowerCase().includes(searchTermLower) ||
        order.id.toString().includes(searchTermLower)
      ));
    }
    
    // Sortieren nach Datum (neueste zuerst)
    return filtered.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  const filteredOrders = getFilteredOrders();

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

  // Statistikdaten berechnen
  const getOrderStats = () => {
    if (!orders?.orders) return { total: 0, completed: 0, pending: 0, failed: 0, revenue: 0 };
    
    const total = orders.orders.length;
    const completed = orders.orders.filter(o => o.paymentStatus === 'completed').length;
    const pending = orders.orders.filter(o => o.paymentStatus === 'pending').length;
    const failed = orders.orders.filter(o => o.paymentStatus === 'failed').length;
    const revenue = orders.orders
      .filter(o => o.paymentStatus === 'completed')
      .reduce((sum, order) => sum + parseFloat(order.price), 0);
    
    return { total, completed, pending, failed, revenue };
  };
  
  const stats = getOrderStats();

  // Export von Bestelldaten als CSV
  const exportOrdersAsCSV = () => {
    // Vorbereiten der CSV-Daten
    const headers = ["ID", "Datum", "Name", "In-Game Name", "Email", "Paket", "Preis", "Status", "Referenz"];
    const data = filteredOrders.map(order => [
      order.id,
      formatDate(order.createdAt),
      order.name,
      order.ingameName,
      order.email,
      order.package,
      order.price,
      order.paymentStatus,
      order.paymentReference || ""
    ]);
    
    // CSV-String erstellen
    const csvContent = [
      headers.join(","),
      ...data.map(row => row.join(","))
    ].join("\n");
    
    // CSV herunterladen
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `bestellungen_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render Admin-Bereich
  return (
    <div className="space-y-6">
      {/* Statistik-Übersicht */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Alle Bestellungen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Abgeschlossen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Ausstehend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Fehlgeschlagen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Umsatz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.revenue.toFixed(2)} €</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Filter- und Suchbereich */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          <div className="sm:col-span-5 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Suchen nach Name, E-Mail, ID..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="sm:col-span-3 flex items-center">
            <Filter className="h-4 w-4 mr-2 text-gray-400" />
            <Select 
              value={statusFilter} 
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status filtern" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Status</SelectItem>
                <SelectItem value="pending">Ausstehend</SelectItem>
                <SelectItem value="completed">Abgeschlossen</SelectItem>
                <SelectItem value="failed">Fehlgeschlagen</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="sm:col-span-2">
            <Button 
              onClick={() => refetch()} 
              variant="outline" 
              className="w-full"
              disabled={ordersLoading}
            >
              {ordersLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Aktualisieren
            </Button>
          </div>
          
          <div className="sm:col-span-2">
            <Button 
              onClick={exportOrdersAsCSV} 
              variant="outline" 
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              CSV Export
            </Button>
          </div>
        </div>
      </div>
      
      {/* Bestellungstabelle */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle>Bestellungsliste</CardTitle>
          <CardDescription>
            {filteredOrders.length} Bestellungen gefunden
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
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
                    <TableHead>Spielername</TableHead>
                    <TableHead>Paket</TableHead>
                    <TableHead>Preis</TableHead>
                    <TableHead>Zahlungsstatus</TableHead>
                    <TableHead>Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{formatDate(order.createdAt)}</TableCell>
                      <TableCell>
                        <div>{order.name}</div>
                        <div className="text-xs text-gray-500">{order.email}</div>
                      </TableCell>
                      <TableCell>{order.ingameName}</TableCell>
                      <TableCell>{order.package} Würfel</TableCell>
                      <TableCell>{order.price} €</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(order.paymentStatus)}`}>
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
        </CardContent>
      </Card>

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
            
            <Tabs value={activeOrderTab} onValueChange={setActiveOrderTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="details">Bestelldetails</TabsTrigger>
                <TabsTrigger value="payment">Zahlungsstatus</TabsTrigger>
                <TabsTrigger value="communication">Kommunikation</TabsTrigger>
              </TabsList>
            
              <TabsContent value="details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Persönliche Daten</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="font-medium">Name:</span>
                        <span className="ml-2">{selectedOrder.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="font-medium">E-Mail:</span>
                        <span className="ml-2">{selectedOrder.email}</span>
                      </div>
                      {selectedOrder.whatsapp && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="font-medium">WhatsApp:</span>
                          <span className="ml-2">{selectedOrder.whatsapp}</span>
                        </div>
                      )}
                      {selectedOrder.fbUsername && (
                        <div className="flex items-center">
                          <Facebook className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="font-medium">Facebook:</span>
                          <span className="ml-2">{selectedOrder.fbUsername}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <Key className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="font-medium">Spielername:</span>
                        <span className="ml-2">{selectedOrder.ingameName}</span>
                      </div>
                    </CardContent>
                  </Card>
                
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Bestelldetails</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex items-center">
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
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="font-medium">Paket:</span>
                        <span className="ml-2">{selectedOrder.package} Würfel</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="font-medium">Preis:</span>
                        <span className="ml-2">{selectedOrder.price} €</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="font-medium">Bestelldatum:</span>
                        <span className="ml-2">{formatDate(selectedOrder.createdAt)}</span>
                      </div>
                      <div className="flex items-center">
                        <Link2 className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="font-medium">Zahlungsreferenz:</span>
                        <span className="ml-2">{selectedOrder.paymentReference || '-'}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="payment">
                <Card>
                  <CardHeader>
                    <CardTitle>Zahlungsstatus aktualisieren</CardTitle>
                    <CardDescription>
                      Aktueller Status: <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(selectedOrder.paymentStatus)}`}>
                        {selectedOrder.paymentStatus}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="status" className="text-sm font-medium">Neuer Status</label>
                      <Select value={newStatus} onValueChange={setNewStatus}>
                        <SelectTrigger>
                          <SelectValue placeholder="Status auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Ausstehend (pending)</SelectItem>
                          <SelectItem value="started">Gestartet (started)</SelectItem>
                          <SelectItem value="completed">Abgeschlossen (completed)</SelectItem>
                          <SelectItem value="failed">Fehlgeschlagen (failed)</SelectItem>
                          <SelectItem value="refunded">Zurückerstattet (refunded)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="reference" className="text-sm font-medium">Zahlungsreferenz</label>
                      <Input
                        id="reference"
                        value={statusReference}
                        onChange={(e) => setStatusReference(e.target.value)}
                        placeholder="z.B. Transaktions-ID, PayPal-Referenz..."
                      />
                      <p className="text-xs text-gray-500">
                        Optional: Eine Referenz zur Zahlung, z.B. PayPal-Transaktionsnummer
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                      Abbrechen
                    </Button>
                    <Button 
                      onClick={() => handleStatusChange(selectedOrder.id)}
                      disabled={updateStatusMutation.isPending}
                    >
                      {updateStatusMutation.isPending ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Wird gespeichert...
                        </>
                      ) : (
                        <>Status aktualisieren</>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="communication">
                <Card>
                  <CardHeader>
                    <CardTitle>E-Mail an Kunden senden</CardTitle>
                    <CardDescription>
                      Senden Sie eine individuelle E-Mail an den Kunden bezüglich seiner Bestellung
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">Betreff</label>
                      <Input
                        id="subject"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        placeholder="Betreff der E-Mail eingeben"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Nachricht</label>
                      <textarea
                        id="message"
                        value={emailMessage}
                        onChange={(e) => setEmailMessage(e.target.value)}
                        placeholder="Text der E-Mail eingeben"
                        className="w-full p-2 min-h-32 border rounded-md"
                      />
                      <p className="text-xs text-gray-500">
                        Sie können in der Nachricht auf die Details der Bestellung eingehen.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                      Abbrechen
                    </Button>
                    <Button 
                      onClick={() => handleSendEmail(selectedOrder.id)}
                      disabled={sendEmailMutation.isPending}
                    >
                      {sendEmailMutation.isPending ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Wird gesendet...
                        </>
                      ) : (
                        <>E-Mail senden</>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}