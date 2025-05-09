import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './TopDestinations.scss';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../context/LanguageContext';

// Import Swiper and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import istanbul from '../../../assets/images/topDestinations/istanbul.jpg';
import dubai from '../../../assets/images/topDestinations/dubai.jpg';
import beirut from '../../../assets/images/topDestinations/beirut.webp';
import cairo from '../../../assets/images/topDestinations/cairo.jpg';
import amman from '../../../assets/images/topDestinations/amman.jpg';
import athens from '../../../assets/images/topDestinations/athens.jpg';
import moscow from '../../../assets/images/topDestinations/moscow.jpg';
import doha from '../../../assets/images/topDestinations/doha.webp';

const TopDestinations = () => {
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

    // Get destinations from translations
    const destinations = t('topDestinations.destinations', { returnObjects: true }) || [];

    // Add images to destinations
    const imageMapping = {
        1: istanbul,  // Istanbul
        2: dubai,     // Dubai
        3: beirut,    // Beirut
        4: cairo,     // Cairo
        5: amman,     // Amman
        6: athens,    // Athens
        7: moscow,    // Moscow
        8: doha       // Doha
    };

    // Function to get the appropriate image based on destination
    const getImageByDestination = (destination) => {
        // First try by ID
        if (imageMapping[destination.id]) {
            return imageMapping[destination.id];
        }

        // Alternative matching by city name if needed
        const cityNameLower = destination.city.toLowerCase();
        if (cityNameLower === "istanbul") return istanbul;
        if (cityNameLower === "dubai") return dubai;
        if (cityNameLower === "beirut") return beirut;
        if (cityNameLower === "cairo") return cairo;
        if (cityNameLower === "amman") return amman;
        if (cityNameLower === "athens") return athens;
        if (cityNameLower === "moscow") return moscow;
        if (cityNameLower === "doha") return doha;

        // Default fallback
        return istanbul; // Changed from sampleImage to istanbul for a fallback
    };

    // Add images to destinations using the mapping
    const destinationsWithImages = destinations.map(destination => ({
        ...destination,
        image: getImageByDestination(destination)
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
                    <h2 className="section-title">{t('topDestinations.title')}</h2>
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
                </div>
            </div>
        </section>
    );
};

export default TopDestinations;