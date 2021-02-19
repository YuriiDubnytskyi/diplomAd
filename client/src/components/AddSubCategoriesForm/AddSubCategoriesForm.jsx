import React from "react";
import AdminImageLoader from "./../../components/AdminImageLoader/AdminImageLoader";
import { Form, Input, Button, Select } from "antd";
import "./AddSubCategoriesForm.scss";

const { Option } = Select;

const AddSubCategoriesForm = (props) => {
    return (
        <div className="addsubcategories__container">
            <Form
                className="addsubcategories-block"
                name="basic"
                form={props.form}
                onFinish={props.onFinish}
                onFinishFailed={props.onFinishFailed}
                initialValues={{
                    imgFolder: "",
                }}>
                <div className="addsubcategories-labels">
                    <div className="addsubcategories-categorie">
                        <div>
                            <p className="addsubcategorie__select-categorie">Categorie -- </p>
                        </div>
                        <Select defaultValue={false} style={{ width: 120 }} onChange={props.setIdSubProduct}>
                            {props.categoriesList.map((el) => (
                                <Option key={el._id} value={el._id}>
                                    {el.productTitle}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <Form.Item
                        className="addsubcategorie-title"
                        label="Product Title"
                        name="productSubTitle"
                        rules={[
                            {
                                required: true,
                                message: "Please input addcategorie!",
                            },
                        ]}>
                        <Input className="addsubcategorie-input" />
                    </Form.Item>

                    <div className="addsubcategorie-isimg">
                        <div>
                            <p className="addsubcategorie__select-title">Do you have image ?</p>
                        </div>
                        <Select defaultValue={props.isImg} style={{ width: 120 }} onChange={(va) => props.setIsImg(va)}>
                            <Option value={false}>false</Option>
                            <Option value={true}>true</Option>
                        </Select>
                    </div>
                    <Form.Item className="addsubcategorie-imgfolder" label="Img Folder" name="imgFolder">
                        <Input className="addsubcategorie-input" />
                    </Form.Item>
                    <div className="addsubcategorie-images">
                        <AdminImageLoader setImagesArray={props.setImagesArray} />
                    </div>
                    <div className="addsubcategorie-isgroup">
                        <div>
                            <p className="addsubcategorie__select-group">Do you have group ?</p>
                        </div>
                        <Select
                            defaultValue={props.isGroup}
                            style={{ width: 120 }}
                            onChange={(va) => props.setIsGroup(va)}>
                            <Option value={false}>false</Option>
                            <Option value={true}>true</Option>
                        </Select>
                    </div>
                    <Form.Item>
                        <div className="addsubcategories-btn">
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

AddSubCategoriesForm.whyDidYouRender = true;
export default AddSubCategoriesForm;
