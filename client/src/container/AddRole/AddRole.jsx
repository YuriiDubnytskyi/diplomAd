import React, { useState } from "react";
import AddRoleForm from "./../../components/AddRoleForm/AddRoleForm";
import "./AddRole.scss";
import API from "./../../API/API";
import ErrorBlock from "./../../components/ErrorBlock/ErrorBlock";
import { addRole } from "./../../store/actions/actionAdmin";
import { useDispatch } from "react-redux";
import { Form } from "antd";

const AddRole = () => {
    const [role, setRole] = useState("manager");
    const [err, setErr] = useState(false);
    const [errMess, setErrMess] = useState("");
    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
    };
    const dispatch = useDispatch();

    const onFinish = (values) => {
        console.log("Success:", values);
        setLoading(true);
        API.post("/auth/sign", {
            login: values.login,
            password: values.password,
            role,
            username: "q",
        }).then((res) => {
            setLoading(false);
            onReset();
            if (res.data.err) {
                setErr(true);
                setErrMess(res.data.message);
            } else {
                dispatch(addRole(res.data));
                setErr(false);
                setErrMess("");
            }
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div className="addrole__block">
            <AddRoleForm
                form={form}
                loading={loading}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                role={role}
                setRole={setRole}
            />
            <ErrorBlock mess={errMess} isError={err} type="large" />
        </div>
    );
};

AddRole.whyDidYouRender = true;
export default React.memo(AddRole);
