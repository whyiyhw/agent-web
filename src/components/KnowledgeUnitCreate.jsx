import {useContext, useEffect, useState} from 'react';
import {knowledgeUnitCreate, knowledgeUnitDetail, knowledgeUnitUpdate} from "../api/api";
import {AlertContext} from "../context/AlertContext";
import DataSet from "../assets/dataUnit.jpg";
import PropTypes from "prop-types";

const KnowledgeUnitCreate = ({hideKnowledgeUnitModal, knowledgeId, knowledgeUnitId = 0}) => {
    const [nameState, setName] = useState('');
    const {showAlert, hideAlert} = useContext(AlertContext);

    useEffect(() => {
        if (knowledgeUnitId > 0) {
            // get knowledge unit detail
            knowledgeUnitDetail(knowledgeUnitId).then(r => {
                setName(r.data.name);
            })
        }
        // number to int
    }, [knowledgeId, knowledgeUnitId]);


    const submitHandler = async (e) => {
        e.preventDefault();
        const knowledgeUnitData = {
            knowledgeId: knowledgeId,
            name: nameState,
        }
        if (knowledgeUnitId === 0) {
            // create
            const data = await knowledgeUnitCreate(knowledgeUnitData.knowledgeId, knowledgeUnitData.name);
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
        } else {
            // update
            const data = await knowledgeUnitUpdate(knowledgeUnitId, knowledgeUnitData.name);
            if (data.code !== 200) {
                showAlert(data.msg, "error");
                setTimeout(() => {
                    hideAlert();
                }, 2000);
                return;
            }
        }
        hideKnowledgeUnitModal(true);
    }

    return (
        <dialog id="my_knowleage_unit_modal" className={"modal modal-open"}>
            <div className="modal-box">
                <form onSubmit={submitHandler} className="w-full max-w-lg mx-auto mt-5">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   form="grid-first-name">
                                知识单元名称
                            </label>
                            <input className="input input-bordered input-primary w-full max-w-xs mb-3"
                                   id="name"
                                   placeholder="知识单元名称"
                                   type="text"
                                   value={nameState}
                                   onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   form="grid-last-name">
                            </label>
                            <img src={DataSet ?? ""} alt="avatar preview"
                                 className={"w-16 rounded-full  overflow-hidden h-16"}/>
                        </div>
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-primary flex-row"
                                type="submit">{knowledgeUnitId > 0 ? "更新" : "创建"}</button>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn" onClick={hideKnowledgeUnitModal}>取消</button>
                        </form>
                    </div>
                </form>
            </div>
        </dialog>
    );
}

KnowledgeUnitCreate.propTypes = {
    hideKnowledgeUnitModal: PropTypes.func.isRequired,
    knowledgeId: PropTypes.number.isRequired,
    knowledgeUnitId: PropTypes.number,
};

export default KnowledgeUnitCreate;