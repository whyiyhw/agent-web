import {useRoutes} from 'react-router-dom';
import {lazy} from "react";
const HomeLayout = lazy(() => import("../../pages/HomeLayout"));
const HomeLayoutWithoutFooter = lazy(() => import("../../pages/HomeLayoutWithoutFooter"));
const MainContent = lazy(() => import("../../components/MainContent"));
const Login = lazy(() => import("../../components/Login"));
const BaseChat = lazy(() => import("../../components/BaseChat"));

export const Home = "/";

export default function Routes() {
    return useRoutes([
        {
            path: Home,
            element: <HomeLayout/>,
            children: [
                {index: true, element: <MainContent/>},
                {path: "login", element: <Login/>},
            ]
        },
        {
            path: Home,
            element: <HomeLayoutWithoutFooter/>,
            children: [
                {path: "chat", element: <BaseChat/>},
            ]
        },
    ]);
}
