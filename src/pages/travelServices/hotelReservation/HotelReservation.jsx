import React, { useState, useEffect } from 'react';
import { MapPin, Wifi, Coffee, Waves, Utensils, Dumbbell, Bus, Star, ChevronRight } from 'lucide-react';
import './HotelReservation.scss';
import fourseasons from '../../../assets/images/travelServices/hotels/fourseasons.jpg'
import beitAlwali from '../../../assets/images/travelServices/hotels/beit-alwali.jpg'
import lattakiaCham from '../../../assets/images/travelServices/hotels/cham-lattakia.jpg'
import palmyra from '../../../assets/images/travelServices/hotels/palmyra.jpg'

const HotelReservation = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [filteredHotels, setFilteredHotels] = useState([]);

    // Syrian hotels data with categories for filtering
    const hotels = [
        {
            id: 1,
            name: 'Four Seasons Hotel Damascus',
            image: fourseasons,
            rating: 4.8,
            reviews: 287,
            location: 'Damascus Old City',
            distance: '30 km from Damascus International Airport',
            categories: ['Damascus', 'Historic'],
            amenities: ['Free Wi-Fi', 'Breakfast included', 'Swimming pool', 'Spa', 'Restaurant']
        },
        {
            id: 2,
            name: 'Beit Al-Wali Heritage Hotel',
            image:
                beitAlwali,
            rating: 4.6,
            reviews: 156,
            location: 'Old Aleppo',
            distance: '5 km from Aleppo center',
            categories: ['Aleppo'],
            amenities: ['Free Wi-Fi', 'Traditional breakfast', 'Historic architecture', 'Courtyard']
        },
        {
            id: 3,
            name: 'Cham Palace Lattakia',
            image: lattakiaCham,
            rating: 4.4,
            reviews: 203,
            location: 'Lattakia Corniche',
            distance: '2 km from Lattakia city center',
            categories: ['Coastal'],
            amenities: ['Sea view', 'Free Wi-Fi', 'Restaurant', 'Beach access', 'Pool']
        },
        {
            id: 4,
            name: 'Dedeman Palmyra Hotel',
            image: palmyra,
            rating: 4.3,
            reviews: 176,
            location: 'Palmyra',
            distance: '1 km from ancient ruins',
            categories: ['Historic'],
            amenities: ['Archaeological tours', 'Free Wi-Fi', 'Restaurant', 'Desert views']
        }
    ];

    // Filter categories
    const filterCategories = [
        { id: 'all', name: 'All Properties' },
        { id: 'Damascus', name: 'Damascus' },
        { id: 'Aleppo', name: 'Aleppo' },
        { id: 'Coastal', name: 'Coastal' },
        { id: 'Historic', name: 'Historic' }
    ];

    // Apply filters whenever the active filter changes
    useEffect(() => {
        if (activeFilter === 'all') {
            setFilteredHotels(hotels);
        } else {
            const filtered = hotels.filter(hotel =>
                hotel.categories.includes(activeFilter)
            );
            setFilteredHotels(filtered);
        }
    }, [activeFilter]);

    // Function to handle filter changes
    const handleFilterChange = (filterId) => {
        setActiveFilter(filterId);
    };

    // Function to render amenity icons
    const renderAmenityIcon = (amenity) => {
        if (amenity.includes('Wi-Fi')) return <Wifi size={14} strokeWidth={1.5} />;
        if (amenity.includes('Breakfast')) return <Coffee size={14} strokeWidth={1.5} />;
        if (amenity.includes('Swimming') || amenity.includes('Pool')) return <Waves size={14} strokeWidth={1.5} />;
        if (amenity.includes('Restaurant')) return <Utensils size={14} strokeWidth={1.5} />;
        if (amenity.includes('Fitness') || amenity.includes('Gym')) return <Dumbbell size={14} strokeWidth={1.5} />;
        if (amenity.includes('Airport') || amenity.includes('tours')) return <Bus size={14} strokeWidth={1.5} />;
        return null;
    };

    // Animation classes for filter results
    const getFilterResultsClass = () => {
        return filteredHotels.length > 0 ? "hotels-list" : "hotels-list no-results";
    };

    return (
        <div className="hotel-section">
            <div className="hotels-container">
                <header className="section-header">
                    <h2>Exceptional Accommodations</h2>
                    <p>Discover our curated selection of premium hotels and heritage properties in Syria's most historic and scenic locations</p>
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
                        <p>No properties match the selected filter. Please try another category.</p>
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
                                            {hotel.categories.find(cat => ['Damascus', 'Aleppo'].includes(cat)) || hotel.categories[0]}
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
                                            <span className="review-count">{hotel.reviews} guest reviews</span>
                                        </div>
                                        {/* <button className="details-button">
                                            <span>View Details</span>
                                            <ChevronRight size={16} strokeWidth={1.5} />
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div >
    );
};

export default HotelReservation;