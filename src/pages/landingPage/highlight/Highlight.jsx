import React from 'react';
import './Highlight.scss';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../context/LanguageContext';
import { useLocation } from '../../../context/LocationContext';

// Import highlight images - we'll reuse these for all locations
import damascus from '../../../assets/images/highlights/high-damascus.jpg';
import hoson from '../../../assets/images/highlights/high-hoson.jpg';
import palmyra from '../../../assets/images/highlights/high-palmyra.jpg';
import lattakia from '../../../assets/images/highlights/high-lattakia.jpg';

import istanbul from '../../../assets/images/highlights/turkey/istanbul.webp';
import cappadocia from '../../../assets/images/highlights/turkey/cappadocia.webp';
import pamukkale from '../../../assets/images/highlights/turkey/pamukkale.jpg';
import turquoise from '../../../assets/images/highlights/turkey/turquoise.webp';

// Default highlight data in case translations fail
const defaultHighlights = {
    syria: [
        {
            id: 1,
            title: "Ancient City of Damascus",
            description: "Explore one of the oldest continuously inhabited cities in the world"
        },
        {
            id: 2,
            title: "Krak des Chevaliers",
            description: "Visit the most iconic Crusader castle in the world"
        },
        {
            id: 3,
            title: "Palmyra Ruins",
            description: "Discover the ancient desert oasis city"
        },
        {
            id: 4,
            title: "Mediterranean Coastline",
            description: "Relax on Syria's beautiful beaches and coastal towns"
        }
    ],
    turkey: [
        {
            id: 1,
            title: "Historic Istanbul",
            description: "Explore the vibrant city where East meets West"
        },
        {
            id: 2,
            title: "Cappadocia",
            description: "Experience the magical landscapes and hot air balloon rides"
        },
        {
            id: 3,
            title: "Pamukkale Terraces",
            description: "Visit the stunning white calcium pools"
        },
        {
            id: 4,
            title: "Turquoise Coast",
            description: "Sail along the beautiful Mediterranean shoreline"
        }
    ],
    lebanon: [
        {
            id: 1,
            title: "Vibrant Beirut",
            description: "Experience the energetic capital known for its nightlife and culture"
        },
        {
            id: 2,
            title: "Ancient Baalbek",
            description: "Explore the most impressive Roman temple complex in the Middle East"
        },
        {
            id: 3,
            title: "Jeita Grotto",
            description: "Discover the spectacular limestone cave system"
        },
        {
            id: 4,
            title: "Cedar Forests",
            description: "Visit Lebanon's iconic cedar trees in the beautiful mountains"
        }
    ]
};

const Highlight = () => {
    const { t } = useTranslation();
    const { dir } = useLanguage();
    const { location } = useLocation(); // Get the current location

    // Get section title based on location
    const getSectionTitle = () => {
        switch (location) {
            case 'turkey':
                return t('highlight.turkeyTitle') || "Highlights of Turkey";
            case 'lebanon':
                return t('highlight.lebanonTitle') || "Highlights of Lebanon";
            case 'syria':
            default:
                return t('highlight.title') || "Highlights of Syria";
        }
    };

    // Get highlights based on the selected location
    const getHighlights = () => {
        try {
            let highlightsData;

            switch (location) {
                case 'syria':
                    highlightsData = t('highlight.items', { returnObjects: true });
                    return Array.isArray(highlightsData) ? highlightsData : defaultHighlights.syria;
                case 'turkey':
                    highlightsData = t('highlight.turkeyItems', { returnObjects: true });
                    return Array.isArray(highlightsData) ? highlightsData : defaultHighlights.turkey;
                case 'lebanon':
                    highlightsData = t('highlight.lebanonItems', { returnObjects: true });
                    return Array.isArray(highlightsData) ? highlightsData : defaultHighlights.lebanon;
                default:
                    highlightsData = t('highlight.items', { returnObjects: true });
                    return Array.isArray(highlightsData) ? highlightsData : defaultHighlights.syria;
            }
        } catch (error) {
            console.error("Error getting highlights data:", error);
            return defaultHighlights[location] || defaultHighlights.syria;
        }
    };

    const highlights = getHighlights();

    // Create image mappings for each location
    const syriaImageMapping = {
        1: damascus,    // Damascus
        2: hoson,       // Krak des Chevaliers
        3: palmyra,     // Palmyra
        4: lattakia     // Mediterranean Coastline
    };

    const turkeyImageMapping = {
        1: istanbul,    // Istanbul (reusing Damascus image)
        2: cappadocia,     // Cappadocia (reusing Palmyra image)
        3: pamukkale,    // Pamukkale (reusing Lattakia image)
        4: turquoise        // Turquoise Coast (reusing Hoson image)
    };

    const lebanonImageMapping = {
        1: hoson,       // Beirut (reusing Hoson image)
        2: damascus,    // Baalbek (reusing Damascus image)
        3: palmyra,     // Jeita Grotto (reusing Palmyra image)
        4: lattakia     // Cedar Forests (reusing Lattakia image)
    };

    // Get the right image mapping based on location
    const getImageMapping = () => {
        switch (location) {
            case 'turkey':
                return turkeyImageMapping;
            case 'lebanon':
                return lebanonImageMapping;
            case 'syria':
            default:
                return syriaImageMapping;
        }
    };

    const imageMapping = getImageMapping();

    // Function to get the appropriate image based on highlight
    const getImageByHighlight = (highlight) => {
        if (!highlight) return damascus;

        // First try to get by ID
        if (imageMapping[highlight.id]) {
            return imageMapping[highlight.id];
        }

        // Location-specific fallback logic by title content
        const titleLower = highlight.title ? highlight.title.toLowerCase() : '';

        if (location === 'syria') {
            if (titleLower.includes("damascus")) return damascus;
            if (titleLower.includes("krak") || titleLower.includes("chevaliers")) return hoson;
            if (titleLower.includes("palmyra")) return palmyra;
            if (titleLower.includes("mediterranean") || titleLower.includes("coastline")) return lattakia;
        } else if (location === 'turkey') {
            if (titleLower.includes("istanbul")) return damascus;
            if (titleLower.includes("cappadocia")) return palmyra;
            if (titleLower.includes("pamukkale")) return lattakia;
            if (titleLower.includes("turquoise") || titleLower.includes("coast")) return hoson;
        } else if (location === 'lebanon') {
            if (titleLower.includes("beirut")) return hoson;
            if (titleLower.includes("baalbek")) return damascus;
            if (titleLower.includes("jeita") || titleLower.includes("grotto")) return palmyra;
            if (titleLower.includes("cedar") || titleLower.includes("forest")) return lattakia;
        }

        // Default fallback based on location
        return damascus;
    };

    // Add images to highlights using the mapping
    const highlightsWithImages = Array.isArray(highlights)
        ? highlights.map(highlight => ({
            ...highlight,
            image: getImageByHighlight(highlight)
        }))
        : [];

    return (
        <section className={`highlights-section ${dir}`}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{getSectionTitle()}</h2>
                </div>

                {highlightsWithImages.length > 0 ? (
                    <div className="highlights-grid">
                        {highlightsWithImages.map((highlight, index) => (
                            <div
                                className={`highlight-item item-${index + 1}`}
                                key={highlight.id || index}
                            >
                                <div className="highlight-image">
                                    <div className="image-overlay"></div>
                                    <img src={highlight.image} alt={highlight.title} />
                                </div>
                                <div className="highlight-content">
                                    <h3>{highlight.title}</h3>
                                    <p>{highlight.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-highlights-message">
                        <p>No highlights available for this location.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Highlight;