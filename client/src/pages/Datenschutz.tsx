import { useEffect } from 'react';

export default function Datenschutz() {
  useEffect(() => {
    document.title = 'Datenschutz | babixGO';
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="babix-info-header text-3xl md:text-4xl font-bold mb-8 text-center">Datenschutzerklärung</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#0A3A68] mb-4">1. Datenschutz auf einen Blick</h2>
        
        <h3 className="text-xl font-bold text-[#0A3A68] mb-2">Allgemeine Hinweise</h3>
        <p className="mb-6">
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
        </p>
        
        <h3 className="text-xl font-bold text-[#0A3A68] mb-2">Datenerfassung auf unserer Website</h3>
        <p className="mb-4">
          <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
        </p>
        <p className="mb-6">
          Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
        </p>
        
        <p className="mb-4">
          <strong>Wie erfassen wir Ihre Daten?</strong>
        </p>
        <p className="mb-6">
          Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
        </p>
        <p className="mb-6">
          Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie unsere Website betreten.
        </p>
        
        <p className="mb-4">
          <strong>Wofür nutzen wir Ihre Daten?</strong>
        </p>
        <p className="mb-6">
          Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
        </p>
        
        <p className="mb-4">
          <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong>
        </p>
        <p className="mb-6">
          Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
        </p>
        
        <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">2. Allgemeine Hinweise und Pflichtinformationen</h2>
        
        <h3 className="text-xl font-bold text-[#0A3A68] mb-2">Datenschutz</h3>
        <p className="mb-6">
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
        </p>
        <p className="mb-6">
          Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
        </p>
        <p className="mb-6">
          Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
        </p>
        
        <h3 className="text-xl font-bold text-[#0A3A68] mb-2">Hinweis zur verantwortlichen Stelle</h3>
        <p className="mb-6">
          Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
        </p>
        <div className="mb-6">
          <p className="mb-1">BabixGO UG (haftungsbeschränkt)</p>
          <p className="mb-1">Musterstraße 123</p>
          <p className="mb-1">12345 Musterstadt</p>
          <p className="mb-1">Deutschland</p>
          <p className="mb-1">Telefon: +49 123 456789</p>
          <p className="mb-1">E-Mail: info@babixgo.de</p>
        </div>
        <p className="mb-6">
          Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
        </p>
        
        <h3 className="text-xl font-bold text-[#0A3A68] mb-2">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
        <p className="mb-6">
          Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
        </p>
        
        <h3 className="text-xl font-bold text-[#0A3A68] mb-2">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
        <p className="mb-6">
          Im Falle datenschutzrechtlicher Verstöße steht dem Betroffenen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Zuständige Aufsichtsbehörde in datenschutzrechtlichen Fragen ist der Landesdatenschutzbeauftragte des Bundeslandes, in dem unser Unternehmen seinen Sitz hat.
        </p>
        
        <h3 className="text-xl font-bold text-[#0A3A68] mb-2">Recht auf Datenübertragbarkeit</h3>
        <p className="mb-6">
          Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
        </p>
        
        <h3 className="text-xl font-bold text-[#0A3A68] mb-2">SSL- bzw. TLS-Verschlüsselung</h3>
        <p className="mb-6">
          Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL-bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
        </p>
        <p className="mb-6">
          Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
        </p>
        
        <h3 className="text-xl font-bold text-[#0A3A68] mb-2">Auskunft, Sperrung, Löschung</h3>
        <p className="mb-6">
          Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.
        </p>
        
        <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">3. Datenschutzbeauftragter</h2>
        <p className="mb-6">
          Wir haben einen Datenschutzbeauftragten bestellt.
        </p>
        <div className="mb-6">
          <p className="mb-1">Max Datenschutz</p>
          <p className="mb-1">Musterstraße 123</p>
          <p className="mb-1">12345 Musterstadt</p>
          <p className="mb-1">Deutschland</p>
          <p className="mb-1">Telefon: +49 123 456789</p>
          <p className="mb-1">E-Mail: datenschutz@babixgo.de</p>
        </div>
      </div>
    </div>
  );
}