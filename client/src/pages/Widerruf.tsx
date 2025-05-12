import { useEffect } from 'react';
import { MainLayout } from "@/layouts/MainLayout";

export default function Widerruf() {
  useEffect(() => {
    document.title = 'Widerrufsbelehrung | babixGO';
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl" id="top">
        <h1 className="babix-info-header text-3xl md:text-4xl font-bold mb-8 text-center">Widerrufsbelehrung</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <p className="mb-6 text-sm text-gray-600">Stand: Mai 2025</p>
          
          <p className="mb-6">
            Verbraucher haben ein vierzehntägiges Widerrufsrecht.
          </p>
          
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4">Widerrufsrecht</h2>
          <p className="mb-6">
            Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.
          </p>
          <p className="mb-6">
            Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Dennis Kemper, Kaiserstaße 26, 58706 Menden, DE, widerruf@babixgo.de, Telefon: 015734509031) mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
          </p>
          <p className="mb-6">
            Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
          </p>
          
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">Folgen des Widerrufs</h2>
          <p className="mb-6">
            Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
          </p>
          <p className="mb-6">
            Haben Sie verlangt, dass die Dienstleistungen während der Widerrufsfrist beginnen soll, so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns von der Ausübung des Widerrufsrechts hinsichtlich dieses Vertrags unterrichten, bereits erbrachten Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.
          </p>
          <p className="mb-6">
            Für einen Vertrag über die Erbringung von Dienstleistungen, der Sie zur Zahlung eines Preises verpflichtet, gilt: Das Widerrufsrecht erlischt (vorzeitig) auch mit der vollständigen Erbringung der Dienstleistung, wenn Sie vor Beginn der Erbringung ausdrücklich zugestimmt haben, dass wir mit der Erbringung der Dienstleistung vor Ablauf der Widerrufsfrist beginnen und Ihre Kenntnis davon bestätigt haben, dass Ihr Widerrufsrecht mit vollständiger Vertragserfüllung durch uns erlischt.
          </p>
          
          <div className="border border-gray-300 p-4 rounded-md my-8">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-4">Muster-Widerrufsformular</h3>
            <p className="italic mb-4">
              (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)
            </p>
            <div className="pl-4 border-l-4 border-[#00CFFF]">
              <p className="mb-2">
                – An Dennis Kemper, Kaiserstaße 26, 58706 Menden, DE, widerruf@babixgo.de
              </p>
              <p className="mb-2">
                – Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden<br/> Waren (*)/die Erbringung der folgenden Dienstleistung (*)
              </p>
              <p className="mb-2">
                – Bestellt am (*)/erhalten am (*)
              </p>
              <p className="mb-2">
                – Name des/der Verbraucher(s)
              </p>
              <p className="mb-2">
                – Anschrift des/der Verbraucher(s)
              </p>
              <p className="mb-2">
                – Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)
              </p>
              <p className="mb-2">
                – Datum
              </p>
              <p className="italic mb-2">
                (*) Unzutreffendes streichen.
              </p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 mt-8">Besondere Hinweise</h2>
          <p className="mb-6">
            Wenn Sie diesen Vertrag durch ein Darlehen finanzieren und ihn später widerrufen, sind sie auch an den Darlehensvertrag nicht mehr gebunden, sofern beide Verträge eine wirtschaftliche Einheit bilden. Dies ist insbesondere dann anzunehmen, wenn wir gleichzeitig Ihr Darlehensgeber sind oder wenn sich Ihr Darlehensgeber im Hinblick auf die Finanzierung unserer Mitwirkung bedient. Wenn uns das Darlehen bei Wirksamwerden des Widerrufs bereits zugeflossen ist, tritt Ihr Darlehensgeber im Verhältnis zu Ihnen hinsichtlich der Rechtsfolgen des Widerrufs oder der Rückgabe in unsere Rechte und Pflichten aus dem finanzierten Vertrag ein. Letzteres gilt nicht, wenn der vorliegende Vertrag den Erwerb von Finanzinstrumenten (z.B. von Wertpapieren, Devisen oder Derivaten) zum Gegenstand hat.
          </p>
          <p className="mb-6">
            Wollen Sie eine vertragliche Bindung so weitgehend wie möglich vermeiden, machen Sie von Ihrem Widerrufsrecht Gebrauch und widerrufen Sie zudem den Darlehensvertrag, wenn Ihnen auch dafür ein Widerrufsrecht zusteht.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}