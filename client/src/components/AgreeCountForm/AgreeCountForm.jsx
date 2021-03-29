import React from "react";
import { InputNumber, Button, Form, Input } from "antd";
const { TextArea } = Input;

const AgreeCountForm = ({ id, idStorageHouse, addCount, onFinishFailed }) => {
    return (
        <>
            <Form
                className="addproductcount-block"
                name="basic"
                onFinish={(values) => addCount(id, idStorageHouse, values)}
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
                <Form.Item
                    className="addproductinfo-title"
                    label="Count"
                    name="count"
                    rules={[
                        {
                            required: true,
                            message: "Please input count!",
                        },
                    ]}>
                    <InputNumber min={1} defaultValue={1} className="addproductcount-input" />
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

AgreeCountForm.whyDidYouRender = true;
export default AgreeCountForm;
