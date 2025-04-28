import React, { createContext, useState, useEffect, useContext } from 'react';
import i18n from '../utils/i18n';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
    const [dir, setDir] = useState(language === 'ar' ? 'rtl' : 'ltr');

    const changeLanguage = (lng) => {
        setLanguage(lng);
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
        setDir(lng === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lng;
    };

    useEffect(() => {
        // Set initial document direction and language
        document.documentElement.dir = dir;
        document.documentElement.lang = language;
    }, []);

    return (
        <LanguageContext.Provider value={{ language, dir, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;