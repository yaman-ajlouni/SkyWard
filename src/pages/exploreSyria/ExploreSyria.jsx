import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import './ExploreSyria.scss';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';

// Import sample image (replace with real images)
import sampleImage from '../../assets/images/damascus.jpg';

const ExploreSyria = () => {
    const { t } = useTranslation();
    const { dir } = useLanguage();
    const sliderRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    const [cardWidth, setCardWidth] = useState(600);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const isRTL = dir === 'rtl';

    // Get locations from translations
    const exploreLocations = t('exploreSyria.locations', { returnObjects: true }) || [];
    
    // Add images to locations
    const locationsWithImages = exploreLocations.map(location => ({
        ...location,
        image: sampleImage
    }));

    // Update card width and max scroll based on viewport
    useEffect(() => {
        const updateSizes = () => {
            const width = window.innerWidth;
            setViewportWidth(width);
            
            // Adjust card width based on screen size
            if (width <= 576) { // Mobile
                setCardWidth(200);
            } else if (width <= 768) { // Tablet
                setCardWidth(240);
            } else if (width <= 1024) { // Small desktop
                setCardWidth(280);
            } else { // Large desktop
                setCardWidth(600);
            }
        };
        
        updateSizes();
        window.addEventListener('resize', updateSizes);
        
        return () => {
            window.removeEventListener('resize', updateSizes);
        };
    }, []);

    // Update maxScroll when component mounts, window resizes, or cardWidth changes
    useEffect(() => {
        const updateMaxScroll = () => {
            if (sliderRef.current) {
                const containerWidth = sliderRef.current.clientWidth;
                const scrollWidth = sliderRef.current.scrollWidth;
                const newMaxScroll = Math.max(0, scrollWidth - containerWidth);
                setMaxScroll(newMaxScroll);
                
                // Also update current scroll position
                setScrollPosition(sliderRef.current.scrollLeft);
            }
        };

        // Initial update
        updateMaxScroll();
        
        // Add event listeners
        window.addEventListener('resize', updateMaxScroll);
        
        // Create resize observer
        const resizeObserver = new ResizeObserver(updateMaxScroll);
        if (sliderRef.current) {
            resizeObserver.observe(sliderRef.current);
        }

        return () => {
            window.removeEventListener('resize', updateMaxScroll);
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    }, [cardWidth, viewportWidth, isRTL]);

    // Handle slider scroll
    const handleScroll = () => {
        if (sliderRef.current) {
            setScrollPosition(sliderRef.current.scrollLeft);
        }
    };

    // Calculate scroll amount based on card width
    const getScrollAmount = () => {
        return Math.max(300, cardWidth * 1.5);
    };

    // Determine if we can scroll in each direction (for LTR mode only)
    const canScrollPrev = !isRTL && scrollPosition > 0;
    const canScrollNext = !isRTL && scrollPosition < maxScroll;

    // In RTL mode, we swap the functionality of the arrows but keep their visual positions
    const handleLeftArrowClick = () => {
        if (!sliderRef.current) return;
        
        const scrollAmount = getScrollAmount();
        
        if (isRTL) {
            // In RTL, the left arrow should move content left (decrease scrollLeft)
            sliderRef.current.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        } else {
            // In LTR, the left arrow moves content left (decrease scrollLeft)
            sliderRef.current.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // Handle right arrow click
    const handleRightArrowClick = () => {
        if (!sliderRef.current) return;
        
        const scrollAmount = getScrollAmount();
        
        if (isRTL) {
            // In RTL, the right arrow should move content right (increase scrollLeft)
            sliderRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        } else {
            // In LTR, the right arrow moves content right (increase scrollLeft)
            sliderRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className={`explore-syria-section ${dir}`}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{t('exploreSyria.title')}</h2>
                    <div className="navigation-arrows">
                        <button
                            className={`nav-arrow ${!isRTL && !canScrollPrev ? 'disabled' : ''}`}
                            onClick={handleLeftArrowClick}
                            disabled={!isRTL && !canScrollPrev}
                            aria-label="Previous"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            className={`nav-arrow ${!isRTL && !canScrollNext ? 'disabled' : ''}`}
                            onClick={handleRightArrowClick}
                            disabled={!isRTL && !canScrollNext}
                            aria-label="Next"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div
                    className="location-slider"
                    ref={sliderRef}
                    onScroll={handleScroll}
                >
                    {locationsWithImages.map((location, index) => (
                        <div 
                            className={`location-card ${index === 0 ? 'first-card' : ''} ${index === locationsWithImages.length - 1 ? 'last-card' : ''}`}
                            key={location.id}
                        >
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExploreSyria;