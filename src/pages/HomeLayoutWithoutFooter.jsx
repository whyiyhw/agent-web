import {Outlet} from 'react-router-dom';
import Header from "../components/Header";

const  HomeLayoutWithoutFooter = () => {
    return (
        <div className="flex flex-col min-h-screen min-w-screen">
            <Header/>
            <Outlet/>
        </div>
    );
}

export default HomeLayoutWithoutFooter;