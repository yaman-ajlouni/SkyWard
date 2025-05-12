import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import heroEN from '../locales/en/landingPage/hero.json';
import heroAR from '../locales/ar/landingPage/hero.json';
import navbarEN from '../locales/en/landingPage/navbar.json';
import navbarAR from '../locales/ar/landingPage/navbar.json';
import exploreSyriaEN from '../locales/en/landingPage/explore.json';
import exploreSyriaAR from '../locales/ar/landingPage/explore.json';
import topDestinationsEN from '../locales/en/landingPage/topDestinations.json';
import topDestinationsAR from '../locales/ar/landingPage/topDestinations.json';
import bookAdventureEN from '../locales/en/landingPage/bookAdventure.json';
import bookAdventureAR from '../locales/ar/landingPage/bookAdventure.json';
import newsletterEN from '../locales/en/landingPage/newsletter.json';
import newsletterAR from '../locales/ar/landingPage/newsletter.json';
import planEN from '../locales/en/landingPage/plan.json';
import planAR from '../locales/ar/landingPage/plan.json';
import highlightEN from '../locales/en/landingPage/highlight.json';
import highlightAR from '../locales/ar/landingPage/highlight.json';
import footerEN from '../locales/en/landingPage/footer.json';
import footerAR from '../locales/ar/landingPage/footer.json';
import travelServicesEN from '../locales/en/travelServices/travel.json';
import travelServicesAR from '../locales/ar/travelServices/travel.json';
import carRentEN from '../locales/en/travelServices/carRent.json';
import carRentAR from '../locales/ar/travelServices/carRent.json';
import hotelReservationEN from '../locales/en/travelServices/hotelReservation.json';
import hotelReservationAR from '../locales/ar/travelServices/hotelReservation.json';

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
            ...planEN,
            ...highlightEN,
            ...footerEN,

            /// travel services .. /// 
            ...travelServicesEN,
            ...carRentEN,
            ...hotelReservationEN,
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
            ...planAR,
            ...highlightAR,
            ...footerAR,

            /// travel services .. /// 
            ...travelServicesAR,
            ...carRentAR,
            ...hotelReservationAR,
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