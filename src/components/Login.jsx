import {useContext, useState, useTransition} from "react";
import 'daisyui/dist/full.css';
import {userLogin, userRegister} from '../api/api';
import {AlertContext} from '../context/AlertContext';
import {AuthContext} from '../context/AuthContext';
import loginImage from "../assets/login.jpg"
import {useNavigate} from "react-router-dom";
import {EXPLORE} from "../routes/app/routes.jsx";
import {Rotate3D as LgRotateRight,} from "lucide-react";

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
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

    const handleRegister = async event => {
        event.preventDefault();

        try {
            const data = await userRegister(registerEmail, registerPassword);
            // 注册成功，处理 返回的数据
            if (data.code !== 200) {
                showAlert(data.msg, "error");
                setTimeout(() => {
                    hideAlert();
                }, 2000);
            }
            showAlert(data.msg + "去登录吧", "success");
            setTimeout(() => {
                hideAlert();
            }, 2000);
            setIsLogin(true)
        } catch (error) {
            // 登录失败，处理错误信息
            console.error("注册失败：", error);
            // 弹窗提示错误信息
            showAlert(error.message, "error");
            // 两秒后隐藏弹窗
            setTimeout(() => {
                hideAlert();
            }, 2000);
        }
    }

    const loginStyle = (l = true) => {
        if (l) {
            return isLogin ? "block  card bordered lg:card-side w-full max-w-xl m-6 lg:m-0 text-base-content" :
                "hidden card bordered lg:card-side w-full max-w-xl m-6 lg:m-0 text-base-content"
        }
        return isLogin ? "hidden card bordered lg:card-side w-full max-w-xl m-6 lg:m-0 text-base-content" :
            "block  card bordered lg:card-side w-full max-w-xl m-6 lg:m-0 text-base-content"
    }

    return (
        <div className="flex items-center justify-center h-screen">
            {
                isLogin ?
                    <div className={loginStyle()}>
                        <figure>
                            <img src={loginImage ?? ""} className="h-full min-w-full object-cover" alt="login"/>
                        </figure>
                        <form className="card-body bg-white" onSubmit={handleSubmit}>
                            <div className="btn btn-ghost btn-circle btn-sm  absolute top-0 right-0 m-6">
                                <LgRotateRight color={"blue"} onClick={() => setIsLogin(!isLogin)}/>
                            </div>

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
                    :
                    <div className={loginStyle(false)}>
                        <figure>
                            <img src={loginImage ?? ""} className="h-full min-w-full object-cover" alt="login"/>
                        </figure>
                        <form className="card-body bg-white" onSubmit={handleRegister}>
                            <div className="btn btn-ghost  btn-circle btn-sm  bg-white absolute top-0 right-0 m-6">
                                <LgRotateRight color={"green"} onClick={() => setIsLogin(!isLogin)}/>
                            </div>

                            <h2 className="card-title text-6xl font-bold ">注 册</h2>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">email</span>
                                </label>
                                <input type="text" placeholder="email" className="input  input-bordered"
                                       value={registerEmail} onChange={e => setRegisterEmail(e.target.value)}/>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">密码</span>
                                </label>
                                <input type="password" placeholder="Password" className="input input-bordered"
                                       value={registerPassword}
                                       onChange={e => setRegisterPassword(e.target.value)}/>
                            </div>

                            <div className="form-control mt-6">
                                <input type="submit" value="注册" className="btn btn-primary opacity-80"/>
                            </div>

                        </form>
                    </div>
            }
        </div>
    );
}

export default Login;