import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, Users, Ticket, Mail, CreditCard, TrendingUp, Clock, Info } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Order, User } from '@shared/schema';

interface RecentActivity {
  id: number;
  name: string;
  package: string;
  price: string;
  createdAt: string;
  paymentStatus: string;
}

export default function AdminDashboard() {
  const { toast } = useToast();
  const { user } = useAuth();
  // Navigationsfunktion für Links
  const handleNavigation = (path: string) => {
    window.location.href = path;
  };
  const [stats, setStats] = useState({
    orders: 0,
    users: 0,
    tickets: 0,
    revenue: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  
  // Laden der Bestellungsdaten
  const { data: ordersData, isLoading: ordersLoading } = useQuery<{ success: boolean, orders: Order[] }>({
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

  // Laden der Benutzerdaten
  const { data: usersData, isLoading: usersLoading } = useQuery<{ success: boolean, users: User[] }>({
    queryKey: ["/api/admin/users"],
    queryFn: async () => {
      const response = await fetch("/api/admin/users");
      if (!response.ok) {
        throw new Error("Fehler beim Laden der Benutzer");
      }
      return response.json();
    },
    enabled: !!user?.isAdmin
  });

  // Fake-Daten für die Statistik-Grafik
  const chartData = [
    { name: 'Jan', bestellungen: 4, umsatz: 320 },
    { name: 'Feb', bestellungen: 7, umsatz: 580 },
    { name: 'Mär', bestellungen: 12, umsatz: 970 },
    { name: 'Apr', bestellungen: 15, umsatz: 1200 },
    { name: 'Mai', bestellungen: 18, umsatz: 1450 }
  ];

  useEffect(() => {
    if (ordersData?.orders && usersData?.users) {
      // Berechne Statistiken
      const totalOrders = ordersData.orders.length;
      const totalUsers = usersData.users.length;
      const totalRevenue = ordersData.orders.reduce((sum, order) => sum + (parseFloat(order.price) || 0), 0);
      
      setStats({
        orders: totalOrders,
        users: totalUsers,
        tickets: 3, // Beispielwert
        revenue: totalRevenue
      });
      
      // Erstelle Aktivitätsliste aus den letzten Bestellungen
      const recentOrders = ordersData.orders
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);
      
      // Konvertiere zu RecentActivity-Objekten
      const recentActivityData = recentOrders.map(order => ({
        id: order.id,
        name: order.name || "Unbekannt",
        package: order.productType || "Produkt",
        price: order.price || "0.00",
        createdAt: order.createdAt ? order.createdAt.toString() : new Date().toString(),
        paymentStatus: order.paymentStatus || "pending"
      }));
      
      setRecentActivity(recentActivityData);
      
      // Hier könnten wir auch den Status für Tickets aktualisieren, derzeit nur Beispielwerte
    }
  }, [ordersData, usersData]);
  
  if (ordersLoading || usersLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }
  
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

  return (
    <div className="space-y-6">
      {/* Statistik-Karten */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Bestellungen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <div className="text-2xl font-bold">{stats.orders}</div>
                <p className="text-xs text-gray-500">Gesamt</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Benutzer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <div className="text-2xl font-bold">{stats.users}</div>
                <p className="text-xs text-gray-500">Registriert</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Ticket className="h-8 w-8 text-yellow-500 mr-3" />
              <div>
                <div className="text-2xl font-bold">{stats.tickets}</div>
                <p className="text-xs text-gray-500">Offen</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Umsatz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <div className="text-2xl font-bold">{stats.revenue.toFixed(2)} €</div>
                <p className="text-xs text-gray-500">Gesamt</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts und Listen */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Aktivitätsübersicht */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Letzte Aktivitäten</CardTitle>
            <CardDescription>Die letzten Bestellungen im System</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Package className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.name}</p>
                    <p className="text-xs text-gray-500">
                      {activity.package} Würfel für {activity.price} €
                    </p>
                    <div className="flex items-center mt-1">
                      <Clock className="h-3 w-3 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">{formatDate(activity.createdAt)}</span>
                    </div>
                  </div>
                  <Badge 
                    className={
                      activity.paymentStatus === 'completed' 
                        ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                        : activity.paymentStatus === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' 
                          : 'bg-red-100 text-red-800 hover:bg-red-100'
                    }
                  >
                    {activity.paymentStatus}
                  </Badge>
                </div>
              ))}
              
              {recentActivity.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  <Info className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p>Keine Aktivitäten gefunden</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => handleNavigation("/admin/bestellungen")}
            >
              Alle Bestellungen ansehen
            </Button>
          </CardFooter>
        </Card>
        
        {/* Umsatz-Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Umsatzentwicklung</CardTitle>
            <CardDescription>Bestellungen und Umsatz der letzten Monate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="bestellungen" fill="#3b82f6" name="Bestellungen" />
                  <Bar yAxisId="right" dataKey="umsatz" fill="#10b981" name="Umsatz (€)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-500">Bestellungen</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-500">Umsatz (€)</span>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      {/* Infokarten */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Wartende Bestellungen</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ordersData?.orders.filter(order => order.paymentStatus === 'pending').length || 0}
            </div>
            <p className="text-xs text-gray-500 mt-1">Bestellungen mit ausstehender Zahlung</p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" className="px-0 text-blue-600 hover:text-blue-800">
              Details anzeigen
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Abgeschlossene Zahlungen</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ordersData?.orders.filter(order => order.paymentStatus === 'completed').length || 0}
            </div>
            <p className="text-xs text-gray-500 mt-1">Erfolgreich abgeschlossene Zahlungen</p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" className="px-0 text-blue-600 hover:text-blue-800">
              Details anzeigen
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Administratoren</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usersData?.users.filter(user => user.isAdmin).length || 0}
            </div>
            <p className="text-xs text-gray-500 mt-1">Benutzer mit Admin-Rechten</p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" className="px-0 text-blue-600 hover:text-blue-800">
              Benutzer verwalten
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}