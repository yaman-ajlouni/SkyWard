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
import hero10 from '../../assets/images/hero/hero10.jpg'
import hero11 from '../../assets/images/hero/hero11.webp'
import hero12 from '../../assets/images/hero/hero12.jpg'
import hero13 from '../../assets/images/hero/hero13.jpg'
import hero14 from '../../assets/images/hero/hero14.webp'
import hero15 from '../../assets/images/hero/hero15.webp'
import hero16 from '../../assets/images/hero/hero16.jpg'
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { useLanguage } from '../../context/LanguageContext';

const images = Array.from({ length: 18 }, (_, index) => {
  const heroes = [hero1, hero2, hero3, hero4, hero5, hero6, hero7, hero8, hero9, hero10, hero11, hero12, hero13, hero14, hero15, hero16];
  return heroes[index % heroes.length];
});

// List of cities for dropdown (English values)
const citiesList = [
  'Damascus', 'Aleppo', 'Riyadh', 'Jeddah', 'Dammam', 'Dubai', 'Abu Dhabi',
  'Sharjah', 'Cairo', 'Kuwait', 'Muscat', 'Bahrain', 'Algeria', 'Baghdad',
  'Istanbul', 'London', 'Frankfurt', 'Stockholm', 'Beijing', 'Amsterdam', 'Berlin'
];

const Hero = () => {
  const { t, i18n } = useTranslation();
  const { dir } = useLanguage();
  const currentLanguage = i18n.language || 'en';

  // Used for determining which language to display city names in
  const isArabic = currentLanguage.startsWith('ar');

  const [tripType, setTripType] = useState('roundTrip');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [originDisplay, setOriginDisplay] = useState('');
  const [destinationDisplay, setDestinationDisplay] = useState('');
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState('economy');
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [showCabinDropdown, setShowCabinDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Add validation states
  const [formErrors, setFormErrors] = useState({
    origin: false,
    destination: false,
    departureDate: false,
    returnDate: false
  });

  // State for city search dropdowns
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [filteredOriginCities, setFilteredOriginCities] = useState([]);
  const [filteredDestinationCities, setFilteredDestinationCities] = useState([]);

  // Create refs for better click outside handling
  const passengerDropdownRef = useRef(null);
  const cabinDropdownRef = useRef(null);
  const originInputRef = useRef(null);
  const originDropdownRef = useRef(null);
  const destinationInputRef = useRef(null);
  const destinationDropdownRef = useRef(null);

  // Helper function to get the translated city name using the t function
  const getTranslatedCityName = (cityName) => {
    if (!cityName) return '';
    return t(`cities.${cityName}`) || cityName;
  };

  // Helper function to find the English city name from a translated input
  const findEnglishCityName = (translatedInput) => {
    if (!translatedInput.trim()) return '';

    // First check if it's already an English name
    if (citiesList.includes(translatedInput)) return translatedInput;

    // If not, search through the translations
    for (const cityKey of citiesList) {
      const translatedCity = t(`cities.${cityKey}`);
      if (translatedCity.toLowerCase().includes(translatedInput.toLowerCase())) {
        return cityKey;
      }
    }

    return translatedInput; // Return the input if no match found
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update display values when language changes
  useEffect(() => {
    if (origin) {
      setOriginDisplay(getTranslatedCityName(origin));
    }
    if (destination) {
      setDestinationDisplay(getTranslatedCityName(destination));
    }
  }, [i18n.language, origin, destination]);

  // Filter cities based on input, excluding already selected cities
  useEffect(() => {
    // Filter origin cities, excluding the destination if selected
    if (originDisplay.trim()) {
      const searchTerm = originDisplay.toLowerCase();
      const filtered = citiesList.filter(city => {
        const translatedCity = getTranslatedCityName(city).toLowerCase();
        return (translatedCity.includes(searchTerm) || city.toLowerCase().includes(searchTerm)) &&
          city !== destination;
      });
      setFilteredOriginCities(filtered);
    } else {
      const availableCities = citiesList.filter(city => city !== destination);
      setFilteredOriginCities(availableCities);
    }
  }, [originDisplay, destination, i18n.language]);

  useEffect(() => {
    // Filter destination cities, excluding the origin if selected
    if (destinationDisplay.trim()) {
      const searchTerm = destinationDisplay.toLowerCase();
      const filtered = citiesList.filter(city => {
        const translatedCity = getTranslatedCityName(city).toLowerCase();
        return (translatedCity.includes(searchTerm) || city.toLowerCase().includes(searchTerm)) &&
          city !== origin;
      });
      setFilteredDestinationCities(filtered);
    } else {
      const availableCities = citiesList.filter(city => city !== origin);
      setFilteredDestinationCities(availableCities);
    }
  }, [destinationDisplay, origin, i18n.language]);

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

      if (
        originInputRef.current &&
        originDropdownRef.current &&
        !originInputRef.current.contains(e.target) &&
        !originDropdownRef.current.contains(e.target)
      ) {
        setShowOriginDropdown(false);
      }

      if (
        destinationInputRef.current &&
        destinationDropdownRef.current &&
        !destinationInputRef.current.contains(e.target) &&
        !destinationDropdownRef.current.contains(e.target)
      ) {
        setShowDestinationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Function to swap origin and destination
  const handleSwapLocations = () => {
    const tempOrigin = origin;
    const tempOriginDisplay = originDisplay;
    setOrigin(destination);
    setOriginDisplay(destinationDisplay);
    setDestination(tempOrigin);
    setDestinationDisplay(tempOriginDisplay);

    // Update errors when swapping
    setFormErrors({
      ...formErrors,
      origin: !destination,
      destination: !tempOrigin
    });
  };

  // Function to handle city selection for origin
  const handleOriginCitySelect = (city) => {
    setOrigin(city); // Set internal English value
    setOriginDisplay(getTranslatedCityName(city)); // Set displayed translated value
    setShowOriginDropdown(false);
    setFormErrors({
      ...formErrors,
      origin: false
    });
  };

  // Function to handle city selection for destination
  const handleDestinationCitySelect = (city) => {
    setDestination(city); // Set internal English value
    setDestinationDisplay(getTranslatedCityName(city)); // Set displayed translated value
    setShowDestinationDropdown(false);
    setFormErrors({
      ...formErrors,
      destination: false
    });
  };

  // Handle input change
  const handleOriginInputChange = (e) => {
    const inputValue = e.target.value;
    setOriginDisplay(inputValue);
    setShowOriginDropdown(true);

    // Only clear the error if there's input
    if (inputValue.trim()) {
      setFormErrors({
        ...formErrors,
        origin: false
      });
    }
  };

  // Handle input change
  const handleDestinationInputChange = (e) => {
    const inputValue = e.target.value;
    setDestinationDisplay(inputValue);
    setShowDestinationDropdown(true);

    // Only clear the error if there's input
    if (inputValue.trim()) {
      setFormErrors({
        ...formErrors,
        destination: false
      });
    }
  };

  // Handle departure date change
  const handleDepartureDateChange = (date) => {
    setDepartureDate(date);

    // Clear departure date error
    setFormErrors({
      ...formErrors,
      departureDate: false
    });

    // If return date is before the new departure date, update it
    if (returnDate && date && returnDate < date) {
      setReturnDate(date);
    }
  };

  // Handle return date change
  const handleReturnDateChange = (date) => {
    setReturnDate(date);

    // Clear return date error
    setFormErrors({
      ...formErrors,
      returnDate: false
    });
  };

  // Function to validate form
  const validateForm = () => {
    const errors = {
      origin: !origin,
      destination: !destination,
      departureDate: !departureDate,
      returnDate: tripType === 'roundTrip' && !returnDate
    };

    setFormErrors(errors);

    // Return true if there are no errors (all fields are valid)
    return !Object.values(errors).some(Boolean);
  };

  // Handle search button click
  const handleSearch = () => {
    // First validate the form
    const isValid = validateForm();

    if (isValid) {
      // Create data object for submission
      const searchData = {
        tripType,
        origin,
        destination,
        departureDate,
        returnDate: tripType === 'roundTrip' ? returnDate : null,
        passengers,
        cabinClass
      };

      // Log the data
      console.log('Search Data:', searchData);

      // Here you would typically call an API or navigate to search results
      // For example: navigate('/search-results', { state: searchData });
    }
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
                  <span>{t(`hero.cabinClass.${cabinClass}`)}</span>
                  <ChevronDown size={14} className={showCabinDropdown ? 'rotated' : ''} />
                </div>
                {showCabinDropdown && (
                  <div className="dropdown-menu">
                    {[
                      { key: 'economy', value: 'economy' },
                      { key: 'business', value: 'business' },
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
                        {t(`hero.cabinClass.${cabin.key}`)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="search-inputs">
            <div className={`origin-input ${formErrors.origin ? 'error' : ''}`}>
              <div className="input-icon">
                <FaPlaneDeparture size={18} />
              </div>
              <div className="input-field" ref={originInputRef}>
                <label>{t('hero.search.flyingFrom')}</label>
                <input
                  type="text"
                  placeholder={t('hero.search.selectOrigin')}
                  value={originDisplay}
                  onChange={handleOriginInputChange}
                  onClick={() => setShowOriginDropdown(true)}
                />
                {showOriginDropdown && (
                  <div className="city-dropdown-menu" ref={originDropdownRef}>
                    {filteredOriginCities.length > 0 ? (
                      filteredOriginCities.map((city, index) => (
                        <div
                          key={index}
                          className="city-dropdown-item"
                          onClick={() => handleOriginCitySelect(city)}
                        >
                          {getTranslatedCityName(city)}
                        </div>
                      ))
                    ) : (
                      <div className="city-dropdown-no-results">{t('hero.search.noResults')}</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="direction-arrows" onClick={handleSwapLocations}>
              <ArrowRightLeft size={22} color="#006837" />
            </div>

            <div className={`destination-input ${formErrors.destination ? 'error' : ''}`}>
              <div className="input-icon">
                <FaPlaneArrival size={18} />
              </div>
              <div className="input-field" ref={destinationInputRef}>
                <label>{t('hero.search.flyingTo')}</label>
                <input
                  type="text"
                  placeholder={t('hero.search.selectDestination')}
                  value={destinationDisplay}
                  onChange={handleDestinationInputChange}
                  onClick={() => setShowDestinationDropdown(true)}
                />
                {showDestinationDropdown && (
                  <div className="city-dropdown-menu" ref={destinationDropdownRef}>
                    {filteredDestinationCities.length > 0 ? (
                      filteredDestinationCities.map((city, index) => (
                        <div
                          key={index}
                          className="city-dropdown-item"
                          onClick={() => handleDestinationCitySelect(city)}
                        >
                          {getTranslatedCityName(city)}
                        </div>
                      ))
                    ) : (
                      <div className="city-dropdown-no-results">{t('hero.search.noResults')}</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className={`date-input ${formErrors.departureDate ? 'error' : ''}`}>
              <div className="input-icon">
                <Calendar size={18} />
              </div>
              <div className="input-field">
                <label>{t('hero.search.departureDate')}</label>
                <DatePicker
                  selected={departureDate}
                  onChange={handleDepartureDateChange}
                  placeholderText={t('hero.search.selectDate')}
                  className="date-picker"
                  minDate={new Date()}
                />
              </div>
            </div>

            {tripType === 'roundTrip' && (
              <div className={`date-input ${formErrors.returnDate ? 'error' : ''}`}>
                <div className="input-icon">
                  <Calendar size={18} />
                </div>
                <div className="input-field">
                  <label>{t('hero.search.returnDate')}</label>
                  <DatePicker
                    selected={returnDate}
                    onChange={handleReturnDateChange}
                    placeholderText={t('hero.search.selectDate')}
                    className="date-picker"
                    minDate={departureDate || new Date()}
                  />
                </div>
              </div>
            )}

            <button
              className="search-button"
              onClick={handleSearch}
            >
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