import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const LocationContext = createContext();

// Hook for using the location context
export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
    // Default location is Syria
    const [location, setLocation] = useState(() => {
        // Check if location is saved in localStorage
        const savedLocation = localStorage.getItem('userLocation');
        return savedLocation || 'syria';
    });

    // Update localStorage when location changes
    useEffect(() => {
        localStorage.setItem('userLocation', location);
    }, [location]);

    // Function to change location
    const changeLocation = (newLocation) => {
        setLocation(newLocation);
    };

    return (
        <LocationContext.Provider value={{ location, changeLocation }}>
            {children}
        </LocationContext.Provider>
    );
};