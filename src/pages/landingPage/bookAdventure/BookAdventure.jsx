import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import './BookAdventure.scss';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../context/LanguageContext';
import { useLocation } from '../../../context/LocationContext';

// Import Swiper and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Import adventure images
import damascusMosque from '../../../assets/images/book/book-umayyad.jpg';
import aleppoCitadel from '../../../assets/images/book/book-aleppo.jpg';
import palmyraRuins from '../../../assets/images/book/book-palmyra.jpg';
import lattakiaBeach from '../../../assets/images/book/book-lattakia.jpg';
import homsKrak from '../../../assets/images/book/book-hoson.webp';
import tartusArwad from '../../../assets/images/book/book-arwad.jpg';

import blueMosque from '../../../assets/images/book/turkey/blue-mosque.jpg';
import hot from '../../../assets/images/book/turkey/hot.jpg';
import thermal from '../../../assets/images/book/turkey/thermal.jpg';
import ancient from '../../../assets/images/book/turkey/ancient.jpg';
import beach from '../../../assets/images/book/turkey/beach.webp';
import coastal from '../../../assets/images/book/turkey/coastal.jpg';

// Default adventures data in case translations fail
const defaultAdventures = {
    syria: [
        { id: 1, city: "Damascus", title: "Visit Umayyad Mosque", price: 200 },
        { id: 2, city: "Aleppo", title: "Explore the Ancient Citadel", price: 180 },
        { id: 3, city: "Palmyra", title: "Ancient Ruins Tour", price: 250 },
        { id: 4, city: "Lattakia", title: "Beach Day Experience", price: 150 }
    ],
    turkey: [
        { id: 1, city: "Istanbul", title: "Blue Mosque Tour", price: 180 },
        { id: 2, city: "Cappadocia", title: "Hot Air Balloon Ride", price: 300 },
        { id: 3, city: "Pamukkale", title: "Thermal Pools Experience", price: 220 },
        { id: 4, city: "Antalya", title: "Beach & Ruins Combo Tour", price: 190 }
    ],
    lebanon: [
        { id: 1, city: "Beirut", title: "City Walking Tour", price: 150 },
        { id: 2, city: "Baalbek", title: "Roman Temple Complex Tour", price: 250 },
        { id: 3, city: "Jeita Grotto", title: "Underground Cave Adventure", price: 180 },
        { id: 4, city: "Byblos", title: "Ancient Port City Tour", price: 170 }
    ]
};

const BookAdventure = () => {
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
        switch (location) {
            case 'syria':
                return t('bookAdventures.title') || "Book your next adventure in Syria";
            case 'turkey':
                return t('bookAdventures.turkeyTitle') || "Book your next adventure in Turkey";
            case 'lebanon':
                return t('bookAdventures.lebanonTitle') || "Book your next adventure in Lebanon";
            default:
                return t('bookAdventures.title') || "Book your next adventure in Syria";
        }
    };

    // Get adventures based on the selected location
    const getAdventures = () => {
        try {
            let adventuresData;

            switch (location) {
                case 'syria':
                    adventuresData = t('bookAdventures.adventures', { returnObjects: true });
                    return Array.isArray(adventuresData) ? adventuresData : defaultAdventures.syria;
                case 'turkey':
                    adventuresData = t('bookAdventures.turkeyAdventures', { returnObjects: true });
                    return Array.isArray(adventuresData) ? adventuresData : defaultAdventures.turkey;
                case 'lebanon':
                    adventuresData = t('bookAdventures.lebanonAdventures', { returnObjects: true });
                    return Array.isArray(adventuresData) ? adventuresData : defaultAdventures.lebanon;
                default:
                    adventuresData = t('bookAdventures.adventures', { returnObjects: true });
                    return Array.isArray(adventuresData) ? adventuresData : defaultAdventures.syria;
            }
        } catch (error) {
            console.error("Error getting adventures data:", error);
            return defaultAdventures[location] || defaultAdventures.syria;
        }
    };

    const adventures = getAdventures();

    // Image mapping for Syria adventures
    const syriaImageMapping = {
        1: damascusMosque,   // Damascus - Visit Umayyad Mosque
        2: aleppoCitadel,    // Aleppo - Explore the Ancient Citadel
        3: palmyraRuins,     // Palmyra - Ancient Ruins Tour
        4: lattakiaBeach,    // Lattakia - Beach Day Experience
        5: homsKrak,         // Homs - Krak des Chevaliers Tour
        6: tartusArwad       // Tartus - Arwad Island Boat Trip
    };

    // Image mappings for Turkey adventures - reusing Syria images
    const turkeyImageMapping = {
        1: blueMosque,   // Istanbul - Blue Mosque Tour (using Umayyad Mosque image)
        2: hot,     // Cappadocia - Hot Air Balloon (using Palmyra image)
        3: thermal,    // Pamukkale - Thermal Pools (using Lattakia Beach image)
        4: beach,    // Antalya - Beach & Ruins (using Aleppo Citadel image)
        5: ancient,         // Other locations
        6: coastal       // Other locations
    };

    // Image mappings for Lebanon adventures - reusing Syria images
    const lebanonImageMapping = {
        1: aleppoCitadel,    // Beirut - City Walking Tour (using Aleppo Citadel image)
        2: palmyraRuins,     // Baalbek - Roman Temple Complex (using Palmyra image)
        3: tartusArwad,      // Jeita Grotto - Underground Cave (using Arwad image)
        4: damascusMosque,   // Byblos - Ancient Port City (using Umayyad Mosque image)
        5: homsKrak,         // Other locations
        6: lattakiaBeach     // Other locations
    };

    // Get the right image mapping based on location
    const getImageMapping = () => {
        switch (location) {
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

    // Function to get the appropriate image based on adventure
    const getImageByAdventure = (adventure) => {
        if (!adventure) return damascusMosque;

        // First try to get by ID
        if (imageMapping[adventure.id]) {
            return imageMapping[adventure.id];
        }

        // Location-specific fallback for city names
        const cityNameLower = adventure.city ? adventure.city.toLowerCase() : '';
        const titleLower = adventure.title ? adventure.title.toLowerCase() : '';

        // Common fallbacks across all locations
        if (cityNameLower.includes("damascus") || titleLower.includes("mosque")) return damascusMosque;
        if (cityNameLower.includes("aleppo") || titleLower.includes("citadel")) return aleppoCitadel;
        if (cityNameLower.includes("palmyra") || titleLower.includes("ruins")) return palmyraRuins;
        if (cityNameLower.includes("lattakia") || titleLower.includes("beach")) return lattakiaBeach;
        if (cityNameLower.includes("homs") || titleLower.includes("krak")) return homsKrak;
        if (cityNameLower.includes("tartus") || titleLower.includes("arwad") || titleLower.includes("boat")) return tartusArwad;

        // Location-specific city/title matches
        if (location === 'turkey') {
            if (cityNameLower.includes("istanbul")) return damascusMosque;
            if (cityNameLower.includes("cappadocia") || titleLower.includes("balloon")) return palmyraRuins;
            if (cityNameLower.includes("pamukkale") || titleLower.includes("thermal")) return lattakiaBeach;
            if (cityNameLower.includes("antalya")) return aleppoCitadel;
        } else if (location === 'lebanon') {
            if (cityNameLower.includes("beirut")) return aleppoCitadel;
            if (cityNameLower.includes("baalbek") || titleLower.includes("temple")) return palmyraRuins;
            if (cityNameLower.includes("jeita") || titleLower.includes("grotto") || titleLower.includes("cave")) return tartusArwad;
            if (cityNameLower.includes("byblos") || titleLower.includes("port")) return damascusMosque;
        }

        // Default fallback based on location
        if (location === 'turkey') return damascusMosque;
        if (location === 'lebanon') return aleppoCitadel;
        return damascusMosque;
    };

    // Add images to adventures
    const adventuresWithImages = Array.isArray(adventures)
        ? adventures.map(adventure => ({
            ...adventure,
            image: getImageByAdventure(adventure)
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
                slidesPerView: 1.3,
                spaceBetween: 12,
            },
            768: {
                slidesPerView: 2.1,
                spaceBetween: 16,
            },
            1024: {
                slidesPerView: 2.5,
                spaceBetween: 20,
            },
            1440: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
        };
    };

    return (
        <section className={`book-adventure-section ${dir}`}>
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

                {adventuresWithImages.length > 0 ? (
                    <Swiper
                        key={swiperKey} // Add key to force complete re-render when language changes
                        modules={[Navigation, A11y]}
                        spaceBetween={24}
                        slidesPerView={3}
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
                        className="adventure-slider"
                    >
                        {adventuresWithImages.map(adventure => (
                            <SwiperSlide key={adventure.id} className="adventure-card">
                                <div className="card-image">
                                    <img src={adventure.image} alt={adventure.title} />
                                </div>
                                <div className="card-info">
                                    <div className="info-row">
                                        <div className="location">
                                            <MapPin size={16} />
                                            <span>{adventure.city}</span>
                                        </div>
                                        <div className="price">${adventure.price}</div>
                                    </div>
                                    <div className="info-row">
                                        <h3 className="title">{adventure.title}</h3>
                                        <button className="book-button">{t('bookAdventures.bookNow')}</button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="no-adventures-message">
                        <p>No adventures available for this location.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BookAdventure;