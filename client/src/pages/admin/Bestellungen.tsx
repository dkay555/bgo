import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useQuery } from '@tanstack/react-query';

interface Order {
  id: number;
  name: string;
  email: string;
  whatsapp?: string | null;
  package: string;
  price: number;
  authMethod: string;
  ingameName: string;
  paymentMethod: string;
  paymentStatus: string;
  paymentReference?: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function AdminBestellungen() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Abrufen der Bestellungen
  const { data: orders, isLoading, error, refetch } = useQuery<Order[]>({
    queryKey: ['/api/admin/orders'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/admin/orders');
      if (!response.ok) {
        throw new Error('Fehler beim Laden der Bestellungen');
      }
      const data = await response.json();
      return data.orders;
    }
  });
  
  useEffect(() => {
    document.title = 'Admin: Bestellungen | babixGO';
  }, []);
  
  const handleStatusUpdate = async (orderId: number, newStatus: string) => {
    try {
      const response = await apiRequest('PATCH', `/api/orders/${orderId}/payment`, {
        status: newStatus
      });
      
      if (!response.ok) {
        throw new Error('Fehler beim Aktualisieren des Status');
      }
      
      toast({
        title: 'Status aktualisiert',
        description: `Bestellung #${orderId} ist jetzt ${newStatus}`,
      });
      
      // Neu laden der Daten
      refetch();
    } catch (error: any) {
      toast({
        title: 'Fehler',
        description: error.message,
        variant: 'destructive',
      });
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Filterung der Bestellungen basierend auf dem Suchbegriff
  const filteredOrders = orders ? orders.filter(order => 
    order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.ingameName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toString().includes(searchTerm)
  ) : [];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#0A3A68]">Bestellungen verwalten</h1>
        <Button 
          onClick={() => refetch()} 
          variant="outline"
          className="flex items-center gap-2"
        >
          <span className="material-icons text-sm">refresh</span>
          Aktualisieren
        </Button>
      </div>
      
      <div className="mb-6">
        <Input
          placeholder="Suche nach Name, E-Mail, Ingame-Name oder Bestellnummer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-[#00CFFF] border-t-transparent rounded-full"></div>
        </div>
      ) : error ? (
        <Card className="mb-4 border-red-300 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">Fehler beim Laden der Bestellungen: {(error as Error).message}</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="pb-2 flex flex-row justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="material-icons text-[#00CFFF]">shopping_cart</span>
                        Bestellung #{order.id}
                      </CardTitle>
                      <CardDescription>
                        Erstellt am {formatDate(order.createdAt)}
                      </CardDescription>
                    </div>
                    <Badge className={`${getStatusColor(order.paymentStatus)} text-xs`}>
                      {order.paymentStatus === 'completed' ? 'Bezahlt' : 
                       order.paymentStatus === 'pending' ? 'Ausstehend' : 
                       order.paymentStatus === 'failed' ? 'Fehlgeschlagen' : 
                       order.paymentStatus}
                    </Badge>
                  </CardHeader>
                  
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Kundeninformationen</h3>
                        <p className="text-sm"><span className="font-medium">Name:</span> {order.name}</p>
                        <p className="text-sm"><span className="font-medium">E-Mail:</span> {order.email}</p>
                        {order.whatsapp && (
                          <p className="text-sm"><span className="font-medium">WhatsApp:</span> {order.whatsapp}</p>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Spielinformationen</h3>
                        <p className="text-sm"><span className="font-medium">Paket:</span> {order.package} Würfel</p>
                        <p className="text-sm"><span className="font-medium">Preis:</span> {order.price.toFixed(2)}€</p>
                        <p className="text-sm"><span className="font-medium">Ingame-Name:</span> {order.ingameName}</p>
                        <p className="text-sm">
                          <span className="font-medium">Auth-Methode:</span> {order.authMethod === 'authtoken' ? 'Authtoken' : 'Login'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Zahlungsinformationen</h3>
                      <p className="text-sm"><span className="font-medium">Zahlungsmethode:</span> {order.paymentMethod}</p>
                      {order.paymentReference && (
                        <p className="text-sm">
                          <span className="font-medium">Zahlungsreferenz:</span> {order.paymentReference}
                        </p>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="bg-gray-50 flex justify-end gap-2">
                    {order.paymentStatus !== 'completed' && (
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleStatusUpdate(order.id, 'completed')}
                      >
                        Als bezahlt markieren
                      </Button>
                    )}
                    
                    {order.paymentStatus !== 'pending' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStatusUpdate(order.id, 'pending')}
                      >
                        Als ausstehend markieren
                      </Button>
                    )}
                    
                    {order.paymentStatus !== 'failed' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                        onClick={() => handleStatusUpdate(order.id, 'failed')}
                      >
                        Als fehlgeschlagen markieren
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Card className="text-center py-12">
                <p className="text-gray-500">
                  {searchTerm ? 'Keine Bestellungen mit diesen Suchkriterien gefunden.' : 'Keine Bestellungen vorhanden.'}
                </p>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  );
}