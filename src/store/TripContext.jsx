import React, { createContext, useState, useContext, useEffect } from 'react';

const TripContext = createContext();

export const useTrip = () => useContext(TripContext);

export const TripProvider = ({ children }) => {
    // Helper to load from localStorage or return default
    const loadState = (key, defaultValue) => {
        try {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : defaultValue;
        } catch (e) {
            console.error("Failed to load state", e);
            return defaultValue;
        }
    };

    // Places state: Array of { id, name, category, note, address, date, time }
    const [places, setPlaces] = useState(() => {
        const loaded = loadState('trip_places', []);
        // Force remove legacy default places (ID 1 and 2) if they exist
        return loaded.filter(p => p.id !== 1 && p.id !== 2);
    });

    // Budget state: Array of { id, description, amount, category }
    const [budgetItems, setBudgetItems] = useState(() => loadState('trip_budget', []));

    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('trip_places', JSON.stringify(places));
    }, [places]);

    useEffect(() => {
        localStorage.setItem('trip_budget', JSON.stringify(budgetItems));
    }, [budgetItems]);

    const addPlace = (place) => {
        setPlaces([...places, { ...place, id: Date.now() }]);
    };

    const removePlace = (id) => {
        setPlaces(places.filter(p => p.id !== id));
    };

    const addBudgetItem = (item) => {
        setBudgetItems([...budgetItems, { ...item, id: Date.now() }]);
    };

    const removeBudgetItem = (id) => {
        setBudgetItems(budgetItems.filter(item => item.id !== id));
    };

    return (
        <TripContext.Provider value={{
            places,
            addPlace,
            removePlace,
            budgetItems,
            addBudgetItem,
            removeBudgetItem
        }}>
            {children}
        </TripContext.Provider>
    );
};
