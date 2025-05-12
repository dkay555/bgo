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
  Eye
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
    setNewStatus(order.paymentStatus);
    setStatusReference(order.paymentReference || "");
    setIsDetailOpen(true);
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
          <Button onClick={handleLogout} variant="outline">Abmelden</Button>
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
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Bestelldetails #{selectedOrder.id}</DialogTitle>
              <DialogDescription>
                Erstellt am {formatDate(selectedOrder.createdAt)}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <span className="font-medium">Paket:</span>
                    <span className="ml-2">{selectedOrder.package} Würfel</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">Preis:</span>
                    <span className="ml-2">{selectedOrder.price} €</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">Zahlungsmethode:</span>
                    <span className="ml-2">{selectedOrder.paymentMethod}</span>
                  </div>
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
                  <div className="flex items-center text-sm">
                    <Shield className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">Auth-Methode:</span>
                    <span className="ml-2">{selectedOrder.authMethod}</span>
                  </div>
                  
                  {selectedOrder.authMethod === 'authtoken' && selectedOrder.authtoken && (
                    <div className="flex items-center text-sm">
                      <Shield className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-medium">Auth-Token:</span>
                      <span className="ml-2">{selectedOrder.authtoken}</span>
                    </div>
                  )}
                  
                  {selectedOrder.authMethod === 'login' && (
                    <>
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="font-medium">Login-E-Mail:</span>
                        <span className="ml-2">{selectedOrder.loginEmail}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Shield className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="font-medium">Passwort:</span>
                        <span className="ml-2">•••••••••••</span>
                      </div>
                    </>
                  )}
                </div>

                <h3 className="text-lg font-medium pt-2">Zahlungsstatus aktualisieren</h3>
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
                </div>
              </div>
            </div>
            
            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                Abbrechen
              </Button>
              <Button 
                onClick={() => handleStatusChange(selectedOrder.id)}
                disabled={updateStatusMutation.isPending || newStatus === selectedOrder.paymentStatus}
              >
                {updateStatusMutation.isPending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Aktualisieren...
                  </>
                ) : (
                  "Status aktualisieren"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}