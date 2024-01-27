import {createContext, useState} from 'react';
import PropTypes from "prop-types";
import {
    AlertCircle,
} from "lucide-react";

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
                    <div className="toast z-9999999999999  toast-top toast-center opacity-80">
                        <div className={"alert  alert-" + alert.type}>
                           <AlertCircle/> <span>{alert.message}</span>
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