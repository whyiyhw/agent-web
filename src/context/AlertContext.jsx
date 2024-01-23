import {createContext, useState} from 'react';
import PropTypes from "prop-types";

export const AlertContext = createContext({});

export const AlertProvider = ({children}) => {
    const [alert, setAlert] = useState({isOpen: false, message: '', type: ''});

    const showAlert = (message, type) => {
        setAlert({isOpen: true, message, type});
    };

    const hideAlert = () => {
        setAlert({isOpen: false, message: '', type: ''});
    };

    return (
        <AlertContext.Provider value={{alert, showAlert, hideAlert}}>
            {alert.isOpen ? (
                <div className="toast  toast-center toast-middle opacity-75">
                    <div className={"alert  alert-" + alert.type}>
                        <span>{alert.message}</span>
                    </div>
                </div>
            ) : null}
            {children}
        </AlertContext.Provider>
    );
};

AlertProvider.propTypes = {
    children: PropTypes.node.isRequired,
}