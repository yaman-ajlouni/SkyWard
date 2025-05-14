import React, { useState, useEffect, useMemo } from 'react';
import { MapPin, Gauge, Settings, Shield, Clock, ChevronRight, Users, Wind, Navigation, Briefcase, ChevronLeft } from 'lucide-react';
import './CarRent.scss';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../context/LanguageContext';

// Import images
import economy from '../../../assets/images/travelServices/cars/economy.jpg';

const CarRent = () => {
    const [selectedCountry, setSelectedCountry] = useState('syria'); // Default to Syria
    const [activeCategory, setActiveCategory] = useState('all'); // Default to all categories
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const { t } = useTranslation();
    const { dir } = useLanguage();

    // Memoize data to prevent recreation on every render
    // Syria car rental companies data
    const syriaCompanies = useMemo(() => [
        {
            id: 1,
            name: 'Premium Motors Syria',
            image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800',
            type: t('carRent.filterCategories.premium'),
            specialties: [
                t('carRent.specialties.luxuryVehicles'),
                t('carRent.specialties.chauffeurService'),
                t('carRent.specialties.corporateAccounts')
            ],
            availableAt: ['Airport', 'Downtown'],
            categories: ['Premium'],
            country: 'syria'
        },
        {
            id: 2,
            name: 'Syria City Rentals',
            image: economy,
            type: t('carRent.filterCategories.economy'),
            specialties: [
                t('carRent.specialties.economyCars'),
                t('carRent.specialties.longTermRental'),
                t('carRent.specialties.studentDiscounts')
            ],
            availableAt: ['Airport', 'Downtown', 'City Center'],
            categories: ['Economy'],
            country: 'syria'
        },
        {
            id: 3,
            name: 'Syrian Adventure Wheels',
            image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800',
            type: t('carRent.filterCategories.suv'),
            specialties: [
                t('carRent.specialties.suvOffroad'),
                t('carRent.specialties.campingEquipment'),
                t('carRent.specialties.adventureTours')
            ],
            availableAt: ['Airport', 'City Center'],
            categories: ['SUV'],
            country: 'syria'
        }
    ], [t]);

    // Turkey car rental companies data
    const turkeyCompanies = useMemo(() => [
        {
            id: 4,
            name: 'Istanbul Premium Auto',
            image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800',
            type: t('carRent.filterCategories.premium'),
            specialties: [
                t('carRent.specialties.luxurySedans'),
                t('carRent.specialties.airportTransfers'),
                t('carRent.specialties.executiveService')
            ],
            availableAt: ['Istanbul Airport', 'City Center'],
            categories: ['Premium'],
            country: 'turkey'
        },
        {
            id: 5,
            name: 'Turkish Budget Cars',
            image: economy,
            type: t('carRent.filterCategories.economy'),
            specialties: [
                t('carRent.specialties.affordableVehicles'),
                t('carRent.specialties.touristPackages'),
                t('carRent.specialties.cityExploration')
            ],
            availableAt: ['All major cities', 'Tourist areas'],
            categories: ['Economy'],
            country: 'turkey'
        },
        {
            id: 6,
            name: 'Cappadocia Explorers',
            image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800',
            type: t('carRent.filterCategories.suv'),
            specialties: [
                t('carRent.specialties.4x4vehicles'),
                t('carRent.specialties.guidedTours'),
                t('carRent.specialties.campingGear')
            ],
            availableAt: ['Cappadocia', 'Antalya'],
            categories: ['SUV', 'Adventure'],
            country: 'turkey'
        },
        {
            id: 7,
            name: 'Antalya Beach Rides',
            image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800',
            type: t('carRent.filterCategories.convertible'),
            specialties: [
                t('carRent.specialties.convertibleCars'),
                t('carRent.specialties.coastalDrives'),
                t('carRent.specialties.weekendRentals')
            ],
            availableAt: ['Antalya', 'Bodrum', 'Marmaris'],
            categories: ['Convertible', 'Coastal'],
            country: 'turkey'
        }
    ], [t]);

    // Lebanon car rental companies data
    const lebanonCompanies = useMemo(() => [
        {
            id: 8,
            name: 'Beirut Luxury Motors',
            image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800',
            type: t('carRent.filterCategories.premium'),
            specialties: [
                t('carRent.specialties.highEndVehicles'),
                t('carRent.specialties.vipService'),
                t('carRent.specialties.weddingCars')
            ],
            availableAt: ['Beirut Airport', 'Downtown'],
            categories: ['Premium'],
            country: 'lebanon'
        },
        {
            id: 9,
            name: 'Lebanon Travel Cars',
            image: economy,
            type: t('carRent.filterCategories.economy'),
            specialties: [
                t('carRent.specialties.budgetFriendly'),
                t('carRent.specialties.studentRates'),
                t('carRent.specialties.dailyRentals')
            ],
            availableAt: ['Multiple locations', 'Universities'],
            categories: ['Economy'],
            country: 'lebanon'
        },
        {
            id: 10,
            name: 'Mountain Terrain Vehicles',
            image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800',
            type: t('carRent.filterCategories.suv'),
            specialties: [
                t('carRent.specialties.allTerrainVehicles'),
                t('carRent.specialties.mountainTours'),
                t('carRent.specialties.snowReady')
            ],
            availableAt: ['Beirut', 'Mountain resorts'],
            categories: ['SUV', 'Mountain'],
            country: 'lebanon'
        }
    ], [t]);

    // Combine all companies
    const allCompanies = useMemo(() => [
        ...syriaCompanies,
        ...turkeyCompanies,
        ...lebanonCompanies
    ], [syriaCompanies, turkeyCompanies, lebanonCompanies]);

    // Country filter categories
    const countryFilters = useMemo(() => [
        { id: 'syria', name: t('carRent.countries.syria') },
        { id: 'turkey', name: t('carRent.countries.turkey') },
        { id: 'lebanon', name: t('carRent.countries.lebanon') }
    ], [t]);

    // Get category filter options based on country
    const getCategoryFilters = () => {
        const baseFilters = [
            { id: 'all', name: t('carRent.filterCategories.all') },
        ];
        
        switch (selectedCountry) {
            case 'turkey':
                return [
                    ...baseFilters,
                    { id: 'Premium', name: t('carRent.filterCategories.premium') },
                    { id: 'Economy', name: t('carRent.filterCategories.economy') },
                    { id: 'SUV', name: t('carRent.filterCategories.suv') },
                    { id: 'Convertible', name: t('carRent.filterCategories.convertible') }
                ];
            case 'lebanon':
                return [
                    ...baseFilters,
                    { id: 'Premium', name: t('carRent.filterCategories.premium') },
                    { id: 'Economy', name: t('carRent.filterCategories.economy') },
                    { id: 'SUV', name: t('carRent.filterCategories.suv') },
                    { id: 'Mountain', name: t('carRent.filterCategories.mountain') }
                ];
            case 'syria':
            default:
                return [
                    ...baseFilters,
                    { id: 'Premium', name: t('carRent.filterCategories.premium') },
                    { id: 'Economy', name: t('carRent.filterCategories.economy') },
                    { id: 'SUV', name: t('carRent.filterCategories.suv') }
                ];
        }
    };

    // Apply both country and category filters
    useEffect(() => {
        // First filter by country
        let filtered = allCompanies.filter(company => company.country === selectedCountry);
        
        // Then apply category filter if it's not 'all'
        if (activeCategory !== 'all') {
            filtered = filtered.filter(company => 
                company.categories.includes(activeCategory)
            );
        }
        
        setFilteredCompanies(filtered);
    }, [selectedCountry, activeCategory, allCompanies]);

    // Function to handle country selection
    const handleCountryChange = (countryId) => {
        setSelectedCountry(countryId);
        setActiveCategory('all'); // Reset category filter when country changes
    };

    // Function to handle category selection
    const handleCategoryChange = (categoryId) => {
        setActiveCategory(categoryId);
    };

    // Function to render feature icons - memoized
    const renderFeatureIcon = useMemo(() => (feature) => {
        if (feature.includes(t('carRent.specialties.luxuryVehicles')) ||
            feature.includes(t('carRent.specialties.highEndVehicles'))) return <Users size={14} strokeWidth={1.5} />;
        if (feature.includes(t('carRent.specialties.chauffeurService')) ||
            feature.includes(t('carRent.specialties.vipService'))) return <Users size={14} strokeWidth={1.5} />;
        if (feature.includes(t('carRent.specialties.corporateAccounts')) ||
            feature.includes(t('carRent.specialties.executiveService'))) return <Briefcase size={14} strokeWidth={1.5} />;
        if (feature.includes(t('carRent.specialties.economyCars')) ||
            feature.includes(t('carRent.specialties.affordableVehicles')) ||
            feature.includes(t('carRent.specialties.budgetFriendly'))) return <Wind size={14} strokeWidth={1.5} />;
        if (feature.includes(t('carRent.specialties.longTermRental'))) return <Clock size={14} strokeWidth={1.5} />;
        if (feature.includes(t('carRent.specialties.studentDiscounts')) ||
            feature.includes(t('carRent.specialties.studentRates'))) return <Users size={14} strokeWidth={1.5} />;
        if (feature.includes(t('carRent.specialties.airportTransfers'))) return <Navigation size={14} strokeWidth={1.5} />;
        if (feature.includes(t('carRent.specialties.suvOffroad')) ||
            feature.includes(t('carRent.specialties.4x4vehicles')) ||
            feature.includes(t('carRent.specialties.allTerrainVehicles'))) return <Gauge size={14} strokeWidth={1.5} />;
        if (feature.includes(t('carRent.specialties.campingEquipment')) ||
            feature.includes(t('carRent.specialties.campingGear'))) return <Briefcase size={14} strokeWidth={1.5} />;
        if (feature.includes(t('carRent.specialties.adventureTours')) ||
            feature.includes(t('carRent.specialties.guidedTours'))) return <Navigation size={14} strokeWidth={1.5} />;
        if (feature.includes(t('carRent.specialties.weddingCars'))) return <Shield size={14} strokeWidth={1.5} />;
        return <Settings size={14} strokeWidth={1.5} />;
    }, [t]);

    // Animation classes for filter results
    const getFilterResultsClass = () => {
        return filteredCompanies.length > 0 ? "cars-list" : "cars-list no-results";
    };

    return (
        <div className={`car-section ${dir === 'rtl' ? 'rtl' : ''}`}>
            <div className="cars-container">
                <header className="section-header">
                    <h2>{t(`carRent.sectionTitle.${selectedCountry}`)}</h2>
                    <p>{t(`carRent.sectionDescription.${selectedCountry}`)}</p>
                </header>

                {/* Country Selection Tabs */}
                <div className="country-selector">
                    {countryFilters.map(country => (
                        <div
                            key={country.id}
                            className={`country-tab ${selectedCountry === country.id ? 'active' : ''}`}
                            onClick={() => handleCountryChange(country.id)}
                        >
                            {country.name}
                        </div>
                    ))}
                </div>

                {/* Category Filters */}
                <div className="filter-tags">
                    {getCategoryFilters().map(category => (
                        <div
                            key={category.id}
                            className={`tag ${activeCategory === category.id ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(category.id)}
                        >
                            {category.name}
                        </div>
                    ))}
                </div>

                {filteredCompanies.length === 0 ? (
                    <div className="no-results-message">
                        <p>{t('carRent.noResults')}</p>
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
                                            <span>{t('carRent.rentalProvider')}</span>
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
                                            <p>{t('carRent.availableLocations')}</p>
                                            <div className="locations-list">
                                                {company.availableAt.map((pickupLocation, index) => (
                                                    <span key={index} className="location">
                                                        <MapPin size={14} strokeWidth={1.5} />
                                                        <span>{pickupLocation}</span>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="car-footer">
                                        <button className="details-button">
                                            <span>{t('carRent.viewCompanyDetails')}</span>
                                            {dir === 'ltr' ? (
                                                <ChevronRight size={16} strokeWidth={1.5} />
                                            ) : (
                                                <ChevronLeft size={16} strokeWidth={1.5} />
                                            )}
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