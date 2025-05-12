import { useEffect } from 'react';
import { MainLayout } from "@/layouts/MainLayout";

export default function AGB() {
  useEffect(() => {
    document.title = 'Allgemeine Geschäftsbedingungen | babixGO';
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl" id="top">
        <h1 className="babix-info-header text-3xl md:text-4xl font-bold mb-8 text-center">Allgemeine Geschäftsbedingungen</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <p className="mb-6 text-sm text-gray-600">Stand: Mai 2025</p>
          
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4">1. Geltungsbereich</h2>
          <p className="mb-6">
            Für alle Bestellungen über unseren Online-Shop gelten die nachfolgenden AGB. Unser Online-Shop richtet sich ausschließlich an Verbraucher.
          </p>
          <p className="mb-6">
            Verbraucher ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können. Unternehmer ist eine natürliche oder juristische Person oder eine rechtsfähige Personengesellschaft, die bei Abschluss eines Rechtsgeschäfts in Ausübung ihrer gewerblichen oder selbständigen beruflichen Tätigkeit handelt.
          </p>
        
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">2. Vertragspartner, Vertragsschluss, Korrekturmöglichkeiten</h2>
          <p className="mb-6">
            Der Kaufvertrag kommt zustande mit babixGO.
          </p>
          <p className="mb-6">
            Mit Einstellung der Produkte in den Online-Shop geben wir ein verbindliches Angebot zum Vertragsschluss über diese Produkte ab. Sie können unsere Produkte zunächst unverbindlich in den Warenkorb legen und Ihre Eingaben vor Absenden Ihrer verbindlichen Bestellung jederzeit korrigieren, indem Sie die hierfür im Bestellablauf vorgesehenen und erläuterten Korrekturhilfen nutzen. Der Vertrag kommt zustande, indem Sie durch Anklicken des Bestellbuttons das Angebot über die im Warenkorb enthaltenen Produkte annehmen. Unmittelbar nach dem Absenden der Bestellung erhalten Sie noch einmal eine Bestätigung per E-Mail.
          </p>
            
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">3. Vertragssprache, Vertragstextspeicherung</h2>
          <p className="mb-6">
            Die für den Vertragsschluss zur Verfügung stehende(n) Sprache(n): Deutsch
          </p>
          <p className="mb-6">
            Wir speichern den Vertragstext auf unseren Systemen, die jedoch für Sie nicht zugänglich sind.
          </p>
            
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">4. Lieferbedingungen</h2>
          <h3 className="text-xl font-bold text-[#0A3A68] mb-2">Lieferoptionen</h3>
          <p className="mb-6">
            Wir versenden die Produkte an die im Bestellprozess angegebene Lieferadresse.
          </p>
          <p className="mb-6">
            Wir liefern nur im Versandweg. Eine Selbstabholung der Ware ist leider nicht möglich.
          </p>
          <p className="mb-6">
            Wir liefern nicht an Packstationen.
          </p>
            
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">5. Bezahlung</h2>
          <p className="mb-6">
            In unserem Shop stehen Ihnen grundsätzlich die nachfolgenden Zahlungsarten zur Verfügung.
          </p>
            
          <h3 className="text-xl font-bold text-[#0A3A68] mb-2">Vorkasse</h3>
          <p className="mb-6">
            Bei Auswahl der Zahlungsart Vorkasse nennen wir Ihnen unsere Bankverbindung in separater E-Mail und liefern die Ware nach Zahlungseingang.
          </p>
            
          <h3 className="text-xl font-bold text-[#0A3A68] mb-2">Kreditkarte</h3>
          <p className="mb-6">
            Im Bestellprozess geben Sie Ihre Kreditkartendaten an. Ihre Karte wird unmittelbar nach Abgabe der Bestellung belastet.
          </p>
          
          <h3 className="text-xl font-bold text-[#0A3A68] mb-2">PayPal, PayPal Express</h3>
          <p className="mb-6">
            Um den Rechnungsbetrag über den Zahlungsdienstleister PayPal (Europe) S.à r.l. et Cie, S.C.A, 22-24 Boulevard Royal, L-2449 Luxembourg („PayPal") bezahlen zu können, müssen Sie bei PayPal registriert sein, sich mit Ihren Zugangsdaten legitimieren und die Zahlungsanweisung bestätigen. Die Zahlungstransaktion wird durch PayPal unmittelbar nach Abgabe der Bestellung durchgeführt. Weitere Hinweise erhalten Sie im Bestellvorgang.
          </p>
            
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">6. Gewährleistung und Garantien</h2>
          <h3 className="text-xl font-bold text-[#0A3A68] mb-2">6.1 Mängelhaftungsrecht</h3>
          <p className="mb-6">
            Es gilt das gesetzliche Mängelhaftungsrecht.
          </p>
          <h3 className="text-xl font-bold text-[#0A3A68] mb-2">6.2 Garantien und Kundendienst</h3>
          <p className="mb-6">
            Informationen zu gegebenenfalls geltenden zusätzlichen Garantien und deren genaue Bedingungen finden Sie jeweils beim Produkt und auf besonderen Informationsseiten im Online-Shop.
          </p>
            
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">7. Haftung</h2>
          <p className="mb-2">
            Für Ansprüche aufgrund von Schäden, die durch uns, unsere gesetzlichen Vertreter oder Erfüllungsgehilfen verursacht wurden, haften wir stets unbeschränkt
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>bei Verletzung des Lebens, des Körpers oder der Gesundheit,</li>
            <li>bei vorsätzlicher oder grob fahrlässiger Pflichtverletzung,</li>
            <li>bei Garantieversprechen, soweit vereinbart, oder</li>
            <li>soweit der Anwendungsbereich des Produkthaftungsgesetzes eröffnet ist.</li>
          </ul>
          <p className="mb-6">
            Bei Verletzung wesentlicher Vertragspflichten, deren Erfüllung die ordnungsgemäße Durchführung des Vertrages überhaupt erst ermöglicht und auf deren Einhaltung der Vertragspartner regelmäßig vertrauen darf, (Kardinalpflichten) durch leichte Fahrlässigkeit von uns, unseren gesetzlichen Vertretern oder Erfüllungsgehilfen ist die Haftung der Höhe nach auf den bei Vertragsschluss vorhersehbaren Schaden begrenzt, mit dessen Entstehung typischerweise gerechnet werden muss.
            <br />
            Im Übrigen sind Ansprüche auf Schadensersatz ausgeschlossen.
          </p>
            
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">8. Streitbeilegung</h2>
          <p className="mb-2">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer" className="text-[#00CFFF] hover:text-[#FF4C00] transition-colors">hier</a> finden.
          </p>
          <p className="mb-6">
            <strong>Wichtiger Hinweis:</strong> Die Plattform zur Online-Streitbeilegung (OS) wird zum 20.7.2025 endgültig eingestellt. Die Einreichung von Beschwerden auf der OS-Plattform wird daher bereits am 20.3.2025 eingestellt.
            <br/>
            Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht bereit.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}