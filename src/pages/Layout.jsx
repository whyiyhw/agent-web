import SideBar from '../components/SideBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="flex flex-row min-h-screen text-base-content">
            <SideBar />
            <Outlet />
        </div>
    );
}

export default Layout;