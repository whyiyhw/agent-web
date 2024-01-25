import {useContext, useEffect, useState, useTransition} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {botCustomerBind, botCustomerList} from "../api/api";
import {AlertContext} from "../context/AlertContext";
import QRCode from 'qrcode.react';

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
                    <button className="btn btn-xs btn-primary ml-5" onClick={() => publishBot(user.open_kf_id)}>发布
                    </button>
                </div>
            ))}
        </div>
    );
}

function PublishPage() {
    const [activeTab, setActiveTab] = useState('channel1');
    const navigate = useNavigate();
    let [, startTransition] = useTransition();
    const {showAlert, hideAlert} = useContext(AlertContext);

    // 从 location 中取id
    let location = useLocation()
    const botId = location.state.id
    const webAppUrl = `${import.meta.env.VITE_APP_URL}/chat?botId=${botId}`;

    const jumpToWeb = () => {
        startTransition(() => {
            navigate("/chat?botId=" + botId);
        });
    }
    const  copyUrl = () => {
        navigator.clipboard.writeText(webAppUrl).then(() => {
            showAlert('复制成功', 'success');
            setTimeout(() => {
                hideAlert();
            }, 2000);
        })
    }
    const renderChannel = () => {
        switch (activeTab) {
            case 'channel2':
                return <ChannelOneContent botId={botId}/>;
            case 'channel1':
                return <div className="flex flex-row items-center justify-center space-y-4">
                    <QRCode value={webAppUrl}/>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <button className="btn btn-md btn-ghost btn-outline ml-5" onClick={jumpToWeb}>跳转至对话页面</button>
                        <button className="btn btn-md btn-ghost btn-outline ml-5" onClick={copyUrl}>复制链接</button>
                    </div>
                </div>;
            case 'channel3':
                return <div>...</div>;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full pt-40 space-y-4">
            <div role="tablist" className="tabs tabs-lifted tabs-lg">
                <a
                    role="tab" className={activeTab === "channel1" ? "tab tab-active" : "tab"}
                    onClick={() => setActiveTab('channel1')}
                >web端</a>
                <a role="tab" className={activeTab === "channel2" ? "tab tab-active" : "tab"}
                     onClick={() => setActiveTab('channel2')}
                >企业微信客服</a>
                <a role="tab" className={activeTab === "channel3" ? "tab tab-active" : "tab"}
                        onClick={() => setActiveTab('channel3')}
                >...</a>
            </div>
            <div>
                {renderChannel()}
            </div>
        </div>
    );
}

export default PublishPage;