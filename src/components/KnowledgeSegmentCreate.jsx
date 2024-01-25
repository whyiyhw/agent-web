import {useContext, useEffect, useState} from 'react';
import {AlertContext} from "../context/AlertContext";
import {knowledgeSegmentCreate, knowledgeSegmentUpdate} from "@/api/api.js";
import PropTypes from "prop-types";

const KnowledgeSegmentCreate = ({
                                    hideKnowledgeSegmentModal,
                                    knowledgeId = 0,
                                    knowledgeUnitId = 0,
                                    knowledgeSegmentId = 0,
                                    knowledgeSegmentValue = "",
                                }) => {
    const [knowledgeSegmentIdState, setKnowledgeSegmentIdState] = useState(0);
    const [valueState, setValueState] = useState('');
    const {showAlert, hideAlert} = useContext(AlertContext);

    useEffect(() => {
        // number to int
        setKnowledgeSegmentIdState(Math.round(knowledgeSegmentId));
        setValueState(knowledgeSegmentValue);
    }, [knowledgeId, knowledgeUnitId, knowledgeSegmentId, knowledgeSegmentValue]);


    function parseData(data) {
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
        hideKnowledgeSegmentModal(true);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const knowledgeData = {
            knowledgeId: knowledgeId,
            knowledgeUnitId: knowledgeUnitId,
            value: valueState,
        }
        if (knowledgeSegmentIdState > 0) {
            const data = await knowledgeSegmentUpdate(knowledgeSegmentIdState, valueState);
            parseData(data);
            return
        }

        // create
        const data = await knowledgeSegmentCreate(knowledgeData.knowledgeId, knowledgeData.knowledgeUnitId,
            valueState
        );
        parseData(data);
    }


    return (
        <dialog id="my_knowleage_segment_modal" className={"modal modal-open"}>
            <div className="modal-box">
                <form onSubmit={submitHandler} className="w-full max-w-lg mx-auto mt-5">
                    <div className="flex flex-wrap -mx-3 mb-2 w-full">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                                知识点内容
                            </label>
                            <textarea className="textarea h-48 textarea-bordered textarea-primary w-full  mb-3"
                                      id="desc"
                                      placeholder={"你的知识点内容"}
                                      value={valueState}
                                      onChange={(e) => setValueState(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-primary flex-row"
                                type="submit">{knowledgeSegmentIdState > 0 ? '更新' : '创建'}</button>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn" onClick={hideKnowledgeSegmentModal}>取消</button>
                        </form>
                    </div>
                </form>
            </div>
        </dialog>
    );
}

KnowledgeSegmentCreate.propTypes = {
    hideKnowledgeSegmentModal: PropTypes.func,
    knowledgeId: PropTypes.number,
    knowledgeUnitId: PropTypes.number,
    knowledgeSegmentId: PropTypes.number,
    knowledgeSegmentValue: PropTypes.string,
};

export default KnowledgeSegmentCreate;