import {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext(null);


export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        window.localStorage.getItem('isLoggedIn') === 'true'
    );

    useEffect(() => {
        window.localStorage.setItem('isLoggedIn', isLoggedIn);
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );

};