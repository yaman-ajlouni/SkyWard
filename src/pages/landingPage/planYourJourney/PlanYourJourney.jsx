import React from 'react';
import { Link } from 'react-router-dom';
import './PlanYourJourney.scss';
import hotelImage from '../../../assets/images/plan/hotel.jpg';
import carImage from '../../../assets/images/plan/luxury.jpg';
import { Building2, Car, ChevronRight, Star } from 'lucide-react';

const PlanYourJourney = () => {
    return (
        <section className="plan-journey-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Discover Premium Travel Services</h2>
                    <div className="header-line"></div>
                    <p className="section-subtitle">Complete your journey with exceptional accommodations and transportation</p>
                </div>

                <div className="journey-content">
                    <div className="journey-cards">
                        <div className="journey-card">
                            <div className="card-side card-side-front">
                                <div className="icon-wrapper">
                                    <Building2 size={28} strokeWidth={1.5} />
                                </div>
                                <h3>Luxury Accommodations</h3>
                                <div className="rating">
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                </div>
                                <img src={hotelImage} alt="Luxury Hotel" className="card-background" />
                                <div className="card-overlay"></div>
                            </div>
                            <div className="card-side card-side-back">
                                <div className="card-content">
                                    <h4>Premium Stays</h4>
                                    <p>Experience world-class comfort in handpicked luxury accommodations perfectly suited for the discerning traveler.</p>
                                    <ul className="feature-list">
                                        <li><span>Elite locations worldwide</span></li>
                                        <li><span>Exclusive VIP amenities</span></li>
                                        <li><span>Personalized concierge service</span></li>
                                        <li><span>Price match guarantee</span></li>
                                    </ul>
                                    <Link to="/travel-services#hotels" className="learn-more">
                                        Explore Hotels <ChevronRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="journey-card">
                            <div className="card-side card-side-front">
                                <div className="icon-wrapper">
                                    <Car size={28} strokeWidth={1.5} />
                                </div>
                                <h3>Executive Vehicles</h3>
                                <div className="rating">
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                </div>
                                <img src={carImage} alt="Luxury Car" className="card-background" />
                                <div className="card-overlay"></div>
                            </div>
                            <div className="card-side card-side-back">
                                <div className="card-content">
                                    <h4>Premium Fleet</h4>
                                    <p>Discover freedom and elegance with our carefully curated selection of luxury vehicles for a sophisticated travel experience.</p>
                                    <ul className="feature-list">
                                        <li><span>Prestigious models available</span></li>
                                        <li><span>Flexible delivery options</span></li>
                                        <li><span>Premium roadside support</span></li>
                                        <li><span>Personal chauffeur available</span></li>
                                    </ul>
                                    <Link to="/travel-services#cars" className="learn-more">
                                        Browse Vehicles <ChevronRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="journey-cta">
                        <Link to="/travel-services" className="discover-button">
                            <span>View All Travel Services</span>
                            <ChevronRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlanYourJourney;