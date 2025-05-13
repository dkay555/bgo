import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Ticket } from "@shared/schema";
import { getQueryFn } from "@/lib/queryClient";
import { Link } from "wouter";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  AlertCircle, 
  TicketIcon, 
  Plus, 
  RefreshCcw,
  MessageSquareText
} from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";

// Funktion zum Formatieren des Datums
function formatDate(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  return format(date, "dd. MMMM yyyy, HH:mm 'Uhr'", { locale: de });
}

// Funktion zur Anzeige des Status-Badges
function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "open":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
          Offen
        </Badge>
      );
    case "in_progress":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
          In Bearbeitung
        </Badge>
      );
    case "closed":
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
          Geschlossen
        </Badge>
      );
    default:
      return (
        <Badge variant="outline">{status}</Badge>
      );
  }
}

// Funktion zur Anzeige des Prioritäts-Badges
function PriorityBadge({ priority }: { priority: string }) {
  switch (priority) {
    case "low":
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
          Niedrig
        </Badge>
      );
    case "normal":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
          Normal
        </Badge>
      );
    case "high":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
          Hoch
        </Badge>
      );
    default:
      return (
        <Badge variant="outline">{priority}</Badge>
      );
  }
}

export default function TicketsPage() {
  const { user } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const { 
    data: response,
    isLoading,
    error,
    refetch
  } = useQuery<{ success: boolean, tickets: Ticket[] }>({
    queryKey: ["/api/tickets"],
    queryFn: getQueryFn({ on401: "throw" }),
    enabled: !!user,
  });

  const tickets = response?.tickets || [];

  // Funktion zum manuellen Aktualisieren der Tickets
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-[#0A3A68] mb-4" />
          <p className="text-gray-600">Deine Support-Tickets werden geladen...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12">
        <div className="flex flex-col items-center justify-center h-64">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Fehler beim Laden der Tickets</h2>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <Button onClick={() => refetch()}>Erneut versuchen</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0A3A68] mb-2">Support-Tickets</h1>
          <p className="text-gray-600">Hier findest du alle deine Support-Anfragen und ihren aktuellen Status.</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCcw className="h-4 w-4 mr-2" />
            )}
            Aktualisieren
          </Button>
          <Button asChild>
            <Link href="/tickets/new">
              <Plus className="h-4 w-4 mr-2" />
              Neues Ticket
            </Link>
          </Button>
        </div>
      </div>
      
      {tickets.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <TicketIcon className="h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Keine Support-Tickets gefunden</h2>
            <p className="text-gray-600 mb-6">Du hast noch keine Support-Tickets erstellt.</p>
            <Button asChild>
              <Link href="/tickets/new">
                <Plus className="h-4 w-4 mr-2" />
                Neues Ticket erstellen
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Deine Support-Tickets</CardTitle>
            <CardDescription>
              Alle deine offenen und geschlossenen Support-Anfragen im Überblick.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>
                Alle Zeiten in deutscher Zeitzone (MEZ/MESZ).
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Ticket-Nr.</TableHead>
                  <TableHead>Datum</TableHead>
                  <TableHead>Betreff</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priorität</TableHead>
                  <TableHead className="text-right">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>{formatDate(ticket.createdAt)}</TableCell>
                    <TableCell>
                      {ticket.subject}
                      <span className="block text-xs text-gray-500 mt-1">
                        {ticket.message.length > 50 
                          ? `${ticket.message.substring(0, 50)}...` 
                          : ticket.message}
                      </span>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={ticket.status} />
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority={ticket.priority} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/tickets/${ticket.id}`}>
                          <MessageSquareText className="h-4 w-4 mr-2" />
                          Anzeigen
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <p className="text-sm text-gray-500">
              Hast du ein Problem, das nicht in den Tickets gelöst wurde? 
              <Link href="/kontakt" className="text-[#0A3A68] ml-1 hover:underline">
                Kontaktiere uns direkt.
              </Link>
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}