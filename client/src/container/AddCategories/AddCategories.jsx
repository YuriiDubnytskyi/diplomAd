import React, { useState } from "react";
import AddCategoriesForm from "./../../components/AddCategoriesForm/AddCategoriesForm";
import ErrorBlock from "./../../components/ErrorBlock/ErrorBlock";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createProductMain, addCategoryFail } from "./../../store/actions/actionManager";
import axios from "axios";
import "./AddCategories.scss";

const AddCategories = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.manager);

    const onReset = () => {
        form.resetFields();
    };
    const [imagesArray, setImagesArray] = useState([]);
    const [isImg, setIsImg] = useState(false);

    const setImage = async (imagesArray, isImg, folderName) => {
        try {
            if (!isImg) {
                return "";
            }
            let data = "";

            data = new FormData();
            data.append("file", imagesArray[0].originFileObj);
            data.append("upload_preset", "diploma");
            data.append("folder", `/categories/${folderName}`);
            data.append("tags", folderName);
            const res = await axios.post("https://api.cloudinary.com/v1_1/yu7799/image/upload", data);
            return res.data.url;
        } catch (error) {
            dispatch(addCategoryFail(error));
        }
    };

    const onFinish = async (values) => {
        if (data.fullProducts.some((el) => el.productTitle === values.productTitle)) {
            return dispatch(addCategoryFail("Categories Title Is Already Exist"));
        }
        console.log("Success:", values);
        const imgSrc = await setImage(imagesArray, isImg, values.imgFolder);
        console.log(imgSrc);
        dispatch(
            createProductMain({
                productTitle: values.productTitle,
                isImg,
                imgSrc,
                imgFolder: values.imgFolder,
            })
        );
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="addcategories__block">
            <AddCategoriesForm
                form={form}
                loading={data.addMainLoading}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onReset={onReset}
                setImagesArray={setImagesArray}
                isImg={isImg}
                setIsImg={setIsImg}
            />
            <ErrorBlock mess={data.addMainErrMess} isError={data.addMainErr} type="large" />
        </div>
    );
};

AddCategories.whyDidYouRender = true;
export default React.memo(AddCategories);
