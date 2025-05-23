// Brand colors
export const COLORS = {
  cyan: '#00CFFF',
  darkblue: '#0A3A68',
  orange: '#FF4C00',
  orangeHover: '#cc3b00',
  lightgray: '#f0f0f0',
  white: '#ffffff',
  green: '#25D366',
  facebook: '#1877F2',
};

// Contact information
export const CONTACT = {
  whatsapp: 'https://wa.me/4915223842897',
  facebook: 'https://m.me/babixgo',
  email: 'mailto:support@babixgo.de',
};

// Price packages
export const PRICES = [
  {
    dice: 25000,
    price: 25,
    highlight: false,
  },
  {
    dice: 35000,
    price: 35,
    highlight: false,
  },
  {
    dice: 45000,
    price: 45,
    highlight: false,
  },
];

// Special offer
export const SPECIAL_OFFER = {
  dice: '40.000–50.000',
  price: 30,
  condition: '(während „Lucky Chance" oder „Dice Roll", nach Absprache)',
};

// Navigation links
export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { 
    name: 'Shop', 
    href: '/shop',
    isDropdown: true,
    dropdownItems: [
      { name: 'Würfel', href: '/shop/wuerfel', icon: 'casino' },
      { name: 'Sticker', href: '/shop/sticker', icon: 'collections_bookmark' },
      { name: 'Partnerevent', href: '/shop/partnerevent', icon: 'people' },
      { name: 'Tycoon Racers', href: '/shop/tycoonracers', icon: 'emoji_events' },
    ]
  },
  { name: 'News', href: '/news' },
  { 
    name: 'Hilfe',
    href: '/hilfe', 
    isDropdown: true,
    dropdownItems: [
      { name: 'Würfel Hilfe', href: '/hilfe/wuerfel' },
      { name: 'Sticker Hilfe', href: '/hilfe/sticker' },
      { name: 'Partnerevents Hilfe', href: '/hilfe/partner' },
      { name: 'Tycoon Racers & Flaggen Hilfe', href: '/hilfe/race' },
      { name: 'Auth Token Tool', href: '/tools/authtoken', icon: 'key' },
    ]
  },
  { name: 'Kontakt', href: '/kontakt' },
  { name: 'Login', href: '/auth' },
];

// Footer links
export const FOOTER_LINKS = [
  { name: 'Impressum', href: '/impressum' },
  { name: 'Datenschutz', href: '/datenschutz' },
  { name: 'AGB', href: '/agb' },
  { name: 'Widerruf', href: '/widerruf' },
  { name: 'Sitemap', href: '/sitemap' },
];

// Shop-Kategorien
export const PRODUCT_CATEGORIES = [
  { 
    name: 'Würfelboost', 
    path: '/shop/wuerfel',
    icon: 'casino',
    image: 'kategorie_wuerfel_300_300.webp',
    description: 'Erhöhen Sie Ihre Würfelzahl im Spiel'
  },
  { 
    name: 'Sticker', 
    path: '/shop/sticker',
    icon: 'collections_bookmark',
    image: 'kategorie_sticker_300_300.webp',
    description: 'Vervollständigen Sie Ihre Sammlungen'
  },
  { 
    name: 'Partnerevents', 
    path: '/shop/partnerevent',
    icon: 'people',
    image: 'kategorie_partner_300_300.webp',
    description: 'Finden Sie aktive Spielpartner'
  },
  { 
    name: 'Tycoon Racers', 
    path: '/shop/tycoonracers',
    icon: 'emoji_events',
    image: 'kategorie_racers_200_300.webp',
    description: 'Unterstützung bei Events'
  }
];

export const PAYMENT_STEPS = [
  { title: "Produktauswahl", description: "Wählen Sie Ihr gewünschtes Produkt aus" },
  { title: "Bezahlung", description: "Bezahlen Sie sicher mit PayPal" },
  { title: "Lieferung", description: "Erhalten Sie Ihre Würfel innerhalb von 10-30 Minuten nach Zahlung" },
];