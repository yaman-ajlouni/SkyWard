import { useState, useEffect, useRef } from 'react';
import './Navbar.scss';
import { Globe, Menu, X, MapPin } from 'lucide-react';
import logoImage from '../../assets/images/Purple-Logo-with-Without-BG.png';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { useLocation } from '../../context/LocationContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { t } = useTranslation();
    const { language, changeLanguage } = useLanguage();
    const { location, changeLocation } = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
    const scrollTimeoutRef = useRef(null);
    const locationDropdownRef = useRef(null);

    useEffect(() => {
        const scrollDownThreshold = 15;
        const scrollUpThreshold = 5;

        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            scrollTimeoutRef.current = setTimeout(() => {
                if (!scrolled && currentScrollY > scrollDownThreshold) {
                    setScrolled(true);
                } else if (scrolled && currentScrollY < scrollUpThreshold) {
                    setScrolled(false);
                }

                lastScrollY = currentScrollY;
            }, 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [scrolled]);

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

    // Close location dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
                setIsLocationDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Toggle language
    const handleLanguageChange = () => {
        changeLanguage(language === 'en' ? 'ar' : 'en');
    };

    // Get location display name
    const getLocationDisplayName = () => {
        switch (location) {
            case 'syria':
                return t('navbar.locations.syria');
            case 'turkey':
                return t('navbar.locations.turkey');
            case 'lebanon':
                return t('navbar.locations.lebanon');
            default:
                return t('navbar.locations.syria');
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''} ${language === 'ar' ? 'rtl' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-left">
                    <div className="logo">
                        <Link to="/">
                            <img className='image-logo' src={logoImage} alt="Company Logo" />
                        </Link>
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
                    {/* Location selector */}
                    <div className="location-selector" ref={locationDropdownRef}>
                        <div
                            className="location-toggle"
                            onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                        >
                            <MapPin size={18} />
                            <span>{getLocationDisplayName()}</span>
                        </div>
                        {isLocationDropdownOpen && (
                            <div className="location-dropdown">
                                <div
                                    className={`location-option ${location === 'syria' ? 'active' : ''}`}
                                    onClick={() => {
                                        changeLocation('syria');
                                        setIsLocationDropdownOpen(false);
                                    }}
                                >
                                    {t('navbar.locations.syria')}
                                </div>
                                <div
                                    className={`location-option ${location === 'turkey' ? 'active' : ''}`}
                                    onClick={() => {
                                        changeLocation('turkey');
                                        setIsLocationDropdownOpen(false);
                                    }}
                                >
                                    {t('navbar.locations.turkey')}
                                </div>
                                <div
                                    className={`location-option ${location === 'lebanon' ? 'active' : ''}`}
                                    onClick={() => {
                                        changeLocation('lebanon');
                                        setIsLocationDropdownOpen(false);
                                    }}
                                >
                                    {t('navbar.locations.lebanon')}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="divider"></div>

                    <div className="language-selector" onClick={handleLanguageChange}>
                        <Globe size={18} />
                        <span>{language === 'en' ? 'العربية' : 'English'}</span>
                    </div>

                    <div className="divider"></div>

                    <div className="sap-prices">
                        <span>USD</span>
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
                    {/* Mobile location selector */}
                    <div className="mobile-location-selector">
                        <div
                            className={`location-option ${location === 'syria' ? 'active' : ''}`}
                            onClick={() => {
                                changeLocation('syria');
                                setIsMenuOpen(false);
                            }}
                        >
                            <MapPin size={16} />
                            <span>{t('navbar.locations.syria')}</span>
                        </div>
                        <div
                            className={`location-option ${location === 'turkey' ? 'active' : ''}`}
                            onClick={() => {
                                changeLocation('turkey');
                                setIsMenuOpen(false);
                            }}
                        >
                            <MapPin size={16} />
                            <span>{t('navbar.locations.turkey')}</span>
                        </div>
                        <div
                            className={`location-option ${location === 'lebanon' ? 'active' : ''}`}
                            onClick={() => {
                                changeLocation('lebanon');
                                setIsMenuOpen(false);
                            }}
                        >
                            <MapPin size={16} />
                            <span>{t('navbar.locations.lebanon')}</span>
                        </div>
                    </div>

                    <div className="mobile-language-selector" onClick={handleLanguageChange}>
                        <Globe size={20} />
                        <span>{language === 'en' ? 'العربية' : 'English'}</span>
                    </div>

                    <div className="mobile-sap">
                        <span>USD</span>
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