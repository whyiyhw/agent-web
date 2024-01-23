import  {createContext, createRef, useEffect} from 'react';

export const SocketContext = createContext({});

export const WebSocketProvider = ({children}) => {
    const ws = createRef();

    useEffect(() => {
        let limitConnect = 3;   // 断线重连次数
        let timeConnect = 0;    // 记录重连次数
        if (ws && ws.current != null) {
            return
        }
        let heartBeat = 0;
        const connectToWebSocket = () => {

            ws.current = new WebSocket(`${import.meta.env.VITE_APP_WS_URL}`);

            const authObject = {
                "action": "auth",
                "token": localStorage.getItem("token")
            };
            const heartbeatObject = {
                "action": "heartbeat"
            };

            const reconnect = () => {
                // lockReconnect加锁，防止onclose、onerror两次重连
                if (limitConnect > 0) {
                    limitConnect--;
                    timeConnect++;
                    console.log("NO:" + timeConnect + " times reconnect");
                    // 进行重连
                    setTimeout(function () {
                        connectToWebSocket();
                    }, 3000);
                }
            }

            // 心跳清理
            const heartBeatClear = function () {
                clearInterval(heartBeat);
            }

            ws.current.onopen = () => {
                console.log('connected...');
                // 进行认证
                ws.current.send(JSON.stringify(authObject));
                // 开启心跳
                heartBeat = setInterval(function () {
                    ws.current.send(JSON.stringify(heartbeatObject));
                }, 40000);
                limitConnect = 3;
                timeConnect = 0;
            };


            ws.current.onclose = () => {
                console.log('disconnected...')
                ws.current = null;
                // You may want to implement some reconnection logic here
                // 清理心跳
                if (heartBeat > 0) {
                    heartBeatClear(heartBeat);
                }
                // 开始重连
                reconnect();
            };

            ws.current.onerror = err => {
                console.error(`WebSocket encountered error: ${err.message}, closing socket`);
                ws.current && ws.current.close();
            };
        };

        // 判断 是否已经连接 通过  本地localstorage 来处理严格模式，解决重复渲染的问题
        connectToWebSocket();

        // 清理函数，组件卸载时关闭WebSocket连接
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        }
    }, [ws]);

    return (
        <SocketContext.Provider value={ws}>
            {children}
        </SocketContext.Provider>
    );
}