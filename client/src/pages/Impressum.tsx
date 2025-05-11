import { useEffect } from 'react';

export default function Impressum() {
  useEffect(() => {
    document.title = 'Impressum | babixGO';
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="babix-info-header text-3xl md:text-4xl font-bold mb-8 text-center">Impressum</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#0A3A68] mb-4">Angaben gemäß § 5 TMG</h2>
        
        <div className="mb-6">
          <p className="mb-1">BabixGO UG (haftungsbeschränkt)</p>
          <p className="mb-1">Musterstraße 123</p>
          <p className="mb-1">12345 Musterstadt</p>
          <p className="mb-1">Deutschland</p>
        </div>
        
        <h3 className="text-xl font-bold text-[#0A3A68] mb-2">Vertreten durch</h3>
        <p className="mb-6">Max Mustermann, Geschäftsführer</p>
        
        <h3 className="text-xl font-bold text-[#0A3A68] mb-2">Kontakt</h3>
        <div className="mb-6">
          <p className="mb-1">Telefon: +49 123 456789</p>
          <p className="mb-1">E-Mail: info@babixgo.de</p>
        </div>
        
        <h3 className="text-xl font-bold text-[#0A3A68] mb-2">Registereintrag</h3>
        <div className="mb-6">
          <p className="mb-1">Eintragung im Handelsregister</p>
          <p className="mb-1">Registergericht: Amtsgericht Musterstadt</p>
          <p className="mb-1">Registernummer: HRB 12345</p>
        </div>
        
        <h3 className="text-xl font-bold text-[#0A3A68] mb-2">Umsatzsteuer-ID</h3>
        <div className="mb-6">
          <p className="mb-1">Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
          <p className="mb-1">DE123456789</p>
        </div>
        
        <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">Redaktionell verantwortlich</h2>
        <div className="mb-6">
          <p className="mb-1">Max Mustermann</p>
          <p className="mb-1">Musterstraße 123</p>
          <p className="mb-1">12345 Musterstadt</p>
        </div>
        
        <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">EU-Streitschlichtung</h2>
        <p className="mb-6">
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
          <a href="https://ec.europa.eu/consumers/odr/" className="text-[#00CFFF] hover:text-[#FF4C00] transition-colors ml-1">
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>
        
        <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
        <p className="mb-6">
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
        
        <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">Haftung für Inhalte</h2>
        <p className="mb-6">
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>
        <p className="mb-6">
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
        </p>
        
        <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">Haftung für Links</h2>
        <p className="mb-6">
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
        </p>
        <p className="mb-6">
          Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
        </p>
        
        <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">Urheberrecht</h2>
        <p className="mb-6">
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
        </p>
        <p className="mb-6">
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
        </p>
      </div>
    </div>
  );
}