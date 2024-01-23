import {useState} from "react";
import logo from '../assets/01.jpeg';
import loginImage from "../assets/login.jpg"

const MainContent = () => {
    // 聊天消息
    const [messages] = useState([
        {
            id: 1,
            title: "7x24-实时聊天",
            chat_list: [
                {
                    chatType: "chat-start",
                    name: "bot-react-master",
                    message: "你好，我是你的专属微信聊天机器人!",
                    time: "12:45",
                    avatar: logo,
                    type: "text",
                },
                {
                    chatType: "chat-end",
                    name: "法外狂徒张三",
                    message: "怎么学习react？",
                    time: "12:46",
                    avatar: loginImage,
                    type: "text",
                },
                {
                    chatType: "chat-start",
                    name: "bot-react-master",
                    message: "用心学习～",
                    time: "12:47",
                    avatar: logo,
                    type: "text",
                },
            ],
        },
        {
            id: 2,
            title: "知识库",
            chat_list: [
                {
                    chatType: "chat-start",
                    name: "xxx公司-专属客服",
                    message: "你好，我是xxx公司的专属客服",
                    time: "12:45",
                    avatar: logo,
                    type: "text",
                },
                {
                    chatType: "chat-end",
                    name: "法外狂徒张三",
                    message: "你们家产品不行呀!",
                    time: "12:45",
                    avatar: loginImage,
                    type: "text",
                },
                {
                    chatType: "chat-start",
                    name: "xxx公司-专属客服",
                    message: "非常抱歉～",
                    time: "12:47",
                    avatar: logo,
                    type: "text",
                },
            ]
        }
    ]);

    // 时间线
    const [timeline] = useState([
        {
            id: 1,
            time: "2023-02-12",
            className: "timeline-start md:text-end",
            title: "idea萌发",
            content: "项目的第一次提交, 使用 fc service less 来验证企业微信可行性",
        },
        {
            id: 2,
            time: "2023-02-19",
            className: "timeline-end",
            title: "加入golang服务",
            content: "fc 限制太大，转为使用 golang 后端服务实现",
        },
        {
            id: 3,
            time: "2023-03-08",
            className: "timeline-start md:text-end",
            title: "v0.3.0",
            content: "第一个稳定版本，支持 ChatGpt3.5",
        },
        {
            id: 4,
            time: "2023-03-18",
            className: "timeline-end",
            title: "v0.4.0",
            content: "支持服务器IP直接访问",
        },
        {
            id: 5,
            time: "2023-04-2",
            className: "timeline-start md:text-end",
            title: "v0.5.0",
            content: "支持多渠道客服消息",
        },
        {
            id: 6,
            time: "2023-04-18",
            className: "timeline-end",
            title: "v0.6.0",
            content: "更新支持断点输出，语音输入，自适应上下文，与上下文切换，支持 azure_openai，支持基于向量引擎的语料知识库",
        },
        {
            id: 7,
            time: "2023-12-xx",
            className: "timeline-start md:text-end",
            title: "v1.x",
            content: "补充管理后台，精细化调整bot，支持知识库，多bot",
        },
    ])

    return (
        <div className="card  xl space-y-5 p-5 ">
            <div className="flex flex-row card space-x-8 justify-between">
                {
                    messages.map((item, index) => {
                        return (
                            <div key={index} className="card-body shadow bordered">
                                <h2 className="card-title">{item.title}</h2>
                                {
                                    item.chat_list.map((item, index) => {
                                        return (
                                            <div key={index} className={"chat " + item.chatType}>
                                                <div className="chat-image avatar">
                                                    <div className="w-10 rounded-full">
                                                        <img alt="Tailwind CSS chat bubble component"
                                                             src={item.avatar}/>
                                                    </div>
                                                </div>
                                                <div className="chat-header">
                                                    {item.name}
                                                    <time className="text-xs opacity-50">{item.time}</time>
                                                </div>
                                                <div className="chat-bubble">
                                                    {item.message}
                                                </div>
                                                <div className="chat-footer opacity-50">
                                                    {item.chatType}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>

            <h2 className="text-lg  font-bold mt-5 ">开发时间线</h2>
            <ul className="timeline  timeline-snap-icon  max-md:timeline-compact timeline-vertical">
                {
                    timeline.map((item, index) => {
                        return (
                            <li key={index}>
                                <div className="timeline-middle">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                         className="h-5 w-5">
                                        <path fillRule="evenodd"
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <div className={item.className + " mb-10"}>
                                    <time className="font-mono italic">{item.time}</time>
                                    <div className="text-lg font-black">{item.title}</div>
                                    {item.content}
                                </div>
                                <hr/>
                            </li>)
                    })
                }
            </ul>
        </div>
    );
};

export default MainContent;