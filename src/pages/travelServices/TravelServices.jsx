import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Hotel, Car, ArrowLeft, Calendar, MapPin } from 'lucide-react';
import './TravelServices.scss';
import HotelReservation from './hotelReservation/HotelReservation';
import CarRent from './carRent/CarRent';

const TravelServices = () => {
    const [activeTab, setActiveTab] = useState('hotels');
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);

        // Check URL hash to determine which tab should be active
        const hash = window.location.hash.replace('#', '');
        if (hash === 'hotels' || hash === 'cars') {
            setActiveTab(hash);
        }

    },);

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

    return (
        <div className="travel-services-page">
            <div className={`page-header ${isHeaderVisible ? 'visible' : 'hidden'}`}>
                <div className="header-background"></div>
                <div className="container">
                    <div className="header-top">
                        <Link to="/" className="back-button">
                            <ArrowLeft size={18} strokeWidth={2} />
                            <span>Back to Home</span>
                        </Link>
                    </div>

                    <div className="header-content">
                        <h1>Premium Travel Services</h1>
                        <p>Elevate your journey with sophisticated accommodations and transportation</p>
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
                            <span className="tab-text">Hotels</span>
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
                            <span className="tab-text">Vehicle Rentals</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container main-content">
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
                        {activeTab === 'hotels' ? (
                            <p>Discover premium accommodations tailored to your preferences. From luxurious city center hotels to charming boutique properties, find your perfect stay.</p>
                        ) : (
                            <p>Select from our curated collection of premium vehicles. Whether you seek elegance, performance, or comfort, our fleet offers the perfect driving experience.</p>
                        )}
                    </div>
                </div>

                <div className="services-content">
                    {activeTab === 'hotels' && <HotelReservation />}
                    {activeTab === 'cars' && <CarRent />}
                </div>

                <div className="back-home-section">
                    <Link to="/" className="back-home-button">
                        <ArrowLeft size={18} strokeWidth={2} />
                        <span>Return to Homepage</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TravelServices;