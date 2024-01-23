import {useRoutes} from 'react-router-dom';
import {lazy} from "react";
const Layout = lazy(() => import("../../pages/Layout"));
const BotList = lazy(() => import("../../components/BotList"));
const BotDevelop = lazy(() => import("../../components/BotDevelop"));
const ExploreBotList = lazy(() => import("../../components/ExploreList"));
const BotPublish = lazy(() => import("../../components/BotPublish"));

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
