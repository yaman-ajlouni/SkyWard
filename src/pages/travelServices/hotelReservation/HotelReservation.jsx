import React, { useState, useEffect, useMemo } from 'react';
import { MapPin, Wifi, Coffee, Waves, Utensils, Dumbbell, Bus, Star, ChevronRight, ChevronLeft } from 'lucide-react';
import './HotelReservation.scss';
import { useLocation } from '../../../context/LocationContext';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../context/LanguageContext';

// Import Syria hotel images
import fourseasons from '../../../assets/images/travelServices/hotels/syria/fourseasons.jpg';
import beitAlwali from '../../../assets/images/travelServices/hotels/syria/beit-alwali.jpg';
import lattakiaCham from '../../../assets/images/travelServices/hotels/syria/cham-lattakia.jpg';
import palmyra from '../../../assets/images/travelServices/hotels/syria/palmyra.jpg';

// Import Turkey hotel images
import pera from '../../../assets/images/travelServices/hotels/turkey/pera.jpg';
import cappadocia from '../../../assets/images/travelServices/hotels/turkey/cappadocia.webp';
import bodrum from '../../../assets/images/travelServices/hotels/turkey/bodrum.jpg';
import divan from '../../../assets/images/travelServices/hotels/turkey/divan.jpg';

// Import Lebanon hotel Images
import leGray from '../../../assets/images/travelServices/hotels/lebanon/leGray.jpg';
import grand from '../../../assets/images/travelServices/hotels/lebanon/grand.jpg';
import byblos from '../../../assets/images/travelServices/hotels/lebanon/byblos.jpg';
import palmyraLebanon from '../../../assets/images/travelServices/hotels/lebanon/palmyra.jpg';

const HotelReservation = () => {
    const { location } = useLocation(); // Get the selected location from context
    const [activeFilter, setActiveFilter] = useState('all');
    const [filteredHotels, setFilteredHotels] = useState([]);
    const { t } = useTranslation();
    const { dir } = useLanguage();

    // Memoize the hotels data to prevent recreation on every render
    const syriaHotels = useMemo(() => [
        {
            id: 1,
            name: 'Four Seasons Hotel Damascus',
            image: fourseasons,
            rating: 5,
            reviews: 287,
            location: t('hotelReservation.locations.damascusOldCity'),
            distance: t('hotelReservation.distances.fromAirport', { distance: '30 km', airport: 'Damascus International' }),
            categories: ['Damascus', 'Historic'],
            amenities: [
                t('hotelReservation.amenities.freeWifi'), 
                t('hotelReservation.amenities.breakfastIncluded'), 
                t('hotelReservation.amenities.swimmingPool'), 
                t('hotelReservation.amenities.spa'), 
                t('hotelReservation.amenities.restaurant')
            ]
        },
        {
            id: 2,
            name: 'Beit Al-Wali Heritage Hotel',
            image: beitAlwali,
            rating: 5,
            reviews: 156,
            location: t('hotelReservation.locations.oldAleppo'),
            distance: t('hotelReservation.distances.fromCity', { distance: '5 km', city: 'Aleppo' }),
            categories: ['Aleppo'],
            amenities: [
                t('hotelReservation.amenities.freeWifi'), 
                t('hotelReservation.amenities.traditionalBreakfast'), 
                t('hotelReservation.amenities.historicArchitecture'), 
                t('hotelReservation.amenities.courtyard')
            ]
        },
        {
            id: 3,
            name: 'Cham Palace Lattakia',
            image: lattakiaCham,
            rating: 5,
            reviews: 203,
            location: t('hotelReservation.locations.lattakiaCorniche'),
            distance: t('hotelReservation.distances.fromCity', { distance: '2 km', city: 'Lattakia' }),
            categories: ['Coastal'],
            amenities: [
                t('hotelReservation.amenities.seaView'), 
                t('hotelReservation.amenities.freeWifi'), 
                t('hotelReservation.amenities.restaurant'), 
                t('hotelReservation.amenities.beachAccess'), 
                t('hotelReservation.amenities.pool')
            ]
        },
        {
            id: 4,
            name: 'Dedeman Palmyra Hotel',
            image: palmyra,
            rating: 4,
            reviews: 176,
            location: t('hotelReservation.locations.palmyra'),
            distance: t('hotelReservation.distances.fromRuins', { distance: '1 km' }),
            categories: ['Historic'],
            amenities: [
                t('hotelReservation.amenities.archaeologicalTours'), 
                t('hotelReservation.amenities.freeWifi'), 
                t('hotelReservation.amenities.restaurant'), 
                t('hotelReservation.amenities.desertViews')
            ]
        }
    ], [t]); // Only recreate when t changes

    // Turkey hotels data
    const turkeyHotels = useMemo(() => [
        {
            id: 1,
            name: 'Pera Palace Hotel',
            image: pera,
            rating: 5,
            reviews: 342,
            location: t('hotelReservation.locations.beyogluIstanbul'),
            distance: t('hotelReservation.distances.fromAirport', { distance: '35 km', airport: 'Istanbul' }),
            categories: ['Istanbul', 'Historic'],
            amenities: [
                t('hotelReservation.amenities.freeWifi'), 
                t('hotelReservation.amenities.breakfastIncluded'), 
                t('hotelReservation.amenities.spa'), 
                t('hotelReservation.amenities.restaurant'), 
                t('hotelReservation.amenities.historicBuilding')
            ]
        },
        {
            id: 2,
            name: 'Cappadocia Cave Suites',
            image: cappadocia,
            rating: 5,
            reviews: 289,
            location: t('hotelReservation.locations.goremeCappadocia'),
            distance: t('hotelReservation.distances.fromAirport', { distance: '40 km', airport: 'Nevsehir' }),
            categories: ['Cappadocia'],
            amenities: [
                t('hotelReservation.amenities.caveRooms'), 
                t('hotelReservation.amenities.balloonTours'), 
                t('hotelReservation.amenities.restaurant'), 
                t('hotelReservation.amenities.terraceViews')
            ]
        },
        {
            id: 3,
            name: 'Bodrum Marina Palace',
            image: bodrum,
            rating: 5,
            reviews: 197,
            location: t('hotelReservation.locations.marinaBodrum'),
            distance: t('hotelReservation.distances.fromCity', { distance: '10 km', city: 'Bodrum' }),
            categories: ['Coastal'],
            amenities: [
                t('hotelReservation.amenities.seaView'), 
                t('hotelReservation.amenities.privateBeach'), 
                t('hotelReservation.amenities.restaurant'), 
                t('hotelReservation.amenities.pool'), 
                t('hotelReservation.amenities.yachtTours')
            ]
        },
        {
            id: 4,
            name: 'Divan Antalya',
            image: divan,
            rating: 5,
            reviews: 230,
            location: t('hotelReservation.locations.laraBeachAntalya'),
            distance: t('hotelReservation.distances.fromAirport', { distance: '15 km', airport: 'Antalya' }),
            categories: ['Beach'],
            amenities: [
                t('hotelReservation.amenities.allInclusive'), 
                t('hotelReservation.amenities.beachfront'), 
                t('hotelReservation.amenities.multipleRestaurants'), 
                t('hotelReservation.amenities.spa'), 
                t('hotelReservation.amenities.waterSports')
            ]
        }
    ], [t]); // Only recreate when t changes

    // Lebanon hotels data
    const lebanonHotels = useMemo(() => [
        {
            id: 1,
            name: 'Le Gray Beirut',
            image: leGray,
            rating: 4.8,
            reviews: 312,
            location: t('hotelReservation.locations.downtownBeirut'),
            distance: t('hotelReservation.distances.fromAirport', { distance: '12 km', airport: 'Beirut International' }),
            categories: ['Beirut', 'Luxury'],
            amenities: [
                t('hotelReservation.amenities.rooftopPool'), 
                t('hotelReservation.amenities.spa'), 
                t('hotelReservation.amenities.fineDining'), 
                t('hotelReservation.amenities.cityViews'), 
                t('hotelReservation.amenities.concierge')
            ]
        },
        {
            id: 2,
            name: 'Byblos Sur Mer',
            image: byblos,
            rating: 4.6,
            reviews: 183,
            location: t('hotelReservation.locations.byblosHarbor'),
            distance: t('hotelReservation.distances.fromHistoric', { distance: '3 km', place: 'Byblos' }),
            categories: ['Coastal'],
            amenities: [
                t('hotelReservation.amenities.seaView'), 
                t('hotelReservation.amenities.restaurant'), 
                t('hotelReservation.amenities.privateBeach'), 
                t('hotelReservation.amenities.waterActivities')
            ]
        },
        {
            id: 3,
            name: 'Grand Kadri Hotel',
            image: grand,
            rating: 4.4,
            reviews: 156,
            location: t('hotelReservation.locations.zahle'),
            distance: t('hotelReservation.distances.fromCapital', { distance: '55 km', capital: 'Beirut' }),
            categories: ['Mountain'],
            amenities: [
                t('hotelReservation.amenities.mountainView'), 
                t('hotelReservation.amenities.traditionalCuisine'), 
                t('hotelReservation.amenities.garden'), 
                t('hotelReservation.amenities.historicBuilding')
            ]
        },
        {
            id: 4,
            name: 'Palmyra Hotel Baalbek',
            image: palmyraLebanon,
            rating: 4.5,
            reviews: 144,
            location: t('hotelReservation.locations.baalbek'),
            distance: t('hotelReservation.distances.fromTemple', { distance: '1 km', place: 'Baalbek' }),
            categories: ['Historic'],
            amenities: [
                t('hotelReservation.amenities.heritageProperty'), 
                t('hotelReservation.amenities.archaeologicalTours'), 
                t('hotelReservation.amenities.traditionalCuisine'), 
                t('hotelReservation.amenities.historicViews')
            ]
        }
    ], [t]); // Only recreate when t changes

    // Memoize the hotels selection based on location
    const hotels = useMemo(() => {
        switch (location) {
            case 'turkey':
                return turkeyHotels;
            case 'lebanon':
                return lebanonHotels;
            case 'syria':
            default:
                return syriaHotels;
        }
    }, [location, syriaHotels, turkeyHotels, lebanonHotels]);

    // Get location-specific filter categories
    const filterCategories = useMemo(() => {
        switch (location) {
            case 'turkey':
                return [
                    { id: 'all', name: t('hotelReservation.filterCategories.allProperties') },
                    { id: 'Istanbul', name: t('hotelReservation.filterCategories.istanbul') },
                    { id: 'Cappadocia', name: t('hotelReservation.filterCategories.cappadocia') },
                    { id: 'Coastal', name: t('hotelReservation.filterCategories.coastal') },
                    { id: 'Beach', name: t('hotelReservation.filterCategories.beach') }
                ];
            case 'lebanon':
                return [
                    { id: 'all', name: t('hotelReservation.filterCategories.allProperties') },
                    { id: 'Beirut', name: t('hotelReservation.filterCategories.beirut') },
                    { id: 'Coastal', name: t('hotelReservation.filterCategories.coastal') },
                    { id: 'Mountain', name: t('hotelReservation.filterCategories.mountain') },
                    { id: 'Historic', name: t('hotelReservation.filterCategories.historic') }
                ];
            case 'syria':
            default:
                return [
                    { id: 'all', name: t('hotelReservation.filterCategories.allProperties') },
                    { id: 'Damascus', name: t('hotelReservation.filterCategories.damascus') },
                    { id: 'Aleppo', name: t('hotelReservation.filterCategories.aleppo') },
                    { id: 'Coastal', name: t('hotelReservation.filterCategories.coastal') },
                    { id: 'Historic', name: t('hotelReservation.filterCategories.historic') }
                ];
        }
    }, [location, t]);

    // Reset filter when location changes
    useEffect(() => {
        setActiveFilter('all');
    }, [location]);

    // Apply filters whenever the active filter or location changes
    useEffect(() => {
        if (activeFilter === 'all') {
            setFilteredHotels(hotels);
        } else {
            const filtered = hotels.filter(hotel =>
                hotel.categories.includes(activeFilter)
            );
            setFilteredHotels(filtered);
        }
    }, [activeFilter, hotels]);

    // Function to handle filter changes
    const handleFilterChange = (filterId) => {
        setActiveFilter(filterId);
    };

    // Function to render amenity icons - memoized to prevent recreation on every render
    const renderAmenityIcon = useMemo(() => (amenity) => {
        if (amenity.includes(t('hotelReservation.amenities.freeWifi'))) return <Wifi size={14} strokeWidth={1.5} />;
        if (amenity.includes(t('hotelReservation.amenities.breakfastIncluded')) || 
            amenity.includes(t('hotelReservation.amenities.traditionalBreakfast'))) 
            return <Coffee size={14} strokeWidth={1.5} />;
        if (amenity.includes(t('hotelReservation.amenities.swimmingPool')) || 
            amenity.includes(t('hotelReservation.amenities.pool')) || 
            amenity.includes(t('hotelReservation.amenities.beachAccess')) || 
            amenity.includes(t('hotelReservation.amenities.privateBeach')) || 
            amenity.includes(t('hotelReservation.amenities.beachfront')) || 
            amenity.includes(t('hotelReservation.amenities.rooftopPool'))) 
            return <Waves size={14} strokeWidth={1.5} />;
        if (amenity.includes(t('hotelReservation.amenities.restaurant')) || 
            amenity.includes(t('hotelReservation.amenities.multipleRestaurants')) || 
            amenity.includes(t('hotelReservation.amenities.fineDining')) || 
            amenity.includes(t('hotelReservation.amenities.traditionalCuisine'))) 
            return <Utensils size={14} strokeWidth={1.5} />;
        if (amenity.includes(t('hotelReservation.amenities.spa')) || 
            amenity.includes(t('hotelReservation.amenities.waterSports'))) 
            return <Dumbbell size={14} strokeWidth={1.5} />;
        if (amenity.includes(t('hotelReservation.amenities.archaeologicalTours')) || 
            amenity.includes(t('hotelReservation.amenities.balloonTours')) || 
            amenity.includes(t('hotelReservation.amenities.yachtTours'))) 
            return <Bus size={14} strokeWidth={1.5} />;
        return null;
    }, [t]);

    // Animation classes for filter results
    const getFilterResultsClass = () => {
        return filteredHotels.length > 0 ? "hotels-list" : "hotels-list no-results";
    };

    return (
        <div className={`hotel-section ${dir === 'rtl' ? 'rtl' : ''}`}>
            <div className="hotels-container">
                <header className="section-header">
                    <h2>{t(`hotelReservation.sectionTitle.${location}`)}</h2>
                    <p>{t(`hotelReservation.sectionDescription.${location}`)}</p>
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

                {filteredHotels.length === 0 ? (
                    <div className="no-results-message">
                        <p>{t('hotelReservation.noResults')}</p>
                    </div>
                ) : (
                    <div className={getFilterResultsClass()}>
                        {filteredHotels.map((hotel) => (
                            <div className="hotel-card" key={hotel.id}>
                                <div className="hotel-image">
                                    <img src={hotel.image} alt={hotel.name} />
                                    <div className="image-overlay"></div>
                                    <div className="card-rating">
                                        <Star size={14} fill="currentColor" />
                                        <span>{hotel.rating}</span>
                                    </div>
                                    {/* Show primary category tag - prioritize city categories */}
                                    {hotel.categories && (
                                        <div className="category-tag">
                                            {t(`hotelReservation.categories.${
                                                hotel.categories.find(cat =>
                                                    ['Damascus', 'Aleppo', 'Istanbul', 'Beirut', 'Cappadocia'].includes(cat)
                                                ) || hotel.categories[0]
                                            }`)}
                                        </div>
                                    )}
                                </div>

                                <div className="card-content">
                                    <div className="hotel-details">
                                        <h3>{hotel.name}</h3>

                                        <div className="hotel-location">
                                            <MapPin size={16} strokeWidth={1.5} />
                                            <span>{hotel.location}</span>
                                        </div>

                                        <div className="hotel-distance">
                                            <span>{hotel.distance}</span>
                                        </div>

                                        <div className="divider"></div>

                                        <div className="hotel-amenities">
                                            {hotel.amenities.map((amenity, index) => (
                                                <span key={index} className="amenity">
                                                    {renderAmenityIcon(amenity)}
                                                    <span className="amenity-text">{amenity}</span>
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="hotel-footer">
                                        <div className="reviews">
                                            <span className="review-count">
                                                {hotel.reviews} {t('hotelReservation.guestReviews')}
                                            </span>
                                        </div>
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

export default HotelReservation;