import React from 'react';
import './Highlight.scss';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';

// Import sample image (replace with real images)
import sampleImage from '../../assets/images/damascus.jpg';

const Highlight = () => {
    const { t } = useTranslation();
    const { dir } = useLanguage();
    
    // Get highlights from translations
    const highlights = t('highlight.items', { returnObjects: true }) || [];
    
    // Add images to highlights
    const highlightsWithImages = highlights.map(highlight => ({
        ...highlight,
        image: sampleImage
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