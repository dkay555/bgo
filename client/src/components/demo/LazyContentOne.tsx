import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function LazyContentOne() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#0A3A68]">Lazy Content 1</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>
            Diese Komponente wurde als erstes Beispiel für Lazy Loading geladen. Nach dem Laden scrollt die Seite
            sanft zu dieser Komponente.
          </p>
          <div className="bg-gradient-to-r from-[#00CFFF]/20 to-[#0A3A68]/20 h-32 rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-[#0A3A68]">Smooth Scroll</span>
          </div>
          <p>
            Das Smooth Scrolling sorgt für eine angenehme Benutzererfahrung, indem die Seite nicht abrupt springt, 
            sondern sanft zum Ziel gleitet.
          </p>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="text-sm text-[#0A3A68]/60">Ladezeit: 1000ms</div>
      </CardFooter>
    </Card>
  );
}