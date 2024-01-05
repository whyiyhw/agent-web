import React, {lazy} from 'react';
import {useRoutes} from 'react-router-dom';
import Layout from "../../pages/Layout";
import BotList from "../../components/BotList";
import BotDevelop from "../../components/BotDevelop";
import ExploreBotList from "../../components/ExploreList";
import BotPublish from "../../components/BotPublish";


export const HOME = "/";
export const EXPLORE = "/explore";
export const BOTS = "/bots";
export const BOTS_PUBLISH = BOTS + "/publish";
export const BOT_DEVELOP = "/bot/develop";
export const LOGIN = "/Login";

export const GITHUB = "https://github.com/whyiyhw";

export default function Routes() {
    return useRoutes([
        {
            path: EXPLORE,
            element: <Layout/>,
            children: [
                {index: true, element: <ExploreBotList/>},
            ]
        },
        {
            path: BOT_DEVELOP,
            element: <BotDevelop/>,
        },
        {
            path: BOTS,
            element: <Layout/>,
            children: [
                {index: true, element: <BotList/>},
                {path: "publish", element: <BotPublish/>},
            ]
        }
    ]);
}
