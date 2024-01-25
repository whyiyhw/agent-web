import {useContext, useEffect, useState} from 'react';
import {knowledgeCreate, knowledgeUpdate} from "../api/api";
import {AlertContext} from "../context/AlertContext";
import DataSet from "../assets/dataset.png";
import PropTypes from "prop-types";

const KnowledgeCreate = ({
                             hideKnowledgeModal,
                             knowledgeId = 0,
                             knowledgeName = "",
                             knowledgeAvatar = "",
                             knowledgeDesc = "",
                             setKnowledgeName = (s) => { console.log(s)},
                             setKnowledgeDesc = (s) => { console.log(s)},
                         }) => {
    const [knowledgeIdState, setKnowledgeIdState] = useState(0);
    const [nameState, setName] = useState('');
    const [avatarState, setAvatar] = useState('');
    const [avatarURL,] = useState('');
    const [descState, setDesc] = useState('');
    const {showAlert, hideAlert} = useContext(AlertContext);

    useEffect(() => {
        // number to int
        setKnowledgeIdState(Math.round(knowledgeId));
        setName(knowledgeName);
        setAvatar(knowledgeAvatar);
        setDesc(knowledgeDesc);
    }, [knowledgeId, knowledgeName, knowledgeAvatar, knowledgeDesc]);


    const submitHandler = async (e) => {
        e.preventDefault();
        const knowledgeData = {
            knowledgeId: knowledgeIdState,
            name: nameState,
            avatar: avatarState,
            desc: descState
        }
        console.log(knowledgeIdState)
        if (knowledgeIdState > 0) {
            const data = await knowledgeUpdate(knowledgeData.knowledgeId, knowledgeData.name, knowledgeData.avatar, knowledgeData.desc);
            if (data.code !== 200) {
                showAlert(data.msg, "error");
                setTimeout(() => {
                    hideAlert();
                }, 2000);
                return;
            }
            showAlert(data.msg, "success");
            setKnowledgeName(knowledgeData.name);
            setKnowledgeDesc(knowledgeData.desc);
            setTimeout(() => {
                hideAlert();
            }, 1500);
        } else {
            // create
            const data = await knowledgeCreate(knowledgeData.name, knowledgeData.avatar, knowledgeData.desc);
            if (data.code !== 200) {
                showAlert(data.msg, "error");
                setTimeout(() => {
                    hideAlert();
                }, 2000);
                return;
            }
            showAlert(data.msg, "success");
            setTimeout(() => {
                hideAlert();
            }, 1500);
        }
        hideKnowledgeModal(true);
    }


    // avatarURL 随机生成
    const getAvatarURL = () => {
        if (avatarURL !== "") {
            return avatarURL;
        }
        return DataSet;
    }

    return (
        <dialog id="my_knowleage_modal" className={"modal modal-open"}>
            <div className="modal-box">
                <form onSubmit={submitHandler} className="w-full max-w-lg mx-auto mt-5">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   form="grid-first-name">
                                知识库名称
                            </label>
                            <input className="input input-bordered input-primary w-full max-w-xs mb-3"
                                   id="name"
                                   placeholder="知识库名称"
                                   type="text"
                                   value={nameState}
                                   onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   form="grid-last-name">
                            </label>
                            <img src={getAvatarURL()} alt="avatar preview"
                                 className={"w-16 rounded-full  overflow-hidden h-16"}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                知识库描述
                            </label>
                            <textarea className="textarea h-24 textarea-bordered textarea-primary w-full max-w-xs mb-3"
                                      id="desc"
                                      placeholder={"描述一下你的知识库"}
                                      value={descState}
                                      onChange={(e) => setDesc(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-primary flex-row"
                                type="submit">{knowledgeIdState > 0 ? '更新' : '创建'}</button>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn" onClick={hideKnowledgeModal}>取消</button>
                        </form>
                    </div>
                </form>
            </div>
        </dialog>
    );
}

KnowledgeCreate.propTypes = {
    hideKnowledgeModal: PropTypes.func.isRequired,
    knowledgeId: PropTypes.number,
    knowledgeName: PropTypes.string,
    knowledgeAvatar: PropTypes.string,
    knowledgeDesc: PropTypes.string,
    setKnowledgeName: PropTypes.func,
    setKnowledgeDesc: PropTypes.func,
};

export default KnowledgeCreate;