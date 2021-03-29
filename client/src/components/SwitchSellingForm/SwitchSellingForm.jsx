import React from "react";
import { Button, Form, Input } from "antd";
const { TextArea } = Input;

const SwitchSellingForm = ({ switchSelling, id, data, onFinishFailed }) => {
    return (
        <>
            <Form
                className="addproductcount-block"
                name="basic"
                onFinish={(values) => switchSelling(values, id, data)}
                onFinishFailed={onFinishFailed}
                initialValues={{}}>
                <Form.Item
                    className="addproductinfo-title"
                    label="Message"
                    name="message"
                    rules={[
                        {
                            required: true,
                            message: "Please input message!",
                        },
                    ]}>
                    <TextArea className="addproductcount-input" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Підтвердити
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

SwitchSellingForm.whyDidYouRender = true;
export default SwitchSellingForm;
