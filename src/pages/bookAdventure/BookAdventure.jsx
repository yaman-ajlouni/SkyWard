import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import './BookAdventure.scss';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';

// Import Swiper and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import damascusMosque from '../../assets/images/book/book-umayyad.jpg';
import aleppoCitadel from '../../assets/images/book/book-aleppo.jpg';
import palmyraRuins from '../../assets/images/book/book-palmyra.jpg';
import lattakiaBeach from '../../assets/images/book/book-lattakia.jpg';
import homsKrak from '../../assets/images/book/book-hoson.webp';
import tartusArwad from '../../assets/images/book/book-arwad.jpg';

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

    // Get adventures from translations
    const adventures = t('bookAdventures.adventures', { returnObjects: true }) || [];

    // Create a mapping between adventure IDs and their corresponding images
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
        // First try to get by ID
        if (imageMapping[adventure.id]) {
            return imageMapping[adventure.id];
        }

        // Complete fallback logic for all adventures
        if (adventure.city === "Damascus" || adventure.title.includes("Umayyad Mosque")) return damascusMosque;
        if (adventure.city === "Aleppo" || adventure.title.includes("Citadel")) return aleppoCitadel;
        if (adventure.city === "Palmyra" || adventure.title.includes("Ruins")) return palmyraRuins;
        if (adventure.city === "Lattakia" || adventure.title.includes("Beach")) return lattakiaBeach;
        if (adventure.city === "Homs" || adventure.title.includes("Krak des Chevaliers")) return homsKrak;
        if (adventure.city === "Tartus" || adventure.title.includes("Arwad")) return tartusArwad;

        // Default fallback
        return damascusMosque;
    };

    // Add images to adventures using the mapping
    const adventuresWithImages = adventures.map(adventure => ({
        ...adventure,
        image: getImageByAdventure(adventure)
    }));

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
                    <h2 className="section-title">{t('bookAdventures.title')}</h2>
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
            </div>
        </section>
    );
};

export default BookAdventure;