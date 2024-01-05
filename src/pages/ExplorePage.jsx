import React, {Component} from 'react';
import SideBar from "../components/SideBar";
import ExploreBotList from "../components/ExploreList";

class ExplorePage extends Component {
    render() {
        return (
            <div className="flex flex-col min-h-screen">
                <SideBar/>
                <ExploreBotList/>
            </div>
        );
    }
}

ExplorePage.propTypes = {};

export default ExplorePage;