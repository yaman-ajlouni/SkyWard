import React from 'react';
import './Highlight.scss';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../context/LanguageContext';

// Import highlight images for Syria
import damascus from '../../../assets/images/highlights/high-damascus.jpg';
import hoson from '../../../assets/images/highlights/high-hoson.jpg';
import palmyra from '../../../assets/images/highlights/high-palmyra.jpg';
import lattakia from '../../../assets/images/highlights/high-lattakia.jpg';

// Default highlight data in case translations fail
const defaultHighlights = [
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
];

const Highlight = () => {
    const { t } = useTranslation();
    const { dir } = useLanguage();

    // Get section title
    const getSectionTitle = () => {
        return t('highlight.title') || "Highlights of Syria";
    };

    // Get Syria highlights
    const getHighlights = () => {
        try {
            const highlightsData = t('highlight.items', { returnObjects: true });
            return Array.isArray(highlightsData) ? highlightsData : defaultHighlights;
        } catch (error) {
            console.error("Error getting highlights data:", error);
            return defaultHighlights;
        }
    };

    const highlights = getHighlights();

    // Syria image mapping
    const imageMapping = {
        1: damascus,    // Damascus
        2: hoson,       // Krak des Chevaliers
        3: palmyra,     // Palmyra
        4: lattakia     // Mediterranean Coastline
    };

    // Function to get the appropriate image based on highlight
    const getImageByHighlight = (highlight) => {
        if (!highlight) return damascus;

        // First try to get by ID
        if (imageMapping[highlight.id]) {
            return imageMapping[highlight.id];
        }

        // Fallback logic by title content
        const titleLower = highlight.title ? highlight.title.toLowerCase() : '';

        if (titleLower.includes("damascus")) return damascus;
        if (titleLower.includes("krak") || titleLower.includes("chevaliers")) return hoson;
        if (titleLower.includes("palmyra")) return palmyra;
        if (titleLower.includes("mediterranean") || titleLower.includes("coastline")) return lattakia;

        // Default fallback
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
                        <p>No highlights available.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Highlight;