import React from "react";
import { Form, Input, Button } from "antd";

const BuyCountForm = ({ count, id, title, addCount, onFinishFailed }) => {
    return (
        <>
            <div className="item__container">
                <h2 className="item-title">{title}</h2>
                <h3 className="item-title">{count}</h3>
                <Form
                    className="addproductcount-block"
                    name="basic"
                    onFinish={(values) => addCount(values, count, id)}
                    onFinishFailed={onFinishFailed}
                    initialValues={{}}>
                    <div className="addproductcount-labels">
                        <Form.Item
                            className="addproductinfo-title"
                            label="Product Name"
                            name="count"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input count!",
                                },
                            ]}>
                            <Input className="addproductcount-input" />
                        </Form.Item>
                        <Form.Item>
                            <div className="addproductcount-btn">
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </>
    );
};

BuyCountForm.whyDidYouRender = true;
export default BuyCountForm;
