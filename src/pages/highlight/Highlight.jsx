import React from 'react';
import './Highlight.scss';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import damascus from '../../assets/images/highlights/high-damascus.jpg';
import hoson from '../../assets/images/highlights/high-hoson.jpg';
import palmyra from '../../assets/images/highlights/high-palmyra.jpg';
import lattakia from '../../assets/images/highlights/high-lattakia.jpg';


const Highlight = () => {
    const { t } = useTranslation();
    const { dir } = useLanguage();

    // Get highlights from translations
    const highlights = t('highlight.items', { returnObjects: true }) || [];

    // Create a mapping between highlight IDs and their corresponding images
    const imageMapping = {
        1: damascus,    // Ancient City of Damascus
        2: hoson,  // Krak des Chevaliers
        3: palmyra,    // Palmyra Ruins
        4: lattakia        // Mediterranean Coastline
    };

    // Function to get the appropriate image based on highlight
    const getImageByHighlight = (highlight) => {
        // First try to get by ID
        if (imageMapping[highlight.id]) {
            return imageMapping[highlight.id];
        }

        // Complete fallback logic for all highlights
        if (highlight.title.includes("Damascus")) return damascusCity;
        if (highlight.title.includes("Krak")) return krakChevaliers;
        if (highlight.title.includes("Palmyra")) return palmyraRuins;
        if (highlight.title.includes("Mediterranean") || highlight.title.includes("Coastline")) return coastline;

        // Default fallback
        return sampleImage;
    };

    // Add images to highlights using the mapping
    const highlightsWithImages = highlights.map(highlight => ({
        ...highlight,
        image: getImageByHighlight(highlight)
    }));


    return (
        <section className={`highlights-section ${dir}`}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{t('highlight.title')}</h2>
                </div>

                <div className="highlights-grid">
                    {highlightsWithImages.map((highlight, index) => (
                        <div
                            className={`highlight-item item-${index + 1}`}
                            key={highlight.id}
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
            </div>
        </section>
    );
};

export default Highlight;