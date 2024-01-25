import {useContext, useState, useTransition} from "react";
import {useNavigate} from 'react-router-dom';
import {GithubIcon, Sun, Moon} from 'lucide-react';
import {AuthContext} from "../context/AuthContext";
import logo from '../assets/01.jpeg';
import loginImage from "../assets/login.jpg"
import {EXPLORE, GITHUB, HOME, LOGIN} from "../routes/app/routes.jsx";
import WebSocketStatus from "@/components/common/WebSocketStatus.jsx";

const Header = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();
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

    const [theme, setTheme] = useState('light');

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
            <nav className="container mx-auto flex flex-row items-center justify-between">
                <div className="w-full md:w-auto order-last  flex items-center">
                    {/*加入logo logo 应当与 h1 在同一行 logo 透明度为0.5*/}
                    <img className="w-10 h-10 rounded opacity-80  " src={loginImage} alt="logo"/>
                    <h1 className="text-3xl font-bold" onClick={handleHomeClick}>chatgpt-wechat</h1>

                </div>
                <div
                    className="text-base-content mt-8 md:mt-0 order-first md:order-last flex flex-row
                    space-y-2 md:space-y-0 md:space-x-2  items-center justify-between">
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
                        <GithubIcon size={20}/>
                    </div>
                    <div onClick={toggleTheme}>
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </div>
                    <WebSocketStatus/>
                </div>
            </nav>
        </div>
    );
};

export default Header;