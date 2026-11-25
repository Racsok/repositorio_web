// src/i18n/ui.ts
export const languages = {
  es: 'Español',
  en: 'English',
};

export const defaultLang = 'es';

export const ui = {
  es: {
    'nav.projects': 'Proyectos',
    'nav.about': 'Sobre mí',
    'nav.contact': 'Contacto',
    'hero.title': 'Ingeniero de Datos y Desarrollador de Software',
    'hero.subtitle': 'Construyendo sistemas robustos, automatizaciones y arquitecturas limpias.',
    'cv.download': 'Descargar CV',
  },
  en: {
    'nav.projects': 'Projects',
    'nav.about': 'About Me',
    'nav.contact': 'Contact',
    'hero.title': 'Data & Software developer',
    'hero.subtitle': 'Building robust systems, automations, and clean architectures.',
    'cv.download': 'Download CV',
  },
} as const;
