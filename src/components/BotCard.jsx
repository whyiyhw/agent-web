import {useNavigate} from "react-router-dom";
import {useTransition} from "react";
import defaultBotIcon2 from "../assets/default_bot_icon2.png";
import defaultBotIcon3 from "../assets/default_bot_icon3.png";
import defaultBotIcon4 from "../assets/default_bot_icon4.png";
import defaultBotIcon6 from "../assets/default_bot_icon6.png";
import {BOT_DEVELOP} from "../routes/app/routes.jsx";


const BotCard = ({id, title, description, avatar, toBotDelete, goBotReplicate, showBotModal}) => {
    const navigate = useNavigate();
    let [, startTransition] = useTransition();

    const getAvatarURL = () => {
        // 随机
        const map = {
            '1': defaultBotIcon2,
            '2': defaultBotIcon3,
            '3': defaultBotIcon4,
            '4': defaultBotIcon6
        }
        return map[Math.floor(Math.random() * 4) + 1];
    }

    // 点击时跳转至 /bot/develop?id=1
    const jumpToDevelop = (id) => {
        startTransition(() => {
            navigate(BOT_DEVELOP, {state: {id: id}});
        })
    }
    return (
        <div className="w-1/7 h-1/4 flex flex-row shadow hover:shadow-2xl m-2.5 rounded-xl ">
            <div className="p-3">
                <div className="w-16 rounded-full  overflow-hidden h-16">
                    <img
                        src={avatar ? avatar : getAvatarURL()}
                        width="64"
                        height="64"
                        alt=""/> :
                </div>
            </div>
            <div className="flex flex-row w-full p-3">
                <div className="w-2/3" onClick={() => jumpToDevelop(id)}>
                    <h1 className="card-title">{title}</h1>
                    <div className="">{description}</div>
                </div>

                <div className="w-1/3 card-actions self-start justify-end relative">
                    <div className="dropdown">
                        <button tabIndex={0} role="button" className="hover:bg-gray-200 rounded-full ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                            </svg>
                        </button>
                        <ul tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                goBotReplicate &&
                                <li>
                                    <button className=" block px-4 py-2 text-sm" role="menuitem"
                                            onClick={() => goBotReplicate(id, title, avatar, description)}
                                    >复制
                                    </button>
                                </li>
                            }
                            {
                                showBotModal &&
                                <li>
                                    <button className=" block px-4 py-2 text-sm" role="menuitem"
                                            onClick={() => showBotModal(id)}>更新
                                    </button>
                                </li>
                            }
                            {
                                toBotDelete &&
                                <li>
                                    <button className=" block px-4 py-2 text-sm text-red-600" role="menuitem"
                                            onClick={() => toBotDelete(id)}
                                    >删除
                                    </button>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
                <div/>
            </div>
        </div>
    )
};


export default BotCard