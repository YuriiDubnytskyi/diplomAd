import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLogin } from "./../../store/actions/actionsUser";
import LoginForm from "./../../components/LoginForm/LoginForm";
import ErrorBlock from "./../../components/ErrorBlock/ErrorBlock";
import "./Login.scss";

const Login = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const onFinish = (values) => {
        console.log("Success:", values);
        dispatch(fetchUserLogin(values.login, values.password));
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="login__page">
            <LoginForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
            <ErrorBlock mess={user.errMess} isError={user.err} type="small" />
        </div>
    );
};

Login.whyDidYouRender = true;
export default React.memo(Login);
