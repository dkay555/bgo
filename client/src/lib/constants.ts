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
  { name: 'Start', href: '/' },
  { 
    name: 'Leistungen', 
    href: '/produkte',
    isDropdown: true,
    dropdownItems: [
      { name: 'Würfel', href: '/produkte/wuerfel#top', icon: 'casino' },
      { name: 'Sticker', href: '/produkte/sticker#top', icon: 'collections_bookmark' },
      { name: 'Partnerevent', href: '/produkte/partner#top', icon: 'people' },
      { name: 'Race', href: '/produkte/race#top', icon: 'emoji_events' },
    ]
  },
  { 
    name: 'Hilfe',
    href: '/hilfe', 
    isDropdown: true,
    dropdownItems: [
      { name: 'Würfel Hilfe', href: '/hilfe/wuerfel#top' },
      { name: 'Sticker Hilfe', href: '/hilfe/sticker#top' },
      { name: 'Partnerevent Hilfe', href: '/hilfe/partner#top' },
      { name: 'Race Hilfe', href: '/hilfe/race#top' },
    ]
  },
  { name: 'Kontakt', href: '/kontakt' },
];

// Footer links
export const FOOTER_LINKS = [
  { name: 'Impressum', href: '/impressum#top' },
  { name: 'Datenschutz', href: '/datenschutz#top' },
  { name: 'AGB', href: '/agb#top' },
  { name: 'Kontakt', href: '/kontakt#top' },
  { name: 'Hilfe', href: '/hilfe#top' },
];

// Produkt-Kategorien
export const PRODUCT_CATEGORIES = [
  { 
    name: 'Würfelboost', 
    path: '/produkte/wuerfel#top',
    icon: 'casino',
    image: 'kategorie_wuerfel_300_300.webp',
    description: 'Erhöhen Sie Ihre Würfelzahl im Spiel'
  },
  { 
    name: 'Sticker', 
    path: '/produkte/sticker#top',
    icon: 'collections_bookmark',
    image: 'kategorie_sticker_300_300.webp',
    description: 'Vervollständigen Sie Ihre Sammlungen'
  },
  { 
    name: 'Partner', 
    path: '/produkte/partner#top',
    icon: 'people',
    image: 'kategorie_partner_300_300.webp',
    description: 'Finden Sie aktive Spielpartner'
  },
  { 
    name: 'Race', 
    path: '/produkte/race#top',
    icon: 'emoji_events',
    image: 'kategorie_racers_200_300.webp',
    description: 'Unterstützung bei Events'
  }
];
