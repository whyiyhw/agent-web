import React from 'react';
import {useRoutes} from 'react-router-dom';
import HomeLayout from "../../pages/HomeLayout";
import MainContent from "../../components/MainContent";
import Login from "../../components/Login";

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
    ]);
}
