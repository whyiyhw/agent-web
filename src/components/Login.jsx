import {useContext, useState, useTransition} from "react";
import 'daisyui/dist/full.css';
import {userLogin} from '../api/api';
import {AlertContext} from '../context/AlertContext';
import {AuthContext} from '../context/AuthContext';
import loginImage from "../assets/login.jpg"
import {useNavigate} from "react-router-dom";
import {EXPLORE} from "../routes/app/routes.jsx";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {showAlert, hideAlert} = useContext(AlertContext);
    const {setIsLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();
    let [, startTransition] = useTransition();

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const data = await userLogin(email, password);
            // 登录成功，处理 返回的数据

            console.log("登录请求成功：", data);
            if (data.code !== 200) {
                showAlert(data.msg, "error");
                setTimeout(() => {
                    hideAlert();
                }, 2000);
                return;
            }
            if (!data.data.token) {
                showAlert(data.msg, "error");
                setTimeout(() => {
                    hideAlert();
                }, 2000);
                return;
            }
            setIsLoggedIn(true)
            // 登录成功后，将 data.token 保存在本地localStorage
            localStorage.setItem("token", data.data.token);
            // react 读取 localStorage 中的数据
            const previousPageUrl = localStorage.getItem("previousPageUrl") ?? "";

            console.log("previousPageUrl:", previousPageUrl);
            if (previousPageUrl !== "") {
                startTransition(() => {
                    navigate(previousPageUrl);
                });
            } else {
                startTransition(() => {
                    navigate(EXPLORE);
                });
            }
        } catch (error) {
            // 登录失败，处理错误信息
            console.error("登录失败：", error);
            // 弹窗提示错误信息
            showAlert(error.message, "error");
            // 两秒后隐藏弹窗
            setTimeout(() => {
                hideAlert();
            }, 2000);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="card bordered lg:card-side  w-full max-w-xl m-6 lg:m-0 text-base-content">
                <figure>
                    <img src={loginImage} className="h-full min-w-full object-cover" alt="login"/>
                </figure>
                <form className="card-body" onSubmit={handleSubmit}>

                    <h2 className="card-title text-6xl font-bold ">登 录</h2>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">email</span>
                        </label>
                        <input type="text" placeholder="email" className="input  input-bordered"
                               value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">密码</span>
                        </label>
                        <input type="password" placeholder="Password" className="input input-bordered"
                               value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>

                    <div className="form-control mt-6">
                        <input type="submit" value="登录" className="btn btn-primary opacity-80"/>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Login;