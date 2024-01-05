import React, {useContext, useTransition} from "react";
import {useNavigate} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSun, faMoon} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import {AuthContext} from "../context/AuthContext";
import logo from '../image/01.jpeg';
import loginImage from "../image/login.jpg"
import {EXPLORE, GITHUB, HOME, LOGIN} from "../routes/app/routes";

const Header = () => {
    const navigate = useNavigate();
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
    let [, startTransition] = useTransition();
    const handleLoginClick = () => {
        startTransition(() => {
            navigate(LOGIN);
        });
    };

    const handleHomeClick = () => {
        startTransition(() => {
            navigate(HOME);
        });
    };

    const [theme, setTheme] = React.useState('light');

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
            document.documentElement.dataset.theme = 'dark';
        } else {
            setTheme('light');
            document.documentElement.dataset.theme = 'light';
        }
    };

    const jumpGithub = () => {
        window.open(GITHUB);
    }
    const handleLogoutClick = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        startTransition(() => {
            navigate(HOME);
        });
    }

    const handleAdminClick = () => {
        startTransition(() => {
            navigate(EXPLORE);
        });
    }

    return (
        <div className=" w-full p-3 shadow-sm">
            <nav className="container mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full md:w-auto order-last md:order-first flex items-center">
                    {/*加入logo logo 应当与 h1 在同一行 logo 透明度为0.5*/}
                    <img className="w-10 h-10 rounded opacity-75 " src={loginImage} alt="logo"/>
                    <h1 className="text-3xl font-bold" onClick={handleHomeClick}>chatgpt-wechat</h1>

                </div>
                <div
                    className="text-base-content mt-8 md:mt-0 order-first md:order-last md:flex flex-wrap space-y-2 md:space-y-0 md:space-x-2  items-center justify-between">
                    {!isLoggedIn &&
                        <button className="btn btn-outline  btn-circle" onClick={handleLoginClick}>Log in</button>}
                    {isLoggedIn &&
                        <div className="dropdown dropdown-hover">
                            <img
                                className="w-10 h-10 rounded-full border-2 border-blue-500"
                                src={logo}
                                alt="avatar"
                            />
                            <ul tabIndex={0}
                                className="dropdown-content text-base-content font-bold z-[1] menu p-2 shadow bg-base-100 rounded-box w-28">
                                <li>
                                    <button onClick={handleAdminClick}>管理</button>
                                </li>
                                <li>
                                    <button onClick={handleLogoutClick}>登出</button>
                                </li>
                            </ul>
                        </div>
                    }
                    <div onClick={jumpGithub}>
                        <FontAwesomeIcon icon={faGithub}/>
                    </div>
                    <div onClick={toggleTheme}>
                        <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun}/>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;