// Meta-Tag Konfigurationen für SEO-Optimierung
interface PageMeta {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

// Standard-Meta-Tags, wenn keine spezifischen gefunden werden
export const DEFAULT_META: PageMeta = {
  title: 'babixGO | Erfolgreicher im Monopoly Go Spiel mit unserer Hilfe',
  description: 'babixGO bietet professionelle Hilfe für Monopoly Go Spieler. Würfelboost, Sticker, Partnerevents und Tycoon Racers Support zu fairen Preisen.',
  keywords: 'Monopoly Go, babixGO, Würfel, Sticker, Partnerevents, Tycoon Racers, Spielhilfe',
  ogTitle: 'babixGO | Dein Partner für Erfolg bei Monopoly Go',
  ogDescription: 'Steigere dein Spielerlebnis mit professionellem Support für alle Bereiche von Monopoly Go - von Würfelboost bis Tycoon Racers.',
  ogImage: '/images/babixgo-share.jpg'
};

// Spezifische Meta-Tags pro Seite
export const PAGE_META: Record<string, PageMeta> = {
  home: {
    title: 'babixGO | Willkommen bei deinem Monopoly Go Spiel-Partner',
    description: 'babixGO ist dein vertrauenswürdiger Partner für alle Monopoly Go Bedürfnisse. Wir bieten Würfelboost, Sticker-Hilfe, Partnerevents und Tycoon Racers Support.',
    keywords: 'Monopoly Go, babixGO, Würfelboost, Sticker, Partnerevents, Tycoon Racers, Spielunterstützung',
    ogTitle: 'babixGO | Dein Partner für Monopoly Go',
    ogDescription: 'Entdecke unsere vielfältigen Services für dein optimales Monopoly Go Spielerlebnis - fair und zuverlässig.',
    ogImage: '/images/babixgo-home-share.jpg'
  },
  
  wuerfel: {
    title: 'Würfelboost | Mehr Würfel für dein Monopoly Go | babixGO',
    description: 'Erhöhe deine Würfelzahl in Monopoly Go mit unserem Würfelboost Service. 25.000 bis 45.000 Würfel zu fairen Preisen für mehr Spielspaß.',
    keywords: 'Monopoly Go Würfel, Würfelboost, Monopoly Go Würfel kaufen, Monopoly Würfel erhöhen',
    ogTitle: 'Erhöhe deine Würfelzahl in Monopoly Go',
    ogDescription: 'Mehr Würfel bedeuten mehr Spielspaß! Profitiere von unseren Würfelboost-Angeboten für Monopoly Go.',
    ogImage: '/images/wuerfelboost-share.jpg'
  },
  
  sticker: {
    title: 'Sticker für Monopoly Go | Vervollständige dein Album | babixGO',
    description: 'Vervollständige deine Sticker-Sammlungen in Monopoly Go mit unserem Sticker-Service. Alle Seltenheiten zu fairen Preisen, Gold-Sticker verfügbar.',
    keywords: 'Monopoly Go Sticker, Sticker kaufen, Gold Sticker, Monopoly Go Album vervollständigen',
    ogTitle: 'Fehlende Sticker für dein Monopoly Go Album',
    ogDescription: 'Vervollständige deine Sammlung und erhalte alle Belohnungen mit unserem Sticker-Service für Monopoly Go.',
    ogImage: '/images/sticker-share.jpg'
  },
  
  partner: {
    title: 'Partnerevents in Monopoly Go | Zuverlässige Partner | babixGO',
    description: 'Finde zuverlässige Partner für deine Monopoly Go Partnerevents oder lass uns Eventwährung für dich sammeln. Maximiere deine Belohnungen!',
    keywords: 'Monopoly Go Partnerevent, Eventwährung, Partner finden, Monopoly Go Belohnungen',
    ogTitle: 'Partnerevents in Monopoly Go leicht gemacht',
    ogDescription: 'Mit unseren zuverlässigen Partnern oder Eventwährung-Service holst du das Maximum aus deinen Partnerevents.',
    ogImage: '/images/partnerevent-share.jpg'
  },
  
  tycoonracers: {
    title: 'Tycoon Racers Support | Flaggen und Teamplätze | babixGO',
    description: 'Maximiere deine Erfolge bei Tycoon Racers in Monopoly Go. Teamplätze und Flaggen-Sammlung zu günstigen Preisen für mehr Belohnungen.',
    keywords: 'Monopoly Go Tycoon Racers, Race Events, Flaggen sammeln, Teamplätze kaufen',
    ogTitle: 'Mehr Erfolg bei Monopoly Go Tycoon Racers',
    ogDescription: 'Sichere dir alle Rundenbelohnungen in den Tycoon Racers mit unseren Teamplätzen und Flaggen-Services.',
    ogImage: '/images/tycoonracers-share.jpg'
  },

  preise: {
    title: 'Preisübersicht | Transparente Preise für alle Services | babixGO',
    description: 'Überblick über alle Preise für unsere Monopoly Go Services: Würfelboost, Sticker, Partnerevents und Tycoon Racers - transparent und fair kalkuliert.',
    keywords: 'Monopoly Go Preise, babixGO Kosten, Würfelboost Preise, Sticker Kosten, Partnerevents Preise',
    ogTitle: 'Transparente Preise für alle Monopoly Go Services',
    ogDescription: 'Alle Preise auf einen Blick für unsere Services rund um Monopoly Go - fair und nachvollziehbar.',
    ogImage: '/images/preise-share.jpg'
  },
  
  news: {
    title: 'Neuigkeiten zu Monopoly Go und babixGO | News & Updates',
    description: 'Bleibe auf dem Laufenden mit den neuesten Entwicklungen zu Monopoly Go und unseren Services. Neue Eventformate, Sonderaktionen und mehr.',
    keywords: 'Monopoly Go News, babixGO Updates, neue Events, Sonderaktionen, Spielupdates',
    ogTitle: 'Aktuelle News zu Monopoly Go und babixGO',
    ogDescription: 'Erfahre als Erstes von neuen Entwicklungen, Sonderaktionen und Updates rund um Monopoly Go und unsere Services.',
    ogImage: '/images/news-share.jpg'
  },

  kontakt: {
    title: 'Kontakt | Erreiche das babixGO Team | Schnelle Hilfe',
    description: 'Kontaktiere unser Team bei Fragen zu unseren Monopoly Go Services. Wir sind per WhatsApp, Facebook Messenger und E-Mail für dich erreichbar.',
    keywords: 'babixGO Kontakt, Hilfe Monopoly Go, Support kontaktieren, Fragen zu Services',
    ogTitle: 'Kontaktiere das babixGO Team',
    ogDescription: 'Schnelle und unkomplizierte Hilfe bei allen Fragen zu unseren Monopoly Go Services und Angeboten.',
    ogImage: '/images/kontakt-share.jpg'
  }
};

/**
 * Gibt die Meta-Tag-Informationen für eine bestimmte Seite zurück
 * @param pageName Der Name der Seite
 * @returns Meta-Tag-Informationen
 */
export function getMetaForPage(pageName: string): PageMeta {
  return PAGE_META[pageName] || DEFAULT_META;
}