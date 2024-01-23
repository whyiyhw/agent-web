import {useContext, useEffect, useState} from 'react';
import {botCreate, botDetail, botUpdate} from "../api/api";
import {AlertContext} from "../context/AlertContext";
import defaultBotIcon3 from "../assets/default_bot_icon3.png";
import defaultBotIcon2 from "../assets/default_bot_icon2.png";
import defaultBotIcon4 from "../assets/default_bot_icon4.png";
import defaultBotIcon6 from "../assets/default_bot_icon6.png";
import PropTypes from "prop-types";

const BotCreate = ({hideBotModal, botId}) => {
    const [botIdState, setBotId] = useState(0);
    const [nameState, setName] = useState('');
    const [avatarState, setAvatar] = useState('');
    const [avatarURL, setAvatarURL] = useState('');
    const [descState, setDesc] = useState('');
    const {showAlert, hideAlert} = useContext(AlertContext);

    useEffect(() => {
        if (botId > 0) {
            // 获取详情，然后渲染
            botDetail(botId).then(
                data => {
                    if (data.code !== 200) {
                        showAlert(data.msg, "error");
                        setTimeout(() => {
                            hideAlert();
                        }, 2000);
                        return;
                    }
                    setBotId(data.data.id);
                    setName(data.data.name);
                    if (data.data.avatar !== "") {
                        setAvatar(data.data.avatar);
                        setAvatarURL(data.data.avatar);
                    } else {
                        let avatar = getAvatarURL()
                        setAvatarURL(avatar);
                        setAvatar(avatar);
                    }
                    setDesc(data.data.desc);
                }, error => {
                    console.log(error)
                    showAlert(error, "error");
                    setTimeout(() => {
                        hideAlert();
                    }, 2000);
                }
            );
        } else {
            setBotId(0);
            setName('');
            setAvatar('');
            setAvatarURL('');
            setDesc('');
        }
    }, [botId]);


    const submitHandler = async (e) => {
        e.preventDefault();
        const botData = {
            botId: botIdState,
            name: nameState,
            avatar: avatarState,
            desc: descState
        }
        console.log(botIdState)
        if (botIdState > 0) {
            const data = await botUpdate(botData.botId, botData.name, botData.avatar, botData.desc);
            if (data.code !== 200) {
                showAlert(data.msg, "error");
                setTimeout(() => {
                    hideAlert();
                }, 2000);
                return;
            }
        } else {
            // create
            const data = await botCreate(botData.name, botData.avatar, botData.desc);
            if (data.code !== 200) {
                showAlert(data.msg, "error");
                setTimeout(() => {
                    hideAlert();
                }, 2000);
                return;
            }
        }
        hideBotModal(true);

        console.log(botData);
    }
    // const avatarChangeHandler = (e) => {
    //     if (e.target.files && e.target.files[0]) {
    //         let img = e.target.files[0];
    //         setAvatar(img);
    //         setAvatarURL(URL.createObjectURL(img));
    //     }
    // }

    // avatarURL 随机生成
    const getAvatarURL = () => {
        if (avatarURL !== "") {
            return avatarURL;
        }
        // 随机
        const map = {
            '1': defaultBotIcon2,
            '2': defaultBotIcon3,
            '3': defaultBotIcon4,
            '4': defaultBotIcon6
        }
        return map[Math.floor(Math.random() * 4) + 1];
    }

    function handleClickChangeAvatar() {
        const map = {
            '1': defaultBotIcon2,
            '2': defaultBotIcon3,
            '3': defaultBotIcon4,
            '4': defaultBotIcon6
        }
        let avatar = map[Math.floor(Math.random() * 4) + 1]
        setAvatar(avatar);
        setAvatarURL(avatar);
    }

    return (
        <dialog id="my_modal" className={"modal modal-open"}>
            <div className="modal-box">
                <form onSubmit={submitHandler} className="w-full max-w-lg mx-auto mt-5">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   form="grid-first-name">
                                bot名称
                            </label>
                            <input className="input input-bordered input-primary w-full max-w-xs mb-3"
                                   id="name"
                                   placeholder="bot名称"
                                   type="text"
                                   value={nameState}
                                   onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   form="grid-last-name">
                                bot头像
                            </label>
                            {/*<input className="file-input file-input-ghost w-full max-w-xs"*/}
                            {/*       id="avatar"*/}
                            {/*       type="file"*/}
                            {/*       accept="image/*"*/}
                            {/*       value={avatarState}*/}
                            {/*       onChange={avatarChangeHandler}*/}
                            {/*/>*/}
                            <img src={getAvatarURL()} alt="avatar preview"
                                 className={"w-16 rounded-full  overflow-hidden h-16"}
                                 onClick={handleClickChangeAvatar}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                bot描述
                            </label>
                            <textarea className="textarea h-24 textarea-bordered textarea-primary w-full max-w-xs mb-3"
                                      id="desc"
                                      placeholder={"描述一下你的机器人"}
                                      value={descState}
                                      onChange={(e) => setDesc(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-primary flex-row"
                                type="submit">{botIdState > 0 ? '更新' : '创建'}</button>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn" onClick={hideBotModal}>取消</button>
                        </form>
                    </div>
                </form>
            </div>
        </dialog>
    );
}

BotCreate.propTypes = {
    hideBotModal: PropTypes.func.isRequired,
    botId: PropTypes.number.isRequired
};

export default BotCreate;