import React from "react";
import { Form, Input, Button } from "antd";
const { TextArea } = Input;
const ChangeProductInfoForm = ({ form, onFinish, onFinishFailed, onReset, info }) => {
    return (
        <>
            <Form
                className="addproductinfo-block"
                name="basic"
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{
                    name: info.name,
                    price: info.price,
                    shortInfo: info.shortInfo,
                    info: info.info,
                    producer: info.producer,
                }}>
                <div className="addproductinfo-labels">
                    <Form.Item
                        className="addproductinfo-title"
                        label="Product Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input name!",
                                disabled: true,
                            },
                        ]}>
                        <Input className="addproductinfo-input" />
                    </Form.Item>

                    <Form.Item
                        className="addproductinfo-title"
                        label="Product Price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: "Please input price!",
                            },
                        ]}>
                        <Input className="addproductinfo-input" />
                    </Form.Item>

                    <Form.Item
                        className="addproductinfo-title"
                        label="Product Producer"
                        name="producer"
                        rules={[
                            {
                                required: true,
                                message: "Please input producer!",
                            },
                        ]}>
                        <Input className="addproductinfo-input" />
                    </Form.Item>

                    <Form.Item
                        className="addproductinfo-title"
                        label="Product ShortInfo"
                        name="shortInfo"
                        rules={[
                            {
                                required: true,
                                message: "Please input ShortInfo!",
                            },
                        ]}>
                        <TextArea rows={4} className="addproductinfo-input" />
                    </Form.Item>

                    <Form.Item
                        className="addproductinfo-title"
                        label="Product Info"
                        name="info"
                        rules={[
                            {
                                required: true,
                                message: "Please input info!",
                            },
                        ]}>
                        <TextArea rows={4} className="addproductinfo-input" />
                    </Form.Item>

                    <Form.Item>
                        <div className="addproductinfo-btn">
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                        </div>
                    </Form.Item>
                </div>
            </Form>
        </>
    );
};

export default ChangeProductInfoForm;
