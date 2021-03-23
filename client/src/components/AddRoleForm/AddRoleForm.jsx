import React from "react";
import "./AddRoleForm.scss";
import { Form, Input, Button, Select } from "antd";

const { Option } = Select;

const AddRoleForm = (props) => {
    return (
        <div className="addrole__container">
            <Form
                className="addrole-block"
                name="basic"
                form={props.form}
                onFinish={props.onFinish}
                onFinishFailed={props.onFinishFailed}>
                <div className="addrole-labels">
                    <Form.Item
                        className="addrole-login"
                        label="Login"
                        name="login"
                        rules={[
                            {
                                required: true,
                                message: "Please input your login!",
                            },
                        ]}>
                        <Input className="addrole-input" />
                    </Form.Item>

                    <Form.Item
                        className="addrole-password"
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}>
                        <Input.Password className="addrole-input" />
                    </Form.Item>

                    <div className="addrole-role">
                        <Select defaultValue={props.role} style={{ width: 120 }} onChange={(va) => props.setRole(va)}>
                            <Option value="manager">manager</Option>
                            <Option value="analitic">analitic</Option>
                            <Option value="copywriter">copywriter</Option>
                            <Option value="sellingman">sellingman</Option>
                            <Option value="storageworker">storageworker</Option>
                        </Select>
                    </div>

                    <Form.Item>
                        <div className="addrole-btn">
                            <Button loading={props.loading} type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </div>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

AddRoleForm.whyDidYouRender = true;
export default React.memo(AddRoleForm);
