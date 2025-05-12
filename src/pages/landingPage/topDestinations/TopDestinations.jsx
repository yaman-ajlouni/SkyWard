import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './TopDestinations.scss';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../context/LanguageContext';
import { useLocation } from '../../../context/LocationContext';

// Import Swiper and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Import destination images
import istanbul from '../../../assets/images/topDestinations/istanbul.jpg';
import dubai from '../../../assets/images/topDestinations/dubai.jpg';
import beirut from '../../../assets/images/topDestinations/beirut.webp';
import cairo from '../../../assets/images/topDestinations/cairo.jpg';
import amman from '../../../assets/images/topDestinations/amman.jpg';
import athens from '../../../assets/images/topDestinations/athens.jpg';
import moscow from '../../../assets/images/topDestinations/moscow.jpg';
import doha from '../../../assets/images/topDestinations/doha.webp';
import damascus from '../../../assets/images/topDestinations/damascus.webp';

// Default destinations data in case translations fail
const defaultDestinations = {
    syria: [
        { id: 1, city: "Istanbul", country: "Turkey", price: 400 },
        { id: 2, city: "Dubai", country: "UAE", price: 550 },
        { id: 3, city: "Beirut", country: "Lebanon", price: 250 },
        { id: 4, city: "Cairo", country: "Egypt", price: 350 }
    ],
    turkey: [
        { id: 1, city: "Damascus", country: "Syria", price: 350 },
        { id: 2, city: "Dubai", country: "UAE", price: 500 },
        { id: 3, city: "Cairo", country: "Egypt", price: 450 },
        { id: 4, city: "Beirut", country: "Lebanon", price: 300 }
    ],
    lebanon: [
        { id: 1, city: "Damascus", country: "Syria", price: 250 },
        { id: 2, city: "Istanbul", country: "Turkey", price: 350 },
        { id: 3, city: "Cairo", country: "Egypt", price: 400 },
        { id: 4, city: "Dubai", country: "UAE", price: 550 }
    ]
};

const TopDestinations = () => {
    const { t } = useTranslation();
    const { dir } = useLanguage();
    const { location } = useLocation(); // Get the current location
    const isRTL = dir === 'rtl';
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    // Add a key state to force re-render when language or location changes
    const [swiperKey, setSwiperKey] = useState(0);

    // Update key when direction or location changes to force re-render
    useEffect(() => {
        setSwiperKey(prevKey => prevKey + 1);
    }, [dir, location]);

    // Get section title based on location
    const getSectionTitle = () => {
        switch(location) {
            case 'syria':
                return t('topDestinations.title') || "Top Destinations From Syria";
            case 'turkey':
                return t('topDestinations.turkeyTitle') || "Top Destinations From Turkey";
            case 'lebanon':
                return t('topDestinations.lebanonTitle') || "Top Destinations From Lebanon";
            default:
                return t('topDestinations.title') || "Top Destinations From Syria";
        }
    };

    // Get destinations based on the selected location
    const getDestinations = () => {
        try {
            let destinationsData;
            
            switch(location) {
                case 'syria':
                    destinationsData = t('topDestinations.destinations', { returnObjects: true });
                    return Array.isArray(destinationsData) ? destinationsData : defaultDestinations.syria;
                case 'turkey':
                    destinationsData = t('topDestinations.turkeyDestinations', { returnObjects: true });
                    return Array.isArray(destinationsData) ? destinationsData : defaultDestinations.turkey;
                case 'lebanon':
                    destinationsData = t('topDestinations.lebanonDestinations', { returnObjects: true });
                    return Array.isArray(destinationsData) ? destinationsData : defaultDestinations.lebanon;
                default:
                    destinationsData = t('topDestinations.destinations', { returnObjects: true });
                    return Array.isArray(destinationsData) ? destinationsData : defaultDestinations.syria;
            }
        } catch (error) {
            console.error("Error getting destinations data:", error);
            return defaultDestinations[location] || defaultDestinations.syria;
        }
    };

    const destinations = getDestinations();

    // Image mappings for each location
    // For Syria destinations
    const syriaImageMapping = {
        1: istanbul,  // Istanbul
        2: dubai,     // Dubai
        3: beirut,    // Beirut
        4: cairo,     // Cairo
        5: amman,     // Amman
        6: athens,    // Athens
        7: moscow,    // Moscow
        8: doha       // Doha
    };

    // For Turkey destinations - reusing the same images but in a different order
    const turkeyImageMapping = {
        1: damascus,    // Damascus (reusing Athens image)
        2: dubai,     // Dubai
        3: cairo,     // Cairo
        4: beirut,    // Beirut
        5: istanbul,  // Other cities
        6: moscow,    // Other cities
        7: doha,      // Other cities
        8: amman      // Other cities
    };

    // For Lebanon destinations - again reusing images in another arrangement
    const lebanonImageMapping = {
        1: cairo,     // Damascus (reusing Cairo image)
        2: istanbul,  // Istanbul
        3: dubai,     // Dubai
        4: beirut,    // Other cities
        5: amman,     // Other cities
        6: athens,    // Other cities
        7: moscow,    // Other cities 
        8: doha       // Other cities
    };

    // Get the right image mapping based on location
    const getImageMapping = () => {
        switch(location) {
            case 'syria':
                return syriaImageMapping;
            case 'turkey':
                return turkeyImageMapping;
            case 'lebanon':
                return lebanonImageMapping;
            default:
                return syriaImageMapping;
        }
    };

    const imageMapping = getImageMapping();

    // Function to get the appropriate image based on destination
    const getImageByDestination = (destination) => {
        if (!destination) return istanbul;

        // First try by ID
        if (imageMapping[destination.id]) {
            return imageMapping[destination.id];
        }

        // Alternative matching by city name if needed
        const cityNameLower = destination.city ? destination.city.toLowerCase() : '';
        if (cityNameLower.includes("istanbul")) return istanbul;
        if (cityNameLower.includes("dubai")) return dubai;
        if (cityNameLower.includes("beirut")) return beirut;
        if (cityNameLower.includes("cairo")) return cairo;
        if (cityNameLower.includes("amman")) return amman;
        if (cityNameLower.includes("athens")) return athens;
        if (cityNameLower.includes("moscow")) return moscow;
        if (cityNameLower.includes("doha")) return doha;
        if (cityNameLower.includes("damascus")) {
            // Use different images for Damascus based on the selected location
            switch(location) {
                case 'turkey':
                    return athens;
                case 'lebanon':
                    return cairo;
                default:
                    return athens;
            }
        }

        // Default fallback
        return istanbul;
    };

    // Add images to destinations
    const destinationsWithImages = Array.isArray(destinations) 
        ? destinations.map(destination => ({
            ...destination,
            image: getImageByDestination(destination)
          }))
        : [];

    // Determine breakpoints for responsive design
    const getSwiperBreakpoints = () => {
        return {
            0: {
                slidesPerView: 1.2,
                spaceBetween: 8,
            },
            576: {
                slidesPerView: 1.5,
                spaceBetween: 12,
            },
            768: {
                slidesPerView: 2.2,
                spaceBetween: 16,
            },
            1024: {
                slidesPerView: 3.1,
                spaceBetween: 20,
            },
            1440: {
                slidesPerView: 3.8,
                spaceBetween: 24,
            },
        };
    };

    return (
        <section className={`top-destinations-section ${dir}`}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{getSectionTitle()}</h2>
                    <div className="navigation-arrows">
                        <button
                            ref={prevRef}
                            className="nav-arrow prev-arrow"
                            aria-label="Previous"
                        >
                            {isRTL ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
                        </button>
                        <button
                            ref={nextRef}
                            className="nav-arrow next-arrow"
                            aria-label="Next"
                        >
                            {isRTL ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
                        </button>
                    </div>
                </div>

                <div className="destination-slider-container">
                    {destinationsWithImages.length > 0 ? (
                        <Swiper
                            key={swiperKey} // Add key to force complete re-render when language changes
                            modules={[Navigation, A11y]}
                            spaceBetween={24}
                            slidesPerView={3.8}
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            }}
                            onBeforeInit={(swiper) => {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                            }}
                            loop={true}
                            dir={dir}
                            breakpoints={getSwiperBreakpoints()}
                            className="destination-slider"
                        >
                            {destinationsWithImages.map(destination => (
                                <SwiperSlide key={destination.id} className="destination-card">
                                    <div className="card-image">
                                        <img src={destination.image} alt={destination.city} />
                                    </div>
                                    <div className="card-info">
                                        <div className="destination-details">
                                            <h3 className="city">{destination.city}</h3>
                                            <p className="country">{destination.country}</p>
                                        </div>
                                        <p className="price">{t('topDestinations.roundTripFrom')}{destination.price}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="no-destinations-message">
                            <p>No destinations available for this location.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TopDestinations;