import React, {startTransition, useContext} from 'react'
import 'daisyui/dist/full.css'
import loginImage from "../image/login.jpg";
import logo from "../image/01.jpeg";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {faMoon, faSun, faRobot, faCodeMerge, faBookBookmark, faKitchenSet} from "@fortawesome/free-solid-svg-icons";
import {BOTS, GITHUB, HOME} from "../routes/app/routes";

const SideBar = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    const menuItems = [
        {
            icon: faRobot,
            text: 'Bots',
            clickEvent: () => startTransition(() => {
                navigate(BOTS)
            })
        },
        {
            icon: faCodeMerge,
            text: '插件',
            clickEvent: () => startTransition(() => {
                navigate(BOTS)
            })
        },
        {
            icon: faBookBookmark,
            text: '知识库',
            clickEvent: () => startTransition(() => {
                navigate(BOTS)
            })
        },
        {
            icon: faKitchenSet,
            text: '设置',
            clickEvent: () => startTransition(() => {
                navigate(BOTS)
            })
        },
    ];

    const handleLogoutClick = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        startTransition(() => {
            navigate(HOME);
        });
    }

    const jumpGithub = () => {
        window.open(GITHUB);
    }

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

    return (
        <div className="h-screen w-1/12  text-base-content  border-r-2 ">
            <header className="p-4  flex justify-center items-center ">
                <img className="w-10 h-10 rounded" src={loginImage} alt="logo"/>
            </header>
            <nav>
                <ul className="menu  rounded-box">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <button onClick={item.clickEvent}>
                                <FontAwesomeIcon icon={item.icon}/>
                                {item.text}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {isLoggedIn &&
                <footer className="fixed bottom-10 w-1/12  flex justify-evenly ">
                    <div className="dropdown dropdown-right dropdown-end">
                        <img
                            className="w-10 h-10 rounded-full border-2 border-blue-500 right-10 " tabIndex={0}
                            role="button"
                            src={logo}
                            alt="avatar"
                        />
                        <ul tabIndex={0}
                            className="dropdown-content text-base-content font-bold z-[1] menu p-2 shadow bg-base-100 rounded-box w-28">
                            <li>
                                <button onClick={handleLogoutClick}>登出</button>
                            </li>
                        </ul>

                    </div>
                    <button onClick={jumpGithub} className="w-0.5 p-0 m-0">
                        <FontAwesomeIcon icon={faGithub}/>
                    </button>
                    <button onClick={toggleTheme}>
                        <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun}/>
                    </button>
                </footer>
            }
        </div>
    );
};

export default SideBar