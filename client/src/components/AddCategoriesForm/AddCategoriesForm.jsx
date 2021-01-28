import React from "react";
import AdminImageLoader from "./../../components/AdminImageLoader/AdminImageLoader";
import { Form, Input, Button, Select } from "antd";

const { Option } = Select;

const AddCategoriesForm = (props) => {
    return (
        <div className="addcategories__container">
            <Form
                className="addcategories-block"
                name="basic"
                form={props.form}
                onFinish={props.onFinish}
                onFinishFailed={props.onFinishFailed}
                initialValues={{
                    imgFolder: "",
                }}>
                <div className="addcategories-labels">
                    <Form.Item
                        className="addcategorie-title"
                        label="Product Title"
                        name="productTitle"
                        rules={[
                            {
                                required: true,
                                message: "Please input addcategorie!",
                            },
                        ]}>
                        <Input className="addcategorie-input" />
                    </Form.Item>

                    <Form.Item className="addcategorie-password" label="Img Folder" name="imgFolder">
                        <Input className="addcategorie-input" />
                    </Form.Item>

                    <div className="addcategorie-isimg">
                        <Select
                            defaultValue={props.isImg}
                            style={{ width: 120 }}
                            onChange={(va) => props.setIsImg(Boolean(va))}>
                            <Option value="false">false</Option>
                            <Option value="true">true</Option>
                        </Select>
                    </div>

                    <div>
                        <AdminImageLoader setImagesArray={props.setImagesArray} />
                    </div>

                    <Form.Item>
                        <div className="addcategories-btn">
                            <Button loading={props.loading} type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={props.onReset}>
                                Reset
                            </Button>
                        </div>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

AddCategoriesForm.whyDidYouRender = true;
export default AddCategoriesForm;
