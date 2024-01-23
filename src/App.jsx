import './App.css'
import {AuthProvider} from "./context/AuthContext.jsx";
import {AlertProvider} from "./context/AlertContext.jsx";
import {BrowserRouter} from 'react-router-dom';
import {WebSocketProvider} from "./context/SocketContext.jsx";
import AppRoutes from './routes/app/routes.jsx';
import HomeRoutes from './routes/home/home.jsx';
import Skeleton from './components/Skeleton.jsx'; //骨架屏组件，你需要替换为你的实际组件
import {Suspense} from 'react';

function App() {
    return (
        <AuthProvider>
            <AlertProvider>
                <Suspense fallback={<Skeleton/>}>
                    <BrowserRouter>
                        {/* 需要 websocket */}
                        <WebSocketProvider>
                            <AppRoutes/>
                            <HomeRoutes/>
                        </WebSocketProvider>
                        {/*不需要 websocket */}
                    </BrowserRouter>
                </Suspense>
            </AlertProvider>
        </AuthProvider>
    );
}

export default App
