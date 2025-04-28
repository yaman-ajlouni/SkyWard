import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import heroEN from '../locales/en/hero.json';
import heroAR from '../locales/ar/hero.json';
import navbarEN from '../locales/en/navbar.json';
import navbarAR from '../locales/ar/navbar.json';
import exploreSyriaEN from '../locales/en/explore.json';
import exploreSyriaAR from '../locales/ar/explore.json';
import topDestinationsEN from '../locales/en/topDestinations.json';
import topDestinationsAR from '../locales/ar/topDestinations.json';
import bookAdventureEN from '../locales/en/bookAdventure.json';
import bookAdventureAR from '../locales/ar/bookAdventure.json';
import newsletterEN from '../locales/en/newsletter.json';
import newsletterAR from '../locales/ar/newsletter.json';
import highlightEN from '../locales/en/highlight.json';
import highlightAR from '../locales/ar/highlight.json';
import footerEN from '../locales/en/footer.json';
import footerAR from '../locales/ar/footer.json';

// the translations
const resources = {
    en: {
        translation: {
            ...heroEN,
            ...navbarEN,
            ...exploreSyriaEN,
            ...topDestinationsEN,
            ...bookAdventureEN,
            ...newsletterEN,
            ...highlightEN,
            ...footerEN,
        }
    },
    ar: {
        translation: {
            ...heroAR,
            ...navbarAR,
            ...exploreSyriaAR,
            ...topDestinationsAR,
            ...bookAdventureAR,
            ...newsletterAR,
            ...highlightAR,
            ...footerAR,
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: localStorage.getItem('language') || 'en', // default language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // react already safes from xss
        },
        react: {
            useSuspense: false
        }
    });

export default i18n;