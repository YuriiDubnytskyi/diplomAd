import React, { useEffect, useState } from "react";
import { Form, Input, Button, Space } from "antd";

const ChangeProperties = ({ onFinishProperty, dataProperty }) => {
    console.log(dataProperty);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        try {
            const obj = {};
            dataProperty.map((field, i) => {
                obj["property" + i] = field.property;
                obj["value" + i] = field.value;
            });
            setData(obj);
            setLoading(false);
            console.log(obj);
        } catch (error) {
            console.log(error);
        }
    }, []);
    return (
        <div>
            {!loading ? (
                <Form
                    name="dynamic_form_nest_item"
                    autoComplete="off"
                    onFinish={onFinishProperty}
                    initialValues={{
                        ...data,
                    }}>
                    {dataProperty
                        ? dataProperty.map((field, i) => (
                              <Space key={i} style={{ display: "flex", marginBottom: 8 }} align="start">
                                  <Form.Item label={"property" + i} name={"property" + i}>
                                      <Input />
                                  </Form.Item>

                                  <Form.Item label={"value" + i} name={"value" + i}>
                                      <Input />
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
            ) : null}
        </div>
    );
};

export default ChangeProperties;
