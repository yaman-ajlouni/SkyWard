import React, { useEffect, useState } from 'react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import './ExploreSyria.scss';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';

// Import Swiper and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Import sample image (replace with real images)
import sampleImage from '../../assets/images/damascus.jpg';
import golden from '../../assets/images/explore/exp-golden.jpg';
import damascus from '../../assets/images/explore/exp-damascus.webp';
import aleppo from '../../assets/images/explore/exp-aleppo.jpg';
import palmyra from '../../assets/images/explore/exp-palmyra.jpg';
import arwad from '../../assets/images/explore/exp-arwad.jpg';
import hama from '../../assets/images/explore/exp-hama.jpg';
import busra from '../../assets/images/explore/exp-busra.webp';
import hoson from '../../assets/images/explore/exp-hoson.jpg';

const ExploreSyria = () => {
    const { t } = useTranslation();
    const { dir } = useLanguage();
    const isRTL = dir === 'rtl';
    const prevRef = React.useRef(null);
    const nextRef = React.useRef(null);

    // Add a key state to force re-render when language changes
    const [swiperKey, setSwiperKey] = useState(0);

    // Update key when direction changes to force re-render
    useEffect(() => {
        setSwiperKey(prevKey => prevKey + 1);
    }, [dir]);

    // Get locations from translations
    const exploreLocations = t('exploreSyria.locations', { returnObjects: true }) || [];

    const imageMapping = {
        // Map by ID
        1: golden,  // Lattakia - Holiday Beach Hotel
        2: damascus,  // Damascus - Old City Experience
        3: aleppo,  // Aleppo - Ancient Citadel Tour
        4: palmyra,  // Palmyra - Historical Ruins
        5: arwad,  // Tartus - Arwad Island Getaway
        6: hoson,        // Homs - Krak des Chevaliers
        7: busra,        // Busra - Roman Amphitheater
        8: hama,         // Hama - Water Wheels Experience
    };

    // Alternative mapping by title or combination of attributes if needed
    const getImageByLocation = (location) => {
        // First try to get by ID
        if (imageMapping[location.id]) {
            return imageMapping[location.id];
        }

        // Fallback logic if needed
        if (location.city === "Lattakia" || location.title.includes("Holiday Beach")) return golden;
        if (location.city === "Damascus" || location.title.includes("Old City")) return damascus;
        if (location.city === "Aleppo" || location.title.includes("Citadel")) return aleppo;
        if (location.city === "Palmyra" || location.title.includes("Historical Ruins")) return palmyra;
        if (location.city === "Tartus" || location.title.includes("Arwad Island")) return arwad;
        if (location.city === "Homs" || location.title.includes("Krak des Chevaliers")) return hoson;
        if (location.city === "Busra" || location.title.includes("Roman Amphitheater")) return busra;
        if (location.city === "Hama" || location.title.includes("Water Wheels")) return hama;

        // Default fallback
        return sampleImage;
    };

    // Add images to locations using the mapping
    const locationsWithImages = exploreLocations.map(location => ({
        ...location,
        image: getImageByLocation(location),
    }));

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
        <section className={`explore-syria-section ${dir}`}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{t('exploreSyria.title')}</h2>
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
            </div>
        </section>
    );
};

export default ExploreSyria;