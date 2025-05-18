import React from 'react';
import { Helmet } from 'react-helmet';

export default function StickerHilfePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Sticker Hilfe - babixGO</title>
        <meta name="description" content="Hilfebereich für Sticker-Produkte bei babixGO. Hier finden Sie Anleitungen und Tipps zur Verwendung von Stickern im Monopoly Go Spiel." />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Hilfe zu Stickern</h1>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">Wie funktionieren Sticker?</h2>
          <p className="mb-4">
            Dieser Hilfebereich wird bald mit detaillierten Informationen zu unseren Sticker-Produkten gefüllt.
            Hier werden Sie Anleitungen und Tipps zur Verwendung von Stickern in Monopoly Go finden.
          </p>
        </div>
      </div>
    </div>
  );
}