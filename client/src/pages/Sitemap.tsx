import React from 'react';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet';

export default function SitemapPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Sitemap - babixGO</title>
        <meta name="description" content="Übersicht aller verfügbaren Seiten auf babixGO. Finden Sie schnell Informationen zu Würfel-Boosts, Partner-Events, Stickern und mehr." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <h1 className="text-3xl font-bold mb-8 text-center">Sitemap</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Hauptseiten */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-primary">Hauptseiten</h2>
          <ul className="space-y-2">
            <li><Link href="/" className="text-blue-600 hover:underline">Startseite</Link></li>
            <li><Link href="/landing" className="text-blue-600 hover:underline">Landing Page</Link></li>
            <li><Link href="/blog" className="text-blue-600 hover:underline">Blog</Link></li>
            <li><Link href="/news" className="text-blue-600 hover:underline">News</Link></li>
            <li><Link href="/produkte" className="text-blue-600 hover:underline">Produkte</Link></li>
            <li><Link href="/shop" className="text-blue-600 hover:underline">Shop</Link></li>
          </ul>
        </div>

        {/* Rechtliche Seiten */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-primary">Rechtliches</h2>
          <ul className="space-y-2">
            <li><Link href="/kontakt" className="text-blue-600 hover:underline">Kontakt</Link></li>
            <li><Link href="/impressum" className="text-blue-600 hover:underline">Impressum</Link></li>
            <li><Link href="/datenschutz" className="text-blue-600 hover:underline">Datenschutz</Link></li>
            <li><Link href="/agb" className="text-blue-600 hover:underline">AGB</Link></li>
            <li><Link href="/widerruf" className="text-blue-600 hover:underline">Widerrufsrecht</Link></li>
          </ul>
        </div>

        {/* Hilfebereich */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-primary">Hilfebereich</h2>
          <ul className="space-y-2">
            <li><Link href="/hilfe" className="text-blue-600 hover:underline">Hilfe Übersicht</Link></li>
            <li><Link href="/hilfe/wuerfel" className="text-blue-600 hover:underline">Würfel-Hilfe</Link></li>
            <li><Link href="/hilfe/partner" className="text-blue-600 hover:underline">Partner-Hilfe</Link></li>
            <li><Link href="/hilfe/race" className="text-blue-600 hover:underline">Race-Hilfe</Link></li>
            <li><Link href="/hilfe/sticker" className="text-blue-600 hover:underline">Sticker-Hilfe</Link></li>
            <li><Link href="/hilfe/login" className="text-blue-600 hover:underline">Login-Hilfe</Link></li>
            <li><Link href="/hilfe/accounts" className="text-blue-600 hover:underline">Account-Hilfe</Link></li>
            <li><Link href="/hilfe/authtoken" className="text-blue-600 hover:underline">Authtoken-Hilfe</Link></li>
            <li><Link href="/hilfe/authtoken-tool" className="text-blue-600 hover:underline">Authtoken-Tool</Link></li>
          </ul>
        </div>

        {/* Produkt-Unterseiten */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-primary">Produkte</h2>
          <ul className="space-y-2">
            <li><Link href="/produkte/wuerfel" className="text-blue-600 hover:underline">Würfel</Link></li>
            <li><Link href="/produkte/sticker" className="text-blue-600 hover:underline">Sticker</Link></li>
            <li><Link href="/produkte/partner" className="text-blue-600 hover:underline">Partner</Link></li>
            <li><Link href="/produkte/race" className="text-blue-600 hover:underline">Race</Link></li>
            <li><Link href="/produkte/tycoonracers" className="text-blue-600 hover:underline">Tycoon Racers</Link></li>
            <li><Link href="/produkte/weitere" className="text-blue-600 hover:underline">Weitere Produkte</Link></li>
          </ul>
        </div>

        {/* Shop-Unterseiten */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-primary">Shop</h2>
          <ul className="space-y-2">
            <li><Link href="/shop/uebersicht" className="text-blue-600 hover:underline">Preisübersicht</Link></li>
            <li><Link href="/shop/wuerfel" className="text-blue-600 hover:underline">Würfel kaufen</Link></li>
            <li><Link href="/shop/sticker" className="text-blue-600 hover:underline">Sticker kaufen</Link></li>
            <li><Link href="/shop/partnerevent" className="text-blue-600 hover:underline">Partnerevent kaufen</Link></li>
            <li><Link href="/shop/tycoonracers" className="text-blue-600 hover:underline">Tycoon Racers kaufen</Link></li>
          </ul>
        </div>

        {/* Checkout-Seiten */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-primary">Checkout-Seiten</h2>
          <ul className="space-y-2">
            <li><Link href="/checkout/wuerfel" className="text-blue-600 hover:underline">Würfel Checkout</Link></li>
            <li><Link href="/checkout/sticker" className="text-blue-600 hover:underline">Sticker Checkout</Link></li>
            <li><Link href="/checkout/partnerevent" className="text-blue-600 hover:underline">Partnerevent Checkout</Link></li>
            <li><Link href="/checkout/eventwaehrung" className="text-blue-600 hover:underline">Eventwaehrung Checkout</Link></li>
            <li><Link href="/checkout/tycoonracers" className="text-blue-600 hover:underline">Tycoon Racers Checkout</Link></li>
            <li><Link href="/checkout/flaggen" className="text-blue-600 hover:underline">Flaggen Checkout</Link></li>
          </ul>
        </div>

        {/* Account & Tools */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-primary">Account & Tools</h2>
          <ul className="space-y-2">
            <li><Link href="/auth" className="text-blue-600 hover:underline">Anmelden</Link></li>
            <li><Link href="/profile" className="text-blue-600 hover:underline">Profil</Link></li>
            <li><Link href="/order-history" className="text-blue-600 hover:underline">Bestellverlauf</Link></li>
            <li><Link href="/tickets" className="text-blue-600 hover:underline">Support-Tickets</Link></li>
            <li><Link href="/tickets/new" className="text-blue-600 hover:underline">Neues Ticket erstellen</Link></li>
            <li><Link href="/tools/authtoken" className="text-blue-600 hover:underline">Auth-Token Tool</Link></li>
          </ul>
        </div>

        {/* Admin-Bereich (nicht für normale Nutzer gedacht) */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md opacity-50">
          <h2 className="text-xl font-bold mb-4 text-primary">Admin-Bereich</h2>
          <p className="mb-2 text-sm italic">Nur für autorisierte Administratoren</p>
          <ul className="space-y-2">
            <li><span className="text-gray-500">Admin: Bestellungen</span></li>
            <li><span className="text-gray-500">Admin: Benutzer</span></li>
            <li><span className="text-gray-500">Admin: E-Mail-Vorlagen</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}