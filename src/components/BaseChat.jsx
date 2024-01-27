import {useContext, useEffect, useRef, useState} from 'react';
import {botChat, botChatHistory, botChatHistoryClear, botDetail} from "@/api/api.js";
import {AlertContext} from "../context/AlertContext";
import {SocketContext} from "../context/SocketContext";
import {AuthContext} from "../context/AuthContext";
import Markdown from "@/components/Markdown.jsx";
import {XCircle} from "lucide-react";
import WebSocketStatus from "@/components/common/WebSocketStatus.jsx";

const BaseChat = () => {
    const {isLoggedIn,} = useContext(AuthContext);
    const [chatInfo, setChatInfo] = useState([]);
    const [text, setText] = useState("");
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    const {showAlert, hideAlert} = useContext(AlertContext);
    const ws = useContext(SocketContext);

    // 从 url /chat/?botId=2 中 读取 botId
    const botId = parseInt(new URLSearchParams(window.location.search).get("botId"));

    const handleChange = (event) => {
        let text = event.target.value.trimStart();
        setText(text);
    }

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
    useEffect(() => {
        if (!isLoggedIn) {
            // 把当前地址信息保存在 localStorage 中
            localStorage.setItem("previousPageUrl", window.location.pathname + window.location.search);
            window.location.href = "/login";
            return
        }
        getData()
    }, [botId, isLoggedIn]);

    const getData = () => {
        botDetail(botId).then(res => {
            setAvatar(res.data.avatar);
            setName(res.data.name);
        })
        botChatHistory(botId).then(res => {
            let chatInfo = [];
            if (res.data.list) {
                res.data.list.forEach((item) => {
                    if (item.role === "system") {
                        return
                    }
                    if (item.role === "user") {
                        chatInfo = [...chatInfo, {req: item.content.data, resp: ""}];
                    } else {
                        chatInfo[chatInfo.length - 1].resp = item.content.data;
                    }
                })
            }
            setChatInfo([...chatInfo]);
        })
    }

    // 使用ref记住滚动区域
    const messagesEndRef = useRef();
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
        }
    }, [chatInfo]);

    const handleSend = () => {
        //这里处理发送消息的逻辑
        // 去除 text 前后 空格
        if (text.trim() === "") {
            showAlert("发送消息不能为空", "error");
            return
        }
        //如何获取最新的 ws
        if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
            showAlert("websocket 连接异常,请刷新后再试", "error");
            setTimeout(() => {
                hideAlert()
            }, 2000)
            return
        }
        let txt = text.trim();
        let newChatObject = {req: txt, resp: ""};
        setChatInfo([...chatInfo, newChatObject]);
        botChat(botId, txt).then(res => {
            if (res.code === 200) {
                let allMessage = "";
                ws.current.onmessage = (e) => {
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

    const handleClear = () => {
        botChatHistoryClear(botId).then(() => {
            // 清理后，清空 chatInfo
            setChatInfo([]);
        })
    };

    const result = chatInfo.map((chat) => {

        const reqChat = chat.req ? (
            <div className="chat chat-end pr-2">
                <div className="chat-bubble  chat-bubble-accent opacity-60">
                    <Markdown text={chat.req} inversion={false} asRawText={true}
                              error={false} loading={false}/>
                </div>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img src="https://picsum.photos/200/300" alt="" className="w-10 h-10 rounded-full"/>
                    </div>
                </div>
            </div>
        ) : null;

        const respChat = chat.resp ? (
            <div className="chat chat-start pl-2">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img src={avatar ?? "https://picsum.photos/200/300"} alt="" className="w-10 h-10 rounded-full"/>
                    </div>
                </div>
                <div className="chat-bubble opacity-80">
                    <Markdown text={chat.resp} inversion={false} asRawText={false}
                              error={false} loading={false}/>
                </div>
            </div>
        ) : (
            // 展示加载中的动画
            <div className="chat chat-start pl-2">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img src={avatar ?? "https://picsum.photos/200/300"} alt="" className="w-10 h-10 rounded-full"/>
                    </div>
                </div>
                <div className="chat-bubble opacity-80">
                    <div className="flex items-center justify center">
                        <div className="w-10 h-10">
                            <span className="loading loading-dots loading-md"></span>
                        </div>
                    </div>
                </div>
            </div>
        );

        return (
            <>
                {reqChat}
                {respChat}
            </>
        );
    })

    return (
        <div className="h-screen w-screen flex flex-col  items-center justify-center">
            <div className="
            sm:w-full md:w-2/3 lg:w-2/3
            sm:h-full md:h-4/5 lg:h-4/5
            shadow-xl rounded-xl overflow-auto border border-gray-100 ">
                {/* 固定悬空*/}
                <header className="w-full h-1/10">
                    <div className="navbar bg-base-100">
                        <div className="flex-1">
                            <a className="btn btn-ghost text-xl">{name}</a>
                            <WebSocketStatus/>
                        </div>
                        <div className="flex-none">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="Tailwind CSS Navbar component"
                                             src={avatar}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                {/*半圆*/}
                <div className="h-max-2/3 h-2/3 flex flex-grow flex-col border rounded-xl
                  overflow-x-hidden">
                    {result}
                    {/* 在这添加一个ref，使其在每次添加新的消息后滚动到这个元素位置 */}
                    <div ref={messagesEndRef}/>
                </div>


                {/*固定在最下面*/}
                <div className="flex items-end justify-start mt-5 space-x-2">
                    <button
                        className="rounded-full shadow-inner hover:shadow p-2 w-10 h-10 flex items-center justify-center ml-3 text-red-600">
                        <XCircle onClick={handleClear}/>
                    </button>
                    <textarea className="border rounded-lg p-2 w-4/5 mr-5" rows="2"
                              onChange={handleChange}
                              onKeyDown={handleKeyDown}
                              value={text}
                              placeholder="Write a message..."
                    ></textarea>
                </div>
            </div>
        </div>
    )
}

export default BaseChat;