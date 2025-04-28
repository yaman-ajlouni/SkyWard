import React, { useState, useEffect } from 'react';
import './Navbar.scss';
import { Globe, Menu, X } from 'lucide-react';
import logoImage from '../../assets/images/FlySyria-With-Text-cropped.svg';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
    const { t } = useTranslation();
    const { language, changeLanguage } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scrolling effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Close mobile menu when window resizes to desktop size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 992 && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isMenuOpen]);

    // Toggle language
    const handleLanguageChange = () => {
        changeLanguage(language === 'en' ? 'ar' : 'en');
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''} ${language === 'ar' ? 'rtl' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-left">
                    <div className="logo">
                        <img src={logoImage} alt="Company Logo" />
                    </div>

                    {/* Desktop navigation links */}
                    <ul className="nav-links desktop-links">
                        <li><a href="#explore">{t('navbar.explore')}</a></li>
                        <li><a href="#experience">{t('navbar.experience')}</a></li>
                        <li><a href="#flight">{t('navbar.flight')}</a></li>
                        <li><a href="#events">{t('navbar.events')}</a></li>
                        <li><a href="#support">{t('navbar.support')}</a></li>
                        <li><a href="#contact">{t('navbar.contact')}</a></li>
                    </ul>
                </div>

                <div className="navbar-right">
                    <div className="language-selector" onClick={handleLanguageChange}>
                        <Globe size={18} />
                        <span>{language === 'en' ? 'العربية' : 'English'}</span>
                    </div>

                    <div className="divider"></div>

                    <div className="sap-prices">
                        <span>SYP</span>
                    </div>

                    <button className="login-button">
                        <span>{t('navbar.login')}</span>
                    </button>

                    {/* Mobile menu button */}
                    <button
                        className="mobile-menu-button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile navigation menu */}
            <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
                <ul className="nav-links">
                    <li><a href="#explore" onClick={() => setIsMenuOpen(false)}>{t('navbar.explore')}</a></li>
                    <li><a href="#experience" onClick={() => setIsMenuOpen(false)}>{t('navbar.experience')}</a></li>
                    <li><a href="#flight" onClick={() => setIsMenuOpen(false)}>{t('navbar.flight')}</a></li>
                    <li><a href="#events" onClick={() => setIsMenuOpen(false)}>{t('navbar.events')}</a></li>
                    <li><a href="#support" onClick={() => setIsMenuOpen(false)}>{t('navbar.support')}</a></li>
                    <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>{t('navbar.contact')}</a></li>
                </ul>

                <div className="mobile-bottom-menu">
                    <div className="mobile-language-selector" onClick={handleLanguageChange}>
                        <Globe size={20} />
                        <span>{language === 'en' ? 'العربية' : 'English'}</span>
                    </div>

                    <div className="mobile-sap">
                        <span>SAP</span>
                    </div>

                    <button className="mobile-login-button">
                        <span>{t('navbar.login')}</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;