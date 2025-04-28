import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './TopDestinations.scss';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';

// Import sample image (replace with real images)
import sampleImage from '../../assets/images/damascus.jpg';

const TopDestinations = () => {
    const { t } = useTranslation();
    const { dir } = useLanguage();
    const sliderRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    const [cardWidth, setCardWidth] = useState(360);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const isRTL = dir === 'rtl';

    // Get destinations from translations
    const destinations = t('topDestinations.destinations', { returnObjects: true }) || [];

    // Add images to destinations
    const destinationsWithImages = destinations.map(destination => ({
        ...destination,
        image: sampleImage
    }));

    // Update card width based on viewport
    useEffect(() => {
        const updateSizes = () => {
            const width = window.innerWidth;
            setViewportWidth(width);

            // Adjust card width based on screen size
            if (width <= 576) { // Mobile
                setCardWidth(240);
            } else if (width <= 768) { // Tablet
                setCardWidth(280);
            } else if (width <= 1024) { // Small desktop
                setCardWidth(320);
            } else { // Large desktop
                setCardWidth(360);
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

    // In RTL mode, we keep the left arrow functionality to move left and right arrow to move right
    const handleLeftArrowClick = () => {
        if (!sliderRef.current) return;

        const scrollAmount = getScrollAmount();

        // Both in RTL and LTR modes, left arrow scrolls left
        sliderRef.current.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    };

    // Handle right arrow click
    const handleRightArrowClick = () => {
        if (!sliderRef.current) return;

        const scrollAmount = getScrollAmount();

        // Both in RTL and LTR modes, right arrow scrolls right
        sliderRef.current.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    };

    return (
        <section className={`top-destinations-section ${dir}`}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{t('topDestinations.title')}</h2>
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
                    className="destination-slider"
                    ref={sliderRef}
                    onScroll={handleScroll}
                >
                    {destinationsWithImages.map(destination => (
                        <div className="destination-card" key={destination.id}>
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopDestinations;