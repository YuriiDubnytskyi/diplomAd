import React, { useState } from "react";
import AddSubCategoriesForm from "./../../components/AddSubCategoriesForm/AddSubCategoriesForm";
import ErrorBlock from "./../../components/ErrorBlock/ErrorBlock";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createProductSubMain, addSubCategoryFail } from "./../../store/actions/actionManager";
import axios from "axios";
import "./AddSubCategories.scss";

const AddSubCategories = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.manager);

    const onReset = () => {
        form.resetFields();
    };

    const [imagesArray, setImagesArray] = useState([]);
    const [isImg, setIsImg] = useState(false);
    const [isGroup, setIsGroup] = useState(false);
    const [idSubProduct, setIdSubProduct] = useState(false);

    const setImage = async (imagesArray, isImg, folderName) => {
        try {
            if (!isImg) {
                return "";
            }
            let data = "";
            data = new FormData();
            data.append("file", imagesArray[0].originFileObj);
            data.append("upload_preset", "diploma");
            data.append("folder", `/subcategories/${folderName}`);
            data.append("tags", folderName);
            const res = await axios.post("https://api.cloudinary.com/v1_1/yu7799/image/upload", data);
            return res.data.url;
        } catch (error) {
            dispatch(addSubCategoryFail(error));
        }
    };

    const onFinish = async (values) => {
        if (idSubProduct === false) {
            return dispatch(addSubCategoryFail("Please enter categories"));
        }
        const subList = data.fullProducts.filter((el) => el._id === idSubProduct);
        console.log(subList);
        if (subList[0].subTitle && subList[0].length !== 0) {
            if (subList[0].subTitle.some((el) => el.productSubTitle === values.productSubTitle)) {
                return dispatch(addSubCategoryFail("SubTitle is already exist"));
            }
        }

        console.log("Success:", values);
        const imgSrc = await setImage(imagesArray, isImg, values.imgFolder);
        console.log(imgSrc);
        dispatch(
            createProductSubMain(idSubProduct, {
                idProductTitle: idSubProduct,
                productSubTitle: values.productSubTitle,
                isImg,
                imgSrc,
                imgFolder: values.imgFolder,
                isGroup,
            })
        );
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="addcategories__block">
            <AddSubCategoriesForm
                form={form}
                loading={data.addSubLoading}
                categoriesList={data.fullProducts}
                setIdSubProduct={setIdSubProduct}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onReset={onReset}
                setImagesArray={setImagesArray}
                isImg={isImg}
                setIsImg={setIsImg}
                isGroup={isGroup}
                setIsGroup={setIsGroup}
            />
            <ErrorBlock mess={data.addSubErrMess} isError={data.addSubErr} type="large" />
        </div>
    );
};

AddSubCategories.whyDidYouRender = true;
export default React.memo(AddSubCategories);
