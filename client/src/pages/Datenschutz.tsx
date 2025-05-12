import { useEffect } from 'react';
import { MainLayout } from "@/layouts/MainLayout";

export default function Datenschutz() {
  useEffect(() => {
    document.title = 'Datenschutzerklärung | babixGO';
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl" id="top">
        <h1 className="babix-info-header text-3xl md:text-4xl font-bold mb-8 text-center">Datenschutzerklärung</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <p className="mb-6 text-sm text-gray-600">Stand: Mai 2025</p>
          
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4">Verantwortlicher für die Datenverarbeitung ist:</h2>
          <div className="mb-6">
            <p className="mb-1">Dennis Kemper</p>
            <p className="mb-1">Kaiserstraße 26</p>
            <p className="mb-1">58706 Menden</p>
            <p className="mb-1">Deutschland</p>
            <p className="mb-1">Email: datenschutz@babixgo.de</p>
            <p className="mb-1">Telefon: 015734509031</p>
          </div>
          
          <p className="mb-6">
            Wir freuen uns über Ihr Interesse an unserem Online-Shop. Der Schutz Ihrer Privatsphäre ist für uns sehr wichtig. Nachstehend informieren wir Sie ausführlich über den Umgang mit Ihren Daten.
          </p>
          
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">1. Zugriffsdaten und Hosting</h2>
          <p className="mb-6">
            Sie können unsere Webseiten besuchen, ohne Angaben zu Ihrer Person zu machen. Bei jedem Aufruf einer Webseite speichert der Webserver lediglich automatisch ein sogenanntes Server-Logfile, das z.B. den Namen der angeforderten Datei, Ihre IP-Adresse, Datum und Uhrzeit des Abrufs, übertragene Datenmenge und den anfragenden Provider (Zugriffsdaten) enthält und den Abruf dokumentiert. Diese Zugriffsdaten werden ausschließlich zum Zwecke der Sicherstellung eines störungsfreien Betriebs der Seite sowie der Verbesserung unseres Angebots ausgewertet. Dies dient der Wahrung unserer im Rahmen einer Interessensabwägung überwiegenden berechtigten Interessen an einer korrekten Darstellung unseres Angebots gemäß Art. 6 Abs. 1 S. 1 lit. f DSGVO.
          </p>
          
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">2. Datenverarbeitung zur Vertragsabwicklung und zur Kontaktaufnahme</h2>
          
          <h3 className="text-xl font-bold text-[#0A3A68] mb-2">2.1 Datenverarbeitung zur Vertragsabwicklung</h3>
          <p className="mb-6">
            Zum Zwecke der Vertragsabwicklung (inkl. Anfragen zu und Abwicklung von ggf. bestehenden Gewährleistungs- und Leistungsstörungsansprüchen sowie etwaiger gesetzlicher Aktualisierungspflichten) gemäß Art. 6 Abs. 1 S. 1 lit. b DSGVO erheben wir personenbezogene Daten, wenn Sie uns diese im Rahmen Ihrer Bestellung freiwillig mitteilen. Pflichtfelder werden als solche gekennzeichnet, da wir in diesen Fällen die Daten zwingend zur Vertragsabwicklung benötigen und wir ohne deren Angabe die Bestellung nicht versenden können. Welche Daten erhoben werden, ist aus den jeweiligen Eingabeformularen ersichtlich.
          </p>
          
          <h3 className="text-xl font-bold text-[#0A3A68] mb-2">2.2 Kundenkonto</h3>
          <p className="mb-6">
            Soweit Sie hierzu Ihre Einwilligung nach Art. 6 Abs. 1 S. 1 lit. a DSGVO erteilt haben, indem Sie sich für die Eröffnung eines Kundenkontos entscheiden, verwenden wir Ihre Daten zum Zwecke der Kundenkontoeröffnung sowie zur Speicherung Ihrer Daten für weitere zukünftige Bestellungen auf unserer Webseite. Die Löschung Ihres Kundenkontos ist jederzeit möglich und kann entweder durch eine Nachricht an die in dieser Datenschutzerklärung beschriebene Kontaktmöglichkeit oder über eine dafür vorgesehene Funktion im Kundenkonto erfolgen. Nach Löschung Ihres Kundenkontos werden Ihre Daten gelöscht, sofern Sie nicht ausdrücklich in eine weitere Nutzung Ihrer Daten gemäß Art. 6 Abs. 1 S. 1 lit. a DSGVO eingewilligt haben oder wir uns eine darüber hinausgehende Datenverwendung vorbehalten, die gesetzlich erlaubt ist und über die wir Sie in dieser Erklärung informieren.
          </p>
          
          <h3 className="text-xl font-bold text-[#0A3A68] mb-2">2.3 Kontaktaufnahme</h3>
          <p className="mb-6">
            Im Rahmen der Kundenkommunikation erheben wir zur Bearbeitung Ihrer Anfragen gemäß Art. 6 Abs. 1 S. 1 lit. b DSGVO personenbezogene Daten, wenn Sie uns diese bei einer Kontaktaufnahme mit uns (z.B. per Kontaktformular, Live-Chat-Tool oder E-Mail) freiwillig mitteilen. Pflichtfelder werden als solche gekennzeichnet, da wir in diesen Fällen die Daten zwingend zur Bearbeitung Ihrer Kontaktaufnahme benötigen. Welche Daten erhoben werden, ist aus den jeweiligen Eingabeformularen ersichtlich. Nach vollständiger Bearbeitung Ihrer Anfrage werden Ihre Daten gelöscht, sofern Sie nicht ausdrücklich in eine weitere Nutzung Ihrer Daten gemäß Art. 6 Abs. 1 S. 1 lit. a DSGVO eingewilligt haben oder wir uns eine darüber hinausgehende Datenverwendung vorbehalten, die gesetzlich erlaubt ist und über die wir Sie in dieser Erklärung informieren.
          </p>
          
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">3. Datenverarbeitung zum Zwecke der Versandabwicklung</h2>
          <p className="mb-6">
            Zur Vertragserfüllung gemäß Art. 6 Abs. 1 S. 1 lit. b DSGVO geben wir Ihre Daten an den mit der Lieferung beauftragten Versanddienstleister weiter, soweit dies zur Lieferung bestellter Waren erforderlich ist. Bei Fragen zu unseren Dienstleistern und der Grundlage unserer Zusammenarbeit mit ihnen wenden Sie sich bitte an die in dieser Datenschutzerklärung beschriebene Kontaktmöglichkeit.
          </p>
          
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">4. Datenverarbeitung zur Zahlungsabwicklung</h2>
          <p className="mb-6">
            Bei der Abwicklung von Zahlungen in unserem Online-Shop arbeiten wir mit diesen Partnern zusammen: technische Dienstleister, Kreditinstitute, Zahlungsdienstleister.
          </p>
          
          <h3 className="text-xl font-bold text-[#0A3A68] mb-2">4.1 Datenverarbeitung zur Transaktionsabwicklung</h3>
          <p className="mb-6">
            Je nach ausgewählter Zahlungsart geben wir die für die Abwicklung der Zahlungstransaktion notwendigen Daten an unsere technischen Dienstleister, die im Rahmen einer Auftragsverarbeitung für uns tätig sind, oder an die beauftragten Kreditinstitute oder an den ausgewählten Zahlungsdienstleister weiter, soweit dies zur Abwicklung der Zahlung erforderlich ist. Dies dient der Vertragserfüllung gemäß Art. 6 Abs. 1 S. 1 lit. b DSGVO. Zum Teil erheben die Zahlungsdienstleister die für die Abwicklung der Zahlung erforderlichen Daten selbst, z.B. auf ihrer eigenen Webseite oder über eine technische Einbindung im Bestellprozess. Es gilt insoweit die Datenschutzerklärung des jeweiligen Zahlungsdienstleisters.
          </p>
          
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">5. Cookies und weitere Technologien</h2>
          <h3 className="text-xl font-bold text-[#0A3A68] mb-2">5.1 Allgemeine Informationen</h3>
          <p className="mb-6">
            Um den Besuch unserer Webseite attraktiv zu gestalten und die Nutzung bestimmter Funktionen zu ermöglichen, verwenden wir auf verschiedenen Seiten Technologien einschließlich sogenannter Cookies. Cookies sind kleine Textdateien, die automatisch auf Ihrem Endgerät gespeichert werden. Einige der von uns verwendeten Cookies werden nach Ende der Browser-Sitzung, also nach Schließen Ihres Browsers, wieder gelöscht (sog. Sitzungs-Cookies). Andere Cookies verbleiben auf Ihrem Endgerät und ermöglichen uns, Ihren Browser beim nächsten Besuch wiederzuerkennen (persistente Cookies).
          </p>
          
          <h3 className="text-xl font-bold text-[#0A3A68] mb-2">5.2 Einsatz des Wix Consent Manager Tool zur Verwaltung von Einwilligungen</h3>
          <p className="mb-6">
            Auf unserer Webseite setzen wir das Wix Consent Manager Tool ein, um Sie über die Cookies und die anderen Technologien zu informieren, die wir auf unserer Webseite verwenden, sowie Ihre gegebenenfalls erforderliche Einwilligung in die Verarbeitung Ihrer personenbezogenen Daten durch diese Technologien einzuholen, zu verwalten und zu dokumentieren. Dies ist gemäß Art. 6 Abs. 1 S. 1 lit. c DSGVO zur Erfüllung unserer rechtlichen Verpflichtung gemäß Art. 7 Abs. 1 DSGVO erforderlich, Ihre Einwilligung in die Verarbeitung Ihrer personenbezogenen Daten nachweisen zu können, der wir unterliegen.
          </p>
          
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">6. Ihre Rechte</h2>
          <p className="mb-6">
            Sie haben das Recht, jederzeit Auskunft über die zu Ihrer Person gespeicherten Daten zu verlangen. Zusätzlich haben Sie das Recht auf Berichtigung unrichtiger Daten, Einschränkung der Verarbeitung und Löschung Ihrer personenbezogenen Daten, sofern dem keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
          </p>
          <p className="mb-6">
            Für Anfragen dieser Art wenden Sie sich bitte an datenschutz@babixgo.de. Wir werden Ihre Anfrage umgehend bearbeiten und Ihnen gemäß den gesetzlichen Bestimmungen Auskunft erteilen.
          </p>
          <p className="mb-6">
            Sie haben darüber hinaus das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten nicht rechtmäßig erfolgt.
          </p>
          
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">7. Änderungen der Datenschutzerklärung</h2>
          <p className="mb-6">
            Wir behalten uns vor, diese Datenschutzerklärung gelegentlich anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Dienstleistungen in der Datenschutzerklärung umzusetzen, z.B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}