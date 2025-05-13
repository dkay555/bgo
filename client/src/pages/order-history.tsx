import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Order } from "@shared/schema";
import { getQueryFn } from "@/lib/queryClient";
import { Link } from "wouter";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
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
import { Loader2, PackageOpen, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";

// Funktion zum Formatieren des Datums
function formatDate(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  return format(date, "dd. MMMM yyyy, HH:mm 'Uhr'", { locale: de });
}

// Funktion zur Anzeige des Zahlungsstatus-Badges
function PaymentStatusBadge({ status }: { status: string }) {
  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
          Ausstehend
        </Badge>
      );
    case "completed":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
          Abgeschlossen
        </Badge>
      );
    case "failed":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
          Fehlgeschlagen
        </Badge>
      );
    case "processing":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
          In Bearbeitung
        </Badge>
      );
    case "started":
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
          Gestartet
        </Badge>
      );
    default:
      return (
        <Badge variant="outline">{status}</Badge>
      );
  }
}

export default function OrderHistory() {
  const { user } = useAuth();
  
  const { 
    data: response,
    isLoading,
    error,
    refetch
  } = useQuery<{ success: boolean, orders: Order[] }>({
    queryKey: ["/api/user/orders"],
    queryFn: getQueryFn({ on401: "throw" }),
    enabled: !!user,
  });

  const orders = response?.orders || [];

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-[#0A3A68] mb-4" />
          <p className="text-gray-600">Deine Bestellungen werden geladen...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12">
        <div className="flex flex-col items-center justify-center h-64">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Fehler beim Laden der Bestellungen</h2>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <Button onClick={() => refetch()}>Erneut versuchen</Button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto py-12">
        <div className="flex flex-col items-center justify-center h-64">
          <PackageOpen className="h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Keine Bestellungen gefunden</h2>
          <p className="text-gray-600 mb-6">Du hast noch keine Bestellungen aufgegeben.</p>
          <Button asChild>
            <Link href="/">Jetzt Würfel bestellen</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0A3A68] mb-2">Deine Bestellungen</h1>
          <p className="text-gray-600">Übersicht aller deiner bisherigen Bestellungen.</p>
        </div>
        <Button asChild className="mt-4 md:mt-0">
          <Link href="/">Neue Bestellung</Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Bestellhistorie</CardTitle>
          <CardDescription>
            Eine Übersicht deiner vergangenen Bestellungen und deren Status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>
              Alle Zeiten in deutscher Zeitzone (MEZ/MESZ).
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Bestell-Nr.</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead>Paket</TableHead>
                <TableHead className="text-right">Preis</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Zahlungsmethode</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>
                    {order.package} Würfel
                    <span className="block text-xs text-gray-500 mt-1">
                      {order.ingameName}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{Number(order.price).toFixed(2)} €</TableCell>
                  <TableCell>
                    <PaymentStatusBadge status={order.paymentStatus} />
                  </TableCell>
                  <TableCell>
                    {order.paymentMethod === 'paypal' ? 'PayPal' : 
                     order.paymentMethod === 'bank_transfer' ? 'Überweisung' : 
                     order.paymentMethod}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}