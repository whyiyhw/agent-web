import React, {startTransition, useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {botChat, botChatHistory, botChatHistoryClear, botDetail, botOptimizePrompt, botPromptUpdate} from "../api/api";
import {AuthContext} from "../context/AuthContext";
import {BOTS, BOTS_PUBLISH} from "../routes/app/routes";
import {AlertContext} from "../context/AlertContext";
import {SocketContext} from "../context/SocketContext";
import BotPromptOptimize from "./BotPromptOptimize";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes, faPaperPlane, faPaperclip, faDeleteLeft} from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown'
import retypeHighlight from 'rehype-highlight'

const BotDevelop = () => {
    const {isLoggedIn,} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state.id;
    const {showAlert, hideAlert} = useContext(AlertContext);
    const {current: ws} = useContext(SocketContext);

    const [prompt, setPrompt] = React.useState("");
    const [avatar, setAvatar] = React.useState("");
    const [name, setName] = React.useState("");
    const [botId,] = React.useState(id);

    const [isModalOpen, setIsModalOpen] = useState(false);  // 声明 modal 的 state
    const [activeMessageId, setActiveMessageId] = useState('');  // 声明 modal 监听的 message

    const hideBotModal = (isRefresh = false) => {
        setIsModalOpen(false);
        if (isRefresh) {
            getData()
        }
    }

    const OptimizePrompt = () => {
        if (prompt.length <= 0) {
            showAlert("请输入优化建议", "error")
            setTimeout(() => {
                hideAlert()
            }, 2000)
            return;
        }
        botOptimizePrompt(botId, prompt).then(res => {
            console.log(res)
            if (res.code === 200) {
                setIsModalOpen(true);
                setActiveMessageId(res.data.message_id);
            } else {
                showAlert("优化建议提交失败2", "error");
                setTimeout(() => {
                    hideAlert()
                }, 2000)
            }
        })
    }

    const getData = () => {
        botDetail(botId).then(res => {
            setPrompt(res.data.prompt);
            setAvatar(res.data.avatar);
            setName(res.data.name);
        })
        botChatHistory(botId).then(res => {
            let chatInfo = [];
            res.data.list.forEach((item) => {
                if (item.role === "user") {
                    chatInfo = [...chatInfo, {req: item.content.data, resp: ""}];
                } else {
                    chatInfo[chatInfo.length - 1].resp = item.content.data;
                }
            })
            setChatInfo([...chatInfo]);
        })
    }

    // 初始化时 通过 id 获取信息
    useEffect(() => {
        if (!isLoggedIn) {
            window.location.href = "/login";
        }
        getData()
    }, [id, isLoggedIn]);

    const jumpToBots = () => {
        startTransition(() => {
            navigate(BOTS);
        })
    }

    const handleOnBlur = () => {
        botPromptUpdate(botId, prompt).then(res => {
            console.log(res)
        }, error => {
            console.log(error)
        })
    }

    // 输入框文本消息
    const [text, setText] = useState('');

    const handleChange = (e) => {
        setText(e.target.value);
    };
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            // 检查是否按下了 Shift 键
            if (!e.shiftKey) {
                // 执行操作（例如，提交表单）
                handleSend()
                setText("");
            }
        }
    }

    const handleUpload = () => {
        //这里处理文件上传的逻辑
    };
    const handleClear = () => {
        botChatHistoryClear(botId).then(() => {
            // 清理后，清空 chatInfo
            setChatInfo([]);
        })
    };

    // const chatObject = {req: "", resp: ""};
    const [chatInfo, setChatInfo] = useState([]);

    const handleSend = () => {
        //这里处理发送消息的逻辑
        let newChatObject = {req: text, resp: ""};
        setChatInfo([...chatInfo, newChatObject]);
        botChat(botId, text).then(res => {
            if (res.code === 200) {
                let allMessage = "";
                ws.onmessage = (e) => {
                    console.log("Receive message: " + e.data);
                    /**
                     * @type{{code: number, data: {message_id: string, message: string, msg_type: string}, message: string}}
                     */
                    let msg = JSON.parse(e.data);
                    if (msg.code === 201 || msg.code === 202 || msg.code === 203) {
                        return
                    }
                    if (res.data.message_id === msg.data.message_id && msg.data.msg_type === "txt") {
                        allMessage += msg.data.content
                        //chatInfo last index .resp
                        console.log(chatInfo)
                        newChatObject.resp = allMessage;
                        setChatInfo([...chatInfo, newChatObject]);
                        // setResponseInfo(allMessage)
                    }
                }
            } else {
                showAlert("发送失败", "error");
                setTimeout(() => {
                    hideAlert()
                }, 2000)
            }
        }, error => {
            console.log(error)
        })
    };

    function handlePublish() {
        startTransition(() => {
            navigate(BOTS_PUBLISH, {state: {id: botId}});
        })
    }

    return (
        <div className="h-screen flex flex-col">
            <header className="h-20 bg-gray-50 shadow-md flex items-center justify-start px-5 py-6 z-50">
                <button tabIndex={0} className="hover:bg-gray-200 rounded-full "
                        onClick={jumpToBots}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d=" M15 19l-7-7 7-7"/>
                    </svg>
                </button>
                <div className="pl-5 pr-4">
                    <img src={avatar} alt="" className={"w-12 h-12 rounded-full"}/>
                </div>
                <div className="text-xl font-bold">
                    {name}
                </div>
                <div className="flex-grow"></div>
                <button className="btn btn-primary" onClick={handlePublish}>发布</button>
            </header>

            <main className="h-full flex ">
                <section className="w-2/3 bg-gray-50 h-full flex">

                    <div className="w-1/2 flex flex-col justify-center items-center bg-white shadow-md h-full">
                        <div
                            className={"w-full flex justify-start items-center text-xl font-bold bg-gray-50 border-b-2 border-b-gray-200 h-1/10"}>
                            <div className={"text-base-content w-full h-full pl-5 pt-3 pb-3 pr-5"}>Develop</div>
                        </div>
                        <div className="w-full h-full flex flex-col">
                            <div className={"flex items-center justify-between h-16"}>
                                <div className={"pl-7 pr-7 text-sm font-bold"}>
                                    Persona & Prompt
                                </div>
                                <button
                                    className="pl-7 pr-7 text-sm font-bold  text-primary btn-ghost justify-end"
                                    onClick={OptimizePrompt}>
                                    Optimize
                                </button>
                                {isModalOpen && <BotPromptOptimize hideBotModal={hideBotModal} botId={botId}
                                                                   activeMessageId={activeMessageId}/>}
                            </div>
                            <textarea
                                className="pl-7 pr-7 pt-1 flex-1 w-full h-full outline-none border-none "
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="输入你的 prompt"
                                onBlur={handleOnBlur}
                            />
                        </div>
                    </div>

                    <div className="w-1/2 float-end text-base-content">
                        <div
                            className={"w-full flex text-right items-center text-xl font-bold bg-gray-50 border-b-2 border-b-gray-200 h-1/10"}>
                            <div className={" w-full h-full pr-5 pl-5 pt-3 pb-3"}>Gemini</div>
                        </div>
                        <div className="w-full h-1/20 flex flex-col border-b-2 border-b-gray-200">
                            <div className={"w-full h-full pr-3 pl-3 pt-1 pb-1"}>Skills</div>
                        </div>
                    </div>
                </section>
                <section className="w-1/3 flex flex-col">
                    <div
                        className={"h-1/10 w-full flex justify-start items-center text-xl font-bold bg-gray-50 border-b-2 border-b-gray-200 "}>
                        <div className={"w-full h-full px-5 py-3"}>Preview</div>
                    </div>

                        <div className="h-4/5 flex flex-col-reverse  overflow-y-scroll relative">
                            {/*删除图标 移入时显示*/}
                            {
                                chatInfo.length > 0 &&
                                <button className="w-1/8 flex text-error absolute z-10  right-0 bottom-0"
                                        onClick={handleClear}
                                >
                                    <FontAwesomeIcon icon={faDeleteLeft}/>
                                </button>
                            }

                            <div className={"w-full  flex flex-col overflow-x-hidden"}>
                                {
                                    chatInfo.map((chat, index) => {

                                        const reqChat = chat.req ? (
                                            <div className="chat chat-end">
                                                <div className="chat-bubble chat-bubble-accent">{chat.req}</div>
                                            </div>
                                        ) : null;

                                        const respChat = chat.resp ? (
                                            <div className="chat chat-start">
                                                <div className="chat-bubble overflow-x-scroll animate-typing ">
                                                    <ReactMarkdown
                                                        rehypePlugins={[retypeHighlight]}>{chat.resp}</ReactMarkdown>
                                                </div>
                                            </div>
                                        ) : null;

                                        return (
                                            <>
                                                {reqChat}
                                                {respChat}
                                            </>
                                        );
                                    })
                                }

                            </div>
                        </div>

                        <div className="h-1/10 w-full flex flex-row  pt-2 float-end pb-5 items-center">
                            <button className="w-1/8 flex px-2" onClick={() => setText('')}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </button>
                            <div
                                className="border-2 border-gray-100  w-full flex flex-row items-center hover:border-primary rounded-xl">
                            <textarea
                                className="appearance-none  bg-transparent w-full leading-tight focus:outline-none overflow-hidden resize-none border-none py-2 px-5"
                                value={text}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                            />
                                <button className="btn btn-sm btn-ghost flex px-2 hover:shadow-xl"
                                        onClick={handleSend}>
                                    <FontAwesomeIcon icon={faPaperPlane}/>
                                </button>
                            </div>
                            <button className="w-1/8 flex px-2"
                                    onClick={handleUpload}>
                                <FontAwesomeIcon icon={faPaperclip}/>
                            </button>
                        </div>
                </section>
            </main>
        </div>
);
}

export default BotDevelop;