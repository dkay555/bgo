import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function LazyContentTwo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#0A3A68]">Lazy Content 2</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>
            Diese Komponente wurde als zweites Beispiel für Lazy Loading geladen. Nach dem Laden springt die Seite 
            direkt zu dieser Komponente (auto-scrolling).
          </p>
          <div className="bg-gradient-to-r from-[#FF4C00]/20 to-[#FF8A00]/20 h-32 rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-[#FF4C00]">Auto Scroll</span>
          </div>
          <p>
            Auto-Scrolling ist nützlich, wenn Sie den Benutzer direkt zu einem wichtigen Element führen möchten,
            ohne eine sanfte Animation zu verwenden.
          </p>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="text-sm text-[#0A3A68]/60">Ladezeit: 1500ms</div>
      </CardFooter>
    </Card>
  );
}