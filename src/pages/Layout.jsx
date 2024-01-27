import SideBar from '../components/SideBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="flex flex-row h-screen w-screen text-base-content">
            <SideBar />
            <Outlet />
        </div>
    );
}

export default Layout;