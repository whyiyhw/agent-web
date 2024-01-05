import React, {startTransition, useContext, useEffect, useState} from 'react';
import {botCustomerBind, botCustomerList} from "../api/api";
import {AlertContext} from "../context/AlertContext";
import {useLocation} from "react-router-dom";
import {BOTS_PUBLISH} from "../routes/app/routes";

function ChannelOneContent({botId}) {
    const [users, setUsers] = useState([])
    const {showAlert, hideAlert} = useContext(AlertContext);

    useEffect(() => {
        botCustomerList(1, 100).then(res => {
            if (res.code === 200) {
                setUsers(res.data.list);
            }
        })
    }, [])

    const publishBot = (open_kf_id) => {
        botCustomerBind(botId, open_kf_id).then(r => {
            if (r.code === 200) {
                showAlert('发布成功', 'success');
                setTimeout(() => {
                    hideAlert();
                }, 2000);
            }
        })
    }

    return (
        <div className="flex flex-col space-y-4">
            {users.map((user) => (
                <div key={user.open_kf_id} className="flex items-center p-2 border-b">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-4"/>
                    <div className="flex-grow">
                        <h2 className="text-lg font-semibold">{user.name}</h2>
                    </div>
                    <button className="btn btn-primary" onClick={() => publishBot(user.open_kf_id)}>发布</button>
                </div>
            ))}
        </div>
    );
}

function PublishPage() {
    const [activeTab, setActiveTab] = useState('channel1');

    // 从 location 中取id
    let location = useLocation()
    const botId = location.state.id
    console.log(botId)
    const renderChannel = () => {
        switch (activeTab) {
            case 'channel1':
                return <ChannelOneContent botId={botId}/>;
            case 'channel2':
                return <div>web端...</div>;
            case 'channel3':
                return <div>...</div>;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full pt-40 space-y-4">
            <div className="flex space-x-4 mb-4">
                <button onClick={() => setActiveTab('channel1')} className="btn btn-outline">企业微信客服</button>
                <button onClick={() => setActiveTab('channel2')} className="btn btn-outline">web端</button>
                <button onClick={() => setActiveTab('channel3')} className="btn btn-outline">...</button>
            </div>
            <div>
                {renderChannel()}
            </div>
        </div>
    );
}

export default PublishPage;