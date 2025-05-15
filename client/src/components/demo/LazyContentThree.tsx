import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function LazyContentThree() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#0A3A68]">Lazy Content 3</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>
            Diese Komponente wurde als drittes Beispiel für Lazy Loading geladen. Nach dem Laden erfolgt kein 
            automatisches Scrollen zu dieser Komponente.
          </p>
          <div className="bg-gradient-to-r from-[#00FF88]/20 to-[#00AA44]/20 h-32 rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-[#00AA44]">Kein Scroll</span>
          </div>
          <p>
            Es kann Situationen geben, in denen Sie Komponenten lazy laden möchten, ohne die Scrollposition
            zu beeinflussen. In diesem Fall bleibt der Benutzer an seiner aktuellen Position.
          </p>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="text-sm text-[#0A3A68]/60">Ladezeit: 2000ms</div>
      </CardFooter>
    </Card>
  );
}