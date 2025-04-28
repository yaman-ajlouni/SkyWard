import React, { useState, useEffect, useRef } from 'react';
import './Hero.scss';
import { Calendar, Search, ChevronDown, Users, ArrowRightLeft } from 'lucide-react';
import hero1 from '../../assets/images/hero/hero1.webp'
import hero2 from '../../assets/images/hero/hero2.jpg'
import hero3 from '../../assets/images/hero/hero3.jpg'
import hero4 from '../../assets/images/hero/hero4.jpg'
import hero5 from '../../assets/images/hero/hero5.jpg'
import hero6 from '../../assets/images/hero/hero6.jpg'
import hero7 from '../../assets/images/hero/hero7.jpg'
import hero8 from '../../assets/images/hero/hero8.jpg'
import hero9 from '../../assets/images/hero/hero9.jpg'
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { useLanguage } from '../../context/LanguageContext';

const images = Array.from({ length: 18 }, (_, index) => {
  const heroes = [hero1, hero2, hero3, hero4, hero5, hero6, hero7, hero8, hero9];
  return heroes[index % heroes.length];
});

const Hero = () => {
  const { t } = useTranslation();
  const { dir } = useLanguage();

  const [tripType, setTripType] = useState('roundTrip');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState(t('hero.cabinClass.economy'));
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [showCabinDropdown, setShowCabinDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Create refs for better click outside handling
  const passengerDropdownRef = useRef(null);
  const cabinDropdownRef = useRef(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = e => {
      if (
        passengerDropdownRef.current &&
        !passengerDropdownRef.current.contains(e.target)
      ) {
        setShowPassengerDropdown(false);
      }

      if (
        cabinDropdownRef.current &&
        !cabinDropdownRef.current.contains(e.target)
      ) {
        setShowCabinDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Function to swap origin and destination
  const handleSwapLocations = () => {
    const tempOrigin = origin;
    setOrigin(destination);
    setDestination(tempOrigin);
  };

  // Translation for passengers with plural handling
  const getPassengersText = (num) => {
    return num === 1 ? t('hero.passengers') : t('hero.passengers_plural');
  };

  return (
    <section className={`hero-section ${dir}`}>
      <div className="image-grid">
        {images.map((src, i) => (
          <div className="image-container" key={i}>
            <img src={src} alt={`Destination ${i + 1}`} />
          </div>
        ))}
      </div>

      <div className="green-gradient" />

      <div className="search-form-wrapper">
        <div className="hero-text">
          <div className="hero-text-left">
            <h1>{t('hero.heading')}</h1>
          </div>
          <div className="hero-text-right">
            <p>{t('hero.subheading')}</p>
          </div>
        </div>

        <div className="search-form-container">
          <div className="trip-options">
            <div className="trip-type-buttons">
              <button
                className={tripType === 'roundTrip' ? 'active' : ''}
                onClick={() => setTripType('roundTrip')}
              >
                <span className="radio-circle"></span>
                {t('hero.tripOptions.roundTrip')}
              </button>
              <button
                className={tripType === 'oneWay' ? 'active' : ''}
                onClick={() => setTripType('oneWay')}
              >
                <span className="radio-circle"></span>
                {t('hero.tripOptions.oneWay')}
              </button>
            </div>

            <div className="trip-preferences">
              <div
                className="passengers-dropdown"
                ref={passengerDropdownRef}
                onClick={() => {
                  setShowPassengerDropdown(p => !p);
                  setShowCabinDropdown(false);
                }}
              >
                <div className="dropdown-toggle">
                  <Users size={18} />
                  <span>{passengers} {getPassengersText(passengers)}</span>
                  <ChevronDown size={14} className={showPassengerDropdown ? 'rotated' : ''} />
                </div>
                {showPassengerDropdown && (
                  <div className="dropdown-menu">
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <div
                        key={n}
                        className={`dropdown-item ${passengers === n ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setPassengers(n);
                          setShowPassengerDropdown(false);
                        }}
                      >
                        {n} {getPassengersText(n)}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="divider" />

              <div
                className="cabin-dropdown"
                ref={cabinDropdownRef}
                onClick={() => {
                  setShowCabinDropdown(c => !c);
                  setShowPassengerDropdown(false);
                }}
              >
                <div className="dropdown-toggle">
                  <span>{cabinClass}</span>
                  <ChevronDown size={14} className={showCabinDropdown ? 'rotated' : ''} />
                </div>
                {showCabinDropdown && (
                  <div className="dropdown-menu">
                    {[
                      { key: 'economy', value: t('hero.cabinClass.economy') },
                      { key: 'premiumEconomy', value: t('hero.cabinClass.premiumEconomy') },
                      { key: 'business', value: t('hero.cabinClass.business') },
                      { key: 'firstClass', value: t('hero.cabinClass.firstClass') }
                    ].map(cabin => (
                      <div
                        key={cabin.key}
                        className={`dropdown-item ${cabinClass === cabin.value ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCabinClass(cabin.value);
                          setShowCabinDropdown(false);
                        }}
                      >
                        {cabin.value}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="search-inputs">
            <div className="origin-input">
              <div className="input-icon">
                <FaPlaneDeparture size={18} />
              </div>
              <div className="input-field">
                <label>{t('hero.search.flyingFrom')}</label>
                <input
                  type="text"
                  placeholder={t('hero.search.selectOrigin')}
                  value={origin}
                  onChange={e => setOrigin(e.target.value)}
                />
              </div>
            </div>

            <div className="direction-arrows" onClick={handleSwapLocations}>
              <ArrowRightLeft size={22} color="#006837" />
            </div>

            <div className="destination-input">
              <div className="input-icon">
                <FaPlaneArrival size={18} />
              </div>
              <div className="input-field">
                <label>{t('hero.search.flyingTo')}</label>
                <input
                  type="text"
                  placeholder={t('hero.search.selectDestination')}
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                />
              </div>
            </div>

            <div className="date-input">
              <div className="input-icon">
                <Calendar size={18} />
              </div>
              <div className="input-field">
                <label>{t('hero.search.departureDate')}</label>
                <DatePicker
                  selected={departureDate}
                  onChange={date => setDepartureDate(date)}
                  placeholderText={t('hero.search.selectDate')}
                  className="date-picker"
                  minDate={new Date()}
                />
              </div>
            </div>

            {tripType === 'roundTrip' && (
              <div className="date-input">
                <div className="input-icon">
                  <Calendar size={18} />
                </div>
                <div className="input-field">
                  <label>{t('hero.search.returnDate')}</label>
                  <DatePicker
                    selected={returnDate}
                    onChange={date => setReturnDate(date)}
                    placeholderText={t('hero.search.selectDate')}
                    className="date-picker"
                    minDate={departureDate || new Date()}
                  />
                </div>
              </div>
            )}

            <button className="search-button">
              <Search size={18} />
              <span>{t('hero.search.searchButton')}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;