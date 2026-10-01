import { Locale } from '@/i18n'

export type SiteConfig = {
  name: string
  description: string
  mainNav: { title: string; href: string }[]
  footerNav: { title: string; href: string }[]
  links: {
    instagram: string
    facebook: string
    linkedin: string
  }
  location: string
  follow: string
  footer: {
    drink_responsibly: string
    rights: string
  }
  menu: string
  close: string
  brewed: string
  backed: string
  built: string
  banner_description: string
  button_banner: string
  placeholder: string
  submit: string
  request: string
  restrictions: {
    welcome: string
    check: string
    yes: string
    no: string
    read: string
    more: string
  }
}

const siteConfigBase: Record<Locale, SiteConfig> = {
  en: {
    name: 'Skinny Cans',
    description: 'A new era of alcohol — clean, conscious, and crafted.',
    mainNav: [
      {
        title: 'Home',
        href: '/',
      },
      {
        title: 'Products',
        href: '/product',
      },
      {
        title: 'The Story',
        href: '/story',
      },
      {
        title: 'science',
        href: '/bbs',
      },
      {
        title: 'Partner',
        href: '/partner',
      },
    ],
    footerNav: [
      {
        title: 'Home',
        href: '/',
      },
      {
        title: 'Products',
        href: '/product',
      },
      {
        title: 'The Story',
        href: '/story',
      },
      {
        title: 'science ',
        href: '/bbs',
      },
      {
        title: 'Partner',
        href: '/partner',
      },
      {
        title: 'Contact',
        href: '/waitlist',
      },
    ],
    links: {
      linkedin: 'https://www.linkedin.com/company/skinny-cans/',
      instagram:
        'https://www.instagram.com/skinnycans?igsh=MXEzbHVpdDF5bjZ3OQ==',
      facebook: 'https://www.facebook.com/share/172vTfzsHx/?mibextid=wwXIfr',
    },
    location: 'Store locator',
    footer: {
      drink_responsibly: 'PLEASE DRINK RESPONSIBLY.',
      rights: 'All rights reserved',
    },
    follow: 'Follow us',
    menu: 'menu',
    close: 'close',
    brewed: `Brewed\nby hand`,
    backed: 'GUIDED by\nscience',
    built: 'Built for a\nsmarter lifestyle',
    banner_description: 'Designed for the way we live Tomorrow',
    button_banner: 'Read the Full Story',
    placeholder: 'Enter your email',
    submit: 'submit',
    request: 'submit a request',
    restrictions: {
      welcome: 'Welcome!',
      check: 'Just checking, you are over 21?',
      yes: 'Yes, I’m over 21 years old',
      no: 'No, I’m under 21 years old',
      read: 'Also, this site uses cookies to give you the best possible experience. By proceedind to the site you agree to cookies being used. Read more about cookies',
      more: 'here',
    },
  },
  no: {
    name: 'Tynne bokser',
    description: 'En ny æra med alkohol – ren, bevisst og håndlaget.',
    mainNav: [
      {
        title: 'hjem',
        href: '/',
      },
      {
        title: 'produkt',
        href: '/product',
      },
      {
        title: 'historien',
        href: '/story',
      },
      {
        title: 'Smartere drikking',
        href: '/bbs',
      },
      {
        title: 'Partner',
        href: '/partner',
      },
    ],
    footerNav: [
      {
        title: 'Hjem',
        href: '/',
      },
      {
        title: 'Produkter',
        href: '/product',
      },
      {
        title: 'Historien',
        href: '/story',
      },
      {
        title: 'Smartere drikking',
        href: '/bbs',
      },
      {
        title: 'Partner',
        href: '/partner',
      },
      {
        title: 'Kontakt',
        href: '/waitlist',
      },
    ],
    links: {
      linkedin: 'https://www.linkedin.com/company/skinny-cans/',
      instagram:
        'https://www.instagram.com/skinnycans?igsh=MXEzbHVpdDF5bjZ3OQ==',
      facebook: 'https://www.facebook.com/share/172vTfzsHx/?mibextid=wwXIfr',
    },
    location: 'Butikksøker',
    footer: {
      drink_responsibly: 'Vennligst drikk ansvarlig.',
      rights: 'Alle rettigheter forbeholdt.',
    },
    follow: 'Følg oss',
    menu: 'meny',
    close: 'lukk',
    brewed: 'Håndbrygget',
    backed: 'Støttet av\n vitenskapen',
    built: 'Bygget for \nhelse',
    banner_description: 'Skinny er her for å forandre drikking for godt.',
    button_banner: 'Les hele historien',
    placeholder: 'Skriv inn e-postadressen din',
    submit: 'sende inn',
    request: 'sende inn en forespørsel',
    restrictions: {
      welcome: 'Velkommen!',
      check: 'Bare sjekker, er du over 21?',
      yes: 'Ja, jeg er over 21 år gammel',
      no: 'Nei, jeg er under 21 år gammel',
      read: 'Dette nettstedet bruker også informasjonskapsler for å gi deg best mulig opplevelse. Ved å gå videre til nettstedet godtar du bruk av informasjonskapsler. Les mer om informasjonskapsler',
      more: 'her',
    },
  },
  se: {
    name: 'Skinny Cans',
    description: 'Ođđa áigodat alkoholas — buhtis, diđolaš ja hábmejuvvon.',
    mainNav: [
      {
        title: 'ruoktu',
        href: '/',
      },
      {
        title: 'buvtta',
        href: '/product',
      },
      {
        title: 'muitalus',
        href: '/story',
      },
      {
        title: 'Čeahpibut juhkan',
        href: '/bbs',
      },
      {
        title: 'guoibmi',
        href: '/partner',
      },
    ],
    footerNav: [
      {
        title: 'Ruovttus',
        href: '/',
      },
      {
        title: 'Buvttat',
        href: '/product',
      },
      {
        title: 'Muitalus',
        href: '/story',
      },
      {
        title: 'Čeahpibut juhkan',
        href: '/bbs',
      },
      {
        title: 'Ovttasbargoguoibmi',
        href: '/partner',
      },
      {
        title: 'Oktavuohta',
        href: '/waitlist',
      },
    ],
    links: {
      linkedin: 'https://www.linkedin.com/company/skinny-cans/',
      instagram:
        'https://www.instagram.com/skinnycans?igsh=MXEzbHVpdDF5bjZ3OQ==',
      facebook: 'https://www.facebook.com/share/172vTfzsHx/?mibextid=wwXIfr',
    },
    location: 'Gávpi gávdnan',
    footer: {
      drink_responsibly: 'JUOGA OVDDASVÁSTÁDUSLAČČAT.',
      rights: 'uot vuoigatvuođat leat suddjejuvvon',
    },
    follow: 'Čuovo min',
    menu: 'meny',
    close: 'lahka',
    brewed: 'Gieđain \nráhkaduvvon',
    backed: 'Dieđalaš \ndoarjja',
    built: 'Huksejuvvon \ndearvvašvuođa várás',
    banner_description: 'Skinny lea dáppe rievdadeamen juhkanvuođa buorrin.',
    button_banner: 'Loga olles muitalusa',
    placeholder: 'Čále iežat e-poastta',
    submit: 'guođđit',
    request: 'sáddet jearaldaga',
    restrictions: {
      welcome: 'Bures boahtin!',
      check: 'Dárkkistan dušše, leat go badjel 21 jagi?',
      yes: 'Juo, mun lean badjel 21 jagi boaris',
      no: 'Ii, mun lean vuollel 21 jagi boaris',
      read: 'Dát siidu geavaha maid cookies vai oaččut buoremus vejolaš vásáhusa. Go joatkkát siidui, de dohkkehat ahte cookies geavahuvvojit. Loga eanet gáhkuid birra',
      more: 'dáppe',
    },
  },
}

export function getSiteConfig(locale: Locale): SiteConfig {
  return siteConfigBase[locale] || siteConfigBase.en
}
