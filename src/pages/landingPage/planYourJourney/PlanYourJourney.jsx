// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './PlanYourJourney.scss';
// import hotelImage from '../../../assets/images/plan/hotel.jpg';
// import carImage from '../../../assets/images/plan/luxury.jpg';
// import { Building2, Car, ChevronRight } from 'lucide-react';

// const PlanYourJourney = () => {
//     const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 550);

//     useEffect(() => {
//         const handleResize = () => {
//             setIsSmallScreen(window.innerWidth < 550);
//         };

//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);
//     return (
//         <section className="plan-journey-section">
//             <div className="container">
//                 <div className="section-header">
//                     <h2 className="section-title">Discover Premium Travel Services</h2>
//                     <div className="header-line"></div>
//                     <p className="section-subtitle">Complete your journey with exceptional accommodations and transportation</p>
//                 </div>

//                 <div className="journey-content">
//                     <div className="journey-cards">
//                         <div className="journey-card">
//                             <div className="card-content">
//                                 <div className="icon-wrapper">
//                                     <Building2 size={isSmallScreen ? 20 : 28} strokeWidth={1.5} />
//                                 </div>
//                                 <h3>Luxury Accommodations</h3>
//                                 <Link to="/travel-services#hotels" className="learn-more">
//                                     Explore Hotels <ChevronRight size={isSmallScreen ? 12 : 16} />
//                                 </Link>
//                             </div>
//                             <div className="card-image-container">
//                                 <img src={hotelImage} alt="Luxury Hotel" className="card-background" />
//                                 <div className="card-overlay"></div>
//                             </div>
//                         </div>

//                         <div className="journey-card">
//                             <div className="card-content">
//                                 <div className="icon-wrapper">
//                                     <Car size={isSmallScreen ? 20 : 28} strokeWidth={1.5} />
//                                 </div>
//                                 <h3>Executive Vehicles</h3>
//                                 <Link to="/travel-services#cars" className="learn-more">
//                                     Browse Vehicles <ChevronRight size={isSmallScreen ? 12 : 16} />
//                                 </Link>
//                             </div>
//                             <div className="card-image-container">
//                                 <img src={carImage} alt="Luxury Car" className="card-background" />
//                                 <div className="card-overlay"></div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="journey-cta">
//                         <Link to="/travel-services" className="discover-button">
//                             <span>View All Travel Services</span>
//                             <ChevronRight size={isSmallScreen ? 16 : 20} />
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default PlanYourJourney;



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PlanYourJourney.scss';
import hotelImage from '../../../assets/images/plan/hotel.jpg';
import carImage from '../../../assets/images/plan/luxury.jpg';
import { ArrowRight, Clock, Award, Sparkles } from 'lucide-react';

const PlanYourJourney = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 550);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 550);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className="plan-journey-section">
            <div className="container">
                <div className="section-intro">
                    <div className="section-heading">
                        <h2 className="section-title">Our Partners</h2>
                        <p className="section-subtitle">
                            Elevate your travel experience with our exclusive partner services
                        </p>
                    </div>

                    <Link to="/travel-services" className="view-all">
                        <span>View our partners</span>
                        <ArrowRight size={isSmallScreen ? 16 : 20} />
                    </Link>
                </div>

                <div className="services-grid">
                    <div className="service-card hotel">
                        <div className="service-content">
                            <h3>Luxury Accommodations</h3>
                            <ul className="feature-list">
                                <li>
                                    <Clock size={16} />
                                    <span>24/7 Priority Booking</span>
                                </li>
                                <li>
                                    <Sparkles size={16} />
                                    <span>Member-Exclusive Rates</span>
                                </li>
                            </ul>
                            <Link to="/travel-services#hotels" className="explore-link">
                                <span>Find Hotels</span>
                                <ArrowRight size={isSmallScreen ? 16 : 20} />
                            </Link>
                        </div>
                        <div className="service-image">
                            <img src={hotelImage} alt="Luxury Hotel" />
                            <div className="image-overlay"></div>
                        </div>
                    </div>

                    <div className="service-card transport">
                        <div className="service-content">
                            <h3>Executive Transfers</h3>
                            <ul className="feature-list">
                                <li>
                                    <Clock size={16} />
                                    <span>Seamless Airport Pickup</span>
                                </li>
                                <li>
                                    <Sparkles size={16} />
                                    <span>Chauffeur-Driven Fleet</span>
                                </li>
                            </ul>
                            <Link to="/travel-services#cars" className="explore-link">
                                <span>Book Transport</span>
                                <ArrowRight size={isSmallScreen ? 16 : 20} />
                            </Link>
                        </div>
                        <div className="service-image">
                            <img src={carImage} alt="Luxury Car" />
                            <div className="image-overlay"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlanYourJourney;