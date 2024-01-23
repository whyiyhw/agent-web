import {Outlet} from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomeLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
}

export default HomeLayout;