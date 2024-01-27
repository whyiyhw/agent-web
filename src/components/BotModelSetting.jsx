import {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {botModelDetail, botModelUpdate} from "@/api/api.js";
import {AlertContext} from "@/context/AlertContext.jsx";

const BotModelModal = ({hideBotModelModal, botId}) => {
    const modelServices = {
        'openai': ['gpt-4', 'gpt-3-turbo'],
        'gemini': ['gemini-pro']
    };
    const [botIdState,] = useState(botId);
    const [selectedModel, setSelectedModel] = useState("gemini");
    const [selectedModelName, setSelectedModelName] = useState("");
    const [temperature, setTemperature] = useState("0.7");
    const {showAlert, hideAlert} = useContext(AlertContext);

    const handleModelChange = event => {
        setSelectedModel(event.target.value);
        setSelectedModelName(modelServices[event.target.value][0]);
    };
    const handleModelNameChange = event => setSelectedModelName(event.target.value);
    const handleTempChange = event => {
        // 截断保留两位小数，避免出现0.7000000000000001
        let temp = event.target.value;
        // 根据小数点截断，并保留两位小数
        temp = temp.toString().split('.')[0] + '.' + temp.toString().split('.')[1].slice(0, 2);
        setTemperature(temp);
    }

    const submitHandler = async (e) => {
        // 抑制冒泡事件
        e.preventDefault();
        console.log("submit");
        // temperature 转 float
        let temperatureF = parseFloat(temperature);
        const data = await botModelUpdate(botIdState, selectedModel, selectedModelName, temperatureF)
        if (data.code === 200) {
            showAlert(data.msg, "success");
            hideBotModelModal();
        } else {
            showAlert(data.msg, "error");
            setTimeout(() => {
                hideAlert();
            }, 2000);
        }
    }

    useEffect(() => {
        console.log("useEffect");
        botModelDetail(botIdState).then((data) => {
            setSelectedModel(data.data.model_type)
            setSelectedModelName(data.data.model_name);
            //data.data.temperature float 转 string 并保留两位小数
            setTemperature(
                data.data.temperature.toString().split('.')[0] +
                '.' + data.data.temperature.toString().split('.')[1].slice(0, 2)
            );
        })
    }, [botIdState])

    return (
        <dialog id="my_model_modal" className={"modal modal-open"}>
            <div className="modal-box">
                <form onSubmit={submitHandler} className="w-full max-w-lg mx-auto mt-5 ">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <label>
                            模型供应商：
                            <select value={selectedModel} className={"select select-bordered"}
                                    onChange={handleModelChange}>
                                {Object.keys(modelServices).map((service) => (
                                    <option key={service} value={service}>
                                        {service}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <label>
                            模型：
                            <select value={selectedModelName} className={"select select-bordered"}
                                    onChange={handleModelNameChange}>
                                {modelServices[selectedModel].map((model) => (
                                    <option key={model} value={model}>
                                        {model}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <label className="flex flex-row">
                           <div>Temperature：</div>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                className={"range range-xs w-2/3"}
                                value={temperature}
                                onChange={handleTempChange}
                            />
                            <div>{temperature}</div>
                        </label>
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-primary flex-row" type={"submit"}>更新</button>
                        <form method="dialog">
                            <button className="btn" onClick={hideBotModelModal}>取消</button>
                        </form>
                    </div>
                </form>
            </div>
        </dialog>
    );
}

BotModelModal.propTypes = {
    hideBotModelModal: PropTypes.func.isRequired,
    botId:
    PropTypes.number.isRequired,
}

export default BotModelModal;