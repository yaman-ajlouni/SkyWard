import React, { useState } from 'react';
import './Newsletter.scss';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';

const Newsletter = () => {
    const { t } = useTranslation();
    const { dir } = useLanguage();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Reset messages
        setErrorMessage('');
        setSuccessMessage('');
        
        // Validate email
        if (!email.trim()) {
            setErrorMessage(t('newsletter.emptyEmailError'));
            return;
        }
        
        if (!validateEmail(email)) {
            setErrorMessage(t('newsletter.invalidEmailError'));
            return;
        }
        
        // Show submitting state
        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccessMessage(t('newsletter.successMessage'));
            setEmail('');
        }, 1500);
    };

    return (
        <section className={`newsletter-section ${dir}`}>
            <div className="container">
                <div className="newsletter-container">
                    <div className="newsletter-content">
                        <h2>{t('newsletter.title')}</h2>
                        <p>{t('newsletter.description')}</p>
                    </div>

                    <form className="newsletter-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <input
                                type="email"
                                placeholder={t('newsletter.emailPlaceholder')}
                                className={`email-input ${errorMessage ? 'error' : ''}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-label={t('newsletter.emailPlaceholder')}
                            />
                            {errorMessage && <div className="error-message">{errorMessage}</div>}
                            {successMessage && <div className="success-message">{successMessage}</div>}
                        </div>
                        <div className="form-row">
                            <button 
                                type="submit" 
                                className="subscribe-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? t('newsletter.subscribingButton') : t('newsletter.subscribeButton')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;