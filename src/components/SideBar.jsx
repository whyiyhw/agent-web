import React, {startTransition, useContext} from 'react'
import loginImage from "../assets/login.jpg";
import logo from "../assets/01.jpeg";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {Moon, Sun, GithubIcon, BotIcon, CodeIcon, BookMarkedIcon, SettingsIcon, AnchorIcon} from "lucide-react";
import {BOTS, EXPLORE, GITHUB, HOME, KNOWLEDGE} from "../routes/app/routes";
import WebSocketStatus from "@/components/common/WebSocketStatus.jsx";

const SideBar = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    const menuItems = [
        {
            icon: <BotIcon/>,
            text: 'Bots',
            clickEvent: () => startTransition(() => {
                navigate(BOTS)
            })
        },
        {
            icon: <CodeIcon/>,
            text: '插件',
            clickEvent: () => startTransition(() => {
                navigate(BOTS)
            })
        },
        {
            icon: <BookMarkedIcon/>,
            text: '知识库',
            clickEvent: () => startTransition(() => {
                navigate(KNOWLEDGE)
            })
        },
        {
            icon: <SettingsIcon/>,
            text: '设置',
            clickEvent: () => startTransition(() => {
                navigate(BOTS)
            })
        },
        {
            icon: <AnchorIcon/>,
            text: "探索",
            clickEvent: () => startTransition(() => {
                navigate(EXPLORE)
            })
        }
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
        <div className="flex flex-col h-screen border-r-2 w-1/12 text-base-content">
            <header className="p-4 flex justify-center h-1/8 items-center">
                <img className="w-10 h-10 rounded" src={loginImage} alt="logo"/>
            </header>
            <nav className="flex-grow h-3/4 overflow-y-auto">
                <ul className="menu rounded-box">
                    {menuItems.map((item, index) => (
                        <li key={index} >
                            <button onClick={item.clickEvent}>
                                {item.icon}
                                {item.text}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            {isLoggedIn &&
                <footer className="mt-auto pb-10 pl-2 flex flex-row h-1/8">
                    <div className="dropdown dropdown-right dropdown-end">
                        <img
                            className="w-10 h-10 rounded-full border-2 border-blue-500 right-10" tabIndex={0}
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
                    <button onClick={jumpGithub}>
                        <GithubIcon/>
                    </button>
                    <button onClick={toggleTheme}>
                        {theme === 'light' ? <Moon size={20}/> : <Sun size={20}/>}
                    </button>
                    <WebSocketStatus/>
                </footer>
            }
        </div>
    );
};

export default SideBar