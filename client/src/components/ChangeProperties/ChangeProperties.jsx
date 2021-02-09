import React from "react";
import { Form, Input, Button, Space } from "antd";

const ChangeProperties = ({ onFinishProperty, dataProperty }) => {
    console.log(dataProperty);
    return (
        <div>
            <Form name="dynamic_form_nest_item" autoComplete="off" onFinish={onFinishProperty}>
                {dataProperty
                    ? dataProperty.map((field, i) => (
                          <Space key={i} style={{ display: "flex", marginBottom: 8 }} align="start">
                              <Form.Item label="Property" name={"property" + i}>
                                  <Input defaultValue={field.property} />
                              </Form.Item>

                              <Form.Item label="Value" name={"value" + i}>
                                  <Input defaultValue={field.value} />
                              </Form.Item>
                          </Space>
                      ))
                    : null}

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ChangeProperties;
