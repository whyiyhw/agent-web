import React, {useContext, useEffect, useState} from 'react';
import {SocketContext} from "../context/SocketContext";
import {botPromptUpdate} from "../api/api";

const BotPromptOptimize = ({hideBotModal, botId, activeMessageId}) => {
    const {current: ws} = useContext(SocketContext);
    const [prompt, setPrompt] = useState("")
    const [disableSubmit, setDisableSubmit] = useState(true)


    useEffect(() => {
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
            if (activeMessageId === msg.data.message_id && msg.data.msg_type === "txt") {
                allMessage += msg.data.content
                setPrompt(allMessage)
            }
            if (activeMessageId === msg.data.message_id && msg.data.msg_type === "stop") {
                setDisableSubmit(false)
            }
        }
    }, [ws, activeMessageId])

    const handleSubmit = (e) => {
        e.preventDefault()
        botPromptUpdate(botId, prompt).then(res => {
            console.log(res)
            hideBotModal(true)
        }, error => {
            console.log(error)
        })
    }

    return (
        <dialog id="my_modal_1" className={"modal modal-open "}>
            <div className="modal-box  w-1/3 max-w-5xl h-2/3 ">
                <form onSubmit={handleSubmit} className="w-full  h-full max-w-lg mx-auto mt-5  ">
                    <div className="text-xl font-bold pb-3 ">Prompt Optimization</div>
                    <textarea
                        className="bg-white appearance-none  bg-transparent   flex-1 w-full h-3/4 outline-none border-none overflow-auto"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <div className="modal-action overflow-hidden ">
                        <button
                            className={disableSubmit ? "btn flex-row btn-disabled" : "btn flex-row btn-primary"}
                            type="submit">使用
                        </button>
                        <form method="dialog">
                            <button className="btn" onClick={hideBotModal}>取消</button>
                        </form>
                    </div>
                </form>
            </div>
        </dialog>
    );
}

export default BotPromptOptimize;