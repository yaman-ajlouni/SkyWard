import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import './BookAdventure.scss';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';

// Import sample image (replace with real images)
import sampleImage from '../../assets/images/damascus.jpg';

const BookAdventure = () => {
    const { t } = useTranslation();
    const { dir } = useLanguage();
    const sliderRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    const [cardWidth, setCardWidth] = useState(450);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const isRTL = dir === 'rtl';

    // Get adventures from translations
    const adventures = t('bookAdventures.adventures', { returnObjects: true }) || [];

    // Add images to adventures
    const adventuresWithImages = adventures.map(adventure => ({
        ...adventure,
        image: sampleImage
    }));

    // Update card width based on viewport
    useEffect(() => {
        const updateSizes = () => {
            const width = window.innerWidth;
            setViewportWidth(width);

            // Adjust card width based on screen size
            if (width <= 576) { // Mobile
                setCardWidth(270);
            } else if (width <= 768) { // Tablet
                setCardWidth(350);
            } else if (width <= 1024) { // Small desktop
                setCardWidth(400);
            } else { // Large desktop
                setCardWidth(450);
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
        <section className={`book-adventure-section ${dir}`}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{t('bookAdventures.title')}</h2>
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
                    className="adventure-slider"
                    ref={sliderRef}
                    onScroll={handleScroll}
                >
                    {adventuresWithImages.map(adventure => (
                        <div className="adventure-card" key={adventure.id}>
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BookAdventure;