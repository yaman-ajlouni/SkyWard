import './Footer.scss';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';

import logo from '../../assets/images/SkyWard-Logo-withoutBG.png';

import { X } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    const { t } = useTranslation();
    const { dir } = useLanguage();
    const currentYear = new Date().getFullYear();

    const footerColumns = t('footer.columns', { returnObjects: true }) || [];
    const legalLinks = t('footer.legal', { returnObjects: true }) || [];

    return (
        <footer className={`site-footer ${dir}`}>
            <div className="container">
                <div className="footer-top">
                    <div className="footer-branding">
                        <div className="footer-logo">
                            <img src={logo} alt="Company Logo" className="white-filter" />
                        </div>
                        <div className="social-media">
                            <p>{t('footer.socialText')}</p>
                            <div className="social-icons">
                                <a href="#" className="social-icon" aria-label="Facebook">
                                    <FaFacebook size={20} />
                                </a>
                                <a href="#" className="social-icon" aria-label="X (Twitter)">
                                    <X size={20} />
                                </a>
                                <a href="#" className="social-icon" aria-label="Instagram">
                                    <FaInstagram size={20} />
                                </a>
                                <a href="#" className="social-icon" aria-label="YouTube">
                                    <FaYoutube size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Footer Links */}
                    <div className="footer-links">
                        {footerColumns.map((column, index) => (
                            <div className="links-column" key={index}>
                                <h4>{column.title}</h4>
                                <ul>
                                    {column.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <a href={link.url}>{link.text}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="legal-links">
                        <ul>
                            {legalLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.url}>{link.text}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="copyright">
                        <p>&copy; {currentYear} {t('footer.copyright')}</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;