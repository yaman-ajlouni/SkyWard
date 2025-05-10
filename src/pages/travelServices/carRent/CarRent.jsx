import React, { useState, useEffect } from 'react';
import { MapPin, Gauge, Settings, Shield, Clock, ChevronRight, Users, Wind, Navigation, Briefcase } from 'lucide-react';
import './CarRent.scss';
import economy from '../../../assets/images/travelServices/cars/economy.jpg'

const CarRent = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [filteredCompanies, setFilteredCompanies] = useState([]);

    // Car rental companies data with Unsplash images
    const companies = [
        {
            id: 1,
            name: 'Premium Motors',
            image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800',
            type: 'Premium',
            specialties: ['Luxury vehicles', 'Chauffeur service', 'Corporate accounts'],
            availableAt: ['Airport', 'Downtown'],
            categories: ['Premium']
        },
        {
            id: 2,
            name: 'City Rentals',
            image: economy,
            type: 'Economy',
            specialties: ['Economy cars', 'Long-term rental', 'Student discounts'],
            availableAt: ['Airport', 'Downtown', 'City Center'],
            categories: ['Economy']
        },
        {
            id: 3,
            name: 'Adventure Wheels',
            image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800',
            type: 'SUV',
            specialties: ['SUVs & off-road', 'Camping equipment', 'Adventure tours'],
            availableAt: ['Airport', 'City Center'],
            categories: ['SUV']
        }
    ];

    // Filter categories
    const filterCategories = [
        { id: 'all', name: 'All Companies' },
        { id: 'Economy', name: 'Economy' },
        { id: 'SUV', name: 'SUV Specialists' },
        { id: 'Premium', name: 'Premium' }
    ];



    // Apply filters whenever the active filter changes
    useEffect(() => {
        if (activeFilter === 'all') {
            setFilteredCompanies(companies);
        } else {
            const filtered = companies.filter(company =>
                company.categories.includes(activeFilter)
            );
            setFilteredCompanies(filtered);
        }
    }, [activeFilter]);

    // Function to handle filter changes
    const handleFilterChange = (filterId) => {
        setActiveFilter(filterId);
    };

    // Function to render feature icons
    const renderFeatureIcon = (feature) => {
        if (feature.includes('Luxury')) return <Users size={14} strokeWidth={1.5} />;
        if (feature.includes('Chauffeur')) return <Users size={14} strokeWidth={1.5} />;
        if (feature.includes('Corporate')) return <Briefcase size={14} strokeWidth={1.5} />;
        if (feature.includes('Economy')) return <Wind size={14} strokeWidth={1.5} />;
        if (feature.includes('Long-term')) return <Clock size={14} strokeWidth={1.5} />;
        if (feature.includes('Student')) return <Users size={14} strokeWidth={1.5} />;
        if (feature.includes('Executive')) return <Shield size={14} strokeWidth={1.5} />;
        if (feature.includes('Airport')) return <Navigation size={14} strokeWidth={1.5} />;
        if (feature.includes('SUV')) return <Gauge size={14} strokeWidth={1.5} />;
        if (feature.includes('Camping')) return <Briefcase size={14} strokeWidth={1.5} />;
        if (feature.includes('Adventure')) return <Navigation size={14} strokeWidth={1.5} />;
        return <Settings size={14} strokeWidth={1.5} />;
    };

    // Animation classes for filter results
    const getFilterResultsClass = () => {
        return filteredCompanies.length > 0 ? "cars-list" : "cars-list no-results";
    };

    return (
        <div className="car-section">
            <div className="cars-container">
                <header className="section-header">
                    <h2>Premium Rental Companies</h2>
                    <p>Choose from our trusted network of car rental partners to enhance your journey with quality service</p>
                </header>

                <div className="filter-tags">
                    {filterCategories.map(category => (
                        <div
                            key={category.id}
                            className={`tag ${activeFilter === category.id ? 'active' : ''}`}
                            onClick={() => handleFilterChange(category.id)}
                        >
                            {category.name}
                        </div>
                    ))}
                </div>

                {filteredCompanies.length === 0 ? (
                    <div className="no-results-message">
                        <p>No rental companies match the selected filter. Please try another category.</p>
                    </div>
                ) : (
                    <div className={getFilterResultsClass()}>
                        {filteredCompanies.map((company) => (
                            <div className="car-card" key={company.id}>
                                <div className="car-image">
                                    <img src={company.image} alt={company.name} />
                                    <div className="image-overlay"></div>
                                    <div className="car-type-badge">
                                        {company.type}
                                    </div>
                                </div>

                                <div className="card-content">
                                    <div className="car-details">
                                        <h3>{company.name}</h3>

                                        <div className="car-transmission">
                                            <Gauge size={16} strokeWidth={1.5} />
                                            <span>Rental Provider</span>
                                        </div>

                                        <div className="divider"></div>

                                        <div className="car-features">
                                            {company.specialties.map((specialty, index) => (
                                                <span key={index} className="feature">
                                                    {renderFeatureIcon(specialty)}
                                                    <span className="feature-text">{specialty}</span>
                                                </span>
                                            ))}
                                        </div>

                                        <div className="pickup-locations">
                                            <p>Available locations:</p>
                                            <div className="locations-list">
                                                {company.availableAt.map((location, index) => (
                                                    <span key={index} className="location">
                                                        <MapPin size={14} strokeWidth={1.5} />
                                                        <span>{location}</span>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="car-footer">
                                        <button className="details-button">
                                            <span>View Company Details</span>
                                            <ChevronRight size={16} strokeWidth={1.5} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default CarRent;