import React from "react";
import { InputNumber, Button, Form } from "antd";

const BuyCountForm = ({ count, id, addCount, onFinishFailed, name }) => {
    return (
        <>
            <Form
                className="addproductcount-block"
                name="basic"
                onFinish={(values) => addCount(values, count, id, name)}
                onFinishFailed={onFinishFailed}
                initialValues={{}}>
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
                        Замовити
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

BuyCountForm.whyDidYouRender = true;
export default BuyCountForm;
