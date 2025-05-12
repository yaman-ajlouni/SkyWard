import React, { useEffect, useState } from 'react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import './ExploreSyria.scss';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../context/LanguageContext';
import { useLocation } from '../../../context/LocationContext';

// Import Swiper and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Import Syria images
import golden from '../../../assets/images/explore/exp-golden.jpg';
import damascus from '../../../assets/images/explore/exp-damascus.webp';
import aleppo from '../../../assets/images/explore/exp-aleppo.jpg';
import palmyra from '../../../assets/images/explore/exp-palmyra.jpg';
import arwad from '../../../assets/images/explore/exp-arwad.jpg';
import hama from '../../../assets/images/explore/exp-hama.jpg';
import busra from '../../../assets/images/explore/exp-busra.webp';
import hoson from '../../../assets/images/explore/exp-hoson.jpg';


import blueMosque from '../../../assets/images/explore/turkey/blue-mosque.jpg';
import mediterranean from '../../../assets/images/explore/turkey/mediterranean.jpg';
import hot from '../../../assets/images/explore/turkey/hot.jpg';
import aegean from '../../../assets/images/explore/turkey/aegean.webp';
import thermal from '../../../assets/images/explore/turkey/thermal.jpg';
import ancient from '../../../assets/images/explore/turkey/ancient.webp';
import harbor from '../../../assets/images/explore/turkey/harbor.jpg';
import capital from '../../../assets/images/explore/turkey/capital.jpg';

// Default location data if translations fail
const defaultLocations = {
    syria: [
        {
            id: 1,
            city: "Lattakia City",
            title: "Golden Beach Hotel"
        },
        {
            id: 2,
            city: "Damascus",
            title: "Old City Experience"
        },
        {
            id: 3,
            city: "Aleppo",
            title: "Ancient Citadel Tour"
        },
        {
            id: 4,
            city: "Palmyra",
            title: "Historical Ruins"
        }
    ],
    turkey: [
        {
            id: 1,
            city: "Istanbul",
            title: "Blue Mosque Tour"
        },
        {
            id: 2,
            city: "Antalya",
            title: "Mediterranean Beach Resort"
        },
        {
            id: 3,
            city: "Cappadocia",
            title: "Hot Air Balloon Adventure"
        },
        {
            id: 4,
            city: "Bodrum",
            title: "Aegean Coast Experience"
        }
    ],
    lebanon: [
        {
            id: 1,
            city: "Beirut",
            title: "Downtown Experience"
        },
        {
            id: 2,
            city: "Byblos",
            title: "Ancient Port City"
        },
        {
            id: 3,
            city: "Baalbek",
            title: "Roman Temple Complex"
        },
        {
            id: 4,
            city: "Tripoli",
            title: "Old Souk and Citadel"
        }
    ]
};

const ExploreSyria = () => {
    const { t } = useTranslation();
    const { dir } = useLanguage();
    const { location } = useLocation(); // Get the current location
    const isRTL = dir === 'rtl';
    const prevRef = React.useRef(null);
    const nextRef = React.useRef(null);

    // Add a key state to force re-render when language or location changes
    const [swiperKey, setSwiperKey] = useState(0);

    // Update key when direction or location changes to force re-render
    useEffect(() => {
        setSwiperKey(prevKey => prevKey + 1);
    }, [dir, location]);

    // Get section title based on selected location
    const getSectionTitle = () => {
        switch(location) {
            case 'syria':
                return t('exploreSyria.title') || "Explore Syria";
            case 'turkey':
                return t('exploreLocations.turkey.title') || "Explore Turkey";
            case 'lebanon':
                return t('exploreLocations.lebanon.title') || "Explore Lebanon";
            default:
                return t('exploreSyria.title') || "Explore Syria";
        }
    };

    // Get locations based on the selected location
    const getExploreLocations = () => {
        try {
            let locationsData;
            
            switch(location) {
                case 'syria':
                    locationsData = t('exploreSyria.locations', { returnObjects: true });
                    return Array.isArray(locationsData) ? locationsData : defaultLocations.syria;
                case 'turkey':
                    locationsData = t('exploreLocations.turkey.locations', { returnObjects: true });
                    return Array.isArray(locationsData) ? locationsData : defaultLocations.turkey;
                case 'lebanon':
                    locationsData = t('exploreLocations.lebanon.locations', { returnObjects: true });
                    return Array.isArray(locationsData) ? locationsData : defaultLocations.lebanon;
                default:
                    locationsData = t('exploreSyria.locations', { returnObjects: true });
                    return Array.isArray(locationsData) ? locationsData : defaultLocations.syria;
            }
        } catch (error) {
            console.error("Error getting locations data:", error);
            return defaultLocations[location] || defaultLocations.syria;
        }
    };

    const exploreLocations = getExploreLocations();

    // Image mappings
    const syriaImageMapping = {
        1: golden,  // Lattakia - Holiday Beach Hotel
        2: damascus,  // Damascus - Old City Experience
        3: aleppo,  // Aleppo - Ancient Citadel Tour
        4: palmyra,  // Palmyra - Historical Ruins
        5: arwad,  // Tartus - Arwad Island Getaway
        6: hoson,   // Homs - Krak des Chevaliers
        7: busra,   // Busra - Roman Amphitheater
        8: hama,    // Hama - Water Wheels Experience
    };

    // For this example, we'll reuse Syria images for Turkey and Lebanon
    // In a real application, you would use actual images for these locations
    const turkeyImageMapping = {
        1: blueMosque,  // Istanbul
        2: mediterranean,    // Antalya
        3: hot,   // Cappadocia
        4: aegean,     // Bodrum
        5: thermal,     // Pamukkale
        6: ancient,     // Ephesus
        7: harbor,      // Izmir
        8: capital,    // Ankara
    };

    const lebanonImageMapping = {
        1: aleppo,    // Beirut
        2: palmyra,   // Byblos
        3: damascus,  // Baalbek
        4: golden,    // Tripoli
        5: hama,      // Tyre
        6: arwad,     // Sidon
        7: busra,     // Jeita Grotto
        8: hoson,     // Bcharre
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

    // Get image by location
    const getImageByLocation = (location) => {
        // First try to get by ID
        if (location && location.id && imageMapping[location.id]) {
            return imageMapping[location.id];
        }

        // Fallback logic for Syria locations
        if (!location) return golden;
        
        if (location.city === "Lattakia" || location.city === "Lattakia City" || 
            (location.title && location.title.includes("Golden Beach"))) return golden;
        if (location.city === "Damascus" || 
            (location.title && location.title.includes("Old City"))) return damascus;
        if (location.city === "Aleppo" || 
            (location.title && location.title.includes("Citadel"))) return aleppo;
        if (location.city === "Palmyra" || 
            (location.title && location.title.includes("Historical Ruins"))) return palmyra;
        if (location.city === "Tartus" || 
            (location.title && location.title.includes("Arwad Island"))) return arwad;
        if (location.city === "Homs" || 
            (location.title && location.title.includes("Krak des Chevaliers"))) return hoson;
        if (location.city === "Busra" || 
            (location.title && location.title.includes("Roman Amphitheater"))) return busra;
        if (location.city === "Hama" || 
            (location.title && location.title.includes("Water Wheels"))) return hama;

        // Default fallback
        return golden;
    };

    // Add images to locations using the mapping
    const locationsWithImages = Array.isArray(exploreLocations) 
        ? exploreLocations.map(location => ({
            ...location,
            image: getImageByLocation(location),
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
                slidesPerView: 2.5,
                spaceBetween: 20,
            },
            1440: {
                slidesPerView: 2.3,
                spaceBetween: 24,
            },
        };
    };

    return (
        <section className={`explore-section ${dir}`} id="explore">
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

                {locationsWithImages.length > 0 ? (
                    <Swiper
                        key={swiperKey} // Add key to force complete re-render when language changes
                        modules={[Navigation, A11y]}
                        spaceBetween={24}
                        slidesPerView={2.3}
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
                        className="location-slider"
                    >
                        {locationsWithImages.map((location) => (
                            <SwiperSlide key={location.id} className="location-card">
                                <div className="card-image">
                                    <img src={location.image} alt={location.title} />
                                    <div className="location-container">
                                        <div className="location-badge">
                                            <MapPin size={16} />
                                            <span>{location.city}</span>
                                        </div>
                                        <h3 className="location-title">{location.title}</h3>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="no-locations-message">
                        <p>No destinations available for this location.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ExploreSyria;