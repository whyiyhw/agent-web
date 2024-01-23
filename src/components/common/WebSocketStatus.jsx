import {useContext, useEffect, useState} from "react";
import {SocketContext} from "@/context/SocketContext.jsx";
import {WebhookIcon} from 'lucide-react';

const WebSocketStatus = () => {
    const ws = useContext(SocketContext);
    const [isConnected, setIsConnected] = useState(false);
    useEffect(() => {
        const timer = setInterval(() => {
            setIsConnected(ws.current && ws.current.readyState === WebSocket.OPEN);
        }, 1000);
        return () => clearInterval(timer);
    })

    return (
        <div
            className={isConnected ? "tooltip tooltip-bottom  tooltip-success" : "tooltip tooltip-bottom tooltip-error"}
            data-tip={isConnected ? "websocket 已连接" : "websocket 未连接"}>
            <WebhookIcon size={20} className={isConnected ? "text-green-500" : "text-red-500"}/>
        </div>
    )
}

export default WebSocketStatus;
