import { useEffect } from 'react';

export default function AGB() {
  useEffect(() => {
    document.title = 'Allgemeine Geschäftsbedingungen | babixGO';
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="babix-info-header text-3xl md:text-4xl font-bold mb-8 text-center">Allgemeine Geschäftsbedingungen</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <p className="mb-6 text-sm text-gray-600">Stand: Mai 2025</p>
        
        <h2 className="text-2xl font-bold text-[#0A3A68] mb-4">§1 Geltungsbereich</h2>
        <p className="mb-6">
          Diese Allgemeinen Geschäftsbedingungen (nachfolgend "AGB") gelten für alle Verträge, die zwischen der BabixGO UG (haftungsbeschränkt), Musterstraße 123, 12345 Musterstadt (nachfolgend "Anbieter") und dem Kunden (nachfolgend "Nutzer") über die Website babixgo.de geschlossen werden.
        </p>
        <p className="mb-6">
          Mit der Registrierung auf unserer Plattform oder der Nutzung unserer Dienste erkennt der Nutzer diese AGB an. Abweichende Bedingungen des Nutzers finden keine Anwendung, es sei denn, der Anbieter stimmt ihrer Geltung ausdrücklich schriftlich zu.
        </p>
        
        <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">§2 Vertragsgegenstand</h2>
        <p className="mb-6">
          Der Anbieter bietet auf seiner Website verschiedene digitale Dienstleistungen im Zusammenhang mit dem Spiel "Monopoly GO" an. Dies umfasst insbesondere:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li className="mb-2">Würfelboosts: Erhöhung der Spielwährung "Würfel" im Spielkonto des Nutzers</li>
          <li className="mb-2">Sticker: Bereitstellung von Spielelementen "Sticker" im Spielkonto des Nutzers</li>
          <li className="mb-2">Partner: Vermittlung von Spielpartnern für gemeinsame Spielaktivitäten</li>
          <li className="mb-2">Race: Unterstützung bei Spielevents "Race" im Spiel Monopoly GO</li>
        </ul>
        <p className="mb-6">
          Die genauen Leistungsbeschreibungen und Preise ergeben sich aus der jeweiligen Produktbeschreibung auf der Website.
        </p>
        
        <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">§3 Vertragsschluss</h2>
        <p className="mb-6">
          Der Nutzer kann aus dem Sortiment des Anbieters Produkte auswählen und diese über den Button "In den Warenkorb legen" in einem Warenkorb sammeln. Über den Button "Kostenpflichtig bestellen" gibt er ein verbindliches Angebot zum Kauf der im Warenkorb befindlichen Waren ab.
        </p>
        <p className="mb-6">
          Vor Abschicken der Bestellung kann der Nutzer die Daten jederzeit ändern und einsehen. Der Anbieter schickt daraufhin dem Nutzer eine automatische Empfangsbestätigung per E-Mail zu, in der die Bestellung des Nutzers nochmals aufgeführt wird. Diese stellt noch keine Annahme des Angebots dar.
        </p>
        <p className="mb-6">
          Der Vertrag kommt zustande, wenn der Anbieter das Angebot des Nutzers durch eine Annahmeerklärung oder durch die Bereitstellung der Leistung innerhalb von 2 Tagen annimmt.
        </p>
        
        <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">§4 Preise und Zahlungsbedingungen</h2>
        <p className="mb-6">
          Alle Preise, die auf der Website des Anbieters angegeben sind, verstehen sich einschließlich der jeweils gültigen gesetzlichen Umsatzsteuer.
        </p>
        <p className="mb-6">
          Dem Nutzer stehen die folgenden Zahlungsmöglichkeiten zur Verfügung:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li className="mb-2">PayPal</li>
          <li className="mb-2">Kreditkarte (Visa, Mastercard)</li>
          <li className="mb-2">Sofortüberweisung</li>
          <li className="mb-2">Paysafecard</li>
        </ul>
        <p className="mb-6">
          Die Zahlung des Kaufpreises ist unmittelbar mit Vertragsschluss fällig. Der Nutzer gerät in Verzug, wenn er nicht innerhalb von 14 Tagen nach Fälligkeit und Zugang einer Rechnung oder gleichwertigen Zahlungsaufforderung leistet.
        </p>
        
        <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">§5 Leistungserbringung</h2>
        <p className="mb-6">
          Der Anbieter wird die bestellten Leistungen nach Zahlungseingang unverzüglich, spätestens jedoch innerhalb von 24 Stunden erbringen.
        </p>
        <p className="mb-6">
          Zur Erbringung der Leistung benötigt der Anbieter vom Nutzer folgende Informationen:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li className="mb-2">Spieler-ID oder Account-Namen im Spiel Monopoly GO</li>
          <li className="mb-2">Je nach Leistungsart weitere spielbezogene Informationen</li>
        </ul>
        <p className="mb-6">
          Der Nutzer ist verpflichtet, korrekte Angaben zu machen. Für Verzögerungen oder Unmöglichkeit der Leistungserbringung aufgrund falscher Angaben haftet der Anbieter nicht.
        </p>
        
        <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">§6 Widerrufsrecht</h2>
        <p className="mb-6">
          Dem Nutzer steht ein gesetzliches Widerrufsrecht zu. Informationen dazu sowie das Widerrufsformular finden sich in der separaten Widerrufsbelehrung.
        </p>
        <p className="mb-6">
          Das Widerrufsrecht erlischt vorzeitig bei Verträgen über die Lieferung digitaler Inhalte, wenn der Anbieter mit der Ausführung des Vertrags begonnen hat, nachdem der Nutzer:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li className="mb-2">ausdrücklich zugestimmt hat, dass der Anbieter mit der Ausführung des Vertrags vor Ablauf der Widerrufsfrist beginnt, und</li>
          <li className="mb-2">seine Kenntnis davon bestätigt hat, dass er durch seine Zustimmung mit Beginn der Ausführung des Vertrags sein Widerrufsrecht verliert.</li>
        </ul>
        
        <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">§7 Haftung</h2>
        <p className="mb-6">
          Der Anbieter haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie nach dem Produkthaftungsgesetz.
        </p>
        <p className="mb-6">
          Für leichte Fahrlässigkeit haftet der Anbieter nur bei Verletzung einer wesentlichen Vertragspflicht und nur in Höhe des vorhersehbaren, vertragstypischen Schadens. Wesentliche Vertragspflichten sind solche, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht und auf deren Einhaltung der Vertragspartner regelmäßig vertrauen darf.
        </p>
        <p className="mb-6">
          Der Anbieter weist ausdrücklich darauf hin, dass die Nutzung der angebotenen Dienste möglicherweise gegen die Nutzungsbedingungen des Spiels Monopoly GO verstoßen könnte. Der Nutzer trägt das Risiko möglicher Konsequenzen (z.B. Accountsperrung) selbst. Eine Haftung des Anbieters für solche Folgen ist ausgeschlossen.
        </p>
        
        <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">§8 Datenschutz</h2>
        <p className="mb-6">
          Der Anbieter erhebt und verwendet die personenbezogenen Daten des Nutzers nur, soweit dies für die Begründung, inhaltliche Ausgestaltung, Änderung oder Abwicklung des Vertragsverhältnisses erforderlich ist. Einzelheiten hierzu sind in der separaten Datenschutzerklärung geregelt.
        </p>
        
        <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">§9 Schlussbestimmungen</h2>
        <p className="mb-6">
          Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
        </p>
        <p className="mb-6">
          Erfüllungsort ist der Sitz des Anbieters. Gerichtsstand für alle Streitigkeiten aus diesem Vertragsverhältnis ist der Sitz des Anbieters, sofern der Nutzer Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.
        </p>
        <p className="mb-6">
          Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, so berührt dies die Wirksamkeit der übrigen Bestimmungen nicht.
        </p>
      </div>
    </div>
  );
}