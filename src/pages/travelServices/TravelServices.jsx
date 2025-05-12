import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, Hotel, Car, ArrowLeft, Calendar, MapPin } from 'lucide-react';
import './TravelServices.scss';
import HotelReservation from './hotelReservation/HotelReservation';
import CarRent from './carRent/CarRent';
import { useLocation } from '../../context/LocationContext';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';

const TravelServices = () => {
    const { location } = useLocation(); // Get the selected location from context
    const [activeTab, setActiveTab] = useState('hotels');
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const { t } = useTranslation();
    const { dir } = useLanguage();

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);

        // Check URL hash to determine which tab should be active
        const hash = window.location.hash.replace('#', '');
        if (hash === 'hotels' || hash === 'cars') {
            setActiveTab(hash);
        }
    }, []);

    // Handle hash change while component is mounted
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            if (hash === 'hotels' || hash === 'cars') {
                setActiveTab(hash);
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    // Get country name in correct format
    const getCountryName = () => {
        switch (location) {
            case 'turkey':
                return t('Turkey');
            case 'lebanon':
                return t('Lebanon');
            case 'syria':
            default:
                return t('Syria');
        }
    };

    return (
        <div className={`travel-services-page ${dir === 'rtl' ? 'rtl' : ''}`}>
            <div className={`page-header ${isHeaderVisible ? 'visible' : 'hidden'}`}>
                <div className="header-background"></div>
                <div className="container">
                    <div className="header-top">
                        <NavLink to="/" className="back-button">
                            {dir === 'ltr' ? (
                                <ArrowLeft size={18} strokeWidth={2} />
                            ) : (
                                <ChevronLeft size={18} strokeWidth={2} />
                            )}
                            <span>{t('backToHome')}</span>
                        </NavLink>
                    </div>

                    <div className="header-content">
                        <h1>{t(`pageTitle.${location}`)}</h1>
                        <p>{t(`pageSubtitle.${location}`)}</p>
                    </div>

                    <div className="service-tabs">
                        <button
                            className={`tab-button ${activeTab === 'hotels' ? 'active' : ''}`}
                            onClick={() => {
                                setActiveTab('hotels');
                                window.history.replaceState(null, null, '#hotels');
                            }}
                        >
                            <span className="tab-icon">
                                <Hotel size={18} strokeWidth={1.5} />
                            </span>
                            <span className="tab-text">{t('tabs.hotels')}</span>
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'cars' ? 'active' : ''}`}
                            onClick={() => {
                                setActiveTab('cars');
                                window.history.replaceState(null, null, '#cars');
                            }}
                        >
                            <span className="tab-icon">
                                <Car size={18} strokeWidth={1.5} />
                            </span>
                            <span className="tab-text">{t('tabs.cars')}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container main-content">
                <div className="services-content">
                    {activeTab === 'hotels' && <HotelReservation />}
                    {activeTab === 'cars' && <CarRent />}
                </div>

                <div className="services-intro">
                    <div className="intro-visuals">
                        <div className="visual-icons">
                            {activeTab === 'hotels' ? (
                                <>
                                    <div className="visual-icon"><Hotel size={24} /></div>
                                    <div className="visual-icon"><Calendar size={20} /></div>
                                    <div className="visual-icon"><MapPin size={20} /></div>
                                </>
                            ) : (
                                <>
                                    <div className="visual-icon"><Car size={24} /></div>
                                    <div className="visual-icon"><Calendar size={20} /></div>
                                    <div className="visual-icon"><MapPin size={20} /></div>
                                </>
                            )}
                        </div>
                        <div className="intro-divider"></div>
                    </div>
                    <div className="intro-text">
                        <p>
                            {t(`intro.${activeTab}`, { country: getCountryName() })}
                        </p>
                    </div>
                </div>

                <div className="back-home-section">
                    <NavLink to="/" className="back-home-button">
                        {dir === 'ltr' ? (
                            <ArrowLeft size={18} strokeWidth={2} />
                        ) : (
                            <ChevronLeft size={18} strokeWidth={2} />
                        )}
                        <span>{t('returnToHomepage')}</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default TravelServices;