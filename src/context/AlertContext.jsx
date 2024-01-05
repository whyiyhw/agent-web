import React, { createContext, useState } from 'react';

export const AlertContext = createContext({});

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({ isOpen: false, message: '', type: '' });

    const showAlert = (message, type) => {
        setAlert({ isOpen: true, message, type });
    };

    const hideAlert = () => {
        setAlert({ isOpen: false, message: '', type: '' });
    };

    return (
        <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
            {alert.isOpen ? (
                <div className={`alert alert-${alert.type}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                             viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>{alert.message}</span>
                </div>
            ) : null}
            {children}
        </AlertContext.Provider>
    );
};