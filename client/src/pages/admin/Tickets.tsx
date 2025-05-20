import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { User } from "@shared/schema";
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
  TicketIcon, 
  Search, 
  RefreshCw, 
  Clock, 
  User as UserIcon, 
  MessageCircle, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  Tag,
  CalendarDays,
  CheckCheck,
  RotateCw  
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Ticket-Typen
interface Ticket {
  id: number;
  userId: number;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userName?: string;
  userEmail?: string;
  replies?: TicketReply[];
}

interface TicketReply {
  id: number;
  ticketId: number;
  userId: number;
  message: string;
  createdAt: string;
  isAdmin: boolean;
  userName?: string;
}

export default function Tickets() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isTicketDetailOpen, setIsTicketDetailOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [newStatus, setNewStatus] = useState("");

  // Abfrage für alle Support-Tickets
  const { data: ticketsData, isLoading: ticketsLoading, refetch } = useQuery({
    queryKey: ["/api/admin/tickets", statusFilter],
    queryFn: async () => {
      const url = statusFilter === "all" 
        ? "/api/admin/tickets" 
        : `/api/admin/tickets?status=${statusFilter}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Fehler beim Laden der Tickets");
      }
      return response.json();
    },
    enabled: !!user?.isAdmin
  });

  // Abfrage für ein einzelnes Ticket mit Antworten
  const { data: ticketDetailData, isLoading: ticketDetailLoading, refetch: refetchTicketDetail } = useQuery({
    queryKey: ["/api/admin/tickets", selectedTicket?.id],
    queryFn: async () => {
      if (!selectedTicket) return null;
      
      const response = await fetch(`/api/admin/tickets/${selectedTicket.id}`);
      if (!response.ok) {
        throw new Error("Fehler beim Laden der Ticket-Details");
      }
      return response.json();
    },
    enabled: !!selectedTicket && !!user?.isAdmin
  });

  // Mutation zum Erstellen einer Ticket-Antwort
  const createReplyMutation = useMutation({
    mutationFn: async ({ ticketId, message }: { ticketId: number, message: string }) => {
      const response = await fetch(`/api/tickets/${ticketId}/replies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });
      
      if (!response.ok) {
        throw new Error("Fehler beim Erstellen der Antwort");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/tickets", selectedTicket?.id] });
      toast({
        title: "Antwort gesendet",
        description: "Ihre Antwort wurde erfolgreich gesendet."
      });
      setReplyMessage("");
    },
    onError: (error) => {
      toast({
        title: "Fehler",
        description: `${error}`,
        variant: "destructive"
      });
    }
  });

  // Mutation zum Aktualisieren des Ticket-Status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ ticketId, status }: { ticketId: number, status: string }) => {
      const response = await fetch(`/api/tickets/${ticketId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });
      
      if (!response.ok) {
        throw new Error("Fehler beim Aktualisieren des Status");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/tickets"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/tickets", selectedTicket?.id] });
      toast({
        title: "Status aktualisiert",
        description: "Der Ticket-Status wurde erfolgreich aktualisiert."
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

  // Funktion zum Öffnen eines Tickets
  const openTicketDetail = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setNewStatus(ticket.status);
    setIsTicketDetailOpen(true);
  };

  // Funktion zum Senden einer Antwort
  const handleSendReply = async () => {
    if (!selectedTicket || !replyMessage.trim()) {
      toast({
        title: "Fehler",
        description: "Bitte geben Sie eine Nachricht ein.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await createReplyMutation.mutateAsync({
        ticketId: selectedTicket.id,
        message: replyMessage
      });
    } catch (error) {
      console.error("Fehler beim Senden der Antwort:", error);
    }
  };

  // Funktion zum Aktualisieren des Status
  const handleUpdateStatus = async () => {
    if (!selectedTicket || !newStatus || newStatus === selectedTicket.status) return;
    
    try {
      await updateStatusMutation.mutateAsync({
        ticketId: selectedTicket.id,
        status: newStatus
      });
      
      // Ticket-Objekt aktualisieren
      if (selectedTicket) {
        setSelectedTicket({
          ...selectedTicket,
          status: newStatus
        });
      }
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Status:", error);
    }
  };

  // Gefilterte Tickets basierend auf der Suche
  const filteredTickets = ticketsData?.tickets?.filter((ticket: Ticket) => {
    if (!searchTerm) return true;
    
    const searchTermLower = searchTerm.toLowerCase();
    return (
      ticket.subject.toLowerCase().includes(searchTermLower) ||
      ticket.message.toLowerCase().includes(searchTermLower) ||
      ticket.userName?.toLowerCase().includes(searchTermLower) ||
      ticket.userEmail?.toLowerCase().includes(searchTermLower) ||
      String(ticket.id).includes(searchTermLower)
    );
  }) || [];

  // Hilfsfunktion zur Anzeige des Ticket-Status mit farbiger Markierung
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">Offen</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">In Bearbeitung</Badge>;
      case 'closed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Geschlossen</Badge>;
      case 'on_hold':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200">Wartend</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200">{status}</Badge>;
    }
  };

  // Formatieren des Datums
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Berechnen der Statistiken
  const calculateStats = () => {
    if (!ticketsData?.tickets) return { total: 0, open: 0, inProgress: 0, closed: 0 };
    
    const tickets = ticketsData.tickets;
    return {
      total: tickets.length,
      open: tickets.filter((t: Ticket) => t.status === 'open').length,
      inProgress: tickets.filter((t: Ticket) => t.status === 'in_progress').length,
      closed: tickets.filter((t: Ticket) => t.status === 'closed').length
    };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      {/* Statistik-Übersicht */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Alle Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TicketIcon className="h-8 w-8 text-blue-500 mr-3" />
              <div className="text-2xl font-bold">{stats.total}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Offene Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-yellow-500 mr-3" />
              <div className="text-2xl font-bold">{stats.open}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">In Bearbeitung</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <RotateCw className="h-8 w-8 text-orange-500 mr-3" />
              <div className="text-2xl font-bold">{stats.inProgress}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Geschlossen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCheck className="h-8 w-8 text-green-500 mr-3" />
              <div className="text-2xl font-bold">{stats.closed}</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Such- und Filterbereich */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-6 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Suchen nach Betreff, Inhalt, Benutzername..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="md:col-span-4 flex items-center">
            <Tag className="h-4 w-4 mr-2 text-gray-400" />
            <Select 
              value={statusFilter} 
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status filtern" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Status</SelectItem>
                <SelectItem value="open">Offen</SelectItem>
                <SelectItem value="in_progress">In Bearbeitung</SelectItem>
                <SelectItem value="closed">Geschlossen</SelectItem>
                <SelectItem value="on_hold">Wartend</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="md:col-span-2">
            <Button 
              onClick={() => refetch()} 
              variant="outline" 
              className="w-full"
              disabled={ticketsLoading}
            >
              {ticketsLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Aktualisieren
            </Button>
          </div>
        </div>
      </div>
      
      {/* Ticket-Tabelle */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle>Support-Tickets</CardTitle>
          <CardDescription>
            {filteredTickets.length} Tickets gefunden
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {ticketsLoading ? (
            <div className="flex justify-center items-center h-64">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <TicketIcon className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Keine Tickets gefunden</h3>
              <p className="mt-2 text-sm text-gray-500">
                Es wurden keine Support-Tickets gefunden, die Ihren Suchkriterien entsprechen.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Betreff</TableHead>
                    <TableHead>Benutzer</TableHead>
                    <TableHead>Datum</TableHead>
                    <TableHead>Letzte Aktualisierung</TableHead>
                    <TableHead>Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket: Ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{ticket.subject}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <UserIcon className="h-3 w-3 text-gray-400" />
                          <span>{ticket.userName || `Benutzer #${ticket.userId}`}</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(ticket.createdAt)}</TableCell>
                      <TableCell>{formatDate(ticket.updatedAt)}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => openTicketDetail(ticket)}
                        >
                          Details
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

      {/* Ticket-Detail Dialog */}
      {selectedTicket && (
        <Dialog open={isTicketDetailOpen} onOpenChange={setIsTicketDetailOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <div className="flex justify-between items-start">
                <div>
                  <DialogTitle>Ticket #{selectedTicket.id}: {selectedTicket.subject}</DialogTitle>
                  <DialogDescription>
                    Erstellt von {selectedTicket.userName || `Benutzer #${selectedTicket.userId}`} am {formatDate(selectedTicket.createdAt)}
                  </DialogDescription>
                </div>
                <div>
                  {getStatusBadge(selectedTicket.status)}
                </div>
              </div>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {/* Linke Seite - Ticket-Informationen */}
              <div className="md:col-span-1 space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Ticket-Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Select 
                      value={newStatus} 
                      onValueChange={setNewStatus}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Status auswählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Offen</SelectItem>
                        <SelectItem value="in_progress">In Bearbeitung</SelectItem>
                        <SelectItem value="closed">Geschlossen</SelectItem>
                        <SelectItem value="on_hold">Wartend</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      onClick={handleUpdateStatus}
                      disabled={!newStatus || newStatus === selectedTicket.status || updateStatusMutation.isPending}
                      className="w-full"
                    >
                      {updateStatusMutation.isPending ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <></>
                      )}
                      Status aktualisieren
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Benutzerinformationen</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <UserIcon className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-medium">Name:</span>
                      <span className="ml-2">{selectedTicket.userName || "Nicht verfügbar"}</span>
                    </div>
                    
                    {selectedTicket.userEmail && (
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="font-medium">E-Mail:</span>
                        <span className="ml-2">{selectedTicket.userEmail}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-medium">Erstellt:</span>
                      <span className="ml-2">{formatDate(selectedTicket.createdAt)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Rechte Seite - Konversation */}
              <div className="md:col-span-2 flex flex-col h-full">
                <Card className="flex-1 flex flex-col">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Konversationsverlauf</CardTitle>
                  </CardHeader>
                  
                  {/* Konversation-Scroll-Bereich */}
                  <ScrollArea className="flex-1 h-[300px] px-4">
                    <div className="space-y-4 py-2">
                      {/* Originalnachricht */}
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <UserIcon className="h-4 w-4 mr-1 text-blue-500" />
                            <span className="font-medium text-sm">
                              {selectedTicket.userName || `Benutzer #${selectedTicket.userId}`}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatDate(selectedTicket.createdAt)}
                          </div>
                        </div>
                        <h4 className="font-medium mb-1">{selectedTicket.subject}</h4>
                        <p className="text-sm whitespace-pre-wrap">{selectedTicket.message}</p>
                      </div>
                      
                      {/* Antworten */}
                      {ticketDetailLoading ? (
                        <div className="flex justify-center py-4">
                          <RefreshCw className="h-5 w-5 animate-spin text-gray-400" />
                        </div>
                      ) : (
                        ticketDetailData?.replies?.map((reply: TicketReply) => (
                          <div 
                            key={reply.id} 
                            className={`p-3 rounded-lg ${reply.isAdmin ? 'bg-blue-50 ml-4' : 'bg-gray-50 mr-4'}`}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <UserIcon className={`h-4 w-4 mr-1 ${reply.isAdmin ? 'text-purple-500' : 'text-blue-500'}`} />
                                <span className="font-medium text-sm">
                                  {reply.isAdmin ? 'Administrator' : (reply.userName || `Benutzer #${reply.userId}`)}
                                </span>
                                {reply.isAdmin && (
                                  <Badge variant="outline" className="ml-2 text-xs bg-purple-50 border-purple-200 text-purple-700">
                                    Support
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-gray-500">
                                {formatDate(reply.createdAt)}
                              </div>
                            </div>
                            <p className="text-sm whitespace-pre-wrap">{reply.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                  
                  {/* Antwort-Formular */}
                  <div className="p-4 border-t">
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Antwort verfassen</h4>
                      <Textarea
                        placeholder="Geben Sie Ihre Antwort ein..."
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        rows={3}
                      />
                      <div className="flex justify-end">
                        <Button 
                          onClick={handleSendReply}
                          disabled={!replyMessage.trim() || createReplyMutation.isPending}
                        >
                          {createReplyMutation.isPending ? (
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <MessageCircle className="h-4 w-4 mr-2" />
                          )}
                          Antwort senden
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            
            <DialogFooter className="pt-4">
              <Button variant="outline" onClick={() => setIsTicketDetailOpen(false)}>
                Schließen
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}