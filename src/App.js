import './App.css';
import AppRoutes from './routes/app/routes';
import HomeRoutes from './routes/home/home';
import {BrowserRouter} from 'react-router-dom';
import {AlertProvider} from './context/AlertContext';
import {AuthProvider} from './context/AuthContext';
import {WebSocketProvider} from "./context/SocketContext";

function App() {
    return (
        <AuthProvider>
            <AlertProvider>
                <BrowserRouter>
                    {/* 需要 websocket */}
                    <WebSocketProvider>
                        <AppRoutes/>
                    </WebSocketProvider>
                    {/*不需要 websocket */}
                    <HomeRoutes/>
                </BrowserRouter>
            </AlertProvider>
        </AuthProvider>
    );
}

export default App;
