import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Link, useLocation } from "wouter";
import { InsertTicket } from "@shared/schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Schema für das Ticket-Formular
const ticketSchema = z.object({
  subject: z.string().min(5, "Der Betreff muss mindestens 5 Zeichen lang sein").max(100, "Der Betreff darf maximal 100 Zeichen lang sein"),
  message: z.string().min(20, "Deine Nachricht muss mindestens 20 Zeichen lang sein"),
  priority: z.enum(["low", "normal", "high"]).default("normal"),
});

type TicketFormValues = z.infer<typeof ticketSchema>;

export default function NewTicketPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  // Formular initialisieren
  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      subject: "",
      message: "",
      priority: "normal",
    },
  });

  // Ticket-Erstellung Mutation
  const mutation = useMutation({
    mutationFn: async (data: TicketFormValues) => {
      const res = await apiRequest("POST", "/api/tickets", data);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Fehler beim Erstellen des Tickets");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tickets"] });
      setIsSubmitSuccessful(true);
      toast({
        title: "Ticket erfolgreich erstellt",
        description: "Dein Support-Ticket wurde erfolgreich erstellt. Wir werden es so schnell wie möglich bearbeiten.",
        variant: "default",
      });

      // Nach 3 Sekunden zur Ticket-Übersicht navigieren
      setTimeout(() => {
        setLocation("/tickets");
      }, 3000);
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler beim Erstellen des Tickets",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Formular-Submit-Handler
  function onSubmit(values: TicketFormValues) {
    mutation.mutate(values);
  }

  // Erfolgsansicht anzeigen, wenn das Ticket erstellt wurde
  if (isSubmitSuccessful) {
    return (
      <div className="container mx-auto py-12">
        <div className="max-w-lg mx-auto">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Ticket erfolgreich erstellt</h2>
              <p className="text-gray-600 mb-6 text-center">
                Dein Support-Ticket wurde erfolgreich erstellt. Wir werden es so schnell wie möglich bearbeiten.
              </p>
              <p className="text-gray-500 mb-6">Du wirst in wenigen Sekunden zur Ticket-Übersicht weitergeleitet...</p>
              <Button asChild>
                <Link href="/tickets">
                  Zurück zur Ticket-Übersicht
                </Link>
              </Button>
            </CardContent>
          </Card>
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
        <h1 className="text-2xl font-bold text-[#0A3A68]">Neues Support-Ticket erstellen</h1>
        <p className="text-gray-600 mt-2">
          Beschreibe dein Anliegen so detailliert wie möglich, damit wir dir schnell helfen können.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Support-Anfrage</CardTitle>
            <CardDescription>
              Teile uns dein Anliegen mit, und wir werden uns schnellstmöglich darum kümmern.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Betreff */}
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Betreff</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Kurze Zusammenfassung deines Anliegens" 
                          {...field}
                          maxLength={100}
                        />
                      </FormControl>
                      <FormDescription>
                        Der Betreff sollte dein Anliegen kurz zusammenfassen.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Priorität */}
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priorität</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Wähle eine Priorität" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Niedrig - Allgemeine Frage</SelectItem>
                          <SelectItem value="normal">Normal - Technisches Problem</SelectItem>
                          <SelectItem value="high">Hoch - Dringendes Problem</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Wähle die Priorität entsprechend der Dringlichkeit deines Anliegens.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Nachricht */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nachricht</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Beschreibe dein Anliegen so detailliert wie möglich" 
                          className="min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Beschreibe dein Problem so genau wie möglich. Je mehr Details du angibst, 
                        desto schneller können wir dir helfen.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit-Button */}
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Ticket wird erstellt...
                    </>
                  ) : (
                    "Ticket erstellen"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <p className="text-sm text-gray-500">
              Für dringende Anfragen kannst du uns auch direkt{" "}
              <Link href="/kontakt" className="text-[#0A3A68] hover:underline">
                kontaktieren
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}