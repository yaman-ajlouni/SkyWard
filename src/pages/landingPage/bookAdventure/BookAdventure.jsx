import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import './BookAdventure.scss';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../context/LanguageContext';

// Import Swiper and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Import adventure images (Syria only)
import damascusMosque from '../../../assets/images/book/book-umayyad.jpg';
import aleppoCitadel from '../../../assets/images/book/book-aleppo.jpg';
import palmyraRuins from '../../../assets/images/book/book-palmyra.jpg';
import lattakiaBeach from '../../../assets/images/book/book-lattakia.jpg';
import homsKrak from '../../../assets/images/book/book-hoson.webp';
import tartusArwad from '../../../assets/images/book/book-arwad.jpg';

// Default adventures data in case translations fail
const defaultAdventures = [
    { id: 1, city: "Damascus", title: "Visit Umayyad Mosque", price: 200 },
    { id: 2, city: "Aleppo", title: "Explore the Ancient Citadel", price: 180 },
    { id: 3, city: "Palmyra", title: "Ancient Ruins Tour", price: 250 },
    { id: 4, city: "Lattakia", title: "Beach Day Experience", price: 150 },
    { id: 5, city: "Homs", title: "Krak des Chevaliers Tour", price: 220 },
    { id: 6, city: "Tartus", title: "Arwad Island Boat Trip", price: 160 }
];

const BookAdventure = () => {
    const { t } = useTranslation();
    const { dir } = useLanguage();
    const isRTL = dir === 'rtl';
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    // Add a key state to force re-render when language changes
    const [swiperKey, setSwiperKey] = useState(0);

    // Update key when direction changes to force re-render
    useEffect(() => {
        setSwiperKey(prevKey => prevKey + 1);
    }, [dir]);

    // Get section title
    const getSectionTitle = () => {
        return t('bookAdventures.title') || "Book your next adventure in Syria";
    };

    // Get adventures
    const getAdventures = () => {
        try {
            const adventuresData = t('bookAdventures.adventures', { returnObjects: true });
            return Array.isArray(adventuresData) ? adventuresData : defaultAdventures;
        } catch (error) {
            console.error("Error getting adventures data:", error);
            return defaultAdventures;
        }
    };

    const adventures = getAdventures();

    // Image mapping for Syria adventures
    const imageMapping = {
        1: damascusMosque,   // Damascus - Visit Umayyad Mosque
        2: aleppoCitadel,    // Aleppo - Explore the Ancient Citadel
        3: palmyraRuins,     // Palmyra - Ancient Ruins Tour
        4: lattakiaBeach,    // Lattakia - Beach Day Experience
        5: homsKrak,         // Homs - Krak des Chevaliers Tour
        6: tartusArwad       // Tartus - Arwad Island Boat Trip
    };

    // Function to get the appropriate image based on adventure
    const getImageByAdventure = (adventure) => {
        if (!adventure) return damascusMosque;

        // First try to get by ID
        if (imageMapping[adventure.id]) {
            return imageMapping[adventure.id];
        }

        // Fallback based on city names or titles
        const cityNameLower = adventure.city ? adventure.city.toLowerCase() : '';
        const titleLower = adventure.title ? adventure.title.toLowerCase() : '';

        if (cityNameLower.includes("damascus") || titleLower.includes("mosque")) return damascusMosque;
        if (cityNameLower.includes("aleppo") || titleLower.includes("citadel")) return aleppoCitadel;
        if (cityNameLower.includes("palmyra") || titleLower.includes("ruins")) return palmyraRuins;
        if (cityNameLower.includes("lattakia") || titleLower.includes("beach")) return lattakiaBeach;
        if (cityNameLower.includes("homs") || titleLower.includes("krak")) return homsKrak;
        if (cityNameLower.includes("tartus") || titleLower.includes("arwad") || titleLower.includes("boat")) return tartusArwad;

        // Default fallback
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
                        <p>No adventures available for Syria.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BookAdventure;