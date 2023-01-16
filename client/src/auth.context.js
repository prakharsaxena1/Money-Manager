import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);
export const UserContextProvider = ({ children }) => {
    const initialState_username = "USERNAME";
    const initialState_friends = [];

    const [username, setUsername] = useState(initialState_username);
    const [friends, setFriends] = useState(initialState_friends);
    const value = {
        username,
        setUsername,
        initialState_username,
        friends,
        setFriends,
    }
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}