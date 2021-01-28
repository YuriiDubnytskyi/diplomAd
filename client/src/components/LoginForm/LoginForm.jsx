import React from "react";
import { Form, Input, Button } from "antd";
import "./LoginForm.scss";

export const LoginForm = (props) => {
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
    };
    return (
        <div className="form__container">
            <Form
                className="form-block"
                form={form}
                name="basic"
                onFinish={props.onFinish}
                onFinishFailed={props.onFinishFailed}>
                <Form.Item
                    className="login-item"
                    label="Login"
                    name="login"
                    rules={[
                        {
                            required: true,
                            message: "Please input your login!",
                        },
                    ]}>
                    <Input className="login-input" />
                </Form.Item>

                <Form.Item
                    className="login-item"
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}>
                    <Input.Password className="login-input" />
                </Form.Item>

                <Form.Item>
                    <div className="login-btn">
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

LoginForm.whyDidYouRender = true;
export default React.memo(LoginForm);
