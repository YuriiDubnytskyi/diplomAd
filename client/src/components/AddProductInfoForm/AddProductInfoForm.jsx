import React from "react";
import { TreeSelect, Form, Input, Button } from "antd";

const { TreeNode } = TreeSelect;
const { TextArea } = Input;

const AddProductInfoForm = ({
    form,
    categoriesList,
    onFinish,
    onFinishFailed,
    onReset,
    onChangeTree,
    idSubProduct,
}) => {
    return (
        <>
            <TreeSelect
                showSearch
                style={{ width: "100%" }}
                value={idSubProduct}
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                placeholder="Please select"
                allowClear
                treeDefaultExpandAll
                onChange={onChangeTree}>
                {categoriesList.map((el) => {
                    return (
                        <TreeNode key={el._id} value={undefined} title={el.productTitle}>
                            {el.subTitle.map((el) => {
                                return <TreeNode key={el._id} value={el._id} title={el.productSubTitle} />;
                            })}
                        </TreeNode>
                    );
                })}
            </TreeSelect>
            <Form
                className="addproductinfo-block"
                name="basic"
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{
                    groupName: "",
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
                    <Form.Item className="addsubcategorie-groupname" label="Group Name" name="groupName">
                        <Input className="addsubcategorie-input" />
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
AddProductInfoForm.whyDidYouRender = true;
export default AddProductInfoForm;
