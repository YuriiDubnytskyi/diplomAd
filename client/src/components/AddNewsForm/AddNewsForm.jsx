import React from "react";
import AdminImageLoader from "./../../components/AdminImageLoader/AdminImageLoader";
import { Form, Input, Button } from "antd";
import "./AddNewsForm.scss";
const { TextArea } = Input;

const AddNewsForm = (props) => {
    return (
        <div className="addnews__container">
            <Form
                className="addnews-block"
                name="basic"
                form={props.form}
                onFinish={props.onFinish}
                onFinishFailed={props.onFinishFailed}>
                <div className="addnews-labels">
                    <Form.Item
                        className="addnews-title"
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: "Please input title!",
                            },
                        ]}>
                        <Input className="addnews-input" />
                    </Form.Item>

                    <div className="addnews-images">
                        <AdminImageLoader setImagesArray={props.setImagesArray} />
                    </div>

                    <Form.Item
                        className="addnews-info"
                        label="ShortInfo"
                        name="shortDescription"
                        rules={[
                            {
                                required: true,
                                message: "Please input ShortInfo!",
                            },
                        ]}>
                        <TextArea rows={4} className="addnews-info-input" />
                    </Form.Item>

                    <Form.Item
                        className="addnews-fullinfo"
                        label="Full Info"
                        name="fullDescription"
                        rules={[
                            {
                                required: true,
                                message: "Please input Full Info!",
                            },
                        ]}>
                        <TextArea rows={10} className="addnews-fullinfo-input" />
                    </Form.Item>

                    <Form.Item>
                        <div className="addnews-btn">
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

AddNewsForm.whyDidYouRender = true;
export default AddNewsForm;
