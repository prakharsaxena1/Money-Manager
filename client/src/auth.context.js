import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);
export const UserContextProvider = ({ children }) => {
    const initialState = "USERNAME"
    const [username, setUsername] = useState(initialState);
    const value = {
        username,
        setUsername,
        initialState,
    }
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}