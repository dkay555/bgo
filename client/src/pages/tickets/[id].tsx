import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient, getQueryFn } from "@/lib/queryClient";
import { Link, useParams, useLocation } from "wouter";
import { Ticket, TicketReply } from "@shared/schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormMessage 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2, RefreshCw, Clock, CheckCheck, XCircle } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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

// Schema für das Antwort-Formular
const replySchema = z.object({
  message: z.string().min(5, "Deine Antwort muss mindestens 5 Zeichen lang sein"),
});

type ReplyFormValues = z.infer<typeof replySchema>;

export default function TicketDetailPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const params = useParams<{ id: string }>();
  const ticketId = parseInt(params.id);
  const [location, setLocation] = useLocation();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Formular initialisieren
  const form = useForm<ReplyFormValues>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      message: "",
    },
  });

  // Ticket und Antworten abrufen
  const { 
    data: response,
    isLoading,
    error,
    refetch
  } = useQuery<{ success: boolean, ticket: Ticket, replies: TicketReply[] }>({
    queryKey: ["/api/tickets", ticketId],
    queryFn: getQueryFn({ on401: "throw" }),
    enabled: !!user && !isNaN(ticketId),
  });

  const ticket = response?.ticket;
  const replies = response?.replies || [];

  // Manuelles Aktualisieren der Ticket-Daten
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  // Mutation zum Senden einer Antwort
  const replyMutation = useMutation({
    mutationFn: async (data: ReplyFormValues) => {
      const res = await apiRequest("POST", `/api/tickets/${ticketId}/replies`, data);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Fehler beim Senden der Antwort");
      }
      return await res.json();
    },
    onSuccess: () => {
      form.reset();
      refetch();
      toast({
        title: "Antwort gesendet",
        description: "Deine Antwort wurde erfolgreich gesendet.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler beim Senden der Antwort",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Mutation zum Ändern des Ticket-Status
  const statusMutation = useMutation({
    mutationFn: async (status: string) => {
      const res = await apiRequest("PATCH", `/api/tickets/${ticketId}/status`, { status });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Fehler beim Ändern des Status");
      }
      return await res.json();
    },
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ["/api/tickets"] });
      toast({
        title: "Status geändert",
        description: "Der Status des Tickets wurde erfolgreich geändert.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler beim Ändern des Status",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Formular-Submit-Handler für die Antwort
  function onSubmit(values: ReplyFormValues) {
    replyMutation.mutate(values);
  }

  // Handler für das Schließen des Tickets
  function handleCloseTicket() {
    statusMutation.mutate("closed");
  }

  // Handler für das Wiedereröffnen des Tickets
  function handleReopenTicket() {
    statusMutation.mutate("open");
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-[#0A3A68] mb-4" />
          <p className="text-gray-600">Ticket wird geladen...</p>
        </div>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="container mx-auto py-12">
        <div className="flex flex-col items-center justify-center h-64">
          <XCircle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Fehler beim Laden des Tickets</h2>
          <p className="text-gray-600 mb-4">{error?.message || "Ticket nicht gefunden"}</p>
          <div className="flex gap-4">
            <Button onClick={() => refetch()}>
              Erneut versuchen
            </Button>
            <Button variant="outline" asChild>
              <Link href="/tickets">
                Zurück zur Übersicht
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/tickets">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zur Ticket-Übersicht
          </Link>
        </Button>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#0A3A68]">
              Ticket #{ticket.id}: {ticket.subject}
            </h1>
            <div className="flex items-center flex-wrap gap-2 mt-2">
              <StatusBadge status={ticket.status} />
              <span className="text-gray-500 text-sm">
                Erstellt am {formatDate(ticket.createdAt)}
              </span>
            </div>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
              {isRefreshing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Aktualisieren
            </Button>
            {ticket.status === "closed" ? (
              <Button 
                variant="outline" 
                onClick={handleReopenTicket} 
                disabled={statusMutation.isPending}
              >
                <Clock className="h-4 w-4 mr-2" />
                Ticket wieder öffnen
              </Button>
            ) : (
              <Button 
                variant="outline" 
                onClick={handleCloseTicket} 
                disabled={statusMutation.isPending}
              >
                <CheckCheck className="h-4 w-4 mr-2" />
                Ticket schließen
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Ticket Details mit Nachricht */}
      <div className="space-y-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ursprüngliche Anfrage</CardTitle>
            <CardDescription>
              Erstellt von dir am {formatDate(ticket.createdAt)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap">{ticket.message}</div>
          </CardContent>
        </Card>

        {/* Antworten */}
        {replies.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#0A3A68] mt-6 mb-2">Antworten</h2>
            {replies.map((reply) => (
              <Card key={reply.id} className={cn({
                "border-l-4 border-l-[#0A3A68]": reply.isAdmin,
                "border-l-4 border-l-[#00CFFF]": !reply.isAdmin
              })}>
                <CardHeader className="py-3">
                  <CardTitle className="text-base">
                    {reply.isAdmin ? (
                      <span className="flex items-center">
                        <Badge className="mr-2 bg-[#0A3A68]">Support</Badge> 
                        Admin
                      </span>
                    ) : (
                      <span>Du</span>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {formatDate(reply.createdAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-3">
                  <div className="whitespace-pre-wrap">{reply.message}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Antwortformular - nur anzeigen, wenn das Ticket nicht geschlossen ist */}
        {ticket.status !== "closed" && (
          <Card>
            <CardHeader>
              <CardTitle>Deine Antwort</CardTitle>
              <CardDescription>
                Füge weitere Informationen hinzu oder stelle Rückfragen.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="Schreibe deine Antwort hier..." 
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    disabled={replyMutation.isPending}
                  >
                    {replyMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Senden...
                      </>
                    ) : (
                      "Antwort senden"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* Info-Box für geschlossenes Ticket */}
        {ticket.status === "closed" && (
          <Card className="bg-gray-50">
            <CardContent className="py-4 text-center">
              <p className="text-gray-500">
                Dieses Ticket ist geschlossen. Klicke auf "Ticket wieder öffnen", um eine Antwort hinzuzufügen.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}