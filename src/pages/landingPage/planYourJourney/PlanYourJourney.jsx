import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PlanYourJourney.scss';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../context/LanguageContext';
import hotelImage from '../../../assets/images/plan/hotel.jpg';
import carImage from '../../../assets/images/plan/luxury.jpg';
import { ArrowRight, Clock, Award, Sparkles } from 'lucide-react';

const PlanYourJourney = () => {
    const { t } = useTranslation();
    const { dir } = useLanguage();
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 550);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 550);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className={`plan-journey-section ${dir}`}>
            <div className="container">
                <div className="section-intro">
                    <div className="section-heading">
                        <h2 className="section-title">{t('planJourney.title')}</h2>
                        <p className="section-subtitle">
                            {t('planJourney.subtitle')}
                        </p>
                    </div>

                    <Link to="/travel-services" className="view-all">
                        <span>{t('planJourney.viewAll')}</span>
                        <ArrowRight size={isSmallScreen ? 16 : 20} />
                    </Link>
                </div>

                <div className="services-grid">
                    <div className="service-card hotel">
                        <div className="service-content">
                            <h3>{t('planJourney.accommodation.title')}</h3>
                            <ul className="feature-list">
                                <li>
                                    <Clock size={16} />
                                    <span>{t('planJourney.accommodation.features.0')}</span>
                                </li>
                                <li>
                                    <Sparkles size={16} />
                                    <span>{t('planJourney.accommodation.features.1')}</span>
                                </li>
                            </ul>
                            <Link to="/travel-services#hotels" className="explore-link">
                                <span>{t('planJourney.accommodation.cta')}</span>
                                <ArrowRight size={isSmallScreen ? 16 : 20} />
                            </Link>
                        </div>
                        <div className="service-image">
                            <img src={hotelImage} alt={t('planJourney.accommodation.title')} />
                            <div className="image-overlay"></div>
                        </div>
                    </div>

                    <div className="service-card transport">
                        <div className="service-content">
                            <h3>{t('planJourney.carRental.title')}</h3>
                            <ul className="feature-list">
                                <li>
                                    <Clock size={16} />
                                    <span>{t('planJourney.carRental.features.0')}</span>
                                </li>
                                <li>
                                    <Sparkles size={16} />
                                    <span>{t('planJourney.carRental.features.1')}</span>
                                </li>
                            </ul>
                            <Link to="/travel-services#cars" className="explore-link">
                                <span>{t('planJourney.carRental.cta')}</span>
                                <ArrowRight size={isSmallScreen ? 16 : 20} />
                            </Link>
                        </div>
                        <div className="service-image">
                            <img src={carImage} alt={t('planJourney.carRental.title')} />
                            <div className="image-overlay"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlanYourJourney;