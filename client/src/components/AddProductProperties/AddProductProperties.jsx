import React from "react";
import { Form, Input, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const AddProductProperties = ({ onFinishProperty }) => {
    return (
        <Form name="dynamic_form_nest_item" onFinish={onFinishProperty} autoComplete="off">
            <Form.List name="properties">
                {(fields, { add, remove }) => {
                    return (
                        <div>
                            {fields.map((field) => (
                                <Space key={field.key} style={{ display: "flex", marginBottom: 8 }} align="start">
                                    <Form.Item
                                        {...field}
                                        name={[field.name, "property"]}
                                        fieldKey={[field.fieldKey, "property"]}
                                        rules={[{ required: true, message: "Missing first property" }]}>
                                        <Input placeholder="Property" />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, "value"]}
                                        fieldKey={[field.fieldKey, "value"]}
                                        rules={[{ required: true, message: "Missing last value" }]}>
                                        <Input placeholder="Value" />
                                    </Form.Item>

                                    <MinusCircleOutlined
                                        onClick={() => {
                                            remove(field.name);
                                        }}
                                    />
                                </Space>
                            ))}

                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => {
                                        add();
                                    }}
                                    block>
                                    <PlusOutlined /> Add field
                                </Button>
                            </Form.Item>
                        </div>
                    );
                }}
            </Form.List>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
AddProductProperties.whyDidYouRender = true;
export default AddProductProperties;
